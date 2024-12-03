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
          "name": "nodeSaleAccount",
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
        },
        {
          "name": "fundsHandler",
          "type": "publicKey"
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
          "name": "nodeSaleAccount",
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
          "name": "tierLimit",
          "type": {
            "vec": "u64"
          }
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
          "name": "nodeSaleAccount",
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
          "name": "tierPrice",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "setFundsHandler",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nodeSaleAccount",
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
          "name": "fundsHandler",
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
          "name": "nodeSaleAccount",
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
      "name": "addWhitelistAddresses",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
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
        },
        {
          "name": "listNumber",
          "type": "bool"
        }
      ]
    },
    {
      "name": "buyNode",
      "accounts": [
        {
          "name": "nodeSaleAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "discountCodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerPubkey",
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
          "name": "quantity",
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
          "name": "nodeSaleAccount",
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
          "name": "nodeSaleAccount",
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
          "name": "nodeSaleAccount",
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
      "name": "getFundsHandler",
      "accounts": [
        {
          "name": "nodeSaleAccount",
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
          "name": "userAccount",
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
          "name": "userAccount",
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
          "name": "nodeSaleAccount",
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
          },
          {
            "name": "ownerInitialized",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalNodesHeld",
            "type": "u64"
          },
          {
            "name": "inEarlySale",
            "type": "bool"
          },
          {
            "name": "inWhiteList1",
            "type": "bool"
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
      "name": "nodeSale",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tierLimit",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "tierPrice",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "fundsHandler",
            "type": "publicKey"
          },
          {
            "name": "earlySaleStatus",
            "type": "bool"
          },
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
      "name": "InitializeEvent",
      "fields": [
        {
          "name": "owner",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ownerInitialized",
          "type": "bool",
          "index": false
        },
        {
          "name": "currentTierNumber",
          "type": "u64",
          "index": false
        },
        {
          "name": "fundsHandler",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "OwnerEvent",
      "fields": [
        {
          "name": "owner",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ownerInitStatus",
          "type": "bool",
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
        },
        {
          "name": "inWhiteList1",
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
      "name": "SetTierLimitEvent",
      "fields": [
        {
          "name": "tierLimit",
          "type": {
            "vec": "u64"
          },
          "index": false
        }
      ]
    },
    {
      "name": "GetTierLimitEvent",
      "fields": [
        {
          "name": "tierNumber",
          "type": "u64",
          "index": false
        },
        {
          "name": "tierLimit",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "SetTierPriceEvent",
      "fields": [
        {
          "name": "tierPrice",
          "type": {
            "vec": "u64"
          },
          "index": false
        }
      ]
    },
    {
      "name": "GetTierPriceEvent",
      "fields": [
        {
          "name": "tierNumber",
          "type": "u64",
          "index": false
        },
        {
          "name": "tierPrice",
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
    },
    {
      "code": 6007,
      "name": "IncorrectTier",
      "msg": "Incorrect Tier!"
    },
    {
      "code": 6008,
      "name": "UnauthorizedFundsHandler",
      "msg": "Unauthorized Funds Handler!"
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
          "name": "nodeSaleAccount",
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
        },
        {
          "name": "fundsHandler",
          "type": "publicKey"
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
          "name": "nodeSaleAccount",
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
          "name": "tierLimit",
          "type": {
            "vec": "u64"
          }
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
          "name": "nodeSaleAccount",
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
          "name": "tierPrice",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "setFundsHandler",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nodeSaleAccount",
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
          "name": "fundsHandler",
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
          "name": "nodeSaleAccount",
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
      "name": "addWhitelistAddresses",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
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
        },
        {
          "name": "listNumber",
          "type": "bool"
        }
      ]
    },
    {
      "name": "buyNode",
      "accounts": [
        {
          "name": "nodeSaleAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "discountCodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerPubkey",
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
          "name": "quantity",
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
          "name": "nodeSaleAccount",
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
          "name": "nodeSaleAccount",
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
          "name": "nodeSaleAccount",
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
      "name": "getFundsHandler",
      "accounts": [
        {
          "name": "nodeSaleAccount",
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
          "name": "userAccount",
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
          "name": "userAccount",
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
          "name": "nodeSaleAccount",
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
          },
          {
            "name": "ownerInitialized",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalNodesHeld",
            "type": "u64"
          },
          {
            "name": "inEarlySale",
            "type": "bool"
          },
          {
            "name": "inWhiteList1",
            "type": "bool"
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
      "name": "nodeSale",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tierLimit",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "tierPrice",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "fundsHandler",
            "type": "publicKey"
          },
          {
            "name": "earlySaleStatus",
            "type": "bool"
          },
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
      "name": "InitializeEvent",
      "fields": [
        {
          "name": "owner",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ownerInitialized",
          "type": "bool",
          "index": false
        },
        {
          "name": "currentTierNumber",
          "type": "u64",
          "index": false
        },
        {
          "name": "fundsHandler",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "OwnerEvent",
      "fields": [
        {
          "name": "owner",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ownerInitStatus",
          "type": "bool",
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
        },
        {
          "name": "inWhiteList1",
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
      "name": "SetTierLimitEvent",
      "fields": [
        {
          "name": "tierLimit",
          "type": {
            "vec": "u64"
          },
          "index": false
        }
      ]
    },
    {
      "name": "GetTierLimitEvent",
      "fields": [
        {
          "name": "tierNumber",
          "type": "u64",
          "index": false
        },
        {
          "name": "tierLimit",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "SetTierPriceEvent",
      "fields": [
        {
          "name": "tierPrice",
          "type": {
            "vec": "u64"
          },
          "index": false
        }
      ]
    },
    {
      "name": "GetTierPriceEvent",
      "fields": [
        {
          "name": "tierNumber",
          "type": "u64",
          "index": false
        },
        {
          "name": "tierPrice",
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
    },
    {
      "code": 6007,
      "name": "IncorrectTier",
      "msg": "Incorrect Tier!"
    },
    {
      "code": 6008,
      "name": "UnauthorizedFundsHandler",
      "msg": "Unauthorized Funds Handler!"
    }
  ]
};
