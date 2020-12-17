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
    })
    // console.dir(addrData, { depth: 1 });
    if (addrData.data) {
      let cachable = {
        balance: addrData.data.result,
        rank: await getAddrInfoHTML(addrStr, addrData.data),
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
    rank: `Rank: <b>${getAddrRank(data.result)}</b>`,
    addr: `Address: <b>${addrStr}</b>`
  }

  return ` ${lines.rank} \n ${lines.addr} `
};

const getAddrRank = async (addrBalance) => {
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
