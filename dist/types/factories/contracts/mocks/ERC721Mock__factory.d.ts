import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { ERC721Mock, ERC721MockInterface } from "../../../contracts/mocks/ERC721Mock";
declare type ERC721MockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC721Mock__factory extends ContractFactory {
    constructor(...args: ERC721MockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ERC721Mock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ERC721Mock__factory;
    static readonly bytecode = "0x608060405234801562000010575f80fd5b5060408051602080820183525f80835283519182019093528281529091620000398382620000ef565b506001620000488282620000ef565b505050620001bb565b634e487b7160e01b5f52604160045260245ffd5b600181811c908216806200007a57607f821691505b6020821081036200009957634e487b7160e01b5f52602260045260245ffd5b50919050565b601f821115620000ea57805f5260205f20601f840160051c81016020851015620000c65750805b601f840160051c820191505b81811015620000e7575f8155600101620000d2565b50505b505050565b81516001600160401b038111156200010b576200010b62000051565b62000123816200011c845462000065565b846200009f565b602080601f83116001811462000159575f8415620001415750858301515b5f19600386901b1c1916600185901b178555620001b3565b5f85815260208120601f198616915b82811015620001895788860151825594840194600190910190840162000168565b5085821015620001a757878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b61128b80620001c95f395ff3fe608060405234801561000f575f80fd5b50600436106100e5575f3560e01c80636352211e11610088578063a22cb46511610063578063a22cb465146101db578063b88d4fde146101ee578063c87b56dd14610201578063e985e9c514610214575f80fd5b80636352211e1461019f57806370a08231146101b257806395d89b41146101d3575f80fd5b8063095ea7b3116100c3578063095ea7b31461015157806323b872dd1461016657806340c10f191461017957806342842e0e1461018c575f80fd5b806301ffc9a7146100e957806306fdde0314610111578063081812fc14610126575b5f80fd5b6100fc6100f7366004610e64565b61024f565b60405190151581526020015b60405180910390f35b6101196102a0565b6040516101089190610ecc565b610139610134366004610ede565b61032f565b6040516001600160a01b039091168152602001610108565b61016461015f366004610f10565b610354565b005b610164610174366004610f38565b61046d565b610164610187366004610f10565b61049e565b61016461019a366004610f38565b6104ac565b6101396101ad366004610ede565b6104c6565b6101c56101c0366004610f71565b610525565b604051908152602001610108565b6101196105a9565b6101646101e9366004610f8a565b6105b8565b6101646101fc366004610fd7565b6105c3565b61011961020f366004610ede565b6105fb565b6100fc6102223660046110ac565b6001600160a01b039182165f90815260056020908152604080832093909416825291909152205460ff1690565b5f6001600160e01b031982166380ac58cd60e01b148061027f57506001600160e01b03198216635b5e139f60e01b145b8061029a57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60605f80546102ae906110dd565b80601f01602080910402602001604051908101604052809291908181526020018280546102da906110dd565b80156103255780601f106102fc57610100808354040283529160200191610325565b820191905f5260205f20905b81548152906001019060200180831161030857829003601f168201915b5050505050905090565b5f6103398261066b565b505f908152600460205260409020546001600160a01b031690565b5f61035e826104c6565b9050806001600160a01b0316836001600160a01b0316036103d05760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103ec57506103ec8133610222565b61045e5760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016103c7565b61046883836106cc565b505050565b6104773382610739565b6104935760405162461bcd60e51b81526004016103c790611115565b6104688383836107b6565b6104a88282610918565b5050565b61046883838360405180602001604052805f8152506105c3565b5f818152600260205260408120546001600160a01b03168061029a5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103c7565b5f6001600160a01b03821661058e5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016103c7565b506001600160a01b03165f9081526003602052604090205490565b6060600180546102ae906110dd565b6104a8338383610931565b6105cd3383610739565b6105e95760405162461bcd60e51b81526004016103c790611115565b6105f5848484846109fe565b50505050565b60606106068261066b565b5f61061b60408051602081019091525f815290565b90505f8151116106395760405180602001604052805f815250610664565b8061064384610a31565b604051602001610654929190611162565b6040516020818303038152906040525b9392505050565b5f818152600260205260409020546001600160a01b03166106c95760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103c7565b50565b5f81815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610700826104c6565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b5f80610744836104c6565b9050806001600160a01b0316846001600160a01b0316148061078a57506001600160a01b038082165f9081526005602090815260408083209388168352929052205460ff165b806107ae5750836001600160a01b03166107a38461032f565b6001600160a01b0316145b949350505050565b826001600160a01b03166107c9826104c6565b6001600160a01b0316146107ef5760405162461bcd60e51b81526004016103c790611190565b6001600160a01b0382166108515760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103c7565b826001600160a01b0316610864826104c6565b6001600160a01b03161461088a5760405162461bcd60e51b81526004016103c790611190565b5f81815260046020908152604080832080546001600160a01b03199081169091556001600160a01b038781168086526003855283862080545f1901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6104a8828260405180602001604052805f815250610ac1565b816001600160a01b0316836001600160a01b0316036109925760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103c7565b6001600160a01b038381165f81815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610a098484846107b6565b610a1584848484610af3565b6105f55760405162461bcd60e51b81526004016103c7906111d5565b60605f610a3d83610bf0565b60010190505f8167ffffffffffffffff811115610a5c57610a5c610fc3565b6040519080825280601f01601f191660200182016040528015610a86576020820181803683370190505b5090508181016020015b5f19016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610a9057509392505050565b610acb8383610cc7565b610ad75f848484610af3565b6104685760405162461bcd60e51b81526004016103c7906111d5565b5f6001600160a01b0384163b15610be557604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610b36903390899088908890600401611227565b6020604051808303815f875af1925050508015610b70575060408051601f3d908101601f19168201909252610b6d91810190611263565b60015b610bcb573d808015610b9d576040519150601f19603f3d011682016040523d82523d5f602084013e610ba2565b606091505b5080515f03610bc35760405162461bcd60e51b81526004016103c7906111d5565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506107ae565b506001949350505050565b5f8072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610c2e5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610c5a576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610c7857662386f26fc10000830492506010015b6305f5e1008310610c90576305f5e100830492506008015b6127108310610ca457612710830492506004015b60648310610cb6576064830492506002015b600a831061029a5760010192915050565b6001600160a01b038216610d1d5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103c7565b5f818152600260205260409020546001600160a01b031615610d815760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103c7565b5f818152600260205260409020546001600160a01b031615610de55760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103c7565b6001600160a01b0382165f81815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6001600160e01b0319811681146106c9575f80fd5b5f60208284031215610e74575f80fd5b813561066481610e4f565b5f5b83811015610e99578181015183820152602001610e81565b50505f910152565b5f8151808452610eb8816020860160208601610e7f565b601f01601f19169290920160200192915050565b602081525f6106646020830184610ea1565b5f60208284031215610eee575f80fd5b5035919050565b80356001600160a01b0381168114610f0b575f80fd5b919050565b5f8060408385031215610f21575f80fd5b610f2a83610ef5565b946020939093013593505050565b5f805f60608486031215610f4a575f80fd5b610f5384610ef5565b9250610f6160208501610ef5565b9150604084013590509250925092565b5f60208284031215610f81575f80fd5b61066482610ef5565b5f8060408385031215610f9b575f80fd5b610fa483610ef5565b915060208301358015158114610fb8575f80fd5b809150509250929050565b634e487b7160e01b5f52604160045260245ffd5b5f805f8060808587031215610fea575f80fd5b610ff385610ef5565b935061100160208601610ef5565b925060408501359150606085013567ffffffffffffffff80821115611024575f80fd5b818701915087601f830112611037575f80fd5b81358181111561104957611049610fc3565b604051601f8201601f19908116603f0116810190838211818310171561107157611071610fc3565b816040528281528a6020848701011115611089575f80fd5b826020860160208301375f60208483010152809550505050505092959194509250565b5f80604083850312156110bd575f80fd5b6110c683610ef5565b91506110d460208401610ef5565b90509250929050565b600181811c908216806110f157607f821691505b60208210810361110f57634e487b7160e01b5f52602260045260245ffd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b5f8351611173818460208801610e7f565b835190830190611187818360208801610e7f565b01949350505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f9061125990830184610ea1565b9695505050505050565b5f60208284031215611273575f80fd5b815161066481610e4f56fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
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
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
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
    static createInterface(): ERC721MockInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC721Mock;
}
export {};
//# sourceMappingURL=ERC721Mock__factory.d.ts.map