export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    
    if (request.method === "GET") {
      return new Response(JSON.stringify({
        chainId: 20488,
        chainIdHex: "0x5008",
        name: "Efikcoin Mainnet",
        symbol: "EFC"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    try {
      const bodyText = await request.text();
      const json = JSON.parse(bodyText);
      
      if (json.method === "eth_chainId") {
        return new Response(JSON.stringify({
          jsonrpc: "2.0",
          id: json.id,
          result: "0x5008"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      if (json.method === "net_version") {
        return new Response(JSON.stringify({
          jsonrpc: "2.0",
          id: json.id,
          result: "20488"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      const bscResponse = await fetch("https://bsc-dataseed.binance.org/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyText
      });
      
      const responseText = await bscResponse.text();
      return new Response(responseText, {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
      
    } catch (e) {
      return new Response(JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        error: { code: -32603, message: e.message }
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
}
