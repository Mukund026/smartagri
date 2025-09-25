// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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

    mapping(uint => Produce) private produces;
    uint public produceCount;

    event ProduceAdded(uint indexed id, string origin, string owner);
    event ProduceTransferred(uint indexed id, string newOwner);

    function addProduce(
        string memory _origin,
        string memory _quality,
        uint _quantity,
        string memory _harvestDate,
        string memory _owner
    ) public {
        produceCount++;
        produces[produceCount] = Produce({
            id: produceCount,
            origin: _origin,
            quality: _quality,
            quantity: _quantity,
            harvestDate: _harvestDate,
            owner: _owner,
            timestamp: block.timestamp
        });
        emit ProduceAdded(produceCount, _origin, _owner);
    }

    function transferProduce(uint _id, string memory _newOwner) public {
        require(_id > 0 && _id <= produceCount, "Invalid produce ID");
        produces[_id].owner = _newOwner;
        produces[_id].timestamp = block.timestamp;
        emit ProduceTransferred(_id, _newOwner);
    }

    function getProduce(uint _id) public view returns (
        uint id,
        string memory origin,
        string memory quality,
        uint quantity,
        string memory harvestDate,
        string memory owner,
        uint timestamp
    ) {
        require(_id > 0 && _id <= produceCount, "Invalid produce ID");
        Produce memory p = produces[_id];
        return (
            p.id,
            p.origin,
            p.quality,
            p.quantity,
            p.harvestDate,
            p.owner,
            p.timestamp
        );
    }
}
