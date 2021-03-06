import fetch from "cross-fetch";

export enum Category {
  Comment = 2,
  Culture = 3,
  Editorial = 108,
  Features = 4,
  Film = 8,
  Tv = 9,
  Podcast = 13306,
  Fringe = 11,
  Lifestyle = 5,
  Music = 7,
  News = 1,
  Science = 6,
  Sport = 10,
  Voices = 8385,
}

export const sectionDefinitions = {
  News: [Category.News],
  Opinion: [Category.Comment, Category.Editorial],
  Features: [Category.Features],
  Review: [
    Category.Culture,
    Category.Tv,
    Category.Film,
    Category.Music,
    Category.Fringe,
    Category.Podcast,
  ],
  Lifestyle: [Category.Lifestyle],
  Voices: [Category.Voices],
  Sport: [Category.Sport],
  Science: [Category.Science],
};

export const FEATURED_TAG = 12;

export type ArticleStub = {
  slug: string;
  title: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const articleStub = `
slug
title
excerpt
dateGmt
featuredImage {
  node {
    altText
    mediaDetails {
      file
      width
      height
    }
  }
}`;

type ArticleResponse = {
  slug: string;
  title: string;
  excerpt: string;
  dateGmt: string;
  featuredImage: {
    node: {
      altText: string;
      mediaDetails: {
        file: string;
        width: number;
        height: number;
      };
    } | null;
  } | null;
};

const featuredQuery = `query getArticlesByTags($n: Int!) {
  tag(id: 12, idType: DATABASE_ID) {
    posts(first: $n, where: { status: PUBLISH }) {
      nodes {
        ${articleStub}
      }
    }
  }
}`;

type FeaturedResponse = {
  data: {
    tag: {
      posts: {
        nodes: ArticleResponse[];
      };
    };
  };
};

const sectionQuery = `query getSectionArticleStubs($categories: [ID!]!) {
  categories(where: { termTaxonomId: $categories }, first: 100) {
    nodes {
      posts(first: 5, where: { status: PUBLISH }) {
        nodes {
          ${articleStub}
        }
      }
    }
  }
}`;

type SectionResponse = {
  data: {
    categories: {
      nodes:
        | {
            posts: {
              nodes: ArticleResponse[];
            };
          }[]
        | null;
    };
  };
};

const url = `https://cms.studentnewspaper.org/graphql`;

function createImageUrl(file: string): string {
  return `https://cms.studentnewspaper.org/wp-content/uploads/${file}`;
}

export async function getFeaturedArticles(
  n: number
): Promise<ArticleStub[] | null> {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ query: featuredQuery, variables: { n } }),
      headers: { "Content-Type": "application/json" },
    });

    const body: FeaturedResponse = await response.json();
    if (response.status != 200 || body?.data == null) {
      throw new Error(
        `Error getting featured articles\n${JSON.stringify(body, null, 2)}`
      );
    }

    if (body?.data?.tag?.posts?.nodes == null) {
      throw new Error(`No nodes in featured articles`);
    }

    const articles: ArticleStub[] = body.data.tag.posts.nodes.map((post) => {
      return {
        slug: post.slug,
        title: post.title,
        imageUrl:
          post.featuredImage?.node?.mediaDetails?.file != null
            ? // ? `https://i0.wp.com/cms.studentnewspaper.org/wp-content/uploads/${post.featuredImage?.node?.mediaDetails.file}?resize=800%2C800&ssl=1&ulb=true&strip=all`
              createImageUrl(post.featuredImage.node.mediaDetails.file)
            : undefined,
        imageAlt: post?.featuredImage?.node?.altText,
        text: post?.excerpt,
      };
    });

    return articles;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getSectionArticles(
  categories: Category[]
): Promise<ArticleStub[] | null> {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        query: sectionQuery,
        variables: { categories },
      }),
      headers: { "Content-Type": "application/json" },
    });

    const body: SectionResponse = await response.json();
    if (response.status != 200 || body?.data?.categories?.nodes == null) {
      throw new Error(
        `Error getting section articles\n${JSON.stringify(body, null, 2)}`
      );
    }

    const articles = body.data.categories.nodes.flatMap(
      (category) => category.posts.nodes
    );
    const articleDates: { [slug: string]: Date } = Object.fromEntries(
      articles.map((article) => [article.slug, new Date(article.dateGmt)])
    );
    const dedupedKeys = [...new Set(Object.keys(articleDates))];
    const orderedKeys = dedupedKeys.sort(
      (a, b) => articleDates[a].valueOf() - articleDates[b].valueOf()
    );

    return orderedKeys
      .map((key) => articles.find((article) => article.slug == key))
      .map((article) => {
        if (article == null) {
          throw new Error("Illegal state");
        }
        return {
          slug: article.slug,
          title: article.title,
          text: article.excerpt,
          imageUrl: article.featuredImage?.node?.mediaDetails.file
            ? createImageUrl(article.featuredImage?.node?.mediaDetails.file)
            : undefined,
          imageAlt: article.featuredImage?.node?.altText,
        };
      });
  } catch (err) {
    console.error(err);
    return null;
  }
}
