/**Defines all useful functions for working with points, vectors and such.
*Authors: Romaric Pighetti, Matti Schneider-Ghibaudo
*/

var Divider = new Class({
	points: [],
	/**Indices for the separations, to avoid memory hogging by duplicating points data.
	*Each value is the index of a new block. The last value points to the last + 1 index of the points. That is, (blocks[blocks.length - 1] === points.length)
	*/
	blocks: [],
	envelope: [],
	
	initialize: function init(points) {
		//TODO: check points type
		
		this.points = this.sortByAbscissa(points);
		
		this.blocks = this.initBlocks(this.points);
	},
	
	sortByAbscissa: function sort(points) {
		return points.sort(function(first, second) {
			if (first.x == second.x)
				return 0;
				
			if (first.x > second.x)
				return 1;
				
			return -1;
		});
	},
	
	initBlocks: function initBlocks(points) {
		var result = [];
		
		for (var i = 0; i < points.length; i += 3)
			result.push(i);
			
		result.push(points.length);
			
		return result;
	},
	
	computeEnvelope: function computeEnvelope() {
		if (this.blocks.length == 2)
			return this.envelope;
			
		// initiating leftside envelope's highest point at its leftmost point
		var leftTop = this.points[this.blocks[1] - 1], // leftmost is the first at the left of the separation
		// initiating rightside envelope's highest point at its rightmost point
			rightTop = this.points[this.blocks[1]];
		
		var newLeftTop,
			newRightTop;
		
		while (leftTop != newLeftTop // fixpoint algorithm
			   || rightTop != newRightTop) {
			   
			leftTop = newLeftTop;
			rightTop = newRightTop;
			
			newLeftTop = this.highestPointFromIn(leftTop, right);
			newRightTop = this.highestPointFromIn(rightTop, left);
		}
	},
	
	/**Returns a set of points as described by the blocks array.
	*
	*@param	integer	index	the index of the block you're interested in
	*@returns	Point[]	the index-th block of points, or an empty array if the block does not exist
	*/
	getBlock: function getBlock(index) {
		if (index >= this.blocks.length - 1)
			return [];
		
		return this.points.slice(this.blocks[index], this.blocks[index + 1]);
	},
	
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
});
