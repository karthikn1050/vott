import React from "react"
import { strings } from "../../commons/strings"
import "./tagInput.scss"

export default class TagInputToolbar extends React.Component {
  render() {
    return (
      <div className="tag-input-toolbar">
        {this.getToolbarItems().map(itemConfig => (
          <div
            key={itemConfig.displayName}
            className={`tag-input-toolbar-item ${itemConfig.className}`}
            onClick={e => this.onToolbarItemClick(e, itemConfig)}
          >
            <i className={`tag-input-toolbar-icon fas ${itemConfig.icon}`} />
          </div>
        ))}
      </div>
    )
  }

  onToolbarItemClick = (e, itemConfig) => {
    e.stopPropagation()
    itemConfig.handler()
  }

  getToolbarItems = () => {
    return [
      {
        displayName: strings.tags.toolbar.add,
        className: "plus",
        icon: "fa-plus-circle",
        handler: this.handleAdd
      },
      {
        displayName: strings.tags.toolbar.search,
        className: "search",
        icon: "fa-search",
        handler: this.handleSearch
      },
      {
        displayName: strings.tags.toolbar.lock,
        className: "lock",
        icon: "fa-lock",
        handler: this.handleLock
      },
      {
        displayName: strings.tags.toolbar.edit,
        className: "edit",
        icon: "fa-edit",
        handler: this.handleEdit
      },
      {
        displayName: strings.tags.toolbar.moveUp,
        className: "up",
        icon: "fa-arrow-circle-up",
        handler: this.handleArrowUp
      },
      {
        displayName: strings.tags.toolbar.moveDown,
        className: "down",
        icon: "fa-arrow-circle-down",
        handler: this.handleArrowDown
      },
      {
        displayName: strings.tags.toolbar.delete,
        className: "delete",
        icon: "fa-trash",
        handler: this.handleDelete
      }
    ]
  }

  handleAdd = () => {
    this.props.onAddTags()
  }

  handleSearch = () => {
    this.props.onSearchTags()
  }

  handleLock = () => {
    this.props.onLockTag(this.props.selectedTag)
  }

  handleEdit = () => {
    this.props.onEditTag(this.props.selectedTag)
  }

  handleArrowUp = () => {
    this.props.onReorder(this.props.selectedTag, -1)
  }

  handleArrowDown = () => {
    this.props.onReorder(this.props.selectedTag, 1)
  }

  handleDelete = () => {
    this.props.onDelete(this.props.selectedTag)
  }
}
