// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/crocks/core/implements.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var fulfills =
  function (algs) { return function (test) { return algs.indexOf(test) !== -1; }; }

module.exports = fulfills

},{}],"../node_modules/crocks/core/isArray.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

function isArray(x) {
  return Array.isArray(x)
}

module.exports = isArray

},{}],"../node_modules/crocks/core/isFunction.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// isFunction : a -> Boolean
function isFunction(fn) {
  return typeof fn === 'function'
}

module.exports = isFunction

},{}],"../node_modules/crocks/core/isObject.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var toString = Object.prototype.toString

// isObject : a -> Boolean
function isObject(x) {
  return !!x
    && toString.call(x) === '[object Object]'
}

module.exports = isObject

},{}],"../node_modules/crocks/core/isString.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// isString : a -> Boolean
function isString(x) {
  return typeof x === 'string'
}

module.exports = isString

},{}],"../node_modules/crocks/core/isSymbol.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Robert Pearce (rpearce) */

// isSymbol : a -> Boolean
function isSymbol(x) {
  return typeof x === 'symbol'
}

module.exports = isSymbol

},{}],"../node_modules/crocks/core/inspect.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isArray = require('./isArray')
var isFunction = require('./isFunction')
var isObject = require('./isObject')
var isString = require('./isString')
var isSymbol = require('./isSymbol')

function arrayInspect(xs) {
  return xs.length
    ? xs.map(inspect).reduce(function (a, x) { return a + ',' + x; })
    : xs
}

// inspect : a -> String
function inspect(x) {
  if(x && isFunction(x.inspect)) {
    return (" " + (x.inspect()))
  }

  if(isFunction(x)) {
    return ' Function'
  }

  if(isArray(x)) {
    return (" [" + (arrayInspect(x)) + " ]")
  }

  if(isObject(x)) {
    return (" { " + (Object.keys(x).reduce(function (acc, key) {
      return acc.concat([ (key + ":" + (inspect(x[key]))) ])
    }, []).join(', ')) + " }")
  }

  if(isString(x)) {
    return (" \"" + x + "\"")
  }

  if(isSymbol(x)) {
    return (" " + (x.toString()))
  }

  return (" " + x)
}

module.exports = inspect

},{"./isArray":"../node_modules/crocks/core/isArray.js","./isFunction":"../node_modules/crocks/core/isFunction.js","./isObject":"../node_modules/crocks/core/isObject.js","./isString":"../node_modules/crocks/core/isString.js","./isSymbol":"../node_modules/crocks/core/isSymbol.js"}],"../node_modules/crocks/core/types.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var _types = {
  'unk': function () { return 'unknown'; },
  'All': function () { return 'All'; },
  'Any': function () { return 'Any'; },
  'Arrow': function () { return 'Arrow'; },
  'Assign': function () { return 'Assign'; },
  'Async': function () { return 'Async'; },
  'Const': function (inner) { return ("Const(" + inner + ")"); },
  'Either': function () { return 'Either'; },
  'Endo': function () { return 'Endo'; },
  'Equiv': function () { return 'Equiv'; },
  'First': function () { return 'First'; },
  'Identity': function () { return 'Identity'; },
  'IO': function () { return 'IO'; },
  'Last': function () { return 'Last'; },
  'List': function () { return 'List'; },
  'Max': function () { return 'Max'; },
  'Maybe': function () { return 'Maybe'; },
  'Min': function () { return 'Min'; },
  'Pair': function () { return 'Pair'; },
  'Pred': function () { return 'Pred'; },
  'Prod': function () { return 'Prod'; },
  'Reader': function () { return 'Reader'; },
  'Result': function () { return 'Result'; },
  'Star': function () { return 'Star'; },
  'State': function () { return 'State'; },
  'Sum': function () { return 'Sum'; },
  'Tuple': function (n) { return (n + "-Tuple"); },
  'Unit': function () { return 'Unit'; },
  'Writer': function () { return 'Writer'; }
}

var type =
  function (type) { return _types[type] || _types['unk']; }

var proxy =
  function (t, ctx) { return ({ type: function () { return type(t)(ctx); } }); }

var typeFn = function (t, ver, ctx) {
  var typeStr = type(t)(ctx)
  return ("crocks/" + typeStr + "@" + (ver || 0))
}

module.exports = {
  proxy: proxy, type: type, typeFn: typeFn
}

},{}],"../node_modules/crocks/core/flNames.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports = {
  alt: 'fantasy-land/alt',
  bimap: 'fantasy-land/bimap',
  chain: 'fantasy-land/chain',
  compose: 'fantasy-land/compose',
  concat: 'fantasy-land/concat',
  contramap: 'fantasy-land/contramap',
  empty: 'fantasy-land/empty',
  equals: 'fantasy-land/equals',
  extend: 'fantasy-land/extend',
  id: 'fantasy-land/id',
  map: 'fantasy-land/map',
  of: 'fantasy-land/of',
  promap: 'fantasy-land/promap',
  reduce: 'fantasy-land/reduce',
  zero: 'fantasy-land/zero'
}

},{}],"../node_modules/crocks/core/curry.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = require('./isFunction')

function applyCurry(fn, arg) {
  if(!isFunction(fn)) { return fn }
  return fn.length > 1 ? fn.bind(null, arg) : fn.call(null, arg)
}

// curry : ((a, b, c) -> d) -> a -> b -> c -> d
function curry(fn) {
  return function() {
    var xs = [], len = arguments.length;
    while ( len-- ) xs[ len ] = arguments[ len ];

    var args =
      xs.length ? xs : [ undefined ]

    if(args.length < fn.length) {
      return curry(Function.bind.apply(fn, [ null ].concat(args)))
    }

    var val = args.length === fn.length
      ? fn.apply(null, args)
      : args.reduce(applyCurry, fn)

    if(isFunction(val)) {
      return curry(val)
    }

    return val
  }
}

module.exports = curry

},{"./isFunction":"../node_modules/crocks/core/isFunction.js"}],"../node_modules/crocks/core/type.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = require('./isFunction')

function type(x) {
  if(x) {
    if(isFunction(x.type)) {
      return x.type()
    }
  }
  return {}.toString.call(x).slice(8, -1)
}

module.exports = type

},{"./isFunction":"../node_modules/crocks/core/isFunction.js"}],"../node_modules/crocks/core/isSameType.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = require('./curry')
var isFunction = require('./isFunction')
var type = require('./type')

// isSameType :: Container m => (m, m) -> Boolean
function isSameType(x, y) {
  var tX = type(x)
  var tY = type(y)

  return tX === tY
    || isFunction(x) && x.name === tY
    || isFunction(y) && y.name === tX
}

module.exports = curry(isSameType)

},{"./curry":"../node_modules/crocks/core/curry.js","./isFunction":"../node_modules/crocks/core/isFunction.js","./type":"../node_modules/crocks/core/type.js"}],"../node_modules/crocks/core/isSame.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// isSame : (a, b) -> Boolean
function isSame(x, y) {
  if(x === y) {
    return x !== 0 || 1 / x === 1 / y
  }

  return x !== x && y !== y
}

module.exports = isSame

},{}],"../node_modules/crocks/core/hasAlg.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = require('./isFunction')
var fl = require('./flNames')

var check = function (alg, m) { return isFunction(m[fl[alg]]) || isFunction(m[alg]); }

var checkImpl = function (alg, m) { return isFunction(m['@@implements']) && !!m['@@implements'](alg); }

var hasAlg = function (alg, m) { return !!m && (check(alg, m) || checkImpl(alg, m)); }

module.exports = hasAlg

},{"./isFunction":"../node_modules/crocks/core/isFunction.js","./flNames":"../node_modules/crocks/core/flNames.js"}],"../node_modules/crocks/core/equals.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isSameType = require('./isSameType')
var isSame = require('./isSame')
var hasAlg = require('./hasAlg')
var type = require('./type')
var fl = require('./flNames')

var comp = function (a, b) { return a.valueOf() === b.valueOf(); }

var strats = {
  'Array': function (a, b) { return a.length === b.length
      && deepEquals(a, b); },

  'Date': function (a, b) { return isSame(a.valueOf(), b.valueOf()); },

  'Error': function (a, b) { return a.name === b.name
      && a.message === b.message; },

  'Object': function (a, b) { return Object.keys(a).length === Object.keys(b).length
      && deepEquals(a, b); },

  'RegExp': function (a, b) { return a.source === b.source
      && a.ignoreCase === b.ignoreCase
      && a.global === b.global
      && a.multiline === b.multiline
      && a.unicode === b.unicode; }
}

function deepEquals(a, b) {
  for(var key in a) {
    if(!equals(a[key], b[key])) {
      return false
    }
  }
  return true
}

function equals(a, b) {
  if(isSame(a, b)) {
    return true
  }

  if(!isSameType(a, b)) {
    return false
  }

  if(hasAlg('equals', a)) {
    return (b[fl.equals] || b.equals).call(b, a)
  }

  return (strats[type(a)] || comp)(a, b)
}

module.exports = equals

},{"./isSameType":"../node_modules/crocks/core/isSameType.js","./isSame":"../node_modules/crocks/core/isSame.js","./hasAlg":"../node_modules/crocks/core/hasAlg.js","./type":"../node_modules/crocks/core/type.js","./flNames":"../node_modules/crocks/core/flNames.js"}],"../node_modules/crocks/core/isFunctor.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = require('./hasAlg')

// isFunctor : a -> Boolean
function isFunctor(m) {
  return !!m && hasAlg('map', m)
}

module.exports = isFunctor

},{"./hasAlg":"../node_modules/crocks/core/hasAlg.js"}],"../node_modules/crocks/core/isApply.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = require('./hasAlg')
var isFunctor = require('./isFunctor')

// isApply : a -> Boolean
function isApply(m) {
  return isFunctor(m)
    && hasAlg('ap', m)
}

module.exports = isApply

},{"./hasAlg":"../node_modules/crocks/core/hasAlg.js","./isFunctor":"../node_modules/crocks/core/isFunctor.js"}],"../node_modules/crocks/core/isApplicative.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = require('./hasAlg')
var isApply = require('./isApply')

// isApplicative : a -> Boolean
function isApplicative(m) {
  return isApply(m)
    && (hasAlg('of', m) || hasAlg('of', m.constructor))
}

module.exports = isApplicative

},{"./hasAlg":"../node_modules/crocks/core/hasAlg.js","./isApply":"../node_modules/crocks/core/isApply.js"}],"../node_modules/crocks/core/isSemigroup.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isString = require('./isString')
var hasAlg = require('./hasAlg')

// isSemigroup : a -> Boolean
function isSemigroup(m) {
  return isString(m)
    || !!m && hasAlg('concat', m)
}

module.exports = isSemigroup

},{"./isString":"../node_modules/crocks/core/isString.js","./hasAlg":"../node_modules/crocks/core/hasAlg.js"}],"../node_modules/crocks/core/Pair.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 4

var _equals = require('./equals')
var _implements = require('./implements')
var _inspect = require('./inspect')
var type = require('./types').type('Pair')
var _type = require('./types').typeFn(type(), VERSION)
var fl = require('./flNames')

var isApplicative = require('./isApplicative')
var isApply = require('./isApply')
var isArray = require('./isArray')
var isFunction = require('./isFunction')
var isSameType = require('./isSameType')
var isSemigroup = require('./isSemigroup')

function Pair(l, r) {
  var obj;

  if(arguments.length < 2) {
    throw new TypeError('Pair: Must provide a first and second value')
  }

  var fst =
    function () { return l; }

  var snd =
    function () { return r; }

  var inspect =
    function () { return ("Pair(" + (_inspect(l)) + "," + (_inspect(r)) + " )"); }

  var toArray =
    function () { return [ l, r ]; }

  function merge(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('Pair.merge: Binary function required')
    }

    return fn(fst(), snd())
  }

  function equals(m) {
    return isSameType(Pair, m)
      && _equals(m.fst(), fst())
      && _equals(m.snd(), snd())
  }

  function concat(method) {
    return function(m) {
      if(!isSameType(Pair, m)) {
        throw new TypeError(("Pair." + method + ": Pair required"))
      }

      var lf = fst()
      var ls = snd()
      var rf = m.fst()
      var rs = m.snd()

      if(!(isSemigroup(lf) && isSemigroup(ls))) {
        throw new TypeError(("Pair." + method + ": Both Pairs must contain Semigroups of the same type"))
      }

      if(!(isSameType(lf, rf) && isSameType(ls, rs))) {
        throw new TypeError(("Pair." + method + ": Both Pairs must contain Semigroups of the same type"))
      }

      return Pair(
        lf.concat(rf),
        ls.concat(rs)
      )
    }
  }

  function swap(f, g) {
    if(!isFunction(f) || !isFunction(g)) {
      throw new TypeError('Pair.swap: Requires both left and right functions')
    }

    return Pair(g(r), f(l))
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Pair." + method + ": Function required"))
      }

      return Pair(l, fn(r))
    }
  }

  function bimap(method) {
    return function(f, g) {
      if(!isFunction(f) || !isFunction(g)) {
        throw new TypeError(("Pair." + method + ": Function required for both arguments"))
      }

      return Pair(f(l), g(r))
    }
  }

  function ap(m) {
    if(!isSameType(Pair, m)) {
      throw new TypeError('Pair.ap: Pair required')
    }

    var fn = snd()

    if(!isFunction(fn)) {
      throw new TypeError('Pair.ap: Function required for second value')
    }

    var l = fst()
    var r = m.fst()

    if(!(isSemigroup(l) && isSameType(l, r))) {
      throw new TypeError('Pair.ap: Semigroups of the same type is required for first values')
    }

    return Pair(l.concat(r), fn(m.snd()))
  }

  function chain(method) {
    return function(fn) {
      var l = fst()

      if(!isFunction(fn)) {
        throw new TypeError(("Pair." + method + ": Function required"))
      }

      if(!isSemigroup(l)) {
        throw new TypeError(("Pair." + method + ": Semigroups of the same type required for first values"))
      }

      var m = fn(snd())

      if(!isSameType(Pair, m)) {
        throw new TypeError(("Pair." + method + ": Function must return a Pair"))
      }

      var r = m.fst()

      if(!isSameType(l, r)) {
        throw new TypeError(("Pair." + method + ": Semigroups of the same type required for first values"))
      }

      return Pair(
        l.concat(r),
        m.snd()
      )
    }
  }

  function sequence(f) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Pair.sequence: Applicative TypeRep or Apply returning function required'
      )
    }

    if(!(isApply(r) || isArray(r))) {
      throw new TypeError(
        'Pair.sequence: Must wrap an Apply in the second'
      )
    }

    return r.map(function (v) { return Pair(l, v); })
  }

  function traverse(f, fn) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Pair.traverse: Applicative TypeRep or Apply returning function required for first argument'
      )
    }

    if(!isFunction(fn)) {
      throw new TypeError(
        'Pair.traverse: Apply returning function required for second argument'
      )
    }

    var m = fn(r)

    if(!(isApply(m) || isArray(m))) {
      throw new TypeError(
        'Pair.traverse: Both functions must return an Apply of the same type'
      )
    }

    return m.map(function (v) { return Pair(l, v); })
  }

  function extend(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Pair." + method + ": Function required"))
      }

      return Pair(l, fn(Pair(l, r)))
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect, fst: fst,
    snd: snd, toArray: toArray, type: type, merge: merge, equals: equals,
    swap: swap, ap: ap, sequence: sequence, traverse: traverse,
    concat: concat('concat'),
    map: map('map'),
    bimap: bimap('bimap'),
    chain: chain('chain'),
    extend: extend('extend')
  }, obj[fl.equals] = equals, obj[fl.concat] = concat(fl.concat), obj[fl.map] = map(fl.map), obj[fl.bimap] = bimap(fl.bimap), obj[fl.chain] = chain(fl.chain), obj[fl.extend] = extend(fl.extend), obj['@@type'] = _type, obj.constructor = Pair, obj )
}

Pair.type = type
Pair['@@type'] = _type

Pair['@@implements'] = _implements(
  [ 'ap', 'bimap', 'chain', 'concat', 'extend', 'equals', 'map', 'traverse' ]
)

module.exports = Pair

},{"./equals":"../node_modules/crocks/core/equals.js","./implements":"../node_modules/crocks/core/implements.js","./inspect":"../node_modules/crocks/core/inspect.js","./types":"../node_modules/crocks/core/types.js","./flNames":"../node_modules/crocks/core/flNames.js","./isApplicative":"../node_modules/crocks/core/isApplicative.js","./isApply":"../node_modules/crocks/core/isApply.js","./isArray":"../node_modules/crocks/core/isArray.js","./isFunction":"../node_modules/crocks/core/isFunction.js","./isSameType":"../node_modules/crocks/core/isSameType.js","./isSemigroup":"../node_modules/crocks/core/isSemigroup.js"}],"../node_modules/crocks/core/Unit.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = require('./implements')
var type = require('./types').type('Unit')
var _type = require('./types').typeFn(type(), VERSION)
var fl = require('./flNames')

var isFunction = require('./isFunction')
var isSameType = require('./isSameType')

var _of =
  Unit

var _empty =
  Unit

function Unit() {
  var obj;

  var equals =
    function (m) { return isSameType(Unit, m); }

  var inspect =
    function () { return '()'; }

  var valueOf =
    function () { return undefined; }

  var of =
    _of

  var empty =
    _empty

  function concat(method) {
    return function(m) {
      if(!isSameType(Unit, m)) {
        throw new TypeError(("Unit." + method + ": Unit required"))
      }

      return Unit()
    }
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Unit." + method + ": Function required"))
      }

      return Unit()
    }
  }

  function ap(m) {
    if(!isSameType(Unit, m)) {
      throw new TypeError('Unit.ap: Unit required')
    }

    return Unit()
  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Unit." + method + ": Function required"))
      }

      return Unit()
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect, valueOf: valueOf,
    type: type, equals: equals, empty: empty, ap: ap, of: of,
    concat: concat('concat'),
    map: map('map'),
    chain: chain('chain')
  }, obj[fl.of] = of, obj[fl.empty] = empty, obj[fl.equals] = equals, obj[fl.concat] = concat(fl.concat), obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = Unit, obj )
}

Unit.of = _of
Unit.empty = _empty
Unit.type = type

Unit[fl.of] = _of
Unit[fl.empty] = _empty
Unit['@@type'] = _type

Unit['@@implements'] = _implements(
  [ 'ap', 'chain', 'concat', 'empty', 'equals', 'map', 'of' ]
)

module.exports = Unit

},{"./implements":"../node_modules/crocks/core/implements.js","./types":"../node_modules/crocks/core/types.js","./flNames":"../node_modules/crocks/core/flNames.js","./isFunction":"../node_modules/crocks/core/isFunction.js","./isSameType":"../node_modules/crocks/core/isSameType.js"}],"../node_modules/crocks/State/index.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = require('../core/implements')
var _inspect = require('../core/inspect')
var type = require('../core/types').type('State')
var _type = require('../core/types').typeFn(type(), VERSION)
var fl = require('../core/flNames')

var Pair = require('../core/Pair')
var Unit = require('../core/Unit')

var isFunction = require('../core/isFunction')
var isSameType = require('../core/isSameType')

var _of =
  function (x) { return State(function (s) { return Pair(x, s); }); }

function get(fn) {
  if(!arguments.length) {
    return State(function (s) { return Pair(s, s); })
  }

  if(isFunction(fn)) {
    return State(function (s) { return Pair(fn(s), s); })
  }

  throw new TypeError('State.get: No arguments or function required')
}

function modify(fn) {
  if(!isFunction(fn)) {
    throw new TypeError('State.modify: Function Required')
  }

  return State(function (s) { return Pair(Unit(), fn(s)); })
}

function State(fn) {
  var obj;

  if(!isFunction(fn)) {
    throw new TypeError('State: Must wrap a function in the form (s -> Pair a s)')
  }

  var of =
    _of

  var inspect =
    function () { return ("State" + (_inspect(fn))); }

  function runWith(state) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var func = params[0]; if ( func === void 0 ) func = 'runWith';
    var m = fn(state)

    if(!isSameType(Pair, m)) {
      throw new TypeError(("State." + func + ": Must wrap a function in the form (s -> Pair a s)"))
    }

    return m
  }

  function execWith(s) {
    var pair = runWith(s, 'execWith')
    return pair.snd()
  }

  function evalWith(s) {
    var pair = runWith(s, 'evalWith')
    return pair.fst()
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("State." + method + ": Function required"))
      }

      return State(function (s) {
        var m = runWith(s, method)
        return Pair(fn(m.fst()), m.snd())
      })
    }
  }

  function ap(m) {
    if(!isSameType(State, m)) {
      throw new TypeError('State.ap: State required')
    }

    return State(function (s) {
      var pair = runWith(s, 'ap')
      var fn = pair.fst()

      if(!isFunction(fn)) {
        throw new TypeError('State.ap: Source value must be a function')
      }

      return m.map(fn).runWith(pair.snd())
    })
  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("State." + method + ": State returning function required"))
      }

      return State(function (s) {
        var pair = runWith(s, method)
        var m = fn(pair.fst())

        if(!isSameType(State, m)) {
          throw new TypeError(("State." + method + ": Function must return another State"))
        }

        return m.runWith(pair.snd())
      })
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect, runWith: runWith,
    execWith: execWith, evalWith: evalWith, type: type, ap: ap, of: of,
    map: map('map'),
    chain: chain('chain')
  }, obj[fl.of] = of, obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = State, obj )
}

State.of = _of
State.get = get

State.modify = modify

State.put =
  function (x) { return modify(function () { return x; }); }

State.type = type

State[fl.of] = _of
State['@@type'] = _type

State['@@implements'] = _implements(
  [ 'ap', 'chain', 'map', 'of' ]
)

module.exports = State

},{"../core/implements":"../node_modules/crocks/core/implements.js","../core/inspect":"../node_modules/crocks/core/inspect.js","../core/types":"../node_modules/crocks/core/types.js","../core/flNames":"../node_modules/crocks/core/flNames.js","../core/Pair":"../node_modules/crocks/core/Pair.js","../core/Unit":"../node_modules/crocks/core/Unit.js","../core/isFunction":"../node_modules/crocks/core/isFunction.js","../core/isSameType":"../node_modules/crocks/core/isSameType.js"}],"../node_modules/crocks/helpers/curry.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var _curry = require('../core/curry')
var isFunction = require('../core/isFunction')

// curry : ((a, b, c) -> d) -> a -> b -> c -> d
function curry(fn) {
  if(!isFunction(fn)) {
    throw new TypeError('curry: Function required')
  }

  return _curry(fn)
}

module.exports = curry

},{"../core/curry":"../node_modules/crocks/core/curry.js","../core/isFunction":"../node_modules/crocks/core/isFunction.js"}],"../node_modules/crocks/helpers/compose.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = require('../core/isFunction')

var err = 'compose: Functions required'

function applyPipe(f, g) {
  if(!isFunction(g)) {
    throw new TypeError(err)
  }

  return function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return g.call(null, f.apply(null, args));
  }
}

// compose : ((y -> z), (x -> y), ..., (a -> b)) -> a -> z
function compose() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  if(!arguments.length) {
    throw new TypeError(err)
  }

  var fns =
    args.slice().reverse()

  var head =
    fns[0]

  if(!isFunction(head)) {
    throw new TypeError(err)
  }

  var tail =
    fns.slice(1).concat(function (x) { return x; })

  return tail.reduce(applyPipe, head)
}

module.exports = compose

},{"../core/isFunction":"../node_modules/crocks/core/isFunction.js"}],"../node_modules/crocks/core/isNil.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// isNil : a -> Boolean
function isNil(x) {
  return x === undefined
    || x === null
    || Number.isNaN(x)
}

module.exports = isNil

},{}],"../node_modules/crocks/helpers/mapProps.js":[function(require,module,exports) {
/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = require('../core/curry')
var isObject = require('../core/isObject')
var isFunction = require('../core/isFunction')
var isNil = require('../core/isNil')

// applyMap :: ({ (* -> *) }, Object) -> (Object , String) -> Object
var applyMap = function (fns, obj) { return function(acc, key) {
    var obj$1, obj$2, obj$3;

    if(isNil(fns[key])) {
      return Object.assign({}, acc, ( obj$1 = {}, obj$1[key] = obj[key], obj$1 ))
    }

    if(isObject(fns[key])) {
      return Object.assign({}, acc, ( obj$2 = {}, obj$2[key] = isObject(obj[key]) ? mapProps(fns[key], obj[key]) : obj[key], obj$2 ))
    }

    if(!isFunction(fns[key])) {
      throw new TypeError('mapProps: Object of functions required for first argument')
    }

    return Object.assign({}, acc, ( obj$3 = {}, obj$3[key] = fns[key](obj[key]), obj$3 ))
  }; }

// mapProps :: { (* -> *) } -> Object -> Object
function mapProps(fns, obj) {
  if(!(isObject(fns) && isObject(obj))) {
    throw new TypeError('mapProps: Objects required for both arguments')
  }

  return Object.keys(obj)
    .reduce(applyMap(fns, obj), {})
}

module.exports = curry(mapProps)

},{"../core/curry":"../node_modules/crocks/core/curry.js","../core/isObject":"../node_modules/crocks/core/isObject.js","../core/isFunction":"../node_modules/crocks/core/isFunction.js","../core/isNil":"../node_modules/crocks/core/isNil.js"}],"data/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.over = exports.clampAfter = exports.clamp = exports.dec = exports.inc = void 0;

var _State = _interopRequireDefault(require("crocks/State"));

var _curry = _interopRequireDefault(require("crocks/helpers/curry"));

var _compose = _interopRequireDefault(require("crocks/helpers/compose"));

var _mapProps = _interopRequireDefault(require("crocks/helpers/mapProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var modify = _State.default.modify; // inc :: Number -> Number

var inc = function inc(x) {
  return x += 1;
}; // dec :: Number -> Number


exports.inc = inc;

var dec = function dec(x) {
  return x -= 1;
}; // clamp :: (Number, Number) -> Number -> Number


exports.dec = dec;

var clamp = function clamp(min, max) {
  return function (x) {
    return Math.min(Math.max(min, x), max);
  };
}; // clampAfter :: Number -> Number -> (a -> Number) -> a -> Number


exports.clamp = clamp;
var clampAfter = (0, _curry.default)(function (min, max, fn) {
  return (0, _compose.default)(clamp(min, max), fn);
}); // over :: (String, (a -> b)) -> Object -> State Object ()

exports.clampAfter = clampAfter;

var over = function over(key, fn) {
  return modify((0, _mapProps.default)(_defineProperty({}, key, fn)));
};

exports.over = over;
},{"crocks/State":"../node_modules/crocks/State/index.js","crocks/helpers/curry":"../node_modules/crocks/helpers/curry.js","crocks/helpers/compose":"../node_modules/crocks/helpers/compose.js","crocks/helpers/mapProps":"../node_modules/crocks/helpers/mapProps.js"}],"data/model/answer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incMoves = exports.decLeft = void 0;

var _helpers = require("../helpers");

// limitMoves :: (a -> Number) -> a -> Number
var limitMoves = (0, _helpers.clampAfter)(0, 8); // decLeft :: () -> State AppState ()

var decLeft = function decLeft() {
  return (0, _helpers.over)('left', limitMoves(_helpers.dec));
}; // incMoves :: () -> State AppState ()


exports.decLeft = decLeft;

var incMoves = function incMoves() {
  return (0, _helpers.over)('moves', limitMoves(_helpers.inc));
};

exports.incMoves = incMoves;
},{"../helpers":"data/helpers.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _answer = require("./data/model/answer");

var state = {
  'left': 8,
  'moves': 0
};
console.log((0, _answer.decLeft)().chain(_answer.incMoves).execWith(state));
},{"./data/model/answer":"data/model/answer.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35255" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/redux-and-the-state-adt.e31bb0bc.map