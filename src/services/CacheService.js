import NodeCache from "node-cache";
import CoinGeckoService from "./CoinGeckoService";
import { getCache } from '../utils';

let cache = getCache();

const trackTokens = {
  'eltcoin': null,
};

async function hourlyChacheUpdate() {

  CoinGeckoService.getTokenInfo();

  setTimeout(async function () {
    await hourlyChacheUpdate();
  }, 3600 * 1000);
}

function updateCacheData() {
  try {
    Object.keys(trackTokens)
      .forEach((key) => {
        console.log(' .....####........ ', key)

        cache.set(
          key,
          CoinGeckoService.getTokenInfo(key),
          24 * 3600,
        );
        console.log(' .....####........ ', cache.keys())

      });
  } catch (error) {
    console.error(error);
  }
  // console.log(' ......????....... ', cache.get('eltcoin'))

}

export function createCacheInstance() {
  cache = new NodeCache({ stdTTL: 30 });
};

export default {
  cache,
  createCacheInstance,
  updateCacheData,
  hourlyChacheUpdate,
}