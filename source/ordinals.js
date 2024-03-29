// (this file was autogenerated by `generate-locales`)
// "plural rules" functions are not stored in locale JSON files because they're not strings.
// This file isn't big — it's about 5 kilobytes in size (minified).
// Alternatively, the pluralization rules for each locale could be stored
// in their JSON files in a non-parsed form and later parsed via `make-plural` library.
// But `make-plural` library itself is relatively big in size:
// `make-plural.min.js` is about 6 kilobytes (https://unpkg.com/make-plural/).
// So, it's more practical to bypass runtime `make-plural` pluralization rules compilation
// and just include the already compiled pluarlization rules for all locales in the library code.

var $ = {
	af: function(n
	) {
		return 'other';
	},
	as: function(n
	) {
		return ((n == 1 || n == 5 || n == 7 || n == 8 || n == 9
						|| n == 10)) ? 'one'
				: ((n == 2
						|| n == 3)) ? 'two'
				: (n == 4) ? 'few'
				: (n == 6) ? 'many'
				: 'other';
	},
	az: function(n
	) {
		var s = String(n).split('.'), i = s[0], i10 = i.slice(-1),
				i100 = i.slice(-2), i1000 = i.slice(-3);
		return ((i10 == 1 || i10 == 2 || i10 == 5 || i10 == 7 || i10 == 8)
						|| (i100 == 20 || i100 == 50 || i100 == 70
						|| i100 == 80)) ? 'one'
				: ((i10 == 3 || i10 == 4) || (i1000 == 100 || i1000 == 200
						|| i1000 == 300 || i1000 == 400 || i1000 == 500 || i1000 == 600 || i1000 == 700
						|| i1000 == 800
						|| i1000 == 900)) ? 'few'
				: (i == 0 || i10 == 6 || (i100 == 40 || i100 == 60
						|| i100 == 90)) ? 'many'
				: 'other';
	},
	be: function(n
	) {
		var s = String(n).split('.'), t0 = Number(s[0]) == n,
				n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
		return ((n10 == 2
						|| n10 == 3) && n100 != 12 && n100 != 13) ? 'few' : 'other';
	},
	ca: function(n
	) {
		return ((n == 1
						|| n == 3)) ? 'one'
				: (n == 2) ? 'two'
				: (n == 4) ? 'few'
				: 'other';
	},
	cy: function(n
	) {
		return ((n == 0 || n == 7 || n == 8
						|| n == 9)) ? 'zero'
				: (n == 1) ? 'one'
				: (n == 2) ? 'two'
				: ((n == 3
						|| n == 4)) ? 'few'
				: ((n == 5
						|| n == 6)) ? 'many'
				: 'other';
	},
	en: function(n
	) {
		var s = String(n).split('.'), t0 = Number(s[0]) == n,
				n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
		return (n10 == 1 && n100 != 11) ? 'one'
				: (n10 == 2 && n100 != 12) ? 'two'
				: (n10 == 3 && n100 != 13) ? 'few'
				: 'other';
	},
	fil: function(n
	) {
		return (n == 1) ? 'one' : 'other';
	},
	gd: function(n
	) {
		return ((n == 1
						|| n == 11)) ? 'one'
				: ((n == 2
						|| n == 12)) ? 'two'
				: ((n == 3
						|| n == 13)) ? 'few'
				: 'other';
	},
	gu: function(n
	) {
		return (n == 1) ? 'one'
				: ((n == 2
						|| n == 3)) ? 'two'
				: (n == 4) ? 'few'
				: (n == 6) ? 'many'
				: 'other';
	},
	hu: function(n
	) {
		return ((n == 1
						|| n == 5)) ? 'one' : 'other';
	},
	it: function(n
	) {
		return ((n == 11 || n == 8 || n == 80
						|| n == 800)) ? 'many' : 'other';
	},
	ka: function(n
	) {
		var s = String(n).split('.'), i = s[0], i100 = i.slice(-2);
		return (i == 1) ? 'one'
				: (i == 0 || ((i100 >= 2 && i100 <= 20) || i100 == 40 || i100 == 60
						|| i100 == 80)) ? 'many'
				: 'other';
	},
	kk: function(n
	) {
		var s = String(n).split('.'), t0 = Number(s[0]) == n,
				n10 = t0 && s[0].slice(-1);
		return (n10 == 6 || n10 == 9
						|| t0 && n10 == 0 && n != 0) ? 'many' : 'other';
	},
	mk: function(n
	) {
		var s = String(n).split('.'), i = s[0], i10 = i.slice(-1),
				i100 = i.slice(-2);
		return (i10 == 1 && i100 != 11) ? 'one'
				: (i10 == 2 && i100 != 12) ? 'two'
				: ((i10 == 7
						|| i10 == 8) && i100 != 17 && i100 != 18) ? 'many'
				: 'other';
	},
	mr: function(n
	) {
		return (n == 1) ? 'one'
				: ((n == 2
						|| n == 3)) ? 'two'
				: (n == 4) ? 'few'
				: 'other';
	},
	ne: function(n
	) {
		var s = String(n).split('.'), t0 = Number(s[0]) == n;
		return ((t0 && n >= 1 && n <= 4)) ? 'one' : 'other';
	},
	or: function(n
	) {
		var s = String(n).split('.'), t0 = Number(s[0]) == n;
		return ((n == 1 || n == 5
						|| (t0 && n >= 7 && n <= 9))) ? 'one'
				: ((n == 2
						|| n == 3)) ? 'two'
				: (n == 4) ? 'few'
				: (n == 6) ? 'many'
				: 'other';
	},
	sq: function(n
	) {
		var s = String(n).split('.'), t0 = Number(s[0]) == n,
				n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
		return (n == 1) ? 'one'
				: (n10 == 4 && n100 != 14) ? 'many'
				: 'other';
	},
	sv: function(n
	) {
		var s = String(n).split('.'), t0 = Number(s[0]) == n,
				n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
		return ((n10 == 1
						|| n10 == 2) && n100 != 11 && n100 != 12) ? 'one' : 'other';
	},
	tk: function(n
	) {
		var s = String(n).split('.'), t0 = Number(s[0]) == n,
				n10 = t0 && s[0].slice(-1);
		return ((n10 == 6 || n10 == 9)
						|| n == 10) ? 'few' : 'other';
	},
	uk: function(n
	) {
		var s = String(n).split('.'), t0 = Number(s[0]) == n,
				n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
		return (n10 == 3 && n100 != 13) ? 'few' : 'other';
	}
}

$.am = $.af
$.ar = $.af
$.bg = $.af
$.bn = $.as
$.bs = $.af
$.ce = $.af
$.cs = $.af
$.da = $.af
$.de = $.af
$.dsb = $.af
$.el = $.af
$.es = $.af
$.et = $.af
$.eu = $.af
$.fa = $.af
$.fi = $.af
$.fr = $.fil
$.fy = $.af
$.ga = $.fil
$.gl = $.af
$.gsw = $.af
$.he = $.af
$.hi = $.gu
$.hr = $.af
$.hsb = $.af
$.hy = $.fil
$.ia = $.af
$.id = $.af
$.in = $.af
$.is = $.af
$.iw = $.af
$.ja = $.af
$.km = $.af
$.kn = $.af
$.ko = $.af
$.ky = $.af
$.lo = $.fil
$.lt = $.af
$.lv = $.af
$.ml = $.af
$.mn = $.af
$.mo = $.fil
$.ms = $.fil
$.my = $.af
$.nb = $.af
$.nl = $.af
$.pa = $.af
$.pl = $.af
$.prg = $.af
$.ps = $.af
$.pt = $.af
$.ro = $.fil
$.root = $.af
$.ru = $.af
$.sc = $.it
$.scn = $.it
$.sd = $.af
$.sh = $.af
$.si = $.af
$.sk = $.af
$.sl = $.af
$.sr = $.af
$.sw = $.af
$.ta = $.af
$.te = $.af
$.th = $.af
$.tl = $.fil
$.tr = $.af
$.ur = $.af
$.uz = $.af
$.vi = $.fil
$.yue = $.af
$.zh = $.af
$.zu = $.af

export default $