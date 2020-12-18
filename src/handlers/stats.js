import {
  CacheService,
  CoinGeckoService
} from "../services";

import { COMMANDS } from "../utils";

export async function getStatsMessage() {

  let info = CacheService.getCache().get('eltcoin');
  if (!info) info = await CoinGeckoService.getTokenInfo('eltcoin');

  let dateTime = new Date();

  return (
    `
      <b> 📈 <u>ELTCOIN PRICE DATA</u> 💸 </b>
      <b><code>${dateTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })} on ${dateTime.toLocaleDateString('en-US')} </code></b>
      <b>
        1 ELT / <code>฿</code> ${info.priceInSatoshi.toLocaleString("en-US")} Satoshi
        1 ELT / <code>Ξ</code> ${info.priceInETH.toLocaleString("en-US")} ETH
        1 ELT / <code>$</code> ${info.priceInUSD.toLocaleString("en-US")} USD  
      </b><b>
        Mkt Cap = $ ${info.marketCap.toLocaleString("en-US")}
        24h Vol = $ ${info.volInfo.toLocaleString("en-US")} 
      </b>
      \r\n
    `);
}

export async function printStatsCommand(ctx) {
  return ctx.replyWithHTML(getStatsMessage());
}

export default async function registerStats(bot) {
  // return bot.command(COMMANDS.STATS, printStatsCommand);
}
