import { CacheService } from "../services";

const getApiUri = (params) => {
  return `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${process.env.CONTRACT_ADDR}&address=${params.adrStr}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
};

// Get or create User
const getAddressData = async (addrStr) => {
  try {

    console.log('API KEY : ', process.env.ETHERSCAN_API)

    let addrData = await fetch(getApiUri(addrStr))

    if (addrData.ok) {
      const jsonRes = await addrData.json();

      console.dir(jsonRes)

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

// https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x44197a4c44d6a059297caf6be4f7e172bd56caaf&address=0x96fa4CBb4869eFdFEC0C97f1178CA02da4CFe084&tag=latest&apikey=AUI76EBSSTAZ3TYU12IRGDX8YY7U9U5RXR
