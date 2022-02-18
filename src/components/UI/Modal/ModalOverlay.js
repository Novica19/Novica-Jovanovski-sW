import React, { Component } from "react";
import styles from "./ModalOverlay.module.css";

class ModalOverlay extends Component {
  render() {
    return (
      <div
        className={
          this.props.currency ? styles["modal__currency"] : styles["modal"]
        }
      >
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default ModalOverlay;