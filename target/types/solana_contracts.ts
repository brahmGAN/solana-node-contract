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
          "name": "currentTierNumberAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
      ]
    },
    {
      "name": "addWhitelistAddresses",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitelistAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "user",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "discountCode",
      "docs": [
        "@dev Add and remove a discount code by switching the boolean",
        "@dev `gpunet` is a reserved discount code string to signify no discount code is being used"
      ],
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "discountCodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "discountCode",
          "type": "string"
        },
        {
          "name": "discountCodeStatus",
          "type": "bool"
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
          "name": "whitelistAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "totalNodesHeldAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentTierNumberAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "discountCodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "discountCode",
          "type": "string"
        },
        {
          "name": "tierNumber",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setEarlySaleStatus",
      "docs": [
        "@dev Setter functions"
      ],
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
          "name": "payer",
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
          "name": "payer",
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
          "name": "payer",
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
      "name": "getEarlySaleStatus",
      "docs": [
        "@dev Getter functions"
      ],
      "accounts": [
        {
          "name": "earlySaleStatusAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
      "name": "getTierLimit",
      "accounts": [
        {
          "name": "tierLimitAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
      ]
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
          "name": "payer",
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
      ]
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
          "name": "payer",
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
      "name": "getTotalNodesHeld",
      "accounts": [
        {
          "name": "nodesBoughtAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "user",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "getDiscountCodeStatus",
      "accounts": [
        {
          "name": "discountCodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "discountCode",
          "type": "string"
        }
      ]
    },
    {
      "name": "getWhitelistUserStatus",
      "accounts": [
        {
          "name": "whitelistAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "user",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "getCurrentTierNumber",
      "accounts": [
        {
          "name": "currentTierNumberAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
            "type": "u64"
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
            "type": "u64"
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
    },
    {
      "name": "currentTierNumber",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentTierNumber",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "OwnerEvent",
      "fields": [
        {
          "name": "owner",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "WhitelistEvent",
      "fields": [
        {
          "name": "whitelistAddress",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "inEarlySale",
          "type": "bool",
          "index": false
        }
      ]
    },
    {
      "name": "DiscountCodeEvent",
      "fields": [
        {
          "name": "discountCode",
          "type": "string",
          "index": false
        },
        {
          "name": "discountCodeStatus",
          "type": "bool",
          "index": false
        }
      ]
    },
    {
      "name": "NodeBoughtEvent",
      "fields": [
        {
          "name": "user",
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
        },
        {
          "name": "discountCode",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "FundsHandlerEvent",
      "fields": [
        {
          "name": "fundsHandler",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "EarlySaleStatusEvent",
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
    },
    {
      "name": "TotalNodesHeldEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "totalNodesHeld",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "GetCurrentTierNumberEvent",
      "fields": [
        {
          "name": "currentTierNumber",
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
    },
    {
      "code": 6006,
      "name": "InsufficientBalance",
      "msg": "Insufficient Balance!"
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
          "name": "currentTierNumberAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
      ]
    },
    {
      "name": "addWhitelistAddresses",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitelistAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "user",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "discountCode",
      "docs": [
        "@dev Add and remove a discount code by switching the boolean",
        "@dev `gpunet` is a reserved discount code string to signify no discount code is being used"
      ],
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "discountCodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "discountCode",
          "type": "string"
        },
        {
          "name": "discountCodeStatus",
          "type": "bool"
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
          "name": "whitelistAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "totalNodesHeldAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentTierNumberAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "discountCodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "discountCode",
          "type": "string"
        },
        {
          "name": "tierNumber",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setEarlySaleStatus",
      "docs": [
        "@dev Setter functions"
      ],
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
          "name": "payer",
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
          "name": "payer",
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
          "name": "payer",
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
      "name": "getEarlySaleStatus",
      "docs": [
        "@dev Getter functions"
      ],
      "accounts": [
        {
          "name": "earlySaleStatusAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
      "name": "getTierLimit",
      "accounts": [
        {
          "name": "tierLimitAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
      ]
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
          "name": "payer",
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
      ]
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
          "name": "payer",
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
      "name": "getTotalNodesHeld",
      "accounts": [
        {
          "name": "nodesBoughtAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "user",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "getDiscountCodeStatus",
      "accounts": [
        {
          "name": "discountCodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "discountCode",
          "type": "string"
        }
      ]
    },
    {
      "name": "getWhitelistUserStatus",
      "accounts": [
        {
          "name": "whitelistAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
          "name": "user",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "getCurrentTierNumber",
      "accounts": [
        {
          "name": "currentTierNumberAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
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
            "type": "u64"
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
            "type": "u64"
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
    },
    {
      "name": "currentTierNumber",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentTierNumber",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "OwnerEvent",
      "fields": [
        {
          "name": "owner",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "WhitelistEvent",
      "fields": [
        {
          "name": "whitelistAddress",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "inEarlySale",
          "type": "bool",
          "index": false
        }
      ]
    },
    {
      "name": "DiscountCodeEvent",
      "fields": [
        {
          "name": "discountCode",
          "type": "string",
          "index": false
        },
        {
          "name": "discountCodeStatus",
          "type": "bool",
          "index": false
        }
      ]
    },
    {
      "name": "NodeBoughtEvent",
      "fields": [
        {
          "name": "user",
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
        },
        {
          "name": "discountCode",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "FundsHandlerEvent",
      "fields": [
        {
          "name": "fundsHandler",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "EarlySaleStatusEvent",
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
    },
    {
      "name": "TotalNodesHeldEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "totalNodesHeld",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "GetCurrentTierNumberEvent",
      "fields": [
        {
          "name": "currentTierNumber",
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
    },
    {
      "code": 6006,
      "name": "InsufficientBalance",
      "msg": "Insufficient Balance!"
    }
  ]
};
