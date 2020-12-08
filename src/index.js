import Markup from "telegraf/markup";
import Router from "telegraf/router";
import Stage from "telegraf/stage";
import Scene from "telegraf/scenes/base";

import session from "telegraf/session";

import { Telegraf } from 'telegraf';

// create Stage
const { leave } = Stage;
const stage = new Stage();
// stage.command('cancel', stage.leave());

// Scenes
const greeterScene = new Scene('greeterScene')
greeterScene.enter((ctx) => ctx.reply('hi'))
greeterScene.leave((ctx) => ctx.reply('Mkey, bye.'))
greeterScene.hears(/hi/gi, leave())
greeterScene.on('message', (ctx) => ctx.reply('Send `hi`'))

console.log('........greeterScene..........', process.env.BOT_TOKEN);

// Scene registration
stage.register(greeterScene);

// Create the bot
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session())
console.log('..................');
console.log('The Bot incarnated: ', bot);
console.log('..................', greeterScene);

// stage and scenes
// bot.use(stage.middleware())
bot.command('greeterScene', (ctx) => ctx.scene.enter('greeterScene'));

bot.start((ctx) => {

});


export default bot;