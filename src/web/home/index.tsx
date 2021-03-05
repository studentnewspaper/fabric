import { css } from "@emotion/react";
import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { CellLiveUpdate, getCellLiveUpdates } from "../../gateway/live";
import ArticleCell, { ArticleCellType } from "../components/ArticleCell";
import Block from "../components/Block";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UpdatesCell from "../components/UpdatesCell";
import { space } from "../design/theme";

export interface HomePageProps {
  initialLiveElectionCell: {
    updates: CellLiveUpdate[] | null;
    updatedAt: string;
  };
}

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

const HomePage: FunctionComponent<HomePageProps> = ({
  initialLiveElectionCell,
}) => {
  const [electionCellUpdates, setElectionCellUpdates] = useState(
    initialLiveElectionCell.updates
  );
  useEffect(() => {
    const interval = setInterval(() => {
      getCellLiveUpdates(`student-elections-2021`).then((updates) => {
        // TODO: Query for delta updates
        if (updates != null) {
          console.log("Updated election live");
          setElectionCellUpdates(updates);
        }
      });
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

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
            {electionCellUpdates != null && (
              <UpdatesCell
                updates={electionCellUpdates.map((update) => ({
                  id: update.id,
                  text: update.text,
                  timestamp: new Date(update.createdAt),
                  link: `/live/student-elections-2021#${update.id}`,
                }))}
              />
            )}
            {electionCellUpdates == null && <p>Problem loading updates</p>}
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
      <Footer />
    </>
  );
};

export default HomePage;
