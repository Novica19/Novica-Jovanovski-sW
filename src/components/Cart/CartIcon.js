import React, { Component } from 'react';
import cartIcon from '../../assets/cartIcon.svg'

class CartIcon extends Component {
    render() {
        return (
           <img src={cartIcon} alt='cartIcon'/>
        );
    }
}

export default CartIcon;