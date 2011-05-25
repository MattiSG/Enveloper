/**
*A renderer should implement the following methods:
*	- setInput(points)
*	- envelope()
*/

var AvailableRenderers = { // used to generate GUI
	registered: {},
	
	register: function register(name, klass, color) {
		this.registered[name] = klass;
		klass.implement({
			color: color || 'black'
		});
	},
	
	getAll: function getAll() {
		return this.registered;
	},
	
	each: function forEachRenderer(func) {
		Object.each(this.registered, func);
	}
}
