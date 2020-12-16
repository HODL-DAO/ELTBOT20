import { CoinGeckoService } from "../services";

import * as EthUnits from 'ethereumjs-units';

import { COMMANDS } from "../utils";


const numberFormatOptions = {
  useGrouping: false, // boolean;
  minimumIntegerDigits: 1, // number;
  minimumFractionDigits: 8, // number;
  maximumFractionDigits: 18, // number;
}

const getPriceInSatoshi = (val) => {
  let sat = Number(val.toFixed(8)).toLocaleString('en-EN', numberFormatOptions);
  return sat.replace(/0/g, '').replace(/./, '');
};

export async function printStatsCommand(ctx) {

  let info = await CoinGeckoService.getTokenInfo('eltcoin')

  const getHtmlString = (params) => {
    let dateTime = new Date();

    return (
      `
      <b> 📈 ELCOIN PRICE DATA 💸 </b>
      <b>${dateTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })} on ${dateTime.toLocaleDateString('en-US')} </b>
      <b>
        1 ELT / ฿ ${params[0]} Satoshi
        1 ELT / Ξ ${params[3]} ETH
        1 ELT / $ ${params[4]} USD  
      </b><b>
        Mkt Cap = $ ${params[5]}
        24h Volume = $ ${params[6]} 
      </b>
      \r\n
      `);
  };

  let priceInfo = info.tickers[0]['converted_last'];
  let marketCap = info['market_data']['market_cap'];
  let volumeInfo = info.tickers[0]['converted_volume'];

  // TODO: fix this
  // PuppeteerService.createHtmlDoc();

  // TODO: move this to factory 
  const priceInSatoshi = getPriceInSatoshi(priceInfo.btc);
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
    marketCap.usd,
    volumeInfo.usd,
  ];

  // console.dir(ctx, { depth: null });

  return ctx.replyWithHTML(getHtmlString(params));
}

export default async function registerStats(bot) {
  return bot.command(COMMANDS.STATS, printStatsCommand);
}
