import React, {useEffect, useState} from 'react'
import Product from './Product';

const ProductsList = () => {


    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(list => setProducts(list));
    }, [])

    return (
        <div className='products-list'>
            {
                !products ? <h5 className="loadingLabel">Loading.<span>.</span><span>.</span></h5> : (
                    products.map(p => (
                        <Product key={p.id} product={p}/>
                    ))
                )
            }
        </div>
    )
}

export default ProductsList
