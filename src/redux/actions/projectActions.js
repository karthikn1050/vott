import ProjectService from "../../services/projectService"
import { ActionTypes } from "./actionTypes"
import { AssetService } from "../../services/assetService"
import { ExportProviderFactory } from "../../providers/export/exportProviderFactory"
import { AppError, ErrorCode } from "../../models/applicationState"
import { createAction, createPayloadAction } from "./actionCreators"
import { appInfo } from "../../common/appInfo"
import { strings } from "../../common/strings"

/**
 * Dispatches Load Project action and resolves with IProject
 * @param project - Project to load
 */
export function loadProject(project) {
  return async (dispatch, getState) => {
    const appState = getState()
    const projectService = new ProjectService()

    // Lookup security token used to decrypt project settings
    const projectToken = appState.appSettings.securityTokens.find(
      securityToken => securityToken.name === project.securityToken
    )

    if (project.useSecurityToken && !projectToken) {
      throw new AppError(
        ErrorCode.SecurityTokenNotFound,
        "Security Token Not Found"
      )
    }
    const loadedProject = await projectService.load(project, projectToken)

    dispatch(loadProjectAction(loadedProject))
    return loadedProject
  }
}

/**
 * Dispatches Save Project action and resolves with IProject
 * @param project - Project to save
 */
export function saveProject(project) {
  return async (dispatch, getState) => {
    const appState = getState()
    const projectService = new ProjectService()

    if (projectService.isDuplicate(project, appState.recentProjects)) {
      throw new AppError(
        ErrorCode.ProjectDuplicateName,
        `Project with name '${project.name}
                already exists with the same target connection '${project.targetConnection.name}'`
      )
    }

    const projectToken = appState.appSettings.securityTokens.find(
      securityToken => securityToken.name === project.securityToken
    )

    if (project.useSecurityToken && !projectToken) {
      throw new AppError(
        ErrorCode.SecurityTokenNotFound,
        "Security Token Not Found"
      )
    }

    const savedProject = await projectService.save(project, projectToken)
    dispatch(saveProjectAction(savedProject))

    // Reload project after save actions
    await loadProject(savedProject)(dispatch, getState)

    return savedProject
  }
}

/**
 * Dispatches Delete Project action and resolves with project
 * @param project - Project to delete
 */
export function deleteProject(project) {
  return async (dispatch, getState) => {
    const appState = getState()
    const projectService = new ProjectService()

    // Lookup security token used to decrypt project settings
    const projectToken = appState.appSettings.securityTokens.find(
      securityToken => securityToken.name === project.securityToken
    )

    if (project.useSecurityToken && !projectToken) {
      throw new AppError(
        ErrorCode.SecurityTokenNotFound,
        "Security Token Not Found"
      )
    }

    const decryptedProject = await projectService.load(project, projectToken)

    await projectService.delete(decryptedProject)
    dispatch(deleteProjectAction(decryptedProject))
  }
}

/**
 * Dispatches Close Project action
 */
export function closeProject() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLOSE_PROJECT_SUCCESS })
  }
}

/**
 * Gets assets from project, dispatches load assets action and returns assets
 * @param project - Project from which to load assets
 */
export function loadAssets(project) {
  return async dispatch => {
    const assetService = new AssetService(project)
    const assets = await assetService.getAssets()
    dispatch(loadProjectAssetsAction(assets))

    return assets
  }
}

/**
 * Load metadata from asset within project
 * @param project - Project from which to load asset metadata
 * @param asset - Asset from which to load metadata
 */
export function loadAssetMetadata(project, asset) {
  return async dispatch => {
    const assetService = new AssetService(project)
    const assetMetadata = await assetService.getAssetMetadata(asset)
    dispatch(loadAssetMetadataAction(assetMetadata))

    return { ...assetMetadata }
  }
}

/**
 * Save metadata from asset within project
 * @param project - Project from which to save asset metadata
 * @param assetMetadata - Metadata for asset within project
 */
export function saveAssetMetadata(project, assetMetadata) {
  const newAssetMetadata = { ...assetMetadata, version: appInfo.version }

  return async dispatch => {
    const assetService = new AssetService(project)
    const savedMetadata = await assetService.save(newAssetMetadata)
    dispatch(saveAssetMetadataAction(savedMetadata))

    return { ...savedMetadata }
  }
}

/**
 * Updates a project and all asset references from oldTagName to newTagName
 * @param project The project to update tags
 * @param oldTagName The old tag name
 * @param newTagName The new tag name
 */
export function updateProjectTag(project, oldTagName, newTagName) {
  return async (dispatch, getState) => {
    // Find tags to rename
    const assetService = new AssetService(project)
    const assetUpdates = await assetService.renameTag(oldTagName, newTagName)

    // Save updated assets
    await assetUpdates.forEachAsync(async assetMetadata => {
      await saveAssetMetadata(project, assetMetadata)(dispatch)
    })

    const currentProject = getState().currentProject
    const updatedProject = {
      ...currentProject,
      tags: project.tags.map(t =>
        t.name === oldTagName ? { ...t, name: newTagName } : t
      )
    }

    // Save updated project tags
    await saveProject(updatedProject)(dispatch, getState)
    dispatch(updateProjectTagAction(updatedProject))

    return assetUpdates
  }
}

/**
 * Updates a project and all asset references from oldTagName to newTagName
 * @param project The project to delete tags
 * @param tagName The tag to delete
 */
export function deleteProjectTag(project, tagName) {
  return async (dispatch, getState) => {
    // Find tags to rename
    const assetService = new AssetService(project)
    const assetUpdates = await assetService.deleteTag(tagName)

    // Save updated assets
    await assetUpdates.forEachAsync(async assetMetadata => {
      await saveAssetMetadata(project, assetMetadata)(dispatch)
    })

    const currentProject = getState().currentProject
    const updatedProject = {
      ...currentProject,
      tags: project.tags.filter(t => t.name !== tagName)
    }

    // Save updated project tags
    await saveProject(updatedProject)(dispatch, getState)
    dispatch(deleteProjectTagAction(updatedProject))

    return assetUpdates
  }
}

/**
 * Initialize export provider, get export data and dispatch export project action
 * @param project - Project to export
 */
export function exportProject(project) {
  return async dispatch => {
    if (!project.exportFormat) {
      throw new AppError(
        ErrorCode.ExportFormatNotFound,
        strings.errors.exportFormatNotFound.message
      )
    }

    if (project.exportFormat && project.exportFormat.providerType) {
      const exportProvider = ExportProviderFactory.create(
        project.exportFormat.providerType,
        project,
        project.exportFormat.providerOptions
      )

      const results = await exportProvider.export()
      dispatch(exportProjectAction(project))

      return results
    }
  }
}

/**
 * Instance of Load Project action
 */
export const loadProjectAction = createPayloadAction(
  ActionTypes.LOAD_PROJECT_SUCCESS
)
/**
 * Instance of Close Project action
 */
export const closeProjectAction = createAction(
  ActionTypes.CLOSE_PROJECT_SUCCESS
)
/**
 * Instance of Save Project action
 */
export const saveProjectAction = createPayloadAction(
  ActionTypes.SAVE_PROJECT_SUCCESS
)
/**
 * Instance of Delete Project action
 */
export const deleteProjectAction = createPayloadAction(
  ActionTypes.DELETE_PROJECT_SUCCESS
)
/**
 * Instance of Load Project Assets action
 */
export const loadProjectAssetsAction = createPayloadAction(
  ActionTypes.LOAD_PROJECT_ASSETS_SUCCESS
)
/**
 * Instance of Load Asset Metadata action
 */
export const loadAssetMetadataAction = createPayloadAction(
  ActionTypes.LOAD_ASSET_METADATA_SUCCESS
)
/**
 * Instance of Save Asset Metadata action
 */
export const saveAssetMetadataAction = createPayloadAction(
  ActionTypes.SAVE_ASSET_METADATA_SUCCESS
)
/**
 * Instance of Export Project action
 */
export const exportProjectAction = createPayloadAction(
  ActionTypes.EXPORT_PROJECT_SUCCESS
)
/**
 * Instance of Update project tag action
 */
export const updateProjectTagAction = createPayloadAction(
  ActionTypes.UPDATE_PROJECT_TAG_SUCCESS
)
/**
 * Instance of Delete project tag action
 */
export const deleteProjectTagAction = createPayloadAction(
  ActionTypes.DELETE_PROJECT_TAG_SUCCESS
)
