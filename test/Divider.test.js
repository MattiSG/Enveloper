/**Author: Matti Schneider-Ghibaudo
*/

(function() {

var points, sortedPoints, subject, origin, highest, highestRelativeToOrigin;

describe('Divider class', {
	before: function() {
		subject = new Divider([]);
				
		origin = { x: 0, y: 0 };
	
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
	},
	
	"Highest point calculation": function() {
		value_of(subject.highestPointFromIn(origin, sortedPoints)).should_be(highestRelativeToOrigin);
		
		value_of(subject.highestPointFromIn(
											{x: 0, y: 20},
											[
												{x: 1, y: 10},
												{x: 1, y: 20},
												{x: 1, y: 30},
												{x: 1, y: 5}
											])
				).should_be({x: 1, y: 30});
	},
	
	
	"Lowest point calculation": function() {
		value_of(subject.lowestPointFromIn(
											{x: 0, y: 20},
											[
												{x: 1, y: 10},
												{x: 1, y: 20},
												{x: 1, y: 30},
												{x: 1, y: 5}
											])
				).should_be({x: 1, y: 5});
				
		value_of(subject.lowestPointFromIn(
											{x: 0, y: 20},
											[
												{x: 1, y: 10},
												{x: 1, y: 20},
												{x: 1, y: 30},
												{x: 100, y: 5}
											])
				).should_be({x: 1, y: 10});
	}
});

})();