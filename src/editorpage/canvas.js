import React, { Fragment } from "react"
import * as shortid from "shortid"
import { CanvasTools } from "vott-ct"
import { EditorMode, RegionType } from "../models/applicationState"
import CanvasHelpers from "./canvasHelper"
import Clipboard from "../commons/clipboard"
import Confirm from "../common/confirm/confirm"
import { strings } from "../commons/strings"
import { SelectionMode } from "vott-ct/lib/js/CanvasTools/Interface/ISelectorSettings"
import { Rect } from "vott-ct/lib/js/CanvasTools/Core/Rect"
import { createContentBoundingBox } from "../commons/layout"

export default class Canvas extends React.Component {
  static defaultProps = {
    selectionMode: SelectionMode.NONE,
    editorMode: EditorMode.Select,
    selectedAsset: null,
    project: null,
    lockedTags: []
  }

  state = {
    currentAsset: this.props.selectedAsset,
    contentSource: null,
    enabled: false
  }

  canvasZone = React.createRef()
  clearConfirm = React.createRef()

  template = new Rect(20, 20)

  componentDidMount = () => {
    const sz = document.getElementById("editor-zone")
    this.editor = new CanvasTools.Editor(sz)
    this.editor.autoResize = false
    this.editor.onSelectionEnd = this.onSelectionEnd
    this.editor.onRegionMoveEnd = this.onRegionMoveEnd
    this.editor.onRegionDelete = this.onRegionDelete
    this.editor.onRegionSelected = this.onRegionSelected
    this.editor.AS.setSelectionMode({ mode: this.props.selectionMode })

    window.addEventListener("resize", this.onWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize)
  }

  componentDidUpdate = async (prevProps, prevState) => {
    // Handles asset changing
    if (this.props.selectedAsset !== prevProps.selectedAsset) {
      this.setState({ currentAsset: this.props.selectedAsset })
    }

    // Handle selection mode changes
    if (this.props.selectionMode !== prevProps.selectionMode) {
      const options =
        this.props.selectionMode === SelectionMode.COPYRECT
          ? this.template
          : null
      this.editor.AS.setSelectionMode({
        mode: this.props.selectionMode,
        template: options
      })
    }

    const assetIdChanged =
      this.state.currentAsset.asset.id !== prevState.currentAsset.asset.id

    // When the selected asset has changed but is still the same asset id
    if (!assetIdChanged && this.state.currentAsset !== prevState.currentAsset) {
      this.refreshCanvasToolsRegions()
    }

    // When the project tags change re-apply tags to regions
    if (this.props.project.tags !== prevProps.project.tags) {
      this.updateCanvasToolsRegionTags()
    }

    // Handles when the canvas is enabled & disabled
    if (prevState.enabled !== this.state.enabled) {
      // When the canvas is ready to display
      if (this.state.enabled) {
        this.refreshCanvasToolsRegions()
        this.setContentSource(this.state.contentSource)
        this.editor.AS.setSelectionMode(this.props.selectionMode)
        this.editor.AS.enable()

        if (this.props.onSelectedRegionsChanged) {
          this.props.onSelectedRegionsChanged(this.getSelectedRegions())
        }
      } else {
        // When the canvas has been disabled
        this.editor.AS.disable()
        this.clearAllRegions()
        this.editor.AS.setSelectionMode(SelectionMode.NONE)
      }
    }
  }

  render = () => {
    const className = this.state.enabled ? "canvas-enabled" : "canvas-disabled"

    return (
      <Fragment>
        <Confirm
          title={strings.editorPage.canvas.removeAllRegions.title}
          ref={this.clearConfirm}
          message={strings.editorPage.canvas.removeAllRegions.confirmation}
          confirmButtonColor="danger"
          onConfirm={this.removeAllRegions}
        />
        <div
          id="ct-zone"
          ref={this.canvasZone}
          className={className}
          onClick={e => e.stopPropagation()}
        >
          <div id="selection-zone">
            <div id="editor-zone" className="full-size" />
          </div>
        </div>
        {this.renderChildren()}
      </Fragment>
    )
  }

  /**
   * Toggles tag on all selected regions
   * @param selectedTag Tag name
   */
  applyTag = tag => {
    const selectedRegions = this.getSelectedRegions()
    const lockedTags = this.props.lockedTags
    const lockedTagsEmpty = !lockedTags || !lockedTags.length
    const regionsEmpty = !selectedRegions || !selectedRegions.length
    if ((!tag && lockedTagsEmpty) || regionsEmpty) {
      return
    }
    let transformer
    if (lockedTagsEmpty) {
      // Tag selected while region(s) selected
      transformer = CanvasHelpers.toggleTag
    } else if (lockedTags.find(t => t === tag)) {
      // Tag added to locked tags while region(s) selected
      transformer = CanvasHelpers.addIfMissing
    } else {
      // Tag removed from locked tags while region(s) selected
      transformer = CanvasHelpers.removeIfContained
    }
    for (const selectedRegion of selectedRegions) {
      selectedRegion.tags = transformer(selectedRegion.tags, tag)
    }
    this.updateRegions(selectedRegions)
    if (this.props.onSelectedRegionsChanged) {
      this.props.onSelectedRegionsChanged(selectedRegions)
    }
  }

  copyRegions = async () => {
    await Clipboard.writeObject(this.getSelectedRegions())
  }

  cutRegions = async () => {
    const selectedRegions = this.getSelectedRegions()
    await Clipboard.writeObject(selectedRegions)
    this.deleteRegions(selectedRegions)
  }

  pasteRegions = async () => {
    const regionsToPaste = await Clipboard.readObject()
    const asset = this.state.currentAsset
    const duplicates = CanvasHelpers.duplicateRegionsAndMove(
      regionsToPaste,
      asset.regions,
      asset.asset.size.width,
      asset.asset.size.height
    )
    this.addRegions(duplicates)
  }

  confirmRemoveAllRegions = () => {
    this.clearConfirm.current.open()
  }

  getSelectedRegions = () => {
    const selectedRegions = this.editor.RM.getSelectedRegionsBounds().map(
      rb => rb.id
    )
    return this.state.currentAsset.regions.filter(r =>
      selectedRegions.find(id => r.id === id)
    )
  }

  updateCanvasToolsRegionTags = () => {
    for (const region of this.state.currentAsset.regions) {
      this.editor.RM.updateTagsById(
        region.id,
        CanvasHelpers.getTagsDescriptor(this.props.project.tags, region)
      )
    }
  }

  forceResize = () => {
    this.onWindowResize()
  }

  removeAllRegions = () => {
    const ids = this.state.currentAsset.regions.map(r => r.id)
    for (const id of ids) {
      this.editor.RM.deleteRegionById(id)
    }
    this.deleteRegionsFromAsset(this.state.currentAsset.regions)
  }

  addRegions = regions => {
    this.addRegionsToCanvasTools(regions)
    this.addRegionsToAsset(regions)
  }

  addRegionsToAsset = regions => {
    this.updateAssetRegions(this.state.currentAsset.regions.concat(regions))
  }

  addRegionsToCanvasTools = regions => {
    for (const region of regions) {
      const regionData = CanvasHelpers.getRegionData(region)
      const scaledRegionData = this.editor.scaleRegionToFrameSize(
        regionData,
        this.state.currentAsset.asset.size.width,
        this.state.currentAsset.asset.size.height
      )
      this.editor.RM.addRegion(
        region.id,
        scaledRegionData,
        CanvasHelpers.getTagsDescriptor(this.props.project.tags, region)
      )
    }
  }

  deleteRegions = regions => {
    this.deleteRegionsFromCanvasTools(regions)
    this.deleteRegionsFromAsset(regions)
  }

  deleteRegionsFromAsset = regions => {
    const filteredRegions = this.state.currentAsset.regions.filter(
      assetRegion => {
        return !regions.find(r => r.id === assetRegion.id)
      }
    )
    this.updateAssetRegions(filteredRegions)
  }

  deleteRegionsFromCanvasTools = regions => {
    for (const region of regions) {
      this.editor.RM.deleteRegionById(region.id)
    }
  }

  /**
   * Method that gets called when a new region is drawn
   * @param {RegionData} regionData the RegionData of created region
   * @returns {void}
   */
  onSelectionEnd = regionData => {
    if (CanvasHelpers.isEmpty(regionData)) {
      return
    }
    const id = shortid.generate()

    this.editor.RM.addRegion(id, regionData, null)

    this.template = new Rect(regionData.width, regionData.height)

    // RegionData not serializable so need to extract data
    const scaledRegionData = this.editor.scaleRegionToSourceSize(
      regionData,
      this.state.currentAsset.asset.size.width,
      this.state.currentAsset.asset.size.height
    )
    const lockedTags = this.props.lockedTags
    const newRegion = {
      id,
      type: this.editorModeToType(this.props.editorMode),
      tags: lockedTags || [],
      boundingBox: {
        height: scaledRegionData.height,
        width: scaledRegionData.width,
        left: scaledRegionData.x,
        top: scaledRegionData.y
      },
      points: scaledRegionData.points
    }
    if (lockedTags && lockedTags.length) {
      this.editor.RM.updateTagsById(
        id,
        CanvasHelpers.getTagsDescriptor(this.props.project.tags, newRegion)
      )
    }
    this.updateAssetRegions([...this.state.currentAsset.regions, newRegion])
    if (this.props.onSelectedRegionsChanged) {
      this.props.onSelectedRegionsChanged([newRegion])
    }
  }

  /**
   * Update regions within the current asset
   * @param regions
   * @param selectedRegions
   */
  updateAssetRegions = regions => {
    const currentAsset = {
      ...this.state.currentAsset,
      regions
    }
    this.setState(
      {
        currentAsset
      },
      () => {
        this.props.onAssetMetadataChanged(currentAsset)
      }
    )
  }

  /**
   * Method called when moving a region already in the editor
   * @param {string} id the id of the region that was moved
   * @param {RegionData} regionData the RegionData of moved region
   * @returns {void}
   */
  onRegionMoveEnd = (id, regionData) => {
    const currentRegions = this.state.currentAsset.regions
    const movedRegionIndex = currentRegions.findIndex(
      region => region.id === id
    )
    const movedRegion = currentRegions[movedRegionIndex]
    const scaledRegionData = this.editor.scaleRegionToSourceSize(
      regionData,
      this.state.currentAsset.asset.size.width,
      this.state.currentAsset.asset.size.height
    )

    if (movedRegion) {
      movedRegion.points = scaledRegionData.points
      movedRegion.boundingBox = {
        height: scaledRegionData.height,
        width: scaledRegionData.width,
        left: scaledRegionData.x,
        top: scaledRegionData.y
      }
    }

    currentRegions[movedRegionIndex] = movedRegion
    this.updateAssetRegions(currentRegions)
  }

  /**
   * Method called when deleting a region from the editor
   * @param {string} id the id of the deleted region
   * @returns {void}
   */
  onRegionDelete = id => {
    // Remove from Canvas Tools
    this.editor.RM.deleteRegionById(id)

    // Remove from project
    const currentRegions = this.state.currentAsset.regions
    const deletedRegionIndex = currentRegions.findIndex(
      region => region.id === id
    )
    currentRegions.splice(deletedRegionIndex, 1)

    this.updateAssetRegions(currentRegions)
    if (this.props.onSelectedRegionsChanged) {
      this.props.onSelectedRegionsChanged([])
    }
  }

  /**
   * Method called when deleting a region from the editor
   * @param {string} id the id of the selected region
   * @param {boolean} multiSelect boolean whether region was selected with multi selection
   * @returns {void}
   */
  onRegionSelected = (id, multiSelect) => {
    const selectedRegions = this.getSelectedRegions()
    if (this.props.onSelectedRegionsChanged) {
      this.props.onSelectedRegionsChanged(selectedRegions)
    }
    // Gets the scaled region data
    const selectedRegionsData = this.editor.RM.getSelectedRegionsBounds().find(
      region => region.id === id
    )

    if (selectedRegionsData) {
      this.template = new Rect(
        selectedRegionsData.width,
        selectedRegionsData.height
      )
    }

    if (this.props.lockedTags && this.props.lockedTags.length) {
      for (const selectedRegion of selectedRegions) {
        selectedRegion.tags = CanvasHelpers.addAllIfMissing(
          selectedRegion.tags,
          this.props.lockedTags
        )
      }
      this.updateRegions(selectedRegions)
    }
  }

  renderChildren = () => {
    return React.cloneElement(this.props.children, {
      onAssetChanged: this.onAssetChanged,
      onLoaded: this.onAssetLoaded,
      onError: this.onAssetError,
      onActivated: this.onAssetActivated,
      onDeactivated: this.onAssetDeactivated
    })
  }

  /**
   * Raised when the asset bound to the asset preview has changed
   */
  onAssetChanged = () => {
    this.setState({ enabled: false })
  }

  /**
   * Raised when the underlying asset has completed loading
   */
  onAssetLoaded = contentSource => {
    this.setState({ contentSource })
    this.positionCanvas(contentSource)
  }

  onAssetError = () => {
    this.setState({
      enabled: false
    })
  }

  /**
   * Raised when the asset is taking control over the rendering
   */
  onAssetActivated = () => {
    this.setState({ enabled: false })
  }

  /**
   * Raise when the asset is handing off control of rendering
   */
  onAssetDeactivated = contentSource => {
    this.setState({
      contentSource,
      enabled: true
    })
  }

  /**
   * Set the loaded asset content source into the canvas tools canvas
   */
  setContentSource = async contentSource => {
    try {
      await this.editor.addContentSource(contentSource)

      if (this.props.onCanvasRendered) {
        const canvas = this.canvasZone.current.querySelector("canvas")
        this.props.onCanvasRendered(canvas)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  /**
   * Positions the canvas tools drawing surface to be exactly over the asset content
   */
  positionCanvas = contentSource => {
    if (!contentSource) {
      return
    }

    const canvas = this.canvasZone.current
    if (canvas) {
      const boundingBox = createContentBoundingBox(contentSource)
      canvas.style.top = `${boundingBox.top}px`
      canvas.style.left = `${boundingBox.left}px`
      canvas.style.width = `${boundingBox.width}px`
      canvas.style.height = `${boundingBox.height}px`
      this.editor.resize(boundingBox.width, boundingBox.height)
    }
  }

  /**
   * Resizes and re-renders the canvas when the application window size changes
   */
  onWindowResize = async () => {
    if (!this.state.contentSource) {
      return
    }

    this.positionCanvas(this.state.contentSource)
  }

  /**
   * Updates regions in both Canvas Tools and the asset data store
   * @param updates Regions to be updated
   * @param updatedSelectedRegions Selected regions with any changes already applied
   */
  updateRegions = updates => {
    const updatedRegions = CanvasHelpers.updateRegions(
      this.state.currentAsset.regions,
      updates
    )
    for (const update of updates) {
      this.editor.RM.updateTagsById(
        update.id,
        CanvasHelpers.getTagsDescriptor(this.props.project.tags, update)
      )
    }
    this.updateAssetRegions(updatedRegions)
    this.updateCanvasToolsRegionTags()
  }

  /**
   * Updates the background of the canvas and draws the asset's regions
   */
  clearAllRegions = () => {
    this.editor.RM.deleteAllRegions()
  }

  refreshCanvasToolsRegions = () => {
    this.clearAllRegions()

    if (
      !this.state.currentAsset.regions ||
      this.state.currentAsset.regions.length === 0
    ) {
      return
    }

    // Add regions to the canvas
    this.state.currentAsset.regions.forEach(region => {
      const loadedRegionData = CanvasHelpers.getRegionData(region)
      this.editor.RM.addRegion(
        region.id,
        this.editor.scaleRegionToFrameSize(
          loadedRegionData,
          this.state.currentAsset.asset.size.width,
          this.state.currentAsset.asset.size.height
        ),
        CanvasHelpers.getTagsDescriptor(this.props.project.tags, region)
      )
    })
  }

  editorModeToType = editorMode => {
    let type
    switch (editorMode) {
      case EditorMode.CopyRect:
      case EditorMode.Rectangle:
        type = RegionType.Rectangle
        break
      case EditorMode.Polygon:
        type = RegionType.Polygon
        break
      case EditorMode.Point:
        type = RegionType.Point
        break
      case EditorMode.Polyline:
        type = RegionType.Polyline
        break
      default:
        break
    }
    return type
  }
}
