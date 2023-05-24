"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportProvider = exports.ExportAssetState = void 0;
var guard_1 = require("../../commons/guard");
var applicationState_1 = require("../../models/applicationState");
var storageProviderFactory_1 = require("../storage/storageProviderFactory");
var assetProviderFactory_1 = require("../storage/assetProviderFactory");
var lodash_1 = require("lodash");
var assetService_1 = require("../../services/assetService");
/**
 * @name - TF Pascal VOC Records Export Asset State
 * @description - Defines the asset type export option
 * @member All - Specifies that all assets will be exported
 * @member Visited - Specifies that visited (including tagged) assets will be exported
 * @member Tagged - Specifies that only tagged assets will be exported
 */
var ExportAssetState;
(function (ExportAssetState) {
    ExportAssetState["All"] = "all";
    ExportAssetState["Visited"] = "visited";
    ExportAssetState["Tagged"] = "tagged";
})(ExportAssetState = exports.ExportAssetState || (exports.ExportAssetState = {}));
/**
 * Base class implementation for all VoTT export providers
 * Provides quick access to the configured projects asset & storage providers
 */
var ExportProvider = /** @class */ (function () {
    function ExportProvider(project, options) {
        this.project = project;
        this.options = options;
        guard_1.default.null(project);
        this.assetService = new assetService_1.AssetService(this.project);
    }
    /**
     * Gets the assets that are configured to be exported based on the configured asset state
     */
    ExportProvider.prototype.getAssetsForExport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var predicate, getProjectAssets, getAllAssets, getAssetsFunc;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        predicate = null;
                        getProjectAssets = function () { return Promise.resolve(lodash_1.default.values(_this.project.assets)); };
                        getAllAssets = function () { return __awaiter(_this, void 0, void 0, function () {
                            var projectAssets, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, getProjectAssets()];
                                    case 1:
                                        projectAssets = _c.sent();
                                        _b = (_a = (0, lodash_1.default)(projectAssets))
                                            .concat;
                                        return [4 /*yield*/, this.assetProvider.getAssets()];
                                    case 2: return [2 /*return*/, _b.apply(_a, [(_c.sent())])
                                            .uniqBy(function (asset) { return asset.id; })
                                            .value()];
                                }
                            });
                        }); };
                        getAssetsFunc = getProjectAssets;
                        switch (this.options.assetState) {
                            case ExportAssetState.Visited:
                                predicate = function (asset) { return asset.state === applicationState_1.AssetState.Visited || asset.state === applicationState_1.AssetState.Tagged; };
                                break;
                            case ExportAssetState.Tagged:
                                predicate = function (asset) { return asset.state === applicationState_1.AssetState.Tagged; };
                                break;
                            case ExportAssetState.All:
                            default:
                                getAssetsFunc = getAllAssets;
                                predicate = function () { return true; };
                                break;
                        }
                        return [4 /*yield*/, getAssetsFunc()];
                    case 1: return [2 /*return*/, (_a.sent())
                            .filter(function (asset) { return asset.type !== applicationState_1.AssetType.Video; })
                            .filter(predicate)
                            .mapAsync(function (asset) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.assetService.getAssetMetadata(asset)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                }
            });
        });
    };
    Object.defineProperty(ExportProvider.prototype, "storageProvider", {
        /**
         * Gets the storage provider for the current project
         */
        get: function () {
            if (this.storageProviderInstance) {
                return this.storageProviderInstance;
            }
            this.storageProviderInstance = storageProviderFactory_1.StorageProviderFactory.create(this.project.targetConnection.providerType, this.project.targetConnection.providerOptions);
            return this.storageProviderInstance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExportProvider.prototype, "assetProvider", {
        /**
         * Gets the asset provider for the current project
         */
        get: function () {
            if (this.assetProviderInstance) {
                return this.assetProviderInstance;
            }
            this.assetProviderInstance = assetProviderFactory_1.AssetProviderFactory.create(this.project.sourceConnection.providerType, this.project.sourceConnection.providerOptions);
            return this.assetProviderInstance;
        },
        enumerable: false,
        configurable: true
    });
    return ExportProvider;
}());
exports.ExportProvider = ExportProvider;
