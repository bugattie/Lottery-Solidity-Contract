// Purpose of this file is to look into contracts directory and compile each of the solidity contracts that exist inside of it.
// This will generate interface(ABI - communication layer between the solidity world and the JavaScript world)
// This will also generate bytecode which will be deployed to Ethereum network

const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryContractPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const contractSource = fs.readFileSync(lotteryContractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contractBytecode =
  output.contracts["Lottery.sol"]["Lottery"].evm.bytecode.object;
const contractAbi = JSON.parse(
  output.contracts["Lottery.sol"]["Lottery"].metadata
).output.abi;

module.exports = { contractBytecode, contractAbi };
