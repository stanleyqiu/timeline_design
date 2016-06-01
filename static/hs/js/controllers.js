/**
 * Created by boyuan on 15/12/15.
 */

var controllers = angular.module("controllers",["highcharts-ng"]);
controllers.controller("timelinePageCtrl", function($scope,$stateParams,$http) {
    $scope.condition = {
        limit: 100   //max results number
    };
    if($stateParams.appType!=undefined){
        $scope.condition.type = $stateParams.appType;
        console.log("App type is "+$stateParams.appType);
    }
    /*
        colorType
     */
    $scope.colorTypeMapping = {
        "Queue": "queueGroup",
        "User": "user",
        "Type": "type",
        "State": "state"
    };
    $scope.colorTypeShow = "Queue";
    $scope.colorType = $scope.colorTypeMapping[$scope.colorTypeShow], //default is queue
    $scope.changeColorType = function(colorTypeShow){
        $scope.colorTypeShow = colorTypeShow;
        $scope.colorType = $scope.colorTypeMapping[$scope.colorTypeShow];
        $scope.render();
    };
    /*
        query
     */
    $scope.query = function(){
        //console.log($scope.condition);
    	if($scope.startTimeFromStr!=null&&$scope.startTimeFromStr!=""){
            $scope.condition["startTimeFrom"] = new Date($scope.startTimeFromStr.replace(/-/g, "/")).getTime();
        }else{
            delete $scope.condition["startTimeFrom"];
        }
        if($scope.startTimeToStr!=null&&$scope.startTimeToStr!=""){
            $scope.condition["startTimeTo"] = new Date($scope.startTimeToStr.replace(/-/g, "/")).getTime();
        }else{
            delete $scope.condition["startTimeTo"];
        }
        if($scope.finishTimeFromStr!=null&&$scope.finishTimeFromStr!=""){
            $scope.condition["finishTimeFrom"] = new Date($scope.finishTimeFromStr.replace(/-/g, "/")).getTime();
        }else{
            delete $scope.condition["finishTimeFrom"];
        }
        if($scope.finishTimeToStr!=null&&$scope.finishTimeToStr!=""){
            $scope.condition["finishTimeTo"] = new Date($scope.finishTimeToStr.replace(/-/g, "/")).getTime();
        }else{
            delete $scope.condition["finishTimeTo"];
        }
        console.log("condition:"+JSON.stringify($scope.condition));
        $http.get('/ws/v1/hs/apps', {params: $scope.condition
        }).success(function(data, status, headers, config) {
            console.log("success!");
            console.log(data);
//            console.log("status:"+status);
//            console.log("headers:"+headers);
//            console.log("config:"+config);
            if(data!=null&&data.apps!=null){
            	$scope.appObjArray = uniform_obj_array(data.apps.app);
            	console.log($scope.appObjArray);
            }else{
            	$scope.appObjArray = [];
            }
            //render
            $scope.render();
        }).error(function(data, status, headers, config) {
            console.log("error!");
            console.log("data:"+data);
            console.log("status:"+status);
            console.log("headers:"+headers);
            console.log("config:"+config);
        });
        //TODO: for webstorm test
        //var appsInfoStr = '{"app":[{"appId":"application_1448603462425_0001","name":"app01","queue":"root.default","user":"yangtao.yt","type":"MapReduce","state":"SUCCEEDED","startTime":"1449830000000","finishTime":"1449880000000","cpuCost":"1000","memoryCost":"10000000"},{"appId":"application_1448603462425_0002","name":"app02","queue":"root.test.subtest1","user":"boyuan","type":"MapReduce","state":"SUCCEEDED","startTime":"1449840000000","finishTime":"1449870000000","cpuCost":"5000","memoryCost":"50000000"},{"appId":"application_1448603462425_0003","name":"app03","queue":"root.default","user":"boyuan","type":"MapReduce","state":"SUCCEEDED","startTime":"1449850000000","finishTime":"1449860000000","cpuCost":"3000","memoryCost":"30000000"},{"appId":"application_1448603462425_0004","name":"app04","queue":"root.product.inc","user":"yangtao.yt","type":"MapReduce","state":"FAIL","startTime":"1449865000000","finishTime":"1449910000000","cpuCost":"10000","memoryCost":"200000000"},{"appId":"application_1448603462425_0005","name":"app05","queue":"root.crawl","user":"boyuan","type":"IStream","state":"SUCCEEDED","startTime":"1449875000000","finishTime":"1449880000000","cpuCost":"20000","memoryCost":"100000000"},{"appId":"application_1448603462425_0006","name":"app06","queue":"root.taobao.test","user":"yangtao.yt","type":"MapReduce","state":"FAIL","startTime":"1449890000000","finishTime":"1449900000000","cpuCost":"6000","memoryCost":"80000000"},{"appId":"application_1448603462425_0007","name":"app07","queue":"root.crawl","user":"boyuan","type":"IStream","state":"SUCCEEDED","startTime":"1449895000000","finishTime":"1449910000000","cpuCost":"10000","memoryCost":"200000000"}]}';
        //$scope.appObjArray = uniform_obj_array($.parseJSON(appsInfoStr).app);
    };
    /*
        render
     */
    $scope.render = function(){
    	if($scope.appObjArray.length>0){
	        var tmpArray = gen_app_dataObjArray_series($scope.appObjArray, $scope.colorType);
	        var dataObjArray = tmpArray[0];
	        var series = tmpArray[1];
	        $scope.colorMap = tmpArray[2];

	        var height = dataObjArray.length * 30;
	        height = height < 300 ? 300 : height;
            console.log("Chart height:"+height);
            $("#container").height(height+"px");
            //
	        var chartConfig = getTimelineChartConfig(
	            'Apps Timeline Chart',   //title
	            '',                     //subtitlie
	            'container',			//renderTo
	            series,                 //series
	            dataObjArray,           //dataObjArray
	            gen_app_tooltip_content,//gen_tooltip_content function
	            app_click				//click function
	        );
            if($('#container').highcharts()!=undefined){
                $('#container').highcharts().destroy();
//                console.log("----------->destroy");
            }
            new Highcharts.Chart(chartConfig);
    	}else{
    		$("#container").height("0px");
    		$scope.colorMap = {}
    		if($('#container').highcharts()!=undefined){
                $('#container').highcharts().destroy();
                console.log("----------->destroy");
            }
    	}
    }
    //init timeline
    $scope.query();

    // test chart
    $scope.d3 = [
        { label: "Q1", data: 40 },
        { label: "Q2", data: 10 },
        { label: "Q3", data: 20 },
        { label: "Q4", data: 12 },
        { label: "Q5", data: 18 }
    ];

    $scope.d = [ [1,8.5],[2,8.5],[3,8.5],[4,8.5],[5,8],[6,8.5],[7,8.5],[8,8],[9,8],[10,8],[11,8.5],[12,8] ];
    $scope.d_1 = [ [1,7.5],[2,7.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ];

    $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

    $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

    $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

    $scope.d1_2 = [ [10, 50],  [20, 60], [30, 90],  [40, 35] ];

    $scope.d1_3 = [ [10, 80],  [20, 40], [30, 30],  [40, 20] ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
        $scope.d2.push([i, Math.sin(i)]);
    }

    //test table


    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };

    $scope.totalServerItems = 0;

    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    };

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };

});
