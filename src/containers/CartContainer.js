import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import Cart from '../components/Cart';
import CartItem from '../components/CartItem';
import * as Message from './../constants/Message';
import CartResult from '../components/CartResult';
import { addToCart, deleteProductInCart, changeMessage } from './../actions/index';

class CartContainer extends Component {
    render() {
        var { cart } = this.props;
        return (
            <Cart>
            { this.showCartItem(cart) }
            { this.showTotalAmount(cart) }
            </Cart>
        );
    }

    showCartItem = (cart) => {
        var result = Message.MSG_CART_EMPTY;
        var { onDeleteProductInCart, onUpdateProductInCart , onChangeMessage } = this.props;

        if(cart.length > 0) {
            result = cart.map((item, index) => {
                return <CartItem 
                key={ index }
                item={ item }
                onDeleteProductInCart={ onDeleteProductInCart }
                onUpdateProductInCart= { onUpdateProductInCart }
                onChangeMessage= { onChangeMessage }
                />
            });
        }
        return result;
    }

    showTotalAmount = (cart) => {
        if(cart.length > 0) {
            return <CartResult cart={cart}/>
        }
    }
}

CartContainer.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            product: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                inventory: PropTypes.number.isRequired,
                rating: PropTypes.number.isRequired,
            }).isRequired,
            quantity: PropTypes.number.isRequired
        })
    ).isRequired,
    onChangeMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteProductInCart: (product) => {
            dispatch(deleteProductInCart(product));
        },
        onUpdateProductInCart: (product, quantity) => {
            dispatch(addToCart(product, quantity));
        },
        onChangeMessage: (message) => {
            dispatch(changeMessage(message))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CartContainer);
