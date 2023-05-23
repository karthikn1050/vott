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
var axios_1 = require("axios");
var applicationState_1 = require("../models/applicationState");
var guard_1 = require("./guard");
var tensorFlowReader_1 = require("../providers/export/tensorFlowRecords/tensorFlowReader");
var tensorFlowBuilder_1 = require("../providers/export/tensorFlowRecords/tensorFlowBuilder");
/**
 * Helper class for reading HTML files
 */
var HtmlFileReader = /** @class */ (function () {
    function HtmlFileReader() {
    }
    /**
     * Reads the file and returns the string value contained
     * @param file HTML file to read
     */
    HtmlFileReader.readAsText = function (file) {
        guard_1.default.null(file);
        var fileInfo;
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function () {
                if (reader.result) {
                    fileInfo = {
                        content: reader.result,
                        file: file,
                    };
                    resolve(fileInfo);
                }
                else {
                    reject();
                }
            };
            try {
                reader.readAsText(file);
            }
            catch (err) {
                reject(err);
            }
        });
    };
    /**
     * Reads attributes from asset depending on type (video or image)
     * @param asset Asset to read from
     */
    HtmlFileReader.readAssetAttributes = function (asset) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guard_1.default.null(asset);
                        _a = asset.type;
                        switch (_a) {
                            case applicationState_1.AssetType.Image: return [3 /*break*/, 1];
                            case applicationState_1.AssetType.Video: return [3 /*break*/, 3];
                            case applicationState_1.AssetType.TFRecord: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this.readImageAttributes(asset.path)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.readVideoAttributes(asset.path)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, this.readTFRecordAttributes(asset)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: throw new Error("Asset not supported");
                }
            });
        });
    };
    HtmlFileReader.readAssetAttributesWithBuffer = function (base64) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        guard_1.default.null(base64);
                        return [4 /*yield*/, this.readImageAttributes("data:image;base64," + base64)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Downloads the binary blob from the asset path
     * @param asset The asset to download
     */
    HtmlFileReader.getAssetBlob = function (asset) {
        return __awaiter(this, void 0, void 0, function () {
            var config, data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        guard_1.default.null(asset);
                        config = {
                            responseType: "blob",
                        };
                        data = null;
                        if (!(asset.type === applicationState_1.AssetType.VideoFrame)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAssetFrameImage(asset)];
                    case 1:
                        data = _a.sent();
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, axios_1.default.get(asset.path, config)];
                    case 3:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new Error("Error downloading asset binary");
                        }
                        return [4 /*yield*/, response.data];
                    case 4:
                        data = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Downloads the binary array from the asset path
     * @param asset The asset to download
     */
    HtmlFileReader.getAssetArray = function (asset) {
        return __awaiter(this, void 0, void 0, function () {
            var blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAssetBlob(asset)];
                    case 1:
                        blob = _a.sent();
                        return [4 /*yield*/, new Response(blob).arrayBuffer()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Extracts the specified image frame from a video asset
     * @param asset The asset video frame to retrieve from the parent video
     */
    HtmlFileReader.getAssetFrameImage = function (asset) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var cachingEnabled = false;
                        var refresh = !cachingEnabled;
                        var video = _this.videoAssetFiles[asset.parent.name];
                        // Ensure the asset name includes jpg file extension
                        if (!asset.name.toLowerCase().endsWith(".jpg")) {
                            asset.name += ".jpg";
                        }
                        if (!video) {
                            video = document.createElement("video");
                            if (cachingEnabled) {
                                _this.videoAssetFiles[asset.parent.name] = video;
                                refresh = true;
                            }
                        }
                        video.onloadedmetadata = function () {
                            video.currentTime = asset.timestamp;
                        };
                        video.onseeked = function () {
                            var canvas = document.createElement("canvas");
                            canvas.height = video.videoHeight;
                            canvas.width = video.videoWidth;
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                            canvas.toBlob(resolve, "image/jpeg", 1.0);
                        };
                        video.onerror = reject;
                        if (refresh) {
                            video.src = asset.parent.path;
                        }
                        else {
                            video.currentTime = asset.timestamp;
                        }
                    })];
            });
        });
    };
    HtmlFileReader.readVideoAttributes = function (url) {
        return new Promise(function (resolve, reject) {
            var video = document.createElement("video");
            video.onloadedmetadata = function () {
                resolve({
                    width: video.videoWidth,
                    height: video.videoHeight,
                    duration: video.duration,
                });
            };
            video.onerror = reject;
            video.src = url;
        });
    };
    HtmlFileReader.readImageAttributes = function (url) {
        return new Promise(function (resolve, reject) {
            var image = document.createElement("img");
            image.onload = function () {
                resolve({
                    width: image.naturalWidth,
                    height: image.naturalHeight,
                });
            };
            image.onerror = reject;
            image.src = url;
        });
    };
    HtmlFileReader.readTFRecordAttributes = function (asset) {
        return __awaiter(this, void 0, void 0, function () {
            var tfrecords, _a, reader, width, height;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Buffer.bind;
                        return [4 /*yield*/, this.getAssetArray(asset)];
                    case 1:
                        tfrecords = new (_a.apply(Buffer, [void 0, _b.sent()]))();
                        reader = new tensorFlowReader_1.TFRecordsReader(tfrecords);
                        width = reader.getFeature(0, "image/width", tensorFlowBuilder_1.FeatureType.Int64);
                        height = reader.getFeature(0, "image/height", tensorFlowBuilder_1.FeatureType.Int64);
                        return [2 /*return*/, { width: width, height: height }];
                }
            });
        });
    };
    HtmlFileReader.videoAssetFiles = {};
    return HtmlFileReader;
}());
exports.default = HtmlFileReader;
