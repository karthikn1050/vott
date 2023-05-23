import React from "react"
import { GithubPicker, CirclePicker } from "react-color"

export class ColorPicker extends React.Component {
  pickerBackground = "#252526"

  render() {
    return this.props.show && this.GithubPicker()
  }

  onChange = color => {
    this.props.onEditColor(color.hex)
  }

  GithubPicker = () => {
    return (
      <div className="color-picker">
        <GithubPicker
          color={{ hex: this.props.color }}
          onChangeComplete={this.onChange}
          colors={this.props.colors}
          width={160}
          styles={{
            default: {
              card: {
                background: this.pickerBackground
              }
            }
          }}
          triangle={"hide"}
        />
      </div>
    )
  }

  CirclePicker = () => {
    return (
      <div className="circle-picker-container">
        <CirclePicker
          width={200}
          onChange={this.onChange}
          colors={this.props.colors}
          hex={this.props.color}
          circleSize={25}
        />
      </div>
    )
  }
}
