import Cardinals from "./cardinals"
import getPluralRulesLocale from "./getPluralRulesLocale"

// Babel adds a bit of its own bloat for `class`es so using a `function` here.

/**
 * `Intl.PluralRules` polyfill.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules
 */
export default function PluralRules(locale, options) {
	if (options && options.type !== "cardinal") {
		throw new RangeError(`Unsupported "type": ${options.type}`)
	}
	if (!Cardinals[getPluralRulesLocale(locale)]) {
		throw new RangeError(`Unsupported locale: ${locale}`)
	}
	this._ = getPluralRulesLocale(locale)
	this.$ = Cardinals[this._]
}

PluralRules.prototype.select = function(number) {
	return this.$(number)
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules/resolvedOptions
PluralRules.prototype.resolvedOptions = function() {
	return {
		locale: this._,
		type: "cardinal"
	}
}

PluralRules.supportedLocalesOf = function(locales) {
	if (typeof locales === "string") {
		locales = [locales]
	}
	return locales.filter(locale => Cardinals[getPluralRulesLocale(locale)])
}