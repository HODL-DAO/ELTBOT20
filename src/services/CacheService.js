import CoinGeckoService from "./CoinGeckoService";
import { cacheUtils } from "../utils";
import { CacheService } from ".";

const trackTokens = {
  'eltcoin': null,
};

async function hourlyChacheUpdate() {

  CoinGeckoService.getTokenInfo();

  setTimeout(async function () {
    await hourlyChacheUpdate();
  }, 3600 * 1000);
}

// TODO: Refactor this
async function updateCacheData() {

  if (!cacheUtils.getCache()) {
    cacheUtils.initCache();
  }

  try {
    Object.keys(trackTokens)
      .forEach(async (key) => {
        cacheUtils.getCache().set(
          key,
          await CoinGeckoService.getTokenInfo(key)
        )
      });

    console.log(' cache keys ', CacheService.getCache().keys())
  } catch (error) {
    console.error(error);
  }

}

export default {
  updateCacheData,
  hourlyChacheUpdate,
  ...cacheUtils,
}