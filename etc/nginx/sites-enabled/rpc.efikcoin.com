server {
    listen 443 ssl;
    server_name rpc.efikcoin.com;
    
    location /rpc {
        proxy_pass http://127.0.0.1:8545;
        proxy_set_header Host $host;
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
        add_header Access-Control-Allow-Headers "Content-Type";
    }
    
    location / {
        return 200 '{"chainId":20488,"chainIdHex":"0x5008","name":"Efikcoin Mainnet","symbol":"EFC","rpc":"https://rpc.efikcoin.com/rpc","explorer":"https://explorer.efikcoin.com","real":"factory producing real funds for Efik land forever"}';
        add_header Content-Type application/json;
        add_header Access-Control-Allow-Origin *;
    }
}
