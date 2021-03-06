import { FunctionComponent } from "preact";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { generateStyles, headlineFont } from "../design/typography";
import { css } from "@emotion/react";
import { LiveEvent } from "../../gateway/live";
import LiveUpdate from "../components/LiveUpdate";
import LiveLayout from "../components/LiveLayout";

export interface LivePageProps {
  event: LiveEvent;
}

const LivePage: FunctionComponent<LivePageProps> = ({ event }) => {
  return (
    <>
      <Header />
      <Container>
        <div
          css={css`
            ${generateStyles(headlineFont)}
          `}
        >
          Student Elections 2021
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
      </Container>
      <Footer />
    </>
  );
};

export default LivePage;
