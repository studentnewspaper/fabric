import { css, PropsOf } from "@emotion/react";
import { bg, text } from "design/palette";
import { fonts, fontSizes, fontWeights, space } from "design/theme";
import { FunctionComponent } from "preact";
import {
  RiInstagramLine,
  RiFacebookBoxLine,
  RiLinkedinLine,
} from "react-icons/ri";

export interface FooterProps {}

const footerTitleStyles = css`
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.large};
`;

const footerSectionStyles = css`
  a {
    color: ${text.primary};
    display: black;
    text-decoration: none;
    display: block;
    margin-top: ${space[2]}px;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const dividerStyles = css`
  height: 1px;
  /* width: 60%; */
  background-color: ${bg.theme};
  margin-top: ${space[3]}px;
  margin-bottom: ${space[4]}px;
`;

const FooterSection: FunctionComponent<{ title: string } & PropsOf<"div">> = ({
  title,
  children,
  ...props
}) => {
  return (
    <div css={footerSectionStyles} {...props}>
      <div css={footerTitleStyles}>{title}</div>
      <div css={dividerStyles} />
      {children}
    </div>
  );
};

const containerStyles = css`
  font-family: ${fonts.sans};
  border-top: 1px solid black;
  padding: ${space[8]}px;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: ${space[6]}px;
  column-gap: ${space[9]}px;
`;

const socialsContainerStyles = css`
  grid-column: auto / span 3;
  font-size: ${fontSizes.huge}rem;
  display: flex;
  flex-direction: row;
  gap: ${space[8]}px;
  justify-content: center;

  a {
    color: ${text.secondary};
  }

  a:hover {
    color: ${text.theme};
  }
`;

const creditsStyles = css`
  grid-column: auto / span 3;
  color: ${text.secondary};
  text-align: center;

  p {
    margin-bottom: ${space[1]}px;
  }
`;

const Footer: FunctionComponent<FooterProps> = ({}) => {
  const sectionUrl = (section: string) => `/section/${section}`;

  return (
    <div css={containerStyles}>
      <FooterSection title="Sections">
        <a href={sectionUrl("news")}>News</a>
        <a href={sectionUrl("opinion")}>Opinion</a>
        <a href={sectionUrl("features")}>Features</a>
        <a href={sectionUrl("review")}>Review</a>
        <a href={sectionUrl("lifestyle")}>Lifestyle</a>
        <a href={sectionUrl("voices")}>Voices</a>
        <a href={sectionUrl("sport")}>Sport</a>
        <a href={sectionUrl("science")}>Science</a>
      </FooterSection>
      <FooterSection title="About us">
        <a href="/about">General</a>
        <a href="/archive">Archive</a>
        <a href="#">Print locations</a>
        {/* <a href="#">Shop</a> */}
      </FooterSection>
      <FooterSection title="Contact us">
        <a href="/get-involved">Get involved</a>
        <a href="https://complaints.studentnewspaper.org" target="__blank">
          Complaints
        </a>
        <a href="#">Advertising</a>
      </FooterSection>
      <div css={socialsContainerStyles}>
        <a href="https://www.instagram.com/studentnewspaper" target="__blank">
          <RiInstagramLine />
        </a>
        <a href="https://www.facebook.com/TheStudentNewspaper" target="__blank">
          <RiFacebookBoxLine />
        </a>
        <a
          href="https://www.linkedin.com/company/the-student-newspaper-"
          target="__blank"
        >
          <RiLinkedinLine />
        </a>
      </div>
      <div css={creditsStyles}>
        <p>© The Student {new Date().getFullYear()}</p>
        <p>Designed and developed by Nicholas Bush and Isabella Ronca</p>
      </div>
    </div>
  );
};

export default Footer;
