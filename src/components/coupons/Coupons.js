import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faTicketAlt} from '@fortawesome/free-solid-svg-icons'
import Collapsible from '../layout/Collapsible';

let fakeCoupons = [
    {
        id: 1,
        discount: 20,
        validUntil: new Date("10/11/2020"),
        usage: 3,
        limit: 20
    },
    {
        id: 2,
        discount: 30,
        validUntil: new Date("9/11/2020"),
        usage: 5,
        limit: 30
    },
    {
        id: 3,
        discount: 10,
        validUntil: new Date("4/12/2020"),
        usage: 30,
        limit: 100
    },
    {
        id: 4,
        discount: 50,
        validUntil: new Date("5/6/2020"),
        usage: 10,
        limit: 25
    }
]

const Coupons = () => {

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState(null);

    useEffect(()=> {
        let today = new Date();
        let yesterday = new Date("10/5/2020")
        console.log(yesterday.toLocaleDateString())
        console.log(yesterday < today)
    }, [])

    const [coupons, setCoupons] = useState(fakeCoupons)

    const onDelete = (e, id) => {
      setCoupons(coupons.filter(c => c.id !== id));
    }

    const [formData, setFormData] = useState({
        discount: 1,
        validUntil: Date.now(),
        limit: 1
    })

    const isValid = coupon => {
        return (new Date() < coupon.validUntil) 
        && (coupon.usage < coupon.limit);
    }

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const isAfterToday = (date) => {
        let today = new Date();
        let dateObj = new Date(date);

        if(dateObj.getFullYear() < today.getFullYear()){
            return false;
        }else if(dateObj.getFullYear() === today.getFullYear()){
            if(dateObj.getMonth() > today.getMonth()){
                return true;
            }else if(dateObj.getMonth() < today.getMonth()){
                return false;
            }else{
                if(dateObj.getDate() > today.getDate()){
                    return true;
                }else{
                    return false;
                }
            }
        }else{
            return true;
        }
        
    }
    
    const onSubmit = e => {
        e.preventDefault();
        if(!isAfterToday(formData.validUntil)){
            setMsg({
                "msg": "Pick a valid expiry date", 
                "type": "danger"
            });
        }else{
            let lastCouponId = coupons[coupons.length-1].id
            setCoupons([...coupons,{
                id: lastCouponId+1,
                discount: formData.discount,
                validUntil: new Date(formData.validUntil),
                limit: formData.limit,
                usage: 0
            }]);

            setMsg({
                msg: "Created Successfully",
                type: "success"
            })
        }
    }

    
    return (
        <div className='container text-center'>
            <h1 className='mb-4 m-2'>Coupons</h1>
            <div className='row'>
                <button className='btn btn-outline-primary m-3' onClick={e => setOpen(!open)}>Create New Coupon </button>
            </div>
            <div className='row'>
                <Collapsible open={open}>
                    <form onSubmit={e => onSubmit(e)}>
                     {msg && <div className={`alert alert-${msg.type}`}>{msg.msg}</div>}

                        <div className='form-group'>
                            <label>Discount: </label>
                            <input className='form-control' type='number' name='discount' value={formData.discount} onChange={e => onChange(e)} min="1" max="100" required />
                        </div>
                        <div className='form-group'>
                            <label>Valid Until:</label>
                            <input className='form-control' type="date" name="validUntil" value={formData.validUntil} onChange={e => onChange(e)} />
                        </div>
                        <div className='form-group'>
                            <label>Limit:</label>
                            <input className='form-control' type="number" name="limit" value={formData.limit} onChange={e => onChange(e)} />
                        </div>
                        <button type='submit' className='btn btn-light'>Create <FontAwesomeIcon icon={faTicketAlt}/></button>
                    </form>
                </Collapsible>
            </div>
            {
                coupons.map(coupon =>(
                    <div className='card m-3' key={coupon.id}>
                       
                        <div className='card-body row text-left'>
                            <div className='col'>
                                <h5 style={{ color: '#731e15' }}>{coupon.discount}% Discount Coupon</h5>
                                <p>valid until: <strong>{coupon.validUntil.toDateString()}</strong></p>
                                <p>Used by {coupon.usage} users</p>
                                <p>Limit: {coupon.limit}</p>
                            </div>
                            <div className='col-5 d-flex flex-column text-center'>
                                <span className={`rounded p-1 mb-2 text-light ${isValid(coupon) ? 'bg-success': 'bg-danger'}`}>{isValid(coupon) ? 'VALID' : 'INVALID'}</span>
                                <button onClick={e => onDelete(e, coupon.id)} className='btn btn-outline-dark p-1 float-right'><span><FontAwesomeIcon icon={faTrash} /></span></button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Coupons
