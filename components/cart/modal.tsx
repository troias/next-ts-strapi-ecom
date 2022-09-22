import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import classes from './cartModal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions, CartStateRedux } from '../../redux-store/cartSlice/cartSlice'

let modalWrapper
if (typeof document !== 'undefined') {
    modalWrapper = document.getElementById('modal-root')
}


type Props = {
    children: React.ReactNode
}

// const modalState = useSelector((state: CartStateRedux) => state.cart.cart.modalState)




const Modal = (props: Props) => {


    const dispatch = useDispatch()

    const updateModalState = () => {
        dispatch(cartActions.updateModalState(
            {
                modalState: false
            }

        ))
    }


    const content = <div className={classes.modal_container}


    >
        <div className={classes.modal_wrapper} >



            {props.children}
        </div>

    </div>

    if (typeof window === "object") {
        return createPortal(content, document.getElementById("modals") as Element)
    }
    return null

}

export default Modal

