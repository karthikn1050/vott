"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageProviderFactory = void 0;
var guard_1 = require("../../common/guard");
var hostProcess_1 = require("../../common/hostProcess");
/**
 * @name - Storage Provider Factory
 * @description - Creates instance of Storage Providers based on request provider type
 */
var StorageProviderFactory = exports.StorageProviderFactory = /** @class */ (function () {
    function StorageProviderFactory() {
    }
    Object.defineProperty(StorageProviderFactory, "providers", {
        /**
         * @returns - Dictionary of registered Storage Providers
         */
        get: function () {
            return __assign({}, StorageProviderFactory.providerRegistry);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Register Storage Provider based on name and a factory
     * @param name - Name of Storage Provider
     * @param factory - Function that instantiates Storage Provider
     */
    StorageProviderFactory.register = function (nameOrOptions, factory) {
        guard_1.default.null(nameOrOptions);
        var options = nameOrOptions;
        if (typeof (nameOrOptions) === "string") {
            guard_1.default.null(factory);
            options = {
                name: nameOrOptions,
                displayName: nameOrOptions,
                factory: factory,
            };
        }
        if (!options.platformSupport) {
            options.platformSupport = hostProcess_1.HostProcessType.All;
        }
        if ((options.platformSupport & (0, hostProcess_1.default)().type) === 0) {
            return;
        }
        StorageProviderFactory.providerRegistry[options.name] = options;
    };
    /**
     * Create Storage Provider from provider type and options specified in connection
     * @param connection Connection for a Storage Provider
     */
    StorageProviderFactory.createFromConnection = function (connection) {
        return this.create(connection.providerType, connection.providerOptions);
    };
    /**
     * Create Storage Provider from registered Storage Provider name and options
     * @param name - Name of Storage Provider
     * @param options - Options for Storage Provider
     */
    StorageProviderFactory.create = function (name, options) {
        guard_1.default.empty(name);
        var registrationOptions = StorageProviderFactory.providerRegistry[name];
        if (!registrationOptions) {
            throw new Error("No storage provider has been registered with name '".concat(name, "'"));
        }
        return registrationOptions.factory(options);
    };
    /**
     * Indicates whether or not a Storage Provider has been registered
     * @param providerType - Name of Storage Provider
     */
    StorageProviderFactory.isRegistered = function (providerType) {
        return this.providers[providerType] !== undefined;
    };
    StorageProviderFactory.providerRegistry = {};
    return StorageProviderFactory;
}());
