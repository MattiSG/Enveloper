var PointsHelper = {	
	/**
	*@param	Point	from	the point from which the highest point is to be seen
	*@param	Point[]	candidates	the *ordered* set of points in which to look for the highest point
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
		var result = candidates[0];
		var resultVect = new Vector(from, result);
		
		candidates.each(function(candidate) {
			var vect = new Vector(from, candidate);
			if (shouldReplace(resultVect, vect)) {
				result = candidate;
				resultVect = new Vector(from, result);
			}
		});
		
		return result;	
	}
}
