import * as types from './../constants/ActionType';

var data = JSON.parse(localStorage.getItem('CART'));

var initialState = data ? data : [];

const cart = (state = initialState, action) => {
    switch(action.type) {
        case types.ADD_TO_CART: 
            var { product, quantity } = action;
            var index = findProductInCart(state, product);
            if(index == -1) {
                state.push({
                    product: product,
                    quantity: quantity
                });
            } else {
                var totolQuantity = state[index].quantity + quantity
                if(totolQuantity > 0) {
                    state[index].quantity = totolQuantity;
                } else {
                    state.splice(index, 1);
                }
            }
            localStorage.setItem('CART', JSON.stringify(state));
            return [...state];
        case types.DELETE_PRODUCT_IN_CART: 
            var { product } = action;
            var index = findProductInCart(state, product);
            if(index !== -1) {
                state.splice(index, 1);
            } 
            localStorage.setItem('CART', JSON.stringify(state));
            return [...state];
        default: 
            return [...state];
    }
}

var findProductInCart = (cart, product) => {
    var index = -1;
    if(cart.length > 0) {
        for(var i = 0; i < cart.length; i++) {
            if(cart[i].product.id === product.id)  {
                return i;
            }
        }
    }
    return index;
}
export default cart;  