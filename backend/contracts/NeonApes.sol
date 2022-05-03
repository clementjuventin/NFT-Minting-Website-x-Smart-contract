pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NeonApes is Ownable, ERC721 {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _tokenIds;

    uint256 public constant MINT_PRICE = 0.15 ether;
    uint256 public constant MAX_MINT = 1000;
    uint256 public constant MAX_PURCHASE = 3;
    string public baseURI;

    bool public saleIsActive = false;
    bool public saleIsActiveForwhitelist = false;

    uint256 public startingBlock = 0;
    uint256 public revealTimestamp;

    bool public specialMintHappened = false;

    event Minted(address mintOwner, uint256 newTokenId);

    mapping(address => bool) public whitelist;
    address public admin;

    constructor(
        string memory name,
        string memory symbol,
        uint256 revealTS
    ) ERC721(name, symbol) {
        revealTimestamp = revealTS;
        admin = msg.sender;
    }

    // Is whitelisted
    function isWhitelisted(address addr) external view returns(bool) {
        return whitelist[addr];
    }

    // Withdraw
    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    // Create 50 more mint for the owner
    function specialMint() external onlyOwner {
        require(
            specialMintHappened == false,
            "Only one special mint is possible"
        );
        specialMintHappened = true;
        for (uint256 i = 0; i < 50; i++) {
            _safeMint(msg.sender, MAX_MINT + i);
        }
    }

    // Set reveal timestamp
    function setRevealTimestamp(uint256 newRevealTimestamp) external onlyOwner {
        revealTimestamp = newRevealTimestamp;
    }

    // Set admin
    function setAdmin(address adminAddr) external onlyOwner {
        admin = adminAddr;
    }

    // Set base URI
    function setBaseURI(string memory uri) external onlyOwner {
        baseURI = uri;
    }
    // Get base URI
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // Flip sale state (Active/Paused)
    function flipSaleState() external onlyOwner {
        saleIsActive = !saleIsActive;
    }

    // Flip sale state for whitelist (Active/Paused)
    function flipWhitelistSaleState() external onlyOwner {
        saleIsActiveForwhitelist = !saleIsActiveForwhitelist;
    }

    // Add to whitelist
    function whitelistAddr(address addr, bool isWl) external {
        require(
            msg.sender == admin || msg.sender == owner(),
            "Only admin or owner are allowed to whitelist"
        );
        whitelist[addr] = isWl;
    }

    // Mint for whitelisted
    function whitelistedMint() external payable {
        require(saleIsActiveForwhitelist, "Sale must be active");
        require(_tokenIds.current() < MAX_MINT, "Purchase exceed max supply");
        require(msg.value >= MINT_PRICE, "Value sent is lower than mint price");
        require(whitelist[msg.sender] == true, "Sender is not whitelisted");

        if (startingBlock == 0) {
            startingBlock = block.number;
        }

        whitelist[msg.sender] = false; // Whitelist mint is allowed only once
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        emit Minted(msg.sender, newTokenId);
    }

    // Mint
    function mint(uint256 tokenToMint) external payable {
        require(saleIsActive, "Sale must be active");
        require(tokenToMint <= MAX_PURCHASE, "Max purchase is 3 tokens");
        require(
            _tokenIds.current().add(tokenToMint) < MAX_MINT,
            "Purchase exceed max supply"
        );
        require(
            msg.value >= MINT_PRICE.mul(tokenToMint),
            "Value sent is lower than mint price"
        );
        if (startingBlock == 0) {
            startingBlock = block.number;
        }

        for (uint256 i = 0; i < tokenToMint; i++) {
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            if (newTokenId < MAX_MINT) {
                _safeMint(msg.sender, newTokenId);
                emit Minted(msg.sender, newTokenId);
            }
        }
    }
}
