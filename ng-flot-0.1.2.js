/*
 ng-flot: Angular wrapper for Flotjs graphs
 Version 0.1.2
 Author: Sam Pepose
 */

angular.module('ng-flot', [])
    /* ngFlot

     <div ng-flot="bar" data-graph-data="data" data-graph-title="My Graph" data-graph-class="graphClass" data-graph-options="graphOpts"></div>

     Main directive for a Flot graph. Must be wrapped with an element w/ a width.

     ng-flot="bar | pie | line" [REQUIRED]
     graph-data="data" [REQUIRED]
         How to format the data (handles multiple sets of data):
            Bar: [{data : [ [1, 1], [2, 2], [3, 3] ], label: "Set 1" }, ...]
            Pie: [{data : 5, label : "Set 1", color : "black" }, ...]
            Line: [{data : [ [1, 1], [2, 2], [3, 3] ], label: "Set 1" }, ...]
     graph-title="string" (Title for graph) [OPTIONAL]
     graph-class="string" (A string of any CSS classes to add to the element) [OPTIONAL]
     graph-options="graphOpts" (An object of Flot options to use instead of the defaults) [OPTIONAL]
     */
    .directive("ngFlot", function () {
        return {
            restrict: "A",
            priority: 1,
            template: "<div style='width: 100%;display: inline-block;'>" +
                "<div ng-bind='graphTitle' style='text-align: center;'></div>" +
                "<div ng-class='graphClass' class='graph' style='width: 100%; height: 100%'></div>" +
                "</div>",
            scope: {
                graphData: "&",
                graphDataUrls: "&",
                graphTitle: "@",
                graphClass: "@",
                graphOptions: "&"
            },
            link: function (sc, el, attrs, ctrl) {
                var defaultOpts = {
                    legend: {
                        show: true,
                        noColumns: 1
                    }
                };

                switch (attrs.ngFlot) {
                    case "pie":
                        defaultOpts.series = {
                            pie: {
                                show: true
                            }
                        };
                        break;
                    case "bar":
                        defaultOpts.bars = {
                            show: true
                        };
                        break;
                    case "line":
                        defaultOpts.lines = {
                            lineWidth: 2,
                            fill: true,
                            fillColor: {
                                colors: [
                                    { opacity: 0.3 },
                                    { opacity: 0.3 }
                                ]
                            }
                        };
                        break;
                }

                ctrl.data = sc.graphData();
                ctrl.plot = $.plot($(el).find(".graph"), sc.graphData(), jQuery.extend({}, defaultOpts, sc.graphOptions()));

                sc.$watch(
                    function () {
                        return sc.graphData();
                    },
                    function (n, o) {
                        if (n !== o) {
                            ctrl.data = n;
                            $.plot($(el).find(".graph"), sc.graphData(), jQuery.extend({}, defaultOpts, sc.graphOptions()));
                        }
                    },
                    true);
            },
            controller: function ($scope) {
            }
        }
    })
    /*
     Service for keeping track of graph families (groups).

     Data is stored in this format: [ { name : "", maxX : "", maxY : "" }, ... ]
     */
    .factory("GraphFamilyService", function () {
        var data = {};
        data.families = [];

        data.hasFamily = function (familyName) {
            for (var i = 0; i < data.families.length; i++) {
                if (data.families[i].name === familyName) {
                    return true;
                }
            }
            return false;
        };

        data.setMax = function (familyName, graphData) {
            for (var i = 0; i < data.families.length; i++) {
                if (data.families[i].name === familyName) {
                    var maxX = data.families[i].maxX, maxY = data.families[i].maxY;
                    for (var k = 0; k < graphData.length; k++) {
                        for (var j = 0; j < graphData[k].data.length; j++) {
                            if (graphData[k].data[j][0] > maxX) {
                                maxX = Math.max(graphData[k].data[j][0]);
                            }
                            if (graphData[k].data[j][1] > maxY) {
                                maxY = Math.max(graphData[k].data[j][1]);
                            }
                        }
                    }
                    data.families[i].maxX = Math.round((maxX + 1) / 2) * 2;
                    data.families[i].maxY = Math.round((maxY + 1) / 2) * 2;
                    return;
                }
            }
        };

        data.getMax = function (familyName) {
            for (var i = 0; i < data.families.length; i++) {
                if (data.families[i].name === familyName) {
                    return {
                        maxX: data.families[i].maxX,
                        maxY: data.families[i].maxY
                    }
                }
            }
            return undefined;
        };

        data.addNewFamily = function (familyName, graphData) {
            data.families.push({ name: familyName, maxX: 0, maxY: 0});
            data.setMax(familyName, graphData);
        };

        return data;
    })
    /* graphFamily

     <div graph="pie" graph-family="family-name"></div>

     Use this directive along with the 'graph' directive.
     It groups graphs into a "family". This ensures all
     graphs in the family have the same x and y axis values.
     This is useful for comparing multiple graphs of similar data.
     */
    .directive("graphFamily", ["GraphFamilyService", function (GraphFamilyService) {
        return {
            restrict: "A",
            require: "ngFlot",
            priority: 2,
            link: function (sc, el, attrs, ctrl) {
                var redraw = function () {
                    ctrl.plot.getOptions().yaxes[0].max = GraphFamilyService.getMax(attrs.graphFamily).maxY;
                    ctrl.plot.getOptions().xaxes[0].max = GraphFamilyService.getMax(attrs.graphFamily).maxX;
                    ctrl.plot.setupGrid();
                    ctrl.plot.draw();
                };

                if (GraphFamilyService.hasFamily(attrs.graphFamily)) {
                    GraphFamilyService.setMax(attrs.graphFamily, ctrl.data);
                } else {
                    GraphFamilyService.addNewFamily(attrs.graphFamily, ctrl.data);
                }

                sc.$watch(function () {
                    return GraphFamilyService.getMax(attrs.graphFamily);
                }, function (n, o) {
                    redraw();
                }, true);
            }
        }
    }]);