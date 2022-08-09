import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../redux-store/indexSlice'
import NavBar from '../components/navigation/navbar'


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <NavBar />
      <Component {...pageProps} />

    </>
  )


}

export default wrapper.withRedux(MyApp)
