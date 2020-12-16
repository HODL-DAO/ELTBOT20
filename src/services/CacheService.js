import NodeCache from "node-cache";
import CoinGeckoService from "./CoinGeckoService";
import { createCacheInstance, cache } from '../utils';

const trackTokens = {
  'eltcoin': null,
};

async function hourlyChacheUpdate() {

  CoinGeckoService.getTokenInfo();

  setTimeout(async function () {
    await hourlyChacheUpdate();
  }, 3600 * 1000);
}

async function updateCacheData() {

  if (!cache) {
    // create cache
    createCacheInstance();
    console.log(' createCacheInstance cache ', cache)
  }

  try {
    Object.keys(trackTokens)
      .forEach(async (key) => {
        cache.set(
          key,
          await CoinGeckoService.getTokenInfo(key),
          24 * 3600,
        );
      });

    return cache;
  } catch (error) {
    console.error(error);
  }

}

export default {
  cache,
  createCacheInstance,
  updateCacheData,
  hourlyChacheUpdate,
}