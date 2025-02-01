import { Connection, Keypair, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

(async() => {
    // this script create a account with some byte space allocated 
    
    const connection = new Connection(process.env.RPC!);

    const dataAccount = Keypair.generate();
    console.log("Data Account: " + dataAccount.publicKey.toBase58());
    
    const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.PAYER!)));
    console.log("Payer's Address: " + payer.publicKey.toBase58());

    console.log("hi there1")
    const tx = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: dataAccount.publicKey,
            lamports: await connection.getMinimumBalanceForRentExemption(1000),
            space: 1000,
            programId: SystemProgram.programId
        })
    )

    console.log("hi there")
    const txId = await connection.sendTransaction(tx, [payer, dataAccount]);

    console.log(`Created account with transaction ID: ${txId}`);

})();
