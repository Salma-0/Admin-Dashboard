import React, {Fragment, useState, useEffect, useContext} from 'react'
import { faTimes, faBars, faHouseUser, faListAlt, faShoppingBasket, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';
import SettingsContext from '../context/Settings'

const style = {
  marginRight: 10
}



const Sidebar = ({children}) => {

    const {lang, changeLang, getStr} = useContext(SettingsContext)
    
    const [visible, setVisible] = useState(true)
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
                <h4>{getStr('dashboard')}</h4>
                <Link to="/" onClick={e => setActiveLink('/')} className={activeLink === '/' ? 'active' : ''}><FontAwesomeIcon style={style} icon={faHouseUser}/>{getStr('home')}</Link>
                <Link className={activeLink === '/products' ? 'active' : ''} onClick={e => setActiveLink('/products')} to="/products"><FontAwesomeIcon style={style} icon={faShoppingBasket}/>{getStr('products')}</Link>
                <Link className={activeLink === 'orders' ? 'active' : ''} onClick={e => setActiveLink('/orders')} to="/orders"><FontAwesomeIcon style={style} icon={faListAlt}/>{getStr('orders')}</Link>
                <Link className={activeLink === '/coupons' ? 'active': ''} onClick={e => setActiveLink('/coupons')} to="/coupons"><FontAwesomeIcon style={style} icon={faTicketAlt}/>{getStr('coupons')}</Link>
                <select defaultValue={lang} className='form-contorl mt-3 ml-3 p-2' onChange={e => changeLang(e.target.value)} style={{backgroundColor: 'transparent', color: '#fff'}}>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                </select>
            </div>
            <div className='content' style={{marginLeft: !visible ? 40 : 200}}>
                {children}
            </div>
        </Fragment>
    )
}

export default Sidebar
