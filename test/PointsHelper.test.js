(function() {
    
    var origin, sortedPoints, highestRelativeToOrigin, highest, rightPoints, leftPoints, points;
    
describe('PointsHelper', {
    
    before: function() {
   		origin = { x: 0, y: 0 };
        
        rightPoints = [
            {'x' : 12, 'y' : 0},
            {'x' : 12, 'y' : 5},
            {'x' : 1, 'y' : 100},
            {'x' : 15, 'y' : -32},
        ];
        
        leftPoints = [
            {'x' : -12, 'y' : 0},
            {'x' : -1, 'y' : 3},
            {'x' : -2, 'y' : -4},
            {'x' : -4, 'y' : 200},
        ];
        
        points = [].concat(rightPoints, leftPoints, origin);
        
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
	},
    
    "Same side calculation" : function () {
        
        value_of(PointsHelper.sameSideAs(
            new Vector(origin, {x: 0, y: 1}), 
            leftPoints[0], 
            points.concat({x:0, y:15}))
        ).should_be(leftPoints.concat({x:0, y:15}));
        
        value_of(PointsHelper.sameSideAs(
            new Vector(origin, {x: 0, y: 1}),
            rightPoints[0],
            points.concat({x:0, y:15}))
        ).should_be(rightPoints.concat({x:0, y:15}));
    }
});

})();
