/**
 * Computes the convex envelope of a set of points using a random algorithm.
 * authors: Romaric Pighetti
 */

var Randomer = new Class({
    tenvelope:[],
    innerPoint: {x:null, y:null},
    logText: "",
    
    initialize: function init(points) {
        this.setInput(points)
    },
    
    setInput : function setInput(points) {
    	this.points = points.clone();
        this.tenvelope = [];
		this.innerPoint = {x:null, y:null};
    },
    
    envelope : function envelope() {
        if (this.tenvelope.length == 0)
            this.computeEnvelope(this.points);
        return this.tenvelope;
    },
    
    computeEnvelope: function computeEnvelope(points) {
        //this.addCurrentEnvelopeToLog();
        newPoint = points.getRandom();
        
        if (newPoint == null) {
            return this.tenvelope;
        }
        
        /*
         * For the first three points, there are no special treatments.
         * We just pick them randomly.
         */
        if (this.tenvelope.length < 3) {
            this.tenvelope.push(newPoint);
        } else {
            /*
             * If no point inside the envelope has been created yet, we create one.
             * I chose the barycenter of the three first points.
             */
             if (this.innerPoint.x == null)
	             this.innerPoint = PointsHelper.barycenter(this.tenvelope);
	                         
            this.iterate(newPoint);
        }
        this.computeEnvelope(points.erase(newPoint));
    },
    
    /**
     * Compute the envelope after the integration of newPoint.
     */
    iterate: function iterate(newPoint) {
        /*
         * Check wether the newPoint is inside the envelope or not, if it is not
         * we have some computation to do.
         */
        var segmentCrossed = PointsHelper.crossEnvelope(this.tenvelope, this.innerPoint, newPoint);
        if (segmentCrossed.length != 0) {
            var lowerAttach = PointsHelper.lowestPointFromIn(newPoint, this.tenvelope);
            var upperAttach = PointsHelper.highestPointFromIn(newPoint, this.tenvelope);
            var toRemove = [];
            var refVect = new Vector(this.tenvelope[lowerAttach], this.tenvelope[upperAttach]);
            if(refVect.by(new Vector(this.tenvelope[lowerAttach], newPoint))!=0) {
                toRemove = PointsHelper.sameSideAs(refVect, newPoint, this.tenvelope);
            }

            var min = (lowerAttach<upperAttach)? lowerAttach : upperAttach;
            var max = lowerAttach+upperAttach-min;
            
            /*
             * If there's nothing to remove, we just add the new point 
             * between the upper and the lower attach points in the 
             * envelope.
             */            
            if (toRemove.length == 0) {
                var newEnvelope = [];
                if (min == 0 && max == this.tenvelope.length-1) {
                    this.tenvelope = [].concat(newPoint, this.tenvelope);
                } 
                else {
                    var before = this.tenvelope.splice(0,min+1);
                    this.tenvelope = before.concat(newPoint, this.tenvelope);
                }
            } 
            
            /*
             * Else we just add the point in place of one of the points
             * we have to remove and we remove all the other points to
             * remove from the envelope.
             */
            else {
                this.tenvelope[toRemove[0]] = newPoint;
                toRemove.splice(0,1);
                toRemove.sort().reverse().each(
                    function(pointIndex) {
                        this.tenvelope.splice(pointIndex,1);
                    },this);
            }
        }
    },
    
    addCurrentEnvelopeToLog: function log() {
        this.tenvelope.each(function (point, index) { this.logText+=index+" : x = "+point.x+" y = "+point.y+" \n";},this);
        this.logText+="<br/>";
    }
});


AvailableRenderers.register('Randomized', Randomer, 'green');
