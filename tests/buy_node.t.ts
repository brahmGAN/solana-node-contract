// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { SolanaContracts } from "../target/types/solana_contracts";
// import { PublicKey } from '@solana/web3.js'; 
// describe("Buy node contracts", () => {

//   const provider = anchor.AnchorProvider.env();
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.SolanaContracts as Program<SolanaContracts>;
//   let owner_account = anchor.web3.Keypair.generate();
//   let buy_node_account = anchor.web3.Keypair.generate();
//   let set_pda_account = anchor.web3.Keypair.generate();
//   let get_pda_account = anchor.web3.Keypair.generate();
//   let dummy = anchor.web3.Keypair.generate();
//   let funds_handler = anchor.web3.Keypair.generate();

//   describe("Initialize:",()=>{
//     it("Is initialized!", async () => { 
//       const tx = await program.methods
//         .initialize()
//         .accounts({ 
//           ownerAccount: owner_account.publicKey,
//           caller: provider.publicKey,
//           systemProgram: anchor.web3.SystemProgram.programId,
//          })
//         .signers([owner_account])
//         .simulate();
//       console.log("Your transaction signature:", tx);

//       // const getOwner = await program.methods
//       // .getOwner()
//       // .accounts({ 
//       //   buyNodeAccount:buy_node_account.publicKey,
//       //   ownerAccount:owner_account.publicKey,
//       //   setPdaAccount:set_pda_account.publicKey,
//       //   checkPdaAccount:get_pda_account.publicKey,
//       //   caller: provider.publicKey,
//       //   systemProgram: anchor.web3.SystemProgram.programId,
//       //  })
//       // .signers([buy_node_account])
//       // .simulate();
//     });
//     // it("Should fail", async () => {
//     //   const tx = await program.methods
//     //     .initialize()
//     //     .accounts({ 
//     //       ownerAccount: owner_account.publicKey,
//     //       caller: provider.publicKey,
//     //       systemProgram: anchor.web3.SystemProgram.programId,
//     //      })
//     //     .signers([owner_account])
//     //     .simulate();
//     //   console.log("Your transaction signature:", tx);
//     // });
//   });

//   // describe("Setter and getter functions:",()=>{
//   //   it("Should set and get funds handler:",async()=>{
//   //     const tx = await program.methods
//   //       .setFundsHandler(funds_handler.publicKey)
//   //       .accounts({ 
//   //         ownerAccount: dummy.publicKey,
//   //         caller: provider.publicKey,
//   //         systemProgram: anchor.web3.SystemProgram.programId,
//   //        })
//   //       .signers([dummy])
//   //       .simulate();
//   //   });
// });


import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaContracts } from "../target/types/solana_contracts";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { PublicKey } from '@solana/web3.js'
const {expect} = require('chai'); 


describe("solana-contracts", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const provider = anchor.AnchorProvider.env();

  // Get the contract using ABI
  const contract = anchor.workspace.SolanaContracts as Program<SolanaContracts>;

  const payer = provider.wallet as anchor.Wallet;

  const [owner_account_pda,bump1] = PublicKey.findProgramAddressSync(
    [Buffer.from("owner")], 
    contract.programId
  );

  const [owner_int_account_pda,bump2] =  PublicKey.findProgramAddressSync(
    [Buffer.from("owner_init_account")], 
    contract.programId
  );

  const [funds_handler_account,bump3] =  PublicKey.findProgramAddressSync(
    [Buffer.from("funds_handler_account")], 
    contract.programId
  );

  let funds_handler = anchor.web3.Keypair.generate();


  describe("Initialize:",()=>{
    it("Should initialize", async () => {
      const tx = await contract.methods
          .initialize()
          .accounts({ 
            ownerAccount: owner_account_pda,
            ownerInitAccount: owner_int_account_pda,
            payer: payer.publicKey, 
            systemProgram: anchor.web3.SystemProgram.programId,
           })
          .signers([payer.payer])
          .simulate();
        console.log("Your transaction signature:", tx);

        const tx2 = await contract.methods
        .getOwner()
        .accounts({ 
          ownerAccount: owner_account_pda,
          payer: payer.publicKey, 
          systemProgram: anchor.web3.SystemProgram.programId,
         })
        .signers([payer.payer])
        .simulate();
        const events = tx2.events;
        const ownerEvent = events.find(event => event.name === "OwnerEvent");
        console.log("Owner:", ownerEvent.data.owner.toString());
        console.log("Tx1 events:", tx.events);
        console.log("Tx2 events:", tx2.events);
        console.log("Off Chain PDA:",owner_account_pda.toString());
        console.log("Tx2 raw:", tx2);
         
        const tx3 = await contract.methods
        .setFundsHandler(funds_handler.publicKey)
        .accounts({ 
          fundsHandlerAccount: funds_handler_account,
          ownerAccount: owner_account_pda,
          payer: payer.publicKey, 
          systemProgram: anchor.web3.SystemProgram.programId,
         })
        .signers([payer.payer])
        .simulate();
        const events1 = tx3.events;
        const setFundsHandlerEvent = events1.find(event => event.name === "FundsHandlerEvent");
        console.log("Funds Handler:", setFundsHandlerEvent.data.fundsHandler.toString());
        console.log("Tx3 events:", tx3.events);
        console.log("Tx3 raw:", tx3);
    });

    // it("Should check owner", async()=>{
    //   const tx = await contract.methods
    //     .getOwner()
    //     .accounts({ 
    //       ownerAccount: owner_account_pda,
    //       payer: payer.publicKey,
    //       systemProgram: anchor.web3.SystemProgram.programId,
    //      })
    //     .signers([payer.payer])
    //     .simulate();
    //     const events = tx.events;
    //     const ownerEvent = events.find(event => event.name === "OwnerEvent");
    //     console.log("Owner:", ownerEvent.data.owner.toString());
    //     console.log("Entie events:", tx.events);
    // });
  });
});