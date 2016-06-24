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

    // data for  show in overview

    $scope.report_cpu_alloc_data= [

    ];

    $scope.report_cpu_used_data= [

    ];

    $scope.report_mem_alloc_data= [

    ];

    $scope.report_mem_used_data= [
    ];

    $scope.report_col_categories = [

    ];

    $scope.report_cur_categories = [
    ];

    $scope.report_cpu_col_serie= [{
        name: 'Assign',
        data: []

    }, {
        name: 'Usage',
        data: []

    }];

    $scope.report_mem_col_serie= [{
        name: 'Assign',
        data: []

    }, {
        name: 'Usage',
        data: []

    }];

    $scope.report_cpu_cur_serie= [{
        name: 'Assign',
        data: []

    }, {
        name: 'Usage',
        data: []

    }];

    $scope.report_mem_cur_serie= [{
        name: 'Assign',
        data: []

    }, {
        name: 'Usage',
        data: []

    }];




    // mock data for test

    data = {
        "report" : {
            "type" : "TOP_APP_CPU_RATE_BY_NAME",
            "items" : [
                {
                    "appName" : "name1",
                    "appId" : "appid1",
                    "appQueue" : "q1",
                    "user" : "hadoop",
                    "cpuUsage" : 230,
                    "cpuAssign" : 500,
                    "memAssign" : 10000,
                    "memUsage" : 1000,
                    "instance" : 2
                },
                {
                    "appName" : "name1",
                    "appId" : "appid1",
                    "appQueue" : "q1",
                    "user" : "hadoop",
                    "cpuUsage" : 230,
                    "cpuAssign" : 500,
                    "memAssign" : 10000,
                    "memUsage" : 1000,
                    "instance" : 2
                },
                {
                    "appName" : "name1",
                    "appId" : "appid1",
                    "appQueue" : "q1",
                    "user" : "hadoop",
                    "cpuUsage" : 230,
                    "cpuAssign" : 500,
                    "memAssign" : 10000,
                    "memUsage" : 1000,
                    "instance" : 2
                },
                {
                    "appName" : "name1",
                    "appId" : "appid1",
                    "appQueue" : "q1",
                    "user" : "hadoop",
                    "cpuUsage" : 230,
                    "cpuAssign" : 500,
                    "memAssign" : 10000,
                    "memUsage" : 1000,
                    "instance" : 2
                },
                {
                    "appName" : "name1",
                    "appId" : "appid1",
                    "appQueue" : "q1",
                    "user" : "hadoop",
                    "cpuUsage" : 230,
                    "cpuAssign" : 500,
                    "memAssign" : 10000,
                    "memUsage" : 1000,
                    "instance" : 2
                }

            ]
        }
    };

    report_data = {
        "report" : {
            "type" : "QUEUE",
            "items" : [
                {
                    "queue" : "q1",
                    "cpuUsage" : 230,
                    "cpuAssign" : 500,
                    "memAssign" : 10000,
                    "memUsage" : 1000,
                    "activeApps" : 100,
                    "pendingApps" : 10,
                    "steadyFairShare" : 500000,
                    "instantaneousFairShare" : 821980
                },
                {
                    "queue" : "q2",
                    "cpuUsage" : 120,
                    "cpuAssign" : 300,
                    "memAssign" : 20000,
                    "memUsage" : 800,
                    "activeApps" : 100,
                    "pendingApps" : 10,
                    "steadyFairShare" : 500000,
                    "instantaneousFairShare" : 821980
                },
                {
                    "queue" : "q3",
                    "cpuUsage" : 120,
                    "cpuAssign" : 300,
                    "memAssign" : 20000,
                    "memUsage" : 800,
                    "activeApps" : 100,
                    "pendingApps" : 10,
                    "steadyFairShare" : 500000,
                    "instantaneousFairShare" : 821980
                },
                {
                    "queue" : "q4",
                    "cpuUsage" : 120,
                    "cpuAssign" : 300,
                    "memAssign" : 20000,
                    "memUsage" : 800,
                    "activeApps" : 100,
                    "pendingApps" : 10,
                    "steadyFairShare" : 500000,
                    "instantaneousFairShare" : 821980
                }
            ]
        }
    };


    overview_resource = {


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

    // end mock data

    $scope.reportType = 'CPU Rate Top';


    $scope.observeReportType = function(newValue,oldValue){

        console.log(" enter observe ");

        if($scope.reportType!=null&&$scope.reportType=="CPU Rate Top"){

            if($scope.tab=="app_id") {
                $scope.condition["type"] = "TOP_APP_CPU_RATE_BY_ID";
            } else {
                $scope.condition["type"] = "TOP_APP_CPU_RATE_BY_NAME";
            }

        }else if($scope.reportType!=null&&$scope.reportType=="CPU Rate Bottom"){
            if($scope.tab=="app_id") {
                $scope.condition["type"] = "BOTTOM_APP_CPU_RATE_BY_ID";
            } else {
                $scope.condition["type"] = "BOTTOM_APP_CPU_RATE_BY_NAME";
            }

        }else if($scope.reportType!=null&&$scope.reportType=="CPU Oversold") {
            if($scope.tab=="app_id") {
                $scope.condition["type"] = "CPU_OVERSOLD_BY_ID";
            } else {
                $scope.condition["type"] = "CPU_OVERSOLD_BY_NAME";
            }

        } else if($scope.reportType!=null&&$scope.reportType=="Mem Rate Top") {
            if($scope.tab=="app_id") {
                $scope.condition["type"] = "TOP_APP_MEM_RATE_BY_ID";
            } else {
                $scope.condition["type"] = "TOP_APP_MEM_RATE_BY_NAME";
            }

        } else if($scope.reportType!=null&&$scope.reportType=="Mem Rate Bottom") {
            if($scope.tab=="app_id") {
                $scope.condition["type"] = "BOTTOM_APP_MEM_RATE_BY_ID";
            } else {
                $scope.condition["type"] = "BOTTOM_APP_CPU_RATE_BY_NAME";
            }

        } else {
            if($scope.tab=="app_id") {
                $scope.condition["type"] = "MEM_OVERSOLD_BY_ID";
            } else {
                $scope.condition["type"] = "MEM_OVERSOLD_BY_NAME";
            }

        }

        console.log("++++ observer report type ++++ " + JSON.stringify($scope.condition));
        //$http.get('/ws/v1/report', {params: $scope.condition
        //}).success(function(data, status, headers, config) {
        //    console.log("success!");
        //    console.log(data);
        //
        //    if(data!=null&&data.report!=null){
        //
        //        //var obj = angular.fromJson(data);
        //
        //        //console.log("test json data " + JSON.stringify(obj.report));
        //        // set data to report_app_ids
        //        $scope.blackListObj = uniform_obj_array(data.report.items);
        //
        //    } else {
        //        $scope.blackListObj = [];
        //    }
        //}).error(function(data, status, headers, config) {
        //    console.log("error!");
        //    console.log("data:"+data);
        //    console.log("status:"+status);
        //    console.log("headers:"+headers);
        //    console.log("config:"+config);
        //});

        // for test



        if(data!=null&&data.report!=null){

            //var obj = angular.fromJson(data);

            //console.log("test json data " + JSON.stringify(obj.report));
            // set data to report_app_ids
            $scope.blackListObj = uniform_obj_array(data.report.items);

        } else {
            $scope.blackListObj = [];
        }


    };


    $scope.$watch('reportType + tab',$scope.observeReportType);


    /*
     query
     */
    $scope.query_overview = function(){
        //console.log($scope.condition);
        console.log("test date api " + new Date().getTime());

        var rightNow = new Date().getTime();

        console.log("++++ query overview ++++ " + JSON.stringify($scope.condition));
        if($scope.startTimeFromStr!=null&&$scope.startTimeFromStr!=""){
            $scope.condition["startTimeFrom"] = new Date($scope.startTimeFromStr.replace(/-/g, "/")).getTime();
            console.log("start time str :"+$scope.startTimeFromStr);
        }else{
            //set default date time
            $scope.condition["startTimeFrom"] = rightNow - 24*3600*1000;
        }
        if($scope.finishTimeToStr!=null&&$scope.finishTimeToStr!=""){
            $scope.condition["finishTimeTo"] = new Date($scope.finishTimeToStr.replace(/-/g, "/")).getTime();
        }else{
            //set default date time
            $scope.condition["finishTimeTo"] = rightNow;
        }
        console.log("condition:"+JSON.stringify($scope.condition));

        var interval = ($scope.condition["finishTimeTo"] - $scope.condition["startTimeFrom"])/ 24;
        $scope.condition["interval"] = interval;
        console.log("the interval is " + $scope.condition["interval"]);

        // get queues data firstly

        //$http.get('/ws/v1/report', {params: $scope.condition
        //}).success(function(data, status, headers, config) {
        //    console.log("success!");
        //    console.log(data);
        //
        //
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

        // get time line data
        // call
        // set default time range  and interval ++++++++

        // if not contain the time range , set default value

        //$http.get('/ws/v1/resource', {params: $scope.condition
        //}).success(function(data, status, headers, config) {
        //    console.log("success!");
        //    console.log(data);
        //
        //
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




        //TODO: for webstorm test
        //var appsInfoStr = '{"app":[{"appId":"application_1448603462425_0001","name":"app01","queue":"root.default","user":"yangtao.yt","type":"MapReduce","state":"SUCCEEDED","startTime":"1449830000000","finishTime":"1449880000000","cpuCost":"1000","memoryCost":"10000000"},{"appId":"application_1448603462425_0002","name":"app02","queue":"root.test.subtest1","user":"boyuan","type":"MapReduce","state":"SUCCEEDED","startTime":"1449840000000","finishTime":"1449870000000","cpuCost":"5000","memoryCost":"50000000"},{"appId":"application_1448603462425_0003","name":"app03","queue":"root.default","user":"boyuan","type":"MapReduce","state":"SUCCEEDED","startTime":"1449850000000","finishTime":"1449860000000","cpuCost":"3000","memoryCost":"30000000"},{"appId":"application_1448603462425_0004","name":"app04","queue":"root.product.inc","user":"yangtao.yt","type":"MapReduce","state":"FAIL","startTime":"1449865000000","finishTime":"1449910000000","cpuCost":"10000","memoryCost":"200000000"},{"appId":"application_1448603462425_0005","name":"app05","queue":"root.crawl","user":"boyuan","type":"IStream","state":"SUCCEEDED","startTime":"1449875000000","finishTime":"1449880000000","cpuCost":"20000","memoryCost":"100000000"},{"appId":"application_1448603462425_0006","name":"app06","queue":"root.taobao.test","user":"yangtao.yt","type":"MapReduce","state":"FAIL","startTime":"1449890000000","finishTime":"1449900000000","cpuCost":"6000","memoryCost":"80000000"},{"appId":"application_1448603462425_0007","name":"app07","queue":"root.crawl","user":"boyuan","type":"IStream","state":"SUCCEEDED","startTime":"1449895000000","finishTime":"1449910000000","cpuCost":"10000","memoryCost":"200000000"}]}';
        //$scope.appObjArray = uniform_obj_array($.parseJSON(appsInfoStr).app);

        // for test
        // this data get by type = QUEUE
        if(report_data!=null&&report_data.report.items!=null){
            //console.log("report data is " + JSON.stringify(report_data.report.items));
            $scope.reportObjArray = uniform_obj_array(report_data.report.items);
            //console.log("report obi array is " +$scope.reportObjArray);
        }else{
            $scope.reportObjArray = [];
        }


        // get data for cur data
        $scope.reportCurObj = uniform_obj_array(overview_resource.resource_metrics);
        console.log("report  array is " + JSON.stringify($scope.reportCurObj));
        // init data in tables by default ID
        $scope.render();

    };

    /*
        render
     */
    totalCpuAssign = 0;
    totalCpuUsage = 0;
    totalMemAssign = 0;
    totalMemUsage = 0;

    $scope.render = function(){

        //first we get data from http result and store to local

        for (var item in $scope.reportObjArray) {

            //console.log("data is " + $scope.reportObjArray[item].queue + ":" + $scope.reportObjArray[item].cpuAlloc);
            totalCpuAssign += $scope.reportObjArray[item].cpuAssign;
            totalCpuUsage += $scope.reportObjArray[item].cpuUsage;
            totalMemAssign += $scope.reportObjArray[item].memAssign;
            totalMemUsage += $scope.reportObjArray[item].memUsage;
            //$scope.report_cpu_alloc_data.push([$scope.reportObjArray[item].queue,$scope.reportObjArray[item].cpuAlloc]);
            //console.log($scope.report_cpu_alloc_data)
            $scope.report_col_categories.push($scope.reportObjArray[item].queue);

            for(var serie in $scope.report_cpu_col_serie) {
                if($scope.report_cpu_col_serie[serie].name == 'Assign') {
                    $scope.report_cpu_col_serie[serie].data.push($scope.reportObjArray[item].cpuAssign);
                } else {
                    $scope.report_cpu_col_serie[serie].data.push($scope.reportObjArray[item].cpuUsage);
                }

            }

            for(var serie in $scope.report_mem_col_serie) {
                if($scope.report_mem_col_serie[serie].name == 'Assign') {
                    $scope.report_mem_col_serie[serie].data.push($scope.reportObjArray[item].memAssign);
                } else {
                    $scope.report_mem_col_serie[serie].data.push($scope.reportObjArray[item].memUsage);
                }

            }

        }

        for (var item in $scope.reportObjArray) {

            $scope.report_cpu_alloc_data.push([$scope.reportObjArray[item].queue,100*$scope.reportObjArray[item].cpuAssign/totalCpuAssign]);
            $scope.report_cpu_used_data.push([$scope.reportObjArray[item].queue,100*$scope.reportObjArray[item].cpuUsage/totalCpuUsage]);
            $scope.report_mem_alloc_data.push([$scope.reportObjArray[item].queue,100*$scope.reportObjArray[item].memAssign/totalMemAssign]);
            $scope.report_mem_used_data.push([$scope.reportObjArray[item].queue,100*$scope.reportObjArray[item].memUsage/totalMemUsage]);

        }


        console.log("enter to data " + JSON.stringify($scope.reportCurObj));

        for (var item in $scope.reportCurObj) {


            console.log("data in cur is " + $scope.reportCurObj[item].ts);
            $scope.report_cur_categories.push($scope.reportCurObj[item].ts);


            for(var serie in $scope.report_cpu_cur_serie) {

                if($scope.report_cpu_cur_serie[serie].name == 'Assign') {
                    $scope.report_cpu_cur_serie[serie].data.push($scope.reportCurObj[item].cpuAssign);
                } else {
                    $scope.report_cpu_cur_serie[serie].data.push($scope.reportCurObj[item].cpuUsage);
                }
            }

            for (var serie in $scope.report_mem_cur_serie) {
                if($scope.report_mem_cur_serie[serie].name == 'Assign') {
                    $scope.report_mem_cur_serie[serie].data.push($scope.reportCurObj[item].memAssign);
                } else {
                    $scope.report_mem_cur_serie[serie].data.push($scope.reportCurObj[item].memUsage);
                }
            }







        }


        // load pie chart

            // cpu alloc pie
        var cpuAllocChartConfig = getTimelinePieChartConfig('cpu_alloc_container',$scope.report_cpu_alloc_data, 'CPU Assign Rate');
        var cpuAlloc = new Highcharts.Chart(cpuAllocChartConfig);

            // cpu used pie
        var cpuUsedChartConfig = getTimelinePieChartConfig('cpu_used_container',$scope.report_cpu_used_data, 'CPU Usage Rate');
        var cpuUsed = new Highcharts.Chart(cpuUsedChartConfig);

            // mem alloc pie

        var memAllocCartConfig = getTimelinePieChartConfig('mem_alloc_container', $scope.report_cpu_alloc_data,'MEM Assign Rate');
        var memAlloc = new Highcharts.Chart(memAllocCartConfig);

            // mem used pie

        var memUsedChartConfig = getTimelinePieChartConfig('mem_used_container',$scope.report_cpu_used_data, 'MEM Usage Rate');
        var memUsed = new Highcharts.Chart(memUsedChartConfig);


        // load column chart
            // cpu col chart

        var cpuColChartConfig = getTimelineColumnChartConfig('cpu_col_container','CPU Assign/Usage Statistics','Vcores',$scope.report_col_categories,$scope.report_cpu_col_serie);
        var cpuColChart = new Highcharts.Chart(cpuColChartConfig);
            // mem col chart

        var memColChartConfig = getTimelineColumnChartConfig('mem_col_container','MEM Assign/Usage Statistics','MB',$scope.report_col_categories,$scope.report_mem_col_serie);
        var memColChart = new Highcharts.Chart(memColChartConfig);

        // load cur chart
        var cpuCurChartConfig = getTimelineCurChartConfig('cpu_cur_container','CPU Assign/Usage Timeline','Vcores',$scope.report_cur_categories,$scope.report_cpu_cur_serie);
        var cpuCurChart = new Highcharts.Chart(cpuCurChartConfig);

        var memCurChartConfig = getTimelineCurChartConfig('mem_cur_container','MEM Assign/Usage Timeline','MB',$scope.report_cur_categories,$scope.report_mem_cur_serie);
        var memCurChart = new Highcharts.Chart(memCurChartConfig);

        if(data!=null&&data.report.items!=null){
            $scope.blackListObj=uniform_obj_array(data.report.items);
            //console.log($scope.blackListObj);
        }else{
            $scope.blackListObj = [];
        }




    }
    //init timeline

    $scope.query_overview();

    //init test table


    // sth about something

    $scope.tab = 'app_id';
    $scope.selectTab = function(setTab) {
        $scope.tab = setTab;
    };
    $scope.isSelected = function(checkTab) {
        return $scope.tab === checkTab;
    };

    $scope.setReportType = function(type) {
        $scope.reportType = type;
    };





});