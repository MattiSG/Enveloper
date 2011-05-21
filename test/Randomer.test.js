/**
 * author: Romaric Pighetti.
 */
(function() {
    
var points, envelope;
    
describe('Randomer class', {
    before: function() {
        points = [
			{'x': 0, 'y': 0},
			{'x': 1, 'y': 10},
			{'x': 10, 'y': 11},
			{'x': 11, 'y': 0},
			{'x': 5, 'y': 5},
            {'x': 4, 'y': 3}
		];
    },
    
    "One iteration in the computation" : function() {
        var randomer = new Randomer(points);
        randomer.envelope = [
                        {'x': 0, 'y': 0},
                        {'x': 4, 'y': 3},
                        {'x': 11, 'y': 0}
                    ];
        randomer.innerPoint = { 'x' : 5, 'y' : 1};
        randomer.iterate({'x': 5, 'y': 5});
        value_of(randomer.envelope).should_be([
                        {'x': 0, 'y': 0},
                        {'x': 5, 'y': 5},
                        {'x': 11, 'y': 0}
                    ]);
    },
    
    "Other iteration in the computation" : function() {
        var randomer = new Randomer(points);
        randomer.envelope = [
                        {'x': 0, 'y': 0},
                        {'x': 11, 'y': 0},
                        {'x': 5, 'y': 5}
                    ];
        randomer.innerPoint = { 'x' : 16/3, 'y' : 5/3};
        randomer.iterate({'x': 4, 'y': 3});
        value_of(randomer.envelope).should_be([
                                                {'x': 0, 'y': 0},
                                                {'x': 11, 'y': 0},
                                                {'x': 5, 'y': 5}
                                                ]);
    },
    
    "Another iteration in the computation" : function() {
        var randomer = new Randomer(points);
        randomer.envelope = [
                        {'x': 4, 'y': 3},
                        {'x': 11, 'y': 0},
                        {'x': 10, 'y': 11},
                        {'x': 1, 'y': 10}
                    ];
        randomer.innerPoint = { 'x' : 5, 'y' : 5};
        randomer.iterate({'x': 0, 'y': 0});
        value_of(randomer.envelope).should_be([
                                                {'x': 0, 'y': 0},
                                                {'x': 11, 'y': 0},
                                                {'x': 10, 'y': 11},
                                                {'x': 1, 'y': 10}
                                                ]);
    },
    
    "Envelope calculation" : function() {
        var randomer = new Randomer(points);
        randomer.computeEnvelope(points);
        value_of(randomer.envelope).should_have(4, "items");
        value_of(randomer.envelope).should_include({'x': 0, 'y': 0});
        value_of(randomer.envelope).should_include({'x': 1, 'y': 10});
        value_of(randomer.envelope).should_include({'x': 10, 'y': 11});
        value_of(randomer.envelope).should_include({'x': 11, 'y': 0});
    }
    
});
})();
