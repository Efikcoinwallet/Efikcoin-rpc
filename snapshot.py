# FREE snapshot - no BNB gas needed
# Gets holders of 0x677Ce9CBa67f7484ea951a12897CE780cFd8fED1 and builds 20488 alloc
import requests, json

TOKEN = "0x677Ce9CBa67f7484ea951a12897CE780cFd8fED1"
BSC_API = "https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=" + TOKEN

# For full holders, use: https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=TOKEN
# This is FREE endpoint - no API key needed for small

print("Snapshotting EFC BEP20 0x677ce9... to Chain ID 20488...")
# Example holders - you replace with real from BscScan export CSV
holders = {
  "0xC5AD5cfcF81AD63a94227334b898eafCe6B27cCA": 1000000000,
  "0x676cCf34C191a9D6EFE4B265b84877C619A559d0": 100000000
}

alloc = {}
for addr, amt in holders.items():
  wei = hex(int(amt * 10**18))
  alloc[addr] = {"balance": wei}

with open("genesis-20488.json", "r") as f:
  genesis = json.load(f)
genesis["alloc"].update(alloc)

with open("genesis-20488-final.json", "w") as f:
  json.dump(genesis, f, indent=2)

print("Done! genesis-20488-final.json created for Chain ID 20488 Mainnet!")
print("Upload to your node, start chain, explorer will show balances!")
