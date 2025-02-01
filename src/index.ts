import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

(async() => {
    
    const connection = new Connection(process.env.RPC!);
    
    const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.PAYER!)));
    console.log("Payer's Address:" + payer.publicKey.toBase58());

    const lamports = 1 * LAMPORTS_PER_SOL;
    
    const recevier = Keypair.generate();
    console.log("recevier : " + recevier.publicKey.toBase58());
    
    const transaction = new Transaction();
    
    const ix = SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: recevier.publicKey,
        lamports
    });

    const tx = transaction.add(ix);

    const sign = await connection.sendTransaction(tx, [payer]);

    console.log("Signature : " + sign);

})();
