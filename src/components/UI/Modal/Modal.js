import React, { Component } from "react";
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";
import ReactDOM from "react-dom";

class Modal extends Component {
  render() {
    const portalElement = document.getElementById("overlays");
    return (
      <>
        {ReactDOM.createPortal(
          <Backdrop onClick={this.props.onHideCart} currency={this.props.currency}/>,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay currency={this.props.currency}>{this.props.children}</ModalOverlay>,
          portalElement
        )}
      </>
    );
  }
}

export default Modal;
