import dotenv from 'dotenv';
dotenv.config();

const http = require('http'); //loads the library to enable it to act as a server
var port = process.env.PORT || 5000; //specifies the port no to whatever heroku gives or 5000 on local host
http.createServer(function (req, res) { // creates a server
  res.writeHead(200, { 'Content-type': 'text/plain' }); //Specifies that the respones "hello" is a text
  res.end("hello"); //shows the text "hello" on th eweb page
}).listen(port); // attaches this server to the port no.

import Telegraf, { Extra, Markup } from "telegraf";
import { handlers } from "./handlers";
import mongoose from "mongoose";
import rateLimit from "telegraf-ratelimit";
import { attachUser } from "./middleware";
import {
  AddressService,
  CacheService
} from './services';

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

      bot.hears(/\/price/, async (ctx) => {
        // discard old meassages 
        if (ctx.update.message.date < newBotBirthTime) return

        let loadingMsg = await ctx.replyWithHTML('🤔 checking...');

        handlers.stats
          .getStatsMessage()
          .then(async (res) => {
            console.log('.....', res)

            let newText = await ctx.telegram.editMessageText(
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
