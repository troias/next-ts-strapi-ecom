import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { useSelector, useDispatch } from 'react-redux'

import { Product, Products } from '../lib/types'

import { useAppDispatch } from '../lib/hooks/hooks'
import { fetchInitialProducts } from '../redux-store/productsSlice/productsSlice'


import styles from '../styles/Home.module.css'
import { toLocalStingMoney } from '../utils/format'
import Navbar from '../components/navigation/navbar'
import { getProducts } from '../lib/strapiApi'
import { CartItem, cartActions } from '../redux-store/cartSlice/cartSlice'




interface Props {
  products?: Products
}


const Home: NextPage = (props: Props) => {



  const productState = useSelector((state: any) => state.products)



  const dispatch: any = useAppDispatch()

  const { data } = productState.products



  console.log("Home props", data)

  useEffect(() => {
    if (productState.status === 'idle') {
      dispatch(fetchInitialProducts())
    }

  }, [productState.status, dispatch])

  const addTocartHandler = (productObj: CartItem) => {
    if (productObj.quantity > 0) {
      dispatch(cartActions.addToCart(productObj))
    }

    console.log("cartItem")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Ecommerce Store</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>




        <div className={styles.products_container}>
          <h2>Products</h2>
          <div className={styles.product_wrapper} >
            <ul className={styles.product_grid} >
              {data && data.products.data.map((product: Product) => (
                <li key={Math.random()} className={styles.product_list_item} >
                  <div>
                    {/* {console.log("productImage", product.attributes.thumbnail.data.attributes.url)} */}
                    <div className={styles.product_image}>
                      <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${product.attributes.thumbnail.data.attributes.url}`} alt={product.attributes.name} width={200} height={200} />
                    </div>
                  </div>
                  <div>


                    <h3>{product.attributes.name}</h3>
                    <p>{product.attributes.description}</p>


                    <p>{toLocalStingMoney(product.attributes.price_in_cents)}</p>
                    <button className={styles.add_to_cart} onClick={() => {
                      addTocartHandler({
                        id: product.id,
                        name: product.attributes.name,
                        price: product.attributes.price_in_cents,
                        quantity: 1,
                        description: product.attributes.description,
                        image: `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.attributes.thumbnail.data.attributes.url}`,
                        slug: product.attributes.slug
                      })
                    }}>Add to cart</button>

                    <button className={styles.add_to_cart} >

                      <>
                        {console.log("cartid", product.id)}
                        <a href={`/product/${product.attributes.slug}`}>product details page link</a>
                      </>

                    </button>




                  </div>
                </li>
              ))}
            </ul>

          </div>
        </div>


      </main>

    </div>
  )
}




export default Home
