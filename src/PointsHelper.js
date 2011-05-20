var PointsHelper = {	
	/**
	*@param	Point	from	the point from which the highest point is to be seen
	*@param	Point[]	candidates	the *ordered* set of points in which to look for the highest point
	*@returns	the index of the highest point in the candidates set
	*/
	highestPointFromIn: function getHighest(from, candidates) {
		return this.genericPointFromIn(from,
									   candidates,
									   function(currentBest, candidate) {
										   return currentBest.by(candidate) > 0;
									   });
	},
	
	/**
	*@param	Point	from	the point from which the lowest point is to be seen
	*@param	Point[]	candidates	the *ordered* set of points in which to look for the lowest point
	*@returns	the index of the lowest point in the candidates set
	*/
	lowestPointFromIn: function getLowest(from, candidates) {
		return this.genericPointFromIn(from,
									   candidates,
									   function(currentBest, candidate) {
									    	return currentBest.by(candidate) < 0;
									   });
	},

	/**A generic comparison function, that will apply a comparison function to all vectors uniting a unique point and another in a set, to determine its “maximum”, or whatever the comparison function means.
	*Used to implement highestPoint and lowestPoint.
	*
	*@param	Point	from	the point from which the highest point is to be seen
	*@param	Point[]	candidates	the *ordered* set of points in which to look for the highest point
	*@param	boolean Function(Vector, Vector)	shouldReplace	the comparison function to apply between the current maximum and a new candidate; should return true if the candidate should be elected as the new maximum
	*
	*@private
	*/	
	genericPointFromIn: function getGenericSuperlative(from, candidates, shouldReplace) {
		var result,
			best,
			bestVect;
		
		function setBestTo(index) {
			best = candidates[index];
			bestVect = new Vector(from, best);
			result = index;		
		}
		
		setBestTo(0);
				
		candidates.each(function(candidate, index) {
			var vect = new Vector(from, candidate);
			if (shouldReplace(bestVect, vect))
				setBestTo(index);
		});
		
		return result;
	},
    
    sameSideAs: function sameSideAs(refVect, refPoint, points) {
        var refSign = refVect.by(new Vector(refVect.origin, refPoint));
        var result = [];
        points.each (function (point, index) {
            if(refVect.by(new Vector(refVect.origin, point))*refSign >= 0) {
                if (!((refVect.origin.x == point.x && refVect.origin.y == point.y) ||
                    ((refVect.origin.x + refVect.x) == point.x && (refVect.origin.y + refVect.y) == point.y)))
                result.push(index);
            }
        });
        return result;
    },
}
