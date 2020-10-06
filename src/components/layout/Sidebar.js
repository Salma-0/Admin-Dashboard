import React, {Fragment, useState, useEffect} from 'react'
import { faTimes, faBars, faHouseUser, faListAlt, faShoppingBasket, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';

const style = {
  marginLeft: 10
}

const Sidebar = ({children}) => {
    
    const [visible, setVisible] = useState(true);
    const [activeLink, setActiveLink] = useState('/');
    useEffect(()=> {
        const width = window.innerWidth;
        console.log(width)
        if(width <= 576){
            setVisible(false);
        }else{
            setVisible(true);
        }

    }, [])
    
    return (
        <Fragment>
             <button className='toggler' onClick={e => setVisible(!visible)} style={{display: visible ? 'none' : 'block'}}>
                    <FontAwesomeIcon icon={faBars} />
            </button>
            <div className='sidebar' style={{width: visible ? 200 : 0}}>
                <button onClick={e => setVisible(!visible)} className='close-btn'><FontAwesomeIcon icon={faTimes}/></button>
                <h4>Dashboard</h4>
                <Link to="/" onClick={e => setActiveLink('/')} className={activeLink === '/' ? 'active' : ''}>Home <FontAwesomeIcon style={style} icon={faHouseUser}/></Link>
                <Link className={activeLink === '/products' ? 'active' : ''} onClick={e => setActiveLink('/products')} to="/products">Products <FontAwesomeIcon style={style} icon={faShoppingBasket}/></Link>
                <Link className={activeLink === 'orders' ? 'active' : ''} onClick={e => setActiveLink('/orders')} to="/orders">Orders <FontAwesomeIcon style={style} icon={faListAlt}/></Link>
                <Link className={activeLink === '/coupons' ? 'active': ''} onClick={e => setActiveLink('/coupons')} to="/coupons">Coupons <FontAwesomeIcon style={style} icon={faTicketAlt}/></Link>
            </div>
            <div className='content' style={{marginLeft: !visible ? 40 : 200}}>
                {children}
            </div>
        </Fragment>
    )
}

export default Sidebar
