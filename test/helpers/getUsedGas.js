const fetch = require('node-fetch');

let gasPrice = 2 * Math.pow(10, 9); // 2 GWei
let ethToUsdRate = 200; // 1 ETH = $200

module.exports = {
    init: async () => {
        const gasPriceResponse = await (await fetch('https://ethgasstation.info/json/ethgasAPI.json')).json()
        gasPrice = (gasPriceResponse.average <= 800 ? gasPriceResponse.average : 800) * Math.pow(10, 8);
        const ethToUsdResponse = await (await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum')).json()
        ethToUsdRate = ethToUsdResponse[0].current_price
    },
    getUsedGas: (tx) => `${ tx.receipt.gasUsed } gas (~$${
        Math.round(tx.receipt.gasUsed * gasPrice / Math.pow(10, 18) * ethToUsdRate * 10000) / 10000
    }, ${ ethToUsdRate } USD/ETH, ${gasPrice / Math.pow(10, 9)} Gas Price in Gwei)`,
    gasPrice: gasPrice,
    ethToUsdRate: ethToUsdRate
}
