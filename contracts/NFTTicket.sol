// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract NFTTicket is ERC721URIStorage, AccessControl, Pausable {
    bytes32 public constant ORGANIZER_ROLE = keccak256("ORGANIZER_ROLE");

    uint256 private _nextTokenId;
    string private baseURIextended;

    struct Event {
        string name;
        uint256 date;
        string location;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 soldTickets;
    }

    mapping(uint256 => Event) private eventsById;
    uint256 private nextEventId;

    event EventCreated(uint256 indexed eventId, string name);
    event TicketMinted(address indexed buyer, uint256 indexed eventId, uint256 tokenId);

    constructor(string memory _base) ERC721("UniEventTicket", "UET") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        baseURIextended = _base;
    }

    function createEvent(
        string memory name,
        uint256 date,
        string memory location,
        uint256 ticketPrice,
        uint256 totalTickets
    ) public onlyRole(ORGANIZER_ROLE) {
        require(totalTickets > 0, "Total tickets must be > 0");
        uint256 eventId = nextEventId++;
        eventsById[eventId] = Event(name, date, location, ticketPrice, totalTickets, 0);
        emit EventCreated(eventId, name);
    }

    function buyTicket(uint256 eventId) public payable whenNotPaused {
        Event storage e = eventsById[eventId];
        require(e.totalTickets > e.soldTickets, "Sold out");
        require(msg.value >= e.ticketPrice, "Insufficient payment");

        uint256 tokenId = _nextTokenId++;
        e.soldTickets++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked(baseURIextended, uint2str(tokenId))));

        emit TicketMinted(msg.sender, eventId, tokenId);
    }

    // -------- override functions --------
    function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // -------- utils --------
    function uint2str(uint256 _i) internal pure returns (string memory str) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + (_i % 10)));
            _i /= 10;
        }
        str = string(bstr);
    }
}
