"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPortraitBoundingBox = exports.createLandscapeBoundingBox = exports.createContentBoundingBox = void 0;
var guard_1 = require("./guard");
/**
 * Gets the current position of the specified content source
 * @param contentSource The HTML element to get position
 */
function createContentBoundingBox(contentSource) {
    guard_1.default.null(contentSource);
    var aspectRatio = null;
    if (contentSource instanceof HTMLVideoElement) {
        aspectRatio = contentSource.videoWidth / contentSource.videoHeight;
    }
    else if (contentSource instanceof HTMLImageElement) {
        aspectRatio = contentSource.naturalWidth / contentSource.naturalHeight;
    }
    else {
        aspectRatio = contentSource.width / contentSource.height;
    }
    var size = null;
    // Landscape = aspectRatio > 1
    // Portrait  = aspectRatio < 1
    if (aspectRatio >= 1) {
        size = {
            width: contentSource.offsetWidth,
            height: contentSource.offsetWidth / aspectRatio,
        };
        // Render as landscape except for when the calculated height
        // would be taller than the available area
        return size.height > contentSource.offsetHeight
            ? createPortraitBoundingBox(contentSource, aspectRatio)
            : createLandscapeBoundingBox(contentSource, aspectRatio);
    }
    else {
        size = {
            width: contentSource.offsetHeight * aspectRatio,
            height: contentSource.offsetHeight,
        };
        // Render as portrait except for when the calculated width
        // would be wider then the available area
        return size.width > contentSource.offsetWidth
            ? createLandscapeBoundingBox(contentSource, aspectRatio)
            : createPortraitBoundingBox(contentSource, aspectRatio);
    }
}
exports.createContentBoundingBox = createContentBoundingBox;
/**
 * Gets a landscape bounding box for the canvas element based on the content source and aspect ratio
 * Disregards generated bars from the browser
 * @param contentSource The HTML content element
 * @param aspectRatio The requested aspect ratio
 */
function createLandscapeBoundingBox(contentSource, aspectRatio) {
    guard_1.default.null(contentSource);
    var size = {
        width: contentSource.offsetWidth,
        height: contentSource.offsetWidth / aspectRatio,
    };
    return {
        width: size.width,
        height: size.height,
        left: contentSource.offsetLeft,
        top: contentSource.offsetTop + ((contentSource.offsetHeight - size.height) / 2),
    };
}
exports.createLandscapeBoundingBox = createLandscapeBoundingBox;
/**
 * Gets a portrait bounding box for the canvas element based on the content source and aspect ratio
 * Disregards generated bars from the browser
 * @param contentSource The HTML content element
 * @param aspectRatio The requested aspect ratio
 */
function createPortraitBoundingBox(contentSource, aspectRatio) {
    guard_1.default.null(contentSource);
    var size = {
        width: contentSource.offsetHeight * aspectRatio,
        height: contentSource.offsetHeight,
    };
    return {
        width: size.width,
        height: size.height,
        left: contentSource.offsetLeft + ((contentSource.offsetWidth - size.width) / 2),
        top: contentSource.offsetTop,
    };
}
exports.createPortraitBoundingBox = createPortraitBoundingBox;
