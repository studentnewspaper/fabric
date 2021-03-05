import { css } from "@emotion/react";
import { FunctionComponent, hydrate } from "preact";
import ArticleCell, { ArticleCellType } from "../components/ArticleCell";
import Block from "../components/Block";
import Container from "../components/Container";
import Header from "../components/Header";
import UpdatesCell from "../components/UpdatesCell";
import { space } from "../design/theme";

export interface HomePageProps {}

const Wrapper: FunctionComponent<{ columns: number; rows?: number }> = ({
  columns: cols,
  rows = 1,
  children,
}) => {
  return (
    <div
      style={{
        gridColumn: `auto / span ${cols}`,
        gridRow: `auto / span ${rows}`,
      }}
    >
      {children}
    </div>
  );
};

const HomePage: FunctionComponent<HomePageProps> = ({}) => {
  return (
    <>
      <Header />
      <Container grid={1}>
        <Block
          columns={6}
          rows={2}
          css={css`
            border-top: none;
            margin-top: ${space[6]}px;
          `}
        >
          <Wrapper columns={3} rows={2}>
            <ArticleCell
              title="Campaigning begins for Student Elections"
              subtitle="30 students are standing for five sabbatical positions"
              text="The elections provide an opportunity for students at the University of Edinburgh to pick the next generation of elected officials which will represent their views and concerns to the university. Voting opens <b>8th March</b>, and we'll be bringing you the latest all the way."
              isLive
            />
          </Wrapper>
          <Wrapper columns={1}>
            <ArticleCell
              title="Read the manifestos"
              text="All the candidates are on the EUSA site."
              type={ArticleCellType.Compact}
              link="https://www.eusa.ed.ac.uk/yourvoice/elections/march/vote/"
              newTab
            />
          </Wrapper>
          <Wrapper columns={2} rows={2}>
            <UpdatesCell
              updates={[
                {
                  timestamp: new Date(),
                  id: "0001",
                  text: "Need all the updates to go here haha",
                },
                {
                  timestamp: new Date(),
                  id: "0002",
                  text: "And another one",
                },
              ]}
            />
          </Wrapper>
          <Wrapper columns={1}>
            <ArticleCell
              title="Politics, breaking"
              text="It has never been more crucial that our voices are heard."
              link="/article/student-politics-is-dying-and-this-election-could-be-the-final-blow"
              type={ArticleCellType.Compact}
            />
          </Wrapper>
        </Block>
        <Block columns={6} title="Featured">
          <Wrapper columns={3}>
            <ArticleCell title="" />
          </Wrapper>
        </Block>
      </Container>
    </>
  );
};

export default HomePage;
