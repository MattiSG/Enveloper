/**Additional rhombus optimization for any algorithm.
*/

AvailableRenderers.each(function(klass, name) {
	var rhombusKlass = new Class({
		Extends: klass,
		
		setInput: function setInputWithRhombus(points) {
			this.parent(points.length > 3
						? this.applyRhombus(points)
						: points);
		},
		
		applyRhombus: function applyRhombus(points) {
			var result = PointsHelper.sortBy('x', points.clone());
			var bounds = [result[0], result.getLast()];
			
			result = PointsHelper.sortBy('y', result);
			bounds.push(result[0], result.getLast());
			
			return result.filter(function(point) {
				return PointsHelper.crossEnvelope(bounds, PointsHelper.barycenter(bounds), point); // in JS, [] is evaluated to false, any other array value will be evaluated to true
			});		
		}
	});
	
	AvailableRenderers.register(name + ' + ◈', rhombusKlass, 'light ' + klass.color);
});
