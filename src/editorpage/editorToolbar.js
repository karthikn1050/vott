import React from "react"
import _ from "lodash"
import { ToolbarItemType } from "../toolbar/toolbarItem"
import "./editorToolbar.scss"
import { ToolbarItemName } from "../registerToolbar"

/**
 * @name - Editor Toolbar
 * @description - Collection of buttons that perform actions in toolbar on editor page
 */
export class EditorToolbar extends React.Component {
  state = {
    selectedItem: ToolbarItemName.SelectCanvas
  }

  render() {
    const groups = _(this.props.items)
      .groupBy("config.group")
      .values()
      .value()

    return (
      <div className="btn-toolbar" role="toolbar">
        {groups.map((items, idx) => (
          <div key={idx} className="btn-group mr-2" role="group">
            {items.map(registration => {
              const toolbarItemProps = {
                ...registration.config,
                actions: this.props.actions,
                project: this.props.project,
                active: this.isComponentActive(
                  this.state.selectedItem,
                  registration
                ),
                onClick: this.onToolbarItemSelected
              }
              const ToolbarItem = registration.component

              return (
                <ToolbarItem
                  key={toolbarItemProps.name}
                  {...toolbarItemProps}
                />
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  onToolbarItemSelected = toolbarItem => {
    this.setState(
      {
        selectedItem: toolbarItem.props.name
      },
      () => {
        this.props.onToolbarItemSelected(toolbarItem)
      }
    )
  }

  isComponentActive(selected, componentRegistration) {
    return selected
      ? selected === componentRegistration.config.name &&
          componentRegistration.config.type === ToolbarItemType.State
      : false
  }
}
