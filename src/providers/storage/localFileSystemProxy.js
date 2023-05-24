import { IpcRendererProxy } from "../../commons/ipcRendererProxy"

const PROXY_NAME = "LocalFileSystem"

/**
 * Storage Provider for Local File System. Only available in Electron application
 * Leverages the IpcRendererProxy
 */
export class LocalFileSystemProxy {
  constructor(options) {
    this.options = options
    if (!this.options) {
      this.options = {
        folderPath: null,
        relativePath: false
      }
    }
  }

  /**
   * Select container for use in provider
   */
  selectContainer() {
    return IpcRendererProxy.send(`${PROXY_NAME}:selectContainer`)
  }

  /**
   * Read text from file
   * @param fileName - Name of file from which to read text
   */
  readText(fileName) {
    const filePath = [this.options.folderPath, fileName].join("/")
    return IpcRendererProxy.send(`${PROXY_NAME}:readText`, [filePath])
  }

  /**
   * Read buffer from file
   * @param fileName Name of file from which to read buffer
   */
  readBinary(fileName) {
    const filePath = [this.options.folderPath, fileName].join("/")
    return IpcRendererProxy.send(`${PROXY_NAME}:readBinary`, [filePath])
  }

  /**
   * Delete file
   * @param fileName Name of file to delete
   */
  deleteFile(fileName) {
    const filePath = [this.options.folderPath, fileName].join("/")
    return IpcRendererProxy.send(`${PROXY_NAME}:deleteFile`, [filePath])
  }

  /**
   * Write text to file
   * @param fileName Name of target file
   * @param contents Contents to be written
   */
  writeText(fileName, contents) {
    const filePath = [this.options.folderPath, fileName].join("/")
    return IpcRendererProxy.send(`${PROXY_NAME}:writeText`, [
      filePath,
      contents
    ])
  }

  /**
   * Write buffer to file
   * @param fileName Name of target file
   * @param contents Contents to be written
   */
  writeBinary(fileName, contents) {
    const filePath = [this.options.folderPath, fileName].join("/")
    return IpcRendererProxy.send(`${PROXY_NAME}:writeBinary`, [
      filePath,
      contents
    ])
  }

  /**
   * List files in directory
   * @param folderName - Name of folder from which to list files
   * @param ext - NOT CURRENTLY USED IN IMPLEMENTATION.
   */
  listFiles(folderName, ext) {
    const folderPath = folderName
      ? [this.options.folderPath, folderName].join("/")
      : this.options.folderPath
    return IpcRendererProxy.send(`${PROXY_NAME}:listFiles`, [folderPath])
  }

  /**
   * List directories inside another directory
   * @param folderName - Directory from which to list directories
   */
  listContainers(folderName) {
    const folderPath = folderName
      ? [this.options.folderPath, folderName].join("/")
      : this.options.folderPath
    return IpcRendererProxy.send(`${PROXY_NAME}:listContainers`, [folderPath])
  }

  /**
   * Create local directory
   * @param folderName - Name of directory to create
   */
  createContainer(folderName) {
    const folderPath = [this.options.folderPath, folderName].join("/")
    return IpcRendererProxy.send(`${PROXY_NAME}:createContainer`, [folderPath])
  }

  /**
   * Delete directory
   * @param folderName - Name of directory to delete
   */
  deleteContainer(folderName) {
    const folderPath = [this.options.folderPath, folderName].join("/")
    return IpcRendererProxy.send(`${PROXY_NAME}:deleteContainer`, [folderPath])
  }

  /**
   * Retrieve assets from directory
   * @param folderName - Directory containing assets
   */
  getAssets() {
    const { folderPath, relativePath } = this.options
    return IpcRendererProxy.send(`${PROXY_NAME}:getAssets`, [
      folderPath,
      relativePath
    ])
  }

  /**
   * Adds default properties to new connections
   *
   * Currently adds `relativePath: true` to the providerOptions. Pre-existing connections
   * will only use absolute path
   *
   * @param connection Connection
   */
  addDefaultPropsToNewConnection(connection) {
    return connection.id
      ? connection
      : {
          ...connection,
          providerOptions: {
            ...connection.providerOptions,
            relativePath: true
          }
        }
  }
}
