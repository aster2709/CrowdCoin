import web3 from "./web3";
import { abi } from "./build/Campaign.json";
function Campaign(addr) {
  return new web3.eth.Contract(abi, addr);
}
export default Campaign;
