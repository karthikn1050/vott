import React from "react"
import { Button } from "reactstrap"
import MessageBox from "../messageBox/messageBox"

/**
 * @name - Confirm
 * @description - Dialog for confirming an action
 */
export default class Confirm extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      params: null
    }

    this.messageBox = React.createRef()

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.onConfirmClick = this.onConfirmClick.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)
  }

  render() {
    return (
      <MessageBox
        ref={this.messageBox}
        title={this.props.title}
        message={this.props.message}
        params={this.state.params}
        onCancel={this.onCancelClick}
      >
        <Button
          autoFocus={true}
          color={this.props.confirmButtonColor || "primary"}
          onClick={this.onConfirmClick}
        >
          {this.props.confirmButtonText || "Yes"}
        </Button>
        <Button
          color={this.props.cancelButtonColor || "secondary"}
          onClick={this.onCancelClick}
        >
          {this.props.cancelButtonText || "No"}
        </Button>
      </MessageBox>
    )
  }

  /**
   * Open Confirm Dialog
   * @param params - Array of parameters passed to onConfirm function
   */
  open(...params) {
    this.setState({ params }, () => this.messageBox.current.open())
  }

  /**
   * Close Confirm Dialog
   */
  close() {
    this.messageBox.current.close()
  }

  onConfirmClick() {
    this.props.onConfirm.apply(null, this.state.params)
  }

  onCancelClick() {
    if (this.props.onCancel) {
      this.props.onCancel.apply(null, this.state.params)
    }
  }
}
