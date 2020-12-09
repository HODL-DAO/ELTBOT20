const CGApi = require('coingecko-api');
const CoinGecko = new CGApi();

const getTokenInfo = (tokenID, params=null) => {
    return async () => {
        await CoinGecko.coins.fetch(tokenID, {
            tickers: true, // true
            market_data: true, // true
            community_data: true, // true
            developer_data: true, // true
            localization: true, // true
            sparkline: false, // false
            ...params,
        })
        .then(async (res) => {
            console.dir(res, {depth: null});
            return res;
        })
        .catch(err => {
            console.log('Error: ', err)
        })
    }
}

const CoinGeckoClient = () => {

    return {
        getTokenInfo,
    }
}

export default new CoinGeckoClient();