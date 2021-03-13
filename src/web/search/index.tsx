import { FunctionComponent } from "preact";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Stats,
  InfiniteHits,
} from "react-instantsearch-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { css } from "@emotion/react";
import {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  space,
} from "../design/theme";
import { text } from "../design/palette";
import { useMemo } from "preact/hooks";
import { tinyRelative } from "../components/utils/date";
import LinkArea from "../components/LinkArea";
import { generateStyles, subtitleFont } from "../design/typography";

const searchClient = instantMeiliSearch(
  "https://search.studentnewspaper.org",
  "testingkey",
  {
    placeholderSearch: false,
  }
);

const HitComponent: FunctionComponent<{ hit: any }> = ({ hit }) => {
  const url = useMemo(() => {
    const [source, ...slug] = hit.id.split("-");

    if (source == "wp") {
      return `/article/${slug.join("-")}`;
    } else if (source == "live") {
      return `/live/${slug.join("-")}`;
    }
  }, [hit.id]);

  const type = useMemo(() => {
    if (url == null) return null;
    if (url.startsWith("/live")) return "Live update";
    if (url.startsWith("/article")) return "Article";
    return null;
  }, [url]);

  const dateText = useMemo(() => {
    return tinyRelative(new Date(hit.date));
  }, [hit.date]);

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {url != null && <LinkArea href={url} />}
      <p
        css={css`
          font-family: ${fonts.serif};
          font-weight: ${fontWeights.bold};
          line-height: ${lineHeights.base};
          font-size: 1.1rem;
        `}
      >
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </p>
      <p
        css={css`
          margin-top: ${space[2]}px;
          color: ${text.secondary};
          font-size: ${fontSizes.small}rem;
        `}
      >
        {type != null && type} &middot; {dateText} ago
      </p>
    </div>
  );
};

export interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = ({}) => {
  return (
    <>
      <Header />
      <Container
        css={css`
          margin: ${space[8]}px 0;
          font-family: ${fonts.sans};
        `}
      >
        <InstantSearch indexName="content" searchClient={searchClient}>
          <div
            css={css`
              font-size: ${fontSizes.small}rem;
              color: ${text.secondary};
              margin-bottom: ${space[3]}px;
            `}
          >
            <Stats />
          </div>
          <SearchBox autoFocus={true} />
          <div
            css={css`
              margin-top: ${space[3]}px;
            `}
          >
            <InfiniteHits hitComponent={HitComponent} />
          </div>
        </InstantSearch>
      </Container>
      <Footer />
    </>
  );
};

export default SearchPage;
