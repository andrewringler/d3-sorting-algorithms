// adapted from http://bl.ocks.org/1582075
var SortingAnimation = function() {
	var ret = {};
	var margin = {top: 0, right: 10, bottom: 0, left: 10},
	    width = 960 - margin.left - margin.right,
	    height = 50 - margin.top - margin.bottom;
	var n = 80,
	    index = d3.range(n);

	var x = d3.scale.ordinal().domain(index).rangePoints([0, width]),
	    a = d3.scale.linear().domain([0, n - 1]).range([height / 5, height]);

	var color = d3.scale.quantize()
	        .domain([height / 10, height])
	        .range(colorbrewer.Blues[9]);
	var srcData = shuffle(index.slice());
	
	var allActions = [];
	var lines = [];
	
	ret.start = function(delay) {
		setTimeout(
			function(){setInterval(function step() {
				for(var i=0; i<allActions.length; i++){
					var action = allActions[i].actions.pop();
					var line = lines[i];
					if (action) switch (action.type) {
					  case "partition": {
					    line.style("stroke", function(d, i) { return i == action.pivot ? "red" : color(a(d)); });
					    step();
					    break;
					  }
					  case "swap": {
					    var t = line[0][action.i];
					    line[0][action.i] = line[0][action.j];
					    line[0][action.j] = t;
					    line.attr("transform", function(d, i) { return "translate(" + x(i) + ")"; });
					    line.style("stroke", function(d, i) { return color(a(d)); });
					    break;
					  }
					  case "miss": {
					    line.style("stroke", function(d, i) { return i == action.miss ? "pink" : color(a(d)); });
					    break;
					  }
					  case "traverse": {
					    line.style("stroke", function(d, i) { return i == action.traverse ? "pink" : color(a(d)); });
					    break;
					  }
					case "done": {
					    line.style("stroke", function(d, i) { return i == action.done ? color(a(d)) : color(a(d)); });
					    break;				
					}
				  }	
				}
			}, 20)}, delay);
	};
	
	ret.prepareAnimation = function(sortingfunction, target) {		
		var data = srcData.slice();
		var svg = d3.select(target).append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")");

		var line = svg.selectAll("line")
		    .data(data)
		  .enter().append("line")
		    .attr("index", function(d, i) { return "i" + i; })
		     .style("stroke", function(d) { return color(a(d)); })
		    .attr("x2", function(d) { return 0; })
		    .attr("y2", function(d) { return -a(d); })
		    .attr("transform", function(d, i) { return "translate(" + x(i) + ")"; });
		
		// sort the list, then reverse the stack of operations so we can animate chronologically from the start
		var actions = sortingfunction(data).reverse();
		
		// push our actions and reference to our lines to the animator	
		allActions.push({actions: actions});
		lines.push(line);
	};
	
	return ret;
}();