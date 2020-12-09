require('dotenv').config({path: __dirname + '/../.env'});
// console.log('.....>>>>>>>.....', process.env.BOT_TOKEN);
import Telegraf from "telegraf";

import { registerHandlers } from "./handlers";
import mongoose from "mongoose";
import rateLimit from "telegraf-ratelimit";
import { attachUser } from "./middleware/attachUser";
import { CoinGeckoClient } from "./services";
import { printStatsCommand } from './handlers/stats';

const bot = new Telegraf(process.env.BOT_TOKEN)

// Set limit to 1 message per 3 seconds
const limitConfig = {
  window: 60000,
  limit: 40,
  onLimitExceeded: (ctx) => ctx.reply("Rate limit exceeded"),
};

console.log("info", "Hello World from ELTBOT20");

// Connect to mongoose
mongoose.connect(
  process.env.MONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err.message);
      console.error(err);
    } else {
      console.log("Connected to MongoDB");
    }
  },
);

mongoose.set("useCreateIndex", true);

//rate limit
bot.use(rateLimit(limitConfig));

//attach user
bot.use(attachUser);

// register all bot commands, actions, etc
registerHandlers(bot);

// register global error handler to prevent the bot from stopping after an exception
bot.catch((err, ctx) => {
  console.error(`Ooops, encountered an error for ${ctx.updateType}`, err);
});


bot.launch();

bot.hears('/price', printStatsCommand);

console.log("eltcoin_beta_bot started! ");

export default bot;
