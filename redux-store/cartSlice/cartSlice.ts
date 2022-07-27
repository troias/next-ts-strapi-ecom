import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        total: 0,
        isLoading: false,
        error: null,
    },
    reducers: {
        addToCart: (state: any, action: any) => {
            state.cart.push(action.payload);
            state.total += action.payload.price;
        }
    }
});

export const {addToCart} = cartSlice.actions;

