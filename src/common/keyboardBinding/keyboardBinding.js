import { KeyboardContext } from "../keyboardManager/keyboardManager"
import React from "react"

export class KeyboardBinding extends React.Component {
  static contextType = KeyboardContext

  componentDidMount() {
    if (this.context && this.context.keyboard) {
      this.deregisterBinding = this.context.keyboard.registerBinding(this.props)
    } else {
      console.warn(
        "Keyboard Mananger context cannot be found - Keyboard binding has NOT been set."
      )
    }
  }

  componentWillUnmount() {
    if (this.deregisterBinding) {
      this.deregisterBinding()
    }
  }

  render() {
    return null
  }
}
