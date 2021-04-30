const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs-extra");
const Web3 = require("web3");
const { mnemonic, infuraRinkeby } = require("./config.json");
const { abi, evm } = require("./build/CampaignFactory.json");
const provider = new HDWalletProvider(mnemonic, infuraRinkeby);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(`attempting to deploy from ${accounts[0]}`);
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "3000000" });
  const addr = result.options.address;
  console.log(`deployed successfully to ${addr}`);
  const stream = fs.createWriteStream("deployed.txt", { flags: "a" });

  const current = new Date();
  stream.write(`deployed at ${addr} on ${current.toLocaleString()}\n`);
  stream.end();
  provider.engine.stop();
};
deploy();
