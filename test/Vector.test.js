(function() {

var points, origin, unit;

describe('Vector class', {
	before: function() {
		points = [
			{'x': 29, 'y':119},
			{'x': 105, 'y':65},
			{'x': 257, 'y':322},
			{'x': 259, 'y':445},
			{'x': 525, 'y':257}
		];
		origin = { x: 0, y: 0};
		unit = { x: 1, y: 1};
		negUnit = { x: -1, y: -1 };
	},
	
	"Constructing from two points": function() {
		var subject = new Vector(origin, unit);
		value_of(subject.x).should_be(1);
		value_of(subject.y).should_be(1);
	},
	
	"Constructing from two same points": function() {
		var subject = new Vector(origin, origin);
		value_of(subject.x).should_be(0);
		value_of(subject.y).should_be(0);
		
		subject = new Vector(unit, unit);
		value_of(subject.x).should_be(0);
		value_of(subject.y).should_be(0);
	},
	
	"Constructing from two points (negative)": function() {
		var subject = new Vector(unit, origin);
		value_of(subject.x).should_be(-1);
		value_of(subject.y).should_be(-1);
	}
});

})();