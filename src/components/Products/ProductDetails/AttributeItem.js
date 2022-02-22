import React, { Component } from "react";
import styles from "./AttributeItem.module.css";

class AttributeItem extends Component {
  render() {
    const { id, displayValue, value } = this.props.item;
    const onCartModal = this.props.onCartModal ? "__OnCartModal" : "";
    const classes = `itemBox${onCartModal}`;
    return (
      <button
        disabled={this.props.onCart}
        key={id}
        id={id}
        className={`${styles[classes]} ${
          this.props.clicked === id && styles.clicked
        }`}
        style={{
          backgroundColor: this.props.att.type === "swatch" ? value : "",
        }}
        onClick={(e) => {
          this.props.onAttributeSelect(this.props.item);
        }}
      >
        {this.props.att.type !== "swatch" ? displayValue : ""}
      </button>
    );
  }
}

export default AttributeItem;
