/** The universal base for all classes. */
class Base {
	constructor(obj) {
		/**
		 * The raw object used to give class values meaning.
		 */
		Object.defineProperty(this, 'raw', { value: obj });
	}
}

module.exports = Base;