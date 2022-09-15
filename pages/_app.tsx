import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../redux-store/indexSlice'
import NavBar from '../components/navigation/navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux-store/cartSlice/cartSlice'
const { fetchInitialProducts } = require('../redux-store/productsSlice/productsSlice')




function MyApp({ Component, pageProps }: AppProps) {

  const dispatch = useDispatch()
  const cart = useSelector((state: any) => state.cart.cart)
  const total = useSelector((state: any) => state.cart.total)


  const productState = useSelector((state: any) => state.products)

  useEffect(() => {
    dispatch(cartActions.calculateTotal({
      cart: cart,
    }))


    if (productState.status === 'idle') {
      dispatch(fetchInitialProducts())
    }

    if (cart.length === 0) {
      dispatch(cartActions.setCart())
    }





  }, [cart, total])


  return (
    <>
      <NavBar />
      <Component {...pageProps} />

    </>
  )


}

export default wrapper.withRedux(MyApp)
