// Fisher–Yates shuffle
// see http://bl.ocks.org/1582075
function shuffle(array) {
  var i = array.length, j, t;
  while (--i > 0) {
    j = ~~(Math.random() * (i + 1));
    t = array[j];
    array[j] = array[i];
    array[i] = t;
  }
  return array;
}
