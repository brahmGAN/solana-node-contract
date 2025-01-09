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
      "name": "setSaleStatus",
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
          "name": "saleType",
          "type": "u8"
        },
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
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "associatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK - address"
          ]
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
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
        },
        {
          "name": "rent",
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
      "name": "swapIntoCredits",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventTracker",
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
          "name": "email",
          "type": "string"
        }
      ]
    },
    {
      "name": "swapIntoSuperNode",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventTracker",
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
          "name": "role",
          "type": "u8"
        },
        {
          "name": "quantity",
          "type": "u64"
        },
        {
          "name": "evmAddress",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
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
      "name": "getWhiteListOneSale",
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
      "name": "getGpuNetSale",
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
          },
          {
            "name": "whiteList1Sale",
            "type": "bool"
          },
          {
            "name": "gpuNetSale",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "eventTracker",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nodesToCreditsId",
            "type": "u64"
          },
          {
            "name": "nodesToSuperNodesId",
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
        },
        {
          "name": "saleType",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "SaleStatusEvent",
      "fields": [
        {
          "name": "saleType",
          "type": "string",
          "index": false
        },
        {
          "name": "saleStatus",
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
    },
    {
      "name": "NodesToCreditsEvent",
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
        },
        {
          "name": "userEmail",
          "type": "string",
          "index": false
        },
        {
          "name": "nodesBurnt",
          "type": "u64",
          "index": false
        },
        {
          "name": "nodesToCreditsId",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "NodesToSuperNodeEvent",
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
        },
        {
          "name": "userEmail",
          "type": "string",
          "index": false
        },
        {
          "name": "nodesBurnt",
          "type": "u64",
          "index": false
        },
        {
          "name": "role",
          "type": "u8",
          "index": false
        },
        {
          "name": "evmAddress",
          "type": "string",
          "index": false
        },
        {
          "name": "nodesToSuperNodesId",
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
    },
    {
      "code": 6009,
      "name": "WhiteList",
      "msg": "WhiteList-1 sale yet to complete!"
    },
    {
      "code": 6010,
      "name": "ReservedForNextSale",
      "msg": "Current tier onwards are reserved for next sale!"
    },
    {
      "code": 6011,
      "name": "SaleYetToBegin",
      "msg": "Sale is yet to begin!"
    },
    {
      "code": 6012,
      "name": "InvalidRole",
      "msg": "Invalid role provided!"
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
      "name": "setSaleStatus",
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
          "name": "saleType",
          "type": "u8"
        },
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
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "associatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK - address"
          ]
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
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
        },
        {
          "name": "rent",
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
      "name": "swapIntoCredits",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventTracker",
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
          "name": "email",
          "type": "string"
        }
      ]
    },
    {
      "name": "swapIntoSuperNode",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventTracker",
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
          "name": "role",
          "type": "u8"
        },
        {
          "name": "quantity",
          "type": "u64"
        },
        {
          "name": "evmAddress",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
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
      "name": "getWhiteListOneSale",
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
      "name": "getGpuNetSale",
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
          },
          {
            "name": "whiteList1Sale",
            "type": "bool"
          },
          {
            "name": "gpuNetSale",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "eventTracker",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nodesToCreditsId",
            "type": "u64"
          },
          {
            "name": "nodesToSuperNodesId",
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
        },
        {
          "name": "saleType",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "SaleStatusEvent",
      "fields": [
        {
          "name": "saleType",
          "type": "string",
          "index": false
        },
        {
          "name": "saleStatus",
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
    },
    {
      "name": "NodesToCreditsEvent",
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
        },
        {
          "name": "userEmail",
          "type": "string",
          "index": false
        },
        {
          "name": "nodesBurnt",
          "type": "u64",
          "index": false
        },
        {
          "name": "nodesToCreditsId",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "NodesToSuperNodeEvent",
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
        },
        {
          "name": "userEmail",
          "type": "string",
          "index": false
        },
        {
          "name": "nodesBurnt",
          "type": "u64",
          "index": false
        },
        {
          "name": "role",
          "type": "u8",
          "index": false
        },
        {
          "name": "evmAddress",
          "type": "string",
          "index": false
        },
        {
          "name": "nodesToSuperNodesId",
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
    },
    {
      "code": 6009,
      "name": "WhiteList",
      "msg": "WhiteList-1 sale yet to complete!"
    },
    {
      "code": 6010,
      "name": "ReservedForNextSale",
      "msg": "Current tier onwards are reserved for next sale!"
    },
    {
      "code": 6011,
      "name": "SaleYetToBegin",
      "msg": "Sale is yet to begin!"
    },
    {
      "code": 6012,
      "name": "InvalidRole",
      "msg": "Invalid role provided!"
    }
  ]
};
