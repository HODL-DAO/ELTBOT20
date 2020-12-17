import {
  CacheService,
  CoinGeckoService
} from "../services";

import { COMMANDS } from "../utils";

export async function printStatsCommand(ctx) {

  let info = CacheService.getCache().get('eltcoin');
  if (!info) info = await CoinGeckoService.getTokenInfo('eltcoin');

  const getHtmlString = () => {
    let dateTime = new Date();

    return (
      `
      <b> 📈 ELCOIN PRICE DATA 💸 </b>
      <b>${dateTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })} on ${dateTime.toLocaleDateString('en-US')} </b>
      <b>
        1 ELT / ฿ ${info.priceInSatoshi} Satoshi
        1 ELT / Ξ ${info.priceInETH} ETH
        1 ELT / $ ${info.priceInUSD} USD  
      </b><b>
        Mkt Cap = $ ${info.marketCap}
        24h Volume = $ ${info.volInfo} 
      </b>
      \r\n
      `);
  };

  return ctx.replyWithHTML(getHtmlString());
}

export default async function registerStats(bot) {
  return bot.command(COMMANDS.STATS, printStatsCommand);
}
