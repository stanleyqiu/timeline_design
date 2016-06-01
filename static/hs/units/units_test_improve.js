
//vars
var colorIndex = 0;
colorType = "unitType";
console.log("colorType is "+colorType);

var baseUnitsUrl = "/ws/v1/hs/apps/"+appId+"/units";
console.log("baseUnitsUrl:"+baseUnitsUrl);

var lastContainerId = "container";

var unitArray = [];
var MAX_LOAD_SIZE = 1000;
var MAX_SERIES_NUM_IN_GROUP = 100;
var startTs = new Date().getTime();

function seconds(){
	return " seconds:"+((new Date().getTime()-startTs)/1000);
}

function process(unitArray){
	console.log("---> Process ... "+seconds());
	if(unitArray!=null&&unitArray.length>0){
		var unitObjArray = uniform_obj_array(unitArray);
		console.log("Total units num ：" + unitObjArray.length+" "+seconds());
		var tmpArray = gen_unit_dataObjArray_series(unitObjArray, colorType);
		console.log("---> Generate series done. "+seconds());
		var dataObjArray = tmpArray[0];
		var series = tmpArray[1];
		var emptySeries = [];// tmpArray[1];
		var minTs = tmpArray[3];
		var maxTs = tmpArray[4];
		console.log("minTs:"+minTs+",maxTs:"+maxTs);
		//set plot line
		var maxShuffleFinishTime=0, maxMergeFinishTime=0;
		for(var unitNo in dataObjArray){
			if(dataObjArray[unitNo].unitAttempts==undefined)
				continue;
			var unitAttemptObjArray = uniform_obj_array(dataObjArray[unitNo].unitAttempts.unitAttempt);
			for(var attemptNo in unitAttemptObjArray){
				var unitAttemptObj = unitAttemptObjArray[attemptNo];
				if(unitAttemptObj.shuffleFinishTime > maxShuffleFinishTime){
					maxShuffleFinishTime = unitAttemptObj.shuffleFinishTime;
				}
				if(unitAttemptObj.mergeFinishTime > maxMergeFinishTime){
					maxMergeFinishTime = unitAttemptObj.mergeFinishTime;
				}
			}
		}
		console.log("maxShuffleFinishTime:"+maxShuffleFinishTime+",maxMergeFinishTime="+maxMergeFinishTime);
		
		var groupNum = series.length%MAX_SERIES_NUM_IN_GROUP==0?
				series.length/MAX_SERIES_NUM_IN_GROUP:Math.floor(series.length/MAX_SERIES_NUM_IN_GROUP)+1;
		console.log("seriesNum:"+series.length+",MAX_SERIES_NUM_IN_GROUP:"+MAX_SERIES_NUM_IN_GROUP+",groupNum:"+groupNum);
		var groupNo = 0;
		var intervalId = window.setInterval(
		  function(){
			//console.log("==>groupNum:"+groupNum+",groupNo:"+groupNo+",intervalId:"+intervalId);
			var seriesNum = MAX_SERIES_NUM_IN_GROUP;
			if(groupNo==groupNum-1){
				seriesNum = series.length - groupNo*MAX_SERIES_NUM_IN_GROUP;
			}
			var sIndex = groupNo*MAX_SERIES_NUM_IN_GROUP;
			var groupSeries = series.slice(sIndex, sIndex+seriesNum);
			var chartConfig = getTimelineChartConfig(
			    '',   //title
			    '',                     //subtitlie
			    groupSeries,                 //series
			    dataObjArray,           //dataObjArray
			    gen_unit_tooltip_content     //gen_tooltip_content function
			);
			chartConfig.yAxis.min = minTs;
			chartConfig.yAxis.max = maxTs;
			var containerId = "container_"+groupNo;
			var minHeight = seriesNum >5 ? 300 + 20 * (seriesNum-5) : 300;
			$('#'+lastContainerId).after("<div id=\""+containerId+"\" style=\"min-height:"+minHeight+"px\">"+containerId+"</div>");
			lastContainerId = containerId;
			console.log("---> Rendering "+containerId+" : groupNo:"+groupNo+", seriesNum:"+seriesNum+", minHeight:"+minHeight+" "+seconds());
			$('#'+containerId).highcharts(chartConfig);
			var chart = $('#'+containerId).highcharts();
			//Add shuffle & merge finish line
			//console.log("Start add shuffle/merge line...");
			if(maxShuffleFinishTime > 0){
				chart.yAxis[0].addPlotLine({
					label:{
				        text:'ST',
	                    style: {
	                        color: '#DEB887'
	                    },
				        align:'left'
				    },
					color: '#DEB887',
					dashStyle: 'Dot',
					width: 2,
					value: maxShuffleFinishTime
				});
			}
			if(maxMergeFinishTime > 0){
				chart.yAxis[0].addPlotLine({
					label:{
				        text:'MT',  
	                    style: {
	                        color: '#98FB98'
	                    },
				        align:'right'
				    },
					color: '#98FB98',
					dashStyle: 'Dash',
					width: 2,
					value: maxMergeFinishTime
				});
			}
			groupNo++;
			if(groupNo==groupNum){
			  console.log("---> Process Done");
			  window.clearInterval(intervalId);
			}
		  }, 10
		);
	}
}

function loadData(offset,size){
	var url = baseUnitsUrl+'?offset='+offset+'&size='+size;
	console.log("---> Loading - offset("+offset+") size("+size+") url("+url+") "+seconds());
	$.ajax({
		url: url,
		dataType: "json",
		type: "GET",
		success: loadDataCallback,
		error : function(xmlHttpRequest, textStatus, errorThrown){
		  console.error(xmlHttpRequest);
		  console.error(textStatus);
		  console.error(errorThrown);
		  alert("Error occured when request data from rest service.");
		}
	});
}

function loadDataCallback(data){
	var unitsObj = data.units;
	unitArray = unitArray.concat(unitsObj.unit);
	//console.log("---> loadDataCallback - unitArray length : "+unitArray.length);
	offset = unitsObj.offset + unitsObj.size;
	leftSize = unitsObj.totalSize - offset;
	if(leftSize>MAX_LOAD_SIZE){
		size = MAX_LOAD_SIZE;
	}else{
		size = leftSize;
	}
	//final
	if(size==0){
		console.log("---> Load done! "+seconds());
		console.log("---> Loaded unitArray:");
		console.log(unitArray);
		process(unitArray);
	}else{
		console.log("---> Keep loading : offset("+offset+") size("+size+") "+seconds());
		loadData(offset,size);
	}
}

function showTimelineChart(){
	startTs = new Date().getTime();
	var offset = 0, size = MAX_LOAD_SIZE;
	loadData(offset,size);
	$('#show_href').hide();
}


