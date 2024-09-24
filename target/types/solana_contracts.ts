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
          "name": "ownerInitAccount",
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
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inEarlySaleAccount",
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
          "name": "tierLimitAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "earlySaleStatusAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierPriceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inEarlySaleAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "totalNodesHeldAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
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
        },
        {
          "name": "tierNumber",
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
          "name": "fundsHandlerAccount",
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
          "name": "newFundsHandler",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setEarlySaleStatus",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "earlySaleStatusAccount",
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
          "name": "saleStatus",
          "type": "bool"
        }
      ]
    },
    {
      "name": "setTierLimit",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierLimitAccount",
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
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierPriceAccount",
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
          "type": "u64"
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
          "name": "fundsHandlerAccount",
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
      "name": "getEarlySaleStatus",
      "accounts": [
        {
          "name": "earlySaleStatusAccount",
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
      "name": "getTierLimit",
      "accounts": [
        {
          "name": "tierLimitAccount",
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
      "returns": "u64"
    },
    {
      "name": "getTierPrice",
      "accounts": [
        {
          "name": "tierPriceAccount",
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
      "returns": "u64"
    },
    {
      "name": "getOwner",
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
      "args": [],
      "returns": "publicKey"
    },
    {
      "name": "getTotalNodesHeld",
      "accounts": [
        {
          "name": "nodesBoughtAccount",
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
          }
        ]
      }
    },
    {
      "name": "ownerInit",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerInitialized",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "earlySaleStatus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "earlySaleStatus",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "totalNodesHeld",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalNodesHeld",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "inEarlySale",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "inEarlySale",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "tierLimit",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tierLimit",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "tierPrice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tierPrice",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "discountTierPrice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "discountTierPrice",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "fundsHandler",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fundsHandler",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "discountCode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "discountCode",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "Initialize",
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
    },
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
        },
        {
          "name": "tierNumber",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalNodesHeld",
          "type": "u64",
          "index": false
        },
        {
          "name": "pendingTierLimit",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "NewFundsHandlerEvent",
      "fields": [
        {
          "name": "fundsHandler",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "EarlySale",
      "fields": [
        {
          "name": "earlySaleStatus",
          "type": "bool",
          "index": false
        }
      ]
    },
    {
      "name": "TierLimitEvent",
      "fields": [
        {
          "name": "tierLimit",
          "type": "u64",
          "index": false
        },
        {
          "name": "tierNumber",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "TierPriceEvent",
      "fields": [
        {
          "name": "tierPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "tierNumber",
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
      "msg": "Already initialized!"
    },
    {
      "code": 6001,
      "name": "NotAuthorized",
      "msg": "Not Authorized!"
    },
    {
      "code": 6002,
      "name": "TierLimit",
      "msg": "Out of tier limits!"
    },
    {
      "code": 6003,
      "name": "QuantityOutOfBounds",
      "msg": "Quantity is more than the available nodes in the tier!"
    },
    {
      "code": 6004,
      "name": "EarlySale",
      "msg": "Not part of early sale!"
    },
    {
      "code": 6005,
      "name": "IncorrectAmount",
      "msg": "Incorrect Amount!"
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
          "name": "ownerInitAccount",
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
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inEarlySaleAccount",
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
          "name": "tierLimitAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "earlySaleStatusAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierPriceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inEarlySaleAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "totalNodesHeldAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
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
        },
        {
          "name": "tierNumber",
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
          "name": "fundsHandlerAccount",
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
          "name": "newFundsHandler",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setEarlySaleStatus",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "earlySaleStatusAccount",
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
          "name": "saleStatus",
          "type": "bool"
        }
      ]
    },
    {
      "name": "setTierLimit",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierLimitAccount",
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
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierPriceAccount",
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
          "type": "u64"
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
          "name": "fundsHandlerAccount",
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
      "name": "getEarlySaleStatus",
      "accounts": [
        {
          "name": "earlySaleStatusAccount",
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
      "name": "getTierLimit",
      "accounts": [
        {
          "name": "tierLimitAccount",
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
      "returns": "u64"
    },
    {
      "name": "getTierPrice",
      "accounts": [
        {
          "name": "tierPriceAccount",
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
      "returns": "u64"
    },
    {
      "name": "getOwner",
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
      "args": [],
      "returns": "publicKey"
    },
    {
      "name": "getTotalNodesHeld",
      "accounts": [
        {
          "name": "nodesBoughtAccount",
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
          }
        ]
      }
    },
    {
      "name": "ownerInit",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerInitialized",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "earlySaleStatus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "earlySaleStatus",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "totalNodesHeld",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalNodesHeld",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "inEarlySale",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "inEarlySale",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "tierLimit",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tierLimit",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "tierPrice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tierPrice",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "discountTierPrice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "discountTierPrice",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "fundsHandler",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fundsHandler",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "discountCode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "discountCode",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "Initialize",
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
    },
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
        },
        {
          "name": "tierNumber",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalNodesHeld",
          "type": "u64",
          "index": false
        },
        {
          "name": "pendingTierLimit",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "NewFundsHandlerEvent",
      "fields": [
        {
          "name": "fundsHandler",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "EarlySale",
      "fields": [
        {
          "name": "earlySaleStatus",
          "type": "bool",
          "index": false
        }
      ]
    },
    {
      "name": "TierLimitEvent",
      "fields": [
        {
          "name": "tierLimit",
          "type": "u64",
          "index": false
        },
        {
          "name": "tierNumber",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "TierPriceEvent",
      "fields": [
        {
          "name": "tierPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "tierNumber",
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
      "msg": "Already initialized!"
    },
    {
      "code": 6001,
      "name": "NotAuthorized",
      "msg": "Not Authorized!"
    },
    {
      "code": 6002,
      "name": "TierLimit",
      "msg": "Out of tier limits!"
    },
    {
      "code": 6003,
      "name": "QuantityOutOfBounds",
      "msg": "Quantity is more than the available nodes in the tier!"
    },
    {
      "code": 6004,
      "name": "EarlySale",
      "msg": "Not part of early sale!"
    },
    {
      "code": 6005,
      "name": "IncorrectAmount",
      "msg": "Incorrect Amount!"
    }
  ]
};
