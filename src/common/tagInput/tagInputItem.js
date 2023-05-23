import React from "react"

export let TagEditMode

;(function(TagEditMode) {
  TagEditMode["Color"] = "color"
  TagEditMode["Name"] = "name"
})(TagEditMode || (TagEditMode = {}))

export default class TagInputItem extends React.Component {
  state = {
    isBeingEdited: false,
    isLocked: false,
    tagEditMode: null
  }

  render() {
    const style = {
      background: this.props.tag.color
    }
    return (
      <div className={"tag-item-block"}>
        {this.props.tag && (
          <li className={this.getItemClassName()} style={style}>
            <div className={`tag-color`} onClick={this.onColorClick}></div>
            <div className={"tag-content"} onClick={this.onNameClick}>
              {this.getTagContent()}
            </div>
            {this.state.isLocked && <div></div>}
          </li>
        )}
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isBeingEdited !== this.props.isBeingEdited) {
      this.setState({
        isBeingEdited: this.props.isBeingEdited
      })
    }

    if (prevProps.isLocked !== this.props.isLocked) {
      this.setState({
        isLocked: this.props.isLocked
      })
    }
  }

  onColorClick = e => {
    e.stopPropagation()

    const ctrlKey = e.ctrlKey || e.metaKey
    const altKey = e.altKey
    this.setState(
      {
        tagEditMode: TagEditMode.Color
      },
      () =>
        this.props.onClick(this.props.tag, {
          ctrlKey,
          altKey,
          clickedColor: true
        })
    )
  }

  onNameClick = e => {
    e.stopPropagation()

    const ctrlKey = e.ctrlKey || e.metaKey
    const altKey = e.altKey
    this.setState(
      {
        tagEditMode: TagEditMode.Name
      },
      () => this.props.onClick(this.props.tag, { ctrlKey, altKey })
    )
  }

  getItemClassName = () => {
    const classNames = ["tag-item"]
    if (this.props.isSelected) {
      classNames.push("tag-item-selected")
    }
    if (this.props.appliedToSelectedRegions) {
      classNames.push("tag-item-applied")
    }
    return classNames.join(" ")
  }

  getTagContent = () => {
    const displayIndex = this.getDisplayIndex()
    return (
      <div className={"tag-name-container"}>
        <div className="tag-name-body">
          {this.state.isBeingEdited &&
          this.state.tagEditMode === TagEditMode.Name ? (
            <input
              className={`tag-name-editor ${this.getContentClassName()}`}
              type="text"
              defaultValue={this.props.tag.name}
              onKeyDown={e => this.handleNameEdit(e)}
              autoFocus={true}
            />
          ) : (
            <span
              title={this.props.tag.name}
              className={this.getContentClassName()}
            >
              {this.props.tag.name}
            </span>
          )}
        </div>
        <div className="tag-lock-icon">
          {this.props.isLocked && <i className="fas fa-lock" />}
        </div>
        <div className={"tag-index"}>
          {displayIndex !== null && <span>[{displayIndex}]</span>}
        </div>
      </div>
    )
  }

  handleNameEdit = e => {
    if (e.key === "Enter") {
      const newTagName = e.target.value
      this.props.onChange(this.props.tag, {
        ...this.props.tag,
        name: newTagName
      })
    } else if (e.key === "Escape") {
      this.setState({
        isBeingEdited: false
      })
    }
  }

  getContentClassName = () => {
    const classNames = ["tag-name-text px-2"]
    if (
      this.state.isBeingEdited &&
      this.state.tagEditMode === TagEditMode.Color
    ) {
      classNames.push(" tag-color-edit")
    }
    return classNames.join(" ")
  }

  getDisplayIndex = () => {
    const index = this.props.index
    const displayIndex = index === 9 ? 0 : index + 1
    return displayIndex < 10 ? displayIndex : null
  }
}
