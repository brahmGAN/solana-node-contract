import * as anchor from "@coral-xyz/anchor";
import { Program ,web3} from "@coral-xyz/anchor";
import { SolanaNodeContract } from "../target/types/solana_node_contract";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import {
  findMasterEditionPda,
  findMetadataPda,
  mplTokenMetadata,
  MPL_TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {  publicKey } from "@metaplex-foundation/umi";

import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { string } from "@metaplex-foundation/umi/serializers";


describe("solana_node_contract", async() => {
  // Configure the client to use the local cluster
  const provider=anchor.AnchorProvider.env();

  
  anchor.setProvider(provider);
  const programId = new web3.PublicKey("CEgAFRtqR7jPeagKQuJyNGKtaMqtH1X4yL2JSyDmrjac");
  const program = anchor.workspace.SolanaNodeContract as Program<SolanaNodeContract>;
  
  let ownerKeypair:anchor.web3.PublicKey;
  let nodeSaleKeypair:anchor.web3.PublicKey;
  let fundsHandler=new anchor.web3.PublicKey("FUFPLD9TbrhpG15nNHu76rRKVJGwHBc3hvvJaDD57f6t")
  // let userKeypair=web3.Keypair.generate();

  console.log(`🚀 ~ describe ~ fundsHandler:`, fundsHandler);
  const secretkey=new Uint8Array([93,35,117,21,47,11,89,116,147,126,160,204,190,14,48,223,78,223,181,3,223,8,73,180,192,87,169,206,94,233,172,58,35,213,47,17,73,245,6,110,47,73,229,229,116,235,2,83,187,39,49,56,95,43,121,96,198,3,202,165,155,224,146,101])

  let userKeypair=web3.Keypair.fromSecretKey(secretkey)

  console.log(`🚀 ~ describe ~ userKeypair:`, userKeypair.publicKey.toString());

  
  let payerKeypair=provider.wallet;
  console.log(`🚀 ~ describe ~ provider:`, payerKeypair.publicKey);
  
 
  
  beforeEach(async()=>{
    
    
    
    
    // const airdropSignature = await provider.connection.requestAirdrop(
    //   fundsHandler,
    //   anchor.web3.LAMPORTS_PER_SOL * 2 // Airdrop 2 SOL
    // );
    // await provider.connection.confirmTransaction(airdropSignature, 'confirmed');
    // console.log("Airdropped 2 SOL to payer account:", payerKeypair.publicKey.toString());
    // const airdropSignature2 = await provider.connection.requestAirdrop(
    //   fundsHandler,
    //   anchor.web3.LAMPORTS_PER_SOL * 20 // Airdrop 2 SOL
    // );
    // // await provider.connection.confirmTransaction(airdropSignature2, 'confirmed');
    // console.log("Airdropped 2 SOL to payer account:", userKeypair.publicKey.toString());
    
   
    ownerKeypair = (await web3.PublicKey.findProgramAddressSync([Buffer.from("owner")], programId))[0];
    nodeSaleKeypair= (await web3.PublicKey.findProgramAddressSync([Buffer.from("node_sale_account")], programId))[0];
    console.log(`🚀 ~ beforeEach ~ ownerKeypair:`, ownerKeypair);
    console.log(`🚀 ~ beforeEach ~ nodeSaleKeypair:`, nodeSaleKeypair);
    
    
  })

  it("calling total node held", async()=>{
    let user=(await web3.PublicKey.findProgramAddressSync( [provider.wallet.publicKey.toBuffer()], programId))[0];

    console.log(`🚀 ~ it ~ user:`, user);

   
     const tx=await program.methods.setTotalNodesHeld(provider.wallet.publicKey).accounts({
      userAccount: user,
      payer: provider.wallet.publicKey,
      systemProgram:anchor.web3.SystemProgram.programId,
     }).signers([]).rpc()

     try {
            const latestBlock = await provider.connection.getLatestBlockhash();
            await provider.connection.confirmTransaction({
              blockhash: latestBlock.blockhash,
              lastValidBlockHeight: latestBlock.lastValidBlockHeight,
              signature: tx,
            });
          } catch (err) {
            console.log("error in initialize: ", err);
          }


  })



  const signer =provider.wallet;

  const umi = createUmi("https://api.devnet.solana.com")
    .use(walletAdapterIdentity(signer))
    .use(mplTokenMetadata());

  const mint = anchor.web3.Keypair.generate();

  console.log("mint  ",mint.publicKey.toString())

  // Derive the associated token address account for the mint
  const associatedTokenAccount = await getAssociatedTokenAddress(
    mint.publicKey,
    signer.publicKey
  );

  console.log("associatedTokenAccount ", associatedTokenAccount.toString())

  // derive the metadata account
  let metadataAccount = findMetadataPda(umi, {
    mint: publicKey(mint.publicKey),
  })[0];

  console.log("metadataAccount ", metadataAccount.toString());
  
  //derive the master edition pda
  let masterEditionAccount = findMasterEditionPda(umi, {
    mint: publicKey(mint.publicKey),
  })[0];
  console.log("masterEditionAccount ",masterEditionAccount.toString());
  

  let user=(await web3.PublicKey.findProgramAddressSync( [provider.publicKey.toBuffer()], programId))[0];
  let mint_ata=(await web3.PublicKey.findProgramAddressSync( [mint.publicKey.toBuffer()], programId))[0];

  console.log(`🚀 ~ describe ~ mint_ata:`, mint_ata.toString());


  console.log(`🚀 ~ it ~ user:`, user.toString());


        console.log(`🚀 ~ it ~  masterEditionAccount:`,  masterEditionAccount.toString());


        console.log(`🚀 ~ it ~ metadataAccount:`, metadataAccount.toString());


        console.log(`🚀 ~ it ~ associatedTokenAccount:`, associatedTokenAccount.toString());


        console.log(`🚀 ~ it ~ mint.publicKey:`, mint.publicKey.toString);


        console.log(`🚀 ~ it ~ provider.publicKey:`, provider.publicKey);

  it("mints nft!", async () => {
    const tx = await program.methods
      .initNft()
      .accounts({
        signer: provider.publicKey,
        mint: mint.publicKey,
        associatedTokenAccount,
        metadataAccount,
        masterEditionAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        userAccount:user
      })

        

      .signers([mint])
      .rpc();

    console.log(
      `mint nft tx: https://explorer.solana.com/tx/${tx}?cluster=devnet`
    );
    console.log(
      `minted nft: https://explorer.solana.com/address/${mint.publicKey}?cluster=devnet`
    );
  });
  it("it burn the minted nft", async()=>{

    let email=new String("hello@test.com")



    const tx=await program.methods.burntNft("hello", "evm_Address").accounts({
      associatedTokenAccount,
      mint: mint.publicKey,
      signer: provider.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([]).rpc();


    console.log(
      `Burn nft tx: https://explorer.solana.com/tx/${tx}?cluster=devnet`
    );
  })





  it(" total get held", async()=>{

    delay(5000);
    let data= await program.account.user.fetch(user);

    console.log(`🚀 ~ describe ~ data:`,Number(data.totalNodesHeld));
  })

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

          

          
  
//  it("testing intial function",async()=>{
    
    
//     let tier= new BN(1);

//     const tx= await program.methods.initialize(tier,fundsHandler).accounts({
//       nodeSaleAccount:nodeSaleKeypair,
//       ownerAccount:ownerKeypair,
//       payer:payerKeypair.publicKey,
//       systemProgram:anchor.web3.SystemProgram.programId
//     }).signers([]).rpc()

//     console.log(tx);
//     // await provider.connection.confirmTransaction(tx,"confirmed");

//     try {
//       const latestBlock = await provider.connection.getLatestBlockhash();
//       await provider.connection.confirmTransaction({
//         blockhash: latestBlock.blockhash,
//         lastValidBlockHeight: latestBlock.lastValidBlockHeight,
//         signature: tx,
//       });
//     } catch (err) {
//       console.log("error in initialize: ", err);
//     }


//   }
// )


// it (" set tier limit ",async()=>{

//   let tier= [new BN(0),new BN(1),new BN(2),new BN(2),new BN(2),new BN(2),new BN(2),new BN(2),new BN(2),new BN(2),new BN(2)]
//   const tx2= await program.methods.setTierLimit(tier).accounts({
//     nodeSaleAccount:nodeSaleKeypair,
//     payer:provider.wallet.publicKey,
//     ownerAccount:ownerKeypair,
//     systemProgram: anchor.web3.SystemProgram.programId
//   }).signers([]).rpc();
//   console.log(`🚀 ~ tx ~ tx:222`, tx2);

//   try {
//     const latestBlock = await provider.connection.getLatestBlockhash();
//     await provider.connection.confirmTransaction({
//       blockhash: latestBlock.blockhash,
//       lastValidBlockHeight: latestBlock.lastValidBlockHeight,
//       signature: tx2,
//     });
//   } catch (err) {
//     console.log("error in set tier: ", err);
//   }

  



// })


// it ("set sale price", async()=>{


//   let tierprice = [new BN(0),new BN(1),new BN(0),new BN(30),new BN(50),new BN(60),new BN(70),new BN(80),new BN(90),new BN(100)]
//   let tx3=await program.methods.setTierPrice(tierprice).accounts({

    
    
    
//     nodeSaleAccount: nodeSaleKeypair,
//     ownerAccount:ownerKeypair,
//     payer:provider.wallet.publicKey,
//     systemProgram :anchor.web3.SystemProgram.programId,
//   }).signers([]).rpc();

//   console.log(`🚀 ~ tx3 ~ tx3:`, tx3);
//   try {
//     const latestBlock = await provider.connection.getLatestBlockhash();
//     await provider.connection.confirmTransaction({
//       blockhash: latestBlock.blockhash,
//       lastValidBlockHeight: latestBlock.lastValidBlockHeight,
//       signature: tx3,
//     });
//   } catch (err) {
//     console.log("error in set sale price: ", err);
//   }



// })




// it ("set sale status", async()=>{

//   const tx4=await program.methods.setSaleStatus(8,true).accounts({

//     nodeSaleAccount: nodeSaleKeypair,
//     payer:provider.wallet.publicKey,
//     ownerAccount: ownerKeypair,
//     systemProgram:  anchor.web3.SystemProgram.programId
//   }).signers([]).rpc();

//   console.log(`🚀 ~ tx3 ~ tx3:`, tx4);


//   try {
//     const latestBlock = await provider.connection.getLatestBlockhash();
//     await provider.connection.confirmTransaction({
//       blockhash: latestBlock.blockhash,
//       lastValidBlockHeight: latestBlock.lastValidBlockHeight,
//       signature: tx4,
//     });
//   } catch (err) {
//     console.log("error in set sale price: ", err);
//   }

// })

// it ("it will buy node ",async()=>{

//   let quantity=new BN(1);
//   let discountCodeAccount=(await web3.PublicKey.findProgramAddressSync([Buffer.from("GPU")], programId))[0];
//   let user=(await web3.PublicKey.findProgramAddressSync( [userKeypair.publicKey.toBuffer()], programId))[0];
//   const tx5=await program.methods.buyNode("GPU",quantity).accounts({
//     nodeSaleAccount:nodeSaleKeypair,
//     userAccount:user,
//     discountCodeAccount:discountCodeAccount,
//     fundsHandlerPubkey: fundsHandler,
//     payer:userKeypair.publicKey,
//     systemProgram:  anchor.web3.SystemProgram.programId ,
    
//   }).signers([userKeypair]).rpc()

   

//   try {
//     const latestBlock = await provider.connection.getLatestBlockhash();
//     await provider.connection.confirmTransaction({
//       blockhash: latestBlock.blockhash,
//       lastValidBlockHeight: latestBlock.lastValidBlockHeight,
//       signature: tx5,
//     });
//   } catch (err) {
//     console.log("error in set sale price: ", err);
//   }
// })





});