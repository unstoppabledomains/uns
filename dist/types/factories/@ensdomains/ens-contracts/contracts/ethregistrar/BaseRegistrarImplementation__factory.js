"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRegistrarImplementation__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract ENS",
                name: "_ens",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "_baseNode",
                type: "bytes32",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "controller",
                type: "address",
            },
        ],
        name: "ControllerAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "controller",
                type: "address",
            },
        ],
        name: "ControllerRemoved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "expires",
                type: "uint256",
            },
        ],
        name: "NameMigrated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "expires",
                type: "uint256",
            },
        ],
        name: "NameRegistered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "expires",
                type: "uint256",
            },
        ],
        name: "NameRenewed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [],
        name: "GRACE_PERIOD",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "controller",
                type: "address",
            },
        ],
        name: "addController",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "available",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "baseNode",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "controllers",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "ens",
        outputs: [
            {
                internalType: "contract ENS",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "nameExpires",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "reclaim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "register",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "registerOnly",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "controller",
                type: "address",
            },
        ],
        name: "removeController",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "renew",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
        ],
        name: "setResolver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceID",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801562000010575f80fd5b5060405162001f7638038062001f76833981016040819052620000339162000106565b60408051602080820183525f808352835191820190935282815290916200005b8382620001dd565b5060016200006a8282620001dd565b5050506200008762000081620000b160201b60201c565b620000b5565b600880546001600160a01b0319166001600160a01b039390931692909217909155600955620002a9565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b5f806040838503121562000118575f80fd5b82516001600160a01b03811681146200012f575f80fd5b6020939093015192949293505050565b634e487b7160e01b5f52604160045260245ffd5b600181811c908216806200016857607f821691505b6020821081036200018757634e487b7160e01b5f52602260045260245ffd5b50919050565b601f821115620001d857805f5260205f20601f840160051c81016020851015620001b45750805b601f840160051c820191505b81811015620001d5575f8155600101620001c0565b50505b505050565b81516001600160401b03811115620001f957620001f96200013f565b62000211816200020a845462000153565b846200018d565b602080601f83116001811462000247575f84156200022f5750858301515b5f19600386901b1c1916600185901b178555620002a1565b5f85815260208120601f198616915b82811015620002775788860151825594840194600190910190840162000256565b50858210156200029557878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b611cbf80620002b75f395ff3fe608060405234801561000f575f80fd5b50600436106101c6575f3560e01c806395d89b41116100fe578063c87b56dd1161009e578063e985e9c51161006e578063e985e9c5146103d4578063f2fde38b1461040f578063f6a74ed714610422578063fca247ac14610435575f80fd5b8063c87b56dd14610377578063d6e4fa861461038a578063da8c229e146103a9578063ddf7fcb0146103cb575f80fd5b8063a7fc7a07116100d9578063a7fc7a0714610334578063b88d4fde14610347578063c1a287e21461035a578063c475abff14610364575f80fd5b806395d89b411461030657806396e494e81461030e578063a22cb46514610321575f80fd5b80633f15457f116101695780636352211e116101445780636352211e146102c757806370a08231146102da578063715018a6146102ed5780638da5cb5b146102f5575f80fd5b80633f15457f1461028e57806342842e0e146102a15780634e543b26146102b4575f80fd5b8063095ea7b3116101a4578063095ea7b3146102325780630e297b451461024757806323b872dd1461026857806328ed4f6c1461027b575f80fd5b806301ffc9a7146101ca57806306fdde03146101f2578063081812fc14610207575b5f80fd5b6101dd6101d83660046117dd565b610448565b60405190151581526020015b60405180910390f35b6101fa610499565b6040516101e99190611845565b61021a610215366004611857565b610528565b6040516001600160a01b0390911681526020016101e9565b610245610240366004611882565b61054d565b005b61025a6102553660046118ac565b610666565b6040519081526020016101e9565b6102456102763660046118e1565b61067b565b61024561028936600461190e565b6106ac565b60085461021a906001600160a01b031681565b6102456102af3660046118e1565b6107be565b6102456102c236600461193c565b6107d8565b61021a6102d5366004611857565b610848565b61025a6102e836600461193c565b610869565b6102456108ed565b6006546001600160a01b031661021a565b6101fa610900565b6101dd61031c366004611857565b61090f565b61024561032f366004611957565b610934565b61024561034236600461193c565b610943565b61024561035536600461199b565b610996565b61025a6276a70081565b61025a610372366004611a74565b6109ce565b6101fa610385366004611857565b610b52565b61025a610398366004611857565b5f9081526007602052604090205490565b6101dd6103b736600461193c565b600a6020525f908152604090205460ff1681565b61025a60095481565b6101dd6103e2366004611a94565b6001600160a01b039182165f90815260056020908152604080832093909416825291909152205460ff1690565b61024561041d36600461193c565b610bc2565b61024561043036600461193c565b610c3b565b61025a6104433660046118ac565b610c8b565b5f6001600160e01b031982166301ffc9a760e01b148061047857506001600160e01b031982166380ac58cd60e01b145b8061049357506001600160e01b03198216630a3b53db60e21b145b92915050565b60605f80546104a790611ac0565b80601f01602080910402602001604051908101604052809291908181526020018280546104d390611ac0565b801561051e5780601f106104f55761010080835404028352916020019161051e565b820191905f5260205f20905b81548152906001019060200180831161050157829003601f168201915b5050505050905090565b5f61053282610c99565b505f908152600460205260409020546001600160a01b031690565b5f61055782610cf7565b9050806001600160a01b0316836001600160a01b0316036105c95760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806105e557506105e581336103e2565b6106575760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016105c0565b6106618383610d56565b505050565b5f6106738484845f610dc3565b949350505050565b6106853382610fc7565b6106a15760405162461bcd60e51b81526004016105c090611af8565b610661838383611040565b6008546009546040516302571be360e01b8152600481019190915230916001600160a01b0316906302571be390602401602060405180830381865afa1580156106f7573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061071b9190611b45565b6001600160a01b03161461072d575f80fd5b6107373383610fc7565b61073f575f80fd5b6008546009546040516306ab592360e01b81526004810191909152602481018490526001600160a01b038381166044830152909116906306ab5923906064016020604051808303815f875af115801561079a573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906106619190611b60565b61066183838360405180602001604052805f815250610996565b6107e06111a2565b600854600954604051630c4b7b8560e11b815260048101919091526001600160a01b03838116602483015290911690631896f70a906044015f604051808303815f87803b15801561082f575f80fd5b505af1158015610841573d5f803e3d5ffd5b5050505050565b5f818152600760205260408120544210610860575f80fd5b61049382610cf7565b5f6001600160a01b0382166108d25760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016105c0565b506001600160a01b03165f9081526003602052604090205490565b6108f56111a2565b6108fe5f6111fc565b565b6060600180546104a790611ac0565b5f81815260076020526040812054429061092d906276a70090611b77565b1092915050565b61093f33838361124d565b5050565b61094b6111a2565b6001600160a01b0381165f818152600a6020526040808220805460ff19166001179055517f0a8bb31534c0ed46f380cb867bd5c803a189ced9a764e30b3a4991a9901d74749190a250565b6109a03383610fc7565b6109bc5760405162461bcd60e51b81526004016105c090611af8565b6109c88484848461131a565b50505050565b6008546009546040516302571be360e01b815260048101919091525f9130916001600160a01b03909116906302571be390602401602060405180830381865afa158015610a1d573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610a419190611b45565b6001600160a01b031614610a53575f80fd5b335f908152600a602052604090205460ff16610a6d575f80fd5b5f838152600760205260409020544290610a8b906276a70090611b77565b1015610a95575f80fd5b610aa26276a70083611b77565b5f848152600760205260409020546276a70090610ac0908590611b77565b610aca9190611b77565b11610ad3575f80fd5b5f8381526007602052604081208054849290610af0908490611b77565b90915550505f838152600760205260409081902054905184917f9b87a00e30f1ac65d898f070f8a3488fe60517182d0a2098e1b4b93a54aa9bd691610b3791815260200190565b60405180910390a250505f9081526007602052604090205490565b6060610b5d82610c99565b5f610b7260408051602081019091525f815290565b90505f815111610b905760405180602001604052805f815250610bbb565b80610b9a8461134d565b604051602001610bab929190611b96565b6040516020818303038152906040525b9392505050565b610bca6111a2565b6001600160a01b038116610c2f5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016105c0565b610c38816111fc565b50565b610c436111a2565b6001600160a01b0381165f818152600a6020526040808220805460ff19169055517f33d83959be2573f5453b12eb9d43b3499bc57d96bd2f067ba44803c859e811139190a250565b5f6106738484846001610dc3565b5f818152600260205260409020546001600160a01b0316610c385760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016105c0565b5f818152600260205260408120546001600160a01b0316806104935760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016105c0565b5f81815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610d8a82610cf7565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6008546009546040516302571be360e01b815260048101919091525f9130916001600160a01b03909116906302571be390602401602060405180830381865afa158015610e12573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610e369190611b45565b6001600160a01b031614610e48575f80fd5b335f908152600a602052604090205460ff16610e62575f80fd5b610e6b8561090f565b610e73575f80fd5b610e806276a70042611b77565b6276a700610e8e8542611b77565b610e989190611b77565b11610ea1575f80fd5b610eab8342611b77565b5f868152600760209081526040808320939093556002905220546001600160a01b031615610edc57610edc856113dd565b610ee6848661146f565b8115610f6d576008546009546040516306ab592360e01b81526004810191909152602481018790526001600160a01b038681166044830152909116906306ab5923906064016020604051808303815f875af1158015610f47573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610f6b9190611b60565b505b6001600160a01b038416857fb3d987963d01b2f68493b4bdb130988f157ea43070d4ad840fee0466ed9370d9610fa38642611b77565b60405190815260200160405180910390a3610fbe8342611b77565b95945050505050565b5f80610fd283610848565b9050806001600160a01b0316846001600160a01b0316148061100d5750836001600160a01b031661100284610528565b6001600160a01b0316145b8061067357506001600160a01b038082165f9081526005602090815260408083209388168352929052205460ff16610673565b826001600160a01b031661105382610cf7565b6001600160a01b0316146110795760405162461bcd60e51b81526004016105c090611bc4565b6001600160a01b0382166110db5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016105c0565b826001600160a01b03166110ee82610cf7565b6001600160a01b0316146111145760405162461bcd60e51b81526004016105c090611bc4565b5f81815260046020908152604080832080546001600160a01b03199081169091556001600160a01b038781168086526003855283862080545f1901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6006546001600160a01b031633146108fe5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105c0565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b816001600160a01b0316836001600160a01b0316036112ae5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016105c0565b6001600160a01b038381165f81815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611325848484611040565b611331848484846115f7565b6109c85760405162461bcd60e51b81526004016105c090611c09565b60605f611359836116f1565b60010190505f8167ffffffffffffffff81111561137857611378611987565b6040519080825280601f01601f1916602001820160405280156113a2576020820181803683370190505b5090508181016020015b5f19016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846113ac57509392505050565b5f6113e782610cf7565b90506113f282610cf7565b5f83815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0385168085526003845282852080545f190190558785526002909352818420805490911690555192935084927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6001600160a01b0382166114c55760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016105c0565b5f818152600260205260409020546001600160a01b0316156115295760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016105c0565b5f818152600260205260409020546001600160a01b03161561158d5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016105c0565b6001600160a01b0382165f81815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b5f6001600160a01b0384163b156116e957604051630a85bd0160e11b81526001600160a01b0385169063150b7a029061163a903390899088908890600401611c5b565b6020604051808303815f875af1925050508015611674575060408051601f3d908101601f1916820190925261167191810190611c97565b60015b6116cf573d8080156116a1576040519150601f19603f3d011682016040523d82523d5f602084013e6116a6565b606091505b5080515f036116c75760405162461bcd60e51b81526004016105c090611c09565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610673565b506001610673565b5f8072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b831061172f5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef8100000000831061175b576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061177957662386f26fc10000830492506010015b6305f5e1008310611791576305f5e100830492506008015b61271083106117a557612710830492506004015b606483106117b7576064830492506002015b600a83106104935760010192915050565b6001600160e01b031981168114610c38575f80fd5b5f602082840312156117ed575f80fd5b8135610bbb816117c8565b5f5b838110156118125781810151838201526020016117fa565b50505f910152565b5f81518084526118318160208601602086016117f8565b601f01601f19169290920160200192915050565b602081525f610bbb602083018461181a565b5f60208284031215611867575f80fd5b5035919050565b6001600160a01b0381168114610c38575f80fd5b5f8060408385031215611893575f80fd5b823561189e8161186e565b946020939093013593505050565b5f805f606084860312156118be575f80fd5b8335925060208401356118d08161186e565b929592945050506040919091013590565b5f805f606084860312156118f3575f80fd5b83356118fe8161186e565b925060208401356118d08161186e565b5f806040838503121561191f575f80fd5b8235915060208301356119318161186e565b809150509250929050565b5f6020828403121561194c575f80fd5b8135610bbb8161186e565b5f8060408385031215611968575f80fd5b82356119738161186e565b915060208301358015158114611931575f80fd5b634e487b7160e01b5f52604160045260245ffd5b5f805f80608085870312156119ae575f80fd5b84356119b98161186e565b935060208501356119c98161186e565b925060408501359150606085013567ffffffffffffffff808211156119ec575f80fd5b818701915087601f8301126119ff575f80fd5b813581811115611a1157611a11611987565b604051601f8201601f19908116603f01168101908382118183101715611a3957611a39611987565b816040528281528a6020848701011115611a51575f80fd5b826020860160208301375f60208483010152809550505050505092959194509250565b5f8060408385031215611a85575f80fd5b50508035926020909101359150565b5f8060408385031215611aa5575f80fd5b8235611ab08161186e565b915060208301356119318161186e565b600181811c90821680611ad457607f821691505b602082108103611af257634e487b7160e01b5f52602260045260245ffd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b5f60208284031215611b55575f80fd5b8151610bbb8161186e565b5f60208284031215611b70575f80fd5b5051919050565b8082018082111561049357634e487b7160e01b5f52601160045260245ffd5b5f8351611ba78184602088016117f8565b835190830190611bbb8183602088016117f8565b01949350505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f90611c8d9083018461181a565b9695505050505050565b5f60208284031215611ca7575f80fd5b8151610bbb816117c856fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class BaseRegistrarImplementation__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_ens, _baseNode, overrides) {
        return super.getDeployTransaction(_ens, _baseNode, overrides || {});
    }
    deploy(_ens, _baseNode, overrides) {
        return super.deploy(_ens, _baseNode, overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.BaseRegistrarImplementation__factory = BaseRegistrarImplementation__factory;
BaseRegistrarImplementation__factory.bytecode = _bytecode;
BaseRegistrarImplementation__factory.abi = _abi;
