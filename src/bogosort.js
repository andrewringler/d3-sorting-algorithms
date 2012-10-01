// http://en.wikipedia.org/wiki/Bogosort
function bogosort(array) {
  var actions = [];

  	// Fisher–Yates shuffle
	// taken from http://bl.ocks.org/1582075
	function shuffle(array, actions) {
	  var i = array.length, j, t;
	  while (--i > 0) {
	    j = ~~(Math.random() * (i + 1));
	    t = array[j];
	    array[j] = array[i];
	    array[i] = t;
		if(actions) actions.push({type: "shuffle", i: i, j: j});
	  }
	  return array;
	}


  function inOrder() {
	for(var i=1; i<array.length; i++) {
		actions.push({type: "traverse", "traverse": i});
		if(array[i] < array[i-1]) {
			return false;
		}
	}
	return true;
  }

  function bogo() {
	var tries = 0;
	while(!inOrder()){
		if(tries > 100) {
			return;
		}
		tries++;
		// TODO capture operations in shuffle
		shuffle(array, actions);
	}
	actions.push({type: "done", "done": i});
  }

  bogo();
  return actions;
}