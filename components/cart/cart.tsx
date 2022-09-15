import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions, CartStateRedux } from '../../redux-store/cartSlice/cartSlice'
import classes from './cart.module.scss'
import Link from 'next/link'
import Modal from './modal'
import CartModal from './cartModal'

interface Props {
}



const Cart = (props: Props) => {

    const dispatch = useDispatch()
    const quantity = useSelector((state: CartStateRedux) => state.cart.cart.length)

    let [modelState, setModelState] = useState(false)

    // console.log("modelState", modelState)

    const cartModelHandler = () => {
        setModelState((prevState) => prevState = !modelState)



    }



    return (

        <div className={classes.cart_container}>
            <div className={classes.cart_wrapper} onClick={cartModelHandler}>
                cart    <span className={classes.quantity} > {quantity} </span>
            </div>
            {modelState ? <Modal>
                <CartModal showModal={cartModelHandler} />

            </Modal> : null}


        </div>

    )
}

export default Cart