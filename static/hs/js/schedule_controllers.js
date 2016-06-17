/**
 * Created by mihe on 16/06/15.
 */

//var controllers = angular.module("controllers",["highcharts-ng"]);
controllers.controller("timelineScheduleCtrl", function($scope,$stateParams,$http) {
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




    $scope.schedule_queue_names = [
        {name:'pora',cpu_alloc:'100',cpu_used:'99',cpu_rate:'99',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',active_apps:100, pending_apps:10,steady_fair_share:500000,ins_fair_share:821980},
        {name:'crawl',cpu_alloc:'100',cpu_used:'99',cpu_rate:'99',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',active_apps:100, pending_apps:10,steady_fair_share:500000,ins_fair_share:821980},
        {name:'turing',cpu_alloc:'100',cpu_used:'99',cpu_rate:'99',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',active_apps:100, pending_apps:10,steady_fair_share:500000,ins_fair_share:821980},
        {name:'vertical',cpu_alloc:'100',cpu_used:'99',cpu_rate:'99',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',active_apps:100, pending_apps:10,steady_fair_share:500000,ins_fair_share:821980},
        {name:'rings',cpu_alloc:'100',cpu_used:'99',cpu_rate:'99',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',active_apps:100, pending_apps:10,steady_fair_share:500000,ins_fair_share:821980}
    ];

    $scope.resource_cpu_timeline= [{
        name: 'Alloc',
        data: [106, 129, 129, 129.2, 144.0,144, 144, 144, 129.2, 144.0,144, 144, 144, 144, 144.0,144, 144, 129, 129.2, 144.0,144, 144, 129, 129.2]

    }, {
        name: 'Used',
        data: [60, 90, 90, 90, 80,70, 60, 90, 100, 100,100, 60, 60, 90, 100,120, 100, 100, 100, 90,90, 100, 100, 120]

    }];

    $scope.resource_mem_timeline= [{
        name: 'Alloc',
        data: [106, 129, 129, 129.2, 144.0,144, 144, 144, 129.2, 144.0,144, 144, 144, 144, 144.0,144, 144, 129, 129.2, 144.0,144, 144, 129, 129.2]

    }, {
        name: 'Used',
        data: [60, 90, 90, 90, 80,70, 60, 90, 100, 100,100, 60, 60, 90, 100,120, 100, 100, 100, 90,90, 100, 100, 120]

    }];

    $scope.report_cur_categories = [
        '0:00',
        '1:00',
        '2:00',
        '3:00',
        '4:00',
        '5:00',
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00'
    ];






    //scheduler

    // load cur chart
    var ScheduleCpuChartConfig = getTimelineCurChartConfig('schedule_cpu_container','CPU Alloc/Used Timeline','Vcores',$scope.report_cur_categories,$scope.resource_cpu_timeline);
    new Highcharts.Chart(ScheduleCpuChartConfig);

    var ScheduleMemChartConfig = getTimelineCurChartConfig('schedule_mem_container','MEM Alloc/Used Timeline','Vcores',$scope.report_cur_categories,$scope.resource_mem_timeline);
    new Highcharts.Chart(ScheduleMemChartConfig);


    $scope.schedule_render = function(){
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




    $scope.schedule_query = function(){
        //console.log($scope.condition);
        console.log("++++++++ " + JSON.stringify($scope.condition));
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

        //first we get data from http result and store to local



    };
    //init timeline

    //$scope.query_overview();

    //init test table


    // sth about something

    $scope.tab = 'app_list';
    $scope.selectTab = function(setTab) {
        $scope.tab = setTab;
    };
    $scope.isSelected = function(checkTab) {
        return $scope.tab === checkTab;
    };





});
