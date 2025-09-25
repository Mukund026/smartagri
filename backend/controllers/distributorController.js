const Produce = require('../models/Produce');
const initBlockchain = require('../blockchain/blockchain');

exports.transferProduce = async (req, res) => {
    const { produceId, newOwner } = req.body;

    try {
        const produce = await Produce.findById(produceId);
        if (!produce) return res.status(404).json({ error: "Produce not found" });

        produce.owner = newOwner;
        produce.timestamps.push({ status: "Transferred by Distributor", time: new Date() });
        await produce.save();

        const { web3, contract } = await initBlockchain();
        const accounts = await web3.eth.getAccounts();
        await contract.methods.transferProduce(produceId, newOwner)
            .send({ from: accounts[0], gas: 3000000 });

        res.json({ message: "Produce transferred successfully", produce });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
