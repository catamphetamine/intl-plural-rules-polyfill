import PluralRules from './PluralRulesFull'

describe('Intl.PluralRules', () => {
	it('should validate "locales" argument', () => {
		expect(() => new PluralRules('xx')).to.throw('Unsupported locale')
	})

	it('should validate "locales" argument', () => {
		expect(() => new PluralRules(['en'])).to.throw('Only string locale')
	})

	it('should validate "type" option', () => {
		expect(() => new PluralRules('en', { type: 'exotic' }).select(1)).to.throw('Unsupported "type"')
	})

	it('should quantify numbers', () => {
		expect(new PluralRules('en').select(0)).to.equal('other')
		expect(new PluralRules('en').select(1)).to.equal('one')
	})

	it('should use supported locales', () => {
		expect(new PluralRules('en-US-POSIX').select(0)).to.equal('other')
		expect(new PluralRules('en-US-POSIX').select(1)).to.equal('one')
	})

	it('should return supported locales of', () => {
		expect(PluralRules.supportedLocalesOf('ru-RU-Cyrl')).to.deep.equal(['ru-RU-Cyrl'])
		expect(PluralRules.supportedLocalesOf(['ru-RU-Cyrl'])).to.deep.equal(['ru-RU-Cyrl'])
	})

	it('should quantify ordinal numbers', () => {
		expect(new PluralRules('as', { type: 'ordinal' }).select(4)).to.equal('few')
		expect(new PluralRules('as', { type: 'ordinal' }).select(6)).to.equal('many')
	})

	it('should return "other" for missing ordinal locales', () => {
		expect(new PluralRules('ak', { type: 'ordinal' }).select(0)).to.equal('other')
	})

	it('should support "pt-PT" vs "pt"', () => {
		expect(new PluralRules('pt-PT').select(0)).to.equal('other')
		expect(new PluralRules('pt').select(0)).to.equal('one')
	})

	it('should return "resolvedOptions()"', () => {
		expect(new PluralRules('ru-RU-Cyrl', { type: 'ordinal' }).resolvedOptions()).to.deep.equal({
			locale: 'ru',
			type: 'ordinal'
		})
	})
})