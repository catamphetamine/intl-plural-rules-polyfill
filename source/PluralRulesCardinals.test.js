import PluralRules from './PluralRulesCardinals'

describe('Intl.PluralRules', () => {
	it('should validate "locales" argument', () => {
		expect(() => new PluralRules('xx')).to.throw('Unsupported locale')
	})

	it('should quantify numbers', () => {
		expect(new PluralRules('en').select(0)).to.equal('other')
		expect(new PluralRules('en', { type: 'cardinal' }).select(1)).to.equal('one')
	})

	it('should throw on "ordinal"', () => {
		expect(() => new PluralRules('en', { type: "ordinal" })).to.throw('Unsupported "type"')
	})

	it('should return supported locales of', () => {
		expect(PluralRules.supportedLocalesOf('ru-RU-Cyrl')).to.deep.equal(['ru-RU-Cyrl'])
		expect(PluralRules.supportedLocalesOf(['ru-RU-Cyrl'])).to.deep.equal(['ru-RU-Cyrl'])
	})

	it('should return "resolvedOptions()"', () => {
		expect(new PluralRules('ru-RU-Cyrl').resolvedOptions()).to.deep.equal({
			locale: 'ru',
			type: 'cardinal'
		})
	})
})