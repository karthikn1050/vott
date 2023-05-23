import React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

/**
 * Generic modal that displays a message
 */
export default class MessageBox extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      isOpen: props.show,
      isRendered: props.show,
      isButtonSelected: false
    }

    this.toggle = this.toggle.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.onFooterClick = this.onFooterClick.bind(this)
    this.onClosed = this.onClosed.bind(this)
  }

  render() {
    if (!this.state.isRendered) {
      return null
    }

    return (
      <Modal
        className="messagebox-modal"
        isOpen={this.state.isOpen}
        onClosed={this.onClosed}
      >
        <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
        <ModalBody>{this.getMessage(this.props.message)}</ModalBody>
        {!this.props.hideFooter && (
          <ModalFooter onClick={this.onFooterClick}>
            {this.props.children}
          </ModalFooter>
        )}
      </Modal>
    )
  }

  open() {
    this.setState({
      isOpen: true,
      isRendered: true,
      isButtonSelected: false
    })
  }

  close() {
    this.setState(
      {
        isOpen: false
      },
      () => {
        if (!this.state.isButtonSelected && this.props.onCancel) {
          this.props.onCancel()
        }
      }
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.setState({
        isOpen: this.props.show,
        isRendered: this.props.show
      })
    }
  }

  getMessage = message => {
    if (typeof message === "function") {
      return message.apply(this, this.props.params)
    } else {
      return message
    }
  }

  onFooterClick(evt) {
    const htmlElement = evt.target
    if (htmlElement.tagName === "BUTTON") {
      this.setState(
        {
          isButtonSelected: true
        },
        () => {
          this.close()
          if (this.props.onButtonSelect) {
            this.props.onButtonSelect(htmlElement)
          }
        }
      )
    }
  }

  toggle() {
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  onClosed() {
    this.setState({
      isRendered: false
    })
  }
}
