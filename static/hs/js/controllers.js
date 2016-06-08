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
        render
     */
    $scope.render = function(){


        // init test data

        cpu_alloc_data= [
            ['crawl',   25.0],
            ['turing',       25],
            ['vertical',    10],
            ['pora',     30],
            ['rings',  10]
        ];

        cpu_used_data= [
            ['crawl',   25.0],
            ['turing',       25],
            ['vertical',    10],
            ['pora',     30],
            ['rings',  10]
        ];

        categories = [
            'crawl',
            'turing',
            'vertical',
            'pora',
            'rings'
        ];

        cur_categories = [
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
        serie= [{
            name: 'Alloc',
            data: [49.9, 71.5, 106.4, 129.2, 144.0]

        }, {
            name: 'Used',
            data: [42.4, 33.2, 34.5, 39.7, 52.6]

        }];

        cur_serie= [{
            name: 'Alloc',
            data: [106, 129, 129, 129.2, 144.0,144, 144, 144, 129.2, 144.0,144, 144, 144, 144, 144.0,144, 144, 129, 129.2, 144.0,144, 144, 129, 129.2]

        }, {
            name: 'Used',
            data: [60, 90, 90, 90, 80,70, 60, 90, 100, 100,100, 60, 60, 90, 100,120, 100, 100, 100, 90,90, 100, 100, 120]

        }];


        // load pie chart

            // cpu alloc pie
        var cpuAllocChartConfig = getTimelinePieChartConfig('cpu_alloc_container',cpu_alloc_data, 'CPU Allocate Rate');
        var cpuAlloc = new Highcharts.Chart(cpuAllocChartConfig);

            // cpu used pie
        var cpuUsedChartConfig = getTimelinePieChartConfig('cpu_used_container',cpu_used_data, 'CPU Used Rate');
        var cpuUsed = new Highcharts.Chart(cpuUsedChartConfig);

            // mem alloc pie

        var memAllocCartConfig = getTimelinePieChartConfig('mem_alloc_container', cpu_alloc_data,'MEM Allocate Rate');
        var memAlloc = new Highcharts.Chart(memAllocCartConfig);

            // mem used pie

        var memUsedChartConfig = getTimelinePieChartConfig('mem_used_container',cpu_used_data, 'MEM Used Rate');
        var memUsed = new Highcharts.Chart(memUsedChartConfig);


        // load column chart
            // cpu col chart

        var cpuColChartConfig = getTimelineColumnChartConfig('cpu_col_container','CPU Alloc/Used Statistics','Vcores',categories,serie);
        var cpuColChart = new Highcharts.Chart(cpuColChartConfig);
            // mem col chart

        var memColChartConfig = getTimelineColumnChartConfig('mem_col_container','MEM Alloc/Used Statistics','GBS',categories,serie);
        var memColChart = new Highcharts.Chart(memColChartConfig);

        // load cur chart
        var cpuCurChartConfig = getTimelineCurChartConfig('cpu_cur_container','CPU Alloc/Used Timeline','Vcores',cur_categories,cur_serie);
        var cpuCurChart = new Highcharts.Chart(cpuCurChartConfig);

        var memCurChartConfig = getTimelineCurChartConfig('mem_cur_container','MEM Alloc/Used Timeline','Vcores',cur_categories,cur_serie);
        var memCurChart = new Highcharts.Chart(memCurChartConfig);

    }
    //init timeline

    $scope.render()

    //init test table
    $scope.table_bodys = [
        {name:'AmazonMerge',id:'appid1',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'99',cpu_rate:'99',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'ScheduleService',id:'appid2',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'98',cpu_rate:'98',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'bts_xianyu_Sync',id:'appid3',queue:'pora',user:'hadoop',cpu_alloc:'100',cpu_used:'97',cpu_rate:'97',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'taobao_auction_importer_a',id:'appid4',queue:'turing',user:'hadoop',cpu_alloc:'100',cpu_used:'96',cpu_rate:'96',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'AttachmentImage',id:'appid5',queue:'turing',user:'hadoop',cpu_alloc:'100',cpu_used:'95',cpu_rate:'95',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'resource-banner',id:'appid6',queue:'turing',user:'hadoop',cpu_alloc:'100',cpu_used:'94',cpu_rate:'94',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'PostDataMiningService',id:'appid7',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'93',cpu_rate:'93',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'},
        {name:'ListPageCompare',id:'appid8',queue:'crawl',user:'hadoop',cpu_alloc:'100',cpu_used:'92',cpu_rate:'92',mem_alloc:'MEM Allocate',mem_used:'MEM Used',mem_rate:'MEM Rate',instances:'1'}
    ];

    $scope.init = function() {
        $scope.radioModel = "Hello";
        console.log(" haha haha ");
    }

    // sth about something

    $scope.tab = 1;
    $scope.selectTab = function(setTab) {
        $scope.tab = setTab;
    }
    $scope.isSelected = function(checkTab) {
        return $scope.tab === checkTab;
    };





});
