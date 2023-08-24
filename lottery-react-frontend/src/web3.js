import Web3 from "web3";

// Since, window.ethereum.enable().then(() => {}); is deprecated and may removed in future so the below line will work anyway
window.ethereum.request({ method: "eth_requestAccounts" });

const web3 = new Web3(window.ethereum);

export default web3;
