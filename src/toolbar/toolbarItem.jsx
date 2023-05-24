import React, { Fragment } from "react"
import {
  KeyboardContext,
  KeyEventType
} from "../common/keyboardManager/keyboardManager"
import { KeyboardBinding } from "../common/keyboardBinding/keyboardBinding"

/**
 * Types of Toolbar items
 * @member Action - Toolbar item executes an action (export)
 * @member State - Toolbar item changes something about the state of the component (Draw Polygon)
 */
export let ToolbarItemType

;(function(ToolbarItemType) {
  ToolbarItemType[(ToolbarItemType["Action"] = 0)] = "Action"
  ToolbarItemType[(ToolbarItemType["State"] = 1)] = "State"
})(ToolbarItemType || (ToolbarItemType = {}))

/**
 * @name - Toolbar Item
 * @description - Controls for Editor Page Toolbar
 */
export class ToolbarItem extends React.Component {
  static contextType = KeyboardContext

  componentWillUnmount() {
    if (this.unregisterKeyboardHandler) {
      this.unregisterKeyboardHandler()
    }
  }

  render() {
    const className = [`toolbar-btn ${this.props.name}`]
    if (this.props.active) {
      className.push("active")
    }

    const accelerators = this.props.accelerators

    return (
      <Fragment>
        {accelerators && (
          <KeyboardBinding
            displayName={this.props.tooltip}
            accelerators={accelerators}
            handler={this.onClick}
            icon={this.props.icon}
            keyEventType={KeyEventType.KeyDown}
          />
        )}
        <button
          type="button"
          className={className.join(" ")}
          title={this.getTitle()}
          onClick={this.onClick}
        >
          <i className={"fas " + this.props.icon} />
        </button>
      </Fragment>
    )
  }

  getTitle = () => {
    return `${this.props.tooltip}${this.getShortcut()}`
  }

  getShortcut = () => {
    return ` (${this.consolidateKeyCasings(this.props.accelerators).join(
      ", "
    )})`
  }

  consolidateKeyCasings = accelerators => {
    const consolidated = []
    if (accelerators) {
      for (const a of accelerators) {
        if (
          !consolidated.find(item => item.toLowerCase() === a.toLowerCase())
        ) {
          consolidated.push(a)
        }
      }
    }
    return consolidated
  }

  onClick = e => {
    e.stopPropagation()

    if (this.onItemClick) {
      this.onItemClick()
    }
    this.props.onClick(this)
  }
}
