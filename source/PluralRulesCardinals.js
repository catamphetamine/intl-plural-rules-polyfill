import Cardinals from "./cardinals"

import getPluralRulesLocale from "./getPluralRulesLocale"

/**
 * `Intl.PluralRules` polyfill.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules
 */
export default class PluralRules {
	constructor(locale, options) {
		if (options && options.type !== "cardinal") {
			throw new RangeError(`Unsupported "type": ${options.type}`)
		}
		if (PluralRules.supportedLocalesOf(locale).length === 0) {
			throw new RangeError(`Unsupported locale: ${locale}`)
		}
		this.locale = getPluralRulesLocale(locale)
		this.quantify = Cardinals[this.locale]
	}
	select(number) {
		return this.quantify(number)
	}
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules/resolvedOptions
	resolvedOptions() {
		return {
			locale: this.locale,
			type: "cardinal"
		}
	}
	static supportedLocalesOf(locales) {
		if (typeof locales === "string") {
			locales = [locales]
		}
		return locales.filter(locale => Cardinals[getPluralRulesLocale(locale)])
	}
}