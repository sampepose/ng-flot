angular.module('app', ['ng-flot'])
    .controller("MainCtrl", function ($scope) {
        $scope.pieData = [
            { data: "1", label: "Set 1", color: "cyan" },
            { data: "5", label: "Set 2", color: "teal"}
        ];
        $scope.barData = [
            { data: [  ], label: "Set 1" }
        ];

        var i;
        for (i = 0; i < 30; i++) {
            $scope.barData[0].data.push([i, (i + 2 / 5)]);
        }

        var randData = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            2, 0, 2, 0, 2, 2, 3, 2, 4, 12, 4, 0, 2, 1, 0, 0, 0, 0, 2, 1, 0, 1, 2, 2, 0, 0, 0, 0, 4, 1, 0, 1, 3, 0, 5, 0, 0, 3, 2, 0, 0, 2, 4, 1, 2, 1, 3, 0, 3, 1,
            2, 1, 4, 1, 0, 0, 0, 0, 0, 0, 2, 0, 1, 2, 0, 0, 3, 0, 0, 1, 3, 0, 0, 0, 0, 2, 1, 6, 0, 0, 3, 0, 3, 1, 0, 2, 0, 0, 0, 0, 2, 0, 3, 0, 6, 5, 5, 2, 4, 2,
            2, 3, 1, 3, 0, 2, 5, 5, 4, 1, 0, 2, 1, 1, 0, 5, 6, 2, 5, 1, 1, 9, 1, 3, 0, 0, 3, 2, 5, 5, 5, 7, 2, 4, 2, 5, 2, 2, 0, 3, 0, 2, 1, 2, 6, 1, 6, 6, 11, 8,
            10, 5, 3, 1, 1, 1, 1, 1, 0, 0, 3, 2, 0, 4, 0, 0, 2, 5, 12, 10, 11, 15, 0, 4, 11, 11, 15, 7, 7, 2, 0, 7, 7, 4, 0, 6, 5, 4, 4, 5, 3, 3, 2, 0, 2, 2, 4, 3, 6, 5,
            5, 5, 4, 9, 0, 0, 6, 12, 17, 4, 9, 9, 0, 3, 5, 6, 2, 7, 0, 0, 2, 4, 1, 2, 4, 4, 2, 5, 2, 2, 6, 0, 2, 7, 8, 6, 6, 5, 0, 1, 3, 3, 3, 0, 5, 4, 0, 1, 2, 3,
            0, 0, 4, 4, 4, 1, 1, 3, 0, 0, 2, 2, 0, 3, 2, 0, 6, 0, 4, 0, 0, 2, 0, 3, 4, 4, 4, 6, 5, 4, 2, 8, 4, 9, 8, 6, 7, 6, 4, 5, 1, 2, 2, 6, 7, 2, 0, 4, 1, 3,
            2, 0, 0, 4, 0, 1, 2, 2, 1, 2, 1, 2, 5, 0, 1, 2, 2, 3, 0, 5, 1, 1, 2, 2, 2, 5, 2, 2, 1, 0, 0, 3, 0, 0, 2, 6, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 2,
            2, 1, 1, 2, 0, 0, 0, 0, 2, 6, 9, 5, 0, 4, 0, 0, 0, 4, 2, 0, 2, 2, 5, 6, 13, 12, 10, 16, 14, 7, 2, 6, 0, 2, 5, 7, 8, 6, 10, 3, 2, 5, 2, 8, 5, 4, 2, 0, 7, 9,
            1, 0, 1, 0, 1, 1, 3, 3, 0, 1, 0, 0, 4, 0, 0, 0, 3, 0, 6, 1, 2, 0, 2, 2, 0, 2, 0, 5, 1, 0, 2, 0, 0, 0, 2, 1, 0, 2, 0, 4, 0, 0, 0, 1, 2, 0, 0, 1, 1, 2,
            0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 4, 4, 1, 0, 3, 4, 4, 1, 3, 0, 2, 0, 1, 0, 3, 1, 2, 3, 0, 3, 0, 2, 0, 3, 2, 0, 0, 0, 2, 3, 0, 0, 1, 1, 1, 1,
            3, 3, 2, 2, 2, 0, 1, 2, 3, 1, 1, 0, 1, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 3, 0, 1, 0, 1, 1, 2, 2, 2, 4, 0, 6, 2, 1, 0, 0, 1, 1, 1, 0, 1, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 ];
        $scope.lineData = [];
        $scope.lineData2 = [];

        for (i = 0; i < randData.length; i++) {
            $scope.lineData.push([i, randData[i]]);
        }
        for (i = 0; i < randData.length; i++) {
            if (randData[i] > 2)
                $scope.lineData2.push([i, randData[i] - 2]);
            else
                $scope.lineData2.push([i, randData[i] + 1]);
        }
        $scope.lineData = [
            { data: $scope.lineData, label: "Set 1" },
            { data: $scope.lineData2, label: "Set 2" }
        ];
        $scope.lineData2 = [
            {data: $scope.lineData2, label: "Set 1"}
        ];
    });