import React, { Component } from "react";
import AttributesList from "./AttributesList";
import styles from "./ProductDetails.module.css";
import CartContext from "../../../store/cart-context";

class ProductDetails extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: this.props.productData.image,
      selectedAttributes: [],
    };
  }
  centralPictureHandler = (img) => {
    this.setState({
      selectedImage: img,
    });
  };
  attributeSelectedHandler = (sentAtt, sentItem) => {
    let updatedAttributes = [...this.state.selectedAttributes];

    const existingAttributeIndex = this.state.selectedAttributes.findIndex(
      (att) => att.id === sentAtt.id
    );
    const existingAttribute =
      this.state.selectedAttributes[existingAttributeIndex];
    if (existingAttribute) {
      const updatedAttribute = {
        id: existingAttribute.id,
        selectedItem: sentItem,
        attributeItems: existingAttribute.items,
        type: existingAttribute.type,
      };
      updatedAttributes[existingAttributeIndex] = updatedAttribute;
    } else {
      const updatedAttribute = {
        id: sentAtt.id,
        selectedItem: sentItem,
        attibuteItems: sentAtt.items,
        type: sentAtt.type,
      };
      updatedAttributes = updatedAttributes.concat(updatedAttribute);
    }
    this.setState({
      selectedAttributes: updatedAttributes,
    });
  };
  addToCartHandler = () => {
    if (
      this.props.productData.attributes.length !==
      this.state.selectedAttributes.length
    ) {
      alert("PLEASE SELECT ALL ATTRIBUTES");
      return;
    } else {
      this.context.addItemToCart({
        id: this.props.productData.id,
        name: this.props.productData.name,
        brand: this.props.productData.brand,
        image: this.state.selectedImage,
        gallery:this.props.productData.gallery,
        price: this.props.productData.price,
        attributes: this.state.selectedAttributes,
        prices:this.props.productData.prices,
      });
    }
  };
  render() {
    const { brand, name, price, symbol, description, attributes, gallery } =
      this.props.productData;

    const imageList = gallery.map((image) => {
      return (
        <li
          key={image}
          className={styles.imageListItem}
          onClick={(e) => this.centralPictureHandler(image)}
        >
          <img src={image} alt={image} />
        </li>
      );
    });

    const displayDesc = description.replace(/(<([^>]+)>)/gi, "");

    const attributesList = attributes.map((att) => {
      return (
        <AttributesList
          key={att.id}
          att={att}
          onAttributeChange={this.attributeSelectedHandler}
        />
      );
    });
    return (
      <div className={styles.container}>
        <div className={styles.leftDiv}>
          <ul className={styles.imageList}>{imageList}</ul>
        </div>
        <div className={styles.centerDiv}>
          <img
            src={this.state.selectedImage}
            alt={this.state.selectedImage}
            className={styles.centeredImage}
          />
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.brand}>
            <h1>{brand}</h1>
            <h2>{name}</h2>
          </div>
          <div className={styles.attributes}>
            <ul>{attributesList}</ul>
          </div>
          <div className={styles.price}>
            <h2>Price:</h2>{" "}
            <div>
              <h3>
                {symbol} {price}
              </h3>
            </div>
          </div>
          <div className={styles.addToCart}>
            <button onClick={this.addToCartHandler}>ADD TO CART</button>
          </div>
          <div className={styles.description}>{displayDesc}</div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
