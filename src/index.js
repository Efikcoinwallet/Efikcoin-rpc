export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors() });
    }
    if (url.pathname === "/" && request.method === "GET") {
      return new Response(homepage(), { headers: { "Content-Type": "text/html;charset=utf-8", ...cors() } });
    }
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", chainId: 56, rpc: "https://rpc.efikcoin.com/rpc", token: "0x677ce9cba67f7484ea951a12897ce780cfd8fed1", timestamp: Date.now() }), { headers: { "Content-Type": "application/json", ...cors() } });
    }
    if (request.method === "POST") {
      const body = await request.text();
      for (const rpc of ["https://bsc-dataseed.binance.org","https://bsc-dataseed1.binance.org","https://rpc.ankr.com/bsc"]) {
        try {
          const res = await fetch(rpc, { method: "POST", body, headers: { "Content-Type": "application/json" } });
          if (res.ok) return new Response(await res.text(), { headers: { "Content-Type": "application/json", ...cors() } });
        } catch {}
      }
      return new Response(JSON.stringify({ error: "All RPCs failed" }), { status: 500, headers: cors() });
    }
    return new Response("Use POST /rpc", { status: 404, headers: cors() });
  }
}
function cors(){ return { "Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type" }; }
function homepage(){
return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Efikcoin RPC</title>
<style>body{margin:0;font-family:system-ui;background:#070a12;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px}.card{background:#12182a;border:1px solid #1f2a44;border-radius:24px;padding:32px;max-width:480px;width:100%;text-align:center}.logo{width:100px;height:100px;border-radius:50%;margin:0 auto 16px;background:#fff;padding:4px}.logo img{width:100%;height:100%;border-radius:50%;object-fit:cover}</style>
</head><body><div class="card">
<div class="logo"><img src="https://cloudflare-ipfs.com/ipfs/bafybeihrzyodihyp5met2hs32ppj37qlowuxarvs2lnlrgujgrlwxc7fwe" alt="Efikcoin"></div>
<h1>Efikcoin RPC</h1><p style="color:#22c55e">● Live - BSC Mainnet</p>
<code style="display:block;background:#0a0f1d;border:1px solid #1e2a44;padding:12px;border-radius:10px;font-size:11px;word-break:break-all;color:#c2d4f5;text-align:left;margin:12px 0">Official Contract:<br>0x677ce9cba67f7484ea951a12897ce780cfd8fed1</code>
<code style="display:block;background:#0a0f1d;border:1px solid #1e2a44;padding:12px;border-radius:10px;font-size:12px;word-break:break-all;color:#c2d4f5;text-align:left">RPC: https://rpc.efikcoin.com/rpc<br>Chain: BSC 56 (0x38)</code>
<p><a href="/health" style="color:#60a5fa">Health</a> • <a href="https://pancakeswap.finance/info/tokens/0x677ce9cba67f7484ea951a12897ce780cfd8fed1" target="_blank" style="color:#60a5fa">PancakeSwap</a> • <a href="https://bscscan.com/token/0x677ce9cba67f7484ea951a12897ce780cfd8fed1" target="_blank" style="color:#60a5fa">BscScan</a></p>
</div></body></html>`;
}
