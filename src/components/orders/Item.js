import React, {useEffect, useState} from 'react'

const itemStyles = {
    image: {
        height: 70,
        marginRight: 20,
        width: 70
    },
    price: {
        color: 'rgb(105, 59, 59)'
    }
}

const Item = ({item: {productId, quantity}}) => {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(p => setProduct(p));
    }, [productId])
    return (
        !product ? <h6 className='loading-label'>Loading.<span>.</span><span>.</span></h6> : (
           <div className='item d-flex flex-row p-3 border border-light'>
               <img src={product.image} alt={product.title} style={itemStyles.image}/>
                <div className='p-4'>
                    <span>Title: {product.title}</span>
                    <p style={itemStyles.price}><strong>{quantity} x ${product.price}</strong></p>
                </div>
           </div>
       )
    )
}

export default Item
