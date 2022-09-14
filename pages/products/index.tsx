import React, { useEffect } from 'react'
import { getProducts } from '../../lib/strapiApi'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '../../lib/types'
import { fetchInitialProducts } from '../../redux-store/productsSlice/productsSlice'
import ProductsList from '../../components/products/productsList'


type Props = {}



const Products = (props: Props) => {



    return (
        <div>
            <ProductsList />
        </div>
    )
}

export default Products

