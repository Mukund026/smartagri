const Produce = require('../models/Produce');
const initBlockchain = require('../blockchain/blockchain');
const generateQRCode = require('../utils/qrGenerator');

exports.addProduce = async (req, res) => {
  try {
    const { origin, quality, quantity, harvestDate, owner } = req.body;
    if(!origin || !quality || !quantity || !harvestDate || !owner) {
      return res.status(400).json({error: "All fields required"});
    }

    const produce = new Produce({
      origin,
      quality,
      quantity,
      harvestDate,
      owner,
      timestamps: [{ status: 'Added by farmer', time: new Date() }],
    });

    produce.qrCode = await generateQRCode(produce._id.toString());
    await produce.save();

    const { web3, contract } = await initBlockchain();
    const accounts = await web3.eth.getAccounts();

    await contract.methods.addProduce(origin, quality, quantity, harvestDate, owner)
      .send({from: accounts[0], gas: 3000000});

    res.status(201).json({message: "Produce added and recorded on blockchain", produce});
  } catch (error) {
    console.error('Add produce error:', error);
    res.status(500).json({error: "Server error"});
  }
};

exports.getProduces = async (req, res) => {
  try {
    const produces = await Produce.find();
    res.json(produces);
  } catch (error) {
    res.status(500).json({error: "Server error"});
  }
};
