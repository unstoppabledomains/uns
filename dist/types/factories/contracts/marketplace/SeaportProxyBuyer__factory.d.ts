import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { SeaportProxyBuyer, SeaportProxyBuyerInterface } from "../../../contracts/marketplace/SeaportProxyBuyer";
declare type SeaportProxyBuyerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SeaportProxyBuyer__factory extends ContractFactory {
    constructor(...args: SeaportProxyBuyerConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<SeaportProxyBuyer & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): SeaportProxyBuyer__factory;
    static readonly bytecode = "0x60806040523480156200001157600080fd5b506200001c62000022565b620000e4565b600054610100900460ff16156200008f5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161015620000e2576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b6125e880620000f46000396000f3fe6080604052600436106101d85760003560e01c806371e2a65711610102578063a3f4df7e11610095578063d539139311610064578063d53913931461054c578063d547741f1461056e578063f2fde38b1461058e578063ffa1ad74146105ae57600080fd5b8063a3f4df7e146104ad578063a4247400146104ec578063aa271e1a1461050c578063b3a34c4c1461052c57600080fd5b806391d14854116100d157806391d1485414610443578063983b2d56146104635780639865027514610483578063a217fddf1461049857600080fd5b806371e2a657146103d357806381c81d35146103f35780638456cb59146104065780638da5cb5b1461041b57600080fd5b80633f4ba83a1161017a5780635fc1964f116101495780635fc1964f1461036b578063634486da1461038b5780636ccbae5f1461039e578063715018a6146103be57600080fd5b80633f4ba83a146102f4578063485cc95514610309578063572b6c05146103295780635c975abb1461035257600080fd5b80632f2ff15d116101b65780632f2ff15d1461027d5780633092afd51461029f57806336568abe146102bf5780633ccfd60b146102df57600080fd5b806301ffc9a7146101dd5780631bf7e13e14610212578063248a9ca31461023f575b600080fd5b3480156101e957600080fd5b506101fd6101f8366004611b67565b6105df565b60405190151581526020015b60405180910390f35b34801561021e57600080fd5b5061023261022d366004611b91565b610616565b6040516102099190611c80565b34801561024b57600080fd5b5061026f61025a366004611c93565b600090815260fb602052604090206001015490565b604051908152602001610209565b34801561028957600080fd5b5061029d610298366004611cd1565b6106e2565b005b3480156102ab57600080fd5b5061029d6102ba366004611d01565b61070c565b3480156102cb57600080fd5b5061029d6102da366004611cd1565b610720565b3480156102eb57600080fd5b5061029d6107b3565b34801561030057600080fd5b5061029d6108c3565b34801561031557600080fd5b5061029d610324366004611d1e565b6108dd565b34801561033557600080fd5b506101fd610344366004611d01565b6001600160a01b0316301490565b34801561035e57600080fd5b5061012d5460ff166101fd565b34801561037757600080fd5b5061029d610386366004611dbc565b610ab4565b61029d610399366004611d01565b610afc565b3480156103aa57600080fd5b5061026f6103b9366004611c93565b610bbf565b3480156103ca57600080fd5b5061029d610c19565b3480156103df57600080fd5b5061029d6103ee366004611dbc565b610c2b565b61029d610401366004611d01565b610c73565b34801561041257600080fd5b5061029d610cf0565b34801561042757600080fd5b506097546040516001600160a01b039091168152602001610209565b34801561044f57600080fd5b506101fd61045e366004611cd1565b610d08565b34801561046f57600080fd5b5061029d61047e366004611d01565b610d33565b34801561048f57600080fd5b5061029d610d44565b3480156104a457600080fd5b5061026f600081565b3480156104b957600080fd5b506102326040518060400160405280601381526020017229b2b0b837b93a10283937bc3c90213abcb2b960691b81525081565b3480156104f857600080fd5b506101fd610507366004611b91565b610d5e565b34801561051857600080fd5b506101fd610527366004611d01565b610db1565b34801561053857600080fd5b506101fd610547366004611e62565b610dcb565b34801561055857600080fd5b5061026f6000805160206125bc83398151915281565b34801561057a57600080fd5b5061029d610589366004611cd1565b610ed5565b34801561059a57600080fd5b5061029d6105a9366004611d01565b610efa565b3480156105ba57600080fd5b5061023260405180604001604052806005815260200164302e302e3160d81b81525081565b60006001600160e01b03198216637965db0b60e01b148061061057506301ffc9a760e01b6001600160e01b03198316145b92915050565b606060005a9050610628858585610d5e565b61064557604051638baa579f60e01b815260040160405180910390fd5b6106d76106556020870187611d01565b3060408801358461066960608b018b611eac565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b9081908401838280828437600092019190915250610f1692505050565b9150505b9392505050565b600082815260fb60205260409020600101546106fd81610ff7565b6107078383611008565b505050565b61071461108f565b61071d81611108565b50565b610728611120565b6001600160a01b0316816001600160a01b0316146107a55760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6107af828261112f565b5050565b6107bb61108f565b6107c36111b4565b610160546001600160a01b031663a9059cbb6107e76097546001600160a01b031690565b610160546040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa158015610830573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108549190611ef3565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af115801561089f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061071d9190611f0c565b6108cb61108f565b6108d36111fb565b6108db611245565b565b600054610100900460ff16158080156108fd5750600054600160ff909116105b806109175750303b158015610917575060005460ff166001145b61097a5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161079c565b6000805460ff19166001179055801561099d576000805461ff0019166101001790555b61015f80546001600160a01b03199081166001600160a01b03868116918217909355610160805490921692851692831790915560405163095ea7b360e01b81526004810191909152600019602482015263095ea7b3906044016020604051808303816000875af1158015610a15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a399190611f0c565b50610a4261129e565b610a4a6112cc565b610a526112cc565b610a5a6112f3565b610a6261132a565b610a6a611363565b8015610707576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b610abc61108f565b60005b81518110156107af57610aea828281518110610add57610add611f2e565b6020026020010151611108565b80610af481611f5a565b915050610abf565b610b07610527611120565b610b235760405162461bcd60e51b815260040161079c90611f73565b6001600160a01b038116610b795760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161079c565b610b8281611397565b610b8a610d44565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156107af573d6000803e3d6000fd5b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a838156020820152908101829052600090610c12906060016040516020818303038152906040528051906020012090565b5492915050565b610c2161108f565b6108db60006113af565b610c3361108f565b60005b81518110156107af57610c61828281518110610c5457610c54611f2e565b6020026020010151611397565b80610c6b81611f5a565b915050610c36565b610c7e610527611120565b610c9a5760405162461bcd60e51b815260040161079c90611f73565b6001600160a01b038116610b825760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161079c565b610cf861108f565b610d006111b4565b6108db611401565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610d3b61108f565b61071d81611397565b6108db6000805160206125bc8339815191526102da611120565b6000610da9610d6c85611fa8565b3085858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061144092505050565b949350505050565b60006106106000805160206125bc83398151915283610d08565b6000610dd8610527611120565b610df45760405162461bcd60e51b815260040161079c90611f73565b600260335403610e465760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161079c565b6002603355610e536111b4565b61015f54604051632ce8d31360e21b81526001600160a01b039091169063b3a34c4c90610e8690869086906004016122ca565b6020604051808303816000875af1158015610ea5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ec99190611f0c565b60016033559392505050565b600082815260fb6020526040902060010154610ef081610ff7565b610707838361112f565b610f0261108f565b610f0b81611589565b61071d6000826115ff565b6060610f2185611609565b600080876001600160a01b031686610f3b8b8a898961166f565b604051610f48919061240e565b60006040518083038160008787f1925050503d8060008114610f86576040519150601f19603f3d011682016040523d82523d6000602084013e610f8b565b606091505b509092509050610f9c603f8761242a565b5a11610faa57610faa61244c565b610fea82826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c454400000000000081525061169f565b9998505050505050505050565b61071d81611003611120565b6116d8565b6110128282610d08565b6107af57600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff1916600117905561104b611120565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611097611120565b6001600160a01b03166110b26097546001600160a01b031690565b6001600160a01b0316146108db5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161079c565b61071d6000805160206125bc83398151915282610ed5565b600061112a61173c565b905090565b6111398282610d08565b156107af57600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff19169055611170611120565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b61012d5460ff16156108db5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640161079c565b61012d5460ff166108db5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015260640161079c565b61124d6111fb565b61012d805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611281611120565b6040516001600160a01b03909116815260200160405180910390a1565b600054610100900460ff166112c55760405162461bcd60e51b815260040161079c90612462565b6001603355565b600054610100900460ff166108db5760405162461bcd60e51b815260040161079c90612462565b600054610100900460ff1661131a5760405162461bcd60e51b815260040161079c90612462565b6108db611325611120565b6113af565b600054610100900460ff166113515760405162461bcd60e51b815260040161079c90612462565b6108db600061135e611120565b6115ff565b600054610100900460ff1661138a5760405162461bcd60e51b815260040161079c90612462565b61012d805460ff19169055565b61071d6000805160206125bc833981519152826115ff565b609780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6114096111b4565b61012d805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611281611120565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f90602401602060405180830381865afa158015611487573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114ab9190611ef3565b905060006115598660600151805190602001208688602001516040516020016114f99392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561157f5750855161157f906001600160a01b03168286611757565b9695505050505050565b61159161108f565b6001600160a01b0381166115f65760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161079c565b61071d816113af565b6107af8282611008565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a83815602082015290810182905260009060600160405160208183030381529060405280519060200120905061165e8190565b5461166a9060016124ad565b905550565b6060828585604051602001611686939291906124c0565b6040516020818303038152906040529050949350505050565b606083156116ae5750816106db565b8251156116be5782518084602001fd5b8160405162461bcd60e51b815260040161079c9190611c80565b6116e28282610d08565b6107af576116fa816001600160a01b03166014611899565b611705836020611899565b6040516020016117169291906124ff565b60408051601f198184030181529082905262461bcd60e51b825261079c91600401611c80565b6000303303611752575060331936013560601c90565b503390565b60008060006117668585611a35565b9092509050600081600481111561177f5761177f6120c3565b14801561179d5750856001600160a01b0316826001600160a01b0316145b156117ad576001925050506106db565b600080876001600160a01b0316631626ba7e60e01b88886040516024016117d5929190612574565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051611813919061240e565b600060405180830381855afa9150503d806000811461184e576040519150601f19603f3d011682016040523d82523d6000602084013e611853565b606091505b5091509150818015611866575080516020145b801561188d57508051630b135d3f60e11b9061188b9083016020908101908401611ef3565b145b98975050505050505050565b606060006118a883600261258d565b6118b39060026124ad565b67ffffffffffffffff8111156118cb576118cb611d4c565b6040519080825280601f01601f1916602001820160405280156118f5576020820181803683370190505b509050600360fc1b8160008151811061191057611910611f2e565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061193f5761193f611f2e565b60200101906001600160f81b031916908160001a905350600061196384600261258d565b61196e9060016124ad565b90505b60018111156119e6576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106119a2576119a2611f2e565b1a60f81b8282815181106119b8576119b8611f2e565b60200101906001600160f81b031916908160001a90535060049490941c936119df816125a4565b9050611971565b5083156106db5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161079c565b6000808251604103611a6b5760208301516040840151606085015160001a611a5f87828585611a7a565b94509450505050611a73565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115611ab15750600090506003611b5e565b8460ff16601b14158015611ac957508460ff16601c14155b15611ada5750600090506004611b5e565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611b2e573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611b5757600060019250925050611b5e565b9150600090505b94509492505050565b600060208284031215611b7957600080fd5b81356001600160e01b0319811681146106db57600080fd5b600080600060408486031215611ba657600080fd5b833567ffffffffffffffff80821115611bbe57600080fd5b9085019060808288031215611bd257600080fd5b90935060208501359080821115611be857600080fd5b818601915086601f830112611bfc57600080fd5b813581811115611c0b57600080fd5b876020828501011115611c1d57600080fd5b6020830194508093505050509250925092565b60005b83811015611c4b578181015183820152602001611c33565b50506000910152565b60008151808452611c6c816020860160208601611c30565b601f01601f19169290920160200192915050565b6020815260006106db6020830184611c54565b600060208284031215611ca557600080fd5b5035919050565b6001600160a01b038116811461071d57600080fd5b8035611ccc81611cac565b919050565b60008060408385031215611ce457600080fd5b823591506020830135611cf681611cac565b809150509250929050565b600060208284031215611d1357600080fd5b81356106db81611cac565b60008060408385031215611d3157600080fd5b8235611d3c81611cac565b91506020830135611cf681611cac565b634e487b7160e01b600052604160045260246000fd5b6040516080810167ffffffffffffffff81118282101715611d8557611d85611d4c565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715611db457611db4611d4c565b604052919050565b60006020808385031215611dcf57600080fd5b823567ffffffffffffffff80821115611de757600080fd5b818501915085601f830112611dfb57600080fd5b813581811115611e0d57611e0d611d4c565b8060051b9150611e1e848301611d8b565b8181529183018401918481019088841115611e3857600080fd5b938501935b8385101561188d5784359250611e5283611cac565b8282529385019390850190611e3d565b60008060408385031215611e7557600080fd5b823567ffffffffffffffff811115611e8c57600080fd5b830160408186031215611e9e57600080fd5b946020939093013593505050565b6000808335601e19843603018112611ec357600080fd5b83018035915067ffffffffffffffff821115611ede57600080fd5b602001915036819003821315611a7357600080fd5b600060208284031215611f0557600080fd5b5051919050565b600060208284031215611f1e57600080fd5b815180151581146106db57600080fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201611f6c57611f6c611f44565b5060010190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b600060808236031215611fba57600080fd5b611fc2611d62565b8235611fcd81611cac565b81526020838101358183015260408085013590830152606084013567ffffffffffffffff80821115611ffe57600080fd5b9085019036601f83011261201157600080fd5b81358181111561202357612023611d4c565b612035601f8201601f19168501611d8b565b9150808252368482850101111561204b57600080fd5b808484018584013760009082019093019290925250606082015292915050565b6000808335601e1984360301811261208257600080fd5b830160208101925035905067ffffffffffffffff8111156120a257600080fd5b60a081023603821315611a7357600080fd5b803560068110611ccc57600080fd5b634e487b7160e01b600052602160045260246000fd5b600681106120e9576120e96120c3565b9052565b8183526000602080850194508260005b858110156121615761211787612112846120b4565b6120d9565b8282013561212481611cac565b6001600160a01b03168388015260408281013590880152606080830135908801526080808301359088015260a096870196909101906001016120fd565b509495945050505050565b6000808335601e1984360301811261218357600080fd5b830160208101925035905067ffffffffffffffff8111156121a357600080fd5b60c081023603821315611a7357600080fd5b8183526000602080850194508260005b85811015612161576121da87612112846120b4565b828201356121e781611cac565b6001600160a01b039081168885015260408381013590890152606080840135908901526080808401359089015260a0908382013561222481611cac565b169088015260c09687019691909101906001016121c5565b803560058110611ccc57600080fd5b600581106120e9576120e96120c3565b6000808335601e1984360301811261227257600080fd5b830160208101925035905067ffffffffffffffff81111561229257600080fd5b803603821315611a7357600080fd5b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b604081526000833561015e198536030181126122e557600080fd5b604083810152840161230a608084016122fd83611cc1565b6001600160a01b03169052565b61231660208201611cc1565b6001600160a01b031660a0840152612331604082018261206b565b6101608060c08701526123496101e0870183856120ed565b9250612358606085018561216c565b878503607f190160e089015292506123718484836121b5565b9350506123806080850161223c565b91506101006123918188018461224b565b610120925060a08501358388015261014060c08601358189015260e08601358389015281860135610180890152838601356101a0890152808601356101c0890152505050506123e3602087018761225b565b858303603f1901606087015292506123fc8284836122a1565b93505050508260208301529392505050565b60008251612420818460208701611c30565b9190910192915050565b60008261244757634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052600160045260246000fd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8082018082111561061057610610611f44565b600084516124d2818460208901611c30565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351612537816017850160208801611c30565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351612568816028840160208801611c30565b01602801949350505050565b828152604060208201526000610da96040830184611c54565b808202811582820484141761061057610610611f44565b6000816125b3576125b3611f44565b50600019019056fe9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidSignature";
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
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferred";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "Paused";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "previousAdminRole";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "newAdminRole";
            readonly type: "bytes32";
        }];
        readonly name: "RoleAdminChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleGranted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleRevoked";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "Unpaused";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "DEFAULT_ADMIN_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "MINTER_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "NAME";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "VERSION";
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
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "addMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "accounts";
            readonly type: "address[]";
        }];
        readonly name: "addMinters";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address payable";
            readonly name: "receiver";
            readonly type: "address";
        }];
        readonly name: "closeMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
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
            readonly components: readonly [{
                readonly components: readonly [{
                    readonly internalType: "address";
                    readonly name: "offerer";
                    readonly type: "address";
                }, {
                    readonly internalType: "address";
                    readonly name: "zone";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly internalType: "enum ItemType";
                        readonly name: "itemType";
                        readonly type: "uint8";
                    }, {
                        readonly internalType: "address";
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "identifierOrCriteria";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "startAmount";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "endAmount";
                        readonly type: "uint256";
                    }];
                    readonly internalType: "struct OfferItem[]";
                    readonly name: "offer";
                    readonly type: "tuple[]";
                }, {
                    readonly components: readonly [{
                        readonly internalType: "enum ItemType";
                        readonly name: "itemType";
                        readonly type: "uint8";
                    }, {
                        readonly internalType: "address";
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "identifierOrCriteria";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "startAmount";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "endAmount";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "address payable";
                        readonly name: "recipient";
                        readonly type: "address";
                    }];
                    readonly internalType: "struct ConsiderationItem[]";
                    readonly name: "consideration";
                    readonly type: "tuple[]";
                }, {
                    readonly internalType: "enum OrderType";
                    readonly name: "orderType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startTime";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endTime";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "zoneHash";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "salt";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "conduitKey";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "totalOriginalConsiderationItems";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct OrderParameters";
                readonly name: "parameters";
                readonly type: "tuple";
            }, {
                readonly internalType: "bytes";
                readonly name: "signature";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Order";
            readonly name: "parameters";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes32";
            readonly name: "fulfillerConduitKey";
            readonly type: "bytes32";
        }];
        readonly name: "fulfillOrder";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "fulfilled";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }];
        readonly name: "getRoleAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "grantRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "hasRole";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract ConsiderationInterface";
            readonly name: "_seaport";
            readonly type: "address";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "_usdc";
            readonly type: "address";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "isMinter";
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
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "pause";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "paused";
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
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "removeMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "accounts";
            readonly type: "address[]";
        }];
        readonly name: "removeMinters";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "renounceRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "revokeRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address payable";
            readonly name: "receiver";
            readonly type: "address";
        }];
        readonly name: "rotateMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
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
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "unpause";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
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
        readonly inputs: readonly [];
        readonly name: "withdraw";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): SeaportProxyBuyerInterface;
    static connect(address: string, runner?: ContractRunner | null): SeaportProxyBuyer;
}
export {};
//# sourceMappingURL=SeaportProxyBuyer__factory.d.ts.map