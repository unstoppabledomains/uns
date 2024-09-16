import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { USDC, USDCInterface } from "../../../contracts/mocks/USDC";
declare type USDCConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class USDC__factory extends ContractFactory {
    constructor(...args: USDCConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<USDC & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): USDC__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506113198061001d5f395ff3fe608060405234801561000f575f80fd5b50600436106100fb575f3560e01c806370a0823111610093578063a457c2d711610063578063a457c2d7146101ef578063a9059cbb14610202578063d505accf14610215578063dd62ed3e14610228575f80fd5b806370a08231146101a45780637ecebe00146101cc5780638129fc1c146101df57806395d89b41146101e7575f80fd5b8063313ce567116100ce578063313ce567146101655780633644e51514610174578063395093511461017c57806340c10f191461018f575f80fd5b806306fdde03146100ff578063095ea7b31461011d57806318160ddd1461014057806323b872dd14610152575b5f80fd5b61010761023b565b6040516101149190610fb7565b60405180910390f35b61013061012b36600461101e565b6102cb565b6040519015158152602001610114565b6035545b604051908152602001610114565b610130610160366004611046565b6102e4565b60405160068152602001610114565b610144610307565b61013061018a36600461101e565b610315565b6101a261019d36600461101e565b610336565b005b6101446101b236600461107f565b6001600160a01b03165f9081526033602052604090205490565b6101446101da36600461107f565b610344565b6101a2610361565b6101076104da565b6101306101fd36600461101e565b6104e9565b61013061021036600461101e565b610563565b6101a261022336600461109f565b610570565b61014461023636600461110c565b6106d1565b60606036805461024a9061113d565b80601f01602080910402602001604051908101604052809291908181526020018280546102769061113d565b80156102c15780601f10610298576101008083540402835291602001916102c1565b820191905f5260205f20905b8154815290600101906020018083116102a457829003601f168201915b5050505050905090565b5f336102d88185856106fb565b60019150505b92915050565b5f336102f185828561081e565b6102fc858585610896565b506001949350505050565b5f610310610a62565b905090565b5f336102d881858561032783836106d1565b610331919061116f565b6106fb565b6103408282610adb565b5050565b6001600160a01b0381165f908152609960205260408120546102de565b5f54610100900460ff161580801561037f57505f54600160ff909116105b806103985750303b15801561039857505f5460ff166001145b6104005760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b5f805460ff191660011790558015610421575f805461ff0019166101001790555b61044b6040518060400160405280600981526020016855534443204d6f636b60b81b815250610bb7565b6104926040518060400160405280600981526020016855534443204d6f636b60b81b815250604051806040016040528060048152602001635553444360e01b815250610c00565b80156104d7575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50565b60606037805461024a9061113d565b5f33816104f682866106d1565b9050838110156105565760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016103f7565b6102fc82868684036106fb565b5f336102d8818585610896565b834211156105c05760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e6500000060448201526064016103f7565b5f7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886105ee8c610c44565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e0016040516020818303038152906040528051906020012090505f61064882610c6b565b90505f61065782878787610cb7565b9050896001600160a01b0316816001600160a01b0316146106ba5760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e6174757265000060448201526064016103f7565b6106c58a8a8a6106fb565b50505050505050505050565b6001600160a01b039182165f90815260346020908152604080832093909416825291909152205490565b6001600160a01b03831661075d5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103f7565b6001600160a01b0382166107be5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103f7565b6001600160a01b038381165f8181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b5f61082984846106d1565b90505f19811461089057818110156108835760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103f7565b61089084848484036106fb565b50505050565b6001600160a01b0383166108fa5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103f7565b6001600160a01b03821661095c5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103f7565b6001600160a01b0383165f90815260336020526040902054818110156109d35760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103f7565b6001600160a01b038085165f90815260336020526040808220858503905591851681529081208054849290610a0990849061116f565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610a5591815260200190565b60405180910390a3610890565b5f6103107f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f610a9060655490565b6066546040805160208101859052908101839052606081018290524660808201523060a08201525f9060c0016040516020818303038152906040528051906020012090509392505050565b6001600160a01b038216610b315760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103f7565b8060355f828254610b42919061116f565b90915550506001600160a01b0382165f9081526033602052604081208054839290610b6e90849061116f565b90915550506040518181526001600160a01b038316905f907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b5f54610100900460ff16610bdd5760405162461bcd60e51b81526004016103f79061118e565b6104d781604051806040016040528060018152602001603160f81b815250610cdd565b5f54610100900460ff16610c265760405162461bcd60e51b81526004016103f79061118e565b6036610c328382611238565b506037610c3f8282611238565b505050565b6001600160a01b0381165f9081526099602052604090208054600181018255905b50919050565b5f6102de610c77610a62565b8360405161190160f01b602082015260228101839052604281018290525f9060620160405160208183030381529060405280519060200120905092915050565b5f805f610cc687878787610d1d565b91509150610cd381610e02565b5095945050505050565b5f54610100900460ff16610d035760405162461bcd60e51b81526004016103f79061118e565b815160209283012081519190920120606591909155606655565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115610d5257505f90506003610df9565b8460ff16601b14158015610d6a57508460ff16601c14155b15610d7a57505f90506004610df9565b604080515f8082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610dcb573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b038116610df3575f60019250925050610df9565b91505f90505b94509492505050565b5f816004811115610e1557610e156112f8565b03610e1d5750565b6001816004811115610e3157610e316112f8565b03610e7e5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016103f7565b6002816004811115610e9257610e926112f8565b03610edf5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016103f7565b6003816004811115610ef357610ef36112f8565b03610f4b5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016103f7565b6004816004811115610f5f57610f5f6112f8565b036104d75760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016103f7565b5f602080835283518060208501525f5b81811015610fe357858101830151858201604001528201610fc7565b505f604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114611019575f80fd5b919050565b5f806040838503121561102f575f80fd5b61103883611003565b946020939093013593505050565b5f805f60608486031215611058575f80fd5b61106184611003565b925061106f60208501611003565b9150604084013590509250925092565b5f6020828403121561108f575f80fd5b61109882611003565b9392505050565b5f805f805f805f60e0888a0312156110b5575f80fd5b6110be88611003565b96506110cc60208901611003565b95506040880135945060608801359350608088013560ff811681146110ef575f80fd5b9699959850939692959460a0840135945060c09093013592915050565b5f806040838503121561111d575f80fd5b61112683611003565b915061113460208401611003565b90509250929050565b600181811c9082168061115157607f821691505b602082108103610c6557634e487b7160e01b5f52602260045260245ffd5b808201808211156102de57634e487b7160e01b5f52601160045260245ffd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b5f52604160045260245ffd5b601f821115610c3f57805f5260205f20601f840160051c810160208510156112125750805b601f840160051c820191505b81811015611231575f815560010161121e565b5050505050565b815167ffffffffffffffff811115611252576112526111d9565b61126681611260845461113d565b846111ed565b602080601f831160018114611299575f84156112825750858301515b5f19600386901b1c1916600185901b1785556112f0565b5f85815260208120601f198616915b828110156112c7578886015182559484019460019091019084016112a8565b50858210156112e457878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b634e487b7160e01b5f52602160045260245ffdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Approval";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "version";
            readonly type: "uint8";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "DOMAIN_SEPARATOR";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "allowance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "decimals";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "subtractedValue";
            readonly type: "uint256";
        }];
        readonly name: "decreaseAllowance";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "addedValue";
            readonly type: "uint256";
        }];
        readonly name: "increaseAllowance";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "mint";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }];
        readonly name: "nonces";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "deadline";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly name: "permit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "symbol";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "totalSupply";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transfer";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transferFrom";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): USDCInterface;
    static connect(address: string, runner?: ContractRunner | null): USDC;
}
export {};
//# sourceMappingURL=USDC__factory.d.ts.map