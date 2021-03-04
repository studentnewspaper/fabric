import { css } from "@emotion/react";
import { zIndices } from "../design/theme";
import { FunctionComponent } from "preact";

export interface LinkAreaProps {
  href: string;
  targetBlank?: boolean;
}

const linkStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  z-index: ${zIndices.linkArea};

  :hover {
    ~ [data-link-hover="underline"] {
      text-decoration: underline;
    }
  }
`;

const LinkArea: FunctionComponent<LinkAreaProps> = ({
  href,
  targetBlank = false,
}) => {
  return (
    <a
      css={linkStyles}
      href={href}
      aria-hidden="true"
      target={targetBlank ? "__blank" : undefined}
      rel="noopener"
    >
      Link
    </a>
  );
};

export default LinkArea;
