// see http://en.wikipedia.org/wiki/Selection_sort
function selectionSort(array) {
  var actions = [];

  function swap(i, j) {
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
    actions.push({type: "swap", i: i, j: j});
  }

  function recurse(left, right) {
	if(left < right) {
	  var min = left;
	  for (var i = left+1; i < right; ++i) {
		actions.push({type: "traverse", "traverse": i});
    	if (array[i] < array[min]) min = i;
	  }
	  swap(left, min);

	  recurse(left+1, right);		
	}
  }

  recurse(0, array.length);
  return actions;
}