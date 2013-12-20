ng-flot
=======

ng-flot provides a collection of Angularjs directives for displaying Flotjs graphs.

## Getting Started
1. Include the ng-flot.js file in your project
2. Add `ng-flot` to your list of dependencies in your main module
3. You're good to go! See below for how to use the directives!

## Directives
#### ng-flot
```
<div ng-flot="bar" data-graph-data="data" data-graph-title="My Graph" data-graph-class="graphClass"
data-graph-options="graphOpts"></div>
```

This is the main directive for a Flot graph. The attributes are explained here:

`ng-flot="bar | pie | line"` This is **required** to get everything rolling. Pass in the type of graph you want.

`graph-data="data"` This is also **required** as this is the data to plot. All graphs accept multiple sets of data.
This data must be formatted as follows for each graph type:
* Bar: [{data : [ [1, 1], [2, 2], [3, 3] ], label: "Set 1" }, ...]
* Pie: [{data : 5, label : "Set 1", color : "black" }, ...]
* Line: [{data : [ [1, 1], [2, 2], [3, 3] ], label: "Set 1" }, ...]

`graph-title="string"` This is an optional attribute which adds a title to the graph.

`graph-class="string"` This is also optional and allows you to pass in a string of CSS classes to add directly to the graph element.

`graph-options="graphOpts"` Also optional, this is an object of Flot options to be used instead of the defaults

#### graph-family
`<div graph="pie" graph-family="family-name"></div>`

This directive is used alongside the main graph directive.

It is used to group graphs into a "family". The name passed into the directive links families together, not scope inheritance. The directive ensures all graphs in the family have the same x and y-axis values. This is useful for comparing multiple graphs of similar data on the same page.
