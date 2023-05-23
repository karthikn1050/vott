"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFRecordsReader = void 0;
var guard_1 = require("../../../common/guard");
var tensorFlowRecordsProtoBuf_pb_1 = require("./tensorFlowRecordsProtoBuf_pb");
var tensorFlowHelpers_1 = require("./tensorFlowHelpers");
var tensorFlowBuilder_1 = require("./tensorFlowBuilder");
/**
 * @name - TFRecords Read Class
 * @description - Read a TFRecords object
 */
var TFRecordsReader = /** @class */ (function () {
    function TFRecordsReader(tfrecords) {
        guard_1.default.null(tfrecords);
        this.imageMessages = [];
        var position = 0;
        while (position < tfrecords.length) {
            var lengthBuffer = tfrecords.slice(position, position + 8);
            var dataLength = (0, tensorFlowHelpers_1.readInt64)(lengthBuffer);
            var lengthCrc = (0, tensorFlowHelpers_1.maskCrc)((0, tensorFlowHelpers_1.crc32c)(lengthBuffer));
            position += 8;
            var expectedLengthCrc = tfrecords.readUInt32LE(position);
            position += 4;
            if (lengthCrc !== expectedLengthCrc) {
                console.log("Wrong Length CRC");
                break;
            }
            var dataBuffer = tfrecords.slice(position, position + dataLength);
            var dataCrc = (0, tensorFlowHelpers_1.maskCrc)((0, tensorFlowHelpers_1.crc32c)(dataBuffer));
            position += dataLength;
            var expectedDataCrc = tfrecords.readUInt32LE(position);
            position += 4;
            if (dataCrc !== expectedDataCrc) {
                console.log("Wrong Data CRC");
                break;
            }
            // Deserialize TFRecord from dataBuffer
            var imageMessage = tensorFlowRecordsProtoBuf_pb_1.TFRecordsImageMessage.deserializeBinary(dataBuffer);
            this.imageMessages.push(imageMessage);
        }
    }
    Object.defineProperty(TFRecordsReader.prototype, "length", {
        /**
         * @description - Return the number of TFRecords read
         */
        get: function () {
            return this.imageMessages.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description - Return the TFRecords in a JSON Object Array format
     */
    TFRecordsReader.prototype.toArray = function () {
        return this.imageMessages.map(function (imageMessage) { return imageMessage.toObject(); });
    };
    /**
     * @recordPos - Record Position
     * @key - Feature Key
     * @type - Feature Type
     * @description - Get a Int64 | Float | String | Binary value
     */
    TFRecordsReader.prototype.getFeature = function (recordPos, key, type) {
        var message = this.imageMessages[recordPos];
        var feature = message.getContext().getFeatureMap().get(key);
        switch (type) {
            case tensorFlowBuilder_1.FeatureType.String:
                return (0, tensorFlowHelpers_1.textDecode)(feature.getBytesList().array[0][0]);
            case tensorFlowBuilder_1.FeatureType.Binary:
                return feature.getBytesList().array[0][0];
            case tensorFlowBuilder_1.FeatureType.Int64:
                return feature.getInt64List().array[0][0];
            case tensorFlowBuilder_1.FeatureType.Float:
                return feature.getFloatList().array[0][0];
        }
    };
    /**
     * @recordPos - Record Position
     * @key - Feature Key
     * @type - Feature Type
     * @description - Get an array of Int64 | Float | String | Binary value
     */
    TFRecordsReader.prototype.getArrayFeature = function (recordPos, key, type) {
        var message = this.imageMessages[recordPos];
        var feature = message.getContext().getFeatureMap().get(key);
        switch (type) {
            case tensorFlowBuilder_1.FeatureType.String:
                return feature.getBytesList().array[0].map(function (buffer) { return (0, tensorFlowHelpers_1.textDecode)(buffer); });
            case tensorFlowBuilder_1.FeatureType.Binary:
                return feature.getBytesList().array[0];
            case tensorFlowBuilder_1.FeatureType.Int64:
                return feature.getInt64List().array[0];
            case tensorFlowBuilder_1.FeatureType.Float:
                return feature.getFloatList().array[0];
        }
    };
    return TFRecordsReader;
}());
exports.TFRecordsReader = TFRecordsReader;
