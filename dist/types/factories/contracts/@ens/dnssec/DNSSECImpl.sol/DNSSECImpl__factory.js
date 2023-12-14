"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DNSSECImpl__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_anchors",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "id",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "AlgorithmUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "id",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "DigestUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [],
        name: "Marker",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "id",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "NSEC3DigestUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "rrset",
                type: "bytes",
            },
        ],
        name: "RRSetUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "t",
                type: "uint256",
            },
        ],
        name: "Test",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        name: "algorithms",
        outputs: [
            {
                internalType: "contract Algorithm",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "anchors",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint16",
                name: "deleteType",
                type: "uint16",
            },
            {
                internalType: "bytes",
                name: "deleteName",
                type: "bytes",
            },
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "rrset",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct DNSSEC.RRSetWithSignature",
                name: "nsec",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "proof",
                type: "bytes",
            },
        ],
        name: "deleteRRSet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint16",
                name: "deleteType",
                type: "uint16",
            },
            {
                internalType: "bytes",
                name: "deleteName",
                type: "bytes",
            },
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "rrset",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct DNSSEC.RRSetWithSignature",
                name: "closestEncloser",
                type: "tuple",
            },
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "rrset",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct DNSSEC.RRSetWithSignature",
                name: "nextClosest",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "dnskey",
                type: "bytes",
            },
        ],
        name: "deleteRRSetNSEC3",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        name: "digests",
        outputs: [
            {
                internalType: "contract Digest",
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
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        name: "nsec3Digests",
        outputs: [
            {
                internalType: "contract NSEC3Digest",
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
        inputs: [
            {
                internalType: "uint16",
                name: "dnstype",
                type: "uint16",
            },
            {
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
        ],
        name: "rrdata",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
            {
                internalType: "bytes20",
                name: "",
                type: "bytes20",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "id",
                type: "uint8",
            },
            {
                internalType: "contract Algorithm",
                name: "algo",
                type: "address",
            },
        ],
        name: "setAlgorithm",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "id",
                type: "uint8",
            },
            {
                internalType: "contract Digest",
                name: "digest",
                type: "address",
            },
        ],
        name: "setDigest",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "id",
                type: "uint8",
            },
            {
                internalType: "contract NSEC3Digest",
                name: "digest",
                type: "address",
            },
        ],
        name: "setNSEC3Digest",
        outputs: [],
        stateMutability: "nonpayable",
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
        name: "setOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "rrset",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct DNSSEC.RRSetWithSignature",
                name: "input",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "proof",
                type: "bytes",
            },
        ],
        name: "submitRRSet",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "rrset",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct DNSSEC.RRSetWithSignature[]",
                name: "input",
                type: "tuple[]",
            },
            {
                internalType: "bytes",
                name: "_proof",
                type: "bytes",
            },
        ],
        name: "submitRRSets",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b506040516200320d3803806200320d83398101604081905262000034916200018f565b600180546001600160a01b031916331790556000620000548282620002f3565b5060408051606081018252600080825263e090bba0602083015282519192830191620000819190620003bf565b60408051918290039091206001600160601b031916909152602b60009081527fc92a43746f20f69898978a3075767b860ba247ac0639d1831bf8c942c5db2389602090815283517f95c6356c1b7a542b884d2484ef785c9c7224e77e1016c20007bddc15c23b452f8054928601519585015160601c6801000000000000000002600160401b600160e01b031963ffffffff978816640100000000026001600160401b03199095169790931696909617929092171693909317909255517f55ced933cdd5a34dd03eb5d4bef19ec6ebb251dcd7a988eee0c1b9a13baaa88b916200016a916200043d565b60405180910390a150620004e5565b634e487b7160e01b600052604160045260246000fd5b60006020808385031215620001a357600080fd5b82516001600160401b0380821115620001bb57600080fd5b818501915085601f830112620001d057600080fd5b815181811115620001e557620001e562000179565b604051601f8201601f19908116603f0116810190838211818310171562000210576200021062000179565b8160405282815288868487010111156200022957600080fd5b600093505b828410156200024d57848401860151818501870152928501926200022e565b600086848301015280965050505050505092915050565b600181811c908216806200027957607f821691505b6020821081036200029a57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002ee57600081815260208120601f850160051c81016020861015620002c95750805b601f850160051c820191505b81811015620002ea57828155600101620002d5565b5050505b505050565b81516001600160401b038111156200030f576200030f62000179565b620003278162000320845462000264565b84620002a0565b602080601f8311600181146200035f5760008415620003465750858301515b600019600386901b1c1916600185901b178555620002ea565b600085815260208120601f198616915b8281101562000390578886015182559484019460019091019084016200036f565b5085821015620003af5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6000808354620003cf8162000264565b60018281168015620003ea5760018114620004005762000431565b60ff198416875282151583028701945062000431565b8760005260208060002060005b85811015620004285781548a8201529084019082016200040d565b50505082870194505b50929695505050505050565b604081526000600180604084015260006060840152602060808185015260008554620004698162000264565b80608088015260a0858316600081146200048c5760018114620004a757620004d7565b60ff1984168983015282151560051b890182019450620004d7565b896000528560002060005b84811015620004cf5781548b8201850152908801908701620004b2565b8a0183019550505b509298975050505050505050565b612d1880620004f56000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806373cc48a61161008c57806398d35f201161006657806398d35f201461021c578063bd7ed31a14610224578063c327deef1461024d578063d7b82ebe1461027657600080fd5b806373cc48a6146101b55780638438dc04146101f65780638da5cb5b1461020957600080fd5b806313af4035116100c857806313af40351461015c57806328e7677d1461016f5780632c095cbb14610182578063435cc1621461019557600080fd5b8063020ed8d3146100ef578063087991bc146101045780630b1a249514610149575b600080fd5b6101026100fd3660046123fa565b610289565b005b61011761011236600461248c565b61030b565b6040805163ffffffff94851681529390921660208401526001600160601b031916908201526060015b60405180910390f35b610102610157366004612620565b61037b565b61010261016a3660046126de565b6104ef565b61010261017d3660046123fa565b610528565b6101026101903660046126fb565b6105a2565b6101a86101a3366004612794565b610673565b60405161014091906128b8565b6101de6101c33660046128cb565b6004602052600090815260409020546001600160a01b031681565b6040516001600160a01b039091168152602001610140565b6101026102043660046123fa565b6106fb565b6001546101de906001600160a01b031681565b6101a8610775565b6101de6102323660046128cb565b6005602052600090815260409020546001600160a01b031681565b6101de61025b3660046128cb565b6003602052600090815260409020546001600160a01b031681565b6101a86102843660046128e6565b610803565b6001546001600160a01b031633146102a057600080fd5b60ff821660008181526003602090815260409182902080546001600160a01b0319166001600160a01b0386169081179091558251938452908301527ff73c3c226af96b7f1ba666a21b3ceaf2be3ee6a365e3178fd9cd1eaae0075aa891015b60405180910390a15050565b60008060008060026000878760405161032592919061294a565b60408051918290039091208252602080830193909352908101600090812061ffff8b16825290925290205463ffffffff80821695506401000000008204169350600160401b900460601b91505093509350939050565b8351602080860191909120600090815260028252604080822061ffff891683529092529081205463ffffffff16906103b38584610818565b90506103c08187846108be565b6103c861232b565b845151156103e7576103da8585610818565b90506103e78188856108be565b60006103f283610904565b602081015190915060fe161561040757600080fd5b610412816027610963565b1580156104375750610425816002610963565b15806104375750610437816006610963565b61044057600080fd5b610451898985610120015184610975565b1561048d5787516020808a0191909120600090815260028252604080822061ffff8d1683529092522080546001600160e01b03191690556104e4565b6104ac88846101200151838561012001516104a787610904565b6109a5565b156100ea5787516020808a0191909120600090815260028252604080822061ffff8d1683529092522080546001600160e01b03191690555b505050505050505050565b6001546001600160a01b0316331461050657600080fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6001546001600160a01b0316331461053f57600080fd5b60ff821660008181526004602090815260409182902080546001600160a01b0319166001600160a01b0386169081179091558251938452908301527f2fcc274c3b72dd483ab201bfa87295e3817e8b9b10693219873b722ca1af00c791016102ff565b6105aa61232b565b6105b48383610818565b805190915061ffff16602f146105c957600080fd5b60a08101518451602080870191909120600090815260028252604080822061ffff8a1683529092522054610603919063ffffffff16610ac0565b61060c57600080fd5b600061061782610ad9565b9050805151602082015110156100ea57610638818361012001518789610af1565b50508251602080850191909120600090815260028252604080822061ffff881683529092522080546001600160e01b03191690555b50505050565b6060600083838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509394505050505b85518110156106f0576106dc8682815181106106ce576106ce61295a565b602002602001015183610c9f565b9150806106e881612986565b9150506106b0565b5090505b9392505050565b6001546001600160a01b0316331461071257600080fd5b60ff821660008181526005602090815260409182902080546001600160a01b0319166001600160a01b0386169081179091558251938452908301527fc7eec866a7a1386188cc3ca20ffea75b71bd3e90a60b6791b1d3f0971145118d91016102ff565b600080546107829061299f565b80601f01602080910402602001604051908101604052809291908181526020018280546107ae9061299f565b80156107fb5780601f106107d0576101008083540402835291602001916107fb565b820191906000526020600020905b8154815290600101906020018083116107de57829003601f168201915b505050505081565b606061080f8383610c9f565b90505b92915050565b61082061232b565b825161082b90610e1e565b905061083b8160e0015183610f18565b61084457600080fd5b6000610854828360000151610f80565b604083015190915060ff1661086a82600061102e565b1461087457600080fd5b6101208201819052608082015161088b9042610ac0565b61089457600080fd5b6108a2428360a00151610ac0565b6108ab57600080fd5b6108b78183868661108b565b5092915050565b6108cc8360a0015182610ac0565b6108d557600080fd5b825161ffff166032146108e757600080fd5b6108f683610120015183611170565b6108ff57600080fd5b505050565b6040805160c08101825260008082526020820181905291810182905260608082018190526080820183905260a08201529061093e83610ad9565b60a081015160c08201519192506106f49161095a9082906129d3565b835191906111de565b600061080f8360a00151600084611325565b600061098282848661143a565b15610999576109918286610963565b15905061099d565b5060005b949350505050565b602081015160009060fe16156109ba57600080fd5b60006109c586611461565b905060006109d285611461565b90506000806109e18a8261147d565b6109ec9060016129e6565b60ff1690505b8951811015610aae5783610a1e89610a1984858f51610a1191906129d3565b8f91906114a1565b611523565b03610a82576000610a3a87610a1985868f51610a1191906129d3565b90508660800151841015610a66578381118015610a5a5750866080015181105b95505050505050610ab7565b83811180610a5a57508660800151811095505050505050610ab7565b905080610a8f8a8261147d565b610a9a9060016129e6565b610aa79060ff16826129ff565b90506109f2565b50600093505050505b95945050505050565b600080610acd8385612a12565b60030b12159392505050565b610ae1612381565b61081282610100015160006115af565b60a08401518451600090610b0590836115ca565b905060008660a001518760c00151610b1d91906129d3565b9050818111610b2b57600080fd5b6000610b378688611624565b905080600003610b6657610b57610b4e84866129ff565b89519087611325565b15610b6157600080fd5b610bad565b8751600090610b769086866114a1565b905060008213610b8557600080fd5b6000610b918983611624565b12156104e4576000610ba38883611624565b126104e457600080fd5b5050505050505050565b60c08101516020820181905281515111610bce5750565b6000610be2826000015183602001516115ca565b8260200151610bf191906129ff565b8251909150610c00908261177d565b61ffff166040830152610c146002826129ff565b8251909150610c23908261177d565b61ffff166060830152610c376002826129ff565b8251909150610c4690826117a5565b63ffffffff166080830152610c5c6004826129ff565b8251909150600090610c6e908361177d565b61ffff169050610c7f6002836129ff565b60a084018190529150610c9281836129ff565b60c0909301929092525050565b6060610ca961232b565b610cb38484610818565b61012081015180516020918201206000908152600282526040808220845161ffff16835290925220805491925090600160401b900460601b6001600160601b03191615610d1a5760a08201518154610d11919063ffffffff16610ac0565b610d1a57600080fd5b604080516060808201835260a085015163ffffffff9081168352608086015181166020808501918252610100880180518051908301206001600160601b0319168688019081526101208a0180518051908501206000908152600285528981208c5161ffff16825290945292889020965187549451915190961c600160401b0268010000000000000000600160e01b03199186166401000000000267ffffffffffffffff19909516969095169590951792909217939093169190911790925551905191517f55ced933cdd5a34dd03eb5d4bef19ec6ebb251dcd7a988eee0c1b9a13baaa88b92610e099291612a39565b60405180910390a15061010001519392505050565b610e2661232b565b610e3182600061177d565b61ffff168152610e4282600261147d565b60ff166020820152610e5582600361147d565b60ff166040820152610e688260046117a5565b63ffffffff9081166060830152610e849083906008906117a516565b63ffffffff9081166080830152610ea0908390600c906117a516565b63ffffffff90811660a0830152610ebc90839060109061177d16565b61ffff1660c0820152610ed08260126117cf565b60e0820181905251610f0d90610ee79060126129ff565b8260e001515160128551610efb91906129d3565b610f0591906129d3565b8491906114a1565b610100820152919050565b600080610f2f610f2884836115ca565b849061177d565b8351602080860191909120865187830120600090815260028352604080822061ffff90951682529390925291902054600160401b900460601b6001600160601b031990811691161491505092915050565b60606000610f8d84610ad9565b90505b805151602082015110156108b757606081015161ffff16600114610fb357600080fd5b8151600003610fcc57610fc5816117ea565b9150611008565b60208101518151610fdc916115ca565b825114610fe857600080fd5b805160208201518351610fff92859260009261180b565b61100857600080fd5b8261ffff16816040015161ffff161461102057600080fd5b61102981610bb7565b610f90565b6000805b8351831061104257611042612a5e565b600061104e858561147d565b60ff16905061105e8160016129ff565b61106890856129ff565b935080600003611078575061080f565b6110836001836129ff565b915050611032565b83518360e0015151111561109e57600080fd5b6110c36000858560e001515187516110b691906129d3565b60e087015192919061182e565b6110cc57600080fd5b60006110d882826115af565b9050602b61ffff16816040015161ffff1603611107576110f9848483611863565b61110257600080fd5b611169565b603061ffff16816040015161ffff1603611126576110f98484836118fc565b60405162461bcd60e51b8152602060048201526014602482015273139bc81d985b1a59081c1c9bdbd988199bdd5b9960621b604482015260640160405180910390fd5b5050505050565b60008061117d848261147d565b6111889060016129e6565b60ff16905060005b8351811015610999576111a58482878561182e565b156111b557600192505050610812565b6111bf848261147d565b6111ca9060016129e6565b6111d79060ff16826129ff565b9050611190565b6040805160c08101825260008082526020820181905291810182905260608082018190526080820183905260a08201529061121983856129ff565b90506112306112296000866129ff565b869061147d565b60ff1682526112436112296001866129ff565b60ff1660208301526112606112596002866129ff565b869061177d565b61ffff16604083015260006112806112796004876129ff565b879061147d565b905061128d6005866129ff565b945061129d868660ff84166114a1565b60608401526112af60ff8216866129ff565b945060006112bd878761147d565b905060208160ff1611156112d057600080fd5b6112db6001876129ff565b95506112eb878760ff84166119a4565b60808501526112fd60ff8216876129ff565b95506113158661130d81866129d3565b8991906114a1565b60a0850152509195945050505050565b600060ff600883811c821691839161133e918616612a8a565b90506000611350600780871690612aab565b600160ff919091161b9050855b875181101561142c576000611372898361147d565b9050600061138b6113848460016129ff565b8b9061147d565b90508160ff168660ff1610156113aa57600096505050505050506106f4565b8160ff168660ff160361140b578460ff168160ff16116113d357600096505050505050506106f4565b836113f66113e460ff8816866129ff565b6113ef9060026129ff565b8c9061147d565b1660ff166000141596505050505050506106f4565b6114168160026129e6565b6114239060ff16846129ff565b9250505061135d565b506000979650505050505050565b6000806114478584611523565b9050600061145485611461565b9190911495945050505050565b60006108126001611472848461147d565b84919060ff166119e5565b60008282815181106114915761149161295a565b016020015160f81c905092915050565b82516060906114b083856129ff565b11156114bb57600080fd5b60008267ffffffffffffffff8111156114d6576114d66124df565b6040519080825280601f01601f191660200182016040528015611500576020820181803683370190505b50905060208082019086860101611518828287611bfd565b509095945050505050565b815160ff1660009081526005602052604080822054606085015182860151925163347ced5960e11b81526001600160a01b03909216926368f9dab29261156e92918791600401612ac4565b602060405180830381865afa15801561158b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080f9190612afe565b6115b7612381565b82815260c0810182905261081281610bb7565b6000815b835181106115de576115de612a5e565b60006115ea858361147d565b60ff1690506115fa8160016129ff565b61160490836129ff565b915080600003611614575061161a565b506115ce565b61099d83826129d3565b60006116308383611c53565b1561163d57506000610812565b600080600080600061165088600061102e565b9050600061165f88600061102e565b90505b8082111561168b578593506116778987611c71565b95508161168381612b17565b925050611662565b818111156116b4578492506116a08886611c71565b9450806116ac81612b17565b91505061168b565b6000821180156116cd57506116cb89878a8861182e565b155b15611702578593506116df8987611c71565b95508492506116ee8886611c71565b94506116fb6001836129d3565b91506116b4565b8560000361171a576000199650505050505050610812565b846000036117315760019650505050505050610812565b61177061173f8560016129ff565b6117498b8761147d565b60ff168a6117588760016129ff565b6117628d8961147d565b8e949392919060ff16611c95565b9998505050505050505050565b815160009061178d8360026129ff565b111561179857600080fd5b50016002015161ffff1690565b81516000906117b58360046129ff565b11156117c057600080fd5b50016004015163ffffffff1690565b606060006117dd84846115ca565b905061099d8484836114a1565b602081015181516060916108129161180290826115ca565b845191906114a1565b6000611818848484611d8a565b611823878785611d8a565b149695505050505050565b6000611847838384865161184291906129d3565b611d8a565b611859868687895161184291906129d3565b1495945050505050565b60008061186f85610ad9565b90505b8051516020820151101561099957604081015161ffff1660301461189557600080fd5b60006118a082611dae565b905060006118bb6000835184611dca9092919063ffffffff16565b90506118c981838989611e68565b156118ec576118e26118da846117ea565b868385611f6d565b93505050506106f4565b50506118f781610bb7565b611872565b60006119158460e0015161190f846117ea565b90611c53565b61191e57600080fd5b8151516020830151101561199a5761193d8460e0015161190f846117ea565b61194657600080fd5b600061195183611dae565b9050600061196c6000835184611dca9092919063ffffffff16565b905061197a81838888611e68565b1561198a576001925050506106f4565b505061199582610bb7565b61191e565b5060009392505050565b600060208211156119b457600080fd5b83516119c083856129ff565b11156119cb57600080fd5b506020919092018101519190036101000a60001901191690565b600060348211156119f557600080fd5b600080805b84811015611ae157600087611a0f83896129ff565b81518110611a1f57611a1f61295a565b01602001516001600160f81b0319169050600360fc1b8110801590611a525750603d60f91b6001600160f81b0319821611155b611a5b57600080fd5b604051806080016040528060478152602001612cc560479139611a83603060f884901c6129d3565b81518110611a9357611a9361295a565b0160209081015160f81c9350831115611aab57600080fd5b611ab66001876129d3565b8203611ac25750611ae1565b5060059290921b60ff8216179180611ad981612986565b9150506119fa565b506000611aef856005612b2e565b9050611afc600886612b45565b600003611b14578160ff16600584901b179250611be3565b611b1f600886612b45565b600203611b4d5760028260ff16901c60ff16600384901b179250600281611b4691906129d3565b9050611be3565b611b58600886612b45565b600403611b7f5760048260ff16901c60ff16600184901b179250600481611b4691906129d3565b611b8a600886612b45565b600503611bb15760018260ff16901c60ff16600484901b179250600181611b4691906129d3565b611bbc600886612b45565b6007036100ea5760038260ff16901c60ff16600284901b179250600381611b4691906129d3565b611bef816101006129d3565b9290921b9695505050505050565b60208110611c355781518352611c146020846129ff565b9250611c216020836129ff565b9150611c2e6020826129d3565b9050611bfd565b905182516020929092036101000a6000190180199091169116179052565b60008151835114801561080f575061080f836000846000875161180b565b6000611c7d838361147d565b60ff16611c8b8360016129ff565b61080f91906129ff565b60008480831015611ca35750815b60208789018101908587010160005b83811015611d6f5782518251808214611d3f5760006020871115611cd95750600019611d15565b600184611ce78960206129d3565b611cf191906129ff565b611cfc906008612b2e565b611d07906002612c3d565b611d1191906129d3565b1990505b6000611d25838316858416612c49565b90508015611d3c579750611d809650505050505050565b50505b611d4a6020866129ff565b9450611d576020856129ff565b93505050602081611d6891906129ff565b9050611cb2565b50611d7a8589612c49565b93505050505b9695505050505050565b8251600090611d9983856129ff565b1115611da457600080fd5b5091016020012090565b60a081015160c0820151606091610812916118029082906129d3565b6040805160808101825260008082526020820181905291810191909152606080820152611e02611dfb6000856129ff565b859061177d565b61ffff168152611e1d611e166002856129ff565b859061147d565b60ff166020820152611e33611e166003856129ff565b60ff166040820152611e5c611e496004856129ff565b611e546004856129d3565b8691906114a1565b60608201529392505050565b6000846020015160ff16600314611e815750600061099d565b826020015160ff16856040015160ff1614611e9e5750600061099d565b6000611ea98561206e565b90508360c0015161ffff168161ffff1614611ec857600091505061099d565b855161010016600003611edf57600091505061099d565b60408087015160ff166000908152600360209081529082902054855191860151925163de8f50a160e01b81526001600160a01b039091169263de8f50a192611f2c928a9290600401612c69565b602060405180830381865afa158015611f49573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d809190612ca2565b600080611f798361206e565b90505b845151602086015110156120625760a085015160c0860151600091611faf91611fa69082906129d3565b88519190611dca565b90508161ffff16816000015161ffff1614611fca5750612054565b846040015160ff16816020015160ff1614611fe55750612054565b6040805180820190915260608152600060208201526120128551895161200b91906129ff565b82906120db565b5061201d8189612140565b506120288186612140565b50612040826040015182600001518460600151612167565b15612051576001935050505061099d565b50505b61205d85610bb7565b611f7c565b50600095945050505050565b60008060005b83518110156120cc57600181161561209857612090848261147d565b60ff166120aa565b60086120a4858361147d565b60ff16901b5b6120b89061ffff16836129ff565b9150806120c481612986565b915050612074565b506106f4601082901c826129ff565b6040805180820190915260608152600060208201526120fb602083612b45565b156121235761210b602083612b45565b6121169060206129d3565b61212090836129ff565b91505b506020828101829052604080518085526000815290920101905290565b60408051808201909152606081526000602082015261080f83846000015151848551612213565b60ff83166000908152600460205260408120546001600160a01b031661218f575060006106f4565b60ff8416600090815260046020819052604091829020549151637bf41d7760e11b81526001600160a01b039092169163f7e83aee916121d2918791879101612a39565b602060405180830381865afa1580156121ef573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099d9190612ca2565b604080518082019091526060815260006020820152825182111561223657600080fd5b602085015161224583866129ff565b111561227857612278856122688760200151878661226391906129ff565b6122fd565b612273906002612b2e565b612314565b6000808651805187602083010193508088870111156122975787860182525b505050602084015b602084106122d757805182526122b66020836129ff565b91506122c36020826129ff565b90506122d06020856129d3565b935061229f565b51815160001960208690036101000a019081169019919091161790525083949350505050565b60008183111561230e575081610812565b50919050565b815161232083836120db565b5061066d8382612140565b604080516101408101825260008082526020820181905291810182905260608082018390526080820183905260a0820183905260c082019290925260e08101829052610100810182905261012081019190915290565b6040518060e001604052806060815260200160008152602001600061ffff168152602001600061ffff168152602001600063ffffffff16815260200160008152602001600081525090565b803560ff811681146123dd57600080fd5b919050565b6001600160a01b03811681146123f757600080fd5b50565b6000806040838503121561240d57600080fd5b612416836123cc565b91506020830135612426816123e2565b809150509250929050565b803561ffff811681146123dd57600080fd5b60008083601f84011261245557600080fd5b50813567ffffffffffffffff81111561246d57600080fd5b60208301915083602082850101111561248557600080fd5b9250929050565b6000806000604084860312156124a157600080fd5b6124aa84612431565b9250602084013567ffffffffffffffff8111156124c657600080fd5b6124d286828701612443565b9497909650939450505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561251e5761251e6124df565b604052919050565b600082601f83011261253757600080fd5b813567ffffffffffffffff811115612551576125516124df565b612564601f8201601f19166020016124f5565b81815284602083860101111561257957600080fd5b816020850160208301376000918101602001919091529392505050565b6000604082840312156125a857600080fd5b6040516040810167ffffffffffffffff82821081831117156125cc576125cc6124df565b8160405282935084359150808211156125e457600080fd5b6125f086838701612526565b8352602085013591508082111561260657600080fd5b5061261385828601612526565b6020830152505092915050565b600080600080600060a0868803121561263857600080fd5b61264186612431565b9450602086013567ffffffffffffffff8082111561265e57600080fd5b61266a89838a01612526565b9550604088013591508082111561268057600080fd5b61268c89838a01612596565b945060608801359150808211156126a257600080fd5b6126ae89838a01612596565b935060808801359150808211156126c457600080fd5b506126d188828901612526565b9150509295509295909350565b6000602082840312156126f057600080fd5b813561080f816123e2565b6000806000806080858703121561271157600080fd5b61271a85612431565b9350602085013567ffffffffffffffff8082111561273757600080fd5b61274388838901612526565b9450604087013591508082111561275957600080fd5b61276588838901612596565b9350606087013591508082111561277b57600080fd5b5061278887828801612526565b91505092959194509250565b6000806000604084860312156127a957600080fd5b833567ffffffffffffffff808211156127c157600080fd5b818601915086601f8301126127d557600080fd5b81356020828211156127e9576127e96124df565b8160051b6127f88282016124f5565b928352848101820192828101908b85111561281257600080fd5b83870192505b8483101561284e578235868111156128305760008081fd5b61283e8d86838b0101612596565b8352509183019190830190612818565b985050508701359250508082111561286557600080fd5b506124d286828701612443565b6000815180845260005b818110156128985760208185018101518683018201520161287c565b506000602082860101526020601f19601f83011685010191505092915050565b60208152600061080f6020830184612872565b6000602082840312156128dd57600080fd5b61080f826123cc565b600080604083850312156128f957600080fd5b823567ffffffffffffffff8082111561291157600080fd5b61291d86838701612596565b9350602085013591508082111561293357600080fd5b5061294085828601612526565b9150509250929050565b8183823760009101908152919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006001820161299857612998612970565b5060010190565b600181811c908216806129b357607f821691505b60208210810361230e57634e487b7160e01b600052602260045260246000fd5b8181038181111561081257610812612970565b60ff818116838216019081111561081257610812612970565b8082018082111561081257610812612970565b600382810b9082900b03637fffffff198112637fffffff8213171561081257610812612970565b604081526000612a4c6040830185612872565b8281036020840152610ab78185612872565b634e487b7160e01b600052600160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b600061ffff80841680612a9f57612a9f612a74565b92169190910492915050565b60ff828116828216039081111561081257610812612970565b606081526000612ad76060830186612872565b8281036020840152612ae98186612872565b91505061ffff83166040830152949350505050565b600060208284031215612b1057600080fd5b5051919050565b600081612b2657612b26612970565b506000190190565b808202811582820484141761081257610812612970565b600082612b5457612b54612a74565b500690565b600181815b80851115612b94578160001904821115612b7a57612b7a612970565b80851615612b8757918102915b93841c9390800290612b5e565b509250929050565b600082612bab57506001610812565b81612bb857506000610812565b8160018114612bce5760028114612bd857612bf4565b6001915050610812565b60ff841115612be957612be9612970565b50506001821b610812565b5060208310610133831016604e8410600b8410161715612c17575081810a610812565b612c218383612b59565b8060001904821115612c3557612c35612970565b029392505050565b600061080f8383612b9c565b81810360008312801583831316838312821617156108b7576108b7612970565b606081526000612c7c6060830186612872565b8281036020840152612c8e8186612872565b90508281036040840152611d808185612872565b600060208284031215612cb457600080fd5b8151801515811461080f57600080fdfe00010203040506070809ffffffffffffff0a0b0c0d0e0f101112131415161718191a1b1c1d1e1fffffffffffffffffffff0a0b0c0d0e0f101112131415161718191a1b1c1d1e1fa164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class DNSSECImpl__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_anchors, overrides) {
        return super.deploy(_anchors, overrides || {});
    }
    getDeployTransaction(_anchors, overrides) {
        return super.getDeployTransaction(_anchors, overrides || {});
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
exports.DNSSECImpl__factory = DNSSECImpl__factory;
DNSSECImpl__factory.bytecode = _bytecode;
DNSSECImpl__factory.abi = _abi;
