// taken from http://bl.ocks.org/1582075
function quicksort(array) {
  var actions = [];

  function partition(left, right, pivot) {
    var v = array[pivot];
    swap(pivot, --right);
    for (var i = left; i < right; ++i) {
		if (array[i] <= v) {
			swap(i, left++);
		} else {
			actions.push({type: "miss", "miss": i});
		}
	}
    swap(left, right);
    return left;
  }

  function swap(i, j) {
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
    actions.push({type: "swap", i: i, j: j});
  }

  function recurse(left, right) {
    if (left < right) {
      var pivot = left + ~~(Math.random() * (right - left));
      actions.push({type: "partition", pivot: pivot});
      pivot = partition(left, right, pivot);
      recurse(left, pivot);
      recurse(pivot + 1, right);
    }
	actions.push({type: "done", "done": 0});
  }

  recurse(0, array.length);
  return actions;
}