import React, { useState } from 'react'
import classes from './cartModal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { cartActions } from '../../redux-store/cartSlice/cartSlice'
type Props = {
    showModal: any
}




const CartModal = (props: Props) => {



    const cart = useSelector((state: any) => state.cart.cart)
    const dispatch = useDispatch()

    console.log("cart", props)

    const cartModelHandler = () => {
        props.showModal()
    }

    return (
        <div className={classes.cartModal_container}>
            <div className={classes.cart_model_header}>
                <h3>Cart</h3>
                <span onClick={cartModelHandler}>X</span>
            </div>
            <div className={classes.cart_model_body}>
                <div className={classes.cart_modal_body_header}>
                    <h4>Product</h4>




                    <h4>Price</h4>



                    <h4>Quanity</h4>



                    <h4>Remove</h4>


                </div>
                {cart.map((item: any) => {
                    return (
                        <div className={classes.cart_modal_body_grid_container}>

                            <div className={classes.cart_modal_body_item_img}>
                                <Image src={item.image} width={100} height={100} />
                            </div>
                            <div className={classes.cart_modal_body_item_price}>
                                <h4>{item.price}</h4>
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

        </div>




    )
}

export default CartModal