import React from "react"
import HtmlFileReader from "../../commons/htmlFileReader"
import { TFRecordsReader } from "../../providers/export/tensorFlowRecords/tensorFlowReader"
import { FeatureType } from "../../providers/export/tensorFlowRecords/tensorFlowBuilder"

/**
 * React component that displays an image from a TFRecord asset file
 */
export class TFRecordAsset extends React.Component {
  state = {
    tfRecordImage64: "",
    hasError: false
  }

  image = React.createRef()

  render() {
    return (
      <img
        ref={this.image}
        src={this.state.tfRecordImage64}
        onLoad={this.onLoad}
        onError={this.onError}
        crossOrigin="anonymous"
      />
    )
  }

  async componentDidMount() {
    await this.updateImage()
  }

  async componentDidUpdate(prevProps) {
    if (this.props.asset !== prevProps.asset) {
      await this.updateImage()
    }
  }

  updateImage = async () => {
    try {
      const base64ImageData = await this.getTFRecordBase64Image(
        this.props.asset
      )
      this.setState({
        tfRecordImage64: base64ImageData,
        hasError: !!!base64ImageData
      })
    } catch (e) {
      this.setState({
        hasError: true
      })

      this.onError(e)
    }
  }

  onLoad = () => {
    if (this.props.onLoaded) {
      this.props.onLoaded(this.image.current)
    }
    if (this.props.onActivated) {
      this.props.onActivated(this.image.current)
    }
    if (this.props.onDeactivated) {
      this.props.onDeactivated(this.image.current)
    }
  }

  onError = e => {
    if (
      this.props.onError &&
      (this.state.tfRecordImage64 || this.state.hasError)
    ) {
      this.props.onError(e)
    }
  }

  async getTFRecordBase64Image(asset) {
    const tfrecords = new Buffer(await HtmlFileReader.getAssetArray(asset))
    const reader = new TFRecordsReader(tfrecords)
    const buffer = reader.getFeature(0, "image/encoded", FeatureType.Binary)

    // Get Base64
    const image64 = btoa(
      buffer.reduce((data, byte) => data + String.fromCharCode(byte), "")
    )
    return "data:image;base64," + image64
  }
}
