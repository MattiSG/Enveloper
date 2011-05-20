/**Defines all useful functions for working with points, vectors and such.
*Authors: Romaric Pighetti, Matti Schneider-Ghibaudo
*/

var Divider = new Class({
	points: [],
	/**Indices for the separations, to avoid memory hogging by duplicating points data.
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
		
		for (i = 0; i < points.length; i += 3)
			result.push(i);
			
		if (((points.length - 1) % 3) != 0)
			result.push(points.length - 1);
			
		return result;
	},
	
	computeEnvelope: function computeEnvelope() {
		if (this.blocks.length == 1)
			return this.envelope;
		
		for (var l = blocks[0]; l < blocks[1]; l++) {
			for (var r = blocks[1]; r < blocks[2]; r++) {
			
				var lr = new Vector(l, r);
			}
		}
	},
	
	/**
	*@param	Point	from	the point from which the highest point is to be seen
	*@param	Point[]	candidates	the *ordered* set of points in which to look for the highest point
	*/
	highestPointFromIn: function getHighest(from, candidates) {
		var result = candidates[0];
		var resultVect = new Vector(from, result);
		
		candidates.each(function(candidate) {
			var vect = new Vector(from, candidate);
			if (resultVect.by(vect) > 0) {
				result = candidate;
				resultVect = new Vector(from, result);
			}
		});
		
		return result;
	}
});
