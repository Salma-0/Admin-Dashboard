import React, {useState, useContext} from 'react'
import Item from './Item'
import Collapsible from '../layout/Collapsible';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import SettingsContext from '../context/Settings'

const style = {
    total: {
        backgroundColor: "rgb(105, 59, 59)",
        color: '#efefef',
        padding: 3,
        border: 'solid 1px rgb(105, 59, 59)'
    },
    totalTitle: {
        color: 'rgb(105, 59, 59)',
        padding: 3,
        border: 'solid 1px rgb(105, 59, 59)'
    }
}

const OrderItem = ({order: {items, total, date}}) => {

    const {getStr, lang} = useContext(SettingsContext)

    const locale = lang === 'ar' ? 'ar-EG' : undefined
   
    const [open, setOpen] = useState(false);

    return (
        <div className='order p-3 m-3 border border-light shadow'>
            <p><strong>{getStr('ordered_at')} : </strong> {new Date(date).toLocaleDateString(locale)}</p>
            <p className='float-right'>{items.length} {getStr('items')}</p>
            <span style={style.totalTitle}>{getStr('total')} </span><span style={style.total}>${total}</span>
            <p><button className='btn btn-light mt-3' onClick={e => setOpen(!open)}>{getStr('view_more')} <FontAwesomeIcon icon={faAngleDown}/></button></p>
            <Collapsible open={open}>
            {
                items.map(item => (
                    <Item key={item.productId} item={item}/>
                ))
            }
            </Collapsible>
           
        </div>
    )
}

export default OrderItem
