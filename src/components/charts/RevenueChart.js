import React,{useRef, useLayoutEffect, useContext} from 'react'
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import SettingsContext from '../context/Settings'

import getRevenueData from './revenue';



const RevenueChart = () => {

    const {getStr} = useContext(SettingsContext)

    let chart = useRef(null);

    useLayoutEffect(()=> {
        let x = am4core.create("chartdiv", am4charts.XYChart);

        x.data = getRevenueData();
        
        let dateAxis = x.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 30;

        dateAxis.dateFormats.setKey("day", "dd");

        dateAxis.title.text = "September 2020"

        let valueAxis = x.yAxes.push(new am4charts.ValueAxis());

        valueAxis.title.text = getStr('revenue')+" $"

        let series = x.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.name = "Revenue";

        x.scrollbarX = new am4charts.XYChartScrollbar();
        x.scrollbarX.series.push(series);

        let title = x.titles.create();
        title.text = getStr('sales_growth')
        title.fontSize = 20

        chart.current = x;

        return ()=> {
            x.dispose();
        }

    }, [getStr])

    return (
        <div id="chartdiv" className='col' style={{height: 400, width: '100%', margin: 20}}>
            
        </div>
    )
}

export default RevenueChart
