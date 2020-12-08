
const CoinGecko = require('coingecko-api');
const CGClient = new CoinGecko();


export default (ctx) => {

    return async (coinIDs) => {
        await CGClient.coins.fetchMarketChart(coinIDs)
        .then(async (res) => {
            // res = await (res.json());
            console.log(res);

            // let offersMarkup = Markup.inlineKeyboard([
            //     Markup.callbackButton('0', '0'),
            // ], {
            //     columns: 2
            // }).extra();
            // offersMarkup.reply_markup.inline_keyboard.pop();
            // for (var ask in res.asks) {
            //     var theAsk = res.asks[ask];
            //     var callbackText = 'buy:' + theAsk.price.toString();
            //     console.log(callbackText);
            //     offersMarkup.reply_markup.inline_keyboard.push([Markup.callbackButton(`Buy ${theAsk.amount} for: ${theAsk.price} ETH`, callbackText)]);
            // }
            // // console.log(offersMarkup);
            // if ((res.asks) && (res.asks.length !== 0)) {
            //     await (ctx.reply('ok.', offersMarkup));
            // } else {
            //     await (ctx.reply('No offers today 😥'));
            // }
            // console.log(res);
        }).catch(err => {
            console.log('Error: ', err)
        })
    }

    // return func();

};
