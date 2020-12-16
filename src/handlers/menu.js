import Telegraf, { Extra, Markup } from "telegraf";
import { COMMANDS } from "../utils";

export default async function registerMenu(bot) {
  //start commands prints the menu
  bot.start(printStatsMenu);
  bot.command(COMMANDS.MENU, printStatsMenu);
  bot.help(printStatsMenu);

  //register Alert Menu action
  bot.action("Alerts", switchToAlertMenu);
  //register Stats Menu action
  bot.command("Stats", switchToStatsMenu);

  // bot.command('price', switchToStatsMenu);
}

// TODO: handle this with proper locale
const say = {
  "MENU": `<b>Choose one of the commands on the menu or switch to another category using the buttons below the menu.</b>`,
  "STATS": `Stats`,
  "ALERTS": `Alerts`,
  "ALERT_MENU": `<strong>Alerts 🔔</strong><b>You can set an alert and we will send you a message when an alert is triggered.</b>
                  <i>📈 → Notify me when bitcoin price crosses a specified value </i>
                  <i>🏦 → Notify me when unconfirmed transactions are less than a specified value </i>`,

}

async function printStatsMenu(ctx) {
  return ctx.reply(
    say.MENU,
    Extra.HTML().markup((m) =>
      Markup.inlineKeyboard([
        m.callbackButton(`* ${say.STATS} *`, "Stats"),
        m.callbackButton(`${say.ALERTS}`, "Alerts"),
      ]),
    ),
  );
}

async function switchToAlertMenu(ctx) {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    say.ALERT_MENU,
    Extra.HTML().markup((m) =>
      Markup.inlineKeyboard([
        m.callbackButton(`${say.STATS}`, "Stats"),
        m.callbackButton(`* ${say.ALERTS} *`, "Alerts"),
      ]),
    ),
  );
}

async function switchToStatsMenu(ctx) {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    say.STATS_MENU,
    Extra.HTML().markup((m) =>
      Markup.inlineKeyboard([
        m.callbackButton(`* ${say.STATS} *`, "Stats"),
        m.callbackButton(`${say.ALERTS}`, "Alerts"),
      ]),
    ),
  );
}
