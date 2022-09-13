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





interface Props {
  products?: Products
}


const Home: NextPage = (props: Props) => {



  const productState = useSelector((state: any) => state.products)



  const dispatch: any = useDispatch()

  const { data } = productState.products



  // console.log("Home props", data && data)

  useEffect(() => {
    if (productState.status === 'idle') {
      dispatch(fetchInitialProducts())
    }

  }, [productState.status, dispatch])



  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Ecommerce Store</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>







      </main>

    </div>
  )
}




export default Home
