import React, {useRef, useLayoutEffect, useContext} from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_continentsLow from '@amcharts/amcharts4-geodata/continentsLow';
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import getGeoData from './geoData';
import SettingsContext from '../context/Settings'

const GeoChart = () => {

    let chart = useRef(null)

    const {getStr} = useContext(SettingsContext)

    useLayoutEffect(() => {

        let data = getGeoData()

        let x = am4core.create("chartdiv3", am4maps.MapChart);

        

        try {
            x.geodata = am4geodata_worldLow;
        } catch (error) {
            x.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest"));
        }

        let label = x.createChild(am4core.Label)
        label.text = getStr('sales_by_country');
        label.fontSize = 16;
        label.align = "left"
        label.valign = "bottom"
        label.fill = am4core.color("#927459")
        label.background = new am4core.RoundedRectangle()
        label.background.cornerRadius(10, 10, 10, 10)
        label.padding(10, 10, 10, 10);
        label.marginLeft = 30;
        label.marginBottom = 30;
        label.background.strokeOpacity = 0.3;
        label.background.stroke = am4core.color("#927459");
        label.background.fill = am4core.color("#f9e3ce");
        label.background.fillOpacity = 0.6;

        
        x.projection = new am4maps.projections.Orthographic();
        x.panBehavior = "rotateLongLat"
        x.padding(20, 20, 20, 20);
        x.zoomControl = new am4maps.ZoomControl()

        let homeButton = new am4core.Button()
        homeButton.events.on('hit', function () {
            x.getHome()
        })

        homeButton.icon = new am4core.Sprite();
        homeButton.padding(7, 5, 7, 5);
        homeButton.width = 30;
        homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        homeButton.marginBottom = 10;
        homeButton.parent = x.zoomControl;
        homeButton.insertBefore(x.zoomControl.plusButton);

        x.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#76d3e3"); //#bfa58d
        x.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
        x.deltaLongitude = 20;
        x.deltaLatitude = -20;

        // limits vertical rotation
        x.adapter.add("deltaLatitude", function (delatLatitude) {
            return am4core.math.fitToRange(delatLatitude, -90, 90);
        })

        // Create map polygon series

        let shadowPolygonSeries = x.series.push(new am4maps.MapPolygonSeries());
        shadowPolygonSeries.geodata = am4geodata_continentsLow;

        try {
            shadowPolygonSeries.geodata = am4geodata_continentsLow;
        }
        catch (e) {
            shadowPolygonSeries.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
        }

        shadowPolygonSeries.useGeodata = true;
        shadowPolygonSeries.dx = 2;
        shadowPolygonSeries.dy = 2;
        shadowPolygonSeries.mapPolygons.template.fill = am4core.color("#000");
        shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
        shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
        shadowPolygonSeries.fillOpacity = 0.1;
        shadowPolygonSeries.fill = am4core.color("#000");


        // Create map polygon series
        let polygonSeries = x.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;

        polygonSeries.calculateVisualCenter = true;
        polygonSeries.tooltip.background.fillOpacity = 0.2;
        polygonSeries.tooltip.background.cornerRadius = 20;

        let template = polygonSeries.mapPolygons.template;
        template.nonScalingStroke = true;
        template.fill = am4core.color("#c6e381"); //#f9e3ce
        template.stroke = am4core.color("#98c77b");//#e2c9b0

        polygonSeries.calculateVisualCenter = true;
        template.propertyFields.id = "id";
        template.tooltipPosition = "fixed";
        template.fillOpacity = 1;

        template.events.on("over", function (event) {
            if (event.target.dummyData) {
                event.target.dummyData.isHover = true;
            }
        })
        template.events.on("out", function (event) {
            if (event.target.dummyData) {
                event.target.dummyData.isHover = false;
            }
        })

        let hs = polygonSeries.mapPolygons.template.states.create("hover");
        hs.properties.fillOpacity = 1;
        hs.properties.fill = am4core.color("#deb7ad");


        let graticuleSeries = x.series.push(new am4maps.GraticuleSeries());
        graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
        graticuleSeries.fitExtent = false;
        graticuleSeries.mapLines.template.strokeOpacity = 0.2;
        graticuleSeries.mapLines.template.stroke = am4core.color("#fff");


        let measelsSeries = x.series.push(new am4maps.MapPolygonSeries())
        measelsSeries.tooltip.background.fillOpacity = 0;
        measelsSeries.tooltip.background.cornerRadius = 20;
        measelsSeries.tooltip.autoTextColor = false;
        measelsSeries.tooltip.label.fill = am4core.color("#000");
        measelsSeries.tooltip.dy = -5;

        let measelTemplate = measelsSeries.mapPolygons.template;
        measelTemplate.fill = am4core.color("#bf7569");//#bf7569
        measelTemplate.strokeOpacity = 0;
        measelTemplate.fillOpacity = 0.75;
        measelTemplate.tooltipPosition = "fixed";



        let hs2 = measelsSeries.mapPolygons.template.states.create("hover");
        hs2.properties.fillOpacity = 1;
        hs2.properties.fill = am4core.color("#86240c");

        polygonSeries.events.on("inited", function () {
            polygonSeries.mapPolygons.each(function (mapPolygon) {
                let count = data[mapPolygon.id];

                if (count > 0) {
                    let polygon = measelsSeries.mapPolygons.create();
                    polygon.multiPolygon = am4maps.getCircle(mapPolygon.visualLongitude, mapPolygon.visualLatitude, Math.max(0.2, Math.log(count) * Math.LN10 / 10));
                    polygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": " + count;
                    mapPolygon.dummyData = polygon;
                    polygon.events.on("over", function () {
                        mapPolygon.isHover = true;
                    })
                    polygon.events.on("out", function () {
                        mapPolygon.isHover = false;
                    })
                }
                else {
                    mapPolygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": no data";
                    mapPolygon.fillOpacity = 0.9;
                }

            })
        })

        chart.current = x;

        return ()=> {
            x.dispose()
        }

    }, [getStr])

    return (
        <div id="chartdiv3" className='col' style={{width: '100%', height: 300}}>
            
        </div>
    )
}

export default GeoChart
