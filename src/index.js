require('dotenv').config({path: __dirname + '/../.env'});
// console.log('.....>>>>>>>.....', process.env.BOT_TOKEN);

import Markup from "telegraf/markup";
import session from "telegraf/session";
import Stage from "telegraf/stage";
import Composer from "telegraf/composer";
import Router from "telegraf/router";
import { Telegraf } from 'telegraf';

const CoinGecko = require('coingecko-api');
const CGClient = new CoinGecko();


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('price', (ctx) => {
    console.log('............... ', CGClient)
    var func = async() => {
        let data = await CGClient.coins.fetchMarketChart('ethereum');

        console.log('.....?????? data...... ', data)

    };

    func();
});

bot.use(session())
// bot.use(stage.middleware())

export default bot;
// bot.launch()