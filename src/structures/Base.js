class Base {
	constructor(obj) {
		Object.defineProperty(this, 'raw', { value: obj });
	}
}

module.exports = Base;