import { css } from "@emotion/react";
import { text } from "../design/palette";
import { colours, fonts, letterSpacings, space } from "../design/theme";
import { FunctionComponent } from "preact";
import Logo from "./Logo";
import Container from "./Container";
import LinkArea from "./LinkArea";

export interface HeaderProps {}

const navStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${space[5]}px;
  margin-bottom: ${space[5] - space[2]}px;

  a {
    color: ${text.primary};
    font-family: ${fonts.sans};
    font-weight: bold;
    letter-spacing: ${letterSpacings.dense};
    text-decoration: none;
    margin-bottom: ${space[2]}px;

    :not(:last-of-type) {
      margin-right: ${space[5]}px;
    }

    :hover {
      /* text-decoration: underline; */
      color: ${text.theme};
    }
  }
`;

const mastheadStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${space[6]}px 0;
`;

const logoStyles = css`
  width: 100%;
  max-height: 100px;
`;

const dividerStyles = (withSpacer: boolean) => {
  const styles = css`
    border-bottom: 1px solid black;
  `;
  if (!withSpacer) return styles;

  return css`
    ${styles}
    margin-top: ${space[2]}px;
  `;
};

const Header: FunctionComponent<HeaderProps> = ({}) => {
  return (
    <header>
      <Container css={dividerStyles(false)}>
        <nav css={navStyles}>
          <a href="/">Latest</a>
          {/* <a href="#">Student Elections</a> */}
          {/* <a href="#">LGBTQ+</a> */}
          <a href="/art/hazel-laing">Featured illustrator</a>
          <a href="/archive">Archive</a>
          <a href="/about">About</a>
          <a style={{ color: colours.neutral[500] }} href="/old">
            Old site
          </a>
        </nav>
      </Container>
      <Container css={dividerStyles(false)}>
        <div css={mastheadStyles}>
          <div></div>
          <div
            css={css`
              position: relative;
            `}
          >
            <LinkArea href="/" />
            <Logo css={logoStyles} />
          </div>
        </div>
      </Container>
      <div css={dividerStyles(true)} />
      <div css={dividerStyles(true)} />
    </header>
  );
};

export default Header;
