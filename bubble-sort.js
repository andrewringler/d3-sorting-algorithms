// see http://en.wikipedia.org/wiki/Bubble_sort
function bubblesort(array) {
  var actions = [];

  function swap(i, j) {
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
    actions.push({type: "swap", i: i, j: j});
  }

  function bubble() {
	var swaped = false;
	do {
		swaped = false;
		for (var i = 1; i < array.length; ++i) {
		 	if (array[i-1] > array[i]) {
				swap(i-1, i);
				swaped = true;
			} else {
				actions.push({type: "traverse", "traverse": i});
			}
		}		
	} while (swaped)
	actions.push({type: "done", "done": i});
  }

  bubble();
  return actions;
}