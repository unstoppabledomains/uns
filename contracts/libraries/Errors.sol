pragma solidity ^0.8.0;

library Errors {
    string public constant RE_SENDER_IS_NOT_APPROVED_OR_OWNER = '1'; // 'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER';
    string public constant RE_SENDER_IS_NOT_MINTING_MANAGER = '2'; // 'Registry: SENDER_IS_NOT_MINTING_MANAGER';
    string public constant RE_TOKEN_INVALID = '3'; // 'Registry: TOKEN_INVALID';
    string public constant RE_SENDER_IS_NOT_OWNER = '4'; // 'Registry: SENDER_IS_NOT_OWNER';
    string public constant RE_CNS_REGISTRY_NOT_EMPTY = '5'; // 'Registry: CNS_REGISTRY_NOT_EMPTY';
    string public constant RE_REVERSE_RECORD_IS_EMPTY = '6'; // 'Registry: REVERSE_RECORD_IS_EMPTY';
    string public constant RE_LABEL_EMPTY = '7'; // 'Registry: LABEL_EMPTY';
    string public constant RE_TOKEN_UPGRADED = '8'; // 'Registry: TOKEN_UPGRADED';
    string public constant RE_INSUFFICIENT_PERMISSIONS = '9'; // 'Registry: INSUFFICIENT_PERMISSIONS';
    string public constant RE_ROOT_CHAIN_MANEGER_NOT_EMPTY = '10'; // 'Registry: ROOT_CHAIN_MANEGER_NOT_EMPTY';
    string public constant RE_CHILD_CHAIN_MANEGER_NOT_EMPTY = '11'; // 'Registry: CHILD_CHAIN_MANEGER_NOT_EMPTY';
    string public constant RE_INVALID_TOKEN_OWNER = '12'; // 'Registry: INVALID_TOKEN_OWNER';
    string public constant RE_EXCEEDS_BATCH_LIMIT = '13'; // 'Registry: EXCEEDS_BATCH_LIMIT';
    string public constant RS_KEY_NOT_FOUND = '23'; // 'RecordStorage: KEY_NOT_FOUND';
    string public constant BFW_CALL_FAILED = '33'; // 'BaseForwarder: CALL_FAILED';
    string public constant REFW_SIGNATURE_INVALID = '34'; // 'UNSRegistryForwarder: SIGNATURE_INVALID';
    string public constant RFW_ROUTE_UNKNOWN = '35'; // 'BaseRoutingForwarder: ROUTE_UNKNOWN';
    string public constant MMFW_SIGNATURE_INVALID = '36'; // 'MintingManagerForwarder: SIGNATURE_INVALID';
    string public constant MM_TLD_NOT_REGISTERED = '46'; // 'MintingManager: TLD_NOT_REGISTERED';
    string public constant MM_TOKEN_LABEL_PROHIBITED = '47'; // 'MintingManager: TOKEN_LABEL_PROHIBITED';
    string public constant MM_LABEL_EMPTY = '48'; // 'MintingManager: LABEL_EMPTY';
    string public constant MM_TOKEN_BLOCKED = '49'; // 'MintingManager: TOKEN_BLOCKED';
    string public constant MR_CALLER_IS_NOT_MINTER = '59'; // 'MinterRole: CALLER_IS_NOT_MINTER';
    string public constant MR_RECEIVER_IS_EMPTY = '60'; // 'MinterRole: RECEIVER_IS_EMPTY';
    string public constant BL_DISABLED = '70'; // 'Blocklist: DISABLED';
    string public constant BL_ENABLED = '71'; // 'Blocklist: ENABLED';
    string public constant P_PAUSED = '81'; // 'Pausable: PAUSED';
    string public constant P_NOT_PAUSED = '91'; // 'Pausable: NOT_PAUSED';
}
