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
		
		for (var i = blocks[0]; i < blocks[1]; i++) {
//			var lr = new Vector(this.points[this.blocks[1]], 
		}
	}
});
