import Cardinals from "./cardinals"
import Ordinals from "./ordinals"

import getPluralRulesLocale from "./getPluralRulesLocale"

/**
 * `Intl.PluralRules` polyfill.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules
 */
export default class PluralRules {
	constructor(locale, options = {}) {
		const { type } = options
		if (type === undefined || type === "cardinal") {
			this.type = "cardinal"
		} else if (type === "ordinal") {
			this.type = "ordinal"
		} else {
			throw new RangeError(`Unsupported "type" option: ${type}`)
		}
		if (typeof locale !== 'string') {
			throw new TypeError('Only string locale is supported')
		}
		if (PluralRules.supportedLocalesOf(locale).length === 0) {
			throw new RangeError(`Unsupported locale: ${locale}`)
		}
		this.locale = getPluralRulesLocale(locale, this.type === "ordinal")
		this.quantify = this.type === "cardinal" ?
			Cardinals[this.locale] :
			// Not for every locale are there "ordinal" plural rules in CLDR.
			(Ordinals[this.locale] || (() => 'other'))
	}
	select(number) {
		return this.quantify(number)
	}
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules/resolvedOptions
	resolvedOptions() {
		return {
			locale: this.locale,
			type: this.type
		}
	}
	static supportedLocalesOf(locales) {
		if (typeof locales === "string") {
			locales = [locales]
		}
		return locales.filter(locale => Cardinals[getPluralRulesLocale(locale)])
	}
}