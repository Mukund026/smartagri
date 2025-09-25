const Produce = require('../models/Produce');
const generateQRCode = require('../utils/qrGenerator');
const initBlockchain = require('../blockchain/blockchain');

exports.addProduce = async (req, res) => {
    try {
        const { origin, quality, quantity, harvestDate, owner } = req.body;
        const produce = new Produce({
            origin,
            quality,
            quantity,
            harvestDate,
            owner,
            timestamps: [{ status: 'Added by Farmer', time: new Date() }],
        });
        await produce.save();

        // Generate QR Code
        produce.qrCode = await generateQRCode(produce._id.toString());
        await produce.save();

        // Blockchain interaction
        const { web3, contract } = await initBlockchain();
        const accounts = await web3.eth.getAccounts();
        await contract.methods
            .addProduce(origin, quality, quantity, harvestDate, owner)
            .send({ from: accounts[0], gas: 3000000 });

        res.status(201).json({ message: 'Produce added successfully', produce });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllProduces = async (req, res) => {
    try {
        const produces = await Produce.find();
        res.json(produces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
