import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import SplitPane from "react-split-pane"
import { bindActionCreators } from "redux"
import { SelectionMode } from "vott-ct/lib/js/CanvasTools/Interface/ISelectorSettings"
import HtmlFileReader from "../commons/htmlFileReader"
import { strings } from "../commons/strings"

import { ToolbarItemFactory } from "../providers/toolbar/toolbarItemFactory"
import * as applicationActions from "../redux/actions/applicationActions"
import * as projectActions from "../redux/actions/projectActions"
import { ToolbarItemName } from "../registerToolbar"
import { AssetService } from "../services/assetService"
import { AssetPreview } from "../common/assetPreview/assetPreview"
import { KeyboardBinding } from "../common/keyboardBinding/keyboardBinding"
import { KeyEventType } from "../common/keyboardManager/keyboardManager"
import { TagInput } from "../common/tagInput/tagInput"
import Canvas from "./canvas"
import CanvasHelpers from "./canvasHelpers"
import "./editorPage.scss"
import EditorSideBar from "./editorSideBar"
import { EditorToolbar } from "./editorToolbar"
import Alert from "../common/alert/alert"
import Confirm from "../common/confirm/confirm"
import { ActiveLearningService } from "../services/activeLearningService"
import { toast } from "react-toastify"

function mapStateToProps(state) {
  return {
    recentProjects: state.recentProjects,
    project: state.currentProject,
    appSettings: state.appSettings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch),
    applicationActions: bindActionCreators(applicationActions, dispatch)
  }
}

/**
 * @name - Editor Page
 * @description - Page for adding/editing/removing tags to assets
 */
connect(mapStateToProps, mapDispatchToProps)
export default class EditorPage extends React.Component {
  state = {
    selectedTag: null,
    lockedTags: [],
    selectionMode: SelectionMode.RECT,
    assets: [],
    childAssets: [],
    editorMode: "RECT",
    additionalSettings: {
      videoSettings: this.props.project
        ? this.props.project.videoSettings
        : null,
      activeLearningSettings: this.props.project
        ? this.props.project.activeLearningSettings
        : null
    },
    thumbnailSize: this.props.appSettings.thumbnailSize || {
      width: 175,
      height: 155
    },
    isValid: true,
    showInvalidRegionWarning: false
  }

  activeLearningService = null
  loadingProjectAssets = false
  toolbarItems = ToolbarItemFactory.getToolbarItems()
  canvas = React.createRef()
  renameTagConfirm = React.createRef()
  deleteTagConfirm = React.createRef()

  async componentDidMount() {
    const projectId = this.props.match.params["projectId"]
    if (this.props.project) {
      await this.loadProjectAssets()
    } else if (projectId) {
      const project = this.props.recentProjects.find(
        project => project.id === projectId
      )
      await this.props.actions.loadProject(project)
    }

    this.activeLearningService = new ActiveLearningService(
      this.props.project.activeLearningSettings
    )
  }

  async componentDidUpdate(prevProps) {
    if (this.props.project && this.state.assets.length === 0) {
      await this.loadProjectAssets()
    }

    // Navigating directly to the page via URL (ie, http://vott/projects/a1b2c3dEf/edit) sets the default state
    // before props has been set, this updates the project and additional settings to be valid once props are
    // retrieved.
    if (this.props.project && !prevProps.project) {
      this.setState({
        additionalSettings: {
          videoSettings: this.props.project
            ? this.props.project.videoSettings
            : null,
          activeLearningSettings: this.props.project
            ? this.props.project.activeLearningSettings
            : null
        }
      })
    }

    if (
      this.props.project &&
      prevProps.project &&
      this.props.project.tags !== prevProps.project.tags
    ) {
      this.updateRootAssets()
    }
  }

  render() {
    const { project } = this.props
    const { assets, selectedAsset } = this.state
    const rootAssets = assets.filter(asset => !asset.parent)

    if (!project) {
      return <div>Loading...</div>
    }

    return (
      <div className="editor-page">
        {[...Array(10).keys()].map(index => {
          return (
            <KeyboardBinding
              displayName={strings.editorPage.tags.hotKey.apply}
              key={index}
              keyEventType={KeyEventType.KeyDown}
              accelerators={[`${index}`]}
              icon={"fa-tag"}
              handler={this.handleTagHotKey}
            />
          )
        })}
        {[...Array(10).keys()].map(index => {
          return (
            <KeyboardBinding
              displayName={strings.editorPage.tags.hotKey.lock}
              key={index}
              keyEventType={KeyEventType.KeyDown}
              accelerators={[`CmdOrCtrl+${index}`]}
              icon={"fa-lock"}
              handler={this.handleCtrlTagHotKey}
            />
          )
        })}
        <SplitPane
          split="vertical"
          defaultSize={this.state.thumbnailSize.width}
          minSize={100}
          maxSize={400}
          paneStyle={{ display: "flex" }}
          onChange={this.onSideBarResize}
          onDragFinished={this.onSideBarResizeComplete}
        >
          <div className="editor-page-sidebar bg-lighter-1">
            <EditorSideBar
              assets={rootAssets}
              selectedAsset={selectedAsset ? selectedAsset.asset : null}
              onBeforeAssetSelected={this.onBeforeAssetSelected}
              onAssetSelected={this.selectAsset}
              thumbnailSize={this.state.thumbnailSize}
            />
          </div>
          <div className="editor-page-content" onClick={this.onPageClick}>
            <div className="editor-page-content-main">
              <div className="editor-page-content-main-header">
                <EditorToolbar
                  project={this.props.project}
                  items={this.toolbarItems}
                  actions={this.props.actions}
                  onToolbarItemSelected={this.onToolbarItemSelected}
                />
              </div>
              <div className="editor-page-content-main-body">
                {selectedAsset && (
                  <Canvas
                    ref={this.canvas}
                    selectedAsset={this.state.selectedAsset}
                    onAssetMetadataChanged={this.onAssetMetadataChanged}
                    onCanvasRendered={this.onCanvasRendered}
                    onSelectedRegionsChanged={this.onSelectedRegionsChanged}
                    editorMode={this.state.editorMode}
                    selectionMode={this.state.selectionMode}
                    project={this.props.project}
                    lockedTags={this.state.lockedTags}
                  >
                    <AssetPreview
                      additionalSettings={this.state.additionalSettings}
                      autoPlay={true}
                      controlsEnabled={this.state.isValid}
                      onBeforeAssetChanged={this.onBeforeAssetSelected}
                      onChildAssetSelected={this.onChildAssetSelected}
                      asset={this.state.selectedAsset.asset}
                      childAssets={this.state.childAssets}
                    />
                  </Canvas>
                )}
              </div>
            </div>
            <div className="editor-page-right-sidebar">
              <TagInput
                tags={this.props.project.tags}
                lockedTags={this.state.lockedTags}
                selectedRegions={this.state.selectedRegions}
                onChange={this.onTagsChanged}
                onLockedTagsChange={this.onLockedTagsChanged}
                onTagClick={this.onTagClicked}
                onCtrlTagClick={this.onCtrlTagClicked}
                onTagRenamed={this.confirmTagRenamed}
                onTagDeleted={this.confirmTagDeleted}
              />
            </div>
            <Confirm
              title={strings.editorPage.tags.rename.title}
              ref={this.renameTagConfirm}
              message={strings.editorPage.tags.rename.confirmation}
              confirmButtonColor="danger"
              onConfirm={this.onTagRenamed}
            />
            <Confirm
              title={strings.editorPage.tags.delete.title}
              ref={this.deleteTagConfirm}
              message={strings.editorPage.tags.delete.confirmation}
              confirmButtonColor="danger"
              onConfirm={this.onTagDeleted}
            />
          </div>
        </SplitPane>
        <Alert
          show={this.state.showInvalidRegionWarning}
          title={strings.editorPage.messages.enforceTaggedRegions.title}
          // tslint:disable-next-line:max-line-length
          message={strings.editorPage.messages.enforceTaggedRegions.description}
          closeButtonColor="info"
          onClose={() => this.setState({ showInvalidRegionWarning: false })}
        />
      </div>
    )
  }

  onPageClick = () => {
    this.setState({
      selectedRegions: []
    })
  }

  /**
   * Called when the asset side bar is resized
   * @param newWidth The new sidebar width
   */
  onSideBarResize = newWidth => {
    this.setState(
      {
        thumbnailSize: {
          width: newWidth,
          height: newWidth / (4 / 3)
        }
      },
      () => this.canvas.current.forceResize()
    )
  }

  /**
   * Called when the asset sidebar has been completed
   */
  onSideBarResizeComplete = () => {
    const appSettings = {
      ...this.props.appSettings,
      thumbnailSize: this.state.thumbnailSize
    }

    this.props.applicationActions.saveAppSettings(appSettings)
  }

  /**
   * Called when a tag from footer is clicked
   * @param tag Tag clicked
   */
  onTagClicked = tag => {
    this.setState(
      {
        selectedTag: tag.name,
        lockedTags: []
      },
      () => this.canvas.current.applyTag(tag.name)
    )
  }

  /**
   * Open confirm dialog for tag renaming
   */
  confirmTagRenamed = (tagName, newTagName) => {
    this.renameTagConfirm.current.open(tagName, newTagName)
  }

  /**
   * Renames tag in assets and project, and saves files
   * @param tagName Name of tag to be renamed
   * @param newTagName New name of tag
   */
  onTagRenamed = async (tagName, newTagName) => {
    const assetUpdates = await this.props.actions.updateProjectTag(
      this.props.project,
      tagName,
      newTagName
    )
    const selectedAsset = assetUpdates.find(
      am => am.asset.id === this.state.selectedAsset.asset.id
    )

    if (selectedAsset) {
      if (selectedAsset) {
        this.setState({ selectedAsset })
      }
    }
  }

  /**
   * Open Confirm dialog for tag deletion
   */
  confirmTagDeleted = tagName => {
    this.deleteTagConfirm.current.open(tagName)
  }

  /**
   * Removes tag from assets and projects and saves files
   * @param tagName Name of tag to be deleted
   */
  onTagDeleted = async tagName => {
    const assetUpdates = await this.props.actions.deleteProjectTag(
      this.props.project,
      tagName
    )
    const selectedAsset = assetUpdates.find(
      am => am.asset.id === this.state.selectedAsset.asset.id
    )

    if (selectedAsset) {
      this.setState({ selectedAsset })
    }
  }

  onCtrlTagClicked = tag => {
    const locked = this.state.lockedTags
    this.setState(
      {
        selectedTag: tag.name,
        lockedTags: CanvasHelpers.toggleTag(locked, tag.name)
      },
      () => this.canvas.current.applyTag(tag.name)
    )
  }

  getTagFromKeyboardEvent = event => {
    let key = parseInt(event.key, 10)
    if (isNaN(key)) {
      try {
        key = parseInt(event.key.split("+")[1], 10)
      } catch (e) {
        return
      }
    }
    let index
    const tags = this.props.project.tags
    if (key === 0 && tags.length >= 10) {
      index = 9
    } else if (key < 10) {
      index = key - 1
    }
    if (index < tags.length) {
      return tags[index]
    }
    return null
  }

  /**
   * Listens for {number key} and calls `onTagClicked` with tag corresponding to that number
   * @param event KeyDown event
   */
  handleTagHotKey = event => {
    const tag = this.getTagFromKeyboardEvent(event)
    if (tag) {
      this.onTagClicked(tag)
    }
  }

  handleCtrlTagHotKey = event => {
    const tag = this.getTagFromKeyboardEvent(event)
    if (tag) {
      this.onCtrlTagClicked(tag)
    }
  }

  /**
   * Raised when a child asset is selected on the Asset Preview
   * ex) When a video is paused/seeked to on a video
   */
  onChildAssetSelected = async childAsset => {
    if (
      this.state.selectedAsset &&
      this.state.selectedAsset.asset.id !== childAsset.id
    ) {
      await this.selectAsset(childAsset)
    }
  }

  /**
   * Returns a value indicating whether the current asset is taggable
   */
  isTaggableAssetType = asset => {
    return asset.type !==0 && asset.type !== 2
  }

  /**
   * Raised when the selected asset has been changed.
   * This can either be a parent or child asset
   */
  onAssetMetadataChanged = async assetMetadata => {
    // If the asset contains any regions without tags, don't proceed.
    const regionsWithoutTags = assetMetadata.regions.filter(
      region => region.tags.length === 0
    )

    if (regionsWithoutTags.length > 0) {
      this.setState({ isValid: false })
      return
    }

    const initialState = assetMetadata.asset.state

    // The root asset can either be the actual asset being edited (ex: VideoFrame) or the top level / root
    // asset selected from the side bar (image/video).
    const rootAsset = { ...(assetMetadata.asset.parent || assetMetadata.asset) }

    if (this.isTaggableAssetType(assetMetadata.asset)) {
      assetMetadata.asset.state =
        assetMetadata.regions.length > 0
          ? 2
          : 1
    } else if (assetMetadata.asset.state === 0) {
      assetMetadata.asset.state = 1
    }

    // Update root asset if not already in the "Tagged" state
    // This is primarily used in the case where a Video Frame is being edited.
    // We want to ensure that in this case the root video asset state is accurately
    // updated to match that state of the asset.
    if (rootAsset.id === assetMetadata.asset.id) {
      rootAsset.state = assetMetadata.asset.state
    } else {
      const rootAssetMetadata = await this.props.actions.loadAssetMetadata(
        this.props.project,
        rootAsset
      )

      if (rootAssetMetadata.asset.state !== 2) {
        rootAssetMetadata.asset.state = assetMetadata.asset.state
        await this.props.actions.saveAssetMetadata(
          this.props.project,
          rootAssetMetadata
        )
      }

      rootAsset.state = rootAssetMetadata.asset.state
    }

    // Only update asset metadata if state changes or is different
    if (
      initialState !== assetMetadata.asset.state ||
      this.state.selectedAsset !== assetMetadata
    ) {
      await this.props.actions.saveAssetMetadata(
        this.props.project,
        assetMetadata
      )
    }

    await this.props.actions.saveProject(this.props.project)

    const assetService = new AssetService(this.props.project)
    const childAssets = assetService.getChildAssets(rootAsset)

    // Find and update the root asset in the internal state
    // This forces the root assets that are displayed in the sidebar to
    // accurately show their correct state (not-visited, visited or tagged)
    const assets = [...this.state.assets]
    const assetIndex = assets.findIndex(asset => asset.id === rootAsset.id)
    if (assetIndex > -1) {
      assets[assetIndex] = {
        ...rootAsset
      }
    }

    this.setState({ childAssets, assets, isValid: true })
  }

  /**
   * Raised when the asset binary has been painted onto the canvas tools rendering canvas
   */
  onCanvasRendered = async canvas => {
    // When active learning auto-detect is enabled
    // run predictions when asset changes
    if (
      this.props.project.activeLearningSettings.autoDetect &&
      !this.state.selectedAsset.asset.predicted
    ) {
      await this.predictRegions(canvas)
    }
  }

  onSelectedRegionsChanged = selectedRegions => {
    this.setState({ selectedRegions })
  }

  onTagsChanged = async tags => {
    const project = {
      ...this.props.project,
      tags
    }

    await this.props.actions.saveProject(project)
  }

  onLockedTagsChanged = lockedTags => {
    this.setState({ lockedTags })
  }

  onToolbarItemSelected = async toolbarItem => {
    switch (toolbarItem.props.name) {
      case ToolbarItemName.DrawRectangle:
        this.setState({
          selectionMode: SelectionMode.RECT,
          editorMode: "RECT"
        })
        break
      case ToolbarItemName.DrawPolygon:
        this.setState({
          selectionMode: SelectionMode.POLYGON,
          editorMode: "POLYGON"
        })
        break
      case ToolbarItemName.CopyRectangle:
        this.setState({
          selectionMode: SelectionMode.COPYRECT,
          editorMode: "COPYRECT"
        })
        break
      case ToolbarItemName.SelectCanvas:
        this.setState({
          selectionMode: SelectionMode.NONE,
          editorMode: "SELECT"
        })
        break
      case ToolbarItemName.PreviousAsset:
        await this.goToRootAsset(-1)
        break
      case ToolbarItemName.NextAsset:
        await this.goToRootAsset(1)
        break
      case ToolbarItemName.CopyRegions:
        this.canvas.current.copyRegions()
        break
      case ToolbarItemName.CutRegions:
        this.canvas.current.cutRegions()
        break
      case ToolbarItemName.PasteRegions:
        this.canvas.current.pasteRegions()
        break
      case ToolbarItemName.RemoveAllRegions:
        this.canvas.current.confirmRemoveAllRegions()
        break
      case ToolbarItemName.ActiveLearning:
        await this.predictRegions()
        break
    }
  }

  predictRegions = async canvas => {
    canvas = canvas || document.querySelector("canvas")
    if (!canvas) {
      return
    }

    // Load the configured ML model
    if (!this.activeLearningService.isModelLoaded()) {
      let toastId = null
      try {
        toastId = toast.info(strings.activeLearning.messages.loadingModel, {
          autoClose: false
        })
        await this.activeLearningService.ensureModelLoaded()
      } catch (e) {
        toast.error(strings.activeLearning.messages.errorLoadModel)
        return
      } finally {
        toast.dismiss(toastId)
      }
    }

    // Predict and add regions to current asset
    try {
      const updatedAssetMetadata = await this.activeLearningService.predictRegions(
        canvas,
        this.state.selectedAsset
      )

      await this.onAssetMetadataChanged(updatedAssetMetadata)
      this.setState({ selectedAsset: updatedAssetMetadata })
    } catch (e) {
      console.log(
       
        "Error predicting regions"
      )
    }
  }

  /**
   * Navigates to the previous / next root asset on the sidebar
   * @param direction Number specifying asset navigation
   */
  goToRootAsset = async direction => {
    const selectedRootAsset =
      this.state.selectedAsset.asset.parent || this.state.selectedAsset.asset
    const currentIndex = this.state.assets.findIndex(
      asset => asset.id === selectedRootAsset.id
    )

    if (direction > 0) {
      await this.selectAsset(
        this.state.assets[
          Math.min(this.state.assets.length - 1, currentIndex + 1)
        ]
      )
    } else {
      await this.selectAsset(this.state.assets[Math.max(0, currentIndex - 1)])
    }
  }

  onBeforeAssetSelected = () => {
    if (!this.state.isValid) {
      this.setState({ showInvalidRegionWarning: true })
    }

    return this.state.isValid
  }

  selectAsset = async asset => {
    // Nothing to do if we are already on the same asset.
    if (
      this.state.selectedAsset &&
      this.state.selectedAsset.asset.id === asset.id
    ) {
      return
    }

    if (!this.state.isValid) {
      this.setState({ showInvalidRegionWarning: true })
      return
    }

    const assetMetadata = await this.props.actions.loadAssetMetadata(
      this.props.project,
      asset
    )

    try {
      if (!assetMetadata.asset.size) {
        const assetProps = await HtmlFileReader.readAssetAttributes(asset)
        assetMetadata.asset.size = {
          width: assetProps.width,
          height: assetProps.height
        }
      }
    } catch (err) {
      console.warn("Error computing asset size")
    }

    this.setState(
      {
        selectedAsset: assetMetadata
      },
      async () => {
        await this.onAssetMetadataChanged(assetMetadata)
      }
    )
  }

  loadProjectAssets = async () => {
    if (this.loadingProjectAssets || this.state.assets.length > 0) {
      return
    }

    this.loadingProjectAssets = true

    // Get all root project assets
    const rootProjectAssets = _.values(this.props.project.assets).filter(
      asset => !asset.parent
    )

    // Get all root assets from source asset provider
    const sourceAssets = await this.props.actions.loadAssets(this.props.project)

    // Merge and uniquify
    const rootAssets = _(rootProjectAssets)
      .concat(sourceAssets)
      .uniqBy(asset => asset.id)
      .value()

    const lastVisited = rootAssets.find(
      asset => asset.id === this.props.project.lastVisitedAssetId
    )

    this.setState(
      {
        assets: rootAssets
      },
      async () => {
        if (rootAssets.length > 0) {
          await this.selectAsset(lastVisited ? lastVisited : rootAssets[0])
        }
        this.loadingProjectAssets = false
      }
    )
  }

  /**
   * Updates the root asset list from the project assets
   */
  updateRootAssets = () => {
    const updatedAssets = [...this.state.assets]
    updatedAssets.forEach(asset => {
      const projectAsset = this.props.project.assets[asset.id]
      if (projectAsset) {
        asset.state = projectAsset.state
      }
    })

    this.setState({ assets: updatedAssets })
  }
}
