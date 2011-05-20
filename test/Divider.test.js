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
		value_of(subject.initBlocks(points)).should_be([0, 3, 5]);
		points.unshift({});
		value_of(subject.initBlocks(points)).should_be([0, 3, 6]);
		points.unshift({});
		value_of(subject.initBlocks(points)).should_be([0, 3, 6, 7]);
		points.unshift({});
		value_of(subject.initBlocks(points)).should_be([0, 3, 6, 8]);
	},
	
	"Block getting": function() {
		subject = new Divider(points);
		
		value_of(subject.getBlock(0)).should_be(sortedPoints.slice(0, 3));
		value_of(subject.getBlock(1)).should_be(sortedPoints.slice(3));
		value_of(subject.getBlock(2)).should_be([]);
		
		points.splice(-2);
		subject = new Divider(points);
		value_of(subject.getBlock(0)).should_be(sortedPoints.slice(0, 3));
		value_of(subject.getBlock(1)).should_be([]);
		value_of(subject.getBlock(2)).should_be([]);
	}
});

})();
