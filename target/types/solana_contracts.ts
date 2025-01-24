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
        "@dev Add and remove a discount code by switching the boolean"
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
      "name": "setSwapStatus",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapStatusAccount",
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
          "name": "types",
          "type": "u8"
        },
        {
          "name": "status",
          "type": "bool"
        }
      ]
    },
    {
      "name": "setUserAddress",
      "accounts": [
        {
          "name": "userAddressAccount",
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
          "name": "email",
          "type": "string"
        },
        {
          "name": "evmAddress",
          "type": "string"
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
      "name": "swapBarrels",
      "accounts": [
        {
          "name": "userAddressAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapStatusAccount",
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
    },
    {
      "name": "getUserAddress",
      "accounts": [
        {
          "name": "userAddressAccount",
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
      "name": "initNft",
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
          "name": "signer",
          "isMut": true,
          "isSigner": true
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
      "args": []
    },
    {
      "name": "setTotalNodesBurnt",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAddressAccount",
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
          "name": "quantity",
          "type": "u64"
        }
      ]
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
      "name": "userAddress",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "evmAddress",
            "type": "string"
          },
          {
            "name": "status",
            "type": "bool"
          },
          {
            "name": "totalNodesBurnt",
            "type": "u64"
          },
          {
            "name": "totalCreditsClaimed",
            "type": "u64"
          },
          {
            "name": "totalQueensHeld",
            "type": "u64"
          },
          {
            "name": "totalValidatorsHeld",
            "type": "u64"
          },
          {
            "name": "totalKingsHeld",
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
          },
          {
            "name": "totalDiscountCodeUsage",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
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
      "name": "swapStatus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creditsStatus",
            "type": "bool"
          },
          {
            "name": "queenStatus",
            "type": "bool"
          },
          {
            "name": "validatorsStatus",
            "type": "bool"
          },
          {
            "name": "kingStatus",
            "type": "bool"
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
        },
        {
          "name": "totalDiscountCodeUsage",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalAmount",
          "type": "u64",
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
        },
        {
          "name": "totalDiscountCodeUsage",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalDiscountCodeAmount",
          "type": "u64",
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
      "name": "SwapBarrelsEvent",
      "fields": [
        {
          "name": "userPubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "userEmail",
          "type": "string",
          "index": false
        },
        {
          "name": "evmAddress",
          "type": "string",
          "index": false
        },
        {
          "name": "role",
          "type": "u8",
          "index": false
        },
        {
          "name": "creditsToBeClaimed",
          "type": "u64",
          "index": false
        },
        {
          "name": "queenToBeClaimed",
          "type": "u64",
          "index": false
        },
        {
          "name": "validatorsToBeClaimed",
          "type": "u64",
          "index": false
        },
        {
          "name": "kingToBeClaimed",
          "type": "u64",
          "index": false
        },
        {
          "name": "quantity",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "UseAddressEvent",
      "fields": [
        {
          "name": "email",
          "type": "string",
          "index": false
        },
        {
          "name": "evmAddress",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "bool",
          "index": false
        },
        {
          "name": "totalNodesBurnt",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalCreditsClaimed",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalQueensHeld",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalValidatorsHeld",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalKingsHeld",
          "type": "u64",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
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
      "name": "InsufficientTierLimit",
      "msg": "Quantity exceedes available tier limtits!"
    },
    {
      "code": 6003,
      "name": "ExceededMaxPurchaseLimit",
      "msg": "Cannot purchase more than 770 nodes in one single Tx!"
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
      "msg": "You aren't a part of whitelist-1 sale!"
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
    },
    {
      "code": 6013,
      "name": "ExceededMaxQuantity",
      "msg": "Exceeded Max Quantity of nodes that can be bought!"
    },
    {
      "code": 6014,
      "name": "MintNotAvailable",
      "msg": "Cannot mint the NFT's yet!"
    },
    {
      "code": 6015,
      "name": "UserAddressAlreadySet",
      "msg": "User address already set!"
    },
    {
      "code": 6016,
      "name": "UserEmailEvmNotFound",
      "msg": "Register your email and evm address!"
    },
    {
      "code": 6017,
      "name": "CreditsSwapNotYetAvailable",
      "msg": "Credits Swap Not Yet Available!"
    },
    {
      "code": 6018,
      "name": "QueenSwapNotYetAvailable",
      "msg": "Queen Swap Not Yet Available!"
    },
    {
      "code": 6019,
      "name": "ValidatorSwapNotYetAvailable",
      "msg": "Validator Swap Not Yet Available!"
    },
    {
      "code": 6020,
      "name": "KingSwapNotYetAvailable",
      "msg": "King Swap Not Yet Available!"
    },
    {
      "code": 6021,
      "name": "InsufficientNodesBurntForCredits",
      "msg": "Insufficient Nodes Burnt for credits!"
    },
    {
      "code": 6022,
      "name": "InsufficientNodesBurntForQueen",
      "msg": "Insufficient Nodes Burnt for queen!"
    },
    {
      "code": 6023,
      "name": "InsufficientNodesBurntForValidators",
      "msg": "Insufficient Nodes Burnt for validators!"
    },
    {
      "code": 6024,
      "name": "InsufficientNodesBurntForking",
      "msg": "Insufficient Nodes Burnt for king!"
    },
    {
      "code": 6025,
      "name": "InvalidSwapStatus",
      "msg": "Invalid Type of swap status!"
    },
    {
      "code": 6026,
      "name": "InvalidSwapRole",
      "msg": "Invalid swap role!"
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
        "@dev Add and remove a discount code by switching the boolean"
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
      "name": "setSwapStatus",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapStatusAccount",
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
          "name": "types",
          "type": "u8"
        },
        {
          "name": "status",
          "type": "bool"
        }
      ]
    },
    {
      "name": "setUserAddress",
      "accounts": [
        {
          "name": "userAddressAccount",
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
          "name": "email",
          "type": "string"
        },
        {
          "name": "evmAddress",
          "type": "string"
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
      "name": "swapBarrels",
      "accounts": [
        {
          "name": "userAddressAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapStatusAccount",
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
    },
    {
      "name": "getUserAddress",
      "accounts": [
        {
          "name": "userAddressAccount",
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
      "name": "initNft",
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
          "name": "signer",
          "isMut": true,
          "isSigner": true
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
      "args": []
    },
    {
      "name": "setTotalNodesBurnt",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAddressAccount",
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
          "name": "quantity",
          "type": "u64"
        }
      ]
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
      "name": "userAddress",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "evmAddress",
            "type": "string"
          },
          {
            "name": "status",
            "type": "bool"
          },
          {
            "name": "totalNodesBurnt",
            "type": "u64"
          },
          {
            "name": "totalCreditsClaimed",
            "type": "u64"
          },
          {
            "name": "totalQueensHeld",
            "type": "u64"
          },
          {
            "name": "totalValidatorsHeld",
            "type": "u64"
          },
          {
            "name": "totalKingsHeld",
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
          },
          {
            "name": "totalDiscountCodeUsage",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
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
      "name": "swapStatus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creditsStatus",
            "type": "bool"
          },
          {
            "name": "queenStatus",
            "type": "bool"
          },
          {
            "name": "validatorsStatus",
            "type": "bool"
          },
          {
            "name": "kingStatus",
            "type": "bool"
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
        },
        {
          "name": "totalDiscountCodeUsage",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalAmount",
          "type": "u64",
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
        },
        {
          "name": "totalDiscountCodeUsage",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalDiscountCodeAmount",
          "type": "u64",
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
      "name": "SwapBarrelsEvent",
      "fields": [
        {
          "name": "userPubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "userEmail",
          "type": "string",
          "index": false
        },
        {
          "name": "evmAddress",
          "type": "string",
          "index": false
        },
        {
          "name": "role",
          "type": "u8",
          "index": false
        },
        {
          "name": "creditsToBeClaimed",
          "type": "u64",
          "index": false
        },
        {
          "name": "queenToBeClaimed",
          "type": "u64",
          "index": false
        },
        {
          "name": "validatorsToBeClaimed",
          "type": "u64",
          "index": false
        },
        {
          "name": "kingToBeClaimed",
          "type": "u64",
          "index": false
        },
        {
          "name": "quantity",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "UseAddressEvent",
      "fields": [
        {
          "name": "email",
          "type": "string",
          "index": false
        },
        {
          "name": "evmAddress",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "bool",
          "index": false
        },
        {
          "name": "totalNodesBurnt",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalCreditsClaimed",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalQueensHeld",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalValidatorsHeld",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalKingsHeld",
          "type": "u64",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
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
      "name": "InsufficientTierLimit",
      "msg": "Quantity exceedes available tier limtits!"
    },
    {
      "code": 6003,
      "name": "ExceededMaxPurchaseLimit",
      "msg": "Cannot purchase more than 770 nodes in one single Tx!"
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
      "msg": "You aren't a part of whitelist-1 sale!"
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
    },
    {
      "code": 6013,
      "name": "ExceededMaxQuantity",
      "msg": "Exceeded Max Quantity of nodes that can be bought!"
    },
    {
      "code": 6014,
      "name": "MintNotAvailable",
      "msg": "Cannot mint the NFT's yet!"
    },
    {
      "code": 6015,
      "name": "UserAddressAlreadySet",
      "msg": "User address already set!"
    },
    {
      "code": 6016,
      "name": "UserEmailEvmNotFound",
      "msg": "Register your email and evm address!"
    },
    {
      "code": 6017,
      "name": "CreditsSwapNotYetAvailable",
      "msg": "Credits Swap Not Yet Available!"
    },
    {
      "code": 6018,
      "name": "QueenSwapNotYetAvailable",
      "msg": "Queen Swap Not Yet Available!"
    },
    {
      "code": 6019,
      "name": "ValidatorSwapNotYetAvailable",
      "msg": "Validator Swap Not Yet Available!"
    },
    {
      "code": 6020,
      "name": "KingSwapNotYetAvailable",
      "msg": "King Swap Not Yet Available!"
    },
    {
      "code": 6021,
      "name": "InsufficientNodesBurntForCredits",
      "msg": "Insufficient Nodes Burnt for credits!"
    },
    {
      "code": 6022,
      "name": "InsufficientNodesBurntForQueen",
      "msg": "Insufficient Nodes Burnt for queen!"
    },
    {
      "code": 6023,
      "name": "InsufficientNodesBurntForValidators",
      "msg": "Insufficient Nodes Burnt for validators!"
    },
    {
      "code": 6024,
      "name": "InsufficientNodesBurntForking",
      "msg": "Insufficient Nodes Burnt for king!"
    },
    {
      "code": 6025,
      "name": "InvalidSwapStatus",
      "msg": "Invalid Type of swap status!"
    },
    {
      "code": 6026,
      "name": "InvalidSwapRole",
      "msg": "Invalid swap role!"
    }
  ]
};
