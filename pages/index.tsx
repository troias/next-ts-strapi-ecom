import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
// import { getProducts } from '../redux/actions/productActions'
import { Product, Products } from '../lib/types'
import { productActions } from '../redux-store/productsSlice/productsSlice'
import { useAppDispatch } from '../lib/hooks/hooks'
import { fetchInitialProducts } from '../redux-store/productsSlice/productsSlice'

type Props = {
  products?: Products
}


const Home: NextPage = (props: Props) => {

  const cart = useSelector((state: any) => state.cart)
  const productState = useSelector((state: any) => state.products)

  const dispatch: any = useAppDispatch()



  const { products } = productState
  const { data } = products



  console.log("products2", data && data.products.data)


  useEffect(() => {
    if (productState.status === 'idle') {
      dispatch(fetchInitialProducts())
    }

  }, [productState.status, dispatch])

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Ecommerce Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Main Page
        </h2>
        <div>
          <h2>Products</h2>
          <ul>
            {data && data.products.data.map((product: Product) => (
              <li key={Math.random()} >
                <div>

                  {/* {console.log("productImage", product.attributes.thumbnail.data.attributes.url)} */}
                  <Image src={`http://localhost:1337${product.attributes.thumbnail.data.attributes.url}`} alt={product.attributes.name} width={200} height={200} />

                </div>
                <div>
                  <h3>{product.attributes.name}</h3>
                  <p>{product.attributes.description}</p>
                  <p>{product.attributes.price_in_cents}</p>
                </div>
              </li>
            ))}





          </ul>

        </div>
      </main>

    </div>
  )
}




export default Home