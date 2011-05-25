(function() {
    
    var origin, pointsToSort, sortedPoints, verticallySortedPoints, highestRelativeToOrigin, highest, rightPoints, leftPoints, points;
    
describe('PointsHelper', {
    
    before: function() {
   		origin = { x: 0, y: 0 };
        
        points = [
            origin,
            {'x' : 12, 'y' : 0},
            {'x' : 12, 'y' : 5},
            {'x' : 1, 'y' : 100},
            {'x' : 15, 'y' : -32},
            {'x' : -12, 'y' : 0},
            {'x' : -1, 'y' : 3},
            {'x' : -2, 'y' : -4},
            {'x' : -4, 'y' : 200},
            {'x' : 0, 'y' : 15}
        ];
        
        rightPoints = [1,2,3,4,9];
        leftPoints = [5,6,7,8,9];
        
        highest = {'x': 259, 'y':445};
        highestRelativeToOrigin = {'x': 29, 'y':119};
        
        
        pointsToSort =  [
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
		
       verticallySortedPoints = [
			{'x': 105, 'y':65},
			highestRelativeToOrigin,
			{'x': 525, 'y':257},
			{'x': 257, 'y':322},
			highest
		];
    },
    
    	
	"Sorting by abscissa": function() {
		value_of(PointsHelper.sortBy('x', pointsToSort)).should_be(sortedPoints);
	},
	
	"Sorting by ordinate": function() {
		value_of(PointsHelper.sortBy('y', pointsToSort)).should_be(verticallySortedPoints);
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
	},
    
    "Same side calculation" : function () {
        value_of(PointsHelper.sameSideAs(
            new Vector(origin, {x: 0, y: 1}), 
            points[5], 
            points)
        ).should_be(leftPoints);
        
        value_of(PointsHelper.sameSideAs(
            new Vector(origin, {x: 0, y: 1}),
            points[1],
            points)
        ).should_be(rightPoints);
    }
});

})();
