/** The universal base for all classes. */
class Base {
	constructor(obj) {
		Object.defineProperty(this, 'raw', { value: obj });
	}
}

module.exports = Base;