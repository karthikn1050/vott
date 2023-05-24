import * as shortid from "shortid"
import { Deferred } from "./deferred"

export class IpcRendererProxy {
  static pending = {}

  static initialize() {
    if (IpcRendererProxy.initialized) {
      return
    }

    IpcRendererProxy.ipcRenderer = window.require("electron").ipcRenderer
    IpcRendererProxy.ipcRenderer.on("ipc-renderer-proxy", (sender, message) => {
      const deferred = IpcRendererProxy.pending[message.id]

      if (!deferred) {
        throw new Error(`Cannot find deferred with id '${message.id}'`)
      }

      if (message.error) {
        deferred.reject(message.error)
      } else {
        deferred.resolve(message.result)
      }

      delete IpcRendererProxy.pending[message.id]
    })

    IpcRendererProxy.initialized = true
  }

  static send(type, args) {
    IpcRendererProxy.initialize()

    const id = shortid.generate()
    const deferred = new Deferred()
    IpcRendererProxy.pending[id] = deferred

    const outgoingArgs = {
      id,
      type,
      args
    }

    IpcRendererProxy.ipcRenderer.send("ipc-main-proxy", outgoingArgs)

    return deferred.promise
  }
  static initialized = false
}
