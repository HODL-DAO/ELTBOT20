import NodeCache from "node-cache";
import CoinGeckoService from "./";

let cache;

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
  console.log(' ............. ', trackTokens)
  try {
    Object.keys(trackTokens).forEach(async (key) => {
      cache.set(
        key,
        await CoinGeckoService.getTokenInfo(key),
        24 * 3600,
      );
    });
  } catch (error) {
    console.error(error);
  }
}

export function initCacheInstance() {
  cache = new NodeCache({ stdTTL: 30 });
  console.dir(cache)
};

export default {
  cache,
  initCacheInstance,
  updateCacheData,
  hourlyChacheUpdate,
}