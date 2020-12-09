import registerMenu from "./menu";
import registerStats from "./stats";

import Telegraf from "telegraf";

export async function registerHandlers(
  bot,
) {
  //start command handler
  await registerMenu(bot);
  // price command
  await registerStats(bot);

  return bot;
}
