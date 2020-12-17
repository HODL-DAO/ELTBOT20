import axios from "axios";
import { stickerRanks } from '../utils';
import { CacheService } from "../services";

const getAddrData = async (addrStr) => {
  try {
    let addrData = await axios({
      baseURL: 'https://api.etherscan.io/api',
      params: {
        module: 'account',
        action: 'tokenbalance',
        contractaddress: process.env.CONTRACT_ADDR,
        address: addrStr,
        tag: 'latest',
        apikey: process.env.ETHERSCAN_API
      }
    });

    const eltcoinInfo = await CacheService.getCache().get('eltcoin');
    console.log(' eltcoinInfo ', eltcoinInfo.priceInUSD);
    if (addrData.data) {
      let cachable = {
        raw: addrData.data,
        balance: addrData.data.result,
        rank: getAddrRank(addrData.data.result),
        balanceELT: addrData.data.result / 10 ^ 8,
        balanceUSD: addrData.data.result * eltcoinInfo.priceInUSD,
        airDropBonus: null,
        hodlerBonus: null,
        extra: null,
      }

      // const jsonRes = await addrData.json();
      CacheService.getCache()
        .set(addrStr, cachable);

      let currCahe = CacheService.getCache().get(addrStr);
      console.log(' currCache ', currCahe)

      return currCahe;
    }

    throw new Error('Req Failed!! ');

  } catch (error) {
    console.error(error);
  }
}

const getAddrInfoHTML = (addrStr, data) => {

  let lines = {
    rank: `Rank: <b>${getAddrRank(data.balance)}</b>`,
    addr: `Address: <b>${addrStr}</b>`,
    balanceELT: `Balance: <b>${(data.balanceELT)} ELT </b>`,
    balanceUSD: `USD Value<b>~$${data.balanceUSD} USD </b>`,
    airDropBonus: `🪂 AirDrop Bonus: <b>${data.rankBonus}%</b>`,
    hodlerBonus: `Potential 🔥 BURN Bonus: <b>${data.hodlerBonus}</b>`,
    extra: `Special Roles: <b>CORE COMMUNITY 🌓 (${data.extra}%)</b>`,
  }

  return (
    ` 💰
    ${lines.rank} 
    ${lines.addr} 
    ${lines.balanceELT} 
    ${lines.balanceUSD} 
    ${lines.airDropBonus} 
    ${lines.hodlerBonus}
    ${lines.extra} 
    `)
};

const getAddrRank = (addrBalance) => {
  console.log(' getAddrRank addrBalance', addrBalance)
  console.dir(stickerRanks)

  return {

  }
};

export default {
  getAddressData: getAddrData,
  getAddressRank: getAddrRank,
  getAddrInfoHTML: getAddrInfoHTML,
};
