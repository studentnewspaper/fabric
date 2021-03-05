export type CellLiveUpdate = {
  id: string;
  text: string;
  createdAt: Date;
};

export type LiveUpdate = {
  id: string;
  body: string;
  author: string;
  createdAt: Date;
};

async function getCellLiveUpdates(liveSlug: string): Promise<CellLiveUpdate[]> {
  return [];
}
