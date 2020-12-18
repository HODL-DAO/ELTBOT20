import axios from "axios";
import { hodlrRanks } from '../utils';
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

    if (addrData.data) {
      let balElt = addrData.data.result / (10 ** 8);
      let addrRank = getAddrRank(balElt);

      let cachable = {
        raw: addrData.data,
        addrUrl: `https://etherscan.io/address/${addrStr}`,
        balance: addrData.data.result,
        rank: addrRank,
        balanceELT: balElt,
        balanceUSD: new Number(addrData.data.result * eltcoinInfo.priceInUSD).toFixed(2),
        airDropBonus: addrRank.bonus,
        hodlerBonus: `0.015 HODL (100% bonus) @ 100% ELT burned`,
        extra: {
          isCoreComm: (addrStr) => {
            return `<b>CORE COMMUNITY 🌓</b>`;
          },
          isInAirDrop: (addrStr) => {
            return '<b>ELT AIRDROP RECEIPIENT 😎</b>';
          }
        },
      }

      // const jsonRes = await addrData.json();
      CacheService.getCache()
        .set(addrStr, cachable);

      let currCahe = CacheService.getCache().get(addrStr);
      // console.log(' currCache ', currCahe)

      return currCahe;
    }

    throw new Error('Req Failed!! ');

  } catch (error) {
    console.error(error);
  }
}

const getAddrInfoHTML = (addrStr, data) => {

  let lines = {
    addr: `<b>Address:</b> <a href="${data.addrUrl}"><b>${addrStr}</b></a>`,
    balanceELT: `<b>Balance:</b> <code>${(data.balanceELT)} ELT</code> 😍`,
    balanceUSD: `<b>USD Value:</b> <code> ~$${data.balanceUSD} USD </code>`,
    hodlerBonus: `<b>Potential ELT BURN Bonus:</b> <code>${data.hodlerBonus}</code>🔥`,
    airDropBonus: `<b>ELTCOIN HODL-DAO AIRDROP Bonus:</b> <code>${data.airDropBonus}%</code> 🪂`,
    rank: `<b>Rank:</b> <code>${data.rank.title}</code>`,
    extra: `<pre>==Special Roles:==</pre> 
      ${data.extra.isCoreComm(addrStr)}
      ${data.extra.isInAirDrop(addrStr)}
    `,
  }

  return (
    `<pre>== OG HODLER PRIVATE HODLER REPORT ==</pre>    
    ${lines.addr} 
    ${lines.balanceELT} 
    ${lines.balanceUSD} 
    ${lines.hodlerBonus}
    ${lines.airDropBonus} 
    ${lines.rank} 
    ${lines.extra} 
    `)
};

const getAddrRank = (addrBalance) => {

  let bal = new Number(addrBalance).toFixed();

  // console.log(' ????************??????? ', bal > 20000, ' - ', bal < 500000)

  if (!bal || bal == 0) {
    return hodlrRanks[0];
  } else if (bal < 20000) {
    return hodlrRanks[1];
  } else if (bal < 150000) {
    return hodlrRanks[2];
  } else if (bal < 500000) {
    return hodlrRanks[3];
  } else if (bal >= 500000) {
    return hodlrRanks[4];
  }

};

export default {
  getAddressData: getAddrData,
  getAddressRank: getAddrRank,
  getAddrInfoHTML: getAddrInfoHTML,
};
