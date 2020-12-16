import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();
import { cacheUtils } from '../utils';

const getTokenInfo = async (tokenID, params = null) => {
    try {

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
                    cacheUtils.getCache().set(
                        tokenID,
                        res.data,
                        process.env.CACHE_INTERVAL
                    )

                    return cacheUtils.getCache().get(tokenID);
                })
                .catch(err => {
                    console.log('Error: ', err)
                });
        }

        return cacheUtils.getCache().get(tokenID);
    } catch (error) {
        console.error(error);
    }
}

export default {
    getTokenInfo,
}
