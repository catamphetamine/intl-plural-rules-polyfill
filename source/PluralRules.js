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
		let ordinal
		if (type === undefined || type === "cardinal") {
			this.type = "cardinal"
		} else if (type === "ordinal") {
			this.type = "ordinal"
			ordinal = true
		} else {
			throw new RangeError(`Unsupported "type" option: ${type}`)
		}
		const locales = PluralRules.supportedLocalesOf(locale)
		if (locales.length === 0) {
			throw new RangeError(`Unsupported locale: ${locale}`)
		}
		this.locale = getPluralRulesLocale(locales[0], ordinal)
		this.quantify = ordinal ?
			// Not for every locale are there "ordinal" plural rules in CLDR.
			(Ordinals[this.locale] || (() => 'other')) :
			Cardinals[this.locale]

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