/**Defines all useful functions for working with points, vectors and such.
*Authors: Romaric Pighetti, Matti Schneider-Ghibaudo
*/

var Divider = new Class({
	/**Contains all points that are still to be worked on.
	*That means, this array will be modified when computing envelopes, and you should never access it from the outside!
	*
	*@private
	*/
	points: [],
	
	/**Indices for the separations, to avoid memory hogging by duplicating points data.
	*Each value is the index of a new block. The last value points to the last + 1 index of the points. That is, (blocks[blocks.length - 1] === points.length)
	*
	*@private
	*/
	blocks: [],
	
	initialize: function init(points) {
		//TODO: check points type
		this.setInput(points);
	},
	
	setInput: function setInput(points) {
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
	
	envelope: function envelope() {
		if (this.blocks.length > 2) // caching
			this.computeEnvelope();

		return this.points;
	},
	
	computeEnvelope: function computeEnvelope() {
		while (this.blocks.length > 2)
			this.patchBlocksAt(0);
	},
	
	/**Patches an envelope with its rightmost neighbour.
	*
	*@param	integer	index	the block-index of the
	*/
	patchBlocksAt: function patchBlocksAt(index) {
		if (index >= this.blocks.length - 1) // we can't patch together two envelopes if they are non-existent
			throw("Invalid block index!");
		
		// these container objects will make variable management easier
		var left = {
			start: this.blocks[index],
			points: this.getBlock(index),
			bottom: null,
			top : null
		};
		
		var right = {
			start: this.blocks[index + 1],
			points: this.getBlock(index + 1),
			bottom: null,
			top : null
		};
		
		// initiate leftside envelope's highest and lowest points to its leftmost point
		left.newtop = left.newbottom = left.points.length - 1;
		
		// initiate rightside envelope's highest and lowest points to its rightmost point
		right.newtop = right.newbottom = 0;
		
		// compute highest and lowest points for each direction and each side
		['top', 'bottom'].each(function(direction) { // same algorithm for both directions, but there is no gain in examining both at the same time
			while (left[direction] != left['new' + direction]
				   || right[direction] != right['new' + direction]) { // fixpoint algorithm
				   
				left[direction] = left['new' + direction];
				right[direction] = right['new' + direction];
				
				left['new' + direction] = PointsHelper.highestPointFromIn(right.points[right[direction]], left.points);
				right['new' + direction] = PointsHelper.highestPointFromIn(left.points[left[direction]], right.points);
			}
		});
		
		// remove all points between the top and bottom boundaries in each envelope
		var toRemove = [];
		
		left.toRemove = PointsHelper.sameSideAs(new Vector(left.points[left.bottom], left.points[left.top]), right.points[right.top], left.points);
		right.toRemove = PointsHelper.sameSideAs(new Vector(right.points[right.bottom], right.points[right.top]), left.points[left.top], right.points);
		

		left.toRemove.each(function(index) {
			toRemove.push(left.start + index);
		});
		
		right.toRemove.each(function(index) {
			toRemove.push(right.start + index);
		});
		
		toRemove.each(function(index) {
			this.points.splice(index, 1);
		}, this);
		
		// update blocks
		for (var blockIndex = left.start; blockIndex < this.blocks.length - 1; blockIndex++)
			this.blocks[blockIndex] -= toRemove.length; // point the points indices to the correct position, since this.points was trimmed
		
		this.blocks.pop(); // we've removed the right-handside block
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
