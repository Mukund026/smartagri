const Produce = require('../models/Produce');
const initBlockchain = require('../blockchain/blockchain');

exports.getProduceDetails = async (req, res) => {
  try {
    const produceId = req.params.id;

    const produce = await Produce.findById(produceId);
    if (!produce) return res.status(404).json({ error: "Produce not found" });

    const { web3, contract } = await initBlockchain();
    const blockchainData = await contract.methods.getProduce(produceId).call();

    res.json({ produce, blockchainData });
  } catch (error) {
    console.error('Get produce details error:', error);
    res.status(500).json({ error: "Server error while getting produce details" });
  }
};
