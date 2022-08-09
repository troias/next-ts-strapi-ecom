import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions, CartStateRedux } from '../../redux-store/cartSlice/cartSlice'
import classes from './cart.module.scss'
import Link from 'next/link'

interface Props {
}



const Cart = (props: Props) => {

    const dispatch = useDispatch()
    const quantity = useSelector((state: CartStateRedux) => state.cart.cart.length)

    // console.log("cart", cart)


    return (

        <Link href={"/cart"} className={classes.cart_link}>
            <>
                cart    <span className={classes.quantity} > {quantity} </span>
            </>
        </Link>

    )
}

export default Cart