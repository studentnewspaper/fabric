import fetch from "cross-fetch";

export type CellLiveUpdate = {
  id: string;
  text: string;
  createdAt: string;
};

export type LiveUpdate = {
  id: string;
  body: string;
  author: string;
  createdAt: string;
};

const query = `
query getCellLiveUpdates($liveSlug: String){
  items {
    live_events(filter: {slug:{_eq: $liveSlug}}, limit: 1) {
      updates(filter: {major_text: {_nnull: true}}, sort:["-published_at"]) {
        id
        major_text
        published_at
      }
    }
  }
}
`;

type Response = {
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

export async function getCellLiveUpdates(
  liveSlug: string
): Promise<CellLiveUpdate[] | null> {
  try {
    const response = await fetch(
      "https://bunker.studentnewspaper.org/graphql",
      {
        method: "POST",
        body: JSON.stringify({ query, variables: { liveSlug } }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const body: Response = await response.json();
    if (response.status != 200)
      throw new Error(
        `Error getting live event\n${JSON.stringify(body, null, 2)}`
      );

    if (
      body?.data?.items?.live_events == null ||
      body?.data?.items?.live_events.length == 0
    )
      throw new Error(`Live event not found`);
    const event = body.data.items.live_events[0];

    if (event.updates == null) throw new Error(`Live event has no updates`);
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
