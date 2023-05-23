import { IpcRendererProxy } from "../../common/ipcRendererProxy"
import { ActionTypes } from "./actionTypes"
import { createPayloadAction, createAction } from "./actionCreators"
import { generateKey } from "../../common/crypto"

/**
 * Open or close dev tools
 * @param show - Dev tools is open
 */
export function toggleDevTools(show) {
  return dispatch => {
    return IpcRendererProxy.send("TOGGLE_DEV_TOOLS", show).then(() => {
      dispatch(toggleDevToolsAction(show))
    })
  }
}

/**
 * Reload application
 */
export function reloadApplication() {
  return dispatch => {
    return IpcRendererProxy.send("RELOAD_APP").then(() => {
      dispatch(refreshApplicationAction())
    })
  }
}

/**
 * Save app settings
 */
export function saveAppSettings(appSettings) {
  return dispatch => {
    dispatch(saveAppSettingsAction(appSettings))
    return Promise.resolve(appSettings)
  }
}

/**
 * Ensures that a valid security token is associated with the project, otherwise creates one
 * @param project The project to validate
 */
export function ensureSecurityToken(project) {
  return async (dispatch, getState) => {
    const appState = getState()
    let securityToken = appState.appSettings.securityTokens.find(
      st => st.name === project.securityToken
    )

    if (securityToken) {
      return appState.appSettings
    }

    securityToken = {
      name: `${project.name} Token`,
      key: generateKey()
    }

    const updatedAppSettings = {
      devToolsEnabled: appState.appSettings.devToolsEnabled,
      securityTokens: [...appState.appSettings.securityTokens, securityToken]
    }

    await this.saveAppSettings(updatedAppSettings)

    project.securityToken = securityToken.name
    dispatch(ensureSecurityTokenAction(updatedAppSettings))
    return updatedAppSettings
  }
}

/**
 * Instance of toggle dev tools action
 */
export const toggleDevToolsAction = createPayloadAction(
  ActionTypes.TOGGLE_DEV_TOOLS_SUCCESS
)
/**
 * Instance of refresh app action
 */
export const refreshApplicationAction = createAction(
  ActionTypes.REFRESH_APP_SUCCESS
)
/**
 * Instance of save app settings action
 */
export const saveAppSettingsAction = createPayloadAction(
  ActionTypes.SAVE_APP_SETTINGS_SUCCESS
)
/**
 * Instance of Export Project action
 */
export const ensureSecurityTokenAction = createPayloadAction(
  ActionTypes.ENSURE_SECURITY_TOKEN_SUCCESS
)
