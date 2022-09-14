import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Product, Products } from "../../lib/types"
import { Status } from "../productsSlice/productsSlice"
import { SpreadProduct } from "../../pages/products/product/[slug]"
import { useEffect } from "react"

type CartObj = CartItem[]

export interface CartState {
  cart: CartObj

  // cartItems: CartItems
  isLoading: boolean
  error: unknown
  total: number
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
          cart[index].quantity +=
            cartItem.quantity &&
            localStorage.setItem("cart", JSON.stringify(cart))
        } else {
          cart.push(cartItem) &&
            localStorage.setItem("cart", JSON.stringify(cart))
        }
      }
    },

    removeFromCart: (state: CartState, action: CartAction) => {
      state.cart = state.cart.filter(
        (item: CartItem) => item.id !== action.payload.id
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
    increaseQuantity: (state: CartState, action: CartAction) => {
      const { id } = action.payload
      state.cart = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
    },
    decreaseQuantity: (state: CartState, action: CartAction) => {
      const { id } = action.payload

      state.cart.find((item) =>
        item.id === id
          ? item.quantity < 1
            ? cartActions.updateCartItem({ id: item.id })
            : item.quantity--
          : item
      )
    },
    calculateTotal: (state: CartState, action: CartAction) => {
      const { cart } = action.payload
      const total = cart.reduce((acc: number, item: CartItem) => {
        return acc + item.price * item.quantity * 1.15
      }, 0)
      state.total = total
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
