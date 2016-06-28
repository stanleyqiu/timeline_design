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
        name: 'Assign',
        data: []

    }, {
        name: 'Usage',
        data: []

    }];

    $scope.resource_mem_timeline= [{
        name: 'Assign',
        data: []

    }, {
        name: 'Usage',
        data: []

    }];

    $scope.report_cur_categories = [
    ];


    // test data

    schedule_resource = {


        "cluster": "et2",
        "resource_metrics": [
            {
                "ts": 1463114237000,
                "cpuAssign": 5,
                "cpuUsage": 0.5,
                "memAssign": 1000,
                "memUsage": 456
            },
            {
                "ts": 1463114238000,
                "cpuAssign": 5,
                "cpuUsage": 0.5,
                "memAssign": 1000,
                "memUsage": 456
            },
            {
                "ts": 1463114239000,
                "cpuAssign": 5,
                "cpuUsage": 0.5,
                "memAssign": 1000,
                "memUsage": 456
            },
            {
                "ts": 1463114249000,
                "cpuAssign": 5,
                "cpuUsage": 0.5,
                "memAssign": 1000,
                "memUsage": 456
            }
        ]


    };


    $scope.appData = [
        {
            "id": "appid1",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid2",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid3",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid4",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid5",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid6",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid7",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid8",
            "user": "hadoop",
            "name": "taobao_auction_importer_c",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid9",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid10",
            "user": "hadoop",
            "name": "taobao_auction_importer_b",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid11",
            "user": "hadoop",
            "name": "taobao_auction_importer_a",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid12",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid13",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid14",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid15",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid16",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid17",
            "user": "hadoop",
            "name": "AmazonMerge",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        },
        {
            "id": "appid18",
            "user": "hadoop",
            "name": "ScheduleService",
            "type": "iStream",
            "queue": "crawl",
            "fair share": "Trident",
            "start time": "Fri Jan 8 14:59:29 +0800 2016",
            "finish time": "",
            "state": "Running",
            "final status": "",
            "containers": "100",
            "alloc_cpu": "10",
            "used_cpu": "6",
            "alloc_mem": "10",
            "used_mem": "6",
            "tracking_ui": ""
        }

    ];



    //scheduler



    $scope.schedule_render = function(){



        //diff by tab
        if($scope.tab == 'app_list') {



        } else if ($scope.tab == 'time_line') {

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

        } else {

            for (var item in $scope.reportCurObj) {


                console.log("data in cur is " + $scope.reportCurObj[item].ts);
                $scope.report_cur_categories.push($scope.reportCurObj[item].ts);


                for(var serie in $scope.resource_cpu_timeline) {

                    if($scope.resource_cpu_timeline[serie].name == 'Assign') {
                        $scope.resource_cpu_timeline[serie].data.push($scope.reportCurObj[item].cpuAssign);
                    } else {
                        $scope.resource_cpu_timeline[serie].data.push($scope.reportCurObj[item].cpuUsage);
                    }
                }

                for (var serie in $scope.resource_mem_timeline) {
                    if($scope.resource_mem_timeline[serie].name == 'Assign') {
                        $scope.resource_mem_timeline[serie].data.push($scope.reportCurObj[item].memAssign);
                    } else {
                        $scope.resource_mem_timeline[serie].data.push($scope.reportCurObj[item].memUsage);
                    }
                }

                // load cur chart
                var ScheduleCpuChartConfig = getTimelineCurChartConfig('schedule_cpu_container','CPU Assign/Usage Timeline','Vcores',$scope.report_cur_categories,$scope.resource_cpu_timeline);
                new Highcharts.Chart(ScheduleCpuChartConfig);

                var ScheduleMemChartConfig = getTimelineCurChartConfig('schedule_mem_container','MEM Assign/Usage Timeline','MBS',$scope.report_cur_categories,$scope.resource_mem_timeline);
                new Highcharts.Chart(ScheduleMemChartConfig);



            }


        }

    };



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

        if($scope.tab == 'app_list') {
            // get app list data
            // call apps api and then call resource api
            //$http.get('/ws/v1/timeline/apps', {params: $scope.condition
            //}).success(function(data, status, headers, config) {
            //    console.log("success!");
            //    console.log(data);
            //    if(data!=null&&data.apps!=null){
            //        $scope.appObjArray = uniform_obj_array(data.apps.app);
            //        console.log($scope.appObjArray);
            //    }else{
            //        $scope.appObjArray = [];
            //    }
            //    //render
            //    $scope.render();
            //}).error(function(data, status, headers, config) {
            //    console.log("error!");
            //    console.log("data:"+data);
            //    console.log("status:"+status);
            //    console.log("headers:"+headers);
            //    console.log("config:"+config);
            //});


        } else if ($scope.tab == 'time_line') {
            // get time line data
        } else {
            // get resource data
            //$http.get('/ws/v1/resource', {params: $scope.condition
            //}).success(function(data, status, headers, config) {
            //    console.log("success!");
            //    console.log(data);
            //    if(data!=null&&data.apps!=null){
            //        $scope.appObjArray = uniform_obj_array(data.apps.app);
            //        console.log($scope.appObjArray);
            //    }else{
            //        $scope.appObjArray = [];
            //    }
            //    //render
            //    $scope.render();
            //}).error(function(data, status, headers, config) {
            //    console.log("error!");
            //    console.log("data:"+data);
            //    console.log("status:"+status);
            //    console.log("headers:"+headers);
            //    console.log("config:"+config);
            //});
            $scope.reportCurObj = uniform_obj_array(schedule_resource.resource_metrics);
            console.log("report  array is " + JSON.stringify($scope.reportCurObj));


        }

        schedule_render();

    };





    /*
        render
     */

    //init timeline

    $scope.schedule_query();






    $scope.tab = 'app_list';
    $scope.selectTab = function(setTab) {
        $scope.tab = setTab;
        // then get data from server and set to data localize
        $scope.schedule_query();

    };
    $scope.isSelected = function(checkTab) {
        return $scope.tab === checkTab;
    };





});
