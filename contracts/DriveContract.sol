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
        require(user==msg.sender || hasAccess(user, msg.sender) ,"You don't have access");
        return addressToMetaData[user];
    }

    function hasAccess(address user, address sender) internal view returns (bool) {
        uint accessLength = accessMap[user].length;
        for (uint i = 0; i < accessLength; i++) {
            if (accessMap[user][i].user == sender && accessMap[user][i].access) {
                return true;
            }
        }
        return false;
    }

    function allowAccess(address user) external {
        bool userFound = false;
        uint accessLength = accessMap[msg.sender].length;

        for (uint i = 0; i < accessLength; i++) {
            if (accessMap[msg.sender][i].user == user) {
                accessMap[msg.sender][i].access = true;
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            accessMap[msg.sender].push(Access(user, true));
        }
    }

function disallowAccess(address user) external {
    bool userFound = false;
    uint accessLength = accessMap[msg.sender].length;

    for (uint i = 0; i < accessLength; i++) {
        if (accessMap[msg.sender][i].user == user) {
            accessMap[msg.sender][i].access = false;
            userFound = true;
            break;
        }
    }
    if (!userFound) {
        accessMap[msg.sender].push(Access(user, false));
    }
}

function shareAccess(address to, uint256 tokenId) external {
    require(ownerOf(tokenId) == msg.sender, "You are not the owner of this token");
    approve(to, tokenId);

    bool userFound = false;
    uint sharedLength = sharedMap[msg.sender].length;
    
    for (uint i = 0; i < sharedLength; i++) {
        if (sharedMap[msg.sender][i].user == to) {
            sharedMap[msg.sender][i].access = true;
            userFound = true;
            break;
        }
    }
    if (!userFound) {
        sharedMap[msg.sender].push(Access(to, true));
    }

    addressToMetaData[to].push(tokenIdToMetadata[tokenId]);
}


    function getAccessList() external view returns (Access[] memory) {
        return accessMap[msg.sender];
    }

    function getSharedList() external view returns (Access[] memory) {
        return sharedMap[msg.sender];
    }
}
