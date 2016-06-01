/**
 * Created by boyuan on 15/12/15.
 */
Highcharts.setOptions({ global: { useUTC: false } });

function getTimelineChartConfig(title, subtitle, renderTo, series, dataObjArray, tooltipContentFormatFunc, clickFunction){
    return {
        chart: {
            type: 'columnrange',
            inverted: true,
            renderTo : renderTo
        },
        credits: {
            enabled: false
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            labels: {
                formatter: function() {
                }
            },
            startOnTick: true,
            endOnTick: true,
            title: {
                text: 'Apps'
            }
        },

        yAxis: {
            type: 'datetime',
            title: {
                text: 'DateTime'
            }
        },

        tooltip: {
            useHTML: true,
            formatter: function() {
                return tooltipContentFormatFunc(dataObjArray[this.x]);
            }
        },

        plotOptions: {
            columnrange: {
                grouping: true,
                dataLabels: {
                    enabled: false,
                    //formatter: function () {
                    //    return appsArrayObj[this.x].name;
                    //}
                },
                events:{
                	click: function(e) {
                		clickFunction(dataObjArray[this.xData[0]]);
                	}
                }
            }
        },

        legend: {
            enabled: false
        },

        series: series

    };
}
