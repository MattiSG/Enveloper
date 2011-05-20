/**Author: Matti Schneider-Ghibaudo
*/

(function() {

var points, sortedPoints, subject;

describe('Divider class', {
	before: function() {
		points = [
			{'x': 259, 'y':445}, // 0
			{'x': 105, 'y':65},
			{'x': 525, 'y':257},
			{'x': 257, 'y':322}, // 3
			{'x': 29, 'y':119} // 4
		];
		
		sortedPoints = 	[
			{'x': 29, 'y':119},
			{'x': 105, 'y':65},
			{'x': 257, 'y':322},
			{'x': 259, 'y':445},
			{'x': 525, 'y':257}
		];
		
		subject = new Divider([]);
	},
	
	"Sorting": function() {
		value_of(subject.sortByAbscissa(points)).should_be(sortedPoints);
	},
	
	"Blocks": function() {
		points.shift();
		value_of(subject.initBlocks(points)).should_be([0, 3]);
		points.unshift({});
		value_of(subject.initBlocks(points)).should_be([0, 3, 4]);
		points.unshift({});
		value_of(subject.initBlocks(points)).should_be([0, 3, 5]);
		points.unshift({});
		value_of(subject.initBlocks(points)).should_be([0, 3, 6]);
		points.unshift({});
		value_of(subject.initBlocks(points)).should_be([0, 3, 6, 7]);
	}
});

})();