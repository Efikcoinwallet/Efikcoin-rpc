# Efikcoin Mainnet - Chain ID 20488

**Efikcoin is sovereign EVM Layer 1 blockchain built for Africa.**

### Chain Info (Final for Chainlist Merge)
- Name: Efikcoin Mainnet
- Chain ID: 20488
- Hex: 0x5008
- Short Name: efc (small letter)
- Symbol: EFC (big letter)
- Network: mainnet
- RPC: https://rpc.efikcoin.com/rpc
- Explorer: https://explorer.efikcoin.com
- Website: https://efikcoin.com
- Status: live

### Native Currency
- Name: Efikcoin
- Symbol: EFC
- Decimals: 18

### RPC Endpoints
- https://rpc.efikcoin.com/rpc
- https://rpc.efikcoin.com

### Genesis (chainId 20488)
{
  "config": {
    "chainId": 20488,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0
  },
  "nonce": "0x0",
  "timestamp": "0x65000000",
  "gasLimit": "0x1c9c380",
  "difficulty": "0x1",
  "alloc": {}
}

### Chainlist File - constants/additionalChainRegistry/chain-20488.js
module.exports = {
  name: "Efikcoin Mainnet",
  chain: "Efikcoin",
  rpc: ["https://rpc.efikcoin.com/rpc"],
  faucets: [],
  nativeCurrency: { name: "Efikcoin", symbol: "EFC", decimals: 18 },
  infoURL: "https://efikcoin.com",
  shortName: "efc",
  chainId: 20488,
  networkId: 20488,
  explorers: [{ name: "Efikcoin Explorer", url: "https://explorer.efikcoin.com", standard: "EIP3091" }]
}
