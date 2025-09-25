const Produce = require('../models/Produce');
const generateSustainabilityScore = require('../utils/sustainabilityScore');

exports.getProduceDetails = async (req, res) => {
    const produceId = req.params.id;

    try {
        const produce = await Produce.findById(produceId);
        if (!produce) return res.status(404).json({ error: "Produce not found" });

        const sustainabilityScore = generateSustainabilityScore();
        res.json({ produce, sustainabilityScore });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
