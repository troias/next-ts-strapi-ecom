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
import { cartActions } from '../redux-store/cartSlice/cartSlice'




interface Props {
  products?: Products
}


const Home: NextPage = (props: Props) => {




  return (
    <div className={styles.container}>
      <Head>
        <title>NextJs Redux/Strapi/Stripe mini ecom </title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>







      </main>

    </div>
  )
}




export default Home


