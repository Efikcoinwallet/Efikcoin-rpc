const BSC_RPC = "https://bsc-dataseed.bnbchain.org";

const ALLOWED_METHODS = new Set([
  "web3_clientVersion",
  "web3_sha3",
  "net_version",
  "net_listening",
  "net_peerCount",
  "eth_chainId",
  "eth_blockNumber",
  "eth_getBalance",
  "eth_getBlockByHash",
  "eth_getBlockByNumber",
  "eth_getTransactionByHash",
  "eth_getTransactionReceipt",
  "eth_call",
  "eth_estimateGas",
  "eth_gasPrice",
  "eth_getCode",
  "eth_getTransactionCount",
  "eth_getLogs",
  "eth_sendRawTransaction"
]);

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "Content-Type",
      "access-control-allow-methods": "POST, OPTIONS"
    }
  });
}

function rpcError(id, code, message) {
  return json({
    jsonrpc: "2.0",
    error: { code, message },
    id: id ?? null
  });
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-headers": "Content-Type",
          "access-control-allow-methods": "POST, OPTIONS"
        }
      });
    }

    const url = new URL(request.url);

    // Health endpoint
    if (request.method === "GET" && url.pathname === "/health") {
      return json({
        status: "ok",
        network: "BNB Smart Chain",
        chainId: "0x38",
        token: "EFC",
        contract: "0x677Ce9CBa67f7484ea951a12897CE780cFd8fED1"
      });
    }

    if (request.method !== "POST") {
      return rpcError(null, -32600, "Only POST requests are accepted");
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return rpcError(null, -32700, "Invalid JSON");
    }

    // JSON-RPC batch request
    if (Array.isArray(body)) {
      const responses = await Promise.all(
        body.map((requestItem) => forwardRpc(requestItem))
      );

      return json(responses);
    }

    return forwardRpc(body);
  }
};

async function forwardRpc(rpcRequest) {
  if (!rpcRequest || rpcRequest.jsonrpc !== "2.0") {
    return rpcError(
      rpcRequest?.id,
      -32600,
      "Invalid JSON-RPC request"
    );
  }

  if (!ALLOWED_METHODS.has(rpcRequest.method)) {
    return rpcError(
      rpcRequest.id,
      -32601,
      `Method not allowed: ${rpcRequest.method}`
    );
  }

  try {
    const response = await fetch(BSC_RPC, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(rpcRequest)
    });

    const text = await response.text();

    return new Response(text, {
      status: response.status,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      }
    });
  } catch {
    return rpcError(
      rpcRequest.id,
      -32603,
      "Unable to reach BNB Smart Chain RPC"
    );
  }
      }
