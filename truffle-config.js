module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,              // Use 7545 for Ganache GUI, or 8545 for CLI
      network_id: "*",         // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",        // Solidity version
    }
  }
};
