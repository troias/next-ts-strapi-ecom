import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from "./cart.module.scss"
import Image from 'next/image'
import Link from 'next/link'


type Props = {}





const Cart_page = (props: Props) => {
    const dispatch = useDispatch()
    const quantity = useSelector((state: any) => state.cart.cart.length)
    const cart = useSelector((state: any) => state.cart.cart)
    return (
        <div className={classes.outer_container}>
            <div className={classes.header}>
                <h1 className={classes.cart_title}>Cart page</h1>
            </div>
            <div className={classes.inner_container}>

                <div className={classes.cart_container}>



                    <div className={classes.cart_items}>
                        {cart && cart.map((item: any) => (
                            <Link href={`product/${item.slug}`}>
                                <>

                                    <div className={classes.cart_item} key={item.id}>
                                        <Image src={item.image} width={100} height={100} />
                                        <div className={classes.cart_item_info}>
                                            <h3>{item.name}</h3>
                                            <p>{item.price}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    </div>
                                </>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={classes.order_summary}>
                    <h2>Order Summary</h2>
                    <div className={classes.order_summary_items}>
                        <div className={classes.order_summary_item}>
                            <p>{quantity && quantity} items in cart</p>
                            <p>Subtotal</p>
                            <p>{cart && cart.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0)}</p>
                            <p className={classes.order_summary_item_tax}>Tax</p>
                            <p className={classes.order_summary_item_tax}>{cart && cart.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0) * 0.1}</p>
                            <p className={classes.order_summary_item_total}>Total</p>
                            <p className={classes.order_summary_item_total}>{cart && cart.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0) * 1.1}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart_page