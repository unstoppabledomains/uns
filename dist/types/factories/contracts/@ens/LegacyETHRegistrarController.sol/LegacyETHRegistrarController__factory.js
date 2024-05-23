"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyETHRegistrarController__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract BaseRegistrar",
                name: "_base",
                type: "address",
            },
            {
                internalType: "contract PriceOracle",
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
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
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
                name: "oracle",
                type: "address",
            },
        ],
        name: "NewPriceOracle",
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
        constant: true,
        inputs: [],
        name: "MIN_REGISTRATION_DURATION",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes32",
                name: "commitment",
                type: "bytes32",
            },
        ],
        name: "commit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "isOwner",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
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
                internalType: "bytes32",
                name: "secret",
                type: "bytes32",
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
        payable: false,
        stateMutability: "pure",
        type: "function",
    },
    {
        constant: true,
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
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "makeCommitmentWithConfig",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        payable: false,
        stateMutability: "pure",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "maxCommitmentAge",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "minCommitmentAge",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
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
        ],
        name: "register",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
    {
        constant: false,
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
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "registerWithConfig",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
    {
        constant: false,
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
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
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
        ],
        name: "setCommitmentAges",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "contract PriceOracle",
                name: "_prices",
                type: "address",
            },
        ],
        name: "setPriceOracle",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "pure",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "pure",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50604051611a13380380611a138339818101604052608081101561003357600080fd5b5080516020820151604080840151606090940151600080546001600160a01b031916331780825592519495939491926001600160a01b0316917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a381811161009d57600080fd5b600180546001600160a01b039586166001600160a01b031991821617909155600280549490951693169290921790925560039190915560045561192e806100e56000396000f3fe60806040526004361061012a5760003560e01c80638d839ffe116100ab578063aeb8ce9b1161006f578063aeb8ce9b146105d7578063ce1e09c014610688578063f14fcbc81461069d578063f2fde38b146106c7578063f49826be146106fa578063f7a16963146107b95761012a565b80638d839ffe1461045d5780638da5cb5b146104725780638f32d59b146104a35780639791c097146104b8578063acf1a841146105695761012a565b80637e324479116100f25780637e324479146102b8578063839df945146102e857806383e7f6ff1461031257806385f6d155146103c55780638a95b09f146104485761012a565b806301ffc9a71461012f5780633ccfd60b146101775780633d86c52f1461018e578063530e784f14610270578063715018a6146102a3575b600080fd5b34801561013b57600080fd5b506101636004803603602081101561015257600080fd5b50356001600160e01b031916610881565b604080519115158252519081900360200190f35b34801561018357600080fd5b5061018c610a12565b005b34801561019a57600080fd5b5061025e600480360360a08110156101b157600080fd5b810190602081018135600160201b8111156101cb57600080fd5b8201836020820111156101dd57600080fd5b803590602001918460018302840111600160201b831117156101fe57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550506001600160a01b0383358116945060208401359360408101358216935060600135169050610a53565b60408051918252519081900360200190f35b34801561027c57600080fd5b5061018c6004803603602081101561029357600080fd5b50356001600160a01b0316610b42565b3480156102af57600080fd5b5061018c610ba3565b3480156102c457600080fd5b5061018c600480360360408110156102db57600080fd5b5080359060200135610bfe565b3480156102f457600080fd5b5061025e6004803603602081101561030b57600080fd5b5035610c1a565b34801561031e57600080fd5b5061025e6004803603604081101561033557600080fd5b810190602081018135600160201b81111561034f57600080fd5b82018360208201111561036157600080fd5b803590602001918460018302840111600160201b8311171561038257600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505091359250610c2c915050565b61018c600480360360808110156103db57600080fd5b810190602081018135600160201b8111156103f557600080fd5b82018360208201111561040757600080fd5b803590602001918460018302840111600160201b8311171561042857600080fd5b91935091506001600160a01b038135169060208101359060400135610d9e565b34801561045457600080fd5b5061025e610de9565b34801561046957600080fd5b5061025e610df0565b34801561047e57600080fd5b50610487610df6565b604080516001600160a01b039092168252519081900360200190f35b3480156104af57600080fd5b50610163610e05565b3480156104c457600080fd5b50610163600480360360208110156104db57600080fd5b810190602081018135600160201b8111156104f557600080fd5b82018360208201111561050757600080fd5b803590602001918460018302840111600160201b8311171561052857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610e16945050505050565b61018c6004803603604081101561057f57600080fd5b810190602081018135600160201b81111561059957600080fd5b8201836020820111156105ab57600080fd5b803590602001918460018302840111600160201b831117156105cc57600080fd5b919350915035610e2b565b3480156105e357600080fd5b50610163600480360360208110156105fa57600080fd5b810190602081018135600160201b81111561061457600080fd5b82018360208201111561062657600080fd5b803590602001918460018302840111600160201b8311171561064757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610fcf945050505050565b34801561069457600080fd5b5061025e611069565b3480156106a957600080fd5b5061018c600480360360208110156106c057600080fd5b503561106f565b3480156106d357600080fd5b5061018c600480360360208110156106ea57600080fd5b50356001600160a01b03166110a1565b34801561070657600080fd5b5061025e6004803603606081101561071d57600080fd5b810190602081018135600160201b81111561073757600080fd5b82018360208201111561074957600080fd5b803590602001918460018302840111600160201b8311171561076a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550506001600160a01b0383351693505050602001356110bb565b61018c600480360360c08110156107cf57600080fd5b810190602081018135600160201b8111156107e957600080fd5b8201836020820111156107fb57600080fd5b803590602001918460018302840111600160201b8311171561081c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550506001600160a01b038335811694506020840135936040810135935060608101358216925060800135166110d3565b604080517f737570706f727473496e74657266616365286279746573342900000000000000815290519081900360190190206000906001600160e01b0319838116911614806109c05750604080517472656e657728737472696e672c75696e743235362960581b815290519081900360150181209080602861186a8239604080519182900360280182206e636f6d6d697428627974657333322960881b8352905191829003600f01822090925090806026611892823960260190506040518091039020604051808070617661696c61626c6528737472696e672960781b8152506011019050604051809103902060405180807f72656e74507269636528737472696e672c75696e7432353629000000000000008152506019019050604051809103902018181818186001600160e01b031916826001600160e01b031916145b80610a0c5750604051808061182a60409139604080519182900301812091508060426118b8823960420190506040518091039020186001600160e01b031916826001600160e01b031916145b92915050565b610a1a610e05565b610a2357600080fd5b6040513390303180156108fc02916000818181858888f19350505050158015610a50573d6000803e3d6000fd5b50565b845160208601206000906001600160a01b038416158015610a7b57506001600160a01b038316155b15610acb57604080516020808201939093526bffffffffffffffffffffffff19606089901b1681830152605480820188905282518083039091018152607490910190915280519101209050610b39565b6001600160a01b038416610ade57600080fd5b604080516020808201939093526bffffffffffffffffffffffff19606089811b82168385015287811b8216605484015286901b166068820152607c80820188905282518083039091018152609c909101909152805191012090505b95945050505050565b610b4a610e05565b610b5357600080fd5b600280546001600160a01b0319166001600160a01b0383811691909117918290556040519116907ff261845a790fe29bbd6631e2ca4a5bdc83e6eed7c3271d9590d97287e00e912390600090a250565b610bab610e05565b610bb457600080fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b610c06610e05565b610c0f57600080fd5b600391909155600455565b60056020526000908152604090205481565b815160208084019190912060025460015460408051636b727d4360e11b81526004810185905290516000956001600160a01b03948516946350e9a715948a9491169263d6e4fa8692602480840193919291829003018186803b158015610c9157600080fd5b505afa158015610ca5573d6000803e3d6000fd5b505050506040513d6020811015610cbb57600080fd5b50516040516001600160e01b031960e085901b168152602481018290526044810188905260606004820190815283516064830152835189928291608490910190602087019080838360005b83811015610d1e578181015183820152602001610d06565b50505050905090810190601f168015610d4b5780820380516001836020036101000a031916815260200191505b5094505050505060206040518083038186803b158015610d6a57600080fd5b505afa158015610d7e573d6000803e3d6000fd5b505050506040513d6020811015610d9457600080fd5b5051949350505050565b610de285858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250889350879250869150806110d3565b5050505050565b6224ea0081565b60035481565b6000546001600160a01b031690565b6000546001600160a01b0316331490565b60006003610e2383611646565b101592915050565b6000610e6e84848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250869250610c2c915050565b905080341015610e7d57600080fd5b60008484604051808383808284376040805193909101839003832060015463c475abff60e01b855260048501829052602485018b90529151909750600096506001600160a01b03909116945063c475abff93506044808401936020935082900301818787803b158015610eef57600080fd5b505af1158015610f03573d6000803e3d6000fd5b505050506040513d6020811015610f1957600080fd5b5051905034831015610f565760405133903485900380156108fc02916000818181858888f19350505050158015610f54573d6000803e3d6000fd5b505b817f3da24c024582931cfaf8267d8ed24d13a82a8068d5bd337d30ec45cea4e506ae8787868560405180806020018481526020018381526020018281038252868682818152602001925080828437600083820152604051601f909101601f191690920182900397509095505050505050a2505050505050565b80516020820120600090610fe283610e16565b80156110625750600154604080516312dc929d60e31b81526004810184905290516001600160a01b03909216916396e494e891602480820192602092909190829003018186803b15801561103557600080fd5b505afa158015611049573d6000803e3d6000fd5b505050506040513d602081101561105f57600080fd5b50515b9392505050565b60045481565b6004546000828152600560205260409020544291011061108e57600080fd5b6000908152600560205260409020429055565b6110a9610e05565b6110b257600080fd5b610a508161172e565b60006110cb848484600080610a53565b949350505050565b60006110e28787868686610a53565b905060006110f188878461179c565b885160208a01209091508060006001600160a01b038716156114ac5760015460408051633f2891eb60e21b815260048101859052306024820152604481018c905290516001600160a01b039092169163fca247ac916064808201926020929091908290030181600087803b15801561116857600080fd5b505af115801561117c573d6000803e3d6000fd5b505050506040513d602081101561119257600080fd5b505160015460408051630ddf7fcb60e41b815290519293506000926001600160a01b039092169163ddf7fcb091600480820192602092909190829003018186803b1580156111df57600080fd5b505afa1580156111f3573d6000803e3d6000fd5b505050506040513d602081101561120957600080fd5b50516040805160208181019390935280820187905281518082038301815260608201808452815191850191909120600154633f15457f60e01b90925292519294506001600160a01b031692633f15457f92606480840193829003018186803b15801561127457600080fd5b505afa158015611288573d6000803e3d6000fd5b505050506040513d602081101561129e57600080fd5b505160408051630c4b7b8560e11b8152600481018490526001600160a01b038b8116602483015291519190921691631896f70a91604480830192600092919082900301818387803b1580156112f257600080fd5b505af1158015611306573d6000803e3d6000fd5b505050506001600160a01b0387161561139257876001600160a01b031663d5fa2b0082896040518363ffffffff1660e01b815260040180838152602001826001600160a01b03166001600160a01b0316815260200192505050600060405180830381600087803b15801561137957600080fd5b505af115801561138d573d6000803e3d6000fd5b505050505b60015460408051630a3b53db60e21b8152600481018690526001600160a01b038e81166024830152915191909216916328ed4f6c91604480830192600092919082900301818387803b1580156113e757600080fd5b505af11580156113fb573d6000803e3d6000fd5b50505050600160009054906101000a90046001600160a01b03166001600160a01b03166323b872dd308d866040518463ffffffff1660e01b815260040180846001600160a01b03166001600160a01b03168152602001836001600160a01b03166001600160a01b031681526020018281526020019350505050600060405180830381600087803b15801561148e57600080fd5b505af11580156114a2573d6000803e3d6000fd5b505050505061154c565b6001600160a01b038616156114c057600080fd5b60015460408051633f2891eb60e21b8152600481018590526001600160a01b038d81166024830152604482018d90529151919092169163fca247ac9160648083019260209291908290030181600087803b15801561151d57600080fd5b505af1158015611531573d6000803e3d6000fd5b505050506040513d602081101561154757600080fd5b505190505b896001600160a01b0316837fca6abbe9d7f11422cb6ca7629fbf6fe9efb1c621f71ce8f02b9f2a230097404f8d87856040518080602001848152602001838152602001828103825285818151815260200191508051906020019080838360005b838110156115c45781810151838201526020016115ac565b50505050905090810190601f1680156115f15780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a3833411156116395760405133903486900380156108fc02916000818181858888f19350505050158015611637573d6000803e3d6000fd5b505b5050505050505050505050565b8051600090819081905b8082101561172557600085838151811061166657fe5b01602001516001600160f81b0319169050600160ff1b81101561168e57600183019250611719565b600760fd1b6001600160f81b0319821610156116af57600283019250611719565b600f60fc1b6001600160f81b0319821610156116d057600383019250611719565b601f60fb1b6001600160f81b0319821610156116f157600483019250611719565b603f60fa1b6001600160f81b03198216101561171257600583019250611719565b6006830192505b50600190920191611650565b50909392505050565b6001600160a01b03811661174157600080fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b600354600082815260056020526040812054909142910111156117be57600080fd5b600454600083815260056020526040902054429101116117dd57600080fd5b6117e684610fcf565b6117ef57600080fd5b600082815260056020526040812081905561180a8585610c2c565b90506224ea0084101561181c57600080fd5b803410156110cb57600080fdfe6d616b65436f6d6d69746d656e7457697468436f6e66696728737472696e672c616464726573732c627974657333322c616464726573732c6164647265737329726567697374657228737472696e672c616464726573732c75696e743235362c62797465733332296d616b65436f6d6d69746d656e7428737472696e672c616464726573732c6279746573333229726567697374657257697468436f6e66696728737472696e672c616464726573732c75696e743235362c627974657333322c616464726573732c6164647265737329a265627a7a72315820dbcd3913c2076b23152296f549f9d7284be303cc004736992b455428cb03c12664736f6c634300050c0032";
const isSuperArgs = (xs) => xs.length > 1;
class LegacyETHRegistrarController__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_base, _prices, _minCommitmentAge, _maxCommitmentAge, overrides) {
        return super.getDeployTransaction(_base, _prices, _minCommitmentAge, _maxCommitmentAge, overrides || {});
    }
    deploy(_base, _prices, _minCommitmentAge, _maxCommitmentAge, overrides) {
        return super.deploy(_base, _prices, _minCommitmentAge, _maxCommitmentAge, overrides || {});
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
exports.LegacyETHRegistrarController__factory = LegacyETHRegistrarController__factory;
LegacyETHRegistrarController__factory.bytecode = _bytecode;
LegacyETHRegistrarController__factory.abi = _abi;
