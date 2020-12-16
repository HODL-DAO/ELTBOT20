import NodeCache from "node-cache";
/**
 * NB: This is placed here to avoid circular deps
 * between services. Importing the singleton from here
 * allows CoinGeckoService to import cache without importing
 * CacheService that already requires it, for instance
 */
let cache;

export default {
    initCache: (args) => {
        if (args && cache) {
            return cache;
        }

        if (!cache) {
            return cache = new NodeCache();
        }
    },
    getCache: () => cache,
}