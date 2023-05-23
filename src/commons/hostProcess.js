import os from "os"

/**
 * @enum ELECTRON - Electron Host Process Type
 * @enum BROWSER - Browser Host Process Type
 */
export let HostProcessType;

;(function(HostProcessType) {
  HostProcessType[(HostProcessType["Electron"] = 1)] = "Electron"
  HostProcessType[(HostProcessType["Browser"] = 2)] = "Browser"
  HostProcessType[(HostProcessType["All"] = 3)] = "All"
})(HostProcessType || (HostProcessType = {}))

export let PlatformType

;(function(PlatformType) {
  PlatformType["Web"] = "web"
  PlatformType["Windows"] = "win32"
  PlatformType["Linux"] = "linux"
  PlatformType["MacOS"] = "darwin"
})(PlatformType || (PlatformType = {}))

function getHostProcess() {
  const osRelease = os.release().toLowerCase()
  let hostProcessType
  if (
    osRelease.indexOf("electron") > -1 ||
    process.env.HOST_TYPE === "electron"
  ) {
    hostProcessType = HostProcessType.Electron
  } else {
    hostProcessType = HostProcessType.Browser
  }

  return {
    release: osRelease,
    type: hostProcessType
  }
}

export function isElectron() {
  return getHostProcess().type === HostProcessType.Electron
}

export function isBrowser() {
  return getHostProcess().type === HostProcessType.Browser
}

export default getHostProcess
