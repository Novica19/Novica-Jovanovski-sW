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
          <Backdrop onClick={this.props.onHideCart} />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay>{this.props.children}</ModalOverlay>,
          portalElement
        )}
      </>
    );
  }
}

export default Modal;
