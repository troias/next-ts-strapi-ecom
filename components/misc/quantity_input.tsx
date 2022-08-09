import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { changeQuantity } from '../../redux/actions/cartActions'


type Props = {}

const Quantity_input = (props: Props) => {
    const dispatch = useDispatch()
    const { quantity } = useSelector((state: any) => state.cart)




    return (
        <div>
            statefull quantity update
            {/* <input type="number" value={quantity} onChange={(e) => dispatch(changeQuantity(e.target.value))} /> */}




        </div>
    )
}

export default Quantity_input