import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

const getTokenInfo = async (tokenID, params = null) => {
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
            // console.dir(res.data.tickers, {depth: null});
            return res.data;
        })
        .catch(err => {
            console.log('Error: ', err)
        })
}

const CoinGeckoService = () => {
    return {
        getTokenInfo,
    }
}

export default CoinGeckoService();
