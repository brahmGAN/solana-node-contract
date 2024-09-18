export type SolanaContracts = {
  "version": "0.1.0",
  "name": "solana_contracts",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "caller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "buyNode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fundsHandler",
            "type": "publicKey"
          },
          {
            "name": "nodeTierLimit",
            "type": "u64"
          },
          {
            "name": "earlySaleStatus",
            "type": "bool"
          },
          {
            "name": "nodePrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "owner",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerPubkey",
            "type": "publicKey"
          },
          {
            "name": "lock",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "NodeBought",
      "fields": [
        {
          "name": "caller",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "quantity",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    }
  ]
};

export const IDL: SolanaContracts = {
  "version": "0.1.0",
  "name": "solana_contracts",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "caller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "buyNode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fundsHandler",
            "type": "publicKey"
          },
          {
            "name": "nodeTierLimit",
            "type": "u64"
          },
          {
            "name": "earlySaleStatus",
            "type": "bool"
          },
          {
            "name": "nodePrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "owner",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerPubkey",
            "type": "publicKey"
          },
          {
            "name": "lock",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "NodeBought",
      "fields": [
        {
          "name": "caller",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "quantity",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    }
  ]
};
