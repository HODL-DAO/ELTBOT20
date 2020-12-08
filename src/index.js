require('dotenv').config({path: __dirname + '/../.env'});
// console.log('.....>>>>>>>.....', process.env.BOT_TOKEN);

import Markup from "telegraf/markup";
import session from "telegraf/session";
import Stage from "telegraf/stage";
import Composer from "telegraf/composer";
import Router from "telegraf/router";
import { Telegraf } from 'telegraf';

import { listPrices } from './utils';

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('price', (ctx) => {
    
    let prices = listPrices(ctx)('ethereum');
    
    console.log('............... ', prices)
});

bot.use(session())
// bot.use(stage.middleware())

export default bot;
// bot.launch()