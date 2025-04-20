/***
 *
 * convert.ts
 *
 * Purpose: This script convert mnemonic phrase into private key, public key and wif
 *
 ***/
import * as dotenv from "dotenv";
import { toHex } from "ecash-lib";
const BCHJS = require('@bcpros/xpi-js')
import wif from 'wif';
dotenv.config();
const XPI = new BCHJS({});


const convert = async () => {
    const mnemonic = "merit limit warfare enact gadget drive slight basket vicious slender melt sign"
//    const rootSeedBuffer = await XPI.Mnemonic.toSeed('lift plug rebuild bid glove sea skin harbor cluster then furnace wool');
   const rootSeedBuffer = await XPI.Mnemonic.toSeed(mnemonic);
   const masterHDNode = XPI.HDNode.fromSeed(rootSeedBuffer);
   const hdPath = `m/44'/1899'/0'/0/0`;
   const node = await XPI.HDNode.derivePath(masterHDNode, hdPath);
   const walletWif = XPI.HDNode.toWIF(node);
   const { privateKey }: { privateKey: Uint8Array } = wif.decode(walletWif);
   const publicKey = XPI.HDNode.toPublicKey(node).toString('hex');


    console.log("****************");
    console.log("****************");
    console.log(`Private Key -> ${toHex(privateKey)}`);
    console.log("****************");
    console.log(`Public Key -> ${publicKey}`);
    console.log("****************");
    console.log(`WIF -> ${walletWif}`);
    console.log("****************");
    console.log("****************");
}


convert();