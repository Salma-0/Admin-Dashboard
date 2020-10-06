import React, {useRef, useLayoutEffect} from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as amcharts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

import ordersJSON from '../orders.json';

const ordersList = ordersJSON.orders;

const OrderPerDate = () => {
    const chart = useRef(null);

    useLayoutEffect(()=> {

        let x = am4core.create("chartdiv", am4charts.XYChart);

        x.paddingRight = 20;

        let data = [];
        let visits = 10;

    }, [])

    return (
        <div>
            
        </div>
    )
}

export default OrderPerDate
