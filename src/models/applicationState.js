"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorMode = exports.RegionType = exports.AssetState = exports.AssetType = exports.ModelPathType = exports.StorageType = exports.AppError = exports.ErrorCode = void 0;
/**
 * Enum of supported error codes
 */
var ErrorCode;
(function (ErrorCode) {
    // Note that the value of the enum is in camelCase while
    // the enum key is in Pascal casing
    ErrorCode["Unknown"] = "unknown";
    ErrorCode["GenericRenderError"] = "genericRenderError";
    ErrorCode["CanvasError"] = "canvasError";
    ErrorCode["V1ImportError"] = "v1ImportError";
    ErrorCode["ProjectUploadError"] = "projectUploadError";
    ErrorCode["ProjectDeleteError"] = "projectDeleteError";
    ErrorCode["ProjectInvalidJson"] = "projectInvalidJson";
    ErrorCode["ProjectInvalidSecurityToken"] = "projectInvalidSecurityToken";
    ErrorCode["ProjectDuplicateName"] = "projectDuplicateName";
    ErrorCode["SecurityTokenNotFound"] = "securityTokenNotFound";
    ErrorCode["ExportFormatNotFound"] = "exportFormatNotFound";
    ErrorCode["PasteRegionTooBig"] = "pasteRegionTooBig";
    ErrorCode["OverloadedKeyBinding"] = "overloadedKeyBinding";
    ErrorCode["ActiveLearningPredictionError"] = "activeLearningPredictionError";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
/**
 * Base application error
 */
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(errorCode, message, title) {
        if (title === void 0) { title = null; }
        var _this = _super.call(this, message) || this;
        _this.errorCode = errorCode;
        _this.message = message;
        _this.title = title;
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
/**
 * @enum LOCAL - Local storage type
 * @enum CLOUD - Cloud storage type
 * @enum OTHER - Any other storage type
 */
var StorageType;
(function (StorageType) {
    StorageType["Local"] = "local";
    StorageType["Cloud"] = "cloud";
    StorageType["Other"] = "other";
})(StorageType = exports.StorageType || (exports.StorageType = {}));
/**
 * @name - Model Path Type
 * @description - Defines the mechanism to load the TF.js model for Active Learning
 * @member Coco - Specifies the default/generic pre-trained Coco-SSD model
 * @member File - Specifies to load a custom model from filesystem
 * @member Url - Specifies to load a custom model from a web server
 */
var ModelPathType;
(function (ModelPathType) {
    ModelPathType["Coco"] = "coco";
    ModelPathType["File"] = "file";
    ModelPathType["Url"] = "url";
})(ModelPathType = exports.ModelPathType || (exports.ModelPathType = {}));
/**
 * @name - Asset Type
 * @description - Defines the type of asset within a project
 * @member Image - Specifies an asset as an image
 * @member Video - Specifies an asset as a video
 */
var AssetType;
(function (AssetType) {
    AssetType[AssetType["Unknown"] = 0] = "Unknown";
    AssetType[AssetType["Image"] = 1] = "Image";
    AssetType[AssetType["Video"] = 2] = "Video";
    AssetType[AssetType["VideoFrame"] = 3] = "VideoFrame";
    AssetType[AssetType["TFRecord"] = 4] = "TFRecord";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
/**
 * @name - Asset State
 * @description - Defines the state of the asset with regard to the tagging process
 * @member NotVisited - Specifies as asset that has not yet been visited or tagged
 * @member Visited - Specifies an asset has been visited, but not yet tagged
 * @member Tagged - Specifies an asset has been visited and tagged
 */
var AssetState;
(function (AssetState) {
    AssetState[AssetState["NotVisited"] = 0] = "NotVisited";
    AssetState[AssetState["Visited"] = 1] = "Visited";
    AssetState[AssetState["Tagged"] = 2] = "Tagged";
})(AssetState = exports.AssetState || (exports.AssetState = {}));
/**
 * @name - Region Type
 * @description - Defines the region type within the asset metadata
 * @member Square - Specifies a region as a square
 * @member Rectangle - Specifies a region as a rectangle
 * @member Polygon - Specifies a region as a multi-point polygon
 */
var RegionType;
(function (RegionType) {
    RegionType["Polyline"] = "POLYLINE";
    RegionType["Point"] = "POINT";
    RegionType["Rectangle"] = "RECTANGLE";
    RegionType["Polygon"] = "POLYGON";
    RegionType["Square"] = "SQUARE";
})(RegionType = exports.RegionType || (exports.RegionType = {}));
var EditorMode;
(function (EditorMode) {
    EditorMode["Rectangle"] = "RECT";
    EditorMode["Polygon"] = "POLYGON";
    EditorMode["Polyline"] = "POLYLINE";
    EditorMode["Point"] = "POINT";
    EditorMode["Select"] = "SELECT";
    EditorMode["CopyRect"] = "COPYRECT";
    EditorMode["None"] = "NONE";
})(EditorMode = exports.EditorMode || (exports.EditorMode = {}));
