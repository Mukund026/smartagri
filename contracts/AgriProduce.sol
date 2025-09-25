// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgriProduce {
    struct Produce {
        uint id;
        string origin;
        string quality;
        uint quantity;
        string harvestDate;
        string owner;
        uint timestamp;
    }

    mapping(uint => Produce) public produces;
    uint public produceCount = 0;

    event ProduceAdded(uint id, string origin, string owner);
    event ProduceTransferred(uint id, string newOwner);

    function addProduce(
        string memory _origin,
        string memory _quality,
        uint _quantity,
        string memory _harvestDate,
        string memory _owner
    ) public {
        produceCount++;
        produces[produceCount] = Produce(produceCount, _origin, _quality, _quantity, _harvestDate, _owner, block.timestamp);
        emit ProduceAdded(produceCount, _origin, _owner);
    }

    function transferProduce(uint _id, string memory _newOwner) public {
        produces[_id].owner = _newOwner;
        produces[_id].timestamp = block.timestamp;
        emit ProduceTransferred(_id, _newOwner);
    }

    function getProduce(uint _id) public view returns (
        uint,
        string memory,
        string memory,
        uint,
        string memory,
        string memory,
        uint
    ) {
        Produce memory p = produces[_id];
        return (p.id, p.origin, p.quality, p.quantity, p.harvestDate, p.owner, p.timestamp);
    }
}
