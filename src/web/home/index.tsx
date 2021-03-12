import { css } from "@emotion/react";
import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { LiveUpdateStub, getCellLiveUpdates } from "../../gateway/live";
import { ArticleStub } from "../../gateway/wp";
import ArticleCell, { ArticleCellType } from "../components/ArticleCell";
import Block from "../components/Block";
import ClientGate from "../components/ClientGate";
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
  interviews: {
    name: string;
    slug: string;
    imageUrl: string;
  }[];
  featuredArticles: ArticleStub[] | null;
  sections: { title: string; articles: ArticleStub[] }[];
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
  sections,
  interviews,
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
  }

  useEffect(() => {
    if (typeof window == "undefined") return;
    // Update on first rehydration, then every 30s after (good for caching)
    updateElectionCell();
    const interval = setInterval(() => updateElectionCell(), 120 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <Container
        grid={1}
        css={css`
          margin: ${space[8]}px 0;
        `}
      >
        <Block columns={6} hasTop={false}>
          <Wrapper columns={3}>
            <ArticleCell
              title="Results Night live coverage"
              subtitle="Live news and analysis from our elections team"
              text="The elections provide an opportunity for students at the University of Edinburgh to pick the next generation of elected officials who will represent their views and concerns to the university. Results Night begins at <b>6pm today</b>."
              isLive
              link="/live/student-elections-2021"
              clipText={false}
            />
          </Wrapper>
          <Wrapper columns={1}>
            <ArticleCell
              title="Read the manifestos"
              text="You can find all the candidates standing for election on the EUSA site. See what they've pledged in their manifestos."
              type={ArticleCellType.Compact}
              link="https://www.eusa.ed.ac.uk/yourvoice/elections/march/vote/"
              newTab
              clipText={false}
            />
          </Wrapper>
          <Wrapper columns={2}>
            {electionCellUpdates != null && (
              <UpdatesCell
                updates={electionCellUpdates.map((update) => ({
                  id: update.id,
                  text: update.text,
                  timestamp: new Date(update.createdAt),
                  link: `/live/student-elections-2021#${update.id}`,
                }))}
                updatedAt={electionCellUpdatedAt}
                updateFrequency="2m"
              />
            )}
            {electionCellUpdates == null && <p>Problem loading updates</p>}
          </Wrapper>
        </Block>
        {/* <Block columns={5} title="Presidential candidate interviews">
          {interviews != null &&
            interviews.map((interview) => {
              return (
                <Wrapper columns={1}>
                  <ArticleCell
                    title={interview.name}
                    imageUrl={interview.imageUrl}
                    imageAlt=""
                    link={`/article/${interview.slug}`}
                    type={ArticleCellType.Compact}
                  />
                </Wrapper>
              );
            })}
        </Block> */}
        <Block columns={4} title="Our picks">
          {(featuredArticles == null || featuredArticles.length != 3) && (
            <p>Couldn't load featured articles</p>
          )}
          {featuredArticles != null && featuredArticles.length > 1 && (
            <>
              {featuredArticles.map((article, i) => (
                <Wrapper key={article.slug} columns={i == 0 ? 2 : 1}>
                  <ArticleCell
                    title={article.title}
                    text={i != 0 ? article.text : undefined}
                    imageUrl={article.imageUrl}
                    imageAlt={article.imageAlt}
                    link={`/article/${article.slug}`}
                    type={
                      i == 0 ? ArticleCellType.Default : ArticleCellType.Compact
                    }
                  />
                </Wrapper>
              ))}
            </>
          )}
        </Block>
        <ClientGate>
          {sections.map(({ title, articles }) => {
            return (
              <Block
                key={title}
                title={title}
                titleLink={`/section/${title.toLowerCase()}`}
                columns={4}
                rows={2}
              >
                {articles.map((article, i) => {
                  return (
                    <Wrapper
                      columns={i == 0 ? 2 : 1}
                      rows={i == 0 ? 2 : 1}
                      key={article.slug}
                    >
                      <ArticleCell
                        title={article.title}
                        imageUrl={
                          i == 0 || i > 2 ? article.imageUrl : undefined
                        }
                        imageAlt={article.imageAlt}
                        text={i < 3 ? article.text : undefined}
                        link={`/article/${article.slug}`}
                        type={
                          i == 0
                            ? ArticleCellType.Default
                            : ArticleCellType.Compact
                        }
                      />
                    </Wrapper>
                  );
                })}
              </Block>
            );
          })}
        </ClientGate>
      </Container>
      <ClientGate>
        <Footer />
      </ClientGate>
    </>
  );
};

export default HomePage;
