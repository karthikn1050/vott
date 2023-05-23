"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFRecordsBuilder = exports.FeatureType = void 0;
var tensorFlowRecordsProtoBuf_pb_1 = require("./tensorFlowRecordsProtoBuf_pb");
var tensorFlowHelpers_1 = require("./tensorFlowHelpers");
/**
 * @name - TFRecords Feature Type
 * @description - Defines the type of TFRecords Feature
 * @member String - Specifies a Feature as a string
 * @member Binary - Specifies a Feature as a binary UInt8Array
 * @member Int64 - Specifies a Feature as a Int64
 * @member Float - Specifies a Feature as a Float
 */
var FeatureType;
(function (FeatureType) {
    FeatureType[FeatureType["String"] = 0] = "String";
    FeatureType[FeatureType["Binary"] = 1] = "Binary";
    FeatureType[FeatureType["Int64"] = 2] = "Int64";
    FeatureType[FeatureType["Float"] = 3] = "Float";
})(FeatureType = exports.FeatureType || (exports.FeatureType = {}));
/**
 * @name - TFRecords Builder Class
 * @description - Create a TFRecords object
 */
var TFRecordsBuilder = /** @class */ (function () {
    function TFRecordsBuilder() {
        this.features = new tensorFlowRecordsProtoBuf_pb_1.Features();
    }
    /**
     * @records - An Array of TFRecord Buffer created with releaseTFRecord()
     * @description - Return a Buffer representation of a TFRecords object
     */
    TFRecordsBuilder.buildTFRecords = function (records) {
        return Buffer.concat(records.map(function (record) {
            var length = record.length;
            // Get TFRecords CRCs for TFRecords Header and Footer
            var bufferLength = (0, tensorFlowHelpers_1.getInt64Buffer)(length);
            var bufferLengthMaskedCRC = (0, tensorFlowHelpers_1.getInt32Buffer)((0, tensorFlowHelpers_1.maskCrc)((0, tensorFlowHelpers_1.crc32c)(bufferLength)));
            var bufferDataMaskedCRC = (0, tensorFlowHelpers_1.getInt32Buffer)((0, tensorFlowHelpers_1.maskCrc)((0, tensorFlowHelpers_1.crc32c)(record)));
            // Concatenate all TFRecords Header, Data and Footer buffer
            return Buffer.concat([bufferLength,
                bufferLengthMaskedCRC,
                record,
                bufferDataMaskedCRC]);
        }));
    };
    /**
     * @key - Feature Key
     * @type - Feature Type
     * @value - A Int64 | Float | String | Binary value
     * @description - Add a Int64 | Float | String | Binary value feature
     */
    TFRecordsBuilder.prototype.addFeature = function (key, type, value) {
        this.addArrayFeature(key, type, [value]);
    };
    /**
     * @key - Feature Key
     * @type - Feature Type
     * @value - An Array of Int64 | Float | String | Binary values
     * @description - Add an Array of Int64 | Float | String | Binary values feature
     */
    TFRecordsBuilder.prototype.addArrayFeature = function (key, type, values) {
        var feature = new tensorFlowRecordsProtoBuf_pb_1.Feature();
        switch (type) {
            case FeatureType.String:
                var stringList_1 = new tensorFlowRecordsProtoBuf_pb_1.BytesList();
                values.forEach(function (value) {
                    stringList_1.addValue((0, tensorFlowHelpers_1.textEncode)(value));
                });
                feature.setBytesList(stringList_1);
                break;
            case FeatureType.Binary:
                var byteList_1 = new tensorFlowRecordsProtoBuf_pb_1.BytesList();
                values.forEach(function (value) {
                    byteList_1.addValue(value);
                });
                feature.setBytesList(byteList_1);
                break;
            case FeatureType.Int64:
                var intList_1 = new tensorFlowRecordsProtoBuf_pb_1.Int64List();
                values.forEach(function (value) {
                    intList_1.addValue(value);
                });
                feature.setInt64List(intList_1);
                break;
            case FeatureType.Float:
                var floatList_1 = new tensorFlowRecordsProtoBuf_pb_1.FloatList();
                values.forEach(function (value) {
                    floatList_1.addValue(value);
                });
                feature.setFloatList(floatList_1);
                break;
            default:
                break;
        }
        var featuresMap = this.features.getFeatureMap();
        featuresMap.set(key, feature);
    };
    /**
     * @description - Return a Buffer representation of a single TFRecord
     */
    TFRecordsBuilder.prototype.build = function () {
        // Get Protocol Buffer TFRecords object with exported image features
        var imageMessage = new tensorFlowRecordsProtoBuf_pb_1.TFRecordsImageMessage();
        imageMessage.setContext(this.features);
        // Serialize Protocol Buffer in a buffer
        var bytes = imageMessage.serializeBinary();
        return new Buffer(bytes);
    };
    return TFRecordsBuilder;
}());
exports.TFRecordsBuilder = TFRecordsBuilder;
