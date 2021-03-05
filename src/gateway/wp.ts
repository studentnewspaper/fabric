import fetch from "cross-fetch";

export const FEATURED_TAG = 12;

export type ArticleStub = {
  title: string;
  subtitle?: string;
  text?: string;
  link?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const imagePartial = `featuredImage {
  node {
    altText
    mediaDetails {
      file
      width
      height
    }
  }
}`;

const query = `query getArticlesByTags($n: Int!) {
  tag(id: 12, idType: DATABASE_ID) {
    posts(first: $n, where: { status: PUBLISH }) {
      nodes {
        slug
        title
        excerpt
        ${imagePartial}
      }
    }
  }
}`;

type Response = {
  data: {
    tag: {
      posts: {
        nodes: {
          slug: string;
          title: string;
          excerpt: string;
          featuredImage?: {
            node?: {
              altText: string;
              mediaDetails: {
                file: string;
                width: number;
                height: number;
              };
            };
          };
        }[];
      };
    };
  };
};

export async function getFeaturedArticles(
  n: number
): Promise<ArticleStub[] | null> {
  try {
    const response = await fetch(`https://cms.studentnewspaper.org/graphql`, {
      method: "POST",
      body: JSON.stringify({ query, variables: { n } }),
      headers: { "Content-Type": "application/json" },
    });

    const body: Response = await response.json();
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
        title: post.title,
        link: `/article/${post.slug}`,
        imageUrl:
          post.featuredImage?.node?.mediaDetails?.file != null
            ? // ? `https://i0.wp.com/cms.studentnewspaper.org/wp-content/uploads/${post.featuredImage?.node?.mediaDetails.file}?resize=800%2C800&ssl=1&ulb=true&strip=all`
              `https://cms.studentnewspaper.org/wp-content/uploads/${post.featuredImage.node.mediaDetails.file}`
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
