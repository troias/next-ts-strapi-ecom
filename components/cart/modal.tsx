import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import classes from './cartModal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions, CartStateRedux } from '../../redux-store/cartSlice/cartSlice'
import { wrapper } from '../../redux-store/indexSlice'







type Props = {
    children: React.ReactNode
}

// const modalState = useSelector((state: CartStateRedux) => state.cart.cart.modalState)




const Modal = (props: Props) => {
    let modalWrapper
    if (typeof typeof window === "object") {
        modalWrapper = useRef(document.getElementById('modal-wrapper')) as React.MutableRefObject<HTMLDivElement>

    }


    console.log("wrapper_ref", modalWrapper)
    const dispatch = useDispatch()

    const updateModalState = () => {


        dispatch(cartActions.updateModalState({
            modalState: false
        }))
    }


    const content = <div className={classes.modal_container}


    >
        <div className={classes.modal_wrapper} ref={modalWrapper} onClick={updateModalState} >



            {props.children}
        </div>

    </div>

    if (typeof window === "object") {

        return createPortal(content, document.getElementById("modals") as Element)
    }
    return null

}

export default Modal

