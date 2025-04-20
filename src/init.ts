/***
 *
 * init.ts
 *
 * Purpose: This script computes the address to manually send the mint baton after Genesis
 *
 ***/
import * as dotenv from "dotenv";
dotenv.config();

import { BITBOX } from "bitbox-sdk";
import { Utils } from "slpjs";
import {encodeCashAddress} from 'ecashaddrjs'

const bitbox = new BITBOX();

const contractStateT0 = "00000000";
const vaultHexTail = process.env.MINER_COVENANT_V1 as string;

const encodeAsHex = (n: number) => {
    return bitbox.Script.encode([bitbox.Script.encodeNumber(n)]).toString("hex");
};
const initialMintAmount = encodeAsHex(parseInt(process.env.TOKEN_INIT_REWARD_V1 as string, 10));
const difficultyLeadingZeroBytes = encodeAsHex(parseInt(process.env.MINER_DIFFICULTY_V1 as string, 10));
const halvingInterval = encodeAsHex(parseInt(process.env.TOKEN_HALVING_INTERVAL_V1 as string, 10));
const startingBlockHeight = encodeAsHex(parseInt(process.env.TOKEN_START_BLOCK_V1 as string, 10));

const vaultHexT0 = `04${contractStateT0}20${process.env.TOKEN_ID_V1}${initialMintAmount}${difficultyLeadingZeroBytes}${halvingInterval}${startingBlockHeight}${vaultHexTail}`;

console.log("🚀 ~ startingBlockHeight:", startingBlockHeight)
console.log("🚀 ~ halvingInterval:", halvingInterval)
console.log("🚀 ~ difficultyLeadingZeroBytes:", difficultyLeadingZeroBytes)
console.log("🚀 ~ initialMintAmount:", initialMintAmount)
console.log("🚀 ~ process.env.TOKEN_ID_V1:", process.env.TOKEN_ID_V1)
console.log("🚀 ~ vaultHexT0:", vaultHexT0);

const redeemScriptBufT0 = Buffer.from(vaultHexT0, "hex");
const vaultHash160 = bitbox.Crypto.hash160(redeemScriptBufT0);
// const vaultAddressT0 = Utils.slpAddressFromHash160(vaultHash160, "mainnet", "p2sh");
const vaultAddressT0 = encodeCashAddress('ecash', 'p2sh', vaultHash160);

// console.log("****************");
// console.log("****************");
// console.log(`Send baton here to create mining vault -> ${vaultAddressT0}`);
// console.log("****************");
// console.log("****************");

console.log("****************");
console.log("****************");
console.log(`Send baton here to create ecash mining vault -> ${vaultAddressT0}`);
console.log("****************");
console.log("****************");
