import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../redux-store/indexSlice'
import NavBar from '../components/navigation/navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux-store/cartSlice/cartSlice'




function MyApp({ Component, pageProps }: AppProps) {

  const dispatch = useDispatch()
  const cart = useSelector((state: any) => state.cart.cart)
  const total = useSelector((state: any) => state.cart.total)

  useEffect(() => {
    dispatch(cartActions.calculateTotal({
      cart: cart,
    }))


  }, [cart, total])


  return (
    <>
      <NavBar />
      <Component {...pageProps} />

    </>
  )


}

export default wrapper.withRedux(MyApp)
