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
  clipText?: boolean;
  link?: string;
  newTab?: boolean;
  isLive?: boolean;
  imageUrl?: string;
  imageAlt?: string;

  type?: ArticleCellType;
}

const containerStyles = css`
  position: relative;
`;

const titleStyles = (isCompact: boolean) => css`
  ${generateStyles(!isCompact ? headlineFont : subtitleFont)}
  width: 95%;
`;

const subtitleStyles = css`
  ${generateStyles(subtitleFont)}
  margin-top: ${space[3]}px;
`;

const imageContainerStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const gradientContainerStyles = css`
  position: relative;
  margin-bottom: -${space[4]}px;

  @media (max-width: 800px) {
    max-height: 140px;
    overflow: hidden;
  }
`;

const textStyles = css`
  margin-top: ${space[4]}px;
  flex: 1 0;
`;

const textOverlay = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(
    to bottom,
    transparent,
    transparent 35%,
    white 86%,
    white
  );
  pointer-events: none;

  @media (max-width: 800px) {
    background-image: linear-gradient(
      to bottom,
      transparent,
      transparent 55%,
      white 90%,
      white
    );
  }
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
  imageAlt,
  type = ArticleCellType.Default,
  newTab = false,
  clipText = true,
}) => {
  return (
    <div css={containerStyles}>
      {link != null && <LinkArea href={link} targetBlank={newTab} />}

      {imageUrl != null && (
        <AspectRatioBox
          ratio={9 / 16}
          css={css`
            margin-bottom: ${space[5]}px;
          `}
        >
          <div css={imageContainerStyles}>
            <img css={imageStyles} src={imageUrl} alt={imageAlt} />
          </div>
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
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {subtitle != null && shouldShowSubtitle(type) && (
        <div
          css={subtitleStyles}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}

      {text != null &&
        (clipText ? (
          <div css={[textStyles, gradientContainerStyles]}>
            <div dangerouslySetInnerHTML={{ __html: text }} />
            <div css={textOverlay}></div>
          </div>
        ) : (
          <div css={textStyles} dangerouslySetInnerHTML={{ __html: text }} />
        ))}
    </div>
  );
};

export default ArticleCell;
