/**A divide & conquer algorithm to compute the convex envelope of a set of points
*Authors: Matti Schneider-Ghibaudo
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
	blocks: [], //TODO: "blocks" -> "envelopes"
	
	initialize: function init(points) {
		//TODO: check points type
		this.setInput(points);
	},
	
	setInput: function setInput(points) {
		this.points = PointsHelper.sortBy('x', points.clone());
		this.blocks = this.initBlocks(this.points);
	},
	
	initBlocks: function initBlocks(points) {
		var result = [];
		
		for (var i = 0; i < points.length; i += 3)
			result.push(points.slice(i, i + 3));
			
		return result;
	},
	
	/**Returns a set of points as described by the blocks array.
	*
	*@param	integer	index	the index of the block you're interested in
	*@returns	Point[]	the index-th block of points, or an empty array if the block does not exist
	*/
	getBlock: function getBlock(index) {
		if (index >= this.blocks.length || index < 0)
			return [];

		return this.blocks[index];
	},
	
	envelope: function envelope() {
		if (this.blocks.length > 1) // caching
			this.computeEnvelope();
		
		var result = [];
		var points = this.getBlock(0); // that's our ordered-by-abscissa envelope
		points.each(function(point) { // we need to order it clockwise
			if (point.y > points[0].y)
				result.push(point);
			else result.splice(0, 0, point); // that's a push_back
		});
		return result;
	},
	
	computeEnvelope: function computeEnvelope() {
		while (this.blocks.length > 1)
			this.patchBlocksAt(0);
	},
	
	patchBlocksAt: function patchBlocksAt(index) {
		var leftBlock = PointsHelper.sortBy('x', this.getBlock(index));
		var rightBlock = PointsHelper.sortBy('x', this.getBlock(index + 1));
				
		var bounds = {
			left: {
				top: null,
				bottom: {},
				tmp : leftBlock.length - 1 // working on indices
			},
			right: {
				top: null,
				bottom: {},
				tmp: 0 // working on indices
			}
		};
		
		while (bounds.left.top != bounds.left.tmp
			   || bounds.right.top != bounds.right.tmp) {
			
			bounds.left.top = bounds.left.tmp;
			bounds.right.top = bounds.right.tmp;
			
			bounds.left.tmp = PointsHelper.highestPointFromIn(rightBlock[bounds.right.top], leftBlock);
			bounds.right.tmp = PointsHelper.lowestPointFromIn(leftBlock[bounds.left.top], rightBlock);
		}
		
		while (bounds.left.bottom != bounds.left.tmp
			   || bounds.right.bottom != bounds.right.tmp) {
			
			bounds.left.bottom = bounds.left.tmp;
			bounds.right.bottom = bounds.right.tmp;
			
			bounds.left.tmp = PointsHelper.lowestPointFromIn(rightBlock[bounds.right.bottom], leftBlock);
			bounds.right.tmp = PointsHelper.highestPointFromIn(leftBlock[bounds.left.bottom], rightBlock);
		}
		
		var result = [];
		
		result.combine(PointsHelper.oppositeSideTo(
							new Vector(leftBlock[bounds.left.top], leftBlock[bounds.left.bottom]),
							rightBlock[0], // ordered by ascissa
							leftBlock)
						);
											   
		result.push(leftBlock[bounds.left.top],
					rightBlock[bounds.right.top]);
											   
		result.combine(PointsHelper.oppositeSideTo(
							new Vector(rightBlock[bounds.right.top], rightBlock[bounds.right.bottom]),
							leftBlock[0], // ordered by ascissa
							rightBlock)
						);
												
		result.push(rightBlock[bounds.right.bottom],
					leftBlock[bounds.left.bottom]);
		
		this.blocks[index] = result;
		this.blocks.splice(index + 1, 1);
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**Patches an envelope with its rightmost neighbour.
	*
	*@param	integer	index	the block-index of the envelope
	*/
	optimizedPatchBlocksAt: function patchBlocksAt__Opt(index) {
		if (index >= this.blocks.length - 1) // we can't patch together two envelopes if they are non-existent
			throw("Invalid block index!");
		
		// these container objects will make variable management easier
		var left = {
			start: this.blocks[index], // start of the block in this.points; will be used for points removal once the envelopes are merged
			points: this.getBlock(index), // the actual points of the leftside envelope
			top : null, // will store the highest point of the envelope, from the point of view of the other envelope
			bottom: null // ditto with lowest
		};
		
		var right = {
			start: this.blocks[index + 1],
			points: this.getBlock(index + 1),
			bottom: null,
			top : null
		};
		
		// initiate leftside envelope's highest and lowest points to its leftmost point
		left.newtop = left.newbottom = left.points.length - 1; // no use of left.start because here, we're relative to the envelope itself
		
		// initiate rightside envelope's highest and lowest points to its rightmost point
		right.newtop = right.newbottom = 0;
		
		// compute highest and lowest points for each direction and each side
/*		Object.each({ // same algorithm for both directions, but there is no gain in examining both at the same time
			top: PointsHelper.highestPointFromIn.bind(PointsHelper),
			bottom: PointsHelper.lowestPointFromIn.bind(PointsHelper)
		}, function(pointFinder, direction) {
			while (left[direction] != left['new' + direction]
				   || right[direction] != right['new' + direction]) { // fixpoint algorithm
				   
				left[direction] = left['new' + direction];
				right[direction] = right['new' + direction];
				
				left['new' + direction] = pointFinder(right.points[right[direction]], left.points);
				right['new' + direction] = pointFinder(left.points[left[direction]], right.points);
			}
		});

*/
		var direction = 'top';
		while (left[direction] != left['new' + direction]
			   || right[direction] != right['new' + direction]) { // fixpoint algorithm
			   
			left[direction] = left['new' + direction];
			right[direction] = right['new' + direction];
			
			left['new' + direction] = PointsHelper.highestPointFromIn(right.points[right[direction]], left.points);
			right['new' + direction] = PointsHelper.lowestPointFromIn(left.points[left[direction]], right.points);
		}
		
		direction = 'bottom';
		while (left[direction] != left['new' + direction]
			   || right[direction] != right['new' + direction]) { // fixpoint algorithm
			   
			left[direction] = left['new' + direction];
			right[direction] = right['new' + direction];
			
			left['new' + direction] = PointsHelper.lowestPointFromIn(right.points[right[direction]], left.points);
			right['new' + direction] = PointsHelper.highestPointFromIn(left.points[left[direction]], right.points);
		}

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
			this.blocks[blockIndex] -= (toRemove.length - 1); // point the points indices to the correct position, since this.points was trimmed
		
		this.blocks.pop(); // we've removed the right-handside block
	}
});


AvailableRenderers.register('Divide & Conquer', Divider, 'blue');
