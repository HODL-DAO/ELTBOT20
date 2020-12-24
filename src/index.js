// import dotenv from 'dotenv';
// dotenv.config();
import Telegraf, { Extra, Markup } from "telegraf";
import { handlers } from "./handlers";
import mongoose from "mongoose";
import rateLimit from "telegraf-ratelimit";
import { attachUser } from "./middleware";
import {
  CacheService,
  AddressService
} from './services';


let bot = {};

// console.log('=========ENVIRONMENT=========')
// console.dir(process.env, {depth:1});
// console.log('=============================')
//isProd?
console.log('----------------------------------------')
console.log(`Production Mode? : ${process.env.isProd}`)
console.log('----------------------------------------')


var willQuit = false;
switch (process.env.isProd){
  case ('true'):
  console.log('=> Using PROD Telegram API KEY')
  bot = new Telegraf(process.env.PROD_TELEGRAM_API_KEY);  
  break;
  case ('false'):
  console.log('=> Using DEV Telegram API KEY')
  bot = new Telegraf(process.env.DEV_TELEGRAM_API_KEY);
  break;
  case (process.env.isProd === undefined):
  console.log('isProd flag not set key found in ENV!!!');
  willQuit = true;
  break;
  default:
    console.log('isProd flag not set key found in ENV!!!');
    willQuit = true;
  break;
}
if (willQuit) process.exit();


const newBotBirthTime = Date.now() / 1000; // seconds

var hammerTime = false;
// Set limit to 10 message per 1 second
const limitConfig = {
  window: 1000,
  limit: 2,
  onLimitExceeded: ( async (ctx) => {
    console.dir(ctx, {depth:null});
    var spamMessage = await ctx.reply("Stop Spamming The ELTBOT 🙃");
    console.dir(spamMessage,{depth:null});
    hammerTime = true;
    setTimeout ( () => {
      hammerTime = false;
    }, 100)
  }
  )
};
  
    
// rate limit
bot.use(rateLimit(limitConfig));

console.log("info", "ELTBOT20 - Here to assist you all the way through the transition to new self sovereign future we all dreamed of in 2017...");

// Connect to mongoose
console.log(process.env)
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
      console.log('MongoDB: [ERROR]');
      console.error(err);
    } else {
      console.log("MongoDB: [Connected]");
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

        let loadingMsg = await ctx.replyWithHTML('🤔 checking that...');
        

        handlers.stats.getStatsMessage()
        .then(async (statsMarkup) => { 
          //First send pic
          await ctx.replyWithPhoto(`https://pandoon-eltcoin.icorete.ch/markets/eltcoin/chart.png?ts=${Date.now().toString()}`)
          //Then Send Price Breakdown
          await ctx.replyWithHTML(
          statsMarkup,
            Extra.HTML().markup()
          )
        })
          await ctx.telegram.deleteMessage(loadingMsg.chat.id, loadingMsg['message_id'])
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
      let addrStr = ctx.update.message.text;
      let addrInfo = await AddressService.getAddressData(addrStr);

      console.log(' index addrInfo ', addrInfo)

      ctx.replyWithHTML(
        AddressService.getAddrInfoHTML(addrStr, addrInfo)
      )
    })();
  });
})

bot.launch();
console.log('\n');
console.log("===========================")
console.log("==== ELTBOT IS ONLINE! ====");
console.log(`========${process.env.isProd ?  ' DEV MODE =========' : ' PRODUCTION MODE ===='}`)
console.log("===========================")
console.log('\n')

export default bot;
