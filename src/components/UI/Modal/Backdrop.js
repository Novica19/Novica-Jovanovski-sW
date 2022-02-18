import React, { Component } from "react";
import styles from "./Backdrop.module.css";
class Backdrop extends Component {
  render() {
    return (
      <div
        className={`${styles.backdrop} ${
          this.props.currency === true ? styles.currency : ""
        }`}
        onClick={this.props.onClick}
      />
    );
  }
}

export default Backdrop;
