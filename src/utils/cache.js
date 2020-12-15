import NodeCache from "node-cache";
/**
 * NB: This is placed here to avoid circular deps
 * between services. Importing the singleton from here
 * allows CoinGeckoClient to import cache without importing
 * CacheService that already requires it
 */
export let cache = null;

export function createCacheInstance() {
    cache = new NodeCache({ stdTTL: 30 });
    console.dir(cache)
};

