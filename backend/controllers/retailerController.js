const Produce = require('../models/Produce');

exports.updateStock = async (req, res) => {
  try {
    const { produceId, stock, price } = req.body;

    if (!produceId || stock == null || price == null) {
      return res.status(400).json({ error: "produceId, stock and price are required" });
    }

    const produce = await Produce.findById(produceId);
    if (!produce) return res.status(404).json({ error: "Produce not found" });

    produce.stock = stock;
    produce.price = price;
    produce.timestamps.push({ status: 'Stock updated by retailer', time: new Date() });
    await produce.save();

    res.json({ message: "Stock updated successfully", produce });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({ error: "Server error while updating stock" });
  }
};
