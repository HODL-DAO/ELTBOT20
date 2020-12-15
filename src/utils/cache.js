import NodeCache from "node-cache";
/**
 * NB: This is placed here to avoid circular deps
 * between services. Importing the singleton from here
 * allows CoinGeckoService to import cache without importing
 * CacheService that already requires it
 */
export let cache;

export function createCacheInstance() {
    cache = new NodeCache({ stdTTL: 30 });
};
