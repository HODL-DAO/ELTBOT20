import coingeckoApi from 'coingecko-api';
import { CoinGeckoClient } from '../../components';

const TokenInfo = (ctx) => {
    // TODO: 
    // async get token info
    // store in some state
    // return a convenience wrapper around the token data

    CoinGeckoClient.getTockenInfo('bitcoin');

};

export default TokenInfo;