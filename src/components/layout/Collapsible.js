import React from 'react'

const Collapsible = ({children, open}) => {
    return (
        <div className='mt-2'>
            <div className={open ? "content-collapse" : "content-collapse content-close"}>
                {
                    children
                }
            </div>
        </div>
    )
}

export default Collapsible
