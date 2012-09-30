// see http://bl.ocks.org/1582075
function quicksort(array) {
  var actions = [];

  function partition(left, right, pivot) {
    var v = array[pivot];
    swap(pivot, --right);
    for (var i = left; i < right; ++i) if (array[i] <= v) swap(i, left++);
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
  }

  recurse(0, array.length);
  return actions;
}