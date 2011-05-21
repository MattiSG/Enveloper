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
        randomer.tenvelope = [
                        {'x': 0, 'y': 0},
                        {'x': 4, 'y': 3},
                        {'x': 11, 'y': 0}
                    ];
        randomer.innerPoint = { 'x' : 5, 'y' : 1};
        randomer.iterate({'x': 5, 'y': 5});
        value_of(randomer.tenvelope).should_be([
                        {'x': 0, 'y': 0},
                        {'x': 5, 'y': 5},
                        {'x': 11, 'y': 0}
                    ]);
    },
    
    "Other iteration in the computation" : function() {
        var randomer = new Randomer(points);
        randomer.tenvelope = [
                        {'x': 0, 'y': 0},
                        {'x': 11, 'y': 0},
                        {'x': 5, 'y': 5}
                    ];
        randomer.innerPoint = { 'x' : 16/3, 'y' : 5/3};
        randomer.iterate({'x': 4, 'y': 3});
        value_of(randomer.tenvelope).should_be([
                                                {'x': 0, 'y': 0},
                                                {'x': 11, 'y': 0},
                                                {'x': 5, 'y': 5}
                                                ]);
    },
    
    "Another iteration in the computation" : function() {
        var randomer = new Randomer(points);
        randomer.tenvelope = [
                        {'x': 4, 'y': 3},
                        {'x': 11, 'y': 0},
                        {'x': 10, 'y': 11},
                        {'x': 1, 'y': 10}
                    ];
        randomer.innerPoint = { 'x' : 5, 'y' : 5};
        randomer.iterate({'x': 0, 'y': 0});
        value_of(randomer.tenvelope).should_be([
                                                {'x': 0, 'y': 0},
                                                {'x': 11, 'y': 0},
                                                {'x': 10, 'y': 11},
                                                {'x': 1, 'y': 10}
                                                ]);
    },
    
    "Iteration with multiple deletion" : function() {
        var randomer = new Randomer(points);
        randomer.tenvelope = [
                        {'x': 4, 'y': 3},
                        {'x': 5, 'y': 5},
                        {'x': 10, 'y': 11},
                        {'x': 11, 'y': 0}
                    ];
        randomer.innerPoint = { 'x' : 8, 'y' : 5};
        randomer.iterate({'x': 0, 'y': 0});
        value_of(randomer.tenvelope).should_be([
                                                {'x': 0, 'y': 0},
                                                {'x': 10, 'y': 11},
                                                {'x': 11, 'y': 0}
                                                ]);
    },
    
    "Iteration again" : function() {
        var randomer = new Randomer(points);
        randomer.tenvelope = [
                        {'x': 4, 'y': 3},
                        {'x': 1, 'y': 10},
                        {'x': 5, 'y': 5}
                    ];
        randomer.innerPoint = { 'x' : 10/3, 'y' : 18/3};
        randomer.iterate({'x': 10, 'y': 11});
        value_of(randomer.tenvelope).should_be([
                                                {'x': 4, 'y': 3},
                                                {'x': 1, 'y': 10},
                                                {'x': 10, 'y': 11}
                                                ]);
    },
    
    "Iteration again" : function() {
        var randomer = new Randomer(points);
        randomer.tenvelope = [
                        {'x': 0, 'y': 0},
                        {'x': 4, 'y': 3},
                        {'x': 5, 'y': 5}
                    ];
        randomer.innerPoint = { 'x' : 9/3, 'y' : 8/3};
        randomer.iterate({'x': 1, 'y': 10});
        value_of(randomer.tenvelope).should_be([
                                                {'x': 1, 'y': 10},
                                                {'x': 0, 'y': 0},
                                                {'x': 4, 'y': 3},
                                                {'x': 5, 'y': 5}
                                                ]);
    },
    
    "Envelope calculation" : function() {
        var randomer = new Randomer(points);
        randomer.envelope();
        value_of(randomer.tenvelope).should_have(4, "items");
        value_of(randomer.tenvelope).should_include({'x': 0, 'y': 0});
        value_of(randomer.tenvelope).should_include({'x': 1, 'y': 10});
        value_of(randomer.tenvelope).should_include({'x': 10, 'y': 11});
        value_of(randomer.tenvelope).should_include({'x': 11, 'y': 0});
    }
    
});
})();
