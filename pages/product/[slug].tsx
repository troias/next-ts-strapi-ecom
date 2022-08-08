import { GetStaticPaths, GetStaticProps } from 'next/types'
import React from 'react'
import { getSingleProduct, getProducts } from '../../lib/strapiApi'
import { useSelector } from 'react-redux'
import { Product, Products } from '../../lib/types'
import { toLocalStingMoney } from '../../utils/format'

type Props = {
    product: Products
}

type Params = {
    slug: string
}



const ProductDetailsPage = (props: Props) => {



    const { data } = props.product
    const { products } = data
    const { ...spread } = products.data
    const { ...spreadProducts } = spread[0]
    // I spread the arr into a new object and then I spread the object into a new object

    console.log("spread2", spreadProducts)







    return (
        <div>
            <h1>{spreadProducts.attributes.name}</h1>
            <p>{spreadProducts.attributes.description}</p>
            <p>{toLocalStingMoney(spreadProducts.attributes.price_in_cents)}</p>






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
