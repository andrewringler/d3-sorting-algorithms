// http://en.wikipedia.org/wiki/Bogosort
function bogosort(array) {
  var actions = [];

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
  }

  bogo();
  return actions;
}