import { css } from "@emotion/react";
import { text } from "../design/palette";
import { colours, fonts, fontSizes, fontWeights, space } from "../design/theme";
import { FunctionComponent } from "preact";
import { tinyRelative } from "./utils/date";
import RichContent from "./RichContent";
import { RiFileCopyLine, RiShareLine } from "react-icons/ri";

export interface LiveUpdateProps {
  id: string;
  body: string;
  author: string;
  createdAt: Date;
}

const metaStyles = css`
  grid-column: 1 / span 1;
  text-align: right;
  font-family: ${fonts.sans};
  align-self: baseline;
`;

const timeStyles = css`
  font-weight: ${fontWeights.bold};
  color: ${text.live};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  gap: ${space[3]}px;
  margin-bottom: ${space[2]}px;
`;

const authorStyles = css`
  color: ${text.primary};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const selectableStyles = css`
  cursor: pointer;
`;

// TODO: Ensure that this is in a grid
const LiveUpdate: FunctionComponent<LiveUpdateProps> = ({
  body,
  author,
  createdAt,
  id,
}) => {
  const isBrowser = typeof window != "undefined";
  const canCopy = isBrowser && "clipboard" in navigator;
  const canShare = isBrowser && "share" in navigator;

  const url = `${window.location.href}#${id}`;
  const copyLink = () => {
    navigator.clipboard.writeText(url);
  };
  const shareLink = () => {
    navigator.share({ url });
  };

  return (
    <>
      <div css={metaStyles}>
        <div>
          <div css={timeStyles}>
            {canCopy && (
              <RiFileCopyLine css={selectableStyles} onClick={copyLink} />
            )}
            {canShare && (
              <RiShareLine css={selectableStyles} onClick={shareLink} />
            )}
            {tinyRelative(createdAt, true)}
          </div>
          <div css={authorStyles}>
            <a css={authorStyles} href="#">
              {author}
            </a>
          </div>
        </div>
      </div>
      <div
        id={id}
        css={css`
          grid-column: 2 / span 1;
        `}
      >
        <RichContent dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
};

export default LiveUpdate;
