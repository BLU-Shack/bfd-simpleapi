/** The universal base for all classes. */
class Base {
	constructor(obj) {
		/**
		 * The raw object used to give class values meaning.
		 * @name Base#raw
		 * @readonly
		 * @type {object}
		 */
		Object.defineProperty(this, 'raw', { value: obj });
	}
}

module.exports = Base;