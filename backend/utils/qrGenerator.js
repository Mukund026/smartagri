const QRCode = require('qrcode');

const generateQRCode = async (text) => {
    try {
        // Generate QR code as Base64 data URL
        return await QRCode.toDataURL(text);
    } catch (err) {
        console.error("QR generation failed:", err);
        return null; // keeps your style, avoids crashing backend
    }
};

module.exports = generateQRCode;
