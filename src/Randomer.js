/**
 * Compute the convex envelope of a set of points
 * using a random algorithm.
 * authors: Romaric Pighetti, Matti Schneider-Ghibaudo
 */

var Randomer = new Class({
    points:[],
    envelope:[],
    innerPoint: {x:null, y:null},
    
    initialize: function init(points) {
        this.points = points;
    },
    
    computeEnvelope: function computeEnvelope(points) {
        newPoint = points.getRandom();
        if (newPoint == null) {
            return this.envelope;
        }
        if (this.envelope.length < 3) {
            this.envelope.push(newPoint);
        } else {
            /**
             * If no point inside the envelope has been created yet, we create one.
             */
            if (this.innerPoint.x == null) {
                //TODO: à reprendre en plus joli.
                this.innerPoint.x = (this.envelope[0].x+this.envelope[1].x+this.envelope[2].x)/3;
                this.innerPoint.y = (this.envelope[0].y+this.envelope[1].y+this.envelope[2].y)/3;
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
            var lowerAttach = PointsHelper.lowestPointFromIn(newPoint, this.envelope);
            var upperAttach = PointsHelper.highestPointFromIn(newPoint, this.envelope);
            var toRemove = PointsHelper.sameSideAs(new Vector(this.envelope[lowerAttach], this.envelope[upperAttach]), newPoint, this.envelope);
            
            /**
             * If there's nothing to remove, we just add the new point 
             * between the upper and the lower attach points int the 
             * envelope.
             */
            if (toRemove.length == 0) {
                var newEnvelope = [];
                var min = (lowerAttach<upperAttach)? lowerAttach : upperAttach;
                var before = this.envelope.splice(0,min+1);
                this.envelope = before.concat(newPoint, this.envelope);
            } 
            /**
             * Else we just add the point in place of one of the points
             * we have to remove and we remove all the other points to
             * remove from the envelope.
             */
            else {
                this.envelope[toRemove[0]] = newPoint;
                toRemove.splice(0,1);
                toRemove.each(
                    function(pointIndex) {
                        this.envelope.splice(pointIndex,1);
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
        for (var i = 0; i<this.envelope.length; i++) {
            var innerToa = new Vector(this.innerPoint, this.envelope[i]);
            var innerTob = new Vector(this.innerPoint, this.envelope[(i+1)%this.envelope.length]);
            var aTob = new Vector(this.envelope[i], this.envelope[(i+1)%this.envelope.length]);
            var aToinner = new Vector(this.envelope[i], this.innerPoint);
            var aTopoint = new Vector(this.envelope[i], point);
            
            if (innerTopoint.by(innerToa) * innerTopoint.by(innerTob) < 0 &&
                aTob.by(aToinner) * aTob.by(aTopoint) < 0) {
                    return [this.envelope[i], this.envelope[(i+1)%this.envelope.length]];
            }
        }
        return [];
    }
});
