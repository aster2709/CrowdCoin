import web3 from "./web3";
import jsonObj from "./build/Campaign.json";
const { abi } = jsonObj;
function Campaign(addr) {
  return new web3.eth.Contract(abi, addr);
}
export default Campaign;
