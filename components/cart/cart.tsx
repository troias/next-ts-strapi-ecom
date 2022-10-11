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



    const modalState = useSelector((state: CartStateRedux) => state.cart.modalState)

    const cartQuantity = useSelector((state: CartStateRedux) => state.cart.cart.reduce((acc: number, item: any) => acc + item.quantity, 0))

    // let [modelState, setModelState] = useState(false)

    console.log("modelStateCartPage", modalState)

    const cartModelHandler = () => {
        // setModelState((prevState) => prevState = !modelState)
        dispatch(cartActions.updateModalState(
            {
                modalState: !modalState
            }

        ))



    }



    console.log("modalState", modalState)


    return (

        <div className={classes.cart_container}>
            <div className={classes.cart_wrapper} onClick={cartModelHandler}>
                cart    <span className={classes.quantity} > {cartQuantity} </span>
            </div>
            {modalState ? <Modal>
                <CartModal />

            </Modal> : null}


        </div>

    )
}

export default Cart