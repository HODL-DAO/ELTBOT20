import dotenv from 'dotenv';
dotenv.config();

import Telegraf from "telegraf";
import { handlers } from "./handlers";
import mongoose from "mongoose";
import rateLimit from "telegraf-ratelimit";
import { addressBadge, attachUser } from "./middleware";
import { AddressService, CacheService } from './services';

let bot = {};
if (process.env.IS_PROD === true) {
  bot = new Telegraf(process.env.BOT_TOKEN_PROD)
} else {
  bot = new Telegraf(process.env.BOT_TOKEN_DEV)
}

const newBotBirthTime = Date.now() / 1000; // seconds

// Set limit to 1 message per 30 seconds
const limitConfig = {
  window: 3000,
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

// attach user
bot.use(attachUser);
// address rank
// bot.use(addressBadge);


// register all bot commands, actions, etc
handlers.stats.register(bot);

// register global error handler to prevent the bot from stopping after an exception
bot.catch((err, ctx) => {
  console.error(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

/**
  TODO: this needs to move to middleware during 
  next refactoring; see attachUser for pattern
  make sure the default cache struct is in place
*/
CacheService.updateCacheData()
  .then((res) => {
    let getPriceHandler = () => {
      return bot.hears(/\/price/, (ctx) => {
        // discard old meassages 
        if (ctx.update.message.date < newBotBirthTime) return

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

    CacheService.getCache()
      .set(
        'priceCommandHandler',
        getPriceHandler()
      );
  })
  .then((res) => {

    return bot.hears(/^0x[a-fA-F0-9]{40}$/g, (ctx) => {
      return (async function () {
        let addrInfo = await AddressService.getAddressData(ctx.update.message.text);

        console.log(' index addrInfo ', addrInfo)

        ctx.replyWithHTML(addrInfo.rank)
          .then((res) => {
            console.log(' ???????????? ', res)
          });
      })();
    });
  })

bot.launch();
console.log("eltcoin_beta_bot started! ");

export default bot;
