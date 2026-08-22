export default {
  async fetch(request) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    };
    if (request.method === "OPTIONS") return new Response(null, {headers: cors});
    if (request.method === "GET") {
      return new Response(JSON.stringify({
        name: "Efikcoin Mainnet",
        chainId: 20488,
        shortName: "efc",
        chain: "Efikcoin",
        network: "mainnet",
        networkId: 20488,
        nativeCurrency: { name: "Efikcoin", symbol: "EFC", decimals: 18 },
        rpc: ["https://rpc.efikcoin.com/rpc"],
        faucets: [],
        explorers: [{ name: "Efikcoin Explorer", url: "https://explorer.efikcoin.com", standard: "EIP3091" }],
        infoURL: "https://efikcoin.com"
      }, null, 2), {headers: cors});
    }
    let b={}; try{b=await request.json()}catch(e){}
    let r="0x0"; if(b.method==="eth_chainId") r="0x5008"; if(b.method==="net_version") r="20488";
    return new Response(JSON.stringify({jsonrpc:"2.0", id:b.id||1, result:r}), {headers: cors});
  }
}
