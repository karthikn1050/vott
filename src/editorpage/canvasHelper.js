import shortid from "shortid"
import { Point2D } from "vott-ct/lib/js/CanvasTools/Core/Point2D"
import {
  RegionData,
  RegionDataType
} from "vott-ct/lib/js/CanvasTools/Core/RegionData"
import { Tag } from "vott-ct/lib/js/CanvasTools/Core/Tag"
import { TagsDescriptor } from "vott-ct/lib/js/CanvasTools/Core/TagsDescriptor"
import Guard from "../commons/guard"
import {
  RegionType,
  AppError,
  ErrorCode
} from "../models/applicationState"
import { strings } from "../commons/strings"

/**
 * Static functions to assist in operations within Canvas component
 */
export default class CanvasHelpers {
  static pasteMargin = 10

  /**
   * Adds tag to array if it does not contain the tag,
   * removes tag if already contained. Performs operations in place
   * @param tags Array of tags
   * @param tag Tag to toggle
   */
  static toggleTag(tags, tag) {
    const tagIndex = tags.findIndex(existingTag => existingTag === tag)
    if (tagIndex === -1) {
      // Tag isn't found within region tags, add it
      return [...tags, tag]
    } else {
      // Tag is within region tags, remove it
      return tags.filter(t => t !== tag)
    }
  }

  /**
   * Adds tag to tags if not contained
   * @param tags Existing tags array
   * @param tag Tag to be added if missing
   */
  static addIfMissing(tags, tag) {
    if (!tags.find(t => t === tag)) {
      return [...tags, tag]
    }
    return tags
  }

  /**
   * Adds all target tags if missing from tags
   * @param tags Existing tags array
   * @param newTags Tags to be added if not contained
   */
  static addAllIfMissing(tags, newTags) {
    let result = [...tags]
    for (const newTag of newTags) {
      result = CanvasHelpers.addIfMissing(result, newTag)
    }
    return result
  }

  /**
   * Removes tag from tags if contained
   * @param tags Existing tags array
   * @param tag Tag to be removed if contained in `tags`
   */
  static removeIfContained(tags, tag) {
    return tags.filter(t => t !== tag)
  }

  /**
   * Updates any IRegion in `regions` that has the same id as IRegion in `updates`
   * @param regions Original regions
   * @param updates Regions that are to be updated in `regions`
   */
  static updateRegions(regions, updates) {
    if (!regions || !updates || !updates.length) {
      return regions
    }
    const result = []
    for (const region of regions) {
      const update = updates.find(r => r.id === region.id)
      if (update) {
        result.push(update)
      } else {
        result.push(region)
      }
    }
    return result
  }

  /**
   * Get RegionData (CanvasTools) from IRegion
   * @param region IRegion from Canvas component
   */
  static getRegionData(region) {
    return new RegionData(
      region.boundingBox.left,
      region.boundingBox.top,
      region.boundingBox.width,
      region.boundingBox.height,
      region.points.map(point => new Point2D(point.x, point.y)),
      this.regionTypeToType(region.type)
    )
  }

  /**
   * Converts a canvas tools RegionData to VoTT IRegion
   * @param regionData The region data to convert
   * @param regionType The region type
   */
  static fromRegionData(regionData, regionType) {
    Guard.null(regionData)

    return {
      id: shortid.generate(),
      type: regionType,
      boundingBox: {
        left: regionData.x,
        top: regionData.y,
        width: regionData.width,
        height: regionData.height
      },
      points: regionData.points.map(point => new Point2D(point.x, point.y)),
      tags: []
    }
  }

  static isEmpty(regionData) {
    return regionData.area === 0 && regionData.x === 0 && regionData.y === 0
  }

  /**
   * Create TagsDescriptor (CanvasTools) from IRegion
   * @param region IRegion from Canvas
   */
  static getTagsDescriptor(projectTags, region) {
    if (!projectTags || !projectTags.length) {
      return null
    }
    Guard.null(region)

    const tags = region.tags
      .map(tagName => {
        const projectTag = projectTags.find(
          projectTag => projectTag.name === tagName
        )
        return projectTag ? new Tag(projectTag.name, projectTag.color) : null
      })
      .filter(tag => tag !== null)

    return new TagsDescriptor(tags)
  }

  /**
   * Gets RegionDataType (CanvasTools) from RegionType
   */
  static regionTypeToType = regionType => {
    let type
    switch (regionType) {
      case RegionType.Rectangle:
        type = RegionDataType.Rect
        break
      case RegionType.Polygon:
        type = RegionDataType.Polygon
        break
      case RegionType.Point:
        type = RegionDataType.Point
        break
      case RegionType.Polyline:
        type = RegionDataType.Polyline
        break
      default:
        break
    }
    return type
  }

  /**
   * Duplicates region with a new ID, and moves it to the next available location by intervals
   * of `CanvasHelpers.pasteMargin`.
   * @param regions Regions to duplicate
   * @param others Other regions existing in the asset (used to not put region on top of other region)
   */
  static duplicateRegionsAndMove = (regions, others, width, height) => {
    const result = []
    for (const region of regions) {
      const shiftCoordinates = CanvasHelpers.getShiftCoordinates(
        region.boundingBox,
        others,
        width,
        height
      )

      const newRegion = {
        ...region,
        id: shortid.generate(),
        boundingBox: CanvasHelpers.shiftBoundingBox(
          region.boundingBox,
          shiftCoordinates
        ),
        points: CanvasHelpers.shiftPoints(region.points, shiftCoordinates)
      }
      result.push(newRegion)
    }
    return result
  }

  static boundingBoxWithin = (boundingBox, width, height) => {
    return (
      boundingBox.left + boundingBox.width < width &&
      boundingBox.top + boundingBox.height < height
    )
  }

  static fromBoundingBox = boundingBox => {
    return [
      {
        x: boundingBox.left,
        y: boundingBox.top
      },
      {
        x: boundingBox.left + boundingBox.width,
        y: boundingBox.top
      },
      {
        x: boundingBox.left + boundingBox.width,
        y: boundingBox.top + boundingBox.height
      },
      {
        x: boundingBox.left,
        y: boundingBox.top + boundingBox.height
      }
    ]
  }

  static shiftBoundingBox = (boundingBox, shiftCoordinates) => {
    return {
      ...boundingBox,
      left: boundingBox.left + shiftCoordinates.x,
      top: boundingBox.top + shiftCoordinates.y
    }
  }

  static shiftPoints = (points, shiftCoordinates) => {
    return points.map(p => {
      return {
        x: p.x + shiftCoordinates.x,
        y: p.y + shiftCoordinates.y
      }
    })
  }

  static existsRegionAt = (regions, x, y) => {
    for (const region of regions) {
      if (region.boundingBox.left === x && region.boundingBox.top === y) {
        return true
      }
    }
    return false
  }

  static getShiftCoordinates = (boundingBox, otherRegions, width, height) => {
    let x = boundingBox.left
    let y = boundingBox.top

    let defaultTargetX = 0
    const defaultTargetY = 0

    if (boundingBox.height > height || boundingBox.width > width) {
      throw new AppError(
        ErrorCode.PasteRegionTooBig,
        strings.errors.pasteRegionTooBigError.message
      )
    }

    if (!CanvasHelpers.boundingBoxWithin(boundingBox, width, height)) {
      x = defaultTargetX
      y = defaultTargetY
    }

    let foundRegionAtTarget = false

    while (!foundRegionAtTarget) {
      if (CanvasHelpers.existsRegionAt(otherRegions, x, y)) {
        x += CanvasHelpers.pasteMargin
        y += CanvasHelpers.pasteMargin
        foundRegionAtTarget = false
      } else {
        const result = {
          x: x - boundingBox.left,
          y: y - boundingBox.top
        }
        const tempBoundingBox = {
          ...boundingBox,
          left: boundingBox.left + result.x,
          top: boundingBox.top + result.y
        }
        if (CanvasHelpers.boundingBoxWithin(tempBoundingBox, width, height)) {
          return result
        } else {
          x = defaultTargetX
          y = defaultTargetY
          if (
            CanvasHelpers.existsRegionAt(
              otherRegions,
              defaultTargetX,
              defaultTargetY
            )
          ) {
            defaultTargetX += CanvasHelpers.pasteMargin
          }
        }
      }
    }
  }
}
