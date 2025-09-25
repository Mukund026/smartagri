const AgriProduce = artifacts.require("AgriProduce");

module.exports = function (deployer) {
  deployer.deploy(AgriProduce);
};
