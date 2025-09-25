const Produce = require('../models/Produce');
const initBlockchain = require('../blockchain/blockchain');

exports.transferProduce = async (req, res) => {
  try {
    const { produceId, newOwner } = req.body;

    if (!produceId || !newOwner) {
      return res.status(400).json({ error: "produceId and newOwner are required" });
    }

    const produce = await Produce.findById(produceId);
    if (!produce) return res.status(404).json({ error: "Produce not found" });

    produce.owner = newOwner;
    produce.timestamps.push({ status: 'Transferred by distributor', time: new Date() });
    await produce.save();

    const { web3, contract } = await initBlockchain();
    const accounts = await web3.eth.getAccounts();

    await contract.methods.transferProduce(produceId, newOwner)
      .send({ from: accounts[0], gas: 3000000 });

    res.json({ message: "Produce transferred successfully", produce });
  } catch (error) {
    console.error('Transfer produce error:', error);
    res.status(500).json({ error: "Server error while transferring produce" });
  }
};
