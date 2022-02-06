import React, { Component } from "react";
import styles from "./AttributeItem.module.css";

class AttributeItem extends Component {
  render() {
    return (
      <button
        disabled={this.props.onCart}
        key={this.props.item.id}
        id={this.props.item.id}
        className={`${styles.itemBox} ${
          this.props.clicked === this.props.item.id && styles.clicked
        }`}
        style={{
          backgroundColor:
            this.props.att.type === "swatch" ? this.props.item.value : "",
        }}
        onClick={(e) => {
          this.props.onAttributeSelect(this.props.item);
        }}
      >
        {this.props.att.type !== "swatch" ? this.props.item.displayValue : ""}
      </button>
    );
  }
}

export default AttributeItem;
