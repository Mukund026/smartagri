import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contracts';

let web3;
let contract;

export const initWeb3 = async () => {
  if(window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else if(window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
  }
  contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return { web3, contract };
};

export const getAccounts = async () => {
  if(!web3) await initWeb3();
  return await web3.eth.getAccounts();
};

export const getContract = async () => {
  if(!contract) await initWeb3();
  return contract;
};
