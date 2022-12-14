import React, { useEffect } from 'react'
import styles from './productsList.module.scss'
import { Product } from '../../lib/types'
import { toLocalStingMoney } from '../../utils/format'
import { useDispatch, useSelector } from 'react-redux'

import { getProducts } from '../../lib/strapiApi'

import { useRouter } from 'next/router'
import { CartItem, cartActions } from '../../redux-store/cartSlice/cartSlice'
import { fetchInitialProducts } from '../../redux-store/productsSlice/productsSlice'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    products: Product[]

}

const ProductsList = (props: Props) => {


    console.log("productList props", props)

    const productState = useSelector((state: any) => state.products)
    const dispatch = useDispatch()

    const addTocartHandler = (productObj: CartItem) => {

        // console.log("addTocartHandler", productObj)

        if (productObj) {
            dispatch(cartActions.addToCart(productObj))
        }
        // console.log("cartItem")
    }

    useEffect(() => {
        if (productState.status === 'idle') {
            dispatch(fetchInitialProducts())
        }
    }, [productState.status, dispatch])


    // const products = useSelector(state => state.products.products)


    const { data } = productState.products || {} as {
        products: {
            data: Product[]
        }
    }

    if (!data) {
        return <div>Loading...</div>
    }

    // console.log("data", data)


    try {

        const { data } = productState.products
        if (!data) {
            return <div>Loading...</div>
        }
    } catch (error) {
        dispatch(fetchInitialProducts())
    }


    // console.log("data", data)
    return (
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
                                        {/* {console.log("cartid", product.id)} */}
                                        <Link href={`products/product/${product.attributes.slug}`}>product details page link</Link>
                                    </>
                                </button>




                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>


    )
}



export default ProductsList




// Language: typescript
// Path: project-20-strapi-ecom/my-app/components/products/productsList.module.scss
