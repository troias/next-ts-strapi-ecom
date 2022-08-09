import { GetStaticPaths, GetStaticProps } from 'next/types'
import React, { useState } from 'react'
import { getSingleProduct, getProducts } from '../../lib/strapiApi'
import { useSelector, useDispatch } from 'react-redux'
import { Product, Products } from '../../lib/types'
import { toLocalStingMoney } from '../../utils/format'
import classes from './productDetails.module.css'
import Image from 'next/image'
import { CartItem, cartActions } from '../../redux-store/cartSlice/cartSlice'


// import { addToCart } from '../../redux/actions/cartActions'


type Props = {
    product: Products
}

type Params = {
    slug: string
}

export interface SpreadProduct {
    id: string
    attributes: {
        name: string
        price_in_cents: number
        description: string
        updatedAt: string
        createdAt: string
        publishedAt: string
    }
}

interface ProductCartObj {
    product: Product
    quantity: number
}






const ProductDetailsPage = (props: Props) => {

    const [quantity, setQuantity] = useState(0)

    const { data } = props.product
    const { products } = data
    const { ...spread } = products.data
    const { ...spreadProduct } = spread[0]


    const addProductToCartHandler = (productObj: ProductCartObj) => {

        const { product, quantity } = productObj
        const { id, attributes } = product
        const { name, price_in_cents, description } = attributes
        const cartItem: CartItem = {
            id,
            name,
            price: price_in_cents,
            description,
            quantity
        }
        dispatch(cartActions.addToCart(cartItem))
        console.log("cartItem", cartItem)

    }
    const dispatch = useDispatch()



    return (
        <div className={classes.container}>
            <div className={classes.product_details_container}>
                <div className={classes.product_details_title}>
                    <h1>{spreadProduct.attributes.name}</h1>
                </div>
                <div className={classes.product_details_description}>
                    <p>{spreadProduct.attributes.description}</p>
                </div>
                <div className={classes.product_details_price}>
                    <p>{toLocalStingMoney(spreadProduct.attributes.price_in_cents)}</p>
                </div>
                <div className={classes.product_details_image}>
                    <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${spreadProduct.attributes.thumbnail.data.attributes.url}`} width={`${spreadProduct.attributes.thumbnail.data.attributes.width}`} height={spreadProduct.attributes.thumbnail.data.attributes.height} />
                </div>
                <div className={classes.product_quantity}>
                    <p>Quantity</p>
                </div>
                <div className={classes.addtoCart}>
                    <button onClick={() => addProductToCartHandler({ product: spreadProduct, quantity: quantity })}>Add to cart</button>

                </div>
            </div>
            <div className={classes.product_details_add_to_cart}>
            </div>
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
