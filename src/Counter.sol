// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    
    event StartCounting();
    event CounterIncrement();
    event StopCounting();

    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
        emit CounterIncrement();
    }

    function countUntil(uint256 rec, uint256 count) public {
        if (rec == 0) {
            return;
        }

        emit StartCounting();
        for (uint256 i = 0 ; i < count ; ++i) {
            increment();
        }

        emit StopCounting();

        countUntil(rec - 1, count);
    }
}
