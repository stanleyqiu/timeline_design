/**
 * Created by boyuan on 15/12/15.
 */
Highcharts.setOptions({ global: { useUTC: false } });

function getTimelineColumnChartConfig(renderTo,title,y_title,categories,serie){
    return {
        chart: {
            type: 'column',
            renderTo : renderTo
        },
        title: {
            text: title
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            title: {
                text: y_title
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        credits: {
            enabled:false
        },
        series: serie

    };
}

function getTimelinePieChartConfig(renderTo,data,title){
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            renderTo : renderTo
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        credits: {
            enabled:false
        },
        series: [{
            type: 'pie',
            name: title,
            data: data
        }]

    };
}

function getTimelineCurChartConfig(renderTo,title,y_title,categories,serie){
    return {
        chart: {

            renderTo : renderTo
        },
        title: {
            text: title,
            x: -20 //center
        },

        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: y_title
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: y_title
        },
        credits: {
            enabled:false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: serie
    }
}

