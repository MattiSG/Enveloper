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
	}
});
