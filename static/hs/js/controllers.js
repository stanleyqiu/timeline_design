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

        serie= [{
            name: 'Alloc',
            data: [49.9, 71.5, 106.4, 129.2, 144.0]

        }, {
            name: 'Used',
            data: [42.4, 33.2, 34.5, 39.7, 52.6]

        }]


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
        var cpuColChartConfig = getTimelineColumnChartConfig('cpu_col_container','CPU Alloc/Used Statistics','Vcores',categories,serie);
        var colChart = new Highcharts.Chart(cpuColChartConfig);

        // load cur chart
        var curChartConfig = getTimelineCurChartConfig('cpu_cur_container');
        var curChart = new Highcharts.Chart(curChartConfig);



    }
    //init timeline
    $scope.render()


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


});
