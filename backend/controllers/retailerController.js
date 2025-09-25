const Produce = require('../models/Produce');

exports.updateStock = async (req, res) => {
    const { produceId, stock, price } = req.body;

    try {
        const produce = await Produce.findById(produceId);
        if (!produce) return res.status(404).json({ error: "Produce not found" });

        produce.quantity = stock;
        produce.timestamps.push({ status: "Stock updated by Retailer", time: new Date() });
        produce.price = price;
        await produce.save();

        res.json({ message: "Stock updated successfully", produce });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
