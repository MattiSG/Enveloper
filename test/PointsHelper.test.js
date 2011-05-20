(function() {
    
    var origin, sortedPoints, highestRelativeToOrigin, highest;
    
describe('PointsHelper', {
    
    before: function() {
   		origin = { x: 0, y: 0 };
        
        highest = {'x': 259, 'y':445};
        highestRelativeToOrigin = {'x': 29, 'y':119};
        
        sortedPoints = 	[
			highestRelativeToOrigin,
			{'x': 105, 'y':65},
			{'x': 257, 'y':322},
			highest,
			{'x': 525, 'y':257}
		];
    },
    
    "Highest point calculation": function() {
		value_of(PointsHelper.highestPointFromIn(origin, sortedPoints)).should_be(sortedPoints.indexOf(highestRelativeToOrigin));
		
		value_of(PointsHelper.highestPointFromIn(
											{x: 0, y: 20},
											[
												{x: 1, y: 10},
												{x: 1, y: 20},
												{x: 1, y: 30}, // expected winner, index 2
												{x: 1, y: 5}
											])
				).should_be(2);
	},
	
	
	"Lowest point calculation": function() {
		value_of(PointsHelper.lowestPointFromIn(
											{x: 0, y: 20},
											[
												{x: 1, y: 10},
												{x: 1, y: 20},
												{x: 1, y: 30},
												{x: 1, y: 5} // expected winner, index 3
											])
				).should_be(3);
				
		value_of(PointsHelper.lowestPointFromIn(
											{x: 0, y: 20},
											[
												{x: 1, y: 10}, // expected winner, index 0
												{x: 1, y: 20},
												{x: 1, y: 30},
												{x: 100, y: 5}
											])
				).should_be(0);
	}
});

})();
