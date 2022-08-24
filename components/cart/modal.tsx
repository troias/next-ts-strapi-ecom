import React from 'react'
import { createPortal } from 'react-dom'
import classes from './cartModal.module.scss'

type Props = {
    children: React.ReactNode
}



const Modal = (props: Props) => {

    const content = <div className={classes.modal_container}>{props.children}</div>

    if (typeof window === "object") {
        return createPortal(content, document.getElementById("modals") as Element)
    }
    return null

}

export default Modal

