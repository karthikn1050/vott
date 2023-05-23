import React, { Fragment } from "react"
import { KeyboardBinding } from "../keyboardBinding/keyboardBinding"
import { KeyEventType } from "../keyboardManager/keyboardManager"

export class CustomVideoPlayerButton extends React.Component {
  render() {
    return (
      <Fragment>
        {this.props.accelerators && (
          <KeyboardBinding
            keyEventType={KeyEventType.KeyDown}
            displayName={this.props.tooltip}
            accelerators={this.props.accelerators}
            handler={this.props.onClick}
            icon={this.props.icon}
          />
        )}
        <button
          type="button"
          title={this.props.tooltip}
          className="video-react-control video-react-button"
          onClick={this.props.onClick}
        >
          {this.props.children}
        </button>
      </Fragment>
    )
  }
}
