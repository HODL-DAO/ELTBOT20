exchange.on('listPrices', async (ctx) => {
    await (fetch('https://api.idex.market/returnOrderBook', {
        method: 'POST',
        body: JSON.stringify({
            market: 'ETH_ELTCOIN'
        })
    }).then(async (res) => {
        res = await (res.json());

        let offersMarkup = Markup.inlineKeyboard([
            Markup.callbackButton('0', '0'),
        ], {
            columns: 2
        }).extra();
        offersMarkup.reply_markup.inline_keyboard.pop();
        for (var ask in res.asks) {
            var theAsk = res.asks[ask];
            var callbackText = 'buy:' + theAsk.price.toString();
            console.log(callbackText);
            offersMarkup.reply_markup.inline_keyboard.push([Markup.callbackButton(`Buy ${theAsk.amount} for: ${theAsk.price} ETH`, callbackText)]);
        }
        // console.log(offersMarkup);
        if ((res.asks) && (res.asks.length !== 0)) {
            await (ctx.reply('ok.', offersMarkup));
        } else {
            await (ctx.reply('No offers today 😥'));
        }
        // console.log(res);
    }).catch(err => {
        console.log('Error: ', err)
    }));
})
