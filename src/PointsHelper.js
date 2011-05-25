var PointsHelper = {
	
	/**
	*@param	String	direction	one of "x" (sort by abscissa) or "y" (sort by ordinate)
	*@param	Point[]	points	the array of points to sort
	*@returns	Point[]	a sorted copy of the given points array
	*/
	sortBy: function sort(direction, points) {
		return points.sort(function(first, second) {
			if (first[direction] > second[direction])
				return 1;
			if (first[direction] < second[direction])
				return -1
				
			return 0;
		});
	},

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
	
	/**
 	* Returns the two points of the segment of the envelope 
 	* that the segment [innerPoint, point] crosses if there is one, 
 	* an empty array is returned if there are no intersections.
 	*/
	crossEnvelope: function crossEnvelope(polygon, innerPoint, point) {
		var innerToPoint = new Vector(innerPoint, point);
		
		for (var i = 0; i < polygon.length; i++) {
			var innerToa = new Vector(innerPoint, polygon[i]);
			var innerTob = new Vector(innerPoint, polygon[(i+1)%polygon.length]);
			var aTob = new Vector(polygon[i], polygon[(i+1)%polygon.length]);
			var aToinner = new Vector(polygon[i], innerPoint);
			var aTopoint = new Vector(polygon[i], point);
			
			if (innerToPoint.by(innerToa) * innerToPoint.by(innerTob) <= 0
				&& aTob.by(aToinner) * aTob.by(aTopoint) <= 0)
				return [polygon[i], polygon[(i+1)%polygon.length]];
		}
		return [];
	},
	
	/**Computes the barycenter of a set of points.
	*@param	Point[]	points	the points for which the barycenter is to be computed
	*/
	barycenter: function barycenter(points) {
		var result = {x: 0, y: 0};
		points.each(function(point) {
			result.x += point.x;
			result.y += point.y;
		});
		
		return {
			x: result.x / points.length,
			y: result.y / points.length
		};
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
	
	oppositeSideTo: function oppositeSideTo(refVect, refPoint, points) {
		var refSign = refVect.by(new Vector(refVect.origin, refPoint));
		var result = [];
		points.each (function (point, index) {
			if(refVect.by(new Vector(refVect.origin, point))*refSign < 0)
				result.push(point);
		});
		return result;
	},
	
   	oppositeSideTo2: function oppositeSideTo2(refVect, refPoint, points) {
		var refSign = refVect.by(new Vector(refVect.origin, refPoint)); // OPT: define a test function instead of a multiplication
		
		var products = {};
		
		points.each(function(point) {
			products[point] = refVect.by(new Vector(refVect.origin, point));
		});

		var result = points.sort(function(first, second) {
			if (products[first] < products[second])
				return -1;
			
			if (products[first] == products[second])
				return 0;
				
			return 1;
		});
		
		var positiveIndex;
		for (positiveIndex = 0; positiveIndex < result.length; positiveIndex++)
			if (result[positiveIndex] > 0)
				break;
		
		result.splice(0, result.length - positiveIndex);
		return result;
	},

}
