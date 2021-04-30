const solc = require("solc");
const path = require("path");
const fs = require("fs-extra");
const contractPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(contractPath, "utf8");
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
const input = {
  language: "Solidity",
  sources: {
    campaign: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts
  .campaign;
console.log(output);
for (let x in output) {
  fs.outputJSONSync(path.resolve(buildPath, x + ".json"), output[x]);
}
