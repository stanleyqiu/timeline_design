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
        ['crawl',   25.0],
        ['turing',       25],
        ['vertical',    10],
        ['pora',     30],
        ['rings',  10]
    ];

    $scope.report_cpu_used_data= [
        ['crawl',   25.0],
        ['turing',       25],
        ['vertical',    10],
        ['pora',     30],
        ['rings',  10]
    ];

    $scope.report_mem_alloc_data= [
        ['crawl',   25.0],
        ['turing',       25],
        ['vertical',    10],
        ['pora',     30],
        ['rings',  10]
    ];

    $scope.report_mem_used_data= [
        ['crawl',   25.0],
        ['turing',       25],
        ['vertical',    10],
        ['pora',     30],
        ['rings',  10]

    ];


    $scope.report_col_categories = [
        'crawl',
        'turing',
        'vertical',
        'pora',
        'rings'
    ];

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

    $scope.report_cpu_col_serie= [{
        name: 'Alloc',
        data: [49.9, 71.5, 106.4, 129.2, 144.0]

    }, {
        name: 'Used',
        data: [42.4, 33.2, 34.5, 39.7, 52.6]

    }];

    $scope.report_mem_col_serie= [{
        name: 'Alloc',
        data: [49.9, 71.5, 106.4, 129.2, 144.0]

    }, {
        name: 'Used',
        data: [42.4, 33.2, 34.5, 39.7, 52.6]

    }];

    $scope.report_cpu_cur_serie= [{
        name: 'Alloc',
        data: [106, 129, 129, 129.2, 144.0,144, 144, 144, 129.2, 144.0,144, 144, 144, 144, 144.0,144, 144, 129, 129.2, 144.0,144, 144, 129, 129.2]

    }, {
        name: 'Used',
        data: [60, 90, 90, 90, 80,70, 60, 90, 100, 100,100, 60, 60, 90, 100,120, 100, 100, 100, 90,90, 100, 100, 120]

    }];

    $scope.report_mem_cur_serie= [{
        name: 'Alloc',
        data: [106, 129, 129, 129.2, 144.0,144, 144, 144, 129.2, 144.0,144, 144, 144, 144, 144.0,144, 144, 129, 129.2, 144.0,144, 144, 129, 129.2]

    }, {
        name: 'Used',
        data: [60, 90, 90, 90, 80,70, 60, 90, 100, 100,100, 60, 60, 90, 100,120, 100, 100, 100, 90,90, 100, 100, 120]

    }];


    $scope.report_app_ids = [
        {name:'AmazonMerge',id:'appid1',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'99',cpu_rate:'99',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'ScheduleService',id:'appid2',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'98',cpu_rate:'98',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'bts_xianyu_Sync',id:'appid3',queue:'pora',user:'hadoop',cpu_alloc:'100',cpu_used:'97',cpu_rate:'97',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'taobao_auction_importer_a',id:'appid4',queue:'turing',user:'hadoop',cpu_alloc:'100',cpu_used:'96',cpu_rate:'96',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'AttachmentImage',id:'appid5',queue:'turing',user:'hadoop',cpu_alloc:'100',cpu_used:'95',cpu_rate:'95',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'resource-banner',id:'appid6',queue:'turing',user:'hadoop',cpu_alloc:'100',cpu_used:'94',cpu_rate:'94',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'PostDataMiningService',id:'appid7',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'93',cpu_rate:'93',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'ListPageCompare',id:'appid8',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'92',cpu_rate:'92',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'}
    ];

    $scope.report_app_names = [
        {name:'AmazonMerge',id:'appid1',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'99',cpu_rate:'99',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:2},
        {name:'ScheduleService',id:'appid2',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'98',cpu_rate:'98',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:2},
        {name:'bts_xianyu_Sync',id:'appid3',queue:'pora',user:'hadoop',cpu_alloc:'100',cpu_used:'97',cpu_rate:'97',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:3},
        {name:'taobao_auction_importer_a',id:'appid4',queue:'turing',user:'hadoop',cpu_alloc:'100',cpu_used:'96',cpu_rate:'96',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:3},
        {name:'AttachmentImage',id:'appid5',queue:'turing',user:'hadoop',cpu_alloc:'100',cpu_used:'95',cpu_rate:'95',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:3},
        {name:'resource-banner',id:'appid6',queue:'turing',user:'hadoop',cpu_alloc:'100',cpu_used:'94',cpu_rate:'94',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:5},
        {name:'PostDataMiningService',id:'appid7',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'93',cpu_rate:'93',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:1},
        {name:'ListPageCompare',id:'appid8',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'92',cpu_rate:'92',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:1}
    ];






    /*
     query
     */
    $scope.query_overview = function(){
        //console.log($scope.condition);
        console.log("++++++++ " + JSON.stringify($scope.condition));
        if($scope.startTimeFromStr!=null&&$scope.startTimeFromStr!=""){
            $scope.condition["startTimeFrom"] = new Date($scope.startTimeFromStr.replace(/-/g, "/")).getTime();
        }else{
            delete $scope.condition["startTimeFrom"];
        }
        if($scope.finishTimeToStr!=null&&$scope.finishTimeToStr!=""){
            $scope.condition["finishTimeTo"] = new Date($scope.finishTimeToStr.replace(/-/g, "/")).getTime();
        }else{
            delete $scope.condition["finishTimeTo"];
        }
        console.log("condition:"+JSON.stringify($scope.condition));

        //$http.get('/ws/v1/hs/apps', {params: $scope.condition
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
        $scope.render();
    };



    //scheduler














    /*
        render
     */
    $scope.render = function(){

        //first we get data from http result and store to local

        // load pie chart

            // cpu alloc pie
        var cpuAllocChartConfig = getTimelinePieChartConfig('cpu_alloc_container',$scope.report_cpu_alloc_data, 'CPU Allocate Rate');
        var cpuAlloc = new Highcharts.Chart(cpuAllocChartConfig);

            // cpu used pie
        var cpuUsedChartConfig = getTimelinePieChartConfig('cpu_used_container',$scope.report_cpu_used_data, 'CPU Used Rate');
        var cpuUsed = new Highcharts.Chart(cpuUsedChartConfig);

            // mem alloc pie

        var memAllocCartConfig = getTimelinePieChartConfig('mem_alloc_container', $scope.report_cpu_alloc_data,'MEM Allocate Rate');
        var memAlloc = new Highcharts.Chart(memAllocCartConfig);

            // mem used pie

        var memUsedChartConfig = getTimelinePieChartConfig('mem_used_container',$scope.report_cpu_used_data, 'MEM Used Rate');
        var memUsed = new Highcharts.Chart(memUsedChartConfig);


        // load column chart
            // cpu col chart

        var cpuColChartConfig = getTimelineColumnChartConfig('cpu_col_container','CPU Alloc/Used Statistics','Vcores',$scope.report_col_categories,$scope.report_cpu_col_serie);
        var cpuColChart = new Highcharts.Chart(cpuColChartConfig);
            // mem col chart

        var memColChartConfig = getTimelineColumnChartConfig('mem_col_container','MEM Alloc/Used Statistics','GBS',$scope.report_col_categories,$scope.report_mem_col_serie);
        var memColChart = new Highcharts.Chart(memColChartConfig);

        // load cur chart
        var cpuCurChartConfig = getTimelineCurChartConfig('cpu_cur_container','CPU Alloc/Used Timeline','Vcores',$scope.report_cur_categories,$scope.report_cpu_cur_serie);
        var cpuCurChart = new Highcharts.Chart(cpuCurChartConfig);

        var memCurChartConfig = getTimelineCurChartConfig('mem_cur_container','MEM Alloc/Used Timeline','Vcores',$scope.report_cur_categories,$scope.report_mem_cur_serie);
        var memCurChart = new Highcharts.Chart(memCurChartConfig);

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





});