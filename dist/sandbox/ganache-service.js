"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GanacheService = void 0;
const ganache_1 = require("ganache");
const DEFAULT_PORT = 7545;
class GanacheService {
    constructor(options, serverConfigOptions) {
        this.serverConfigOptions = this.validateAndTransformOptions(serverConfigOptions);
        this.server = (0, ganache_1.server)(options);
        this.provider = this.server.provider;
    }
    startServer() {
        const { port } = this.serverConfigOptions;
        if (!port) {
            throw new Error('Port sohuld be defined in the ServerConfigOptions URL');
        }
        return this.server.listen(port);
    }
    stopServer() {
        return this.server.close();
    }
    validateAndTransformOptions(options) {
        const validatedOptions = options;
        const url = new URL(options.url);
        if (url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
            throw new Error('Ganache network only works with localhost');
        }
        validatedOptions.hostname = url.hostname;
        validatedOptions.port =
            url.port !== undefined && url.port !== ''
                ? parseInt(url.port, 10)
                : DEFAULT_PORT;
        return validatedOptions;
    }
}
exports.GanacheService = GanacheService;
