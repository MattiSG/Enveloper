/**Defines all useful functions for working with points, vectors and such.
*Authors: Romaric Pighetti, Matti Schneider-Ghibaudo
*/

// a Point is defined as {x: x, y: y}

var Vector = new Class({
    origin: [0,0],
	x: 0,
	y: 0,
	
	initialize: function init(from, to) {
		['x', 'y'].each(function(direction) { // super classy
			this[direction] = to[direction] - from[direction];
		}, this);
        this.origin = from;
	},
	
	by: function crossProduct(vect) {
		return (this.x * vect.y) - (this.y * vect.x);
	}
});
