/**Author: Matti Schneider-Ghibaudo
*/

(function() {

var points, sortedPoints, subject, origin;

describe('Divider class', {
	before: function() {
		subject = new Divider([]);
	
		highest = {'x': 259, 'y':445};
		highestRelativeToOrigin = {'x': 29, 'y':119};
		
		points = [
			highest, // 0
			{'x': 105, 'y':65},
			{'x': 525, 'y':257},
			{'x': 257, 'y':322}, // 3
			highestRelativeToOrigin // 4
		];
		
		sortedPoints = 	[
			highestRelativeToOrigin,
			{'x': 105, 'y':65},
			{'x': 257, 'y':322},
			highest,
			{'x': 525, 'y':257}
		];
	},
	
	"Sorting": function() {
		value_of(subject.sortByAbscissa(points)).should_be(sortedPoints);
	},
	
	"Blocks calculation": function() {
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
