import Markup from 'telegraf/markup';

const actions = {
    "LIST": {
        "PRICE": 'list_price',
    },
}

export default startKeyboardMarkup = Markup.inlineKeyboard([
    Markup.callbackButton('List Price', 'list_price'),
], {
    columns: 2
}).extra();

