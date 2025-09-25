const Web3 = require('web3');
const path = require('path');
const contractJSON = require(path.resolve(__dirname, '../../build/contracts/AgriProduce.json'));

const initBlockchain = async () => {
    const web3 = new Web3("http://127.0.0.1:7545"); // Ganache GUI RPC
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = contractJSON.networks[networkId];
    const contract = new web3.eth.Contract(contractJSON.abi, deployedNetwork && deployedNetwork.address);
    return { web3, contract };
};

module.exports = initBlockchain;
