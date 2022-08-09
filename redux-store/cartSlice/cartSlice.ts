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
  id: string | number
  name: string
  price: number
  quantity: number
  description: string
  image: string
  slug: string
}

type CartItems = Set<CartItem[]>

const validateCartItem = (cartItem: CartItem): CartItem => {
  if (!cartItem.id) throw new Error("Cart item must have an id")
  if (!cartItem.name) throw new Error("Cart item must have a name")
  if (!cartItem.price) throw new Error("Cart item must have a price")
  if (!cartItem.quantity) throw new Error("Cart item must have a quantity")
  if (!cartItem.description)
    throw new Error("Cart item must have a description")
  if (!cartItem.image) throw new Error("Cart item must have an image")
  if (!cartItem.slug) throw new Error("Cart item must have a slug")
  return cartItem
}

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
      const { payload } = action
      const { cart } = state
      const { id, name, price, quantity, description, image, slug } = payload

      if (
        validateCartItem({
          id,
          name,
          price,
          quantity,
          description,
          image,
          slug,
        })
      ) {
        const cartItem = { id, name, price, quantity, description, image, slug }
        if (cart.find((item) => item.id === cartItem.id)) {
          const index = cart.findIndex((item) => item.id === cartItem.id)
          cart[index].quantity += cartItem.quantity
        } else {
          cart.push(cartItem)
        }
      }
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
