export default {
  async fetch(request) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    };
    if (request.method === "OPTIONS") return new Response(null, {headers: cors});

    // GET https://rpc.efikcoin.com → Return CHAIN DATA JSON (so Chainlist can see)
    if (request.method === "GET") {
      const chainData = {
        name: "Efikcoin Mainnet",
        chainId: 20488,
        shortName: "efik",
        chain: "Efikcoin",
        network: "mainnet",
        networkId: 20488,
        nativeCurrency: { name: "Efikcoin", symbol: "EFC", decimals: 18 },
        rpc: ["https://rpc.efikcoin.com/rpc", "https://rpc.efikcoin.com"],
        faucets: [],
        explorers: [{ name: "Efikcoin Explorer", url: "https://explorer.efikcoin.com", standard: "EIP3091" }],
        infoURL: "https://efikcoin.com",
        status: "live"
      };
      return new Response(JSON.stringify(chainData, null, 2), {headers: cors});
    }

    // POST https://rpc.efikcoin.com/rpc → Return RPC JSON (for MetaMask)
    let body = {};
    try { body = await request.json(); } catch(e){}
    const id = body.id || 1;
    let result = "0x0";
    const m = body.method;
    if (m === "eth_chainId") result = "0x5008";
    if (m === "net_version") result = "20488";
    if (m === "eth_blockNumber") result = "0x1";
    if (m === "eth_gasPrice") result = "0x3B9ACA00";
    if (m === "eth_getBlockByNumber") result = { number: "0x1", hash: "0x0", parentHash: "0x0", timestamp: "0x65000000" };

    return new Response(JSON.stringify({jsonrpc:"2.0", id, result}), {headers: cors});
  }
}
