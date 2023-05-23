"use strict";
// A TFRecords file contains a sequence of strings with CRC
// hashes. Each record has the format
//
//     uint64 length
//     uint32 masked_crc32_of_length
//     byte   data[length]
//     uint32 masked_crc32_of_data
//
// and the records are concatenated together to produce the file. The
// CRC32s are described here, and the mask of a CRC is
//
//     masked_crc = ((crc >> 15) | (crc << 17)) + 0xa282ead8ul
//
// For more information, please refer to
// https://www.tensorflow.org/versions/master/api_docs/python/python_io.html#tfrecords-format-details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInt64 = exports.textDecode = exports.textEncode = exports.getInt32Buffer = exports.getInt64Buffer = exports.maskCrc = exports.crc32c = void 0;
// maskDelta is a magic number taken from
// https://github.com/tensorflow/tensorflow/blob/754048a0453a04a761e112ae5d99c149eb9910dd/
//    tensorflow/core/lib/hash/crc32c.h#L33.
// const maskDelta uint32 = 0xa282ead8
// mask returns a masked representation of crc.
var guard_1 = require("../../../common/guard");
var node_int64_1 = require("node-int64");
var buffer_reverse_1 = require("buffer-reverse");
/**
 * @buffer - Buffer input
 * @description - Calculate 32-bit CRC using the Castagnoli polynomial (0x1EDC6F41)
 */
function crc32c(buffer) {
    guard_1.default.null(buffer);
    var polynomial = 0x1EDC6F41; // 0x04C11DB7 for crc32
    var initialValue = 0xFFFFFFFF;
    var finalXORValue = 0xFFFFFFFF;
    var table = [];
    var crc = initialValue;
    var i = 0;
    var j = 0;
    var c = 0;
    function reverse(x, n) {
        var b = 0;
        while (n) {
            b = b * 2 + x % 2;
            x /= 2;
            x -= x % 1;
            n--;
        }
        return b;
    }
    for (i = 255; i >= 0; i--) {
        c = reverse(i, 32);
        for (j = 0; j < 8; j++) {
            c = ((c * 2) ^ (((c >>> 31) % 2) * polynomial)) >>> 0;
        }
        table[i] = reverse(c, 32);
    }
    for (i = 0; i < buffer.length; i++) {
        c = buffer[i];
        if (c > 255) {
            throw new RangeError();
        }
        j = (crc % 256) ^ c;
        crc = ((crc / 256) ^ table[j]) >>> 0;
    }
    return (crc ^ finalXORValue) >>> 0;
}
exports.crc32c = crc32c;
/**
 * @value - Input CRC32 value
 * @description - Mask an input CRC32 value according to the TensorFlow TFRecords specs
 */
function maskCrc(value) {
    guard_1.default.null(value);
    var kCrc32MaskDelta = 0xa282ead8;
    var fourGb = Math.pow(2, 32);
    return (((value >>> 15) | (value << 17)) + kCrc32MaskDelta) % fourGb;
}
exports.maskCrc = maskCrc;
/**
 * @value - Input number value
 * @description - Get a Buffer representation of a Int64 bit value
 */
function getInt64Buffer(value) {
    guard_1.default.null(value);
    var metadataBuffer = new ArrayBuffer(8);
    var intArray = new Uint8Array(metadataBuffer, 0, 8);
    var dataView = new DataView(metadataBuffer, 0, 8);
    dataView.setUint32(4, 0, true);
    dataView.setUint32(0, value, true);
    return new Buffer(intArray);
}
exports.getInt64Buffer = getInt64Buffer;
/**
 * @value - Input number value
 * @description - Get a Buffer representation of a Int32 bit value
 */
function getInt32Buffer(value) {
    guard_1.default.null(value);
    var fourGb = Math.pow(2, 32);
    var value32 = value % fourGb;
    var metadataBuffer = new ArrayBuffer(4);
    var intArray = new Uint8Array(metadataBuffer, 0, 4);
    var dataView = new DataView(metadataBuffer, 0, 4);
    dataView.setUint32(0, value32, true);
    return new Buffer(intArray);
}
exports.getInt32Buffer = getInt32Buffer;
/**
 * @str - Input string
 * @description - Get a Uint8Array representation of an input string value
 */
function textEncode(str) {
    guard_1.default.null(str);
    var utf8 = unescape(encodeURIComponent(str));
    var result = new Uint8Array(utf8.length);
    for (var i = 0; i < utf8.length; i++) {
        result[i] = utf8.charCodeAt(i);
    }
    return result;
}
exports.textEncode = textEncode;
/**
 * @arr - Input Uint8Array byte array
 * @description - Get a UTF8 string value
 */
function textDecode(arr) {
    guard_1.default.null(arr);
    var utf8 = Array.from(arr).map(function (item) { return String.fromCharCode(item); }).join("");
    return decodeURIComponent(escape(utf8));
}
exports.textDecode = textDecode;
/**
 * @buffer - Input buffer
 * @description - Read an Int64 value from buffer
 */
function readInt64(buffer) {
    guard_1.default.null(buffer);
    guard_1.default.expression(buffer.length, function (num) { return num >= 8; });
    buffer = (0, buffer_reverse_1.default)(buffer.slice(0, 8));
    var int64 = new node_int64_1.default(buffer, 0);
    return int64.toNumber(true);
}
exports.readInt64 = readInt64;
