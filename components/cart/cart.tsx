import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../redux-store/cartSlice/cartSlice'
import classes from './cart.module.scss'

interface Props {
}



const Cart = (props: Props) => {

    const dispatch = useDispatch()
    const quantity = useSelector((state: any) => state.cart.cartItems.length)

    // console.log("cart", cart)


    return (
        <div>
            cart
            <span className={classes.quantity} > {quantity} </span>
        </div>
    )
}

export default Cart