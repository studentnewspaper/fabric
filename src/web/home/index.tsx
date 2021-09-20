import { css } from "@emotion/react";
import { FunctionComponent } from "preact";
import { ArticleStub } from "../../gateway/wp";
import ArticleCell, { ArticleCellType } from "../components/ArticleCell";
import Block from "../components/Block";
import ClientGate from "../components/ClientGate";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { space } from "../design/theme";

export interface HomePageProps {
  fringeArticles: ArticleStub[] | null;
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
  featuredArticles,
  fringeArticles,
  sections,
}) => {
  return (
    <>
      <Header />
      <Container
        grid={1}
        css={css`
          margin: ${space[8]}px 0;
        `}
      >
        {/* <Block columns={6} title="Fringe Reviews" hasTop={false}>
          {fringeArticles == null && <p>Couldn't load fringe articles</p>}
          {fringeArticles != null && (
            <>
              {fringeArticles.map((article, i) => {
                const title = article.title.replace(" — Review", "");
                return (
                  <Wrapper key={article.slug} columns={1}>
                    <ArticleCell
                      imageUrl={article.imageUrl}
                      imageAlt={article.imageAlt}
                      title={title}
                      type={ArticleCellType.Compact}
                      link={`/article/${article.slug}`}
                    />
                  </Wrapper>
                );
              })}
            </>
          )}
        </Block> */}
        <Block columns={2} title="Princes Street Evacuated">
          <Wrapper columns={2}>
            <ArticleCell
              title="BREAKING: Bomb disposal unit attending at Princes Street"
              text="Swathes of Princes Street evacuated are being evacuated. Follow along as our news team bring you the latest."
              isLive
              link={`/live/princes-street-evacuated`}
              type={ArticleCellType.Default}
              clipText={false}
            />
          </Wrapper>
        </Block>
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
                      imageUrl={i == 0 || i > 2 ? article.imageUrl : undefined}
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
      </Container>
      <ClientGate>
        <Footer />
      </ClientGate>
    </>
  );
};

export default HomePage;
