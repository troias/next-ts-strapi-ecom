import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from "./cart.module.scss"
import Image from 'next/image'


type Props = {}





const Cart_page = (props: Props) => {
    const dispatch = useDispatch()
    const quantity = useSelector((state: any) => state.cart.cart.length)
    const cart = useSelector((state: any) => state.cart.cart)
    return (
        <div className={classes.outer_container}>
            <div className={classes.inner_container}>
                <div className={classes.header}>
                    <h1>Cart page</h1>
                    <p>{quantity} items in cart</p>
                    <div className={classes.cart_items}>
                        {cart.map((item: any) => (
                            <div className={classes.cart_item} key={item.id}>
                                <img src={item.image} alt={item.name} />
                                <div className={classes.cart_item_info}>
                                    <h3>{item.name}</h3>
                                    <p>{item.price}</p>
                                    <p>{item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart_page