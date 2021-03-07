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
  authorSlug: string;
  createdAt: Date;
}

const metaStyles = css`
  text-align: right;
  font-family: ${fonts.sans};
  align-self: baseline;

  @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: ${space[2]}px;
    text-align: left;
  }
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

  @media (max-width: 800px) {
    gap: ${space[2]}px;
    margin-bottom: ${space[1]}px;
    justify-content: left;
  }
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
  authorSlug,
  createdAt,
  id,
}) => {
  const isBrowser = typeof window != "undefined";
  const canCopy = isBrowser && "clipboard" in navigator;
  const canShare = isBrowser && "share" in navigator;

  const getUrl = () => {
    if (!isBrowser) throw new Error("Can only get URL on client");
    return `${window.location.href}#${id}`;
  };
  const copyLink = () => {
    navigator.clipboard.writeText(getUrl());
  };
  const shareLink = () => {
    navigator.share({ url: getUrl() });
  };

  return (
    <>
      <div css={metaStyles}>
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
          <a css={authorStyles} href={`/author/${authorSlug}`}>
            {author}
          </a>
        </div>
      </div>
      <div id={id}>
        <RichContent dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
};

export default LiveUpdate;
