import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { ERC1155Upgradeable, ERC1155UpgradeableInterface } from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable";
declare type ERC1155UpgradeableConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC1155Upgradeable__factory extends ContractFactory {
    constructor(...args: ERC1155UpgradeableConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ERC1155Upgradeable & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ERC1155Upgradeable__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506112db8061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610084575f3560e01c80634e1273f4116100585780634e1273f414610106578063a22cb46514610126578063e985e9c514610139578063f242432a14610174575f80fd5b8062fdd58e1461008857806301ffc9a7146100ae5780630e89341c146100d15780632eb2c2d6146100f1575b5f80fd5b61009b610096366004610b1f565b610187565b6040519081526020015b60405180910390f35b6100c16100bc366004610b5f565b610220565b60405190151581526020016100a5565b6100e46100df366004610b81565b61026f565b6040516100a59190610bdb565b6101046100ff366004610d34565b610301565b005b610119610114366004610dd7565b61034d565b6040516100a59190610ed6565b610104610134366004610ee8565b61046d565b6100c1610147366004610f21565b6001600160a01b039182165f90815260666020908152604080832093909416825291909152205460ff1690565b610104610182366004610f52565b61047c565b5f6001600160a01b0383166101f65760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201526930b634b21037bbb732b960b11b60648201526084015b60405180910390fd5b505f8181526065602090815260408083206001600160a01b03861684529091529020545b92915050565b5f6001600160e01b03198216636cdb3d1360e11b148061025057506001600160e01b031982166303a24d0760e21b145b8061021a57506301ffc9a760e01b6001600160e01b031983161461021a565b60606067805461027e90610fb2565b80601f01602080910402602001604051908101604052809291908181526020018280546102aa90610fb2565b80156102f55780601f106102cc576101008083540402835291602001916102f5565b820191905f5260205f20905b8154815290600101906020018083116102d857829003601f168201915b50505050509050919050565b6001600160a01b03851633148061031d575061031d8533610147565b6103395760405162461bcd60e51b81526004016101ed90610fea565b61034685858585856104c1565b5050505050565b606081518351146103b25760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b60648201526084016101ed565b5f835167ffffffffffffffff8111156103cd576103cd610bed565b6040519080825280602002602001820160405280156103f6578160200160208202803683370190505b5090505f5b84518110156104655761044085828151811061041957610419611039565b602002602001015185838151811061043357610433611039565b6020026020010151610187565b82828151811061045257610452611039565b60209081029190910101526001016103fb565b509392505050565b610478338383610695565b5050565b6001600160a01b03851633148061049857506104988533610147565b6104b45760405162461bcd60e51b81526004016101ed90610fea565b6103468585858585610774565b81518351146105235760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b60648201526084016101ed565b6001600160a01b0384166105495760405162461bcd60e51b81526004016101ed9061104d565b335f5b8451811015610627575f85828151811061056857610568611039565b602002602001015190505f85838151811061058557610585611039565b6020908102919091018101515f8481526065835260408082206001600160a01b038e1683529093529190912054909150818110156105d55760405162461bcd60e51b81526004016101ed90611092565b5f8381526065602090815260408083206001600160a01b038e8116855292528083208585039055908b168252812080548492906106139084906110dc565b90915550506001909301925061054c915050565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb87876040516106779291906110fb565b60405180910390a461068d81878787878761089e565b505050505050565b816001600160a01b0316836001600160a01b0316036107085760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b60648201526084016101ed565b6001600160a01b038381165f81815260666020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b03841661079a5760405162461bcd60e51b81526004016101ed9061104d565b335f6107a585610a01565b90505f6107b185610a01565b90505f8681526065602090815260408083206001600160a01b038c168452909152902054858110156107f55760405162461bcd60e51b81526004016101ed90611092565b5f8781526065602090815260408083206001600160a01b038d8116855292528083208985039055908a168252812080548892906108339084906110dc565b909155505060408051888152602081018890526001600160a01b03808b16928c821692918816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4610893848a8a8a8a8a610a4a565b505050505050505050565b6001600160a01b0384163b1561068d5760405163bc197c8160e01b81526001600160a01b0385169063bc197c81906108e29089908990889088908890600401611128565b6020604051808303815f875af192505050801561091c575060408051601f3d908101601f1916820190925261091991810190611185565b60015b6109c8576109286111a0565b806308c379a003610961575061093c6111b9565b806109475750610963565b8060405162461bcd60e51b81526004016101ed9190610bdb565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b60648201526084016101ed565b6001600160e01b0319811663bc197c8160e01b146109f85760405162461bcd60e51b81526004016101ed90611242565b50505050505050565b6040805160018082528183019092526060915f91906020808301908036833701905050905082815f81518110610a3957610a39611039565b602090810291909101015292915050565b6001600160a01b0384163b1561068d5760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190610a8e908990899088908890889060040161128a565b6020604051808303815f875af1925050508015610ac8575060408051601f3d908101601f19168201909252610ac591810190611185565b60015b610ad4576109286111a0565b6001600160e01b0319811663f23a6e6160e01b146109f85760405162461bcd60e51b81526004016101ed90611242565b80356001600160a01b0381168114610b1a575f80fd5b919050565b5f8060408385031215610b30575f80fd5b610b3983610b04565b946020939093013593505050565b6001600160e01b031981168114610b5c575f80fd5b50565b5f60208284031215610b6f575f80fd5b8135610b7a81610b47565b9392505050565b5f60208284031215610b91575f80fd5b5035919050565b5f81518084525f5b81811015610bbc57602081850181015186830182015201610ba0565b505f602082860101526020601f19601f83011685010191505092915050565b602081525f610b7a6020830184610b98565b634e487b7160e01b5f52604160045260245ffd5b601f8201601f1916810167ffffffffffffffff81118282101715610c2757610c27610bed565b6040525050565b5f67ffffffffffffffff821115610c4757610c47610bed565b5060051b60200190565b5f82601f830112610c60575f80fd5b81356020610c6d82610c2e565b604051610c7a8282610c01565b80915083815260208101915060208460051b870101935086841115610c9d575f80fd5b602086015b84811015610cb95780358352918301918301610ca2565b509695505050505050565b5f82601f830112610cd3575f80fd5b813567ffffffffffffffff811115610ced57610ced610bed565b604051610d04601f8301601f191660200182610c01565b818152846020838601011115610d18575f80fd5b816020850160208301375f918101602001919091529392505050565b5f805f805f60a08688031215610d48575f80fd5b610d5186610b04565b9450610d5f60208701610b04565b9350604086013567ffffffffffffffff80821115610d7b575f80fd5b610d8789838a01610c51565b94506060880135915080821115610d9c575f80fd5b610da889838a01610c51565b93506080880135915080821115610dbd575f80fd5b50610dca88828901610cc4565b9150509295509295909350565b5f8060408385031215610de8575f80fd5b823567ffffffffffffffff80821115610dff575f80fd5b818501915085601f830112610e12575f80fd5b81356020610e1f82610c2e565b604051610e2c8282610c01565b83815260059390931b8501820192828101915089841115610e4b575f80fd5b948201945b83861015610e7057610e6186610b04565b82529482019490820190610e50565b96505086013592505080821115610e85575f80fd5b50610e9285828601610c51565b9150509250929050565b5f815180845260208085019450602084015f5b83811015610ecb57815187529582019590820190600101610eaf565b509495945050505050565b602081525f610b7a6020830184610e9c565b5f8060408385031215610ef9575f80fd5b610f0283610b04565b915060208301358015158114610f16575f80fd5b809150509250929050565b5f8060408385031215610f32575f80fd5b610f3b83610b04565b9150610f4960208401610b04565b90509250929050565b5f805f805f60a08688031215610f66575f80fd5b610f6f86610b04565b9450610f7d60208701610b04565b93506040860135925060608601359150608086013567ffffffffffffffff811115610fa6575f80fd5b610dca88828901610cc4565b600181811c90821680610fc657607f821691505b602082108103610fe457634e487b7160e01b5f52602260045260245ffd5b50919050565b6020808252602f908201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60408201526e195c881b9bdc88185c1c1c9bdd9959608a1b606082015260800190565b634e487b7160e01b5f52603260045260245ffd5b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b8082018082111561021a57634e487b7160e01b5f52601160045260245ffd5b604081525f61110d6040830185610e9c565b828103602084015261111f8185610e9c565b95945050505050565b6001600160a01b0386811682528516602082015260a0604082018190525f9061115390830186610e9c565b82810360608401526111658186610e9c565b905082810360808401526111798185610b98565b98975050505050505050565b5f60208284031215611195575f80fd5b8151610b7a81610b47565b5f60033d11156111b65760045f803e505f5160e01c5b90565b5f60443d10156111c65790565b6040516003193d81016004833e81513d67ffffffffffffffff81602484011181841117156111f657505050505090565b828501915081518181111561120e5750505050505090565b843d87010160208285010111156112285750505050505090565b61123760208286010187610c01565b509095945050505050565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a0608082018190525f906112c390830184610b98565b97965050505050505056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
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
            readonly name: "operator";
            readonly type: "address";
        }, {
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
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256[]";
            readonly name: "values";
            readonly type: "uint256[]";
        }];
        readonly name: "TransferBatch";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
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
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "TransferSingle";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "value";
            readonly type: "string";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }];
        readonly name: "URI";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
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
            readonly internalType: "address[]";
            readonly name: "accounts";
            readonly type: "address[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }];
        readonly name: "balanceOfBatch";
        readonly outputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "";
            readonly type: "uint256[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
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
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "amounts";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "safeBatchTransferFrom";
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
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
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
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "uri";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): ERC1155UpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC1155Upgradeable;
}
export {};
//# sourceMappingURL=ERC1155Upgradeable__factory.d.ts.map