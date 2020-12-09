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
  // console.log('............... ', data);
  // TODO fix async await
  await data().then((res) => {
    ctx.replyWithMarkdown(foo.data.market_data)
  });
  // console.dir(data(), {depth: null});

});

bot.use(session())

export default bot;
