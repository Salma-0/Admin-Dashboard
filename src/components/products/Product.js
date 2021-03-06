import React,{useState, useContext} from 'react'
import Collapsible from '../layout/Collapsible';
import SettingsContext from '../context/Settings'


const styles = {
    image: {
        height: 100,
        width: 100
    }
}


const Product = ({product: {id, title, image, price, description, category}}) => {
    const {getStr} = useContext(SettingsContext);
    const [open ,setOpen] = useState(false)
    return (
        <div className='d-flex flex-row p-3 mb-2 border'>
            <img src={image} style={styles.image} alt="" />
            <div className='p-2 ml-2'>
                <p>{title}</p>
                <p>${price}</p>
                <button className='btn btn-outline-info' onClick={e => setOpen(!open)}>{getStr('view_more')}</button>
                <Collapsible open={open}>
                    <p className='mt-1'><strong>Description: </strong> {description}</p>
                    <p><strong>Category: </strong> {category}</p>
                </Collapsible>
            </div>
        </div>
    )
}

export default Product
