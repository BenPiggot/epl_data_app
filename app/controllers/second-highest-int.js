// Question 1
// In JavaScript ES5
// Return the index of the second highest integer in a given array

function secondHighest(array) {
	var retval;
	var sortable = array.slice(0);

	sortable.sort(function(a, b) {
		return b - a;
	})
	
	array.forEach(function(n, idx) {
		if (n === sortable[1])
			retval = idx
	})

	return retval;
}