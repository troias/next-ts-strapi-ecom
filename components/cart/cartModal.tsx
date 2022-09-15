import React, { useEffect } from 'react'
import classes from './cartModal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { cartActions } from '../../redux-store/cartSlice/cartSlice'
import { toLocalStingMoney } from '../../utils/format'
type Props = {
    showModal: any
}




const CartModal = (props: Props) => {



    const cart = useSelector((state: any) => state.cart.cart)
    const dispatch = useDispatch()

    console.log("cartcart", cart)

    const cartModelHandler = () => {
        props.showModal()
    }



    return (
        <div className={classes.cartModal_container}>
            <div className={classes.cart_model_header}>

                <span onClick={cartModelHandler}>X</span>
            </div>
            <div className={classes.cart_model_body}>
                <div className={classes.cart_modal_body_header}>
                    <h4 >Product</h4>




                    <h4>Price</h4>



                    <h4>Quanity</h4>



                    <h4>Remove</h4>


                </div>
                {cart.map((item: any) => {
                    return (
                        <div className={classes.cart_modal_body_grid_container}>

                            <div >
                                <Image src={item.image} width={100} height={100} className={classes.cart_modal_body_item_img} />
                            </div>
                            <div className={classes.cart_modal_body_item_price}>
                                <h4>{toLocalStingMoney(item.price)}</h4>
                            </div>
                            <div className={classes.cart_modal_body_item_quanity}>
                                <h4>{item.quantity}</h4>
                            </div>
                            <div className={classes.cart_modal_body_item_remove} >
                                <h4 onClick={() => dispatch(cartActions.removeFromCart({
                                    id: item.id,
                                }))}


                                >remove</h4>
                            </div>

                        </div>
                    )
                }
                )}




            </div>


            <div className={classes.cart_model_footer}>
                <div>

                </div>
                <div className={classes.cart_modal_footer_order_right_column}>

                    <h4 className={classes.cart_modal_order_summary_title}>Order Summary</h4>
                    <div className={classes.cart_modal_list_container}>


                        <div className={classes.cart_model_footer_order_subtotal_wrapper}>
                            <h4 className={classes.cart_modal_footer_order_subtotal}>Order subtotal: </h4>
                            <h4 className={classes.cart_modal_footer_order_subtotal_amount} >
                                {toLocalStingMoney(cart.reduce((a: number, b: {
                                    price: number
                                    quantity: number
                                }) => a + b.price * b.quantity, 0))}
                            </h4>
                        </div>

                        <div className={classes.cart_model_footer_order_subtotal_wrapper}>
                            <h4 className={classes.cart_modal_footer_shipping} >Shipping</h4>
                            <h4 className={classes.cart_modal_footer_shipping_cost}>
                                {toLocalStingMoney(cart.reduce((a: number, b: {
                                    price: number,
                                    quantity: number
                                }) => a + b.price * b.quantity, 0) > 100 ? 0 : 10)}
                            </h4>



                        </div>
                        <div className={classes.cart_model_footer_order_tax_wrapper}>
                            <h4 className={classes.cart_modal_footer_tax}>Tax: </h4>
                            <h4 className={classes.cart_modal_footer_tax_price}>
                                {toLocalStingMoney(cart.reduce((acc: any, item: any) => {
                                    return acc + item.price * item.quantity
                                }, 0) * 0.1)}
                            </h4>

                        </div>
                        <div className={classes.cart_model_footer_order_total_wrapper}>
                            <h4 className={classes.cart_modal_footer_total}  >Total:

                            </h4>
                            <h4 className={classes.cart_modal_footer_total_price}>
                                {toLocalStingMoney(cart.reduce((acc: any, item: any) => {

                                    return acc + item.price * item.quantity
                                }
                                    , 0) + 10)}
                            </h4>

                        </div>
                    </div>
                    <div className={classes.cart_modal_footer_checkout_wrapper}>
                        <button className={classes.cart_modal_footer_checkout_button}>Proceed to checkout</button>

                    </div>
                </div>

            </div>
        </div>
    )
}








export default CartModal