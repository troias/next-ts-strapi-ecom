import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import cartSlice from "./cartSlice/cartSlice"
import productsSlice from "./productsSlice/productsSlice"

import { createWrapper } from "next-redux-wrapper"

const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartSlice,
      products: productsSlice,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>
export type AppDispatch =
  | ReturnType<AppStore["dispatch"]>
  | ThunkAction<void, AppState, unknown, Action<string>>
  | Promise<void>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)
