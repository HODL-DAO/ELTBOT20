import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();
import { CACHE_KEYS, cache } from '../utils';

const getTokenInfo = async (tokenID, params = null) => {
    try {
        let tokensCache = cache.get(CACHE_KEYS.TOKENS);

        console.log(' ########## ');
        console.dir(tokensCache);

        if (!tokensCache || !tokensCache[tokenID]) {
            if (!tokensCache) {
                tokensCache
            }
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
                    console.log(' ########## ');
                    console.dir(CACHE_KEYS.TOKENS);
                    console.log(' ########## ');
                    console.dir(res);

                    cache[CACHE_KEYS.TOKENS].set(
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
        if (!tokenInfo) {
            throw new Error(`failed to get info for ${tokenID}`);
        }
    } catch (error) {
        console.error(error);
    }
    return tokenInfo;
}

export const CoinGeckoService = () => {
    return {
        getTokenInfo,
    }
}

export default CoinGeckoService();