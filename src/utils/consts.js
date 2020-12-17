export const COMMANDS = {
  "MENU": "menu",
  "STATS": "stats",
  "PRICE_ALERT": "alert",
  "MEMPOOL_ALERT": "alert_mempool",
  "TECHNICAL_ANALYSIS": "ta",
  "ADMIN": "admin",
  "LANG": "lang"
}

export const CACHE_KEYS = {
  "TOKENS": "tokens"
}

export const stickerRanks = [
  {
    sticker: "CAADBAADcAAD7sQtCFpEQo1nVeUdAg",
    emoji: "😭",
    title: "*Pauper*",
  },
  {
    sticker: "CAADBAADagAD7sQtCBrkjG8L05DqAg",
    emoji: "😍",
    title: "⭐️ *HOLDr*",
  },
  {
    sticker: "CAADBAADawAD7sQtCCej-8hD1pRrAg",
    emoji: "😍",
    title: "⭐️⭐️ OG *HODLr*",
  },
  {
    sticker: "CAADBAADbAAD7sQtCOrGC44gISGIAg",
    emoji: "🤑",
    title: "⭐️⭐️⭐️ OG *HODLr*",
  },
  {
    sticker: "CAADBAADbQAD7sQtCN5cCiXot0QYAg",
    emoji: "🤑",
    title: "*Pauper*",
  },
  {
    sticker: "CAADBAADbgAD7sQtCILn0seTLE4OAg",
    emoji: "💩",
    title: "*TurdRank*",
  },
  {
    sticker: "CAADBAADbwAD7sQtCKUzJ96MsVZ7Ag",
    emoji: "😭",
    title: "*Pauper*",
  },
]

export const getPriceInSatoshi = (val) => {
  let sat = Number(val.toFixed(8)).toLocaleString('en-EN', numberFormatOptions);
  return sat.replace(/0/g, '').replace(/./, '');
};

export const numberFormatOptions = {
  useGrouping: false, // boolean;
  minimumIntegerDigits: 1, // number;
  minimumFractionDigits: 8, // number;
  maximumFractionDigits: 18, // number;
}

