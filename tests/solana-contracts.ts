import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaContracts } from "../target/types/solana_contracts";

describe("solana-contracts", () => {

  // Next you get your provider
  const provider = anchor.AnchorProvider.env();

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaContracts as Program<SolanaContracts>;
  let owner_account = anchor.web3.Keypair.generate();

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
  });
});
