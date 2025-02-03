
import { createMint, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID, mintTo } from '@solana/spl-token';
import { Keypair, Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import dotenv from "dotenv";
dotenv.config();

const payer = Keypair.fromSecretKey(Uint8Array.from(process.env.PAYER!));

const mintAthority = payer;

const connection = new Connection(clusterApiUrl('devnet'));

async function createMintForToken(payer: Keypair, mintAuthority: PublicKey) {
    const mint = await createMint(
        connection,
        payer,
        mintAuthority,
        null,
        6
    );
    console.log('Mint created at', mint.toBase58());
    return mint;
}

async function mintNewTokens(mint: any, to: any, amount: any) { 
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        new PublicKey(to)
      );

      console.log('Token account created at', tokenAccount.address.toBase58());
      const tx = await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        amount
      )
      console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
      console.log(`Transaction Signature: ${tx}`);
}

async function main() {
    const mint = await createMintForToken(payer, mintAthority.publicKey);
    await mintNewTokens(mint, mintAthority.publicKey, 1000000);    
}

main();
