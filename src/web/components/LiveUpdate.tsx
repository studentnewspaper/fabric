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
    margin-bottom: ${space[4]}px;
    text-align: left;
  }
`;

const timeStyles = css`
  font-weight: ${fontWeights.bold};
  color: ${text.live};

  margin-bottom: ${space[2]}px;

  @media (max-width: 800px) {
    display: inline-block;
    margin-bottom: ${space[1]}px;
  }
`;

const authorStyles = css`
  color: ${text.primary};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  @media (max-width: 800px) {
    display: inline-block;
    margin-left: ${space[2]}px;
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

  const buttonType: "share" | "copy" | "none" = (() => {
    if (canShare) return "share";
    if (canCopy) return "copy";
    return "none";
  })();

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
          <span
            css={css`
              margin-right: ${space[2]}px;
              vertical-align: middle;
            `}
          >
            {buttonType == "copy" && (
              <RiFileCopyLine css={selectableStyles} onClick={copyLink} />
            )}
            {buttonType == "share" && (
              <RiShareLine css={selectableStyles} onClick={shareLink} />
            )}
          </span>
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
