/***
 *
 * send-baton.ts
 *
 * Purpose: This script is to send the just mint baton to p2sh contract address
 *
 ***/
import * as dotenv from "dotenv";
import { ALL_BIP143, Ecc, fromHex, P2PKHSignatory, Script, shaRmd160, slpSend, toHex, TxBuilder , SLP_FUNGIBLE, slpMintVault, TxBuilderInput, slpMint, pushBytesOp, UnsignedTxInput, sha256d, signWithSigHash, SigHashType} from "ecash-lib";
import { decodeCashAddress } from "ecashaddrjs";
import {ChronikClient, ScriptUtxo} from 'chronik-client'
const BCHJS = require('@bcpros/xpi-js')
import wif from 'wif';
dotenv.config();
const XPI = new BCHJS({});
const ecc = new Ecc();

const send = async () => {
    const chronik = new ChronikClient(['https://chronik-native1.fabien.cash'])
    // Build a signature context for elliptic curve cryptography (ECC)
    const sk = "870e89fb8ddff47ab703f0b9e8dec3b0695630955cbb02693444b64cd562a848" // add your pr key
    const walletSk = fromHex(sk);
    const walletPk = ecc.derivePubkey(walletSk);
    const walletPkh = shaRmd160(walletPk);
    const walletP2pkh = Script.p2pkh(walletPkh);

    const {hash, type} = decodeCashAddress('ecash:ppqcejyqhgjyd375w2n6shdg24798jvlnyqhut84em'); // address from init file
    const {utxos} = await chronik.script('p2pkh', Buffer.from(walletPkh).toString('hex')).utxos();

    // console.log("🚀 ~ send ~ utxos:", utxos)
    // return;

    // Tx builder
    let mintUtxo: ScriptUtxo;
    let amountUtxo: ScriptUtxo;
    utxos.map(utxo => {
        if (utxo?.token?.tokenId === process.env.TOKEN_ID_V1 && utxo?.token?.isMintBaton) {
            mintUtxo = utxo;
        }
        // amount > 50 to send
        if (Number(utxo.sats) > 5000) {
            amountUtxo = utxo;
        }
    })

    const txBuild = new TxBuilder({
        inputs: [
            {
                input: {
                    prevOut: {
                        outIdx: mintUtxo.outpoint.outIdx,
                        txid: mintUtxo.outpoint.txid,
                    },
                    signData: {
                        value: mintUtxo.sats,
                        outputScript: walletP2pkh
                    },  
                },
                signatory: P2PKHSignatory(walletSk, walletPk, ALL_BIP143),
            },
            {
                input: {
                    prevOut: {
                        outIdx: amountUtxo.outpoint.outIdx,
                        txid: amountUtxo.outpoint.txid,
                    },
                    signData: {
                        value: amountUtxo.sats,
                        outputScript: walletP2pkh
                    },
 
                },
                signatory: P2PKHSignatory(walletSk, walletPk, ALL_BIP143),
            },
        ],
        outputs: [
            {
                value: 0n,
                script: slpMint(process.env.TOKEN_ID_V1, SLP_FUNGIBLE, 0, 2)
            },
            {
                value: 546n,
                script: Script.p2sh(Buffer.from(hash, 'hex'))
            }, // dont understand why need output?  
            {
                 value: 546n,
                script: Script.p2sh(Buffer.from(hash, 'hex'))
            },
            walletP2pkh
        ],
    });
    const tx = txBuild.sign({ecc, feePerKb: 1000, dustLimit: 546});
    const rawTx = tx.ser();
    console.log("🚀 ~ send ~ amountUtxo:", amountUtxo)
    console.log("🚀 ~ send ~ mintUtxo:", mintUtxo)
    console.log(toHex(rawTx));

    const txid = (await chronik.broadcastTx(rawTx)).txid;
    console.log("Sent successfully!");
    console.log("🚀 ~ send ~ txid:", txid);
}




send();