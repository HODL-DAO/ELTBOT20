const CGApi = require('coingecko-api');
const CoinGecko = new CGApi();

const getTokenInfo = (tokenID, params=null) => {
    return async () => {
        await CGClient.coins.fetch(tokenID, {
            tickers: true, // true
            market_data: true, // true
            community_data: true, // true
            developer_data: true, // true
            localization: true, // true
            sparkline: false, // false
            ...params,
        })
        .then(async (res) => {
            console.log('getTokenInfo for ', tokenID, ' : ', res);
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

export default CoinGeckoClient;