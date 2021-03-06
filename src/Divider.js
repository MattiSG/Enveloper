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
	blocks: [],
	
	initialize: function init(points) {
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
		var leftBlock = this.getBlock(index);
		var rightBlock = this.getBlock(index + 1);
				
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
	}
});

AvailableRenderers.register('Divide & Conquer', Divider, 'blue');
