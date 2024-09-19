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
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "earlySaleAccount",
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
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
          "isMut": true,
          "isSigner": false
        },
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
      "name": "setEarlySaleOn",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
          "isMut": true,
          "isSigner": false
        },
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
      "returns": "u64"
    },
    {
      "name": "getEarlySaleOn",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
          "isMut": true,
          "isSigner": false
        },
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
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
          "isMut": true,
          "isSigner": false
        },
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
      "returns": "publicKey"
    },
    {
      "name": "getTotalNodesOwned",
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
          },
          {
            "name": "ownerInitialized",
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
            "name": "earlySaleOn",
            "type": "bool"
          },
          {
            "name": "totalNodes",
            "type": "u64"
          },
          {
            "name": "inEarlySale",
            "type": "bool"
          },
          {
            "name": "nodesBought",
            "type": "u64"
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
              "vec": "u64"
            }
          },
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
          "name": "earlySaleAccount",
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
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
          "isMut": true,
          "isSigner": false
        },
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
      "name": "setEarlySaleOn",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
          "isMut": true,
          "isSigner": false
        },
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
      "returns": "u64"
    },
    {
      "name": "getEarlySaleOn",
      "accounts": [
        {
          "name": "ownerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
          "isMut": true,
          "isSigner": false
        },
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
          "name": "buyNodeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tierAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fundsHandlerAccount",
          "isMut": true,
          "isSigner": false
        },
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
      "returns": "publicKey"
    },
    {
      "name": "getTotalNodesOwned",
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
          },
          {
            "name": "ownerInitialized",
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
            "name": "earlySaleOn",
            "type": "bool"
          },
          {
            "name": "totalNodes",
            "type": "u64"
          },
          {
            "name": "inEarlySale",
            "type": "bool"
          },
          {
            "name": "nodesBought",
            "type": "u64"
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
              "vec": "u64"
            }
          },
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
