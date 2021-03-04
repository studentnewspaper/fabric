import { css } from "@emotion/react";
import { text } from "design/palette";
import { fonts, letterSpacings, space } from "design/theme";
import { FunctionComponent } from "preact";
import Logo from "./Logo";

export interface HeaderProps {}

const navStyles = css`
  display: flex;
  flex-direction: row;
  gap: ${space[6]}px;
  padding: ${space[5]}px 0;
  border-bottom: 1px solid black;

  a {
    color: ${text.primary};
    font-family: ${fonts.sans};
    font-weight: bold;
    letter-spacing: ${letterSpacings.dense};
    text-decoration: none;

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
  border-bottom: 1px solid black;
`;

const logoStyles = css`
  height: 100px;
`;

const dividerStyles = css`
  margin-top: ${space[2]}px;
  border-bottom: 1px solid black;
`;

const Header: FunctionComponent<HeaderProps> = ({}) => {
  return (
    <header>
      <nav css={navStyles}>
        <a href="#">Latest</a>
        <a href="#">Student Elections</a>
        <a href="#">LGBTQ+</a>
        {/* <a href="#">Sections</a> */}
        <a href="#">About</a>
      </nav>
      <div css={mastheadStyles}>
        <div></div>
        <div css={logoStyles}>
          <Logo />
        </div>
      </div>
      <div css={dividerStyles} />
      <div css={dividerStyles} />
    </header>
  );
};

export default Header;
