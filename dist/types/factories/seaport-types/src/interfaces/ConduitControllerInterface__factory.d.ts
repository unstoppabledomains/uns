import { type ContractRunner } from "ethers";
import type { ConduitControllerInterface, ConduitControllerInterfaceInterface } from "../../../../seaport-types/src/interfaces/ConduitControllerInterface";
export declare class ConduitControllerInterface__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "CallerIsNotNewPotentialOwner";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "CallerIsNotOwner";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "ChannelOutOfRange";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "ConduitAlreadyExists";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidCreator";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidInitialOwner";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "newPotentialOwner";
            readonly type: "address";
        }];
        readonly name: "NewPotentialOwnerAlreadySet";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "NewPotentialOwnerIsZeroAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoConduit";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "NoPotentialOwnerCurrentlySet";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }];
        readonly name: "NewConduit";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }, {
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
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newPotentialOwner";
            readonly type: "address";
        }];
        readonly name: "PotentialOwnerUpdated";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "acceptOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "cancelOwnershipTransfer";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "initialOwner";
            readonly type: "address";
        }];
        readonly name: "createConduit";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "channelIndex";
            readonly type: "uint256";
        }];
        readonly name: "getChannel";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "channel";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "channel";
            readonly type: "address";
        }];
        readonly name: "getChannelStatus";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "isOpen";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "getChannels";
        readonly outputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "channels";
            readonly type: "address[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }];
        readonly name: "getConduit";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "exists";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getConduitCodeHashes";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "creationCodeHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "runtimeCodeHash";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "getKey";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "getPotentialOwner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "potentialOwner";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "getTotalChannels";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "totalChannels";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "ownerOf";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "newPotentialOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "channel";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "isOpen";
            readonly type: "bool";
        }];
        readonly name: "updateChannel";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ConduitControllerInterfaceInterface;
    static connect(address: string, runner?: ContractRunner | null): ConduitControllerInterface;
}
//# sourceMappingURL=ConduitControllerInterface__factory.d.ts.map