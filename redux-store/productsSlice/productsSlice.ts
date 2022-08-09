import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { type } from "os"
import { getProducts } from "../../lib/strapiApi"
import { Product } from "../../lib/types"

console.log("getProducts")

type State = {
  products: Product[]
  isLoading: boolean
  error: unknown
  status: Status
}

export type Status = "idle" | "pending" | "fulfilled" | "rejected"

type Action = {
  type: string
  payload: any
}

const initialState: State = {
  products: [],
  status: "idle",
  isLoading: false,
  error: null,
}

export const fetchInitialProducts = createAsyncThunk(
  "products/fetchInitialProducts",
  async () => {
    const products = await getProducts()

    return products
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInitialProducts.pending, (state: State) => {
      state.status = "pending"
      state.isLoading = true
    })
    builder.addCase(
      fetchInitialProducts.fulfilled,
      (state: State, action: Action) => {
        state.status = "fulfilled"
        state.products = action.payload
        state.isLoading = false
      }
    )
    builder.addCase(
      fetchInitialProducts.rejected,
      (state: State, action: Action) => {
        state.status = "rejected"
        state.error = action.payload
        state.isLoading = false
      }
    )
  },
})

// reducers: {

export const productActions = productsSlice.actions
export default productsSlice.reducer
