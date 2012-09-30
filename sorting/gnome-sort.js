// http://en.wikipedia.org/wiki/Gnome_sort
function gnomesort(array) {
  var actions = [];

  function swap(i, j) {
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
    actions.push({type: "swap", i: i, j: j});
  }

  function gnome() {
	var pos = 1;
	while (pos < array.length) {
		if (array[pos] >= array[pos-1]) {
			pos++;
			actions.push({type: "traverse", "traverse": pos});
		} else {
			swap(pos, pos-1);
			if (pos > 1) {
				pos--;
			} else {
				pos++;
			}
		}
	}
  }

  gnome();
  return actions;
}