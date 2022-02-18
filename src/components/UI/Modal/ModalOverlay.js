import React, { Component } from 'react';
import styles from './ModalOverlay.module.css';

class ModalOverlay extends Component {
    render() {
        return (
            <div className={`${styles.modal} ${this.props.currency===true ? styles.currency : ''}`}>
              <div>{this.props.children}</div>
            </div>
          );
    }
}

export default ModalOverlay;