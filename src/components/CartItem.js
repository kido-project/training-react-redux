import React, { Component } from 'react';
import * as Message from './../constants/Message';

class CartItem extends Component {
    render() {
        var { item } = this.props;
        return (
            <tr>
                <th scope="row">
                    <img src={ item.product.image }
                        alt="" className="img-fluid z-depth-0" />
                </th>
                <td>
                    <h5>
                        <strong>{ item.product.name }</strong>
                    </h5>
                </td>
                <td>{ item.product.price }$</td>
                <td className="center-on-small-only">
                    <span className="qty">{ item.quantity } </span>
                    <div className="btn-group radio-group" data-toggle="buttons">
                        <label 
                        onClick={ () => this.onUpdateProductInCart(item.product, -1) }
                        className="btn btn-sm btn-primary btn-rounded waves-effect waves-light">
                            <a>—</a>
                        </label>
                        <label 
                        onClick={ () => this.onUpdateProductInCart(item.product, 1) }
                        className="btn btn-sm btn-primary btn-rounded waves-effect waves-light">
                            <a>+</a>
                        </label>
                    </div>
                </td>
                <td>{ this.showSubTotal(item.product.price, item.quantity) }$</td>
                <td>
                    <button 
                    type="button"
                    className="btn btn-sm btn-primary waves-effect waves-light"
                    data-toggle="tooltip" 
                    data-placement="top"
                    title="" data-original-title="Remove item"
                    onClick= { () => this.onDeleteProductInCart(item.product)}>
                        X
                    </button>
                </td>
            </tr>
        );
    }

    showSubTotal = (price, quantity) => {
        if (price === 0 || quantity === 0) 
            return 0;
        return price * quantity;
    }
    onDeleteProductInCart = (product) => {
        this.props.onChangeMessage(Message.MSG_DELETE_PRODUCT_IN_CART_SUCCESS);
        this.props.onDeleteProductInCart(product);
    }
    onUpdateProductInCart = (product, quantity) => {
        this.props.onChangeMessage(Message.MSG_UPDATE_TO_CART_SUCCESS);
        this.props.onUpdateProductInCart(product, quantity);
    }
}

export default CartItem;
