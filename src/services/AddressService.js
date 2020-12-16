import axios from "axios";
import { CacheService } from "../services";

const getAddressData = async (addrStr) => {
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

    console.log(' ;;;;;;;;;;;; ');
    console.dir(addrData);

    if (addrData.ok) {
      const jsonRes = await addrData.json();


      let knownAddresses = CacheService.getCache().set(['known_addresses']);
      knownAddresses.set([addrStr], jsonRes)

      console.log(' %%%%%%%%% ', CacheService.getCache().keys())
    }
  } catch (error) {
    console.error(error);
  }
}

export default {
  getAddressData
};
