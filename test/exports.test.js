import PluralRules from '../index'

describe(`exports`, () => {
	it(`should export ES6`, () => {
		new PluralRules('en').select(0).should.be.a('string')
	})

	it(`should export CommonJS`, () => {
		const Library = require('../index.commonjs')
		new Library.default('en').select(0).should.be.a('string')
	})
})