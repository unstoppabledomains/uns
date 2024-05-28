"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETHRegistrarController__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract BaseRegistrarImplementation",
                name: "_base",
                type: "address",
            },
            {
                internalType: "contract IPriceOracle",
                name: "_prices",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_minCommitmentAge",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_maxCommitmentAge",
                type: "uint256",
            },
            {
                internalType: "contract ReverseRegistrar",
                name: "_reverseRegistrar",
                type: "address",
            },
            {
                internalType: "contract INameWrapper",
                name: "_nameWrapper",
                type: "address",
            },
            {
                internalType: "contract ENS",
                name: "_ens",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "commitment",
                type: "bytes32",
            },
        ],
        name: "CommitmentTooNew",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "commitment",
                type: "bytes32",
            },
        ],
        name: "CommitmentTooOld",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "DurationTooShort",
        type: "error",
    },
    {
        inputs: [],
        name: "InsufficientValue",
        type: "error",
    },
    {
        inputs: [],
        name: "MaxCommitmentAgeTooHigh",
        type: "error",
    },
    {
        inputs: [],
        name: "MaxCommitmentAgeTooLow",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
        ],
        name: "NameNotAvailable",
        type: "error",
    },
    {
        inputs: [],
        name: "ResolverRequiredWhenDataSupplied",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "commitment",
                type: "bytes32",
            },
        ],
        name: "UnexpiredCommitmentExists",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "label",
                type: "bytes32",
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
                name: "baseCost",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "premium",
                type: "uint256",
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
                indexed: false,
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "label",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "cost",
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
        inputs: [],
        name: "MIN_REGISTRATION_DURATION",
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
                internalType: "string",
                name: "name",
                type: "string",
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
                internalType: "bytes32",
                name: "commitment",
                type: "bytes32",
            },
        ],
        name: "commit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "commitments",
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
                internalType: "string",
                name: "name",
                type: "string",
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
            {
                internalType: "bytes32",
                name: "secret",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "bytes[]",
                name: "data",
                type: "bytes[]",
            },
            {
                internalType: "bool",
                name: "reverseRecord",
                type: "bool",
            },
            {
                internalType: "uint16",
                name: "ownerControlledFuses",
                type: "uint16",
            },
        ],
        name: "makeCommitment",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "maxCommitmentAge",
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
        name: "minCommitmentAge",
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
        name: "nameWrapper",
        outputs: [
            {
                internalType: "contract INameWrapper",
                name: "",
                type: "address",
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
        inputs: [],
        name: "prices",
        outputs: [
            {
                internalType: "contract IPriceOracle",
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
                name: "_token",
                type: "address",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "recoverFunds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
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
            {
                internalType: "bytes32",
                name: "secret",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "bytes[]",
                name: "data",
                type: "bytes[]",
            },
            {
                internalType: "bool",
                name: "reverseRecord",
                type: "bool",
            },
            {
                internalType: "uint16",
                name: "ownerControlledFuses",
                type: "uint16",
            },
        ],
        name: "register",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "renew",
        outputs: [],
        stateMutability: "payable",
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
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "rentPrice",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "base",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "premium",
                        type: "uint256",
                    },
                ],
                internalType: "struct IPriceOracle.Price",
                name: "price",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "reverseRegistrar",
        outputs: [
            {
                internalType: "contract ReverseRegistrar",
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
        stateMutability: "pure",
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
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
        ],
        name: "valid",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x61014060405234801562000011575f80fd5b5060405162001da938038062001da9833981016040819052620000349162000219565b80336200004181620001b2565b6040516302571be360e01b81527f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260048201525f906001600160a01b038416906302571be390602401602060405180830381865afa158015620000a6573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620000cc9190620002a8565b604051630f41a04d60e11b81526001600160a01b03848116600483015291925090821690631e83409a906024016020604051808303815f875af115801562000116573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906200013c9190620002cd565b5050505084841162000161576040516307cb550760e31b815260040160405180910390fd5b428411156200018357604051630b4319e560e21b815260040160405180910390fd5b506001600160a01b0395861660805293851660a05260c09290925260e0528216610100521661012052620002e5565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b038116811462000216575f80fd5b50565b5f805f805f805f60e0888a03121562000230575f80fd5b87516200023d8162000201565b6020890151909750620002508162000201565b8096505060408801519450606088015193506080880151620002728162000201565b60a0890151909350620002858162000201565b60c0890151909250620002988162000201565b8091505092959891949750929550565b5f60208284031215620002b9575f80fd5b8151620002c68162000201565b9392505050565b5f60208284031215620002de575f80fd5b5051919050565b60805160a05160c05160e0516101005161012051611a44620003655f395f8181610321015281816106cc0152610a7d01525f81816101ed0152610f9501525f818161038601528181610c380152610e2601525f81816102b30152610dc901525f81816103b901526108c401525f81816108f90152610baa0152611a445ff3fe60806040526004361061011b575f3560e01c80638d839ffe1161009d578063aeb8ce9b11610062578063aeb8ce9b14610356578063ce1e09c014610375578063d3419bf3146103a8578063f14fcbc8146103db578063f2fde38b146103fa575f80fd5b80638d839ffe146102a25780638da5cb5b146102d55780639791c097146102f1578063a8e5fbc014610310578063acf1a84114610343575f80fd5b806374694a2b116100e357806374694a2b146101c957806380869853146101dc578063839df9451461022757806383e7f6ff146102525780638a95b09f1461028c575f80fd5b806301ffc9a71461011f5780633ccfd60b146101535780635d3590d51461016957806365a69dcf14610188578063715018a6146101b5575b5f80fd5b34801561012a575f80fd5b5061013e610139366004611145565b610419565b60405190151581526020015b60405180910390f35b34801561015e575f80fd5b5061016761044f565b005b348015610174575f80fd5b50610167610183366004611187565b610489565b348015610193575f80fd5b506101a76101a23660046112e4565b610507565b60405190815260200161014a565b3480156101c0575f80fd5b5061016761058b565b6101676101d73660046113db565b61059e565b3480156101e7575f80fd5b5061020f7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161014a565b348015610232575f80fd5b506101a761024136600461149d565b60016020525f908152604090205481565b34801561025d575f80fd5b5061027161026c3660046114b4565b610894565b6040805182518152602092830151928101929092520161014a565b348015610297575f80fd5b506101a76224ea0081565b3480156102ad575f80fd5b506101a77f000000000000000000000000000000000000000000000000000000000000000081565b3480156102e0575f80fd5b505f546001600160a01b031661020f565b3480156102fc575f80fd5b5061013e61030b3660046114f6565b6109c9565b34801561031b575f80fd5b5061020f7f000000000000000000000000000000000000000000000000000000000000000081565b610167610351366004611528565b6109dd565b348015610361575f80fd5b5061013e6103703660046114f6565b610b7b565b348015610380575f80fd5b506101a77f000000000000000000000000000000000000000000000000000000000000000081565b3480156103b3575f80fd5b5061020f7f000000000000000000000000000000000000000000000000000000000000000081565b3480156103e6575f80fd5b506101676103f536600461149d565b610c22565b348015610405575f80fd5b50610167610414366004611570565b610c95565b5f6001600160e01b031982166301ffc9a760e01b148061044957506001600160e01b0319821663612e8c0960e01b145b92915050565b5f80546040516001600160a01b03909116914780156108fc02929091818181858888f19350505050158015610486573d5f803e3d5ffd5b50565b610491610d0b565b60405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284169063a9059cbb906044016020604051808303815f875af11580156104dd573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906105019190611589565b50505050565b885160208a01205f90841580159061052657506001600160a01b038716155b15610544576040516334fd817160e21b815260040160405180910390fd5b808a8a8a8a8a8a8a8a6040516020016105659998979695949392919061165e565b604051602081830303815290604052805190602001209150509998505050505050505050565b610593610d0b565b61059c5f610d64565b565b5f6105df8b8b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152508c9250610894915050565b602081015181519192506105f2916116d5565b3410156106125760405163044044a560e21b815260040160405180910390fd5b6106b38b8b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f82011690508083019250505050505050896106ae8e8e8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f820116905080830192505050505050508d8d8d8d8d8d8d8d610507565b610db3565b604051635200a4c160e11b81525f906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063a40149829061070b908f908f908f908f908e908b906004016116e8565b6020604051808303815f875af1158015610727573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061074b9190611732565b9050841561077657610776878d8d604051610767929190611749565b60405180910390208888610ece565b83156107be576107be8c8c8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152508b9250339150610f939050565b896001600160a01b03168c8c6040516107d8929190611749565b60405180910390207f69e37f151eb98a09618ddaa80c8cfaf1ce5996867c489f45b555b412271ebf278e8e865f015187602001518760405161081e959493929190611758565b60405180910390a36020820151825161083791906116d5565b341115610886576020820151825133916108fc9161085591906116d5565b61085f9034611788565b6040518115909202915f818181858888f19350505050158015610884573d5f803e3d5ffd5b505b505050505050505050505050565b604080518082019091525f808252602082015282516020840120604051636b727d4360e11b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03908116916350e9a7159187917f00000000000000000000000000000000000000000000000000000000000000009091169063d6e4fa8690602401602060405180830381865afa158015610940573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906109649190611732565b866040518463ffffffff1660e01b8152600401610983939291906117e8565b6040805180830381865afa15801561099d573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906109c1919061180c565b949350505050565b5f60036109d583611044565b101592915050565b5f83836040516109ee929190611749565b604080519182900382206020601f8701819004810284018101909252858352925082915f91610a39919088908890819084018382808284375f92019190915250889250610894915050565b8051909150341015610a5e5760405163044044a560e21b815260040160405180910390fd5b60405163c475abff60e01b815260048101839052602481018590525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063c475abff906044016020604051808303815f875af1158015610acb573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610aef9190611732565b8251909150341115610b3457815133906108fc90610b0d9034611788565b6040518115909202915f818181858888f19350505050158015610b32573d5f803e3d5ffd5b505b837f3da24c024582931cfaf8267d8ed24d13a82a8068d5bd337d30ec45cea4e506ae88883485604051610b6a9493929190611859565b60405180910390a250505050505050565b805160208201205f90610b8d836109c9565b8015610c1b57506040516312dc929d60e31b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906396e494e890602401602060405180830381865afa158015610bf7573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610c1b9190611589565b9392505050565b5f818152600160205260409020544290610c5d907f0000000000000000000000000000000000000000000000000000000000000000906116d5565b10610c8357604051630a059d7160e01b8152600481018290526024015b60405180910390fd5b5f908152600160205260409020429055565b610c9d610d0b565b6001600160a01b038116610d025760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610c7a565b61048681610d64565b5f546001600160a01b0316331461059c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610c7a565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f818152600160205260409020544290610dee907f0000000000000000000000000000000000000000000000000000000000000000906116d5565b1115610e1057604051635320bcf960e01b815260048101829052602401610c7a565b5f818152600160205260409020544290610e4b907f0000000000000000000000000000000000000000000000000000000000000000906116d5565b11610e6c5760405163cb7690d760e01b815260048101829052602401610c7a565b610e7583610b7b565b610e9457826040516308eee0fd60e31b8152600401610c7a919061187f565b5f818152600160205260408120556224ea00821015610ec957604051639a71997b60e01b815260048101839052602401610c7a565b505050565b604080517f93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae6020808301919091528183018690528251808303840181526060830193849052805191012063e32954eb60e01b90925285906001600160a01b0382169063e32954eb90610f4890859088908890606401611891565b5f604051808303815f875af1158015610f63573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052610f8a91908101906118b3565b50505050505050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637a806d6b33838587604051602001610fd691906119a7565b6040516020818303038152906040526040518563ffffffff1660e01b815260040161100494939291906119ce565b6020604051808303815f875af1158015611020573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906105019190611732565b80515f90819081905b8082101561113c575f85838151811061106857611068611a0b565b01602001516001600160f81b0319169050600160ff1b811015611097576110906001846116d5565b9250611129565b600760fd1b6001600160f81b0319821610156110b8576110906002846116d5565b600f60fc1b6001600160f81b0319821610156110d9576110906003846116d5565b601f60fb1b6001600160f81b0319821610156110fa576110906004846116d5565b603f60fa1b6001600160f81b03198216101561111b576110906005846116d5565b6111266006846116d5565b92505b508261113481611a1f565b93505061104d565b50909392505050565b5f60208284031215611155575f80fd5b81356001600160e01b031981168114610c1b575f80fd5b80356001600160a01b0381168114611182575f80fd5b919050565b5f805f60608486031215611199575f80fd5b6111a28461116c565b92506111b06020850161116c565b9150604084013590509250925092565b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f1916810167ffffffffffffffff811182821017156111fd576111fd6111c0565b604052919050565b5f67ffffffffffffffff82111561121e5761121e6111c0565b50601f01601f191660200190565b5f82601f83011261123b575f80fd5b813561124e61124982611205565b6111d4565b818152846020838601011115611262575f80fd5b816020850160208301375f918101602001919091529392505050565b5f8083601f84011261128e575f80fd5b50813567ffffffffffffffff8111156112a5575f80fd5b6020830191508360208260051b85010111156112bf575f80fd5b9250929050565b8015158114610486575f80fd5b803561ffff81168114611182575f80fd5b5f805f805f805f805f6101008a8c0312156112fd575f80fd5b893567ffffffffffffffff80821115611314575f80fd5b6113208d838e0161122c565b9a5061132e60208d0161116c565b995060408c0135985060608c0135975061134a60808d0161116c565b965060a08c013591508082111561135f575f80fd5b5061136c8c828d0161127e565b90955093505060c08a0135611380816112c6565b915061138e60e08b016112d3565b90509295985092959850929598565b5f8083601f8401126113ad575f80fd5b50813567ffffffffffffffff8111156113c4575f80fd5b6020830191508360208285010111156112bf575f80fd5b5f805f805f805f805f806101008b8d0312156113f5575f80fd5b8a3567ffffffffffffffff8082111561140c575f80fd5b6114188e838f0161139d565b909c509a508a915061142c60208e0161116c565b995060408d0135985060608d0135975061144860808e0161116c565b965060a08d013591508082111561145d575f80fd5b5061146a8d828e0161127e565b90955093505060c08b013561147e816112c6565b915061148c60e08c016112d3565b90509295989b9194979a5092959850565b5f602082840312156114ad575f80fd5b5035919050565b5f80604083850312156114c5575f80fd5b823567ffffffffffffffff8111156114db575f80fd5b6114e78582860161122c565b95602094909401359450505050565b5f60208284031215611506575f80fd5b813567ffffffffffffffff81111561151c575f80fd5b6109c18482850161122c565b5f805f6040848603121561153a575f80fd5b833567ffffffffffffffff811115611550575f80fd5b61155c8682870161139d565b909790965060209590950135949350505050565b5f60208284031215611580575f80fd5b610c1b8261116c565b5f60208284031215611599575f80fd5b8151610c1b816112c6565b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b5f838385526020808601955060208560051b830101845f5b8781101561165157848303601f19018952813536889003601e19018112611609575f80fd5b8701848101903567ffffffffffffffff811115611624575f80fd5b803603821315611632575f80fd5b61163d8582846115a4565b9a86019a94505050908301906001016115e4565b5090979650505050505050565b8981526001600160a01b03898116602083015260408201899052606082018890528616608082015261010060a082018190525f9061169f83820187896115cc565b94151560c0840152505061ffff9190911660e090910152979650505050505050565b634e487b7160e01b5f52601160045260245ffd5b80820180821115610449576104496116c1565b60a081525f6116fb60a08301888a6115a4565b6001600160a01b03968716602084015260408301959095525091909316606082015261ffff90921660809092019190915292915050565b5f60208284031215611742575f80fd5b5051919050565b818382375f9101908152919050565b608081525f61176b6080830187896115a4565b602083019590955250604081019290925260609091015292915050565b81810381811115610449576104496116c1565b5f5b838110156117b557818101518382015260200161179d565b50505f910152565b5f81518084526117d481602086016020860161179b565b601f01601f19169290920160200192915050565b606081525f6117fa60608301866117bd565b60208301949094525060400152919050565b5f6040828403121561181c575f80fd5b6040516040810181811067ffffffffffffffff8211171561183f5761183f6111c0565b604052825181526020928301519281019290925250919050565b606081525f61186c6060830186886115a4565b6020830194909452506040015292915050565b602081525f610c1b60208301846117bd565b838152604060208201525f6118aa6040830184866115cc565b95945050505050565b5f60208083850312156118c4575f80fd5b825167ffffffffffffffff808211156118db575f80fd5b818501915085601f8301126118ee575f80fd5b815181811115611900576119006111c0565b8060051b61190f8582016111d4565b9182528381018501918581019089841115611928575f80fd5b86860192505b8383101561199a57825185811115611944575f80fd5b8601603f81018b13611954575f80fd5b87810151604061196661124983611205565b8281528d82848601011115611979575f80fd5b611988838c830184870161179b565b8552505050918601919086019061192e565b9998505050505050505050565b5f82516119b881846020870161179b565b6305ccae8d60e31b920191825250600401919050565b6001600160a01b0385811682528481166020830152831660408201526080606082018190525f90611a01908301846117bd565b9695505050505050565b634e487b7160e01b5f52603260045260245ffd5b5f60018201611a3057611a306116c1565b506001019056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class ETHRegistrarController__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper, _ens, overrides) {
        return super.getDeployTransaction(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper, _ens, overrides || {});
    }
    deploy(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper, _ens, overrides) {
        return super.deploy(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper, _ens, overrides || {});
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
exports.ETHRegistrarController__factory = ETHRegistrarController__factory;
ETHRegistrarController__factory.bytecode = _bytecode;
ETHRegistrarController__factory.abi = _abi;
