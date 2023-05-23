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
exports.decryptProject = exports.encryptProject = exports.normalizeSlashes = exports.encodeFileURI = exports.createQueryString = exports.KeyCodes = exports.randomIntInRange = void 0;
var guard_1 = require("./guard");
var crypto_1 = require("./crypto");
/**
 * Generates a random integer in provided range
 * @param min Lower bound of random number generation - INCLUSIVE
 * @param max Upper bound of random number generation - EXCLUSIVE
 */
function randomIntInRange(min, max) {
    if (min > max) {
        throw new Error("min (".concat(min, ") can't be bigger than max (").concat(max, ")"));
    }
    if (min === max) {
        return min;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}
exports.randomIntInRange = randomIntInRange;
/**
 * Common key codes used throughout application
 */
exports.KeyCodes = {
    comma: 188,
    enter: 13,
    backspace: 8,
    ctrl: 17,
    shift: 16,
    tab: 9,
};
/**
 * Generates a query string from the key/values of a JSON object
 * @param object The json object
 * @returns A value representing a URL compatible query string
 */
function createQueryString(object) {
    guard_1.default.null(object);
    var parts = [];
    for (var _i = 0, _a = Object.getOwnPropertyNames(object); _i < _a.length; _i++) {
        var key = _a[_i];
        parts.push("".concat(key, "=").concat(encodeURIComponent(object[key])));
    }
    return parts.join("&");
}
exports.createQueryString = createQueryString;
function encodeFileURI(path, additionalEncodings) {
    // encodeURI() will not encode: ~!@#$&*()=:/,;?+'
    // extend it to support all of these except # and ?
    // all other non encoded characters are implicitly supported with no reason to encoding them
    var matchString = /(#|\?)/g;
    var encodings = {
        "\#": "%23",
        "\?": "%3F",
    };
    var encodedURI = "file:".concat(encodeURI(normalizeSlashes(path)));
    if (additionalEncodings) {
        return encodedURI.replace(matchString, function (match) { return encodings[match]; });
    }
    return encodedURI;
}
exports.encodeFileURI = encodeFileURI;
function normalizeSlashes(path) {
    return path.replace(/\\/g, "/");
}
exports.normalizeSlashes = normalizeSlashes;
/**
 * Encrypts sensitive settings for the specified project and returns the result
 * @param project The project to encrypt
 * @param securityToken The security token used to encrypt the project
 */
function encryptProject(project, securityToken) {
    var encrypted = __assign(__assign({}, project), { sourceConnection: __assign({}, project.sourceConnection), targetConnection: __assign({}, project.targetConnection), exportFormat: project.exportFormat ? __assign({}, project.exportFormat) : null });
    encrypted.sourceConnection.providerOptions =
        encryptProviderOptions(project.sourceConnection.providerOptions, securityToken.key);
    encrypted.targetConnection.providerOptions =
        encryptProviderOptions(project.targetConnection.providerOptions, securityToken.key);
    if (encrypted.exportFormat) {
        encrypted.exportFormat.providerOptions =
            encryptProviderOptions(project.exportFormat.providerOptions, securityToken.key);
    }
    return encrypted;
}
exports.encryptProject = encryptProject;
/**
 * Decrypts sensitive settings for the specified project and return the result
 * @param project The project to decrypt
 * @param securityToken The security token used to decrypt the project
 */
function decryptProject(project, securityToken) {
    var decrypted = __assign(__assign({}, project), { sourceConnection: __assign({}, project.sourceConnection), targetConnection: __assign({}, project.targetConnection), exportFormat: project.exportFormat ? __assign({}, project.exportFormat) : null });
    decrypted.sourceConnection.providerOptions =
        decryptProviderOptions(decrypted.sourceConnection.providerOptions, securityToken.key);
    decrypted.targetConnection.providerOptions =
        decryptProviderOptions(decrypted.targetConnection.providerOptions, securityToken.key);
    if (decrypted.exportFormat) {
        decrypted.exportFormat.providerOptions =
            decryptProviderOptions(decrypted.exportFormat.providerOptions, securityToken.key);
    }
    return decrypted;
}
exports.decryptProject = decryptProject;
function encryptProviderOptions(providerOptions, secret) {
    if (!providerOptions) {
        return null;
    }
    if (providerOptions.encrypted) {
        return providerOptions;
    }
    return {
        encrypted: (0, crypto_1.encryptObject)(providerOptions, secret),
    };
}
function decryptProviderOptions(providerOptions, secret) {
    var secureString = providerOptions;
    if (!(secureString && secureString.encrypted)) {
        return providerOptions;
    }
    return (0, crypto_1.decryptObject)(providerOptions.encrypted, secret);
}
