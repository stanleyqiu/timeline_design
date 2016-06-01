/**
 * Created by boyuan on 15/12/17.
 */


Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

Highcharts.setOptions({ global: { useUTC: false } });

var colors = ["#8085e9", "#f45b5b", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
    "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"];

function uniform_obj_array(objOrArray){
    if(objOrArray instanceof Array){
        return objOrArray;
    }else{
        return [objOrArray];
    }
}

function getTimelineChartConfig(title, subtitle, series, dataObjArray, tooltipContentFormatFunc){
    return {
        chart: {
            type: 'columnrange',
            inverted: true,
//            renderTo : "container"
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
//            labels: {
//                formatter: function() {
//                }
//            },
            title: {
                text: ''
            }
        },

        yAxis: {
            type: 'datetime',
            startOnTick: true,
            endOnTick: true,
            title: {
                text: ''
            }
        },

        tooltip: {
            useHTML: true,
            hideDelay: 2000,
            formatter: function() {
                return tooltipContentFormatFunc(dataObjArray[this.x],this.point);
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
                }
            }
        },

        legend: {
            enabled: false
        },

        series: series

    };
}

function gen_unit_dataObjArray_series(unitObjArray,colorType){
    var colorMap = {};
    var maxTs = 0;
    var minTs = new Date().getTime();
    for(var i in unitObjArray) {
//        console.log("unit info:");
//        console.log(unitObjArray[i]);
    	if(unitObjArray[i].unitAttempts==undefined)
    		continue;
    	if(minTs>unitObjArray[i].startTime){
    		minTs = unitObjArray[i].startTime;
    	}
    	if(maxTs<unitObjArray[i].finishTime){
    		maxTs = unitObjArray[i].finishTime;
    	}
        var unitAttemptObjArray = uniform_obj_array(unitObjArray[i].unitAttempts.unitAttempt);
        for(var j in unitAttemptObjArray){
            var unitAttemptObj = unitAttemptObjArray[j];
            //set custom info
            var customInfo = $.parseJSON(unitAttemptObj.customInfo);
            for(var customInfoItem in customInfo){
            	unitAttemptObj[customInfoItem] = customInfo[customInfoItem];
            }
//            console.log("unit attempt info:");
//            console.log(unitAttemptObj);
            //set nodeId, logUrl and coutnersUrl
            unitAttemptObj.nodeId = unitAttemptObj.containerMgrAddress.substring(0,unitAttemptObj.containerMgrAddress.indexOf(':'));
            unitAttemptObj.logUrl = "/hs/logs/"+unitAttemptObj.containerMgrAddress
            		+"/"+unitAttemptObj.containerId+"/"+unitAttemptObj.unitAttemptId+"/"+user;
            if(unitAttemptObj.taskId!=undefined){
            	unitAttemptObj.countersUrl = "/hs/taskcounters/"+unitAttemptObj.taskId;
//                console.log("unitAttemptObj.countersUrl:"+unitAttemptObj.countersUrl);
            }
//            console.log("unitAttemptObj.logUrl:"+unitAttemptObj.logUrl);
//            console.log("unit attempt info after merge custom info:");
//            console.log(unitAttemptObj);
            //init color map
            if(colorMap[unitAttemptObj[colorType]]==undefined){
                colorMap[unitAttemptObj[colorType]] = colors[colorIndex++];
                if(colorIndex > 12){
                    colorIndex = 0;
                }
            }
        }
    }
    // re-structure the units into line seriesvar series = [];
    var series = [];
    $.each(unitObjArray, function(i, unitObj) {
        if(unitObjArray[i].unitAttempts != undefined){
	        var item = {
	            name: unitObj.unitId,
	            pointWidth: 10,
	            data: [],
	            color: colorMap[unitObj[colorType]],
	//            events: {
	//                click: function(e) {
	//                    for(var xx in e.point){
	//                        alert(xx+":"+ e.point[xx])
	//                    }
	//                    alert(e.point.name);
	//                }
	//            }
	        };
	        var unitAttemptObjArray = uniform_obj_array(unitObjArray[i].unitAttempts.unitAttempt);
	        $.each(unitAttemptObjArray, function(j, unitAttemptObj) {
	            var no = j;
	            item.data.push({
	                x: i,
	                attemptNo: no,
	                low: parseInt(unitAttemptObj.startTime),
	                high:parseInt(unitAttemptObj.finishTime)
	            });
	        });
	
	        series.push(item);
        }
    });
    return [unitObjArray,series,colorMap,minTs,maxTs];
}


var unitAttmpetInfoConf = 
[{
    "attrName": "unitId",
    "showName": "Unit Id"
},{
    "attrName": "unitAttemptId",
    "showName": "Unit Attempt Id"
},{
    "attrName": "unitType",
    "showName": "Unit Type"
},{
    "attrName": "unitAttemptState",
    "showName": "Unit Attempt State"
},{
    "attrName": "containerId",
    "showName": "Container Id"
},{
    "attrName": "nodeId",
    "showName": "Node Id"
},{
    "attrName": "startTime",
    "showName": "Start Time",
    "format": function(value){
        return new Date(parseInt(value)).format('yyyy-MM-dd hh:mm:ss')
    }
},{
    "attrName": "shuffleFinishTime",
    "showName": "Shuffle Finish Time",
    "format": function(value){
        return new Date(parseInt(value)).format('yyyy-MM-dd hh:mm:ss')
    }
},{
    "attrName": "mergeFinishTime",
    "showName": "Merge Finish Time",
    "format": function(value){
        return new Date(parseInt(value)).format('yyyy-MM-dd hh:mm:ss')
    }
},{
    "attrName": "finishTime",
    "showName": "Finish Time",
    "format": function(value){
        return new Date(parseInt(value)).format('yyyy-MM-dd hh:mm:ss')
    }
},{
    "attrName": "logUrl",
    "showName": "Logs",
    "format": function(value){
        return '<a href="'+value+'" target="_blank">link</a>'
    }
},{
    "attrName": "countersUrl",
    "showName": "Counters",
    "format": function(value){
        return '<a href="'+value+'" target="_blank">link</a>'
    }
}];

function gen_unit_tooltip_content(unitObj, pointData){
    var unitAttemptObjArray = uniform_obj_array(unitObj.unitAttempts.unitAttempt);
    var unitAttemptObj = unitAttemptObjArray[pointData.attemptNo];
    var tableHtml = '<table class="bordered"><tr><td colspan=2>'+unitAttemptObj.unitAttemptId+'</td></tr>';
    for(var no in unitAttmpetInfoConf){
        var confItem = unitAttmpetInfoConf[no];
        var value = unitAttemptObj[confItem.attrName];
        if(value==undefined)
        	continue;
        if(confItem.format != undefined)
            value = confItem.format(value);
        tableHtml += '<tr><td>'+confItem.showName+'</td><td>'+value+'</td></tr>';
    }
    tableHtml += '</table>';
    return tableHtml;
}
