import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
})

export default cartSlice.reducer
