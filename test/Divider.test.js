/**Author: Matti Schneider-Ghibaudo
*/

(function() {

var points, sortedPoints, subject, origin;

describe('Divider class', {
	before: function() {
		subject = new Divider([]);
	
		highest = {'x': 259, 'y':445};
		highestRelativeToOrigin = {'x': 29, 'y':119};
		
		points = [
			highest, // 0
			{'x': 105, 'y':65},
			{'x': 525, 'y':257},
			{'x': 257, 'y':322}, // 3
			highestRelativeToOrigin // 4
		];
		
		sortedPoints = 	[
			highestRelativeToOrigin,
			{'x': 105, 'y':65},
			{'x': 257, 'y':322},
			highest,
			{'x': 525, 'y':257}
		];
	},
	
	"Sorting": function() {
		value_of(subject.sortByAbscissa(points)).should_be(sortedPoints);
	},
	
	"Blocks calculation": function() {
		value_of(subject.initBlocks(points)).should_be([points.slice(0, 3), points.slice(3, 5)]);
		points.shift();
		value_of(subject.initBlocks(points)).should_be([points.slice(0, 3), points.slice(3, 4)]);
		points.shift();
		value_of(subject.initBlocks(points)).should_be([points.slice(0, 3)]);
	},
	
	"Block getting": function() {
		subject = new Divider(points);
		
		value_of(subject.getBlock(0)).should_be(sortedPoints.slice(0, 3));
		value_of(subject.getBlock(1)).should_be(sortedPoints.slice(3));
		value_of(subject.getBlock(2)).should_be([]);
		
		sortedPoints.splice(-2);
		subject = new Divider(sortedPoints);
		value_of(subject.getBlock(0)).should_be(sortedPoints.slice(0, 3));
		value_of(subject.getBlock(1)).should_be([]);
		value_of(subject.getBlock(2)).should_be([]);
	},
	
	"Simple envelope calculation": function() {
		subject = new Divider(points);
		
		value_of(subject.envelope()).should_be(subject.sortByAbscissa([
													{'x': 105, 'y':65},
													{'x': 525, 'y':257},
													{'x': 259, 'y':445},
													{'x': 29, 'y':119}
												]));
	},
	
	"Complex envelope calculation": function() {
		subject = new Divider([{'x': 368, 'y':356},{'x': 52, 'y':347},{'x': 287, 'y':360},{'x': 534, 'y':228},{'x': 79, 'y':127},{'x': 349, 'y':480},{'x': 100, 'y':189},{'x': 447, 'y':299},{'x': 175, 'y':302},{'x': 531, 'y':565},{'x': 246, 'y':101},{'x': 4, 'y':176},{'x': 132, 'y':95},{'x': 235, 'y':569},{'x': 310, 'y':359},{'x': 202, 'y':281},{'x': 111, 'y':156},{'x': 531, 'y':512},{'x': 255, 'y':380},{'x': 261, 'y':509},{'x': 382, 'y':237},{'x': 436, 'y':417},{'x': 265, 'y':375},{'x': 308, 'y':595},{'x': 371, 'y':57},{'x': 37, 'y':429},{'x': 57, 'y':127},{'x': 118, 'y':405},{'x': 465, 'y':538},{'x': 65, 'y':524},{'x': 481, 'y':544},{'x': 137, 'y':373},{'x': 473, 'y':441},{'x': 337, 'y':53},{'x': 594, 'y':180},{'x': 369, 'y':403},{'x': 139, 'y':589},{'x': 302, 'y':165},{'x': 517, 'y':356},{'x': 444, 'y':443},{'x': 134, 'y':136},{'x': 319, 'y':314},{'x': 160, 'y':398},{'x': 199, 'y':197},{'x': 155, 'y':31},{'x': 65, 'y':52},{'x': 107, 'y':169},{'x': 316, 'y':595},{'x': 0, 'y':156},{'x': 350, 'y':322},{'x': 254, 'y':353},{'x': 192, 'y':450},{'x': 171, 'y':504},{'x': 194, 'y':574},{'x': 276, 'y':97},{'x': 409, 'y':163},{'x': 107, 'y':421},{'x': 244, 'y':258},{'x': 168, 'y':433},{'x': 351, 'y':27},{'x': 396, 'y':290},{'x': 107, 'y':246},{'x': 480, 'y':56},{'x': 202, 'y':525},{'x': 57, 'y':108},{'x': 14, 'y':144},{'x': 374, 'y':544},{'x': 176, 'y':272},{'x': 448, 'y':566},{'x': 548, 'y':472},{'x': 174, 'y':280},{'x': 342, 'y':31},{'x': 516, 'y':363},{'x': 185, 'y':451},{'x': 437, 'y':388},{'x': 125, 'y':114},{'x': 341, 'y':561},{'x': 515, 'y':408},{'x': 509, 'y':343},{'x': 145, 'y':143},{'x': 322, 'y':347},{'x': 416, 'y':412},{'x': 28, 'y':194},{'x': 284, 'y':308},{'x': 19, 'y':583},{'x': 137, 'y':272},{'x': 132, 'y':18},{'x': 469, 'y':30},{'x': 10, 'y':231},{'x': 100, 'y':318},{'x': 264, 'y':377},{'x': 285, 'y':417},{'x': 324, 'y':454},{'x': 291, 'y':174},{'x': 440, 'y':509},{'x': 57, 'y':397},{'x': 238, 'y':157},{'x': 378, 'y':359},{'x': 225, 'y':425},{'x': 85, 'y':176},{'x': 195, 'y':233},{'x': 331, 'y':150},{'x': 538, 'y':70},{'x': 498, 'y':254},{'x': 522, 'y':400},{'x': 21, 'y':499},{'x': 453, 'y':71},{'x': 351, 'y':184},{'x': 595, 'y':596},{'x': 582, 'y':134}]);
		
		value_of(subject.envelope()).should_be(subject.sortByAbscissa([
			{'x': 19, 'y':583},
			{'x': 0, 'y':156},
			{'x': 65, 'y':52},
			{'x': 132, 'y':18},
			{'x': 469, 'y':30},
			{'x': 538, 'y':70},
			{'x': 582, 'y':134},
			{'x': 594, 'y':180},
			{'x': 595, 'y':596},
			{'x': 308, 'y':595},
			{'x': 139, 'y':589}
		]));
	}
});

})();
