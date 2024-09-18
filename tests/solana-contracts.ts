import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaContracts } from "../target/types/solana_contracts";

describe("solana-contracts", () => {
  // First generate the account to initialize as your counter state
  let counter = anchor.web3.Keypair.generate();

  // Next you get your provider
  const provider = anchor.AnchorProvider.env();

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaContracts as Program<SolanaContracts>;

  it("Is initialized!", async () => {
    // const tx = await program.methods
    // .initialize()
    // .accounts({
    //   owner_account: counter.publicKey,
    //   caller: provider.publicKey,
    //   systemProgram: anchor.web3.SystemProgram.programId,
    // })
    // .signers([counter])
    // .rpc();
    // console.log("Your transaction signature", tx);
  });
});
