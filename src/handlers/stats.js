import {
  CoinGeckoClient
} from "../services";

import * as EthUnits from 'ethereumjs-units';

import { COMMANDS } from "../utils";

export async function printStatsCommand(ctx) {
  const info = await CoinGeckoClient.getTokenInfo('eltcoin')
  const priceInfo = info.tickers[0]['converted_last'];
  const volumeInfo = info.tickers[0]['converted_volume'];
  const marketCap = info['market_data']['market_cap'];

  // console.dir(marketCap.usd)

  const numberFormatOptions = {
    //  currency: null, // string;
    //  currencyDisplay: null, // string;
    useGrouping: false, // boolean;
    minimumIntegerDigits: 1, // number;
    minimumFractionDigits: 8, // number;
    maximumFractionDigits: 18, // number;
  }


  const htmlString = (params = []) => {
    return (
      `
      <b> PRICE 💸 </b>
      <i> \r\n </i>
      <b>1 ELT = ฿ ${params[0]} Satoshi  </b>
      <b>1 ELT = ฿ ${params[1]} BTC  </b>
      <b>1 ELT = ♦️ ${params[2]} Wei  </b>
      <b>1 ELT = ♦️ ${params[3]} ETH  </b>
      <b>1 ELT = $ ${params[4]} USD  </b>
      <b>Mkt Cap = $ ${params[5]} </b>
      <b>24h Volume = $ ${params[6]} </b>
    `);
  };

  // TODO: move this to factory 
  const priceInSatoshi = Number((priceInfo.btc * 10 ^ 8).toFixed(8)).toLocaleString('en-EN', numberFormatOptions);
  const priceInBTC = Number(priceInfo.btc.toFixed(8)).toLocaleString('en-EN', numberFormatOptions);
  const priceInWei = EthUnits.convert(priceInfo.eth.toFixed(18), 'eth', 'wei').toLocaleString('en-EN', numberFormatOptions);
  const priceInETH = Number(priceInfo.eth.toFixed(18)).toLocaleString('en-EN', numberFormatOptions);
  const priceInUSD = Number(priceInfo.usd.toFixed(8)).toLocaleString('en-EN', numberFormatOptions);

  var params = [
    priceInSatoshi,
    priceInBTC,
    priceInWei,
    priceInETH,
    priceInUSD,
    volumeInfo.usd,
    marketCap.usd,
  ];

  console.dir(params, { depth: null });

  return ctx.replyWithHTML(
    htmlString(params)
  );
}

export default async function registerStats(bot) {
  bot.command(COMMANDS.STATS, printStatsCommand);
}
