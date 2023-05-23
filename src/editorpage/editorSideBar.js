import React from "react"
import { AutoSizer, List } from "react-virtualized"
import { AssetState } from "../models/applicationState"
import { AssetPreview } from "../common/assetPreview/assetPreview"
import { strings } from "../commons/strings"

/**
 * @name - Editor Side Bar
 * @description - Side bar for editor page
 */
export default class EditorSideBar extends React.Component {
  state = {
    scrollToIndex: this.props.selectedAsset
      ? this.props.assets.findIndex(
          asset => asset.id === this.props.selectedAsset.id
        )
      : 0
  }

  listRef = React.createRef()

  render() {
    return (
      <div className="editor-page-sidebar-nav">
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={this.listRef}
              className="asset-list"
              height={height}
              width={width}
              rowCount={this.props.assets.length}
              rowHeight={() => this.getRowHeight(width)}
              rowRenderer={this.rowRenderer}
              overscanRowCount={2}
              scrollToIndex={this.state.scrollToIndex}
            />
          )}
        </AutoSizer>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.thumbnailSize !== this.props.thumbnailSize) {
      this.listRef.current.recomputeRowHeights()
    }

    if (!prevProps.selectedAsset && !this.props.selectedAsset) {
      return
    }

    if (
      (!prevProps.selectedAsset && this.props.selectedAsset) ||
      prevProps.selectedAsset.id !== this.props.selectedAsset.id
    ) {
      this.selectAsset(this.props.selectedAsset)
    }
  }

  getRowHeight = width => {
    return width / (4 / 3) + 16
  }

  selectAsset = selectedAsset => {
    const scrollToIndex = this.props.assets.findIndex(
      asset => asset.id === selectedAsset.id
    )

    this.setState(
      {
        scrollToIndex
      },
      () => {
        this.listRef.current.forceUpdateGrid()
      }
    )
  }

  onAssetClicked = asset => {
    if (this.props.onBeforeAssetSelected) {
      if (!this.props.onBeforeAssetSelected()) {
        return
      }
    }

    this.selectAsset(asset)
    this.props.onAssetSelected(asset)
  }

  rowRenderer = ({ key, index, style }) => {
    const asset = this.props.assets[index]
    const selectedAsset = this.props.selectedAsset

    return (
      <div
        key={key}
        style={style}
        className={this.getAssetCssClassNames(asset, selectedAsset)}
        onClick={() => this.onAssetClicked(asset)}
      >
        <div className="asset-item-image">
          {this.renderBadges(asset)}
          <AssetPreview asset={asset} />
        </div>
        <div className="asset-item-metadata">
          <span className="asset-filename" title={asset.name}>
            {asset.name}
          </span>
          {asset.size && (
            <span>
              {asset.size.width} x {asset.size.height}
            </span>
          )}
        </div>
      </div>
    )
  }

  renderBadges = asset => {
    switch (asset.state) {
      case AssetState.Tagged:
        return (
          <span
            title={strings.editorPage.tagged}
            className="badge badge-tagged"
          >
            <i className="fas fa-tag"></i>
          </span>
        )
      case AssetState.Visited:
        return (
          <span
            title={strings.editorPage.visited}
            className="badge badge-visited"
          >
            <i className="fas fa-eye"></i>
          </span>
        )
      default:
        return null
    }
  }

  getAssetCssClassNames = (asset, selectedAsset = null) => {
    const cssClasses = ["asset-item"]
    if (selectedAsset && selectedAsset.id === asset.id) {
      cssClasses.push("selected")
    }

    return cssClasses.join(" ")
  }
}
