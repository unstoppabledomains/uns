"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapDependencies = exports.unwrap = void 0;
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
