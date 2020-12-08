
import { 
  Markup,
  Router,
  Scene,
  Stage,
  Telegraf,

  session,
} from 'telegraf';

// create Stage
const { leave } = Stage;

// Scenes
const greeter = new Scene('greeter')
greeter.enter((ctx) => ctx.reply('hi'))
greeter.leave((ctx) => ctx.reply('Mkey, bye.'))
greeter.hears(/hi/gi, leave())
greeter.on('message', (ctx) => ctx.reply('Send `hi`'))


console.log('........greeter scene..........', greeter);

// scene manager
const stage = new Stage([imageScene, videoScene]);
stage.command('cancel', leave());

// Scene registration
stage.register(greeter);

// Create the bot
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session())
console.log('..................');
console.log('The Bot incarnated: ', bot);
console.log('..................', greeter);

// stage and scenes
bot.use(stage.middleware())
bot.command('greeter', (ctx) => ctx.scene.enter('greeter'));

bot.start((ctx) => {
  let userFirstName = ctx.message.from.first_name;
  let message = ` Is it you, ${userFirstName}, that summoned the BotGod!?`

  let options = Markup.inlineKeyboard([
        Markup.callbackButton('Extract from 🖼️', 'extractFromImage'),
        Markup.callbackButton('Extract from 🎬', 'extractFromVideo'),  ])
  .extra();
});


export default bot;