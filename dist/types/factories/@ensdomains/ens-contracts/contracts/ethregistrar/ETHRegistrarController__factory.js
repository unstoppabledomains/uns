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
const _bytecode = "0x6101406040523480156200001257600080fd5b5060405162001e7038038062001e70833981016040819052620000359162000222565b80336200004281620001b9565b6040516302571be360e01b81527f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260048201526000906001600160a01b038416906302571be390602401602060405180830381865afa158015620000aa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000d09190620002b6565b604051630f41a04d60e11b81526001600160a01b03848116600483015291925090821690631e83409a906024016020604051808303816000875af11580156200011d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001439190620002dd565b5050505084841162000168576040516307cb550760e31b815260040160405180910390fd5b428411156200018a57604051630b4319e560e21b815260040160405180910390fd5b506001600160a01b0395861660805293851660a05260c09290925260e0528216610100521661012052620002f7565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146200021f57600080fd5b50565b600080600080600080600060e0888a0312156200023e57600080fd5b87516200024b8162000209565b60208901519097506200025e8162000209565b8096505060408801519450606088015193506080880151620002808162000209565b60a0890151909350620002938162000209565b60c0890151909250620002a68162000209565b8091505092959891949750929550565b600060208284031215620002c957600080fd5b8151620002d68162000209565b9392505050565b600060208284031215620002f057600080fd5b5051919050565b60805160a05160c05160e0516101005161012051611af16200037f60003960008181610335015281816106f30152610ab60152600081816101f80152610fe301526000818161039c01528181610c7b0152610e6e0152600081816102c30152610e100152600081816103d001526108f40152600081816109290152610bea0152611af16000f3fe60806040526004361061011f5760003560e01c80638d839ffe116100a0578063aeb8ce9b11610064578063aeb8ce9b1461036a578063ce1e09c01461038a578063d3419bf3146103be578063f14fcbc8146103f2578063f2fde38b1461041257600080fd5b80638d839ffe146102b15780638da5cb5b146102e55780639791c09714610303578063a8e5fbc014610323578063acf1a8411461035757600080fd5b806374694a2b116100e757806374694a2b146101d357806380869853146101e6578063839df9451461023257806383e7f6ff1461025f5780638a95b09f1461029a57600080fd5b806301ffc9a7146101245780633ccfd60b146101595780635d3590d51461017057806365a69dcf14610190578063715018a6146101be575b600080fd5b34801561013057600080fd5b5061014461013f366004611198565b610432565b60405190151581526020015b60405180910390f35b34801561016557600080fd5b5061016e610469565b005b34801561017c57600080fd5b5061016e61018b3660046111de565b6104a6565b34801561019c57600080fd5b506101b06101ab36600461134b565b610527565b604051908152602001610150565b3480156101ca57600080fd5b5061016e6105ac565b61016e6101e136600461144e565b6105c0565b3480156101f257600080fd5b5061021a7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610150565b34801561023e57600080fd5b506101b061024d366004611518565b60016020526000908152604090205481565b34801561026b57600080fd5b5061027f61027a366004611531565b6108c3565b60408051825181526020928301519281019290925201610150565b3480156102a657600080fd5b506101b06224ea0081565b3480156102bd57600080fd5b506101b07f000000000000000000000000000000000000000000000000000000000000000081565b3480156102f157600080fd5b506000546001600160a01b031661021a565b34801561030f57600080fd5b5061014461031e366004611576565b6109fd565b34801561032f57600080fd5b5061021a7f000000000000000000000000000000000000000000000000000000000000000081565b61016e6103653660046115ab565b610a12565b34801561037657600080fd5b50610144610385366004611576565b610bba565b34801561039657600080fd5b506101b07f000000000000000000000000000000000000000000000000000000000000000081565b3480156103ca57600080fd5b5061021a7f000000000000000000000000000000000000000000000000000000000000000081565b3480156103fe57600080fd5b5061016e61040d366004611518565b610c64565b34801561041e57600080fd5b5061016e61042d3660046115f7565b610cd9565b60006001600160e01b031982166301ffc9a760e01b148061046357506001600160e01b0319821663612e8c0960e01b145b92915050565b600080546040516001600160a01b03909116914780156108fc02929091818181858888f193505050501580156104a3573d6000803e3d6000fd5b50565b6104ae610d4f565b60405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284169063a9059cbb906044016020604051808303816000875af11580156104fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105219190611612565b50505050565b885160208a0120600090841580159061054757506001600160a01b038716155b15610565576040516334fd817160e21b815260040160405180910390fd5b808a8a8a8a8a8a8a8a604051602001610586999897969594939291906116ea565b604051602081830303815290604052805190602001209150509998505050505050505050565b6105b4610d4f565b6105be6000610da9565b565b60006106038b8b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508c92506108c3915050565b6020810151815191925061061691611764565b3410156106365760405163044044a560e21b815260040160405180910390fd5b6106d98b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050896106d48e8e8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508d8d8d8d8d8d8d8d610527565b610df9565b604051635200a4c160e11b81526000906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063a401498290610732908f908f908f908f908e908b90600401611777565b6020604051808303816000875af1158015610751573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061077591906117c2565b905084156107a0576107a0878d8d6040516107919291906117db565b60405180910390208888610f17565b83156107e9576107e98c8c8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508b9250339150610fe19050565b896001600160a01b03168c8c6040516108039291906117db565b60405180910390207f69e37f151eb98a09618ddaa80c8cfaf1ce5996867c489f45b555b412271ebf278e8e866000015187602001518760405161084a9594939291906117eb565b60405180910390a3602082015182516108639190611764565b3411156108b5576020820151825133916108fc916108819190611764565b61088b903461181c565b6040518115909202916000818181858888f193505050501580156108b3573d6000803e3d6000fd5b505b505050505050505050505050565b604080518082019091526000808252602082015282516020840120604051636b727d4360e11b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03908116916350e9a7159187917f00000000000000000000000000000000000000000000000000000000000000009091169063d6e4fa8690602401602060405180830381865afa158015610972573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099691906117c2565b866040518463ffffffff1660e01b81526004016109b59392919061187f565b6040805180830381865afa1580156109d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f591906118a4565b949350505050565b60006003610a0a83611095565b101592915050565b60008383604051610a249291906117db565b604080519182900382206020601f870181900481028401810190925285835292508291600091610a71919088908890819084018382808284376000920191909152508892506108c3915050565b8051909150341015610a965760405163044044a560e21b815260040160405180910390fd5b60405163c475abff60e01b815260048101839052602481018590526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063c475abff906044016020604051808303816000875af1158015610b07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2b91906117c2565b8251909150341115610b7357815133906108fc90610b49903461181c565b6040518115909202916000818181858888f19350505050158015610b71573d6000803e3d6000fd5b505b837f3da24c024582931cfaf8267d8ed24d13a82a8068d5bd337d30ec45cea4e506ae88883485604051610ba994939291906118f3565b60405180910390a250505050505050565b80516020820120600090610bcd836109fd565b8015610c5d57506040516312dc929d60e31b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906396e494e890602401602060405180830381865afa158015610c39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c5d9190611612565b9392505050565b6000818152600160205260409020544290610ca0907f000000000000000000000000000000000000000000000000000000000000000090611764565b10610cc657604051630a059d7160e01b8152600481018290526024015b60405180910390fd5b6000908152600160205260409020429055565b610ce1610d4f565b6001600160a01b038116610d465760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610cbd565b6104a381610da9565b6000546001600160a01b031633146105be5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610cbd565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000818152600160205260409020544290610e35907f000000000000000000000000000000000000000000000000000000000000000090611764565b1115610e5757604051635320bcf960e01b815260048101829052602401610cbd565b6000818152600160205260409020544290610e93907f000000000000000000000000000000000000000000000000000000000000000090611764565b11610eb45760405163cb7690d760e01b815260048101829052602401610cbd565b610ebd83610bba565b610edc57826040516308eee0fd60e31b8152600401610cbd919061191a565b6000818152600160205260408120556224ea00821015610f1257604051639a71997b60e01b815260048101839052602401610cbd565b505050565b604080517f93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae6020808301919091528183018690528251808303840181526060830193849052805191012063e32954eb60e01b90925285906001600160a01b0382169063e32954eb90610f919085908890889060640161192d565b6000604051808303816000875af1158015610fb0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610fd89190810190611950565b50505050505050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637a806d6b338385876040516020016110249190611a4f565b6040516020818303038152906040526040518563ffffffff1660e01b81526004016110529493929190611a77565b6020604051808303816000875af1158015611071573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061052191906117c2565b8051600090819081905b8082101561118f5760008583815181106110bb576110bb611ab5565b01602001516001600160f81b0319169050600160ff1b8110156110ea576110e3600184611764565b925061117c565b600760fd1b6001600160f81b03198216101561110b576110e3600284611764565b600f60fc1b6001600160f81b03198216101561112c576110e3600384611764565b601f60fb1b6001600160f81b03198216101561114d576110e3600484611764565b603f60fa1b6001600160f81b03198216101561116e576110e3600584611764565b611179600684611764565b92505b508261118781611acb565b93505061109f565b50909392505050565b6000602082840312156111aa57600080fd5b81356001600160e01b031981168114610c5d57600080fd5b80356001600160a01b03811681146111d957600080fd5b919050565b6000806000606084860312156111f357600080fd5b6111fc846111c2565b925061120a602085016111c2565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156112595761125961121a565b604052919050565b600067ffffffffffffffff82111561127b5761127b61121a565b50601f01601f191660200190565b600082601f83011261129a57600080fd5b81356112ad6112a882611261565b611230565b8181528460208386010111156112c257600080fd5b816020850160208301376000918101602001919091529392505050565b60008083601f8401126112f157600080fd5b50813567ffffffffffffffff81111561130957600080fd5b6020830191508360208260051b850101111561132457600080fd5b9250929050565b80151581146104a357600080fd5b803561ffff811681146111d957600080fd5b60008060008060008060008060006101008a8c03121561136a57600080fd5b893567ffffffffffffffff8082111561138257600080fd5b61138e8d838e01611289565b9a5061139c60208d016111c2565b995060408c0135985060608c013597506113b860808d016111c2565b965060a08c01359150808211156113ce57600080fd5b506113db8c828d016112df565b90955093505060c08a01356113ef8161132b565b91506113fd60e08b01611339565b90509295985092959850929598565b60008083601f84011261141e57600080fd5b50813567ffffffffffffffff81111561143657600080fd5b60208301915083602082850101111561132457600080fd5b6000806000806000806000806000806101008b8d03121561146e57600080fd5b8a3567ffffffffffffffff8082111561148657600080fd5b6114928e838f0161140c565b909c509a508a91506114a660208e016111c2565b995060408d0135985060608d013597506114c260808e016111c2565b965060a08d01359150808211156114d857600080fd5b506114e58d828e016112df565b90955093505060c08b01356114f98161132b565b915061150760e08c01611339565b90509295989b9194979a5092959850565b60006020828403121561152a57600080fd5b5035919050565b6000806040838503121561154457600080fd5b823567ffffffffffffffff81111561155b57600080fd5b61156785828601611289565b95602094909401359450505050565b60006020828403121561158857600080fd5b813567ffffffffffffffff81111561159f57600080fd5b6109f584828501611289565b6000806000604084860312156115c057600080fd5b833567ffffffffffffffff8111156115d757600080fd5b6115e38682870161140c565b909790965060209590950135949350505050565b60006020828403121561160957600080fd5b610c5d826111c2565b60006020828403121561162457600080fd5b8151610c5d8161132b565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b81835260006020808501808196508560051b810191508460005b878110156116dd5782840389528135601e1988360301811261169357600080fd5b8701858101903567ffffffffffffffff8111156116af57600080fd5b8036038213156116be57600080fd5b6116c986828461162f565b9a87019a9550505090840190600101611672565b5091979650505050505050565b8981526001600160a01b03898116602083015260408201899052606082018890528616608082015261010060a0820181905260009061172c8382018789611658565b94151560c0840152505061ffff9190911660e090910152979650505050505050565b634e487b7160e01b600052601160045260246000fd5b808201808211156104635761046361174e565b60a08152600061178b60a08301888a61162f565b6001600160a01b03968716602084015260408301959095525091909316606082015261ffff90921660809092019190915292915050565b6000602082840312156117d457600080fd5b5051919050565b8183823760009101908152919050565b6080815260006117ff60808301878961162f565b602083019590955250604081019290925260609091015292915050565b818103818111156104635761046361174e565b60005b8381101561184a578181015183820152602001611832565b50506000910152565b6000815180845261186b81602086016020860161182f565b601f01601f19169290920160200192915050565b6060815260006118926060830186611853565b60208301949094525060400152919050565b6000604082840312156118b657600080fd5b6040516040810181811067ffffffffffffffff821117156118d9576118d961121a565b604052825181526020928301519281019290925250919050565b60608152600061190760608301868861162f565b6020830194909452506040015292915050565b602081526000610c5d6020830184611853565b838152604060208201526000611947604083018486611658565b95945050505050565b6000602080838503121561196357600080fd5b825167ffffffffffffffff8082111561197b57600080fd5b818501915085601f83011261198f57600080fd5b8151818111156119a1576119a161121a565b8060051b6119b0858201611230565b91825283810185019185810190898411156119ca57600080fd5b86860192505b83831015611a42578251858111156119e85760008081fd5b8601603f81018b136119fa5760008081fd5b878101516040611a0c6112a883611261565b8281528d82848601011115611a215760008081fd5b611a30838c830184870161182f565b855250505091860191908601906119d0565b9998505050505050505050565b60008251611a6181846020870161182f565b6305ccae8d60e31b920191825250600401919050565b6001600160a01b038581168252848116602083015283166040820152608060608201819052600090611aab90830184611853565b9695505050505050565b634e487b7160e01b600052603260045260246000fd5b600060018201611add57611add61174e565b506001019056fea164736f6c6343000811000a";
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
    deploy(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper, _ens, overrides) {
        return super.deploy(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper, _ens, overrides || {});
    }
    getDeployTransaction(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper, _ens, overrides) {
        return super.getDeployTransaction(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper, _ens, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ETHRegistrarController__factory = ETHRegistrarController__factory;
ETHRegistrarController__factory.bytecode = _bytecode;
ETHRegistrarController__factory.abi = _abi;
