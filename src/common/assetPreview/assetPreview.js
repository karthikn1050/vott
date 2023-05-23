import React from "react"
import { AssetType } from "../../models/applicationState"
import { strings } from "../../commons/strings"
import { ImageAsset } from "./imageAsset"
import { VideoAsset } from "./videoAsset"
import { TFRecordAsset } from "./tfrecordAsset"

/**
 * @name - Asset Preview
 * @description - Small preview of assets for selection in editor page
 */
export class AssetPreview extends React.Component {
  /** Default properties for component if not defined */
  static defaultProps = {
    asset: null,
    childAssets: [],
    autoPlay: false,
    controlsEnabled: true
  }

  /** The internal state for the component */
  state = {
    loaded: false,
    hasError: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.asset.id !== prevProps.asset.id) {
      this.setState({
        loaded: false,
        hasError: false
      })

      if (this.props.onAssetChanged) {
        this.props.onAssetChanged(this.props.asset)
      }
    }
  }

  render() {
    const { loaded, hasError } = this.state
    const size = this.props.asset.size
    const classNames = ["asset-preview"]
    if (size) {
      if (size.width > size.height) {
        classNames.push("landscape")
      } else {
        classNames.push("portrait")
      }
    }

    return (
      <div className={classNames.join(" ")}>
        <div className="asset-preview-container">
          {!loaded && (
            <div className="asset-loading">
              <div className="asset-loading-spinner">
                <i className="fas fa-circle-notch fa-spin" />
              </div>
            </div>
          )}
          {hasError && (
            <div className="asset-error text-danger">
              <i className="fas fa-2x fa-exclamation-circle" />
              <p className="m-2">{strings.editorPage.assetError}</p>
            </div>
          )}
          {!hasError && this.renderAsset()}
        </div>
      </div>
    )
  }

  renderAsset = () => {
    const { asset, childAssets, autoPlay } = this.props
    const rootAsset = asset.parent || asset

    switch (asset.type) {
      case AssetType.Image:
        return (
          <ImageAsset
            asset={rootAsset}
            additionalSettings={this.props.additionalSettings}
            onLoaded={this.onAssetLoad}
            onError={this.onError}
            onActivated={this.props.onActivated}
            onDeactivated={this.props.onDeactivated}
          />
        )
      case AssetType.Video:
      case AssetType.VideoFrame:
        return (
          <VideoAsset
            asset={rootAsset}
            controlsEnabled={this.props.controlsEnabled}
            additionalSettings={this.props.additionalSettings}
            childAssets={childAssets}
            timestamp={asset.timestamp}
            autoPlay={autoPlay}
            onLoaded={this.onAssetLoad}
            onError={this.onError}
            onBeforeAssetChanged={this.props.onBeforeAssetChanged}
            onChildAssetSelected={this.onChildAssetSelected}
            onActivated={this.props.onActivated}
            onDeactivated={this.props.onDeactivated}
          />
        )
      case AssetType.TFRecord:
        return (
          <TFRecordAsset
            asset={asset}
            onLoaded={this.onAssetLoad}
            onError={this.onError}
            onActivated={this.props.onActivated}
            onDeactivated={this.props.onDeactivated}
          />
        )
      default:
        return (
          <div className="asset-error">{strings.editorPage.assetError}</div>
        )
    }
  }

  /**
   * Internal event handler for when the referenced asset has been loaded
   * @param contentSource The visual HTML element of the asset (img/video tag)
   */
  onAssetLoad = contentSource => {
    this.setState(
      {
        loaded: true
      },
      () => {
        if (this.props.onLoaded) {
          this.props.onLoaded(contentSource)
        }
      }
    )
  }

  onError = e => {
    this.setState(
      {
        hasError: true,
        loaded: true
      },
      () => {
        if (this.props.onError) {
          this.props.onError(e)
        }
      }
    )
  }

  onChildAssetSelected = asset => {
    if (this.props.onBeforeAssetChanged) {
      if (!this.props.onBeforeAssetChanged()) {
        return
      }
    }

    if (this.props.onChildAssetSelected) {
      this.props.onChildAssetSelected(asset)
    }

    if (this.props.onAssetChanged) {
      this.props.onAssetChanged(asset)
    }
  }
}
