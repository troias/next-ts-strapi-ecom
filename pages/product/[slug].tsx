import { GetStaticPaths, GetStaticProps } from 'next/types'
import React from 'react'
import { getSingleProduct, getProducts } from '../../lib/strapiApi'
import { useSelector } from 'react-redux'
import { Product } from '../../lib/types'

type Props = {}

type Params = {
    slug: string
}


const ProductDetailsPage = (props: Props) => {
    const { slug } = props as Params
    console.log("product detail props", props)



    return (
        <div>
            <h1>Product Details</h1>

            <p>
                This is the product details page.
            </p>



        </div>

    )
}


export default ProductDetailsPage




export const getStaticPaths: GetStaticPaths = async () => {
    const products = await getProducts()
    // console.log("getStaticPaths products", products.data.products.data)
    const paths = products.data.products.data.map((product: Product) => ({
        params: {
            slug: product.attributes.slug
        }
    }))

    return {
        paths,
        fallback: false
    }
}





export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug } = params as Params
    const product = await getSingleProduct(slug)
    return {
        props: {
            product
        }
    }
}




// import React from "react"import { getSingleProduct } from '../../lib/strapiApi';
