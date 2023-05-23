"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptObject = exports.decrypt = exports.encryptObject = exports.encrypt = exports.generateKey = void 0;
var crypto_js_1 = require("crypto-js");
var guard_1 = require("./guard");
/**
 * Generates a random base64 encoded key to be used for encryption
 * @param keySize The key size to use, defaults to 32bit
 */
function generateKey(keySize) {
    if (keySize === void 0) { keySize = 32; }
    return crypto_js_1.lib.WordArray.random(keySize).toString(crypto_js_1.enc.Base64);
}
exports.generateKey = generateKey;
/**
 * Encrypts the specified message with the provided key
 * @param message The message to encrypt
 * @param secret The base64 encoded secret
 */
function encrypt(message, secret) {
    guard_1.default.empty(message);
    guard_1.default.empty(secret);
    try {
        var secretBytes = crypto_js_1.enc.Base64.parse(secret);
        var iv = crypto_js_1.lib.WordArray.random(24);
        var encrypted = crypto_js_1.AES.encrypt(message, secretBytes, { iv: iv });
        var json = {
            ciphertext: encrypted.ciphertext.toString(),
            iv: iv.toString(),
        };
        var words = crypto_js_1.enc.Utf8.parse(JSON.stringify(json));
        return crypto_js_1.enc.Base64.stringify(words);
    }
    catch (e) {
        throw new Error("Error encrypting data - ".concat(e.message));
    }
}
exports.encrypt = encrypt;
/**
 * Encryptes a javascript object with the specified key
 * @param message - The javascript object to encrypt
 * @param secret - The secret to encrypt the message
 */
function encryptObject(message, secret) {
    guard_1.default.null(message);
    return encrypt(JSON.stringify(message), secret);
}
exports.encryptObject = encryptObject;
/**
 * Decrypts the specified message with the provided key
 * @param encodedMessage The base64 encoded encrypted data
 * @param secret The base64 encoded secret
 */
function decrypt(encodedMessage, secret) {
    guard_1.default.empty(encodedMessage);
    guard_1.default.empty(secret);
    try {
        var secretBytes = crypto_js_1.enc.Base64.parse(secret);
        var json = crypto_js_1.enc.Base64.parse(encodedMessage).toString(crypto_js_1.enc.Utf8);
        var params = JSON.parse(json);
        var iv = crypto_js_1.enc.Hex.parse(params.iv);
        var cipherParams = crypto_js_1.lib.CipherParams.create({
            ciphertext: crypto_js_1.enc.Hex.parse(params.ciphertext),
            iv: crypto_js_1.enc.Hex.parse(params.iv),
        });
        var decrypted = crypto_js_1.AES.decrypt(cipherParams, secretBytes, { iv: iv });
        return decrypted.toString(crypto_js_1.enc.Utf8);
    }
    catch (e) {
        throw new Error("Error decrypting data - ".concat(e.message));
    }
}
exports.decrypt = decrypt;
/**
 * Decryptes a javascript object with the specified key
 * @param message - The encrypted base64 encded message
 * @param secret - The secret to decrypt the message
 */
function decryptObject(encodedMessage, secret) {
    var json = decrypt(encodedMessage, secret);
    return JSON.parse(json);
}
exports.decryptObject = decryptObject;
