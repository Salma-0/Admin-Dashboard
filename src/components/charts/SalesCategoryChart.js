import React, {useRef, useLayoutEffect} from 'react'
import getData from './salesPerCategory';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';


const SalesCategoryChart = () => {
    let chart1 = useRef(null);

    useLayoutEffect(()=> {
        let x = am4core.create('chartdiv2', am4charts.PieChart);
        x.paddingRight = 10
        x.paddingLeft = 10
        
        getData().then(data => {

            let series = x.series.push(new am4charts.PieSeries());
            series.dataFields.value = 'count'
            series.dataFields.category = 'category'
            x.data = data;
            x.legend = new am4charts.Legend();

            

            let title = x.titles.create()
            title.text = "Best Sellers"
            title.fontSize = 20
            title.marginBottom = 20
            x.marginTop = 50
        })
          chart1.current = x;

    }, [])

    return (
        <div id="chartdiv2" className='col' style={{height: 300, width: '100%', marginTop: 40}}>
            
        </div>
    )
}

export default SalesCategoryChart
