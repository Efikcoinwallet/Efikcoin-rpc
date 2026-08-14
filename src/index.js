export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: cors() });
    if (url.pathname === "/" && request.method === "GET") return new Response(homepage(), { headers: { "Content-Type": "text/html;charset=utf-8", ...cors() } });
    if (request.method === "POST") {
      const body = await request.text();
      for (const rpc of ["https://bsc-dataseed.binance.org","https://bsc-dataseed1.binance.org"]) {
        try {
          const r = await fetch(rpc, { method: "POST", body, headers: { "Content-Type": "application/json" } });
          if (r.ok) return new Response(await r.text(), { headers: { "Content-Type": "application/json", ...cors() } });
        } catch {}
      }
      return new Response("rpc failed", { status: 500, headers: cors() });
    }
    return new Response("EFC Live", { headers: cors() });
  }
}
function cors(){ return { "Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type" }; }
function homepage(){
return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EFC RPC</title><style>body{margin:0;background:#070a12;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui}.card{background:#12182a;border:1px solid #1f2a44;border-radius:24px;padding:32px;max-width:400px;width:100%;text-align:center}.coin{width:120px;height:120px;border-radius:50%;margin:0 auto 16px;background:radial-gradient(circle at 30% 30%, #ffdf70, #f0b90b 40%, #b8860b);border:4px solid #ffec8b;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(240,185,11,0.6), inset 0 0 20px rgba(0,0,0,0.3);color:#3d2e00}.coin b{font-size:36px;letter-spacing:2px;text-shadow:0 1px 0 #fff, 0 -1px 2px rgba(0,0,0,0.5)}.coin span{font-size:10px;font-weight:700;margin-top:2px;letter-spacing:1px}code{display:block;background:#0a0f1d;border:1px solid #1e2a44;padding:10px;border-radius:8px;font-size:11px;word-break:break-all;color:#c2d4f5;text-align:left;margin:10px 0}</style></head><body><div class="card"><div class="coin"><b>EFC</b><span>EFIKCOIN</span></div><h2 style="margin:8px 0">Efikcoin RPC</h2><p style="color:#22c55e;margin:4px 0">● Live - BSC Mainnet</p><code>0x677ce9cba67f7484ea951a12897ce780cfd8fed1</code><code>https://rpc.efikcoin.com/rpc<br>BSC 56</code><p><a href="/health" style="color:#60a5fa">Health</a> • <a href="https://bscscan.com/token/0x677ce9cba67f7484ea951a12897ce780cfd8fed1" style="color:#60a5fa" target="_blank">BscScan</a></p></div></body></html>`;}
