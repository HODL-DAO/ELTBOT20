import {
  CoinGeckoClient
} from "../services";

import { COMMANDS } from "../utils";

export default async function registerStats(bot) {
  bot.command(COMMANDS.STATS, printStatsCommand);
}
  
// let data = await CoinGeckoClient.getTokenInfo('eltcoin');

async function printStatsCommand(ctx) {
  const priceInUSD = Number(
    (
      await CoinGeckoClient
      .getTokenInfo('eltcoin')
      .tickers
      .market['converted_last']
    ).toFixed(0),
  ).toLocaleString();

  console.log("running stat command");

  console.dir({
    data: {
      priceInUSD,
    },
  }, {depth: null});

  const htmlString = (params=[]) => {
    return `<b>🅑 $${params[0]} ${
        params[2] >= 0 ? `✅ +${params[2]}` : `🔻 ${params[2]}`
      }%        
    `        
  };

  return ctx.replyWithHTML(
    htmlString([
      priceInUSD,
    ]),
  );
}
