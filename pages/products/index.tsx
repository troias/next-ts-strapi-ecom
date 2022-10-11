import React, { useEffect } from 'react'
import { getProducts } from '../../lib/strapiApi'
// import { GetStaticProps, GetStaticPaths } from 'next'
// import { useDispatch, useSelector } from 'react-redux'
// import { Product } from '../../lib/types'
// import { fetchInitialProducts } from '../../redux-store/productsSlice/productsSlice'
import ProductsList from '../../components/products/productsList'
import { Product } from '../../lib/types'


type Props = {
    data: Product[]
}



const Products = (props: Props) => {

    const products = props.data



    return (
        <div>
            <ProductsList products={products} />
        </div>
    )
}

export default Products


export const getStaticProps = async () => {
    const getStaticallyLoadedProducts = await getProducts()

    const products = getStaticallyLoadedProducts.data.products.data

    console.log("getStaticallyLoadedProducts", getStaticallyLoadedProducts)

    return {
        props: {
            data: products
        }
    }
}

