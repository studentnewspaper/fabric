import fetch from "cross-fetch";

export type LiveUpdateStub = {
  id: string;
  text: string;
  createdAt: string;
};

// TODO: This query has a hard limit of 4!
const stubQuery = `
query getCellLiveUpdates($liveSlug: String){
  items {
    live_events(filter: {slug:{_eq: $liveSlug}}, limit: 1) {
      updates(filter: {major_text: {_nnull: true}}, sort:["-published_at"], limit: 4) {
        id
        major_text
        published_at
      }
    }
  }
}
`;

type StubResponse = {
  data: {
    items: {
      live_events: {
        updates:
          | {
              id: string;
              major_text: string;
              published_at: string;
            }[]
          | null;
      }[];
    };
  };
};

const url = "https://bunker.studentnewspaper.org/graphql";

export async function getCellLiveUpdates(
  liveSlug: string
): Promise<LiveUpdateStub[] | null> {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ query: stubQuery, variables: { liveSlug } }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body: StubResponse = await response.json();
    if (response.status != 200 || body?.data == null) {
      throw new Error(
        `Error getting live event\n${JSON.stringify(body, null, 2)}`
      );
    }

    if (
      body?.data?.items?.live_events == null ||
      body?.data?.items?.live_events.length == 0
    ) {
      throw new Error(`Live event not found`);
    }
    const event = body.data.items.live_events[0];

    if (event.updates == null) return [];
    return event.updates.map((update) => ({
      id: update.id,
      text: update.major_text,
      createdAt: update.published_at,
    }));
  } catch (err) {
    // TODO: Catch error somewhere
    console.error(err);
    return null;
  }
}

export type LiveEvent = {
  title: string;
  updates: {
    id: string;
    body: string;
    author: { name: string; slug: string };
    createdAt: string;
  }[];
};

export const fullQuery = `query getLive($liveSlug: String) {
  items {
    live_events(filter: {slug: {_eq: $liveSlug}}, limit: 1) {
      title
      updates(filter:{status: {_eq: "published"}}, limit: 20) {
        id
        content
        published_at
        major_text
        author {
          name
          slug
        }
      }
    }
  }
}
`;

export type FullResponse = {
  data: {
    items: {
      live_events:
        | {
            title: string;
            updates:
              | {
                  id: string;
                  content: string;
                  published_at: string;
                  major_text: string | null;
                  author: {
                    name: string;
                    slug: string;
                  };
                }[]
              | null;
          }[]
        | null;
    };
  };
};

export async function getLiveEvent(
  liveSlug: string
): Promise<LiveEvent | null> {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ query: fullQuery, variables: { liveSlug } }),
      headers: { "Content-Type": "application/json" },
    });

    const body: FullResponse = await response.json();
    if (response.status != 200 || body?.data?.items == null) {
      throw new Error(
        `Error get live event (full)\n${JSON.stringify(body, null, 2)}`
      );
    }

    if (
      body.data.items.live_events == null ||
      body.data.items.live_events.length == 0
    ) {
      throw new Error(`Live event not found: ${liveSlug}`);
    }

    const event = body.data.items.live_events[0];
    const title = event.title;
    const updates = event.updates ?? [];

    return {
      title,
      updates: updates.map((update) => ({
        id: update.id,
        body: update.content,
        author: {
          name: update.author.name,
          slug: update.author.slug,
        },
        createdAt: update.published_at,
      })),
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
