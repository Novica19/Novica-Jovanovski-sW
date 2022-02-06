import React, { Component } from "react";
import styles from "./DropDownList.module.css";
class DropDownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      headerTitle: this.props.title,
    };
  }
  toggleList = () => {
    this.setState((prevState) => ({
      isListOpen: !prevState.isListOpen,
    }));
  };


  selectItemHandler = (event,item) => {
    event.preventDefault();
    const { onSelectedCategory } = this.props;
    this.setState(
      {
        headerTitle: item.title,
        isListOpen: false,
      },
      () => onSelectedCategory(item.id)
    );
  };
 
  render() {
    return (
      <div className={styles.dropdown}>
        <div className={styles.title}>
          <div onClick={this.toggleList}>{this.state.headerTitle}</div>
        </div>
        {this.state.isListOpen && (
          <div className={styles.list}>
            {this.props.list.map((item) => (
              <button
                type="button"
                className={styles.item}
                key={item.id}
                onClick={(e) => this.selectItemHandler(e,item)}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default DropDownList;
