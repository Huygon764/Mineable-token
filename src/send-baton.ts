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
import {ChronikClient} from 'chronik-client'
const BCHJS = require('@bcpros/xpi-js')
import wif from 'wif';
dotenv.config();
const XPI = new BCHJS({});
const ecc = new Ecc();

const send = async () => {
    const chronik = new ChronikClient(['https://chronik-native1.fabien.cash'])
    // Build a signature context for elliptic curve cryptography (ECC)
    const walletSk = fromHex(
        '53f3ca14c7191287f340976d8db71abdff7a26b0c0c86f2fffa4bd7adf51164e',
    );
    const walletPk = ecc.derivePubkey(walletSk);
    const walletPkh = shaRmd160(walletPk);
    const walletP2pkh = Script.p2pkh(walletPkh);

    const {hash, type} = decodeCashAddress('ecash:pptxcdlr85sg78hdsqfgyry5yuzfaqtspg0h58t7gl');
    const {utxos} = await chronik.script('p2pkh', Buffer.from(walletPkh).toString('hex')).utxos();

    // Tx builder
    const txBuild = new TxBuilder({
        inputs: [
            {
                input: {
                    prevOut: {
                        outIdx: utxos[2].outpoint.outIdx,
                        txid: utxos[2].outpoint.txid,
                    },
                    signData: {
                        value: utxos[2].sats,
                        outputScript: walletP2pkh
                    },  
                },
                signatory: P2PKHSignatory(walletSk, walletPk, ALL_BIP143),
            },
            {
                input: {
                    prevOut: {
                        outIdx: utxos[3].outpoint.outIdx,
                        txid: utxos[3].outpoint.txid,
                    },
                    signData: {
                        value: utxos[3].sats,
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
            },  
            {
                 value: 546n,
                script: Script.p2sh(Buffer.from(hash, 'hex'))
            },
            {
                value: 5000n,
                script: walletP2pkh
            }
        ],
    });
    const tx = txBuild.sign({ecc, feePerKb: 100, dustLimit: 546});
    const rawTx = tx.ser();
    console.log(toHex(rawTx));

    const txid = (await chronik.broadcastTx(rawTx)).txid;
    console.log("Sent successfully!");
    console.log("🚀 ~ send ~ txid:", txid);
}


send();