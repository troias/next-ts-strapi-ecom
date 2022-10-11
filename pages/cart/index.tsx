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
    const total = useSelector((state: any) => state.cart.cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0))

    const modalState = useSelector((state: any) => state.cart.modalState)

    console.log("cart", quantity)




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

                const chechIFQuantityIsOne = cart.find((item: any) => item.id === id)
                if (chechIFQuantityIsOne.quantity === 1) {
                    dispatch(cartActions.removeFromCart({
                        id: id,
                    }))
                } else {
                    dispatch(cartActions.decreaseQuantity({
                        id: id,
                    }))
                }

                break
            default:
                break
        }
    }

    return (
        <table className={classes.cart}>
            <thead className={classes.cart__header}>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody className={classes.cart__body}>
                {cart.map((item: any) => {
                    return (
                        <tr className={classes.cart__row} key={item.id}>
                            <td>
                                <div className={classes.cart__product}>
                                    <div className={classes.cart__product__img}>
                                        <Image src={item.image} alt={item.title} width={100} height={100} />
                                    </div>
                                    <div className={classes.cart__product__info}>
                                        <h3>{item.title}</h3>

                                    </div>
                                </div>
                            </td>
                            <td>${item.price}</td>
                            <td>
                                <div className={classes.cart__quantity}>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => quantityHandler(item.id, 'decrease')}><FaMinus /></button>

                                    <button onClick={() => quantityHandler(item.id, 'increase')}><GrAdd /></button>
                                </div>
                            </td>
                            <td>${item.price * item.quantity}</td>
                            <td>
                                <button onClick={() => dispatch(cartActions.removeFromCart({
                                    id: item.id,
                                }))}><GrActions /></button>
                            </td>
                        </tr>

                    )
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={5}>
                        <div className={classes.cart__total}>
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                        <div className={classes.cart__checkout}>
                            <Link href={{
                                pathname: '/checkout',
                                query: {
                                    total: total
                                }
                            }}>
                                <a>Proceed to checkout</a>
                            </Link>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default Cart_page











    // <div className={classes.outer_container}  >





        //     <div className={classes.cart_container}>


        //         <div className={classes.cart_items}>
        //             {cart.map((item: any) => {



        //                 return (
        //                     <div className={classes.cart_item} key={item.id}>
        //                         <div className={classes.cart_item_image}>
        //                             <Image src={item.image} alt={item.name} width={100} height={100} />
        //                         </div>
        //                         <div className={classes.cart_item_name}>
        //                             <Link href={`/products/${item.id}`}>
        //                                 <a>{item.name}</a>
        //                             </Link>
        //                         </div>
        //                         <div className={classes.cart_item_price}>
        //                             <p> Amount  ${item.price}</p>
        //                         </div>
        //                         <div className={classes.cart_item_quantity}>
        //                             <div className={classes.cart_item_quantity_container}>
        //                                 <p className={classes.cart_item_quantity_value}>{item.quantity}</p>
        //                                 <button onClick={() => quantityHandler(item.id, 'decrease')}

        //                                 ><FaMinus /></button>

        //                                 <button onClick={() => quantityHandler(item.id, 'increase')}><GrAdd /></button>
        //                             </div>
        //                         </div>

        //                     </div>
        //                 )

        //             })}



        //         </div>
        //     </div>

        //     <div className={classes.order_summary}>
        //         <h2>Order Summary</h2>
        //         <div className={classes.order_summary_items}>
        //             <div className={classes.order_summary_item}>

        //                 <h2 className={classes.order_summary_item_total_header}>Total items in cart </h2>

        //                 {cart ? cart.reduce((acc: any, item: any) => acc + item.quantity, 0) : dispatch(cartActions.setCart())}
        //                 <h2 className={classes.order_summary_item_subtotal__header}>Subtotal</h2>
        //                 <p>{
        //                     cart && cart.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0)
        //                 }   </p>

        //                 <h2 className={classes.order_summary_item_tax__header}>Tax</h2>
        //                 <p className={classes.order_summary_item_tax}>{cart && cart.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0) * 0.15} NZD </p>

        //                 <h2 className={classes.order_summary_item_total__header}>Total</h2>
        //                 <p className={classes.order_summary_item_total}>{cart && total}</p>
        //             </div>
        //         </div>

        //     </div>
        // </div>