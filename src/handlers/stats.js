import {
  CacheService,
  CoinGeckoService
} from "../services";

import { COMMANDS } from "../utils";

export async function getStatsMessage(md) {

  let info = CacheService.getCache().get('eltcoin');
  if (!info) info = await CoinGeckoService.getTokenInfo('eltcoin');

  let dateTime = new Date();

  return `
      <b> 📈 <u>ELTCOIN PRICE DATA</u> 💸 </b>
      
      <b><code>${dateTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })} on ${dateTime.toLocaleDateString('en-US')} </code></b>
      <b>
      <code>  1 ELT   /฿ ${info.priceInSatoshi.toLocaleString("en-US")} Satoshi </code>
      <code>  1 ELT   /Ξ ${info.priceInETH.toLocaleString("en-US")} ETH </code>
      <code>  1 ELT   /$ ${info.priceInUSD.toLocaleString("en-US")} USD </code>
      <code>  10k ELT /$ ${(info.priceInUSD * 10000).toLocaleString("en-US")} USD  [OG ELT AIRDROP]  </code>
      </b><b>
        Mkt Cap = $ ${info.marketCap.toLocaleString("en-US")}
        24h Vol = $ ${info.volInfo.toLocaleString("en-US")} 
      </b>
      \r\n
    `;
}

export async function printStatsCommand(ctx) {
  var retMessageCtx =  await ctx.replyWithHTML(getStatsMessage()) ;
  console.dir (retMessageCtx, {depth:null});
  return retMessageCtx
}

export default async function registerStats(bot) {
  // return bot.command(COMMANDS.STATS, printStatsCommand);
}
