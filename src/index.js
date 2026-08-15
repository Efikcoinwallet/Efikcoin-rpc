export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);

      if (url.pathname === "/health") {
        return new Response(
          JSON.stringify({ chainId: 20488, name: "Efikcoin Chain", symbol: "EFC", gas: "EFC", founder: "0xC5AD5cfcF81AD63a94227334b898eafCe6B27cCA" }),
          { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      }

      if (request.method === "GET") {
        return new Response("Efikcoin Chain ID 20488 - EFC Gas - https://rpc.efikcoin.com/rpc", {
          headers: { "Access-Control-Allow-Origin": "*" }
        });
      }

      if (request.method === "POST") {
        const bodyText = await request.text();
        let body;
        try {
          body = JSON.parse(bodyText);
        } catch {
          body = {};
        }

        if (body.method === "eth_chainId") {
          return new Response(
            JSON.stringify({ jsonrpc: "2.0", id: body.id || 1, result: "0x5008" }),
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
          );
        }

        const bscResponse = await fetch("https://bsc-dataseed.binance.org/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: bodyText
        });

        const data = await bscResponse.text();
        return new Response(data, {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }

      return new Response("Efikcoin Chain ID 20488", {
        headers: { "Access-Control-Allow-Origin": "*" }
      });

    } catch (err) {
      return new Response(
        JSON.stringify({ jsonrpc: "2.0", id: 1, result: "0x5008" }),
        { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
  }
};
