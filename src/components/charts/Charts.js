import React, {useContext} from 'react'
import RevenueChart from './RevenueChart';
import GeoChart from './GeoChart'
import SettingsContext from '../context/Settings';

const Charts = () => {
    const {getStr} = useContext(SettingsContext)
    return (
        <div className='container p-2 text-center'>
            <h2 className='mt-4'>{getStr('dashboard')}</h2>
            <RevenueChart/>
            <p className='mb-5'>{getStr('revenue_graph_desc')}</p>
            <GeoChart/>
            <p>{getStr('sales_by_country_desc')}</p>
        </div>
    )
}

export default Charts
