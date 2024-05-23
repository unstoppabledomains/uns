import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { ZilliqaRecover, ZilliqaRecoverInterface } from "../../../contracts/custody/ZilliqaRecover";
declare type ZilliqaRecoverConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ZilliqaRecover__factory extends ContractFactory {
    constructor(...args: ZilliqaRecoverConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ZilliqaRecover & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ZilliqaRecover__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b5061001861001d565b6100da565b5f54610100900460ff16156100885760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b5f5460ff90811610156100d8575f805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b611b9d806100e75f395ff3fe608060405234801561000f575f80fd5b5060043610610106575f3560e01c806371017a541161009e5780639e32d3641161006e5780639e32d3641461025a578063a424740014610281578063dd6b9e2214610294578063e1c4b65a146102a7578063e35a14e5146102ba575f80fd5b806371017a541461020e5780637b103999146102215780638f0dbd25146102345780639810b69514610247575f80fd5b8063485cc955116100d9578063485cc95514610191578063572b6c05146101a457806358884432146101d05780636ccbae5f146101fb575f80fd5b8063150b7a021461010a5780631694116d1461013b5780631bf7e13e146101505780631c351a9d14610170575b5f80fd5b61011d610118366004611434565b6102e2565b6040516001600160e01b031990911681526020015b60405180910390f35b61014e6101493660046114e3565b610372565b005b61016361015e366004611549565b61040d565b6040516101329190611601565b61018361017e366004611613565b6104d6565b604051908152602001610132565b61014e61019f366004611666565b6105c3565b6101c06101b236600461169d565b6001600160a01b0316301490565b6040519015158152602001610132565b6067546101e3906001600160a01b031681565b6040516001600160a01b039091168152602001610132565b6101836102093660046116b8565b6106f8565b6101e361021c3660046116cf565b610751565b6066546101e3906001600160a01b031681565b61014e6102423660046116ef565b610791565b6101e36102553660046116cf565b610806565b6101837fd81bbfcee722494b885e891546eeac23d0eedcd44038d7a2f6ef9ec2f9e0d23981565b6101c061028f366004611549565b61085f565b6101c06102a236600461172d565b6108a8565b61014e6102b5366004611771565b61091d565b6101e36102c83660046116b8565b5f908152606560205260409020546001600160a01b031690565b6066545f906001600160a01b03166102f8610a43565b6001600160a01b031614158061032257505f848152606560205260409020546001600160a01b0316155b156103605783610330610a43565b60405163634afa0d60e01b815260048101929092526001600160a01b031660248201526044015b60405180910390fd5b50630a85bd0160e11b95945050505050565b828261037e8282610751565b6001600160a01b031661038f610a43565b6001600160a01b0316146103c057604051632cd9b44d60e11b81526004810183905260248101829052604401610357565b5f6103cb8686610806565b90505f5b87811015610402576103fa8989838181106103ec576103ec6117b0565b905060200201358387610a51565b6001016103cf565b505050505050505050565b60605f5a905061041e85858561085f565b61043b57604051638baa579f60e01b815260040160405180910390fd5b6104cb61044b602087018761169d565b3060408801358461045f60608b018b6117c4565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b90819084018382808284375f92019190915250610b8492505050565b9150505b9392505050565b6067545f906001600160a01b031663aa271e1a6104f1610a43565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015610533573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906105579190611807565b1580610572575030610567610a43565b6001600160a01b0316145b156105a45761057f610a43565b60405163e2c8c9d560e01b81526001600160a01b039091166004820152602401610357565b5f6105b0858585610c60565b90506105bb81610e73565b949350505050565b5f54610100900460ff16158080156105e157505f54600160ff909116105b806105fa5750303b1580156105fa57505f5460ff166001145b61065d5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610357565b5f805460ff19166001179055801561067e575f805461ff0019166101001790555b606680546001600160a01b038086166001600160a01b031992831617909255606780549285169290911691909117905580156106f3575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290525f9061074a906060016040516020818303038152906040528051906020012090565b5492915050565b5f80838360405160200161076f929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209150505b92915050565b828261079d8282610751565b6001600160a01b03166107ae610a43565b6001600160a01b0316146107df57604051632cd9b44d60e11b81526004810183905260248101829052604401610357565b856107e981610e73565b6107fd876107f78889610806565b86610a51565b50505050505050565b5f8060026108148585610e8f565b6040516108219190611826565b602060405180830381855afa15801561083c573d5f803e3d5ffd5b5050506040513d601f19601f820116820180604052508101906105bb9190611841565b5f6105bb61086c856118c6565b3085858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250610f1492505050565b5f805b8281101561091257846001600160a01b03166108f38585848181106108d2576108d26117b0565b905060200201355f908152606560205260409020546001600160a01b031690565b6001600160a01b03161461090a575f9150506104cf565b6001016108ab565b506001949350505050565b6067546001600160a01b031663aa271e1a610936610a43565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015610978573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061099c9190611807565b15806109b75750306109ac610a43565b6001600160a01b0316145b156109c45761057f610a43565b5f5b818110156106f357610a3a8383838181106109e3576109e36117b0565b90506020028101906109f59190611983565b610a039060208101906117c4565b858585818110610a1557610a156117b0565b9050602002810190610a279190611983565b610a3590602081019061169d565b610c60565b506001016109c6565b5f610a4c611059565b905090565b5f838152606560205260409020546001600160a01b03838116911614610ab4575f83815260656020526040908190205490516326995d8360e11b8152600481018590526001600160a01b0391821660248201529083166044820152606401610357565b5f838152606560205260409081902080546001600160a01b03191690556066549051632142170760e11b81523060048201526001600160a01b03838116602483015260448201869052909116906342842e0e906064015f604051808303815f87803b158015610b21575f80fd5b505af1158015610b33573d5f803e3d5ffd5b50505050806001600160a01b0316610b49610a43565b6001600160a01b0316847f9a471856befea1cabcd7fc8a1c4d70ea07b8ed2ee205cc361f932433542ef3fe60405160405180910390a4505050565b6060610b8f85611076565b5f80876001600160a01b031686610ba88b8a89896110db565b604051610bb59190611826565b5f604051808303815f8787f1925050503d805f8114610bef576040519150601f19603f3d011682016040523d82523d5f602084013e610bf4565b606091505b509092509050610c05603f876119bf565b5a11610c1357610c136119d2565b610c5382826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c454400000000000081525061110b565b9998505050505050505050565b5f60605f7fd81bbfcee722494b885e891546eeac23d0eedcd44038d7a2f6ef9ec2f9e0d2398686604051602001610c989291906119e6565b60405160208183030381529060405280519060200120604051602001610cc8929190918252602082015260400190565b60408051808303601f19018152828252805160209091012060028084526060840190925292505f9190816020015b6060815260200190600190039081610cf657905050905086868080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920182905250855186945090925015159050610d5657610d566117b0565b6020026020010181905250604051806040016040528060038152602001621e9a5b60ea1b81525081600181518110610d9057610d906117b0565b6020908102919091018101919091525f8381526065909152604080822080546001600160a01b0319166001600160a01b03898116919091179091556067549151635cd7e3b360e01b8152911691635cd7e3b391610df891309186918991829190600401611a4d565b5f604051808303815f87803b158015610e0f575f80fd5b505af1158015610e21573d5f803e3d5ffd5b50505050846001600160a01b0316827f08717469d38a4b02325ea6637978c7952f94d3d8fc7848994f618ddbf4d637f18989604051610e61929190611aab565b60405180910390a35095945050505050565b303303610e8657610e8381611144565b50565b610e8381611076565b60605f82610e9f60016020611ad9565b60ff1660208110610eb257610eb26117b0565b1a9050610ec0600282611af2565b60ff1615610ecf576003610ed2565b60025b84604051602001610efc92919060f89290921b6001600160f81b0319168252600182015260210190565b60405160208183030381529060405291505092915050565b6040838101519051636ccbae5f60e01b815260048101919091525f9081903090636ccbae5f90602401602060405180830381865afa158015610f58573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610f7c9190611841565b90505f611029866060015180519060200120868860200151604051602001610fc99392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561104f5750855161104f906001600160a01b0316828661116e565b9695505050505050565b5f30330361106e575060331936013560601c90565b503390565b90565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290525f906060016040516020818303038152906040528051906020012090506110ca8190565b546110d6906001611b13565b905550565b60608285856040516020016110f293929190611b26565b6040516020818303038152906040529050949350505050565b6060831561111a5750816104cf565b82511561112a5782518084602001fd5b8160405162461bcd60e51b81526004016103579190611601565b61114c6112a9565b8114610e8357604051635637b6af60e11b815260048101829052602401610357565b5f805f61117b85856112bb565b90925090505f81600481111561119357611193611b64565b1480156111b15750856001600160a01b0316826001600160a01b0316145b156111c1576001925050506104cf565b5f80876001600160a01b0316631626ba7e60e01b88886040516024016111e8929190611b78565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516112269190611826565b5f60405180830381855afa9150503d805f811461125e576040519150601f19603f3d011682016040523d82523d5f602084013e611263565b606091505b5091509150818015611276575080516020145b801561129d57508051630b135d3f60e11b9061129b9083016020908101908401611841565b145b98975050505050505050565b5f3033036110735750601f1936013590565b5f8082516041036112ef576020830151604084015160608501515f1a6112e3878285856112fd565b945094505050506112f6565b505f905060025b9250929050565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561133257505f905060036113d9565b8460ff16601b1415801561134a57508460ff16601c14155b1561135a57505f905060046113d9565b604080515f8082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156113ab573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b0381166113d3575f600192509250506113d9565b91505f90505b94509492505050565b6001600160a01b0381168114610e83575f80fd5b5f8083601f840112611406575f80fd5b50813567ffffffffffffffff81111561141d575f80fd5b6020830191508360208285010111156112f6575f80fd5b5f805f805f60808688031215611448575f80fd5b8535611453816113e2565b94506020860135611463816113e2565b935060408601359250606086013567ffffffffffffffff811115611485575f80fd5b611491888289016113f6565b969995985093965092949392505050565b5f8083601f8401126114b2575f80fd5b50813567ffffffffffffffff8111156114c9575f80fd5b6020830191508360208260051b85010111156112f6575f80fd5b5f805f805f608086880312156114f7575f80fd5b853567ffffffffffffffff81111561150d575f80fd5b611519888289016114a2565b9096509450506020860135925060408601359150606086013561153b816113e2565b809150509295509295909350565b5f805f6040848603121561155b575f80fd5b833567ffffffffffffffff80821115611572575f80fd5b9085019060808288031215611585575f80fd5b9093506020850135908082111561159a575f80fd5b506115a7868287016113f6565b9497909650939450505050565b5f5b838110156115ce5781810151838201526020016115b6565b50505f910152565b5f81518084526115ed8160208601602086016115b4565b601f01601f19169290920160200192915050565b602081525f6104cf60208301846115d6565b5f805f60408486031215611625575f80fd5b833567ffffffffffffffff81111561163b575f80fd5b611647868287016113f6565b909450925050602084013561165b816113e2565b809150509250925092565b5f8060408385031215611677575f80fd5b8235611682816113e2565b91506020830135611692816113e2565b809150509250929050565b5f602082840312156116ad575f80fd5b81356104cf816113e2565b5f602082840312156116c8575f80fd5b5035919050565b5f80604083850312156116e0575f80fd5b50508035926020909101359150565b5f805f8060808587031215611702575f80fd5b8435935060208501359250604085013591506060850135611722816113e2565b939692955090935050565b5f805f6040848603121561173f575f80fd5b833561174a816113e2565b9250602084013567ffffffffffffffff811115611765575f80fd5b6115a7868287016114a2565b5f8060208385031215611782575f80fd5b823567ffffffffffffffff811115611798575f80fd5b6117a4858286016114a2565b90969095509350505050565b634e487b7160e01b5f52603260045260245ffd5b5f808335601e198436030181126117d9575f80fd5b83018035915067ffffffffffffffff8211156117f3575f80fd5b6020019150368190038213156112f6575f80fd5b5f60208284031215611817575f80fd5b815180151581146104cf575f80fd5b5f82516118378184602087016115b4565b9190910192915050565b5f60208284031215611851575f80fd5b5051919050565b634e487b7160e01b5f52604160045260245ffd5b6040516080810167ffffffffffffffff8111828210171561188f5761188f611858565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156118be576118be611858565b604052919050565b5f608082360312156118d6575f80fd5b6118de61186c565b82356118e9816113e2565b81526020838101358183015260408085013590830152606084013567ffffffffffffffff80821115611919575f80fd5b9085019036601f83011261192b575f80fd5b81358181111561193d5761193d611858565b61194f601f8201601f19168501611895565b91508082523684828501011115611964575f80fd5b80848401858401375f9082019093019290925250606082015292915050565b5f8235603e19833603018112611837575f80fd5b634e487b7160e01b5f52601260045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b5f826119cd576119cd611997565b500490565b634e487b7160e01b5f52600160045260245ffd5b818382375f9101908152919050565b5f8282518085526020808601955060208260051b840101602086015f5b84811015611a4057601f19868403018952611a2e8383516115d6565b98840198925090830190600101611a12565b5090979650505050505050565b6001600160a01b038616815260a0602082018190525f90611a70908301876119f5565b8281036040840152611a8281876119f5565b90508281036060840152611a9681866119f5565b91505082151560808301529695505050505050565b60208152816020820152818360408301375f818301604090810191909152601f909201601f19160101919050565b60ff828116828216039081111561078b5761078b6119ab565b5f60ff831680611b0457611b04611997565b8060ff84160691505092915050565b8082018082111561078b5761078b6119ab565b5f8451611b378184602089016115b4565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b634e487b7160e01b5f52602160045260245ffd5b828152604060208201525f6105bb60408301846115d656fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "InvalidForwardedToken";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidSignature";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "publicKeyX";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "publicKeyY";
            readonly type: "bytes32";
        }];
        readonly name: "PublicKeyUnmatchSenderAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "SenderNotMinter";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "znsOwner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "receivedOwner";
            readonly type: "address";
        }];
        readonly name: "TokenOwnedByOtherZilAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "contractAddress";
            readonly type: "address";
        }];
        readonly name: "UnknownTokenReceived";
        readonly type: "error";
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
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "oldAddress";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newAddress";
            readonly type: "address";
        }];
        readonly name: "ZnsTokenClaimed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "zilAddress";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "label";
            readonly type: "string";
        }];
        readonly name: "ZnsTokenMinted";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "ZIL_NODE";
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
        }, {
            readonly internalType: "bytes32";
            readonly name: "publicKeyX";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "publicKeyY";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "newOwnerAddress";
            readonly type: "address";
        }];
        readonly name: "claim";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "tokenIds";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "bytes32";
            readonly name: "publicKeyX";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "publicKeyY";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "newOwnerAddress";
            readonly type: "address";
        }];
        readonly name: "claimAll";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "publicKeyX";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "publicKeyY";
            readonly type: "bytes32";
        }];
        readonly name: "ethAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "from";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "tokenId";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly internalType: "struct IForwarder.ForwardRequest";
            readonly name: "req";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "execute";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IUNSRegistry";
            readonly name: "registry_";
            readonly type: "address";
        }, {
            readonly internalType: "contract IMintingManager";
            readonly name: "mintingManager_";
            readonly type: "address";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_zilAddress";
            readonly type: "address";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "tokenIds";
            readonly type: "uint256[]";
        }];
        readonly name: "isOwnedBy";
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
            readonly name: "forwarder";
            readonly type: "address";
        }];
        readonly name: "isTrustedForwarder";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "label";
            readonly type: "string";
        }, {
            readonly internalType: "address";
            readonly name: "zilOwner";
            readonly type: "address";
        }];
        readonly name: "mint";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "zilOwner";
                readonly type: "address";
            }, {
                readonly internalType: "string";
                readonly name: "label";
                readonly type: "string";
            }];
            readonly internalType: "struct ZilliqaRecover.MintingToken[]";
            readonly name: "tokens";
            readonly type: "tuple[]";
        }];
        readonly name: "mintAll";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "mintingManager";
        readonly outputs: readonly [{
            readonly internalType: "contract IMintingManager";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "nonceOf";
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
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "onERC721Received";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "registry";
        readonly outputs: readonly [{
            readonly internalType: "contract IUNSRegistry";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "from";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "tokenId";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly internalType: "struct IForwarder.ForwardRequest";
            readonly name: "req";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "verify";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "publicKeyX";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "publicKeyY";
            readonly type: "bytes32";
        }];
        readonly name: "zilAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "znsOwnerOf";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): ZilliqaRecoverInterface;
    static connect(address: string, runner?: ContractRunner | null): ZilliqaRecover;
}
export {};
//# sourceMappingURL=ZilliqaRecover__factory.d.ts.map