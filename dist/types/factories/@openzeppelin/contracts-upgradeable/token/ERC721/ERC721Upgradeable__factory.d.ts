import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { ERC721Upgradeable, ERC721UpgradeableInterface } from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable";
declare type ERC721UpgradeableConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC721Upgradeable__factory extends ContractFactory {
    constructor(...args: ERC721UpgradeableConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ERC721Upgradeable & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ERC721Upgradeable__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506110908061001d5f395ff3fe608060405234801561000f575f80fd5b50600436106100cb575f3560e01c80636352211e11610088578063a22cb46511610063578063a22cb465146101ae578063b88d4fde146101c1578063c87b56dd146101d4578063e985e9c5146101e7575f80fd5b80636352211e1461017257806370a082311461018557806395d89b41146101a6575f80fd5b806301ffc9a7146100cf57806306fdde03146100f7578063081812fc1461010c578063095ea7b31461013757806323b872dd1461014c57806342842e0e1461015f575b5f80fd5b6100e26100dd366004610c0d565b6101fa565b60405190151581526020015b60405180910390f35b6100ff61024b565b6040516100ee9190610c75565b61011f61011a366004610c87565b6102db565b6040516001600160a01b0390911681526020016100ee565b61014a610145366004610cb9565b610300565b005b61014a61015a366004610ce1565b610419565b61014a61016d366004610ce1565b61044a565b61011f610180366004610c87565b610464565b610198610193366004610d1a565b6104c3565b6040519081526020016100ee565b6100ff610547565b61014a6101bc366004610d33565b610556565b61014a6101cf366004610d80565b610565565b6100ff6101e2366004610c87565b61059d565b6100e26101f5366004610e55565b61060d565b5f6001600160e01b031982166380ac58cd60e01b148061022a57506001600160e01b03198216635b5e139f60e01b145b8061024557506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606065805461025a90610e86565b80601f016020809104026020016040519081016040528092919081815260200182805461028690610e86565b80156102d15780601f106102a8576101008083540402835291602001916102d1565b820191905f5260205f20905b8154815290600101906020018083116102b457829003601f168201915b5050505050905090565b5f6102e58261063a565b505f908152606960205260409020546001600160a01b031690565b5f61030a82610464565b9050806001600160a01b0316836001600160a01b03160361037c5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103985750610398813361060d565b61040a5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610373565b610414838361069b565b505050565b6104233382610708565b61043f5760405162461bcd60e51b815260040161037390610ebe565b610414838383610766565b61041483838360405180602001604052805f815250610565565b5f818152606760205260408120546001600160a01b0316806102455760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610373565b5f6001600160a01b03821661052c5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610373565b506001600160a01b03165f9081526068602052604090205490565b60606066805461025a90610e86565b6105613383836108fe565b5050565b61056f3383610708565b61058b5760405162461bcd60e51b815260040161037390610ebe565b610597848484846109cb565b50505050565b60606105a88261063a565b5f6105bd60408051602081019091525f815290565b90505f8151116105db5760405180602001604052805f815250610606565b806105e5846109fe565b6040516020016105f6929190610f0c565b6040516020818303038152906040525b9392505050565b6001600160a01b039182165f908152606a6020908152604080832093909416825291909152205460ff1690565b5f818152606760205260409020546001600160a01b03166106985760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610373565b50565b5f81815260696020526040902080546001600160a01b0319166001600160a01b03841690811790915581906106cf82610464565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b5f8061071383610464565b9050806001600160a01b0316846001600160a01b0316148061073a575061073a818561060d565b8061075e5750836001600160a01b0316610753846102db565b6001600160a01b0316145b949350505050565b826001600160a01b031661077982610464565b6001600160a01b0316146107dd5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610373565b6001600160a01b03821661083f5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610373565b6108495f8261069b565b6001600160a01b0383165f908152606860205260408120805460019290610871908490610f4e565b90915550506001600160a01b0382165f90815260686020526040812080546001929061089e908490610f61565b90915550505f8181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b03160361095f5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610373565b6001600160a01b038381165f818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6109d6848484610766565b6109e284848484610afb565b6105975760405162461bcd60e51b815260040161037390610f74565b6060815f03610a245750506040805180820190915260018152600360fc1b602082015290565b815f5b8115610a4d5780610a3781610fc6565b9150610a469050600a83610ff2565b9150610a27565b5f8167ffffffffffffffff811115610a6757610a67610d6c565b6040519080825280601f01601f191660200182016040528015610a91576020820181803683370190505b5090505b841561075e57610aa6600183610f4e565b9150610ab3600a86611005565b610abe906030610f61565b60f81b818381518110610ad357610ad3611018565b60200101906001600160f81b03191690815f1a905350610af4600a86610ff2565b9450610a95565b5f6001600160a01b0384163b15610bed57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610b3e90339089908890889060040161102c565b6020604051808303815f875af1925050508015610b78575060408051601f3d908101601f19168201909252610b7591810190611068565b60015b610bd3573d808015610ba5576040519150601f19603f3d011682016040523d82523d5f602084013e610baa565b606091505b5080515f03610bcb5760405162461bcd60e51b815260040161037390610f74565b805181602001fd5b6001600160e01b031916630a85bd0160e11b14905061075e565b506001949350505050565b6001600160e01b031981168114610698575f80fd5b5f60208284031215610c1d575f80fd5b813561060681610bf8565b5f5b83811015610c42578181015183820152602001610c2a565b50505f910152565b5f8151808452610c61816020860160208601610c28565b601f01601f19169290920160200192915050565b602081525f6106066020830184610c4a565b5f60208284031215610c97575f80fd5b5035919050565b80356001600160a01b0381168114610cb4575f80fd5b919050565b5f8060408385031215610cca575f80fd5b610cd383610c9e565b946020939093013593505050565b5f805f60608486031215610cf3575f80fd5b610cfc84610c9e565b9250610d0a60208501610c9e565b9150604084013590509250925092565b5f60208284031215610d2a575f80fd5b61060682610c9e565b5f8060408385031215610d44575f80fd5b610d4d83610c9e565b915060208301358015158114610d61575f80fd5b809150509250929050565b634e487b7160e01b5f52604160045260245ffd5b5f805f8060808587031215610d93575f80fd5b610d9c85610c9e565b9350610daa60208601610c9e565b925060408501359150606085013567ffffffffffffffff80821115610dcd575f80fd5b818701915087601f830112610de0575f80fd5b813581811115610df257610df2610d6c565b604051601f8201601f19908116603f01168101908382118183101715610e1a57610e1a610d6c565b816040528281528a6020848701011115610e32575f80fd5b826020860160208301375f60208483010152809550505050505092959194509250565b5f8060408385031215610e66575f80fd5b610e6f83610c9e565b9150610e7d60208401610c9e565b90509250929050565b600181811c90821680610e9a57607f821691505b602082108103610eb857634e487b7160e01b5f52602260045260245ffd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b5f8351610f1d818460208801610c28565b835190830190610f31818360208801610c28565b01949350505050565b634e487b7160e01b5f52601160045260245ffd5b8181038181111561024557610245610f3a565b8082018082111561024557610245610f3a565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b5f60018201610fd757610fd7610f3a565b5060010190565b634e487b7160e01b5f52601260045260245ffd5b5f8261100057611000610fde565b500490565b5f8261101357611013610fde565b500690565b634e487b7160e01b5f52603260045260245ffd5b6001600160a01b03858116825284166020820152604081018390526080606082018190525f9061105e90830184610c4a565b9695505050505050565b5f60208284031215611078575f80fd5b815161060681610bf856fea164736f6c6343000818000a";
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
            readonly name: "approved";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "Approval";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "approved";
            readonly type: "bool";
        }];
        readonly name: "ApprovalForAll";
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
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
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
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "getApproved";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
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
            readonly name: "operator";
            readonly type: "address";
        }];
        readonly name: "isApprovedForAll";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
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
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "ownerOf";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
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
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "safeTransferFrom";
        readonly outputs: readonly [];
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
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "safeTransferFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "approved";
            readonly type: "bool";
        }];
        readonly name: "setApprovalForAll";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
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
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "tokenURI";
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
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "transferFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ERC721UpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC721Upgradeable;
}
export {};
//# sourceMappingURL=ERC721Upgradeable__factory.d.ts.map