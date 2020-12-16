import CoinGeckoService from "./CoinGeckoService";
import { cacheUtils } from "../utils";

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

  if (!cacheUtils.getCache()) {
    cacheUtils.setCache();
  }

  try {
    Object.keys(trackTokens)
      .forEach(async (key) => {
        console.log(
          cacheUtils.setCache(
            key,
            await CoinGeckoService.getTokenInfo(key),
            24 * 3600,
          )
        )
      });

  } catch (error) {
    console.error(error);
  }

}

export default {
  updateCacheData,
  hourlyChacheUpdate,
  ...cacheUtils,
}