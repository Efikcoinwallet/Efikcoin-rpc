export default {
  async fetch(request, env, ctx) {
    const cors = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type"};
    const jsonH = {...cors, "Content-Type":"application/json"};
    if(request.method==="OPTIONS") return new Response(null,{headers:cors});
    const url=new URL(request.url);
    const TREASURY="0x676ccf34c191a9d6efe4b265b84877c619a559d0".toLowerCase();
    if(url.pathname==="/"&&request.method==="GET"){
      return new Response(JSON.stringify({chainId:20488,chainIdHex:"0x5008",name:"Efikcoin Mainnet",symbol:"EFC",rpc:"https://rpc.efikcoin.com/rpc",explorer:"https://explorer.efikcoin.com",treasury:"0x676cCf34C191a9D6EFE4B265b84877C619A559d0",founder:"0xC5AD5cfcF81AD63a94227334b898eafCe6B27cCA",status:"Chain LIVE",blockNumber:1}),{headers:jsonH});
    }
    if((url.pathname==="/rpc"||url.pathname==="/")&&request.method==="POST"){
      try{
        const body=await request.json();
        const isBatch=Array.isArray(body);
        const reqs=isBatch?body:[body];
        const handle=(r)=>{
          const id=r.id||1; const m=r.method;
          if(m==="eth_chainId") return {jsonrpc:"2.0",id,result:"0x5008"};
          if(m==="net_version") return {jsonrpc:"2.0",id,result:"20488"};
          if(m==="eth_blockNumber") return {jsonrpc:"2.0",id,result:"0x1"};
          if(m==="eth_gasPrice") return {jsonrpc:"2.0",id,result:"0x3b9aca00"};
          if(m==="eth_getBalance"){
            const a=(r.params?.[0]||"").toLowerCase(); let res="0x0";
            if(a===TREASURY) res="0x33b2e3c9fd0803ce8000000";
            return {jsonrpc:"2.0",id,result:res};
          }
          if(m==="eth_getBlockByNumber"){
            return {jsonrpc:"2.0",id,result:{number:"0x1",hash:"0xefikcoinreal20488",parentHash:"0x0000000000000000",timestamp:"0x"+Math.floor(Date.now()/1000).toString(16),miner:"0x676cCf34C191a9D6EFE4B265b84877C619A559d0",difficulty:"0x1",gasLimit:"0x1c9c380",gasUsed:"0x0",transactions:[],extraData:"0xEfikcoin Mainnet 20488"}};
          }
          return {jsonrpc:"2.0",id,result:"0x0"};
        };
        const results=reqs.map(handle);
        return new Response(JSON.stringify(isBatch?results:results[0]),{headers:jsonH});
      }catch(e){
        return new Response(JSON.stringify({jsonrpc:"2.0",id:1,error:{code:-32603,message:e.message}}),{headers:jsonH,status:500});
      }
    }
    return new Response(JSON.stringify({chainId:20488}),{headers:jsonH});
  }
};
