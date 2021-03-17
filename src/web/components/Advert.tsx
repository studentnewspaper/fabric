import { css, PropsOf } from "@emotion/react";
import { FunctionComponent } from "preact";
import { bg } from "../design/palette";
import { fonts, fontSizes, space } from "../design/theme";
import LinkArea from "./LinkArea";

export interface AdvertProps extends PropsOf<"div"> {
  s3MediaId: string;
  alt?: string;
  paidForBy: string;
  link?: string;
  hideBottomBorder?: boolean;
}

const containerStyles = css`
  position: relative;
  width: max-content;
  max-width: 100%;
`;

const lineStyle = css`
  width: 40%;
  height: 1px;
  background-color: ${bg.theme};
  margin-top: ${space[3]}px;
`;

const Advert: FunctionComponent<AdvertProps> = ({
  s3MediaId,
  paidForBy,
  alt = "",
  link,
  hideBottomBorder = false,
  ...props
}) => {
  const getUrl = (extension = "jpg") =>
    `https://thestudent.s3.eu-west-2.amazonaws.com/adverts/${s3MediaId}/d-1.${extension}`;

  return (
    <div css={containerStyles} {...props}>
      {link != null && <LinkArea href={link} targetBlank />}
      <picture>
        <source src={getUrl("avif")} type="image/avif" />
        <source src={getUrl("webp")} type="image/webp" />
        <img
          css={css`
            display: block;
          `}
          src={getUrl()}
          alt={alt}
          width="620"
          height="420"
          crossOrigin="anonymous"
        />
      </picture>
      <div
        css={css`
          font-family: ${fonts.sans};
          font-size: ${fontSizes.small}rem;
          margin-top: ${space[3]}px;
          padding-top: ${space[1]}px;
        `}
      >
        Advert paid for by <b>{paidForBy}</b>
      </div>
      {!hideBottomBorder && <div css={lineStyle} />}
    </div>
  );
};

export default Advert;
