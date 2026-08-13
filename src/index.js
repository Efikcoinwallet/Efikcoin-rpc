export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }});
    }
    if (url.pathname === "/" && request.method === "GET") {
      return new Response(`<h1>Efikcoin RPC Live</h1><p>Use POST /rpc</p><p>Token: 0x9f8c29e496ecb6c39c221458f211234dfcb233e0</p><a href="/health">Health</a>`, { headers: { "Content-Type": "text/html" } });
    }
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", chainId: 56, token: "0x9f8c29e496ecb6c39c221458f211234dfcb233e0" }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
    }
    if (request.method === "POST") {
      const body = await request.text();
      const bscRpcs = ["https://bsc-dataseed.binance.org", "https://bsc-dataseed1.binance.org"];
      for (const rpc of bscRpcs) {
        try {
          const res = await fetch(rpc, { method: "POST", body, headers: { "Content-Type": "application/json" } });
          if (res.ok) {
            const data = await res.text();
            return new Response(data, { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
          }
        } catch {}
      }
      return new Response(JSON.stringify({ error: "RPC failed" }), { status: 500 });
    }
    return new Response("Use POST /rpc", { status: 404 });
  }
}
