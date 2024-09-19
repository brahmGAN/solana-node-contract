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
    },
    {
      "name": "addEarlySaleAddresses",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "addresses",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "buyNode",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "quantity",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setFundsHandler",
      "docs": [
        "@dev Setter functions"
      ],
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "newFundsHandler",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setNodeTierLimit",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "newTierLimit",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setEarlySaleStatus",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "saleType",
          "type": "bool"
        }
      ]
    },
    {
      "name": "setNodePrice",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "getFundsHandler",
      "docs": [
        "@dev Getter functions"
      ],
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [],
      "returns": "publicKey"
    },
    {
      "name": "getNodeTierLimit",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [],
      "returns": "u64"
    },
    {
      "name": "getEarlySaleStatus",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [],
      "returns": "bool"
    },
    {
      "name": "getNodePrice",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [],
      "returns": "u64"
    },
    {
      "name": "getOwner",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [],
      "returns": "publicKey"
    }
  ],
  "accounts": [
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
    },
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
    },
    {
      "name": "addEarlySaleAddresses",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "addresses",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "buyNode",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "quantity",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setFundsHandler",
      "docs": [
        "@dev Setter functions"
      ],
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "newFundsHandler",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setNodeTierLimit",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "newTierLimit",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setEarlySaleStatus",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "saleType",
          "type": "bool"
        }
      ]
    },
    {
      "name": "setNodePrice",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "getFundsHandler",
      "docs": [
        "@dev Getter functions"
      ],
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [],
      "returns": "publicKey"
    },
    {
      "name": "getNodeTierLimit",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [],
      "returns": "u64"
    },
    {
      "name": "getEarlySaleStatus",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [],
      "returns": "bool"
    },
    {
      "name": "getNodePrice",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [],
      "returns": "u64"
    },
    {
      "name": "getOwner",
      "accounts": [
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "setPdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "checkPdaAccount",
          "isMut": true,
          "isSigner": false
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
      "args": [],
      "returns": "publicKey"
    }
  ],
  "accounts": [
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
    },
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
