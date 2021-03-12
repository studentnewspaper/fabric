import { FunctionComponent } from "preact";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { generateStyles, headlineFont } from "../design/typography";
import { css } from "@emotion/react";
import { getLiveEvent, LiveEvent } from "../../gateway/live";
import LiveUpdate from "../components/LiveUpdate";
import LiveLayout from "../components/LiveLayout";
import LiveBadge from "../components/LiveBadge";
import { useEffect, useState } from "preact/hooks";
import UpdatesCell, { UpdatesCellType } from "../components/UpdatesCell";
import { colours, space } from "../design/theme";
import ToggleButton, { ToggleButtonProps } from "../components/ToggleButton";
import { useNotifications, NotificationState } from "../hooks/notification";

export interface LivePageProps {
  slug: string;
  initialEvent: LiveEvent;
  firstUpdatedAt: string;
}

const LivePage: FunctionComponent<LivePageProps> = ({
  slug,
  initialEvent,
  firstUpdatedAt,
}) => {
  const [updatedAt, setUpdatedAt] = useState(new Date(firstUpdatedAt));
  const [event, setEvent] = useState(initialEvent);

  async function update() {
    const event = await getLiveEvent(slug);
    if (event == null) return;
    setEvent(event);
    setUpdatedAt(new Date());
  }

  useEffect(() => {
    if (typeof window == "undefined") return;
    update();
    const interval = setInterval(() => update(), 120 * 1000);
    return () => clearInterval(interval);
  }, []);

  const [
    notificationState,
    enableNotifications,
    disableNotifications,
  ] = useNotifications(slug);

  const notificationButton = ((): JSX.Element | null => {
    switch (notificationState) {
      case NotificationState.Loading:
        return <ToggleButton isDisabled>Loading</ToggleButton>;
      case NotificationState.NotSupported:
        return null;
      case NotificationState.Denied:
        return <ToggleButton isDisabled>Notifications blocked</ToggleButton>;
      case NotificationState.Initial:
      case NotificationState.Active:
        return (
          <ToggleButton
            isToggled={false}
            onToggle={() => enableNotifications()}
          >
            Subscribe
          </ToggleButton>
        );
      case NotificationState.AwaitingAction:
        return <ToggleButton isToggled={false}>Prompt open</ToggleButton>;
      case NotificationState.Subscribed:
        return (
          <ToggleButton
            isToggled={true}
            onToggle={() => disableNotifications()}
          >
            Unsubscribe
          </ToggleButton>
        );
      default:
        throw new Error("Invalid state");
    }
  })();

  return (
    <>
      <Header />
      <Container
        css={css`
          margin-top: ${space[8]}px;
          margin-bottom: ${space[10]}px;
        `}
      >
        <LiveBadge />
        <div
          css={css`
            ${generateStyles(headlineFont)};
            margin-top: ${space[3]}px;
            margin-bottom: ${space[4]}px;
          `}
          dangerouslySetInnerHTML={{ __html: event.title }}
        />
        {event.subtitle != null && (
          <div dangerouslySetInnerHTML={{ __html: event.subtitle }} />
        )}
        <div
          css={css`
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 4fr);
            column-gap: ${space[4]}px;
            margin-top: ${space[8]}px;

            @media (max-width: 800px) {
              grid-template-columns: minmax(0, 1fr);
              column-gap: 0;
              row-gap: ${space[8]}px;
              margin-top: ${space[7]}px;
            }
          `}
        >
          <div
            css={css`
              /* border-left: 1px solid ${colours.neutral[200]}; */
              /* padding-left: ${space[6]}px; */

              @media (max-width: 800px) {
                grid-row: 1;
                border-left: none;
                padding-left: 0;
                min-height: unset;
                width: 100%;
              }
            `}
          >
            {notificationButton != null && (
              <div
                css={css`
                  margin-bottom: ${space[6]}px;
                `}
              >
                {notificationButton}
              </div>
            )}
            <UpdatesCell
              updates={event.updates
                .filter((update) => update.majorText != null)
                .map((update) => ({
                  id: update.id,
                  text: update.majorText ?? "Update",
                  timestamp: new Date(update.createdAt),
                  link: `#${update.id}`,
                }))}
              type={UpdatesCellType.Stacked}
              updatedAt={updatedAt}
              updateFrequency="2m"
            />
          </div>
          <LiveLayout
            updates={event.updates.map((update) => {
              return (
                <LiveUpdate
                  id={update.id}
                  body={update.body}
                  createdAt={new Date(update.createdAt)}
                  author={update.author.name}
                  authorSlug={update.author.slug}
                />
              );
            })}
          />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default LivePage;
