require('dotenv').config({path: __dirname + '/../.env'});
// console.log('.....>>>>>>>.....', process.env.BOT_TOKEN);

import Markup from "telegraf/markup";
import session from "telegraf/session";
import Stage from "telegraf/stage";
import Composer from "telegraf/composer";
import Router from "telegraf/router";
import { Telegraf } from 'telegraf';
import WizardScene from 'telegraf/scenes/wizard';

console.log('############## ', Markup.callbackButton)

const stepHandler = new Composer()
stepHandler.action('next', (ctx) => {
  ctx.reply('Step 2. Via inline button')
  return ctx.wizard.next()
})
stepHandler.command('next', (ctx) => {
  ctx.reply('Step 2. Via command')
  return ctx.wizard.next()
})
stepHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'))

const superWizard = new WizardScene('super-wizard',
  (ctx) => {
    ctx.reply('Step 1', Markup.inlineKeyboard([
      Markup.button('http://telegraf.js.org'),
      Markup.callbackButton('➡️ Next', 'next')
    ]))
    return ctx.wizard.next()
  },
  stepHandler,
  (ctx) => {
    ctx.reply('Step 3')
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.reply('Step 4')
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.reply('Done')
    return ctx.scene.leave()
  }
)

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage([superWizard], { default: 'super-wizard' })
bot.use(session())
bot.use(stage.middleware())

console.log('............... ', bot)
export default bot;
// bot.launch()