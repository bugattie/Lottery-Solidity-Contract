// The goal of this contract is to setup a local copy of the contract that referes to the correct address on the sepolia network.
// And web3 in an internal part to making this connection
import web3 from "./web3";

const deployedTo = "0xeDe28761F0C31E086695F70C695b1C8423F20736";
const contractAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [],
    name: "addPlayers",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [[Object]],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [[Object]],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pickWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [[Object]],
    name: "players",
    outputs: [[Object]],
    stateMutability: "view",
    type: "function",
  },
];

const lotteryContract = new web3.eth.Contract(contractAbi, deployedTo);

export default lotteryContract;
