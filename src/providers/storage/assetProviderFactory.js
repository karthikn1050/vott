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
exports.AssetProviderFactory = void 0;
var guard_1 = require("../../common/guard");
var hostProcess_1 = require("../../common/hostProcess");
/**
 * @name - Asset Provider Factory
 * @description - Creates instance of Asset Providers based on request provider type
 */
var AssetProviderFactory = exports.AssetProviderFactory = /** @class */ (function () {
    function AssetProviderFactory() {
    }
    Object.defineProperty(AssetProviderFactory, "providers", {
        /**
         * @returns - Dictionary of registered Asset Providers
         */
        get: function () {
            return __assign({}, AssetProviderFactory.providerRegistry);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Register Asset provider based on name and a factory
     * @param name - Name of Asset Provider
     * @param factory - Function that instantiates Asset Provider
     */
    AssetProviderFactory.register = function (nameOrOptions, factory) {
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
        AssetProviderFactory.providerRegistry[options.name] = options;
    };
    /**
     * Create Asset Provider from provider type and options specified in connection
     * @param connection - Connection for an Asset Provider
     */
    AssetProviderFactory.createFromConnection = function (connection) {
        return this.create(connection.providerType, connection.providerOptions);
    };
    /**
     * Create Asset Provider from registered Asset Provider name and options
     * @param name - Name of Asset Provider
     * @param options - Options for Asset Provider
     */
    AssetProviderFactory.create = function (name, options) {
        guard_1.default.empty(name);
        var registrationOptions = AssetProviderFactory.providerRegistry[name];
        if (!registrationOptions) {
            throw new Error("No asset provider has been registered with name '".concat(name, "'"));
        }
        return registrationOptions.factory(options);
    };
    AssetProviderFactory.providerRegistry = {};
    return AssetProviderFactory;
}());
