import React from "react"
import { KeyboardRegistrationManager } from "./keyboardRegistrationManager"

/**
 * Types of Key events supported by registration manager
 */
export let KeyEventType

;(function(KeyEventType) {
  KeyEventType["KeyDown"] = "keydown"
  KeyEventType["KeyUp"] = "keyup"
  KeyEventType["KeyPress"] = "keypress"
})(KeyEventType || (KeyEventType = {}))

export const KeyboardContext = React.createContext(null)

export class KeyboardManager extends React.Component {
  static contextType = KeyboardContext

  state = {
    keyboard: new KeyboardRegistrationManager()
  }

  nonSupportedKeys = new Set(["Meta", "Ctrl", " Control", "Alt"])
  inputElementTypes = new Set(["input", "select", "textarea"])

  componentDidMount() {
    window.addEventListener(KeyEventType.KeyDown, this.onKeyboardEvent)
    window.addEventListener(KeyEventType.KeyUp, this.onKeyboardEvent)
    window.addEventListener(KeyEventType.KeyPress, this.onKeyboardEvent)
  }

  componentWillUnmount() {
    window.removeEventListener(KeyEventType.KeyDown, this.onKeyboardEvent)
    window.removeEventListener(KeyEventType.KeyUp, this.onKeyboardEvent)
    window.removeEventListener(KeyEventType.KeyPress, this.onKeyboardEvent)
  }

  render() {
    return (
      <KeyboardContext.Provider value={this.state}>
        {this.props.children}
      </KeyboardContext.Provider>
    )
  }

  getKeyParts(evt) {
    const keyParts = []
    if (evt.ctrlKey || evt.metaKey) {
      keyParts.push("CmdOrCtrl+")
    }
    if (evt.altKey) {
      keyParts.push("Alt+")
    }
    keyParts.push(evt.key)
    return keyParts.join("")
  }

  onKeyboardEvent = evt => {
    if (this.isDisabled() || this.nonSupportedKeys.has(evt.key)) {
      return
    }

    this.state.keyboard.invokeHandler(evt.type, this.getKeyParts(evt), evt)
  }

  isDisabled() {
    return (
      document.activeElement &&
      this.inputElementTypes.has(document.activeElement.tagName.toLowerCase())
    )
  }
}
