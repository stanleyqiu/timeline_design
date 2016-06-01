/**
 * Created by boyuan on 15/12/15.
 */

/* app info table conf */
var appInfoConf = [{
    "attrName": "name",
    "showName": "Name"
},{
    "attrName": "queue",
    "showName": "Queue"
},{
    "attrName": "user",
    "showName": "User"
},{
    "attrName": "type",
    "showName": "Type"
},{
    "attrName": "state",
    "showName": "State"
},{
    "attrName": "startTime",
    "showName": "Start Time",
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
    "attrName": "cpuCost",
    "showName": "CPU Cost",
    "format": function(value){
        return to_decimal(parseFloat(value)/(3600),3) + " vcore*Hour"
    }
},{
    "attrName": "memoryCost",
    "showName": "Memory Cost",
    "format": function(value){
        return to_decimal(parseFloat(value)/(1024*3600),3) + " GB*Hour"
    }
}];
    
/* get queue group, for example: root.dump.total -> dump */
function getQueueGroup(queue) {
    var queueGroup = queue.replace("root.", "");
    if (queueGroup.indexOf('.') > 0) {
        queueGroup = queueGroup.substring(0, queueGroup.indexOf('.'));
    }
    return queueGroup;
}

function gen_app_dataObjArray_series(appObjArray,colorType){
    /*
     init colorType
     */
    var colorMap = {};
    var colors = ["#8085e9", "#f45b5b", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"];
    var colorIndex = 0;
    //var colorType = GetQueryString("colorType");
    if(colorType==null){
        colorType = "queueGroup";
    }
    console.log("colorType is "+colorType);
    /*
     init appObjArray
     */
    //var appsArrayObj = $.parseJSON(appsInfoStr).app;
    //appsArrayObj = uniform_obj_array(appsArrayObj);
    console.log("Response apps num ：" + appObjArray.length);
    for(var i in appObjArray) {
        var appObj = appObjArray[i];
        appObj.appIdSuffix = appObj.appId.substring(appObj.appId.lastIndexOf('_') + 1);
        var spendTime = (parseInt(appObj.finishTime) - parseInt(appObj.startTime)) / 1000;
        var memCost10GB = appObj.memoryCost / (spendTime * 1024 * 10)
        appObj.width = (memCost10GB >= 50) ? 50 : (memCost10GB<2 ? 2:memCost10GB);
        console.log("app column width:" + appObj.width + ", memCost10GB: " + memCost10GB);
        appObj.queueGroup = getQueueGroup(appObj.queue);
        if(colorMap[appObj[colorType]]==undefined){
            var colorObj = {};
            colorObj.color = colors[colorIndex++];
            colorObj.value = appObj[colorType];
            colorMap[appObj[colorType]] = colorObj;
            if(colorIndex > 12){
                colorIndex = 0;
            }
            //console.log("queue color map:"+JSON.stringify(colorMap));
        }
    }
    /*
     genenrate series
     */
    var series = [];
    $.each(appObjArray, function(i, appObj) {
        var item = {
            name: appObj.appIdSuffix,
            pointWidth: appObj.width,
            data: [],
            color: colorMap[appObj[colorType]].color
        };
        item.data.push({
            x: i,
            name: appObj.name,
            low: parseInt(appObj.startTime),
            high:parseInt(appObj.finishTime)
        });
        series.push(item);
    });
    return [appObjArray,series,colorMap];
}

function gen_app_tooltip_content(appObj){
    var hrefType = "";
    if(appObj.type=="MapReduce"){
        hrefType = "mapreduce";
    }else if(appObj.type=="IStream"){
        hrefType = "istream";
    }else if(appObj.type=="ICall"){
        hrefType = "icall";
    }
    var tableHtml = '<table class="bordered"><tr><td colspan=2><a href="/hs/'+hrefType+'/'+appObj.appId+'" target="_blank">'+appObj.appId+'</a></td></tr>';
    for(var no in appInfoConf){
        var confItem = appInfoConf[no]
        var value = appObj[confItem.attrName]
        if(confItem.format != undefined)
            value = confItem.format(value)
        tableHtml += '<tr><td>'+confItem.showName+'</td><td>'+value+'</td></tr>';
    }
    tableHtml += '</table>';
    return tableHtml;
}


function app_click(appObj){
    var hrefType = "";
    if(appObj.type=="MapReduce"){
        hrefType = "mapreduce";
    }else if(appObj.type=="IStream"){
        hrefType = "istream";
    }else if(appObj.type=="ICall"){
        hrefType = "icall";
    }
    var url = "/hs/"+hrefType+"/"+appObj.appId;
    window.open(url);
}
