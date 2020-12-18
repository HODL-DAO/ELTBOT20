import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

import {
    cacheUtils,
    getPriceInSatoshi,
    numberFormatOptions,
} from '../utils';
import * as EthUnits from 'ethereumjs-units';

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
                    let priceInfo = res.data.tickers[0]['converted_last'];
                    // console.log(' res: ', res.data['market_data']['market_cap']['usd']);

                    // TODO: move this to factory 
                    cacheUtils.getCache().set(
                        tokenID,
                        {
                            raw: res.data,
                            priceInSatoshi: getPriceInSatoshi(priceInfo.btc),
                            // priceInBTC: Number(priceInfo.btc.toFixed(8)).toLocaleString('en-EN', numberFormatOptions),
                            // priceInWei: EthUnits.convert(priceInfo.eth.toFixed(18), 'eth', 'wei').toLocaleString('en-EN', numberFormatOptions),
                            priceInETH: Number(priceInfo.eth.toFixed(18)).toLocaleString('en-EN', numberFormatOptions),
                            priceInUSD: Number(priceInfo.usd.toFixed(8)).toLocaleString('en-EN', numberFormatOptions),
                            marketCap: res.data['market_data']['market_cap']['usd'],
                            volInfo: res.data.tickers[0]['converted_volume']['usd'],
                        },
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
