import dotenv from 'dotenv';
dotenv.config();

import Telegraf from "telegraf";
import { handlers } from "./handlers";
import mongoose from "mongoose";
import rateLimit from "telegraf-ratelimit";
import { attachUser } from "./middleware/attachUser";
import { CacheService } from './services';

let bot = {};
if (process.env.IS_PROD === true) {
  bot = new Telegraf(process.env.BOT_TOKEN_PROD)
} else {
  bot = new Telegraf(process.env.BOT_TOKEN_DEV)
}

const newBotBirthTime = Date.now() / 1000; // seconds

// Set limit to 1 message per 30 seconds
const limitConfig = {
  window: 30000,
  limit: 1,
  onLimitExceeded: (ctx) => ctx.reply("Rate limit exceeded"),
};
// rate limit
bot.use(rateLimit(limitConfig));

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
      console.error(err);
    } else {
      console.log("Connected to MongoDB");
    }
  },
);

mongoose.set("useCreateIndex", true);

//attach user
bot.use(attachUser);

// register all bot commands, actions, etc
handlers.stats.register(bot);

// register global error handler to prevent the bot from stopping after an exception
bot.catch((err, ctx) => {
  console.error(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

// make sure the default cache struct is in place
CacheService.updateCacheData()
  .then((res) => {

    let getPriceHandler = () => {
      console.log(" getPriceHandler ", res);

      return bot.hears(/\/price/, (ctx) => {

        if (ctx.update.message.date < newBotBirthTime) {
          return;
        }

        ctx.reply('🤔 checking...')
          .then((loadingMsg) => {
            handlers
              .stats
              .printStats(ctx)
              .then((res) => {
                ctx.deleteMessage(loadingMsg['message_id']);
              });
          })
      });
    };

    CacheService.getCache().set(
      'priceCommandHandler',
      getPriceHandler()
    );
  })

bot.launch();
console.log("eltcoin_beta_bot started! ");

export default bot;
