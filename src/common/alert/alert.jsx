import React from "react"
import { Button } from "reactstrap"
import MessageBox from "../messageBox/messageBox"

/**
 * @name - Alert
 * @description - Generic Alert dialog
 */
export default class Alert extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      params: null
    }

    this.messageBox = React.createRef()

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
  }

  render() {
    return (
      <MessageBox
        ref={this.messageBox}
        title={this.props.title}
        message={this.props.message}
        params={this.state.params}
        show={this.props.show}
      >
        <Button
          autoFocus={true}
          color={this.props.closeButtonColor || "primary"}
          onClick={this.onCloseClick}
        >
          {this.props.closeButtonText || "OK"}
        </Button>
      </MessageBox>
    )
  }

  /**
   * Open Alert dialog
   * @param params - Arguments to be set in state
   */
  open(...params) {
    this.setState({ params }, () => this.messageBox.current.open())
  }

  /**
   * Close Alert dialog
   */
  close() {
    this.messageBox.current.close()
  }

  onCloseClick() {
    if (this.props.onClose) {
      this.props.onClose.apply(null, this.state.params)
    }
  }
}
