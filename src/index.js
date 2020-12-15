import dotenv from 'dotenv';
dotenv.config();

import Telegraf from "telegraf";
import { handlers } from "./handlers";
import mongoose from "mongoose";
import rateLimit from "telegraf-ratelimit";
import { attachUser } from "./middleware/attachUser";
import { CacheService } from './services';


// create cache
CacheService.createCacheInstance();
CacheService.updateCacheData();
// CacheService.cache;

let bot = {};
if (process.env.IS_PROD === true) {
  bot = new Telegraf(process.env.BOT_TOKEN_PROD)
} else {
  bot = new Telegraf(process.env.BOT_TOKEN_DEV)
}

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

// rate limit
bot.use(rateLimit(limitConfig));

//attach user
bot.use(attachUser);

// register all bot commands, actions, etc
handlers.stats.register(bot);

// register global error handler to prevent the bot from stopping after an exception
bot.catch((err, ctx) => {
  console.error(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.launch();

bot.hears('/price', async (ctx) => {

  console.dir(
    ctx.reply('🤔 checking...')
      .then((res) => {
        console.log(' res ', res)

        ctx.deleteMessage(res['message_id']);

        handlers.stats.printStats(ctx);
      })
  );
});

console.log("eltcoin_beta_bot started! ");

export default bot;
