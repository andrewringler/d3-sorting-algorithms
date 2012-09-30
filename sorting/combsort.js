// see http://en.wikipedia.org/wiki/Comb_sort
function combsort(array) {
  var actions = [];

  function swap(i, j) {
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
    actions.push({type: "swap", i: i, j: j});
  }

  function comb() {
	var gap = array.length;
	var swapped = false;
	while (true) {
		var gap = Math.floor(gap / 1.247330950103979);
		gap = gap < 1 ? 1 : gap;
		
		swapped = false;	
		//a single "comb" over the input list
		for(var i=0; i + gap < array.length; i++) {
			if(array[i] > array[i+gap]){
				swap(i, i+gap);
				swapped = true;
			} else {
				actions.push({type: "traverse", "traverse": i});
			}
		}
		
		if(gap == 1 && swapped == false) break;
	}
	actions.push({type: "done", "done": i});
  }

  comb();
  return actions;
}