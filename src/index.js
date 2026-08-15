export default {
  async fetch(request) {
    // CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    const url = new URL(request.url);

    // Health check
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({
        status: "ok",
        chainId: 20488,
        chain: "Efikcoin Chain",
        gas: "EFC",
        founder: "0xC5AD5cfcF81AD63a94227334b898eafCe6B27cCA"
      }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // RPC endpoint
    if (url.pathname.includes("/rpc")) {
      try {
        const bodyText = await request.text();
        const body = JSON.parse(bodyText || "{}");

        // Return YOUR Chain ID 20488 = 0x5008
        if (body.method === "eth_chainId") {
          return new Response(JSON.stringify({
            jsonrpc: "2.0",
            id: body.id || 1,
            result: "0x5008"
          }), {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
        }

        // Proxy other calls to BSC
        const bscRes = await fetch("https://bsc-dataseed.binance.org/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: bodyText
        });
        const data = await bscRes.text();
        return new Response(data, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
    }

    // Homepage
    return new Response("Efikcoin Chain ID 20488 - EFC Gas - https://rpc.efikcoin.com/rpc", {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}
