import Store from "node-cache";

type Getter<T> = (key: string) => Promise<T>;

export default class Cache<T> {
  private store: Store;
  private getter: Getter<T>;

  constructor(
    ttl: number,
    getter: (key: string) => Promise<T>,
    primeKeys: string[] = []
  ) {
    this.store = new Store({
      stdTTL: ttl,
      deleteOnExpire: false,
      checkperiod: Math.floor(ttl / 3),
    });

    this.store.on("expired", (key, value) => {
      // Don't call the expired event on this key for another minute while we load up new data
      console.log(`Updating key ${key}`);
      this.store.set(key, value, 60);
      getter(key).then(
        (data) => {
          this.store.set(key, data);
        },
        (err) => {
          this.store.del(key);
        }
      );
    });

    this.getter = getter;

    for (const key of primeKeys) {
      this.getter(key).then(
        (data) => {
          this.store.set(key, data);
          console.log(`Primed ${key}`);
        },
        (err) => {
          console.error(`Failed to prime ${key}`);
          console.error(err);
        }
      );
    }
  }

  async get(key: string): Promise<T | undefined> {
    const cachedValue = this.store.get<T>(key);
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    console.log(`Cache miss on ${key}`);
    const data = await this.getter(key);
    this.store.set(key, data);
    return data;
  }
}
