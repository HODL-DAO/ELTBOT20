import dotenv from 'dotenv';
dotenv.config();

import Telegraf, { Extra, Markup } from "telegraf";
import { handlers } from "./handlers";
import mongoose from "mongoose";
import rateLimit from "telegraf-ratelimit";
import { attachUser } from "./middleware";
import {
  CacheService
} from './services';
import wakeUpDyno from './utils/wakeUpDyno';

const express = require('express');
const expressApp = express();

const port = process.env.PORT || 3000
expressApp.get('https://eltbot20.herokuapp.com/', (req, res) => {
  res.send('Hello World!')
})
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`)
  wakeUpDyno(process.env.DYNO_URL)
})

let bot = {};
// if (process.env.IS_PROD === true) {
//   bot = new Telegraf(process.env.BOT_TOKEN_PROD)
// } else {
// }
bot = new Telegraf("393397340:AAHN43a40gSKoU6DByIASiMSRmhrloCuncU")

const newBotBirthTime = Date.now() / 1000; // seconds

let hammerTime = false;
// Set limit to 1 message per 30 seconds
const limitConfig = {
  window: 30000,
  limit: 1,
  onLimitExceeded: (ctx) => () => {
    if (!hammerTime) {
      ctx.reply("Rate limit exceeded")
      hammerTime = true;

      setTimeout(() => {
        hammerTime = false;
      },
        30000
      )
    }
  },
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
    useCreateIndex: true,
    autoIndex: false,
  },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Connected to MongoDB");
    }
  },
);

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

      bot.hears(/\/price/, async (ctx) => {
        // discard old meassages 
        if (ctx.update.message.date < newBotBirthTime) return

        let loadingMsg = await ctx.replyWithHTML('🤔 checking...');

        handlers.stats
          .getStatsMessage()
          .then(async (res) => {
            await ctx.telegram.editMessageText(
              loadingMsg.chat.id,
              loadingMsg['message_id'],
              loadingMsg['message_id'],
              res,
              Extra.HTML().markup()
            );
          })
      });
    };

    CacheService.getCache()
      .set(
        'priceCommandHandler',
        getPriceHandler()
      );
  })
// .then((res) => {
//   return bot.hears(/^0x[a-fA-F0-9]{40}$/g, (ctx) => {
//     return (async function () {
//       let addrStr = ctx.update.message.text;
//       let addrInfo = await AddressService.getAddressData(addrStr);

//       console.log(' index addrInfo ', addrInfo)

//       ctx.replyWithHTML(
//         AddressService.getAddrInfoHTML(addrStr, addrInfo)
//       )
//     })();
//   });
// })

bot.launch();
console.log("eltcoin_beta_bot started! ");

export default bot;
