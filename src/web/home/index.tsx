import { css } from "@emotion/react";
import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { LiveUpdateStub, getCellLiveUpdates } from "../../gateway/live";
import { ArticleStub } from "../../gateway/wp";
import ArticleCell, { ArticleCellType } from "../components/ArticleCell";
import Block from "../components/Block";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UpdatesCell from "../components/UpdatesCell";
import { space } from "../design/theme";

export interface HomePageProps {
  initialLiveElectionCell: {
    updates: LiveUpdateStub[] | null;
    updatedAt: string;
  };
  featuredArticles: ArticleStub[] | null;
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
  featuredArticles,
}) => {
  const [electionCellUpdates, setElectionCellUpdates] = useState(
    initialLiveElectionCell.updates
  );
  const [electionCellUpdatedAt, setElectionCellUpdatedAt] = useState(
    new Date(initialLiveElectionCell.updatedAt)
  );
  async function updateElectionCell() {
    const updates = await getCellLiveUpdates(`student-elections-2021`);
    const updatedAt = new Date();
    setElectionCellUpdatedAt(updatedAt);
    setElectionCellUpdates(updates);
    console.log(`Election cell updated at ${updatedAt.toString()}`);
  }

  useEffect(() => {
    if (typeof window == "undefined") return;
    // Update on first rehydration, then every 30s after (good for caching)
    updateElectionCell();
    const interval = setInterval(() => updateElectionCell(), 30 * 1000);
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
                updatedAt={electionCellUpdatedAt}
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
        <Block columns={4} title="Featured">
          {(featuredArticles == null || featuredArticles.length != 3) && (
            <p>Couldn't load featured articles</p>
          )}
          {featuredArticles != null && featuredArticles.length > 1 && (
            <>
              {featuredArticles.map((article, i) => (
                <Wrapper key={article.link} columns={i == 0 ? 2 : 1}>
                  <ArticleCell
                    title={article.title}
                    text={i != 0 ? article.text : undefined}
                    imageUrl={article.imageUrl}
                    imageAlt={article.imageAlt}
                    link={article.link}
                    type={
                      i == 0 ? ArticleCellType.Default : ArticleCellType.Compact
                    }
                  />
                </Wrapper>
              ))}
            </>
          )}
        </Block>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
