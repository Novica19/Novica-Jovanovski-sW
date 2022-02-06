import React, { Component } from "react";
import styles from "./Backdrop.module.css";
class Backdrop extends Component {
  render() {
    return <div className={styles.backdrop} onClick={this.props.onClick} />;
  }
}

export default Backdrop;
