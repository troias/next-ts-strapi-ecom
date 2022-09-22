import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from "./cart.module.scss"
import Image from 'next/image'
import Link from 'next/link'
import { GrActions, GrAdd } from 'react-icons/gr'
import { cartActions } from '../../redux-store/cartSlice/cartSlice'
import { FaMinus } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { stringify } from 'querystring'

type Props = {}

interface QuantityHandler {
    (id: string, type: 'increase' | 'decrease'): void
}







const Cart_page = (props: Props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const quantity = useSelector((state: any) => state.cart.cart.length)
    const cart = useSelector((state: any) => state.cart.cart)
    const total = useSelector((state: any) => state.cart.total)
    const modalState = useSelector((state: any) => state.cart.modalState)

    console.log("cart", cart)




    useEffect(() => {
        if (cart.length === 0) {
            dispatch(cartActions.setCart())
        }
    }, [cart.length, dispatch])



    const quantityHandler = (id: string, type: string) => {
        console.log("quantityHandler", typeof id, type)
        switch (type) {
            case 'increase':
                dispatch(cartActions.increaseQuantity({
                    id: id,
                }))
                console.log("increase", id, type)
                break
            case 'decrease':
                dispatch(cartActions.decreaseQuantity({
                    id: id,
                }))
                break
            default:
                break
        }




    }

    return (
        <div className={classes.outer_container}  >

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
                                            <></>
                                            <p>
                                                {item.quantity}
                                                <span className={classes.addQuantityButton} onClick={() => quantityHandler(item.id, "increase")}>
                                                    <GrAdd />
                                                </span>
                                                <span className={classes.removeQuantityButton} onClick={() => {


                                                    if (item.quantity) {
                                                        quantityHandler(item.id, "decrease")
                                                    }
                                                    if (item.quantity <= 1) {

                                                        dispatch(cartActions.removeFromCart({
                                                            id: item.id,
                                                        }))


                                                    }




                                                }} >
                                                    <FaMinus />
                                                </span>

                                            </p>

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
                            <p>{quantity && quantity} unique items in cart</p>
                            <p>Total items in cart {cart ? cart.reduce((acc: any, item: any) => acc + item.quantity, 0) : dispatch(cartActions.setCart())}</p>
                            <p>Subtotal</p>
                            <p>{
                                cart && cart.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0)
                            }   </p>
                            <p className={classes.order_summary_item_tax}>Tax</p>
                            <p className={classes.order_summary_item_tax}>{cart && cart.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0) * 0.15} NZD </p>
                            <p className={classes.order_summary_item_total}>Total</p>
                            <p className={classes.order_summary_item_total}>{cart && total}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Cart_page