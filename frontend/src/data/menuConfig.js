export const menuByRole = {
  farmer: [
    { path: '/farmer', label: 'Dashboard' },
    { path: '/farmer/add-produce', label: 'Add Produce' },
  ],
  distributor: [
    { path: '/distributor', label: 'Dashboard' },
    { path: '/distributor/transfer', label: 'Transfer Produce' },
  ],
  retailer: [
    { path: '/retailer', label: 'Dashboard' },
    { path: '/retailer/update-stock', label: 'Update Stock' },
  ],
  consumer: [
    { path: '/consumer', label: 'Dashboard' },
    { path: '/consumer/scan-qr', label: 'Scan QR Code' },
  ],
};
