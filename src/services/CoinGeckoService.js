import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();
import { CACHE_KEYS, getCache } from '../utils';

let cache = getCache();
console.log(' #####@@@@@@@@@@@##### ');
console.dir(cache);


const getTokenInfo = async (tokenID, params = null) => {
    try {
        cache = getCache();
        console.log(' ########## ');
        console.dir(cache);

        let tokensCache = {};

        if (!tokensCache || !tokensCache[tokenID]) {
            await CoinGeckoClient.coins.fetch(tokenID, {
                tickers: true, // true
                market_data: true, // true
                community_data: true, // true
                developer_data: true, // true
                localization: true, // true
                sparkline: false, // false
                ...params,
            })
                .then(async (res) => {
                    console.log(' ########## cache.keys ');
                    // cache?.set(CACHE_KEYS.PRICE, price, env.CACHE_INTERVAL);
                    // console.dir(cache.get(CACHE_KEYS.TOKENS));
                    // console.dir(cache.keys());

                    // console.log(' ########## ');
                    // console.dir(res);

                    cache.set(
                        tokenID,
                        res.data,
                        process.env.CACHE_INTERVAL
                    )

                    return res.data;
                })
                .catch(err => {
                    console.log('Error: ', err)
                });
        }
    } catch (error) {
        console.error(error);
    }
}

export default {
    getTokenInfo,
}
