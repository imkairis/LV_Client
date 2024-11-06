import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: [],
    products: [],
};

export const orebiSlice = createSlice({
    name: "orebi",
    initialState,
    reducers: {
        initUser: (state, action) => {
            state.userInfo = action.payload;
        },
        updateUser: (state, action) => {
            state.userInfo = Object.assign(state.userInfo, action.payload);
        },
        addToCart: (state, action) => {
            const item = state.products.find(
                item => item._id === action.payload._id
            );
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.products.find(
                item => item._id === action.payload._id
            );
            if (item) {
                item.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.products.find(
                item => item._id === action.payload._id
            );
            if (item.quantity === 1) {
                item.quantity = 1;
            } else {
                item.quantity--;
            }
        },
        updateQuantityItem: (state, action) => {
            const { id, quantity } = action.payload;
            state.products = state.products.map(item => {
                if (item._id === id) {
                    item.quantity = quantity;
                }
                return item;
            });
        },
        deleteItem: (state, action) => {
            if (typeof action.payload === "string") {
                state.products = state.products.filter(
                    item => item._id !== action.payload
                );
                return;
            }
            state.products = state.products.filter(
                item => !action.payload.includes(item._id)
            );
        },
        initCart: (state, action) => {
            state.products = action.payload;
        },
        resetCart: state => {
            state.products = [];
        },
    },
});

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity: drecreaseQuantity,
    updateQuantityItem,
    deleteItem,
    resetCart,
    initCart,
    initUser,
    updateUser,
} = orebiSlice.actions;
export default orebiSlice.reducer;
