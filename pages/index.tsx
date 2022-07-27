import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { useSelector } from 'react-redux'

interface Products {
  data: {
    products: {
      data: Product[]
    }
  }
  meta: Meta
}

interface Meta {
  pagination: {
    pageCount: number
    page: number
    pageSize: number
    total: number
  }
}

interface Product {
  attributes: {
    createdAt: string
    description: string
    name: string
    price_in_cents: number
    published_at: string
    updatedAt: string
  }
}

type Props = {
  products?: Products
}



const Home: NextPage = (props: Props) => {

  // const cart = useSelector((state: any) => state.cart)

  // console.log("cart", cart)
  console.log("PropsHomePage", props)

  const { products } = props
  const { data } = products || {}
  // const { meta } = products || {}
  console.log("props", data)

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Ecommerce Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Main Page
        </h1>
        <div>
          <h2>Products</h2>
          <ul>

            {data && data.products.data.map((product: Product) => (
              <li key={product.attributes.name}>
                <h3>{product.attributes.name}</h3>
                <p>{product.attributes.description}</p>
                <p>{product.attributes.price_in_cents}</p>
              </li>
            ))}

          </ul>

        </div>
      </main>

    </div>
  )
}

export const getStaticProps = async () => {


  const getProducts = await fetch('http://localhost:1337/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `

          query {
            products {
              data {
                attributes {
                  name
                  price_in_cents
                  description
                  updatedAt
                  createdAt
                  publishedAt

                }
              }
              meta {
                pagination {
                  pageCount
                  page
                  pageSize
                  total
                }
              }
            }
          }
        `
      })

    }
  )

  const products: Products = await getProducts.json()



  return {
    props: {
      products
    }
  }







}


export default Home
