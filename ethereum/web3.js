import Web3 from "web3";
let web3;

if (typeof window !== "undefined") {
  async function requestAccess() {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
  }
  requestAccess();
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/***REMOVED***"
  );
  web3 = new Web3(provider);
}

export default web3;
