/**Defines all useful functions for working with points, vectors and such.
*Authors: Romaric Pighetti, Matti Schneider-Ghibaudo
*/

// a Point is defined as {x: x, y: y}

var Vector = new Class({
	x: 0,
	y: 0,
	
	initialize: function init(origPoint, endPoint) {
		['x', 'y'].each(function(coord) { // super classy
			this[coord] = endPoint[coord] - origPoint[coord];
		}, this);
	},
	
	cross: function cross(vect) {
		return (this.x * vect.y) - (this.y * vect.x);
	}
});
