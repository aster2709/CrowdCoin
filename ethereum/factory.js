import web3 from "./web3";
const addr = "0x237a08516EB28118910adFb9c5bC9728570F7aCe";
import { abi } from "./build/CampaignFactory.json";
const factory = new web3.eth.Contract(abi, addr);
export default factory;
