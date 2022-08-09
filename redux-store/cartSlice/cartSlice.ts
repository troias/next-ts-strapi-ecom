import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Product, Products } from "../../lib/types"
import { Status } from "../productsSlice/productsSlice"
import { SpreadProduct } from "../../pages/product/[slug]"

type CartObj = CartItem[]

export interface CartState {
  cart: CartObj

  // cartItems: CartItems
  isLoading: boolean
  error: unknown
}

export interface CartStateRedux {
  cart: {
    cart: CartObj
    isLoading: boolean
    error: unknown
  }
}

interface CartAction {
  type: string
  payload: any
}

export interface CartItem {
  name: string
  price: number
  quantity: number
  id: string
  description: string
  image: {
    data: {}
  }
}

type CartItems = Set<CartItem[]>

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartItems: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    addToCart: (state: CartState, action: CartAction) => {
      state.cart.push(action.payload)
    },
    removeFromCart: (state: CartState, action: CartAction) => {
      state.cart = state.cart.filter(
        (item: CartItem) => item.id !== action.payload
      )
    },
    updateCart: (state: CartState, action: CartAction) => {
      state.cart = action.payload
    },
    updateCartItem: (state: CartState, action: CartAction) => {
      if (action.payload.quantity === 0) {
        state.cart = state.cart.filter(
          (item: CartItem) => item.id !== action.payload.id
        )
      } else {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload
          } else {
            return item
          }
        })
      }
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
