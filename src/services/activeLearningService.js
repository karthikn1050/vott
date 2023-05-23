import { ModelPathType, AssetState } from "../models/applicationState"
import { ObjectDetection } from "../providers/activeLearning/objectDetection"
import Guard from "../commons/guard"
import { isElectron } from "../commons/hostProcess"
import { Env } from "../commons/environment"

export class ActiveLearningService {
  modelLoaded = false

  constructor(settings) {
    this.settings = settings
    Guard.null(settings)
    this.objectDetection = new ObjectDetection()
  }

  isModelLoaded() {
    return this.modelLoaded
  }

  async predictRegions(canvas, assetMetadata) {
    Guard.null(canvas)
    Guard.null(assetMetadata)

    // If the canvas or asset are invalid return asset metadata
    if (
      !(
        canvas.width &&
        canvas.height &&
        assetMetadata.asset &&
        assetMetadata.asset.size
      )
    ) {
      return assetMetadata
    }

    await this.ensureModelLoaded()

    const xRatio = assetMetadata.asset.size.width / canvas.width
    const yRatio = assetMetadata.asset.size.height / canvas.height
    const predictedRegions = await this.objectDetection.predictImage(
      canvas,
      this.settings.predictTag,
      xRatio,
      yRatio
    )

    const updatedRegions = [...assetMetadata.regions]
    predictedRegions.forEach(prediction => {
      const matchingRegion = updatedRegions.find(region => {
        return (
          region.boundingBox &&
          region.boundingBox.left === prediction.boundingBox.left &&
          region.boundingBox.top === prediction.boundingBox.top &&
          region.boundingBox.width === prediction.boundingBox.width &&
          region.boundingBox.height === prediction.boundingBox.height
        )
      })

      if (updatedRegions.length === 0 || !matchingRegion) {
        updatedRegions.push(prediction)
      }
    })

    return {
      ...assetMetadata,
      regions: updatedRegions,

      asset: {
        ...assetMetadata.asset,
        state:
          updatedRegions.length > 0 ? AssetState.Tagged : AssetState.Visited,
        predicted: true
      }
    }
  }

  async ensureModelLoaded() {
    if (this.modelLoaded) {
      return Promise.resolve()
    }

    await this.loadModel()
    this.modelLoaded = true
  }

  async loadModel() {
    let modelPath = ""
    if (this.settings.modelPathType === ModelPathType.Coco) {
      if (isElectron()) {
        const appPath = this.getAppPath()

        if (Env.get() !== "production") {
          modelPath = appPath + "/cocoSSDModel"
        } else {
          modelPath = appPath + "/../../cocoSSDModel"
        }
      } else {
        modelPath = "https://vott.blob.core.windows.net/coco-ssd-model"
      }
    } else if (this.settings.modelPathType === ModelPathType.File) {
      if (isElectron()) {
        modelPath = this.settings.modelPath
      }
    } else {
      modelPath = this.settings.modelUrl
    }

    await this.objectDetection.load(modelPath)
  }

  getAppPath = () => {
    const remote = window.require("electron").remote
    return remote.app.getAppPath()
  }
}
