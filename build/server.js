/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/***/ ((module) => {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  module.exports.default = module.exports, module.exports.__esModule = true;
  return _extends.apply(this, arguments);
}

module.exports = _extends;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/cache/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Middleware.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Parser.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/cache/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");





var last = function last(arr) {
  return arr.length ? arr[arr.length - 1] : null;
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      case 0:
        // &\f
        if (character === 38 && (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.identifier)(stylis__WEBPACK_IMPORTED_MODULE_3__.position - 1);
        break;

      case 2:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.delimit)(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_4__.from)(character);
    }
  } while (character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)());

  return parsed;
};

var getRules = function getRules(value, points) {
  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.dealloc)(toRules((0,stylis__WEBPACK_IMPORTED_MODULE_3__.alloc)(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // .length indicates if this rule contains pseudo or not
  !element.length) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return !!element && element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule') return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses && cache.compat !== true) {
      var prevElement = index > 0 ? children[index - 1] : null;

      if (prevElement && isIgnoringComment(last(prevElement.children))) {
        return;
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

var isBrowser = typeof document !== 'undefined';
var getServerStylisCache = isBrowser ? undefined : (0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__.default)(function () {
  return (0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__.default)(function () {
    var cache = {};
    return function (name) {
      return cache[name];
    };
  });
});
var defaultStylisPlugins = [stylis__WEBPACK_IMPORTED_MODULE_5__.prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if ( true && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if (isBrowser && key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to

    Array.prototype.forEach.call(ssrStyles, function (node) {
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;
  var nodesToHydrate = [];

  if (isBrowser) {
    container = options.container || document.head;
    Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' ');

      if (attrib[0] !== key) {
        return;
      } // $FlowFixMe


      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (true) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  if (isBrowser) {
    var currentSheet;
    var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_6__.stringify,  true ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_7__.COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : 0];
    var serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_5__.middleware)(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_8__.compile)(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if ( true && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  } else {
    var _finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_6__.stringify];

    var _serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_5__.middleware)(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));

    var _stylis = function _stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_8__.compile)(styles), _serializer);
    }; // $FlowFixMe


    var serverStylisCache = getServerStylisCache(stylisPlugins)(key);

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        if ( // using === development instead of !== production
        // because if people do ssr in tests, the source maps showing up would be annoying
         true && serialized.map !== undefined) {
          return rules + serialized.map;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCache);


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleSheet": () => (/* binding */ StyleSheet)
/* harmony export */ });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (true) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if ( true && !/:(-moz-placeholder|-ms-input-placeholder|-moz-read-write|-moz-read-only){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/hash/dist/hash.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/hash.esm.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (murmur2);


/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-element-547f2a0a.esm.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-element-547f2a0a.esm.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ CacheProvider),
/* harmony export */   "E": () => (/* binding */ Emotion),
/* harmony export */   "T": () => (/* binding */ ThemeContext),
/* harmony export */   "a": () => (/* binding */ ThemeProvider),
/* harmony export */   "b": () => (/* binding */ withTheme),
/* harmony export */   "c": () => (/* binding */ createEmotionProps),
/* harmony export */   "h": () => (/* binding */ hasOwnProperty),
/* harmony export */   "i": () => (/* binding */ isBrowser),
/* harmony export */   "u": () => (/* binding */ useTheme),
/* harmony export */   "w": () => (/* binding */ withEmotionCache)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.mjs");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.esm.js");
/* harmony import */ var _isolated_hoist_non_react_statics_do_not_use_this_in_your_code_dist_emotion_react_isolated_hoist_non_react_statics_do_not_use_this_in_your_code_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.esm.js */ "./node_modules/@emotion/react/isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/react/node_modules/@emotion/serialize/dist/emotion-serialize.esm.js");








var isBrowser = typeof document !== 'undefined';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */(0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__.default)({
  key: 'css'
}) : null);
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
    // the cache will never be null in the browser
    var cache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

if (!isBrowser) {
  withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      var cache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);

      if (cache === null) {
        // yes, we're potentially creating this on every render
        // it doesn't actually matter though since it's only on the server
        // so there will only every be a single render
        // that could change in the future because of suspense and etc. but for now,
        // this works and i don't want to optimise for a future thing that we aren't sure about
        cache = (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__.default)({
          key: 'css'
        });
        return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(EmotionCacheContext.Provider, {
          value: cache
        }, func(props, cache));
      } else {
        return func(props, cache);
      }
    };
  };
}

var ThemeContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
var useTheme = function useTheme() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if ( true && (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }

    return mergedTheme;
  }

  if ( true && (theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__.default)({}, outerTheme, {}, theme);
};

var createCacheWithTheme = /* #__PURE__ */(0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__.default)(function (outerTheme) {
  return (0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__.default)(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__.default)({
      theme: theme,
      ref: ref
    }, props));
  }; // $FlowFixMe


  var WithTheme = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return (0,_isolated_hoist_non_react_statics_do_not_use_this_in_your_code_dist_emotion_react_isolated_hoist_non_react_statics_do_not_use_this_in_your_code_esm_js__WEBPACK_IMPORTED_MODULE_6__.default)(WithTheme, Component);
}

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if ( true && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type;

  if (true) {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  return newProps;
};
var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.getRegisteredStyles)(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)(registeredStyles, undefined, typeof cssProp === 'function' || Array.isArray(cssProp) ? (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext) : undefined);

  if ( true && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.insertStyles)(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(type, newProps);

  if (!isBrowser && rules !== undefined) {
    var _ref;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", (_ref = {}, _ref["data-emotion"] = cache.key + " " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
  }

  return ele;
});

if (true) {
  Emotion.displayName = 'EmotionCssPropInternal';
}




/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-react.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-react.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheProvider": () => (/* reexport safe */ _emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.C),
/* harmony export */   "ThemeContext": () => (/* reexport safe */ _emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.T),
/* harmony export */   "ThemeProvider": () => (/* reexport safe */ _emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.a),
/* harmony export */   "useTheme": () => (/* reexport safe */ _emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.u),
/* harmony export */   "withEmotionCache": () => (/* reexport safe */ _emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.w),
/* harmony export */   "withTheme": () => (/* reexport safe */ _emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.b),
/* harmony export */   "ClassNames": () => (/* binding */ ClassNames),
/* harmony export */   "Global": () => (/* binding */ Global),
/* harmony export */   "createElement": () => (/* binding */ jsx),
/* harmony export */   "css": () => (/* binding */ css),
/* harmony export */   "jsx": () => (/* binding */ jsx),
/* harmony export */   "keyframes": () => (/* binding */ keyframes)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.mjs");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.esm.js");
/* harmony import */ var _emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emotion-element-547f2a0a.esm.js */ "./node_modules/@emotion/react/dist/emotion-element-547f2a0a.esm.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/react/node_modules/@emotion/serialize/dist/emotion-serialize.esm.js");
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/react/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js");












var pkg = {
	name: "@emotion/react",
	version: "11.1.5",
	main: "dist/emotion-react.cjs.js",
	module: "dist/emotion-react.esm.js",
	browser: {
		"./dist/emotion-react.cjs.js": "./dist/emotion-react.browser.cjs.js",
		"./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
	},
	types: "types/index.d.ts",
	files: [
		"src",
		"dist",
		"jsx-runtime",
		"jsx-dev-runtime",
		"isolated-hoist-non-react-statics-do-not-use-this-in-your-code",
		"types/*.d.ts",
		"macro.js",
		"macro.d.ts",
		"macro.js.flow"
	],
	sideEffects: false,
	author: "mitchellhamilton <mitchell@mitchellhamilton.me>",
	license: "MIT",
	scripts: {
		"test:typescript": "dtslint types"
	},
	dependencies: {
		"@babel/runtime": "^7.7.2",
		"@emotion/cache": "^11.1.3",
		"@emotion/serialize": "^1.0.0",
		"@emotion/sheet": "^1.0.1",
		"@emotion/utils": "^1.0.0",
		"@emotion/weak-memoize": "^0.2.5",
		"hoist-non-react-statics": "^3.3.1"
	},
	peerDependencies: {
		"@babel/core": "^7.0.0",
		react: ">=16.8.0"
	},
	peerDependenciesMeta: {
		"@babel/core": {
			optional: true
		},
		"@types/react": {
			optional: true
		}
	},
	devDependencies: {
		"@babel/core": "^7.7.2",
		"@emotion/css": "11.1.3",
		"@emotion/css-prettifier": "1.0.0",
		"@emotion/server": "11.0.0",
		"@emotion/styled": "11.1.5",
		"@types/react": "^16.9.11",
		dtslint: "^0.3.0",
		"html-tag-names": "^1.1.2",
		react: "16.14.0",
		"svg-tag-names": "^1.1.1"
	},
	repository: "https://github.com/emotion-js/emotion/tree/master/packages/react",
	publishConfig: {
		access: "public"
	},
	"umd:main": "dist/emotion-react.umd.min.js",
	preconstruct: {
		entrypoints: [
			"./index.js",
			"./jsx-runtime.js",
			"./jsx-dev-runtime.js",
			"./isolated-hoist-non-react-statics-do-not-use-this-in-your-code.js"
		],
		umdName: "emotionReact"
	}
};

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.h.call(props, 'css')) {
    // $FlowFixMe
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = _emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.E;
  createElementArgArray[1] = (0,_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.c)(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(null, createElementArgArray);
};

var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */(0,_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  if ( true && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;
  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)([styles], undefined, typeof styles === 'function' || Array.isArray(styles) ? (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.T) : undefined);

  if (!_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.i) {
    var _ref;

    var serializedNames = serialized.name;
    var serializedStyles = serialized.styles;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      serializedStyles += next.styles;
      next = next.next;
    }

    var shouldCache = cache.compat === true;
    var rules = cache.insert("", {
      name: serializedNames,
      styles: serializedStyles
    }, cache.sheet, shouldCache);

    if (shouldCache) {
      return null;
    }

    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref));
  } // yes, i know these hooks are used conditionally
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(function () {
    var key = cache.key + "-global";
    var sheet = new _emotion_sheet__WEBPACK_IMPORTED_MODULE_8__.StyleSheet({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    }); // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      sheet.hydrate([node]);
    }

    sheetRef.current = sheet;
    return function () {
      sheet.flush();
    };
  }, [cache]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(function () {
    if (serialized.next !== undefined) {
      // insert keyframes
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serialized.next, true);
    }

    var sheet = sheetRef.current;

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

if (true) {
  Global.displayName = 'EmotionGlobal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if ( true && arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.getRegisteredStyles)(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = /* #__PURE__ */(0,_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  var rules = '';
  var serializedHashes = '';
  var hasRendered = false;

  var css = function css() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args, cache.registered);

    if (_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.i) {
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serialized, false);
    } else {
      var res = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serialized, false);

      if (res !== undefined) {
        rules += res;
      }
    }

    if (!_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.i) {
      serializedHashes += " " + serialized.name;
    }

    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.T)
  };
  var ele = props.children(content);
  hasRendered = true;

  if (!_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_2__.i && rules.length !== 0) {
    var _ref;

    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", (_ref = {}, _ref["data-emotion"] = cache.key + " " + serializedHashes.substring(1), _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
  }

  return ele;
});

if (true) {
  ClassNames.displayName = 'EmotionClassNames';
}

if (true) {
  var isBrowser = typeof document !== 'undefined'; // #1727 for some reason Jest evaluates modules twice if some consuming module gets mocked with jest.mock

  var isJest = typeof jest !== 'undefined';

  if (isBrowser && !isJest) {
    var globalContext = isBrowser ? window : global;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";

    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }

    globalContext[globalKey] = true;
  }
}




/***/ }),

/***/ "./node_modules/@emotion/react/isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.esm.js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.esm.js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__);


// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = (function (targetComponent, sourceComponent) {
  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default()(targetComponent, sourceComponent);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hoistNonReactStatics);


/***/ }),

/***/ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fragment": () => (/* binding */ Fragment),
/* harmony export */   "jsx": () => (/* binding */ jsx),
/* harmony export */   "jsxs": () => (/* binding */ jsxs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.mjs");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.esm.js");
/* harmony import */ var _dist_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../dist/emotion-element-547f2a0a.esm.js */ "./node_modules/@emotion/react/dist/emotion-element-547f2a0a.esm.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/react/node_modules/@emotion/serialize/dist/emotion-serialize.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/preact/compat/jsx-runtime.js");











var Fragment = react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment;
function jsx(type, props, key) {
  if (!_dist_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_8__.h.call(props, 'css')) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(type, props, key);
  }

  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_dist_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_8__.E, (0,_dist_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_8__.c)(type, props), key);
}
function jsxs(type, props, key) {
  if (!_dist_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_8__.h.call(props, 'css')) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(type, props, key);
  }

  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_dist_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_8__.E, (0,_dist_emotion_element_547f2a0a_esm_js__WEBPACK_IMPORTED_MODULE_8__.c)(type, props), key);
}




/***/ }),

/***/ "./node_modules/@emotion/react/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@emotion/react/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/react/node_modules/@emotion/serialize/dist/emotion-serialize.esm.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/node_modules/@emotion/serialize/dist/emotion-serialize.esm.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serializeStyles": () => (/* binding */ serializeStyles)
/* harmony export */ });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/hash.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/unitless.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/react/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");




var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__.default)(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__.default[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = (0,_emotion_hash__WEBPACK_IMPORTED_MODULE_0__.default)(styles) + identifierName;

  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};




/***/ }),

/***/ "./node_modules/@emotion/react/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@emotion/react/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleSheet": () => (/* binding */ StyleSheet)
/* harmony export */ });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (true) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if ( true && !/:(-moz-placeholder|-ms-input-placeholder|-moz-read-write|-moz-read-only){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.esm.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.esm.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": () => (/* binding */ getRegisteredStyles),
/* harmony export */   "insertStyles": () => (/* binding */ insertStyles)
/* harmony export */ });
var isBrowser = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      if (!isBrowser && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};




/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/unitless.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/unitless.esm.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unitlessKeys);


/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/weak-memoize.esm.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weakMemoize);


/***/ }),

/***/ "./src/web/components/ArticleCell.tsx":
/*!********************************************!*\
  !*** ./src/web/components/ArticleCell.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArticleCellType": () => (/* binding */ ArticleCellType),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.esm.js");
/* harmony import */ var _design_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../design/theme */ "./src/web/design/theme.ts");
/* harmony import */ var _design_typography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../design/typography */ "./src/web/design/typography.ts");
/* harmony import */ var _AspectRatioBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AspectRatioBox */ "./src/web/components/AspectRatioBox.tsx");
/* harmony import */ var _LinkArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LinkArea */ "./src/web/components/LinkArea.tsx");
/* harmony import */ var _LiveBadge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LiveBadge */ "./src/web/components/LiveBadge.tsx");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }









let ArticleCellType;

(function (ArticleCellType) {
  ArticleCellType["Default"] = "default";
  ArticleCellType["Compact"] = "compact";
})(ArticleCellType || (ArticleCellType = {}));

const containerStyles =  false ? 0 : {
  name: "15sq7p6-containerStyles",
  styles: "position:relative;label:containerStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxBcnRpY2xlQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkIyQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQXJ0aWNsZUNlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQge1xyXG4gIGdlbmVyYXRlU3R5bGVzLFxyXG4gIGhlYWRsaW5lRm9udCxcclxuICBzdWJ0aXRsZUZvbnQsXHJcbn0gZnJvbSBcIi4uL2Rlc2lnbi90eXBvZ3JhcGh5XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgQXNwZWN0UmF0aW9Cb3ggZnJvbSBcIi4vQXNwZWN0UmF0aW9Cb3hcIjtcclxuaW1wb3J0IExpbmtBcmVhIGZyb20gXCIuL0xpbmtBcmVhXCI7XHJcbmltcG9ydCBMaXZlQmFkZ2UsIHsgTGl2ZUJhZGdlVHlwZSB9IGZyb20gXCIuL0xpdmVCYWRnZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQXJ0aWNsZUNlbGxUeXBlIHtcclxuICBEZWZhdWx0ID0gXCJkZWZhdWx0XCIsXHJcbiAgQ29tcGFjdCA9IFwiY29tcGFjdFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFydGljbGVDZWxsUHJvcHMge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgc3VidGl0bGU/OiBzdHJpbmc7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBsaW5rPzogc3RyaW5nO1xyXG4gIG5ld1RhYj86IGJvb2xlYW47XHJcbiAgaXNMaXZlPzogYm9vbGVhbjtcclxuICBpbWFnZVVybD86IHN0cmluZztcclxuXHJcbiAgdHlwZT86IEFydGljbGVDZWxsVHlwZTtcclxufVxyXG5cclxuY29uc3QgY29udGFpbmVyU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmNvbnN0IHRpdGxlU3R5bGVzID0gKGlzQ29tcGFjdDogYm9vbGVhbikgPT4gY3NzYFxyXG4gICR7Z2VuZXJhdGVTdHlsZXMoIWlzQ29tcGFjdCA/IGhlYWRsaW5lRm9udCA6IHN1YnRpdGxlRm9udCl9XHJcbmA7XHJcblxyXG5jb25zdCBzdWJ0aXRsZVN0eWxlcyA9IGNzc2BcclxuICAke2dlbmVyYXRlU3R5bGVzKHN1YnRpdGxlRm9udCl9XHJcbiAgbWFyZ2luLXRvcDogJHtzcGFjZVszXX1weDtcclxuYDtcclxuXHJcbmNvbnN0IGltYWdlU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIG1hcmdpbi10b3A6ICR7c3BhY2VbNF19cHg7XHJcbmA7XHJcblxyXG5jb25zdCBzaG91bGRTaG93U3VidGl0bGUgPSAodHlwZTogQXJ0aWNsZUNlbGxUeXBlKTogYm9vbGVhbiA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsaXZlQmFkZ2VUeXBlID0gKHR5cGU6IEFydGljbGVDZWxsVHlwZSk6IExpdmVCYWRnZVR5cGUgPT4ge1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSBBcnRpY2xlQ2VsbFR5cGUuRGVmYXVsdDpcclxuICAgICAgcmV0dXJuIExpdmVCYWRnZVR5cGUuU29saWQ7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gTGl2ZUJhZGdlVHlwZS5UcmFuc3BhcmVudDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBBcnRpY2xlQ2VsbDogRnVuY3Rpb25Db21wb25lbnQ8QXJ0aWNsZUNlbGxQcm9wcz4gPSAoe1xyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIHRleHQsXHJcbiAgbGluayxcclxuICBpc0xpdmUgPSBmYWxzZSxcclxuICBpbWFnZVVybCxcclxuICB0eXBlID0gQXJ0aWNsZUNlbGxUeXBlLkRlZmF1bHQsXHJcbiAgbmV3VGFiID0gZmFsc2UsXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjc3M9e2NvbnRhaW5lclN0eWxlc30+XHJcbiAgICAgIHtsaW5rICE9IG51bGwgJiYgPExpbmtBcmVhIGhyZWY9e2xpbmt9IHRhcmdldEJsYW5rPXtuZXdUYWJ9IC8+fVxyXG5cclxuICAgICAge2ltYWdlVXJsICE9IG51bGwgJiYgKFxyXG4gICAgICAgIDxBc3BlY3RSYXRpb0JveFxyXG4gICAgICAgICAgcmF0aW89ezkgLyAxNn1cclxuICAgICAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdfXB4O1xyXG4gICAgICAgICAgYH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17aW1hZ2VTdHlsZXN9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRJbWFnZTogYHVybCgke2ltYWdlVXJsfSlgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQXNwZWN0UmF0aW9Cb3g+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7aXNMaXZlICYmIChcclxuICAgICAgICA8TGl2ZUJhZGdlXHJcbiAgICAgICAgICB0eXBlPXtsaXZlQmFkZ2VUeXBlKHR5cGUpfVxyXG4gICAgICAgICAgY3NzPXtjc3NgXHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbM119cHg7XHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXt0aXRsZVN0eWxlcyh0eXBlID09IEFydGljbGVDZWxsVHlwZS5Db21wYWN0KX1cclxuICAgICAgICBkYXRhLWxpbmstaG92ZXI9XCJ1bmRlcmxpbmVcIlxyXG4gICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogdGl0bGUgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzdWJ0aXRsZSAhPSBudWxsICYmIHNob3VsZFNob3dTdWJ0aXRsZSh0eXBlKSAmJiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY3NzPXtzdWJ0aXRsZVN0eWxlc31cclxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3VidGl0bGUgfX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3RleHQgIT0gbnVsbCAmJiAoXHJcbiAgICAgICAgPHAgY3NzPXt0ZXh0U3R5bGVzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRleHQgfX0gLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcnRpY2xlQ2VsbDtcclxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

const titleStyles = isCompact => /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.css)((0,_design_typography__WEBPACK_IMPORTED_MODULE_1__.generateStyles)(!isCompact ? _design_typography__WEBPACK_IMPORTED_MODULE_1__.headlineFont : _design_typography__WEBPACK_IMPORTED_MODULE_1__.subtitleFont), ";" + ( false ? 0 : ";label:titleStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxBcnRpY2xlQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUMrQyIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQXJ0aWNsZUNlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQge1xyXG4gIGdlbmVyYXRlU3R5bGVzLFxyXG4gIGhlYWRsaW5lRm9udCxcclxuICBzdWJ0aXRsZUZvbnQsXHJcbn0gZnJvbSBcIi4uL2Rlc2lnbi90eXBvZ3JhcGh5XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgQXNwZWN0UmF0aW9Cb3ggZnJvbSBcIi4vQXNwZWN0UmF0aW9Cb3hcIjtcclxuaW1wb3J0IExpbmtBcmVhIGZyb20gXCIuL0xpbmtBcmVhXCI7XHJcbmltcG9ydCBMaXZlQmFkZ2UsIHsgTGl2ZUJhZGdlVHlwZSB9IGZyb20gXCIuL0xpdmVCYWRnZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQXJ0aWNsZUNlbGxUeXBlIHtcclxuICBEZWZhdWx0ID0gXCJkZWZhdWx0XCIsXHJcbiAgQ29tcGFjdCA9IFwiY29tcGFjdFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFydGljbGVDZWxsUHJvcHMge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgc3VidGl0bGU/OiBzdHJpbmc7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBsaW5rPzogc3RyaW5nO1xyXG4gIG5ld1RhYj86IGJvb2xlYW47XHJcbiAgaXNMaXZlPzogYm9vbGVhbjtcclxuICBpbWFnZVVybD86IHN0cmluZztcclxuXHJcbiAgdHlwZT86IEFydGljbGVDZWxsVHlwZTtcclxufVxyXG5cclxuY29uc3QgY29udGFpbmVyU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmNvbnN0IHRpdGxlU3R5bGVzID0gKGlzQ29tcGFjdDogYm9vbGVhbikgPT4gY3NzYFxyXG4gICR7Z2VuZXJhdGVTdHlsZXMoIWlzQ29tcGFjdCA/IGhlYWRsaW5lRm9udCA6IHN1YnRpdGxlRm9udCl9XHJcbmA7XHJcblxyXG5jb25zdCBzdWJ0aXRsZVN0eWxlcyA9IGNzc2BcclxuICAke2dlbmVyYXRlU3R5bGVzKHN1YnRpdGxlRm9udCl9XHJcbiAgbWFyZ2luLXRvcDogJHtzcGFjZVszXX1weDtcclxuYDtcclxuXHJcbmNvbnN0IGltYWdlU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIG1hcmdpbi10b3A6ICR7c3BhY2VbNF19cHg7XHJcbmA7XHJcblxyXG5jb25zdCBzaG91bGRTaG93U3VidGl0bGUgPSAodHlwZTogQXJ0aWNsZUNlbGxUeXBlKTogYm9vbGVhbiA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsaXZlQmFkZ2VUeXBlID0gKHR5cGU6IEFydGljbGVDZWxsVHlwZSk6IExpdmVCYWRnZVR5cGUgPT4ge1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSBBcnRpY2xlQ2VsbFR5cGUuRGVmYXVsdDpcclxuICAgICAgcmV0dXJuIExpdmVCYWRnZVR5cGUuU29saWQ7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gTGl2ZUJhZGdlVHlwZS5UcmFuc3BhcmVudDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBBcnRpY2xlQ2VsbDogRnVuY3Rpb25Db21wb25lbnQ8QXJ0aWNsZUNlbGxQcm9wcz4gPSAoe1xyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIHRleHQsXHJcbiAgbGluayxcclxuICBpc0xpdmUgPSBmYWxzZSxcclxuICBpbWFnZVVybCxcclxuICB0eXBlID0gQXJ0aWNsZUNlbGxUeXBlLkRlZmF1bHQsXHJcbiAgbmV3VGFiID0gZmFsc2UsXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjc3M9e2NvbnRhaW5lclN0eWxlc30+XHJcbiAgICAgIHtsaW5rICE9IG51bGwgJiYgPExpbmtBcmVhIGhyZWY9e2xpbmt9IHRhcmdldEJsYW5rPXtuZXdUYWJ9IC8+fVxyXG5cclxuICAgICAge2ltYWdlVXJsICE9IG51bGwgJiYgKFxyXG4gICAgICAgIDxBc3BlY3RSYXRpb0JveFxyXG4gICAgICAgICAgcmF0aW89ezkgLyAxNn1cclxuICAgICAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdfXB4O1xyXG4gICAgICAgICAgYH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17aW1hZ2VTdHlsZXN9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRJbWFnZTogYHVybCgke2ltYWdlVXJsfSlgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQXNwZWN0UmF0aW9Cb3g+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7aXNMaXZlICYmIChcclxuICAgICAgICA8TGl2ZUJhZGdlXHJcbiAgICAgICAgICB0eXBlPXtsaXZlQmFkZ2VUeXBlKHR5cGUpfVxyXG4gICAgICAgICAgY3NzPXtjc3NgXHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbM119cHg7XHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXt0aXRsZVN0eWxlcyh0eXBlID09IEFydGljbGVDZWxsVHlwZS5Db21wYWN0KX1cclxuICAgICAgICBkYXRhLWxpbmstaG92ZXI9XCJ1bmRlcmxpbmVcIlxyXG4gICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogdGl0bGUgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzdWJ0aXRsZSAhPSBudWxsICYmIHNob3VsZFNob3dTdWJ0aXRsZSh0eXBlKSAmJiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY3NzPXtzdWJ0aXRsZVN0eWxlc31cclxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3VidGl0bGUgfX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3RleHQgIT0gbnVsbCAmJiAoXHJcbiAgICAgICAgPHAgY3NzPXt0ZXh0U3R5bGVzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRleHQgfX0gLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcnRpY2xlQ2VsbDtcclxuIl19 */");

const subtitleStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.css)((0,_design_typography__WEBPACK_IMPORTED_MODULE_1__.generateStyles)(_design_typography__WEBPACK_IMPORTED_MODULE_1__.subtitleFont), " margin-top:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.space[3], "px;" + ( false ? 0 : ";label:subtitleStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxBcnRpY2xlQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUMwQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQXJ0aWNsZUNlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQge1xyXG4gIGdlbmVyYXRlU3R5bGVzLFxyXG4gIGhlYWRsaW5lRm9udCxcclxuICBzdWJ0aXRsZUZvbnQsXHJcbn0gZnJvbSBcIi4uL2Rlc2lnbi90eXBvZ3JhcGh5XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgQXNwZWN0UmF0aW9Cb3ggZnJvbSBcIi4vQXNwZWN0UmF0aW9Cb3hcIjtcclxuaW1wb3J0IExpbmtBcmVhIGZyb20gXCIuL0xpbmtBcmVhXCI7XHJcbmltcG9ydCBMaXZlQmFkZ2UsIHsgTGl2ZUJhZGdlVHlwZSB9IGZyb20gXCIuL0xpdmVCYWRnZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQXJ0aWNsZUNlbGxUeXBlIHtcclxuICBEZWZhdWx0ID0gXCJkZWZhdWx0XCIsXHJcbiAgQ29tcGFjdCA9IFwiY29tcGFjdFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFydGljbGVDZWxsUHJvcHMge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgc3VidGl0bGU/OiBzdHJpbmc7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBsaW5rPzogc3RyaW5nO1xyXG4gIG5ld1RhYj86IGJvb2xlYW47XHJcbiAgaXNMaXZlPzogYm9vbGVhbjtcclxuICBpbWFnZVVybD86IHN0cmluZztcclxuXHJcbiAgdHlwZT86IEFydGljbGVDZWxsVHlwZTtcclxufVxyXG5cclxuY29uc3QgY29udGFpbmVyU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmNvbnN0IHRpdGxlU3R5bGVzID0gKGlzQ29tcGFjdDogYm9vbGVhbikgPT4gY3NzYFxyXG4gICR7Z2VuZXJhdGVTdHlsZXMoIWlzQ29tcGFjdCA/IGhlYWRsaW5lRm9udCA6IHN1YnRpdGxlRm9udCl9XHJcbmA7XHJcblxyXG5jb25zdCBzdWJ0aXRsZVN0eWxlcyA9IGNzc2BcclxuICAke2dlbmVyYXRlU3R5bGVzKHN1YnRpdGxlRm9udCl9XHJcbiAgbWFyZ2luLXRvcDogJHtzcGFjZVszXX1weDtcclxuYDtcclxuXHJcbmNvbnN0IGltYWdlU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIG1hcmdpbi10b3A6ICR7c3BhY2VbNF19cHg7XHJcbmA7XHJcblxyXG5jb25zdCBzaG91bGRTaG93U3VidGl0bGUgPSAodHlwZTogQXJ0aWNsZUNlbGxUeXBlKTogYm9vbGVhbiA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsaXZlQmFkZ2VUeXBlID0gKHR5cGU6IEFydGljbGVDZWxsVHlwZSk6IExpdmVCYWRnZVR5cGUgPT4ge1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSBBcnRpY2xlQ2VsbFR5cGUuRGVmYXVsdDpcclxuICAgICAgcmV0dXJuIExpdmVCYWRnZVR5cGUuU29saWQ7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gTGl2ZUJhZGdlVHlwZS5UcmFuc3BhcmVudDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBBcnRpY2xlQ2VsbDogRnVuY3Rpb25Db21wb25lbnQ8QXJ0aWNsZUNlbGxQcm9wcz4gPSAoe1xyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIHRleHQsXHJcbiAgbGluayxcclxuICBpc0xpdmUgPSBmYWxzZSxcclxuICBpbWFnZVVybCxcclxuICB0eXBlID0gQXJ0aWNsZUNlbGxUeXBlLkRlZmF1bHQsXHJcbiAgbmV3VGFiID0gZmFsc2UsXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjc3M9e2NvbnRhaW5lclN0eWxlc30+XHJcbiAgICAgIHtsaW5rICE9IG51bGwgJiYgPExpbmtBcmVhIGhyZWY9e2xpbmt9IHRhcmdldEJsYW5rPXtuZXdUYWJ9IC8+fVxyXG5cclxuICAgICAge2ltYWdlVXJsICE9IG51bGwgJiYgKFxyXG4gICAgICAgIDxBc3BlY3RSYXRpb0JveFxyXG4gICAgICAgICAgcmF0aW89ezkgLyAxNn1cclxuICAgICAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdfXB4O1xyXG4gICAgICAgICAgYH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17aW1hZ2VTdHlsZXN9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRJbWFnZTogYHVybCgke2ltYWdlVXJsfSlgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQXNwZWN0UmF0aW9Cb3g+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7aXNMaXZlICYmIChcclxuICAgICAgICA8TGl2ZUJhZGdlXHJcbiAgICAgICAgICB0eXBlPXtsaXZlQmFkZ2VUeXBlKHR5cGUpfVxyXG4gICAgICAgICAgY3NzPXtjc3NgXHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbM119cHg7XHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXt0aXRsZVN0eWxlcyh0eXBlID09IEFydGljbGVDZWxsVHlwZS5Db21wYWN0KX1cclxuICAgICAgICBkYXRhLWxpbmstaG92ZXI9XCJ1bmRlcmxpbmVcIlxyXG4gICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogdGl0bGUgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzdWJ0aXRsZSAhPSBudWxsICYmIHNob3VsZFNob3dTdWJ0aXRsZSh0eXBlKSAmJiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY3NzPXtzdWJ0aXRsZVN0eWxlc31cclxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3VidGl0bGUgfX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3RleHQgIT0gbnVsbCAmJiAoXHJcbiAgICAgICAgPHAgY3NzPXt0ZXh0U3R5bGVzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRleHQgfX0gLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcnRpY2xlQ2VsbDtcclxuIl19 */");
const imageStyles =  false ? 0 : {
  name: "1q9bb5k-imageStyles",
  styles: "position:absolute;top:0;left:0;right:0;bottom:0;background-size:cover;background-position:center;label:imageStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxBcnRpY2xlQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEN1QiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQXJ0aWNsZUNlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQge1xyXG4gIGdlbmVyYXRlU3R5bGVzLFxyXG4gIGhlYWRsaW5lRm9udCxcclxuICBzdWJ0aXRsZUZvbnQsXHJcbn0gZnJvbSBcIi4uL2Rlc2lnbi90eXBvZ3JhcGh5XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgQXNwZWN0UmF0aW9Cb3ggZnJvbSBcIi4vQXNwZWN0UmF0aW9Cb3hcIjtcclxuaW1wb3J0IExpbmtBcmVhIGZyb20gXCIuL0xpbmtBcmVhXCI7XHJcbmltcG9ydCBMaXZlQmFkZ2UsIHsgTGl2ZUJhZGdlVHlwZSB9IGZyb20gXCIuL0xpdmVCYWRnZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQXJ0aWNsZUNlbGxUeXBlIHtcclxuICBEZWZhdWx0ID0gXCJkZWZhdWx0XCIsXHJcbiAgQ29tcGFjdCA9IFwiY29tcGFjdFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFydGljbGVDZWxsUHJvcHMge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgc3VidGl0bGU/OiBzdHJpbmc7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBsaW5rPzogc3RyaW5nO1xyXG4gIG5ld1RhYj86IGJvb2xlYW47XHJcbiAgaXNMaXZlPzogYm9vbGVhbjtcclxuICBpbWFnZVVybD86IHN0cmluZztcclxuXHJcbiAgdHlwZT86IEFydGljbGVDZWxsVHlwZTtcclxufVxyXG5cclxuY29uc3QgY29udGFpbmVyU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmNvbnN0IHRpdGxlU3R5bGVzID0gKGlzQ29tcGFjdDogYm9vbGVhbikgPT4gY3NzYFxyXG4gICR7Z2VuZXJhdGVTdHlsZXMoIWlzQ29tcGFjdCA/IGhlYWRsaW5lRm9udCA6IHN1YnRpdGxlRm9udCl9XHJcbmA7XHJcblxyXG5jb25zdCBzdWJ0aXRsZVN0eWxlcyA9IGNzc2BcclxuICAke2dlbmVyYXRlU3R5bGVzKHN1YnRpdGxlRm9udCl9XHJcbiAgbWFyZ2luLXRvcDogJHtzcGFjZVszXX1weDtcclxuYDtcclxuXHJcbmNvbnN0IGltYWdlU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIG1hcmdpbi10b3A6ICR7c3BhY2VbNF19cHg7XHJcbmA7XHJcblxyXG5jb25zdCBzaG91bGRTaG93U3VidGl0bGUgPSAodHlwZTogQXJ0aWNsZUNlbGxUeXBlKTogYm9vbGVhbiA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsaXZlQmFkZ2VUeXBlID0gKHR5cGU6IEFydGljbGVDZWxsVHlwZSk6IExpdmVCYWRnZVR5cGUgPT4ge1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSBBcnRpY2xlQ2VsbFR5cGUuRGVmYXVsdDpcclxuICAgICAgcmV0dXJuIExpdmVCYWRnZVR5cGUuU29saWQ7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gTGl2ZUJhZGdlVHlwZS5UcmFuc3BhcmVudDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBBcnRpY2xlQ2VsbDogRnVuY3Rpb25Db21wb25lbnQ8QXJ0aWNsZUNlbGxQcm9wcz4gPSAoe1xyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIHRleHQsXHJcbiAgbGluayxcclxuICBpc0xpdmUgPSBmYWxzZSxcclxuICBpbWFnZVVybCxcclxuICB0eXBlID0gQXJ0aWNsZUNlbGxUeXBlLkRlZmF1bHQsXHJcbiAgbmV3VGFiID0gZmFsc2UsXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjc3M9e2NvbnRhaW5lclN0eWxlc30+XHJcbiAgICAgIHtsaW5rICE9IG51bGwgJiYgPExpbmtBcmVhIGhyZWY9e2xpbmt9IHRhcmdldEJsYW5rPXtuZXdUYWJ9IC8+fVxyXG5cclxuICAgICAge2ltYWdlVXJsICE9IG51bGwgJiYgKFxyXG4gICAgICAgIDxBc3BlY3RSYXRpb0JveFxyXG4gICAgICAgICAgcmF0aW89ezkgLyAxNn1cclxuICAgICAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdfXB4O1xyXG4gICAgICAgICAgYH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17aW1hZ2VTdHlsZXN9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRJbWFnZTogYHVybCgke2ltYWdlVXJsfSlgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQXNwZWN0UmF0aW9Cb3g+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7aXNMaXZlICYmIChcclxuICAgICAgICA8TGl2ZUJhZGdlXHJcbiAgICAgICAgICB0eXBlPXtsaXZlQmFkZ2VUeXBlKHR5cGUpfVxyXG4gICAgICAgICAgY3NzPXtjc3NgXHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbM119cHg7XHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXt0aXRsZVN0eWxlcyh0eXBlID09IEFydGljbGVDZWxsVHlwZS5Db21wYWN0KX1cclxuICAgICAgICBkYXRhLWxpbmstaG92ZXI9XCJ1bmRlcmxpbmVcIlxyXG4gICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogdGl0bGUgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzdWJ0aXRsZSAhPSBudWxsICYmIHNob3VsZFNob3dTdWJ0aXRsZSh0eXBlKSAmJiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY3NzPXtzdWJ0aXRsZVN0eWxlc31cclxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3VidGl0bGUgfX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3RleHQgIT0gbnVsbCAmJiAoXHJcbiAgICAgICAgPHAgY3NzPXt0ZXh0U3R5bGVzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRleHQgfX0gLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcnRpY2xlQ2VsbDtcclxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
const textStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.css)("margin-top:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.space[4], "px;" + ( false ? 0 : ";label:textStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxBcnRpY2xlQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0RzQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQXJ0aWNsZUNlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQge1xyXG4gIGdlbmVyYXRlU3R5bGVzLFxyXG4gIGhlYWRsaW5lRm9udCxcclxuICBzdWJ0aXRsZUZvbnQsXHJcbn0gZnJvbSBcIi4uL2Rlc2lnbi90eXBvZ3JhcGh5XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgQXNwZWN0UmF0aW9Cb3ggZnJvbSBcIi4vQXNwZWN0UmF0aW9Cb3hcIjtcclxuaW1wb3J0IExpbmtBcmVhIGZyb20gXCIuL0xpbmtBcmVhXCI7XHJcbmltcG9ydCBMaXZlQmFkZ2UsIHsgTGl2ZUJhZGdlVHlwZSB9IGZyb20gXCIuL0xpdmVCYWRnZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQXJ0aWNsZUNlbGxUeXBlIHtcclxuICBEZWZhdWx0ID0gXCJkZWZhdWx0XCIsXHJcbiAgQ29tcGFjdCA9IFwiY29tcGFjdFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFydGljbGVDZWxsUHJvcHMge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgc3VidGl0bGU/OiBzdHJpbmc7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBsaW5rPzogc3RyaW5nO1xyXG4gIG5ld1RhYj86IGJvb2xlYW47XHJcbiAgaXNMaXZlPzogYm9vbGVhbjtcclxuICBpbWFnZVVybD86IHN0cmluZztcclxuXHJcbiAgdHlwZT86IEFydGljbGVDZWxsVHlwZTtcclxufVxyXG5cclxuY29uc3QgY29udGFpbmVyU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmNvbnN0IHRpdGxlU3R5bGVzID0gKGlzQ29tcGFjdDogYm9vbGVhbikgPT4gY3NzYFxyXG4gICR7Z2VuZXJhdGVTdHlsZXMoIWlzQ29tcGFjdCA/IGhlYWRsaW5lRm9udCA6IHN1YnRpdGxlRm9udCl9XHJcbmA7XHJcblxyXG5jb25zdCBzdWJ0aXRsZVN0eWxlcyA9IGNzc2BcclxuICAke2dlbmVyYXRlU3R5bGVzKHN1YnRpdGxlRm9udCl9XHJcbiAgbWFyZ2luLXRvcDogJHtzcGFjZVszXX1weDtcclxuYDtcclxuXHJcbmNvbnN0IGltYWdlU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIG1hcmdpbi10b3A6ICR7c3BhY2VbNF19cHg7XHJcbmA7XHJcblxyXG5jb25zdCBzaG91bGRTaG93U3VidGl0bGUgPSAodHlwZTogQXJ0aWNsZUNlbGxUeXBlKTogYm9vbGVhbiA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsaXZlQmFkZ2VUeXBlID0gKHR5cGU6IEFydGljbGVDZWxsVHlwZSk6IExpdmVCYWRnZVR5cGUgPT4ge1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSBBcnRpY2xlQ2VsbFR5cGUuRGVmYXVsdDpcclxuICAgICAgcmV0dXJuIExpdmVCYWRnZVR5cGUuU29saWQ7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gTGl2ZUJhZGdlVHlwZS5UcmFuc3BhcmVudDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBBcnRpY2xlQ2VsbDogRnVuY3Rpb25Db21wb25lbnQ8QXJ0aWNsZUNlbGxQcm9wcz4gPSAoe1xyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIHRleHQsXHJcbiAgbGluayxcclxuICBpc0xpdmUgPSBmYWxzZSxcclxuICBpbWFnZVVybCxcclxuICB0eXBlID0gQXJ0aWNsZUNlbGxUeXBlLkRlZmF1bHQsXHJcbiAgbmV3VGFiID0gZmFsc2UsXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjc3M9e2NvbnRhaW5lclN0eWxlc30+XHJcbiAgICAgIHtsaW5rICE9IG51bGwgJiYgPExpbmtBcmVhIGhyZWY9e2xpbmt9IHRhcmdldEJsYW5rPXtuZXdUYWJ9IC8+fVxyXG5cclxuICAgICAge2ltYWdlVXJsICE9IG51bGwgJiYgKFxyXG4gICAgICAgIDxBc3BlY3RSYXRpb0JveFxyXG4gICAgICAgICAgcmF0aW89ezkgLyAxNn1cclxuICAgICAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdfXB4O1xyXG4gICAgICAgICAgYH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17aW1hZ2VTdHlsZXN9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRJbWFnZTogYHVybCgke2ltYWdlVXJsfSlgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQXNwZWN0UmF0aW9Cb3g+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7aXNMaXZlICYmIChcclxuICAgICAgICA8TGl2ZUJhZGdlXHJcbiAgICAgICAgICB0eXBlPXtsaXZlQmFkZ2VUeXBlKHR5cGUpfVxyXG4gICAgICAgICAgY3NzPXtjc3NgXHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbM119cHg7XHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXt0aXRsZVN0eWxlcyh0eXBlID09IEFydGljbGVDZWxsVHlwZS5Db21wYWN0KX1cclxuICAgICAgICBkYXRhLWxpbmstaG92ZXI9XCJ1bmRlcmxpbmVcIlxyXG4gICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogdGl0bGUgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzdWJ0aXRsZSAhPSBudWxsICYmIHNob3VsZFNob3dTdWJ0aXRsZSh0eXBlKSAmJiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY3NzPXtzdWJ0aXRsZVN0eWxlc31cclxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3VidGl0bGUgfX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3RleHQgIT0gbnVsbCAmJiAoXHJcbiAgICAgICAgPHAgY3NzPXt0ZXh0U3R5bGVzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRleHQgfX0gLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcnRpY2xlQ2VsbDtcclxuIl19 */");

const shouldShowSubtitle = type => {
  switch (type) {
    case ArticleCellType.Compact:
      return false;

    default:
      return true;
  }
};

const liveBadgeType = type => {
  switch (type) {
    case ArticleCellType.Default:
      return _LiveBadge__WEBPACK_IMPORTED_MODULE_4__.LiveBadgeType.Solid;

    case ArticleCellType.Compact:
      return _LiveBadge__WEBPACK_IMPORTED_MODULE_4__.LiveBadgeType.Transparent;
  }
};

const ArticleCell = ({
  title,
  subtitle,
  text,
  link,
  isLive = false,
  imageUrl,
  type = ArticleCellType.Default,
  newTab = false
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    css: containerStyles,
    children: [link != null && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_LinkArea__WEBPACK_IMPORTED_MODULE_3__.default, {
      href: link,
      targetBlank: newTab
    }), imageUrl != null && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_AspectRatioBox__WEBPACK_IMPORTED_MODULE_2__.default, {
      ratio: 9 / 16,
      css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.css)("margin-bottom:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.space[5], "px;" + ( false ? 0 : ";label:ArticleCell;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxBcnRpY2xlQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkZrQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQXJ0aWNsZUNlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQge1xyXG4gIGdlbmVyYXRlU3R5bGVzLFxyXG4gIGhlYWRsaW5lRm9udCxcclxuICBzdWJ0aXRsZUZvbnQsXHJcbn0gZnJvbSBcIi4uL2Rlc2lnbi90eXBvZ3JhcGh5XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgQXNwZWN0UmF0aW9Cb3ggZnJvbSBcIi4vQXNwZWN0UmF0aW9Cb3hcIjtcclxuaW1wb3J0IExpbmtBcmVhIGZyb20gXCIuL0xpbmtBcmVhXCI7XHJcbmltcG9ydCBMaXZlQmFkZ2UsIHsgTGl2ZUJhZGdlVHlwZSB9IGZyb20gXCIuL0xpdmVCYWRnZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQXJ0aWNsZUNlbGxUeXBlIHtcclxuICBEZWZhdWx0ID0gXCJkZWZhdWx0XCIsXHJcbiAgQ29tcGFjdCA9IFwiY29tcGFjdFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFydGljbGVDZWxsUHJvcHMge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgc3VidGl0bGU/OiBzdHJpbmc7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBsaW5rPzogc3RyaW5nO1xyXG4gIG5ld1RhYj86IGJvb2xlYW47XHJcbiAgaXNMaXZlPzogYm9vbGVhbjtcclxuICBpbWFnZVVybD86IHN0cmluZztcclxuXHJcbiAgdHlwZT86IEFydGljbGVDZWxsVHlwZTtcclxufVxyXG5cclxuY29uc3QgY29udGFpbmVyU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmNvbnN0IHRpdGxlU3R5bGVzID0gKGlzQ29tcGFjdDogYm9vbGVhbikgPT4gY3NzYFxyXG4gICR7Z2VuZXJhdGVTdHlsZXMoIWlzQ29tcGFjdCA/IGhlYWRsaW5lRm9udCA6IHN1YnRpdGxlRm9udCl9XHJcbmA7XHJcblxyXG5jb25zdCBzdWJ0aXRsZVN0eWxlcyA9IGNzc2BcclxuICAke2dlbmVyYXRlU3R5bGVzKHN1YnRpdGxlRm9udCl9XHJcbiAgbWFyZ2luLXRvcDogJHtzcGFjZVszXX1weDtcclxuYDtcclxuXHJcbmNvbnN0IGltYWdlU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIG1hcmdpbi10b3A6ICR7c3BhY2VbNF19cHg7XHJcbmA7XHJcblxyXG5jb25zdCBzaG91bGRTaG93U3VidGl0bGUgPSAodHlwZTogQXJ0aWNsZUNlbGxUeXBlKTogYm9vbGVhbiA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsaXZlQmFkZ2VUeXBlID0gKHR5cGU6IEFydGljbGVDZWxsVHlwZSk6IExpdmVCYWRnZVR5cGUgPT4ge1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSBBcnRpY2xlQ2VsbFR5cGUuRGVmYXVsdDpcclxuICAgICAgcmV0dXJuIExpdmVCYWRnZVR5cGUuU29saWQ7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gTGl2ZUJhZGdlVHlwZS5UcmFuc3BhcmVudDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBBcnRpY2xlQ2VsbDogRnVuY3Rpb25Db21wb25lbnQ8QXJ0aWNsZUNlbGxQcm9wcz4gPSAoe1xyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIHRleHQsXHJcbiAgbGluayxcclxuICBpc0xpdmUgPSBmYWxzZSxcclxuICBpbWFnZVVybCxcclxuICB0eXBlID0gQXJ0aWNsZUNlbGxUeXBlLkRlZmF1bHQsXHJcbiAgbmV3VGFiID0gZmFsc2UsXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjc3M9e2NvbnRhaW5lclN0eWxlc30+XHJcbiAgICAgIHtsaW5rICE9IG51bGwgJiYgPExpbmtBcmVhIGhyZWY9e2xpbmt9IHRhcmdldEJsYW5rPXtuZXdUYWJ9IC8+fVxyXG5cclxuICAgICAge2ltYWdlVXJsICE9IG51bGwgJiYgKFxyXG4gICAgICAgIDxBc3BlY3RSYXRpb0JveFxyXG4gICAgICAgICAgcmF0aW89ezkgLyAxNn1cclxuICAgICAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdfXB4O1xyXG4gICAgICAgICAgYH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17aW1hZ2VTdHlsZXN9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRJbWFnZTogYHVybCgke2ltYWdlVXJsfSlgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQXNwZWN0UmF0aW9Cb3g+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7aXNMaXZlICYmIChcclxuICAgICAgICA8TGl2ZUJhZGdlXHJcbiAgICAgICAgICB0eXBlPXtsaXZlQmFkZ2VUeXBlKHR5cGUpfVxyXG4gICAgICAgICAgY3NzPXtjc3NgXHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbM119cHg7XHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXt0aXRsZVN0eWxlcyh0eXBlID09IEFydGljbGVDZWxsVHlwZS5Db21wYWN0KX1cclxuICAgICAgICBkYXRhLWxpbmstaG92ZXI9XCJ1bmRlcmxpbmVcIlxyXG4gICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogdGl0bGUgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzdWJ0aXRsZSAhPSBudWxsICYmIHNob3VsZFNob3dTdWJ0aXRsZSh0eXBlKSAmJiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY3NzPXtzdWJ0aXRsZVN0eWxlc31cclxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3VidGl0bGUgfX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3RleHQgIT0gbnVsbCAmJiAoXHJcbiAgICAgICAgPHAgY3NzPXt0ZXh0U3R5bGVzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRleHQgfX0gLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcnRpY2xlQ2VsbDtcclxuIl19 */"),
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        css: imageStyles,
        style: {
          backgroundImage: `url(${imageUrl})`
        }
      })
    }), isLive && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_LiveBadge__WEBPACK_IMPORTED_MODULE_4__.default, {
      type: liveBadgeType(type),
      css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.css)("margin-bottom:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.space[3], "px;" + ( false ? 0 : ";label:ArticleCell;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxBcnRpY2xlQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUdrQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQXJ0aWNsZUNlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQge1xyXG4gIGdlbmVyYXRlU3R5bGVzLFxyXG4gIGhlYWRsaW5lRm9udCxcclxuICBzdWJ0aXRsZUZvbnQsXHJcbn0gZnJvbSBcIi4uL2Rlc2lnbi90eXBvZ3JhcGh5XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgQXNwZWN0UmF0aW9Cb3ggZnJvbSBcIi4vQXNwZWN0UmF0aW9Cb3hcIjtcclxuaW1wb3J0IExpbmtBcmVhIGZyb20gXCIuL0xpbmtBcmVhXCI7XHJcbmltcG9ydCBMaXZlQmFkZ2UsIHsgTGl2ZUJhZGdlVHlwZSB9IGZyb20gXCIuL0xpdmVCYWRnZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQXJ0aWNsZUNlbGxUeXBlIHtcclxuICBEZWZhdWx0ID0gXCJkZWZhdWx0XCIsXHJcbiAgQ29tcGFjdCA9IFwiY29tcGFjdFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFydGljbGVDZWxsUHJvcHMge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgc3VidGl0bGU/OiBzdHJpbmc7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBsaW5rPzogc3RyaW5nO1xyXG4gIG5ld1RhYj86IGJvb2xlYW47XHJcbiAgaXNMaXZlPzogYm9vbGVhbjtcclxuICBpbWFnZVVybD86IHN0cmluZztcclxuXHJcbiAgdHlwZT86IEFydGljbGVDZWxsVHlwZTtcclxufVxyXG5cclxuY29uc3QgY29udGFpbmVyU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmNvbnN0IHRpdGxlU3R5bGVzID0gKGlzQ29tcGFjdDogYm9vbGVhbikgPT4gY3NzYFxyXG4gICR7Z2VuZXJhdGVTdHlsZXMoIWlzQ29tcGFjdCA/IGhlYWRsaW5lRm9udCA6IHN1YnRpdGxlRm9udCl9XHJcbmA7XHJcblxyXG5jb25zdCBzdWJ0aXRsZVN0eWxlcyA9IGNzc2BcclxuICAke2dlbmVyYXRlU3R5bGVzKHN1YnRpdGxlRm9udCl9XHJcbiAgbWFyZ2luLXRvcDogJHtzcGFjZVszXX1weDtcclxuYDtcclxuXHJcbmNvbnN0IGltYWdlU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIG1hcmdpbi10b3A6ICR7c3BhY2VbNF19cHg7XHJcbmA7XHJcblxyXG5jb25zdCBzaG91bGRTaG93U3VidGl0bGUgPSAodHlwZTogQXJ0aWNsZUNlbGxUeXBlKTogYm9vbGVhbiA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsaXZlQmFkZ2VUeXBlID0gKHR5cGU6IEFydGljbGVDZWxsVHlwZSk6IExpdmVCYWRnZVR5cGUgPT4ge1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSBBcnRpY2xlQ2VsbFR5cGUuRGVmYXVsdDpcclxuICAgICAgcmV0dXJuIExpdmVCYWRnZVR5cGUuU29saWQ7XHJcbiAgICBjYXNlIEFydGljbGVDZWxsVHlwZS5Db21wYWN0OlxyXG4gICAgICByZXR1cm4gTGl2ZUJhZGdlVHlwZS5UcmFuc3BhcmVudDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBBcnRpY2xlQ2VsbDogRnVuY3Rpb25Db21wb25lbnQ8QXJ0aWNsZUNlbGxQcm9wcz4gPSAoe1xyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIHRleHQsXHJcbiAgbGluayxcclxuICBpc0xpdmUgPSBmYWxzZSxcclxuICBpbWFnZVVybCxcclxuICB0eXBlID0gQXJ0aWNsZUNlbGxUeXBlLkRlZmF1bHQsXHJcbiAgbmV3VGFiID0gZmFsc2UsXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjc3M9e2NvbnRhaW5lclN0eWxlc30+XHJcbiAgICAgIHtsaW5rICE9IG51bGwgJiYgPExpbmtBcmVhIGhyZWY9e2xpbmt9IHRhcmdldEJsYW5rPXtuZXdUYWJ9IC8+fVxyXG5cclxuICAgICAge2ltYWdlVXJsICE9IG51bGwgJiYgKFxyXG4gICAgICAgIDxBc3BlY3RSYXRpb0JveFxyXG4gICAgICAgICAgcmF0aW89ezkgLyAxNn1cclxuICAgICAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdfXB4O1xyXG4gICAgICAgICAgYH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17aW1hZ2VTdHlsZXN9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRJbWFnZTogYHVybCgke2ltYWdlVXJsfSlgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQXNwZWN0UmF0aW9Cb3g+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7aXNMaXZlICYmIChcclxuICAgICAgICA8TGl2ZUJhZGdlXHJcbiAgICAgICAgICB0eXBlPXtsaXZlQmFkZ2VUeXBlKHR5cGUpfVxyXG4gICAgICAgICAgY3NzPXtjc3NgXHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbM119cHg7XHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXt0aXRsZVN0eWxlcyh0eXBlID09IEFydGljbGVDZWxsVHlwZS5Db21wYWN0KX1cclxuICAgICAgICBkYXRhLWxpbmstaG92ZXI9XCJ1bmRlcmxpbmVcIlxyXG4gICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogdGl0bGUgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzdWJ0aXRsZSAhPSBudWxsICYmIHNob3VsZFNob3dTdWJ0aXRsZSh0eXBlKSAmJiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY3NzPXtzdWJ0aXRsZVN0eWxlc31cclxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3VidGl0bGUgfX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3RleHQgIT0gbnVsbCAmJiAoXHJcbiAgICAgICAgPHAgY3NzPXt0ZXh0U3R5bGVzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRleHQgfX0gLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcnRpY2xlQ2VsbDtcclxuIl19 */")
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      css: titleStyles(type == ArticleCellType.Compact),
      "data-link-hover": "underline",
      dangerouslySetInnerHTML: {
        __html: title
      }
    }), subtitle != null && shouldShowSubtitle(type) && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      css: subtitleStyles,
      dangerouslySetInnerHTML: {
        __html: subtitle
      }
    }), text != null && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
      css: textStyles,
      dangerouslySetInnerHTML: {
        __html: text
      }
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ArticleCell);

/***/ }),

/***/ "./src/web/components/AspectRatioBox.tsx":
/*!***********************************************!*\
  !*** ./src/web/components/AspectRatioBox.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.esm.js");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");



const AspectRatioBox = ({
  ratio,
  children,
  ...props
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css)("overflow:hidden;width:100%;height:0;padding-top:", ratio * 100, "%;position:relative;" + ( false ? 0 : ";label:AspectRatioBox;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxBc3BlY3RSYXRpb0JveC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY2MiLCJmaWxlIjoiQzpcXFVzZXJzXFxuaWNrZFxcRG9jdW1lbnRzXFxzdHVkZW50LWZhYnJpY1xcc3JjXFx3ZWJcXGNvbXBvbmVudHNcXEFzcGVjdFJhdGlvQm94LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXNwZWN0UmF0aW9Cb3hQcm9wcyBleHRlbmRzIFByb3BzT2Y8XCJkaXZcIj4ge1xyXG4gIHJhdGlvOiBudW1iZXI7XHJcbn1cclxuXHJcbmNvbnN0IEFzcGVjdFJhdGlvQm94OiBGdW5jdGlvbkNvbXBvbmVudDxBc3BlY3RSYXRpb0JveFByb3BzPiA9ICh7XHJcbiAgcmF0aW8sXHJcbiAgY2hpbGRyZW4sXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAwO1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiAke3JhdGlvICogMTAwfSU7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBgfVxyXG4gICAgICB7Li4ucHJvcHN9XHJcbiAgICA+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBc3BlY3RSYXRpb0JveDtcclxuIl19 */"),
    ...props,
    children: children
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AspectRatioBox);

/***/ }),

/***/ "./src/web/components/Block.tsx":
/*!**************************************!*\
  !*** ./src/web/components/Block.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.esm.js");
/* harmony import */ var _design_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../design/theme */ "./src/web/design/theme.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }





const containerStyles =  false ? 0 : {
  name: "5ualkz-containerStyles",
  styles: "width:100%;border-top:1px solid black;label:containerStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxCbG9jay50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUIyQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQmxvY2sudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tIFwicHJlYWN0XCI7XHJcbmltcG9ydCB7IGNzcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQge1xyXG4gIGNvbG91cnMsXHJcbiAgZm9udHMsXHJcbiAgZm9udFNpemVzLFxyXG4gIGZvbnRXZWlnaHRzLFxyXG4gIGxldHRlclNwYWNpbmdzLFxyXG4gIHNwYWNlLFxyXG59IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmxvY2tQcm9wcyBleHRlbmRzIFByb3BzT2Y8XCJkaXZcIj4ge1xyXG4gIGNvbHVtbnM6IG51bWJlcjtcclxuICByb3dzPzogbnVtYmVyO1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBjb250YWluZXJTdHlsZXMgPSBjc3NgXHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xyXG4gIC8qIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjazsgKi9cclxuYDtcclxuXHJcbmNvbnN0IGdyaWRTdHlsZXMgPSAoY29sdW1uczogbnVtYmVyLCByb3dzOiBudW1iZXIpID0+IGNzc2BcclxuICBwYWRkaW5nOiAke3NwYWNlWzZdfXB4IDA7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgke2NvbHVtbnN9LCBtaW5tYXgoMCwgMWZyKSk7XHJcbiAgLyogVE9ETzogQXJlIHRoZXNlIG1pbm1heCdzIHJlYWxseSBuZWNlc3NhcnkgKi9cclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgke3Jvd3MgLSAxfSwgbWlubWF4KDAsIGF1dG8pKSBtaW5tYXgoMCwgMWZyKTtcclxuICBjb2x1bW4tZ2FwOiAke3NwYWNlWzRdfXB4O1xyXG4gIHJvdy1nYXA6ICR7c3BhY2VbNF19cHg7XHJcbmA7XHJcblxyXG5jb25zdCB0aXRsZVN0eWxlcyA9IGNzc2BcclxuICAvKiBUT0RPOiBFeHBvcnQgdGhpcyBmcm9tIHR5cG9ncmFwaHkudHM/ICovXHJcbiAgZm9udC1mYW1pbHk6ICR7Zm9udHMuc2Fuc307XHJcbiAgZm9udC1zaXplOiAke2ZvbnRTaXplcy5sYXJnZX1yZW07XHJcbiAgZm9udC13ZWlnaHQ6ICR7Zm9udFdlaWdodHMuYm9sZH07XHJcbiAgbGV0dGVyLXNwYWNpbmc6ICR7bGV0dGVyU3BhY2luZ3MuZGVuc2V9O1xyXG4gIHBhZGRpbmc6ICR7c3BhY2VbM119cHggMDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHtjb2xvdXJzLm5ldXRyYWxbMzAwXX07XHJcbmA7XHJcblxyXG5jb25zdCBCbG9jazogRnVuY3Rpb25Db21wb25lbnQ8QmxvY2tQcm9wcz4gPSAoe1xyXG4gIGNvbHVtbnMsXHJcbiAgcm93cyA9IDEsXHJcbiAgdGl0bGUsXHJcbiAgY2hpbGRyZW4sXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNzcz17Y29udGFpbmVyU3R5bGVzfSB7Li4ucHJvcHN9PlxyXG4gICAgICB7dGl0bGUgIT0gbnVsbCAmJiA8ZGl2IGNzcz17dGl0bGVTdHlsZXN9Pnt0aXRsZX08L2Rpdj59XHJcbiAgICAgIDxkaXYgY3NzPXtncmlkU3R5bGVzKGNvbHVtbnMsIHJvd3MpfT57Y2hpbGRyZW59PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmxvY2s7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

const gridStyles = (columns, rows) => /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css)("padding:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.space[6], "px 0;display:grid;grid-template-columns:repeat(", columns, ", minmax(0, 1fr));grid-template-rows:repeat(", rows - 1, ", minmax(0, auto)) minmax(0, 1fr);column-gap:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.space[4], "px;row-gap:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.space[4], "px;" + ( false ? 0 : ";label:gridStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxCbG9jay50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJ5RCIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQmxvY2sudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tIFwicHJlYWN0XCI7XHJcbmltcG9ydCB7IGNzcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQge1xyXG4gIGNvbG91cnMsXHJcbiAgZm9udHMsXHJcbiAgZm9udFNpemVzLFxyXG4gIGZvbnRXZWlnaHRzLFxyXG4gIGxldHRlclNwYWNpbmdzLFxyXG4gIHNwYWNlLFxyXG59IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmxvY2tQcm9wcyBleHRlbmRzIFByb3BzT2Y8XCJkaXZcIj4ge1xyXG4gIGNvbHVtbnM6IG51bWJlcjtcclxuICByb3dzPzogbnVtYmVyO1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBjb250YWluZXJTdHlsZXMgPSBjc3NgXHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xyXG4gIC8qIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjazsgKi9cclxuYDtcclxuXHJcbmNvbnN0IGdyaWRTdHlsZXMgPSAoY29sdW1uczogbnVtYmVyLCByb3dzOiBudW1iZXIpID0+IGNzc2BcclxuICBwYWRkaW5nOiAke3NwYWNlWzZdfXB4IDA7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgke2NvbHVtbnN9LCBtaW5tYXgoMCwgMWZyKSk7XHJcbiAgLyogVE9ETzogQXJlIHRoZXNlIG1pbm1heCdzIHJlYWxseSBuZWNlc3NhcnkgKi9cclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgke3Jvd3MgLSAxfSwgbWlubWF4KDAsIGF1dG8pKSBtaW5tYXgoMCwgMWZyKTtcclxuICBjb2x1bW4tZ2FwOiAke3NwYWNlWzRdfXB4O1xyXG4gIHJvdy1nYXA6ICR7c3BhY2VbNF19cHg7XHJcbmA7XHJcblxyXG5jb25zdCB0aXRsZVN0eWxlcyA9IGNzc2BcclxuICAvKiBUT0RPOiBFeHBvcnQgdGhpcyBmcm9tIHR5cG9ncmFwaHkudHM/ICovXHJcbiAgZm9udC1mYW1pbHk6ICR7Zm9udHMuc2Fuc307XHJcbiAgZm9udC1zaXplOiAke2ZvbnRTaXplcy5sYXJnZX1yZW07XHJcbiAgZm9udC13ZWlnaHQ6ICR7Zm9udFdlaWdodHMuYm9sZH07XHJcbiAgbGV0dGVyLXNwYWNpbmc6ICR7bGV0dGVyU3BhY2luZ3MuZGVuc2V9O1xyXG4gIHBhZGRpbmc6ICR7c3BhY2VbM119cHggMDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHtjb2xvdXJzLm5ldXRyYWxbMzAwXX07XHJcbmA7XHJcblxyXG5jb25zdCBCbG9jazogRnVuY3Rpb25Db21wb25lbnQ8QmxvY2tQcm9wcz4gPSAoe1xyXG4gIGNvbHVtbnMsXHJcbiAgcm93cyA9IDEsXHJcbiAgdGl0bGUsXHJcbiAgY2hpbGRyZW4sXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNzcz17Y29udGFpbmVyU3R5bGVzfSB7Li4ucHJvcHN9PlxyXG4gICAgICB7dGl0bGUgIT0gbnVsbCAmJiA8ZGl2IGNzcz17dGl0bGVTdHlsZXN9Pnt0aXRsZX08L2Rpdj59XHJcbiAgICAgIDxkaXYgY3NzPXtncmlkU3R5bGVzKGNvbHVtbnMsIHJvd3MpfT57Y2hpbGRyZW59PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmxvY2s7XHJcbiJdfQ== */");

const titleStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css)("font-family:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.fonts.sans, ";font-size:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.fontSizes.large, "rem;font-weight:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.fontWeights.bold, ";letter-spacing:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.letterSpacings.dense, ";padding:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.space[3], "px 0;border-bottom:1px solid ", _design_theme__WEBPACK_IMPORTED_MODULE_0__.colours.neutral[300], ";" + ( false ? 0 : ";label:titleStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxCbG9jay50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUN1QiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQmxvY2sudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tIFwicHJlYWN0XCI7XHJcbmltcG9ydCB7IGNzcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQge1xyXG4gIGNvbG91cnMsXHJcbiAgZm9udHMsXHJcbiAgZm9udFNpemVzLFxyXG4gIGZvbnRXZWlnaHRzLFxyXG4gIGxldHRlclNwYWNpbmdzLFxyXG4gIHNwYWNlLFxyXG59IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmxvY2tQcm9wcyBleHRlbmRzIFByb3BzT2Y8XCJkaXZcIj4ge1xyXG4gIGNvbHVtbnM6IG51bWJlcjtcclxuICByb3dzPzogbnVtYmVyO1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBjb250YWluZXJTdHlsZXMgPSBjc3NgXHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xyXG4gIC8qIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjazsgKi9cclxuYDtcclxuXHJcbmNvbnN0IGdyaWRTdHlsZXMgPSAoY29sdW1uczogbnVtYmVyLCByb3dzOiBudW1iZXIpID0+IGNzc2BcclxuICBwYWRkaW5nOiAke3NwYWNlWzZdfXB4IDA7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgke2NvbHVtbnN9LCBtaW5tYXgoMCwgMWZyKSk7XHJcbiAgLyogVE9ETzogQXJlIHRoZXNlIG1pbm1heCdzIHJlYWxseSBuZWNlc3NhcnkgKi9cclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgke3Jvd3MgLSAxfSwgbWlubWF4KDAsIGF1dG8pKSBtaW5tYXgoMCwgMWZyKTtcclxuICBjb2x1bW4tZ2FwOiAke3NwYWNlWzRdfXB4O1xyXG4gIHJvdy1nYXA6ICR7c3BhY2VbNF19cHg7XHJcbmA7XHJcblxyXG5jb25zdCB0aXRsZVN0eWxlcyA9IGNzc2BcclxuICAvKiBUT0RPOiBFeHBvcnQgdGhpcyBmcm9tIHR5cG9ncmFwaHkudHM/ICovXHJcbiAgZm9udC1mYW1pbHk6ICR7Zm9udHMuc2Fuc307XHJcbiAgZm9udC1zaXplOiAke2ZvbnRTaXplcy5sYXJnZX1yZW07XHJcbiAgZm9udC13ZWlnaHQ6ICR7Zm9udFdlaWdodHMuYm9sZH07XHJcbiAgbGV0dGVyLXNwYWNpbmc6ICR7bGV0dGVyU3BhY2luZ3MuZGVuc2V9O1xyXG4gIHBhZGRpbmc6ICR7c3BhY2VbM119cHggMDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHtjb2xvdXJzLm5ldXRyYWxbMzAwXX07XHJcbmA7XHJcblxyXG5jb25zdCBCbG9jazogRnVuY3Rpb25Db21wb25lbnQ8QmxvY2tQcm9wcz4gPSAoe1xyXG4gIGNvbHVtbnMsXHJcbiAgcm93cyA9IDEsXHJcbiAgdGl0bGUsXHJcbiAgY2hpbGRyZW4sXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNzcz17Y29udGFpbmVyU3R5bGVzfSB7Li4ucHJvcHN9PlxyXG4gICAgICB7dGl0bGUgIT0gbnVsbCAmJiA8ZGl2IGNzcz17dGl0bGVTdHlsZXN9Pnt0aXRsZX08L2Rpdj59XHJcbiAgICAgIDxkaXYgY3NzPXtncmlkU3R5bGVzKGNvbHVtbnMsIHJvd3MpfT57Y2hpbGRyZW59PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmxvY2s7XHJcbiJdfQ== */");

const Block = ({
  columns,
  rows = 1,
  title,
  children,
  ...props
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    css: containerStyles,
    ...props,
    children: [title != null && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      css: titleStyles,
      children: title
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      css: gridStyles(columns, rows),
      children: children
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);

/***/ }),

/***/ "./src/web/components/Container.tsx":
/*!******************************************!*\
  !*** ./src/web/components/Container.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.esm.js");
/* harmony import */ var _design_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../design/theme */ "./src/web/design/theme.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }





var _ref =  false ? 0 : {
  name: "gsrvpy-Container",
  styles: "max-width:1000px;margin:0 auto;label:Container;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxDb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCYSIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQ29udGFpbmVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tIFwicHJlYWN0XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbnRhaW5lclByb3BzIGV4dGVuZHMgUHJvcHNPZjxcImRpdlwiPiB7XHJcbiAgZ3JpZD86IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgQ29udGFpbmVyOiBGdW5jdGlvbkNvbXBvbmVudDxDb250YWluZXJQcm9wcz4gPSAoe1xyXG4gIGdyaWQsXHJcbiAgY2hpbGRyZW4sXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHBhZGRpbmc6IDAgJHtzcGFjZVs2XX1weDtcclxuICAgICAgYH1cclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXtbXHJcbiAgICAgICAgICBjc3NgXHJcbiAgICAgICAgICAgIG1heC13aWR0aDogMTAwMHB4O1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgICAgIGAsXHJcbiAgICAgICAgICBncmlkICE9IG51bGwgJiZcclxuICAgICAgICAgICAgY3NzYFxyXG4gICAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KCR7Z3JpZH0sIDFmcik7XHJcbiAgICAgICAgICAgIGAsXHJcbiAgICAgICAgXX1cclxuICAgICAgPlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xyXG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

const Container = ({
  grid,
  children,
  ...props
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)("width:100%;padding:0 ", _design_theme__WEBPACK_IMPORTED_MODULE_0__.space[6], "px;" + ( false ? 0 : ";label:Container;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxDb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVjIiwiZmlsZSI6IkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxDb250YWluZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzLCBQcm9wc09mIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFpbmVyUHJvcHMgZXh0ZW5kcyBQcm9wc09mPFwiZGl2XCI+IHtcclxuICBncmlkPzogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCBDb250YWluZXI6IEZ1bmN0aW9uQ29tcG9uZW50PENvbnRhaW5lclByb3BzPiA9ICh7XHJcbiAgZ3JpZCxcclxuICBjaGlsZHJlbixcclxuICAuLi5wcm9wc1xyXG59KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY3NzPXtjc3NgXHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgcGFkZGluZzogMCAke3NwYWNlWzZdfXB4O1xyXG4gICAgICBgfVxyXG4gICAgICB7Li4ucHJvcHN9XHJcbiAgICA+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjc3M9e1tcclxuICAgICAgICAgIGNzc2BcclxuICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAwcHg7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICAgICAgYCxcclxuICAgICAgICAgIGdyaWQgIT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBjc3NgXHJcbiAgICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoJHtncmlkfSwgMWZyKTtcclxuICAgICAgICAgICAgYCxcclxuICAgICAgICBdfVxyXG4gICAgICA+XHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XHJcbiJdfQ== */"),
    ...props,
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      css: [_ref, grid != null && /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)("grid-template-columns:minmax(", grid, ", 1fr);" + ( false ? 0 : ";label:Container;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxDb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCZSIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQ29udGFpbmVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tIFwicHJlYWN0XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbnRhaW5lclByb3BzIGV4dGVuZHMgUHJvcHNPZjxcImRpdlwiPiB7XHJcbiAgZ3JpZD86IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgQ29udGFpbmVyOiBGdW5jdGlvbkNvbXBvbmVudDxDb250YWluZXJQcm9wcz4gPSAoe1xyXG4gIGdyaWQsXHJcbiAgY2hpbGRyZW4sXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHBhZGRpbmc6IDAgJHtzcGFjZVs2XX1weDtcclxuICAgICAgYH1cclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXtbXHJcbiAgICAgICAgICBjc3NgXHJcbiAgICAgICAgICAgIG1heC13aWR0aDogMTAwMHB4O1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgICAgIGAsXHJcbiAgICAgICAgICBncmlkICE9IG51bGwgJiZcclxuICAgICAgICAgICAgY3NzYFxyXG4gICAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KCR7Z3JpZH0sIDFmcik7XHJcbiAgICAgICAgICAgIGAsXHJcbiAgICAgICAgXX1cclxuICAgICAgPlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xyXG4iXX0= */"),  false ? 0 : ";label:Container;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxDb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCUSIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcQ29udGFpbmVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tIFwicHJlYWN0XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbnRhaW5lclByb3BzIGV4dGVuZHMgUHJvcHNPZjxcImRpdlwiPiB7XHJcbiAgZ3JpZD86IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgQ29udGFpbmVyOiBGdW5jdGlvbkNvbXBvbmVudDxDb250YWluZXJQcm9wcz4gPSAoe1xyXG4gIGdyaWQsXHJcbiAgY2hpbGRyZW4sXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHBhZGRpbmc6IDAgJHtzcGFjZVs2XX1weDtcclxuICAgICAgYH1cclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXtbXHJcbiAgICAgICAgICBjc3NgXHJcbiAgICAgICAgICAgIG1heC13aWR0aDogMTAwMHB4O1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgICAgIGAsXHJcbiAgICAgICAgICBncmlkICE9IG51bGwgJiZcclxuICAgICAgICAgICAgY3NzYFxyXG4gICAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KCR7Z3JpZH0sIDFmcik7XHJcbiAgICAgICAgICAgIGAsXHJcbiAgICAgICAgXX1cclxuICAgICAgPlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xyXG4iXX0= */"],
      children: children
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Container);

/***/ }),

/***/ "./src/web/components/Header.tsx":
/*!***************************************!*\
  !*** ./src/web/components/Header.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.esm.js");
/* harmony import */ var _design_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../design/palette */ "./src/web/design/palette.ts");
/* harmony import */ var _design_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../design/theme */ "./src/web/design/theme.ts");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Logo */ "./src/web/components/Logo.tsx");
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container */ "./src/web/components/Container.tsx");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }








const navStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_4__.css)("display:flex;flex-direction:row;flex-wrap:wrap;margin-top:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.space[5], "px;margin-bottom:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.space[5] - _design_theme__WEBPACK_IMPORTED_MODULE_1__.space[2], "px;a{color:", _design_palette__WEBPACK_IMPORTED_MODULE_0__.text.primary, ";font-family:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.fonts.sans, ";font-weight:bold;letter-spacing:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.letterSpacings.dense, ";text-decoration:none;margin-bottom:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.space[2], "px;:not(:last-of-type){margin-right:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.space[5], "px;}:hover{color:", _design_palette__WEBPACK_IMPORTED_MODULE_0__.text.theme, ";}}" + ( false ? 0 : ";label:navStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxIZWFkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNxQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcSGVhZGVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSBcIi4uL2Rlc2lnbi9wYWxldHRlXCI7XHJcbmltcG9ydCB7IGNvbG91cnMsIGZvbnRzLCBsZXR0ZXJTcGFjaW5ncywgc3BhY2UgfSBmcm9tIFwiLi4vZGVzaWduL3RoZW1lXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgTG9nbyBmcm9tIFwiLi9Mb2dvXCI7XHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vQ29udGFpbmVyXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhlYWRlclByb3BzIHt9XHJcblxyXG5jb25zdCBuYXZTdHlsZXMgPSBjc3NgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBtYXJnaW4tdG9wOiAke3NwYWNlWzVdfXB4O1xyXG4gIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbNV0gLSBzcGFjZVsyXX1weDtcclxuXHJcbiAgYSB7XHJcbiAgICBjb2xvcjogJHt0ZXh0LnByaW1hcnl9O1xyXG4gICAgZm9udC1mYW1pbHk6ICR7Zm9udHMuc2Fuc307XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAke2xldHRlclNwYWNpbmdzLmRlbnNlfTtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbMl19cHg7XHJcblxyXG4gICAgOm5vdCg6bGFzdC1vZi10eXBlKSB7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogJHtzcGFjZVs1XX1weDtcclxuICAgIH1cclxuXHJcbiAgICA6aG92ZXIge1xyXG4gICAgICAvKiB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgKi9cclxuICAgICAgY29sb3I6ICR7dGV4dC50aGVtZX07XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG5cclxuY29uc3QgbWFzdGhlYWRTdHlsZXMgPSBjc3NgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBwYWRkaW5nOiAke3NwYWNlWzZdfXB4IDA7XHJcbmA7XHJcblxyXG5jb25zdCBsb2dvU3R5bGVzID0gY3NzYFxyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xyXG5gO1xyXG5cclxuY29uc3QgZGl2aWRlclN0eWxlcyA9ICh3aXRoU3BhY2VyOiBib29sZWFuKSA9PiB7XHJcbiAgY29uc3Qgc3R5bGVzID0gY3NzYFxyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xyXG4gIGA7XHJcbiAgaWYgKCF3aXRoU3BhY2VyKSByZXR1cm4gc3R5bGVzO1xyXG5cclxuICByZXR1cm4gY3NzYFxyXG4gICAgJHtzdHlsZXN9XHJcbiAgICBtYXJnaW4tdG9wOiAke3NwYWNlWzJdfXB4O1xyXG4gIGA7XHJcbn07XHJcblxyXG5jb25zdCBIZWFkZXI6IEZ1bmN0aW9uQ29tcG9uZW50PEhlYWRlclByb3BzPiA9ICh7fSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8aGVhZGVyPlxyXG4gICAgICA8Q29udGFpbmVyIGNzcz17ZGl2aWRlclN0eWxlcyhmYWxzZSl9PlxyXG4gICAgICAgIDxuYXYgY3NzPXtuYXZTdHlsZXN9PlxyXG4gICAgICAgICAgPGEgaHJlZj1cIi9cIj5MYXRlc3Q8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiPlN0dWRlbnQgRWxlY3Rpb25zPC9hPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIj5MR0JUUSs8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiL2Fib3V0XCI+QWJvdXQ8L2E+XHJcbiAgICAgICAgPC9uYXY+XHJcbiAgICAgIDwvQ29udGFpbmVyPlxyXG4gICAgICA8Q29udGFpbmVyIGNzcz17ZGl2aWRlclN0eWxlcyhmYWxzZSl9PlxyXG4gICAgICAgIDxkaXYgY3NzPXttYXN0aGVhZFN0eWxlc30+XHJcbiAgICAgICAgICA8ZGl2PjwvZGl2PlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPExvZ28gY3NzPXtsb2dvU3R5bGVzfSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvQ29udGFpbmVyPlxyXG4gICAgICA8ZGl2IGNzcz17ZGl2aWRlclN0eWxlcyh0cnVlKX0gLz5cclxuICAgICAgPGRpdiBjc3M9e2RpdmlkZXJTdHlsZXModHJ1ZSl9IC8+XHJcbiAgICA8L2hlYWRlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xyXG4iXX0= */");
const mastheadStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_4__.css)("display:flex;flex-direction:row;justify-content:space-between;padding:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.space[6], "px 0;" + ( false ? 0 : ";label:mastheadStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxIZWFkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1DMEIiLCJmaWxlIjoiQzpcXFVzZXJzXFxuaWNrZFxcRG9jdW1lbnRzXFxzdHVkZW50LWZhYnJpY1xcc3JjXFx3ZWJcXGNvbXBvbmVudHNcXEhlYWRlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcclxuaW1wb3J0IHsgdGV4dCB9IGZyb20gXCIuLi9kZXNpZ24vcGFsZXR0ZVwiO1xyXG5pbXBvcnQgeyBjb2xvdXJzLCBmb250cywgbGV0dGVyU3BhY2luZ3MsIHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IExvZ28gZnJvbSBcIi4vTG9nb1wiO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL0NvbnRhaW5lclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIZWFkZXJQcm9wcyB7fVxyXG5cclxuY29uc3QgbmF2U3R5bGVzID0gY3NzYFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgbWFyZ2luLXRvcDogJHtzcGFjZVs1XX1weDtcclxuICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdIC0gc3BhY2VbMl19cHg7XHJcblxyXG4gIGEge1xyXG4gICAgY29sb3I6ICR7dGV4dC5wcmltYXJ5fTtcclxuICAgIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogJHtsZXR0ZXJTcGFjaW5ncy5kZW5zZX07XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzJdfXB4O1xyXG5cclxuICAgIDpub3QoOmxhc3Qtb2YtdHlwZSkge1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6ICR7c3BhY2VbNV19cHg7XHJcbiAgICB9XHJcblxyXG4gICAgOmhvdmVyIHtcclxuICAgICAgLyogdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7ICovXHJcbiAgICAgIGNvbG9yOiAke3RleHQudGhlbWV9O1xyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IG1hc3RoZWFkU3R5bGVzID0gY3NzYFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgcGFkZGluZzogJHtzcGFjZVs2XX1weCAwO1xyXG5gO1xyXG5cclxuY29uc3QgbG9nb1N0eWxlcyA9IGNzc2BcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtaGVpZ2h0OiAxMDBweDtcclxuYDtcclxuXHJcbmNvbnN0IGRpdmlkZXJTdHlsZXMgPSAod2l0aFNwYWNlcjogYm9vbGVhbikgPT4ge1xyXG4gIGNvbnN0IHN0eWxlcyA9IGNzc2BcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcclxuICBgO1xyXG4gIGlmICghd2l0aFNwYWNlcikgcmV0dXJuIHN0eWxlcztcclxuXHJcbiAgcmV0dXJuIGNzc2BcclxuICAgICR7c3R5bGVzfVxyXG4gICAgbWFyZ2luLXRvcDogJHtzcGFjZVsyXX1weDtcclxuICBgO1xyXG59O1xyXG5cclxuY29uc3QgSGVhZGVyOiBGdW5jdGlvbkNvbXBvbmVudDxIZWFkZXJQcm9wcz4gPSAoe30pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGhlYWRlcj5cclxuICAgICAgPENvbnRhaW5lciBjc3M9e2RpdmlkZXJTdHlsZXMoZmFsc2UpfT5cclxuICAgICAgICA8bmF2IGNzcz17bmF2U3R5bGVzfT5cclxuICAgICAgICAgIDxhIGhyZWY9XCIvXCI+TGF0ZXN0PC9hPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIj5TdHVkZW50IEVsZWN0aW9uczwvYT5cclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCI+TEdCVFErPC9hPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIi9hYm91dFwiPkFib3V0PC9hPlxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgPENvbnRhaW5lciBjc3M9e2RpdmlkZXJTdHlsZXMoZmFsc2UpfT5cclxuICAgICAgICA8ZGl2IGNzcz17bWFzdGhlYWRTdHlsZXN9PlxyXG4gICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxMb2dvIGNzcz17bG9nb1N0eWxlc30gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgPGRpdiBjc3M9e2RpdmlkZXJTdHlsZXModHJ1ZSl9IC8+XHJcbiAgICAgIDxkaXYgY3NzPXtkaXZpZGVyU3R5bGVzKHRydWUpfSAvPlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcclxuIl19 */");
const logoStyles =  false ? 0 : {
  name: "1ted9vi-logoStyles",
  styles: "width:100%;max-height:100px;label:logoStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxIZWFkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBDc0IiLCJmaWxlIjoiQzpcXFVzZXJzXFxuaWNrZFxcRG9jdW1lbnRzXFxzdHVkZW50LWZhYnJpY1xcc3JjXFx3ZWJcXGNvbXBvbmVudHNcXEhlYWRlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcclxuaW1wb3J0IHsgdGV4dCB9IGZyb20gXCIuLi9kZXNpZ24vcGFsZXR0ZVwiO1xyXG5pbXBvcnQgeyBjb2xvdXJzLCBmb250cywgbGV0dGVyU3BhY2luZ3MsIHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IExvZ28gZnJvbSBcIi4vTG9nb1wiO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL0NvbnRhaW5lclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIZWFkZXJQcm9wcyB7fVxyXG5cclxuY29uc3QgbmF2U3R5bGVzID0gY3NzYFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgbWFyZ2luLXRvcDogJHtzcGFjZVs1XX1weDtcclxuICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdIC0gc3BhY2VbMl19cHg7XHJcblxyXG4gIGEge1xyXG4gICAgY29sb3I6ICR7dGV4dC5wcmltYXJ5fTtcclxuICAgIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogJHtsZXR0ZXJTcGFjaW5ncy5kZW5zZX07XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzJdfXB4O1xyXG5cclxuICAgIDpub3QoOmxhc3Qtb2YtdHlwZSkge1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6ICR7c3BhY2VbNV19cHg7XHJcbiAgICB9XHJcblxyXG4gICAgOmhvdmVyIHtcclxuICAgICAgLyogdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7ICovXHJcbiAgICAgIGNvbG9yOiAke3RleHQudGhlbWV9O1xyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IG1hc3RoZWFkU3R5bGVzID0gY3NzYFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgcGFkZGluZzogJHtzcGFjZVs2XX1weCAwO1xyXG5gO1xyXG5cclxuY29uc3QgbG9nb1N0eWxlcyA9IGNzc2BcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtaGVpZ2h0OiAxMDBweDtcclxuYDtcclxuXHJcbmNvbnN0IGRpdmlkZXJTdHlsZXMgPSAod2l0aFNwYWNlcjogYm9vbGVhbikgPT4ge1xyXG4gIGNvbnN0IHN0eWxlcyA9IGNzc2BcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcclxuICBgO1xyXG4gIGlmICghd2l0aFNwYWNlcikgcmV0dXJuIHN0eWxlcztcclxuXHJcbiAgcmV0dXJuIGNzc2BcclxuICAgICR7c3R5bGVzfVxyXG4gICAgbWFyZ2luLXRvcDogJHtzcGFjZVsyXX1weDtcclxuICBgO1xyXG59O1xyXG5cclxuY29uc3QgSGVhZGVyOiBGdW5jdGlvbkNvbXBvbmVudDxIZWFkZXJQcm9wcz4gPSAoe30pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGhlYWRlcj5cclxuICAgICAgPENvbnRhaW5lciBjc3M9e2RpdmlkZXJTdHlsZXMoZmFsc2UpfT5cclxuICAgICAgICA8bmF2IGNzcz17bmF2U3R5bGVzfT5cclxuICAgICAgICAgIDxhIGhyZWY9XCIvXCI+TGF0ZXN0PC9hPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIj5TdHVkZW50IEVsZWN0aW9uczwvYT5cclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCI+TEdCVFErPC9hPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIi9hYm91dFwiPkFib3V0PC9hPlxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgPENvbnRhaW5lciBjc3M9e2RpdmlkZXJTdHlsZXMoZmFsc2UpfT5cclxuICAgICAgICA8ZGl2IGNzcz17bWFzdGhlYWRTdHlsZXN9PlxyXG4gICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxMb2dvIGNzcz17bG9nb1N0eWxlc30gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgPGRpdiBjc3M9e2RpdmlkZXJTdHlsZXModHJ1ZSl9IC8+XHJcbiAgICAgIDxkaXYgY3NzPXtkaXZpZGVyU3R5bGVzKHRydWUpfSAvPlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcclxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

var _ref =  false ? 0 : {
  name: "1ws9izs-styles",
  styles: "border-bottom:1px solid black;label:styles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxIZWFkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdEb0IiLCJmaWxlIjoiQzpcXFVzZXJzXFxuaWNrZFxcRG9jdW1lbnRzXFxzdHVkZW50LWZhYnJpY1xcc3JjXFx3ZWJcXGNvbXBvbmVudHNcXEhlYWRlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcclxuaW1wb3J0IHsgdGV4dCB9IGZyb20gXCIuLi9kZXNpZ24vcGFsZXR0ZVwiO1xyXG5pbXBvcnQgeyBjb2xvdXJzLCBmb250cywgbGV0dGVyU3BhY2luZ3MsIHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IExvZ28gZnJvbSBcIi4vTG9nb1wiO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL0NvbnRhaW5lclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIZWFkZXJQcm9wcyB7fVxyXG5cclxuY29uc3QgbmF2U3R5bGVzID0gY3NzYFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgbWFyZ2luLXRvcDogJHtzcGFjZVs1XX1weDtcclxuICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdIC0gc3BhY2VbMl19cHg7XHJcblxyXG4gIGEge1xyXG4gICAgY29sb3I6ICR7dGV4dC5wcmltYXJ5fTtcclxuICAgIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogJHtsZXR0ZXJTcGFjaW5ncy5kZW5zZX07XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAke3NwYWNlWzJdfXB4O1xyXG5cclxuICAgIDpub3QoOmxhc3Qtb2YtdHlwZSkge1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6ICR7c3BhY2VbNV19cHg7XHJcbiAgICB9XHJcblxyXG4gICAgOmhvdmVyIHtcclxuICAgICAgLyogdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7ICovXHJcbiAgICAgIGNvbG9yOiAke3RleHQudGhlbWV9O1xyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IG1hc3RoZWFkU3R5bGVzID0gY3NzYFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgcGFkZGluZzogJHtzcGFjZVs2XX1weCAwO1xyXG5gO1xyXG5cclxuY29uc3QgbG9nb1N0eWxlcyA9IGNzc2BcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtaGVpZ2h0OiAxMDBweDtcclxuYDtcclxuXHJcbmNvbnN0IGRpdmlkZXJTdHlsZXMgPSAod2l0aFNwYWNlcjogYm9vbGVhbikgPT4ge1xyXG4gIGNvbnN0IHN0eWxlcyA9IGNzc2BcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcclxuICBgO1xyXG4gIGlmICghd2l0aFNwYWNlcikgcmV0dXJuIHN0eWxlcztcclxuXHJcbiAgcmV0dXJuIGNzc2BcclxuICAgICR7c3R5bGVzfVxyXG4gICAgbWFyZ2luLXRvcDogJHtzcGFjZVsyXX1weDtcclxuICBgO1xyXG59O1xyXG5cclxuY29uc3QgSGVhZGVyOiBGdW5jdGlvbkNvbXBvbmVudDxIZWFkZXJQcm9wcz4gPSAoe30pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGhlYWRlcj5cclxuICAgICAgPENvbnRhaW5lciBjc3M9e2RpdmlkZXJTdHlsZXMoZmFsc2UpfT5cclxuICAgICAgICA8bmF2IGNzcz17bmF2U3R5bGVzfT5cclxuICAgICAgICAgIDxhIGhyZWY9XCIvXCI+TGF0ZXN0PC9hPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIj5TdHVkZW50IEVsZWN0aW9uczwvYT5cclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCI+TEdCVFErPC9hPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIi9hYm91dFwiPkFib3V0PC9hPlxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgPENvbnRhaW5lciBjc3M9e2RpdmlkZXJTdHlsZXMoZmFsc2UpfT5cclxuICAgICAgICA8ZGl2IGNzcz17bWFzdGhlYWRTdHlsZXN9PlxyXG4gICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxMb2dvIGNzcz17bG9nb1N0eWxlc30gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgPGRpdiBjc3M9e2RpdmlkZXJTdHlsZXModHJ1ZSl9IC8+XHJcbiAgICAgIDxkaXYgY3NzPXtkaXZpZGVyU3R5bGVzKHRydWUpfSAvPlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcclxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

const dividerStyles = withSpacer => {
  const styles = _ref;
  if (!withSpacer) return styles;
  return /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_4__.css)(styles, " margin-top:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.space[2], "px;" + ( false ? 0 : ";label:dividerStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxIZWFkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFEWSIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcSGVhZGVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSBcIi4uL2Rlc2lnbi9wYWxldHRlXCI7XHJcbmltcG9ydCB7IGNvbG91cnMsIGZvbnRzLCBsZXR0ZXJTcGFjaW5ncywgc3BhY2UgfSBmcm9tIFwiLi4vZGVzaWduL3RoZW1lXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgTG9nbyBmcm9tIFwiLi9Mb2dvXCI7XHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vQ29udGFpbmVyXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhlYWRlclByb3BzIHt9XHJcblxyXG5jb25zdCBuYXZTdHlsZXMgPSBjc3NgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBtYXJnaW4tdG9wOiAke3NwYWNlWzVdfXB4O1xyXG4gIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbNV0gLSBzcGFjZVsyXX1weDtcclxuXHJcbiAgYSB7XHJcbiAgICBjb2xvcjogJHt0ZXh0LnByaW1hcnl9O1xyXG4gICAgZm9udC1mYW1pbHk6ICR7Zm9udHMuc2Fuc307XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAke2xldHRlclNwYWNpbmdzLmRlbnNlfTtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIG1hcmdpbi1ib3R0b206ICR7c3BhY2VbMl19cHg7XHJcblxyXG4gICAgOm5vdCg6bGFzdC1vZi10eXBlKSB7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogJHtzcGFjZVs1XX1weDtcclxuICAgIH1cclxuXHJcbiAgICA6aG92ZXIge1xyXG4gICAgICAvKiB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgKi9cclxuICAgICAgY29sb3I6ICR7dGV4dC50aGVtZX07XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG5cclxuY29uc3QgbWFzdGhlYWRTdHlsZXMgPSBjc3NgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBwYWRkaW5nOiAke3NwYWNlWzZdfXB4IDA7XHJcbmA7XHJcblxyXG5jb25zdCBsb2dvU3R5bGVzID0gY3NzYFxyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xyXG5gO1xyXG5cclxuY29uc3QgZGl2aWRlclN0eWxlcyA9ICh3aXRoU3BhY2VyOiBib29sZWFuKSA9PiB7XHJcbiAgY29uc3Qgc3R5bGVzID0gY3NzYFxyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xyXG4gIGA7XHJcbiAgaWYgKCF3aXRoU3BhY2VyKSByZXR1cm4gc3R5bGVzO1xyXG5cclxuICByZXR1cm4gY3NzYFxyXG4gICAgJHtzdHlsZXN9XHJcbiAgICBtYXJnaW4tdG9wOiAke3NwYWNlWzJdfXB4O1xyXG4gIGA7XHJcbn07XHJcblxyXG5jb25zdCBIZWFkZXI6IEZ1bmN0aW9uQ29tcG9uZW50PEhlYWRlclByb3BzPiA9ICh7fSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8aGVhZGVyPlxyXG4gICAgICA8Q29udGFpbmVyIGNzcz17ZGl2aWRlclN0eWxlcyhmYWxzZSl9PlxyXG4gICAgICAgIDxuYXYgY3NzPXtuYXZTdHlsZXN9PlxyXG4gICAgICAgICAgPGEgaHJlZj1cIi9cIj5MYXRlc3Q8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiPlN0dWRlbnQgRWxlY3Rpb25zPC9hPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIj5MR0JUUSs8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiL2Fib3V0XCI+QWJvdXQ8L2E+XHJcbiAgICAgICAgPC9uYXY+XHJcbiAgICAgIDwvQ29udGFpbmVyPlxyXG4gICAgICA8Q29udGFpbmVyIGNzcz17ZGl2aWRlclN0eWxlcyhmYWxzZSl9PlxyXG4gICAgICAgIDxkaXYgY3NzPXttYXN0aGVhZFN0eWxlc30+XHJcbiAgICAgICAgICA8ZGl2PjwvZGl2PlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPExvZ28gY3NzPXtsb2dvU3R5bGVzfSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvQ29udGFpbmVyPlxyXG4gICAgICA8ZGl2IGNzcz17ZGl2aWRlclN0eWxlcyh0cnVlKX0gLz5cclxuICAgICAgPGRpdiBjc3M9e2RpdmlkZXJTdHlsZXModHJ1ZSl9IC8+XHJcbiAgICA8L2hlYWRlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xyXG4iXX0= */");
};

const Header = ({}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("header", {
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Container__WEBPACK_IMPORTED_MODULE_3__.default, {
      css: dividerStyles(false),
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("nav", {
        css: navStyles,
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: "/",
          children: "Latest"
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: "#",
          children: "Student Elections"
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: "#",
          children: "LGBTQ+"
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: "/about",
          children: "About"
        })]
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Container__WEBPACK_IMPORTED_MODULE_3__.default, {
      css: dividerStyles(false),
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        css: mastheadStyles,
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {}), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Logo__WEBPACK_IMPORTED_MODULE_2__.default, {
            css: logoStyles
          })
        })]
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      css: dividerStyles(true)
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      css: dividerStyles(true)
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/web/components/LinkArea.tsx":
/*!*****************************************!*\
  !*** ./src/web/components/LinkArea.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.esm.js");
/* harmony import */ var _design_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../design/theme */ "./src/web/design/theme.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");



const linkStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css)("position:absolute;top:0;left:0;bottom:0;right:0;opacity:0;z-index:", _design_theme__WEBPACK_IMPORTED_MODULE_0__.zIndices.linkArea, ";:hover{~[data-link-hover=\"underline\"]{text-decoration:underline;}}" + ( false ? 0 : ";label:linkStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMaW5rQXJlYS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU3NCIiwiZmlsZSI6IkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMaW5rQXJlYS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcclxuaW1wb3J0IHsgekluZGljZXMgfSBmcm9tIFwiLi4vZGVzaWduL3RoZW1lXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaW5rQXJlYVByb3BzIHtcclxuICBocmVmOiBzdHJpbmc7XHJcbiAgdGFyZ2V0Qmxhbms/OiBib29sZWFuO1xyXG59XHJcblxyXG5jb25zdCBsaW5rU3R5bGVzID0gY3NzYFxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICBib3R0b206IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgb3BhY2l0eTogMDtcclxuICB6LWluZGV4OiAke3pJbmRpY2VzLmxpbmtBcmVhfTtcclxuXHJcbiAgOmhvdmVyIHtcclxuICAgIH4gW2RhdGEtbGluay1ob3Zlcj1cInVuZGVybGluZVwiXSB7XHJcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IExpbmtBcmVhOiBGdW5jdGlvbkNvbXBvbmVudDxMaW5rQXJlYVByb3BzPiA9ICh7XHJcbiAgaHJlZixcclxuICB0YXJnZXRCbGFuayA9IGZhbHNlLFxyXG59KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxhXHJcbiAgICAgIGNzcz17bGlua1N0eWxlc31cclxuICAgICAgaHJlZj17aHJlZn1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgdGFyZ2V0PXt0YXJnZXRCbGFuayA/IFwiX19ibGFua1wiIDogdW5kZWZpbmVkfVxyXG4gICAgICByZWw9XCJub29wZW5lclwiXHJcbiAgICA+XHJcbiAgICAgIExpbmtcclxuICAgIDwvYT5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlua0FyZWE7XHJcbiJdfQ== */");

const LinkArea = ({
  href,
  targetBlank = false
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
    css: linkStyles,
    href: href,
    "aria-hidden": "true",
    target: targetBlank ? "__blank" : undefined,
    rel: "noopener",
    children: "Link"
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkArea);

/***/ }),

/***/ "./src/web/components/LiveBadge.tsx":
/*!******************************************!*\
  !*** ./src/web/components/LiveBadge.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LiveBadgeType": () => (/* binding */ LiveBadgeType),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.esm.js");
/* harmony import */ var _design_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../design/palette */ "./src/web/design/palette.ts");
/* harmony import */ var _design_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../design/theme */ "./src/web/design/theme.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }






let LiveBadgeType;

(function (LiveBadgeType) {
  LiveBadgeType["Solid"] = "solid";
  LiveBadgeType["Transparent"] = "transparent";
})(LiveBadgeType || (LiveBadgeType = {}));

const badgeStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)("font-size:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.fontSizes.small, "rem;font-family:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.fonts.sans, ";font-weight:bold;display:flex;width:min-content;flex-direction:row;align-items:center;" + ( false ? 0 : ";label:badgeStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMaXZlQmFkZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWN1QiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcTGl2ZUJhZGdlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcywga2V5ZnJhbWVzLCBQcm9wc09mIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgeyBiZywgdGV4dCB9IGZyb20gXCIuLi9kZXNpZ24vcGFsZXR0ZVwiO1xyXG5pbXBvcnQgeyBmb250cywgZm9udFNpemVzIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gTGl2ZUJhZGdlVHlwZSB7XHJcbiAgU29saWQgPSBcInNvbGlkXCIsXHJcbiAgVHJhbnNwYXJlbnQgPSBcInRyYW5zcGFyZW50XCIsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGl2ZUJhZGdlUHJvcHMgZXh0ZW5kcyBQcm9wc09mPFwiZGl2XCI+IHtcclxuICB0eXBlPzogTGl2ZUJhZGdlVHlwZTtcclxufVxyXG5cclxuY29uc3QgYmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgZm9udC1zaXplOiAke2ZvbnRTaXplcy5zbWFsbH1yZW07XHJcbiAgZm9udC1mYW1pbHk6ICR7Zm9udHMuc2Fuc307XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcblxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuYDtcclxuXHJcbmNvbnN0IHNvbGlkQmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgcGFkZGluZzogNXB4IDhweDtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgY29sb3I6ICR7dGV4dC5saXZlSW52ZXJzZX07XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtiZy5saXZlfTtcclxuYDtcclxuXHJcbmNvbnN0IHRyYW5zcGFyZW50QmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgcGFkZGluZy1sZWZ0OiAxcHg7XHJcbiAgY29sb3I6ICR7dGV4dC5saXZlfTtcclxuYDtcclxuXHJcbmNvbnN0IGluZGljYXRvckFuaW1hdGlvbiA9IGtleWZyYW1lc2BcclxuICAwJSB7b3BhY2l0eTogMTt9XHJcbiAgMTAlIHtvcGFjaXR5OiAuMjU7fVxyXG4gIDQwJSB7b3BhY2l0eTogMTt9XHJcbiAgMTAwJSB7b3BhY2l0eTogMTt9XHJcbmA7XHJcblxyXG5jb25zdCBpbmRpY2F0b3JTdHlsZXMgPSBjc3NgXHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHdpZHRoOiA4cHg7XHJcbiAgaGVpZ2h0OiA4cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XHJcblxyXG4gIGFuaW1hdGlvbjogJHtpbmRpY2F0b3JBbmltYXRpb259IDFzIGluZmluaXRlO1xyXG5cclxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xyXG4gICAgYW5pbWF0aW9uOiBub25lO1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IHRleHRTdHlsZXMgPSBjc3NgXHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbmA7XHJcblxyXG5jb25zdCBMaXZlQmFkZ2U6IEZ1bmN0aW9uQ29tcG9uZW50PExpdmVCYWRnZVByb3BzPiA9ICh7XHJcbiAgdHlwZSA9IExpdmVCYWRnZVR5cGUuU29saWQsXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHsuLi5wcm9wc30+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjc3M9e1tcclxuICAgICAgICAgIGJhZGdlU3R5bGVzLFxyXG4gICAgICAgICAgdHlwZSA9PSBMaXZlQmFkZ2VUeXBlLlNvbGlkXHJcbiAgICAgICAgICAgID8gc29saWRCYWRnZVN0eWxlc1xyXG4gICAgICAgICAgICA6IHRyYW5zcGFyZW50QmFkZ2VTdHlsZXMsXHJcbiAgICAgICAgXX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNzcz17W1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JTdHlsZXMsXHJcbiAgICAgICAgICAgIGNzc2BcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3R5cGUgPT0gTGl2ZUJhZGdlVHlwZS5Tb2xpZFxyXG4gICAgICAgICAgICAgICAgPyB0ZXh0LmxpdmVJbnZlcnNlXHJcbiAgICAgICAgICAgICAgICA6IHRleHQubGl2ZX07XHJcbiAgICAgICAgICAgIGAsXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNzcz17dGV4dFN0eWxlc30+TElWRTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXZlQmFkZ2U7XHJcbiJdfQ== */");
const solidBadgeStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)("padding:5px 8px;border-radius:3px;color:", _design_palette__WEBPACK_IMPORTED_MODULE_0__.text.liveInverse, ";background-color:", _design_palette__WEBPACK_IMPORTED_MODULE_0__.bg.live, ";" + ( false ? 0 : ";label:solidBadgeStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMaXZlQmFkZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCNEIiLCJmaWxlIjoiQzpcXFVzZXJzXFxuaWNrZFxcRG9jdW1lbnRzXFxzdHVkZW50LWZhYnJpY1xcc3JjXFx3ZWJcXGNvbXBvbmVudHNcXExpdmVCYWRnZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MsIGtleWZyYW1lcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IHsgYmcsIHRleHQgfSBmcm9tIFwiLi4vZGVzaWduL3BhbGV0dGVcIjtcclxuaW1wb3J0IHsgZm9udHMsIGZvbnRTaXplcyB9IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIExpdmVCYWRnZVR5cGUge1xyXG4gIFNvbGlkID0gXCJzb2xpZFwiLFxyXG4gIFRyYW5zcGFyZW50ID0gXCJ0cmFuc3BhcmVudFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpdmVCYWRnZVByb3BzIGV4dGVuZHMgUHJvcHNPZjxcImRpdlwiPiB7XHJcbiAgdHlwZT86IExpdmVCYWRnZVR5cGU7XHJcbn1cclxuXHJcbmNvbnN0IGJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIGZvbnQtc2l6ZTogJHtmb250U2l6ZXMuc21hbGx9cmVtO1xyXG4gIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiBtaW4tY29udGVudDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCBzb2xpZEJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIHBhZGRpbmc6IDVweCA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZUludmVyc2V9O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICR7YmcubGl2ZX07XHJcbmA7XHJcblxyXG5jb25zdCB0cmFuc3BhcmVudEJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIHBhZGRpbmctbGVmdDogMXB4O1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZX07XHJcbmA7XHJcblxyXG5jb25zdCBpbmRpY2F0b3JBbmltYXRpb24gPSBrZXlmcmFtZXNgXHJcbiAgMCUge29wYWNpdHk6IDE7fVxyXG4gIDEwJSB7b3BhY2l0eTogLjI1O31cclxuICA0MCUge29wYWNpdHk6IDE7fVxyXG4gIDEwMCUge29wYWNpdHk6IDE7fVxyXG5gO1xyXG5cclxuY29uc3QgaW5kaWNhdG9yU3R5bGVzID0gY3NzYFxyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB3aWR0aDogOHB4O1xyXG4gIGhlaWdodDogOHB4O1xyXG4gIG1hcmdpbi1yaWdodDogNnB4O1xyXG5cclxuICBhbmltYXRpb246ICR7aW5kaWNhdG9yQW5pbWF0aW9ufSAxcyBpbmZpbml0ZTtcclxuXHJcbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcclxuICAgIGFuaW1hdGlvbjogbm9uZTtcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG5gO1xyXG5cclxuY29uc3QgTGl2ZUJhZGdlOiBGdW5jdGlvbkNvbXBvbmVudDxMaXZlQmFkZ2VQcm9wcz4gPSAoe1xyXG4gIHR5cGUgPSBMaXZlQmFkZ2VUeXBlLlNvbGlkLFxyXG4gIC4uLnByb3BzXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiB7Li4ucHJvcHN9PlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXtbXHJcbiAgICAgICAgICBiYWRnZVN0eWxlcyxcclxuICAgICAgICAgIHR5cGUgPT0gTGl2ZUJhZGdlVHlwZS5Tb2xpZFxyXG4gICAgICAgICAgICA/IHNvbGlkQmFkZ2VTdHlsZXNcclxuICAgICAgICAgICAgOiB0cmFuc3BhcmVudEJhZGdlU3R5bGVzLFxyXG4gICAgICAgIF19XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjc3M9e1tcclxuICAgICAgICAgICAgaW5kaWNhdG9yU3R5bGVzLFxyXG4gICAgICAgICAgICBjc3NgXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0eXBlID09IExpdmVCYWRnZVR5cGUuU29saWRcclxuICAgICAgICAgICAgICAgID8gdGV4dC5saXZlSW52ZXJzZVxyXG4gICAgICAgICAgICAgICAgOiB0ZXh0LmxpdmV9O1xyXG4gICAgICAgICAgICBgLFxyXG4gICAgICAgICAgXX1cclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjc3M9e3RleHRTdHlsZXN9PkxJVkU8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGl2ZUJhZGdlO1xyXG4iXX0= */");
const transparentBadgeStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)("padding-left:1px;color:", _design_palette__WEBPACK_IMPORTED_MODULE_0__.text.live, ";" + ( false ? 0 : ";label:transparentBadgeStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMaXZlQmFkZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdDa0MiLCJmaWxlIjoiQzpcXFVzZXJzXFxuaWNrZFxcRG9jdW1lbnRzXFxzdHVkZW50LWZhYnJpY1xcc3JjXFx3ZWJcXGNvbXBvbmVudHNcXExpdmVCYWRnZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MsIGtleWZyYW1lcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IHsgYmcsIHRleHQgfSBmcm9tIFwiLi4vZGVzaWduL3BhbGV0dGVcIjtcclxuaW1wb3J0IHsgZm9udHMsIGZvbnRTaXplcyB9IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIExpdmVCYWRnZVR5cGUge1xyXG4gIFNvbGlkID0gXCJzb2xpZFwiLFxyXG4gIFRyYW5zcGFyZW50ID0gXCJ0cmFuc3BhcmVudFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpdmVCYWRnZVByb3BzIGV4dGVuZHMgUHJvcHNPZjxcImRpdlwiPiB7XHJcbiAgdHlwZT86IExpdmVCYWRnZVR5cGU7XHJcbn1cclxuXHJcbmNvbnN0IGJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIGZvbnQtc2l6ZTogJHtmb250U2l6ZXMuc21hbGx9cmVtO1xyXG4gIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiBtaW4tY29udGVudDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCBzb2xpZEJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIHBhZGRpbmc6IDVweCA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZUludmVyc2V9O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICR7YmcubGl2ZX07XHJcbmA7XHJcblxyXG5jb25zdCB0cmFuc3BhcmVudEJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIHBhZGRpbmctbGVmdDogMXB4O1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZX07XHJcbmA7XHJcblxyXG5jb25zdCBpbmRpY2F0b3JBbmltYXRpb24gPSBrZXlmcmFtZXNgXHJcbiAgMCUge29wYWNpdHk6IDE7fVxyXG4gIDEwJSB7b3BhY2l0eTogLjI1O31cclxuICA0MCUge29wYWNpdHk6IDE7fVxyXG4gIDEwMCUge29wYWNpdHk6IDE7fVxyXG5gO1xyXG5cclxuY29uc3QgaW5kaWNhdG9yU3R5bGVzID0gY3NzYFxyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB3aWR0aDogOHB4O1xyXG4gIGhlaWdodDogOHB4O1xyXG4gIG1hcmdpbi1yaWdodDogNnB4O1xyXG5cclxuICBhbmltYXRpb246ICR7aW5kaWNhdG9yQW5pbWF0aW9ufSAxcyBpbmZpbml0ZTtcclxuXHJcbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcclxuICAgIGFuaW1hdGlvbjogbm9uZTtcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG5gO1xyXG5cclxuY29uc3QgTGl2ZUJhZGdlOiBGdW5jdGlvbkNvbXBvbmVudDxMaXZlQmFkZ2VQcm9wcz4gPSAoe1xyXG4gIHR5cGUgPSBMaXZlQmFkZ2VUeXBlLlNvbGlkLFxyXG4gIC4uLnByb3BzXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiB7Li4ucHJvcHN9PlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXtbXHJcbiAgICAgICAgICBiYWRnZVN0eWxlcyxcclxuICAgICAgICAgIHR5cGUgPT0gTGl2ZUJhZGdlVHlwZS5Tb2xpZFxyXG4gICAgICAgICAgICA/IHNvbGlkQmFkZ2VTdHlsZXNcclxuICAgICAgICAgICAgOiB0cmFuc3BhcmVudEJhZGdlU3R5bGVzLFxyXG4gICAgICAgIF19XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjc3M9e1tcclxuICAgICAgICAgICAgaW5kaWNhdG9yU3R5bGVzLFxyXG4gICAgICAgICAgICBjc3NgXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0eXBlID09IExpdmVCYWRnZVR5cGUuU29saWRcclxuICAgICAgICAgICAgICAgID8gdGV4dC5saXZlSW52ZXJzZVxyXG4gICAgICAgICAgICAgICAgOiB0ZXh0LmxpdmV9O1xyXG4gICAgICAgICAgICBgLFxyXG4gICAgICAgICAgXX1cclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjc3M9e3RleHRTdHlsZXN9PkxJVkU8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGl2ZUJhZGdlO1xyXG4iXX0= */");
const indicatorAnimation = _emotion_react__WEBPACK_IMPORTED_MODULE_2__.keyframes`
  0% {opacity: 1;}
  10% {opacity: .25;}
  40% {opacity: 1;}
  100% {opacity: 1;}
`;
const indicatorStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)("border-radius:50%;width:8px;height:8px;margin-right:6px;animation:", indicatorAnimation, " 1s infinite;@media (prefers-reduced-motion: reduce){animation:none;}" + ( false ? 0 : ";label:indicatorStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMaXZlQmFkZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRDMkIiLCJmaWxlIjoiQzpcXFVzZXJzXFxuaWNrZFxcRG9jdW1lbnRzXFxzdHVkZW50LWZhYnJpY1xcc3JjXFx3ZWJcXGNvbXBvbmVudHNcXExpdmVCYWRnZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MsIGtleWZyYW1lcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IHsgYmcsIHRleHQgfSBmcm9tIFwiLi4vZGVzaWduL3BhbGV0dGVcIjtcclxuaW1wb3J0IHsgZm9udHMsIGZvbnRTaXplcyB9IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIExpdmVCYWRnZVR5cGUge1xyXG4gIFNvbGlkID0gXCJzb2xpZFwiLFxyXG4gIFRyYW5zcGFyZW50ID0gXCJ0cmFuc3BhcmVudFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpdmVCYWRnZVByb3BzIGV4dGVuZHMgUHJvcHNPZjxcImRpdlwiPiB7XHJcbiAgdHlwZT86IExpdmVCYWRnZVR5cGU7XHJcbn1cclxuXHJcbmNvbnN0IGJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIGZvbnQtc2l6ZTogJHtmb250U2l6ZXMuc21hbGx9cmVtO1xyXG4gIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiBtaW4tY29udGVudDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCBzb2xpZEJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIHBhZGRpbmc6IDVweCA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZUludmVyc2V9O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICR7YmcubGl2ZX07XHJcbmA7XHJcblxyXG5jb25zdCB0cmFuc3BhcmVudEJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIHBhZGRpbmctbGVmdDogMXB4O1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZX07XHJcbmA7XHJcblxyXG5jb25zdCBpbmRpY2F0b3JBbmltYXRpb24gPSBrZXlmcmFtZXNgXHJcbiAgMCUge29wYWNpdHk6IDE7fVxyXG4gIDEwJSB7b3BhY2l0eTogLjI1O31cclxuICA0MCUge29wYWNpdHk6IDE7fVxyXG4gIDEwMCUge29wYWNpdHk6IDE7fVxyXG5gO1xyXG5cclxuY29uc3QgaW5kaWNhdG9yU3R5bGVzID0gY3NzYFxyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB3aWR0aDogOHB4O1xyXG4gIGhlaWdodDogOHB4O1xyXG4gIG1hcmdpbi1yaWdodDogNnB4O1xyXG5cclxuICBhbmltYXRpb246ICR7aW5kaWNhdG9yQW5pbWF0aW9ufSAxcyBpbmZpbml0ZTtcclxuXHJcbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcclxuICAgIGFuaW1hdGlvbjogbm9uZTtcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG5gO1xyXG5cclxuY29uc3QgTGl2ZUJhZGdlOiBGdW5jdGlvbkNvbXBvbmVudDxMaXZlQmFkZ2VQcm9wcz4gPSAoe1xyXG4gIHR5cGUgPSBMaXZlQmFkZ2VUeXBlLlNvbGlkLFxyXG4gIC4uLnByb3BzXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiB7Li4ucHJvcHN9PlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXtbXHJcbiAgICAgICAgICBiYWRnZVN0eWxlcyxcclxuICAgICAgICAgIHR5cGUgPT0gTGl2ZUJhZGdlVHlwZS5Tb2xpZFxyXG4gICAgICAgICAgICA/IHNvbGlkQmFkZ2VTdHlsZXNcclxuICAgICAgICAgICAgOiB0cmFuc3BhcmVudEJhZGdlU3R5bGVzLFxyXG4gICAgICAgIF19XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjc3M9e1tcclxuICAgICAgICAgICAgaW5kaWNhdG9yU3R5bGVzLFxyXG4gICAgICAgICAgICBjc3NgXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0eXBlID09IExpdmVCYWRnZVR5cGUuU29saWRcclxuICAgICAgICAgICAgICAgID8gdGV4dC5saXZlSW52ZXJzZVxyXG4gICAgICAgICAgICAgICAgOiB0ZXh0LmxpdmV9O1xyXG4gICAgICAgICAgICBgLFxyXG4gICAgICAgICAgXX1cclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjc3M9e3RleHRTdHlsZXN9PkxJVkU8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGl2ZUJhZGdlO1xyXG4iXX0= */");
const textStyles =  false ? 0 : {
  name: "fnpr8t-textStyles",
  styles: "line-height:1;label:textStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMaXZlQmFkZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlEc0IiLCJmaWxlIjoiQzpcXFVzZXJzXFxuaWNrZFxcRG9jdW1lbnRzXFxzdHVkZW50LWZhYnJpY1xcc3JjXFx3ZWJcXGNvbXBvbmVudHNcXExpdmVCYWRnZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MsIGtleWZyYW1lcywgUHJvcHNPZiB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IHsgYmcsIHRleHQgfSBmcm9tIFwiLi4vZGVzaWduL3BhbGV0dGVcIjtcclxuaW1wb3J0IHsgZm9udHMsIGZvbnRTaXplcyB9IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIExpdmVCYWRnZVR5cGUge1xyXG4gIFNvbGlkID0gXCJzb2xpZFwiLFxyXG4gIFRyYW5zcGFyZW50ID0gXCJ0cmFuc3BhcmVudFwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpdmVCYWRnZVByb3BzIGV4dGVuZHMgUHJvcHNPZjxcImRpdlwiPiB7XHJcbiAgdHlwZT86IExpdmVCYWRnZVR5cGU7XHJcbn1cclxuXHJcbmNvbnN0IGJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIGZvbnQtc2l6ZTogJHtmb250U2l6ZXMuc21hbGx9cmVtO1xyXG4gIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiBtaW4tY29udGVudDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCBzb2xpZEJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIHBhZGRpbmc6IDVweCA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZUludmVyc2V9O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICR7YmcubGl2ZX07XHJcbmA7XHJcblxyXG5jb25zdCB0cmFuc3BhcmVudEJhZGdlU3R5bGVzID0gY3NzYFxyXG4gIHBhZGRpbmctbGVmdDogMXB4O1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZX07XHJcbmA7XHJcblxyXG5jb25zdCBpbmRpY2F0b3JBbmltYXRpb24gPSBrZXlmcmFtZXNgXHJcbiAgMCUge29wYWNpdHk6IDE7fVxyXG4gIDEwJSB7b3BhY2l0eTogLjI1O31cclxuICA0MCUge29wYWNpdHk6IDE7fVxyXG4gIDEwMCUge29wYWNpdHk6IDE7fVxyXG5gO1xyXG5cclxuY29uc3QgaW5kaWNhdG9yU3R5bGVzID0gY3NzYFxyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB3aWR0aDogOHB4O1xyXG4gIGhlaWdodDogOHB4O1xyXG4gIG1hcmdpbi1yaWdodDogNnB4O1xyXG5cclxuICBhbmltYXRpb246ICR7aW5kaWNhdG9yQW5pbWF0aW9ufSAxcyBpbmZpbml0ZTtcclxuXHJcbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcclxuICAgIGFuaW1hdGlvbjogbm9uZTtcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCB0ZXh0U3R5bGVzID0gY3NzYFxyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG5gO1xyXG5cclxuY29uc3QgTGl2ZUJhZGdlOiBGdW5jdGlvbkNvbXBvbmVudDxMaXZlQmFkZ2VQcm9wcz4gPSAoe1xyXG4gIHR5cGUgPSBMaXZlQmFkZ2VUeXBlLlNvbGlkLFxyXG4gIC4uLnByb3BzXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiB7Li4ucHJvcHN9PlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY3NzPXtbXHJcbiAgICAgICAgICBiYWRnZVN0eWxlcyxcclxuICAgICAgICAgIHR5cGUgPT0gTGl2ZUJhZGdlVHlwZS5Tb2xpZFxyXG4gICAgICAgICAgICA/IHNvbGlkQmFkZ2VTdHlsZXNcclxuICAgICAgICAgICAgOiB0cmFuc3BhcmVudEJhZGdlU3R5bGVzLFxyXG4gICAgICAgIF19XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjc3M9e1tcclxuICAgICAgICAgICAgaW5kaWNhdG9yU3R5bGVzLFxyXG4gICAgICAgICAgICBjc3NgXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0eXBlID09IExpdmVCYWRnZVR5cGUuU29saWRcclxuICAgICAgICAgICAgICAgID8gdGV4dC5saXZlSW52ZXJzZVxyXG4gICAgICAgICAgICAgICAgOiB0ZXh0LmxpdmV9O1xyXG4gICAgICAgICAgICBgLFxyXG4gICAgICAgICAgXX1cclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjc3M9e3RleHRTdHlsZXN9PkxJVkU8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGl2ZUJhZGdlO1xyXG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

const LiveBadge = ({
  type = LiveBadgeType.Solid,
  ...props
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", { ...props,
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      css: [badgeStyles, type == LiveBadgeType.Solid ? solidBadgeStyles : transparentBadgeStyles,  false ? 0 : ";label:LiveBadge;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMaXZlQmFkZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9FUSIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcTGl2ZUJhZGdlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcywga2V5ZnJhbWVzLCBQcm9wc09mIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgeyBiZywgdGV4dCB9IGZyb20gXCIuLi9kZXNpZ24vcGFsZXR0ZVwiO1xyXG5pbXBvcnQgeyBmb250cywgZm9udFNpemVzIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gTGl2ZUJhZGdlVHlwZSB7XHJcbiAgU29saWQgPSBcInNvbGlkXCIsXHJcbiAgVHJhbnNwYXJlbnQgPSBcInRyYW5zcGFyZW50XCIsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGl2ZUJhZGdlUHJvcHMgZXh0ZW5kcyBQcm9wc09mPFwiZGl2XCI+IHtcclxuICB0eXBlPzogTGl2ZUJhZGdlVHlwZTtcclxufVxyXG5cclxuY29uc3QgYmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgZm9udC1zaXplOiAke2ZvbnRTaXplcy5zbWFsbH1yZW07XHJcbiAgZm9udC1mYW1pbHk6ICR7Zm9udHMuc2Fuc307XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcblxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuYDtcclxuXHJcbmNvbnN0IHNvbGlkQmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgcGFkZGluZzogNXB4IDhweDtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgY29sb3I6ICR7dGV4dC5saXZlSW52ZXJzZX07XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtiZy5saXZlfTtcclxuYDtcclxuXHJcbmNvbnN0IHRyYW5zcGFyZW50QmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgcGFkZGluZy1sZWZ0OiAxcHg7XHJcbiAgY29sb3I6ICR7dGV4dC5saXZlfTtcclxuYDtcclxuXHJcbmNvbnN0IGluZGljYXRvckFuaW1hdGlvbiA9IGtleWZyYW1lc2BcclxuICAwJSB7b3BhY2l0eTogMTt9XHJcbiAgMTAlIHtvcGFjaXR5OiAuMjU7fVxyXG4gIDQwJSB7b3BhY2l0eTogMTt9XHJcbiAgMTAwJSB7b3BhY2l0eTogMTt9XHJcbmA7XHJcblxyXG5jb25zdCBpbmRpY2F0b3JTdHlsZXMgPSBjc3NgXHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHdpZHRoOiA4cHg7XHJcbiAgaGVpZ2h0OiA4cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XHJcblxyXG4gIGFuaW1hdGlvbjogJHtpbmRpY2F0b3JBbmltYXRpb259IDFzIGluZmluaXRlO1xyXG5cclxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xyXG4gICAgYW5pbWF0aW9uOiBub25lO1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IHRleHRTdHlsZXMgPSBjc3NgXHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbmA7XHJcblxyXG5jb25zdCBMaXZlQmFkZ2U6IEZ1bmN0aW9uQ29tcG9uZW50PExpdmVCYWRnZVByb3BzPiA9ICh7XHJcbiAgdHlwZSA9IExpdmVCYWRnZVR5cGUuU29saWQsXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHsuLi5wcm9wc30+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjc3M9e1tcclxuICAgICAgICAgIGJhZGdlU3R5bGVzLFxyXG4gICAgICAgICAgdHlwZSA9PSBMaXZlQmFkZ2VUeXBlLlNvbGlkXHJcbiAgICAgICAgICAgID8gc29saWRCYWRnZVN0eWxlc1xyXG4gICAgICAgICAgICA6IHRyYW5zcGFyZW50QmFkZ2VTdHlsZXMsXHJcbiAgICAgICAgXX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNzcz17W1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JTdHlsZXMsXHJcbiAgICAgICAgICAgIGNzc2BcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3R5cGUgPT0gTGl2ZUJhZGdlVHlwZS5Tb2xpZFxyXG4gICAgICAgICAgICAgICAgPyB0ZXh0LmxpdmVJbnZlcnNlXHJcbiAgICAgICAgICAgICAgICA6IHRleHQubGl2ZX07XHJcbiAgICAgICAgICAgIGAsXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNzcz17dGV4dFN0eWxlc30+TElWRTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXZlQmFkZ2U7XHJcbiJdfQ== */"],
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        css: [indicatorStyles, /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)("background-color:", type == LiveBadgeType.Solid ? _design_palette__WEBPACK_IMPORTED_MODULE_0__.text.liveInverse : _design_palette__WEBPACK_IMPORTED_MODULE_0__.text.live, ";" + ( false ? 0 : ";label:LiveBadge;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMaXZlQmFkZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThFZSIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcTGl2ZUJhZGdlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcywga2V5ZnJhbWVzLCBQcm9wc09mIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgeyBiZywgdGV4dCB9IGZyb20gXCIuLi9kZXNpZ24vcGFsZXR0ZVwiO1xyXG5pbXBvcnQgeyBmb250cywgZm9udFNpemVzIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gTGl2ZUJhZGdlVHlwZSB7XHJcbiAgU29saWQgPSBcInNvbGlkXCIsXHJcbiAgVHJhbnNwYXJlbnQgPSBcInRyYW5zcGFyZW50XCIsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGl2ZUJhZGdlUHJvcHMgZXh0ZW5kcyBQcm9wc09mPFwiZGl2XCI+IHtcclxuICB0eXBlPzogTGl2ZUJhZGdlVHlwZTtcclxufVxyXG5cclxuY29uc3QgYmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgZm9udC1zaXplOiAke2ZvbnRTaXplcy5zbWFsbH1yZW07XHJcbiAgZm9udC1mYW1pbHk6ICR7Zm9udHMuc2Fuc307XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcblxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuYDtcclxuXHJcbmNvbnN0IHNvbGlkQmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgcGFkZGluZzogNXB4IDhweDtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgY29sb3I6ICR7dGV4dC5saXZlSW52ZXJzZX07XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtiZy5saXZlfTtcclxuYDtcclxuXHJcbmNvbnN0IHRyYW5zcGFyZW50QmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgcGFkZGluZy1sZWZ0OiAxcHg7XHJcbiAgY29sb3I6ICR7dGV4dC5saXZlfTtcclxuYDtcclxuXHJcbmNvbnN0IGluZGljYXRvckFuaW1hdGlvbiA9IGtleWZyYW1lc2BcclxuICAwJSB7b3BhY2l0eTogMTt9XHJcbiAgMTAlIHtvcGFjaXR5OiAuMjU7fVxyXG4gIDQwJSB7b3BhY2l0eTogMTt9XHJcbiAgMTAwJSB7b3BhY2l0eTogMTt9XHJcbmA7XHJcblxyXG5jb25zdCBpbmRpY2F0b3JTdHlsZXMgPSBjc3NgXHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHdpZHRoOiA4cHg7XHJcbiAgaGVpZ2h0OiA4cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XHJcblxyXG4gIGFuaW1hdGlvbjogJHtpbmRpY2F0b3JBbmltYXRpb259IDFzIGluZmluaXRlO1xyXG5cclxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xyXG4gICAgYW5pbWF0aW9uOiBub25lO1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IHRleHRTdHlsZXMgPSBjc3NgXHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbmA7XHJcblxyXG5jb25zdCBMaXZlQmFkZ2U6IEZ1bmN0aW9uQ29tcG9uZW50PExpdmVCYWRnZVByb3BzPiA9ICh7XHJcbiAgdHlwZSA9IExpdmVCYWRnZVR5cGUuU29saWQsXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHsuLi5wcm9wc30+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjc3M9e1tcclxuICAgICAgICAgIGJhZGdlU3R5bGVzLFxyXG4gICAgICAgICAgdHlwZSA9PSBMaXZlQmFkZ2VUeXBlLlNvbGlkXHJcbiAgICAgICAgICAgID8gc29saWRCYWRnZVN0eWxlc1xyXG4gICAgICAgICAgICA6IHRyYW5zcGFyZW50QmFkZ2VTdHlsZXMsXHJcbiAgICAgICAgXX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNzcz17W1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JTdHlsZXMsXHJcbiAgICAgICAgICAgIGNzc2BcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3R5cGUgPT0gTGl2ZUJhZGdlVHlwZS5Tb2xpZFxyXG4gICAgICAgICAgICAgICAgPyB0ZXh0LmxpdmVJbnZlcnNlXHJcbiAgICAgICAgICAgICAgICA6IHRleHQubGl2ZX07XHJcbiAgICAgICAgICAgIGAsXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNzcz17dGV4dFN0eWxlc30+TElWRTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXZlQmFkZ2U7XHJcbiJdfQ== */"),  false ? 0 : ";label:LiveBadge;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMaXZlQmFkZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRFVSIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcTGl2ZUJhZGdlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcywga2V5ZnJhbWVzLCBQcm9wc09mIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgeyBiZywgdGV4dCB9IGZyb20gXCIuLi9kZXNpZ24vcGFsZXR0ZVwiO1xyXG5pbXBvcnQgeyBmb250cywgZm9udFNpemVzIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gTGl2ZUJhZGdlVHlwZSB7XHJcbiAgU29saWQgPSBcInNvbGlkXCIsXHJcbiAgVHJhbnNwYXJlbnQgPSBcInRyYW5zcGFyZW50XCIsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGl2ZUJhZGdlUHJvcHMgZXh0ZW5kcyBQcm9wc09mPFwiZGl2XCI+IHtcclxuICB0eXBlPzogTGl2ZUJhZGdlVHlwZTtcclxufVxyXG5cclxuY29uc3QgYmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgZm9udC1zaXplOiAke2ZvbnRTaXplcy5zbWFsbH1yZW07XHJcbiAgZm9udC1mYW1pbHk6ICR7Zm9udHMuc2Fuc307XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcblxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuYDtcclxuXHJcbmNvbnN0IHNvbGlkQmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgcGFkZGluZzogNXB4IDhweDtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgY29sb3I6ICR7dGV4dC5saXZlSW52ZXJzZX07XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtiZy5saXZlfTtcclxuYDtcclxuXHJcbmNvbnN0IHRyYW5zcGFyZW50QmFkZ2VTdHlsZXMgPSBjc3NgXHJcbiAgcGFkZGluZy1sZWZ0OiAxcHg7XHJcbiAgY29sb3I6ICR7dGV4dC5saXZlfTtcclxuYDtcclxuXHJcbmNvbnN0IGluZGljYXRvckFuaW1hdGlvbiA9IGtleWZyYW1lc2BcclxuICAwJSB7b3BhY2l0eTogMTt9XHJcbiAgMTAlIHtvcGFjaXR5OiAuMjU7fVxyXG4gIDQwJSB7b3BhY2l0eTogMTt9XHJcbiAgMTAwJSB7b3BhY2l0eTogMTt9XHJcbmA7XHJcblxyXG5jb25zdCBpbmRpY2F0b3JTdHlsZXMgPSBjc3NgXHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHdpZHRoOiA4cHg7XHJcbiAgaGVpZ2h0OiA4cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XHJcblxyXG4gIGFuaW1hdGlvbjogJHtpbmRpY2F0b3JBbmltYXRpb259IDFzIGluZmluaXRlO1xyXG5cclxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xyXG4gICAgYW5pbWF0aW9uOiBub25lO1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IHRleHRTdHlsZXMgPSBjc3NgXHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbmA7XHJcblxyXG5jb25zdCBMaXZlQmFkZ2U6IEZ1bmN0aW9uQ29tcG9uZW50PExpdmVCYWRnZVByb3BzPiA9ICh7XHJcbiAgdHlwZSA9IExpdmVCYWRnZVR5cGUuU29saWQsXHJcbiAgLi4ucHJvcHNcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHsuLi5wcm9wc30+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjc3M9e1tcclxuICAgICAgICAgIGJhZGdlU3R5bGVzLFxyXG4gICAgICAgICAgdHlwZSA9PSBMaXZlQmFkZ2VUeXBlLlNvbGlkXHJcbiAgICAgICAgICAgID8gc29saWRCYWRnZVN0eWxlc1xyXG4gICAgICAgICAgICA6IHRyYW5zcGFyZW50QmFkZ2VTdHlsZXMsXHJcbiAgICAgICAgXX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNzcz17W1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JTdHlsZXMsXHJcbiAgICAgICAgICAgIGNzc2BcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3R5cGUgPT0gTGl2ZUJhZGdlVHlwZS5Tb2xpZFxyXG4gICAgICAgICAgICAgICAgPyB0ZXh0LmxpdmVJbnZlcnNlXHJcbiAgICAgICAgICAgICAgICA6IHRleHQubGl2ZX07XHJcbiAgICAgICAgICAgIGAsXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNzcz17dGV4dFN0eWxlc30+TElWRTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXZlQmFkZ2U7XHJcbiJdfQ== */"]
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        css: textStyles,
        children: "LIVE"
      })]
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LiveBadge);

/***/ }),

/***/ "./src/web/components/Logo.tsx":
/*!*************************************!*\
  !*** ./src/web/components/Logo.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _design_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../design/palette */ "./src/web/design/palette.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }






var _ref =  false ? 0 : {
  name: "1b3opwz-Logo",
  styles: "height:100%;width:100%;label:Logo;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxMb2dvLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlYyIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcTG9nby50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MsIFByb3BzT2YgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcclxuaW1wb3J0IHsgdGV4dCB9IGZyb20gXCIuLi9kZXNpZ24vcGFsZXR0ZVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9nb1Byb3BzIGV4dGVuZHMgUHJvcHNPZjxcInN2Z1wiPiB7fVxyXG5cclxuY29uc3QgTG9nbzogRnVuY3Rpb25Db21wb25lbnQ8TG9nb1Byb3BzPiA9ICh7IC4uLnByb3BzIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgeD1cIjBcIlxyXG4gICAgICB5PVwiMFwiXHJcbiAgICAgIHZlcnNpb249XCIxLjFcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI5Mi43IDgyLjdcIlxyXG4gICAgICBmaWxsPXt0ZXh0LnByaW1hcnl9XHJcbiAgICAgIGNzcz17Y3NzYFxyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgYH1cclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBkPVwiTTczLjMgMTUuM2wtMi0uMlYyMmE1Mi4yIDUyLjIgMCAwMC40IDMuOWwuNy44IDEuMi41LjguMS45LjRjLjMuMS41LjMuNy42LjIuMy4zLjcuMyAxLjIgMCAuOC0uMiAxLjUtLjUgMi0uNC43LS44IDEuMy0xLjQgMS43YTYuMyA2LjMgMCAwMS00LjEgMS41IDYgNiAwIDAxLTMuNS0uOSA2IDYgMCAwMS0yLTIuNGMtLjUtMS0uOC0yLjEtMS0zLjNsLS4yLTMuN3YtMTRhNSA1IDAgMDAtLjMtMmMtLjItLjQtLjYtLjgtMS0xYTIgMiAwIDAxLTEtMUE0IDQgMCAwMTYxIDVjMC0uOC4zLTEuNC44LTEuOC42LS4zIDEuNS0uNyAyLjgtMS4xIDEtLjMgMS44LS43IDIuNC0xLjIuNy0uNCAxLjQtLjYgMi4yLS42LjggMCAxLjQuMiAxLjcuNy4zLjQuNCAxIC40IDEuOFYxMWE0Mi4zIDQyLjMgMCAwMDMuNS0uMWMuNCAwIC44IDAgMS4yLjIuNCAwIC42LjUuNiAxbC0uMSAxYTUgNSAwIDAxLS40IDFsLS43IDEtLjkuM2gtMS4zek05MS42IDExLjVjMS4xLS41IDIuNC0uOCAzLjgtLjggMS4xIDAgMi4xLjEgMyAuNGE1LjcgNS43IDAgMDE0LjEgMy41Yy41IDEgLjcgMi4yLjcgMy43djQuNWE1NS44IDU1LjggMCAwMC4yIDQuNmMwIC41LjIuOC40IDEuMWwuOC45LjYuOWMuMi4zLjMuNy4zIDEuMyAwIC41IDAgMS0uMiAxLjRsLS43LjhhMiAyIDAgMDEtLjguNWgtLjhhOCA4IDAgMDEtMi0uMSA2LjcgNi43IDAgMDAtMyAwaC0xLjdjLTEgMC0xLjctLjItMi4yLS44YTMgMyAwIDAxLS43LTJjMC0uNSAwLTEgLjItMS4ybC42LS44LjYtLjguNS0xYTQ4IDQ4IDAgMDAwLTkuMmMtLjMtLjctLjYtMS4zLTEtMS44LS41LS41LTEtLjctMi0uNy0uNyAwLTEuMyAwLTEuOC4zLS41LjItLjkuNi0xLjEgMS0uMy40LS41LjgtLjYgMS4zbC0uMiAxLjZ2My43YzAgMS43LjEgMi45LjQgMy42LjIuNy41IDEuMy44IDEuNmwuOCAxYy4yLjMuNC44LjQgMS42IDAgMS4xLS4zIDEuOS0xIDIuMnMtMS4yLjYtMS44LjZjLS44IDAtMS40IDAtMS44LS4ycy0xLS4yLTEuNi0uMmwtMS41LjEtMS44LjJjLTEgMC0xLjgtLjMtMi4yLS45YTMgMyAwIDAxLS43LTJjMC0uNSAwLTEgLjItMS4yLjItLjMuMy0uNi42LS44bC42LS44LjUtMWEzMyAzMyAwIDAwLjMtMy43VjEwLjFjMC0uOSAwLTEuNi0uMy0ycy0uNS0uOC0xLTFhMiAyIDAgMDEtMS0xYy0uMi0uNC0uMi0uOS0uMi0xLjQgMC0uOC4zLTEuNC44LTEuOC42LS4zIDEuNS0uNyAyLjgtMS4xIDEtLjMgMS43LS43IDIuNC0xLjIuNy0uNCAxLjQtLjYgMi4xLS42LjggMCAxLjQuMiAxLjcuNy40LjQuNSAxIC41IDEuOHYxMC42YzEtLjYgMi0xLjIgMy0xLjZ6TTExOC4yIDI4YzEgLjUgMiAuNyAzLjMuNy44IDAgMS42IDAgMi4yLS4yLjctLjIgMS40LS41IDItMS4xbDEuMi0xYy40LS40LjktLjYgMS40LS42LjUgMCAxIC4xIDEuMi41LjIuMy40LjcuNCAxLjIgMCAuNi0uMiAxLjMtLjYgMi4yLS40LjgtMSAxLjYtMS45IDIuNGExMC4zIDEwLjMgMCAwMS03LjMgMi42IDE0IDE0IDAgMDEtNS0uOCAxMS42IDExLjYgMCAwMS02LjgtNi40IDEzIDEzIDAgMDEtMS01LjJjMC0xLjcuMy0zLjIuOC00LjcuNi0xLjQgMS40LTIuNyAyLjUtMy44IDEtMSAyLjQtMS45IDQtMi41IDEuNy0uNiAzLjUtLjkgNS43LS45YTEwLjkgMTAuOSAwIDAxOC44IDQuNGMuNS43LjcgMS40LjcgMiAwIC40IDAgLjctLjIgMWwtLjcuNi0xLjMuOS0yLjIgMS4xLTkuNCA1LjRjLjUuOCAxLjMgMS42IDIuMiAyLjF6TTExNyAxNS4yYy0uNi40LTEgLjgtMS40IDEuMy0uNC41LS42IDEuMS0uOCAxLjhhOCA4IDAgMDAtLjMgMi4xbC4xIDEuNyA3LjgtNC41Yy0uNC0uOC0xLTEuNS0xLjUtMi0uNS0uNi0xLjItLjgtMi0uOC0uNyAwLTEuNC4xLTIgLjR6XCIgLz5cclxuICAgICAgPHBhdGhcclxuICAgICAgICBmaWxsPXt0ZXh0LnRoZW1lfVxyXG4gICAgICAgIGQ9XCJNMTAuMSA4MS4zYy0yLjMtLjgtNC4yLTEuNy01LjctMi43LTEuNi0xLTIuNy0yLTMuNC0zLS43LTEtMS0xLjgtMS0yLjIgMC0uOC4yLTEuNy43LTIuNmExMS4zIDExLjMgMCAwMTQuNC00LjRjMS0uNSAxLjgtLjcgMi43LS43LjUgMCAxIDAgMS40LjNzLjguNiAxLjEgMS4ybDEgMi41LjkgMi4yYTcuNSA3LjUgMCAwMDIgM2MxIC43IDIgMSAzLjQgMSAxLjEgMCAyLjEtLjMgMy4yLTEgMS0uNyAxLjUtMS43IDEuNS0yLjlzLS41LTIuMS0xLjUtM2MtMS0uNy0yLjQtMS41LTQtMi4ybC01LTIuMmEzMCAzMCAwIDAxLTUuMS0yLjhjLTEuNi0xLTIuOS0yLjMtNC0zLjhhOS4yIDkuMiAwIDAxLTEuNS01LjVjMC0zIDEtNS42IDMtNy43IDItMiA0LjktMyA4LjUtMyAxLjUgMCAyLjkgMCA0LjEuMmEzNi4xIDM2LjEgMCAwMDguNC4yIDIwLjUgMjAuNSAwIDAwMy0uNGgxLjJjLjcgMCAxLjMuMSAyIC41LjUuMyAxIC44IDEuNCAxLjRsMSAyYTcuMSA3LjEgMCAwMS0xIDYuMiA3IDcgMCAwMS0xLjYgMS42Yy0uNi41LTEuMy43LTIgLjctMSAwLTEuNy0uMy0yLjMtMUwyNS4zIDUxYy0uNi0uOS0xLjMtMS42LTIuMS0yLjMtLjktLjYtMi4xLTEtMy43LTEtMSAwLTEuOC4yLTIuNi43cy0xLjEgMS4yLTEuMSAyLjNjMCAuOC41IDEuNSAxLjUgMi4ybDMuNyAxLjkgNC45IDJjMS43LjggMy40IDEuNiA0LjggMi43czIuOCAyLjIgMy44IDMuNiAxLjUgMyAxLjUgNWMwIDIuMS0uNSA0LTEuNCA1LjgtLjkgMS44LTIuMSAzLjMtMy43IDQuNnMtMy40IDIuMi01LjYgM2EyNi44IDI2LjggMCAwMS0xNS4yLS4xek01Ny43IDUwLjJjLTEuMSAwLTIuMi0uMi0zLjItLjN2MTUuMmwuNSAyLjZjLjMuNi43IDEuMSAxLjIgMS40czEuMS42IDIgLjhsMS4zLjNjLjUgMCAxIC4yIDEuNS41cy45LjYgMS4yIDFjLjMuNS41IDEuMi41IDIgMCAxLjQtLjMgMi41LS45IDMuNnMtMS4zIDItMi4yIDIuOGExMC42IDEwLjYgMCAwMS02LjkgMi40IDEwIDEwIDAgMDEtNS45LTEuNWMtMS40LTEtMi42LTIuNC0zLjMtNHMtMS40LTMuNi0xLjYtNS42Yy0uMi0yLS40LTQuMS0uNC02LjFWNDJjMC0xLjUtLjEtMi43LS41LTMuNGE0IDQgMCAwMC0xLjgtMS44Yy0uOC0uNC0xLjMtMS0xLjYtMS42cy0uNC0xLjMtLjQtMi4yYzAtMS40LjUtMi40IDEuNS0zIDEtLjUgMi41LTEuMiA0LjYtMS45YTE4IDE4IDAgMDA0LTEuOSA2LjUgNi41IDAgMDEzLjYtMS4xYzEuNCAwIDIuNC40IDIuOSAxLjEuNS44LjggMS44LjggM3Y2LjlsLS4xIDdhOTIuMyA5Mi4zIDAgMDA1LjktLjNjLjcgMCAxLjMgMCAyIC4zLjcuMiAxIC44IDEgMS44IDAgLjUgMCAxLS4yIDEuNmwtLjcgMS44Yy0uMy42LS43IDEtMS4yIDEuNWEyIDIgMCAwMS0xLjQuNmwtMi4yLS4yek05MSA3Mi45Yy45LS43IDEuNS0xLjYgMS45LTIuNy40LTEuMi42LTIuNC43LTMuOFY2MmE0MDkuMyA0MDkuMyAwIDAwLS4xLTE3LjNjMC0xIC4yLTEuNS43LTEuOC42LS4yIDEuMy0uNCAyLjMtLjRsMS44LjFhMjkuMiAyOS4yIDAgMDA1LjkgMGMuOSAwIDEuNiAwIDIuMS4zLjYuMy44IDEgLjggMS45IDAgMyAwIDYuMy0uMyA5LjlhMTYzLjYgMTYzLjYgMCAwMC0uMSAxMy43YzAgMSAuNSAxLjkgMSAyLjRsMS40LjggMS4yLjYuOS45Yy4yLjQuMy45LjMgMS42IDAgLjgtLjMgMS42LS45IDIuNXMtMS4zIDEuOC0yLjMgMi42Yy0xIC43LTIgMS40LTMuMyAxLjktMS4zLjUtMi41LjctMy44LjctMS45IDAtMy40LS41LTQuNi0xLjZzLTIuMy0yLjQtMy4zLTRjLTEuNiAyLjEtMy4zIDMuNi01LjEgNC40cy0zLjYgMS4xLTUuNSAxLjFjLTMuOSAwLTctMS05LjQtMy4xLTIuNC0yLjEtMy41LTUtMy41LTguOXYtMlY2NmwuMS0yLjdWNjFhMTAxLjYgMTAxLjYgMCAwMC0uMi01LjVjLS4xLS42LS40LTEuMS0uNy0xLjUtLjItLjQtLjctLjgtMS4yLTFhNCA0IDAgMDEtMS42LTEuNWMtLjMtLjUtLjQtMS4yLS40LTIgMC0xLjUuNC0yLjUgMS4yLTNhMTggMTggMCAwMTQuMy0yIDI2IDI2IDAgMDA0LTEuN2MxLS42IDIuMS0uOSAzLjItLjkgMS40IDAgMi40LjQgMyAxLjJzMSAxLjggMSAzbC0uMSA3LjJ2MTNjMCAyLjYuMiA0LjYuOCA1LjguNiAxLjMgMiAxLjkgNC4xIDEuOSAxLjYgMCAyLjktLjQgMy43LTF6TTEyMy4zIDgwLjVjLTItLjktMy43LTIuMi01LTMuOXMtMi40LTMuNy0zLjEtNmEyNy42IDI3LjYgMCAwMS4zLTE2LjIgMTYuMyAxNi4zIDAgMDE5LjQtMTAuNSAxOC43IDE4LjcgMCAwMTEyLjItLjhjMS42LjQgMi44LjggMy42IDEuM3YtNS43YzAtLjgtLjItMS41LS42LTEuOWwtMS4zLTEuMS0xLjMtMS4yYy0uMy0uNC0uNi0xLjItLjYtMiAwLTEuMi4zLTIuMS45LTIuOC42LS42IDEuNC0xLjEgMi4yLTEuNWwyLjctLjkgMi4zLS42YzEtLjMgMi0uOCAyLjYtMS4zLjctLjUgMS41LS44IDIuMy0uOHMxLjYuMiAyIC41IDEgLjcgMS4yIDEuM2MuMi41LjQgMSAuNSAxLjdsLjEgMnYzNGMwIDIgLjEgMy41LjMgNC43LjIgMS4yLjQgMi4xLjcgMi44LjMuNy42IDEuMyAxIDEuNmwxIDEgLjcgMS4yYTYuNSA2LjUgMCAwMS0uNSA1Yy0uNSAxLTEuNCAxLjQtMi42IDEuNGwtMS43LS4xYTI3LjMgMjcuMyAwIDAwLTUuNiAwbC0yIC4yYy0xLjYgMC0yLjctLjMtMy4zLTFzLTEtMS44LTEtMy41Yy0uNSAxLTEuNiAxLjktMy40IDMtMS44IDEtNC4xIDEuNS03IDEuNS0yLjYgMC01LS41LTctMS40ek0xMzAgNzBhNyA3IDAgMDA2IDMuMmMxLjUgMCAyLjctLjUgMy41LTEuMy44LS44IDEuMy0xLjkgMS4zLTMuMlY1Ny4zbC0uMS0yLjhhOCA4IDAgMDAtLjUtMi40Yy0uMy0uOC0uNy0xLjQtMS4zLTEuOHMtMS41LS43LTIuNi0uN2E3LjMgNy4zIDAgMDAtNi42IDMuOGMtLjcgMS0xLjIgMi4zLTEuNSAzLjhzLS41IDMtLjUgNC40YzAgMy41LjggNi4zIDIuMyA4LjR6TTE3OS4yIDcxLjNjMS42LjkgMy40IDEuNCA1LjYgMS40IDEuMyAwIDIuNi0uMiAzLjctLjQgMS0uMyAyLjItMSAzLjMtMS45bDItMS43Yy43LS43IDEuNS0xIDIuMy0xczEuNS4zIDIgLjhjLjQuNi42IDEuMi42IDIgMCAxLjEtLjMgMi4zLTEgMy43LS43IDEuNC0xLjcgMi43LTMgNGExNy4zIDE3LjMgMCAwMS0xMi4zIDQuNWMtMyAwLTUuOC0uNS04LjQtMS41LTIuNi0xLTQuOS0yLjQtNi44LTQuMi0yLTEuOC0zLjUtNC00LjYtNi42UzE2MSA2NSAxNjEgNjEuOGMwLTIuNy40LTUuMyAxLjMtNy44czIuMy00LjUgNC4xLTYuM2MxLjktMS43IDQuMS0zLjEgNi44LTQuMiAyLjgtMSA2LTEuNSA5LjUtMS41YTE4LjIgMTguMiAwIDAxMTQuNyA3LjIgNi43IDYuNyAwIDAxMS4yIDMuNWMwIC42LS4xIDEtLjQgMS41LS4yLjQtLjUuOC0xIDEuMmwtMi4zIDEuNGMtMSAuNS0yLjIgMS4xLTMuNiAybC0xNS44IDguOWMxIDEuNSAyLjIgMi43IDMuNyAzLjZ6bS0yLjItMjFjLTEgLjUtMS43IDEuMi0yLjMgMi0uNiAxLTEgMi0xLjQgM2ExMy44IDEzLjggMCAwMC0uMiA2LjRsMTMtNy40Yy0uNy0xLjQtMS41LTIuNS0yLjUtMy41cy0yLTEuMy0zLjMtMS4zYy0xLjMgMC0yLjQuMi0zLjMuOHpNMjE5LjEgNjljLjQgMS40LjkgMi41IDEuNCAzLjNsMS40IDIuM2MuNC42LjYgMS42LjYgMi44IDAgMi0uNCAzLjItMS4zIDMuOC0uOS42LTIgLjktMy40LjktMS4zIDAtMi4yLS4xLTMtLjNhOSA5IDAgMDAtMi42LS40bC0yLjUuMy0zIC4yYy0xLjcgMC0zLS41LTMuOC0xLjRhNSA1IDAgMDEtMS4yLTMuNWMwLS44LjItMS40LjQtMS45bDEtMS4yIDEtMS4yYy40LS40LjctMSAuOS0xLjZsLjMtMS44LjEtMi4yLjEtMi40di02LjVjMC0xLjUtLjItMi42LS42LTMuNHMtMS4xLTEuNi0yLTIuNGwtMS4zLTEuNGMtLjItLjMtLjQtLjktLjQtMS41IDAtMS4yLjUtMiAxLjUtMi43YTk0LjYgOTQuNiAwIDAwNS44LTQuM2MuOC0uOCAxLjctMS4yIDIuOC0xLjIuOSAwIDEuNy4yIDIuNC42LjguMyAxLjUuOCAyLjEgMS40YTEzIDEzIDAgMDEyLjggNCAxNSAxNSAwIDAxNS43LTQuNiAxNiAxNiAwIDAxMTUuOCAxLjZjMi40IDIgMy42IDUuMyAzLjYgOS43bC0uMSA0LjVhNjkuMyA2OS4zIDAgMDAuNSAxMmMuMi43LjUgMS4zLjggMS44bDEuMiAxLjRjLjQuNS44IDEgMSAxLjUuNC41LjUgMS4zLjUgMi4yIDAgMS0uMSAxLjgtLjQgMi40LS4zLjYtLjcgMS0xLjEgMS40cy0uOS42LTEuNC43bC0xLjQuMmMtMS4yIDAtMi4zLS4xLTMuMS0uM2ExMSAxMSAwIDAwLTUuMS0uMWwtMyAuMmMtMS42IDAtMi44LS41LTMuNi0xLjRzLTEuMi0yLTEuMi0zLjVjMC0uOC4xLTEuNC40LTJsMS0xLjMgMS0xLjJjLjQtLjUuNi0xIC44LTEuNy4yLS40LjMtMSAuNC0xLjdWNjdsLjItMi4ydi04YzAtMi43LS4zLTQuNi0uOS01LjlzLTItMS44LTQtMS44Yy0xLjYgMC0yLjguMy0zLjguOGE3LjggNy44IDAgMDAtMy42IDUuMmMtLjIgMS0uMyAyLjEtLjMgMy4xdjQuNmMwIDIuOC4yIDQuOC42IDYuM3pNMjY4LjEgNTAuMkwyNjUgNTB2MTUuMmMwIDEgLjIgMiAuNSAyLjYuMy42LjYgMS4xIDEuMSAxLjRzMS4yLjYgMiAuOGwxLjQuM2MuNSAwIDEgLjIgMS40LjUuNS4zIDEgLjYgMS4zIDEgLjMuNS41IDEuMi41IDIgMCAxLjQtLjMgMi41LS45IDMuNnMtMS4zIDItMi4zIDIuOGExMC42IDEwLjYgMCAwMS02LjggMi40IDEwIDEwIDAgMDEtNS45LTEuNWMtMS41LTEtMi42LTIuNC0zLjQtNHMtMS4zLTMuNi0xLjUtNS42Yy0uMy0yLS40LTQuMS0uNC02LjFWNDJjMC0xLjUtLjItMi43LS41LTMuNGE0IDQgMCAwMC0xLjgtMS44Yy0uOC0uNC0xLjMtMS0xLjYtMS42cy0uNC0xLjMtLjQtMi4yYzAtMS40LjUtMi40IDEuNS0zIDEtLjUgMi41LTEuMiA0LjUtMS45YTE4IDE4IDAgMDA0LjEtMS45IDYuNSA2LjUgMCAwMTMuNi0xLjFjMS40IDAgMi4zLjQgMi44IDEuMS42LjguOCAxLjguOCAzdjEzLjlhOTIuMyA5Mi4zIDAgMDA1LjktLjNjLjYgMCAxLjMgMCAyIC4zLjYuMiAxIC44IDEgMS44IDAgLjUgMCAxLS4zIDEuNmwtLjcgMS44Yy0uMy42LS43IDEtMS4xIDEuNWEyIDIgMCAwMS0xLjQuNmMtLjQgMC0xLjIgMC0yLjMtLjJ6XCJcclxuICAgICAgLz5cclxuICAgICAgPHBhdGggZD1cIk0yODIuOCA4MS4yYTEwLjcgMTAuNyAwIDAxLTQuMi00Yy0uNS0uNy0uOC0xLjUtLjgtMi4zIDAtLjkuMy0xLjcuOC0yLjZhMTIuNSAxMi41IDAgMDE0LjMtNGMuOS0uNCAxLjYtLjYgMi40LS42YTYgNiAwIDAxMi42LjYgOSA5IDAgMDE0LjEgNGMuNS45LjcgMS43LjcgMi42YTUgNSAwIDAxLS43IDIuNCAxMCAxMCAwIDAxLTQuMSA0IDUuNyA1LjcgMCAwMS01IDB6XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2dvO1xyXG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

const Logo = ({ ...props
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    x: "0",
    y: "0",
    version: "1.1",
    viewBox: "0 0 292.7 82.7",
    fill: _design_palette__WEBPACK_IMPORTED_MODULE_0__.text.primary,
    css: _ref,
    ...props,
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M73.3 15.3l-2-.2V22a52.2 52.2 0 00.4 3.9l.7.8 1.2.5.8.1.9.4c.3.1.5.3.7.6.2.3.3.7.3 1.2 0 .8-.2 1.5-.5 2-.4.7-.8 1.3-1.4 1.7a6.3 6.3 0 01-4.1 1.5 6 6 0 01-3.5-.9 6 6 0 01-2-2.4c-.5-1-.8-2.1-1-3.3l-.2-3.7v-14a5 5 0 00-.3-2c-.2-.4-.6-.8-1-1a2 2 0 01-1-1A4 4 0 0161 5c0-.8.3-1.4.8-1.8.6-.3 1.5-.7 2.8-1.1 1-.3 1.8-.7 2.4-1.2.7-.4 1.4-.6 2.2-.6.8 0 1.4.2 1.7.7.3.4.4 1 .4 1.8V11a42.3 42.3 0 003.5-.1c.4 0 .8 0 1.2.2.4 0 .6.5.6 1l-.1 1a5 5 0 01-.4 1l-.7 1-.9.3h-1.3zM91.6 11.5c1.1-.5 2.4-.8 3.8-.8 1.1 0 2.1.1 3 .4a5.7 5.7 0 014.1 3.5c.5 1 .7 2.2.7 3.7v4.5a55.8 55.8 0 00.2 4.6c0 .5.2.8.4 1.1l.8.9.6.9c.2.3.3.7.3 1.3 0 .5 0 1-.2 1.4l-.7.8a2 2 0 01-.8.5h-.8a8 8 0 01-2-.1 6.7 6.7 0 00-3 0h-1.7c-1 0-1.7-.2-2.2-.8a3 3 0 01-.7-2c0-.5 0-1 .2-1.2l.6-.8.6-.8.5-1a48 48 0 000-9.2c-.3-.7-.6-1.3-1-1.8-.5-.5-1-.7-2-.7-.7 0-1.3 0-1.8.3-.5.2-.9.6-1.1 1-.3.4-.5.8-.6 1.3l-.2 1.6v3.7c0 1.7.1 2.9.4 3.6.2.7.5 1.3.8 1.6l.8 1c.2.3.4.8.4 1.6 0 1.1-.3 1.9-1 2.2s-1.2.6-1.8.6c-.8 0-1.4 0-1.8-.2s-1-.2-1.6-.2l-1.5.1-1.8.2c-1 0-1.8-.3-2.2-.9a3 3 0 01-.7-2c0-.5 0-1 .2-1.2.2-.3.3-.6.6-.8l.6-.8.5-1a33 33 0 00.3-3.7V10.1c0-.9 0-1.6-.3-2s-.5-.8-1-1a2 2 0 01-1-1c-.2-.4-.2-.9-.2-1.4 0-.8.3-1.4.8-1.8.6-.3 1.5-.7 2.8-1.1 1-.3 1.7-.7 2.4-1.2.7-.4 1.4-.6 2.1-.6.8 0 1.4.2 1.7.7.4.4.5 1 .5 1.8v10.6c1-.6 2-1.2 3-1.6zM118.2 28c1 .5 2 .7 3.3.7.8 0 1.6 0 2.2-.2.7-.2 1.4-.5 2-1.1l1.2-1c.4-.4.9-.6 1.4-.6.5 0 1 .1 1.2.5.2.3.4.7.4 1.2 0 .6-.2 1.3-.6 2.2-.4.8-1 1.6-1.9 2.4a10.3 10.3 0 01-7.3 2.6 14 14 0 01-5-.8 11.6 11.6 0 01-6.8-6.4 13 13 0 01-1-5.2c0-1.7.3-3.2.8-4.7.6-1.4 1.4-2.7 2.5-3.8 1-1 2.4-1.9 4-2.5 1.7-.6 3.5-.9 5.7-.9a10.9 10.9 0 018.8 4.4c.5.7.7 1.4.7 2 0 .4 0 .7-.2 1l-.7.6-1.3.9-2.2 1.1-9.4 5.4c.5.8 1.3 1.6 2.2 2.1zM117 15.2c-.6.4-1 .8-1.4 1.3-.4.5-.6 1.1-.8 1.8a8 8 0 00-.3 2.1l.1 1.7 7.8-4.5c-.4-.8-1-1.5-1.5-2-.5-.6-1.2-.8-2-.8-.7 0-1.4.1-2 .4z"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      fill: _design_palette__WEBPACK_IMPORTED_MODULE_0__.text.theme,
      d: "M10.1 81.3c-2.3-.8-4.2-1.7-5.7-2.7-1.6-1-2.7-2-3.4-3-.7-1-1-1.8-1-2.2 0-.8.2-1.7.7-2.6a11.3 11.3 0 014.4-4.4c1-.5 1.8-.7 2.7-.7.5 0 1 0 1.4.3s.8.6 1.1 1.2l1 2.5.9 2.2a7.5 7.5 0 002 3c1 .7 2 1 3.4 1 1.1 0 2.1-.3 3.2-1 1-.7 1.5-1.7 1.5-2.9s-.5-2.1-1.5-3c-1-.7-2.4-1.5-4-2.2l-5-2.2a30 30 0 01-5.1-2.8c-1.6-1-2.9-2.3-4-3.8a9.2 9.2 0 01-1.5-5.5c0-3 1-5.6 3-7.7 2-2 4.9-3 8.5-3 1.5 0 2.9 0 4.1.2a36.1 36.1 0 008.4.2 20.5 20.5 0 003-.4h1.2c.7 0 1.3.1 2 .5.5.3 1 .8 1.4 1.4l1 2a7.1 7.1 0 01-1 6.2 7 7 0 01-1.6 1.6c-.6.5-1.3.7-2 .7-1 0-1.7-.3-2.3-1L25.3 51c-.6-.9-1.3-1.6-2.1-2.3-.9-.6-2.1-1-3.7-1-1 0-1.8.2-2.6.7s-1.1 1.2-1.1 2.3c0 .8.5 1.5 1.5 2.2l3.7 1.9 4.9 2c1.7.8 3.4 1.6 4.8 2.7s2.8 2.2 3.8 3.6 1.5 3 1.5 5c0 2.1-.5 4-1.4 5.8-.9 1.8-2.1 3.3-3.7 4.6s-3.4 2.2-5.6 3a26.8 26.8 0 01-15.2-.1zM57.7 50.2c-1.1 0-2.2-.2-3.2-.3v15.2l.5 2.6c.3.6.7 1.1 1.2 1.4s1.1.6 2 .8l1.3.3c.5 0 1 .2 1.5.5s.9.6 1.2 1c.3.5.5 1.2.5 2 0 1.4-.3 2.5-.9 3.6s-1.3 2-2.2 2.8a10.6 10.6 0 01-6.9 2.4 10 10 0 01-5.9-1.5c-1.4-1-2.6-2.4-3.3-4s-1.4-3.6-1.6-5.6c-.2-2-.4-4.1-.4-6.1V42c0-1.5-.1-2.7-.5-3.4a4 4 0 00-1.8-1.8c-.8-.4-1.3-1-1.6-1.6s-.4-1.3-.4-2.2c0-1.4.5-2.4 1.5-3 1-.5 2.5-1.2 4.6-1.9a18 18 0 004-1.9 6.5 6.5 0 013.6-1.1c1.4 0 2.4.4 2.9 1.1.5.8.8 1.8.8 3v6.9l-.1 7a92.3 92.3 0 005.9-.3c.7 0 1.3 0 2 .3.7.2 1 .8 1 1.8 0 .5 0 1-.2 1.6l-.7 1.8c-.3.6-.7 1-1.2 1.5a2 2 0 01-1.4.6l-2.2-.2zM91 72.9c.9-.7 1.5-1.6 1.9-2.7.4-1.2.6-2.4.7-3.8V62a409.3 409.3 0 00-.1-17.3c0-1 .2-1.5.7-1.8.6-.2 1.3-.4 2.3-.4l1.8.1a29.2 29.2 0 005.9 0c.9 0 1.6 0 2.1.3.6.3.8 1 .8 1.9 0 3 0 6.3-.3 9.9a163.6 163.6 0 00-.1 13.7c0 1 .5 1.9 1 2.4l1.4.8 1.2.6.9.9c.2.4.3.9.3 1.6 0 .8-.3 1.6-.9 2.5s-1.3 1.8-2.3 2.6c-1 .7-2 1.4-3.3 1.9-1.3.5-2.5.7-3.8.7-1.9 0-3.4-.5-4.6-1.6s-2.3-2.4-3.3-4c-1.6 2.1-3.3 3.6-5.1 4.4s-3.6 1.1-5.5 1.1c-3.9 0-7-1-9.4-3.1-2.4-2.1-3.5-5-3.5-8.9v-2V66l.1-2.7V61a101.6 101.6 0 00-.2-5.5c-.1-.6-.4-1.1-.7-1.5-.2-.4-.7-.8-1.2-1a4 4 0 01-1.6-1.5c-.3-.5-.4-1.2-.4-2 0-1.5.4-2.5 1.2-3a18 18 0 014.3-2 26 26 0 004-1.7c1-.6 2.1-.9 3.2-.9 1.4 0 2.4.4 3 1.2s1 1.8 1 3l-.1 7.2v13c0 2.6.2 4.6.8 5.8.6 1.3 2 1.9 4.1 1.9 1.6 0 2.9-.4 3.7-1zM123.3 80.5c-2-.9-3.7-2.2-5-3.9s-2.4-3.7-3.1-6a27.6 27.6 0 01.3-16.2 16.3 16.3 0 019.4-10.5 18.7 18.7 0 0112.2-.8c1.6.4 2.8.8 3.6 1.3v-5.7c0-.8-.2-1.5-.6-1.9l-1.3-1.1-1.3-1.2c-.3-.4-.6-1.2-.6-2 0-1.2.3-2.1.9-2.8.6-.6 1.4-1.1 2.2-1.5l2.7-.9 2.3-.6c1-.3 2-.8 2.6-1.3.7-.5 1.5-.8 2.3-.8s1.6.2 2 .5 1 .7 1.2 1.3c.2.5.4 1 .5 1.7l.1 2v34c0 2 .1 3.5.3 4.7.2 1.2.4 2.1.7 2.8.3.7.6 1.3 1 1.6l1 1 .7 1.2a6.5 6.5 0 01-.5 5c-.5 1-1.4 1.4-2.6 1.4l-1.7-.1a27.3 27.3 0 00-5.6 0l-2 .2c-1.6 0-2.7-.3-3.3-1s-1-1.8-1-3.5c-.5 1-1.6 1.9-3.4 3-1.8 1-4.1 1.5-7 1.5-2.6 0-5-.5-7-1.4zM130 70a7 7 0 006 3.2c1.5 0 2.7-.5 3.5-1.3.8-.8 1.3-1.9 1.3-3.2V57.3l-.1-2.8a8 8 0 00-.5-2.4c-.3-.8-.7-1.4-1.3-1.8s-1.5-.7-2.6-.7a7.3 7.3 0 00-6.6 3.8c-.7 1-1.2 2.3-1.5 3.8s-.5 3-.5 4.4c0 3.5.8 6.3 2.3 8.4zM179.2 71.3c1.6.9 3.4 1.4 5.6 1.4 1.3 0 2.6-.2 3.7-.4 1-.3 2.2-1 3.3-1.9l2-1.7c.7-.7 1.5-1 2.3-1s1.5.3 2 .8c.4.6.6 1.2.6 2 0 1.1-.3 2.3-1 3.7-.7 1.4-1.7 2.7-3 4a17.3 17.3 0 01-12.3 4.5c-3 0-5.8-.5-8.4-1.5-2.6-1-4.9-2.4-6.8-4.2-2-1.8-3.5-4-4.6-6.6S161 65 161 61.8c0-2.7.4-5.3 1.3-7.8s2.3-4.5 4.1-6.3c1.9-1.7 4.1-3.1 6.8-4.2 2.8-1 6-1.5 9.5-1.5a18.2 18.2 0 0114.7 7.2 6.7 6.7 0 011.2 3.5c0 .6-.1 1-.4 1.5-.2.4-.5.8-1 1.2l-2.3 1.4c-1 .5-2.2 1.1-3.6 2l-15.8 8.9c1 1.5 2.2 2.7 3.7 3.6zm-2.2-21c-1 .5-1.7 1.2-2.3 2-.6 1-1 2-1.4 3a13.8 13.8 0 00-.2 6.4l13-7.4c-.7-1.4-1.5-2.5-2.5-3.5s-2-1.3-3.3-1.3c-1.3 0-2.4.2-3.3.8zM219.1 69c.4 1.4.9 2.5 1.4 3.3l1.4 2.3c.4.6.6 1.6.6 2.8 0 2-.4 3.2-1.3 3.8-.9.6-2 .9-3.4.9-1.3 0-2.2-.1-3-.3a9 9 0 00-2.6-.4l-2.5.3-3 .2c-1.7 0-3-.5-3.8-1.4a5 5 0 01-1.2-3.5c0-.8.2-1.4.4-1.9l1-1.2 1-1.2c.4-.4.7-1 .9-1.6l.3-1.8.1-2.2.1-2.4v-6.5c0-1.5-.2-2.6-.6-3.4s-1.1-1.6-2-2.4l-1.3-1.4c-.2-.3-.4-.9-.4-1.5 0-1.2.5-2 1.5-2.7a94.6 94.6 0 005.8-4.3c.8-.8 1.7-1.2 2.8-1.2.9 0 1.7.2 2.4.6.8.3 1.5.8 2.1 1.4a13 13 0 012.8 4 15 15 0 015.7-4.6 16 16 0 0115.8 1.6c2.4 2 3.6 5.3 3.6 9.7l-.1 4.5a69.3 69.3 0 00.5 12c.2.7.5 1.3.8 1.8l1.2 1.4c.4.5.8 1 1 1.5.4.5.5 1.3.5 2.2 0 1-.1 1.8-.4 2.4-.3.6-.7 1-1.1 1.4s-.9.6-1.4.7l-1.4.2c-1.2 0-2.3-.1-3.1-.3a11 11 0 00-5.1-.1l-3 .2c-1.6 0-2.8-.5-3.6-1.4s-1.2-2-1.2-3.5c0-.8.1-1.4.4-2l1-1.3 1-1.2c.4-.5.6-1 .8-1.7.2-.4.3-1 .4-1.7V67l.2-2.2v-8c0-2.7-.3-4.6-.9-5.9s-2-1.8-4-1.8c-1.6 0-2.8.3-3.8.8a7.8 7.8 0 00-3.6 5.2c-.2 1-.3 2.1-.3 3.1v4.6c0 2.8.2 4.8.6 6.3zM268.1 50.2L265 50v15.2c0 1 .2 2 .5 2.6.3.6.6 1.1 1.1 1.4s1.2.6 2 .8l1.4.3c.5 0 1 .2 1.4.5.5.3 1 .6 1.3 1 .3.5.5 1.2.5 2 0 1.4-.3 2.5-.9 3.6s-1.3 2-2.3 2.8a10.6 10.6 0 01-6.8 2.4 10 10 0 01-5.9-1.5c-1.5-1-2.6-2.4-3.4-4s-1.3-3.6-1.5-5.6c-.3-2-.4-4.1-.4-6.1V42c0-1.5-.2-2.7-.5-3.4a4 4 0 00-1.8-1.8c-.8-.4-1.3-1-1.6-1.6s-.4-1.3-.4-2.2c0-1.4.5-2.4 1.5-3 1-.5 2.5-1.2 4.5-1.9a18 18 0 004.1-1.9 6.5 6.5 0 013.6-1.1c1.4 0 2.3.4 2.8 1.1.6.8.8 1.8.8 3v13.9a92.3 92.3 0 005.9-.3c.6 0 1.3 0 2 .3.6.2 1 .8 1 1.8 0 .5 0 1-.3 1.6l-.7 1.8c-.3.6-.7 1-1.1 1.5a2 2 0 01-1.4.6c-.4 0-1.2 0-2.3-.2z"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M282.8 81.2a10.7 10.7 0 01-4.2-4c-.5-.7-.8-1.5-.8-2.3 0-.9.3-1.7.8-2.6a12.5 12.5 0 014.3-4c.9-.4 1.6-.6 2.4-.6a6 6 0 012.6.6 9 9 0 014.1 4c.5.9.7 1.7.7 2.6a5 5 0 01-.7 2.4 10 10 0 01-4.1 4 5.7 5.7 0 01-5 0z"
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logo);

/***/ }),

/***/ "./src/web/components/UpdatesCell.tsx":
/*!********************************************!*\
  !*** ./src/web/components/UpdatesCell.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatesCellType": () => (/* binding */ UpdatesCellType),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.esm.js");
/* harmony import */ var _design_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../design/palette */ "./src/web/design/palette.ts");
/* harmony import */ var _design_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../design/theme */ "./src/web/design/theme.ts");
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/date */ "./src/web/components/utils/date.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");





let UpdatesCellType;

(function (UpdatesCellType) {
  UpdatesCellType["Stacked"] = "stacked";
  UpdatesCellType["Inline"] = "inline";
})(UpdatesCellType || (UpdatesCellType = {}));

const timeStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.css)("font-family:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.fonts.sans, ";font-weight:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.fontWeights.bold, ";font-size:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.fontSizes.small, "rem;color:", _design_palette__WEBPACK_IMPORTED_MODULE_0__.text.live, ";text-align:right;" + ( false ? 0 : ";label:timeStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxVcGRhdGVzQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JzQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcVXBkYXRlc0NlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHRleHQgfSBmcm9tIFwiLi4vZGVzaWduL3BhbGV0dGVcIjtcclxuaW1wb3J0IHsgZm9udHMsIGZvbnRTaXplcywgZm9udFdlaWdodHMsIHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IHsgdGlueVJlbGF0aXZlIH0gZnJvbSBcIi4vdXRpbHMvZGF0ZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gVXBkYXRlc0NlbGxUeXBlIHtcclxuICBTdGFja2VkID0gXCJzdGFja2VkXCIsXHJcbiAgSW5saW5lID0gXCJpbmxpbmVcIixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVzQ2VsbFByb3BzIHtcclxuICB1cGRhdGVzOiB7IGlkOiBzdHJpbmc7IHRpbWVzdGFtcDogRGF0ZTsgdGV4dDogc3RyaW5nOyBsaW5rPzogc3RyaW5nIH1bXTtcclxuICB0eXBlPzogVXBkYXRlc0NlbGxUeXBlO1xyXG59XHJcblxyXG5jb25zdCB0aW1lU3R5bGVzID0gY3NzYFxyXG4gIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gIGZvbnQtd2VpZ2h0OiAke2ZvbnRXZWlnaHRzLmJvbGR9O1xyXG4gIGZvbnQtc2l6ZTogJHtmb250U2l6ZXMuc21hbGx9cmVtO1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZX07XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbmA7XHJcblxyXG5jb25zdCBzdGFja2VkVGltZVN0eWxlcyA9IGNzc2BcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG5cclxuICA6bm90KDpmaXJzdC1vZi10eXBlKSB7XHJcbiAgICBtYXJnaW4tdG9wOiAke3NwYWNlWzNdfXB4O1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IGxpbmtTdHlsZXMgPSBjc3NgXHJcbiAgY29sb3I6ICR7dGV4dC5wcmltYXJ5fTtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcblxyXG4gIDpob3ZlciB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCBjb250YWluZXJTdHlsZXMgPSAodHlwZTogVXBkYXRlc0NlbGxUeXBlKSA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIFVwZGF0ZXNDZWxsVHlwZS5TdGFja2VkOlxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIGNhc2UgVXBkYXRlc0NlbGxUeXBlLklubGluZTpcclxuICAgICAgcmV0dXJuIGNzc2BcclxuICAgICAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsIGF1dG8pIG1pbm1heCgwLCAxZnIpO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcclxuICAgICAgICBjb2x1bW4tZ2FwOiAke3NwYWNlWzNdfXB4O1xyXG4gICAgICAgIHJvdy1nYXA6ICR7c3BhY2VbMV19cHg7XHJcbiAgICAgIGA7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgVXBkYXRlc0NlbGw6IEZ1bmN0aW9uQ29tcG9uZW50PFVwZGF0ZXNDZWxsUHJvcHM+ID0gKHtcclxuICB1cGRhdGVzLFxyXG4gIHR5cGUgPSBVcGRhdGVzQ2VsbFR5cGUuU3RhY2tlZCxcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNzcz17Y29udGFpbmVyU3R5bGVzKHR5cGUpfT5cclxuICAgICAge3VwZGF0ZXMuZmxhdE1hcCgodXBkYXRlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9XHJcbiAgICAgICAgICB1cGRhdGUubGluayAhPSBudWxsID8gKFxyXG4gICAgICAgICAgICA8YSBjc3M9e2xpbmtTdHlsZXN9IGhyZWY9e3VwZGF0ZS5saW5rfT5cclxuICAgICAgICAgICAgICB7dXBkYXRlLnRleHR9XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIHVwZGF0ZS50ZXh0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17W1xyXG4gICAgICAgICAgICAgIHRpbWVTdHlsZXMsXHJcbiAgICAgICAgICAgICAgdHlwZSA9PSBVcGRhdGVzQ2VsbFR5cGUuU3RhY2tlZCAmJiBzdGFja2VkVGltZVN0eWxlcyxcclxuICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAga2V5PXt1cGRhdGUuaWQgKyBcIi10XCJ9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt0aW55UmVsYXRpdmUodXBkYXRlLnRpbWVzdGFtcCl9XHJcbiAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICA8ZGl2IGtleT17dXBkYXRlLmlkICsgXCItbFwifT57dGV4dH08L2Rpdj4sXHJcbiAgICAgICAgXTtcclxuICAgICAgfSl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXBkYXRlc0NlbGw7XHJcbiJdfQ== */");
const stackedTimeStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.css)("text-align:left;:not(:first-of-type){margin-top:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.space[3], "px;}" + ( false ? 0 : ";label:stackedTimeStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxVcGRhdGVzQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0I2QiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcVXBkYXRlc0NlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHRleHQgfSBmcm9tIFwiLi4vZGVzaWduL3BhbGV0dGVcIjtcclxuaW1wb3J0IHsgZm9udHMsIGZvbnRTaXplcywgZm9udFdlaWdodHMsIHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IHsgdGlueVJlbGF0aXZlIH0gZnJvbSBcIi4vdXRpbHMvZGF0ZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gVXBkYXRlc0NlbGxUeXBlIHtcclxuICBTdGFja2VkID0gXCJzdGFja2VkXCIsXHJcbiAgSW5saW5lID0gXCJpbmxpbmVcIixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVzQ2VsbFByb3BzIHtcclxuICB1cGRhdGVzOiB7IGlkOiBzdHJpbmc7IHRpbWVzdGFtcDogRGF0ZTsgdGV4dDogc3RyaW5nOyBsaW5rPzogc3RyaW5nIH1bXTtcclxuICB0eXBlPzogVXBkYXRlc0NlbGxUeXBlO1xyXG59XHJcblxyXG5jb25zdCB0aW1lU3R5bGVzID0gY3NzYFxyXG4gIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gIGZvbnQtd2VpZ2h0OiAke2ZvbnRXZWlnaHRzLmJvbGR9O1xyXG4gIGZvbnQtc2l6ZTogJHtmb250U2l6ZXMuc21hbGx9cmVtO1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZX07XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbmA7XHJcblxyXG5jb25zdCBzdGFja2VkVGltZVN0eWxlcyA9IGNzc2BcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG5cclxuICA6bm90KDpmaXJzdC1vZi10eXBlKSB7XHJcbiAgICBtYXJnaW4tdG9wOiAke3NwYWNlWzNdfXB4O1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IGxpbmtTdHlsZXMgPSBjc3NgXHJcbiAgY29sb3I6ICR7dGV4dC5wcmltYXJ5fTtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcblxyXG4gIDpob3ZlciB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCBjb250YWluZXJTdHlsZXMgPSAodHlwZTogVXBkYXRlc0NlbGxUeXBlKSA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIFVwZGF0ZXNDZWxsVHlwZS5TdGFja2VkOlxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIGNhc2UgVXBkYXRlc0NlbGxUeXBlLklubGluZTpcclxuICAgICAgcmV0dXJuIGNzc2BcclxuICAgICAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsIGF1dG8pIG1pbm1heCgwLCAxZnIpO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcclxuICAgICAgICBjb2x1bW4tZ2FwOiAke3NwYWNlWzNdfXB4O1xyXG4gICAgICAgIHJvdy1nYXA6ICR7c3BhY2VbMV19cHg7XHJcbiAgICAgIGA7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgVXBkYXRlc0NlbGw6IEZ1bmN0aW9uQ29tcG9uZW50PFVwZGF0ZXNDZWxsUHJvcHM+ID0gKHtcclxuICB1cGRhdGVzLFxyXG4gIHR5cGUgPSBVcGRhdGVzQ2VsbFR5cGUuU3RhY2tlZCxcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNzcz17Y29udGFpbmVyU3R5bGVzKHR5cGUpfT5cclxuICAgICAge3VwZGF0ZXMuZmxhdE1hcCgodXBkYXRlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9XHJcbiAgICAgICAgICB1cGRhdGUubGluayAhPSBudWxsID8gKFxyXG4gICAgICAgICAgICA8YSBjc3M9e2xpbmtTdHlsZXN9IGhyZWY9e3VwZGF0ZS5saW5rfT5cclxuICAgICAgICAgICAgICB7dXBkYXRlLnRleHR9XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIHVwZGF0ZS50ZXh0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17W1xyXG4gICAgICAgICAgICAgIHRpbWVTdHlsZXMsXHJcbiAgICAgICAgICAgICAgdHlwZSA9PSBVcGRhdGVzQ2VsbFR5cGUuU3RhY2tlZCAmJiBzdGFja2VkVGltZVN0eWxlcyxcclxuICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAga2V5PXt1cGRhdGUuaWQgKyBcIi10XCJ9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt0aW55UmVsYXRpdmUodXBkYXRlLnRpbWVzdGFtcCl9XHJcbiAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICA8ZGl2IGtleT17dXBkYXRlLmlkICsgXCItbFwifT57dGV4dH08L2Rpdj4sXHJcbiAgICAgICAgXTtcclxuICAgICAgfSl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXBkYXRlc0NlbGw7XHJcbiJdfQ== */");
const linkStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.css)("color:", _design_palette__WEBPACK_IMPORTED_MODULE_0__.text.primary, ";text-decoration:none;:hover{text-decoration:underline;}" + ( false ? 0 : ";label:linkStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxVcGRhdGVzQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0NzQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcVXBkYXRlc0NlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHRleHQgfSBmcm9tIFwiLi4vZGVzaWduL3BhbGV0dGVcIjtcclxuaW1wb3J0IHsgZm9udHMsIGZvbnRTaXplcywgZm9udFdlaWdodHMsIHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IHsgdGlueVJlbGF0aXZlIH0gZnJvbSBcIi4vdXRpbHMvZGF0ZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gVXBkYXRlc0NlbGxUeXBlIHtcclxuICBTdGFja2VkID0gXCJzdGFja2VkXCIsXHJcbiAgSW5saW5lID0gXCJpbmxpbmVcIixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVzQ2VsbFByb3BzIHtcclxuICB1cGRhdGVzOiB7IGlkOiBzdHJpbmc7IHRpbWVzdGFtcDogRGF0ZTsgdGV4dDogc3RyaW5nOyBsaW5rPzogc3RyaW5nIH1bXTtcclxuICB0eXBlPzogVXBkYXRlc0NlbGxUeXBlO1xyXG59XHJcblxyXG5jb25zdCB0aW1lU3R5bGVzID0gY3NzYFxyXG4gIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gIGZvbnQtd2VpZ2h0OiAke2ZvbnRXZWlnaHRzLmJvbGR9O1xyXG4gIGZvbnQtc2l6ZTogJHtmb250U2l6ZXMuc21hbGx9cmVtO1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZX07XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbmA7XHJcblxyXG5jb25zdCBzdGFja2VkVGltZVN0eWxlcyA9IGNzc2BcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG5cclxuICA6bm90KDpmaXJzdC1vZi10eXBlKSB7XHJcbiAgICBtYXJnaW4tdG9wOiAke3NwYWNlWzNdfXB4O1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IGxpbmtTdHlsZXMgPSBjc3NgXHJcbiAgY29sb3I6ICR7dGV4dC5wcmltYXJ5fTtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcblxyXG4gIDpob3ZlciB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCBjb250YWluZXJTdHlsZXMgPSAodHlwZTogVXBkYXRlc0NlbGxUeXBlKSA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIFVwZGF0ZXNDZWxsVHlwZS5TdGFja2VkOlxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIGNhc2UgVXBkYXRlc0NlbGxUeXBlLklubGluZTpcclxuICAgICAgcmV0dXJuIGNzc2BcclxuICAgICAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsIGF1dG8pIG1pbm1heCgwLCAxZnIpO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcclxuICAgICAgICBjb2x1bW4tZ2FwOiAke3NwYWNlWzNdfXB4O1xyXG4gICAgICAgIHJvdy1nYXA6ICR7c3BhY2VbMV19cHg7XHJcbiAgICAgIGA7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgVXBkYXRlc0NlbGw6IEZ1bmN0aW9uQ29tcG9uZW50PFVwZGF0ZXNDZWxsUHJvcHM+ID0gKHtcclxuICB1cGRhdGVzLFxyXG4gIHR5cGUgPSBVcGRhdGVzQ2VsbFR5cGUuU3RhY2tlZCxcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNzcz17Y29udGFpbmVyU3R5bGVzKHR5cGUpfT5cclxuICAgICAge3VwZGF0ZXMuZmxhdE1hcCgodXBkYXRlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9XHJcbiAgICAgICAgICB1cGRhdGUubGluayAhPSBudWxsID8gKFxyXG4gICAgICAgICAgICA8YSBjc3M9e2xpbmtTdHlsZXN9IGhyZWY9e3VwZGF0ZS5saW5rfT5cclxuICAgICAgICAgICAgICB7dXBkYXRlLnRleHR9XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIHVwZGF0ZS50ZXh0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17W1xyXG4gICAgICAgICAgICAgIHRpbWVTdHlsZXMsXHJcbiAgICAgICAgICAgICAgdHlwZSA9PSBVcGRhdGVzQ2VsbFR5cGUuU3RhY2tlZCAmJiBzdGFja2VkVGltZVN0eWxlcyxcclxuICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAga2V5PXt1cGRhdGUuaWQgKyBcIi10XCJ9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt0aW55UmVsYXRpdmUodXBkYXRlLnRpbWVzdGFtcCl9XHJcbiAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICA8ZGl2IGtleT17dXBkYXRlLmlkICsgXCItbFwifT57dGV4dH08L2Rpdj4sXHJcbiAgICAgICAgXTtcclxuICAgICAgfSl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXBkYXRlc0NlbGw7XHJcbiJdfQ== */");

const containerStyles = type => {
  switch (type) {
    case UpdatesCellType.Stacked:
      return null;

    case UpdatesCellType.Inline:
      return /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.css)("display:grid;grid-template-columns:minmax(0, auto) minmax(0, 1fr);align-items:baseline;column-gap:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.space[3], "px;row-gap:", _design_theme__WEBPACK_IMPORTED_MODULE_1__.space[1], "px;" + ( false ? 0 : ";label:containerStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxVcGRhdGVzQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOENnQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcY29tcG9uZW50c1xcVXBkYXRlc0NlbGwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IHRleHQgfSBmcm9tIFwiLi4vZGVzaWduL3BhbGV0dGVcIjtcclxuaW1wb3J0IHsgZm9udHMsIGZvbnRTaXplcywgZm9udFdlaWdodHMsIHNwYWNlIH0gZnJvbSBcIi4uL2Rlc2lnbi90aGVtZVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IHsgdGlueVJlbGF0aXZlIH0gZnJvbSBcIi4vdXRpbHMvZGF0ZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gVXBkYXRlc0NlbGxUeXBlIHtcclxuICBTdGFja2VkID0gXCJzdGFja2VkXCIsXHJcbiAgSW5saW5lID0gXCJpbmxpbmVcIixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVzQ2VsbFByb3BzIHtcclxuICB1cGRhdGVzOiB7IGlkOiBzdHJpbmc7IHRpbWVzdGFtcDogRGF0ZTsgdGV4dDogc3RyaW5nOyBsaW5rPzogc3RyaW5nIH1bXTtcclxuICB0eXBlPzogVXBkYXRlc0NlbGxUeXBlO1xyXG59XHJcblxyXG5jb25zdCB0aW1lU3R5bGVzID0gY3NzYFxyXG4gIGZvbnQtZmFtaWx5OiAke2ZvbnRzLnNhbnN9O1xyXG4gIGZvbnQtd2VpZ2h0OiAke2ZvbnRXZWlnaHRzLmJvbGR9O1xyXG4gIGZvbnQtc2l6ZTogJHtmb250U2l6ZXMuc21hbGx9cmVtO1xyXG4gIGNvbG9yOiAke3RleHQubGl2ZX07XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbmA7XHJcblxyXG5jb25zdCBzdGFja2VkVGltZVN0eWxlcyA9IGNzc2BcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG5cclxuICA6bm90KDpmaXJzdC1vZi10eXBlKSB7XHJcbiAgICBtYXJnaW4tdG9wOiAke3NwYWNlWzNdfXB4O1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IGxpbmtTdHlsZXMgPSBjc3NgXHJcbiAgY29sb3I6ICR7dGV4dC5wcmltYXJ5fTtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcblxyXG4gIDpob3ZlciB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCBjb250YWluZXJTdHlsZXMgPSAodHlwZTogVXBkYXRlc0NlbGxUeXBlKSA9PiB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIFVwZGF0ZXNDZWxsVHlwZS5TdGFja2VkOlxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIGNhc2UgVXBkYXRlc0NlbGxUeXBlLklubGluZTpcclxuICAgICAgcmV0dXJuIGNzc2BcclxuICAgICAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsIGF1dG8pIG1pbm1heCgwLCAxZnIpO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcclxuICAgICAgICBjb2x1bW4tZ2FwOiAke3NwYWNlWzNdfXB4O1xyXG4gICAgICAgIHJvdy1nYXA6ICR7c3BhY2VbMV19cHg7XHJcbiAgICAgIGA7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgVXBkYXRlc0NlbGw6IEZ1bmN0aW9uQ29tcG9uZW50PFVwZGF0ZXNDZWxsUHJvcHM+ID0gKHtcclxuICB1cGRhdGVzLFxyXG4gIHR5cGUgPSBVcGRhdGVzQ2VsbFR5cGUuU3RhY2tlZCxcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNzcz17Y29udGFpbmVyU3R5bGVzKHR5cGUpfT5cclxuICAgICAge3VwZGF0ZXMuZmxhdE1hcCgodXBkYXRlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9XHJcbiAgICAgICAgICB1cGRhdGUubGluayAhPSBudWxsID8gKFxyXG4gICAgICAgICAgICA8YSBjc3M9e2xpbmtTdHlsZXN9IGhyZWY9e3VwZGF0ZS5saW5rfT5cclxuICAgICAgICAgICAgICB7dXBkYXRlLnRleHR9XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIHVwZGF0ZS50ZXh0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNzcz17W1xyXG4gICAgICAgICAgICAgIHRpbWVTdHlsZXMsXHJcbiAgICAgICAgICAgICAgdHlwZSA9PSBVcGRhdGVzQ2VsbFR5cGUuU3RhY2tlZCAmJiBzdGFja2VkVGltZVN0eWxlcyxcclxuICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAga2V5PXt1cGRhdGUuaWQgKyBcIi10XCJ9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt0aW55UmVsYXRpdmUodXBkYXRlLnRpbWVzdGFtcCl9XHJcbiAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICA8ZGl2IGtleT17dXBkYXRlLmlkICsgXCItbFwifT57dGV4dH08L2Rpdj4sXHJcbiAgICAgICAgXTtcclxuICAgICAgfSl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXBkYXRlc0NlbGw7XHJcbiJdfQ== */");
  }
};

const UpdatesCell = ({
  updates,
  type = UpdatesCellType.Stacked
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    css: containerStyles(type),
    children: updates.flatMap(update => {
      const text = update.link != null ? (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
        css: linkStyles,
        href: update.link,
        children: update.text
      }) : update.text;
      return [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        css: [timeStyles, type == UpdatesCellType.Stacked && stackedTimeStyles,  false ? 0 : ";label:UpdatesCell;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxVcGRhdGVzQ2VsbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUVZIiwiZmlsZSI6IkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxjb21wb25lbnRzXFxVcGRhdGVzQ2VsbC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcclxuaW1wb3J0IHsgdGV4dCB9IGZyb20gXCIuLi9kZXNpZ24vcGFsZXR0ZVwiO1xyXG5pbXBvcnQgeyBmb250cywgZm9udFNpemVzLCBmb250V2VpZ2h0cywgc3BhY2UgfSBmcm9tIFwiLi4vZGVzaWduL3RoZW1lXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgeyB0aW55UmVsYXRpdmUgfSBmcm9tIFwiLi91dGlscy9kYXRlXCI7XHJcblxyXG5leHBvcnQgZW51bSBVcGRhdGVzQ2VsbFR5cGUge1xyXG4gIFN0YWNrZWQgPSBcInN0YWNrZWRcIixcclxuICBJbmxpbmUgPSBcImlubGluZVwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZXNDZWxsUHJvcHMge1xyXG4gIHVwZGF0ZXM6IHsgaWQ6IHN0cmluZzsgdGltZXN0YW1wOiBEYXRlOyB0ZXh0OiBzdHJpbmc7IGxpbms/OiBzdHJpbmcgfVtdO1xyXG4gIHR5cGU/OiBVcGRhdGVzQ2VsbFR5cGU7XHJcbn1cclxuXHJcbmNvbnN0IHRpbWVTdHlsZXMgPSBjc3NgXHJcbiAgZm9udC1mYW1pbHk6ICR7Zm9udHMuc2Fuc307XHJcbiAgZm9udC13ZWlnaHQ6ICR7Zm9udFdlaWdodHMuYm9sZH07XHJcbiAgZm9udC1zaXplOiAke2ZvbnRTaXplcy5zbWFsbH1yZW07XHJcbiAgY29sb3I6ICR7dGV4dC5saXZlfTtcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxuYDtcclxuXHJcbmNvbnN0IHN0YWNrZWRUaW1lU3R5bGVzID0gY3NzYFxyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcblxyXG4gIDpub3QoOmZpcnN0LW9mLXR5cGUpIHtcclxuICAgIG1hcmdpbi10b3A6ICR7c3BhY2VbM119cHg7XHJcbiAgfVxyXG5gO1xyXG5cclxuY29uc3QgbGlua1N0eWxlcyA9IGNzc2BcclxuICBjb2xvcjogJHt0ZXh0LnByaW1hcnl9O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuXHJcbiAgOmhvdmVyIHtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IGNvbnRhaW5lclN0eWxlcyA9ICh0eXBlOiBVcGRhdGVzQ2VsbFR5cGUpID0+IHtcclxuICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgIGNhc2UgVXBkYXRlc0NlbGxUeXBlLlN0YWNrZWQ6XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgY2FzZSBVcGRhdGVzQ2VsbFR5cGUuSW5saW5lOlxyXG4gICAgICByZXR1cm4gY3NzYFxyXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwgYXV0bykgbWlubWF4KDAsIDFmcik7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xyXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7c3BhY2VbM119cHg7XHJcbiAgICAgICAgcm93LWdhcDogJHtzcGFjZVsxXX1weDtcclxuICAgICAgYDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBVcGRhdGVzQ2VsbDogRnVuY3Rpb25Db21wb25lbnQ8VXBkYXRlc0NlbGxQcm9wcz4gPSAoe1xyXG4gIHVwZGF0ZXMsXHJcbiAgdHlwZSA9IFVwZGF0ZXNDZWxsVHlwZS5TdGFja2VkLFxyXG59KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY3NzPXtjb250YWluZXJTdHlsZXModHlwZSl9PlxyXG4gICAgICB7dXBkYXRlcy5mbGF0TWFwKCh1cGRhdGUpID0+IHtcclxuICAgICAgICBjb25zdCB0ZXh0ID1cclxuICAgICAgICAgIHVwZGF0ZS5saW5rICE9IG51bGwgPyAoXHJcbiAgICAgICAgICAgIDxhIGNzcz17bGlua1N0eWxlc30gaHJlZj17dXBkYXRlLmxpbmt9PlxyXG4gICAgICAgICAgICAgIHt1cGRhdGUudGV4dH1cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgdXBkYXRlLnRleHRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY3NzPXtbXHJcbiAgICAgICAgICAgICAgdGltZVN0eWxlcyxcclxuICAgICAgICAgICAgICB0eXBlID09IFVwZGF0ZXNDZWxsVHlwZS5TdGFja2VkICYmIHN0YWNrZWRUaW1lU3R5bGVzLFxyXG4gICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICBrZXk9e3VwZGF0ZS5pZCArIFwiLXRcIn1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3RpbnlSZWxhdGl2ZSh1cGRhdGUudGltZXN0YW1wKX1cclxuICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgIDxkaXYga2V5PXt1cGRhdGUuaWQgKyBcIi1sXCJ9Pnt0ZXh0fTwvZGl2PixcclxuICAgICAgICBdO1xyXG4gICAgICB9KX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVcGRhdGVzQ2VsbDtcclxuIl19 */"],
        children: (0,_utils_date__WEBPACK_IMPORTED_MODULE_2__.tinyRelative)(update.timestamp)
      }, update.id + "-t"), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        children: text
      }, update.id + "-l")];
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UpdatesCell);

/***/ }),

/***/ "./src/web/components/utils/date.ts":
/*!******************************************!*\
  !*** ./src/web/components/utils/date.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tinyRelative": () => (/* binding */ tinyRelative)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/differenceInSeconds/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isSameDay/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");

const secondsIn = {
  s: 1,
  m: 60,
  h: 60 * 60,
  d: 60 * 60 * 24,
  w: 60 * 60 * 24 * 7
};
/**
 * Represents the distance between `date` and `now` as a short string
 * @param date
 * @param suffix whether "ago" should be appended to the string, when applicable
 * @param now value to compare `date` to
 */

function tinyRelative(date, suffix = false, now = new Date()) {
  const secondsAgo = Math.max((0,date_fns__WEBPACK_IMPORTED_MODULE_0__.default)(now, date), 1); // If same day, just show time

  if ((0,date_fns__WEBPACK_IMPORTED_MODULE_1__.default)(date, now)) {
    return (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.default)(date, "HH:mm");
  } // Else, show relative distance using short units


  const relativeTimestamp = (() => {
    if (secondsAgo < secondsIn.m) return `${secondsAgo}s`;
    if (secondsAgo < secondsIn.h) return `${Math.floor(secondsAgo / secondsIn.m)}m`;
    if (secondsAgo < secondsIn.d) return `${Math.floor(secondsAgo / secondsIn.h)}h`;
    if (secondsAgo < secondsIn.w) return `${Math.floor(secondsAgo / secondsIn.d)}d`;
    return `${Math.floor(secondsAgo / secondsIn.w)}w`;
  })();

  if (suffix) {
    return `${relativeTimestamp} ago`;
  }

  return relativeTimestamp;
}

/***/ }),

/***/ "./src/web/design/palette.ts":
/*!***********************************!*\
  !*** ./src/web/design/palette.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text),
/* harmony export */   "bg": () => (/* binding */ bg)
/* harmony export */ });
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./theme */ "./src/web/design/theme.ts");

const text = {
  primary: _theme__WEBPACK_IMPORTED_MODULE_0__.colours.neutral[800],
  theme: _theme__WEBPACK_IMPORTED_MODULE_0__.colours.red[700],
  secondary: _theme__WEBPACK_IMPORTED_MODULE_0__.colours.neutral[600],
  live: _theme__WEBPACK_IMPORTED_MODULE_0__.colours.red[700],
  liveInverse: _theme__WEBPACK_IMPORTED_MODULE_0__.colours.red[50]
};
const bg = {
  live: _theme__WEBPACK_IMPORTED_MODULE_0__.colours.red[700],
  warning: _theme__WEBPACK_IMPORTED_MODULE_0__.colours.red[700],
  theme: _theme__WEBPACK_IMPORTED_MODULE_0__.colours.red[700]
};

/***/ }),

/***/ "./src/web/design/theme.ts":
/*!*********************************!*\
  !*** ./src/web/design/theme.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fontSizes": () => (/* binding */ fontSizes),
/* harmony export */   "fonts": () => (/* binding */ fonts),
/* harmony export */   "lineHeights": () => (/* binding */ lineHeights),
/* harmony export */   "letterSpacings": () => (/* binding */ letterSpacings),
/* harmony export */   "fontWeights": () => (/* binding */ fontWeights),
/* harmony export */   "colours": () => (/* binding */ colours),
/* harmony export */   "space": () => (/* binding */ space),
/* harmony export */   "breakpoints": () => (/* binding */ breakpoints),
/* harmony export */   "mediaQueries": () => (/* binding */ mediaQueries),
/* harmony export */   "zIndices": () => (/* binding */ zIndices)
/* harmony export */ });
const fontSizes = {
  small: 0.8,
  base: 1,
  large: 1.2,
  huge: 2
};
const fonts = {
  sans: `Inter, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif`,
  serif: `Literata, Georgia, serif`
};
const lineHeights = {
  dense: 1.15,
  base: 1.35,
  relaxed: 1.5
};
const letterSpacings = {
  dense: "-0.03rem",
  base: "0",
  relaxed: "0.03rem"
};
const fontWeights = {
  base: 400,
  bold: 700
}; // Generated with https://tailwind.ink/

const colours = {
  red: {
    50: "#fcf7f4",
    100: "#fcede9",
    200: "#fad5d0",
    300: "#f9b3a6",
    400: "#f9826a",
    500: "#fa573f",
    600: "#f3372a",
    700: "#d81a00",
    // theme colour
    800: "#ae2228",
    900: "#8c1d23"
  },
  blue: {
    50: "#f5fafc",
    100: "#e7f5fc",
    200: "#c8e4f9",
    300: "#a5ccf8",
    400: "#72a4f7",
    500: "#4377f6",
    600: "#3054ee",
    700: "#2a42d4",
    800: "#2233a3",
    900: "#1c2a7e"
  },
  // From https://github.com/tailwindlabs/tailwindcss/blob/master/colors.js
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827"
  }
};
const space = [0, 2, 4, 8, 12, 16, 20, 24, 32, 48, 96];
const breakpoints = ["40em", "52em", "64em"];
const mediaQueries = {
  small: `@media screen and (min-width: ${breakpoints[0]})`,
  medium: `@media screen and (min-width: ${breakpoints[1]})`,
  large: `@media screen and (min-width: ${breakpoints[2]})`
};
const zIndices = {
  linkArea: 10
};

/***/ }),

/***/ "./src/web/design/typography.ts":
/*!**************************************!*\
  !*** ./src/web/design/typography.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseFont": () => (/* binding */ baseFont),
/* harmony export */   "headlineFont": () => (/* binding */ headlineFont),
/* harmony export */   "subtitleFont": () => (/* binding */ subtitleFont),
/* harmony export */   "generateStyles": () => (/* binding */ generateStyles)
/* harmony export */ });
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./theme */ "./src/web/design/theme.ts");
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./palette */ "./src/web/design/palette.ts");


const baseFont = {
  family: _theme__WEBPACK_IMPORTED_MODULE_0__.fonts.serif,
  size: _theme__WEBPACK_IMPORTED_MODULE_0__.fontSizes.base,
  height: _theme__WEBPACK_IMPORTED_MODULE_0__.lineHeights.base,
  weight: _theme__WEBPACK_IMPORTED_MODULE_0__.fontWeights.base,
  colour: _palette__WEBPACK_IMPORTED_MODULE_1__.text.primary
};
const headlineFont = {
  family: _theme__WEBPACK_IMPORTED_MODULE_0__.fonts.serif,
  size: _theme__WEBPACK_IMPORTED_MODULE_0__.fontSizes.huge,
  height: _theme__WEBPACK_IMPORTED_MODULE_0__.lineHeights.base,
  weight: _theme__WEBPACK_IMPORTED_MODULE_0__.fontWeights.bold,
  colour: _palette__WEBPACK_IMPORTED_MODULE_1__.text.primary
};
const subtitleFont = {
  family: _theme__WEBPACK_IMPORTED_MODULE_0__.fonts.serif,
  size: _theme__WEBPACK_IMPORTED_MODULE_0__.fontSizes.large,
  height: _theme__WEBPACK_IMPORTED_MODULE_0__.lineHeights.base,
  weight: _theme__WEBPACK_IMPORTED_MODULE_0__.fontWeights.bold,
  colour: _palette__WEBPACK_IMPORTED_MODULE_1__.text.primary
};
function generateStyles(config) {
  // TODO: Exclude properties which mirror base? Reduces duplication?
  return `
    font-family: ${config.family};
    font-size: ${config.size}rem;
    font-weight: ${config.weight};
    line-height: ${config.height};
    colour: ${config.colour};
  `;
}

/***/ }),

/***/ "./src/web/home/index.tsx":
/*!********************************!*\
  !*** ./src/web/home/index.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.esm.js");
/* harmony import */ var _components_ArticleCell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/ArticleCell */ "./src/web/components/ArticleCell.tsx");
/* harmony import */ var _components_Block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Block */ "./src/web/components/Block.tsx");
/* harmony import */ var _components_Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Container */ "./src/web/components/Container.tsx");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Header */ "./src/web/components/Header.tsx");
/* harmony import */ var _components_UpdatesCell__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/UpdatesCell */ "./src/web/components/UpdatesCell.tsx");
/* harmony import */ var _design_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../design/theme */ "./src/web/design/theme.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");











const Wrapper = ({
  columns: cols,
  rows = 1,
  children
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
    style: {
      gridColumn: `auto / span ${cols}`,
      gridRow: `auto / span ${rows}`
    },
    children: children
  });
};

const HomePage = ({}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Header__WEBPACK_IMPORTED_MODULE_3__.default, {}), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_components_Container__WEBPACK_IMPORTED_MODULE_2__.default, {
      grid: 1,
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_components_Block__WEBPACK_IMPORTED_MODULE_1__.default, {
        columns: 6,
        rows: 2,
        css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.css)("border-top:none;margin-top:", _design_theme__WEBPACK_IMPORTED_MODULE_5__.space[6], "px;" + ( false ? 0 : ";label:HomePage;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlja2RcXERvY3VtZW50c1xcc3R1ZGVudC1mYWJyaWNcXHNyY1xcd2ViXFxob21lXFxpbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0NrQiIsImZpbGUiOiJDOlxcVXNlcnNcXG5pY2tkXFxEb2N1bWVudHNcXHN0dWRlbnQtZmFicmljXFxzcmNcXHdlYlxcaG9tZVxcaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50LCBoeWRyYXRlIH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgQXJ0aWNsZUNlbGwsIHsgQXJ0aWNsZUNlbGxUeXBlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQXJ0aWNsZUNlbGxcIjtcclxuaW1wb3J0IEJsb2NrIGZyb20gXCIuLi9jb21wb25lbnRzL0Jsb2NrXCI7XHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ29udGFpbmVyXCI7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvSGVhZGVyXCI7XHJcbmltcG9ydCBVcGRhdGVzQ2VsbCBmcm9tIFwiLi4vY29tcG9uZW50cy9VcGRhdGVzQ2VsbFwiO1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gXCIuLi9kZXNpZ24vdGhlbWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSG9tZVBhZ2VQcm9wcyB7fVxyXG5cclxuY29uc3QgV3JhcHBlcjogRnVuY3Rpb25Db21wb25lbnQ8eyBjb2x1bW5zOiBudW1iZXI7IHJvd3M/OiBudW1iZXIgfT4gPSAoe1xyXG4gIGNvbHVtbnM6IGNvbHMsXHJcbiAgcm93cyA9IDEsXHJcbiAgY2hpbGRyZW4sXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIGdyaWRDb2x1bW46IGBhdXRvIC8gc3BhbiAke2NvbHN9YCxcclxuICAgICAgICBncmlkUm93OiBgYXV0byAvIHNwYW4gJHtyb3dzfWAsXHJcbiAgICAgIH19XHJcbiAgICA+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBIb21lUGFnZTogRnVuY3Rpb25Db21wb25lbnQ8SG9tZVBhZ2VQcm9wcz4gPSAoe30pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPEhlYWRlciAvPlxyXG4gICAgICA8Q29udGFpbmVyIGdyaWQ9ezF9PlxyXG4gICAgICAgIDxCbG9ja1xyXG4gICAgICAgICAgY29sdW1ucz17Nn1cclxuICAgICAgICAgIHJvd3M9ezJ9XHJcbiAgICAgICAgICBjc3M9e2Nzc2BcclxuICAgICAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDogJHtzcGFjZVs2XX1weDtcclxuICAgICAgICAgIGB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFdyYXBwZXIgY29sdW1ucz17M30gcm93cz17Mn0+XHJcbiAgICAgICAgICAgIDxBcnRpY2xlQ2VsbFxyXG4gICAgICAgICAgICAgIHRpdGxlPVwiQ2FtcGFpZ25pbmcgYmVnaW5zIGZvciBTdHVkZW50IEVsZWN0aW9uc1wiXHJcbiAgICAgICAgICAgICAgc3VidGl0bGU9XCIzMCBzdHVkZW50cyBhcmUgc3RhbmRpbmcgZm9yIGZpdmUgc2FiYmF0aWNhbCBwb3NpdGlvbnNcIlxyXG4gICAgICAgICAgICAgIHRleHQ9XCJUaGUgZWxlY3Rpb25zIHByb3ZpZGUgYW4gb3Bwb3J0dW5pdHkgZm9yIHN0dWRlbnRzIGF0IHRoZSBVbml2ZXJzaXR5IG9mIEVkaW5idXJnaCB0byBwaWNrIHRoZSBuZXh0IGdlbmVyYXRpb24gb2YgZWxlY3RlZCBvZmZpY2lhbHMgd2hpY2ggd2lsbCByZXByZXNlbnQgdGhlaXIgdmlld3MgYW5kIGNvbmNlcm5zIHRvIHRoZSB1bml2ZXJzaXR5LiBWb3Rpbmcgb3BlbnMgPGI+OHRoIE1hcmNoPC9iPiwgYW5kIHdlJ2xsIGJlIGJyaW5naW5nIHlvdSB0aGUgbGF0ZXN0IGFsbCB0aGUgd2F5LlwiXHJcbiAgICAgICAgICAgICAgaXNMaXZlXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L1dyYXBwZXI+XHJcbiAgICAgICAgICA8V3JhcHBlciBjb2x1bW5zPXsxfT5cclxuICAgICAgICAgICAgPEFydGljbGVDZWxsXHJcbiAgICAgICAgICAgICAgdGl0bGU9XCJSZWFkIHRoZSBtYW5pZmVzdG9zXCJcclxuICAgICAgICAgICAgICB0ZXh0PVwiQWxsIHRoZSBjYW5kaWRhdGVzIGFyZSBvbiB0aGUgRVVTQSBzaXRlLlwiXHJcbiAgICAgICAgICAgICAgdHlwZT17QXJ0aWNsZUNlbGxUeXBlLkNvbXBhY3R9XHJcbiAgICAgICAgICAgICAgbGluaz1cImh0dHBzOi8vd3d3LmV1c2EuZWQuYWMudWsveW91cnZvaWNlL2VsZWN0aW9ucy9tYXJjaC92b3RlL1wiXHJcbiAgICAgICAgICAgICAgbmV3VGFiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L1dyYXBwZXI+XHJcbiAgICAgICAgICA8V3JhcHBlciBjb2x1bW5zPXsyfSByb3dzPXsyfT5cclxuICAgICAgICAgICAgPFVwZGF0ZXNDZWxsXHJcbiAgICAgICAgICAgICAgdXBkYXRlcz17W1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgIGlkOiBcIjAwMDFcIixcclxuICAgICAgICAgICAgICAgICAgdGV4dDogXCJOZWVkIGFsbCB0aGUgdXBkYXRlcyB0byBnbyBoZXJlIGhhaGFcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgaWQ6IFwiMDAwMlwiLFxyXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcIkFuZCBhbm90aGVyIG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9XcmFwcGVyPlxyXG4gICAgICAgICAgPFdyYXBwZXIgY29sdW1ucz17MX0+XHJcbiAgICAgICAgICAgIDxBcnRpY2xlQ2VsbFxyXG4gICAgICAgICAgICAgIHRpdGxlPVwiUG9saXRpY3MsIGJyZWFraW5nXCJcclxuICAgICAgICAgICAgICB0ZXh0PVwiSXQgaGFzIG5ldmVyIGJlZW4gbW9yZSBjcnVjaWFsIHRoYXQgb3VyIHZvaWNlcyBhcmUgaGVhcmQuXCJcclxuICAgICAgICAgICAgICBsaW5rPVwiL2FydGljbGUvc3R1ZGVudC1wb2xpdGljcy1pcy1keWluZy1hbmQtdGhpcy1lbGVjdGlvbi1jb3VsZC1iZS10aGUtZmluYWwtYmxvd1wiXHJcbiAgICAgICAgICAgICAgdHlwZT17QXJ0aWNsZUNlbGxUeXBlLkNvbXBhY3R9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L1dyYXBwZXI+XHJcbiAgICAgICAgPC9CbG9jaz5cclxuICAgICAgICA8QmxvY2sgY29sdW1ucz17Nn0gdGl0bGU9XCJGZWF0dXJlZFwiPlxyXG4gICAgICAgICAgPFdyYXBwZXIgY29sdW1ucz17M30+XHJcbiAgICAgICAgICAgIDxBcnRpY2xlQ2VsbCB0aXRsZT1cIlwiIC8+XHJcbiAgICAgICAgICA8L1dyYXBwZXI+XHJcbiAgICAgICAgPC9CbG9jaz5cclxuICAgICAgPC9Db250YWluZXI+XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSG9tZVBhZ2U7XHJcbiJdfQ== */"),
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Wrapper, {
          columns: 3,
          rows: 2,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_ArticleCell__WEBPACK_IMPORTED_MODULE_0__.default, {
            title: "Campaigning begins for Student Elections",
            subtitle: "30 students are standing for five sabbatical positions",
            text: "The elections provide an opportunity for students at the University of Edinburgh to pick the next generation of elected officials which will represent their views and concerns to the university. Voting opens <b>8th March</b>, and we'll be bringing you the latest all the way.",
            isLive: true
          })
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Wrapper, {
          columns: 1,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_ArticleCell__WEBPACK_IMPORTED_MODULE_0__.default, {
            title: "Read the manifestos",
            text: "All the candidates are on the EUSA site.",
            type: _components_ArticleCell__WEBPACK_IMPORTED_MODULE_0__.ArticleCellType.Compact,
            link: "https://www.eusa.ed.ac.uk/yourvoice/elections/march/vote/",
            newTab: true
          })
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Wrapper, {
          columns: 2,
          rows: 2,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_UpdatesCell__WEBPACK_IMPORTED_MODULE_4__.default, {
            updates: [{
              timestamp: new Date(),
              id: "0001",
              text: "Need all the updates to go here haha"
            }, {
              timestamp: new Date(),
              id: "0002",
              text: "And another one"
            }]
          })
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Wrapper, {
          columns: 1,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_ArticleCell__WEBPACK_IMPORTED_MODULE_0__.default, {
            title: "Politics, breaking",
            text: "It has never been more crucial that our voices are heard.",
            link: "/article/student-politics-is-dying-and-this-election-could-be-the-final-blow",
            type: _components_ArticleCell__WEBPACK_IMPORTED_MODULE_0__.ArticleCellType.Compact
          })
        })]
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Block__WEBPACK_IMPORTED_MODULE_1__.default, {
        columns: 6,
        title: "Featured",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Wrapper, {
          columns: 3,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_ArticleCell__WEBPACK_IMPORTED_MODULE_0__.default, {
            title: ""
          })
        })
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HomePage);

/***/ }),

/***/ "./src/web/home/server.tsx":
/*!*********************************!*\
  !*** ./src/web/home/server.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serverRender": () => (/* binding */ serverRender)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/web/home/index.tsx");
/* harmony import */ var preact_render_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact-render-to-string */ "./node_modules/preact-render-to-string/dist/index.mjs");
/* harmony import */ var _design_palette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../design/palette */ "./src/web/design/palette.ts");
/* harmony import */ var _design_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../design/theme */ "./src/web/design/theme.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js");






function serverRender(props) {
  return (0,preact_render_to_string__WEBPACK_IMPORTED_MODULE_1__.default)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("html", {
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("head", {
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("title", {
        children: "The Student"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("link", {
        rel: "preconnect",
        href: "https://fonts.gstatic.com"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("link", {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Literata:ital,wght@0,400;0,700;1,400&display=swap",
        rel: "stylesheet"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("style", {
        dangerouslySetInnerHTML: {
          __html: `*{box-sizing:border-box}body{color:${_design_palette__WEBPACK_IMPORTED_MODULE_2__.text.primary};font-family:${_design_theme__WEBPACK_IMPORTED_MODULE_3__.fonts.serif};line-height:${_design_theme__WEBPACK_IMPORTED_MODULE_3__.lineHeights.base}}html,body,#root{padding:0;margin:0;width:100%;height:100%;overflow:hidden;}`
        }
      })]
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("body", {
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        id: "root",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_0__.default, { ...props
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("script", {
        dangerouslySetInnerHTML: {
          __html: `window.HYDRATE={props:${JSON.stringify(props)}};`
        }
      })]
    })]
  }));
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addLeadingZeros)
/* harmony export */ });
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : '';
  var output = Math.abs(number).toString();

  while (output.length < targetLength) {
    output = '0' + output;
  }

  return sign + output;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/formatters/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/formatters/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lightFormatters/index.js */ "./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js");
/* harmony import */ var _lib_getUTCDayOfYear_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_lib/getUTCDayOfYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js");
/* harmony import */ var _lib_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_lib/getUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js");
/* harmony import */ var _lib_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_lib/getUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js");
/* harmony import */ var _lib_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_lib/getUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeek/index.js");
/* harmony import */ var _lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/getUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js");
/* harmony import */ var _addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../addLeadingZeros/index.js */ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js");







var dayPeriodEnum = {
  am: 'am',
  pm: 'pm',
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night'
  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* | Milliseconds in day            |
   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
   * |  d  | Day of month                   |  D  | Day of year                    |
   * |  e  | Local day of week              |  E  | Day of week                    |
   * |  f  |                                |  F* | Day of week in month           |
   * |  g* | Modified Julian day            |  G  | Era                            |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  i! | ISO day of week                |  I! | ISO week of year               |
   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
   * |  l* | (deprecated)                   |  L  | Stand-alone month              |
   * |  m  | Minute                         |  M  | Month                          |
   * |  n  |                                |  N  |                                |
   * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
   * |  p! | Long localized time            |  P! | Long localized date            |
   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
   * |  u  | Extended year                  |  U* | Cyclic year                    |
   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
   * |  w  | Local week of year             |  W* | Week of month                  |
   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
   * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   *
   * Letters marked by ! are non-standard, but implemented by date-fns:
   * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
   *   i.e. 7 for Sunday, 1 for Monday, etc.
   * - `I` is ISO week of year, as opposed to `w` which is local week of year.
   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
   *   `R` is supposed to be used in conjunction with `I` and `i`
   *   for universal ISO week-numbering date, whereas
   *   `Y` is supposed to be used in conjunction with `w` and `e`
   *   for week-numbering date specific to the locale.
   * - `P` is long localized date format
   * - `p` is long localized time format
   */

};
var formatters = {
  // Era
  G: function (date, token, localize) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;

    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, {
          width: 'abbreviated'
        });
      // A, B

      case 'GGGGG':
        return localize.era(era, {
          width: 'narrow'
        });
      // Anno Domini, Before Christ

      case 'GGGG':
      default:
        return localize.era(era, {
          width: 'wide'
        });
    }
  },
  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === 'yo') {
      var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, {
        unit: 'year'
      });
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.y(date, token);
  },
  // Local week-numbering year
  Y: function (date, token, localize, options) {
    var signedWeekYear = (0,_lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

    if (token === 'YY') {
      var twoDigitYear = weekYear % 100;
      return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(twoDigitYear, 2);
    } // Ordinal number


    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, {
        unit: 'year'
      });
    } // Padding


    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function (date, token) {
    var isoWeekYear = (0,_lib_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(date); // Padding

    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    var year = date.getUTCFullYear();
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(year, token.length);
  },
  // Quarter
  Q: function (date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
        return String(quarter);
      // 01, 02, 03, 04

      case 'QQ':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(quarter, 2);
      // 1st, 2nd, 3rd, 4th

      case 'Qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4

      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting'
        });
      // 1st quarter, 2nd quarter, ...

      case 'QQQQ':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone quarter
  q: function (date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

    switch (token) {
      // 1, 2, 3, 4
      case 'q':
        return String(quarter);
      // 01, 02, 03, 04

      case 'qq':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(quarter, 2);
      // 1st, 2nd, 3rd, 4th

      case 'qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4

      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone'
        });
      // 1st quarter, 2nd quarter, ...

      case 'qqqq':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Month
  M: function (date, token, localize) {
    var month = date.getUTCMonth();

    switch (token) {
      case 'M':
      case 'MM':
        return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.M(date, token);
      // 1st, 2nd, ..., 12th

      case 'Mo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec

      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // J, F, ..., D

      case 'MMMMM':
        return localize.month(month, {
          width: 'narrow',
          context: 'formatting'
        });
      // January, February, ..., December

      case 'MMMM':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone month
  L: function (date, token, localize) {
    var month = date.getUTCMonth();

    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return String(month + 1);
      // 01, 02, ..., 12

      case 'LL':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(month + 1, 2);
      // 1st, 2nd, ..., 12th

      case 'Lo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec

      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // J, F, ..., D

      case 'LLLLL':
        return localize.month(month, {
          width: 'narrow',
          context: 'standalone'
        });
      // January, February, ..., December

      case 'LLLL':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Local week of year
  w: function (date, token, localize, options) {
    var week = (0,_lib_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__.default)(date, options);

    if (token === 'wo') {
      return localize.ordinalNumber(week, {
        unit: 'week'
      });
    }

    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(week, token.length);
  },
  // ISO week of year
  I: function (date, token, localize) {
    var isoWeek = (0,_lib_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_5__.default)(date);

    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, {
        unit: 'week'
      });
    }

    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(isoWeek, token.length);
  },
  // Day of the month
  d: function (date, token, localize) {
    if (token === 'do') {
      return localize.ordinalNumber(date.getUTCDate(), {
        unit: 'date'
      });
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.d(date, token);
  },
  // Day of year
  D: function (date, token, localize) {
    var dayOfYear = (0,_lib_getUTCDayOfYear_index_js__WEBPACK_IMPORTED_MODULE_6__.default)(date);

    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, {
        unit: 'dayOfYear'
      });
    }

    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dayOfYear, token.length);
  },
  // Day of week
  E: function (date, token, localize) {
    var dayOfWeek = date.getUTCDay();

    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'EEEE':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Local day of week
  e: function (date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case 'e':
        return String(localDayOfWeek);
      // Padded numerical value

      case 'ee':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th

      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });

      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'eeee':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

    switch (token) {
      // Numerical value (same as in `e`)
      case 'c':
        return String(localDayOfWeek);
      // Padded numerical value

      case 'cc':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th

      case 'co':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });

      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // T

      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone'
        });
      // Tu

      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone'
        });
      // Tuesday

      case 'cccc':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // ISO day of week
  i: function (date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    switch (token) {
      // 2
      case 'i':
        return String(isoDayOfWeek);
      // 02

      case 'ii':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(isoDayOfWeek, token.length);
      // 2nd

      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, {
          unit: 'day'
        });
      // Tue

      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'iiii':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM or PM
  a: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';

    switch (token) {
      case 'a':
      case 'aa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'aaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();

      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'aaaa':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;

    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    }

    switch (token) {
      case 'b':
      case 'bb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'bbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();

      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'bbbb':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;

    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'BBBB':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === 'ho') {
      var hours = date.getUTCHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.h(date, token);
  },
  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getUTCHours(), {
        unit: 'hour'
      });
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.H(date, token);
  },
  // Hour [0-11]
  K: function (date, token, localize) {
    var hours = date.getUTCHours() % 12;

    if (token === 'Ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(hours, token.length);
  },
  // Hour [1-24]
  k: function (date, token, localize) {
    var hours = date.getUTCHours();
    if (hours === 0) hours = 24;

    if (token === 'ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(hours, token.length);
  },
  // Minute
  m: function (date, token, localize) {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getUTCMinutes(), {
        unit: 'minute'
      });
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.m(date, token);
  },
  // Second
  s: function (date, token, localize) {
    if (token === 'so') {
      return localize.ordinalNumber(date.getUTCSeconds(), {
        unit: 'second'
      });
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.s(date, token);
  },
  // Fraction of second
  S: function (date, token) {
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return 'Z';
    }

    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`

      case 'XXXX':
      case 'XX':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`

      case 'XXXXX':
      case 'XXX': // Hours and minutes with `:` delimiter

      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`

      case 'xxxx':
      case 'xx':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`

      case 'xxxxx':
      case 'xxx': // Hours and minutes with `:` delimiter

      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (GMT)
  O: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long

      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (specific non-location)
  z: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long

      case 'zzzz':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Seconds timestamp
  t: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1000);
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(timestamp, token.length);
  }
};

function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;

  if (minutes === 0) {
    return sign + String(hours);
  }

  var delimiter = dirtyDelimiter || '';
  return sign + String(hours) + delimiter + (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? '-' : '+';
    return sign + (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(Math.abs(offset) / 60, 2);
  }

  return formatTimezone(offset, dirtyDelimiter);
}

function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(Math.floor(absOffset / 60), 2);
  var minutes = (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatters);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../addLeadingZeros/index.js */ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js");

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

var formatters = {
  // Year
  y: function (date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
    var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(token === 'yy' ? year % 100 : year, token.length);
  },
  // Month
  M: function (date, token) {
    var month = date.getUTCMonth();
    return token === 'M' ? String(month + 1) : (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(month + 1, 2);
  },
  // Day of the month
  d: function (date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function (date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';

    switch (token) {
      case 'a':
      case 'aa':
        return dayPeriodEnumValue.toUpperCase();

      case 'aaa':
        return dayPeriodEnumValue;

      case 'aaaaa':
        return dayPeriodEnumValue[0];

      case 'aaaa':
      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
    }
  },
  // Hour [1-12]
  h: function (date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function (date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(date.getUTCHours(), token.length);
  },
  // Minute
  m: function (date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function (date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function (date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(fractionalSeconds, token.length);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatters);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/longFormatters/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/longFormatters/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function dateLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'P':
      return formatLong.date({
        width: 'short'
      });

    case 'PP':
      return formatLong.date({
        width: 'medium'
      });

    case 'PPP':
      return formatLong.date({
        width: 'long'
      });

    case 'PPPP':
    default:
      return formatLong.date({
        width: 'full'
      });
  }
}

function timeLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'p':
      return formatLong.time({
        width: 'short'
      });

    case 'pp':
      return formatLong.time({
        width: 'medium'
      });

    case 'ppp':
      return formatLong.time({
        width: 'long'
      });

    case 'pppp':
    default:
      return formatLong.time({
        width: 'full'
      });
  }
}

function dateTimeLongFormatter(pattern, formatLong) {
  var matchResult = pattern.match(/(P+)(p+)?/);
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  var dateTimeFormat;

  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({
        width: 'short'
      });
      break;

    case 'PP':
      dateTimeFormat = formatLong.dateTime({
        width: 'medium'
      });
      break;

    case 'PPP':
      dateTimeFormat = formatLong.dateTime({
        width: 'long'
      });
      break;

    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({
        width: 'full'
      });
      break;
  }

  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
}

var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (longFormatters);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
var MILLISECONDS_IN_MINUTE = 60000;

function getDateMillisecondsPart(date) {
  return date.getTime() % MILLISECONDS_IN_MINUTE;
}
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */


function getTimezoneOffsetInMilliseconds(dirtyDate) {
  var date = new Date(dirtyDate.getTime());
  var baseTimezoneOffset = Math.ceil(date.getTimezoneOffset());
  date.setSeconds(0, 0);
  var hasNegativeUTCOffset = baseTimezoneOffset > 0;
  var millisecondsPartOfTimezoneOffset = hasNegativeUTCOffset ? (MILLISECONDS_IN_MINUTE + getDateMillisecondsPart(date)) % MILLISECONDS_IN_MINUTE : getDateMillisecondsPart(date);
  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCDayOfYear)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


var MILLISECONDS_IN_DAY = 86400000; // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCDayOfYear(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCISOWeekYear)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


 // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCISOWeekYear(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCISOWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");
/* harmony import */ var _startOfUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCISOWeek(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);
  var diff = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(date).getTime() - (0,_startOfUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(date).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCWeekYear)
/* harmony export */ });
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



 // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCWeekYear(dirtyDate, dirtyOptions) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate, dirtyOptions);
  var year = date.getUTCFullYear();
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(firstWeekOfNextYear, dirtyOptions);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(firstWeekOfThisYear, dirtyOptions);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCWeek/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCWeek/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _startOfUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCWeek(dirtyDate, options) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);
  var diff = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(date, options).getTime() - (0,_startOfUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(date, options).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/protectedTokens/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/protectedTokens/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isProtectedDayOfYearToken": () => (/* binding */ isProtectedDayOfYearToken),
/* harmony export */   "isProtectedWeekYearToken": () => (/* binding */ isProtectedWeekYearToken),
/* harmony export */   "throwProtectedError": () => (/* binding */ throwProtectedError)
/* harmony export */ });
var protectedDayOfYearTokens = ['D', 'DD'];
var protectedWeekYearTokens = ['YY', 'YYYY'];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format, input) {
  if (token === 'YYYY') {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'YY') {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'D') {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'DD') {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCISOWeekYear)
/* harmony export */ });
/* harmony import */ var _getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../getUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


 // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function startOfUTCISOWeekYear(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var year = (0,_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(fourthOfJanuary);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCISOWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

 // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function startOfUTCISOWeek(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var weekStartsOn = 1;
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCWeekYear)
/* harmony export */ });
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../getUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



 // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(options.firstWeekContainsDate);
  var year = (0,_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dirtyDate, dirtyOptions);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(firstWeek, dirtyOptions);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCWeek)
/* harmony export */ });
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


 // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function startOfUTCWeek(dirtyDate, dirtyOptions) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/addMilliseconds/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/addMilliseconds/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addMilliseconds)
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */

function addMilliseconds(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);
  var timestamp = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate).getTime();
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dirtyAmount);
  return new Date(timestamp + amount);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/differenceInMilliseconds/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/differenceInMilliseconds/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ differenceInMilliseconds)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * var result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */

function differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateRight);
  return dateLeft.getTime() - dateRight.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/differenceInSeconds/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/differenceInSeconds/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ differenceInSeconds)
/* harmony export */ });
/* harmony import */ var _differenceInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../differenceInMilliseconds/index.js */ "./node_modules/date-fns/esm/differenceInMilliseconds/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name differenceInSeconds
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of seconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * var result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */

function differenceInSeconds(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);
  var diff = (0,_differenceInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateLeft, dirtyDateRight) / 1000;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/format/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/format/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
/* harmony import */ var _isValid_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../isValid/index.js */ "./node_modules/date-fns/esm/isValid/index.js");
/* harmony import */ var _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locale/en-US/index.js */ "./node_modules/date-fns/esm/locale/en-US/index.js");
/* harmony import */ var _subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../subMilliseconds/index.js */ "./node_modules/date-fns/esm/subMilliseconds/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_format_formatters_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_lib/format/formatters/index.js */ "./node_modules/date-fns/esm/_lib/format/formatters/index.js");
/* harmony import */ var _lib_format_longFormatters_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_lib/format/longFormatters/index.js */ "./node_modules/date-fns/esm/_lib/format/longFormatters/index.js");
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_lib/protectedTokens/index.js */ "./node_modules/date-fns/esm/_lib/protectedTokens/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");









 // This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps

var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://git.io/fxCyr
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 0001, ..., 999               |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
 *
 * 9. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The second argument is now required for the sake of explicitness.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   format(new Date(2016, 0, 1))
 *
 *   // v2.0.0 onward
 *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
 *   ```
 *
 * - New format string API for `format` function
 *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
 *
 * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
 *
 * @param {Date|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://git.io/fxCyr
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://git.io/fxCyr
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */

function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var options = dirtyOptions || {};
  var locale = options.locale || _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_1__.default;
  var localeFirstWeekContainsDate = locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  if (!locale.localize) {
    throw new RangeError('locale must contain localize property');
  }

  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }

  var originalDate = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(dirtyDate);

  if (!(0,_isValid_index_js__WEBPACK_IMPORTED_MODULE_4__.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376


  var timezoneOffset = (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_5__.default)(originalDate);
  var utcDate = (0,_subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_6__.default)(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
    var firstCharacter = substring[0];

    if (firstCharacter === 'p' || firstCharacter === 'P') {
      var longFormatter = _lib_format_longFormatters_index_js__WEBPACK_IMPORTED_MODULE_7__.default[firstCharacter];
      return longFormatter(substring, locale.formatLong, formatterOptions);
    }

    return substring;
  }).join('').match(formattingTokensRegExp).map(function (substring) {
    // Replace two single quote characters with one single quote character
    if (substring === "''") {
      return "'";
    }

    var firstCharacter = substring[0];

    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }

    var formatter = _lib_format_formatters_index_js__WEBPACK_IMPORTED_MODULE_8__.default[firstCharacter];

    if (formatter) {
      if (!options.useAdditionalWeekYearTokens && (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_9__.isProtectedWeekYearToken)(substring)) {
        (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_9__.throwProtectedError)(substring, dirtyFormatStr, dirtyDate);
      }

      if (!options.useAdditionalDayOfYearTokens && (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_9__.isProtectedDayOfYearToken)(substring)) {
        (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_9__.throwProtectedError)(substring, dirtyFormatStr, dirtyDate);
      }

      return formatter(utcDate, substring, locale.localize, formatterOptions);
    }

    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
    }

    return substring;
  }).join('');
  return result;
}

function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameDay/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameDay/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 */

function isSameDay(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);
  var dateLeftStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateLeft);
  var dateRightStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isValid/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isValid/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isValid)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Now `isValid` doesn't throw an exception
 *   if the first argument is not an instance of Date.
 *   Instead, argument is converted beforehand using `toDate`.
 *
 *   Examples:
 *
 *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
 *   |---------------------------|---------------|---------------|
 *   | `new Date()`              | `true`        | `true`        |
 *   | `new Date('2016-01-01')`  | `true`        | `true`        |
 *   | `new Date('')`            | `false`       | `false`       |
 *   | `new Date(1488370835081)` | `true`        | `true`        |
 *   | `new Date(NaN)`           | `false`       | `false`       |
 *   | `'2016-01-01'`            | `TypeError`   | `false`       |
 *   | `''`                      | `TypeError`   | `false`       |
 *   | `1488370835081`           | `TypeError`   | `true`        |
 *   | `NaN`                     | `TypeError`   | `false`       |
 *
 *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
 *   that try to coerce arguments to the expected type
 *   (which is also the case with other *date-fns* functions).
 *
 * @param {*} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * var result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */

function isValid(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);
  return !isNaN(date);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFormatLongFn)
/* harmony export */ });
function buildFormatLongFn(args) {
  return function (dirtyOptions) {
    var options = dirtyOptions || {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildLocalizeFn)
/* harmony export */ });
function buildLocalizeFn(args) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var context = options.context ? String(options.context) : 'standalone';
    var valuesArray;

    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;

      var _width = options.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }

    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchFn)
/* harmony export */ });
function buildMatchFn(args) {
  return function (dirtyString, dirtyOptions) {
    var string = String(dirtyString);
    var options = dirtyOptions || {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var value;

    if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
      value = findIndex(parsePatterns, function (pattern) {
        return pattern.test(matchedString);
      });
    } else {
      value = findKey(parsePatterns, function (pattern) {
        return pattern.test(matchedString);
      });
    }

    value = args.valueCallback ? args.valueCallback(value) : value;
    value = options.valueCallback ? options.valueCallback(value) : value;
    return {
      value: value,
      rest: string.slice(matchedString.length)
    };
  };
}

function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
}

function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchPatternFn)
/* harmony export */ });
function buildMatchPatternFn(args) {
  return function (dirtyString, dirtyOptions) {
    var string = String(dirtyString);
    var options = dirtyOptions || {};
    var matchResult = string.match(args.matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);

    if (!parseResult) {
      return null;
    }

    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    return {
      value: value,
      rest: string.slice(matchedString.length)
    };
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatDistance)
/* harmony export */ });
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};
function formatDistance(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    result = formatDistanceLocale[token].one;
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildFormatLongFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js");

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatLong);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatRelative)
/* harmony export */ });
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildLocalizeFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js");

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'] // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.

};
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};

function ordinalNumber(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';

      case 2:
        return number + 'nd';

      case 3:
        return number + 'rd';
    }
  }

  return number + 'th';
}

var localize = {
  ordinalNumber: ordinalNumber,
  era: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localize);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildMatchPatternFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js");
/* harmony import */ var _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/buildMatchFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js");


var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__.default)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__.default)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__.default)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__.default)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__.default)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (match);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/formatDistance/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js");
/* harmony import */ var _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/formatLong/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js");
/* harmony import */ var _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/formatRelative/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js");
/* harmony import */ var _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_lib/localize/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js");
/* harmony import */ var _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_lib/match/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js");





/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */

var locale = {
  code: 'en-US',
  formatDistance: _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__.default,
  formatLong: _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__.default,
  formatRelative: _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__.default,
  localize: _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__.default,
  match: _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__.default,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (locale);

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfDay/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfDay/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */

function startOfDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/subMilliseconds/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/subMilliseconds/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ subMilliseconds)
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../addMilliseconds/index.js */ "./node_modules/date-fns/esm/addMilliseconds/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name subMilliseconds
 * @category Millisecond Helpers
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:29.250
 */

function subMilliseconds(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyAmount);
  return (0,_addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dirtyDate, -amount);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/preact-render-to-string/dist/index.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/preact-render-to-string/dist/index.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "render": () => (/* binding */ h),
/* harmony export */   "renderToStaticMarkup": () => (/* binding */ h),
/* harmony export */   "renderToString": () => (/* binding */ h),
/* harmony export */   "shallowRender": () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
var n=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function a(e){"string"!=typeof e&&(e=String(e));for(var t="",r=0;r<e.length;r++){var n=e[r];switch(n){case"<":t+="&lt;";break;case">":t+="&gt;";break;case'"':t+="&quot;";break;case"&":t+="&amp;";break;default:t+=n}}return t}var o=function(e,t){return String(e).replace(/(\n+)/g,"$1"+(t||"\t"))},i=function(e,t,r){return String(e).length>(t||40)||!r&&-1!==String(e).indexOf("\n")||-1!==String(e).indexOf("<")},l={};function s(e){var t="";for(var r in e){var a=e[r];null!=a&&(t&&(t+=" "),t+="-"==r[0]?r:l[r]||(l[r]=r.replace(/([A-Z])/g,"-$1").toLowerCase()),t+=": ",t+=a,"number"==typeof a&&!1===n.test(r)&&(t+="px"),t+=";")}return t||void 0}function f(e,t){for(var r in t)e[r]=t[r];return e}function c(e,t){return Array.isArray(t)?t.reduce(c,e):null!=t&&!1!==t&&e.push(t),e}var u={shallow:!0},p=[],_=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/,v=function(){};h.render=h;var d=function(e,t){return h(e,t,u)},g=[];function h(n,l,u){var d=function n(l,u,d,g,h,m){if(null==l||"boolean"==typeof l)return"";Array.isArray(l)&&(l=(0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,l));var x=l.type,y=l.props,b=!1;u=u||{};d=d||{};var S=d.pretty,k=S&&"string"==typeof S?S:"\t";if("object"!=typeof l&&!x)return a(l);if("function"==typeof x){if(b=!0,!d.shallow||!g&&!1!==d.renderRootComponent){if(x===preact__WEBPACK_IMPORTED_MODULE_0__.Fragment){var w="",O=[];c(O,l.props.children);for(var C=0;C<O.length;C++)w+=(C>0&&S?"\n":"")+n(O[C],u,d,!1!==d.shallowHighOrder,h,m);return w}var A,H=l.__c={__v:l,context:u,props:l.props,setState:v,forceUpdate:v,__h:[]};if(preact__WEBPACK_IMPORTED_MODULE_0__.options.__b&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__b(l),preact__WEBPACK_IMPORTED_MODULE_0__.options.__r&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__r(l),x.prototype&&"function"==typeof x.prototype.render){var j=x.contextType,F=j&&u[j.__c],M=null!=j?F?F.props.value:j.__:u;(H=l.__c=new x(y,M)).__v=l,H._dirty=H.__d=!0,H.props=y,null==H.state&&(H.state={}),null==H._nextState&&null==H.__s&&(H._nextState=H.__s=H.state),H.context=M,x.getDerivedStateFromProps?H.state=f(f({},H.state),x.getDerivedStateFromProps(H.props,H.state)):H.componentWillMount&&(H.componentWillMount(),H.state=H._nextState!==H.state?H._nextState:H.__s!==H.state?H.__s:H.state),A=H.render(H.props,H.state,H.context)}else{var T=x.contextType,$=T&&u[T.__c],L=null!=T?$?$.props.value:T.__:u;A=x.call(l.__c,y,L)}return H.getChildContext&&(u=f(f({},u),H.getChildContext())),preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed&&preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed(l),n(A,u,d,!1!==d.shallowHighOrder,h,m)}x=(E=x).displayName||E!==Function&&E.name||function(e){var t=(Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/)||"")[1];if(!t){for(var r=-1,n=p.length;n--;)if(p[n]===e){r=n;break}r<0&&(r=p.push(e)-1),t="UnnamedComponent"+r}return t}(E)}var E;var D,N,P="";if(y){var R=Object.keys(y);d&&!0===d.sortAttributes&&R.sort();for(var U=0;U<R.length;U++){var W=R[U],q=y[W];if("children"!==W){if(!W.match(/[\s\n\\/='"\0<>]/)&&(d&&d.allAttributes||"key"!==W&&"ref"!==W&&"__self"!==W&&"__source"!==W&&"defaultValue"!==W)){if("className"===W){if(y.class)continue;W="class"}else h&&W.match(/^xlink:?./)&&(W=W.toLowerCase().replace(/^xlink:?/,"xlink:"));if("htmlFor"===W){if(y.for)continue;W="for"}"style"===W&&q&&"object"==typeof q&&(q=s(q)),"a"===W[0]&&"r"===W[1]&&"boolean"==typeof q&&(q=String(q));var z=d.attributeHook&&d.attributeHook(W,q,u,d,b);if(z||""===z)P+=z;else if("dangerouslySetInnerHTML"===W)N=q&&q.__html;else if("textarea"===x&&"value"===W)D=q;else if((q||0===q||""===q)&&"function"!=typeof q){if(!(!0!==q&&""!==q||(q=W,d&&d.xml))){P+=" "+W;continue}if("value"===W){if("select"===x){m=q;continue}"option"===x&&m==q&&(P+=" selected")}P+=" "+W+'="'+a(q)+'"'}}}else D=q}}if(S){var I=P.replace(/^\n\s*/," ");I===P||~I.indexOf("\n")?S&&~P.indexOf("\n")&&(P+="\n"):P=I}P="<"+x+P+">";if(String(x).match(/[\s\n\\/='"\0<>]/))throw new Error(x+" is not a valid HTML tag name in "+P);var V=String(x).match(_)||d.voidElements&&String(x).match(d.voidElements);var Z=[];var B;if(N)S&&i(N)&&(N="\n"+k+o(N,k)),P+=N;else if(null!=D&&c(B=[],D).length){for(var G=S&&~P.indexOf("\n"),J=!1,K=0;K<B.length;K++){var Q=B[K];if(null!=Q&&!1!==Q){var X="svg"===x||"foreignObject"!==x&&h,Y=n(Q,u,d,!0,X,m);if(S&&!G&&i(Y)&&(G=!0),Y)if(S){var ee=Y.length>0&&"<"!=Y[0];J&&ee?Z[Z.length-1]+=Y:Z.push(Y),J=ee}else Z.push(Y)}}if(S&&G)for(var te=Z.length;te--;)Z[te]="\n"+k+o(Z[te],k)}if(Z.length||N)P+=Z.join("");else if(d&&d.xml)return P.substring(0,P.length-1)+" />";!V||B||N?(S&&~P.indexOf("\n")&&(P+="\n"),P+="</"+x+">"):P=P.replace(/>$/," />");return P}(n,l,u);return preact__WEBPACK_IMPORTED_MODULE_0__.options.__c&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__c(n,g),d}h.shallowRender=d;/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (h);
//# sourceMappingURL=index.module.js.map


/***/ }),

/***/ "./node_modules/preact/compat/dist/compat.mjs":
/*!****************************************************!*\
  !*** ./node_modules/preact/compat/dist/compat.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useCallback": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback),
/* harmony export */   "useContext": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useContext),
/* harmony export */   "useDebugValue": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useDebugValue),
/* harmony export */   "useEffect": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useEffect),
/* harmony export */   "useErrorBoundary": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useErrorBoundary),
/* harmony export */   "useImperativeHandle": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle),
/* harmony export */   "useLayoutEffect": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect),
/* harmony export */   "useMemo": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useMemo),
/* harmony export */   "useReducer": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useReducer),
/* harmony export */   "useRef": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useRef),
/* harmony export */   "useState": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState),
/* harmony export */   "createElement": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.createElement),
/* harmony export */   "createContext": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.createContext),
/* harmony export */   "createRef": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.createRef),
/* harmony export */   "Fragment": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.Fragment),
/* harmony export */   "Component": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.Component),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "version": () => (/* binding */ on),
/* harmony export */   "Children": () => (/* binding */ k),
/* harmony export */   "render": () => (/* binding */ V),
/* harmony export */   "hydrate": () => (/* binding */ z),
/* harmony export */   "unmountComponentAtNode": () => (/* binding */ an),
/* harmony export */   "createPortal": () => (/* binding */ j),
/* harmony export */   "createFactory": () => (/* binding */ ln),
/* harmony export */   "cloneElement": () => (/* binding */ cn),
/* harmony export */   "isValidElement": () => (/* binding */ fn),
/* harmony export */   "findDOMNode": () => (/* binding */ sn),
/* harmony export */   "PureComponent": () => (/* binding */ E),
/* harmony export */   "memo": () => (/* binding */ g),
/* harmony export */   "forwardRef": () => (/* binding */ x),
/* harmony export */   "unstable_batchedUpdates": () => (/* binding */ hn),
/* harmony export */   "StrictMode": () => (/* binding */ pn),
/* harmony export */   "Suspense": () => (/* binding */ O),
/* harmony export */   "SuspenseList": () => (/* binding */ D),
/* harmony export */   "lazy": () => (/* binding */ U),
/* harmony export */   "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED": () => (/* binding */ K),
/* harmony export */   "unstable_ImmediatePriority": () => (/* binding */ Q),
/* harmony export */   "unstable_UserBlockingPriority": () => (/* binding */ X),
/* harmony export */   "unstable_NormalPriority": () => (/* binding */ nn),
/* harmony export */   "unstable_LowPriority": () => (/* binding */ tn),
/* harmony export */   "unstable_IdlePriority": () => (/* binding */ en),
/* harmony export */   "unstable_runWithPriority": () => (/* binding */ rn),
/* harmony export */   "unstable_now": () => (/* binding */ un)
/* harmony export */ });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.mjs");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
function C(n,t){for(var e in t)n[e]=t[e];return n}function S(n,t){for(var e in n)if("__source"!==e&&!(e in t))return!0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return!0;return!1}function E(n){this.props=n}function g(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return!r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:S(this.props,n)}function r(t){return this.shouldComponentUpdate=e,(0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(E.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__.Component).isPureReactComponent=!0,E.prototype.shouldComponentUpdate=function(n,t){return S(this.props,n)||S(this.state,t)};var w=preact__WEBPACK_IMPORTED_MODULE_1__.options.__b;preact__WEBPACK_IMPORTED_MODULE_1__.options.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),w&&w(n)};var R="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function x(n){function t(t,e){var r=C({},t);return delete r.ref,n(r,(e=t.ref||e)&&("object"!=typeof e||"current"in e)?e:null)}return t.$$typeof=R,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var N=function(n,t){return null==n?null:(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)((0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n).map(t))},k={map:N,forEach:N,count:function(n){return n?(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n).length:0},only:function(n){var t=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n);if(1!==t.length)throw"Children.only";return t[0]},toArray:preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray},A=preact__WEBPACK_IMPORTED_MODULE_1__.options.__e;function O(){this.__u=0,this.t=null,this.__b=null}function L(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function U(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n},function(n){r=n}),r)throw r;if(!e)throw t;return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(e,u)}return u.displayName="Lazy",u.__f=!0,u}function D(){this.u=null,this.o=null}preact__WEBPACK_IMPORTED_MODULE_1__.options.__e=function(n,t,e){if(n.then)for(var r,u=t;u=u.__;)if((r=u.__c)&&r.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),r.__c(n,t);A(n,t,e)},(O.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__.Component).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=L(r.__v),o=!1,i=function(){o||(o=!0,e.componentWillUnmount=e.__c,u?u(l):l())};e.__c=e.componentWillUnmount,e.componentWillUnmount=function(){i(),e.__c&&e.__c()};var l=function(){if(!--r.__u){if(r.state.__e){var n=r.state.__e;r.__v.__k[0]=function n(t,e,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(n,n.__c.__P,n.__c.__O)}var t;for(r.setState({__e:r.__b=null});t=r.t.pop();)t.forceUpdate()}},f=!0===t.__h;r.__u++||f||r.setState({__e:r.__b=r.__v.__k[0]}),n.then(i,i)},O.prototype.componentWillUnmount=function(){this.t=[]},O.prototype.render=function(n,t){if(this.__b){if(this.__v.__k){var e=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function n(t,e,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c()}),t.__c.__H=null),null!=(t=C({},t)).__c&&(t.__c.__P===r&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)})),t}(this.__b,e,r.__O=r.__P)}this.__b=null}var u=t.__e&&(0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,null,n.fallback);return u&&(u.__h=null),[(0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,null,t.__e?null:n.children),u]};var F=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2]}};function M(n){return this.getChildContext=function(){return n.context},n.children}function T(n){var t=this,e=n.i;t.componentWillUnmount=function(){(0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(null,t.l),t.l=null,t.i=null},t.i&&t.i!==e&&t.componentWillUnmount(),n.__v?(t.l||(t.i=e,t.l={nodeType:1,parentNode:e,childNodes:[],appendChild:function(n){this.childNodes.push(n),t.i.appendChild(n)},insertBefore:function(n,e){this.childNodes.push(n),t.i.appendChild(n)},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),t.i.removeChild(n)}}),(0,preact__WEBPACK_IMPORTED_MODULE_1__.render)((0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(M,{context:t.context},n.__v),t.l)):t.l&&t.componentWillUnmount()}function j(n,t){return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(T,{__v:n,i:t})}(D.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__.Component).__e=function(n){var t=this,e=L(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),F(t,n,r)):u()};e?e(o):o()}},D.prototype.render=function(n){this.u=null,this.o=new Map;var t=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},D.prototype.componentDidUpdate=D.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){F(n,e,t)})};var I="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,W=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,P=function(n){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function V(n,t,e){return null==t.__k&&(t.textContent=""),(0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(n,t),"function"==typeof e&&e(),n?n.__c:null}function z(n,t,e){return (0,preact__WEBPACK_IMPORTED_MODULE_1__.hydrate)(n,t),"function"==typeof e&&e(),n?n.__c:null}preact__WEBPACK_IMPORTED_MODULE_1__.Component.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(preact__WEBPACK_IMPORTED_MODULE_1__.Component.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t})}})});var B=preact__WEBPACK_IMPORTED_MODULE_1__.options.event;function H(){}function Z(){return this.cancelBubble}function Y(){return this.defaultPrevented}preact__WEBPACK_IMPORTED_MODULE_1__.options.event=function(n){return B&&(n=B(n)),n.persist=H,n.isPropagationStopped=Z,n.isDefaultPrevented=Y,n.nativeEvent=n};var $,q={configurable:!0,get:function(){return this.class}},G=preact__WEBPACK_IMPORTED_MODULE_1__.options.vnode;preact__WEBPACK_IMPORTED_MODULE_1__.options.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){for(var u in r={},e){var o=e[u];"value"===u&&"defaultValue"in e&&null==o||("defaultValue"===u&&"value"in e&&null==e.value?u="value":"download"===u&&!0===o?o="":/ondoubleclick/i.test(u)?u="ondblclick":/^onchange(textarea|input)/i.test(u+t)&&!P(e.type)?u="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(u)?u=u.toLowerCase():W.test(u)?u=u.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===o&&(o=void 0),r[u]=o)}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value)})),"select"==t&&null!=r.defaultValue&&(r.value=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(e.children).forEach(function(n){n.props.selected=r.multiple?-1!=r.defaultValue.indexOf(n.props.value):r.defaultValue==n.props.value})),n.props=r}t&&e.class!=e.className&&(q.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",q)),n.$$typeof=I,G&&G(n)};var J=preact__WEBPACK_IMPORTED_MODULE_1__.options.__r;preact__WEBPACK_IMPORTED_MODULE_1__.options.__r=function(n){J&&J(n),$=n.__c};var K={ReactCurrentDispatcher:{current:{readContext:function(n){return $.__n[n.__c].props.value}}}},Q=1,X=2,nn=3,tn=4,en=5;function rn(n,t){return t()}var un="object"==typeof performance&&"function"==typeof performance.now?performance.now.bind(performance):function(){return Date.now()},on="16.8.0";function ln(n){return preact__WEBPACK_IMPORTED_MODULE_1__.createElement.bind(null,n)}function fn(n){return!!n&&n.$$typeof===I}function cn(n){return fn(n)?preact__WEBPACK_IMPORTED_MODULE_1__.cloneElement.apply(null,arguments):n}function an(n){return!!n.__k&&((0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(null,n),!0)}function sn(n){return n&&(n.base||1===n.nodeType&&n)||null}var hn=function(n,t){return n(t)},pn=preact__WEBPACK_IMPORTED_MODULE_1__.Fragment;/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({useState:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState,useReducer:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useReducer,useEffect:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useEffect,useLayoutEffect:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect,useRef:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useRef,useImperativeHandle:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle,useMemo:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useMemo,useCallback:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback,useContext:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useContext,useDebugValue:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useDebugValue,version:"16.8.0",Children:k,render:V,hydrate:z,unmountComponentAtNode:an,createPortal:j,createElement:preact__WEBPACK_IMPORTED_MODULE_1__.createElement,createContext:preact__WEBPACK_IMPORTED_MODULE_1__.createContext,createFactory:ln,cloneElement:cn,createRef:preact__WEBPACK_IMPORTED_MODULE_1__.createRef,Fragment:preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,isValidElement:fn,findDOMNode:sn,Component:preact__WEBPACK_IMPORTED_MODULE_1__.Component,PureComponent:E,memo:g,forwardRef:x,unstable_batchedUpdates:hn,StrictMode:preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,Suspense:O,SuspenseList:D,lazy:U,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:K});
//# sourceMappingURL=compat.module.js.map


/***/ }),

/***/ "./node_modules/preact/compat/jsx-runtime.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/compat/jsx-runtime.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! preact/jsx-runtime */ "./node_modules/preact/jsx-runtime/dist/jsxRuntime.js");


/***/ }),

/***/ "./node_modules/preact/dist/preact.js":
/*!********************************************!*\
  !*** ./node_modules/preact/dist/preact.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

var n,l,u,t,i,r,o={},f=[],e=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(n,l){for(var u in l)n[u]=l[u];return n}function s(n){var l=n.parentNode;l&&l.removeChild(n)}function a(n,l,u){var t,i,r,o=arguments,f={};for(r in l)"key"==r?t=l[r]:"ref"==r?i=l[r]:f[r]=l[r];if(arguments.length>3)for(u=[u],r=3;r<arguments.length;r++)u.push(o[r]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(r in n.defaultProps)void 0===f[r]&&(f[r]=n.defaultProps[r]);return v(n,f,t,i,null)}function v(l,u,t,i,r){var o={type:l,props:u,key:t,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++n.__v:r};return null!=n.vnode&&n.vnode(o),o}function h(n){return n.children}function p(n,l){this.props=n,this.context=l}function y(n,l){if(null==l)return n.__?y(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?y(n):null}function d(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return d(n)}}function _(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!k.__r++||i!==n.debounceRendering)&&((i=n.debounceRendering)||t)(k)}function k(){for(var n;k.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,t,i,r,o;n.__d&&(r=(i=(l=n).__v).__e,(o=l.__P)&&(u=[],(t=c({},i)).__v=i.__v+1,$(o,i,t,l.__n,void 0!==o.ownerSVGElement,null!=i.__h?[r]:null,u,null==r?y(i):r,i.__h),H(u,i),i.__e!=r&&d(i)))})}function x(n,l,u,t,i,r,e,c,s,a){var p,d,_,k,x,g,w,A=t&&t.__k||f,P=A.length;for(u.__k=[],p=0;p<l.length;p++)if(null!=(k=u.__k[p]=null==(k=l[p])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(h,{children:k},null,null,null):k.__b>0?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(_=A[p])||_&&k.key==_.key&&k.type===_.type)A[p]=void 0;else for(d=0;d<P;d++){if((_=A[d])&&k.key==_.key&&k.type===_.type){A[d]=void 0;break}_=null}$(n,k,_=_||o,i,r,e,c,s,a),x=k.__e,(d=k.ref)&&_.ref!=d&&(w||(w=[]),_.ref&&w.push(_.ref,null,k),w.push(d,k.__c||x,k)),null!=x?(null==g&&(g=x),"function"==typeof k.type&&null!=k.__k&&k.__k===_.__k?k.__d=s=m(k,s,n):s=b(n,k,_,A,x,s),a||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&_.__e==s&&s.parentNode!=n&&(s=y(_))}for(u.__e=g,p=P;p--;)null!=A[p]&&("function"==typeof u.type&&null!=A[p].__e&&A[p].__e==u.__d&&(u.__d=y(t,p+1)),z(A[p],A[p]));if(w)for(p=0;p<w.length;p++)j(w[p],w[++p],w[++p])}function m(n,l,u){var t,i;for(t=0;t<n.__k.length;t++)(i=n.__k[t])&&(i.__=n,l="function"==typeof i.type?m(i,l,u):b(u,i,i,n.__k,i.__e,l));return l}function b(n,l,u,t,i,r){var o,f,e;if(void 0!==l.__d)o=l.__d,l.__d=void 0;else if(null==u||i!=r||null==i.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(i),o=null;else{for(f=r,e=0;(f=f.nextSibling)&&e<t.length;e+=2)if(f==i)break n;n.insertBefore(i,r),o=r}return void 0!==o?o:i.nextSibling}function g(n,l,u,t,i){var r;for(r in u)"children"===r||"key"===r||r in l||A(n,r,null,u[r],t);for(r in l)i&&"function"!=typeof l[r]||"children"===r||"key"===r||"value"===r||"checked"===r||u[r]===l[r]||A(n,r,l[r],u[r],t)}function w(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||e.test(l)?u:u+"px"}function A(n,l,u,t,i){var r;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||w(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||w(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])r=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?t||n.addEventListener(l,r?C:P,r):n.removeEventListener(l,r?C:P,r);else if("dangerouslySetInnerHTML"!==l){if(i)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l))}}function P(l){this.l[l.type+!1](n.event?n.event(l):l)}function C(l){this.l[l.type+!0](n.event?n.event(l):l)}function $(l,u,t,i,r,o,f,e,s){var a,v,y,d,_,k,m,b,g,w,A,P=u.type;if(void 0!==u.constructor)return null;null!=t.__h&&(s=t.__h,e=u.__e=t.__e,u.__h=null,o=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(b=u.props,g=(a=P.contextType)&&i[a.__c],w=a?g?g.props.value:a.__:i,t.__c?m=(v=u.__c=t.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(b,w):(u.__c=v=new p(b,w),v.constructor=P,v.render=I),g&&g.sub(v),v.props=b,v.state||(v.state={}),v.context=w,v.__n=i,y=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=c({},v.__s)),c(v.__s,P.getDerivedStateFromProps(b,v.__s))),d=v.props,_=v.state,y)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else{if(null==P.getDerivedStateFromProps&&b!==d&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(b,w),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(b,v.__s,w)||u.__v===t.__v){v.props=b,v.state=v.__s,u.__v!==t.__v&&(v.__d=!1),v.__v=u,u.__e=t.__e,u.__k=t.__k,v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(b,v.__s,w),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(d,_,k)})}v.context=w,v.props=b,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(i=c(c({},i),v.getChildContext())),y||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type===h&&null==a.key?a.props.children:a,x(l,Array.isArray(A)?A:[A],u,t,i,r,o,f,e,s),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),m&&(v.__E=v.__=null),v.__e=!1}else null==o&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=T(t.__e,u,t,i,r,o,f,s);(a=n.diffed)&&a(u)}catch(l){u.__v=null,(s||null!=o)&&(u.__e=e,u.__h=!!s,o[o.indexOf(e)]=null),n.__e(l,u,t)}}function H(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u)})}catch(l){n.__e(l,u.__v)}})}function T(n,l,u,t,i,r,e,c){var a,v,h,p,y=u.props,d=l.props,_=l.type,k=0;if("svg"===_&&(i=!0),null!=r)for(;k<r.length;k++)if((a=r[k])&&(a===n||(_?a.localName==_:3==a.nodeType))){n=a,r[k]=null;break}if(null==n){if(null===_)return document.createTextNode(d);n=i?document.createElementNS("http://www.w3.org/2000/svg",_):document.createElement(_,d.is&&d),r=null,c=!1}if(null===_)y===d||c&&n.data===d||(n.data=d);else{if(r=r&&f.slice.call(n.childNodes),v=(y=u.props||o).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=r)for(y={},p=0;p<n.attributes.length;p++)y[n.attributes[p].name]=n.attributes[p].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""))}if(g(n,d,y,i,c),h)l.__k=[];else if(k=l.props.children,x(n,Array.isArray(k)?k:[k],l,u,t,i&&"foreignObject"!==_,r,e,n.firstChild,c),null!=r)for(k=r.length;k--;)null!=r[k]&&s(r[k]);c||("value"in d&&void 0!==(k=d.value)&&(k!==n.value||"progress"===_&&!k)&&A(n,"value",k,y.value,!1),"checked"in d&&void 0!==(k=d.checked)&&k!==n.checked&&A(n,"checked",k,y.checked,!1))}return n}function j(l,u,t){try{"function"==typeof l?l(u):l.current=u}catch(l){n.__e(l,t)}}function z(l,u,t){var i,r,o;if(n.unmount&&n.unmount(l),(i=l.ref)&&(i.current&&i.current!==l.__e||j(i,null,u)),t||"function"==typeof l.type||(t=null!=(r=l.__e)),l.__e=l.__d=void 0,null!=(i=l.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(l){n.__e(l,u)}i.base=i.__P=null}if(i=l.__k)for(o=0;o<i.length;o++)i[o]&&z(i[o],u,t);null!=r&&s(r)}function I(n,l,u){return this.constructor(n,u)}function L(l,u,t){var i,r,e;n.__&&n.__(l,u),r=(i="function"==typeof t)?null:t&&t.__k||u.__k,e=[],$(u,l=(!i&&t||u).__k=a(h,null,[l]),r||o,o,void 0!==u.ownerSVGElement,!i&&t?[t]:r?null:u.firstChild?f.slice.call(u.childNodes):null,e,!i&&t?t:r?r.__e:u.firstChild,i),H(e,l)}n={__e:function(n,l){for(var u,t,i;l=l.__;)if((u=l.__c)&&!u.__)try{if((t=u.constructor)&&null!=t.getDerivedStateFromError&&(u.setState(t.getDerivedStateFromError(n)),i=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),i=u.__d),i)return u.__E=u}catch(l){n=l}throw n},__v:0},l=function(n){return null!=n&&void 0===n.constructor},p.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof n&&(n=n(c({},u),this.props)),n&&c(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),_(this))},p.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),_(this))},p.prototype.render=h,u=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,k.__r=0,r=0,exports.render=L,exports.hydrate=function n(l,u){L(l,u,n)},exports.createElement=a,exports.h=a,exports.Fragment=h,exports.createRef=function(){return{current:null}},exports.isValidElement=l,exports.Component=p,exports.cloneElement=function(n,l,u){var t,i,r,o=arguments,f=c({},n.props);for(r in l)"key"==r?t=l[r]:"ref"==r?i=l[r]:f[r]=l[r];if(arguments.length>3)for(u=[u],r=3;r<arguments.length;r++)u.push(o[r]);return null!=u&&(f.children=u),v(n.type,f,t||n.key,i||n.ref,null)},exports.createContext=function(n,l){var u={__c:l="__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,t;return this.getChildContext||(u=[],(t={})[l]=this,this.getChildContext=function(){return t},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(_)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u},exports.toChildArray=function n(l,u){return u=u||[],null==l||"boolean"==typeof l||(Array.isArray(l)?l.some(function(l){n(l,u)}):u.push(l)),u},exports.options=n;
//# sourceMappingURL=preact.js.map


/***/ }),

/***/ "./node_modules/preact/dist/preact.mjs":
/*!*********************************************!*\
  !*** ./node_modules/preact/dist/preact.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ N),
/* harmony export */   "hydrate": () => (/* binding */ O),
/* harmony export */   "createElement": () => (/* binding */ a),
/* harmony export */   "h": () => (/* binding */ a),
/* harmony export */   "Fragment": () => (/* binding */ y),
/* harmony export */   "createRef": () => (/* binding */ h),
/* harmony export */   "isValidElement": () => (/* binding */ l),
/* harmony export */   "Component": () => (/* binding */ p),
/* harmony export */   "cloneElement": () => (/* binding */ S),
/* harmony export */   "createContext": () => (/* binding */ q),
/* harmony export */   "toChildArray": () => (/* binding */ w),
/* harmony export */   "options": () => (/* binding */ n)
/* harmony export */ });
var n,l,u,i,t,r,o={},f=[],e=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(n,l){for(var u in l)n[u]=l[u];return n}function s(n){var l=n.parentNode;l&&l.removeChild(n)}function a(n,l,u){var i,t,r,o=arguments,f={};for(r in l)"key"==r?i=l[r]:"ref"==r?t=l[r]:f[r]=l[r];if(arguments.length>3)for(u=[u],r=3;r<arguments.length;r++)u.push(o[r]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(r in n.defaultProps)void 0===f[r]&&(f[r]=n.defaultProps[r]);return v(n,f,i,t,null)}function v(l,u,i,t,r){var o={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++n.__v:r};return null!=n.vnode&&n.vnode(o),o}function h(){return{current:null}}function y(n){return n.children}function p(n,l){this.props=n,this.context=l}function d(n,l){if(null==l)return n.__?d(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?d(n):null}function _(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return _(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!m.__r++||t!==n.debounceRendering)&&((t=n.debounceRendering)||i)(m)}function m(){for(var n;m.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,r,o;n.__d&&(r=(t=(l=n).__v).__e,(o=l.__P)&&(u=[],(i=c({},t)).__v=t.__v+1,T(o,t,i,l.__n,void 0!==o.ownerSVGElement,null!=t.__h?[r]:null,u,null==r?d(t):r,t.__h),j(u,t),t.__e!=r&&_(t)))})}function b(n,l,u,i,t,r,e,c,s,a){var h,p,_,k,m,b,w,A=i&&i.__k||f,P=A.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(y,{children:k},null,null,null):k.__b>0?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(_=A[h])||_&&k.key==_.key&&k.type===_.type)A[h]=void 0;else for(p=0;p<P;p++){if((_=A[p])&&k.key==_.key&&k.type===_.type){A[p]=void 0;break}_=null}T(n,k,_=_||o,t,r,e,c,s,a),m=k.__e,(p=k.ref)&&_.ref!=p&&(w||(w=[]),_.ref&&w.push(_.ref,null,k),w.push(p,k.__c||m,k)),null!=m?(null==b&&(b=m),"function"==typeof k.type&&null!=k.__k&&k.__k===_.__k?k.__d=s=g(k,s,n):s=x(n,k,_,A,m,s),a||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&_.__e==s&&s.parentNode!=n&&(s=d(_))}for(u.__e=b,h=P;h--;)null!=A[h]&&("function"==typeof u.type&&null!=A[h].__e&&A[h].__e==u.__d&&(u.__d=d(i,h+1)),L(A[h],A[h]));if(w)for(h=0;h<w.length;h++)I(w[h],w[++h],w[++h])}function g(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?g(t,l,u):x(u,t,t,n.__k,t.__e,l));return l}function w(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){w(n,l)}):l.push(n)),l}function x(n,l,u,i,t,r){var o,f,e;if(void 0!==l.__d)o=l.__d,l.__d=void 0;else if(null==u||t!=r||null==t.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(t),o=null;else{for(f=r,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,r),o=r}return void 0!==o?o:t.nextSibling}function A(n,l,u,i,t){var r;for(r in u)"children"===r||"key"===r||r in l||C(n,r,null,u[r],i);for(r in l)t&&"function"!=typeof l[r]||"children"===r||"key"===r||"value"===r||"checked"===r||u[r]===l[r]||C(n,r,l[r],u[r],i)}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||e.test(l)?u:u+"px"}function C(n,l,u,i,t){var r;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])r=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?i||n.addEventListener(l,r?H:$,r):n.removeEventListener(l,r?H:$,r);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l))}}function $(l){this.l[l.type+!1](n.event?n.event(l):l)}function H(l){this.l[l.type+!0](n.event?n.event(l):l)}function T(l,u,i,t,r,o,f,e,s){var a,v,h,d,_,k,m,g,w,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(s=i.__h,e=u.__e=i.__e,u.__h=null,o=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,w=(a=P.contextType)&&t[a.__c],x=a?w?w.props.value:a.__:t,i.__c?m=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new p(g,x),v.constructor=P,v.render=M),w&&w.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=c({},v.__s)),c(v.__s,P.getDerivedStateFromProps(g,v.__s))),d=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else{if(null==P.getDerivedStateFromProps&&g!==d&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(d,_,k)})}v.context=x,v.props=g,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=c(c({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type===y&&null==a.key?a.props.children:a,b(l,Array.isArray(A)?A:[A],u,i,t,r,o,f,e,s),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),m&&(v.__E=v.__=null),v.__e=!1}else null==o&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=z(i.__e,u,i,t,r,o,f,s);(a=n.diffed)&&a(u)}catch(l){u.__v=null,(s||null!=o)&&(u.__e=e,u.__h=!!s,o[o.indexOf(e)]=null),n.__e(l,u,i)}}function j(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u)})}catch(l){n.__e(l,u.__v)}})}function z(n,l,u,i,t,r,e,c){var a,v,h,y,p=u.props,d=l.props,_=l.type,k=0;if("svg"===_&&(t=!0),null!=r)for(;k<r.length;k++)if((a=r[k])&&(a===n||(_?a.localName==_:3==a.nodeType))){n=a,r[k]=null;break}if(null==n){if(null===_)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",_):document.createElement(_,d.is&&d),r=null,c=!1}if(null===_)p===d||c&&n.data===d||(n.data=d);else{if(r=r&&f.slice.call(n.childNodes),v=(p=u.props||o).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=r)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""))}if(A(n,d,p,t,c),h)l.__k=[];else if(k=l.props.children,b(n,Array.isArray(k)?k:[k],l,u,i,t&&"foreignObject"!==_,r,e,n.firstChild,c),null!=r)for(k=r.length;k--;)null!=r[k]&&s(r[k]);c||("value"in d&&void 0!==(k=d.value)&&(k!==n.value||"progress"===_&&!k)&&C(n,"value",k,p.value,!1),"checked"in d&&void 0!==(k=d.checked)&&k!==n.checked&&C(n,"checked",k,p.checked,!1))}return n}function I(l,u,i){try{"function"==typeof l?l(u):l.current=u}catch(l){n.__e(l,i)}}function L(l,u,i){var t,r,o;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||I(t,null,u)),i||"function"==typeof l.type||(i=null!=(r=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount()}catch(l){n.__e(l,u)}t.base=t.__P=null}if(t=l.__k)for(o=0;o<t.length;o++)t[o]&&L(t[o],u,i);null!=r&&s(r)}function M(n,l,u){return this.constructor(n,u)}function N(l,u,i){var t,r,e;n.__&&n.__(l,u),r=(t="function"==typeof i)?null:i&&i.__k||u.__k,e=[],T(u,l=(!t&&i||u).__k=a(y,null,[l]),r||o,o,void 0!==u.ownerSVGElement,!t&&i?[i]:r?null:u.firstChild?f.slice.call(u.childNodes):null,e,!t&&i?i:r?r.__e:u.firstChild,t),j(e,l)}function O(n,l){N(n,l,O)}function S(n,l,u){var i,t,r,o=arguments,f=c({},n.props);for(r in l)"key"==r?i=l[r]:"ref"==r?t=l[r]:f[r]=l[r];if(arguments.length>3)for(u=[u],r=3;r<arguments.length;r++)u.push(o[r]);return null!=u&&(f.children=u),v(n.type,f,i||n.key,t||n.ref,null)}function q(n,l){var u={__c:l="__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l}throw n},__v:0},l=function(n){return null!=n&&void 0===n.constructor},p.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof n&&(n=n(c({},u),this.props)),n&&c(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this))},p.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this))},p.prototype.render=y,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,m.__r=0,r=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ "./node_modules/preact/hooks/dist/hooks.mjs":
/*!**************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useState": () => (/* binding */ l),
/* harmony export */   "useReducer": () => (/* binding */ p),
/* harmony export */   "useEffect": () => (/* binding */ y),
/* harmony export */   "useLayoutEffect": () => (/* binding */ h),
/* harmony export */   "useRef": () => (/* binding */ s),
/* harmony export */   "useImperativeHandle": () => (/* binding */ _),
/* harmony export */   "useMemo": () => (/* binding */ d),
/* harmony export */   "useCallback": () => (/* binding */ A),
/* harmony export */   "useContext": () => (/* binding */ F),
/* harmony export */   "useDebugValue": () => (/* binding */ T),
/* harmony export */   "useErrorBoundary": () => (/* binding */ q)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
var t,u,r,o=0,i=[],c=preact__WEBPACK_IMPORTED_MODULE_0__.options.__b,f=preact__WEBPACK_IMPORTED_MODULE_0__.options.__r,e=preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed,a=preact__WEBPACK_IMPORTED_MODULE_0__.options.__c,v=preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;function m(t,r){preact__WEBPACK_IMPORTED_MODULE_0__.options.__h&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function l(n){return o=1,p(w,n)}function p(n,r,o){var i=m(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):w(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}))}],i.__c=u),i.__}function y(r,o){var i=m(t++,3);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&k(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i))}function h(r,o){var i=m(t++,4);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&k(i.__H,o)&&(i.__=r,i.__H=o,u.__h.push(i))}function s(n){return o=5,d(function(){return{current:n}},[])}function _(n,t,u){o=6,h(function(){"function"==typeof n?n(t()):n&&(n.current=t())},null==u?u:u.concat(n))}function d(n,u){var r=m(t++,7);return k(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A(n,t){return o=8,d(function(){return n},t)}function F(n){var r=u.context[n.__c],o=m(t++,9);return o.__c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function T(t,u){preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue&&preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue(u?u(t):t)}function q(n){var r=m(t++,10),o=l();return r.__=n,u.componentDidCatch||(u.componentDidCatch=function(n){r.__&&r.__(n),o[1](n)}),[o[0],function(){o[1](void 0)}]}function x(){i.forEach(function(t){if(t.__P)try{t.__H.__h.forEach(g),t.__H.__h.forEach(j),t.__H.__h=[]}catch(u){t.__H.__h=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u,t.__v)}}),i=[]}preact__WEBPACK_IMPORTED_MODULE_0__.options.__b=function(n){u=null,c&&c(n)},preact__WEBPACK_IMPORTED_MODULE_0__.options.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g),r.__h.forEach(j),r.__h=[])},preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed=function(t){e&&e(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i.push(o)&&r===preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame||((r=preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n)},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u))})(x)),u=void 0},preact__WEBPACK_IMPORTED_MODULE_0__.options.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g),t.__h=t.__h.filter(function(n){return!n.__||j(n)})}catch(r){u.some(function(n){n.__h&&(n.__h=[])}),u=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r,t.__v)}}),a&&a(t,u)},preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount=function(t){v&&v(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(g)}catch(t){preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(t,u.__v)}};var b="function"==typeof requestAnimationFrame;function g(n){var t=u;"function"==typeof n.__c&&n.__c(),u=t}function j(n){var t=u;n.__c=n.__(),u=t}function k(n,t){return!n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function w(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map


/***/ }),

/***/ "./node_modules/preact/jsx-runtime/dist/jsxRuntime.js":
/*!************************************************************!*\
  !*** ./node_modules/preact/jsx-runtime/dist/jsxRuntime.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var r=__webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.js");function _(_,e,o,n,t){var l={};for(var u in e)"ref"!=u&&(l[u]=e[u]);var f,i,p={type:_,props:l,key:o,ref:e&&e.ref,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:++r.options.__v,__source:n,__self:t};if("function"==typeof _&&(f=_.defaultProps))for(i in f)void 0===l[i]&&(l[i]=f[i]);return r.options.vnode&&r.options.vnode(p),p}exports.Fragment=r.Fragment,exports.jsx=_,exports.jsxs=_,exports.jsxDEV=_;
//# sourceMappingURL=jsxRuntime.js.map


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/stylis/src/Enum.js":
/*!*****************************************!*\
  !*** ./node_modules/stylis/src/Enum.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MS": () => (/* binding */ MS),
/* harmony export */   "MOZ": () => (/* binding */ MOZ),
/* harmony export */   "WEBKIT": () => (/* binding */ WEBKIT),
/* harmony export */   "COMMENT": () => (/* binding */ COMMENT),
/* harmony export */   "RULESET": () => (/* binding */ RULESET),
/* harmony export */   "DECLARATION": () => (/* binding */ DECLARATION),
/* harmony export */   "PAGE": () => (/* binding */ PAGE),
/* harmony export */   "MEDIA": () => (/* binding */ MEDIA),
/* harmony export */   "IMPORT": () => (/* binding */ IMPORT),
/* harmony export */   "CHARSET": () => (/* binding */ CHARSET),
/* harmony export */   "VIEWPORT": () => (/* binding */ VIEWPORT),
/* harmony export */   "SUPPORTS": () => (/* binding */ SUPPORTS),
/* harmony export */   "DOCUMENT": () => (/* binding */ DOCUMENT),
/* harmony export */   "NAMESPACE": () => (/* binding */ NAMESPACE),
/* harmony export */   "KEYFRAMES": () => (/* binding */ KEYFRAMES),
/* harmony export */   "FONT_FACE": () => (/* binding */ FONT_FACE),
/* harmony export */   "COUNTER_STYLE": () => (/* binding */ COUNTER_STYLE),
/* harmony export */   "FONT_FEATURE_VALUES": () => (/* binding */ FONT_FEATURE_VALUES)
/* harmony export */ });
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'


/***/ }),

/***/ "./node_modules/stylis/src/Middleware.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Middleware.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleware": () => (/* binding */ middleware),
/* harmony export */   "rulesheet": () => (/* binding */ rulesheet),
/* harmony export */   "prefixer": () => (/* binding */ prefixer),
/* harmony export */   "namespace": () => (/* binding */ namespace)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/stylis/src/Prefixer.js");






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (!element.return)
		switch (element.type) {
			case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_2__.prefix)(element.value, element.length)
				break
			case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
				return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT), element, '')], callback)
			case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
				if (element.length)
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)(element.props, function (value) {
						switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /(::plac\w+|:read-\w+)/)) {
							// :read-(only|write)
							case ':read-only': case ':read-write':
								return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1'), element, '')], callback)
							// :placeholder
							case '::placeholder':
								return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([
									(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1'), element, ''),
									(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1'), element, ''),
									(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1'), element, '')
								], callback)
						}

						return ''
					})
		}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
			element.props = element.props.map(function (value) {
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.tokenize)(value), function (value, index, children) {
					switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 0)) {
						// \f
						case 12:
							return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[index + 1] === 'global')
								children[index + 1] = '', children[index + 2] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(children[index + 2], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) > 1 ? '' : value
								case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}


/***/ }),

/***/ "./node_modules/stylis/src/Parser.js":
/*!*******************************************!*\
  !*** ./node_modules/stylis/src/Parser.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compile": () => (/* binding */ compile),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "ruleset": () => (/* binding */ ruleset),
/* harmony export */   "comment": () => (/* binding */ comment),
/* harmony export */   "declaration": () => (/* binding */ declaration)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)()) {
			// " ' [ (
			case 34: case 39: case 91: case 40:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.whitespace)(previous)
				break
			// /
			case 47:
				switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)()) {
					case 42: case 47:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)()), root, parent), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset:
						if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
							(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule) {
									// d m s
									case 100: case 109: case 115:
										parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, length, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
			default:
				switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)() === 45)
							characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)())

						atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)(), offset = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)())), character++
						break
					// -
					case 45:
						if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
			if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
				props[k++] = z

	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_2__.RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length)
}


/***/ }),

/***/ "./node_modules/stylis/src/Prefixer.js":
/*!*********************************************!*\
  !*** ./node_modules/stylis/src/Prefixer.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": () => (/* binding */ prefix)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {string} value
 * @param {number} length
 * @return {string}
 */
function prefix (value, length) {
	switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.hash)(value, length)) {
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// flex, flex-direction
		case 6828: case 4268:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// order
		case 6165:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value
		// align-items
		case 5187:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/, '') + value
		// align-content
		case 4675:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /align-content|flex-|-self/, '') + value
		// flex-shrink
		case 5548:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value
		// cursor
		case 6187:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 1 - length > 6)
				switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1)) {
					// (f)ill-available, (f)it-content
					case 102: length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 3)
					// (m)ax-content, (m)in-content
					case 109:
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + (length == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, 'stretch') ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'stretch', 'fill-available'), length) + value : value
				}
			break
		// position: sticky
		case 4949:
			// (s)ticky?
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1) !== 115)
				break
		// display: (flex|inline-flex|inline-box)
		case 6444:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 3 - (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, '!important') && 10))) {
				// stic(k)y, inline-b(o)x
				case 107: case 111:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, value, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value) + value
				// (inline-)?fl(e)x
				case 101:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value
			}
			break
		// writing-mode
		case 5936:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
			}

			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
	}

	return value
}


/***/ }),

/***/ "./node_modules/stylis/src/Serializer.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Serializer.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serialize": () => (/* binding */ serialize),
/* harmony export */   "stringify": () => (/* binding */ stringify)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children)

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: return element.return = element.return || element.value
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.COMMENT: return ''
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET: element.value = element.props.join(',')
	}

	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}


/***/ }),

/***/ "./node_modules/stylis/src/Tokenizer.js":
/*!**********************************************!*\
  !*** ./node_modules/stylis/src/Tokenizer.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "line": () => (/* binding */ line),
/* harmony export */   "column": () => (/* binding */ column),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "position": () => (/* binding */ position),
/* harmony export */   "character": () => (/* binding */ character),
/* harmony export */   "characters": () => (/* binding */ characters),
/* harmony export */   "node": () => (/* binding */ node),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "char": () => (/* binding */ char),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "peek": () => (/* binding */ peek),
/* harmony export */   "caret": () => (/* binding */ caret),
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "token": () => (/* binding */ token),
/* harmony export */   "alloc": () => (/* binding */ alloc),
/* harmony export */   "dealloc": () => (/* binding */ dealloc),
/* harmony export */   "delimit": () => (/* binding */ delimit),
/* harmony export */   "tokenize": () => (/* binding */ tokenize),
/* harmony export */   "whitespace": () => (/* binding */ whitespace),
/* harmony export */   "tokenizer": () => (/* binding */ tokenizer),
/* harmony export */   "delimiter": () => (/* binding */ delimiter),
/* harmony export */   "commenter": () => (/* binding */ commenter),
/* harmony export */   "identifier": () => (/* binding */ identifier)
/* harmony export */ });
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");


var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string} type
 * @param {string[]} props
 * @param {object[]} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {string} value
 * @param {object} root
 * @param {string} type
 */
function copy (value, root, type) {
	return node(value, root.root, root.parent, type, root.props, root.children, 0)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } / breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
				break
			case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
				break
			default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
		}

	return children
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				return delimiter(type === 34 || type === 39 ? type : character)
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}


/***/ }),

/***/ "./node_modules/stylis/src/Utility.js":
/*!********************************************!*\
  !*** ./node_modules/stylis/src/Utility.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "from": () => (/* binding */ from),
/* harmony export */   "hash": () => (/* binding */ hash),
/* harmony export */   "trim": () => (/* binding */ trim),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "indexof": () => (/* binding */ indexof),
/* harmony export */   "charat": () => (/* binding */ charat),
/* harmony export */   "substr": () => (/* binding */ substr),
/* harmony export */   "strlen": () => (/* binding */ strlen),
/* harmony export */   "sizeof": () => (/* binding */ sizeof),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "combine": () => (/* binding */ combine)
/* harmony export */ });
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3)
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} value
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}


/***/ }),

/***/ "fastify":
/*!**************************!*\
  !*** external "fastify" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("fastify");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/server/index.tsx ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fastify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fastify */ "fastify");
/* harmony import */ var fastify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fastify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _web_home_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web/home/server */ "./src/web/home/server.tsx");


const server = fastify__WEBPACK_IMPORTED_MODULE_0___default()();
server.addHook("onSend", (request, reply, payload, next) => {
  reply.header("Cross-Origin-Opener-Policy", "same-origin");
  reply.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
server.get("/", (req, res) => {
  const html = (0,_web_home_server__WEBPACK_IMPORTED_MODULE_1__.serverRender)({});
  res.type("text/html; charset=utf-8").send(html);
});
server.listen(8000, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
})();

/******/ })()
;