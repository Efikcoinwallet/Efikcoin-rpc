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
      return new Response(JSON.stringify({ status: "ok", chainId: 56, rpc: "https://rpc.efikcoin.com/rpc", token: "0x9f8c29e496ecb6c39c221458f211234dfcb233e0", timestamp: Date.now() }), { headers: { "Content-Type": "application/json", ...cors() } });
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
return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Efikcoin RPC - Official</title>
<style>
body{margin:0;font-family:Inter,system-ui;background:#070a12;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh}
.card{background:linear-gradient(180deg,#12182a,#0d1120);border:1px solid #1f2a44;border-radius:24px;padding:32px;max-width:480px;width:92%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.6)}
.logo{width:96px;height:96px;border-radius:50%;margin:0 auto 16px;overflow:hidden;background:#fff;padding:4px;box-shadow:0 0 0 4px rgba(90,200,255,.2)}
.logo img{width:100%;height:100%;object-fit:cover;border-radius:50%}
h1{margin:8px 0 4px;font-size:28px;letter-spacing:.5px}
.sub{color:#8aa0c6;font-size:14px;margin-bottom:20px}
.badge{display:inline-flex;gap:6px;align-items:center;background:#0e2a1a;border:1px solid #1a5c2e;color:#22c55e;padding:6px 12px;border-radius:999px;font-size:13px;margin-bottom:22px}
.btn{width:100%;padding:14px;border-radius:12px;border:0;font-weight:700;font-size:15px;cursor:pointer;margin:8px 0}
.btn-primary{background:#f0b90b;color:#000}
.btn-secondary{background:#1a2236;color:#fff;border:1px solid #2a3655}
code{display:block;background:#0a0f1d;border:1px solid #1e2a44;padding:12px;border-radius:10px;font-size:12px;word-break:break-all;margin:12px 0;color:#c2d4f5;text-align:left}
a{color:#60a5fa;text-decoration:none;font-size:13px}
</style>
</head><body>
<div class="card">
<div class="logo"><img src="https://ipfs.io/ipfs/bafybeihrzyodihyp5met2hs32ppj37qlowuxarvs2lnlrgujgrlwxc7fwe" alt="Efikcoin"></div>
<h1>Efikcoin RPC</h1>
<div class="sub">Official BSC RPC for EfikCoin Eternal</div>
<div class="badge"><span>●</span> Live - Chain ID 56</div>
<button class="btn btn-primary" onclick="addToMetamask()">🦊 Add to MetaMask</button>
<button class="btn btn-secondary" onclick="copyRpc()">📋 Copy RPC URL</button>
<code id="rpc">https://rpc.efikcoin.com/rpc</code>
<code>Token: 0x9f8c29e496ecb6c39c221458f211234dfcb233e0<br>Chain: BSC Mainnet (0x38)<br>Symbol: BNB / ECE</code>
<div style="margin-top:16px"><a href="/health">Health Check</a> • <a href="https://bscscan.com/token/0x9f8c29e496ecb6c39c221458f211234dfcb233e0" target="_blank">BscScan</a></div>
</div>
<script>
async function addToMetamask(){
try{
await window.ethereum.request({method:'wallet_addEthereumChain',params:[{chainId:'0x38',chainName:'BSC - Efikcoin RPC',rpcUrls:['https://rpc.efikcoin.com/rpc'],nativeCurrency:{name:'BNB',symbol:'BNB',decimals:18},blockExplorerUrls:['https://bscscan.com']}]}); 
alert('Added!');
}catch(e){alert('Open in MetaMask browser or copy URL: '+e.message)}
}
function copyRpc(){navigator.clipboard.writeText('https://rpc.efikcoin.com/rpc'); alert('RPC URL Copied!');}
</script>
</body></html>`;
}
