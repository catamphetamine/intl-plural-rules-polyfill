import path from 'path'
import fs from 'fs-extra'

// `make-plural` library converts CLDR pluralization rules into javascript code.
// https://github.com/eemeli/make-plural
import MakePlural from 'make-plural/make-plural'
import plurals from 'make-plural'

// CLDR packages should be periodically updated as they release new versions.
// `npm install cldr-data@latest cldr-dates-full@latest --save-dev`
import CLDR from 'cldr-data'

import getPluralRulesLocale from '../source/getPluralRulesLocale'

const MakePlurals = MakePlural.load(
	CLDR('supplemental/plurals'),
	CLDR('supplemental/ordinals')
)

function generate(ordinals) {
	// "Plural rules" functions are not stored in JSON files because they're not strings
	// therefore all of them are stored in a separate `locale/PluralRuleFunctions.js` file.
	// This file isn't big — it's about 5 kilobytes in size (minified).
	// Alternatively, the pluralization rules for each locale could be stored
	// in their JSON files in a non-parsed form and later parsed via `make-plural` library.
	// But `make-plural` library itself is relatively big in size:
	// `make-plural.min.js` is about 6 kilobytes (https://unpkg.com/make-plural/).
	// So, it's more practical to bypass runtime `make-plural` pluralization rules compilation
	// and just include the already compiled pluarlization rules for all locales in the library code.
	const pluralRuleFunctions = {}
	const pluralRuleFunctionAliases = {}

	for (const locale of Object.keys(plurals)) {
		// "pt" language is weird because there're the regular "pt" (Portuguese),
		// the "pt-PT" (European Portuguese) and various "pt-XX"s.
		//
		// For "pt" language the relative time messages seem to be different
		// from all other "pt-" variations which seem to be identical to "pt-PT".
		//
		// Also, "plural rules" function for "pt" language is different from "pt-PT".
		// It's the only case when there's a "plural rules" function for a locale
		// instead of a language.
		// http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
		// (See "pt" vs "pt_PT" there)

		// For English there're different variations of "en" language
		// which differ from one another by a simple dot, e.g. "yr." vs "yr".

		const expectedLocale = getPluralRulesLocale(locale, ordinals ? 'ordinal' : 'cardinal')
		if (locale !== expectedLocale) {
			throw new Error(`Expected to find pluralization rules for "${expectedLocale}" locale but found them for "${locale}" locale`)
		}

		// Skip locales for which there're no "ordinal" formatting rules.
		if (ordinals && !Object.keys(MakePlurals.rules.ordinal).includes(locale)) {
			continue
		}

		// Get "plural rules" function code.
		const quantify = new MakePlurals(locale, {
			cardinals: !ordinals,
			ordinals: ordinals
		}).toString()

		// If "plural rules" function is defined for this locale then add it to `PluralRuleFunctions.js`.
		if (quantify && !pluralRuleFunctions[locale]) {
			// If this "plural rules" function is a duplicate of an already existing one
			// then don't add its code to the list.
			for (const similarLocale of Object.keys(pluralRuleFunctions)) {
				if (pluralRuleFunctions[similarLocale] === quantify) {
					// Just alias it.
					pluralRuleFunctionAliases[locale] = similarLocale
				}
			}
			// If this "plural rules" function is not a duplicate than add its code to the list.
			if (!pluralRuleFunctionAliases[locale]) {
				pluralRuleFunctions[locale] = quantify
			}
		}
	}

	// Output "plural rules" functions for all locales.
	fs.outputFileSync(
		path.join(__dirname, `../source/${ordinals ? 'ordinals' : 'cardinals'}.js`),
			'// (this file was autogenerated by `generate-locales`)' + '\n' +
			'// "plural rules" functions are not stored in locale JSON files because they\'re not strings.' + '\n' +
			'// This file isn\'t big — it\'s about 5 kilobytes in size (minified).' + '\n' +
			'// Alternatively, the pluralization rules for each locale could be stored' + '\n' +
			'// in their JSON files in a non-parsed form and later parsed via `make-plural` library.' + '\n' +
			'// But `make-plural` library itself is relatively big in size:' + '\n' +
			'// `make-plural.min.js` is about 6 kilobytes (https://unpkg.com/make-plural/).' + '\n' +
			'// So, it\'s more practical to bypass runtime `make-plural` pluralization rules compilation' + '\n' +
			'// and just include the already compiled pluarlization rules for all locales in the library code.' + '\n' +
			'\n' +
			'var $ = {' + '\n' +
			Object.keys(pluralRuleFunctions).map(locale => `\t${locale}: ${tabulate(pluralRuleFunctions[locale], 1).slice(1)}`).join(',\n') +
			'\n}' + '\n\n' +
			Object.keys(pluralRuleFunctionAliases).map(locale => `$${locale.indexOf('-') > 0 ? '["' + locale + '"]' : '.' + locale} = $.${pluralRuleFunctionAliases[locale]}`).join('\n') +
			'\n\n' +
			'export default $'
	)
}

generate(false)
generate(true)

function tabulate(code, count) {
	return code.split('\n').map(_ => '\t'.repeat(count) + convertSpacesToTabs(_)).join('\n')
}

function convertSpacesToTabs(text) {
	let spacesToTabs
	while ((spacesToTabs = text.replace(/^(\t*)  /, '$1\t')) !== text) {
		text = spacesToTabs
	}
	return text
}