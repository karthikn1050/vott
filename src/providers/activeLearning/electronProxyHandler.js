import { LocalFileSystemProxy } from "../storage/localFileSystemProxy"

export class ElectronProxyHandler {
  constructor(folderPath, relativePath) {
    const options = { folderPath, relativePath }
    this.provider = new LocalFileSystemProxy(options)
  }

  async load() {
    const modelJSON = JSON.parse(await this.provider.readText("/model.json"))

    const modelArtifacts = {
      modelTopology: modelJSON.modelTopology
    }

    if (modelJSON.weightsManifest != null) {
      const [weightSpecs, weightData] = await this.loadWeights(
        modelJSON.weightsManifest
      )
      modelArtifacts.weightSpecs = weightSpecs
      modelArtifacts.weightData = weightData
    }

    return modelArtifacts
  }

  async loadClasses() {
    const json = await this.provider.readText("/classes.json")
    return json ? JSON.parse(json) : null
  }

  async loadWeights(weightsManifest) {
    const buffers = []
    const weightSpecs = []

    for (const group of weightsManifest) {
      for (const shardName of group.paths) {
        const buffer = await this.provider.readBinary("/" + shardName)
        buffers.push(buffer)
      }
      weightSpecs.push(...group.weights)
    }

    return [weightSpecs, this.toArrayBuffer(buffers)]
  }

  /**
   * Convert a Buffer or an Array of Buffers to an ArrayBuffer.
   *
   * If the input is an Array of Buffers, they will be concatenated in the
   * specified order to form the output ArrayBuffer.
   */
  toArrayBuffer(buf) {
    if (Array.isArray(buf)) {
      // An Array of Buffers.
      let totalLength = 0
      for (const buffer of buf) {
        totalLength += buffer.length
      }

      const ab = new ArrayBuffer(totalLength)
      const view = new Uint8Array(ab)
      let pos = 0
      for (const buffer of buf) {
        pos += buffer.copy(view, pos)
      }
      return ab
    } else {
      // A single Buffer. Return a copy of the underlying ArrayBuffer slice.
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
    }
  }
}
