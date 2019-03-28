(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-methods.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var asc = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ "./node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails-is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_function-to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ "./node_modules/core-js/modules/_function-to-string.js");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_string-at.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-context.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-repeat.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-define.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-ext.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find-index.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.assign.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var test = {};
test[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.repeat.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js")
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.starts-with.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/core-js/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _movies_movies_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./movies/movies.component */ "./src/app/movies/movies.component.ts");
/* harmony import */ var _movies_movie_details_movie_details_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./movies/movie-details/movie-details.component */ "./src/app/movies/movie-details/movie-details.component.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth/auth.guard */ "./src/app/auth/auth.guard.ts");






var routes = [
    { path: '', component: _movies_movies_component__WEBPACK_IMPORTED_MODULE_3__["MoviesComponent"] },
    { path: 'movies', component: _movies_movies_component__WEBPACK_IMPORTED_MODULE_3__["MoviesComponent"] },
    { path: 'movie-details', component: _movies_movie_details_movie_details_component__WEBPACK_IMPORTED_MODULE_4__["MovieDetailsComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, {
                    scrollPositionRestoration: 'enabled'
                })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'HeroloCinema';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _movies_movies_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./movies/movies.component */ "./src/app/movies/movies.component.ts");
/* harmony import */ var _movies_movie_details_movie_details_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./movies/movie-details/movie-details.component */ "./src/app/movies/movie-details/movie-details.component.ts");
/* harmony import */ var _services_tmdb_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/tmdb.service */ "./src/app/services/tmdb.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./auth/auth.guard */ "./src/app/auth/auth.guard.ts");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/fire */ "./node_modules/@angular/fire/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _movies_movies_component__WEBPACK_IMPORTED_MODULE_6__["MoviesComponent"],
                _movies_movie_details_movie_details_component__WEBPACK_IMPORTED_MODULE_7__["MovieDetailsComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_11__["NgMultiSelectDropDownModule"].forRoot(),
                _angular_fire__WEBPACK_IMPORTED_MODULE_13__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].firebase)
            ],
            providers: [_services_tmdb_service__WEBPACK_IMPORTED_MODULE_8__["TmdbService"], _auth_auth_guard__WEBPACK_IMPORTED_MODULE_12__["AuthGuard"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
            entryComponents: [
                _movies_movie_details_movie_details_component__WEBPACK_IMPORTED_MODULE_7__["MovieDetailsComponent"]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth/auth.guard.ts":
/*!************************************!*\
  !*** ./src/app/auth/auth.guard.ts ***!
  \************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/modal.service */ "./src/app/services/modal.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var AuthGuard = /** @class */ (function () {
    function AuthGuard(modalDService, router) {
        this.modalDService = modalDService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (this.modalDService._movieD == undefined) {
            this.router.navigateByUrl('movies');
            return false;
        }
        return true;
    };
    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_modal_service__WEBPACK_IMPORTED_MODULE_2__["ModalDService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/movies/movie-details/movie-details.component.css":
/*!******************************************************************!*\
  !*** ./src/app/movies/movie-details/movie-details.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".editBP{\r\n\tz-index: 50;\r\n\tposition: absolute;\r\n\tright : 20px;\r\n\ttop: 150px;\r\n\r\n\t}\r\n.editB{\r\n\tbackground-color: rgba(207, 123, 67, 0.959);\r\n  border: none;\r\n  padding: 5px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  border-radius: 10%;\r\n  font-size: 18px;\r\n  line-height: 30px;\r\n\tcursor: pointer;\r\n\twidth: 75px;\r\n\theight: 40px;\r\n  color: white;\r\n  font-weight: 400;\r\n\tbox-shadow: 0 0 100px 20px rgba(235, 225, 225, 0.308);\r\n\r\n}\r\n.editB:hover{\r\n  background-color: \trgba(255, 108, 9, 0.877);\r\n\r\n}\r\n.deleteBP{\r\n\tz-index: 50;\r\n\tposition: absolute;\r\n\tright : 110px;\r\n\ttop: 150px;\r\n\t\r\n\r\n\t}\r\n.deleteB{\r\n\tbackground-color: rgba(194, 30, 18, 0.623);\r\n  border: none;\r\n  padding: 5px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  border-radius: 10%;\r\n  font-size: 18px;\r\n  line-height: 30px;\r\n\tcursor: pointer;\r\n\twidth: 75px;\r\n\theight: 40px;\r\n  color: white;\r\n  font-weight: 400;\r\n\tbox-shadow: 0 0 100px 20px rgba(235, 225, 225, 0.308);\r\n\r\n}\r\n.deleteB:hover{\r\n  background-color: \trgba(194, 30, 18, 0.945);\r\n}\r\n.backB{\r\n\tbackground-color: rgba(39, 38, 38, 0.877);\r\n  border: none;\r\n  padding: 5px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  border-radius: 10%;\r\n  font-size: 18px;\r\n  line-height: 30px;\r\n\tcursor: pointer;\r\n\twidth: 75px;\r\n\theight: 40px;\r\n  color: white;\r\n  font-weight: 400;\r\n\tbox-shadow: 0 0 100px 20px rgba(235, 225, 225, 0.308);\r\n}\r\n.backB:hover{\r\n\tbackground-color: rgb(8, 8, 8);\r\n}\r\n.backBP{\r\n\tz-index: 50;\r\n\tposition: absolute;\r\n\tright : 200px;\r\n\ttop: 150px;\r\n}\r\n.full{\r\n\twidth: 85%;\r\n\tmargin-top: 1%;\r\n\tmargin-left: 5%;\r\n\tmargin-right: 5%;\r\n  display: flex;\r\n\tflex-direction: row;\r\n\tjustify-content: stretch;\r\n flex-wrap: wrap;\r\n}\r\n.rate{\r\n\tdisplay: inline-block;\r\n\twidth: 45px;\r\n\tfont-size: 20px;\r\n\tmargin-top: 0px;\r\n\tmargin-left: 15px;\r\n  color: #fff;\r\n\tpadding: 5px;\r\n\tborder-radius: 50%;\r\n\tborder: 1px solid rgba(255, 255, 255, 0.246);\r\n\ttext-align: center;\r\n\tposition: relative;\r\n\tbottom: 0px;\r\n}\r\n.movies_list{\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n\tjustify-content: space-around;\r\n flex-wrap: wrap;\r\n\tpadding-top: 50px;\r\n}\r\n.movie_card {\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n flex-wrap: wrap;\r\n\twidth: 1200px;\r\n\theight: 600px;\r\n\toverflow: hidden;\r\n\tborder-radius: 10px;\r\n\ttransition: all 0.4s;\r\n\tmargin:2vh;\r\n\tbackground-color: rgb(194, 182, 166);\r\n\t \r\n\r\n}\r\n.movie_card:hover {\r\n\t-webkit-transform: scale(1.02);\r\n\t        transform: scale(1.02);\r\n\ttransition: all 0.4s;\r\n\tbackground-color: rgba(17, 29, 31, 0.062);\r\n}\r\n.card_body{\r\n\tposition: absolute;\r\n\theight: auto;\r\n\twidth: 100%;\r\n\ttop: 25%;\r\n\tpadding-right: 10px;\r\n\tpadding-left: 10px;\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n\tjustify-content: flex-start;\r\n\tmargin-bottom: 10px;\r\n}\r\n.card_footer{\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: auto;\r\n\ttop: 65%;\r\n\tpadding: 5px;\r\n\tdisplay: flex;\r\n\tflex-flow: wrap column;\r\n\talign-items: center;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n.movie_card .info_section {\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tbackground-blend-mode: multiply;\r\n\tz-index: 2;\r\n\tbackground: linear-gradient(to right, #464643 50%, transparent 100%);\r\n  border-radius: 10px;\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\tz-index: 100;\r\n\r\n}\r\n.fade {\r\n\t-webkit-animation: 1s fade;\r\n\tanimation: 1s fade;\r\n}\r\n.fa{\r\n\tmargin-right: 20px !important;\r\n}\r\n.fa-star .star{\r\n\twidth: 50px !important;\r\n\r\n}\r\nh1 {\r\n\tposition: relative;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\twidth: 100%;\r\n\tfont-weight: 800;\r\n\tfont-size: 38px;\r\n\ttext-align: center;\r\n\tcolor: #fff;\r\n\tz-index: 2;\r\n}\r\nh5 {\r\n\tcolor: #d1e1f3;\r\n\tfont-weight: 300;\r\n\tfont-size: 20px;\r\n\tz-index: 2;\r\n\twidth: 100%;\r\n\ttext-align: left;\r\n\tpadding-left: 10%;\r\n\tpadding-right:10%;\r\n\tz-index: 1;\r\n\tletter-spacing: 0.1vw;\r\n\r\n}\r\nh4 {\r\n\tcolor: #7fb8fa;\r\n\tfont-weight: 400;\r\n\tfont-size: 28px;\r\n\tz-index: 2;\r\n\twidth: 100%;\r\n\ttext-align: center;\r\n\tmargin-top: 10px\r\n\r\n}\r\nspan{\r\n\tmargin-top: 7px;\r\n}\r\nh1,h4 span {\r\n\tdisplay: inline-block;\r\n\tposition: relative;\r\n\tpadding: 0.3em 1em;\r\n}\r\nh1,h4 span:before {\r\n\tdisplay: block;\r\n\tcontent: '';\r\n\twidth: 80%;\r\n\tmargin-bottom: 0%;\r\n\tmargin-top: 0%;\r\n\tborder-top: 3px solid rgba(46, 45, 45, 0.527);\r\n\t-webkit-animation: 0.2s draw;\r\n\tanimation: 0.2s draw;\r\n\tbackground: linear-gradient(to right, #464643 25%, transparent 100%);\r\n\tz-index: 0;\r\n}\r\nh1,h4 span:after {\r\n\tdisplay: block;\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\tbottom: 0;\r\n\tright: 0;\r\n\twidth: 100%;\r\n\tborder-bottom: 3px solid rgba(46, 45, 45, 0.527);;\r\n\t-webkit-animation: 0.6s draw-bottom;\r\n\tanimation: 0.6s draw-bottom;\r\n\tbackground: linear-gradient(to right, #070707 25%, transparent 100%);\r\n\tz-index: 0;\r\n}\r\n.delete{\r\ncolor: #ffffff;\r\nfont-weight: 500;\r\nfont-size: 20px;\r\nbox-shadow: 0 0 100px 20px rgba(235, 225, 225, 0.308);\r\n}\r\n.movies_list .movie_card .info_section .card_footer .full .minutes {\r\n\tdisplay: inline-block;\r\n\tfont-size: 20px;\r\n\tmargin-top: 0px;\r\n\tcolor: #fff;\r\n\tpadding: 0px 5px 5px 5px;\r\n\tborder-radius: 10px;\r\n\tborder: 1px solid rgba(255, 255, 255, 0.246);\r\n\ttext-align: center;\r\n\t \r\n\r\n}\r\n.movies_list .movie_card .info_section .card_footer .type {\r\n\tdisplay: inline-block;\r\n\tcolor: #cee4fd;\r\n\tfont-weight: 700;\r\n\tfont-size: 20px;\r\n\r\n}\r\n.movies_list .movie_card .info_section .card_header .locandina {\r\n\tposition: relative;\r\n\tfloat: left;\r\n\tmargin:5% 0 0% 5%;\r\n\theight: 500px;\r\n\twidth: 250px;\r\n\tbox-shadow: 0 0 100px 20px rgba(0, 0, 0, 0.5);\r\n\tborder-radius: 8px;\r\n}\r\n.movie_card .info_section .movie_desc {\r\n\tpadding: 0;\r\n\theight: 50%;\r\n\twidth: 100%;\r\n\tz-index: 10;\r\n}\r\n.movie_card .info_section .movie_desc .text {\r\n\tcolor: #cfd6e1;\r\n\tpadding-top: 10px;\r\n}\r\n.blur_back {\r\n\tposition: absolute;\r\n  top: 0;\r\n\tz-index: -1;\r\n\theight: 100%;\r\n\tright: 0;\r\n\tbackground-size: cover;\r\n\tborder-radius: 35px;\r\n\twidth: 100%;\r\n\tbackground-position-x: -300px;\r\n}\r\n.star {\r\n\tcolor: orange;\r\n  }\r\ninput[type=number]::-webkit-inner-spin-button, \r\ninput[type=number]::-webkit-outer-spin-button { \r\n\t\t-webkit-appearance: none; \r\n\t\tmargin: 0; \r\n\t}\r\n@media screen and (max-width: 600px) {\r\n.movies_list{\r\n\tmin-height: 350px;\t\r\n\tpadding-top: 0;\r\n\r\n} \r\n.movie_card{\r\n\twidth: 90%;\r\n\tmargin: 30px auto;\r\n}\r\n.rate{\r\n\tmargin-bottom: 0;\r\n\tborder-radius: 50%;\r\n\tline-height: 24px;\r\n\tfont-size: 14px !important;\r\n\twidth: 30px;\r\n\tpadding: 1px;\r\n\tfont-weight: 300;\r\n\r\n}\r\nspan{\r\n\tmargin-top: 5px;\r\n}\r\n.card_body{\r\n\tpadding-top: 5px;\r\n}\r\np{\r\n  font-size: 16px !important;\r\n}\r\nh1{\r\n\tfont-size: 24px !important;\r\n}\r\nh4{\r\n\tfont-size: 18px !important;\r\n}\r\nh5{\r\n\tfont-size: 16px !important;\r\n}\r\nspan{\r\n\tfont-size: 16px !important;\r\n\r\n}\r\n.blur_back {\r\n\twidth: 100%;\r\n\tbackground-size: cover;\r\n\tbackground-position: 50% 50% !important;\r\n\t}\r\n.editBP{\r\n\t\tright : 18vw;\t\r\n}\r\n.deleteBP{\r\n\tright : 38vw;\t\r\n}\r\n.backBP{\r\n\tright : 58vw;\t\r\n\r\n}\r\n.backBP{\r\n\twidth: 13vw;\r\nfont-size: 3vw;\r\n\r\n}\r\n.editB{\r\n\twidth: 13vw;\r\n\tfont-size: 3vw;\r\n\r\n\r\n}\r\n.deleteB{\r\n\twidth: 13vw;\r\n\tfont-size: 3vw;\r\n\r\n}\r\n}\r\n.spot {\r\n\tbox-shadow: 0px 0px 500px -45px rgba(247, 245, 244, 0.5);\r\n}\r\n.spot:hover {\r\n\tbox-shadow: 0px 0px 800px -55px rgba(8, 14, 12, 0.925);\r\n}\r\nhtml, body { height: 100%; }\r\nbody { margin: 0; font-family: Roboto, \"Helvetica Neue\", sans-serif; }\r\n@-webkit-keyframes draw {\r\n\t0% {\r\n\t  width: 0%;\r\n\t}\r\n  \r\n\t100% {\r\n\t  width: 90%;\r\n\t}\r\n  }\r\n@keyframes draw {\r\n\t0% {\r\n\t  width: 0%;\r\n\t}\r\n  \r\n\t100% {\r\n\t  width: 90%;\r\n\t}\r\n  }\r\n@-webkit-keyframes draw-bottom {\r\n\t0% {\r\n\t  width: 0%;\r\n\t}\r\n  \r\n\t100% {\r\n\t  width: 100%;\r\n\t}\r\n  }\r\n@keyframes draw-bottom {\r\n\t0% {\r\n\t  width: 0%;\r\n\t}\r\n  \r\n\t100% {\r\n\t  width: 100%;\r\n\t}\r\n  }\r\n@-webkit-keyframes fade {\r\n\t0% {\r\n\t  opacity: 0.5;\r\n\t}\r\n  \r\n\t100% {\r\n\t  opacity: 1;\r\n\t}\r\n  }\r\n@keyframes fade {\r\n\t0% {\r\n\t  opacity: 0.5;\r\n\t}\r\n  \r\n\t100% {\r\n\t  opacity: 1;\r\n\t}\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW92aWVzL21vdmllLWRldGFpbHMvbW92aWUtZGV0YWlscy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0NBQ0MsV0FBVztDQUNYLGtCQUFrQjtDQUNsQixZQUFZO0NBQ1osVUFBVTs7Q0FFVjtBQUNEO0NBQ0MsMkNBQTJDO0VBQzFDLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixpQkFBaUI7Q0FDbEIsZUFBZTtDQUNmLFdBQVc7Q0FDWCxZQUFZO0VBQ1gsWUFBWTtFQUNaLGdCQUFnQjtDQUNqQixxREFBcUQ7O0FBRXREO0FBRUE7RUFDRSwyQ0FBMkM7O0FBRTdDO0FBQ0E7Q0FDQyxXQUFXO0NBQ1gsa0JBQWtCO0NBQ2xCLGFBQWE7Q0FDYixVQUFVOzs7Q0FHVjtBQUNEO0NBQ0MsMENBQTBDO0VBQ3pDLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixpQkFBaUI7Q0FDbEIsZUFBZTtDQUNmLFdBQVc7Q0FDWCxZQUFZO0VBQ1gsWUFBWTtFQUNaLGdCQUFnQjtDQUNqQixxREFBcUQ7O0FBRXREO0FBRUE7RUFDRSwyQ0FBMkM7QUFDN0M7QUFDQTtDQUNDLHlDQUF5QztFQUN4QyxZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsaUJBQWlCO0NBQ2xCLGVBQWU7Q0FDZixXQUFXO0NBQ1gsWUFBWTtFQUNYLFlBQVk7RUFDWixnQkFBZ0I7Q0FDakIscURBQXFEO0FBQ3REO0FBQ0E7Q0FDQyw4QkFBOEI7QUFDL0I7QUFDQTtDQUNDLFdBQVc7Q0FDWCxrQkFBa0I7Q0FDbEIsYUFBYTtDQUNiLFVBQVU7QUFDWDtBQUNBO0NBQ0MsVUFBVTtDQUNWLGNBQWM7Q0FDZCxlQUFlO0NBQ2YsZ0JBQWdCO0VBQ2YsYUFBYTtDQUNkLG1CQUFtQjtDQUNuQix3QkFBd0I7Q0FFdkIsZUFBZTtBQUNqQjtBQUdBO0NBQ0MscUJBQXFCO0NBQ3JCLFdBQVc7Q0FDWCxlQUFlO0NBQ2YsZUFBZTtDQUNmLGlCQUFpQjtFQUNoQixXQUFXO0NBQ1osWUFBWTtDQUNaLGtCQUFrQjtDQUNsQiw0Q0FBNEM7Q0FDNUMsa0JBQWtCO0NBQ2xCLGtCQUFrQjtDQUNsQixXQUFXO0FBQ1o7QUFFQTtDQUNDLGFBQWE7Q0FDYixtQkFBbUI7Q0FDbkIsNkJBQTZCO0NBRTVCLGVBQWU7Q0FDaEIsaUJBQWlCO0FBQ2xCO0FBQ0M7Q0FDQSxrQkFBa0I7Q0FDbEIsYUFBYTtDQUVaLGVBQWU7Q0FDaEIsYUFBYTtDQUNiLGFBQWE7Q0FDYixnQkFBZ0I7Q0FDaEIsbUJBQW1CO0NBQ25CLG9CQUFvQjtDQUNwQixVQUFVO0NBQ1Ysb0NBQW9DOzs7QUFHckM7QUFDQztDQUNBLDhCQUFzQjtTQUF0QixzQkFBc0I7Q0FDdEIsb0JBQW9CO0NBQ3BCLHlDQUF5QztBQUMxQztBQUdBO0NBQ0Msa0JBQWtCO0NBQ2xCLFlBQVk7Q0FDWixXQUFXO0NBQ1gsUUFBUTtDQUNSLG1CQUFtQjtDQUNuQixrQkFBa0I7Q0FDbEIsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQiwyQkFBMkI7Q0FDM0IsbUJBQW1CO0FBQ3BCO0FBQ0E7Q0FDQyxrQkFBa0I7Q0FDbEIsV0FBVztDQUNYLFlBQVk7Q0FDWixRQUFRO0NBQ1IsWUFBWTtDQUNaLGFBQWE7Q0FDYixzQkFBc0I7Q0FDdEIsbUJBQW1CO0NBQ25CLHVCQUF1QjtBQUN4QjtBQUVBO0NBQ0Msa0JBQWtCO0NBQ2xCLFdBQVc7Q0FDWCxZQUFZO0NBQ1osK0JBQStCO0NBQy9CLFVBQVU7Q0FDVixvRUFBb0U7RUFDbkUsbUJBQW1CO0NBQ3BCLGFBQWE7Q0FFYixlQUFlO0NBQ2YsWUFBWTs7QUFFYjtBQUNBO0NBQ0MsMEJBQTBCO0NBQzFCLGtCQUFrQjtBQUNuQjtBQUNBO0NBQ0MsNkJBQTZCO0FBQzlCO0FBQ0E7Q0FDQyxzQkFBc0I7O0FBRXZCO0FBQ0E7Q0FDQyxrQkFBa0I7Q0FDbEIsTUFBTTtDQUNOLE9BQU87Q0FDUCxXQUFXO0NBQ1gsZ0JBQWdCO0NBQ2hCLGVBQWU7Q0FDZixrQkFBa0I7Q0FDbEIsV0FBVztDQUNYLFVBQVU7QUFDWDtBQUNBO0NBQ0MsY0FBYztDQUNkLGdCQUFnQjtDQUNoQixlQUFlO0NBQ2YsVUFBVTtDQUNWLFdBQVc7Q0FDWCxnQkFBZ0I7Q0FDaEIsaUJBQWlCO0NBQ2pCLGlCQUFpQjtDQUNqQixVQUFVO0NBQ1YscUJBQXFCOztBQUV0QjtBQUNBO0NBQ0MsY0FBYztDQUNkLGdCQUFnQjtDQUNoQixlQUFlO0NBQ2YsVUFBVTtDQUNWLFdBQVc7Q0FDWCxrQkFBa0I7Q0FDbEI7O0FBRUQ7QUFDQTtDQUNDLGVBQWU7QUFDaEI7QUFDQTtDQUNDLHFCQUFxQjtDQUNyQixrQkFBa0I7Q0FDbEIsa0JBQWtCO0FBQ25CO0FBQ0E7Q0FDQyxjQUFjO0NBQ2QsV0FBVztDQUNYLFVBQVU7Q0FDVixpQkFBaUI7Q0FDakIsY0FBYztDQUNkLDZDQUE2QztDQUM3Qyw0QkFBNEI7Q0FDNUIsb0JBQW9CO0NBQ3BCLG9FQUFvRTtDQUNwRSxVQUFVO0FBQ1g7QUFDQTtDQUNDLGNBQWM7Q0FDZCxXQUFXO0NBQ1gsa0JBQWtCO0NBQ2xCLFNBQVM7Q0FDVCxRQUFRO0NBQ1IsV0FBVztDQUNYLGdEQUFnRDtDQUNoRCxtQ0FBbUM7Q0FDbkMsMkJBQTJCO0NBQzNCLG9FQUFvRTtDQUNwRSxVQUFVO0FBQ1g7QUFFQTtBQUNBLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIsZUFBZTtBQUNmLHFEQUFxRDtBQUNyRDtBQUNDO0NBQ0EscUJBQXFCO0NBQ3JCLGVBQWU7Q0FDZixlQUFlO0NBQ2YsV0FBVztDQUNYLHdCQUF3QjtDQUN4QixtQkFBbUI7Q0FDbkIsNENBQTRDO0NBQzVDLGtCQUFrQjs7O0FBR25CO0FBQ0M7Q0FDQSxxQkFBcUI7Q0FDckIsY0FBYztDQUNkLGdCQUFnQjtDQUNoQixlQUFlOztBQUVoQjtBQUNDO0NBQ0Esa0JBQWtCO0NBQ2xCLFdBQVc7Q0FDWCxpQkFBaUI7Q0FDakIsYUFBYTtDQUNiLFlBQVk7Q0FDWiw2Q0FBNkM7Q0FDN0Msa0JBQWtCO0FBQ25CO0FBQ0M7Q0FDQSxVQUFVO0NBQ1YsV0FBVztDQUNYLFdBQVc7Q0FDWCxXQUFXO0FBQ1o7QUFDQztDQUNBLGNBQWM7Q0FDZCxpQkFBaUI7QUFDbEI7QUFFQTtDQUNDLGtCQUFrQjtFQUNqQixNQUFNO0NBQ1AsV0FBVztDQUNYLFlBQVk7Q0FDWixRQUFRO0NBQ1Isc0JBQXNCO0NBQ3RCLG1CQUFtQjtDQUNuQixXQUFXO0NBQ1gsNkJBQTZCO0FBQzlCO0FBRUE7Q0FDQyxhQUFhO0VBQ1o7QUFFRjs7RUFFRSx3QkFBd0I7RUFDeEIsU0FBUztDQUNWO0FBQ0E7QUFDRDtDQUNDLGlCQUFpQjtDQUNqQixjQUFjOztBQUVmO0FBQ0E7Q0FDQyxVQUFVO0NBQ1YsaUJBQWlCO0FBQ2xCO0FBQ0E7Q0FDQyxnQkFBZ0I7Q0FDaEIsa0JBQWtCO0NBQ2xCLGlCQUFpQjtDQUNqQiwwQkFBMEI7Q0FDMUIsV0FBVztDQUNYLFlBQVk7Q0FDWixnQkFBZ0I7O0FBRWpCO0FBQ0E7Q0FDQyxlQUFlO0FBQ2hCO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtFQUNFLDBCQUEwQjtBQUM1QjtBQUNBO0NBQ0MsMEJBQTBCO0FBQzNCO0FBQ0E7Q0FDQywwQkFBMEI7QUFDM0I7QUFDQTtDQUNDLDBCQUEwQjtBQUMzQjtBQUNBO0NBQ0MsMEJBQTBCOztBQUUzQjtBQUNBO0NBQ0MsV0FBVztDQUNYLHNCQUFzQjtDQUN0Qix1Q0FBdUM7Q0FDdkM7QUFDRDtFQUNFLFlBQVk7QUFDZDtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7Q0FDQyxZQUFZOztBQUViO0FBQ0E7Q0FDQyxXQUFXO0FBQ1osY0FBYzs7QUFFZDtBQUNBO0NBQ0MsV0FBVztDQUNYLGNBQWM7OztBQUdmO0FBQ0E7Q0FDQyxXQUFXO0NBQ1gsY0FBYzs7QUFFZjtBQUNBO0FBRUE7Q0FDQyx3REFBd0Q7QUFDekQ7QUFDQTtDQUNDLHNEQUFzRDtBQUN2RDtBQUdBLGFBQWEsWUFBWSxFQUFFO0FBQzNCLE9BQU8sU0FBUyxFQUFFLGlEQUFpRCxFQUFFO0FBR3JFO0NBQ0M7R0FDRSxTQUFTO0NBQ1g7O0NBRUE7R0FDRSxVQUFVO0NBQ1o7RUFDQztBQVJGO0NBQ0M7R0FDRSxTQUFTO0NBQ1g7O0NBRUE7R0FDRSxVQUFVO0NBQ1o7RUFDQztBQUdBO0NBQ0Q7R0FDRSxTQUFTO0NBQ1g7O0NBRUE7R0FDRSxXQUFXO0NBQ2I7RUFDQztBQVJBO0NBQ0Q7R0FDRSxTQUFTO0NBQ1g7O0NBRUE7R0FDRSxXQUFXO0NBQ2I7RUFDQztBQUdBO0NBQ0Q7R0FDRSxZQUFZO0NBQ2Q7O0NBRUE7R0FDRSxVQUFVO0NBQ1o7RUFDQztBQVJBO0NBQ0Q7R0FDRSxZQUFZO0NBQ2Q7O0NBRUE7R0FDRSxVQUFVO0NBQ1o7RUFDQyIsImZpbGUiOiJzcmMvYXBwL21vdmllcy9tb3ZpZS1kZXRhaWxzL21vdmllLWRldGFpbHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lZGl0QlB7XHJcblx0ei1pbmRleDogNTA7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdHJpZ2h0IDogMjBweDtcclxuXHR0b3A6IDE1MHB4O1xyXG5cclxuXHR9XHJcbi5lZGl0QntcclxuXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwNywgMTIzLCA2NywgMC45NTkpO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBwYWRkaW5nOiA1cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgYm9yZGVyLXJhZGl1czogMTAlO1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBsaW5lLWhlaWdodDogMzBweDtcclxuXHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0d2lkdGg6IDc1cHg7XHJcblx0aGVpZ2h0OiA0MHB4O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG5cdGJveC1zaGFkb3c6IDAgMCAxMDBweCAyMHB4IHJnYmEoMjM1LCAyMjUsIDIyNSwgMC4zMDgpO1xyXG5cclxufVxyXG5cclxuLmVkaXRCOmhvdmVye1xyXG4gIGJhY2tncm91bmQtY29sb3I6IFx0cmdiYSgyNTUsIDEwOCwgOSwgMC44NzcpO1xyXG5cclxufVxyXG4uZGVsZXRlQlB7XHJcblx0ei1pbmRleDogNTA7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdHJpZ2h0IDogMTEwcHg7XHJcblx0dG9wOiAxNTBweDtcclxuXHRcclxuXHJcblx0fVxyXG4uZGVsZXRlQntcclxuXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE5NCwgMzAsIDE4LCAwLjYyMyk7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBib3JkZXItcmFkaXVzOiAxMCU7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xyXG5cdGN1cnNvcjogcG9pbnRlcjtcclxuXHR3aWR0aDogNzVweDtcclxuXHRoZWlnaHQ6IDQwcHg7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcblx0Ym94LXNoYWRvdzogMCAwIDEwMHB4IDIwcHggcmdiYSgyMzUsIDIyNSwgMjI1LCAwLjMwOCk7XHJcblxyXG59XHJcblxyXG4uZGVsZXRlQjpob3ZlcntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBcdHJnYmEoMTk0LCAzMCwgMTgsIDAuOTQ1KTtcclxufVxyXG4uYmFja0J7XHJcblx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgzOSwgMzgsIDM4LCAwLjg3Nyk7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBib3JkZXItcmFkaXVzOiAxMCU7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xyXG5cdGN1cnNvcjogcG9pbnRlcjtcclxuXHR3aWR0aDogNzVweDtcclxuXHRoZWlnaHQ6IDQwcHg7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcblx0Ym94LXNoYWRvdzogMCAwIDEwMHB4IDIwcHggcmdiYSgyMzUsIDIyNSwgMjI1LCAwLjMwOCk7XHJcbn1cclxuLmJhY2tCOmhvdmVye1xyXG5cdGJhY2tncm91bmQtY29sb3I6IHJnYig4LCA4LCA4KTtcclxufVxyXG4uYmFja0JQe1xyXG5cdHotaW5kZXg6IDUwO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRyaWdodCA6IDIwMHB4O1xyXG5cdHRvcDogMTUwcHg7XHJcbn1cclxuLmZ1bGx7XHJcblx0d2lkdGg6IDg1JTtcclxuXHRtYXJnaW4tdG9wOiAxJTtcclxuXHRtYXJnaW4tbGVmdDogNSU7XHJcblx0bWFyZ2luLXJpZ2h0OiA1JTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0anVzdGlmeS1jb250ZW50OiBzdHJldGNoO1xyXG5cdC13ZWJraXQtZmxleC13cmFwOiB3cmFwO1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG5cclxuXHJcbi5yYXRle1xyXG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuXHR3aWR0aDogNDVweDtcclxuXHRmb250LXNpemU6IDIwcHg7XHJcblx0bWFyZ2luLXRvcDogMHB4O1xyXG5cdG1hcmdpbi1sZWZ0OiAxNXB4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG5cdHBhZGRpbmc6IDVweDtcclxuXHRib3JkZXItcmFkaXVzOiA1MCU7XHJcblx0Ym9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI0Nik7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRib3R0b206IDBweDtcclxufVxyXG5cclxuLm1vdmllc19saXN0e1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IHJvdztcclxuXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuXHQtd2Via2l0LWZsZXgtd3JhcDogd3JhcDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcblx0cGFkZGluZy10b3A6IDUwcHg7XHJcbn1cclxuIC5tb3ZpZV9jYXJkIHtcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHQtd2Via2l0LWZsZXgtd3JhcDogd3JhcDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcblx0d2lkdGg6IDEyMDBweDtcclxuXHRoZWlnaHQ6IDYwMHB4O1xyXG5cdG92ZXJmbG93OiBoaWRkZW47XHJcblx0Ym9yZGVyLXJhZGl1czogMTBweDtcclxuXHR0cmFuc2l0aW9uOiBhbGwgMC40cztcclxuXHRtYXJnaW46MnZoO1xyXG5cdGJhY2tncm91bmQtY29sb3I6IHJnYigxOTQsIDE4MiwgMTY2KTtcclxuXHQgXHJcblxyXG59XHJcbiAubW92aWVfY2FyZDpob3ZlciB7XHJcblx0dHJhbnNmb3JtOiBzY2FsZSgxLjAyKTtcclxuXHR0cmFuc2l0aW9uOiBhbGwgMC40cztcclxuXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE3LCAyOSwgMzEsIDAuMDYyKTtcclxufVxyXG5cclxuXHJcbi5jYXJkX2JvZHl7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdGhlaWdodDogYXV0bztcclxuXHR3aWR0aDogMTAwJTtcclxuXHR0b3A6IDI1JTtcclxuXHRwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG5cdHBhZGRpbmctbGVmdDogMTBweDtcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0anVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG5cdG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuLmNhcmRfZm9vdGVye1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHR3aWR0aDogMTAwJTtcclxuXHRoZWlnaHQ6IGF1dG87XHJcblx0dG9wOiA2NSU7XHJcblx0cGFkZGluZzogNXB4O1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1mbG93OiB3cmFwIGNvbHVtbjtcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdG1hcmdpbjogMHB4IDBweCAwcHggMHB4O1xyXG59XHJcblxyXG4ubW92aWVfY2FyZCAuaW5mb19zZWN0aW9uIHtcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0d2lkdGg6IDEwMCU7XHJcblx0aGVpZ2h0OiAxMDAlO1xyXG5cdGJhY2tncm91bmQtYmxlbmQtbW9kZTogbXVsdGlwbHk7XHJcblx0ei1pbmRleDogMjtcclxuXHRiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICM0NjQ2NDMgNTAlLCB0cmFuc3BhcmVudCAxMDAlKTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0LXdlYmtpdC1mbGV4LXdyYXA6IHdyYXA7XHJcblx0ZmxleC13cmFwOiB3cmFwO1xyXG5cdHotaW5kZXg6IDEwMDtcclxuXHJcbn1cclxuLmZhZGUge1xyXG5cdC13ZWJraXQtYW5pbWF0aW9uOiAxcyBmYWRlO1xyXG5cdGFuaW1hdGlvbjogMXMgZmFkZTtcclxufVxyXG4uZmF7XHJcblx0bWFyZ2luLXJpZ2h0OiAyMHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLmZhLXN0YXIgLnN0YXJ7XHJcblx0d2lkdGg6IDUwcHggIWltcG9ydGFudDtcclxuXHJcbn1cclxuaDEge1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHR0b3A6IDA7XHJcblx0bGVmdDogMDtcclxuXHR3aWR0aDogMTAwJTtcclxuXHRmb250LXdlaWdodDogODAwO1xyXG5cdGZvbnQtc2l6ZTogMzhweDtcclxuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0Y29sb3I6ICNmZmY7XHJcblx0ei1pbmRleDogMjtcclxufVxyXG5oNSB7XHJcblx0Y29sb3I6ICNkMWUxZjM7XHJcblx0Zm9udC13ZWlnaHQ6IDMwMDtcclxuXHRmb250LXNpemU6IDIwcHg7XHJcblx0ei1pbmRleDogMjtcclxuXHR3aWR0aDogMTAwJTtcclxuXHR0ZXh0LWFsaWduOiBsZWZ0O1xyXG5cdHBhZGRpbmctbGVmdDogMTAlO1xyXG5cdHBhZGRpbmctcmlnaHQ6MTAlO1xyXG5cdHotaW5kZXg6IDE7XHJcblx0bGV0dGVyLXNwYWNpbmc6IDAuMXZ3O1xyXG5cclxufVxyXG5oNCB7XHJcblx0Y29sb3I6ICM3ZmI4ZmE7XHJcblx0Zm9udC13ZWlnaHQ6IDQwMDtcclxuXHRmb250LXNpemU6IDI4cHg7XHJcblx0ei1pbmRleDogMjtcclxuXHR3aWR0aDogMTAwJTtcclxuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0bWFyZ2luLXRvcDogMTBweFxyXG5cclxufVxyXG5zcGFue1xyXG5cdG1hcmdpbi10b3A6IDdweDtcclxufVxyXG5oMSxoNCBzcGFuIHtcclxuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcblx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdHBhZGRpbmc6IDAuM2VtIDFlbTtcclxufVxyXG5oMSxoNCBzcGFuOmJlZm9yZSB7XHJcblx0ZGlzcGxheTogYmxvY2s7XHJcblx0Y29udGVudDogJyc7XHJcblx0d2lkdGg6IDgwJTtcclxuXHRtYXJnaW4tYm90dG9tOiAwJTtcclxuXHRtYXJnaW4tdG9wOiAwJTtcclxuXHRib3JkZXItdG9wOiAzcHggc29saWQgcmdiYSg0NiwgNDUsIDQ1LCAwLjUyNyk7XHJcblx0LXdlYmtpdC1hbmltYXRpb246IDAuMnMgZHJhdztcclxuXHRhbmltYXRpb246IDAuMnMgZHJhdztcclxuXHRiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICM0NjQ2NDMgMjUlLCB0cmFuc3BhcmVudCAxMDAlKTtcclxuXHR6LWluZGV4OiAwO1xyXG59XHJcbmgxLGg0IHNwYW46YWZ0ZXIge1xyXG5cdGRpc3BsYXk6IGJsb2NrO1xyXG5cdGNvbnRlbnQ6ICcnO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRib3R0b206IDA7XHJcblx0cmlnaHQ6IDA7XHJcblx0d2lkdGg6IDEwMCU7XHJcblx0Ym9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIHJnYmEoNDYsIDQ1LCA0NSwgMC41MjcpOztcclxuXHQtd2Via2l0LWFuaW1hdGlvbjogMC42cyBkcmF3LWJvdHRvbTtcclxuXHRhbmltYXRpb246IDAuNnMgZHJhdy1ib3R0b207XHJcblx0YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjMDcwNzA3IDI1JSwgdHJhbnNwYXJlbnQgMTAwJSk7XHJcblx0ei1pbmRleDogMDtcclxufVxyXG5cclxuLmRlbGV0ZXtcclxuY29sb3I6ICNmZmZmZmY7XHJcbmZvbnQtd2VpZ2h0OiA1MDA7XHJcbmZvbnQtc2l6ZTogMjBweDtcclxuYm94LXNoYWRvdzogMCAwIDEwMHB4IDIwcHggcmdiYSgyMzUsIDIyNSwgMjI1LCAwLjMwOCk7XHJcbn1cclxuIC5tb3ZpZXNfbGlzdCAubW92aWVfY2FyZCAuaW5mb19zZWN0aW9uIC5jYXJkX2Zvb3RlciAuZnVsbCAubWludXRlcyB7XHJcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG5cdGZvbnQtc2l6ZTogMjBweDtcclxuXHRtYXJnaW4tdG9wOiAwcHg7XHJcblx0Y29sb3I6ICNmZmY7XHJcblx0cGFkZGluZzogMHB4IDVweCA1cHggNXB4O1xyXG5cdGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcblx0Ym9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI0Nik7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdCBcclxuXHJcbn1cclxuIC5tb3ZpZXNfbGlzdCAubW92aWVfY2FyZCAuaW5mb19zZWN0aW9uIC5jYXJkX2Zvb3RlciAudHlwZSB7XHJcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG5cdGNvbG9yOiAjY2VlNGZkO1xyXG5cdGZvbnQtd2VpZ2h0OiA3MDA7XHJcblx0Zm9udC1zaXplOiAyMHB4O1xyXG5cclxufVxyXG4gLm1vdmllc19saXN0IC5tb3ZpZV9jYXJkIC5pbmZvX3NlY3Rpb24gLmNhcmRfaGVhZGVyIC5sb2NhbmRpbmEge1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRmbG9hdDogbGVmdDtcclxuXHRtYXJnaW46NSUgMCAwJSA1JTtcclxuXHRoZWlnaHQ6IDUwMHB4O1xyXG5cdHdpZHRoOiAyNTBweDtcclxuXHRib3gtc2hhZG93OiAwIDAgMTAwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcblx0Ym9yZGVyLXJhZGl1czogOHB4O1xyXG59XHJcbiAubW92aWVfY2FyZCAuaW5mb19zZWN0aW9uIC5tb3ZpZV9kZXNjIHtcclxuXHRwYWRkaW5nOiAwO1xyXG5cdGhlaWdodDogNTAlO1xyXG5cdHdpZHRoOiAxMDAlO1xyXG5cdHotaW5kZXg6IDEwO1xyXG59XHJcbiAubW92aWVfY2FyZCAuaW5mb19zZWN0aW9uIC5tb3ZpZV9kZXNjIC50ZXh0IHtcclxuXHRjb2xvcjogI2NmZDZlMTtcclxuXHRwYWRkaW5nLXRvcDogMTBweDtcclxufVxyXG5cclxuLmJsdXJfYmFjayB7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuXHR6LWluZGV4OiAtMTtcclxuXHRoZWlnaHQ6IDEwMCU7XHJcblx0cmlnaHQ6IDA7XHJcblx0YmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuXHRib3JkZXItcmFkaXVzOiAzNXB4O1xyXG5cdHdpZHRoOiAxMDAlO1xyXG5cdGJhY2tncm91bmQtcG9zaXRpb24teDogLTMwMHB4O1xyXG59XHJcbiBcclxuLnN0YXIge1xyXG5cdGNvbG9yOiBvcmFuZ2U7XHJcbiAgfVxyXG4gIFxyXG5pbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sIFxyXG5pbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24geyBcclxuXHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsgXHJcblx0XHRtYXJnaW46IDA7IFxyXG5cdH0gXHJcbiBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xyXG4ubW92aWVzX2xpc3R7XHJcblx0bWluLWhlaWdodDogMzUwcHg7XHRcclxuXHRwYWRkaW5nLXRvcDogMDtcclxuXHJcbn0gXHJcbi5tb3ZpZV9jYXJke1xyXG5cdHdpZHRoOiA5MCU7XHJcblx0bWFyZ2luOiAzMHB4IGF1dG87XHJcbn1cclxuLnJhdGV7XHJcblx0bWFyZ2luLWJvdHRvbTogMDtcclxuXHRib3JkZXItcmFkaXVzOiA1MCU7XHJcblx0bGluZS1oZWlnaHQ6IDI0cHg7XHJcblx0Zm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7XHJcblx0d2lkdGg6IDMwcHg7XHJcblx0cGFkZGluZzogMXB4O1xyXG5cdGZvbnQtd2VpZ2h0OiAzMDA7XHJcblxyXG59XHJcbnNwYW57XHJcblx0bWFyZ2luLXRvcDogNXB4O1xyXG59XHJcbi5jYXJkX2JvZHl7XHJcblx0cGFkZGluZy10b3A6IDVweDtcclxufVxyXG5we1xyXG4gIGZvbnQtc2l6ZTogMTZweCAhaW1wb3J0YW50O1xyXG59XHJcbmgxe1xyXG5cdGZvbnQtc2l6ZTogMjRweCAhaW1wb3J0YW50O1xyXG59XHJcbmg0e1xyXG5cdGZvbnQtc2l6ZTogMThweCAhaW1wb3J0YW50O1xyXG59XHJcbmg1e1xyXG5cdGZvbnQtc2l6ZTogMTZweCAhaW1wb3J0YW50O1xyXG59XHJcbnNwYW57XHJcblx0Zm9udC1zaXplOiAxNnB4ICFpbXBvcnRhbnQ7XHJcblxyXG59XHJcbi5ibHVyX2JhY2sge1xyXG5cdHdpZHRoOiAxMDAlO1xyXG5cdGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcblx0YmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDUwJSAhaW1wb3J0YW50O1xyXG5cdH1cclxuLmVkaXRCUHtcclxuXHRcdHJpZ2h0IDogMTh2dztcdFxyXG59XHJcbi5kZWxldGVCUHtcclxuXHRyaWdodCA6IDM4dnc7XHRcclxufVxyXG4uYmFja0JQe1xyXG5cdHJpZ2h0IDogNTh2dztcdFxyXG5cclxufVxyXG4uYmFja0JQe1xyXG5cdHdpZHRoOiAxM3Z3O1xyXG5mb250LXNpemU6IDN2dztcclxuXHJcbn1cclxuLmVkaXRCe1xyXG5cdHdpZHRoOiAxM3Z3O1xyXG5cdGZvbnQtc2l6ZTogM3Z3O1xyXG5cclxuXHJcbn1cclxuLmRlbGV0ZUJ7XHJcblx0d2lkdGg6IDEzdnc7XHJcblx0Zm9udC1zaXplOiAzdnc7XHJcblxyXG59XHJcbn1cclxuXHJcbi5zcG90IHtcclxuXHRib3gtc2hhZG93OiAwcHggMHB4IDUwMHB4IC00NXB4IHJnYmEoMjQ3LCAyNDUsIDI0NCwgMC41KTtcclxufVxyXG4uc3BvdDpob3ZlciB7XHJcblx0Ym94LXNoYWRvdzogMHB4IDBweCA4MDBweCAtNTVweCByZ2JhKDgsIDE0LCAxMiwgMC45MjUpO1xyXG59XHJcblxyXG4gXHJcbmh0bWwsIGJvZHkgeyBoZWlnaHQ6IDEwMCU7IH1cclxuYm9keSB7IG1hcmdpbjogMDsgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmOyB9XHJcblxyXG5cclxuQGtleWZyYW1lcyBkcmF3IHtcclxuXHQwJSB7XHJcblx0ICB3aWR0aDogMCU7XHJcblx0fVxyXG4gIFxyXG5cdDEwMCUge1xyXG5cdCAgd2lkdGg6IDkwJTtcclxuXHR9XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIEBrZXlmcmFtZXMgZHJhdy1ib3R0b20ge1xyXG5cdDAlIHtcclxuXHQgIHdpZHRoOiAwJTtcclxuXHR9XHJcbiAgXHJcblx0MTAwJSB7XHJcblx0ICB3aWR0aDogMTAwJTtcclxuXHR9XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIEBrZXlmcmFtZXMgZmFkZSB7XHJcblx0MCUge1xyXG5cdCAgb3BhY2l0eTogMC41O1xyXG5cdH1cclxuICBcclxuXHQxMDAlIHtcclxuXHQgIG9wYWNpdHk6IDE7XHJcblx0fVxyXG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/movies/movie-details/movie-details.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/movies/movie-details/movie-details.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\n<div class=\"movies_list\">\n  <div class=\"movie_card spot\">\n\n    <div class=\"info_section\" (doubleClick)=\"backClicked()\">\n      <div class=\"card_header\">\n\n        <div class=\"full\">\n          <span>\n            <h1>{{ movieDetails.title}} <h4>Directed by, {{movieDetails.directorName}}</h4>\n            </h1>\n          </span>\n        </div>\n      </div>\n      <div class=\"card_body\">\n        <h5>{{movieDetails.overview}}</h5> <span>\n        </span>\n      </div>\n\n\n      <div class=\"card_footer\">\n        <div class=\"full\">\n          <span class=\"fa fa-star star fa-2x\" *ngFor='let i of counter(movieDetails.vote_average)'></span>\n          <span class=\"fa fa-star fa-2x\" *ngFor='let i of restCounter(movieDetails.vote_average)'></span>\n          <span class=\"rate\" *ngIf='movieDetails.vote_average>7'\n            [ngStyle]=\"{'background-color': 'rgba(35, 196, 70, 0.534)'}\">\n            {{ movieDetails.vote_average }}</span>\n          <span class=\"rate\" *ngIf='movieDetails.vote_average<7'\n            [ngStyle]=\"{'background-color': 'rgba(235, 136, 23, 0.534)'}\">\n            {{ movieDetails.vote_average }}</span>\n\n        </div>\n        <div class=\"full\">\n          <span class=\"minutes\">{{ movieDetails.runtime }} Min</span>\n\n        </div>\n        <p class=\"type full\">\n          <span *ngFor='let genresList of movieDetails.genres; let lst = last;'> {{genresList.name}} <span\n              *ngIf='lst == false'> | </span> </span> </p>\n        <div class=\"flex-container\">\n          <div class=\"editBP editB\" (click)=\"openEditM(content)\">Edit</div>\n          <div class=\"deleteBP deleteB\" (click)=\"openDeleteM(delete)\">Delete</div>\n          <div class=\"backB backBP\" (click)=\"backClicked()\">Back</div>\n        </div>\n\n      </div>\n\n      <div class=\"blur_back \" *ngIf='movieDetails.backdrop_path'\n        [ngStyle]=\"{'background-image': 'url('+'https://image.tmdb.org/t/p/original'+movieDetails.backdrop_path+')'}\">\n      </div>\n      <div class=\"blur_back \" *ngIf='!movieDetails.backdrop_path' src=\"../../../assets/img/no_poster_available.jpg\"\n        alt=\"No poster available\">\n      </div>\n    </div>\n    <ng-template #content let-modal>\n      <div class=\"modal-header grad\" [ngStyle]=\"{'background-image': 'url('+'https://image.tmdb.org/t/p/original'+movieDetails.backdrop_path+')',\n      'background-size': 'cover','box-shadow': '0 0 100px 20px rgba(129, 127, 127, 0.863)'}\">\n      </div>\n      <div class=\"modal-body\"\n        style=\"background-color: rgb(255, 255, 255);box-shadow: 0 0 100px 20px rgba(129, 127, 127, 0.863);\">\n        <div class=\"jumbotron\" style=\"background-color: rgb(255, 255, 255);\">\n          <div class=\"container\">\n            <div class=\"row\">\n              <div class=\"col-md-8 offset-md-3\">\n                <h3>{{movieDetails.title}}</h3>\n\n                <div class=\"form-group\">\n                  <label><strong>FILM ID : </strong>{{movieDetails.id}}</label>\n                </div>\n                <form #f=\"ngForm\" [formGroup]=\"editForm\">\n                  <div class=\"form-group\">\n                    <label><strong>Film Name</strong></label>\n                    <input type=\"text\" class=\"form-control\" formControlName=\"filmName\" #filmName\n                      [(ngModel)]=\"movieDetails.title\" />\n                  </div>\n                  <div\n                    *ngIf=\"editForm.controls['filmName'].invalid && (editForm.controls['filmName'].dirty || editForm.controls['filmName'].touched)\"\n                    class=\"alert alert-danger\">\n                    <div *ngIf=\"isExistName||editForm.controls['filmName'].errors.required\">\n                      Uniqe film name is required.\n                    </div>\n                    <div *ngIf=\"editForm.controls['filmName'].errors.pattern\">\n                        Please input alphabet characters only.\n                      </div>\n                  </div>\n                  <div class=\"form-group\">\n                    <label><strong>Release Year </strong></label>\n                    <input type=\"number\" class=\"form-control\" formControlName=\"year\" #year\n                      [(ngModel)]=\"movieDetails.release_date\" />\n                  </div>\n                  <div\n                    *ngIf=\"(editForm.controls['year'].value < 1000||editForm.controls['year'].value>2020) ||\n                     editForm.controls['year'].invalid && (editForm.controls['year'].dirty || editForm.controls['year'].touched)\"\n                    class=\"alert alert-danger\">\n                    Release dates is required [1000-2020]\n                  </div>\n                  <div class=\"form-group\">\n                    <label><strong>Film RunTime</strong></label>\n                    <input type=\"number\" class=\"form-control\" formControlName=\"runTime\" #runTime\n                      [(ngModel)]=\"movieDetails.runtime\" />\n                  </div>\n                  <div\n                    *ngIf=\"editForm.controls['runTime'].errors.required||movieDetails.runtime<1||movieDetails.runtime>999\"\n                    class=\"alert alert-danger\">\n                    Film RunTime name is required [1-999].\n                  </div>\n                  <div class=\"form-group\">\n                    <label><strong>Film Director</strong></label>\n                    <input type=\"text\" class=\"form-control\" formControlName=\"director\" #director\n                      [(ngModel)]=\"movieDetails.directorName\" />\n                  </div>\n                  <div\n                    *ngIf=\"editForm.controls['director'].invalid && (editForm.controls['filmName'].dirty || editForm.controls['filmName'].touched)\"\n                    class=\"alert alert-danger\">\n                    <div *ngIf=\"editForm.controls['director'].errors.required\">\n                      Director name is required.\n                    </div>\n                  </div>\n                </form>\n                <div>\n                  <label><strong>GENRES : </strong></label>\n                  <ng-multiselect-dropdown [data]=\"dropdownList\" [(ngModel)]=\"selectedItems\"\n                    [settings]=\"dropdownSettings\" (onSelect)=\"onItemSelect($event)\" (onSelectAll)=\"onSelectAll($event)\"\n                    (onDeSelectAll)=\"onDeSelectAll($event)\" (onDeSelect)=\"onItemDeSelect($event)\">\n                  </ng-multiselect-dropdown>\n                  <div *ngIf=\"movieDetails.genres.length < 1\" class=\"alert alert-danger\">\n                    Pick at least on genre.\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\"\n        style=\"background-color: rgb(184, 190, 188);box-shadow: 0 0 100px 20px rgba(129, 127, 127, 0.863);\">\n        <button type=\"submit\" class=\"btn btn-primary\" *ngIf=\"validate(movieDetails.title);\"\n          (click)=\"save();modal.close('Save click')\">Save</button>\n        <button type=\"button\" class=\"btn btn-light\"\n          (click)=\"cancel(movieDetails.id);modal.close('Cancel click')\">Cancel</button>\n      </div>\n    </ng-template>\n    <ng-template #delete let-modal>\n      <div class=\"modal-header delete\" [ngStyle]=\"{'background-image': 'url('+'https://image.tmdb.org/t/p/original'+movieDetails.backdrop_path+')',\n        'background-size': 'cover','box-shadow': '0 0 100px 20px rgba(129, 127, 127, 0.863)'}\">\n        Warning\n      </div>\n      <div class=\"modal-body\"\n        style=\"background-color: rgb(255, 255, 255);box-shadow: 0 0 100px 20px rgba(129, 127, 127, 0.863);\">\n        <p>Are you sure you want to delete film - <strong>{{movieDetails.title}}</strong> ?</p>\n        <p>All information associated to this film will be permanently deleted. This operation can not be\n          undone.</p>\n      </div>\n      <div class=\"modal-footer\"\n        style=\"background-color: rgb(184, 190, 188);box-shadow: 0 0 100px 20px rgba(129, 127, 127, 0.863);\">\n        <button type=\"button\" class=\"btn btn-danger\"\n          (click)=\"modal.close('Delete click');deleteM();backClicked()\">Delete</button>\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\n      </div>\n    </ng-template>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/movies/movie-details/movie-details.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/movies/movie-details/movie-details.component.ts ***!
  \*****************************************************************/
/*! exports provided: MovieDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovieDetailsComponent", function() { return MovieDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/modal.service */ "./src/app/services/modal.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var MovieDetailsComponent = /** @class */ (function () {
    function MovieDetailsComponent(modalDService, formBuilder, modalService, _location, modalConfig, rt) {
        this.modalDService = modalDService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this._location = _location;
        this.rt = rt;
        this.genreList = new Array;
        this.submitted = false;
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
        this.isSaved = false;
        this.isExistName = true;
        this.tempt = '';
        modalConfig.backdrop = 'static';
        modalConfig.keyboard = false;
    }
    MovieDetailsComponent.prototype.ngOnInit = function () {
        if (sessionStorage.getItem('genresList')) {
            this.getGeners();
            this.setDropDList();
            this.setDropDown();
            this.movieDetails = this.modalDService.movieDCopy;
            this.movieDetails = this.modalDService.movieDCopy;
            this.movieList = JSON.parse(sessionStorage.getItem('moviesList'));
            this.getSelectedGenres();
            this.editForm = this.formBuilder.group({
                filmName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('[a-zA-Z ]*')]],
                id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
                year: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
                runTime: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].email]],
                genre: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6)]],
                director: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
            }, {});
        }
    };
    Object.defineProperty(MovieDetailsComponent.prototype, "f", {
        get: function () { return this.editForm.controls; },
        enumerable: true,
        configurable: true
    });
    MovieDetailsComponent.prototype.openEditM = function (content) {
        this.tempt = this.movieDetails.title;
        this.modalService.open(content, { centered: true, size: 'lg' });
    };
    MovieDetailsComponent.prototype.openDeleteM = function (content) {
        this.modalService.open(content, { size: 'sm' });
    };
    MovieDetailsComponent.prototype.validate = function (movie) {
        var isValid = (!this.checkIfExist(movie)) && this.movieDetails.title != '' && this.movieDetails.id != '' &&
            (Number(this.movieDetails.release_date) > 1000 && Number(this.movieDetails.release_date) < 2020) &&
            Number(this.movieDetails.runtime) > 0 && Number(this.movieDetails.runtime) < 1000 &&
            this.movieDetails.genres.length > 0 && this.isItAbcInput(this.movieDetails.title);
        if (isValid)
            return true;
        return false;
    };
    MovieDetailsComponent.prototype.checkIfExist = function (movieT) {
        var temp = JSON.parse(sessionStorage.getItem('moviesList'));
        if (temp.filter(function (movie) { return movie.title === movieT; })[0] && (movieT != this.tempt)) {
            this.isExistName = true;
            return this.isExistName;
        }
        else
            this.isExistName = false;
        return this.isExistName;
    };
    MovieDetailsComponent.prototype.getGeners = function () {
        var tempG = JSON.parse(sessionStorage.getItem('genresList'));
        for (var key in tempG) {
            this.genreList.push(key, tempG[key]);
        }
    };
    MovieDetailsComponent.prototype.setDropDList = function () {
        for (var i = 0; i < this.genreList[1].length; i++) {
            this.dropdownList[i] = this.genreList[1][i];
        }
    };
    MovieDetailsComponent.prototype.getSelectedGenres = function () {
        var _this = this;
        this.selectedItems.splice(0, this.selectedItems.length);
        this.movieDetails.genres.forEach(function (object) {
            _this.selectedItems.push(object);
        });
    };
    MovieDetailsComponent.prototype.setDropDown = function () {
        this.dropdownSettings = {
            singleSelection: false,
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 4,
            allowSearchFilter: true,
            maxHeight: 800,
            disabled: false
        };
    };
    MovieDetailsComponent.prototype.onItemSelect = function (item) {
        this.movieDetails.genres.push(item);
    };
    MovieDetailsComponent.prototype.onItemDeSelect = function (item) {
        var index = this.movieDetails.genres.findIndex(function (genre) { return genre.id == item.id; });
        this.movieDetails.genres.splice(index, 1);
    };
    MovieDetailsComponent.prototype.onSelectAll = function (items) {
        var _this = this;
        this.movieDetails.genres.splice(0, this.movieDetails.genres.length);
        this.dropdownList.forEach(function (element) {
            _this.movieDetails.genres.push(element);
        });
    };
    MovieDetailsComponent.prototype.onDeSelectAll = function (items) {
        this.movieDetails.genres.splice(0, this.movieDetails.genres.length);
    };
    MovieDetailsComponent.prototype.counter = function (i) {
        return new Array(Math.trunc(Number(i) / 2));
    };
    MovieDetailsComponent.prototype.restCounter = function (i) {
        return new Array(Math.trunc((10 - Number(i)) / 2) + 1);
    };
    MovieDetailsComponent.prototype.backClicked = function () {
        this.rt.navigate(['./movies']);
    };
    MovieDetailsComponent.prototype.save = function () {
        var _this = this;
        this.isSaved = true;
        this.modalDService.movieDCopy = this.movieDetails;
        this.movieList = this.movieList.filter(function (movie) { return movie.id != _this.movieDetails.id; });
        this.movieList.push(this.movieDetails);
        sessionStorage.setItem('moviesList', JSON.stringify(this.movieList));
        this.modalDService.moviesList = this.movieList;
    };
    MovieDetailsComponent.prototype.cancel = function (movieId) {
        this.movieDetails = this.modalDService.cancel();
        this.getSelectedGenres();
    };
    MovieDetailsComponent.prototype.deleteM = function () {
        this.modalDService.deleteMovie(this.movieDetails);
    };
    MovieDetailsComponent.prototype.isItAbcInput = function (input) {
        var letters = /^[A-Za-z]+$/;
        if (input.match(letters))
            return true;
        return false;
    };
    MovieDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-movie-details',
            template: __webpack_require__(/*! ./movie-details.component.html */ "./src/app/movies/movie-details/movie-details.component.html"),
            styles: [__webpack_require__(/*! ./movie-details.component.css */ "./src/app/movies/movie-details/movie-details.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_modal_service__WEBPACK_IMPORTED_MODULE_3__["ModalDService"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModalConfig"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], MovieDetailsComponent);
    return MovieDetailsComponent;
}());



/***/ }),

/***/ "./src/app/movies/movie-details/pipeFilter.ts":
/*!****************************************************!*\
  !*** ./src/app/movies/movie-details/pipeFilter.ts ***!
  \****************************************************/
/*! exports provided: specialFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "specialFilter", function() { return specialFilter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var specialFilter = /** @class */ (function () {
    function specialFilter() {
    }
    specialFilter.prototype.transform = function (title) {
        var Abc = title.replace(/[^A-Za-z ]+/g, '');
        return this.camel(Abc);
    };
    specialFilter.prototype.camel = function (title) {
        return title.split(' ').map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    };
    specialFilter = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'PipeFilter'
        })
    ], specialFilter);
    return specialFilter;
}());



/***/ }),

/***/ "./src/app/movies/movies.component.css":
/*!*********************************************!*\
  !*** ./src/app/movies/movies.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n.flex-container{\r\n    margin: 0;\r\n    list-style: none;\r\n    display: flex;\r\n      flex-flow: column wrap;\r\n      padding: 0% 10% 0 10%;\r\n      justify-content: center; \r\n  }\r\n  \r\n  .posLoad{\r\n      position: relative;\r\n      margin: 30px 0 20px 0vw;\r\n  }\r\n  \r\n  .buttonload {\r\n              background-color: rgba(1, 1, 1, 0.171);\r\n              border: none;\r\n              color: white;\r\n              padding: 12px 24px;\r\n              font-size: 16px;\r\n              width: 200px;\r\n              box-shadow: 0 0 100px 20px rgba(129, 127, 127, 0.541);\r\n  }\r\n  \r\n  .buttonload:hover {\r\n      -webkit-transform: scale(1.08);\r\n              transform: scale(1.08);\r\n      transition: all 0.5s;\r\n  }\r\n  \r\n  .posNew{\r\n      position: absolute;\r\n      right: 100px;\r\n      top: 17px;\r\n      \r\n  }\r\n  \r\n  .buttonNew{\r\n      background-color: #cce1ecd2;\r\n      border: none;\r\n      color: white;\r\n      padding: 9px 8px;\r\n      font-size: 18px;\r\n      box-shadow: 0 0 3px 10px rgba(253, 249, 249, 0.39);\r\n      cursor: pointer;\r\n      border-radius: 10%;\r\n  \r\n  }\r\n  \r\n  .btns :hover{\r\n      -webkit-transform: scale(1.2);\r\n              transform: scale(1.2);\r\n      transition: all 0.2s;\r\n      background-color: rgba(19, 6, 54, 0.808);\r\n  \r\n  }\r\n  \r\n  .btns:hover:after {\r\n      opacity: 1;\r\n      top: 0.5em;\r\n      max-height: 200px;\r\n      padding: 0.4em;\r\n  }\r\n  \r\n  .btns{\r\n  padding-top: 0;\r\n  padding-right: 150px;\r\n  }\r\n  \r\n  button:focus{\r\n      outline: none;\r\n  }\r\n  \r\n  .fa {\r\n      margin-left: -12px;\r\n      margin-right: 8px;\r\n  }\r\n  \r\n  h4{\r\n      font-size: 18px;\r\n  }\r\n  \r\n  .full{\r\n      width: 100%;\r\n      margin: 5px;\r\n      padding: 7px;\r\n  \r\n  }\r\n  \r\n  .starRate{\r\n      width: 100%;\r\n  }\r\n  \r\n  .rate{\r\n      display: inline-block;\r\n      width: 30px;\r\n       font-size: 12px;\r\n       margin-top: 0px;\r\n       margin-left: 7.5px;\r\n       color: #fff;\r\n       padding: 5px;\r\n       border-radius: 50%;\r\n       border: 1px solid rgba(255, 255, 255, 0.246);\r\n       text-align: center;\r\n  }\r\n  \r\n  .movies_list{\r\n      display: flex;\r\n      flex-direction: row;\r\n      justify-content: space-around;\r\n      flex-wrap: wrap;\r\n      padding: 50px 100px 50px 100px;\r\n  \r\n      margin: 0;\r\n  }\r\n  \r\n  .movie_card {\r\n       position: relative;\r\n       display: flex;\r\n      flex-wrap: wrap;\r\n       width: 250px;\r\n       height: 400px;\r\n       overflow: hidden;\r\n       border-radius: 10px;\r\n       transition: all 0.4s;\r\n       margin:2vh;\r\n       background-color: rgb(194, 182, 166);\r\n       \r\n  \r\n  }\r\n  \r\n  .movie_card:hover {\r\n       -webkit-transform: scale(1.02);\r\n               transform: scale(1.02);\r\n       transition: all 0.4s;\r\n       background-color: rgba(17, 29, 31, 0.062);\r\n  }\r\n  \r\n  .fa{\r\n      margin-right: 15px !important;\r\n  }\r\n  \r\n  .card_header {\r\n      width: 100%;\r\n  }\r\n  \r\n  .card_body{\r\n      position: absolute;\r\n      height: 55%;\r\n      width: 100%;\r\n      top: 30%;\r\n      padding-right: 10px;\r\n      padding-left: 10px;\r\n      display: flex;\r\n      flex-direction: column;\r\n      justify-content: flex-start;\r\n      \r\n  }\r\n  \r\n  .card_footer{\r\n      position: absolute;\r\n      height: 40%;\r\n      width: 100%;\r\n      top: 72%;\r\n      padding: 5px;\r\n      display: flex;\r\n      flex-flow: wrap column;\r\n      align-items: center;\r\n  }\r\n  \r\n  .movie_card .info_section {\r\n       position: relative;\r\n       width: 100%;\r\n       height: 100%;\r\n       background-blend-mode: multiply;\r\n       z-index: 2;\r\n       background: linear-gradient(to right, #464643 10%, transparent 100%);\r\n       border-radius: 10px;\r\n       display: flex;\r\n       flex-wrap: wrap;\r\n          flex-direction: row;\r\n          cursor: pointer;\r\n  \r\n  }\r\n  \r\n  .movies_list .movie_card .info_section .card_header h1 {\r\n       color: #fff;\r\n       font-weight: 400;\r\n       font-size: 20px;\r\n  }\r\n  \r\n  .movie_card .info_section .card_header h4 {\r\n       color: #9ac7fa;\r\n       font-weight: 400;\r\n       font-size: 18px;\r\n  }\r\n  \r\n  .movies_list .movie_card .info_section .card_footer .full .minutes {\r\n       display: inline-block;\r\n       font-size: 12px;\r\n       margin-top: 0px;\r\n       color: #fff;\r\n       padding: 5px;\r\n       border-radius: 10px;\r\n       border: 1px solid rgba(255, 255, 255, 0.246);\r\n       text-align: center;\r\n       \r\n  \r\n  }\r\n  \r\n  .movies_list .movie_card .info_section .card_footer .type {\r\n       display: inline-block;\r\n       color: #cee4fd;\r\n       font-weight: 250px;\r\n  }\r\n  \r\n  .movies_list .movie_card .info_section .card_header .locandina {\r\n       position: relative;\r\n       float: left;\r\n       margin:5% 70% 0% 5%;\r\n       height: 180px;\r\n       width: 120px;\r\n       box-shadow: 0 0 100px 20px rgba(0, 0, 0, 0.5);\r\n       border-radius: 8px;\r\n  }\r\n  \r\n  .movie_card .info_section .movie_desc {\r\n       padding: 0;\r\n       height: 50%;\r\n       width: 100%;\r\n       z-index: 10;\r\n  }\r\n  \r\n  .movie_card .info_section .movie_desc .text {\r\n       color: #cfd6e1;\r\n       padding-top: 10px;\r\n  }\r\n  \r\n  .movie_card .blur_back {\r\n       position: absolute;\r\n       top: 0;\r\n       z-index: 1;\r\n       height: 100%;\r\n       right: 0;\r\n       background-size: cover;\r\n       border-radius: 35px;\r\n       width: 100%;\r\n       background-position-x: -300px;\r\n  }\r\n  \r\n  .star {\r\n      color: orange;\r\n    }\r\n  \r\n  p span.popup {\r\n          height: 100%;\r\n          width: 100%;\r\n          color: #fff;\r\n          position: absolute;\r\n          cursor: pointer;\r\n          z-index: 500;\r\n   }\r\n  \r\n  span.popup:after {\r\n          content: attr(data-popuptext);\r\n          background: rgba(0, 0, 0, 0.85);\r\n          border-radius: 3px;\r\n          opacity: 0;\r\n          top: 0;\r\n          left: 0;\r\n          position: absolute;\r\n          transition: 500ms ease;\r\n          white-space: nowrap;\r\n          max-height: 0;\r\n   }\r\n  \r\n  span.popup:hover:after {\r\n          opacity: 1;\r\n          top: 0.2em;\r\n          max-height: 200px;\r\n          padding: 0.4em;\r\n   }\r\n  \r\n  input[type=number]::-webkit-inner-spin-button, \r\n   input[type=number]::-webkit-outer-spin-button { \r\n           -webkit-appearance: none; \r\n           margin: 0; \r\n       }\r\n  \r\n  .navbar-custom {\r\n      background-color: #763ef8de;\r\n    }\r\n  \r\n  .navbar-custom .navbar-brand,\r\n    .navbar-custom .navbar-text {\r\n      color: rgba(255,255,255,.8);\r\n      padding: 0.8rem 1rem;\r\n    }\r\n  \r\n  .navbar-custom .navbar-nav .nav-link {\r\n      color: rgba(255,255,255,.5);\r\n      padding: 1rem 1rem;\r\n    }\r\n  \r\n  .navbar-custom .nav-item.active .nav-link,\r\n  .navbar-custom .nav-item:hover .nav-link {\r\n    color: #ffffff;\r\n  }\r\n  \r\n  .navbar-custom .navbar-brand,\r\n  .navbar-custom .navbar-text {\r\n    color: rgba(255,255,255,.8);\r\n    padding: 0.8rem 1rem;\r\n  }\r\n  \r\n  .underlineHoverNav:after {\r\n      display: block;\r\n      left: 0;\r\n      bottom: -10px;\r\n      width: 0;\r\n      height: 2px;\r\n      background-color: #e1e5e7;\r\n      content: \"\";\r\n      transition: width 0.3s;\r\n    }\r\n  \r\n  .underlineHoverNav:hover {\r\n      color: #0d0d0d;\r\n    }\r\n  \r\n  .underlineHoverNav:hover:after{\r\n      width: 100%;\r\n    }\r\n  \r\n  nav{\r\n        position: fixed;\r\n        width: 100%;\r\n        z-index: 1000;;\r\n    }\r\n  \r\n  .navbar-brand{\r\n        padding-top: 10px !important;\r\n        font-weight: 600;\r\n      }\r\n  \r\n  .Navbar {\r\n          display: flex;\r\n          flex-flow: row-reverse;\r\n          flex-direction: row;\r\n      }\r\n  \r\n  .addB{\r\n      width:1vw;\r\n      height: 1vh;;\r\n  }\r\n  \r\n  @media screen and (max-width: 768px) {\r\n      .movies_list{\r\n          min-height: 400px;\r\n          padding: 50px 10px 50px 10px;\r\n      } \r\n      .movie_card {\r\n           width: 90%;\r\n           margin: 70px auto;\r\n           min-height: 450px !important;\r\n      }\r\n      p{\r\n          font-size: 16px;\r\n      }\r\n      h1{\r\n          font-size: 34px;\r\n      }\r\n      h4{\r\n          font-size: 22px;\r\n      }\r\n       .blur_back {\r\n           width: 100%;\r\n           background-position: 50% 50% !important;\r\n      }\r\n  \r\n      .card_header {\r\n          width: 100%;\r\n          height: 85% !important;\r\n      }\r\n      .card_body{\r\n          height: 50%;\r\n          position: relative;\r\n          top:10%;\r\n          justify-content: top;\r\n          margin-top:5%;\r\n      }\r\n       .info_section {\r\n           background: linear-gradient(to top, #141413 20%, transparent 100%);\r\n           width: 100%;\r\n           padding-left: 0;\r\n           min-height: 450px;\t\t \r\n      }\r\n      .posNew{\r\n      position: absolute;\r\n          right: 60px;\r\n          bottom: 15px;\r\n      }\r\n      .navbar-nav {\r\n   flex-direction: row;\r\n  \r\n  }\r\n  .btns{\r\n      padding-top: 0;\r\n      padding-right: 0;\r\n      }\r\n      .addB{\r\n          height: auto;\r\n      }\r\n      .buttonNew{\r\n      padding: 5px 9px;\r\n  }\r\n  \r\n  }\r\n  \r\n  .spot {\r\n       box-shadow: 0px 0px 500px -45px rgba(247, 245, 244, 0.5);\r\n  }\r\n  \r\n  .spot:hover {\r\n       box-shadow: 0px 0px 800px -55px rgba(8, 14, 12, 0.925);\r\n  }\r\n  \r\n  html, body { height: 100%; }\r\n  \r\n  body { margin: 0; font-family: Roboto, \"Helvetica Neue\", sans-serif; }\r\n  \r\n  \r\n  \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW92aWVzL21vdmllcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsZ0JBQWdCO0lBS2hCLGFBQWE7TUFFWCxzQkFBc0I7TUFDdEIscUJBQXFCO01BQ3JCLHVCQUF1QjtFQUMzQjs7RUFFQTtNQUNJLGtCQUFrQjtNQUNsQix1QkFBdUI7RUFDM0I7O0VBQ0E7Y0FDWSxzQ0FBc0M7Y0FDdEMsWUFBWTtjQUNaLFlBQVk7Y0FDWixrQkFBa0I7Y0FDbEIsZUFBZTtjQUNmLFlBQVk7Y0FDWixxREFBcUQ7RUFDakU7O0VBRUE7TUFDSSw4QkFBc0I7Y0FBdEIsc0JBQXNCO01BQ3RCLG9CQUFvQjtFQUN4Qjs7RUFJQTtNQUNJLGtCQUFrQjtNQUNsQixZQUFZO01BQ1osU0FBUzs7RUFFYjs7RUFDQTtNQUNJLDJCQUEyQjtNQUMzQixZQUFZO01BQ1osWUFBWTtNQUNaLGdCQUFnQjtNQUNoQixlQUFlO01BQ2Ysa0RBQWtEO01BQ2xELGVBQWU7TUFDZixrQkFBa0I7O0VBRXRCOztFQUNBO01BQ0ksNkJBQXFCO2NBQXJCLHFCQUFxQjtNQUNyQixvQkFBb0I7TUFDcEIsd0NBQXdDOztFQUU1Qzs7RUFFQTtNQUNJLFVBQVU7TUFDVixVQUFVO01BQ1YsaUJBQWlCO01BQ2pCLGNBQWM7RUFDbEI7O0VBRUE7RUFDQSxjQUFjO0VBQ2Qsb0JBQW9CO0VBQ3BCOztFQUNBO01BQ0ksYUFBYTtFQUNqQjs7RUFDQTtNQUNJLGtCQUFrQjtNQUNsQixpQkFBaUI7RUFDckI7O0VBRUE7TUFDSSxlQUFlO0VBQ25COztFQUVBO01BQ0ksV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZOztFQUVoQjs7RUFFQTtNQUNJLFdBQVc7RUFDZjs7RUFFQTtNQUNJLHFCQUFxQjtNQUNyQixXQUFXO09BQ1YsZUFBZTtPQUNmLGVBQWU7T0FDZixrQkFBa0I7T0FDbEIsV0FBVztPQUNYLFlBQVk7T0FDWixrQkFBa0I7T0FDbEIsNENBQTRDO09BQzVDLGtCQUFrQjtFQUN2Qjs7RUFFQTtNQUNJLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsNkJBQTZCO01BRTdCLGVBQWU7TUFDZiw4QkFBOEI7O01BRTlCLFNBQVM7RUFDYjs7RUFDQztPQUNJLGtCQUFrQjtPQUNsQixhQUFhO01BRWQsZUFBZTtPQUNkLFlBQVk7T0FDWixhQUFhO09BQ2IsZ0JBQWdCO09BQ2hCLG1CQUFtQjtPQUNuQixvQkFBb0I7T0FDcEIsVUFBVTtPQUNWLG9DQUFvQzs7O0VBR3pDOztFQUNDO09BQ0ksOEJBQXNCO2VBQXRCLHNCQUFzQjtPQUN0QixvQkFBb0I7T0FDcEIseUNBQXlDO0VBQzlDOztFQUNBO01BQ0ksNkJBQTZCO0VBQ2pDOztFQUNBO01BQ0ksV0FBVztFQUNmOztFQUNBO01BQ0ksa0JBQWtCO01BQ2xCLFdBQVc7TUFDWCxXQUFXO01BQ1gsUUFBUTtNQUNSLG1CQUFtQjtNQUNuQixrQkFBa0I7TUFDbEIsYUFBYTtNQUNiLHNCQUFzQjtNQUN0QiwyQkFBMkI7O0VBRS9COztFQUNBO01BQ0ksa0JBQWtCO01BQ2xCLFdBQVc7TUFDWCxXQUFXO01BQ1gsUUFBUTtNQUNSLFlBQVk7TUFDWixhQUFhO01BQ2Isc0JBQXNCO01BQ3RCLG1CQUFtQjtFQUN2Qjs7RUFFRTtPQUNHLGtCQUFrQjtPQUNsQixXQUFXO09BQ1gsWUFBWTtPQUNaLCtCQUErQjtPQUMvQixVQUFVO09BQ1Ysb0VBQW9FO09BQ3BFLG1CQUFtQjtPQUNuQixhQUFhO09BRVYsZUFBZTtVQUNmLG1CQUFtQjtVQUNuQixlQUFlOztFQUV2Qjs7RUFDQztPQUNJLFdBQVc7T0FDWCxnQkFBZ0I7T0FDaEIsZUFBZTtFQUNwQjs7RUFDQztPQUNJLGNBQWM7T0FDZCxnQkFBZ0I7T0FDaEIsZUFBZTtFQUNwQjs7RUFDQztPQUNJLHFCQUFxQjtPQUNyQixlQUFlO09BQ2YsZUFBZTtPQUNmLFdBQVc7T0FDWCxZQUFZO09BQ1osbUJBQW1CO09BQ25CLDRDQUE0QztPQUM1QyxrQkFBa0I7OztFQUd2Qjs7RUFDQztPQUNJLHFCQUFxQjtPQUNyQixjQUFjO09BQ2Qsa0JBQWtCO0VBQ3ZCOztFQUNDO09BQ0ksa0JBQWtCO09BQ2xCLFdBQVc7T0FDWCxtQkFBbUI7T0FDbkIsYUFBYTtPQUNiLFlBQVk7T0FDWiw2Q0FBNkM7T0FDN0Msa0JBQWtCO0VBQ3ZCOztFQUNDO09BQ0ksVUFBVTtPQUNWLFdBQVc7T0FDWCxXQUFXO09BQ1gsV0FBVztFQUNoQjs7RUFDQztPQUNJLGNBQWM7T0FDZCxpQkFBaUI7RUFDdEI7O0VBRUM7T0FDSSxrQkFBa0I7T0FDbEIsTUFBTTtPQUNOLFVBQVU7T0FDVixZQUFZO09BQ1osUUFBUTtPQUNSLHNCQUFzQjtPQUN0QixtQkFBbUI7T0FDbkIsV0FBVztPQUNYLDZCQUE2QjtFQUNsQzs7RUFFQTtNQUNJLGFBQWE7SUFDZjs7RUFFQTtVQUNNLFlBQVk7VUFDWixXQUFXO1VBQ1gsV0FBVztVQUNYLGtCQUFrQjtVQUNsQixlQUFlO1VBQ2YsWUFBWTtHQUNuQjs7RUFDRztVQUNJLDZCQUE2QjtVQUM3QiwrQkFBK0I7VUFDL0Isa0JBQWtCO1VBQ2xCLFVBQVU7VUFDVixNQUFNO1VBQ04sT0FBTztVQUNQLGtCQUFrQjtVQUNsQixzQkFBc0I7VUFDdEIsbUJBQW1CO1VBQ25CLGFBQWE7R0FDcEI7O0VBQ0c7VUFDSSxVQUFVO1VBQ1YsVUFBVTtVQUNWLGlCQUFpQjtVQUNqQixjQUFjO0dBQ3JCOztFQUdBOztXQUVRLHdCQUF3QjtXQUN4QixTQUFTO09BQ2I7O0VBRUE7TUFDRCwyQkFBMkI7SUFDN0I7O0VBQ0E7O01BRUUsMkJBQTJCO01BQzNCLG9CQUFvQjtJQUN0Qjs7RUFDQTtNQUNFLDJCQUEyQjtNQUMzQixrQkFBa0I7SUFDcEI7O0VBRUE7O0lBRUEsY0FBYztFQUNoQjs7RUFFQTs7SUFFRSwyQkFBMkI7SUFDM0Isb0JBQW9CO0VBQ3RCOztFQUVBO01BQ0ksY0FBYztNQUNkLE9BQU87TUFDUCxhQUFhO01BQ2IsUUFBUTtNQUNSLFdBQVc7TUFDWCx5QkFBeUI7TUFDekIsV0FBVztNQUNYLHNCQUFzQjtJQUN4Qjs7RUFFQTtNQUNFLGNBQWM7SUFDaEI7O0VBRUE7TUFDRSxXQUFXO0lBQ2I7O0VBRUE7UUFDSSxlQUFlO1FBQ2YsV0FBVztRQUNYLGFBQWE7SUFDakI7O0VBQ0E7UUFDSSw0QkFBNEI7UUFDNUIsZ0JBQWdCO01BQ2xCOztFQUVBO1VBQ0ksYUFBYTtVQUNiLHNCQUFzQjtVQUN0QixtQkFBbUI7TUFDdkI7O0VBRUo7TUFDSSxTQUFTO01BQ1QsV0FBVztFQUNmOztFQUVBO01BQ0k7VUFDSSxpQkFBaUI7VUFDakIsNEJBQTRCO01BQ2hDO01BQ0E7V0FDSyxVQUFVO1dBQ1YsaUJBQWlCO1dBQ2pCLDRCQUE0QjtNQUNqQztNQUNBO1VBQ0ksZUFBZTtNQUNuQjtNQUNBO1VBQ0ksZUFBZTtNQUNuQjtNQUNBO1VBQ0ksZUFBZTtNQUNuQjtPQUNDO1dBQ0ksV0FBVztXQUNYLHVDQUF1QztNQUM1Qzs7TUFFQTtVQUNJLFdBQVc7VUFDWCxzQkFBc0I7TUFDMUI7TUFDQTtVQUNJLFdBQVc7VUFDWCxrQkFBa0I7VUFDbEIsT0FBTztVQUNQLG9CQUFvQjtVQUNwQixhQUFhO01BQ2pCO09BQ0M7V0FDSSxrRUFBa0U7V0FDbEUsV0FBVztXQUNYLGVBQWU7V0FDZixpQkFBaUI7TUFDdEI7TUFDQTtNQUNBLGtCQUFrQjtVQUNkLFdBQVc7VUFDWCxZQUFZO01BQ2hCO01BQ0E7R0FDSCxtQkFBbUI7O0VBRXBCO0VBQ0E7TUFDSSxjQUFjO01BQ2QsZ0JBQWdCO01BQ2hCO01BQ0E7VUFDSSxZQUFZO01BQ2hCO01BQ0E7TUFDQSxnQkFBZ0I7RUFDcEI7O0VBRUE7O0VBQ0M7T0FDSSx3REFBd0Q7RUFDN0Q7O0VBQ0M7T0FDSSxzREFBc0Q7RUFDM0Q7O0VBR0EsYUFBYSxZQUFZLEVBQUU7O0VBQzNCLE9BQU8sU0FBUyxFQUFFLGlEQUFpRCxFQUFFIiwiZmlsZSI6InNyYy9hcHAvbW92aWVzL21vdmllcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4uZmxleC1jb250YWluZXJ7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XHJcbiAgICBkaXNwbGF5OiAtbW96LWJveDtcclxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgICAgLXdlYmtpdC1mbGV4LWZsb3c6IHJvdyB3cmFwO1xyXG4gICAgICBmbGV4LWZsb3c6IGNvbHVtbiB3cmFwO1xyXG4gICAgICBwYWRkaW5nOiAwJSAxMCUgMCAxMCU7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyBcclxuICB9XHJcbiAgXHJcbiAgLnBvc0xvYWR7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAzMHB4IDAgMjBweCAwdnc7XHJcbiAgfVxyXG4gIC5idXR0b25sb2FkIHtcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEsIDEsIDEsIDAuMTcxKTtcclxuICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICAgIHBhZGRpbmc6IDEycHggMjRweDtcclxuICAgICAgICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAxMDBweCAyMHB4IHJnYmEoMTI5LCAxMjcsIDEyNywgMC41NDEpO1xyXG4gIH1cclxuICBcclxuICAuYnV0dG9ubG9hZDpob3ZlciB7XHJcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7XHJcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzO1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAucG9zTmV3e1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHJpZ2h0OiAxMDBweDtcclxuICAgICAgdG9wOiAxN3B4O1xyXG4gICAgICBcclxuICB9XHJcbiAgLmJ1dHRvbk5ld3tcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2NjZTFlY2QyO1xyXG4gICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgcGFkZGluZzogOXB4IDhweDtcclxuICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICBib3gtc2hhZG93OiAwIDAgM3B4IDEwcHggcmdiYSgyNTMsIDI0OSwgMjQ5LCAwLjM5KTtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMCU7XHJcbiAgXHJcbiAgfVxyXG4gIC5idG5zIDpob3ZlcntcclxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xyXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxOSwgNiwgNTQsIDAuODA4KTtcclxuICBcclxuICB9XHJcbiAgXHJcbiAgLmJ0bnM6aG92ZXI6YWZ0ZXIge1xyXG4gICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICB0b3A6IDAuNWVtO1xyXG4gICAgICBtYXgtaGVpZ2h0OiAyMDBweDtcclxuICAgICAgcGFkZGluZzogMC40ZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5idG5ze1xyXG4gIHBhZGRpbmctdG9wOiAwO1xyXG4gIHBhZGRpbmctcmlnaHQ6IDE1MHB4O1xyXG4gIH1cclxuICBidXR0b246Zm9jdXN7XHJcbiAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgfVxyXG4gIC5mYSB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMTJweDtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbiAgfVxyXG4gICBcclxuICBoNHtcclxuICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gIH1cclxuICBcclxuICAuZnVsbHtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIG1hcmdpbjogNXB4O1xyXG4gICAgICBwYWRkaW5nOiA3cHg7XHJcbiAgXHJcbiAgfVxyXG4gIFxyXG4gIC5zdGFyUmF0ZXtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIFxyXG4gIC5yYXRle1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgICAgbWFyZ2luLWxlZnQ6IDcuNXB4O1xyXG4gICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjQ2KTtcclxuICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbiAgXHJcbiAgLm1vdmllc19saXN0e1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgICAgLXdlYmtpdC1mbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgICAgcGFkZGluZzogNTBweCAxMDBweCA1MHB4IDEwMHB4O1xyXG4gIFxyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgfVxyXG4gICAubW92aWVfY2FyZCB7XHJcbiAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgLXdlYmtpdC1mbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgICAgIHdpZHRoOiAyNTBweDtcclxuICAgICAgIGhlaWdodDogNDAwcHg7XHJcbiAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjRzO1xyXG4gICAgICAgbWFyZ2luOjJ2aDtcclxuICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTQsIDE4MiwgMTY2KTtcclxuICAgICAgIFxyXG4gIFxyXG4gIH1cclxuICAgLm1vdmllX2NhcmQ6aG92ZXIge1xyXG4gICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjAyKTtcclxuICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjRzO1xyXG4gICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNywgMjksIDMxLCAwLjA2Mik7XHJcbiAgfVxyXG4gIC5mYXtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAxNXB4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIC5jYXJkX2hlYWRlciB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAuY2FyZF9ib2R5e1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGhlaWdodDogNTUlO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgdG9wOiAzMCU7XHJcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICBcclxuICB9XHJcbiAgLmNhcmRfZm9vdGVye1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGhlaWdodDogNDAlO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgdG9wOiA3MiU7XHJcbiAgICAgIHBhZGRpbmc6IDVweDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC1mbG93OiB3cmFwIGNvbHVtbjtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9XHJcbiAgXHJcbiAgICAubW92aWVfY2FyZCAuaW5mb19zZWN0aW9uIHtcclxuICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgYmFja2dyb3VuZC1ibGVuZC1tb2RlOiBtdWx0aXBseTtcclxuICAgICAgIHotaW5kZXg6IDI7XHJcbiAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICM0NjQ2NDMgMTAlLCB0cmFuc3BhcmVudCAxMDAlKTtcclxuICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgLXdlYmtpdC1mbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIFxyXG4gIH1cclxuICAgLm1vdmllc19saXN0IC5tb3ZpZV9jYXJkIC5pbmZvX3NlY3Rpb24gLmNhcmRfaGVhZGVyIGgxIHtcclxuICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICB9XHJcbiAgIC5tb3ZpZV9jYXJkIC5pbmZvX3NlY3Rpb24gLmNhcmRfaGVhZGVyIGg0IHtcclxuICAgICAgIGNvbG9yOiAjOWFjN2ZhO1xyXG4gICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICB9XHJcbiAgIC5tb3ZpZXNfbGlzdCAubW92aWVfY2FyZCAuaW5mb19zZWN0aW9uIC5jYXJkX2Zvb3RlciAuZnVsbCAubWludXRlcyB7XHJcbiAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgIHBhZGRpbmc6IDVweDtcclxuICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjQ2KTtcclxuICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgIFxyXG4gIFxyXG4gIH1cclxuICAgLm1vdmllc19saXN0IC5tb3ZpZV9jYXJkIC5pbmZvX3NlY3Rpb24gLmNhcmRfZm9vdGVyIC50eXBlIHtcclxuICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgIGNvbG9yOiAjY2VlNGZkO1xyXG4gICAgICAgZm9udC13ZWlnaHQ6IDI1MHB4O1xyXG4gIH1cclxuICAgLm1vdmllc19saXN0IC5tb3ZpZV9jYXJkIC5pbmZvX3NlY3Rpb24gLmNhcmRfaGVhZGVyIC5sb2NhbmRpbmEge1xyXG4gICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICBtYXJnaW46NSUgNzAlIDAlIDUlO1xyXG4gICAgICAgaGVpZ2h0OiAxODBweDtcclxuICAgICAgIHdpZHRoOiAxMjBweDtcclxuICAgICAgIGJveC1zaGFkb3c6IDAgMCAxMDBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICB9XHJcbiAgIC5tb3ZpZV9jYXJkIC5pbmZvX3NlY3Rpb24gLm1vdmllX2Rlc2Mge1xyXG4gICAgICAgcGFkZGluZzogMDtcclxuICAgICAgIGhlaWdodDogNTAlO1xyXG4gICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICB6LWluZGV4OiAxMDtcclxuICB9XHJcbiAgIC5tb3ZpZV9jYXJkIC5pbmZvX3NlY3Rpb24gLm1vdmllX2Rlc2MgLnRleHQge1xyXG4gICAgICAgY29sb3I6ICNjZmQ2ZTE7XHJcbiAgICAgICBwYWRkaW5nLXRvcDogMTBweDtcclxuICB9XHJcbiAgXHJcbiAgIC5tb3ZpZV9jYXJkIC5ibHVyX2JhY2sge1xyXG4gICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgdG9wOiAwO1xyXG4gICAgICAgei1pbmRleDogMTtcclxuICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgICAgIGJvcmRlci1yYWRpdXM6IDM1cHg7XHJcbiAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgIGJhY2tncm91bmQtcG9zaXRpb24teDogLTMwMHB4O1xyXG4gIH1cclxuICAgXHJcbiAgLnN0YXIge1xyXG4gICAgICBjb2xvcjogb3JhbmdlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwIHNwYW4ucG9wdXAge1xyXG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgIHotaW5kZXg6IDUwMDtcclxuICAgfVxyXG4gICAgICBzcGFuLnBvcHVwOmFmdGVyIHtcclxuICAgICAgICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1wb3B1cHRleHQpO1xyXG4gICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjg1KTtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgdHJhbnNpdGlvbjogNTAwbXMgZWFzZTtcclxuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICBtYXgtaGVpZ2h0OiAwO1xyXG4gICB9XHJcbiAgICAgIHNwYW4ucG9wdXA6aG92ZXI6YWZ0ZXIge1xyXG4gICAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgICAgIHRvcDogMC4yZW07XHJcbiAgICAgICAgICBtYXgtaGVpZ2h0OiAyMDBweDtcclxuICAgICAgICAgIHBhZGRpbmc6IDAuNGVtO1xyXG4gICB9XHJcbiAgIFxyXG4gICBcclxuICAgaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLCBcclxuICAgaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHsgXHJcbiAgICAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lOyBcclxuICAgICAgICAgICBtYXJnaW46IDA7IFxyXG4gICAgICAgfVx0XHJcbiAgXHJcbiAgICAgICAubmF2YmFyLWN1c3RvbSB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICM3NjNlZjhkZTtcclxuICAgIH1cclxuICAgIC5uYXZiYXItY3VzdG9tIC5uYXZiYXItYnJhbmQsXHJcbiAgICAubmF2YmFyLWN1c3RvbSAubmF2YmFyLXRleHQge1xyXG4gICAgICBjb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwuOCk7XHJcbiAgICAgIHBhZGRpbmc6IDAuOHJlbSAxcmVtO1xyXG4gICAgfVxyXG4gICAgLm5hdmJhci1jdXN0b20gLm5hdmJhci1uYXYgLm5hdi1saW5rIHtcclxuICAgICAgY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsLjUpO1xyXG4gICAgICBwYWRkaW5nOiAxcmVtIDFyZW07XHJcbiAgICB9XHJcbiAgXHJcbiAgICAubmF2YmFyLWN1c3RvbSAubmF2LWl0ZW0uYWN0aXZlIC5uYXYtbGluayxcclxuICAubmF2YmFyLWN1c3RvbSAubmF2LWl0ZW06aG92ZXIgLm5hdi1saW5rIHtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gIH1cclxuICBcclxuICAubmF2YmFyLWN1c3RvbSAubmF2YmFyLWJyYW5kLFxyXG4gIC5uYXZiYXItY3VzdG9tIC5uYXZiYXItdGV4dCB7XHJcbiAgICBjb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwuOCk7XHJcbiAgICBwYWRkaW5nOiAwLjhyZW0gMXJlbTtcclxuICB9XHJcbiAgXHJcbiAgLnVuZGVybGluZUhvdmVyTmF2OmFmdGVyIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIGJvdHRvbTogLTEwcHg7XHJcbiAgICAgIHdpZHRoOiAwO1xyXG4gICAgICBoZWlnaHQ6IDJweDtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2UxZTVlNztcclxuICAgICAgY29udGVudDogXCJcIjtcclxuICAgICAgdHJhbnNpdGlvbjogd2lkdGggMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLnVuZGVybGluZUhvdmVyTmF2OmhvdmVyIHtcclxuICAgICAgY29sb3I6ICMwZDBkMGQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC51bmRlcmxpbmVIb3Zlck5hdjpob3ZlcjphZnRlcntcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBuYXZ7XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHotaW5kZXg6IDEwMDA7O1xyXG4gICAgfVxyXG4gICAgLm5hdmJhci1icmFuZHtcclxuICAgICAgICBwYWRkaW5nLXRvcDogMTBweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIH0gXHJcbiAgICAgIFxyXG4gICAgICAuTmF2YmFyIHtcclxuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICBmbGV4LWZsb3c6IHJvdy1yZXZlcnNlO1xyXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgfVxyXG4gIFxyXG4gIC5hZGRCe1xyXG4gICAgICB3aWR0aDoxdnc7XHJcbiAgICAgIGhlaWdodDogMXZoOztcclxuICB9XHJcbiAgXHJcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgICAgLm1vdmllc19saXN0e1xyXG4gICAgICAgICAgbWluLWhlaWdodDogNDAwcHg7XHJcbiAgICAgICAgICBwYWRkaW5nOiA1MHB4IDEwcHggNTBweCAxMHB4O1xyXG4gICAgICB9IFxyXG4gICAgICAubW92aWVfY2FyZCB7XHJcbiAgICAgICAgICAgd2lkdGg6IDkwJTtcclxuICAgICAgICAgICBtYXJnaW46IDcwcHggYXV0bztcclxuICAgICAgICAgICBtaW4taGVpZ2h0OiA0NTBweCAhaW1wb3J0YW50O1xyXG4gICAgICB9XHJcbiAgICAgIHB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgIH1cclxuICAgICAgaDF7XHJcbiAgICAgICAgICBmb250LXNpemU6IDM0cHg7XHJcbiAgICAgIH1cclxuICAgICAgaDR7XHJcbiAgICAgICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICAgIH1cclxuICAgICAgIC5ibHVyX2JhY2sge1xyXG4gICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSA1MCUgIWltcG9ydGFudDtcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICAuY2FyZF9oZWFkZXIge1xyXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICBoZWlnaHQ6IDg1JSAhaW1wb3J0YW50O1xyXG4gICAgICB9XHJcbiAgICAgIC5jYXJkX2JvZHl7XHJcbiAgICAgICAgICBoZWlnaHQ6IDUwJTtcclxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgIHRvcDoxMCU7XHJcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHRvcDtcclxuICAgICAgICAgIG1hcmdpbi10b3A6NSU7XHJcbiAgICAgIH1cclxuICAgICAgIC5pbmZvX3NlY3Rpb24ge1xyXG4gICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsICMxNDE0MTMgMjAlLCB0cmFuc3BhcmVudCAxMDAlKTtcclxuICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgICAgICAgICAgbWluLWhlaWdodDogNDUwcHg7XHRcdCBcclxuICAgICAgfVxyXG4gICAgICAucG9zTmV3e1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICByaWdodDogNjBweDtcclxuICAgICAgICAgIGJvdHRvbTogMTVweDtcclxuICAgICAgfVxyXG4gICAgICAubmF2YmFyLW5hdiB7XHJcbiAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgXHJcbiAgfVxyXG4gIC5idG5ze1xyXG4gICAgICBwYWRkaW5nLXRvcDogMDtcclxuICAgICAgcGFkZGluZy1yaWdodDogMDtcclxuICAgICAgfVxyXG4gICAgICAuYWRkQntcclxuICAgICAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgfVxyXG4gICAgICAuYnV0dG9uTmV3e1xyXG4gICAgICBwYWRkaW5nOiA1cHggOXB4O1xyXG4gIH1cclxuICBcclxuICB9XHJcbiAgIC5zcG90IHtcclxuICAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggNTAwcHggLTQ1cHggcmdiYSgyNDcsIDI0NSwgMjQ0LCAwLjUpO1xyXG4gIH1cclxuICAgLnNwb3Q6aG92ZXIge1xyXG4gICAgICAgYm94LXNoYWRvdzogMHB4IDBweCA4MDBweCAtNTVweCByZ2JhKDgsIDE0LCAxMiwgMC45MjUpO1xyXG4gIH1cclxuICBcclxuICAgXHJcbiAgaHRtbCwgYm9keSB7IGhlaWdodDogMTAwJTsgfVxyXG4gIGJvZHkgeyBtYXJnaW46IDA7IGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjsgfVxyXG4gIFxyXG4gIFxyXG4gICJdfQ== */"

/***/ }),

/***/ "./src/app/movies/movies.component.html":
/*!**********************************************!*\
  !*** ./src/app/movies/movies.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.8.1/css/all.css\"\n  integrity=\"sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf\" crossorigin=\"anonymous\">\n<nav class=\"navbar navbar-expand-md navbar-dark navbar-custom p-0\">\n  <div class=\"container-fluid\">\n    <ul class=\"navbar-nav mr-auto \">\n      <li class=\"nav-item \">\n        <a class=\"nav-link navbar-brand underlineHoverNav\" routerLink=\"/movies\"> HEROLO Cinema</a>\n      </li>\n    </ul>\n    <ul class=\"navbar-nav float-right\">\n      <li>\n        <a class=\"nav-link navbar-brand\">\n          <div class=\"btns\">\n            <i class=\"far fa-plus-square buttonNew posNew addB\" (click)=creatNewMovie(content)></i>\n          </div>\n        </a>\n      </li>\n    </ul>\n  </div>\n</nav>\n<ng-template #content let-modal>\n  <div class=\"modal-header grad\" style=\"background-size: cover;box-shadow: 0 0 100px 20px rgba(129, 127, 127, 0.863)\">\n  </div>\n  <div class=\"modal-body\"\n    style=\"background-color: rgb(255, 255, 255);box-shadow: 0 0 100px 20px rgba(129, 127, 127, 0.863);\">\n    <form #f=\"ngForm\" [formGroup]=\"newMForm\">\n      <div class=\"form-group\">\n        <label><strong>Film Name</strong></label>\n        <input type=\"text\" class=\"form-control\" formControlName=\"filmName\" #filmName\n          (input)=\"newMovieDetails['title'] = $event.target.value\" />\n      </div>\n      <div\n        *ngIf=\"newMForm.controls['filmName'].invalid && (newMForm.controls['filmName'].dirty || newMForm.controls['filmName'].touched)||isExistName\"\n        class=\"alert alert-danger\">\n        <div *ngIf=\"isExistName||newMForm.controls['filmName'].errors.required\">\n          Uniqe film name is required.\n        </div>\n        <div *ngIf=\"newMForm.controls['filmName'].errors.pattern\">\n            Please input alphabet characters only.\n          </div>\n      </div>\n      <div class=\"form-group\">\n        <label><strong>Release Year </strong></label>\n        <input type=\"number\" class=\"form-control\" formControlName=\"year\" #year\n          (input)=\"newMovieDetails['year'] = $event.target.value\" />\n      </div>\n      <div\n        *ngIf=\"(newMovieDetails['year'] < 1000 || newMovieDetails['year'] >2020) ||\n              newMForm.controls['year'].invalid && (newMForm.controls['year'].dirty || newMForm.controls['year'].touched)\"\n        class=\"alert alert-danger\">\n        Release dates is required [1000-2020]\n      </div>\n      <div class=\"form-group\">\n        <label><strong>Film RunTime</strong></label>\n        <input type=\"number\" class=\"form-control\" formControlName=\"runTime\" #runTime\n          (input)=\"newMovieDetails['runTime'] = $event.target.value\" />\n      </div>\n      <div\n        *ngIf=\"(newMovieDetails['runTime']<1 || newMovieDetails['runTime']>999) && newMForm.controls['runTime'].touched\"\n        class=\"alert alert-danger\">\n        Film RunTime name is required [1-999].\n      </div>\n      <div class=\"form-group\">\n        <label><strong>Film Director</strong></label>\n        <input type=\"text\" class=\"form-control\" formControlName=\"director\" #director\n          (input)=\"newMovieDetails['director'] = $event.target.value\" />\n      </div>\n      <div *ngIf=\"newMForm.controls['director'].touched && !newMovieDetails['director']\" class=\"alert alert-danger\">\n        <div>\n          Director name is required.\n        </div>\n      </div>\n    </form>\n    <div>\n      <label><strong>GENRES : </strong></label>\n      <ng-multiselect-dropdown [data]=\"dropdownList\" [(ngModel)]=\"selectedItems\" [settings]=\"dropdownSettings\"\n        (onSelect)=\"onItemSelect($event)\" (onSelectAll)=\"onSelectAll($event)\" (onDeSelectAll)=\"onDeSelectAll($event)\"\n        (onDeSelect)=\"onItemDeSelect($event)\">\n      </ng-multiselect-dropdown>\n      <div *ngIf=\"newMovieDetails['genres'].length < 1\" class=\"alert alert-danger\">\n        Pick at least on genre.\n      </div>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\"\n    style=\"background-color: rgb(184, 190, 188);box-shadow: 0 0 100px 20px rgba(129, 127, 127, 0.863);\">\n    <button type=\"submit\" class=\"btn btn-primary\" *ngIf=\"validate(newMovieDetails['title'])\"\n      (click)=\"save(); modal.dismiss('Save click')\">Save</button>\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"cancel() ;modal.dismiss('Cancel click')\">Cancel</button>\n  </div>\n</ng-template>\n\n<div class=\"flex-container\">\n  <div class=\"movies_list\">\n    <div *ngFor=\"let movie of moviesDetailsAll\" class=\"movie_card spot\" (click)=\"open(movie.id);\">\n      <div class=\"info_section\">\n        <p>\n          <span class=\"popup\" data-popuptext=\"Click for options\"></span>\n        </p>\n        <div class=\"card_header\">\n          <img class=\"locandina\" *ngIf=\"movie.poster_path\" src=\"https://image.tmdb.org/t/p/w185/{{movie.poster_path}}\"\n            alt=\"poster movie\" />\n          <img class=\"locandina\" *ngIf=\"!movie.poster_path\" src=\"../../assets/img/poster.jpg\"\n            alt=\"No poster available\">\n          <div class=\"full\">\n            <h1>{{ movie.title }}</h1>\n            <h4>{{movie.release_date}}, {{movie.directorName}}</h4>\n          </div>\n        </div>\n        <div class=\"card_footer\">\n          <div class=\"starRate full\">\n            <span class=\"fa fa-star star\" *ngFor='let i of counter(movie.vote_average)'> </span>\n            <span class=\"fa fa-star\" *ngFor='let i of restCounter(movie.vote_average)'> </span>\n            <span class=\"rate\" *ngIf='movie.vote_average>7'\n              [ngStyle]=\"{'background-color': 'rgba(35, 196, 70, 0.534)'}\">\n              {{ movie.vote_average }}</span>\n            <span class=\"rate\" *ngIf='movie.vote_average<7'\n              [ngStyle]=\"{'background-color': 'rgba(235, 136, 23, 0.534)'}\">\n              {{ movie.vote_average }}</span>\n\n          </div>\n          <div class=\"full\">\n            <span class=\"minutes\">{{ movie.runtime }} Min</span>\n          </div>\n          <p class=\"type full\">\n            <span *ngFor='let genresList of movie.genres; let lst = last;'> {{genresList.name}} <span\n                *ngIf='lst == false'> | </span> </span></p>\n\n        </div>\n      </div>\n      <div class=\"blur_back \" *ngIf='movie.backdrop_path'\n        [ngStyle]=\"{'background-image': 'url('+'https://image.tmdb.org/t/p/original'+movie.backdrop_path+')'}\">\n      </div>\n      <div class=\"blur_back \" *ngIf='!movie.backdrop_path' src=\"../../assets/img/cinema-s.jpg\"\n        alt=\"No poster available\">\n      </div>\n\n    </div>\n    <div class=\"row justify-content-center full\">\n      <button class=\"buttonload posLoad\" (click)=load();>\n        <i class=\"fa fa-spinner fa-spin\"></i>Click to load more\n      </button>\n    </div>\n\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/movies/movies.component.ts":
/*!********************************************!*\
  !*** ./src/app/movies/movies.component.ts ***!
  \********************************************/
/*! exports provided: MoviesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoviesComponent", function() { return MoviesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _services_tmdb_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/tmdb.service */ "./src/app/services/tmdb.service.ts");
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/modal.service */ "./src/app/services/modal.service.ts");
/* harmony import */ var _movie_details_pipeFilter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./movie-details/pipeFilter */ "./src/app/movies/movie-details/pipeFilter.ts");









var MoviesComponent = /** @class */ (function () {
    function MoviesComponent(tmdbService, modalDService, rt, formBuilder, modalService) {
        this.tmdbService = tmdbService;
        this.modalDService = modalDService;
        this.rt = rt;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.page = 1;
        this.language = 'en-US';
        this.moviesDetailsAll = new Array;
        this.moviesDetails = new Array;
        this.newMovieDetails = new Object;
        this.orderBy = 'vote_count.desc';
        this.paramsGenreList = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]()
            .set('language', 'en-US');
        this.genreList = new Array;
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
        this.isExistName = true;
        this.filter = new _movie_details_pipeFilter__WEBPACK_IMPORTED_MODULE_8__["specialFilter"]();
    }
    MoviesComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.tmdbService.currentPage == 1) {
            this.discover();
        }
        else {
            this.moviesDetails = this.modalDService.moviesList;
            this.moviesDetailsAll = this.modalDService.moviesList;
        }
        if (!this.tmdbService.isGenresExists())
            this.tmdbService.getMovieGenres(this.paramsGenreList).subscribe(function (genres) {
                _this.tmdbService.setGenreList(genres);
                _this.newMovieDetails['genres'] = new Array();
                _this.getGeners();
                _this.setDropDList();
                _this.setDropDown();
            });
        this.newMForm = this.formBuilder.group({
            filmName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('[a-zA-Z ]*')]],
            id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            year: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            runTime: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].email]],
            genre: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6)]],
            director: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        }, {});
    };
    MoviesComponent.prototype.discover = function () {
        var _this = this;
        if (this.page === 1 || this.tmdbService.currentPage <= Number(this.discList.total_pages)) {
            this.tmdbService.getMovieDiscover(this.language, this.orderBy, this.tmdbService.currentPage).subscribe(function (movies) {
                _this.discList = movies;
                _this.movies = _this.discList.results;
                _this.movies.forEach(function (movie) {
                    _this.getMoviesDetails(movie);
                    _this.getMovieCredits(movie.id);
                });
                _this.tmdbService.currentPage += 1;
            });
        }
        this.modalDService.moviesList = this.moviesDetailsAll;
    };
    MoviesComponent.prototype.getMoviesDetails = function (movie) {
        var _this = this;
        if (!localStorage.getItem(movie.title)) {
            this.tmdbService.getMovieDetails(movie).subscribe(function (details) {
                details.title = _this.filter.transform(details.title);
                _this.moviesDetails.push(details);
                _this.moviesDetailsAll.push(details);
                var relDate = _this.moviesDetails[_this.moviesDetails.length - 1].release_date;
                _this.moviesDetails[_this.moviesDetails.length - 1].release_date = relDate.slice(0, 4);
            });
        }
    };
    MoviesComponent.prototype.getMovieCredits = function (movieId) {
        var _this = this;
        this.tmdbService.getMovieCredits(movieId).subscribe(function (movieCredits) {
            _this.credit = movieCredits;
            if (_this.moviesDetails.filter(function (Movie) { return Movie.id === movieCredits.id; })[0] != undefined)
                _this.moviesDetails.filter(function (Movie) { return Movie.id === movieCredits.id; })[0].directorName =
                    _this.credit.crew.filter(function (Crew) { return Crew.job === 'Director'; })[0].name;
        });
    };
    MoviesComponent.prototype.counter = function (i) {
        return new Array(Math.trunc(Number(i) / 2));
    };
    MoviesComponent.prototype.restCounter = function (i) {
        return new Array(Math.trunc((10 - Number(i)) / 2) + 1);
    };
    MoviesComponent.prototype.open = function (movieD) {
        if (this.moviesDetails === undefined)
            this.moviesDetails = JSON.parse(sessionStorage.getItem('moviesList'));
        this.modalDService.movieDCopy = this.moviesDetails.filter(function (movie) { return movie.id == movieD; })[0];
        sessionStorage.setItem('moviesList', JSON.stringify(this.moviesDetailsAll));
        this.modalDService.moviesList = this.moviesDetailsAll;
        this.rt.navigate(['./movie-details']);
    };
    MoviesComponent.prototype.initialArr = function (arr) {
        arr.splice(0, arr.length);
    };
    MoviesComponent.prototype.load = function () {
        this.initialArr(this.moviesDetails);
        this.discover();
    };
    MoviesComponent.prototype.creatNewMovie = function (content) {
        var _this = this;
        this.setNewMovieId();
        this.modalService.open(content, { size: 'lg' });
        setTimeout(function () {
            sessionStorage.setItem('moviesList', JSON.stringify(_this.moviesDetailsAll));
        }, 1500);
    };
    MoviesComponent.prototype.setNewMovieId = function () {
        var movieId = 'HC' + this.tmdbService.newMovieId.toString();
        this.newMovieDetails['id'] = movieId;
    };
    MoviesComponent.prototype.getGeners = function () {
        var tempG = JSON.parse(sessionStorage.getItem('genresList'));
        for (var key in tempG) {
            this.genreList.push(key, tempG[key]);
        }
    };
    MoviesComponent.prototype.setDropDList = function () {
        for (var i = 0; i < this.genreList[1].length; i++) {
            this.dropdownList[i] = this.genreList[1][i];
        }
    };
    MoviesComponent.prototype.setDropDown = function () {
        this.dropdownSettings = {
            singleSelection: false,
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 4,
            allowSearchFilter: true,
            maxHeight: 800,
            disabled: false
        };
    };
    MoviesComponent.prototype.onItemDeSelect = function (item) {
        this.newMovieDetails['genres'] = this.newMovieDetails['genres'].filter(function (genre) { return genre.id != item.id; });
    };
    MoviesComponent.prototype.onSelectAll = function (items) {
        this.newMovieDetails['genres'] = this.dropdownList;
    };
    MoviesComponent.prototype.onDeSelectAll = function (items) {
        this.newMovieDetails['genres'].splice(0, this.newMovieDetails['genres'].length);
    };
    MoviesComponent.prototype.onItemSelect = function (item) {
        this.newMovieDetails['genres'].push(item);
    };
    MoviesComponent.prototype.validate = function (movie) {
        var isValid = !this.checkIfExist(movie) && (this.newMovieDetails['title'] != '' && this.newMovieDetails['title'] != undefined) &&
            (this.newMovieDetails['id'] != '' && this.newMovieDetails['id'] != undefined) &&
            (Number(this.newMovieDetails['year']) > 1000 && Number(this.newMovieDetails['year']) < 2020) &&
            Number(this.newMovieDetails['runTime']) > 0 && Number(this.newMovieDetails['runTime']) < 1000 &&
            (this.newMovieDetails['director'] != '' && this.newMovieDetails['director'] != undefined) &&
            this.newMovieDetails['genres'].length > 0 && this.isItAbcInput(this.newMovieDetails['title']);
        if (isValid) {
            return true;
        }
        return false;
    };
    MoviesComponent.prototype.checkIfExist = function (movieT) {
        var temp = JSON.parse(sessionStorage.getItem('moviesList'));
        if (temp.filter(function (movie) { return movie.title === movieT; })[0]) {
            this.isExistName = true;
            return this.isExistName;
        }
        else
            this.isExistName = false;
        return this.isExistName;
    };
    MoviesComponent.prototype.cancel = function () {
        for (var key in this.newMovieDetails) {
            if (key === 'genres') {
                this.newMovieDetails[key] = new Array();
            }
            else
                this.newMovieDetails[key] = '';
        }
        this.newMForm.reset();
        this.selectedItems.splice(0, this.selectedItems.length);
    };
    MoviesComponent.prototype.save = function () {
        var _this = this;
        var JSN = JSON.parse(sessionStorage.getItem('moviesList'));
        var jsnLn = JSN.length;
        var temp = {
            'title': this.filter.camel(this.newMovieDetails['title']),
            'release_date': this.newMovieDetails['year'],
            'id': this.newMovieDetails['id'],
            'directorName': this.newMovieDetails['director'],
            'poster_path': null,
            'vote_average': 5,
            'backdrop_path': null,
            'runtime': this.newMovieDetails['runTime'],
            'genres': this.newMovieDetails['genres']
        };
        JSN.push(temp);
        sessionStorage.setItem('moviesList', JSON.stringify(JSN));
        this.moviesDetailsAll = JSON.parse(sessionStorage.getItem('moviesList'));
        this.moviesDetails = this.moviesDetailsAll;
        this.modalDService.moviesList = JSON.parse(sessionStorage.getItem('moviesList'));
        setTimeout(function () { _this.cancel(); }, 1000);
    };
    MoviesComponent.prototype.isItAbcInput = function (input) {
        var letters = /^[A-Za-z]+$/;
        if (input.match(letters))
            return true;
        return false;
    };
    MoviesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-movies',
            template: __webpack_require__(/*! ./movies.component.html */ "./src/app/movies/movies.component.html"),
            styles: [__webpack_require__(/*! ./movies.component.css */ "./src/app/movies/movies.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_tmdb_service__WEBPACK_IMPORTED_MODULE_6__["TmdbService"], _services_modal_service__WEBPACK_IMPORTED_MODULE_7__["ModalDService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"]])
    ], MoviesComponent);
    return MoviesComponent;
}());



/***/ }),

/***/ "./src/app/services/modal.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/modal.service.ts ***!
  \*******************************************/
/*! exports provided: ModalDService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalDService", function() { return ModalDService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ModalDService = /** @class */ (function () {
    function ModalDService() {
        this._moviesList = new Array;
    }
    Object.defineProperty(ModalDService.prototype, "movieDCopy", {
        get: function () {
            return this._movieDCopy;
        },
        set: function (v) {
            this._movieD = JSON.parse(JSON.stringify(v));
            this._movieDCopy = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalDService.prototype, "moviesList", {
        get: function () {
            if (this._moviesList.length == 0)
                return JSON.parse(sessionStorage.getItem('moviesList'));
            else
                return JSON.parse(JSON.stringify(this._moviesList));
        },
        set: function (v) {
            var _this = this;
            if (this._movieD && this._moviesList.length != 0) {
                var tempList = JSON.parse(sessionStorage.getItem('moviesList'));
                this._moviesList = this._moviesList.filter(function (movie) { return movie.id !== _this._movieD.id; });
                this._moviesList.push(tempList.filter(function (movie) { return movie.id == _this._movieD.id; })[0]);
            }
            else {
                this._moviesList = v;
                sessionStorage.setItem('moviesList', JSON.stringify(this._moviesList));
            }
        },
        enumerable: true,
        configurable: true
    });
    ModalDService.prototype.deleteMovie = function (v) {
        this._moviesList.splice(this._moviesList.indexOf(v), 1);
        localStorage.setItem(v.title, v.id);
    };
    ModalDService.prototype.cancel = function () {
        var _this = this;
        this.moviesList = JSON.parse(sessionStorage.getItem('moviesList'));
        this._movieDCopy = this._movieD;
        return this.moviesList.filter(function (movie) { return movie.id == _this._movieDCopy.id; })[0];
    };
    ModalDService.prototype.saveList = function (movieD) {
        this._moviesList.filter(function (movie) { return movie.id == movieD.id; })[0] = JSON.parse(JSON.stringify(movieD));
        var tempMList = JSON.parse(sessionStorage.getItem('moviesList'));
        tempMList.filter(function (movie) { return movie.id == movieD.id; }).pop();
        tempMList.push(movieD);
        sessionStorage.setItem('moviesList', JSON.stringify(tempMList));
    };
    ModalDService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ModalDService);
    return ModalDService;
}());



/***/ }),

/***/ "./src/app/services/tmdb.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/tmdb.service.ts ***!
  \******************************************/
/*! exports provided: TmdbService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TmdbService", function() { return TmdbService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var TmdbService = /** @class */ (function () {
    function TmdbService(http) {
        this.http = http;
        this.api_key = '9ee82a95315c563b8d277066f4ee9201';
        this.url_discover = 'https://api.themoviedb.org/3/discover/movie?api_key=';
        this.url_movie = 'https://api.themoviedb.org/3/movie/';
        this.url_genre = 'https://api.themoviedb.org/3/genre/movie/list';
        this.url_credits = 'https://api.themoviedb.org/3/movie/';
        this._newMovieId = 1;
        this._currentPage = 1;
    }
    Object.defineProperty(TmdbService.prototype, "newMovieId", {
        get: function () {
            return this._newMovieId;
        },
        set: function (v) {
            this._newMovieId++;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TmdbService.prototype, "currentPage", {
        get: function () {
            return this._currentPage;
        },
        set: function (v) {
            this._currentPage = v;
        },
        enumerable: true,
        configurable: true
    });
    TmdbService.prototype.getMovieGenres = function (params) {
        return this.http.get(this.url_genre + '?api_key=' + this.api_key, { params: params }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError));
    };
    TmdbService.prototype.isGenresExists = function () {
        if (sessionStorage.getItem('genres'))
            return true;
        return false;
    };
    TmdbService.prototype.getMovieDiscover = function (lang, srt, p) {
        return this.http.get(this.url_discover + this.api_key + '&language=' + lang + '&sort_by=' + srt + '&include_adult=true&include_video=false&page=' + p).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError));
        ;
    };
    TmdbService.prototype.getMovieDetails = function (movie) {
        return this.http.get(this.url_movie + movie.id + '?api_key=' + this.api_key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError));
        ;
    };
    TmdbService.prototype.getMovieCredits = function (movieId) {
        return this.http.get(this.url_credits + movieId + '/credits?api_key=' + this.api_key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError));
        ;
    };
    TmdbService.prototype.isEOPage = function () {
        var pageButtom = document.documentElement.scrollHeight;
        if (window.pageYOffset + window.innerHeight >= pageButtom - (window.innerHeight / 2))
            return true;
        return false;
    };
    TmdbService.prototype.setGenreList = function (genreList) {
        sessionStorage.setItem('genresList', JSON.stringify(genreList));
    };
    TmdbService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = "Error: " + error.error.message;
        }
        else {
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(errorMessage);
    };
    TmdbService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TmdbService);
    return TmdbService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: true,
    firebase: { apiKey: "AIzaSyCw3zrWqz_BqNFj646j8KjO0kb3Fsg1ocs",
        authDomain: "herolo-9510d.firebaseapp.com",
        databaseURL: "https://herolo-9510d.firebaseio.com",
        projectId: "herolo-9510d",
        storageBucket: "herolo-9510d.appspot.com",
        messagingSenderId: "56526480519"
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\hagos\Desktop\Portfolio\Cinema\HeroloCinema\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map