import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../../common";
import type { StablePriceOracle, StablePriceOracleInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/ethregistrar/StablePriceOracle.sol/StablePriceOracle";
declare type StablePriceOracleConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class StablePriceOracle__factory extends ContractFactory {
    constructor(...args: StablePriceOracleConstructorParams);
    getDeployTransaction(_usdOracle: AddressLike, _rentPrices: BigNumberish[], overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(_usdOracle: AddressLike, _rentPrices: BigNumberish[], overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<StablePriceOracle & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): StablePriceOracle__factory;
    static readonly bytecode = "0x610140604052348015610010575f80fd5b506040516109ac3803806109ac83398101604081905261002f91610102565b6001600160a01b03821661012052805181905f9061004f5761004f6101dc565b60200260200101516080818152505080600181518110610071576100716101dc565b602002602001015160a0818152505080600281518110610093576100936101dc565b602002602001015160c08181525050806003815181106100b5576100b56101dc565b602002602001015160e08181525050806004815181106100d7576100d76101dc565b6020026020010151610100818152505050506101f0565b634e487b7160e01b5f52604160045260245ffd5b5f8060408385031215610113575f80fd5b82516001600160a01b0381168114610129575f80fd5b602084810151919350906001600160401b0380821115610147575f80fd5b818601915086601f83011261015a575f80fd5b81518181111561016c5761016c6100ee565b8060051b604051601f19603f83011681018181108582111715610191576101916100ee565b6040529182528482019250838101850191898311156101ae575f80fd5b938501935b828510156101cc578451845293850193928501926101b3565b8096505050505050509250929050565b634e487b7160e01b5f52603260045260245ffd5b60805160a05160c05160e051610100516101205161074c6102605f395f8181610185015261055801525f818161012401526102a601525f81816101eb01526102df01525f818161014b015261031101525f81816101c4015261034301525f818160c1015261036d015261074c5ff3fe608060405234801561000f575f80fd5b5060043610610090575f3560e01c8063a200e15311610063578063a200e15314610146578063a34e35961461016d578063c8a4271f14610180578063cd5d2c74146101bf578063d820ed42146101e6575f80fd5b806301ffc9a7146100945780632c0fd74c146100bc57806350e9a715146100f157806359b6b86c1461011f575b5f80fd5b6100a76100a2366004610600565b61020d565b60405190151581526020015b60405180910390f35b6100e37f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020016100b3565b6101046100ff366004610627565b610243565b604080518251815260209283015192810192909252016100b3565b6100e37f000000000000000000000000000000000000000000000000000000000000000081565b6100e37f000000000000000000000000000000000000000000000000000000000000000081565b6100e361017b366004610627565b610404565b6101a77f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016100b3565b6100e37f000000000000000000000000000000000000000000000000000000000000000081565b6100e37f000000000000000000000000000000000000000000000000000000000000000081565b5f6001600160e01b031982166301ffc9a760e01b148061023d57506001600160e01b031982166350e9a71560e01b145b92915050565b604080518082019091525f80825260208201525f61029586868080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525061045392505050565b90505f600582106102d1576102ca847f00000000000000000000000000000000000000000000000000000000000000006106b3565b9050610394565b81600403610303576102ca847f00000000000000000000000000000000000000000000000000000000000000006106b3565b81600303610335576102ca847f00000000000000000000000000000000000000000000000000000000000000006106b3565b81600203610367576102ca847f00000000000000000000000000000000000000000000000000000000000000006106b3565b610391847f00000000000000000000000000000000000000000000000000000000000000006106b3565b90505b60405180604001604052806103a883610554565b81526020016103f76103f28a8a8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152508c92508b91506105f89050565b610554565b9052979650505050505050565b5f61044a6103f286868080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152508892508791506105f89050565b95945050505050565b80515f90819081905b8082101561054b575f858381518110610477576104776106ca565b01602001516001600160f81b0319169050600160ff1b8110156104a65761049f6001846106de565b9250610538565b600760fd1b6001600160f81b0319821610156104c75761049f6002846106de565b600f60fc1b6001600160f81b0319821610156104e85761049f6003846106de565b601f60fb1b6001600160f81b0319821610156105095761049f6004846106de565b603f60fa1b6001600160f81b03198216101561052a5761049f6005846106de565b6105356006846106de565b92505b5082610543816106f1565b93505061045c565b50909392505050565b5f807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166350d25bcd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105b2573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906105d69190610709565b9050806105e7846305f5e1006106b3565b6105f19190610720565b9392505050565b5f9392505050565b5f60208284031215610610575f80fd5b81356001600160e01b0319811681146105f1575f80fd5b5f805f806060858703121561063a575f80fd5b843567ffffffffffffffff80821115610651575f80fd5b818701915087601f830112610664575f80fd5b813581811115610672575f80fd5b886020828501011115610683575f80fd5b6020928301999098509187013596604001359550909350505050565b634e487b7160e01b5f52601160045260245ffd5b808202811582820484141761023d5761023d61069f565b634e487b7160e01b5f52603260045260245ffd5b8082018082111561023d5761023d61069f565b5f600182016107025761070261069f565b5060010190565b5f60208284031215610719575f80fd5b5051919050565b5f8261073a57634e487b7160e01b5f52601260045260245ffd5b50049056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract AggregatorInterface";
            readonly name: "_usdOracle";
            readonly type: "address";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "_rentPrices";
            readonly type: "uint256[]";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256[]";
            readonly name: "prices";
            readonly type: "uint256[]";
        }];
        readonly name: "RentPriceChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "expires";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "duration";
            readonly type: "uint256";
        }];
        readonly name: "premium";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "expires";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "duration";
            readonly type: "uint256";
        }];
        readonly name: "price";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "base";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "premium";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IPriceOracle.Price";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "price1Letter";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "price2Letter";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "price3Letter";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "price4Letter";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "price5Letter";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceID";
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
        readonly name: "usdOracle";
        readonly outputs: readonly [{
            readonly internalType: "contract AggregatorInterface";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): StablePriceOracleInterface;
    static connect(address: string, runner?: ContractRunner | null): StablePriceOracle;
}
export {};
//# sourceMappingURL=StablePriceOracle__factory.d.ts.map