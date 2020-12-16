import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();
import { cache } from '../utils';

// console.log(' #####@@@@@@@@@@@##### ');
// console.dir(cache);


const getTokenInfo = async (tokenID, params = null) => {
    try {
        // console.dir(cache);

        let tokensCache = {};

        if (!tokensCache || !tokensCache[tokenID]) {
            return await CoinGeckoClient.coins.fetch(tokenID, {
                tickers: true, // true
                market_data: true, // true
                community_data: true, // true
                developer_data: true, // true
                localization: true, // true
                sparkline: false, // false
                ...params,
            })
                .then(async (res) => {
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
                    // console.log(' ########## cache.keys ', cache.get('eltcoin'));

                    return cache.get(tokenID);
                })
                .catch(err => {
                    console.log('Error: ', err)
                });
        }

        return cache.get(tokenID);
    } catch (error) {
        console.error(error);
    }
}

export default {
    getTokenInfo,
}
