"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notNullSha = exports.unwrapDependencies = exports.unwrap = void 0;
const web3_utils_1 = require("web3-utils");
function unwrap(object, key) {
    if (!object[key]) {
        throw new Error(`Unwrap: cannot find key ${key} on object ${object.toString()}`);
    }
    return object[key];
}
exports.unwrap = unwrap;
function unwrapDependencies(dependencies, keys) {
    return keys.map((key) => unwrap(dependencies, key));
}
exports.unwrapDependencies = unwrapDependencies;
function notNullSha(value) {
    const res = (0, web3_utils_1.sha3)(value);
    if (!res) {
        throw new Error('notNullSha: SHA returns null');
    }
    return res;
}
exports.notNullSha = notNullSha;
