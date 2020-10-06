import React from 'react'
import RevenueChart from './RevenueChart';
import GeoChart from './GeoChart'

const Charts = () => {
    return (
        <div className='container p-2 text-center'>
            <h2 className='mt-4'>Dashboard</h2>
            <RevenueChart/>
            <p className='mb-5'>The chart above shows the revenue made by the store in September 2020</p>
            <GeoChart/>
            <p>The second chart depicts the sales around the world. each point represent the number of orders made in each country. To view the number of orders made in one country you need to hover or click on the country in the map.</p>
        </div>
    )
}

export default Charts
