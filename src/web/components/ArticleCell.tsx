import { css } from "@emotion/react";
import { space } from "../design/theme";
import {
  generateStyles,
  headlineFont,
  subtitleFont,
} from "../design/typography";
import { FunctionComponent } from "preact";
import AspectRatioBox from "./AspectRatioBox";
import LinkArea from "./LinkArea";
import LiveBadge, { LiveBadgeType } from "./LiveBadge";

export enum ArticleCellType {
  Default = "default",
  Compact = "compact",
}

export interface ArticleCellProps {
  title: string;
  subtitle?: string;
  text?: string;
  link?: string;
  isLive?: boolean;
  imageUrl?: string;

  type?: ArticleCellType;
}

const containerStyles = css`
  position: relative;
`;

const titleStyles = (isCompact: boolean) => css`
  ${generateStyles(!isCompact ? headlineFont : subtitleFont)}
`;

const subtitleStyles = css`
  ${generateStyles(subtitleFont)}
  margin-top: ${space[3]}px;
`;

const imageStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
`;

const textStyles = css`
  margin-top: ${space[4]}px;
`;

const shouldShowSubtitle = (type: ArticleCellType): boolean => {
  switch (type) {
    case ArticleCellType.Compact:
      return false;
    default:
      return true;
  }
};

const liveBadgeType = (type: ArticleCellType): LiveBadgeType => {
  switch (type) {
    case ArticleCellType.Default:
      return LiveBadgeType.Solid;
    case ArticleCellType.Compact:
      return LiveBadgeType.Transparent;
  }
};

const ArticleCell: FunctionComponent<ArticleCellProps> = ({
  title,
  subtitle,
  text,
  link,
  isLive = false,
  imageUrl,
  type = ArticleCellType.Default,
}) => {
  return (
    <div css={containerStyles}>
      {link != null && <LinkArea href={link} />}

      {imageUrl != null && (
        <AspectRatioBox
          ratio={9 / 16}
          css={css`
            margin-bottom: ${space[5]}px;
          `}
        >
          <div
            css={imageStyles}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </AspectRatioBox>
      )}

      {isLive && (
        <LiveBadge
          type={liveBadgeType(type)}
          css={css`
            margin-bottom: ${space[3]}px;
          `}
        />
      )}

      <div
        css={titleStyles(type == ArticleCellType.Compact)}
        data-link-hover="underline"
      >
        {title}
      </div>

      {subtitle != null && shouldShowSubtitle(type) && (
        <div css={subtitleStyles}>{subtitle}</div>
      )}

      {text != null && <p css={textStyles}>{text}</p>}
    </div>
  );
};

export default ArticleCell;
