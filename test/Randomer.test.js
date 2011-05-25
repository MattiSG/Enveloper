/**
 * author: Romaric Pighetti.
 */
(function() {
    
var points, points2, hardcore;
    
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
        
        points2 = [
            {'x':302,'y':280},
            {'x':226,'y':270},
            {'x':256,'y':304},
            {'x':294,'y':296},
            {'x':277,'y':275},
            {'x':257,'y':277},
            {'x':268,'y':283},
            {'x':250,'y':281},
            {'x':268,'y':294},
            {'x':242,'y':291}
        ];
        
        hardcore = [
            {'x':100,'y':100},
            {'x':150,'y':150},
            {'x':200,'y':200},
            {'x':300,'y':300},
            {'x':400,'y':300}
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
    
    "and again" : function() {
        var randomer = new Randomer(points);
        randomer.tenvelope = [
                        {'x': 5, 'y': 5},
                        {'x': 10, 'y': 11},
                        {'x': 4, 'y': 3}
                    ];
        randomer.innerPoint = { 'x' : 19/3, 'y' : 19/3};
        randomer.iterate({'x': 0, 'y': 0});
        value_of(randomer.tenvelope).should_be([
                                                {'x': 0, 'y': 0},
                                                {'x': 10, 'y': 11},
                                                {'x': 4, 'y': 3}
                                                ]);
    },
    
    "another error" : function() {
        var randomer = new Randomer(points2);
        randomer.tenvelope = [
                        {'x':242, 'y':291},
                        {'x':226, 'y':270},
                        {'x':257, 'y':277},
                        {'x':268, 'y':283},
                        {'x':268, 'y':294},
                        {'x':256, 'y':304}
                        ];
        
        randomer.innerPoint = { 'x' : (242+268+256)/3, 'y' : (291+294+304)/3};
        randomer.iterate({'x': 302, 'y': 280});
        value_of(randomer.tenvelope).should_be([
                                                {'x':242, 'y':291},
                                                {'x':226, 'y':270},
                                                {'x':302, 'y':280},
                                                {'x':256, 'y':304}
                                                ]);
    },
    
    "points alignés" : function() {
        var randomer = new Randomer(points);
        randomer.tenvelope = [
                        {'x': 400, 'y': 300},
                        {'x': 200, 'y': 200},
                        {'x': 100, 'y': 100}
                    ];
        randomer.innerPoint = { 'x' : 750/3, 'y' : 600/3};
        randomer.iterate({'x': 300, 'y': 300});
        value_of(randomer.tenvelope).should_be([
                                                {'x': 400, 'y': 300},
                                                {'x': 300, 'y': 300},
                                                {'x': 100, 'y': 100}
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
    },
    
    "Envelope calculation points2" : function() {
        var randomer = new Randomer(points2);
        randomer.envelope();
        value_of(randomer.tenvelope).should_have(6, "items");
        value_of(randomer.tenvelope).should_include({'x': 226, 'y': 270});
        value_of(randomer.tenvelope).should_include({'x': 242, 'y': 291});
        value_of(randomer.tenvelope).should_include({'x': 256, 'y': 304});
        value_of(randomer.tenvelope).should_include({'x': 294, 'y': 296});
        value_of(randomer.tenvelope).should_include({'x': 302, 'y': 280});
        value_of(randomer.tenvelope).should_include({'x': 277, 'y': 275});
    },
    
    "Envelope calculation hardcore" : function() {
        var randomer = new Randomer(hardcore);
        randomer.envelope();
        value_of(randomer.tenvelope).should_have(3, "items");
        value_of(randomer.tenvelope).should_include({'x': 100, 'y': 100});
        value_of(randomer.tenvelope).should_include({'x': 300, 'y': 300});
        value_of(randomer.tenvelope).should_include({'x': 400, 'y': 300});
    }
});
})();
