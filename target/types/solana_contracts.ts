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
      "name": "setTierLimit",
      "accounts": [
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerAccount",
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
          "type": "u128"
        },
        {
          "name": "tierNumber",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setTierPrice",
      "accounts": [
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerAccount",
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
          "name": "newPrice",
          "type": "u128"
        },
        {
          "name": "tierNumber",
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
      "name": "getTierLimit",
      "accounts": [
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerAccount",
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
          "name": "tierNumber",
          "type": "u64"
        }
      ],
      "returns": "u128"
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
      "name": "getTierPrice",
      "accounts": [
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerAccount",
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
          "name": "tierNumber",
          "type": "u64"
        }
      ],
      "returns": "u128"
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
            "name": "earlySaleStatus",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "tier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tierLimit",
            "type": {
              "vec": "u128"
            }
          },
          {
            "name": "tierPrice",
            "type": {
              "vec": "u128"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "NotAuthorized",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AlreadyInitialized"
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
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AlreadyInitialized",
      "msg": "Alreay initialized!"
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
      "name": "setTierLimit",
      "accounts": [
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerAccount",
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
          "type": "u128"
        },
        {
          "name": "tierNumber",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setTierPrice",
      "accounts": [
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerAccount",
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
          "name": "newPrice",
          "type": "u128"
        },
        {
          "name": "tierNumber",
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
      "name": "getTierLimit",
      "accounts": [
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerAccount",
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
          "name": "tierNumber",
          "type": "u64"
        }
      ],
      "returns": "u128"
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
      "name": "getTierPrice",
      "accounts": [
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerAccount",
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
          "name": "tierNumber",
          "type": "u64"
        }
      ],
      "returns": "u128"
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
            "name": "earlySaleStatus",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "tier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tierLimit",
            "type": {
              "vec": "u128"
            }
          },
          {
            "name": "tierPrice",
            "type": {
              "vec": "u128"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "NotAuthorized",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AlreadyInitialized"
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
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AlreadyInitialized",
      "msg": "Alreay initialized!"
    }
  ]
};
