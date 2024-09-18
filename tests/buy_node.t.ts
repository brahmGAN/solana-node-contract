import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaContracts } from "../target/types/solana_contracts";

describe("Buy node contracts", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaContracts as Program<SolanaContracts>;
  let owner_account = anchor.web3.Keypair.generate();
  let buy_node_account = anchor.web3.Keypair.generate();
  let set_pda_account = anchor.web3.Keypair.generate();
  let get_pda_account = anchor.web3.Keypair.generate();
  let dummy = anchor.web3.Keypair.generate();
  let funds_handler = anchor.web3.Keypair.generate();

  describe("Initialize:",()=>{
    it("Is initialized!", async () => {
      const tx = await program.methods
        .initialize()
        .accounts({ 
          ownerAccount: owner_account.publicKey,
          caller: provider.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
         })
        .signers([owner_account])
        .rpc();
      console.log("Your transaction signature:", tx);
    });
    it("Should fail", async () => {
      const tx = await program.methods
        .initialize()
        .accounts({ 
          ownerAccount: dummy.publicKey,
          caller: provider.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
         })
        .signers([dummy])
        .rpc();
      console.log("Your transaction signature:", tx);
    });
  });

  // describe("Setter and getter functions:",()=>{
  //   it("Should set and get funds handler:",async()=>{
  //     const tx = await program.methods
  //       .setFundsHandler(funds_handler.publicKey)
  //       .accounts({ 
  //         ownerAccount: dummy.publicKey,
  //         caller: provider.publicKey,
  //         systemProgram: anchor.web3.SystemProgram.programId,
  //        })
  //       .signers([dummy])
  //       .rpc();
  //   });
  // });
});
