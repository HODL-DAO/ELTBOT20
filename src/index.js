require('dotenv').config({path: __dirname + '/../.env'});
// console.log('.....>>>>>>>.....', process.env.BOT_TOKEN);

import Telegraf, {
  session,
} from 'telegraf';

import {
  CoinGeckoClient,
} from './services';

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('price', async (ctx) => {
  let data = await CoinGeckoClient.getTokenInfo('eltcoin');
  // console.log('............... ', data.tickers);

  ctx.replyWithMarkdown(data.tickers)

});

bot.use(session())

export default bot;
