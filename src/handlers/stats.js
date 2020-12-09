import {
  CoinGeckoClient
} from "../services";

import { COMMANDS } from "../utils";

export async function printStatsCommand(ctx) {
  const info =  await CoinGeckoClient.getTokenInfo('eltcoin')
  const priceInfo = info.tickers[0]['converted_last'];

  console.log(priceInfo['usd'])

  const numberFormatOptions = {
    //  currency: null, // string;
    //  currencyDisplay: null, // string;
     useGrouping: false, // boolean;
     minimumIntegerDigits: 1, // number;
     minimumFractionDigits: 8, // number;
     maximumFractionDigits: 18, // number;
  }

  const priceInBTC = Number(priceInfo.btc.toFixed(8)).toLocaleString('en-EN', numberFormatOptions);
  const priceInETH = Number(priceInfo.eth.toFixed(18)).toLocaleString('en-EN', numberFormatOptions);
  const priceInUSD = Number(priceInfo.usd.toFixed(8)).toLocaleString('en-EN', numberFormatOptions);
  console.dir({
    data: {
      btc: priceInBTC,
      eth: priceInETH,
      usd: priceInUSD,
    },
  }, {depth: null});

  const htmlString = (params=[]) => {
    return `
      <b>Latest priece of ELT:</b>
      <i>~~~~~~~~~~~~~~~~~~~~</i>
      <b>1 ELT = ${params[0]} BTC</b>
      <b>1 ELT = ${params[1]} ETH</b>
      <b>1 ELT = ${params[2]} USD</b>
    `        
  };

  return ctx.replyWithHTML(
    htmlString([
      priceInBTC,
      priceInETH,
      priceInUSD
    ])
  );
}

export default async function registerStats(bot) {
  bot.command(COMMANDS.STATS, printStatsCommand);
}
  