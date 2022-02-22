import React, { Component } from "react";
import AttributeItem from "./AttributeItem";
import styles from "./AttributesList.module.css";

class AttributesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: null,
    };
  }
  attributeSelectHandler = (item) => {
    const { onAttributeChange } = this.props;
    this.setState(
      {
        isClicked: item.id,
      },
      () => onAttributeChange(this.props.att, item)
    );
  };
  render() {
    const { id, name, type } = this.props.att;
    return (
      <li key={id}>
        <label>{name}:</label>
        <div className={styles.itemContainer}>
          {this.props.att.items.map((item) => {
            return (
              <AttributeItem
                key={item.id}
                item={item}
                att={{ type: type, id: id }}
                clicked={this.state.isClicked}
                onAttributeSelect={this.attributeSelectHandler}
              />
            );
          })}
        </div>
      </li>
    );
  }
}

export default AttributesList;
