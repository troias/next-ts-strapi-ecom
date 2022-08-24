import React, { useState } from 'react'
import classes from './cartModal.module.scss'

type Props = {}




const CartModal = (props: Props) => {

    const [modelState, setModelState] = useState(false)

    const cartModelHandler = () => {
        setModelState((prevState) => prevState = !modelState)
    }
    return (
        <div className={classes.cartModal_container}>
            <div className={classes.cart_model_header}>
                <h3>Cart</h3>
                <span onClick={cartModelHandler}>X</span>
            </div>
            <div className={classes.cart_model_body}>
                <div className={classes.cart_model_body_header}>

                    <div className={classes.cart_model_body_header_info}>
                        <h4>Product Name</h4>
                        <h4> Price</h4>
                        <h4>Quantity</h4>


                    </div>
                    <div className={classes.cart_model_body_product_list}>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default CartModal