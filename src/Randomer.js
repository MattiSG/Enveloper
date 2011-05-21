/**
 * Compute the convex envelope of a set of points
 * using a random algorithm.
 * authors: Romaric Pighetti, Matti Schneider-Ghibaudo
 */

var Randomer = new Class({
    points:[],
    tenvelope:[],
    innerPoint: {x:null, y:null},
    
    initialize: function init(points) {
        this.points = points;
    },
    
    setInput : function setInput(points) {
        this.points = points;
    },
    
    envelope : function envelope() {
        if (this.tenvelope.length == 0)
            this.computeEnvelope(this.points);
        return this.tenvelope;
    },
    
    computeEnvelope: function computeEnvelope(points) {
        newPoint = points.getRandom();
        if (newPoint == null) {
            return this.tenvelope;
        }
        if (this.tenvelope.length < 3) {
            this.tenvelope.push(newPoint);
        } else {
            /**
             * If no point inside the envelope has been created yet, we create one.
             */
            if (this.innerPoint.x == null) {
                //TODO: à reprendre en plus joli.
                this.innerPoint.x = (this.tenvelope[0].x+this.tenvelope[1].x+this.tenvelope[2].x)/3;
                this.innerPoint.y = (this.tenvelope[0].y+this.tenvelope[1].y+this.tenvelope[2].y)/3;
            }
            
            this.iterate(newPoint);
            
        }
        this.computeEnvelope(points.erase(newPoint));
    },
    
    iterate: function iterate(newPoint) {
        /**
         * Check wether the newPoint is inside the envelope or not, if it is not
         * we have some computation to do.
         */
        var segmentCrossed = this.crossEnvelope(newPoint);
        if (segmentCrossed.length != 0) {
            var lowerAttach = PointsHelper.lowestPointFromIn(newPoint, this.tenvelope);
            var upperAttach = PointsHelper.highestPointFromIn(newPoint, this.tenvelope);
            var toRemove = PointsHelper.sameSideAs(new Vector(this.tenvelope[lowerAttach], this.tenvelope[upperAttach]), newPoint, this.tenvelope);
            
            /**
             * If there's nothing to remove, we just add the new point 
             * between the upper and the lower attach points int the 
             * envelope.
             */
            if (toRemove.length == 0) {
                var newEnvelope = [];
                var min = (lowerAttach<upperAttach)? lowerAttach : upperAttach;
                var before = this.tenvelope.splice(0,min+1);
                this.tenvelope = before.concat(newPoint, this.tenvelope);
            } 
            /**
             * Else we just add the point in place of one of the points
             * we have to remove and we remove all the other points to
             * remove from the envelope.
             */
            else {
                this.tenvelope[toRemove[0]] = newPoint;
                toRemove.splice(0,1);
                toRemove.each(
                    function(pointIndex) {
                        this.tenvelope.splice(pointIndex,1);
                    },this);
            }
            //this.envelope.push(newPoint);
        }
    },
    
    /**
     * Return the two points of the segment of the envelope 
     * that the segment [innerPoint, point] crosses if there is one, 
     * an empty array is returned if there are no intersection.
     */
    crossEnvelope: function crossEnvelope(point) {
        var innerTopoint = new Vector(this.innerPoint, point);
        for (var i = 0; i<this.tenvelope.length; i++) {
            var innerToa = new Vector(this.innerPoint, this.tenvelope[i]);
            var innerTob = new Vector(this.innerPoint, this.tenvelope[(i+1)%this.tenvelope.length]);
            var aTob = new Vector(this.tenvelope[i], this.tenvelope[(i+1)%this.tenvelope.length]);
            var aToinner = new Vector(this.tenvelope[i], this.innerPoint);
            var aTopoint = new Vector(this.tenvelope[i], point);
            
            if (innerTopoint.by(innerToa) * innerTopoint.by(innerTob) < 0 &&
                aTob.by(aToinner) * aTob.by(aTopoint) < 0) {
                    return [this.tenvelope[i], this.tenvelope[(i+1)%this.tenvelope.length]];
            }
        }
        return [];
    }
});