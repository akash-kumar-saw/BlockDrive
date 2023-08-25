// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DriveContract is ERC721, Ownable {

    struct NFTMetadata {
        uint tokenId;
        string ipfsHash;
        string caption;
        address owner;
    }

    struct Access {
        address user;
        bool access;
    }

    mapping(address => NFTMetadata[]) public addressToMetaData;
    mapping(uint => NFTMetadata) private tokenIdToMetadata;
    mapping(address => Access[]) private accessMap;
    mapping(address => Access[]) private sharedMap;

    uint256 private tokenIdCounter = 0;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintNFT(string memory ipfsHash, string memory caption) external {
        tokenIdCounter++;
        uint256 tokenId = tokenIdCounter;

        _mint(msg.sender, tokenId);
        tokenIdToMetadata[tokenId] = NFTMetadata(tokenId, ipfsHash, caption, msg.sender);
        addressToMetaData[msg.sender].push(NFTMetadata(tokenId, ipfsHash, caption, msg.sender));
    }

    function getNFT(address user) external view returns (NFTMetadata[] memory) {
        return addressToMetaData[user];
    }

    function allowAccess(address user) external {
        accessMap[msg.sender].push(Access(user, true));
    }

    function disallowAccess(address user) external {
        accessMap[msg.sender].push(Access(user, false));
    }

    function shareAccess(address to, uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this token");

        approve(to, tokenId);

        addressToMetaData[to].push(tokenIdToMetadata[tokenId]);
        sharedMap[msg.sender].push(Access(to, true));
    }

    function getAccessList() external view returns (Access[] memory) {
        return accessMap[msg.sender];
    }

    function getSharedList() external view returns (Access[] memory) {
        return sharedMap[msg.sender];
    }
}