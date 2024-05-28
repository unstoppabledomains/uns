import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { ERC721, ERC721Interface } from "../../../../../@openzeppelin/contracts/token/ERC721/ERC721";
declare type ERC721ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC721__factory extends ContractFactory {
    constructor(...args: ERC721ConstructorParams);
    getDeployTransaction(name_: string, symbol_: string, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(name_: string, symbol_: string, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ERC721 & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ERC721__factory;
    static readonly bytecode = "0x608060405234801562000010575f80fd5b506040516200136438038062001364833981016040819052620000339162000119565b5f62000040838262000209565b5060016200004f828262000209565b505050620002d5565b634e487b7160e01b5f52604160045260245ffd5b5f82601f8301126200007c575f80fd5b81516001600160401b038082111562000099576200009962000058565b604051601f8301601f19908116603f01168101908282118183101715620000c457620000c462000058565b8160405283815260209250866020858801011115620000e1575f80fd5b5f91505b83821015620001045785820183015181830184015290820190620000e5565b5f602085830101528094505050505092915050565b5f80604083850312156200012b575f80fd5b82516001600160401b038082111562000142575f80fd5b62000150868387016200006c565b9350602085015191508082111562000166575f80fd5b5062000175858286016200006c565b9150509250929050565b600181811c908216806200019457607f821691505b602082108103620001b357634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156200020457805f5260205f20601f840160051c81016020851015620001e05750805b601f840160051c820191505b8181101562000201575f8155600101620001ec565b50505b505050565b81516001600160401b0381111562000225576200022562000058565b6200023d816200023684546200017f565b84620001b9565b602080601f83116001811462000273575f84156200025b5750858301515b5f19600386901b1c1916600185901b178555620002cd565b5f85815260208120601f198616915b82811015620002a35788860151825594840194600190910190840162000282565b5085821015620002c157878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b61108180620002e35f395ff3fe608060405234801561000f575f80fd5b50600436106100cb575f3560e01c80636352211e11610088578063a22cb46511610063578063a22cb465146101ae578063b88d4fde146101c1578063c87b56dd146101d4578063e985e9c5146101e7575f80fd5b80636352211e1461017257806370a082311461018557806395d89b41146101a6575f80fd5b806301ffc9a7146100cf57806306fdde03146100f7578063081812fc1461010c578063095ea7b31461013757806323b872dd1461014c57806342842e0e1461015f575b5f80fd5b6100e26100dd366004610c5a565b610222565b60405190151581526020015b60405180910390f35b6100ff610273565b6040516100ee9190610cc2565b61011f61011a366004610cd4565b610302565b6040516001600160a01b0390911681526020016100ee565b61014a610145366004610d06565b610327565b005b61014a61015a366004610d2e565b610440565b61014a61016d366004610d2e565b610471565b61011f610180366004610cd4565b61048b565b610198610193366004610d67565b6104ea565b6040519081526020016100ee565b6100ff61056e565b61014a6101bc366004610d80565b61057d565b61014a6101cf366004610dcd565b61058c565b6100ff6101e2366004610cd4565b6105c4565b6100e26101f5366004610ea2565b6001600160a01b039182165f90815260056020908152604080832093909416825291909152205460ff1690565b5f6001600160e01b031982166380ac58cd60e01b148061025257506001600160e01b03198216635b5e139f60e01b145b8061026d57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60605f805461028190610ed3565b80601f01602080910402602001604051908101604052809291908181526020018280546102ad90610ed3565b80156102f85780601f106102cf576101008083540402835291602001916102f8565b820191905f5260205f20905b8154815290600101906020018083116102db57829003601f168201915b5050505050905090565b5f61030c82610634565b505f908152600460205260409020546001600160a01b031690565b5f6103318261048b565b9050806001600160a01b0316836001600160a01b0316036103a35760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103bf57506103bf81336101f5565b6104315760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000606482015260840161039a565b61043b8383610695565b505050565b61044a3382610702565b6104665760405162461bcd60e51b815260040161039a90610f0b565b61043b83838361077f565b61043b83838360405180602001604052805f81525061058c565b5f818152600260205260408120546001600160a01b03168061026d5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161039a565b5f6001600160a01b0382166105535760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b606482015260840161039a565b506001600160a01b03165f9081526003602052604090205490565b60606001805461028190610ed3565b6105883383836108e1565b5050565b6105963383610702565b6105b25760405162461bcd60e51b815260040161039a90610f0b565b6105be848484846109ae565b50505050565b60606105cf82610634565b5f6105e460408051602081019091525f815290565b90505f8151116106025760405180602001604052805f81525061062d565b8061060c846109e1565b60405160200161061d929190610f58565b6040516020818303038152906040525b9392505050565b5f818152600260205260409020546001600160a01b03166106925760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161039a565b50565b5f81815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906106c98261048b565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b5f8061070d8361048b565b9050806001600160a01b0316846001600160a01b0316148061075357506001600160a01b038082165f9081526005602090815260408083209388168352929052205460ff165b806107775750836001600160a01b031661076c84610302565b6001600160a01b0316145b949350505050565b826001600160a01b03166107928261048b565b6001600160a01b0316146107b85760405162461bcd60e51b815260040161039a90610f86565b6001600160a01b03821661081a5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161039a565b826001600160a01b031661082d8261048b565b6001600160a01b0316146108535760405162461bcd60e51b815260040161039a90610f86565b5f81815260046020908152604080832080546001600160a01b03199081169091556001600160a01b038781168086526003855283862080545f1901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b0316036109425760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161039a565b6001600160a01b038381165f81815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6109b984848461077f565b6109c584848484610a71565b6105be5760405162461bcd60e51b815260040161039a90610fcb565b60605f6109ed83610b6e565b60010190505f8167ffffffffffffffff811115610a0c57610a0c610db9565b6040519080825280601f01601f191660200182016040528015610a36576020820181803683370190505b5090508181016020015b5f19016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610a4057509392505050565b5f6001600160a01b0384163b15610b6357604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610ab490339089908890889060040161101d565b6020604051808303815f875af1925050508015610aee575060408051601f3d908101601f19168201909252610aeb91810190611059565b60015b610b49573d808015610b1b576040519150601f19603f3d011682016040523d82523d5f602084013e610b20565b606091505b5080515f03610b415760405162461bcd60e51b815260040161039a90610fcb565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610777565b506001949350505050565b5f8072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610bac5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610bd8576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610bf657662386f26fc10000830492506010015b6305f5e1008310610c0e576305f5e100830492506008015b6127108310610c2257612710830492506004015b60648310610c34576064830492506002015b600a831061026d5760010192915050565b6001600160e01b031981168114610692575f80fd5b5f60208284031215610c6a575f80fd5b813561062d81610c45565b5f5b83811015610c8f578181015183820152602001610c77565b50505f910152565b5f8151808452610cae816020860160208601610c75565b601f01601f19169290920160200192915050565b602081525f61062d6020830184610c97565b5f60208284031215610ce4575f80fd5b5035919050565b80356001600160a01b0381168114610d01575f80fd5b919050565b5f8060408385031215610d17575f80fd5b610d2083610ceb565b946020939093013593505050565b5f805f60608486031215610d40575f80fd5b610d4984610ceb565b9250610d5760208501610ceb565b9150604084013590509250925092565b5f60208284031215610d77575f80fd5b61062d82610ceb565b5f8060408385031215610d91575f80fd5b610d9a83610ceb565b915060208301358015158114610dae575f80fd5b809150509250929050565b634e487b7160e01b5f52604160045260245ffd5b5f805f8060808587031215610de0575f80fd5b610de985610ceb565b9350610df760208601610ceb565b925060408501359150606085013567ffffffffffffffff80821115610e1a575f80fd5b818701915087601f830112610e2d575f80fd5b813581811115610e3f57610e3f610db9565b604051601f8201601f19908116603f01168101908382118183101715610e6757610e67610db9565b816040528281528a6020848701011115610e7f575f80fd5b826020860160208301375f60208483010152809550505050505092959194509250565b5f8060408385031215610eb3575f80fd5b610ebc83610ceb565b9150610eca60208401610ceb565b90509250929050565b600181811c90821680610ee757607f821691505b602082108103610f0557634e487b7160e01b5f52602260045260245ffd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b5f8351610f69818460208801610c75565b835190830190610f7d818360208801610c75565b01949350505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f9061104f90830184610c97565b9695505050505050565b5f60208284031215611069575f80fd5b815161062d81610c4556fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "name_";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "symbol_";
            readonly type: "string";
        }];
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
    static createInterface(): ERC721Interface;
    static connect(address: string, runner?: ContractRunner | null): ERC721;
}
export {};
//# sourceMappingURL=ERC721__factory.d.ts.map