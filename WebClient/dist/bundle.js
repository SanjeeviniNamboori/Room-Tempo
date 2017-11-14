webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(68);
var isBuffer = __webpack_require__(332);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

    /**
     *Namespace variable defining helper classes mainly used by the core classes in 'Boiler' namespace.
      @type Script
     @namespace Boiler.Helpers
     @module BoilerCoreClasses
     @main BoilerCoreClasses
     **/
    return {
        Localizer: __webpack_require__(257),
        Logger: __webpack_require__(258),
        Mediator: __webpack_require__(259),
        Router: __webpack_require__(260),
        Settings: __webpack_require__(261),
        Styler: __webpack_require__(262)
    };
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 28 */,
/* 29 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(451)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(8);
var normalizeHeaderName = __webpack_require__(250);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(64);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(64);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(8);
var settle = __webpack_require__(242);
var buildURL = __webpack_require__(245);
var parseHeaders = __webpack_require__(251);
var isURLSameOrigin = __webpack_require__(249);
var createError = __webpack_require__(67);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(244);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(247);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(241);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _boiler_ = __webpack_require__(253);

var _boiler_2 = _interopRequireDefault(_boiler_);

var _vueComponents = __webpack_require__(285);

var _vueComponents2 = _interopRequireDefault(_vueComponents);

var _modules = __webpack_require__(273);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//modules = require("./modules/modules"); //file where all of your product modules will be listed


//return an object with the public interface for an 'application' object. Read about module pattern for details.
exports.default = {
    initialize: function initialize() {

        /* In JavaScript, functions can be used similarly to classes in OO programming. Below,
         * we create an instance of 'Boiler.Context' by calling the 'new' operator. Then add
         * global settings. These will be propagated to child contexts
         */
        var globalContext = new _boiler_2.default.Context();

        var controllers = {
            urlController: new _boiler_2.default.UrlController($(".appcontent")),
            domController: new _boiler_2.default.DomController($('#page-content'))
            /* In BoilerplateJS, your product module hierachy is associated to a 'Context' heirachy. Below
             * we create the global 'Context' and load child contexts (representing your product sub modules)
             * to create a 'Context' tree (product modules as a tree).
             */
        };for (var i = 0; i < _modules2.default.length; i++) {
            _modules2.default[i].initialize(_boiler_2.default, controllers, globalContext, _boiler_2.default.dataContext, _vueComponents2.default);
        }
        controllers.domController.start();
        controllers.urlController.start();
    }
}; //var Boiler = require("./core/_boiler_"); // BoilerplateJS namespace used to access core classes, see above for the definition
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//import gridster from './gridster/jquery.gridster.js'


/***/ }),
/* 230 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * FullCalendar v3.6.2
 * Docs & License: https://fullcalendar.io/
 * (c) 2017 Adam Shaw
 */

(function(factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(3), __webpack_require__(0) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof exports === 'object') { // Node/CommonJS
		module.exports = factory(require('jquery'), require('moment'));
	}
	else {
		factory(jQuery, moment);
	}
})(function($, moment) {

;;

var FC = $.fullCalendar = {
	version: "3.6.2",
	// When introducing internal API incompatibilities (where fullcalendar plugins would break),
	// the minor version of the calendar should be upped (ex: 2.7.2 -> 2.8.0)
	// and the below integer should be incremented.
	internalApiVersion: 11
};
var fcViews = FC.views = {};


$.fn.fullCalendar = function(options) {
	var args = Array.prototype.slice.call(arguments, 1); // for a possible method call
	var res = this; // what this function will return (this jQuery object by default)

	this.each(function(i, _element) { // loop each DOM element involved
		var element = $(_element);
		var calendar = element.data('fullCalendar'); // get the existing calendar object (if any)
		var singleRes; // the returned value of this single method call

		// a method call
		if (typeof options === 'string') {

			if (options === 'getCalendar') {
				if (!i) { // first element only
					res = calendar;
				}
			}
			else if (options === 'destroy') { // don't warn if no calendar object
				if (calendar) {
					calendar.destroy();
					element.removeData('fullCalendar');
				}
			}
			else if (!calendar) {
				FC.warn("Attempting to call a FullCalendar method on an element with no calendar.");
			}
			else if ($.isFunction(calendar[options])) {
				singleRes = calendar[options].apply(calendar, args);

				if (!i) {
					res = singleRes; // record the first method call result
				}
				if (options === 'destroy') { // for the destroy method, must remove Calendar object data
					element.removeData('fullCalendar');
				}
			}
			else {
				FC.warn("'" + options + "' is an unknown FullCalendar method.");
			}
		}
		// a new calendar initialization
		else if (!calendar) { // don't initialize twice
			calendar = new Calendar(element, options);
			element.data('fullCalendar', calendar);
			calendar.render();
		}
	});

	return res;
};


var complexOptions = [ // names of options that are objects whose properties should be combined
	'header',
	'footer',
	'buttonText',
	'buttonIcons',
	'themeButtonIcons'
];


// Merges an array of option objects into a single object
function mergeOptions(optionObjs) {
	return mergeProps(optionObjs, complexOptions);
}

;;

// exports
FC.applyAll = applyAll;
FC.debounce = debounce;
FC.isInt = isInt;
FC.htmlEscape = htmlEscape;
FC.cssToStr = cssToStr;
FC.proxy = proxy;
FC.capitaliseFirstLetter = capitaliseFirstLetter;


/* FullCalendar-specific DOM Utilities
----------------------------------------------------------------------------------------------------------------------*/


// Given the scrollbar widths of some other container, create borders/margins on rowEls in order to match the left
// and right space that was offset by the scrollbars. A 1-pixel border first, then margin beyond that.
function compensateScroll(rowEls, scrollbarWidths) {
	if (scrollbarWidths.left) {
		rowEls.css({
			'border-left-width': 1,
			'margin-left': scrollbarWidths.left - 1
		});
	}
	if (scrollbarWidths.right) {
		rowEls.css({
			'border-right-width': 1,
			'margin-right': scrollbarWidths.right - 1
		});
	}
}


// Undoes compensateScroll and restores all borders/margins
function uncompensateScroll(rowEls) {
	rowEls.css({
		'margin-left': '',
		'margin-right': '',
		'border-left-width': '',
		'border-right-width': ''
	});
}


// Make the mouse cursor express that an event is not allowed in the current area
function disableCursor() {
	$('body').addClass('fc-not-allowed');
}


// Returns the mouse cursor to its original look
function enableCursor() {
	$('body').removeClass('fc-not-allowed');
}


// Given a total available height to fill, have `els` (essentially child rows) expand to accomodate.
// By default, all elements that are shorter than the recommended height are expanded uniformly, not considering
// any other els that are already too tall. if `shouldRedistribute` is on, it considers these tall rows and 
// reduces the available height.
function distributeHeight(els, availableHeight, shouldRedistribute) {

	// *FLOORING NOTE*: we floor in certain places because zoom can give inaccurate floating-point dimensions,
	// and it is better to be shorter than taller, to avoid creating unnecessary scrollbars.

	var minOffset1 = Math.floor(availableHeight / els.length); // for non-last element
	var minOffset2 = Math.floor(availableHeight - minOffset1 * (els.length - 1)); // for last element *FLOORING NOTE*
	var flexEls = []; // elements that are allowed to expand. array of DOM nodes
	var flexOffsets = []; // amount of vertical space it takes up
	var flexHeights = []; // actual css height
	var usedHeight = 0;

	undistributeHeight(els); // give all elements their natural height

	// find elements that are below the recommended height (expandable).
	// important to query for heights in a single first pass (to avoid reflow oscillation).
	els.each(function(i, el) {
		var minOffset = i === els.length - 1 ? minOffset2 : minOffset1;
		var naturalOffset = $(el).outerHeight(true);

		if (naturalOffset < minOffset) {
			flexEls.push(el);
			flexOffsets.push(naturalOffset);
			flexHeights.push($(el).height());
		}
		else {
			// this element stretches past recommended height (non-expandable). mark the space as occupied.
			usedHeight += naturalOffset;
		}
	});

	// readjust the recommended height to only consider the height available to non-maxed-out rows.
	if (shouldRedistribute) {
		availableHeight -= usedHeight;
		minOffset1 = Math.floor(availableHeight / flexEls.length);
		minOffset2 = Math.floor(availableHeight - minOffset1 * (flexEls.length - 1)); // *FLOORING NOTE*
	}

	// assign heights to all expandable elements
	$(flexEls).each(function(i, el) {
		var minOffset = i === flexEls.length - 1 ? minOffset2 : minOffset1;
		var naturalOffset = flexOffsets[i];
		var naturalHeight = flexHeights[i];
		var newHeight = minOffset - (naturalOffset - naturalHeight); // subtract the margin/padding

		if (naturalOffset < minOffset) { // we check this again because redistribution might have changed things
			$(el).height(newHeight);
		}
	});
}


// Undoes distrubuteHeight, restoring all els to their natural height
function undistributeHeight(els) {
	els.height('');
}


// Given `els`, a jQuery set of <td> cells, find the cell with the largest natural width and set the widths of all the
// cells to be that width.
// PREREQUISITE: if you want a cell to take up width, it needs to have a single inner element w/ display:inline
function matchCellWidths(els) {
	var maxInnerWidth = 0;

	els.find('> *').each(function(i, innerEl) {
		var innerWidth = $(innerEl).outerWidth();
		if (innerWidth > maxInnerWidth) {
			maxInnerWidth = innerWidth;
		}
	});

	maxInnerWidth++; // sometimes not accurate of width the text needs to stay on one line. insurance

	els.width(maxInnerWidth);

	return maxInnerWidth;
}


// Given one element that resides inside another,
// Subtracts the height of the inner element from the outer element.
function subtractInnerElHeight(outerEl, innerEl) {
	var both = outerEl.add(innerEl);
	var diff;

	// effin' IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
	both.css({
		position: 'relative', // cause a reflow, which will force fresh dimension recalculation
		left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
	});
	diff = outerEl.outerHeight() - innerEl.outerHeight(); // grab the dimensions
	both.css({ position: '', left: '' }); // undo hack

	return diff;
}


/* Element Geom Utilities
----------------------------------------------------------------------------------------------------------------------*/

FC.getOuterRect = getOuterRect;
FC.getClientRect = getClientRect;
FC.getContentRect = getContentRect;
FC.getScrollbarWidths = getScrollbarWidths;


// borrowed from https://github.com/jquery/jquery-ui/blob/1.11.0/ui/core.js#L51
function getScrollParent(el) {
	var position = el.css('position'),
		scrollParent = el.parents().filter(function() {
			var parent = $(this);
			return (/(auto|scroll)/).test(
				parent.css('overflow') + parent.css('overflow-y') + parent.css('overflow-x')
			);
		}).eq(0);

	return position === 'fixed' || !scrollParent.length ? $(el[0].ownerDocument || document) : scrollParent;
}


// Queries the outer bounding area of a jQuery element.
// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
// Origin is optional.
function getOuterRect(el, origin) {
	var offset = el.offset();
	var left = offset.left - (origin ? origin.left : 0);
	var top = offset.top - (origin ? origin.top : 0);

	return {
		left: left,
		right: left + el.outerWidth(),
		top: top,
		bottom: top + el.outerHeight()
	};
}


// Queries the area within the margin/border/scrollbars of a jQuery element. Does not go within the padding.
// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
// Origin is optional.
// WARNING: given element can't have borders
// NOTE: should use clientLeft/clientTop, but very unreliable cross-browser.
function getClientRect(el, origin) {
	var offset = el.offset();
	var scrollbarWidths = getScrollbarWidths(el);
	var left = offset.left + getCssFloat(el, 'border-left-width') + scrollbarWidths.left - (origin ? origin.left : 0);
	var top = offset.top + getCssFloat(el, 'border-top-width') + scrollbarWidths.top - (origin ? origin.top : 0);

	return {
		left: left,
		right: left + el[0].clientWidth, // clientWidth includes padding but NOT scrollbars
		top: top,
		bottom: top + el[0].clientHeight // clientHeight includes padding but NOT scrollbars
	};
}


// Queries the area within the margin/border/padding of a jQuery element. Assumed not to have scrollbars.
// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
// Origin is optional.
function getContentRect(el, origin) {
	var offset = el.offset(); // just outside of border, margin not included
	var left = offset.left + getCssFloat(el, 'border-left-width') + getCssFloat(el, 'padding-left') -
		(origin ? origin.left : 0);
	var top = offset.top + getCssFloat(el, 'border-top-width') + getCssFloat(el, 'padding-top') -
		(origin ? origin.top : 0);

	return {
		left: left,
		right: left + el.width(),
		top: top,
		bottom: top + el.height()
	};
}


// Returns the computed left/right/top/bottom scrollbar widths for the given jQuery element.
// WARNING: given element can't have borders (which will cause offsetWidth/offsetHeight to be larger).
// NOTE: should use clientLeft/clientTop, but very unreliable cross-browser.
function getScrollbarWidths(el) {
	var leftRightWidth = el[0].offsetWidth - el[0].clientWidth;
	var bottomWidth = el[0].offsetHeight - el[0].clientHeight;
	var widths;

	leftRightWidth = sanitizeScrollbarWidth(leftRightWidth);
	bottomWidth = sanitizeScrollbarWidth(bottomWidth);

	widths = { left: 0, right: 0, top: 0, bottom: bottomWidth };

	if (getIsLeftRtlScrollbars() && el.css('direction') == 'rtl') { // is the scrollbar on the left side?
		widths.left = leftRightWidth;
	}
	else {
		widths.right = leftRightWidth;
	}

	return widths;
}


// The scrollbar width computations in getScrollbarWidths are sometimes flawed when it comes to
// retina displays, rounding, and IE11. Massage them into a usable value.
function sanitizeScrollbarWidth(width) {
	width = Math.max(0, width); // no negatives
	width = Math.round(width);
	return width;
}


// Logic for determining if, when the element is right-to-left, the scrollbar appears on the left side

var _isLeftRtlScrollbars = null;

function getIsLeftRtlScrollbars() { // responsible for caching the computation
	if (_isLeftRtlScrollbars === null) {
		_isLeftRtlScrollbars = computeIsLeftRtlScrollbars();
	}
	return _isLeftRtlScrollbars;
}

function computeIsLeftRtlScrollbars() { // creates an offscreen test element, then removes it
	var el = $('<div><div/></div>')
		.css({
			position: 'absolute',
			top: -1000,
			left: 0,
			border: 0,
			padding: 0,
			overflow: 'scroll',
			direction: 'rtl'
		})
		.appendTo('body');
	var innerEl = el.children();
	var res = innerEl.offset().left > el.offset().left; // is the inner div shifted to accommodate a left scrollbar?
	el.remove();
	return res;
}


// Retrieves a jQuery element's computed CSS value as a floating-point number.
// If the queried value is non-numeric (ex: IE can return "medium" for border width), will just return zero.
function getCssFloat(el, prop) {
	return parseFloat(el.css(prop)) || 0;
}


/* Mouse / Touch Utilities
----------------------------------------------------------------------------------------------------------------------*/

FC.preventDefault = preventDefault;


// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
	return ev.which == 1 && !ev.ctrlKey;
}


function getEvX(ev) {
	var touches = ev.originalEvent.touches;

	// on mobile FF, pageX for touch events is present, but incorrect,
	// so, look at touch coordinates first.
	if (touches && touches.length) {
		return touches[0].pageX;
	}

	return ev.pageX;
}


function getEvY(ev) {
	var touches = ev.originalEvent.touches;

	// on mobile FF, pageX for touch events is present, but incorrect,
	// so, look at touch coordinates first.
	if (touches && touches.length) {
		return touches[0].pageY;
	}

	return ev.pageY;
}


function getEvIsTouch(ev) {
	return /^touch/.test(ev.type);
}


function preventSelection(el) {
	el.addClass('fc-unselectable')
		.on('selectstart', preventDefault);
}


function allowSelection(el) {
	el.removeClass('fc-unselectable')
		.off('selectstart', preventDefault);
}


// Stops a mouse/touch event from doing it's native browser action
function preventDefault(ev) {
	ev.preventDefault();
}


/* General Geometry Utils
----------------------------------------------------------------------------------------------------------------------*/

FC.intersectRects = intersectRects;

// Returns a new rectangle that is the intersection of the two rectangles. If they don't intersect, returns false
function intersectRects(rect1, rect2) {
	var res = {
		left: Math.max(rect1.left, rect2.left),
		right: Math.min(rect1.right, rect2.right),
		top: Math.max(rect1.top, rect2.top),
		bottom: Math.min(rect1.bottom, rect2.bottom)
	};

	if (res.left < res.right && res.top < res.bottom) {
		return res;
	}
	return false;
}


// Returns a new point that will have been moved to reside within the given rectangle
function constrainPoint(point, rect) {
	return {
		left: Math.min(Math.max(point.left, rect.left), rect.right),
		top: Math.min(Math.max(point.top, rect.top), rect.bottom)
	};
}


// Returns a point that is the center of the given rectangle
function getRectCenter(rect) {
	return {
		left: (rect.left + rect.right) / 2,
		top: (rect.top + rect.bottom) / 2
	};
}


// Subtracts point2's coordinates from point1's coordinates, returning a delta
function diffPoints(point1, point2) {
	return {
		left: point1.left - point2.left,
		top: point1.top - point2.top
	};
}


/* Object Ordering by Field
----------------------------------------------------------------------------------------------------------------------*/

FC.parseFieldSpecs = parseFieldSpecs;
FC.compareByFieldSpecs = compareByFieldSpecs;
FC.compareByFieldSpec = compareByFieldSpec;
FC.flexibleCompare = flexibleCompare;


function parseFieldSpecs(input) {
	var specs = [];
	var tokens = [];
	var i, token;

	if (typeof input === 'string') {
		tokens = input.split(/\s*,\s*/);
	}
	else if (typeof input === 'function') {
		tokens = [ input ];
	}
	else if ($.isArray(input)) {
		tokens = input;
	}

	for (i = 0; i < tokens.length; i++) {
		token = tokens[i];

		if (typeof token === 'string') {
			specs.push(
				token.charAt(0) == '-' ?
					{ field: token.substring(1), order: -1 } :
					{ field: token, order: 1 }
			);
		}
		else if (typeof token === 'function') {
			specs.push({ func: token });
		}
	}

	return specs;
}


function compareByFieldSpecs(obj1, obj2, fieldSpecs) {
	var i;
	var cmp;

	for (i = 0; i < fieldSpecs.length; i++) {
		cmp = compareByFieldSpec(obj1, obj2, fieldSpecs[i]);
		if (cmp) {
			return cmp;
		}
	}

	return 0;
}


function compareByFieldSpec(obj1, obj2, fieldSpec) {
	if (fieldSpec.func) {
		return fieldSpec.func(obj1, obj2);
	}
	return flexibleCompare(obj1[fieldSpec.field], obj2[fieldSpec.field]) *
		(fieldSpec.order || 1);
}


function flexibleCompare(a, b) {
	if (!a && !b) {
		return 0;
	}
	if (b == null) {
		return -1;
	}
	if (a == null) {
		return 1;
	}
	if ($.type(a) === 'string' || $.type(b) === 'string') {
		return String(a).localeCompare(String(b));
	}
	return a - b;
}


/* Date Utilities
----------------------------------------------------------------------------------------------------------------------*/

FC.computeGreatestUnit = computeGreatestUnit;
FC.divideRangeByDuration = divideRangeByDuration;
FC.divideDurationByDuration = divideDurationByDuration;
FC.multiplyDuration = multiplyDuration;
FC.durationHasTime = durationHasTime;

var dayIDs = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
var unitsDesc = [ 'year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond' ]; // descending


// Diffs the two moments into a Duration where full-days are recorded first, then the remaining time.
// Moments will have their timezones normalized.
function diffDayTime(a, b) {
	return moment.duration({
		days: a.clone().stripTime().diff(b.clone().stripTime(), 'days'),
		ms: a.time() - b.time() // time-of-day from day start. disregards timezone
	});
}


// Diffs the two moments via their start-of-day (regardless of timezone). Produces whole-day durations.
function diffDay(a, b) {
	return moment.duration({
		days: a.clone().stripTime().diff(b.clone().stripTime(), 'days')
	});
}


// Diffs two moments, producing a duration, made of a whole-unit-increment of the given unit. Uses rounding.
function diffByUnit(a, b, unit) {
	return moment.duration(
		Math.round(a.diff(b, unit, true)), // returnFloat=true
		unit
	);
}


// Computes the unit name of the largest whole-unit period of time.
// For example, 48 hours will be "days" whereas 49 hours will be "hours".
// Accepts start/end, a range object, or an original duration object.
function computeGreatestUnit(start, end) {
	var i, unit;
	var val;

	for (i = 0; i < unitsDesc.length; i++) {
		unit = unitsDesc[i];
		val = computeRangeAs(unit, start, end);

		if (val >= 1 && isInt(val)) {
			break;
		}
	}

	return unit; // will be "milliseconds" if nothing else matches
}


// like computeGreatestUnit, but has special abilities to interpret the source input for clues
function computeDurationGreatestUnit(duration, durationInput) {
	var unit = computeGreatestUnit(duration);

	// prevent days:7 from being interpreted as a week
	if (unit === 'week' && typeof durationInput === 'object' && durationInput.days) {
		unit = 'day';
	}

	return unit;
}


// Computes the number of units (like "hours") in the given range.
// Range can be a {start,end} object, separate start/end args, or a Duration.
// Results are based on Moment's .as() and .diff() methods, so results can depend on internal handling
// of month-diffing logic (which tends to vary from version to version).
function computeRangeAs(unit, start, end) {

	if (end != null) { // given start, end
		return end.diff(start, unit, true);
	}
	else if (moment.isDuration(start)) { // given duration
		return start.as(unit);
	}
	else { // given { start, end } range object
		return start.end.diff(start.start, unit, true);
	}
}


// Intelligently divides a range (specified by a start/end params) by a duration
function divideRangeByDuration(start, end, dur) {
	var months;

	if (durationHasTime(dur)) {
		return (end - start) / dur;
	}
	months = dur.asMonths();
	if (Math.abs(months) >= 1 && isInt(months)) {
		return end.diff(start, 'months', true) / months;
	}
	return end.diff(start, 'days', true) / dur.asDays();
}


// Intelligently divides one duration by another
function divideDurationByDuration(dur1, dur2) {
	var months1, months2;

	if (durationHasTime(dur1) || durationHasTime(dur2)) {
		return dur1 / dur2;
	}
	months1 = dur1.asMonths();
	months2 = dur2.asMonths();
	if (
		Math.abs(months1) >= 1 && isInt(months1) &&
		Math.abs(months2) >= 1 && isInt(months2)
	) {
		return months1 / months2;
	}
	return dur1.asDays() / dur2.asDays();
}


// Intelligently multiplies a duration by a number
function multiplyDuration(dur, n) {
	var months;

	if (durationHasTime(dur)) {
		return moment.duration(dur * n);
	}
	months = dur.asMonths();
	if (Math.abs(months) >= 1 && isInt(months)) {
		return moment.duration({ months: months * n });
	}
	return moment.duration({ days: dur.asDays() * n });
}


// Returns a boolean about whether the given duration has any time parts (hours/minutes/seconds/ms)
function durationHasTime(dur) {
	return Boolean(dur.hours() || dur.minutes() || dur.seconds() || dur.milliseconds());
}


function isNativeDate(input) {
	return  Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
}


// Returns a boolean about whether the given input is a time string, like "06:40:00" or "06:00"
function isTimeString(str) {
	return typeof str === 'string' &&
		/^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(str);
}


/* Logging and Debug
----------------------------------------------------------------------------------------------------------------------*/

FC.log = function() {
	var console = window.console;

	if (console && console.log) {
		return console.log.apply(console, arguments);
	}
};

FC.warn = function() {
	var console = window.console;

	if (console && console.warn) {
		return console.warn.apply(console, arguments);
	}
	else {
		return FC.log.apply(FC, arguments);
	}
};


/* General Utilities
----------------------------------------------------------------------------------------------------------------------*/

var hasOwnPropMethod = {}.hasOwnProperty;


// Merges an array of objects into a single object.
// The second argument allows for an array of property names who's object values will be merged together.
function mergeProps(propObjs, complexProps) {
	var dest = {};
	var i, name;
	var complexObjs;
	var j, val;
	var props;

	if (complexProps) {
		for (i = 0; i < complexProps.length; i++) {
			name = complexProps[i];
			complexObjs = [];

			// collect the trailing object values, stopping when a non-object is discovered
			for (j = propObjs.length - 1; j >= 0; j--) {
				val = propObjs[j][name];

				if (typeof val === 'object') {
					complexObjs.unshift(val);
				}
				else if (val !== undefined) {
					dest[name] = val; // if there were no objects, this value will be used
					break;
				}
			}

			// if the trailing values were objects, use the merged value
			if (complexObjs.length) {
				dest[name] = mergeProps(complexObjs);
			}
		}
	}

	// copy values into the destination, going from last to first
	for (i = propObjs.length - 1; i >= 0; i--) {
		props = propObjs[i];

		for (name in props) {
			if (!(name in dest)) { // if already assigned by previous props or complex props, don't reassign
				dest[name] = props[name];
			}
		}
	}

	return dest;
}


function copyOwnProps(src, dest) {
	for (var name in src) {
		if (hasOwnProp(src, name)) {
			dest[name] = src[name];
		}
	}
}


function hasOwnProp(obj, name) {
	return hasOwnPropMethod.call(obj, name);
}


function applyAll(functions, thisObj, args) {
	if ($.isFunction(functions)) {
		functions = [ functions ];
	}
	if (functions) {
		var i;
		var ret;
		for (i=0; i<functions.length; i++) {
			ret = functions[i].apply(thisObj, args) || ret;
		}
		return ret;
	}
}


function removeMatching(array, testFunc) {
	var removeCnt = 0;
	var i = 0;

	while (i < array.length) {
		if (testFunc(array[i])) { // truthy value means *remove*
			array.splice(i, 1);
			removeCnt++;
		}
		else {
			i++;
		}
	}

	return removeCnt;
}


function removeExact(array, exactVal) {
	var removeCnt = 0;
	var i = 0;

	while (i < array.length) {
		if (array[i] === exactVal) {
			array.splice(i, 1);
			removeCnt++;
		}
		else {
			i++;
		}
	}

	return removeCnt;
}
FC.removeExact = removeExact;


function isArraysEqual(a0, a1) {
	var len = a0.length;
	var i;

	if (len == null || len !== a1.length) { // not array? or not same length?
		return false;
	}

	for (i = 0; i < len; i++) {
		if (a0[i] !== a1[i]) {
			return false;
		}
	}

	return true;
}



function firstDefined() {
	for (var i=0; i<arguments.length; i++) {
		if (arguments[i] !== undefined) {
			return arguments[i];
		}
	}
}


function htmlEscape(s) {
	return (s + '').replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&#039;')
		.replace(/"/g, '&quot;')
		.replace(/\n/g, '<br />');
}


function stripHtmlEntities(text) {
	return text.replace(/&.*?;/g, '');
}


// Given a hash of CSS properties, returns a string of CSS.
// Uses property names as-is (no camel-case conversion). Will not make statements for null/undefined values.
function cssToStr(cssProps) {
	var statements = [];

	$.each(cssProps, function(name, val) {
		if (val != null) {
			statements.push(name + ':' + val);
		}
	});

	return statements.join(';');
}


// Given an object hash of HTML attribute names to values,
// generates a string that can be injected between < > in HTML
function attrsToStr(attrs) {
	var parts = [];

	$.each(attrs, function(name, val) {
		if (val != null) {
			parts.push(name + '="' + htmlEscape(val) + '"');
		}
	});

	return parts.join(' ');
}


function capitaliseFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}


function compareNumbers(a, b) { // for .sort()
	return a - b;
}


function isInt(n) {
	return n % 1 === 0;
}


// Returns a method bound to the given object context.
// Just like one of the jQuery.proxy signatures, but without the undesired behavior of treating the same method with
// different contexts as identical when binding/unbinding events.
function proxy(obj, methodName) {
	var method = obj[methodName];

	return function() {
		return method.apply(obj, arguments);
	};
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
function debounce(func, wait, immediate) {
	var timeout, args, context, timestamp, result;

	var later = function() {
		var last = +new Date() - timestamp;
		if (last < wait) {
			timeout = setTimeout(later, wait - last);
		}
		else {
			timeout = null;
			if (!immediate) {
				result = func.apply(context, args);
				context = args = null;
			}
		}
	};

	return function() {
		context = this;
		args = arguments;
		timestamp = +new Date();
		var callNow = immediate && !timeout;
		if (!timeout) {
			timeout = setTimeout(later, wait);
		}
		if (callNow) {
			result = func.apply(context, args);
			context = args = null;
		}
		return result;
	};
}

;;

/*
GENERAL NOTE on moments throughout the *entire rest* of the codebase:
All moments are assumed to be ambiguously-zoned unless otherwise noted,
with the NOTABLE EXCEOPTION of start/end dates that live on *Event Objects*.
Ambiguously-TIMED moments are assumed to be ambiguously-zoned by nature.
*/

var ambigDateOfMonthRegex = /^\s*\d{4}-\d\d$/;
var ambigTimeOrZoneRegex =
	/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/;
var newMomentProto = moment.fn; // where we will attach our new methods
var oldMomentProto = $.extend({}, newMomentProto); // copy of original moment methods

// tell momentjs to transfer these properties upon clone
var momentProperties = moment.momentProperties;
momentProperties.push('_fullCalendar');
momentProperties.push('_ambigTime');
momentProperties.push('_ambigZone');


// Creating
// -------------------------------------------------------------------------------------------------

// Creates a new moment, similar to the vanilla moment(...) constructor, but with
// extra features (ambiguous time, enhanced formatting). When given an existing moment,
// it will function as a clone (and retain the zone of the moment). Anything else will
// result in a moment in the local zone.
FC.moment = function() {
	return makeMoment(arguments);
};

// Sames as FC.moment, but forces the resulting moment to be in the UTC timezone.
FC.moment.utc = function() {
	var mom = makeMoment(arguments, true);

	// Force it into UTC because makeMoment doesn't guarantee it
	// (if given a pre-existing moment for example)
	if (mom.hasTime()) { // don't give ambiguously-timed moments a UTC zone
		mom.utc();
	}

	return mom;
};

// Same as FC.moment, but when given an ISO8601 string, the timezone offset is preserved.
// ISO8601 strings with no timezone offset will become ambiguously zoned.
FC.moment.parseZone = function() {
	return makeMoment(arguments, true, true);
};

// Builds an enhanced moment from args. When given an existing moment, it clones. When given a
// native Date, or called with no arguments (the current time), the resulting moment will be local.
// Anything else needs to be "parsed" (a string or an array), and will be affected by:
//    parseAsUTC - if there is no zone information, should we parse the input in UTC?
//    parseZone - if there is zone information, should we force the zone of the moment?
function makeMoment(args, parseAsUTC, parseZone) {
	var input = args[0];
	var isSingleString = args.length == 1 && typeof input === 'string';
	var isAmbigTime;
	var isAmbigZone;
	var ambigMatch;
	var mom;

	if (moment.isMoment(input) || isNativeDate(input) || input === undefined) {
		mom = moment.apply(null, args);
	}
	else { // "parsing" is required
		isAmbigTime = false;
		isAmbigZone = false;

		if (isSingleString) {
			if (ambigDateOfMonthRegex.test(input)) {
				// accept strings like '2014-05', but convert to the first of the month
				input += '-01';
				args = [ input ]; // for when we pass it on to moment's constructor
				isAmbigTime = true;
				isAmbigZone = true;
			}
			else if ((ambigMatch = ambigTimeOrZoneRegex.exec(input))) {
				isAmbigTime = !ambigMatch[5]; // no time part?
				isAmbigZone = true;
			}
		}
		else if ($.isArray(input)) {
			// arrays have no timezone information, so assume ambiguous zone
			isAmbigZone = true;
		}
		// otherwise, probably a string with a format

		if (parseAsUTC || isAmbigTime) {
			mom = moment.utc.apply(moment, args);
		}
		else {
			mom = moment.apply(null, args);
		}

		if (isAmbigTime) {
			mom._ambigTime = true;
			mom._ambigZone = true; // ambiguous time always means ambiguous zone
		}
		else if (parseZone) { // let's record the inputted zone somehow
			if (isAmbigZone) {
				mom._ambigZone = true;
			}
			else if (isSingleString) {
				mom.utcOffset(input); // if not a valid zone, will assign UTC
			}
		}
	}

	mom._fullCalendar = true; // flag for extended functionality

	return mom;
}


// Week Number
// -------------------------------------------------------------------------------------------------


// Returns the week number, considering the locale's custom week number calcuation
// `weeks` is an alias for `week`
newMomentProto.week = newMomentProto.weeks = function(input) {
	var weekCalc = this._locale._fullCalendar_weekCalc;

	if (input == null && typeof weekCalc === 'function') { // custom function only works for getter
		return weekCalc(this);
	}
	else if (weekCalc === 'ISO') {
		return oldMomentProto.isoWeek.apply(this, arguments); // ISO getter/setter
	}

	return oldMomentProto.week.apply(this, arguments); // local getter/setter
};


// Time-of-day
// -------------------------------------------------------------------------------------------------

// GETTER
// Returns a Duration with the hours/minutes/seconds/ms values of the moment.
// If the moment has an ambiguous time, a duration of 00:00 will be returned.
//
// SETTER
// You can supply a Duration, a Moment, or a Duration-like argument.
// When setting the time, and the moment has an ambiguous time, it then becomes unambiguous.
newMomentProto.time = function(time) {

	// Fallback to the original method (if there is one) if this moment wasn't created via FullCalendar.
	// `time` is a generic enough method name where this precaution is necessary to avoid collisions w/ other plugins.
	if (!this._fullCalendar) {
		return oldMomentProto.time.apply(this, arguments);
	}

	if (time == null) { // getter
		return moment.duration({
			hours: this.hours(),
			minutes: this.minutes(),
			seconds: this.seconds(),
			milliseconds: this.milliseconds()
		});
	}
	else { // setter

		this._ambigTime = false; // mark that the moment now has a time

		if (!moment.isDuration(time) && !moment.isMoment(time)) {
			time = moment.duration(time);
		}

		// The day value should cause overflow (so 24 hours becomes 00:00:00 of next day).
		// Only for Duration times, not Moment times.
		var dayHours = 0;
		if (moment.isDuration(time)) {
			dayHours = Math.floor(time.asDays()) * 24;
		}

		// We need to set the individual fields.
		// Can't use startOf('day') then add duration. In case of DST at start of day.
		return this.hours(dayHours + time.hours())
			.minutes(time.minutes())
			.seconds(time.seconds())
			.milliseconds(time.milliseconds());
	}
};

// Converts the moment to UTC, stripping out its time-of-day and timezone offset,
// but preserving its YMD. A moment with a stripped time will display no time
// nor timezone offset when .format() is called.
newMomentProto.stripTime = function() {

	if (!this._ambigTime) {

		this.utc(true); // keepLocalTime=true (for keeping *date* value)

		// set time to zero
		this.set({
			hours: 0,
			minutes: 0,
			seconds: 0,
			ms: 0
		});

		// Mark the time as ambiguous. This needs to happen after the .utc() call, which might call .utcOffset(),
		// which clears all ambig flags.
		this._ambigTime = true;
		this._ambigZone = true; // if ambiguous time, also ambiguous timezone offset
	}

	return this; // for chaining
};

// Returns if the moment has a non-ambiguous time (boolean)
newMomentProto.hasTime = function() {
	return !this._ambigTime;
};


// Timezone
// -------------------------------------------------------------------------------------------------

// Converts the moment to UTC, stripping out its timezone offset, but preserving its
// YMD and time-of-day. A moment with a stripped timezone offset will display no
// timezone offset when .format() is called.
newMomentProto.stripZone = function() {
	var wasAmbigTime;

	if (!this._ambigZone) {

		wasAmbigTime = this._ambigTime;

		this.utc(true); // keepLocalTime=true (for keeping date and time values)

		// the above call to .utc()/.utcOffset() unfortunately might clear the ambig flags, so restore
		this._ambigTime = wasAmbigTime || false;

		// Mark the zone as ambiguous. This needs to happen after the .utc() call, which might call .utcOffset(),
		// which clears the ambig flags.
		this._ambigZone = true;
	}

	return this; // for chaining
};

// Returns of the moment has a non-ambiguous timezone offset (boolean)
newMomentProto.hasZone = function() {
	return !this._ambigZone;
};


// implicitly marks a zone
newMomentProto.local = function(keepLocalTime) {

	// for when converting from ambiguously-zoned to local,
	// keep the time values when converting from UTC -> local
	oldMomentProto.local.call(this, this._ambigZone || keepLocalTime);

	// ensure non-ambiguous
	// this probably already happened via local() -> utcOffset(), but don't rely on Moment's internals
	this._ambigTime = false;
	this._ambigZone = false;

	return this; // for chaining
};


// implicitly marks a zone
newMomentProto.utc = function(keepLocalTime) {

	oldMomentProto.utc.call(this, keepLocalTime);

	// ensure non-ambiguous
	// this probably already happened via utc() -> utcOffset(), but don't rely on Moment's internals
	this._ambigTime = false;
	this._ambigZone = false;

	return this;
};


// implicitly marks a zone (will probably get called upon .utc() and .local())
newMomentProto.utcOffset = function(tzo) {

	if (tzo != null) { // setter
		// these assignments needs to happen before the original zone method is called.
		// I forget why, something to do with a browser crash.
		this._ambigTime = false;
		this._ambigZone = false;
	}

	return oldMomentProto.utcOffset.apply(this, arguments);
};


// Formatting
// -------------------------------------------------------------------------------------------------

newMomentProto.format = function() {

	if (this._fullCalendar && arguments[0]) { // an enhanced moment? and a format string provided?
		return formatDate(this, arguments[0]); // our extended formatting
	}
	if (this._ambigTime) {
		return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD');
	}
	if (this._ambigZone) {
		return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD[T]HH:mm:ss');
	}
	if (this._fullCalendar) { // enhanced non-ambig moment?
		// moment.format() doesn't ensure english, but we want to.
		return oldMomentFormat(englishMoment(this));
	}

	return oldMomentProto.format.apply(this, arguments);
};

newMomentProto.toISOString = function() {

	if (this._ambigTime) {
		return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD');
	}
	if (this._ambigZone) {
		return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD[T]HH:mm:ss');
	}
	if (this._fullCalendar) { // enhanced non-ambig moment?
		// depending on browser, moment might not output english. ensure english.
		// https://github.com/moment/moment/blob/2.18.1/src/lib/moment/format.js#L22
		return oldMomentProto.toISOString.apply(englishMoment(this), arguments);
	}

	return oldMomentProto.toISOString.apply(this, arguments);
};

function englishMoment(mom) {
	if (mom.locale() !== 'en') {
		return mom.clone().locale('en');
	}
	return mom;
}

;;
(function() {

// exports
FC.formatDate = formatDate;
FC.formatRange = formatRange;
FC.oldMomentFormat = oldMomentFormat;
FC.queryMostGranularFormatUnit = queryMostGranularFormatUnit;


// Config
// ---------------------------------------------------------------------------------------------------------------------

/*
Inserted between chunks in the fake ("intermediate") formatting string.
Important that it passes as whitespace (\s) because moment often identifies non-standalone months
via a regexp with an \s.
*/
var PART_SEPARATOR = '\u000b'; // vertical tab

/*
Inserted as the first character of a literal-text chunk to indicate that the literal text is not actually literal text,
but rather, a "special" token that has custom rendering (see specialTokens map).
*/
var SPECIAL_TOKEN_MARKER = '\u001f'; // information separator 1

/*
Inserted at the beginning and end of a span of text that must have non-zero numeric characters.
Handling of these markers is done in a post-processing step at the very end of text rendering.
*/
var MAYBE_MARKER = '\u001e'; // information separator 2
var MAYBE_REGEXP = new RegExp(MAYBE_MARKER + '([^' + MAYBE_MARKER + ']*)' + MAYBE_MARKER, 'g'); // must be global

/*
Addition formatting tokens we want recognized
*/
var specialTokens = {
	t: function(date) { // "a" or "p"
		return oldMomentFormat(date, 'a').charAt(0);
	},
	T: function(date) { // "A" or "P"
		return oldMomentFormat(date, 'A').charAt(0);
	}
};

/*
The first characters of formatting tokens for units that are 1 day or larger.
`value` is for ranking relative size (lower means bigger).
`unit` is a normalized unit, used for comparing moments.
*/
var largeTokenMap = {
	Y: { value: 1, unit: 'year' },
	M: { value: 2, unit: 'month' },
	W: { value: 3, unit: 'week' }, // ISO week
	w: { value: 3, unit: 'week' }, // local week
	D: { value: 4, unit: 'day' }, // day of month
	d: { value: 4, unit: 'day' } // day of week
};


// Single Date Formatting
// ---------------------------------------------------------------------------------------------------------------------

/*
Formats `date` with a Moment formatting string, but allow our non-zero areas and special token
*/
function formatDate(date, formatStr) {
	return renderFakeFormatString(
		getParsedFormatString(formatStr).fakeFormatString,
		date
	);
}

/*
Call this if you want Moment's original format method to be used
*/
function oldMomentFormat(mom, formatStr) {
	return oldMomentProto.format.call(mom, formatStr); // oldMomentProto defined in moment-ext.js
}


// Date Range Formatting
// -------------------------------------------------------------------------------------------------
// TODO: make it work with timezone offset

/*
Using a formatting string meant for a single date, generate a range string, like
"Sep 2 - 9 2013", that intelligently inserts a separator where the dates differ.
If the dates are the same as far as the format string is concerned, just return a single
rendering of one date, without any separator.
*/
function formatRange(date1, date2, formatStr, separator, isRTL) {
	var localeData;

	date1 = FC.moment.parseZone(date1);
	date2 = FC.moment.parseZone(date2);

	localeData = date1.localeData();

	// Expand localized format strings, like "LL" -> "MMMM D YYYY".
	// BTW, this is not important for `formatDate` because it is impossible to put custom tokens
	// or non-zero areas in Moment's localized format strings.
	formatStr = localeData.longDateFormat(formatStr) || formatStr;

	return renderParsedFormat(
		getParsedFormatString(formatStr),
		date1,
		date2,
		separator || ' - ',
		isRTL
	);
}

/*
Renders a range with an already-parsed format string.
*/
function renderParsedFormat(parsedFormat, date1, date2, separator, isRTL) {
	var sameUnits = parsedFormat.sameUnits;
	var unzonedDate1 = date1.clone().stripZone(); // for same-unit comparisons
	var unzonedDate2 = date2.clone().stripZone(); // "

	var renderedParts1 = renderFakeFormatStringParts(parsedFormat.fakeFormatString, date1);
	var renderedParts2 = renderFakeFormatStringParts(parsedFormat.fakeFormatString, date2);

	var leftI;
	var leftStr = '';
	var rightI;
	var rightStr = '';
	var middleI;
	var middleStr1 = '';
	var middleStr2 = '';
	var middleStr = '';

	// Start at the leftmost side of the formatting string and continue until you hit a token
	// that is not the same between dates.
	for (
		leftI = 0;
		leftI < sameUnits.length && (!sameUnits[leftI] || unzonedDate1.isSame(unzonedDate2, sameUnits[leftI]));
		leftI++
	) {
		leftStr += renderedParts1[leftI];
	}

	// Similarly, start at the rightmost side of the formatting string and move left
	for (
		rightI = sameUnits.length - 1;
		rightI > leftI && (!sameUnits[rightI] || unzonedDate1.isSame(unzonedDate2, sameUnits[rightI]));
		rightI--
	) {
		// If current chunk is on the boundary of unique date-content, and is a special-case
		// date-formatting postfix character, then don't consume it. Consider it unique date-content.
		// TODO: make configurable
		if (rightI - 1 === leftI && renderedParts1[rightI] === '.') {
			break;
		}

		rightStr = renderedParts1[rightI] + rightStr;
	}

	// The area in the middle is different for both of the dates.
	// Collect them distinctly so we can jam them together later.
	for (middleI = leftI; middleI <= rightI; middleI++) {
		middleStr1 += renderedParts1[middleI];
		middleStr2 += renderedParts2[middleI];
	}

	if (middleStr1 || middleStr2) {
		if (isRTL) {
			middleStr = middleStr2 + separator + middleStr1;
		}
		else {
			middleStr = middleStr1 + separator + middleStr2;
		}
	}

	return processMaybeMarkers(
		leftStr + middleStr + rightStr
	);
}


// Format String Parsing
// ---------------------------------------------------------------------------------------------------------------------

var parsedFormatStrCache = {};

/*
Returns a parsed format string, leveraging a cache.
*/
function getParsedFormatString(formatStr) {
	return parsedFormatStrCache[formatStr] ||
		(parsedFormatStrCache[formatStr] = parseFormatString(formatStr));
}

/*
Parses a format string into the following:
- fakeFormatString: a momentJS formatting string, littered with special control characters that get post-processed.
- sameUnits: for every part in fakeFormatString, if the part is a token, the value will be a unit string (like "day"),
  that indicates how similar a range's start & end must be in order to share the same formatted text.
  If not a token, then the value is null.
  Always a flat array (not nested liked "chunks").
*/
function parseFormatString(formatStr) {
	var chunks = chunkFormatString(formatStr);
	
	return {
		fakeFormatString: buildFakeFormatString(chunks),
		sameUnits: buildSameUnits(chunks)
	};
}

/*
Break the formatting string into an array of chunks.
A 'maybe' chunk will have nested chunks.
*/
function chunkFormatString(formatStr) {
	var chunks = [];
	var match;

	// TODO: more descrimination
	// \4 is a backreference to the first character of a multi-character set.
	var chunker = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g;

	while ((match = chunker.exec(formatStr))) {
		if (match[1]) { // a literal string inside [ ... ]
			chunks.push.apply(chunks, // append
				splitStringLiteral(match[1])
			);
		}
		else if (match[2]) { // non-zero formatting inside ( ... )
			chunks.push({ maybe: chunkFormatString(match[2]) });
		}
		else if (match[3]) { // a formatting token
			chunks.push({ token: match[3] });
		}
		else if (match[5]) { // an unenclosed literal string
			chunks.push.apply(chunks, // append
				splitStringLiteral(match[5])
			);
		}
	}

	return chunks;
}

/*
Potentially splits a literal-text string into multiple parts. For special cases.
*/
function splitStringLiteral(s) {
	if (s === '. ') {
		return [ '.', ' ' ]; // for locales with periods bound to the end of each year/month/date
	}
	else {
		return [ s ];
	}
}

/*
Given chunks parsed from a real format string, generate a fake (aka "intermediate") format string with special control
characters that will eventually be given to moment for formatting, and then post-processed.
*/
function buildFakeFormatString(chunks) {
	var parts = [];
	var i, chunk;

	for (i = 0; i < chunks.length; i++) {
		chunk = chunks[i];

		if (typeof chunk === 'string') {
			parts.push('[' + chunk + ']');
		}
		else if (chunk.token) {
			if (chunk.token in specialTokens) {
				parts.push(
					SPECIAL_TOKEN_MARKER + // useful during post-processing
					'[' + chunk.token + ']' // preserve as literal text
				);
			}
			else {
				parts.push(chunk.token); // unprotected text implies a format string
			}
		}
		else if (chunk.maybe) {
			parts.push(
				MAYBE_MARKER + // useful during post-processing
				buildFakeFormatString(chunk.maybe) +
				MAYBE_MARKER
			);
		}
	}

	return parts.join(PART_SEPARATOR);
}

/*
Given parsed chunks from a real formatting string, generates an array of unit strings (like "day") that indicate
in which regard two dates must be similar in order to share range formatting text.
The `chunks` can be nested (because of "maybe" chunks), however, the returned array will be flat.
*/
function buildSameUnits(chunks) {
	var units = [];
	var i, chunk;
	var tokenInfo;

	for (i = 0; i < chunks.length; i++) {
		chunk = chunks[i];

		if (chunk.token) {
			tokenInfo = largeTokenMap[chunk.token.charAt(0)];
			units.push(tokenInfo ? tokenInfo.unit : 'second'); // default to a very strict same-second
		}
		else if (chunk.maybe) {
			units.push.apply(units, // append
				buildSameUnits(chunk.maybe)
			);
		}
		else {
			units.push(null);
		}
	}

	return units;
}


// Rendering to text
// ---------------------------------------------------------------------------------------------------------------------

/*
Formats a date with a fake format string, post-processes the control characters, then returns.
*/
function renderFakeFormatString(fakeFormatString, date) {
	return processMaybeMarkers(
		renderFakeFormatStringParts(fakeFormatString, date).join('')
	);
}

/*
Formats a date into parts that will have been post-processed, EXCEPT for the "maybe" markers.
*/
function renderFakeFormatStringParts(fakeFormatString, date) {
	var parts = [];
	var fakeRender = oldMomentFormat(date, fakeFormatString);
	var fakeParts = fakeRender.split(PART_SEPARATOR);
	var i, fakePart;

	for (i = 0; i < fakeParts.length; i++) {
		fakePart = fakeParts[i];

		if (fakePart.charAt(0) === SPECIAL_TOKEN_MARKER) {
			parts.push(
				// the literal string IS the token's name.
				// call special token's registered function.
				specialTokens[fakePart.substring(1)](date)
			);
		}
		else {
			parts.push(fakePart);
		}
	}

	return parts;
}

/*
Accepts an almost-finally-formatted string and processes the "maybe" control characters, returning a new string.
*/
function processMaybeMarkers(s) {
	return s.replace(MAYBE_REGEXP, function(m0, m1) { // regex assumed to have 'g' flag
		if (m1.match(/[1-9]/)) { // any non-zero numeric characters?
			return m1;
		}
		else {
			return '';
		}
	});
}


// Misc Utils
// -------------------------------------------------------------------------------------------------

/*
Returns a unit string, either 'year', 'month', 'day', or null for the most granular formatting token in the string.
*/
function queryMostGranularFormatUnit(formatStr) {
	var chunks = chunkFormatString(formatStr);
	var i, chunk;
	var candidate;
	var best;

	for (i = 0; i < chunks.length; i++) {
		chunk = chunks[i];

		if (chunk.token) {
			candidate = largeTokenMap[chunk.token.charAt(0)];
			if (candidate) {
				if (!best || candidate.value > best.value) {
					best = candidate;
				}
			}
		}
	}

	if (best) {
		return best.unit;
	}

	return null;
};

})();

// quick local references
var formatDate = FC.formatDate;
var formatRange = FC.formatRange;
var oldMomentFormat = FC.oldMomentFormat;

;;

FC.Class = Class; // export

// Class that all other classes will inherit from
function Class() { }


// Called on a class to create a subclass.
// Last argument contains instance methods. Any argument before the last are considered mixins.
Class.extend = function() {
	var members = {};
	var i;

	for (i = 0; i < arguments.length; i++) {
		copyOwnProps(arguments[i], members);
	}

	return extendClass(this, members);
};


// Adds new member variables/methods to the class's prototype.
// Can be called with another class, or a plain object hash containing new members.
Class.mixin = function(members) {
	copyOwnProps(members, this.prototype);
};


function extendClass(superClass, members) {
	var subClass;

	// ensure a constructor for the subclass, forwarding all arguments to the super-constructor if it doesn't exist
	if (hasOwnProp(members, 'constructor')) {
		subClass = members.constructor;
	}
	if (typeof subClass !== 'function') {
		subClass = members.constructor = function() {
			superClass.apply(this, arguments);
		};
	}

	// build the base prototype for the subclass, which is an new object chained to the superclass's prototype
	subClass.prototype = Object.create(superClass.prototype);

	// copy each member variable/method onto the the subclass's prototype
	copyOwnProps(members, subClass.prototype);

	// copy over all class variables/methods to the subclass, such as `extend` and `mixin`
	copyOwnProps(superClass, subClass);

	return subClass;
}

;;

var EmitterMixin = FC.EmitterMixin = {

	// jQuery-ification via $(this) allows a non-DOM object to have
	// the same event handling capabilities (including namespaces).


	on: function(types, handler) {
		$(this).on(types, this._prepareIntercept(handler));
		return this; // for chaining
	},


	one: function(types, handler) {
		$(this).one(types, this._prepareIntercept(handler));
		return this; // for chaining
	},


	_prepareIntercept: function(handler) {
		// handlers are always called with an "event" object as their first param.
		// sneak the `this` context and arguments into the extra parameter object
		// and forward them on to the original handler.
		var intercept = function(ev, extra) {
			return handler.apply(
				extra.context || this,
				extra.args || []
			);
		};

		// mimick jQuery's internal "proxy" system (risky, I know)
		// causing all functions with the same .guid to appear to be the same.
		// https://github.com/jquery/jquery/blob/2.2.4/src/core.js#L448
		// this is needed for calling .off with the original non-intercept handler.
		if (!handler.guid) {
			handler.guid = $.guid++;
		}
		intercept.guid = handler.guid;

		return intercept;
	},


	off: function(types, handler) {
		$(this).off(types, handler);

		return this; // for chaining
	},


	trigger: function(types) {
		var args = Array.prototype.slice.call(arguments, 1); // arguments after the first

		// pass in "extra" info to the intercept
		$(this).triggerHandler(types, { args: args });

		return this; // for chaining
	},


	triggerWith: function(types, context, args) {

		// `triggerHandler` is less reliant on the DOM compared to `trigger`.
		// pass in "extra" info to the intercept.
		$(this).triggerHandler(types, { context: context, args: args });

		return this; // for chaining
	},


	hasHandlers: function(type) {
		var hash = $._data(this, 'events'); // http://blog.jquery.com/2012/08/09/jquery-1-8-released/

		return hash && hash[type] && hash[type].length > 0;
	}

};

;;

/*
Utility methods for easily listening to events on another object,
and more importantly, easily unlistening from them.
*/
var ListenerMixin = FC.ListenerMixin = (function() {
	var guid = 0;
	var ListenerMixin = {

		listenerId: null,

		/*
		Given an `other` object that has on/off methods, bind the given `callback` to an event by the given name.
		The `callback` will be called with the `this` context of the object that .listenTo is being called on.
		Can be called:
			.listenTo(other, eventName, callback)
		OR
			.listenTo(other, {
				eventName1: callback1,
				eventName2: callback2
			})
		*/
		listenTo: function(other, arg, callback) {
			if (typeof arg === 'object') { // given dictionary of callbacks
				for (var eventName in arg) {
					if (arg.hasOwnProperty(eventName)) {
						this.listenTo(other, eventName, arg[eventName]);
					}
				}
			}
			else if (typeof arg === 'string') {
				other.on(
					arg + '.' + this.getListenerNamespace(), // use event namespacing to identify this object
					$.proxy(callback, this) // always use `this` context
						// the usually-undesired jQuery guid behavior doesn't matter,
						// because we always unbind via namespace
				);
			}
		},

		/*
		Causes the current object to stop listening to events on the `other` object.
		`eventName` is optional. If omitted, will stop listening to ALL events on `other`.
		*/
		stopListeningTo: function(other, eventName) {
			other.off((eventName || '') + '.' + this.getListenerNamespace());
		},

		/*
		Returns a string, unique to this object, to be used for event namespacing
		*/
		getListenerNamespace: function() {
			if (this.listenerId == null) {
				this.listenerId = guid++;
			}
			return '_listener' + this.listenerId;
		}

	};
	return ListenerMixin;
})();
;;

var ParsableModelMixin = {

	standardPropMap: {}, // will be cloned by defineStandardProps


	/*
	Returns true/false for success.
	Meant to be only called ONCE, at object creation.
	*/
	applyProps: function(rawProps) {
		var standardPropMap = this.standardPropMap;
		var manualProps = {};
		var miscProps = {};
		var propName;

		for (propName in rawProps) {
			if (standardPropMap[propName] === true) { // copy verbatim
				this[propName] = rawProps[propName];
			}
			else if (standardPropMap[propName] === false) {
				manualProps[propName] = rawProps[propName];
			}
			else {
				miscProps[propName] = rawProps[propName];
			}
		}

		this.applyMiscProps(miscProps);

		return this.applyManualStandardProps(manualProps);
	},


	/*
	If subclasses override, they must call this supermethod and return the boolean response.
	Meant to be only called ONCE, at object creation.
	*/
	applyManualStandardProps: function(rawProps) {
		return true;
	},


	/*
	Can be called even after initial object creation.
	*/
	applyMiscProps: function(rawProps) {
		// subclasses can implement
	},


	/*
	TODO: why is this a method when defineStandardProps is static
	*/
	isStandardProp: function(propName) {
		return propName in this.standardPropMap;
	}

};


/*
TODO: devise a better system
*/
var ParsableModelMixin_defineStandardProps = function(propDefs) {
	var proto = this.prototype;

	if (!proto.hasOwnProperty('standardPropMap')) {
		proto.standardPropMap = Object.create(proto.standardPropMap);
	}

	copyOwnProps(propDefs, proto.standardPropMap);
};


/*
TODO: devise a better system
*/
var ParsableModelMixin_copyVerbatimStandardProps = function(src, dest) {
	var map = this.prototype.standardPropMap;
	var propName;

	for (propName in map) {
		if (
			src[propName] != null && // in the src object?
			map[propName] === true // false means "copy verbatim"
		) {
			dest[propName] = src[propName];
		}
	}
};

;;

var Model = Class.extend(EmitterMixin, ListenerMixin, {

	_props: null,
	_watchers: null,
	_globalWatchArgs: {}, // mutation protection in Model.watch

	constructor: function() {
		this._watchers = {};
		this._props = {};
		this.applyGlobalWatchers();
		this.constructed();
	},

	// useful for monkeypatching. TODO: BaseClass?
	constructed: function() {
	},

	applyGlobalWatchers: function() {
		var map = this._globalWatchArgs;
		var name;

		for (name in map) {
			this.watch.apply(this, map[name]);
		}
	},

	has: function(name) {
		return name in this._props;
	},

	get: function(name) {
		if (name === undefined) {
			return this._props;
		}

		return this._props[name];
	},

	set: function(name, val) {
		var newProps;

		if (typeof name === 'string') {
			newProps = {};
			newProps[name] = val === undefined ? null : val;
		}
		else {
			newProps = name;
		}

		this.setProps(newProps);
	},

	reset: function(newProps) {
		var oldProps = this._props;
		var changeset = {}; // will have undefined's to signal unsets
		var name;

		for (name in oldProps) {
			changeset[name] = undefined;
		}

		for (name in newProps) {
			changeset[name] = newProps[name];
		}

		this.setProps(changeset);
	},

	unset: function(name) { // accepts a string or array of strings
		var newProps = {};
		var names;
		var i;

		if (typeof name === 'string') {
			names = [ name ];
		}
		else {
			names = name;
		}

		for (i = 0; i < names.length; i++) {
			newProps[names[i]] = undefined;
		}

		this.setProps(newProps);
	},

	setProps: function(newProps) {
		var changedProps = {};
		var changedCnt = 0;
		var name, val;

		for (name in newProps) {
			val = newProps[name];

			// a change in value?
			// if an object, don't check equality, because might have been mutated internally.
			// TODO: eventually enforce immutability.
			if (
				typeof val === 'object' ||
				val !== this._props[name]
			) {
				changedProps[name] = val;
				changedCnt++;
			}
		}

		if (changedCnt) {

			this.trigger('before:batchChange', changedProps);

			for (name in changedProps) {
				val = changedProps[name];

				this.trigger('before:change', name, val);
				this.trigger('before:change:' + name, val);
			}

			for (name in changedProps) {
				val = changedProps[name];

				if (val === undefined) {
					delete this._props[name];
				}
				else {
					this._props[name] = val;
				}

				this.trigger('change:' + name, val);
				this.trigger('change', name, val);
			}

			this.trigger('batchChange', changedProps);
		}
	},

	watch: function(name, depList, startFunc, stopFunc) {
		var _this = this;

		this.unwatch(name);

		this._watchers[name] = this._watchDeps(depList, function(deps) {
			var res = startFunc.call(_this, deps);

			if (res && res.then) {
				_this.unset(name); // put in an unset state while resolving
				res.then(function(val) {
					_this.set(name, val);
				});
			}
			else {
				_this.set(name, res);
			}
		}, function(deps) {
			_this.unset(name);

			if (stopFunc) {
				stopFunc.call(_this, deps);
			}
		});
	},

	unwatch: function(name) {
		var watcher = this._watchers[name];

		if (watcher) {
			delete this._watchers[name];
			watcher.teardown();
		}
	},

	_watchDeps: function(depList, startFunc, stopFunc) {
		var _this = this;
		var queuedChangeCnt = 0;
		var depCnt = depList.length;
		var satisfyCnt = 0;
		var values = {}; // what's passed as the `deps` arguments
		var bindTuples = []; // array of [ eventName, handlerFunc ] arrays
		var isCallingStop = false;

		function onBeforeDepChange(depName, val, isOptional) {
			queuedChangeCnt++;
			if (queuedChangeCnt === 1) { // first change to cause a "stop" ?
				if (satisfyCnt === depCnt) { // all deps previously satisfied?
					isCallingStop = true;
					stopFunc(values);
					isCallingStop = false;
				}
			}
		}

		function onDepChange(depName, val, isOptional) {

			if (val === undefined) { // unsetting a value?

				// required dependency that was previously set?
				if (!isOptional && values[depName] !== undefined) {
					satisfyCnt--;
				}

				delete values[depName];
			}
			else { // setting a value?

				// required dependency that was previously unset?
				if (!isOptional && values[depName] === undefined) {
					satisfyCnt++;
				}

				values[depName] = val;
			}

			queuedChangeCnt--;
			if (!queuedChangeCnt) { // last change to cause a "start"?

				// now finally satisfied or satisfied all along?
				if (satisfyCnt === depCnt) {

					// if the stopFunc initiated another value change, ignore it.
					// it will be processed by another change event anyway.
					if (!isCallingStop) {
						startFunc(values);
					}
				}
			}
		}

		// intercept for .on() that remembers handlers
		function bind(eventName, handler) {
			_this.on(eventName, handler);
			bindTuples.push([ eventName, handler ]);
		}

		// listen to dependency changes
		depList.forEach(function(depName) {
			var isOptional = false;

			if (depName.charAt(0) === '?') { // TODO: more DRY
				depName = depName.substring(1);
				isOptional = true;
			}

			bind('before:change:' + depName, function(val) {
				onBeforeDepChange(depName, val, isOptional);
			});

			bind('change:' + depName, function(val) {
				onDepChange(depName, val, isOptional);
			});
		});

		// process current dependency values
		depList.forEach(function(depName) {
			var isOptional = false;

			if (depName.charAt(0) === '?') { // TODO: more DRY
				depName = depName.substring(1);
				isOptional = true;
			}

			if (_this.has(depName)) {
				values[depName] = _this.get(depName);
				satisfyCnt++;
			}
			else if (isOptional) {
				satisfyCnt++;
			}
		});

		// initially satisfied
		if (satisfyCnt === depCnt) {
			startFunc(values);
		}

		return {
			teardown: function() {
				// remove all handlers
				for (var i = 0; i < bindTuples.length; i++) {
					_this.off(bindTuples[i][0], bindTuples[i][1]);
				}
				bindTuples = null;

				// was satisfied, so call stopFunc
				if (satisfyCnt === depCnt) {
					stopFunc();
				}
			},
			flash: function() {
				if (satisfyCnt === depCnt) {
					stopFunc();
					startFunc(values);
				}
			}
		};
	},

	flash: function(name) {
		var watcher = this._watchers[name];

		if (watcher) {
			watcher.flash();
		}
	}

});


Model.watch = function(name /* , depList, startFunc, stopFunc */) {

	// subclasses should make a masked-copy of the superclass's map
	// TODO: write test
	if (!this.prototype.hasOwnProperty('_globalWatchArgs')) {
		this.prototype._globalWatchArgs = Object.create(this.prototype._globalWatchArgs);
	}

	this.prototype._globalWatchArgs[name] = arguments;
};


FC.Model = Model;


;;

var Promise = {

	construct: function(executor) {
		var deferred = $.Deferred();
		var promise = deferred.promise();

		if (typeof executor === 'function') {
			executor(
				function(val) { // resolve
					deferred.resolve(val);
					attachImmediatelyResolvingThen(promise, val);
				},
				function() { // reject
					deferred.reject();
					attachImmediatelyRejectingThen(promise);
				}
			);
		}

		return promise;
	},

	resolve: function(val) {
		var deferred = $.Deferred().resolve(val);
		var promise = deferred.promise();

		attachImmediatelyResolvingThen(promise, val);

		return promise;
	},

	reject: function() {
		var deferred = $.Deferred().reject();
		var promise = deferred.promise();

		attachImmediatelyRejectingThen(promise);

		return promise;
	}

};


function attachImmediatelyResolvingThen(promise, val) {
	promise.then = function(onResolve) {
		if (typeof onResolve === 'function') {
			return Promise.resolve(onResolve(val));
		}
		return promise;
	};
}


function attachImmediatelyRejectingThen(promise) {
	promise.then = function(onResolve, onReject) {
		if (typeof onReject === 'function') {
			onReject();
		}
		return promise;
	};
}


FC.Promise = Promise;

;;

var TaskQueue = Class.extend(EmitterMixin, {

	q: null,
	isPaused: false,
	isRunning: false,


	constructor: function() {
		this.q = [];
	},


	queue: function(/* taskFunc, taskFunc... */) {
		this.q.push.apply(this.q, arguments); // append
		this.tryStart();
	},


	pause: function() {
		this.isPaused = true;
	},


	resume: function() {
		this.isPaused = false;
		this.tryStart();
	},


	getIsIdle: function() {
		return !this.isRunning && !this.isPaused;
	},


	tryStart: function() {
		if (!this.isRunning && this.canRunNext()) {
			this.isRunning = true;
			this.trigger('start');
			this.runRemaining();
		}
	},


	canRunNext: function() {
		return !this.isPaused && this.q.length;
	},


	runRemaining: function() { // assumes at least one task in queue. does not check canRunNext for first task.
		var _this = this;
		var task;
		var res;

		do {
			task = this.q.shift(); // always freshly reference q. might have been reassigned.
			res = this.runTask(task);

			if (res && res.then) {
				res.then(function() { // jshint ignore:line
					if (_this.canRunNext()) {
						_this.runRemaining();
					}
				});
				return; // prevent marking as stopped
			}
		} while (this.canRunNext());

		this.trigger('stop'); // not really a 'stop' ... more of a 'drained'
		this.isRunning = false;

		// if 'stop' handler added more tasks.... TODO: write test for this
		this.tryStart();
	},


	runTask: function(task) {
		return task(); // task *is* the function, but subclasses can change the format of a task
	}

});

FC.TaskQueue = TaskQueue;

;;

var RenderQueue = TaskQueue.extend({

	waitsByNamespace: null,
	waitNamespace: null,
	waitId: null,


	constructor: function(waitsByNamespace) {
		TaskQueue.call(this); // super-constructor

		this.waitsByNamespace = waitsByNamespace || {};
	},


	queue: function(taskFunc, namespace, type) {
		var task = {
			func: taskFunc,
			namespace: namespace,
			type: type
		};
		var waitMs;

		if (namespace) {
			waitMs = this.waitsByNamespace[namespace];
		}

		if (this.waitNamespace) {
			if (namespace === this.waitNamespace && waitMs != null) {
				this.delayWait(waitMs);
			}
			else {
				this.clearWait();
				this.tryStart();
			}
		}

		if (this.compoundTask(task)) { // appended to queue?

			if (!this.waitNamespace && waitMs != null) {
				this.startWait(namespace, waitMs);
			}
			else {
				this.tryStart();
			}
		}
	},


	startWait: function(namespace, waitMs) {
		this.waitNamespace = namespace;
		this.spawnWait(waitMs);
	},


	delayWait: function(waitMs) {
		clearTimeout(this.waitId);
		this.spawnWait(waitMs);
	},


	spawnWait: function(waitMs) {
		var _this = this;

		this.waitId = setTimeout(function() {
			_this.waitNamespace = null;
			_this.tryStart();
		}, waitMs);
	},


	clearWait: function() {
		if (this.waitNamespace) {
			clearTimeout(this.waitId);
			this.waitId = null;
			this.waitNamespace = null;
		}
	},


	canRunNext: function() {
		if (!TaskQueue.prototype.canRunNext.apply(this, arguments)) {
			return false;
		}

		// waiting for a certain namespace to stop receiving tasks?
		if (this.waitNamespace) {

			// if there was a different namespace task in the meantime,
			// that forces all previously-waiting tasks to suddenly execute.
			// TODO: find a way to do this in constant time.
			for (var q = this.q, i = 0; i < q.length; i++) {
				if (q[i].namespace !== this.waitNamespace) {
					return true; // allow execution
				}
			}

			return false;
		}

		return true;
	},


	runTask: function(task) {
		task.func();
	},


	compoundTask: function(newTask) {
		var q = this.q;
		var shouldAppend = true;
		var i, task;

		if (newTask.namespace && newTask.type === 'destroy') {

			// remove all init/add/remove ops with same namespace, regardless of order
			for (i = q.length - 1; i >= 0; i--) {
				task = q[i];

				switch (task.type) {
					case 'init':
						shouldAppend = false; // jshint ignore:line
						// the latest destroy is cancelled out by not doing the init
						// and fallthrough....
					case 'add':
					case 'remove':
						q.splice(i, 1); // remove task
				}
			}
		}

		if (shouldAppend) {
			q.push(newTask);
		}

		return shouldAppend;
	}

});

FC.RenderQueue = RenderQueue;

;;

/* A rectangular panel that is absolutely positioned over other content
------------------------------------------------------------------------------------------------------------------------
Options:
	- className (string)
	- content (HTML string or jQuery element set)
	- parentEl
	- top
	- left
	- right (the x coord of where the right edge should be. not a "CSS" right)
	- autoHide (boolean)
	- show (callback)
	- hide (callback)
*/

var Popover = Class.extend(ListenerMixin, {

	isHidden: true,
	options: null,
	el: null, // the container element for the popover. generated by this object
	margin: 10, // the space required between the popover and the edges of the scroll container


	constructor: function(options) {
		this.options = options || {};
	},


	// Shows the popover on the specified position. Renders it if not already
	show: function() {
		if (this.isHidden) {
			if (!this.el) {
				this.render();
			}
			this.el.show();
			this.position();
			this.isHidden = false;
			this.trigger('show');
		}
	},


	// Hides the popover, through CSS, but does not remove it from the DOM
	hide: function() {
		if (!this.isHidden) {
			this.el.hide();
			this.isHidden = true;
			this.trigger('hide');
		}
	},


	// Creates `this.el` and renders content inside of it
	render: function() {
		var _this = this;
		var options = this.options;

		this.el = $('<div class="fc-popover"/>')
			.addClass(options.className || '')
			.css({
				// position initially to the top left to avoid creating scrollbars
				top: 0,
				left: 0
			})
			.append(options.content)
			.appendTo(options.parentEl);

		// when a click happens on anything inside with a 'fc-close' className, hide the popover
		this.el.on('click', '.fc-close', function() {
			_this.hide();
		});

		if (options.autoHide) {
			this.listenTo($(document), 'mousedown', this.documentMousedown);
		}
	},


	// Triggered when the user clicks *anywhere* in the document, for the autoHide feature
	documentMousedown: function(ev) {
		// only hide the popover if the click happened outside the popover
		if (this.el && !$(ev.target).closest(this.el).length) {
			this.hide();
		}
	},


	// Hides and unregisters any handlers
	removeElement: function() {
		this.hide();

		if (this.el) {
			this.el.remove();
			this.el = null;
		}

		this.stopListeningTo($(document), 'mousedown');
	},


	// Positions the popover optimally, using the top/left/right options
	position: function() {
		var options = this.options;
		var origin = this.el.offsetParent().offset();
		var width = this.el.outerWidth();
		var height = this.el.outerHeight();
		var windowEl = $(window);
		var viewportEl = getScrollParent(this.el);
		var viewportTop;
		var viewportLeft;
		var viewportOffset;
		var top; // the "position" (not "offset") values for the popover
		var left; //

		// compute top and left
		top = options.top || 0;
		if (options.left !== undefined) {
			left = options.left;
		}
		else if (options.right !== undefined) {
			left = options.right - width; // derive the left value from the right value
		}
		else {
			left = 0;
		}

		if (viewportEl.is(window) || viewportEl.is(document)) { // normalize getScrollParent's result
			viewportEl = windowEl;
			viewportTop = 0; // the window is always at the top left
			viewportLeft = 0; // (and .offset() won't work if called here)
		}
		else {
			viewportOffset = viewportEl.offset();
			viewportTop = viewportOffset.top;
			viewportLeft = viewportOffset.left;
		}

		// if the window is scrolled, it causes the visible area to be further down
		viewportTop += windowEl.scrollTop();
		viewportLeft += windowEl.scrollLeft();

		// constrain to the view port. if constrained by two edges, give precedence to top/left
		if (options.viewportConstrain !== false) {
			top = Math.min(top, viewportTop + viewportEl.outerHeight() - height - this.margin);
			top = Math.max(top, viewportTop + this.margin);
			left = Math.min(left, viewportLeft + viewportEl.outerWidth() - width - this.margin);
			left = Math.max(left, viewportLeft + this.margin);
		}

		this.el.css({
			top: top - origin.top,
			left: left - origin.left
		});
	},


	// Triggers a callback. Calls a function in the option hash of the same name.
	// Arguments beyond the first `name` are forwarded on.
	// TODO: better code reuse for this. Repeat code
	trigger: function(name) {
		if (this.options[name]) {
			this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}

});

;;

/*
A cache for the left/right/top/bottom/width/height values for one or more elements.
Works with both offset (from topleft document) and position (from offsetParent).

options:
- els
- isHorizontal
- isVertical
*/
var CoordCache = FC.CoordCache = Class.extend({

	els: null, // jQuery set (assumed to be siblings)
	forcedOffsetParentEl: null, // options can override the natural offsetParent
	origin: null, // {left,top} position of offsetParent of els
	boundingRect: null, // constrain cordinates to this rectangle. {left,right,top,bottom} or null
	isHorizontal: false, // whether to query for left/right/width
	isVertical: false, // whether to query for top/bottom/height

	// arrays of coordinates (offsets from topleft of document)
	lefts: null,
	rights: null,
	tops: null,
	bottoms: null,


	constructor: function(options) {
		this.els = $(options.els);
		this.isHorizontal = options.isHorizontal;
		this.isVertical = options.isVertical;
		this.forcedOffsetParentEl = options.offsetParent ? $(options.offsetParent) : null;
	},


	// Queries the els for coordinates and stores them.
	// Call this method before using and of the get* methods below.
	build: function() {
		var offsetParentEl = this.forcedOffsetParentEl;
		if (!offsetParentEl && this.els.length > 0) {
			offsetParentEl = this.els.eq(0).offsetParent();
		}

		this.origin = offsetParentEl ?
			offsetParentEl.offset() :
			null;

		this.boundingRect = this.queryBoundingRect();

		if (this.isHorizontal) {
			this.buildElHorizontals();
		}
		if (this.isVertical) {
			this.buildElVerticals();
		}
	},


	// Destroys all internal data about coordinates, freeing memory
	clear: function() {
		this.origin = null;
		this.boundingRect = null;
		this.lefts = null;
		this.rights = null;
		this.tops = null;
		this.bottoms = null;
	},


	// When called, if coord caches aren't built, builds them
	ensureBuilt: function() {
		if (!this.origin) {
			this.build();
		}
	},


	// Populates the left/right internal coordinate arrays
	buildElHorizontals: function() {
		var lefts = [];
		var rights = [];

		this.els.each(function(i, node) {
			var el = $(node);
			var left = el.offset().left;
			var width = el.outerWidth();

			lefts.push(left);
			rights.push(left + width);
		});

		this.lefts = lefts;
		this.rights = rights;
	},


	// Populates the top/bottom internal coordinate arrays
	buildElVerticals: function() {
		var tops = [];
		var bottoms = [];

		this.els.each(function(i, node) {
			var el = $(node);
			var top = el.offset().top;
			var height = el.outerHeight();

			tops.push(top);
			bottoms.push(top + height);
		});

		this.tops = tops;
		this.bottoms = bottoms;
	},


	// Given a left offset (from document left), returns the index of the el that it horizontally intersects.
	// If no intersection is made, returns undefined.
	getHorizontalIndex: function(leftOffset) {
		this.ensureBuilt();

		var lefts = this.lefts;
		var rights = this.rights;
		var len = lefts.length;
		var i;

		for (i = 0; i < len; i++) {
			if (leftOffset >= lefts[i] && leftOffset < rights[i]) {
				return i;
			}
		}
	},


	// Given a top offset (from document top), returns the index of the el that it vertically intersects.
	// If no intersection is made, returns undefined.
	getVerticalIndex: function(topOffset) {
		this.ensureBuilt();

		var tops = this.tops;
		var bottoms = this.bottoms;
		var len = tops.length;
		var i;

		for (i = 0; i < len; i++) {
			if (topOffset >= tops[i] && topOffset < bottoms[i]) {
				return i;
			}
		}
	},


	// Gets the left offset (from document left) of the element at the given index
	getLeftOffset: function(leftIndex) {
		this.ensureBuilt();
		return this.lefts[leftIndex];
	},


	// Gets the left position (from offsetParent left) of the element at the given index
	getLeftPosition: function(leftIndex) {
		this.ensureBuilt();
		return this.lefts[leftIndex] - this.origin.left;
	},


	// Gets the right offset (from document left) of the element at the given index.
	// This value is NOT relative to the document's right edge, like the CSS concept of "right" would be.
	getRightOffset: function(leftIndex) {
		this.ensureBuilt();
		return this.rights[leftIndex];
	},


	// Gets the right position (from offsetParent left) of the element at the given index.
	// This value is NOT relative to the offsetParent's right edge, like the CSS concept of "right" would be.
	getRightPosition: function(leftIndex) {
		this.ensureBuilt();
		return this.rights[leftIndex] - this.origin.left;
	},


	// Gets the width of the element at the given index
	getWidth: function(leftIndex) {
		this.ensureBuilt();
		return this.rights[leftIndex] - this.lefts[leftIndex];
	},


	// Gets the top offset (from document top) of the element at the given index
	getTopOffset: function(topIndex) {
		this.ensureBuilt();
		return this.tops[topIndex];
	},


	// Gets the top position (from offsetParent top) of the element at the given position
	getTopPosition: function(topIndex) {
		this.ensureBuilt();
		return this.tops[topIndex] - this.origin.top;
	},

	// Gets the bottom offset (from the document top) of the element at the given index.
	// This value is NOT relative to the offsetParent's bottom edge, like the CSS concept of "bottom" would be.
	getBottomOffset: function(topIndex) {
		this.ensureBuilt();
		return this.bottoms[topIndex];
	},


	// Gets the bottom position (from the offsetParent top) of the element at the given index.
	// This value is NOT relative to the offsetParent's bottom edge, like the CSS concept of "bottom" would be.
	getBottomPosition: function(topIndex) {
		this.ensureBuilt();
		return this.bottoms[topIndex] - this.origin.top;
	},


	// Gets the height of the element at the given index
	getHeight: function(topIndex) {
		this.ensureBuilt();
		return this.bottoms[topIndex] - this.tops[topIndex];
	},


	// Bounding Rect
	// TODO: decouple this from CoordCache

	// Compute and return what the elements' bounding rectangle is, from the user's perspective.
	// Right now, only returns a rectangle if constrained by an overflow:scroll element.
	// Returns null if there are no elements
	queryBoundingRect: function() {
		var scrollParentEl;

		if (this.els.length > 0) {
			scrollParentEl = getScrollParent(this.els.eq(0));

			if (!scrollParentEl.is(document)) {
				return getClientRect(scrollParentEl);
			}
		}

		return null;
	},

	isPointInBounds: function(leftOffset, topOffset) {
		return this.isLeftInBounds(leftOffset) && this.isTopInBounds(topOffset);
	},

	isLeftInBounds: function(leftOffset) {
		return !this.boundingRect || (leftOffset >= this.boundingRect.left && leftOffset < this.boundingRect.right);
	},

	isTopInBounds: function(topOffset) {
		return !this.boundingRect || (topOffset >= this.boundingRect.top && topOffset < this.boundingRect.bottom);
	}

});

;;

/* Tracks a drag's mouse movement, firing various handlers
----------------------------------------------------------------------------------------------------------------------*/
// TODO: use Emitter

var DragListener = FC.DragListener = Class.extend(ListenerMixin, {

	options: null,
	subjectEl: null,

	// coordinates of the initial mousedown
	originX: null,
	originY: null,

	// the wrapping element that scrolls, or MIGHT scroll if there's overflow.
	// TODO: do this for wrappers that have overflow:hidden as well.
	scrollEl: null,

	isInteracting: false,
	isDistanceSurpassed: false,
	isDelayEnded: false,
	isDragging: false,
	isTouch: false,
	isGeneric: false, // initiated by 'dragstart' (jqui)

	delay: null,
	delayTimeoutId: null,
	minDistance: null,

	shouldCancelTouchScroll: true,
	scrollAlwaysKills: false,


	constructor: function(options) {
		this.options = options || {};
	},


	// Interaction (high-level)
	// -----------------------------------------------------------------------------------------------------------------


	startInteraction: function(ev, extraOptions) {

		if (ev.type === 'mousedown') {
			if (GlobalEmitter.get().shouldIgnoreMouse()) {
				return;
			}
			else if (!isPrimaryMouseButton(ev)) {
				return;
			}
			else {
				ev.preventDefault(); // prevents native selection in most browsers
			}
		}

		if (!this.isInteracting) {

			// process options
			extraOptions = extraOptions || {};
			this.delay = firstDefined(extraOptions.delay, this.options.delay, 0);
			this.minDistance = firstDefined(extraOptions.distance, this.options.distance, 0);
			this.subjectEl = this.options.subjectEl;

			preventSelection($('body'));

			this.isInteracting = true;
			this.isTouch = getEvIsTouch(ev);
			this.isGeneric = ev.type === 'dragstart';
			this.isDelayEnded = false;
			this.isDistanceSurpassed = false;

			this.originX = getEvX(ev);
			this.originY = getEvY(ev);
			this.scrollEl = getScrollParent($(ev.target));

			this.bindHandlers();
			this.initAutoScroll();
			this.handleInteractionStart(ev);
			this.startDelay(ev);

			if (!this.minDistance) {
				this.handleDistanceSurpassed(ev);
			}
		}
	},


	handleInteractionStart: function(ev) {
		this.trigger('interactionStart', ev);
	},


	endInteraction: function(ev, isCancelled) {
		if (this.isInteracting) {
			this.endDrag(ev);

			if (this.delayTimeoutId) {
				clearTimeout(this.delayTimeoutId);
				this.delayTimeoutId = null;
			}

			this.destroyAutoScroll();
			this.unbindHandlers();

			this.isInteracting = false;
			this.handleInteractionEnd(ev, isCancelled);

			allowSelection($('body'));
		}
	},


	handleInteractionEnd: function(ev, isCancelled) {
		this.trigger('interactionEnd', ev, isCancelled || false);
	},


	// Binding To DOM
	// -----------------------------------------------------------------------------------------------------------------


	bindHandlers: function() {
		// some browsers (Safari in iOS 10) don't allow preventDefault on touch events that are bound after touchstart,
		// so listen to the GlobalEmitter singleton, which is always bound, instead of the document directly.
		var globalEmitter = GlobalEmitter.get();

		if (this.isGeneric) {
			this.listenTo($(document), { // might only work on iOS because of GlobalEmitter's bind :(
				drag: this.handleMove,
				dragstop: this.endInteraction
			});
		}
		else if (this.isTouch) {
			this.listenTo(globalEmitter, {
				touchmove: this.handleTouchMove,
				touchend: this.endInteraction,
				scroll: this.handleTouchScroll
			});
		}
		else {
			this.listenTo(globalEmitter, {
				mousemove: this.handleMouseMove,
				mouseup: this.endInteraction
			});
		}

		this.listenTo(globalEmitter, {
			selectstart: preventDefault, // don't allow selection while dragging
			contextmenu: preventDefault // long taps would open menu on Chrome dev tools
		});
	},


	unbindHandlers: function() {
		this.stopListeningTo(GlobalEmitter.get());
		this.stopListeningTo($(document)); // for isGeneric
	},


	// Drag (high-level)
	// -----------------------------------------------------------------------------------------------------------------


	// extraOptions ignored if drag already started
	startDrag: function(ev, extraOptions) {
		this.startInteraction(ev, extraOptions); // ensure interaction began

		if (!this.isDragging) {
			this.isDragging = true;
			this.handleDragStart(ev);
		}
	},


	handleDragStart: function(ev) {
		this.trigger('dragStart', ev);
	},


	handleMove: function(ev) {
		var dx = getEvX(ev) - this.originX;
		var dy = getEvY(ev) - this.originY;
		var minDistance = this.minDistance;
		var distanceSq; // current distance from the origin, squared

		if (!this.isDistanceSurpassed) {
			distanceSq = dx * dx + dy * dy;
			if (distanceSq >= minDistance * minDistance) { // use pythagorean theorem
				this.handleDistanceSurpassed(ev);
			}
		}

		if (this.isDragging) {
			this.handleDrag(dx, dy, ev);
		}
	},


	// Called while the mouse is being moved and when we know a legitimate drag is taking place
	handleDrag: function(dx, dy, ev) {
		this.trigger('drag', dx, dy, ev);
		this.updateAutoScroll(ev); // will possibly cause scrolling
	},


	endDrag: function(ev) {
		if (this.isDragging) {
			this.isDragging = false;
			this.handleDragEnd(ev);
		}
	},


	handleDragEnd: function(ev) {
		this.trigger('dragEnd', ev);
	},


	// Delay
	// -----------------------------------------------------------------------------------------------------------------


	startDelay: function(initialEv) {
		var _this = this;

		if (this.delay) {
			this.delayTimeoutId = setTimeout(function() {
				_this.handleDelayEnd(initialEv);
			}, this.delay);
		}
		else {
			this.handleDelayEnd(initialEv);
		}
	},


	handleDelayEnd: function(initialEv) {
		this.isDelayEnded = true;

		if (this.isDistanceSurpassed) {
			this.startDrag(initialEv);
		}
	},


	// Distance
	// -----------------------------------------------------------------------------------------------------------------


	handleDistanceSurpassed: function(ev) {
		this.isDistanceSurpassed = true;

		if (this.isDelayEnded) {
			this.startDrag(ev);
		}
	},


	// Mouse / Touch
	// -----------------------------------------------------------------------------------------------------------------


	handleTouchMove: function(ev) {

		// prevent inertia and touchmove-scrolling while dragging
		if (this.isDragging && this.shouldCancelTouchScroll) {
			ev.preventDefault();
		}

		this.handleMove(ev);
	},


	handleMouseMove: function(ev) {
		this.handleMove(ev);
	},


	// Scrolling (unrelated to auto-scroll)
	// -----------------------------------------------------------------------------------------------------------------


	handleTouchScroll: function(ev) {
		// if the drag is being initiated by touch, but a scroll happens before
		// the drag-initiating delay is over, cancel the drag
		if (!this.isDragging || this.scrollAlwaysKills) {
			this.endInteraction(ev, true); // isCancelled=true
		}
	},


	// Utils
	// -----------------------------------------------------------------------------------------------------------------


	// Triggers a callback. Calls a function in the option hash of the same name.
	// Arguments beyond the first `name` are forwarded on.
	trigger: function(name) {
		if (this.options[name]) {
			this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		// makes _methods callable by event name. TODO: kill this
		if (this['_' + name]) {
			this['_' + name].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}


});

;;
/*
this.scrollEl is set in DragListener
*/
DragListener.mixin({

	isAutoScroll: false,

	scrollBounds: null, // { top, bottom, left, right }
	scrollTopVel: null, // pixels per second
	scrollLeftVel: null, // pixels per second
	scrollIntervalId: null, // ID of setTimeout for scrolling animation loop

	// defaults
	scrollSensitivity: 30, // pixels from edge for scrolling to start
	scrollSpeed: 200, // pixels per second, at maximum speed
	scrollIntervalMs: 50, // millisecond wait between scroll increment


	initAutoScroll: function() {
		var scrollEl = this.scrollEl;

		this.isAutoScroll =
			this.options.scroll &&
			scrollEl &&
			!scrollEl.is(window) &&
			!scrollEl.is(document);

		if (this.isAutoScroll) {
			// debounce makes sure rapid calls don't happen
			this.listenTo(scrollEl, 'scroll', debounce(this.handleDebouncedScroll, 100));
		}
	},


	destroyAutoScroll: function() {
		this.endAutoScroll(); // kill any animation loop

		// remove the scroll handler if there is a scrollEl
		if (this.isAutoScroll) {
			this.stopListeningTo(this.scrollEl, 'scroll'); // will probably get removed by unbindHandlers too :(
		}
	},


	// Computes and stores the bounding rectangle of scrollEl
	computeScrollBounds: function() {
		if (this.isAutoScroll) {
			this.scrollBounds = getOuterRect(this.scrollEl);
			// TODO: use getClientRect in future. but prevents auto scrolling when on top of scrollbars
		}
	},


	// Called when the dragging is in progress and scrolling should be updated
	updateAutoScroll: function(ev) {
		var sensitivity = this.scrollSensitivity;
		var bounds = this.scrollBounds;
		var topCloseness, bottomCloseness;
		var leftCloseness, rightCloseness;
		var topVel = 0;
		var leftVel = 0;

		if (bounds) { // only scroll if scrollEl exists

			// compute closeness to edges. valid range is from 0.0 - 1.0
			topCloseness = (sensitivity - (getEvY(ev) - bounds.top)) / sensitivity;
			bottomCloseness = (sensitivity - (bounds.bottom - getEvY(ev))) / sensitivity;
			leftCloseness = (sensitivity - (getEvX(ev) - bounds.left)) / sensitivity;
			rightCloseness = (sensitivity - (bounds.right - getEvX(ev))) / sensitivity;

			// translate vertical closeness into velocity.
			// mouse must be completely in bounds for velocity to happen.
			if (topCloseness >= 0 && topCloseness <= 1) {
				topVel = topCloseness * this.scrollSpeed * -1; // negative. for scrolling up
			}
			else if (bottomCloseness >= 0 && bottomCloseness <= 1) {
				topVel = bottomCloseness * this.scrollSpeed;
			}

			// translate horizontal closeness into velocity
			if (leftCloseness >= 0 && leftCloseness <= 1) {
				leftVel = leftCloseness * this.scrollSpeed * -1; // negative. for scrolling left
			}
			else if (rightCloseness >= 0 && rightCloseness <= 1) {
				leftVel = rightCloseness * this.scrollSpeed;
			}
		}

		this.setScrollVel(topVel, leftVel);
	},


	// Sets the speed-of-scrolling for the scrollEl
	setScrollVel: function(topVel, leftVel) {

		this.scrollTopVel = topVel;
		this.scrollLeftVel = leftVel;

		this.constrainScrollVel(); // massages into realistic values

		// if there is non-zero velocity, and an animation loop hasn't already started, then START
		if ((this.scrollTopVel || this.scrollLeftVel) && !this.scrollIntervalId) {
			this.scrollIntervalId = setInterval(
				proxy(this, 'scrollIntervalFunc'), // scope to `this`
				this.scrollIntervalMs
			);
		}
	},


	// Forces scrollTopVel and scrollLeftVel to be zero if scrolling has already gone all the way
	constrainScrollVel: function() {
		var el = this.scrollEl;

		if (this.scrollTopVel < 0) { // scrolling up?
			if (el.scrollTop() <= 0) { // already scrolled all the way up?
				this.scrollTopVel = 0;
			}
		}
		else if (this.scrollTopVel > 0) { // scrolling down?
			if (el.scrollTop() + el[0].clientHeight >= el[0].scrollHeight) { // already scrolled all the way down?
				this.scrollTopVel = 0;
			}
		}

		if (this.scrollLeftVel < 0) { // scrolling left?
			if (el.scrollLeft() <= 0) { // already scrolled all the left?
				this.scrollLeftVel = 0;
			}
		}
		else if (this.scrollLeftVel > 0) { // scrolling right?
			if (el.scrollLeft() + el[0].clientWidth >= el[0].scrollWidth) { // already scrolled all the way right?
				this.scrollLeftVel = 0;
			}
		}
	},


	// This function gets called during every iteration of the scrolling animation loop
	scrollIntervalFunc: function() {
		var el = this.scrollEl;
		var frac = this.scrollIntervalMs / 1000; // considering animation frequency, what the vel should be mult'd by

		// change the value of scrollEl's scroll
		if (this.scrollTopVel) {
			el.scrollTop(el.scrollTop() + this.scrollTopVel * frac);
		}
		if (this.scrollLeftVel) {
			el.scrollLeft(el.scrollLeft() + this.scrollLeftVel * frac);
		}

		this.constrainScrollVel(); // since the scroll values changed, recompute the velocities

		// if scrolled all the way, which causes the vels to be zero, stop the animation loop
		if (!this.scrollTopVel && !this.scrollLeftVel) {
			this.endAutoScroll();
		}
	},


	// Kills any existing scrolling animation loop
	endAutoScroll: function() {
		if (this.scrollIntervalId) {
			clearInterval(this.scrollIntervalId);
			this.scrollIntervalId = null;

			this.handleScrollEnd();
		}
	},


	// Get called when the scrollEl is scrolled (NOTE: this is delayed via debounce)
	handleDebouncedScroll: function() {
		// recompute all coordinates, but *only* if this is *not* part of our scrolling animation
		if (!this.scrollIntervalId) {
			this.handleScrollEnd();
		}
	},


	// Called when scrolling has stopped, whether through auto scroll, or the user scrolling
	handleScrollEnd: function() {
	}

});
;;

/* Tracks mouse movements over a component and raises events about which hit the mouse is over.
------------------------------------------------------------------------------------------------------------------------
options:
- subjectEl
- subjectCenter
*/

var HitDragListener = DragListener.extend({

	component: null, // converts coordinates to hits
		// methods: hitsNeeded, hitsNotNeeded, queryHit

	origHit: null, // the hit the mouse was over when listening started
	hit: null, // the hit the mouse is over
	coordAdjust: null, // delta that will be added to the mouse coordinates when computing collisions


	constructor: function(component, options) {
		DragListener.call(this, options); // call the super-constructor

		this.component = component;
	},


	// Called when drag listening starts (but a real drag has not necessarily began).
	// ev might be undefined if dragging was started manually.
	handleInteractionStart: function(ev) {
		var subjectEl = this.subjectEl;
		var subjectRect;
		var origPoint;
		var point;

		this.component.hitsNeeded();
		this.computeScrollBounds(); // for autoscroll

		if (ev) {
			origPoint = { left: getEvX(ev), top: getEvY(ev) };
			point = origPoint;

			// constrain the point to bounds of the element being dragged
			if (subjectEl) {
				subjectRect = getOuterRect(subjectEl); // used for centering as well
				point = constrainPoint(point, subjectRect);
			}

			this.origHit = this.queryHit(point.left, point.top);

			// treat the center of the subject as the collision point?
			if (subjectEl && this.options.subjectCenter) {

				// only consider the area the subject overlaps the hit. best for large subjects.
				// TODO: skip this if hit didn't supply left/right/top/bottom
				if (this.origHit) {
					subjectRect = intersectRects(this.origHit, subjectRect) ||
						subjectRect; // in case there is no intersection
				}

				point = getRectCenter(subjectRect);
			}

			this.coordAdjust = diffPoints(point, origPoint); // point - origPoint
		}
		else {
			this.origHit = null;
			this.coordAdjust = null;
		}

		// call the super-method. do it after origHit has been computed
		DragListener.prototype.handleInteractionStart.apply(this, arguments);
	},


	// Called when the actual drag has started
	handleDragStart: function(ev) {
		var hit;

		DragListener.prototype.handleDragStart.apply(this, arguments); // call the super-method

		// might be different from this.origHit if the min-distance is large
		hit = this.queryHit(getEvX(ev), getEvY(ev));

		// report the initial hit the mouse is over
		// especially important if no min-distance and drag starts immediately
		if (hit) {
			this.handleHitOver(hit);
		}
	},


	// Called when the drag moves
	handleDrag: function(dx, dy, ev) {
		var hit;

		DragListener.prototype.handleDrag.apply(this, arguments); // call the super-method

		hit = this.queryHit(getEvX(ev), getEvY(ev));

		if (!isHitsEqual(hit, this.hit)) { // a different hit than before?
			if (this.hit) {
				this.handleHitOut();
			}
			if (hit) {
				this.handleHitOver(hit);
			}
		}
	},


	// Called when dragging has been stopped
	handleDragEnd: function() {
		this.handleHitDone();
		DragListener.prototype.handleDragEnd.apply(this, arguments); // call the super-method
	},


	// Called when a the mouse has just moved over a new hit
	handleHitOver: function(hit) {
		var isOrig = isHitsEqual(hit, this.origHit);

		this.hit = hit;

		this.trigger('hitOver', this.hit, isOrig, this.origHit);
	},


	// Called when the mouse has just moved out of a hit
	handleHitOut: function() {
		if (this.hit) {
			this.trigger('hitOut', this.hit);
			this.handleHitDone();
			this.hit = null;
		}
	},


	// Called after a hitOut. Also called before a dragStop
	handleHitDone: function() {
		if (this.hit) {
			this.trigger('hitDone', this.hit);
		}
	},


	// Called when the interaction ends, whether there was a real drag or not
	handleInteractionEnd: function() {
		DragListener.prototype.handleInteractionEnd.apply(this, arguments); // call the super-method

		this.origHit = null;
		this.hit = null;

		this.component.hitsNotNeeded();
	},


	// Called when scrolling has stopped, whether through auto scroll, or the user scrolling
	handleScrollEnd: function() {
		DragListener.prototype.handleScrollEnd.apply(this, arguments); // call the super-method

		// hits' absolute positions will be in new places after a user's scroll.
		// HACK for recomputing.
		if (this.isDragging) {
			this.component.releaseHits();
			this.component.prepareHits();
		}
	},


	// Gets the hit underneath the coordinates for the given mouse event
	queryHit: function(left, top) {

		if (this.coordAdjust) {
			left += this.coordAdjust.left;
			top += this.coordAdjust.top;
		}

		return this.component.queryHit(left, top);
	}

});


// Returns `true` if the hits are identically equal. `false` otherwise. Must be from the same component.
// Two null values will be considered equal, as two "out of the component" states are the same.
function isHitsEqual(hit0, hit1) {

	if (!hit0 && !hit1) {
		return true;
	}

	if (hit0 && hit1) {
		return hit0.component === hit1.component &&
			isHitPropsWithin(hit0, hit1) &&
			isHitPropsWithin(hit1, hit0); // ensures all props are identical
	}

	return false;
}


// Returns true if all of subHit's non-standard properties are within superHit
function isHitPropsWithin(subHit, superHit) {
	for (var propName in subHit) {
		if (!/^(component|left|right|top|bottom)$/.test(propName)) {
			if (subHit[propName] !== superHit[propName]) {
				return false;
			}
		}
	}
	return true;
}

;;

/*
Listens to document and window-level user-interaction events, like touch events and mouse events,
and fires these events as-is to whoever is observing a GlobalEmitter.
Best when used as a singleton via GlobalEmitter.get()

Normalizes mouse/touch events. For examples:
- ignores the the simulated mouse events that happen after a quick tap: mousemove+mousedown+mouseup+click
- compensates for various buggy scenarios where a touchend does not fire
*/

FC.touchMouseIgnoreWait = 500;

var GlobalEmitter = Class.extend(ListenerMixin, EmitterMixin, {

	isTouching: false,
	mouseIgnoreDepth: 0,
	handleScrollProxy: null,


	bind: function() {
		var _this = this;

		this.listenTo($(document), {
			touchstart: this.handleTouchStart,
			touchcancel: this.handleTouchCancel,
			touchend: this.handleTouchEnd,
			mousedown: this.handleMouseDown,
			mousemove: this.handleMouseMove,
			mouseup: this.handleMouseUp,
			click: this.handleClick,
			selectstart: this.handleSelectStart,
			contextmenu: this.handleContextMenu
		});

		// because we need to call preventDefault
		// because https://www.chromestatus.com/features/5093566007214080
		// TODO: investigate performance because this is a global handler
		window.addEventListener(
			'touchmove',
			this.handleTouchMoveProxy = function(ev) {
				_this.handleTouchMove($.Event(ev));
			},
			{ passive: false } // allows preventDefault()
		);

		// attach a handler to get called when ANY scroll action happens on the page.
		// this was impossible to do with normal on/off because 'scroll' doesn't bubble.
		// http://stackoverflow.com/a/32954565/96342
		window.addEventListener(
			'scroll',
			this.handleScrollProxy = function(ev) {
				_this.handleScroll($.Event(ev));
			},
			true // useCapture
		);
	},

	unbind: function() {
		this.stopListeningTo($(document));

		window.removeEventListener(
			'touchmove',
			this.handleTouchMoveProxy
		);

		window.removeEventListener(
			'scroll',
			this.handleScrollProxy,
			true // useCapture
		);
	},


	// Touch Handlers
	// -----------------------------------------------------------------------------------------------------------------

	handleTouchStart: function(ev) {

		// if a previous touch interaction never ended with a touchend, then implicitly end it,
		// but since a new touch interaction is about to begin, don't start the mouse ignore period.
		this.stopTouch(ev, true); // skipMouseIgnore=true

		this.isTouching = true;
		this.trigger('touchstart', ev);
	},

	handleTouchMove: function(ev) {
		if (this.isTouching) {
			this.trigger('touchmove', ev);
		}
	},

	handleTouchCancel: function(ev) {
		if (this.isTouching) {
			this.trigger('touchcancel', ev);

			// Have touchcancel fire an artificial touchend. That way, handlers won't need to listen to both.
			// If touchend fires later, it won't have any effect b/c isTouching will be false.
			this.stopTouch(ev);
		}
	},

	handleTouchEnd: function(ev) {
		this.stopTouch(ev);
	},


	// Mouse Handlers
	// -----------------------------------------------------------------------------------------------------------------

	handleMouseDown: function(ev) {
		if (!this.shouldIgnoreMouse()) {
			this.trigger('mousedown', ev);
		}
	},

	handleMouseMove: function(ev) {
		if (!this.shouldIgnoreMouse()) {
			this.trigger('mousemove', ev);
		}
	},

	handleMouseUp: function(ev) {
		if (!this.shouldIgnoreMouse()) {
			this.trigger('mouseup', ev);
		}
	},

	handleClick: function(ev) {
		if (!this.shouldIgnoreMouse()) {
			this.trigger('click', ev);
		}
	},


	// Misc Handlers
	// -----------------------------------------------------------------------------------------------------------------

	handleSelectStart: function(ev) {
		this.trigger('selectstart', ev);
	},

	handleContextMenu: function(ev) {
		this.trigger('contextmenu', ev);
	},

	handleScroll: function(ev) {
		this.trigger('scroll', ev);
	},


	// Utils
	// -----------------------------------------------------------------------------------------------------------------

	stopTouch: function(ev, skipMouseIgnore) {
		if (this.isTouching) {
			this.isTouching = false;
			this.trigger('touchend', ev);

			if (!skipMouseIgnore) {
				this.startTouchMouseIgnore();
			}
		}
	},

	startTouchMouseIgnore: function() {
		var _this = this;
		var wait = FC.touchMouseIgnoreWait;

		if (wait) {
			this.mouseIgnoreDepth++;
			setTimeout(function() {
				_this.mouseIgnoreDepth--;
			}, wait);
		}
	},

	shouldIgnoreMouse: function() {
		return this.isTouching || Boolean(this.mouseIgnoreDepth);
	}

});


// Singleton
// ---------------------------------------------------------------------------------------------------------------------

(function() {
	var globalEmitter = null;
	var neededCount = 0;


	// gets the singleton
	GlobalEmitter.get = function() {

		if (!globalEmitter) {
			globalEmitter = new GlobalEmitter();
			globalEmitter.bind();
		}

		return globalEmitter;
	};


	// called when an object knows it will need a GlobalEmitter in the near future.
	GlobalEmitter.needed = function() {
		GlobalEmitter.get(); // ensures globalEmitter
		neededCount++;
	};


	// called when the object that originally called needed() doesn't need a GlobalEmitter anymore.
	GlobalEmitter.unneeded = function() {
		neededCount--;

		if (!neededCount) { // nobody else needs it
			globalEmitter.unbind();
			globalEmitter = null;
		}
	};

})();

;;

/* Creates a clone of an element and lets it track the mouse as it moves
----------------------------------------------------------------------------------------------------------------------*/

var MouseFollower = Class.extend(ListenerMixin, {

	options: null,

	sourceEl: null, // the element that will be cloned and made to look like it is dragging
	el: null, // the clone of `sourceEl` that will track the mouse
	parentEl: null, // the element that `el` (the clone) will be attached to

	// the initial position of el, relative to the offset parent. made to match the initial offset of sourceEl
	top0: null,
	left0: null,

	// the absolute coordinates of the initiating touch/mouse action
	y0: null,
	x0: null,

	// the number of pixels the mouse has moved from its initial position
	topDelta: null,
	leftDelta: null,

	isFollowing: false,
	isHidden: false,
	isAnimating: false, // doing the revert animation?

	constructor: function(sourceEl, options) {
		this.options = options = options || {};
		this.sourceEl = sourceEl;
		this.parentEl = options.parentEl ? $(options.parentEl) : sourceEl.parent(); // default to sourceEl's parent
	},


	// Causes the element to start following the mouse
	start: function(ev) {
		if (!this.isFollowing) {
			this.isFollowing = true;

			this.y0 = getEvY(ev);
			this.x0 = getEvX(ev);
			this.topDelta = 0;
			this.leftDelta = 0;

			if (!this.isHidden) {
				this.updatePosition();
			}

			if (getEvIsTouch(ev)) {
				this.listenTo($(document), 'touchmove', this.handleMove);
			}
			else {
				this.listenTo($(document), 'mousemove', this.handleMove);
			}
		}
	},


	// Causes the element to stop following the mouse. If shouldRevert is true, will animate back to original position.
	// `callback` gets invoked when the animation is complete. If no animation, it is invoked immediately.
	stop: function(shouldRevert, callback) {
		var _this = this;
		var revertDuration = this.options.revertDuration;

		function complete() { // might be called by .animate(), which might change `this` context
			_this.isAnimating = false;
			_this.removeElement();

			_this.top0 = _this.left0 = null; // reset state for future updatePosition calls

			if (callback) {
				callback();
			}
		}

		if (this.isFollowing && !this.isAnimating) { // disallow more than one stop animation at a time
			this.isFollowing = false;

			this.stopListeningTo($(document));

			if (shouldRevert && revertDuration && !this.isHidden) { // do a revert animation?
				this.isAnimating = true;
				this.el.animate({
					top: this.top0,
					left: this.left0
				}, {
					duration: revertDuration,
					complete: complete
				});
			}
			else {
				complete();
			}
		}
	},


	// Gets the tracking element. Create it if necessary
	getEl: function() {
		var el = this.el;

		if (!el) {
			el = this.el = this.sourceEl.clone()
				.addClass(this.options.additionalClass || '')
				.css({
					position: 'absolute',
					visibility: '', // in case original element was hidden (commonly through hideEvents())
					display: this.isHidden ? 'none' : '', // for when initially hidden
					margin: 0,
					right: 'auto', // erase and set width instead
					bottom: 'auto', // erase and set height instead
					width: this.sourceEl.width(), // explicit height in case there was a 'right' value
					height: this.sourceEl.height(), // explicit width in case there was a 'bottom' value
					opacity: this.options.opacity || '',
					zIndex: this.options.zIndex
				});

			// we don't want long taps or any mouse interaction causing selection/menus.
			// would use preventSelection(), but that prevents selectstart, causing problems.
			el.addClass('fc-unselectable');

			el.appendTo(this.parentEl);
		}

		return el;
	},


	// Removes the tracking element if it has already been created
	removeElement: function() {
		if (this.el) {
			this.el.remove();
			this.el = null;
		}
	},


	// Update the CSS position of the tracking element
	updatePosition: function() {
		var sourceOffset;
		var origin;

		this.getEl(); // ensure this.el

		// make sure origin info was computed
		if (this.top0 === null) {
			sourceOffset = this.sourceEl.offset();
			origin = this.el.offsetParent().offset();
			this.top0 = sourceOffset.top - origin.top;
			this.left0 = sourceOffset.left - origin.left;
		}

		this.el.css({
			top: this.top0 + this.topDelta,
			left: this.left0 + this.leftDelta
		});
	},


	// Gets called when the user moves the mouse
	handleMove: function(ev) {
		this.topDelta = getEvY(ev) - this.y0;
		this.leftDelta = getEvX(ev) - this.x0;

		if (!this.isHidden) {
			this.updatePosition();
		}
	},


	// Temporarily makes the tracking element invisible. Can be called before following starts
	hide: function() {
		if (!this.isHidden) {
			this.isHidden = true;
			if (this.el) {
				this.el.hide();
			}
		}
	},


	// Show the tracking element after it has been temporarily hidden
	show: function() {
		if (this.isHidden) {
			this.isHidden = false;
			this.updatePosition();
			this.getEl().show();
		}
	}

});

;;

/*
Embodies a div that has potential scrollbars
*/
var Scroller = FC.Scroller = Class.extend({

	el: null, // the guaranteed outer element
	scrollEl: null, // the element with the scrollbars
	overflowX: null,
	overflowY: null,


	constructor: function(options) {
		options = options || {};
		this.overflowX = options.overflowX || options.overflow || 'auto';
		this.overflowY = options.overflowY || options.overflow || 'auto';
	},


	render: function() {
		this.el = this.renderEl();
		this.applyOverflow();
	},


	renderEl: function() {
		return (this.scrollEl = $('<div class="fc-scroller"></div>'));
	},


	// sets to natural height, unlocks overflow
	clear: function() {
		this.setHeight('auto');
		this.applyOverflow();
	},


	destroy: function() {
		this.el.remove();
	},


	// Overflow
	// -----------------------------------------------------------------------------------------------------------------


	applyOverflow: function() {
		this.scrollEl.css({
			'overflow-x': this.overflowX,
			'overflow-y': this.overflowY
		});
	},


	// Causes any 'auto' overflow values to resolves to 'scroll' or 'hidden'.
	// Useful for preserving scrollbar widths regardless of future resizes.
	// Can pass in scrollbarWidths for optimization.
	lockOverflow: function(scrollbarWidths) {
		var overflowX = this.overflowX;
		var overflowY = this.overflowY;

		scrollbarWidths = scrollbarWidths || this.getScrollbarWidths();

		if (overflowX === 'auto') {
			overflowX = (
					scrollbarWidths.top || scrollbarWidths.bottom || // horizontal scrollbars?
					// OR scrolling pane with massless scrollbars?
					this.scrollEl[0].scrollWidth - 1 > this.scrollEl[0].clientWidth
						// subtract 1 because of IE off-by-one issue
				) ? 'scroll' : 'hidden';
		}

		if (overflowY === 'auto') {
			overflowY = (
					scrollbarWidths.left || scrollbarWidths.right || // vertical scrollbars?
					// OR scrolling pane with massless scrollbars?
					this.scrollEl[0].scrollHeight - 1 > this.scrollEl[0].clientHeight
						// subtract 1 because of IE off-by-one issue
				) ? 'scroll' : 'hidden';
		}

		this.scrollEl.css({ 'overflow-x': overflowX, 'overflow-y': overflowY });
	},


	// Getters / Setters
	// -----------------------------------------------------------------------------------------------------------------


	setHeight: function(height) {
		this.scrollEl.height(height);
	},


	getScrollTop: function() {
		return this.scrollEl.scrollTop();
	},


	setScrollTop: function(top) {
		this.scrollEl.scrollTop(top);
	},


	getClientWidth: function() {
		return this.scrollEl[0].clientWidth;
	},


	getClientHeight: function() {
		return this.scrollEl[0].clientHeight;
	},


	getScrollbarWidths: function() {
		return getScrollbarWidths(this.scrollEl);
	}

});

;;
function Iterator(items) {
    this.items = items || [];
}


/* Calls a method on every item passing the arguments through */
Iterator.prototype.proxyCall = function(methodName) {
    var args = Array.prototype.slice.call(arguments, 1);
    var results = [];

    this.items.forEach(function(item) {
        results.push(item[methodName].apply(item, args));
    });

    return results;
};

;;

var Interaction = Class.extend({

	view: null,
	component: null,


	constructor: function(component) {
		this.view = component._getView();
		this.component = component;
	},


	opt: function(name) {
		return this.view.opt(name);
	},


	end: function() {
		// subclasses can implement
	}

});

;;

var DateClicking = Interaction.extend({

	dragListener: null,


	/*
	component must implement:
		- bindDateHandlerToEl
		- getSafeHitFootprint
		- getHitEl
	*/
	constructor: function(component) {
		Interaction.call(this, component);

		this.dragListener = this.buildDragListener();
	},


	end: function() {
		this.dragListener.endInteraction();
	},


	bindToEl: function(el) {
		var component = this.component;
		var dragListener = this.dragListener;

		component.bindDateHandlerToEl(el, 'mousedown', function(ev) {
			if (!component.shouldIgnoreMouse()) {
				dragListener.startInteraction(ev);
			}
		});

		component.bindDateHandlerToEl(el, 'touchstart', function(ev) {
			if (!component.shouldIgnoreTouch()) {
				dragListener.startInteraction(ev);
			}
		});
	},


	// Creates a listener that tracks the user's drag across day elements, for day clicking.
	buildDragListener: function() {
		var _this = this;
		var component = this.component;
		var dayClickHit; // null if invalid dayClick

		var dragListener = new HitDragListener(component, {
			scroll: this.opt('dragScroll'),
			interactionStart: function() {
				dayClickHit = dragListener.origHit;
			},
			hitOver: function(hit, isOrig, origHit) {
				// if user dragged to another cell at any point, it can no longer be a dayClick
				if (!isOrig) {
					dayClickHit = null;
				}
			},
			hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
				dayClickHit = null;
			},
			interactionEnd: function(ev, isCancelled) {
				var componentFootprint;

				if (!isCancelled && dayClickHit) {
					componentFootprint = component.getSafeHitFootprint(dayClickHit);

					if (componentFootprint) {
						_this.view.triggerDayClick(componentFootprint, component.getHitEl(dayClickHit), ev);
					}
				}
			}
		});

		// because dragListener won't be called with any time delay, "dragging" will begin immediately,
		// which will kill any touchmoving/scrolling. Prevent this.
		dragListener.shouldCancelTouchScroll = false;

		dragListener.scrollAlwaysKills = true;

		return dragListener;
	}

});

;;

var DateSelecting = FC.DateSelecting = Interaction.extend({

	dragListener: null,


	/*
	component must implement:
		- bindDateHandlerToEl
		- getSafeHitFootprint
		- renderHighlight
		- unrenderHighlight
	*/
	constructor: function(component) {
		Interaction.call(this, component);

		this.dragListener = this.buildDragListener();
	},


	end: function() {
		this.dragListener.endInteraction();
	},


	getDelay: function() {
		var delay = this.opt('selectLongPressDelay');

		if (delay == null) {
			delay = this.opt('longPressDelay'); // fallback
		}

		return delay;
	},


	bindToEl: function(el) {
		var _this = this;
		var component = this.component;
		var dragListener = this.dragListener;

		component.bindDateHandlerToEl(el, 'mousedown', function(ev) {
			if (_this.opt('selectable') && !component.shouldIgnoreMouse()) {
				dragListener.startInteraction(ev, {
					distance: _this.opt('selectMinDistance')
				});
			}
		});

		component.bindDateHandlerToEl(el, 'touchstart', function(ev) {
			if (_this.opt('selectable') && !component.shouldIgnoreTouch()) {
				dragListener.startInteraction(ev, {
					delay: _this.getDelay()
				});
			}
		});

		preventSelection(el);
	},


	// Creates a listener that tracks the user's drag across day elements, for day selecting.
	buildDragListener: function() {
		var _this = this;
		var component = this.component;
		var selectionFootprint; // null if invalid selection

		var dragListener = new HitDragListener(component, {
			scroll: this.opt('dragScroll'),
			interactionStart: function() {
				selectionFootprint = null;
			},
			dragStart: function(ev) {
				_this.view.unselect(ev); // since we could be rendering a new selection, we want to clear any old one
			},
			hitOver: function(hit, isOrig, origHit) {
				var origHitFootprint;
				var hitFootprint;

				if (origHit) { // click needs to have started on a hit

					origHitFootprint = component.getSafeHitFootprint(origHit);
					hitFootprint = component.getSafeHitFootprint(hit);

					if (origHitFootprint && hitFootprint) {
						selectionFootprint = _this.computeSelection(origHitFootprint, hitFootprint);
					}
					else {
						selectionFootprint = null;
					}

					if (selectionFootprint) {
						component.renderSelectionFootprint(selectionFootprint);
					}
					else if (selectionFootprint === false) {
						disableCursor();
					}
				}
			},
			hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
				selectionFootprint = null;
				component.unrenderSelection();
			},
			hitDone: function() { // called after a hitOut OR before a dragEnd
				enableCursor();
			},
			interactionEnd: function(ev, isCancelled) {
				if (!isCancelled && selectionFootprint) {
					// the selection will already have been rendered. just report it
					_this.view.reportSelection(selectionFootprint, ev);
				}
			}
		});

		return dragListener;
	},


	// Given the first and last date-spans of a selection, returns another date-span object.
	// Subclasses can override and provide additional data in the span object. Will be passed to renderSelectionFootprint().
	// Will return false if the selection is invalid and this should be indicated to the user.
	// Will return null/undefined if a selection invalid but no error should be reported.
	computeSelection: function(footprint0, footprint1) {
		var wholeFootprint = this.computeSelectionFootprint(footprint0, footprint1);

		if (wholeFootprint && !this.isSelectionFootprintAllowed(wholeFootprint)) {
			return false;
		}

		return wholeFootprint;
	},


	// Given two spans, must return the combination of the two.
	// TODO: do this separation of concerns (combining VS validation) for event dnd/resize too.
	// Assumes both footprints are non-open-ended.
	computeSelectionFootprint: function(footprint0, footprint1) {
		var ms = [
			footprint0.unzonedRange.startMs,
			footprint0.unzonedRange.endMs,
			footprint1.unzonedRange.startMs,
			footprint1.unzonedRange.endMs
		];

		ms.sort(compareNumbers);

		return new ComponentFootprint(
			new UnzonedRange(ms[0], ms[3]),
			footprint0.isAllDay
		);
	},


	isSelectionFootprintAllowed: function(componentFootprint) {
		return this.component.dateProfile.validUnzonedRange.containsRange(componentFootprint.unzonedRange) &&
			this.view.calendar.isSelectionFootprintAllowed(componentFootprint);
	}

});

;;

var EventDragging = FC.EventDragging = Interaction.extend({

	eventPointing: null,
	dragListener: null,
	isDragging: false,


	/*
	component implements:
		- bindSegHandlerToEl
		- publiclyTrigger
		- diffDates
		- eventRangesToEventFootprints
		- isEventInstanceGroupAllowed
	*/
	constructor: function(component, eventPointing) {
		Interaction.call(this, component);

		this.eventPointing = eventPointing;
	},


	end: function() {
		if (this.dragListener) {
			this.dragListener.endInteraction();
		}
	},


	getSelectionDelay: function() {
		var delay = this.opt('eventLongPressDelay');

		if (delay == null) {
			delay = this.opt('longPressDelay'); // fallback
		}

		return delay;
	},


	bindToEl: function(el) {
		var component = this.component;

		component.bindSegHandlerToEl(el, 'mousedown', this.handleMousedown.bind(this));
		component.bindSegHandlerToEl(el, 'touchstart', this.handleTouchStart.bind(this));
	},


	handleMousedown: function(seg, ev) {
		if (this.component.canStartDrag(seg, ev)) {
			this.buildDragListener(seg).startInteraction(ev, { distance: 5 });
		}
	},


	handleTouchStart: function(seg, ev) {
		var component = this.component;
		var settings = {
			delay: this.view.isEventDefSelected(seg.footprint.eventDef) ? // already selected?
				0 : this.getSelectionDelay()
		};

		if (component.canStartDrag(seg, ev)) {
			this.buildDragListener(seg).startInteraction(ev, settings);
		}
		else if (component.canStartSelection(seg, ev)) {
			this.buildSelectListener(seg).startInteraction(ev, settings);
		}
	},


	// seg isn't draggable, but let's use a generic DragListener
	// simply for the delay, so it can be selected.
	// Has side effect of setting/unsetting `dragListener`
	buildSelectListener: function(seg) {
		var _this = this;
		var view = this.view;
		var eventDef = seg.footprint.eventDef;
		var eventInstance = seg.footprint.eventInstance; // null for inverse-background events

		if (this.dragListener) {
			return this.dragListener;
		}

		var dragListener = this.dragListener = new DragListener({
			dragStart: function(ev) {
				if (
					dragListener.isTouch &&
					!view.isEventDefSelected(eventDef) &&
					eventInstance
				) {
					// if not previously selected, will fire after a delay. then, select the event
					view.selectEventInstance(eventInstance);
				}
			},
			interactionEnd: function(ev) {
				_this.dragListener = null;
			}
		});

		return dragListener;
	},


	// Builds a listener that will track user-dragging on an event segment.
	// Generic enough to work with any type of Grid.
	// Has side effect of setting/unsetting `dragListener`
	buildDragListener: function(seg) {
		var _this = this;
		var component = this.component;
		var view = this.view;
		var calendar = view.calendar;
		var eventManager = calendar.eventManager;
		var el = seg.el;
		var eventDef = seg.footprint.eventDef;
		var eventInstance = seg.footprint.eventInstance; // null for inverse-background events
		var isDragging;
		var mouseFollower; // A clone of the original element that will move with the mouse
		var eventDefMutation;

		if (this.dragListener) {
			return this.dragListener;
		}

		// Tracks mouse movement over the *view's* coordinate map. Allows dragging and dropping between subcomponents
		// of the view.
		var dragListener = this.dragListener = new HitDragListener(view, {
			scroll: this.opt('dragScroll'),
			subjectEl: el,
			subjectCenter: true,
			interactionStart: function(ev) {
				seg.component = component; // for renderDrag
				isDragging = false;
				mouseFollower = new MouseFollower(seg.el, {
					additionalClass: 'fc-dragging',
					parentEl: view.el,
					opacity: dragListener.isTouch ? null : _this.opt('dragOpacity'),
					revertDuration: _this.opt('dragRevertDuration'),
					zIndex: 2 // one above the .fc-view
				});
				mouseFollower.hide(); // don't show until we know this is a real drag
				mouseFollower.start(ev);
			},
			dragStart: function(ev) {
				if (
					dragListener.isTouch &&
					!view.isEventDefSelected(eventDef) &&
					eventInstance
				) {
					// if not previously selected, will fire after a delay. then, select the event
					view.selectEventInstance(eventInstance);
				}
				isDragging = true;

				// ensure a mouseout on the manipulated event has been reported
				_this.eventPointing.handleMouseout(seg, ev);

				_this.segDragStart(seg, ev);
				view.hideEventsWithId(seg.footprint.eventDef.id);
			},
			hitOver: function(hit, isOrig, origHit) {
				var isAllowed = true;
				var origFootprint;
				var footprint;
				var mutatedEventInstanceGroup;

				// starting hit could be forced (DayGrid.limit)
				if (seg.hit) {
					origHit = seg.hit;
				}

				// hit might not belong to this grid, so query origin grid
				origFootprint = origHit.component.getSafeHitFootprint(origHit);
				footprint = hit.component.getSafeHitFootprint(hit);

				if (origFootprint && footprint) {
					eventDefMutation = _this.computeEventDropMutation(origFootprint, footprint, eventDef);

					if (eventDefMutation) {
						mutatedEventInstanceGroup = eventManager.buildMutatedEventInstanceGroup(
							eventDef.id,
							eventDefMutation
						);
						isAllowed = component.isEventInstanceGroupAllowed(mutatedEventInstanceGroup);
					}
					else {
						isAllowed = false;
					}
				}
				else {
					isAllowed = false;
				}

				if (!isAllowed) {
					eventDefMutation = null;
					disableCursor();
				}

				// if a valid drop location, have the subclass render a visual indication
				if (
					eventDefMutation &&
					view.renderDrag( // truthy if rendered something
						component.eventRangesToEventFootprints(
							mutatedEventInstanceGroup.sliceRenderRanges(component.dateProfile.renderUnzonedRange, calendar)
						),
						seg,
						dragListener.isTouch
					)
				) {
					mouseFollower.hide(); // if the subclass is already using a mock event "helper", hide our own
				}
				else {
					mouseFollower.show(); // otherwise, have the helper follow the mouse (no snapping)
				}

				if (isOrig) {
					// needs to have moved hits to be a valid drop
					eventDefMutation = null;
				}
			},
			hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
				view.unrenderDrag(seg); // unrender whatever was done in renderDrag
				mouseFollower.show(); // show in case we are moving out of all hits
				eventDefMutation = null;
			},
			hitDone: function() { // Called after a hitOut OR before a dragEnd
				enableCursor();
			},
			interactionEnd: function(ev) {
				delete seg.component; // prevent side effects

				// do revert animation if hasn't changed. calls a callback when finished (whether animation or not)
				mouseFollower.stop(!eventDefMutation, function() {
					if (isDragging) {
						view.unrenderDrag(seg);
						_this.segDragStop(seg, ev);
					}

					view.showEventsWithId(seg.footprint.eventDef.id);

					if (eventDefMutation) {
						// no need to re-show original, will rerender all anyways. esp important if eventRenderWait
						view.reportEventDrop(eventInstance, eventDefMutation, el, ev);
					}
				});

				_this.dragListener = null;
			}
		});

		return dragListener;
	},


	// Called before event segment dragging starts
	segDragStart: function(seg, ev) {
		this.isDragging = true;
		this.component.publiclyTrigger('eventDragStart', {
			context: seg.el[0],
			args: [
				seg.footprint.getEventLegacy(),
				ev,
				{}, // jqui dummy
				this.view
			]
		});
	},


	// Called after event segment dragging stops
	segDragStop: function(seg, ev) {
		this.isDragging = false;
		this.component.publiclyTrigger('eventDragStop', {
			context: seg.el[0],
			args: [
				seg.footprint.getEventLegacy(),
				ev,
				{}, // jqui dummy
				this.view
			]
		});
	},


	// DOES NOT consider overlap/constraint
	computeEventDropMutation: function(startFootprint, endFootprint, eventDef) {
		var eventDefMutation = new EventDefMutation();

		eventDefMutation.setDateMutation(
			this.computeEventDateMutation(startFootprint, endFootprint)
		);

		return eventDefMutation;
	},


	computeEventDateMutation: function(startFootprint, endFootprint) {
		var date0 = startFootprint.unzonedRange.getStart();
		var date1 = endFootprint.unzonedRange.getStart();
		var clearEnd = false;
		var forceTimed = false;
		var forceAllDay = false;
		var dateDelta;
		var dateMutation;

		if (startFootprint.isAllDay !== endFootprint.isAllDay) {
			clearEnd = true;

			if (endFootprint.isAllDay) {
				forceAllDay = true;
				date0.stripTime();
			}
			else {
				forceTimed = true;
			}
		}

		dateDelta = this.component.diffDates(date1, date0);

		dateMutation = new EventDefDateMutation();
		dateMutation.clearEnd = clearEnd;
		dateMutation.forceTimed = forceTimed;
		dateMutation.forceAllDay = forceAllDay;
		dateMutation.setDateDelta(dateDelta);

		return dateMutation;
	}

});

;;

var EventResizing = FC.EventResizing = Interaction.extend({

	eventPointing: null,
	dragListener: null,
	isResizing: false,


	/*
	component impements:
		- bindSegHandlerToEl
		- publiclyTrigger
		- diffDates
		- eventRangesToEventFootprints
		- isEventInstanceGroupAllowed
		- getSafeHitFootprint
	*/


	constructor: function(component, eventPointing) {
		Interaction.call(this, component);

		this.eventPointing = eventPointing;
	},


	end: function() {
		if (this.dragListener) {
			this.dragListener.endInteraction();
		}
	},


	bindToEl: function(el) {
		var component = this.component;

		component.bindSegHandlerToEl(el, 'mousedown', this.handleMouseDown.bind(this));
		component.bindSegHandlerToEl(el, 'touchstart', this.handleTouchStart.bind(this));
	},


	handleMouseDown: function(seg, ev) {
		if (this.component.canStartResize(seg, ev)) {
			this.buildDragListener(seg, $(ev.target).is('.fc-start-resizer'))
				.startInteraction(ev, { distance: 5 });
		}
	},


	handleTouchStart: function(seg, ev) {
		if (this.component.canStartResize(seg, ev)) {
			this.buildDragListener(seg, $(ev.target).is('.fc-start-resizer'))
				.startInteraction(ev);
		}
	},


	// Creates a listener that tracks the user as they resize an event segment.
	// Generic enough to work with any type of Grid.
	buildDragListener: function(seg, isStart) {
		var _this = this;
		var component = this.component;
		var view = this.view;
		var calendar = view.calendar;
		var eventManager = calendar.eventManager;
		var el = seg.el;
		var eventDef = seg.footprint.eventDef;
		var eventInstance = seg.footprint.eventInstance;
		var isDragging;
		var resizeMutation; // zoned event date properties. falsy if invalid resize

		// Tracks mouse movement over the *grid's* coordinate map
		var dragListener = this.dragListener = new HitDragListener(component, {
			scroll: this.opt('dragScroll'),
			subjectEl: el,
			interactionStart: function() {
				isDragging = false;
			},
			dragStart: function(ev) {
				isDragging = true;

				// ensure a mouseout on the manipulated event has been reported
				_this.eventPointing.handleMouseout(seg, ev);

				_this.segResizeStart(seg, ev);
			},
			hitOver: function(hit, isOrig, origHit) {
				var isAllowed = true;
				var origHitFootprint = component.getSafeHitFootprint(origHit);
				var hitFootprint = component.getSafeHitFootprint(hit);
				var mutatedEventInstanceGroup;

				if (origHitFootprint && hitFootprint) {
					resizeMutation = isStart ?
						_this.computeEventStartResizeMutation(origHitFootprint, hitFootprint, seg.footprint) :
						_this.computeEventEndResizeMutation(origHitFootprint, hitFootprint, seg.footprint);

					if (resizeMutation) {
						mutatedEventInstanceGroup = eventManager.buildMutatedEventInstanceGroup(
							eventDef.id,
							resizeMutation
						);
						isAllowed = component.isEventInstanceGroupAllowed(mutatedEventInstanceGroup);
					}
					else {
						isAllowed = false;
					}
				}
				else {
					isAllowed = false;
				}

				if (!isAllowed) {
					resizeMutation = null;
					disableCursor();
				}
				else if (resizeMutation.isEmpty()) {
					// no change. (FYI, event dates might have zones)
					resizeMutation = null;
				}

				if (resizeMutation) {
					view.hideEventsWithId(seg.footprint.eventDef.id);
					view.renderEventResize(
						component.eventRangesToEventFootprints(
							mutatedEventInstanceGroup.sliceRenderRanges(component.dateProfile.renderUnzonedRange, calendar)
						),
						seg
					);
				}
			},
			hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
				resizeMutation = null;
			},
			hitDone: function() { // resets the rendering to show the original event
				view.unrenderEventResize(seg);
				view.showEventsWithId(seg.footprint.eventDef.id);
				enableCursor();
			},
			interactionEnd: function(ev) {
				if (isDragging) {
					_this.segResizeStop(seg, ev);
				}

				if (resizeMutation) { // valid date to resize to?
					// no need to re-show original, will rerender all anyways. esp important if eventRenderWait
					view.reportEventResize(eventInstance, resizeMutation, el, ev);
				}

				_this.dragListener = null;
			}
		});

		return dragListener;
	},


	// Called before event segment resizing starts
	segResizeStart: function(seg, ev) {
		this.isResizing = true;
		this.component.publiclyTrigger('eventResizeStart', {
			context: seg.el[0],
			args: [
				seg.footprint.getEventLegacy(),
				ev,
				{}, // jqui dummy
				this.view
			]
		});
	},


	// Called after event segment resizing stops
	segResizeStop: function(seg, ev) {
		this.isResizing = false;
		this.component.publiclyTrigger('eventResizeStop', {
			context: seg.el[0],
			args: [
				seg.footprint.getEventLegacy(),
				ev,
				{}, // jqui dummy
				this.view
			]
		});
	},


	// Returns new date-information for an event segment being resized from its start
	computeEventStartResizeMutation: function(startFootprint, endFootprint, origEventFootprint) {
		var origRange = origEventFootprint.componentFootprint.unzonedRange;
		var startDelta = this.component.diffDates(
			endFootprint.unzonedRange.getStart(),
			startFootprint.unzonedRange.getStart()
		);
		var dateMutation;
		var eventDefMutation;

		if (origRange.getStart().add(startDelta) < origRange.getEnd()) {

			dateMutation = new EventDefDateMutation();
			dateMutation.setStartDelta(startDelta);

			eventDefMutation = new EventDefMutation();
			eventDefMutation.setDateMutation(dateMutation);

			return eventDefMutation;
		}

		return false;
	},


	// Returns new date-information for an event segment being resized from its end
	computeEventEndResizeMutation: function(startFootprint, endFootprint, origEventFootprint) {
		var origRange = origEventFootprint.componentFootprint.unzonedRange;
		var endDelta = this.component.diffDates(
			endFootprint.unzonedRange.getEnd(),
			startFootprint.unzonedRange.getEnd()
		);
		var dateMutation;
		var eventDefMutation;

		if (origRange.getEnd().add(endDelta) > origRange.getStart()) {

			dateMutation = new EventDefDateMutation();
			dateMutation.setEndDelta(endDelta);

			eventDefMutation = new EventDefMutation();
			eventDefMutation.setDateMutation(dateMutation);

			return eventDefMutation;
		}

		return false;
	}

});

;;

var ExternalDropping = FC.ExternalDropping = Interaction.extend(ListenerMixin, {

	dragListener: null,
	isDragging: false, // jqui-dragging an external element? boolean


	/*
	component impements:
		- eventRangesToEventFootprints
		- isEventInstanceGroupAllowed
		- isExternalInstanceGroupAllowed
		- renderDrag
		- unrenderDrag
	*/


	end: function() {
		if (this.dragListener) {
			this.dragListener.endInteraction();
		}
	},


	bindToDocument: function() {
		this.listenTo($(document), {
			dragstart: this.handleDragStart, // jqui
			sortstart: this.handleDragStart // jqui
		});
	},


	unbindFromDocument: function() {
		this.stopListeningTo($(document));
	},


	// Called when a jQuery UI drag is initiated anywhere in the DOM
	handleDragStart: function(ev, ui) {
		var el;
		var accept;

		if (this.opt('droppable')) { // only listen if this setting is on
			el = $((ui ? ui.item : null) || ev.target);

			// Test that the dragged element passes the dropAccept selector or filter function.
			// FYI, the default is "*" (matches all)
			accept = this.opt('dropAccept');
			if ($.isFunction(accept) ? accept.call(el[0], el) : el.is(accept)) {
				if (!this.isDragging) { // prevent double-listening if fired twice
					this.listenToExternalDrag(el, ev, ui);
				}
			}
		}
	},


	// Called when a jQuery UI drag starts and it needs to be monitored for dropping
	listenToExternalDrag: function(el, ev, ui) {
		var _this = this;
		var component = this.component;
		var view = this.view;
		var meta = getDraggedElMeta(el); // extra data about event drop, including possible event to create
		var singleEventDef; // a null value signals an unsuccessful drag

		// listener that tracks mouse movement over date-associated pixel regions
		var dragListener = _this.dragListener = new HitDragListener(component, {
			interactionStart: function() {
				_this.isDragging = true;
			},
			hitOver: function(hit) {
				var isAllowed = true;
				var hitFootprint = hit.component.getSafeHitFootprint(hit); // hit might not belong to this grid
				var mutatedEventInstanceGroup;

				if (hitFootprint) {
					singleEventDef = _this.computeExternalDrop(hitFootprint, meta);

					if (singleEventDef) {
						mutatedEventInstanceGroup = new EventInstanceGroup(
							singleEventDef.buildInstances()
						);
						isAllowed = meta.eventProps ? // isEvent?
							component.isEventInstanceGroupAllowed(mutatedEventInstanceGroup) :
							component.isExternalInstanceGroupAllowed(mutatedEventInstanceGroup);
					}
					else {
						isAllowed = false;
					}
				}
				else {
					isAllowed = false;
				}

				if (!isAllowed) {
					singleEventDef = null;
					disableCursor();
				}

				if (singleEventDef) {
					component.renderDrag( // called without a seg parameter
						component.eventRangesToEventFootprints(
							mutatedEventInstanceGroup.sliceRenderRanges(component.dateProfile.renderUnzonedRange, view.calendar)
						)
					);
				}
			},
			hitOut: function() {
				singleEventDef = null; // signal unsuccessful
			},
			hitDone: function() { // Called after a hitOut OR before a dragEnd
				enableCursor();
				component.unrenderDrag();
			},
			interactionEnd: function(ev) {

				if (singleEventDef) { // element was dropped on a valid hit
					view.reportExternalDrop(
						singleEventDef,
						Boolean(meta.eventProps), // isEvent
						Boolean(meta.stick), // isSticky
						el, ev, ui
					);
				}

				_this.isDragging = false;
				_this.dragListener = null;
			}
		});

		dragListener.startDrag(ev); // start listening immediately
	},


	// Given a hit to be dropped upon, and misc data associated with the jqui drag (guaranteed to be a plain object),
	// returns the zoned start/end dates for the event that would result from the hypothetical drop. end might be null.
	// Returning a null value signals an invalid drop hit.
	// DOES NOT consider overlap/constraint.
	// Assumes both footprints are non-open-ended.
	computeExternalDrop: function(componentFootprint, meta) {
		var calendar = this.view.calendar;
		var start = FC.moment.utc(componentFootprint.unzonedRange.startMs).stripZone();
		var end;
		var eventDef;

		if (componentFootprint.isAllDay) {
			// if dropped on an all-day span, and element's metadata specified a time, set it
			if (meta.startTime) {
				start.time(meta.startTime);
			}
			else {
				start.stripTime();
			}
		}

		if (meta.duration) {
			end = start.clone().add(meta.duration);
		}

		start = calendar.applyTimezone(start);

		if (end) {
			end = calendar.applyTimezone(end);
		}

		eventDef = SingleEventDef.parse(
			$.extend({}, meta.eventProps, {
				start: start,
				end: end
			}),
			new EventSource(calendar)
		);

		return eventDef;
	}

});


/* External-Dragging-Element Data
----------------------------------------------------------------------------------------------------------------------*/

// Require all HTML5 data-* attributes used by FullCalendar to have this prefix.
// A value of '' will query attributes like data-event. A value of 'fc' will query attributes like data-fc-event.
FC.dataAttrPrefix = '';

// Given a jQuery element that might represent a dragged FullCalendar event, returns an intermediate data structure
// to be used for Event Object creation.
// A defined `.eventProps`, even when empty, indicates that an event should be created.
function getDraggedElMeta(el) {
	var prefix = FC.dataAttrPrefix;
	var eventProps; // properties for creating the event, not related to date/time
	var startTime; // a Duration
	var duration;
	var stick;

	if (prefix) { prefix += '-'; }
	eventProps = el.data(prefix + 'event') || null;

	if (eventProps) {
		if (typeof eventProps === 'object') {
			eventProps = $.extend({}, eventProps); // make a copy
		}
		else { // something like 1 or true. still signal event creation
			eventProps = {};
		}

		// pluck special-cased date/time properties
		startTime = eventProps.start;
		if (startTime == null) { startTime = eventProps.time; } // accept 'time' as well
		duration = eventProps.duration;
		stick = eventProps.stick;
		delete eventProps.start;
		delete eventProps.time;
		delete eventProps.duration;
		delete eventProps.stick;
	}

	// fallback to standalone attribute values for each of the date/time properties
	if (startTime == null) { startTime = el.data(prefix + 'start'); }
	if (startTime == null) { startTime = el.data(prefix + 'time'); } // accept 'time' as well
	if (duration == null) { duration = el.data(prefix + 'duration'); }
	if (stick == null) { stick = el.data(prefix + 'stick'); }

	// massage into correct data types
	startTime = startTime != null ? moment.duration(startTime) : null;
	duration = duration != null ? moment.duration(duration) : null;
	stick = Boolean(stick);

	return { eventProps: eventProps, startTime: startTime, duration: duration, stick: stick };
}

;;

var EventPointing = FC.EventPointing = Interaction.extend({

	mousedOverSeg: null, // the segment object the user's mouse is over. null if over nothing


	/*
	component must implement:
		- publiclyTrigger
	*/


	bindToEl: function(el) {
		var component = this.component;

		component.bindSegHandlerToEl(el, 'click', this.handleClick.bind(this));
		component.bindSegHandlerToEl(el, 'mouseenter', this.handleMouseover.bind(this));
		component.bindSegHandlerToEl(el, 'mouseleave', this.handleMouseout.bind(this));
	},


	handleClick: function(seg, ev) {
		var res = this.component.publiclyTrigger('eventClick', { // can return `false` to cancel
			context: seg.el[0],
			args: [ seg.footprint.getEventLegacy(), ev, this.view ]
		});

		if (res === false) {
			ev.preventDefault();
		}
	},


	// Updates internal state and triggers handlers for when an event element is moused over
	handleMouseover: function(seg, ev) {
		if (
			!GlobalEmitter.get().shouldIgnoreMouse() &&
			!this.mousedOverSeg
		) {
			this.mousedOverSeg = seg;

			// TODO: move to EventSelecting's responsibility
			if (this.view.isEventDefResizable(seg.footprint.eventDef)) {
				seg.el.addClass('fc-allow-mouse-resize');
			}

			this.component.publiclyTrigger('eventMouseover', {
				context: seg.el[0],
				args: [ seg.footprint.getEventLegacy(), ev, this.view ]
			});
		}
	},


	// Updates internal state and triggers handlers for when an event element is moused out.
	// Can be given no arguments, in which case it will mouseout the segment that was previously moused over.
	handleMouseout: function(seg, ev) {
		if (this.mousedOverSeg) {
			this.mousedOverSeg = null;

			// TODO: move to EventSelecting's responsibility
			if (this.view.isEventDefResizable(seg.footprint.eventDef)) {
				seg.el.removeClass('fc-allow-mouse-resize');
			}

			this.component.publiclyTrigger('eventMouseout', {
				context: seg.el[0],
				args: [
					seg.footprint.getEventLegacy(),
					ev || {}, // if given no arg, make a mock mouse event
					this.view
				]
			});
		}
	},


	end: function() {
		if (this.mousedOverSeg) {
			this.handleMouseout(this.mousedOverSeg);
		}
	}

});

;;

var StandardInteractionsMixin = FC.StandardInteractionsMixin = {
	dateClickingClass: DateClicking,
	dateSelectingClass: DateSelecting,
	eventPointingClass: EventPointing,
	eventDraggingClass: EventDragging,
	eventResizingClass: EventResizing,
	externalDroppingClass: ExternalDropping
};

;;

var EventRenderer = FC.EventRenderer = Class.extend({

	view: null,
	component: null,
	fillRenderer: null, // might remain null

	fgSegs: null,
	bgSegs: null,

	// derived from options
	eventTimeFormat: null,
	displayEventTime: null,
	displayEventEnd: null,


	constructor: function(component, fillRenderer) { // fillRenderer is optional
		this.view = component._getView();
		this.component = component;
		this.fillRenderer = fillRenderer;
	},


	opt: function(name) {
		return this.view.opt(name);
	},


	// Updates values that rely on options and also relate to range
	rangeUpdated: function() {
		var displayEventTime;
		var displayEventEnd;

		this.eventTimeFormat =
			this.opt('eventTimeFormat') ||
			this.opt('timeFormat') || // deprecated
			this.computeEventTimeFormat();

		displayEventTime = this.opt('displayEventTime');
		if (displayEventTime == null) {
			displayEventTime = this.computeDisplayEventTime(); // might be based off of range
		}

		displayEventEnd = this.opt('displayEventEnd');
		if (displayEventEnd == null) {
			displayEventEnd = this.computeDisplayEventEnd(); // might be based off of range
		}

		this.displayEventTime = displayEventTime;
		this.displayEventEnd = displayEventEnd;
	},


	render: function(eventsPayload) {
		var dateProfile = this.component._getDateProfile();
		var eventDefId;
		var instanceGroup;
		var eventRanges;
		var bgRanges = [];
		var fgRanges = [];

		for (eventDefId in eventsPayload) {
			instanceGroup = eventsPayload[eventDefId];

			eventRanges = instanceGroup.sliceRenderRanges(
				dateProfile.activeUnzonedRange
			);

			if (instanceGroup.getEventDef().hasBgRendering()) {
				bgRanges.push.apply(bgRanges, eventRanges);
			}
			else {
				fgRanges.push.apply(fgRanges, eventRanges);
			}
		}

		this.renderBgRanges(bgRanges);
		this.renderFgRanges(fgRanges);
	},


	unrender: function() {
		this.unrenderBgRanges();
		this.unrenderFgRanges();
	},


	renderFgRanges: function(eventRanges) {
		var eventFootprints = this.component.eventRangesToEventFootprints(eventRanges);
		var segs = this.component.eventFootprintsToSegs(eventFootprints);

		// render an `.el` on each seg
		// returns a subset of the segs. segs that were actually rendered
		segs = this.renderFgSegEls(segs);

		if (this.renderFgSegs(segs) !== false) { // no failure?
			this.fgSegs = segs;
		}
	},


	unrenderFgRanges: function() {
		this.unrenderFgSegs(this.fgSegs || []);
		this.fgSegs = null;
	},


	renderBgRanges: function(eventRanges) {
		var eventFootprints = this.component.eventRangesToEventFootprints(eventRanges);
		var segs = this.component.eventFootprintsToSegs(eventFootprints);

		if (this.renderBgSegs(segs) !== false) { // no failure?
			this.bgSegs = segs;
		}
	},


	unrenderBgRanges: function() {
		this.unrenderBgSegs();
		this.bgSegs = null;
	},


	getSegs: function() {
		return (this.bgSegs || []).concat(this.fgSegs || []);
	},


	// Renders foreground event segments onto the grid
	renderFgSegs: function(segs) {
		// subclasses must implement
		// segs already has rendered els, and has been filtered.

		return false; // signal failure if not implemented
	},


	// Unrenders all currently rendered foreground segments
	unrenderFgSegs: function(segs) {
		// subclasses must implement
	},


	renderBgSegs: function(segs) {
		var _this = this;

		if (this.fillRenderer) {
			this.fillRenderer.renderSegs('bgEvent', segs, {
				getClasses: function(seg) {
					return _this.getBgClasses(seg.footprint.eventDef);
				},
				getCss: function(seg) {
					return {
						'background-color': _this.getBgColor(seg.footprint.eventDef)
					};
				},
				filterEl: function(seg, el) {
					return _this.filterEventRenderEl(seg.footprint, el);
				}
			});
		}
		else {
			return false; // signal failure if no fillRenderer
		}
	},


	unrenderBgSegs: function() {
		if (this.fillRenderer) {
			this.fillRenderer.unrender('bgEvent');
		}
	},


	// Renders and assigns an `el` property for each foreground event segment.
	// Only returns segments that successfully rendered.
	renderFgSegEls: function(segs, disableResizing) {
		var _this = this;
		var hasEventRenderHandlers = this.view.hasPublicHandlers('eventRender');
		var html = '';
		var renderedSegs = [];
		var i;

		if (segs.length) { // don't build an empty html string

			// build a large concatenation of event segment HTML
			for (i = 0; i < segs.length; i++) {
				this.beforeFgSegHtml(segs[i]);
				html += this.fgSegHtml(segs[i], disableResizing);
			}

			// Grab individual elements from the combined HTML string. Use each as the default rendering.
			// Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
			$(html).each(function(i, node) {
				var seg = segs[i];
				var el = $(node);

				if (hasEventRenderHandlers) { // optimization
					el = _this.filterEventRenderEl(seg.footprint, el);
				}

				if (el) {
					el.data('fc-seg', seg); // used by handlers
					seg.el = el;
					renderedSegs.push(seg);
				}
			});
		}

		return renderedSegs;
	},


	beforeFgSegHtml: function(seg) { // hack
	},


	// Generates the HTML for the default rendering of a foreground event segment. Used by renderFgSegEls()
	fgSegHtml: function(seg, disableResizing) {
		// subclasses should implement
	},


	// Generic utility for generating the HTML classNames for an event segment's element
	getSegClasses: function(seg, isDraggable, isResizable) {
		var classes = [
			'fc-event',
			seg.isStart ? 'fc-start' : 'fc-not-start',
			seg.isEnd ? 'fc-end' : 'fc-not-end'
		].concat(this.getClasses(seg.footprint.eventDef));

		if (isDraggable) {
			classes.push('fc-draggable');
		}
		if (isResizable) {
			classes.push('fc-resizable');
		}

		// event is currently selected? attach a className.
		if (this.view.isEventDefSelected(seg.footprint.eventDef)) {
			classes.push('fc-selected');
		}

		return classes;
	},


	// Given an event and the default element used for rendering, returns the element that should actually be used.
	// Basically runs events and elements through the eventRender hook.
	filterEventRenderEl: function(eventFootprint, el) {
		var legacy = eventFootprint.getEventLegacy();

		var custom = this.view.publiclyTrigger('eventRender', {
			context: legacy,
			args: [ legacy, el, this.view ]
		});

		if (custom === false) { // means don't render at all
			el = null;
		}
		else if (custom && custom !== true) {
			el = $(custom);
		}

		return el;
	},


	// Compute the text that should be displayed on an event's element.
	// `range` can be the Event object itself, or something range-like, with at least a `start`.
	// If event times are disabled, or the event has no time, will return a blank string.
	// If not specified, formatStr will default to the eventTimeFormat setting,
	// and displayEnd will default to the displayEventEnd setting.
	getTimeText: function(eventFootprint, formatStr, displayEnd) {
		return this._getTimeText(
			eventFootprint.eventInstance.dateProfile.start,
			eventFootprint.eventInstance.dateProfile.end,
			eventFootprint.componentFootprint.isAllDay,
			formatStr,
			displayEnd
		);
	},


	_getTimeText: function(start, end, isAllDay, formatStr, displayEnd) {
		if (formatStr == null) {
			formatStr = this.eventTimeFormat;
		}

		if (displayEnd == null) {
			displayEnd = this.displayEventEnd;
		}

		if (this.displayEventTime && !isAllDay) {
			if (displayEnd && end) {
				return this.view.formatRange(
					{ start: start, end: end },
					false, // allDay
					formatStr
				);
			}
			else {
				return start.format(formatStr);
			}
		}

		return '';
	},


	computeEventTimeFormat: function() {
		return this.opt('smallTimeFormat');
	},


	computeDisplayEventTime: function() {
		return true;
	},


	computeDisplayEventEnd: function() {
		return true;
	},


	getBgClasses: function(eventDef) {
		var classNames = this.getClasses(eventDef);
		classNames.push('fc-bgevent');
		return classNames;
	},


	getClasses: function(eventDef) {
		var objs = this.getStylingObjs(eventDef);
		var i;
		var classNames = [];

		for (i = 0; i < objs.length; i++) {
			classNames.push.apply( // append
				classNames,
				objs[i].eventClassName || objs[i].className || []
			);
		}

		return classNames;
	},


	// Utility for generating event skin-related CSS properties
	getSkinCss: function(eventDef) {
		return {
			'background-color': this.getBgColor(eventDef),
			'border-color': this.getBorderColor(eventDef),
			color: this.getTextColor(eventDef)
		};
	},


	// Queries for caller-specified color, then falls back to default
	getBgColor: function(eventDef) {
		var objs = this.getStylingObjs(eventDef);
		var i;
		var val;

		for (i = 0; i < objs.length && !val; i++) {
			val = objs[i].eventBackgroundColor || objs[i].eventColor ||
				objs[i].backgroundColor || objs[i].color;
		}

		if (!val) {
			val = this.opt('eventBackgroundColor') || this.opt('eventColor');
		}

		return val;
	},


	// Queries for caller-specified color, then falls back to default
	getBorderColor: function(eventDef) {
		var objs = this.getStylingObjs(eventDef);
		var i;
		var val;

		for (i = 0; i < objs.length && !val; i++) {
			val = objs[i].eventBorderColor || objs[i].eventColor ||
				objs[i].borderColor || objs[i].color;
		}

		if (!val) {
			val = this.opt('eventBorderColor') || this.opt('eventColor');
		}

		return val;
	},


	// Queries for caller-specified color, then falls back to default
	getTextColor: function(eventDef) {
		var objs = this.getStylingObjs(eventDef);
		var i;
		var val;

		for (i = 0; i < objs.length && !val; i++) {
			val = objs[i].eventTextColor ||
				objs[i].textColor;
		}

		if (!val) {
			val = this.opt('eventTextColor');
		}

		return val;
	},


	getStylingObjs: function(eventDef) {
		var objs = this.getFallbackStylingObjs(eventDef);
		objs.unshift(eventDef);
		return objs;
	},


	getFallbackStylingObjs: function(eventDef) {
		return [ eventDef.source ];
	},


	sortEventSegs: function(segs) {
		segs.sort(proxy(this, 'compareEventSegs'));
	},


	// A cmp function for determining which segments should take visual priority
	compareEventSegs: function(seg1, seg2) {
		var f1 = seg1.footprint.componentFootprint;
		var r1 = f1.unzonedRange;
		var f2 = seg2.footprint.componentFootprint;
		var r2 = f2.unzonedRange;

		return r1.startMs - r2.startMs || // earlier events go first
			(r2.endMs - r2.startMs) - (r1.endMs - r1.startMs) || // tie? longer events go first
			f2.isAllDay - f1.isAllDay || // tie? put all-day events first (booleans cast to 0/1)
			compareByFieldSpecs(
				seg1.footprint.eventDef,
				seg2.footprint.eventDef,
				this.view.eventOrderSpecs
			);
	}

});

;;

var BusinessHourRenderer = FC.BusinessHourRenderer = Class.extend({

	component: null,
	fillRenderer: null,
	segs: null,


	/*
	component implements:
		- eventRangesToEventFootprints
		- eventFootprintsToSegs
	*/
	constructor: function(component, fillRenderer) {
		this.component = component;
		this.fillRenderer = fillRenderer;
	},


	render: function(businessHourGenerator) {
		var component = this.component;
		var unzonedRange = component._getDateProfile().activeUnzonedRange;

		var eventInstanceGroup = businessHourGenerator.buildEventInstanceGroup(
			component.hasAllDayBusinessHours,
			unzonedRange
		);

		var eventFootprints = eventInstanceGroup ?
			component.eventRangesToEventFootprints(
				eventInstanceGroup.sliceRenderRanges(unzonedRange)
			) :
			[];

		this.renderEventFootprints(eventFootprints);
	},


	renderEventFootprints: function(eventFootprints) {
		var segs = this.component.eventFootprintsToSegs(eventFootprints);

		this.renderSegs(segs);
		this.segs = segs;
	},


	renderSegs: function(segs) {
		if (this.fillRenderer) {
			this.fillRenderer.renderSegs('businessHours', segs, {
				getClasses: function(seg) {
					return [ 'fc-nonbusiness', 'fc-bgevent' ];
				}
			});
		}
	},


	unrender: function() {
		if (this.fillRenderer) {
			this.fillRenderer.unrender('businessHours');
		}

		this.segs = null;
	},


	getSegs: function() {
		return this.segs || [];
	}

});

;;

var FillRenderer = FC.FillRenderer = Class.extend({ // use for highlight, background events, business hours

	fillSegTag: 'div',
	component: null,
	elsByFill: null, // a hash of jQuery element sets used for rendering each fill. Keyed by fill name.


	constructor: function(component) {
		this.component = component;
		this.elsByFill = {};
	},


	renderFootprint: function(type, componentFootprint, props) {
		this.renderSegs(
			type,
			this.component.componentFootprintToSegs(componentFootprint),
			props
		);
	},


	renderSegs: function(type, segs, props) {
		var els;

		segs = this.buildSegEls(type, segs, props); // assignes `.el` to each seg. returns successfully rendered segs
		els = this.attachSegEls(type, segs);

		if (els) {
			this.reportEls(type, els);
		}

		return segs;
	},


	// Unrenders a specific type of fill that is currently rendered on the grid
	unrender: function(type) {
		var el = this.elsByFill[type];

		if (el) {
			el.remove();
			delete this.elsByFill[type];
		}
	},


	// Renders and assigns an `el` property for each fill segment. Generic enough to work with different types.
	// Only returns segments that successfully rendered.
	buildSegEls: function(type, segs, props) {
		var _this = this;
		var html = '';
		var renderedSegs = [];
		var i;

		if (segs.length) {

			// build a large concatenation of segment HTML
			for (i = 0; i < segs.length; i++) {
				html += this.buildSegHtml(type, segs[i], props);
			}

			// Grab individual elements from the combined HTML string. Use each as the default rendering.
			// Then, compute the 'el' for each segment.
			$(html).each(function(i, node) {
				var seg = segs[i];
				var el = $(node);

				// allow custom filter methods per-type
				if (props.filterEl) {
					el = props.filterEl(seg, el);
				}

				if (el) { // custom filters did not cancel the render
					el = $(el); // allow custom filter to return raw DOM node

					// correct element type? (would be bad if a non-TD were inserted into a table for example)
					if (el.is(_this.fillSegTag)) {
						seg.el = el;
						renderedSegs.push(seg);
					}
				}
			});
		}

		return renderedSegs;
	},


	// Builds the HTML needed for one fill segment. Generic enough to work with different types.
	buildSegHtml: function(type, seg, props) {
		// custom hooks per-type
		var classes = props.getClasses ? props.getClasses(seg) : [];
		var css = cssToStr(props.getCss ? props.getCss(seg) : {});

		return '<' + this.fillSegTag +
			(classes.length ? ' class="' + classes.join(' ') + '"' : '') +
			(css ? ' style="' + css + '"' : '') +
			' />';
	},


	// Should return wrapping DOM structure
	attachSegEls: function(type, segs) {
		// subclasses must implement
	},


	reportEls: function(type, nodes) {
		if (this.elsByFill[type]) {
			this.elsByFill[type] = this.elsByFill[type].add(nodes);
		}
		else {
			this.elsByFill[type] = $(nodes);
		}
	}

});

;;

var HelperRenderer = FC.HelperRenderer = Class.extend({

	view: null,
	component: null,
	eventRenderer: null,
	helperEls: null,


	constructor: function(component, eventRenderer) {
		this.view = component._getView();
		this.component = component;
		this.eventRenderer = eventRenderer;
	},


	renderComponentFootprint: function(componentFootprint) {
		this.renderEventFootprints([
			this.fabricateEventFootprint(componentFootprint)
		]);
	},


	renderEventDraggingFootprints: function(eventFootprints, sourceSeg, isTouch) {
		this.renderEventFootprints(
			eventFootprints,
			sourceSeg,
			'fc-dragging',
			isTouch ? null : this.view.opt('dragOpacity')
		);
	},


	renderEventResizingFootprints: function(eventFootprints, sourceSeg, isTouch) {
		this.renderEventFootprints(
			eventFootprints,
			sourceSeg,
			'fc-resizing'
		);
	},


	renderEventFootprints: function(eventFootprints, sourceSeg, extraClassNames, opacity) {
		var segs = this.component.eventFootprintsToSegs(eventFootprints);
		var classNames = 'fc-helper ' + (extraClassNames || '');
		var i;

		// assigns each seg's el and returns a subset of segs that were rendered
		segs = this.eventRenderer.renderFgSegEls(segs);

		for (i = 0; i < segs.length; i++) {
			segs[i].el.addClass(classNames);
		}

		if (opacity != null) {
			for (i = 0; i < segs.length; i++) {
				segs[i].el.css('opacity', opacity);
			}
		}

		this.helperEls = this.renderSegs(segs, sourceSeg);
	},


	/*
	Must return all mock event elements
	*/
	renderSegs: function(segs, sourceSeg) {
		// Subclasses must implement
	},


	unrender: function() {
		if (this.helperEls) {
			this.helperEls.remove();
			this.helperEls = null;
		}
	},


	fabricateEventFootprint: function(componentFootprint) {
		var calendar = this.view.calendar;
		var eventDateProfile = calendar.footprintToDateProfile(componentFootprint);
		var dummyEvent = new SingleEventDef(new EventSource(calendar));
		var dummyInstance;

		dummyEvent.dateProfile = eventDateProfile;
		dummyInstance = dummyEvent.buildInstance();

		return new EventFootprint(componentFootprint, dummyEvent, dummyInstance);
	}

});

;;

var Component = Model.extend({

	el: null,


	setElement: function(el) {
		this.el = el;
		this.bindGlobalHandlers();
		this.renderSkeleton();
		this.set('isInDom', true);
	},


	removeElement: function() {
		this.unset('isInDom');
		this.unrenderSkeleton();
		this.unbindGlobalHandlers();

		this.el.remove();
		// NOTE: don't null-out this.el in case the View was destroyed within an API callback.
		// We don't null-out the View's other jQuery element references upon destroy,
		//  so we shouldn't kill this.el either.
	},


	bindGlobalHandlers: function() {
	},


	unbindGlobalHandlers: function() {
	},


	/*
	NOTE: Can't have a `render` method. Read the deprecation notice in View::executeDateRender
	*/


	// Renders the basic structure of the view before any content is rendered
	renderSkeleton: function() {
		// subclasses should implement
	},


	// Unrenders the basic structure of the view
	unrenderSkeleton: function() {
		// subclasses should implement
	}

});

;;

var DateComponent = FC.DateComponent = Component.extend({

	uid: null,
	childrenByUid: null,
	isRTL: false, // frequently accessed options
	nextDayThreshold: null, // "
	dateProfile: null, // hack

	eventRendererClass: null,
	helperRendererClass: null,
	businessHourRendererClass: null,
	fillRendererClass: null,

	eventRenderer: null,
	helperRenderer: null,
	businessHourRenderer: null,
	fillRenderer: null,

	hitsNeededDepth: 0, // necessary because multiple callers might need the same hits

	hasAllDayBusinessHours: false, // TODO: unify with largeUnit and isTimeScale?

	isDatesRendered: false,


	constructor: function() {
		Component.call(this);

		this.uid = String(DateComponent.guid++);
		this.childrenByUid = {};

		this.nextDayThreshold = moment.duration(this.opt('nextDayThreshold'));
		this.isRTL = this.opt('isRTL');

		if (this.fillRendererClass) {
			this.fillRenderer = new this.fillRendererClass(this);
		}

		if (this.eventRendererClass) { // fillRenderer is optional -----v
			this.eventRenderer = new this.eventRendererClass(this, this.fillRenderer);
		}

		if (this.helperRendererClass && this.eventRenderer) {
			this.helperRenderer = new this.helperRendererClass(this, this.eventRenderer);
		}

		if (this.businessHourRendererClass && this.fillRenderer) {
			this.businessHourRenderer = new this.businessHourRendererClass(this, this.fillRenderer);
		}
	},


	addChild: function(child) {
		if (!this.childrenByUid[child.uid]) {
			this.childrenByUid[child.uid] = child;

			return true;
		}

		return false;
	},


	removeChild: function(child) {
		if (this.childrenByUid[child.uid]) {
			delete this.childrenByUid[child.uid];

			return true;
		}

		return false;
	},


	// TODO: only do if isInDom?
	// TODO: make part of Component, along with children/batch-render system?
	updateSize: function(totalHeight, isAuto, isResize) {
		this.callChildren('updateSize', arguments);
	},


	// Options
	// -----------------------------------------------------------------------------------------------------------------


	opt: function(name) {
		return this._getView().opt(name); // default implementation
	},


	publiclyTrigger: function(/**/) {
		var calendar = this._getCalendar();

		return calendar.publiclyTrigger.apply(calendar, arguments);
	},


	hasPublicHandlers: function(/**/) {
		var calendar = this._getCalendar();

		return calendar.hasPublicHandlers.apply(calendar, arguments);
	},


	// Date
	// -----------------------------------------------------------------------------------------------------------------


	executeDateRender: function(dateProfile) {
		this.dateProfile = dateProfile; // for rendering
		this.renderDates(dateProfile);
		this.isDatesRendered = true;
		this.callChildren('executeDateRender', arguments);
	},


	executeDateUnrender: function() { // wrapper
		this.callChildren('executeDateUnrender', arguments);
		this.dateProfile = null;
		this.unrenderDates();
		this.isDatesRendered = false;
	},


	// date-cell content only
	renderDates: function(dateProfile) {
		// subclasses should implement
	},


	// date-cell content only
	unrenderDates: function() {
		// subclasses should override
	},


	// Now-Indicator
	// -----------------------------------------------------------------------------------------------------------------


	// Returns a string unit, like 'second' or 'minute' that defined how often the current time indicator
	// should be refreshed. If something falsy is returned, no time indicator is rendered at all.
	getNowIndicatorUnit: function() {
		// subclasses should implement
	},


	// Renders a current time indicator at the given datetime
	renderNowIndicator: function(date) {
		this.callChildren('renderNowIndicator', arguments);
	},


	// Undoes the rendering actions from renderNowIndicator
	unrenderNowIndicator: function() {
		this.callChildren('unrenderNowIndicator', arguments);
	},


	// Business Hours
	// ---------------------------------------------------------------------------------------------------------------


	renderBusinessHours: function(businessHourGenerator) {
		if (this.businessHourRenderer) {
			this.businessHourRenderer.render(businessHourGenerator);
		}

		this.callChildren('renderBusinessHours', arguments);
	},


	// Unrenders previously-rendered business-hours
	unrenderBusinessHours: function() {
		this.callChildren('unrenderBusinessHours', arguments);

		if (this.businessHourRenderer) {
			this.businessHourRenderer.unrender();
		}
	},


	// Event Displaying
	// -----------------------------------------------------------------------------------------------------------------


	executeEventRender: function(eventsPayload) {
		if (this.eventRenderer) {
			this.eventRenderer.rangeUpdated(); // poorly named now
			this.eventRenderer.render(eventsPayload);
		}
		else if (this.renderEvents) { // legacy
			this.renderEvents(convertEventsPayloadToLegacyArray(eventsPayload));
		}

		this.callChildren('executeEventRender', arguments);
	},


	executeEventUnrender: function() {
		this.callChildren('executeEventUnrender', arguments);

		if (this.eventRenderer) {
			this.eventRenderer.unrender();
		}
		else if (this.destroyEvents) { // legacy
			this.destroyEvents();
		}
	},


	getBusinessHourSegs: function() { // recursive
		var segs = this.getOwnBusinessHourSegs();

		this.iterChildren(function(child) {
			segs.push.apply(segs, child.getBusinessHourSegs());
		});

		return segs;
	},


	getOwnBusinessHourSegs: function() {
		if (this.businessHourRenderer) {
			return this.businessHourRenderer.getSegs();
		}

		return [];
	},


	getEventSegs: function() { // recursive
		var segs = this.getOwnEventSegs();

		this.iterChildren(function(child) {
			segs.push.apply(segs, child.getEventSegs());
		});

		return segs;
	},


	getOwnEventSegs: function() { // just for itself
		if (this.eventRenderer) {
			return this.eventRenderer.getSegs();
		}

		return [];
	},


	// Event Rendering Triggering
	// -----------------------------------------------------------------------------------------------------------------


	triggerAfterEventsRendered: function() {
		this.triggerAfterEventSegsRendered(
			this.getEventSegs()
		);

		this.publiclyTrigger('eventAfterAllRender', {
			context: this,
			args: [ this ]
		});
	},


	triggerAfterEventSegsRendered: function(segs) {
		var _this = this;

		// an optimization, because getEventLegacy is expensive
		if (this.hasPublicHandlers('eventAfterRender')) {
			segs.forEach(function(seg) {
				var legacy;

				if (seg.el) { // necessary?
					legacy = seg.footprint.getEventLegacy();

					_this.publiclyTrigger('eventAfterRender', {
						context: legacy,
						args: [ legacy, seg.el, _this ]
					});
				}
			});
		}
	},


	triggerBeforeEventsDestroyed: function() {
		this.triggerBeforeEventSegsDestroyed(
			this.getEventSegs()
		);
	},


	triggerBeforeEventSegsDestroyed: function(segs) {
		var _this = this;

		if (this.hasPublicHandlers('eventDestroy')) {
			segs.forEach(function(seg) {
				var legacy;

				if (seg.el) { // necessary?
					legacy = seg.footprint.getEventLegacy();

					_this.publiclyTrigger('eventDestroy', {
						context: legacy,
						args: [ legacy, seg.el, _this ]
					});
				}
			});
		}
	},


	// Event Rendering Utils
	// -----------------------------------------------------------------------------------------------------------------


	// Hides all rendered event segments linked to the given event
	// RECURSIVE with subcomponents
	showEventsWithId: function(eventDefId) {

		this.getEventSegs().forEach(function(seg) {
			if (
				seg.footprint.eventDef.id === eventDefId &&
				seg.el // necessary?
			) {
				seg.el.css('visibility', '');
			}
		});

		this.callChildren('showEventsWithId', arguments);
	},


	// Shows all rendered event segments linked to the given event
	// RECURSIVE with subcomponents
	hideEventsWithId: function(eventDefId) {

		this.getEventSegs().forEach(function(seg) {
			if (
				seg.footprint.eventDef.id === eventDefId &&
				seg.el // necessary?
			) {
				seg.el.css('visibility', 'hidden');
			}
		});

		this.callChildren('hideEventsWithId', arguments);
	},


	// Drag-n-Drop Rendering (for both events and external elements)
	// ---------------------------------------------------------------------------------------------------------------


	// Renders a visual indication of a event or external-element drag over the given drop zone.
	// If an external-element, seg will be `null`.
	// Must return elements used for any mock events.
	renderDrag: function(eventFootprints, seg, isTouch) {
		var renderedHelper = false;

		this.iterChildren(function(child) {
			if (child.renderDrag(eventFootprints, seg, isTouch)) {
				renderedHelper = true;
			}
		});

		return renderedHelper;
	},


	// Unrenders a visual indication of an event or external-element being dragged.
	unrenderDrag: function() {
		this.callChildren('unrenderDrag', arguments);
	},


	// Event Resizing
	// ---------------------------------------------------------------------------------------------------------------


	// Renders a visual indication of an event being resized.
	renderEventResize: function(eventFootprints, seg, isTouch) {
		this.callChildren('renderEventResize', arguments);
	},


	// Unrenders a visual indication of an event being resized.
	unrenderEventResize: function() {
		this.callChildren('unrenderEventResize', arguments);
	},


	// Selection
	// ---------------------------------------------------------------------------------------------------------------


	// Renders a visual indication of the selection
	// TODO: rename to `renderSelection` after legacy is gone
	renderSelectionFootprint: function(componentFootprint) {
		this.renderHighlight(componentFootprint);

		this.callChildren('renderSelectionFootprint', arguments);
	},


	// Unrenders a visual indication of selection
	unrenderSelection: function() {
		this.unrenderHighlight();

		this.callChildren('unrenderSelection', arguments);
	},


	// Highlight
	// ---------------------------------------------------------------------------------------------------------------


	// Renders an emphasis on the given date range. Given a span (unzoned start/end and other misc data)
	renderHighlight: function(componentFootprint) {
		if (this.fillRenderer) {
			this.fillRenderer.renderFootprint(
				'highlight',
				componentFootprint,
				{
					getClasses: function() {
						return [ 'fc-highlight' ];
					}
				}
			);
		}

		this.callChildren('renderHighlight', arguments);
	},


	// Unrenders the emphasis on a date range
	unrenderHighlight: function() {
		if (this.fillRenderer) {
			this.fillRenderer.unrender('highlight');
		}

		this.callChildren('unrenderHighlight', arguments);
	},


	// Hit Areas
	// ---------------------------------------------------------------------------------------------------------------
	// just because all DateComponents support this interface
	// doesn't mean they need to have their own internal coord system. they can defer to sub-components.


	hitsNeeded: function() {
		if (!(this.hitsNeededDepth++)) {
			this.prepareHits();
		}

		this.callChildren('hitsNeeded', arguments);
	},


	hitsNotNeeded: function() {
		if (this.hitsNeededDepth && !(--this.hitsNeededDepth)) {
			this.releaseHits();
		}

		this.callChildren('hitsNotNeeded', arguments);
	},


	prepareHits: function() {
		// subclasses can implement
	},


	releaseHits: function() {
		// subclasses can implement
	},


	// Given coordinates from the topleft of the document, return data about the date-related area underneath.
	// Can return an object with arbitrary properties (although top/right/left/bottom are encouraged).
	// Must have a `grid` property, a reference to this current grid. TODO: avoid this
	// The returned object will be processed by getHitFootprint and getHitEl.
	queryHit: function(leftOffset, topOffset) {
		var childrenByUid = this.childrenByUid;
		var uid;
		var hit;

		for (uid in childrenByUid) {
			hit = childrenByUid[uid].queryHit(leftOffset, topOffset);

			if (hit) {
				break;
			}
		}

		return hit;
	},


	getSafeHitFootprint: function(hit) {
		var footprint = this.getHitFootprint(hit);

		if (!this.dateProfile.activeUnzonedRange.containsRange(footprint.unzonedRange)) {
			return null;
		}

		return footprint;
	},


	getHitFootprint: function(hit) {
	},


	// Given position-level information about a date-related area within the grid,
	// should return a jQuery element that best represents it. passed to dayClick callback.
	getHitEl: function(hit) {
	},


	/* Converting eventRange -> eventFootprint
	------------------------------------------------------------------------------------------------------------------*/


	eventRangesToEventFootprints: function(eventRanges) {
		var eventFootprints = [];
		var i;

		for (i = 0; i < eventRanges.length; i++) {
			eventFootprints.push.apply( // append
				eventFootprints,
				this.eventRangeToEventFootprints(eventRanges[i])
			);
		}

		return eventFootprints;
	},


	eventRangeToEventFootprints: function(eventRange) {
		return [ eventRangeToEventFootprint(eventRange) ];
	},


	/* Converting componentFootprint/eventFootprint -> segs
	------------------------------------------------------------------------------------------------------------------*/


	eventFootprintsToSegs: function(eventFootprints) {
		var segs = [];
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			segs.push.apply(segs,
				this.eventFootprintToSegs(eventFootprints[i])
			);
		}

		return segs;
	},


	// Given an event's span (unzoned start/end and other misc data), and the event itself,
	// slices into segments and attaches event-derived properties to them.
	// eventSpan - { start, end, isStart, isEnd, otherthings... }
	eventFootprintToSegs: function(eventFootprint) {
		var unzonedRange = eventFootprint.componentFootprint.unzonedRange;
		var segs;
		var i, seg;

		segs = this.componentFootprintToSegs(eventFootprint.componentFootprint);

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			if (!unzonedRange.isStart) {
				seg.isStart = false;
			}
			if (!unzonedRange.isEnd) {
				seg.isEnd = false;
			}

			seg.footprint = eventFootprint;
			// TODO: rename to seg.eventFootprint
		}

		return segs;
	},


	componentFootprintToSegs: function(componentFootprint) {
		return [];
	},


	// Utils
	// ---------------------------------------------------------------------------------------------------------------


	callChildren: function(methodName, args) {
		this.iterChildren(function(child) {
			child[methodName].apply(child, args);
		});
	},


	iterChildren: function(func) {
		var childrenByUid = this.childrenByUid;
		var uid;

		for (uid in childrenByUid) {
			func(childrenByUid[uid]);
		}
	},


	_getCalendar: function() { // TODO: strip out. move to generic parent.
		return this.calendar || this.view.calendar;
	},


	_getView: function() { // TODO: strip out. move to generic parent.
		return this.view;
	},


	_getDateProfile: function() {
		return this._getView().get('dateProfile');
	}

});


DateComponent.guid = 0; // TODO: better system for this?


// legacy

function convertEventsPayloadToLegacyArray(eventsPayload) {
	var eventDefId;
	var eventInstances;
	var legacyEvents = [];
	var i;

	for (eventDefId in eventsPayload) {
		eventInstances = eventsPayload[eventDefId].eventInstances;

		for (i = 0; i < eventInstances.length; i++) {
			legacyEvents.push(
				eventInstances[i].toLegacy()
			);
		}
	}

	return legacyEvents;
}

;;

DateComponent.mixin({

	// Generates HTML for an anchor to another view into the calendar.
	// Will either generate an <a> tag or a non-clickable <span> tag, depending on enabled settings.
	// `gotoOptions` can either be a moment input, or an object with the form:
	// { date, type, forceOff }
	// `type` is a view-type like "day" or "week". default value is "day".
	// `attrs` and `innerHtml` are use to generate the rest of the HTML tag.
	buildGotoAnchorHtml: function(gotoOptions, attrs, innerHtml) {
		var date, type, forceOff;
		var finalOptions;

		if ($.isPlainObject(gotoOptions)) {
			date = gotoOptions.date;
			type = gotoOptions.type;
			forceOff = gotoOptions.forceOff;
		}
		else {
			date = gotoOptions; // a single moment input
		}
		date = FC.moment(date); // if a string, parse it

		finalOptions = { // for serialization into the link
			date: date.format('YYYY-MM-DD'),
			type: type || 'day'
		};

		if (typeof attrs === 'string') {
			innerHtml = attrs;
			attrs = null;
		}

		attrs = attrs ? ' ' + attrsToStr(attrs) : ''; // will have a leading space
		innerHtml = innerHtml || '';

		if (!forceOff && this.opt('navLinks')) {
			return '<a' + attrs +
				' data-goto="' + htmlEscape(JSON.stringify(finalOptions)) + '">' +
				innerHtml +
				'</a>';
		}
		else {
			return '<span' + attrs + '>' +
				innerHtml +
				'</span>';
		}
	},


	getAllDayHtml: function() {
		return this.opt('allDayHtml') || htmlEscape(this.opt('allDayText'));
	},


	// Computes HTML classNames for a single-day element
	getDayClasses: function(date, noThemeHighlight) {
		var view = this._getView();
		var classes = [];
		var today;

		if (!this.dateProfile.activeUnzonedRange.containsDate(date)) {
			classes.push('fc-disabled-day'); // TODO: jQuery UI theme?
		}
		else {
			classes.push('fc-' + dayIDs[date.day()]);

			if (view.isDateInOtherMonth(date, this.dateProfile)) { // TODO: use DateComponent subclass somehow
				classes.push('fc-other-month');
			}

			today = view.calendar.getNow();

			if (date.isSame(today, 'day')) {
				classes.push('fc-today');

				if (noThemeHighlight !== true) {
					classes.push(view.calendar.theme.getClass('today'));
				}
			}
			else if (date < today) {
				classes.push('fc-past');
			}
			else {
				classes.push('fc-future');
			}
		}

		return classes;
	},


	// Utility for formatting a range. Accepts a range object, formatting string, and optional separator.
	// Displays all-day ranges naturally, with an inclusive end. Takes the current isRTL into account.
	// The timezones of the dates within `range` will be respected.
	formatRange: function(range, isAllDay, formatStr, separator) {
		var end = range.end;

		if (isAllDay) {
			end = end.clone().subtract(1); // convert to inclusive. last ms of previous day
		}

		return formatRange(range.start, end, formatStr, separator, this.isRTL);
	},


	// Compute the number of the give units in the "current" range.
	// Will return a floating-point number. Won't round.
	currentRangeAs: function(unit) {
		return this._getDateProfile().currentUnzonedRange.as(unit);
	},


	// Returns the date range of the full days the given range visually appears to occupy.
	// Returns a plain object with start/end, NOT an UnzonedRange!
	computeDayRange: function(unzonedRange) {
		var calendar = this._getCalendar();
		var startDay = calendar.msToUtcMoment(unzonedRange.startMs, true); // the beginning of the day the range starts
		var end = calendar.msToUtcMoment(unzonedRange.endMs);
		var endTimeMS = +end.time(); // # of milliseconds into `endDay`
		var endDay = end.clone().stripTime(); // the beginning of the day the range exclusively ends

		// If the end time is actually inclusively part of the next day and is equal to or
		// beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
		// Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
		if (endTimeMS && endTimeMS >= this.nextDayThreshold) {
			endDay.add(1, 'days');
		}

		// If end is within `startDay` but not past nextDayThreshold, assign the default duration of one day.
		if (endDay <= startDay) {
			endDay = startDay.clone().add(1, 'days');
		}

		return { start: startDay, end: endDay };
	},


	// Does the given range visually appear to occupy more than one day?
	isMultiDayRange: function(unzonedRange) {
		var dayRange = this.computeDayRange(unzonedRange);

		return dayRange.end.diff(dayRange.start, 'days') > 1;
	}

});

;;

var InteractiveDateComponent = FC.InteractiveDateComponent = DateComponent.extend({

	dateClickingClass: null,
	dateSelectingClass: null,
	eventPointingClass: null,
	eventDraggingClass: null,
	eventResizingClass: null,
	externalDroppingClass: null,

	dateClicking: null,
	dateSelecting: null,
	eventPointing: null,
	eventDragging: null,
	eventResizing: null,
	externalDropping: null,

	// self-config, overridable by subclasses
	segSelector: '.fc-event-container > *', // what constitutes an event element?

	// if defined, holds the unit identified (ex: "year" or "month") that determines the level of granularity
	// of the date areas. if not defined, assumes to be day and time granularity.
	// TODO: port isTimeScale into same system?
	largeUnit: null,


	constructor: function() {
		DateComponent.call(this);

		if (this.dateSelectingClass) {
			this.dateClicking = new this.dateClickingClass(this);
		}

		if (this.dateSelectingClass) {
			this.dateSelecting = new this.dateSelectingClass(this);
		}

		if (this.eventPointingClass) {
			this.eventPointing = new this.eventPointingClass(this);
		}

		if (this.eventDraggingClass && this.eventPointing) {
			this.eventDragging = new this.eventDraggingClass(this, this.eventPointing);
		}

		if (this.eventResizingClass && this.eventPointing) {
			this.eventResizing = new this.eventResizingClass(this, this.eventPointing);
		}

		if (this.externalDroppingClass) {
			this.externalDropping = new this.externalDroppingClass(this);
		}
	},


	// Sets the container element that the view should render inside of, does global DOM-related initializations,
	// and renders all the non-date-related content inside.
	setElement: function(el) {
		DateComponent.prototype.setElement.apply(this, arguments);

		if (this.dateClicking) {
			this.dateClicking.bindToEl(el);
		}

		if (this.dateSelecting) {
			this.dateSelecting.bindToEl(el);
		}

		this.bindAllSegHandlersToEl(el);
	},


	unrender: function() {
		this.endInteractions();

		DateComponent.prototype.unrender.apply(this, arguments);
	},


	executeEventUnrender: function() {
		this.endInteractions();

		DateComponent.prototype.executeEventUnrender.apply(this, arguments);
	},


	bindGlobalHandlers: function() {
		DateComponent.prototype.bindGlobalHandlers.apply(this, arguments);

		if (this.externalDropping) {
			this.externalDropping.bindToDocument();
		}
	},


	unbindGlobalHandlers: function() {
		DateComponent.prototype.unbindGlobalHandlers.apply(this, arguments);

		if (this.externalDropping) {
			this.externalDropping.unbindFromDocument();
		}
	},


	bindDateHandlerToEl: function(el, name, handler) {
		var _this = this;

		// attach a handler to the grid's root element.
		// jQuery will take care of unregistering them when removeElement gets called.
		this.el.on(name, function(ev) {
			if (
				!$(ev.target).is(
					_this.segSelector + ',' + // directly on an event element
					_this.segSelector + ' *,' + // within an event element
					'.fc-more,' + // a "more.." link
					'a[data-goto]' // a clickable nav link
				)
			) {
				return handler.call(_this, ev);
			}
		});
	},


	bindAllSegHandlersToEl: function(el) {
		[
			this.eventPointing,
			this.eventDragging,
			this.eventResizing
		].forEach(function(eventInteraction) {
			if (eventInteraction) {
				eventInteraction.bindToEl(el);
			}
		});
	},


	bindSegHandlerToEl: function(el, name, handler) {
		var _this = this;

		el.on(name, this.segSelector, function(ev) {
			var seg = $(this).data('fc-seg'); // grab segment data. put there by View::renderEventsPayload

			if (seg && !_this.shouldIgnoreEventPointing()) {
				return handler.call(_this, seg, ev); // context will be the Grid
			}
		});
	},


	shouldIgnoreMouse: function() {
		// HACK
		// This will still work even though bindDateHandlerToEl doesn't use GlobalEmitter.
		return GlobalEmitter.get().shouldIgnoreMouse();
	},


	shouldIgnoreTouch: function() {
		var view = this._getView();

		// On iOS (and Android?) when a new selection is initiated overtop another selection,
		// the touchend never fires because the elements gets removed mid-touch-interaction (my theory).
		// HACK: simply don't allow this to happen.
		// ALSO: prevent selection when an *event* is already raised.
		return view.isSelected || view.selectedEvent;
	},


	shouldIgnoreEventPointing: function() {
		// only call the handlers if there is not a drag/resize in progress
		return (this.eventDragging && this.eventDragging.isDragging) ||
			(this.eventResizing && this.eventResizing.isResizing);
	},


	canStartSelection: function(seg, ev) {
		return getEvIsTouch(ev) &&
			!this.canStartResize(seg, ev) &&
			(this.isEventDefDraggable(seg.footprint.eventDef) ||
			 this.isEventDefResizable(seg.footprint.eventDef));
	},


	canStartDrag: function(seg, ev) {
		return !this.canStartResize(seg, ev) &&
			this.isEventDefDraggable(seg.footprint.eventDef);
	},


	canStartResize: function(seg, ev) {
		var view = this._getView();
		var eventDef = seg.footprint.eventDef;

		return (!getEvIsTouch(ev) || view.isEventDefSelected(eventDef)) &&
			this.isEventDefResizable(eventDef) &&
			$(ev.target).is('.fc-resizer');
	},


	// Kills all in-progress dragging.
	// Useful for when public API methods that result in re-rendering are invoked during a drag.
	// Also useful for when touch devices misbehave and don't fire their touchend.
	endInteractions: function() {
		[
			this.dateClicking,
			this.dateSelecting,
			this.eventPointing,
			this.eventDragging,
			this.eventResizing
		].forEach(function(interaction) {
			if (interaction) {
				interaction.end();
			}
		});
	},


	// Event Drag-n-Drop
	// ---------------------------------------------------------------------------------------------------------------


	// Computes if the given event is allowed to be dragged by the user
	isEventDefDraggable: function(eventDef) {
		return this.isEventDefStartEditable(eventDef);
	},


	isEventDefStartEditable: function(eventDef) {
		var isEditable = eventDef.isStartExplicitlyEditable();

		if (isEditable == null) {
			isEditable = this.opt('eventStartEditable');

			if (isEditable == null) {
				isEditable = this.isEventDefGenerallyEditable(eventDef);
			}
		}

		return isEditable;
	},


	isEventDefGenerallyEditable: function(eventDef) {
		var isEditable = eventDef.isExplicitlyEditable();

		if (isEditable == null) {
			isEditable = this.opt('editable');
		}

		return isEditable;
	},


	// Event Resizing
	// ---------------------------------------------------------------------------------------------------------------


	// Computes if the given event is allowed to be resized from its starting edge
	isEventDefResizableFromStart: function(eventDef) {
		return this.opt('eventResizableFromStart') && this.isEventDefResizable(eventDef);
	},


	// Computes if the given event is allowed to be resized from its ending edge
	isEventDefResizableFromEnd: function(eventDef) {
		return this.isEventDefResizable(eventDef);
	},


	// Computes if the given event is allowed to be resized by the user at all
	isEventDefResizable: function(eventDef) {
		var isResizable = eventDef.isDurationExplicitlyEditable();

		if (isResizable == null) {
			isResizable = this.opt('eventDurationEditable');

			if (isResizable == null) {
				isResizable = this.isEventDefGenerallyEditable(eventDef);
			}
		}
		return isResizable;
	},


	// Event Mutation / Constraints
	// ---------------------------------------------------------------------------------------------------------------


	// Diffs the two dates, returning a duration, based on granularity of the grid
	// TODO: port isTimeScale into this system?
	diffDates: function(a, b) {
		if (this.largeUnit) {
			return diffByUnit(a, b, this.largeUnit);
		}
		else {
			return diffDayTime(a, b);
		}
	},


	// is it allowed, in relation to the view's validRange?
	// NOTE: very similar to isExternalInstanceGroupAllowed
	isEventInstanceGroupAllowed: function(eventInstanceGroup) {
		var view = this._getView();
		var dateProfile = this.dateProfile;
		var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			// TODO: just use getAllEventRanges directly
			if (!dateProfile.validUnzonedRange.containsRange(eventFootprints[i].componentFootprint.unzonedRange)) {
				return false;
			}
		}

		return view.calendar.isEventInstanceGroupAllowed(eventInstanceGroup);
	},


	// NOTE: very similar to isEventInstanceGroupAllowed
	// when it's a completely anonymous external drag, no event.
	isExternalInstanceGroupAllowed: function(eventInstanceGroup) {
		var view = this._getView();
		var dateProfile = this.dateProfile;
		var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			if (!dateProfile.validUnzonedRange.containsRange(eventFootprints[i].componentFootprint.unzonedRange)) {
				return false;
			}
		}

		for (i = 0; i < eventFootprints.length; i++) {
			// treat it as a selection
			// TODO: pass in eventInstanceGroup instead
			//  because we don't want calendar's constraint system to depend on a component's
			//  determination of footprints.
			if (!view.calendar.isSelectionFootprintAllowed(eventFootprints[i].componentFootprint)) {
				return false;
			}
		}

		return true;
	}

});

;;

/*
A set of rendering and date-related methods for a visual component comprised of one or more rows of day columns.
Prerequisite: the object being mixed into needs to be a *Grid*
*/
var DayTableMixin = FC.DayTableMixin = {

	breakOnWeeks: false, // should create a new row for each week?
	dayDates: null, // whole-day dates for each column. left to right
	dayIndices: null, // for each day from start, the offset
	daysPerRow: null,
	rowCnt: null,
	colCnt: null,
	colHeadFormat: null,


	// Populates internal variables used for date calculation and rendering
	updateDayTable: function() {
		var view = this.view;
		var calendar = view.calendar;
		var date = calendar.msToUtcMoment(this.dateProfile.renderUnzonedRange.startMs, true);
		var end = calendar.msToUtcMoment(this.dateProfile.renderUnzonedRange.endMs, true);
		var dayIndex = -1;
		var dayIndices = [];
		var dayDates = [];
		var daysPerRow;
		var firstDay;
		var rowCnt;

		while (date.isBefore(end)) { // loop each day from start to end
			if (view.isHiddenDay(date)) {
				dayIndices.push(dayIndex + 0.5); // mark that it's between indices
			}
			else {
				dayIndex++;
				dayIndices.push(dayIndex);
				dayDates.push(date.clone());
			}
			date.add(1, 'days');
		}

		if (this.breakOnWeeks) {
			// count columns until the day-of-week repeats
			firstDay = dayDates[0].day();
			for (daysPerRow = 1; daysPerRow < dayDates.length; daysPerRow++) {
				if (dayDates[daysPerRow].day() == firstDay) {
					break;
				}
			}
			rowCnt = Math.ceil(dayDates.length / daysPerRow);
		}
		else {
			rowCnt = 1;
			daysPerRow = dayDates.length;
		}

		this.dayDates = dayDates;
		this.dayIndices = dayIndices;
		this.daysPerRow = daysPerRow;
		this.rowCnt = rowCnt;

		this.updateDayTableCols();
	},


	// Computes and assigned the colCnt property and updates any options that may be computed from it
	updateDayTableCols: function() {
		this.colCnt = this.computeColCnt();
		this.colHeadFormat = this.opt('columnFormat') || this.computeColHeadFormat();
	},


	// Determines how many columns there should be in the table
	computeColCnt: function() {
		return this.daysPerRow;
	},


	// Computes the ambiguously-timed moment for the given cell
	getCellDate: function(row, col) {
		return this.dayDates[
				this.getCellDayIndex(row, col)
			].clone();
	},


	// Computes the ambiguously-timed date range for the given cell
	getCellRange: function(row, col) {
		var start = this.getCellDate(row, col);
		var end = start.clone().add(1, 'days');

		return { start: start, end: end };
	},


	// Returns the number of day cells, chronologically, from the first of the grid (0-based)
	getCellDayIndex: function(row, col) {
		return row * this.daysPerRow + this.getColDayIndex(col);
	},


	// Returns the numner of day cells, chronologically, from the first cell in *any given row*
	getColDayIndex: function(col) {
		if (this.isRTL) {
			return this.colCnt - 1 - col;
		}
		else {
			return col;
		}
	},


	// Given a date, returns its chronolocial cell-index from the first cell of the grid.
	// If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
	// If before the first offset, returns a negative number.
	// If after the last offset, returns an offset past the last cell offset.
	// Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
	getDateDayIndex: function(date) {
		var dayIndices = this.dayIndices;
		var dayOffset = date.diff(this.dayDates[0], 'days');

		if (dayOffset < 0) {
			return dayIndices[0] - 1;
		}
		else if (dayOffset >= dayIndices.length) {
			return dayIndices[dayIndices.length - 1] + 1;
		}
		else {
			return dayIndices[dayOffset];
		}
	},


	/* Options
	------------------------------------------------------------------------------------------------------------------*/


	// Computes a default column header formatting string if `colFormat` is not explicitly defined
	computeColHeadFormat: function() {
		// if more than one week row, or if there are a lot of columns with not much space,
		// put just the day numbers will be in each cell
		if (this.rowCnt > 1 || this.colCnt > 10) {
			return 'ddd'; // "Sat"
		}
		// multiple days, so full single date string WON'T be in title text
		else if (this.colCnt > 1) {
			return this.opt('dayOfMonthFormat'); // "Sat 12/10"
		}
		// single day, so full single date string will probably be in title text
		else {
			return 'dddd'; // "Saturday"
		}
	},


	/* Slicing
	------------------------------------------------------------------------------------------------------------------*/


	// Slices up a date range into a segment for every week-row it intersects with
	sliceRangeByRow: function(unzonedRange) {
		var daysPerRow = this.daysPerRow;
		var normalRange = this.view.computeDayRange(unzonedRange); // make whole-day range, considering nextDayThreshold
		var rangeFirst = this.getDateDayIndex(normalRange.start); // inclusive first index
		var rangeLast = this.getDateDayIndex(normalRange.end.clone().subtract(1, 'days')); // inclusive last index
		var segs = [];
		var row;
		var rowFirst, rowLast; // inclusive day-index range for current row
		var segFirst, segLast; // inclusive day-index range for segment

		for (row = 0; row < this.rowCnt; row++) {
			rowFirst = row * daysPerRow;
			rowLast = rowFirst + daysPerRow - 1;

			// intersect segment's offset range with the row's
			segFirst = Math.max(rangeFirst, rowFirst);
			segLast = Math.min(rangeLast, rowLast);

			// deal with in-between indices
			segFirst = Math.ceil(segFirst); // in-between starts round to next cell
			segLast = Math.floor(segLast); // in-between ends round to prev cell

			if (segFirst <= segLast) { // was there any intersection with the current row?
				segs.push({
					row: row,

					// normalize to start of row
					firstRowDayIndex: segFirst - rowFirst,
					lastRowDayIndex: segLast - rowFirst,

					// must be matching integers to be the segment's start/end
					isStart: segFirst === rangeFirst,
					isEnd: segLast === rangeLast
				});
			}
		}

		return segs;
	},


	// Slices up a date range into a segment for every day-cell it intersects with.
	// TODO: make more DRY with sliceRangeByRow somehow.
	sliceRangeByDay: function(unzonedRange) {
		var daysPerRow = this.daysPerRow;
		var normalRange = this.view.computeDayRange(unzonedRange); // make whole-day range, considering nextDayThreshold
		var rangeFirst = this.getDateDayIndex(normalRange.start); // inclusive first index
		var rangeLast = this.getDateDayIndex(normalRange.end.clone().subtract(1, 'days')); // inclusive last index
		var segs = [];
		var row;
		var rowFirst, rowLast; // inclusive day-index range for current row
		var i;
		var segFirst, segLast; // inclusive day-index range for segment

		for (row = 0; row < this.rowCnt; row++) {
			rowFirst = row * daysPerRow;
			rowLast = rowFirst + daysPerRow - 1;

			for (i = rowFirst; i <= rowLast; i++) {

				// intersect segment's offset range with the row's
				segFirst = Math.max(rangeFirst, i);
				segLast = Math.min(rangeLast, i);

				// deal with in-between indices
				segFirst = Math.ceil(segFirst); // in-between starts round to next cell
				segLast = Math.floor(segLast); // in-between ends round to prev cell

				if (segFirst <= segLast) { // was there any intersection with the current row?
					segs.push({
						row: row,

						// normalize to start of row
						firstRowDayIndex: segFirst - rowFirst,
						lastRowDayIndex: segLast - rowFirst,

						// must be matching integers to be the segment's start/end
						isStart: segFirst === rangeFirst,
						isEnd: segLast === rangeLast
					});
				}
			}
		}

		return segs;
	},


	/* Header Rendering
	------------------------------------------------------------------------------------------------------------------*/


	renderHeadHtml: function() {
		var theme = this.view.calendar.theme;

		return '' +
			'<div class="fc-row ' + theme.getClass('headerRow') + '">' +
				'<table class="' + theme.getClass('tableGrid') + '">' +
					'<thead>' +
						this.renderHeadTrHtml() +
					'</thead>' +
				'</table>' +
			'</div>';
	},


	renderHeadIntroHtml: function() {
		return this.renderIntroHtml(); // fall back to generic
	},


	renderHeadTrHtml: function() {
		return '' +
			'<tr>' +
				(this.isRTL ? '' : this.renderHeadIntroHtml()) +
				this.renderHeadDateCellsHtml() +
				(this.isRTL ? this.renderHeadIntroHtml() : '') +
			'</tr>';
	},


	renderHeadDateCellsHtml: function() {
		var htmls = [];
		var col, date;

		for (col = 0; col < this.colCnt; col++) {
			date = this.getCellDate(0, col);
			htmls.push(this.renderHeadDateCellHtml(date));
		}

		return htmls.join('');
	},


	// TODO: when internalApiVersion, accept an object for HTML attributes
	// (colspan should be no different)
	renderHeadDateCellHtml: function(date, colspan, otherAttrs) {
		var view = this.view;
		var isDateValid = this.dateProfile.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
		var classNames = [
			'fc-day-header',
			view.calendar.theme.getClass('widgetHeader')
		];
		var innerHtml = htmlEscape(date.format(this.colHeadFormat));

		// if only one row of days, the classNames on the header can represent the specific days beneath
		if (this.rowCnt === 1) {
			classNames = classNames.concat(
				// includes the day-of-week class
				// noThemeHighlight=true (don't highlight the header)
				this.getDayClasses(date, true)
			);
		}
		else {
			classNames.push('fc-' + dayIDs[date.day()]); // only add the day-of-week class
		}

		return '' +
            '<th class="' + classNames.join(' ') + '"' +
				((isDateValid && this.rowCnt) === 1 ?
					' data-date="' + date.format('YYYY-MM-DD') + '"' :
					'') +
				(colspan > 1 ?
					' colspan="' + colspan + '"' :
					'') +
				(otherAttrs ?
					' ' + otherAttrs :
					'') +
				'>' +
				(isDateValid ?
					// don't make a link if the heading could represent multiple days, or if there's only one day (forceOff)
					view.buildGotoAnchorHtml(
						{ date: date, forceOff: this.rowCnt > 1 || this.colCnt === 1 },
						innerHtml
					) :
					// if not valid, display text, but no link
					innerHtml
				) +
			'</th>';
	},


	/* Background Rendering
	------------------------------------------------------------------------------------------------------------------*/


	renderBgTrHtml: function(row) {
		return '' +
			'<tr>' +
				(this.isRTL ? '' : this.renderBgIntroHtml(row)) +
				this.renderBgCellsHtml(row) +
				(this.isRTL ? this.renderBgIntroHtml(row) : '') +
			'</tr>';
	},


	renderBgIntroHtml: function(row) {
		return this.renderIntroHtml(); // fall back to generic
	},


	renderBgCellsHtml: function(row) {
		var htmls = [];
		var col, date;

		for (col = 0; col < this.colCnt; col++) {
			date = this.getCellDate(row, col);
			htmls.push(this.renderBgCellHtml(date));
		}

		return htmls.join('');
	},


	renderBgCellHtml: function(date, otherAttrs) {
		var view = this.view;
		var isDateValid = this.dateProfile.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
		var classes = this.getDayClasses(date);

		classes.unshift('fc-day', view.calendar.theme.getClass('widgetContent'));

		return '<td class="' + classes.join(' ') + '"' +
			(isDateValid ?
				' data-date="' + date.format('YYYY-MM-DD') + '"' : // if date has a time, won't format it
				'') +
			(otherAttrs ?
				' ' + otherAttrs :
				'') +
			'></td>';
	},


	/* Generic
	------------------------------------------------------------------------------------------------------------------*/


	// Generates the default HTML intro for any row. User classes should override
	renderIntroHtml: function() {
	},


	// TODO: a generic method for dealing with <tr>, RTL, intro
	// when increment internalApiVersion
	// wrapTr (scheduler)


	/* Utils
	------------------------------------------------------------------------------------------------------------------*/


	// Applies the generic "intro" and "outro" HTML to the given cells.
	// Intro means the leftmost cell when the calendar is LTR and the rightmost cell when RTL. Vice-versa for outro.
	bookendCells: function(trEl) {
		var introHtml = this.renderIntroHtml();

		if (introHtml) {
			if (this.isRTL) {
				trEl.append(introHtml);
			}
			else {
				trEl.prepend(introHtml);
			}
		}
	}

};

;;

/* An abstract class from which other views inherit from
----------------------------------------------------------------------------------------------------------------------*/

var View = FC.View = InteractiveDateComponent.extend({

	type: null, // subclass' view name (string)
	name: null, // deprecated. use `type` instead
	title: null, // the text that will be displayed in the header's title

	calendar: null, // owner Calendar object
	viewSpec: null,
	options: null, // hash containing all options. already merged with view-specific-options

	renderQueue: null,
	batchRenderDepth: 0,
	queuedScroll: null,

	isSelected: false, // boolean whether a range of time is user-selected or not
	selectedEventInstance: null,

	eventOrderSpecs: null, // criteria for ordering events when they have same date/time

	// for date utils, computed from options
	isHiddenDayHash: null,

	// now indicator
	isNowIndicatorRendered: null,
	initialNowDate: null, // result first getNow call
	initialNowQueriedMs: null, // ms time the getNow was called
	nowIndicatorTimeoutID: null, // for refresh timing of now indicator
	nowIndicatorIntervalID: null, // "

	constructor: function(calendar, viewSpec) {
		this.calendar = calendar;
		this.viewSpec = viewSpec;

		// shortcuts
		this.type = viewSpec.type;
		this.options = viewSpec.options;

		// .name is deprecated
		this.name = this.type;

		InteractiveDateComponent.call(this);

		this.initRenderQueue();
		this.initHiddenDays();
		this.bindBaseRenderHandlers();
		this.eventOrderSpecs = parseFieldSpecs(this.opt('eventOrder'));

		// legacy
		if (this.initialize) {
			this.initialize();
		}
	},


	_getView: function() {
		return this;
	},


	// Retrieves an option with the given name
	opt: function(name) {
		return this.options[name];
	},


	/* Render Queue
	------------------------------------------------------------------------------------------------------------------*/


	initRenderQueue: function() {
		this.renderQueue = new RenderQueue({
			event: this.opt('eventRenderWait')
		});

		this.renderQueue.on('start', this.onRenderQueueStart.bind(this));
		this.renderQueue.on('stop', this.onRenderQueueStop.bind(this));

		this.on('before:change', this.startBatchRender);
		this.on('change', this.stopBatchRender);
	},


	onRenderQueueStart: function() {
		this.calendar.freezeContentHeight();
		this.addScroll(this.queryScroll());
	},


	onRenderQueueStop: function() {
		if (this.calendar.updateViewSize()) { // success?
			this.popScroll();
		}
		this.calendar.thawContentHeight();
	},


	startBatchRender: function() {
		if (!(this.batchRenderDepth++)) {
			this.renderQueue.pause();
		}
	},


	stopBatchRender: function() {
		if (!(--this.batchRenderDepth)) {
			this.renderQueue.resume();
		}
	},


	requestRender: function(func, namespace, actionType) {
		this.renderQueue.queue(func, namespace, actionType);
	},


	// given func will auto-bind to `this`
	whenSizeUpdated: function(func) {
		if (this.renderQueue.isRunning) {
			this.renderQueue.one('stop', func.bind(this));
		}
		else {
			func.call(this);
		}
	},


	/* Title and Date Formatting
	------------------------------------------------------------------------------------------------------------------*/


	// Computes what the title at the top of the calendar should be for this view
	computeTitle: function(dateProfile) {
		var unzonedRange;

		// for views that span a large unit of time, show the proper interval, ignoring stray days before and after
		if (/^(year|month)$/.test(dateProfile.currentRangeUnit)) {
			unzonedRange = dateProfile.currentUnzonedRange;
		}
		else { // for day units or smaller, use the actual day range
			unzonedRange = dateProfile.activeUnzonedRange;
		}

		return this.formatRange(
			{
				start: this.calendar.msToMoment(unzonedRange.startMs, dateProfile.isRangeAllDay),
				end: this.calendar.msToMoment(unzonedRange.endMs, dateProfile.isRangeAllDay)
			},
			dateProfile.isRangeAllDay,
			this.opt('titleFormat') || this.computeTitleFormat(dateProfile),
			this.opt('titleRangeSeparator')
		);
	},


	// Generates the format string that should be used to generate the title for the current date range.
	// Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
	computeTitleFormat: function(dateProfile) {
		var currentRangeUnit = dateProfile.currentRangeUnit;

		if (currentRangeUnit == 'year') {
			return 'YYYY';
		}
		else if (currentRangeUnit == 'month') {
			return this.opt('monthYearFormat'); // like "September 2014"
		}
		else if (dateProfile.currentUnzonedRange.as('days') > 1) {
			return 'll'; // multi-day range. shorter, like "Sep 9 - 10 2014"
		}
		else {
			return 'LL'; // one day. longer, like "September 9 2014"
		}
	},


	// Date Setting/Unsetting
	// -----------------------------------------------------------------------------------------------------------------


	setDate: function(date) {
		var currentDateProfile = this.get('dateProfile');
		var newDateProfile = this.buildDateProfile(date, null, true); // forceToValid=true

		if (
			!currentDateProfile ||
			!currentDateProfile.activeUnzonedRange.equals(newDateProfile.activeUnzonedRange)
		) {
			this.set('dateProfile', newDateProfile);
		}
	},


	unsetDate: function() {
		this.unset('dateProfile');
	},


	// Event Data
	// -----------------------------------------------------------------------------------------------------------------


	fetchInitialEvents: function(dateProfile) {
		var calendar = this.calendar;
		var forceAllDay = dateProfile.isRangeAllDay && !this.usesMinMaxTime;

		return calendar.requestEvents(
			calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, forceAllDay),
			calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, forceAllDay)
		);
	},


	bindEventChanges: function() {
		this.listenTo(this.calendar, 'eventsReset', this.resetEvents); // TODO: make this a real event
	},


	unbindEventChanges: function() {
		this.stopListeningTo(this.calendar, 'eventsReset');
	},


	setEvents: function(eventsPayload) {
		this.set('currentEvents', eventsPayload);
		this.set('hasEvents', true);
	},


	unsetEvents: function() {
		this.unset('currentEvents');
		this.unset('hasEvents');
	},


	resetEvents: function(eventsPayload) {
		this.startBatchRender();
		this.unsetEvents();
		this.setEvents(eventsPayload);
		this.stopBatchRender();
	},


	// Date High-level Rendering
	// -----------------------------------------------------------------------------------------------------------------


	requestDateRender: function(dateProfile) {
		var _this = this;

		this.requestRender(function() {
			_this.executeDateRender(dateProfile);
		}, 'date', 'init');
	},


	requestDateUnrender: function() {
		var _this = this;

		this.requestRender(function() {
			_this.executeDateUnrender();
		}, 'date', 'destroy');
	},


	// if dateProfile not specified, uses current
	executeDateRender: function(dateProfile) {
		DateComponent.prototype.executeDateRender.apply(this, arguments);

		if (this.render) {
			this.render(); // TODO: deprecate
		}

		this.trigger('datesRendered');
		this.addScroll({ isDateInit: true });
		this.startNowIndicator(); // shouldn't render yet because updateSize will be called soon
	},


	executeDateUnrender: function() {
		this.unselect();
		this.stopNowIndicator();
		this.trigger('before:datesUnrendered');

		if (this.destroy) {
			this.destroy(); // TODO: deprecate
		}

		DateComponent.prototype.executeDateUnrender.apply(this, arguments);
	},


	// "Base" rendering
	// -----------------------------------------------------------------------------------------------------------------


	bindBaseRenderHandlers: function() {
		var _this = this;

		this.on('datesRendered', function() {
			_this.whenSizeUpdated(
				_this.triggerViewRender
			);
		});

		this.on('before:datesUnrendered', function() {
			_this.triggerViewDestroy();
		});
	},


	triggerViewRender: function() {
		this.publiclyTrigger('viewRender', {
			context: this,
			args: [ this, this.el ]
		});
	},


	triggerViewDestroy: function() {
		this.publiclyTrigger('viewDestroy', {
			context: this,
			args: [ this, this.el ]
		});
	},


	// Event High-level Rendering
	// -----------------------------------------------------------------------------------------------------------------


	requestEventsRender: function(eventsPayload) {
		var _this = this;

		this.requestRender(function() {
			_this.executeEventRender(eventsPayload);
			_this.whenSizeUpdated(
				_this.triggerAfterEventsRendered
			);
		}, 'event', 'init');
	},


	requestEventsUnrender: function() {
		var _this = this;

		this.requestRender(function() {
			_this.triggerBeforeEventsDestroyed();
			_this.executeEventUnrender();
		}, 'event', 'destroy');
	},


	// Business Hour High-level Rendering
	// -----------------------------------------------------------------------------------------------------------------


	requestBusinessHoursRender: function(businessHourGenerator) {
		var _this = this;

		this.requestRender(function() {
			_this.renderBusinessHours(businessHourGenerator);
		}, 'businessHours', 'init');
	},

	requestBusinessHoursUnrender: function() {
		var _this = this;

		this.requestRender(function() {
			_this.unrenderBusinessHours();
		}, 'businessHours', 'destroy');
	},


	// Misc view rendering utils
	// -----------------------------------------------------------------------------------------------------------------


	// Binds DOM handlers to elements that reside outside the view container, such as the document
	bindGlobalHandlers: function() {
		InteractiveDateComponent.prototype.bindGlobalHandlers.apply(this, arguments);

		this.listenTo(GlobalEmitter.get(), {
			touchstart: this.processUnselect,
			mousedown: this.handleDocumentMousedown
		});
	},


	// Unbinds DOM handlers from elements that reside outside the view container
	unbindGlobalHandlers: function() {
		InteractiveDateComponent.prototype.unbindGlobalHandlers.apply(this, arguments);

		this.stopListeningTo(GlobalEmitter.get());
	},


	/* Now Indicator
	------------------------------------------------------------------------------------------------------------------*/


	// Immediately render the current time indicator and begins re-rendering it at an interval,
	// which is defined by this.getNowIndicatorUnit().
	// TODO: somehow do this for the current whole day's background too
	startNowIndicator: function() {
		var _this = this;
		var unit;
		var update;
		var delay; // ms wait value

		if (this.opt('nowIndicator')) {
			unit = this.getNowIndicatorUnit();
			if (unit) {
				update = proxy(this, 'updateNowIndicator'); // bind to `this`

				this.initialNowDate = this.calendar.getNow();
				this.initialNowQueriedMs = +new Date();

				// wait until the beginning of the next interval
				delay = this.initialNowDate.clone().startOf(unit).add(1, unit) - this.initialNowDate;
				this.nowIndicatorTimeoutID = setTimeout(function() {
					_this.nowIndicatorTimeoutID = null;
					update();
					delay = +moment.duration(1, unit);
					delay = Math.max(100, delay); // prevent too frequent
					_this.nowIndicatorIntervalID = setInterval(update, delay); // update every interval
				}, delay);
			}

			// rendering will be initiated in updateSize
		}
	},


	// rerenders the now indicator, computing the new current time from the amount of time that has passed
	// since the initial getNow call.
	updateNowIndicator: function() {
		if (
			this.isDatesRendered &&
			this.initialNowDate // activated before?
		) {
			this.unrenderNowIndicator(); // won't unrender if unnecessary
			this.renderNowIndicator(
				this.initialNowDate.clone().add(new Date() - this.initialNowQueriedMs) // add ms
			);
			this.isNowIndicatorRendered = true;
		}
	},


	// Immediately unrenders the view's current time indicator and stops any re-rendering timers.
	// Won't cause side effects if indicator isn't rendered.
	stopNowIndicator: function() {
		if (this.isNowIndicatorRendered) {

			if (this.nowIndicatorTimeoutID) {
				clearTimeout(this.nowIndicatorTimeoutID);
				this.nowIndicatorTimeoutID = null;
			}
			if (this.nowIndicatorIntervalID) {
				clearInterval(this.nowIndicatorIntervalID);
				this.nowIndicatorIntervalID = null;
			}

			this.unrenderNowIndicator();
			this.isNowIndicatorRendered = false;
		}
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/


	updateSize: function(totalHeight, isAuto, isResize) {

		if (this.setHeight) { // for legacy API
			this.setHeight(totalHeight, isAuto);
		}
		else {
			InteractiveDateComponent.prototype.updateSize.apply(this, arguments);
		}

		this.updateNowIndicator();
	},


	/* Scroller
	------------------------------------------------------------------------------------------------------------------*/


	addScroll: function(scroll) {
		var queuedScroll = this.queuedScroll || (this.queuedScroll = {});

		$.extend(queuedScroll, scroll);
	},


	popScroll: function() {
		this.applyQueuedScroll();
		this.queuedScroll = null;
	},


	applyQueuedScroll: function() {
		if (this.queuedScroll) {
			this.applyScroll(this.queuedScroll);
		}
	},


	queryScroll: function() {
		var scroll = {};

		if (this.isDatesRendered) {
			$.extend(scroll, this.queryDateScroll());
		}

		return scroll;
	},


	applyScroll: function(scroll) {
		if (scroll.isDateInit && this.isDatesRendered) {
			$.extend(scroll, this.computeInitialDateScroll());
		}

		if (this.isDatesRendered) {
			this.applyDateScroll(scroll);
		}
	},


	computeInitialDateScroll: function() {
		return {}; // subclasses must implement
	},


	queryDateScroll: function() {
		return {}; // subclasses must implement
	},


	applyDateScroll: function(scroll) {
		; // subclasses must implement
	},


	/* Event Drag-n-Drop
	------------------------------------------------------------------------------------------------------------------*/


	reportEventDrop: function(eventInstance, eventMutation, el, ev) {
		var eventManager = this.calendar.eventManager;
		var undoFunc = eventManager.mutateEventsWithId(
			eventInstance.def.id,
			eventMutation,
			this.calendar
		);
		var dateMutation = eventMutation.dateMutation;

		// update the EventInstance, for handlers
		if (dateMutation) {
			eventInstance.dateProfile = dateMutation.buildNewDateProfile(
				eventInstance.dateProfile,
				this.calendar
			);
		}

		this.triggerEventDrop(
			eventInstance,
			// a drop doesn't necessarily mean a date mutation (ex: resource change)
			(dateMutation && dateMutation.dateDelta) || moment.duration(),
			undoFunc,
			el, ev
		);
	},


	// Triggers event-drop handlers that have subscribed via the API
	triggerEventDrop: function(eventInstance, dateDelta, undoFunc, el, ev) {
		this.publiclyTrigger('eventDrop', {
			context: el[0],
			args: [
				eventInstance.toLegacy(),
				dateDelta,
				undoFunc,
				ev,
				{}, // {} = jqui dummy
				this
			]
		});
	},


	/* External Element Drag-n-Drop
	------------------------------------------------------------------------------------------------------------------*/


	// Must be called when an external element, via jQuery UI, has been dropped onto the calendar.
	// `meta` is the parsed data that has been embedded into the dragging event.
	// `dropLocation` is an object that contains the new zoned start/end/allDay values for the event.
	reportExternalDrop: function(singleEventDef, isEvent, isSticky, el, ev, ui) {

		if (isEvent) {
			this.calendar.eventManager.addEventDef(singleEventDef, isSticky);
		}

		this.triggerExternalDrop(singleEventDef, isEvent, el, ev, ui);
	},


	// Triggers external-drop handlers that have subscribed via the API
	triggerExternalDrop: function(singleEventDef, isEvent, el, ev, ui) {

		// trigger 'drop' regardless of whether element represents an event
		this.publiclyTrigger('drop', {
			context: el[0],
			args: [
				singleEventDef.dateProfile.start.clone(),
				ev,
				ui,
				this
			]
		});

		if (isEvent) {
			// signal an external event landed
			this.publiclyTrigger('eventReceive', {
				context: this,
				args: [
					singleEventDef.buildInstance().toLegacy(),
					this
				]
			});
		}
	},


	/* Event Resizing
	------------------------------------------------------------------------------------------------------------------*/


	// Must be called when an event in the view has been resized to a new length
	reportEventResize: function(eventInstance, eventMutation, el, ev) {
		var eventManager = this.calendar.eventManager;
		var undoFunc = eventManager.mutateEventsWithId(
			eventInstance.def.id,
			eventMutation,
			this.calendar
		);

		// update the EventInstance, for handlers
		eventInstance.dateProfile = eventMutation.dateMutation.buildNewDateProfile(
			eventInstance.dateProfile,
			this.calendar
		);

		this.triggerEventResize(
			eventInstance,
			eventMutation.dateMutation.endDelta,
			undoFunc,
			el, ev
		);
	},


	// Triggers event-resize handlers that have subscribed via the API
	triggerEventResize: function(eventInstance, durationDelta, undoFunc, el, ev) {
		this.publiclyTrigger('eventResize', {
			context: el[0],
			args: [
				eventInstance.toLegacy(),
				durationDelta,
				undoFunc,
				ev,
				{}, // {} = jqui dummy
				this
			]
		});
	},


	/* Selection (time range)
	------------------------------------------------------------------------------------------------------------------*/


	// Selects a date span on the view. `start` and `end` are both Moments.
	// `ev` is the native mouse event that begin the interaction.
	select: function(footprint, ev) {
		this.unselect(ev);
		this.renderSelectionFootprint(footprint);
		this.reportSelection(footprint, ev);
	},


	renderSelectionFootprint: function(footprint, ev) {
		if (this.renderSelection) { // legacy method in custom view classes
			this.renderSelection(
				footprint.toLegacy(this.calendar)
			);
		}
		else {
			InteractiveDateComponent.prototype.renderSelectionFootprint.apply(this, arguments);
		}
	},


	// Called when a new selection is made. Updates internal state and triggers handlers.
	reportSelection: function(footprint, ev) {
		this.isSelected = true;
		this.triggerSelect(footprint, ev);
	},


	// Triggers handlers to 'select'
	triggerSelect: function(footprint, ev) {
		var dateProfile = this.calendar.footprintToDateProfile(footprint); // abuse of "Event"DateProfile?

		this.publiclyTrigger('select', {
			context: this,
			args: [
				dateProfile.start,
				dateProfile.end,
				ev,
				this
			]
		});
	},


	// Undoes a selection. updates in the internal state and triggers handlers.
	// `ev` is the native mouse event that began the interaction.
	unselect: function(ev) {
		if (this.isSelected) {
			this.isSelected = false;
			if (this.destroySelection) {
				this.destroySelection(); // TODO: deprecate
			}
			this.unrenderSelection();
			this.publiclyTrigger('unselect', {
				context: this,
				args: [ ev, this ]
			});
		}
	},


	/* Event Selection
	------------------------------------------------------------------------------------------------------------------*/


	selectEventInstance: function(eventInstance) {
		if (
			!this.selectedEventInstance ||
			this.selectedEventInstance !== eventInstance
		) {
			this.unselectEventInstance();

			this.getEventSegs().forEach(function(seg) {
				if (
					seg.footprint.eventInstance === eventInstance &&
					seg.el // necessary?
				) {
					seg.el.addClass('fc-selected');
				}
			});

			this.selectedEventInstance = eventInstance;
		}
	},


	unselectEventInstance: function() {
		if (this.selectedEventInstance) {

			this.getEventSegs().forEach(function(seg) {
				if (seg.el) { // necessary?
					seg.el.removeClass('fc-selected');
				}
			});

			this.selectedEventInstance = null;
		}
	},


	isEventDefSelected: function(eventDef) {
		// event references might change on refetchEvents(), while selectedEventInstance doesn't,
		// so compare IDs
		return this.selectedEventInstance && this.selectedEventInstance.def.id === eventDef.id;
	},


	/* Mouse / Touch Unselecting (time range & event unselection)
	------------------------------------------------------------------------------------------------------------------*/
	// TODO: move consistently to down/start or up/end?
	// TODO: don't kill previous selection if touch scrolling


	handleDocumentMousedown: function(ev) {
		if (isPrimaryMouseButton(ev)) {
			this.processUnselect(ev);
		}
	},


	processUnselect: function(ev) {
		this.processRangeUnselect(ev);
		this.processEventUnselect(ev);
	},


	processRangeUnselect: function(ev) {
		var ignore;

		// is there a time-range selection?
		if (this.isSelected && this.opt('unselectAuto')) {
			// only unselect if the clicked element is not identical to or inside of an 'unselectCancel' element
			ignore = this.opt('unselectCancel');
			if (!ignore || !$(ev.target).closest(ignore).length) {
				this.unselect(ev);
			}
		}
	},


	processEventUnselect: function(ev) {
		if (this.selectedEventInstance) {
			if (!$(ev.target).closest('.fc-selected').length) {
				this.unselectEventInstance();
			}
		}
	},


	/* Triggers
	------------------------------------------------------------------------------------------------------------------*/


	triggerBaseRendered: function() {
		this.publiclyTrigger('viewRender', {
			context: this,
			args: [ this, this.el ]
		});
	},


	triggerBaseUnrendered: function() {
		this.publiclyTrigger('viewDestroy', {
			context: this,
			args: [ this, this.el ]
		});
	},


	// Triggers handlers to 'dayClick'
	// Span has start/end of the clicked area. Only the start is useful.
	triggerDayClick: function(footprint, dayEl, ev) {
		var dateProfile = this.calendar.footprintToDateProfile(footprint); // abuse of "Event"DateProfile?

		this.publiclyTrigger('dayClick', {
			context: dayEl,
			args: [ dateProfile.start, ev, this ]
		});
	}

});


View.watch('displayingDates', [ 'isInDom', 'dateProfile' ], function(deps) {
	this.requestDateRender(deps.dateProfile);
}, function() {
	this.requestDateUnrender();
});


View.watch('displayingBusinessHours', [ 'displayingDates', 'businessHourGenerator' ], function(deps) {
	this.requestBusinessHoursRender(deps.businessHourGenerator);
}, function() {
	this.requestBusinessHoursUnrender();
});


View.watch('initialEvents', [ 'dateProfile' ], function(deps) {
	return this.fetchInitialEvents(deps.dateProfile);
});


View.watch('bindingEvents', [ 'initialEvents' ], function(deps) {
	this.setEvents(deps.initialEvents);
	this.bindEventChanges();
}, function() {
	this.unbindEventChanges();
	this.unsetEvents();
});


View.watch('displayingEvents', [ 'displayingDates', 'hasEvents' ], function() {
	this.requestEventsRender(this.get('currentEvents'));
}, function() {
	this.requestEventsUnrender();
});


View.watch('title', [ 'dateProfile' ], function(deps) {
	return (this.title = this.computeTitle(deps.dateProfile)); // assign to View for legacy reasons
});


View.watch('legacyDateProps', [ 'dateProfile' ], function(deps) {
	var calendar = this.calendar;
	var dateProfile = deps.dateProfile;

	// DEPRECATED, but we need to keep it updated...
	this.start = calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, dateProfile.isRangeAllDay);
	this.end = calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, dateProfile.isRangeAllDay);
	this.intervalStart = calendar.msToMoment(dateProfile.currentUnzonedRange.startMs, dateProfile.isRangeAllDay);
	this.intervalEnd = calendar.msToMoment(dateProfile.currentUnzonedRange.endMs, dateProfile.isRangeAllDay);
});

;;

View.mixin({

	usesMinMaxTime: false, // whether minTime/maxTime will affect the activeUnzonedRange. Views must opt-in.

	// DEPRECATED
	start: null, // use activeUnzonedRange
	end: null, // use activeUnzonedRange
	intervalStart: null, // use currentUnzonedRange
	intervalEnd: null, // use currentUnzonedRange


	/* Date Range Computation
	------------------------------------------------------------------------------------------------------------------*/


	// Builds a structure with info about what the dates/ranges will be for the "prev" view.
	buildPrevDateProfile: function(date) {
		var dateProfile = this.get('dateProfile');
		var prevDate = date.clone().startOf(dateProfile.currentRangeUnit)
			.subtract(dateProfile.dateIncrement);

		return this.buildDateProfile(prevDate, -1);
	},


	// Builds a structure with info about what the dates/ranges will be for the "next" view.
	buildNextDateProfile: function(date) {
		var dateProfile = this.get('dateProfile');
		var nextDate = date.clone().startOf(dateProfile.currentRangeUnit)
			.add(dateProfile.dateIncrement);

		return this.buildDateProfile(nextDate, 1);
	},


	// Builds a structure holding dates/ranges for rendering around the given date.
	// Optional direction param indicates whether the date is being incremented/decremented
	// from its previous value. decremented = -1, incremented = 1 (default).
	buildDateProfile: function(date, direction, forceToValid) {
		var isDateAllDay = !date.hasTime();
		var validUnzonedRange;
		var minTime = null;
		var maxTime = null;
		var currentInfo;
		var isRangeAllDay;
		var renderUnzonedRange;
		var activeUnzonedRange;
		var isValid;

		validUnzonedRange = this.buildValidRange();
		validUnzonedRange = this.trimHiddenDays(validUnzonedRange);

		if (forceToValid) {
			date = this.calendar.msToUtcMoment(
				validUnzonedRange.constrainDate(date), // returns MS
				isDateAllDay
			);
		}

		currentInfo = this.buildCurrentRangeInfo(date, direction);
		isRangeAllDay = /^(year|month|week|day)$/.test(currentInfo.unit);
		renderUnzonedRange = this.buildRenderRange(
			this.trimHiddenDays(currentInfo.unzonedRange),
			currentInfo.unit,
			isRangeAllDay
		);
		renderUnzonedRange = this.trimHiddenDays(renderUnzonedRange);
		activeUnzonedRange = renderUnzonedRange.clone();

		if (!this.opt('showNonCurrentDates')) {
			activeUnzonedRange = activeUnzonedRange.intersect(currentInfo.unzonedRange);
		}

		minTime = moment.duration(this.opt('minTime'));
		maxTime = moment.duration(this.opt('maxTime'));
		activeUnzonedRange = this.adjustActiveRange(activeUnzonedRange, minTime, maxTime);
		activeUnzonedRange = activeUnzonedRange.intersect(validUnzonedRange); // might return null

		if (activeUnzonedRange) {
			date = this.calendar.msToUtcMoment(
				activeUnzonedRange.constrainDate(date), // returns MS
				isDateAllDay
			);
		}

		// it's invalid if the originally requested date is not contained,
		// or if the range is completely outside of the valid range.
		isValid = currentInfo.unzonedRange.intersectsWith(validUnzonedRange);

		return {
			// constraint for where prev/next operations can go and where events can be dragged/resized to.
			// an object with optional start and end properties.
			validUnzonedRange: validUnzonedRange,

			// range the view is formally responsible for.
			// for example, a month view might have 1st-31st, excluding padded dates
			currentUnzonedRange: currentInfo.unzonedRange,

			// name of largest unit being displayed, like "month" or "week"
			currentRangeUnit: currentInfo.unit,

			isRangeAllDay: isRangeAllDay,

			// dates that display events and accept drag-n-drop
			// will be `null` if no dates accept events
			activeUnzonedRange: activeUnzonedRange,

			// date range with a rendered skeleton
			// includes not-active days that need some sort of DOM
			renderUnzonedRange: renderUnzonedRange,

			// Duration object that denotes the first visible time of any given day
			minTime: minTime,

			// Duration object that denotes the exclusive visible end time of any given day
			maxTime: maxTime,

			isValid: isValid,

			date: date,

			// how far the current date will move for a prev/next operation
			dateIncrement: this.buildDateIncrement(currentInfo.duration)
				// pass a fallback (might be null) ^
		};
	},


	// Builds an object with optional start/end properties.
	// Indicates the minimum/maximum dates to display.
	// not responsible for trimming hidden days.
	buildValidRange: function() {
		return this.getUnzonedRangeOption('validRange', this.calendar.getNow()) ||
			new UnzonedRange(); // completely open-ended
	},


	// Builds a structure with info about the "current" range, the range that is
	// highlighted as being the current month for example.
	// See buildDateProfile for a description of `direction`.
	// Guaranteed to have `range` and `unit` properties. `duration` is optional.
	// TODO: accept a MS-time instead of a moment `date`?
	buildCurrentRangeInfo: function(date, direction) {
		var duration = null;
		var unit = null;
		var unzonedRange = null;
		var dayCount;

		if (this.viewSpec.duration) {
			duration = this.viewSpec.duration;
			unit = this.viewSpec.durationUnit;
			unzonedRange = this.buildRangeFromDuration(date, direction, duration, unit);
		}
		else if ((dayCount = this.opt('dayCount'))) {
			unit = 'day';
			unzonedRange = this.buildRangeFromDayCount(date, direction, dayCount);
		}
		else if ((unzonedRange = this.buildCustomVisibleRange(date))) {
			unit = computeGreatestUnit(unzonedRange.getStart(), unzonedRange.getEnd());
		}
		else {
			duration = this.getFallbackDuration();
			unit = computeGreatestUnit(duration);
			unzonedRange = this.buildRangeFromDuration(date, direction, duration, unit);
		}

		return { duration: duration, unit: unit, unzonedRange: unzonedRange };
	},


	getFallbackDuration: function() {
		return moment.duration({ days: 1 });
	},


	// Returns a new activeUnzonedRange to have time values (un-ambiguate)
	// minTime or maxTime causes the range to expand.
	adjustActiveRange: function(unzonedRange, minTime, maxTime) {
		var start = unzonedRange.getStart();
		var end = unzonedRange.getEnd();

		if (this.usesMinMaxTime) {

			if (minTime < 0) {
				start.time(0).add(minTime);
			}

			if (maxTime > 24 * 60 * 60 * 1000) { // beyond 24 hours?
				end.time(maxTime - (24 * 60 * 60 * 1000));
			}
		}

		return new UnzonedRange(start, end);
	},


	// Builds the "current" range when it is specified as an explicit duration.
	// `unit` is the already-computed computeGreatestUnit value of duration.
	// TODO: accept a MS-time instead of a moment `date`?
	buildRangeFromDuration: function(date, direction, duration, unit) {
		var alignment = this.opt('dateAlignment');
		var start = date.clone();
		var end;
		var dateIncrementInput;
		var dateIncrementDuration;

		// if the view displays a single day or smaller
		if (duration.as('days') <= 1) {
			if (this.isHiddenDay(start)) {
				start = this.skipHiddenDays(start, direction);
				start.startOf('day');
			}
		}

		// compute what the alignment should be
		if (!alignment) {
			dateIncrementInput = this.opt('dateIncrement');

			if (dateIncrementInput) {
				dateIncrementDuration = moment.duration(dateIncrementInput);

				// use the smaller of the two units
				if (dateIncrementDuration < duration) {
					alignment = computeDurationGreatestUnit(dateIncrementDuration, dateIncrementInput);
				}
				else {
					alignment = unit;
				}
			}
			else {
				alignment = unit;
			}
		}

		start.startOf(alignment);
		end = start.clone().add(duration);

		return new UnzonedRange(start, end);
	},


	// Builds the "current" range when a dayCount is specified.
	// TODO: accept a MS-time instead of a moment `date`?
	buildRangeFromDayCount: function(date, direction, dayCount) {
		var customAlignment = this.opt('dateAlignment');
		var runningCount = 0;
		var start = date.clone();
		var end;

		if (customAlignment) {
			start.startOf(customAlignment);
		}

		start.startOf('day');
		start = this.skipHiddenDays(start, direction);

		end = start.clone();
		do {
			end.add(1, 'day');
			if (!this.isHiddenDay(end)) {
				runningCount++;
			}
		} while (runningCount < dayCount);

		return new UnzonedRange(start, end);
	},


	// Builds a normalized range object for the "visible" range,
	// which is a way to define the currentUnzonedRange and activeUnzonedRange at the same time.
	// TODO: accept a MS-time instead of a moment `date`?
	buildCustomVisibleRange: function(date) {
		var visibleUnzonedRange = this.getUnzonedRangeOption(
			'visibleRange',
			this.calendar.applyTimezone(date) // correct zone. also generates new obj that avoids mutations
		);

		if (visibleUnzonedRange && (visibleUnzonedRange.startMs === null || visibleUnzonedRange.endMs === null)) {
			return null;
		}

		return visibleUnzonedRange;
	},


	// Computes the range that will represent the element/cells for *rendering*,
	// but which may have voided days/times.
	// not responsible for trimming hidden days.
	buildRenderRange: function(currentUnzonedRange, currentRangeUnit, isRangeAllDay) {
		return currentUnzonedRange.clone();
	},


	// Compute the duration value that should be added/substracted to the current date
	// when a prev/next operation happens.
	buildDateIncrement: function(fallback) {
		var dateIncrementInput = this.opt('dateIncrement');
		var customAlignment;

		if (dateIncrementInput) {
			return moment.duration(dateIncrementInput);
		}
		else if ((customAlignment = this.opt('dateAlignment'))) {
			return moment.duration(1, customAlignment);
		}
		else if (fallback) {
			return fallback;
		}
		else {
			return moment.duration({ days: 1 });
		}
	},


	// Remove days from the beginning and end of the range that are computed as hidden.
	trimHiddenDays: function(inputUnzonedRange) {
		var start = inputUnzonedRange.getStart();
		var end = inputUnzonedRange.getEnd();

		if (start) {
			start = this.skipHiddenDays(start);
		}

		if (end) {
			end = this.skipHiddenDays(end, -1, true);
		}

		return new UnzonedRange(start, end);
	},


	// For DateComponent::getDayClasses
	isDateInOtherMonth: function(date, dateProfile) {
		return false;
	},


	// Arguments after name will be forwarded to a hypothetical function value
	// WARNING: passed-in arguments will be given to generator functions as-is and can cause side-effects.
	// Always clone your objects if you fear mutation.
	getUnzonedRangeOption: function(name) {
		var val = this.opt(name);

		if (typeof val === 'function') {
			val = val.apply(
				null,
				Array.prototype.slice.call(arguments, 1)
			);
		}

		if (val) {
			return this.calendar.parseUnzonedRange(val);
		}
	},


	/* Hidden Days
	------------------------------------------------------------------------------------------------------------------*/


	// Initializes internal variables related to calculating hidden days-of-week
	initHiddenDays: function() {
		var hiddenDays = this.opt('hiddenDays') || []; // array of day-of-week indices that are hidden
		var isHiddenDayHash = []; // is the day-of-week hidden? (hash with day-of-week-index -> bool)
		var dayCnt = 0;
		var i;

		if (this.opt('weekends') === false) {
			hiddenDays.push(0, 6); // 0=sunday, 6=saturday
		}

		for (i = 0; i < 7; i++) {
			if (
				!(isHiddenDayHash[i] = $.inArray(i, hiddenDays) !== -1)
			) {
				dayCnt++;
			}
		}

		if (!dayCnt) {
			throw 'invalid hiddenDays'; // all days were hidden? bad.
		}

		this.isHiddenDayHash = isHiddenDayHash;
	},


	// Is the current day hidden?
	// `day` is a day-of-week index (0-6), or a Moment
	isHiddenDay: function(day) {
		if (moment.isMoment(day)) {
			day = day.day();
		}
		return this.isHiddenDayHash[day];
	},


	// Incrementing the current day until it is no longer a hidden day, returning a copy.
	// DOES NOT CONSIDER validUnzonedRange!
	// If the initial value of `date` is not a hidden day, don't do anything.
	// Pass `isExclusive` as `true` if you are dealing with an end date.
	// `inc` defaults to `1` (increment one day forward each time)
	skipHiddenDays: function(date, inc, isExclusive) {
		var out = date.clone();
		inc = inc || 1;
		while (
			this.isHiddenDayHash[(out.day() + (isExclusive ? inc : 0) + 7) % 7]
		) {
			out.add(inc, 'days');
		}
		return out;
	}

});

;;

/* Toolbar with buttons and title
----------------------------------------------------------------------------------------------------------------------*/

function Toolbar(calendar, toolbarOptions) {
	var t = this;

	// exports
	t.setToolbarOptions = setToolbarOptions;
	t.render = render;
	t.removeElement = removeElement;
	t.updateTitle = updateTitle;
	t.activateButton = activateButton;
	t.deactivateButton = deactivateButton;
	t.disableButton = disableButton;
	t.enableButton = enableButton;
	t.getViewsWithButtons = getViewsWithButtons;
	t.el = null; // mirrors local `el`

	// locals
	var el;
	var viewsWithButtons = [];

	// method to update toolbar-specific options, not calendar-wide options
	function setToolbarOptions(newToolbarOptions) {
		toolbarOptions = newToolbarOptions;
	}

	// can be called repeatedly and will rerender
	function render() {
		var sections = toolbarOptions.layout;

		if (sections) {
			if (!el) {
				el = this.el = $("<div class='fc-toolbar "+ toolbarOptions.extraClasses + "'/>");
			}
			else {
				el.empty();
			}
			el.append(renderSection('left'))
				.append(renderSection('right'))
				.append(renderSection('center'))
				.append('<div class="fc-clear"/>');
		}
		else {
			removeElement();
		}
	}


	function removeElement() {
		if (el) {
			el.remove();
			el = t.el = null;
		}
	}


	function renderSection(position) {
		var theme = calendar.theme;
		var sectionEl = $('<div class="fc-' + position + '"/>');
		var buttonStr = toolbarOptions.layout[position];
		var calendarCustomButtons = calendar.opt('customButtons') || {};
		var calendarButtonTextOverrides = calendar.overrides.buttonText || {};
		var calendarButtonText = calendar.opt('buttonText') || {};

		if (buttonStr) {
			$.each(buttonStr.split(' '), function(i) {
				var groupChildren = $();
				var isOnlyButtons = true;
				var groupEl;

				$.each(this.split(','), function(j, buttonName) {
					var customButtonProps;
					var viewSpec;
					var buttonClick;
					var buttonIcon; // only one of these will be set
					var buttonText; // "
					var buttonInnerHtml;
					var buttonClasses;
					var buttonEl;

					if (buttonName == 'title') {
						groupChildren = groupChildren.add($('<h2>&nbsp;</h2>')); // we always want it to take up height
						isOnlyButtons = false;
					}
					else {

						if ((customButtonProps = calendarCustomButtons[buttonName])) {
							buttonClick = function(ev) {
								if (customButtonProps.click) {
									customButtonProps.click.call(buttonEl[0], ev);
								}
							};
							(buttonIcon = theme.getCustomButtonIconClass(customButtonProps)) ||
							(buttonIcon = theme.getIconClass(buttonName)) ||
							(buttonText = customButtonProps.text); // jshint ignore:line
						}
						else if ((viewSpec = calendar.getViewSpec(buttonName))) {
							viewsWithButtons.push(buttonName);
							buttonClick = function() {
								calendar.changeView(buttonName);
							};
							(buttonText = viewSpec.buttonTextOverride) ||
							(buttonIcon = theme.getIconClass(buttonName)) ||
							(buttonText = viewSpec.buttonTextDefault); // jshint ignore:line
						}
						else if (calendar[buttonName]) { // a calendar method
							buttonClick = function() {
								calendar[buttonName]();
							};
							(buttonText = calendarButtonTextOverrides[buttonName]) ||
							(buttonIcon = theme.getIconClass(buttonName)) ||
							(buttonText = calendarButtonText[buttonName]); // jshint ignore:line
							//            ^ everything else is considered default
						}

						if (buttonClick) {

							buttonClasses = [
								'fc-' + buttonName + '-button',
								theme.getClass('button'),
								theme.getClass('stateDefault')
							];

							if (buttonText) {
								buttonInnerHtml = htmlEscape(buttonText);
							}
							else if (buttonIcon) {
								buttonInnerHtml = "<span class='" + buttonIcon + "'></span>";
							}

							buttonEl = $( // type="button" so that it doesn't submit a form
								'<button type="button" class="' + buttonClasses.join(' ') + '">' +
									buttonInnerHtml +
								'</button>'
								)
								.click(function(ev) {
									// don't process clicks for disabled buttons
									if (!buttonEl.hasClass(theme.getClass('stateDisabled'))) {

										buttonClick(ev);

										// after the click action, if the button becomes the "active" tab, or disabled,
										// it should never have a hover class, so remove it now.
										if (
											buttonEl.hasClass(theme.getClass('stateActive')) ||
											buttonEl.hasClass(theme.getClass('stateDisabled'))
										) {
											buttonEl.removeClass(theme.getClass('stateHover'));
										}
									}
								})
								.mousedown(function() {
									// the *down* effect (mouse pressed in).
									// only on buttons that are not the "active" tab, or disabled
									buttonEl
										.not('.' + theme.getClass('stateActive'))
										.not('.' + theme.getClass('stateDisabled'))
										.addClass(theme.getClass('stateDown'));
								})
								.mouseup(function() {
									// undo the *down* effect
									buttonEl.removeClass(theme.getClass('stateDown'));
								})
								.hover(
									function() {
										// the *hover* effect.
										// only on buttons that are not the "active" tab, or disabled
										buttonEl
											.not('.' + theme.getClass('stateActive'))
											.not('.' + theme.getClass('stateDisabled'))
											.addClass(theme.getClass('stateHover'));
									},
									function() {
										// undo the *hover* effect
										buttonEl
											.removeClass(theme.getClass('stateHover'))
											.removeClass(theme.getClass('stateDown')); // if mouseleave happens before mouseup
									}
								);

							groupChildren = groupChildren.add(buttonEl);
						}
					}
				});

				if (isOnlyButtons) {
					groupChildren
						.first().addClass(theme.getClass('cornerLeft')).end()
						.last().addClass(theme.getClass('cornerRight')).end();
				}

				if (groupChildren.length > 1) {
					groupEl = $('<div/>');
					if (isOnlyButtons) {
						groupEl.addClass(theme.getClass('buttonGroup'));
					}
					groupEl.append(groupChildren);
					sectionEl.append(groupEl);
				}
				else {
					sectionEl.append(groupChildren); // 1 or 0 children
				}
			});
		}

		return sectionEl;
	}


	function updateTitle(text) {
		if (el) {
			el.find('h2').text(text);
		}
	}


	function activateButton(buttonName) {
		if (el) {
			el.find('.fc-' + buttonName + '-button')
				.addClass(calendar.theme.getClass('stateActive'));
		}
	}


	function deactivateButton(buttonName) {
		if (el) {
			el.find('.fc-' + buttonName + '-button')
				.removeClass(calendar.theme.getClass('stateActive'));
		}
	}


	function disableButton(buttonName) {
		if (el) {
			el.find('.fc-' + buttonName + '-button')
				.prop('disabled', true)
				.addClass(calendar.theme.getClass('stateDisabled'));
		}
	}


	function enableButton(buttonName) {
		if (el) {
			el.find('.fc-' + buttonName + '-button')
				.prop('disabled', false)
				.removeClass(calendar.theme.getClass('stateDisabled'));
		}
	}


	function getViewsWithButtons() {
		return viewsWithButtons;
	}

}

;;

var Calendar = FC.Calendar = Class.extend(EmitterMixin, ListenerMixin, {

	view: null, // current View object
	viewsByType: null, // holds all instantiated view instances, current or not
	currentDate: null, // unzoned moment. private (public API should use getDate instead)
	theme: null,
	businessHourGenerator: null,
	loadingLevel: 0, // number of simultaneous loading tasks


	constructor: function(el, overrides) {

		// declare the current calendar instance relies on GlobalEmitter. needed for garbage collection.
		// unneeded() is called in destroy.
		GlobalEmitter.needed();

		this.el = el;
		this.viewsByType = {};
		this.viewSpecCache = {};

		this.initOptionsInternals(overrides);
		this.initMomentInternals(); // needs to happen after options hash initialized
		this.initCurrentDate();
		this.initEventManager();

		this.constructed();
	},


	// useful for monkeypatching. TODO: BaseClass?
	constructed: function() {
	},


	// Public API
	// -----------------------------------------------------------------------------------------------------------------


	getView: function() {
		return this.view;
	},


	publiclyTrigger: function(name, triggerInfo) {
		var optHandler = this.opt(name);
		var context;
		var args;

		if ($.isPlainObject(triggerInfo)) {
			context = triggerInfo.context;
			args = triggerInfo.args;
		}
		else if ($.isArray(triggerInfo)) {
			args = triggerInfo;
		}

		if (context == null) {
			context = this.el[0]; // fallback context
		}

		if (!args) {
			args = [];
		}

		this.triggerWith(name, context, args); // Emitter's method

		if (optHandler) {
			return optHandler.apply(context, args);
		}
	},


	hasPublicHandlers: function(name) {
		return this.hasHandlers(name) ||
			this.opt(name); // handler specified in options
	},


	// View
	// -----------------------------------------------------------------------------------------------------------------


	// Given a view name for a custom view or a standard view, creates a ready-to-go View object
	instantiateView: function(viewType) {
		var spec = this.getViewSpec(viewType);

		return new spec['class'](this, spec);
	},


	// Returns a boolean about whether the view is okay to instantiate at some point
	isValidViewType: function(viewType) {
		return Boolean(this.getViewSpec(viewType));
	},


	changeView: function(viewName, dateOrRange) {

		if (dateOrRange) {

			if (dateOrRange.start && dateOrRange.end) { // a range
				this.recordOptionOverrides({ // will not rerender
					visibleRange: dateOrRange
				});
			}
			else { // a date
				this.currentDate = this.moment(dateOrRange).stripZone(); // just like gotoDate
			}
		}

		this.renderView(viewName);
	},


	// Forces navigation to a view for the given date.
	// `viewType` can be a specific view name or a generic one like "week" or "day".
	zoomTo: function(newDate, viewType) {
		var spec;

		viewType = viewType || 'day'; // day is default zoom
		spec = this.getViewSpec(viewType) || this.getUnitViewSpec(viewType);

		this.currentDate = newDate.clone();
		this.renderView(spec ? spec.type : null);
	},


	// Current Date
	// -----------------------------------------------------------------------------------------------------------------


	initCurrentDate: function() {
		var defaultDateInput = this.opt('defaultDate');

		// compute the initial ambig-timezone date
		if (defaultDateInput != null) {
			this.currentDate = this.moment(defaultDateInput).stripZone();
		}
		else {
			this.currentDate = this.getNow(); // getNow already returns unzoned
		}
	},


	prev: function() {
		var prevInfo = this.view.buildPrevDateProfile(this.currentDate);

		if (prevInfo.isValid) {
			this.currentDate = prevInfo.date;
			this.renderView();
		}
	},


	next: function() {
		var nextInfo = this.view.buildNextDateProfile(this.currentDate);

		if (nextInfo.isValid) {
			this.currentDate = nextInfo.date;
			this.renderView();
		}
	},


	prevYear: function() {
		this.currentDate.add(-1, 'years');
		this.renderView();
	},


	nextYear: function() {
		this.currentDate.add(1, 'years');
		this.renderView();
	},


	today: function() {
		this.currentDate = this.getNow(); // should deny like prev/next?
		this.renderView();
	},


	gotoDate: function(zonedDateInput) {
		this.currentDate = this.moment(zonedDateInput).stripZone();
		this.renderView();
	},


	incrementDate: function(delta) {
		this.currentDate.add(moment.duration(delta));
		this.renderView();
	},


	// for external API
	getDate: function() {
		return this.applyTimezone(this.currentDate); // infuse the calendar's timezone
	},


	// Loading Triggering
	// -----------------------------------------------------------------------------------------------------------------


	// Should be called when any type of async data fetching begins
	pushLoading: function() {
		if (!(this.loadingLevel++)) {
			this.publiclyTrigger('loading', [ true, this.view ]);
		}
	},


	// Should be called when any type of async data fetching completes
	popLoading: function() {
		if (!(--this.loadingLevel)) {
			this.publiclyTrigger('loading', [ false, this.view ]);
		}
	},


	// Selection
	// -----------------------------------------------------------------------------------------------------------------


	// this public method receives start/end dates in any format, with any timezone
	select: function(zonedStartInput, zonedEndInput) {
		this.view.select(
			this.buildSelectFootprint.apply(this, arguments)
		);
	},


	unselect: function() { // safe to be called before renderView
		if (this.view) {
			this.view.unselect();
		}
	},


	// Given arguments to the select method in the API, returns a span (unzoned start/end and other info)
	buildSelectFootprint: function(zonedStartInput, zonedEndInput) {
		var start = this.moment(zonedStartInput).stripZone();
		var end;

		if (zonedEndInput) {
			end = this.moment(zonedEndInput).stripZone();
		}
		else if (start.hasTime()) {
			end = start.clone().add(this.defaultTimedEventDuration);
		}
		else {
			end = start.clone().add(this.defaultAllDayEventDuration);
		}

		return new ComponentFootprint(
			new UnzonedRange(start, end),
			!start.hasTime()
		);
	},


	// Misc
	// -----------------------------------------------------------------------------------------------------------------


	// will return `null` if invalid range
	parseUnzonedRange: function(rangeInput) {
		var start = null;
		var end = null;

		if (rangeInput.start) {
			start = this.moment(rangeInput.start).stripZone();
		}

		if (rangeInput.end) {
			end = this.moment(rangeInput.end).stripZone();
		}

		if (!start && !end) {
			return null;
		}

		if (start && end && end.isBefore(start)) {
			return null;
		}

		return new UnzonedRange(start, end);
	},


	rerenderEvents: function() { // API method. destroys old events if previously rendered.
		this.view.flash('displayingEvents');
	},


	initEventManager: function() {
		var _this = this;
		var eventManager = new EventManager(this);
		var rawSources = this.opt('eventSources') || [];
		var singleRawSource = this.opt('events');

		this.eventManager = eventManager;

		if (singleRawSource) {
			rawSources.unshift(singleRawSource);
		}

		eventManager.on('release', function(eventsPayload) {
			_this.trigger('eventsReset', eventsPayload);
		});

		eventManager.freeze();

		rawSources.forEach(function(rawSource) {
			var source = EventSourceParser.parse(rawSource, _this);

			if (source) {
				eventManager.addSource(source);
			}
		});

		eventManager.thaw();
	},


	requestEvents: function(start, end) {
		return this.eventManager.requestEvents(
			start,
			end,
			this.opt('timezone'),
			!this.opt('lazyFetching')
		);
	}

});

;;
/*
Options binding/triggering system.
*/
Calendar.mixin({

	dirDefaults: null, // option defaults related to LTR or RTL
	localeDefaults: null, // option defaults related to current locale
	overrides: null, // option overrides given to the fullCalendar constructor
	dynamicOverrides: null, // options set with dynamic setter method. higher precedence than view overrides.
	optionsModel: null, // all defaults combined with overrides


	initOptionsInternals: function(overrides) {
		this.overrides = $.extend({}, overrides); // make a copy
		this.dynamicOverrides = {};
		this.optionsModel = new Model();

		this.populateOptionsHash();
	},


	// public getter/setter
	option: function(name, value) {
		var newOptionHash;

		if (typeof name === 'string') {
			if (value === undefined) { // getter
				return this.optionsModel.get(name);
			}
			else { // setter for individual option
				newOptionHash = {};
				newOptionHash[name] = value;
				this.setOptions(newOptionHash);
			}
		}
		else if (typeof name === 'object') { // compound setter with object input
			this.setOptions(name);
		}
	},


	// private getter
	opt: function(name) {
		return this.optionsModel.get(name);
	},


	setOptions: function(newOptionHash) {
		var optionCnt = 0;
		var optionName;

		this.recordOptionOverrides(newOptionHash); // will trigger optionsModel watchers

		for (optionName in newOptionHash) {
			optionCnt++;
		}

		// special-case handling of single option change.
		// if only one option change, `optionName` will be its name.
		if (optionCnt === 1) {
			if (optionName === 'height' || optionName === 'contentHeight' || optionName === 'aspectRatio') {
				this.updateViewSize(true); // isResize=true
				return;
			}
			else if (optionName === 'defaultDate') {
				return; // can't change date this way. use gotoDate instead
			}
			else if (optionName === 'businessHours') {
				return; // optionsModel already reacts to this
			}
			else if (optionName === 'timezone') {
				this.view.flash('initialEvents');
				return;
			}
		}

		// catch-all. rerender the header and footer and rebuild/rerender the current view
		this.renderHeader();
		this.renderFooter();

		// even non-current views will be affected by this option change. do before rerender
		// TODO: detangle
		this.viewsByType = {};

		this.reinitView();
	},


	// Computes the flattened options hash for the calendar and assigns to `this.options`.
	// Assumes this.overrides and this.dynamicOverrides have already been initialized.
	populateOptionsHash: function() {
		var locale, localeDefaults;
		var isRTL, dirDefaults;
		var rawOptions;

		locale = firstDefined( // explicit locale option given?
			this.dynamicOverrides.locale,
			this.overrides.locale
		);
		localeDefaults = localeOptionHash[locale];
		if (!localeDefaults) { // explicit locale option not given or invalid?
			locale = Calendar.defaults.locale;
			localeDefaults = localeOptionHash[locale] || {};
		}

		isRTL = firstDefined( // based on options computed so far, is direction RTL?
			this.dynamicOverrides.isRTL,
			this.overrides.isRTL,
			localeDefaults.isRTL,
			Calendar.defaults.isRTL
		);
		dirDefaults = isRTL ? Calendar.rtlDefaults : {};

		this.dirDefaults = dirDefaults;
		this.localeDefaults = localeDefaults;

		rawOptions = mergeOptions([ // merge defaults and overrides. lowest to highest precedence
			Calendar.defaults, // global defaults
			dirDefaults,
			localeDefaults,
			this.overrides,
			this.dynamicOverrides
		]);
		populateInstanceComputableOptions(rawOptions); // fill in gaps with computed options

		this.optionsModel.reset(rawOptions);
	},


	// stores the new options internally, but does not rerender anything.
	recordOptionOverrides: function(newOptionHash) {
		var optionName;

		for (optionName in newOptionHash) {
			this.dynamicOverrides[optionName] = newOptionHash[optionName];
		}

		this.viewSpecCache = {}; // the dynamic override invalidates the options in this cache, so just clear it
		this.populateOptionsHash(); // this.options needs to be recomputed after the dynamic override
	}

});

;;

Calendar.mixin({

	defaultAllDayEventDuration: null,
	defaultTimedEventDuration: null,
	localeData: null,


	initMomentInternals: function() {
		var _this = this;

		this.defaultAllDayEventDuration = moment.duration(this.opt('defaultAllDayEventDuration'));
		this.defaultTimedEventDuration = moment.duration(this.opt('defaultTimedEventDuration'));

		// Called immediately, and when any of the options change.
		// Happens before any internal objects rebuild or rerender, because this is very core.
		this.optionsModel.watch('buildingMomentLocale', [
			'?locale', '?monthNames', '?monthNamesShort', '?dayNames', '?dayNamesShort',
			'?firstDay', '?weekNumberCalculation'
		], function(opts) {
			var weekNumberCalculation = opts.weekNumberCalculation;
			var firstDay = opts.firstDay;
			var _week;

			// normalize
			if (weekNumberCalculation === 'iso') {
				weekNumberCalculation = 'ISO'; // normalize
			}

			var localeData = Object.create( // make a cheap copy
				getMomentLocaleData(opts.locale) // will fall back to en
			);

			if (opts.monthNames) {
				localeData._months = opts.monthNames;
			}
			if (opts.monthNamesShort) {
				localeData._monthsShort = opts.monthNamesShort;
			}
			if (opts.dayNames) {
				localeData._weekdays = opts.dayNames;
			}
			if (opts.dayNamesShort) {
				localeData._weekdaysShort = opts.dayNamesShort;
			}

			if (firstDay == null && weekNumberCalculation === 'ISO') {
				firstDay = 1;
			}
			if (firstDay != null) {
				_week = Object.create(localeData._week); // _week: { dow: # }
				_week.dow = firstDay;
				localeData._week = _week;
			}

			if ( // whitelist certain kinds of input
				weekNumberCalculation === 'ISO' ||
				weekNumberCalculation === 'local' ||
				typeof weekNumberCalculation === 'function'
			) {
				localeData._fullCalendar_weekCalc = weekNumberCalculation; // moment-ext will know what to do with it
			}

			_this.localeData = localeData;

			// If the internal current date object already exists, move to new locale.
			// We do NOT need to do this technique for event dates, because this happens when converting to "segments".
			if (_this.currentDate) {
				_this.localizeMoment(_this.currentDate); // sets to localeData
			}
		});
	},


	// Builds a moment using the settings of the current calendar: timezone and locale.
	// Accepts anything the vanilla moment() constructor accepts.
	moment: function() {
		var mom;

		if (this.opt('timezone') === 'local') {
			mom = FC.moment.apply(null, arguments);

			// Force the moment to be local, because FC.moment doesn't guarantee it.
			if (mom.hasTime()) { // don't give ambiguously-timed moments a local zone
				mom.local();
			}
		}
		else if (this.opt('timezone') === 'UTC') {
			mom = FC.moment.utc.apply(null, arguments); // process as UTC
		}
		else {
			mom = FC.moment.parseZone.apply(null, arguments); // let the input decide the zone
		}

		this.localizeMoment(mom); // TODO

		return mom;
	},


	msToMoment: function(ms, forceAllDay) {
		var mom = FC.moment.utc(ms); // TODO: optimize by using Date.UTC

		if (forceAllDay) {
			mom.stripTime();
		}
		else {
			mom = this.applyTimezone(mom); // may or may not apply locale
		}

		this.localizeMoment(mom);

		return mom;
	},


	msToUtcMoment: function(ms, forceAllDay) {
		var mom = FC.moment.utc(ms); // TODO: optimize by using Date.UTC

		if (forceAllDay) {
			mom.stripTime();
		}

		this.localizeMoment(mom);

		return mom;
	},


	// Updates the given moment's locale settings to the current calendar locale settings.
	localizeMoment: function(mom) {
		mom._locale = this.localeData;
	},


	// Returns a boolean about whether or not the calendar knows how to calculate
	// the timezone offset of arbitrary dates in the current timezone.
	getIsAmbigTimezone: function() {
		return this.opt('timezone') !== 'local' && this.opt('timezone') !== 'UTC';
	},


	// Returns a copy of the given date in the current timezone. Has no effect on dates without times.
	applyTimezone: function(date) {
		if (!date.hasTime()) {
			return date.clone();
		}

		var zonedDate = this.moment(date.toArray());
		var timeAdjust = date.time() - zonedDate.time();
		var adjustedZonedDate;

		// Safari sometimes has problems with this coersion when near DST. Adjust if necessary. (bug #2396)
		if (timeAdjust) { // is the time result different than expected?
			adjustedZonedDate = zonedDate.clone().add(timeAdjust); // add milliseconds
			if (date.time() - adjustedZonedDate.time() === 0) { // does it match perfectly now?
				zonedDate = adjustedZonedDate;
			}
		}

		return zonedDate;
	},


	/*
	Assumes the footprint is non-open-ended.
	*/
	footprintToDateProfile: function(componentFootprint, ignoreEnd) {
		var start = FC.moment.utc(componentFootprint.unzonedRange.startMs);
		var end;

		if (!ignoreEnd) {
			end = FC.moment.utc(componentFootprint.unzonedRange.endMs);
		}

		if (componentFootprint.isAllDay) {
			start.stripTime();

			if (end) {
				end.stripTime();
			}
		}
		else {
			start = this.applyTimezone(start);

			if (end) {
				end = this.applyTimezone(end);
			}
		}

		return new EventDateProfile(start, end, this);
	},


	// Returns a moment for the current date, as defined by the client's computer or from the `now` option.
	// Will return an moment with an ambiguous timezone.
	getNow: function() {
		var now = this.opt('now');
		if (typeof now === 'function') {
			now = now();
		}
		return this.moment(now).stripZone();
	},


	// Produces a human-readable string for the given duration.
	// Side-effect: changes the locale of the given duration.
	humanizeDuration: function(duration) {
		return duration.locale(this.opt('locale')).humanize();
	},



	// Event-Specific Date Utilities. TODO: move
	// -----------------------------------------------------------------------------------------------------------------


	// Get an event's normalized end date. If not present, calculate it from the defaults.
	getEventEnd: function(event) {
		if (event.end) {
			return event.end.clone();
		}
		else {
			return this.getDefaultEventEnd(event.allDay, event.start);
		}
	},


	// Given an event's allDay status and start date, return what its fallback end date should be.
	// TODO: rename to computeDefaultEventEnd
	getDefaultEventEnd: function(allDay, zonedStart) {
		var end = zonedStart.clone();

		if (allDay) {
			end.stripTime().add(this.defaultAllDayEventDuration);
		}
		else {
			end.add(this.defaultTimedEventDuration);
		}

		if (this.getIsAmbigTimezone()) {
			end.stripZone(); // we don't know what the tzo should be
		}

		return end;
	}

});

;;

Calendar.mixin({

	viewSpecCache: null, // cache of view definitions (initialized in Calendar.js)


	// Gets information about how to create a view. Will use a cache.
	getViewSpec: function(viewType) {
		var cache = this.viewSpecCache;

		return cache[viewType] || (cache[viewType] = this.buildViewSpec(viewType));
	},


	// Given a duration singular unit, like "week" or "day", finds a matching view spec.
	// Preference is given to views that have corresponding buttons.
	getUnitViewSpec: function(unit) {
		var viewTypes;
		var i;
		var spec;

		if ($.inArray(unit, unitsDesc) != -1) {

			// put views that have buttons first. there will be duplicates, but oh well
			viewTypes = this.header.getViewsWithButtons(); // TODO: include footer as well?
			$.each(FC.views, function(viewType) { // all views
				viewTypes.push(viewType);
			});

			for (i = 0; i < viewTypes.length; i++) {
				spec = this.getViewSpec(viewTypes[i]);
				if (spec) {
					if (spec.singleUnit == unit) {
						return spec;
					}
				}
			}
		}
	},


	// Builds an object with information on how to create a given view
	buildViewSpec: function(requestedViewType) {
		var viewOverrides = this.overrides.views || {};
		var specChain = []; // for the view. lowest to highest priority
		var defaultsChain = []; // for the view. lowest to highest priority
		var overridesChain = []; // for the view. lowest to highest priority
		var viewType = requestedViewType;
		var spec; // for the view
		var overrides; // for the view
		var durationInput;
		var duration;
		var unit;

		// iterate from the specific view definition to a more general one until we hit an actual View class
		while (viewType) {
			spec = fcViews[viewType];
			overrides = viewOverrides[viewType];
			viewType = null; // clear. might repopulate for another iteration

			if (typeof spec === 'function') { // TODO: deprecate
				spec = { 'class': spec };
			}

			if (spec) {
				specChain.unshift(spec);
				defaultsChain.unshift(spec.defaults || {});
				durationInput = durationInput || spec.duration;
				viewType = viewType || spec.type;
			}

			if (overrides) {
				overridesChain.unshift(overrides); // view-specific option hashes have options at zero-level
				durationInput = durationInput || overrides.duration;
				viewType = viewType || overrides.type;
			}
		}

		spec = mergeProps(specChain);
		spec.type = requestedViewType;
		if (!spec['class']) {
			return false;
		}

		// fall back to top-level `duration` option
		durationInput = durationInput ||
			this.dynamicOverrides.duration ||
			this.overrides.duration;

		if (durationInput) {
			duration = moment.duration(durationInput);

			if (duration.valueOf()) { // valid?

				unit = computeDurationGreatestUnit(duration, durationInput);

				spec.duration = duration;
				spec.durationUnit = unit;

				// view is a single-unit duration, like "week" or "day"
				// incorporate options for this. lowest priority
				if (duration.as(unit) === 1) {
					spec.singleUnit = unit;
					overridesChain.unshift(viewOverrides[unit] || {});
				}
			}
		}

		spec.defaults = mergeOptions(defaultsChain);
		spec.overrides = mergeOptions(overridesChain);

		this.buildViewSpecOptions(spec);
		this.buildViewSpecButtonText(spec, requestedViewType);

		return spec;
	},


	// Builds and assigns a view spec's options object from its already-assigned defaults and overrides
	buildViewSpecOptions: function(spec) {
		spec.options = mergeOptions([ // lowest to highest priority
			Calendar.defaults, // global defaults
			spec.defaults, // view's defaults (from ViewSubclass.defaults)
			this.dirDefaults,
			this.localeDefaults, // locale and dir take precedence over view's defaults!
			this.overrides, // calendar's overrides (options given to constructor)
			spec.overrides, // view's overrides (view-specific options)
			this.dynamicOverrides // dynamically set via setter. highest precedence
		]);
		populateInstanceComputableOptions(spec.options);
	},


	// Computes and assigns a view spec's buttonText-related options
	buildViewSpecButtonText: function(spec, requestedViewType) {

		// given an options object with a possible `buttonText` hash, lookup the buttonText for the
		// requested view, falling back to a generic unit entry like "week" or "day"
		function queryButtonText(options) {
			var buttonText = options.buttonText || {};
			return buttonText[requestedViewType] ||
				// view can decide to look up a certain key
				(spec.buttonTextKey ? buttonText[spec.buttonTextKey] : null) ||
				// a key like "month"
				(spec.singleUnit ? buttonText[spec.singleUnit] : null);
		}

		// highest to lowest priority
		spec.buttonTextOverride =
			queryButtonText(this.dynamicOverrides) ||
			queryButtonText(this.overrides) || // constructor-specified buttonText lookup hash takes precedence
			spec.overrides.buttonText; // `buttonText` for view-specific options is a string

		// highest to lowest priority. mirrors buildViewSpecOptions
		spec.buttonTextDefault =
			queryButtonText(this.localeDefaults) ||
			queryButtonText(this.dirDefaults) ||
			spec.defaults.buttonText || // a single string. from ViewSubclass.defaults
			queryButtonText(Calendar.defaults) ||
			(spec.duration ? this.humanizeDuration(spec.duration) : null) || // like "3 days"
			requestedViewType; // fall back to given view name
	}

});

;;

Calendar.mixin({

	el: null,
	contentEl: null,
	suggestedViewHeight: null,
	ignoreUpdateViewSize: 0,
	freezeContentHeightDepth: 0,
	windowResizeProxy: null,


	render: function() {
		if (!this.contentEl) {
			this.initialRender();
		}
		else if (this.elementVisible()) {
			// mainly for the public API
			this.calcSize();
			this.renderView();
		}
	},


	initialRender: function() {
		var _this = this;
		var el = this.el;

		el.addClass('fc');

		// event delegation for nav links
		el.on('click.fc', 'a[data-goto]', function(ev) {
			var anchorEl = $(this);
			var gotoOptions = anchorEl.data('goto'); // will automatically parse JSON
			var date = _this.moment(gotoOptions.date);
			var viewType = gotoOptions.type;

			// property like "navLinkDayClick". might be a string or a function
			var customAction = _this.view.opt('navLink' + capitaliseFirstLetter(viewType) + 'Click');

			if (typeof customAction === 'function') {
				customAction(date, ev);
			}
			else {
				if (typeof customAction === 'string') {
					viewType = customAction;
				}
				_this.zoomTo(date, viewType);
			}
		});

		// called immediately, and upon option change
		this.optionsModel.watch('settingTheme', [ '?theme', '?themeSystem' ], function(opts) {
			var themeClass = ThemeRegistry.getThemeClass(opts.themeSystem || opts.theme);
			var theme = new themeClass(_this.optionsModel);
			var widgetClass = theme.getClass('widget');

			_this.theme = theme;

			if (widgetClass) {
				el.addClass(widgetClass);
			}
		}, function() {
			var widgetClass = _this.theme.getClass('widget');

			_this.theme = null;

			if (widgetClass) {
				el.removeClass(widgetClass);
			}
		});

		this.optionsModel.watch('settingBusinessHourGenerator', [ '?businessHours' ], function(deps) {
			_this.businessHourGenerator = new BusinessHourGenerator(deps.businessHours, _this);

			if (_this.view) {
				_this.view.set('businessHourGenerator', _this.businessHourGenerator);
			}
		}, function() {
			_this.businessHourGenerator = null;
		});

		// called immediately, and upon option change.
		// HACK: locale often affects isRTL, so we explicitly listen to that too.
		this.optionsModel.watch('applyingDirClasses', [ '?isRTL', '?locale' ], function(opts) {
			el.toggleClass('fc-ltr', !opts.isRTL);
			el.toggleClass('fc-rtl', opts.isRTL);
		});

		this.contentEl = $("<div class='fc-view-container'/>").prependTo(el);

		this.initToolbars();
		this.renderHeader();
		this.renderFooter();
		this.renderView(this.opt('defaultView'));

		if (this.opt('handleWindowResize')) {
			$(window).resize(
				this.windowResizeProxy = debounce( // prevents rapid calls
					this.windowResize.bind(this),
					this.opt('windowResizeDelay')
				)
			);
		}
	},


	destroy: function() {
		if (this.view) {
			this.clearView();
		}

		this.toolbarsManager.proxyCall('removeElement');
		this.contentEl.remove();
		this.el.removeClass('fc fc-ltr fc-rtl');

		// removes theme-related root className
		this.optionsModel.unwatch('settingTheme');
		this.optionsModel.unwatch('settingBusinessHourGenerator');

		this.el.off('.fc'); // unbind nav link handlers

		if (this.windowResizeProxy) {
			$(window).unbind('resize', this.windowResizeProxy);
			this.windowResizeProxy = null;
		}

		GlobalEmitter.unneeded();
	},


	elementVisible: function() {
		return this.el.is(':visible');
	},


	// Render Queue
	// -----------------------------------------------------------------------------------------------------------------


	bindViewHandlers: function(view) {
		var _this = this;

		view.watch('titleForCalendar', [ 'title' ], function(deps) { // TODO: better system
			if (view === _this.view) { // hack
				_this.setToolbarsTitle(deps.title);
			}
		});

		view.watch('dateProfileForCalendar', [ 'dateProfile' ], function(deps) {
			if (view === _this.view) { // hack
				_this.currentDate = deps.dateProfile.date; // might have been constrained by view dates
				_this.updateToolbarButtons(deps.dateProfile);
			}
		});
	},


	unbindViewHandlers: function(view) {
		view.unwatch('titleForCalendar');
		view.unwatch('dateProfileForCalendar');
	},


	// View Rendering
	// -----------------------------------------------------------------------------------


	// Renders a view because of a date change, view-type change, or for the first time.
	// If not given a viewType, keep the current view but render different dates.
	// Accepts an optional scroll state to restore to.
	renderView: function(viewType) {
		var oldView = this.view;
		var newView;

		this.freezeContentHeight();

		if (oldView && viewType && oldView.type !== viewType) {
			this.clearView();
		}

		// if viewType changed, or the view was never created, create a fresh view
		if (!this.view && viewType) {
			newView = this.view =
				this.viewsByType[viewType] ||
				(this.viewsByType[viewType] = this.instantiateView(viewType));

			this.bindViewHandlers(newView);

			newView.setElement(
				$("<div class='fc-view fc-" + viewType + "-view' />").appendTo(this.contentEl)
			);

			this.toolbarsManager.proxyCall('activateButton', viewType);
		}

		if (this.view) {

			// prevent unnecessary change firing
			if (this.view.get('businessHourGenerator') !== this.businessHourGenerator) {
				this.view.set('businessHourGenerator', this.businessHourGenerator);
			}

			this.view.setDate(this.currentDate);
		}

		this.thawContentHeight();
	},


	// Unrenders the current view and reflects this change in the Header.
	// Unregsiters the `view`, but does not remove from viewByType hash.
	clearView: function() {
		var currentView = this.view;

		this.toolbarsManager.proxyCall('deactivateButton', currentView.type);

		this.unbindViewHandlers(currentView);

		currentView.removeElement();
		currentView.unsetDate(); // so bindViewHandlers doesn't fire with old values next time

		this.view = null;
	},


	// Destroys the view, including the view object. Then, re-instantiates it and renders it.
	// Maintains the same scroll state.
	// TODO: maintain any other user-manipulated state.
	reinitView: function() {
		var oldView = this.view;
		var scroll = oldView.queryScroll(); // wouldn't be so complicated if Calendar owned the scroll
		this.freezeContentHeight();

		this.clearView();
		this.calcSize();
		this.renderView(oldView.type); // needs the type to freshly render

		this.view.applyScroll(scroll);
		this.thawContentHeight();
	},


	// Resizing
	// -----------------------------------------------------------------------------------


	getSuggestedViewHeight: function() {
		if (this.suggestedViewHeight === null) {
			this.calcSize();
		}
		return this.suggestedViewHeight;
	},


	isHeightAuto: function() {
		return this.opt('contentHeight') === 'auto' || this.opt('height') === 'auto';
	},


	updateViewSize: function(isResize) {
		var view = this.view;
		var scroll;

		if (!this.ignoreUpdateViewSize && view) {

			if (isResize) {
				this.calcSize();
				scroll = view.queryScroll();
			}

			this.ignoreUpdateViewSize++;

			view.updateSize(
				this.getSuggestedViewHeight(),
				this.isHeightAuto(),
				isResize
			);

			this.ignoreUpdateViewSize--;

			if (isResize) {
				view.applyScroll(scroll);
			}

			return true; // signal success
		}
	},


	calcSize: function() {
		if (this.elementVisible()) {
			this._calcSize();
		}
	},


	_calcSize: function() { // assumes elementVisible
		var contentHeightInput = this.opt('contentHeight');
		var heightInput = this.opt('height');

		if (typeof contentHeightInput === 'number') { // exists and not 'auto'
			this.suggestedViewHeight = contentHeightInput;
		}
		else if (typeof contentHeightInput === 'function') { // exists and is a function
			this.suggestedViewHeight = contentHeightInput();
		}
		else if (typeof heightInput === 'number') { // exists and not 'auto'
			this.suggestedViewHeight = heightInput - this.queryToolbarsHeight();
		}
		else if (typeof heightInput === 'function') { // exists and is a function
			this.suggestedViewHeight = heightInput() - this.queryToolbarsHeight();
		}
		else if (heightInput === 'parent') { // set to height of parent element
			this.suggestedViewHeight = this.el.parent().height() - this.queryToolbarsHeight();
		}
		else {
			this.suggestedViewHeight = Math.round(
				this.contentEl.width() /
				Math.max(this.opt('aspectRatio'), .5)
			);
		}
	},


	windowResize: function(ev) {
		if (
			ev.target === window && // so we don't process jqui "resize" events that have bubbled up
			this.view &&
			this.view.isDatesRendered
		) {
			if (this.updateViewSize(true)) { // isResize=true, returns true on success
				this.publiclyTrigger('windowResize', [ this.view ]);
			}
		}
	},


	/* Height "Freezing"
	-----------------------------------------------------------------------------*/


	freezeContentHeight: function() {
		if (!(this.freezeContentHeightDepth++)) {
			this.forceFreezeContentHeight();
		}
	},


	forceFreezeContentHeight: function() {
		this.contentEl.css({
			width: '100%',
			height: this.contentEl.height(),
			overflow: 'hidden'
		});
	},


	thawContentHeight: function() {
		this.freezeContentHeightDepth--;

		// always bring back to natural height
		this.contentEl.css({
			width: '',
			height: '',
			overflow: ''
		});

		// but if there are future thaws, re-freeze
		if (this.freezeContentHeightDepth) {
			this.forceFreezeContentHeight();
		}
	}

});

;;

Calendar.mixin({

	header: null,
	footer: null,
	toolbarsManager: null,


	initToolbars: function() {
		this.header = new Toolbar(this, this.computeHeaderOptions());
		this.footer = new Toolbar(this, this.computeFooterOptions());
		this.toolbarsManager = new Iterator([ this.header, this.footer ]);
	},


	computeHeaderOptions: function() {
		return {
			extraClasses: 'fc-header-toolbar',
			layout: this.opt('header')
		};
	},


	computeFooterOptions: function() {
		return {
			extraClasses: 'fc-footer-toolbar',
			layout: this.opt('footer')
		};
	},


	// can be called repeatedly and Header will rerender
	renderHeader: function() {
		var header = this.header;

		header.setToolbarOptions(this.computeHeaderOptions());
		header.render();

		if (header.el) {
			this.el.prepend(header.el);
		}
	},


	// can be called repeatedly and Footer will rerender
	renderFooter: function() {
		var footer = this.footer;

		footer.setToolbarOptions(this.computeFooterOptions());
		footer.render();

		if (footer.el) {
			this.el.append(footer.el);
		}
	},


	setToolbarsTitle: function(title) {
		this.toolbarsManager.proxyCall('updateTitle', title);
	},


	updateToolbarButtons: function(dateProfile) {
		var now = this.getNow();
		var view = this.view;
		var todayInfo = view.buildDateProfile(now);
		var prevInfo = view.buildPrevDateProfile(this.currentDate);
		var nextInfo = view.buildNextDateProfile(this.currentDate);

		this.toolbarsManager.proxyCall(
			(todayInfo.isValid && !dateProfile.currentUnzonedRange.containsDate(now)) ?
				'enableButton' :
				'disableButton',
			'today'
		);

		this.toolbarsManager.proxyCall(
			prevInfo.isValid ?
				'enableButton' :
				'disableButton',
			'prev'
		);

		this.toolbarsManager.proxyCall(
			nextInfo.isValid ?
				'enableButton' :
				'disableButton',
			'next'
		);
	},


	queryToolbarsHeight: function() {
		return this.toolbarsManager.items.reduce(function(accumulator, toolbar) {
			var toolbarHeight = toolbar.el ? toolbar.el.outerHeight(true) : 0; // includes margin
			return accumulator + toolbarHeight;
		}, 0);
	}

});

;;

/*
determines if eventInstanceGroup is allowed,
in relation to other EVENTS and business hours.
*/
Calendar.prototype.isEventInstanceGroupAllowed = function(eventInstanceGroup) {
	var eventDef = eventInstanceGroup.getEventDef();
	var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
	var i;

	var peerEventInstances = this.getPeerEventInstances(eventDef);
	var peerEventRanges = peerEventInstances.map(eventInstanceToEventRange);
	var peerEventFootprints = this.eventRangesToEventFootprints(peerEventRanges);

	var constraintVal = eventDef.getConstraint();
	var overlapVal = eventDef.getOverlap();

	var eventAllowFunc = this.opt('eventAllow');

	for (i = 0; i < eventFootprints.length; i++) {
		if (
			!this.isFootprintAllowed(
				eventFootprints[i].componentFootprint,
				peerEventFootprints,
				constraintVal,
				overlapVal,
				eventFootprints[i].eventInstance
			)
		) {
			return false;
		}
	}

	if (eventAllowFunc) {
		for (i = 0; i < eventFootprints.length; i++) {
			if (
				eventAllowFunc(
					eventFootprints[i].componentFootprint.toLegacy(this),
					eventFootprints[i].getEventLegacy()
				) === false
			) {
				return false;
			}
		}
	}

	return true;
};


Calendar.prototype.getPeerEventInstances = function(eventDef) {
	return this.eventManager.getEventInstancesWithoutId(eventDef.id);
};


Calendar.prototype.isSelectionFootprintAllowed = function(componentFootprint) {
	var peerEventInstances = this.eventManager.getEventInstances();
	var peerEventRanges = peerEventInstances.map(eventInstanceToEventRange);
	var peerEventFootprints = this.eventRangesToEventFootprints(peerEventRanges);

	var selectAllowFunc;

	if (
		this.isFootprintAllowed(
			componentFootprint,
			peerEventFootprints,
			this.opt('selectConstraint'),
			this.opt('selectOverlap')
		)
	) {
		selectAllowFunc = this.opt('selectAllow');

		if (selectAllowFunc) {
			return selectAllowFunc(componentFootprint.toLegacy(this)) !== false;
		}
		else {
			return true;
		}
	}

	return false;
};


Calendar.prototype.isFootprintAllowed = function(
	componentFootprint,
	peerEventFootprints,
	constraintVal,
	overlapVal,
	subjectEventInstance // optional
) {
	var constraintFootprints; // ComponentFootprint[]
	var overlapEventFootprints; // EventFootprint[]

	if (constraintVal != null) {
		constraintFootprints = this.constraintValToFootprints(constraintVal, componentFootprint.isAllDay);

		if (!this.isFootprintWithinConstraints(componentFootprint, constraintFootprints)) {
			return false;
		}
	}

	overlapEventFootprints = this.collectOverlapEventFootprints(peerEventFootprints, componentFootprint);

	if (overlapVal === false) {
		if (overlapEventFootprints.length) {
			return false;
		}
	}
	else if (typeof overlapVal === 'function') {
		if (!isOverlapsAllowedByFunc(overlapEventFootprints, overlapVal, subjectEventInstance)) {
			return false;
		}
	}

	if (subjectEventInstance) {
		if (!isOverlapEventInstancesAllowed(overlapEventFootprints, subjectEventInstance)) {
			return false;
		}
	}

	return true;
};


// Constraint
// ------------------------------------------------------------------------------------------------


Calendar.prototype.isFootprintWithinConstraints = function(componentFootprint, constraintFootprints) {
	var i;

	for (i = 0; i < constraintFootprints.length; i++) {
		if (this.footprintContainsFootprint(constraintFootprints[i], componentFootprint)) {
			return true;
		}
	}

	return false;
};


Calendar.prototype.constraintValToFootprints = function(constraintVal, isAllDay) {
	var eventInstances;

	if (constraintVal === 'businessHours') {
		return this.buildCurrentBusinessFootprints(isAllDay);
	}
	else if (typeof constraintVal === 'object') {
		eventInstances = this.parseEventDefToInstances(constraintVal); // handles recurring events

		if (!eventInstances) { // invalid input. fallback to parsing footprint directly
			return this.parseFootprints(constraintVal);
		}
		else {
			return this.eventInstancesToFootprints(eventInstances);
		}
	}
	else if (constraintVal != null) { // an ID
		eventInstances = this.eventManager.getEventInstancesWithId(constraintVal);

		return this.eventInstancesToFootprints(eventInstances);
	}
};


// returns ComponentFootprint[]
// uses current view's range
Calendar.prototype.buildCurrentBusinessFootprints = function(isAllDay) {
	var view = this.view;
	var businessHourGenerator = view.get('businessHourGenerator');
	var unzonedRange = view.dateProfile.activeUnzonedRange;
	var eventInstanceGroup = businessHourGenerator.buildEventInstanceGroup(isAllDay, unzonedRange);

	if (eventInstanceGroup) {
		return this.eventInstancesToFootprints(eventInstanceGroup.eventInstances);
	}
	else {
		return [];
	}
};


// conversion util
Calendar.prototype.eventInstancesToFootprints = function(eventInstances) {
	var eventRanges = eventInstances.map(eventInstanceToEventRange);
	var eventFootprints = this.eventRangesToEventFootprints(eventRanges);

	return eventFootprints.map(eventFootprintToComponentFootprint);
};


// Overlap
// ------------------------------------------------------------------------------------------------


Calendar.prototype.collectOverlapEventFootprints = function(peerEventFootprints, targetFootprint) {
	var overlapEventFootprints = [];
	var i;

	for (i = 0; i < peerEventFootprints.length; i++) {
		if (
			this.footprintsIntersect(
				targetFootprint,
				peerEventFootprints[i].componentFootprint
			)
		) {
			overlapEventFootprints.push(peerEventFootprints[i]);
		}
	}

	return overlapEventFootprints;
};


// optional subjectEventInstance
function isOverlapsAllowedByFunc(overlapEventFootprints, overlapFunc, subjectEventInstance) {
	var i;

	for (i = 0; i < overlapEventFootprints.length; i++) {
		if (
			!overlapFunc(
				overlapEventFootprints[i].eventInstance.toLegacy(),
				subjectEventInstance ? subjectEventInstance.toLegacy() : null
			)
		) {
			return false;
		}
	}

	return true;
}


function isOverlapEventInstancesAllowed(overlapEventFootprints, subjectEventInstance) {
	var subjectLegacyInstance = subjectEventInstance.toLegacy();
	var i;
	var overlapEventInstance;
	var overlapEventDef;
	var overlapVal;

	for (i = 0; i < overlapEventFootprints.length; i++) {
		overlapEventInstance = overlapEventFootprints[i].eventInstance;
		overlapEventDef = overlapEventInstance.def;

		// don't need to pass in calendar, because don't want to consider global eventOverlap property,
		// because we already considered that earlier in the process.
		overlapVal = overlapEventDef.getOverlap();

		if (overlapVal === false) {
			return false;
		}
		else if (typeof overlapVal === 'function') {
			if (
				!overlapVal(
					overlapEventInstance.toLegacy(),
					subjectLegacyInstance
				)
			) {
				return false;
			}
		}
	}

	return true;
}


// Conversion: eventDefs -> eventInstances -> eventRanges -> eventFootprints -> componentFootprints
// ------------------------------------------------------------------------------------------------
// NOTE: this might seem like repetitive code with the Grid class, however, this code is related to
// constraints whereas the Grid code is related to rendering. Each approach might want to convert
// eventRanges -> eventFootprints in a different way. Regardless, there are opportunities to make
// this more DRY.


/*
Returns false on invalid input.
*/
Calendar.prototype.parseEventDefToInstances = function(eventInput) {
	var eventManager = this.eventManager;
	var eventDef = EventDefParser.parse(eventInput, new EventSource(this));

	if (!eventDef) { // invalid
		return false;
	}

	return eventDef.buildInstances(eventManager.currentPeriod.unzonedRange);
};


Calendar.prototype.eventRangesToEventFootprints = function(eventRanges) {
	var i;
	var eventFootprints = [];

	for (i = 0; i < eventRanges.length; i++) {
		eventFootprints.push.apply( // footprints
			eventFootprints,
			this.eventRangeToEventFootprints(eventRanges[i])
		);
	}

	return eventFootprints;
};


Calendar.prototype.eventRangeToEventFootprints = function(eventRange) {
	return [ eventRangeToEventFootprint(eventRange) ];
};


/*
Parses footprints directly.
Very similar to EventDateProfile::parse :(
*/
Calendar.prototype.parseFootprints = function(rawInput) {
	var start, end;

	if (rawInput.start) {
		start = this.moment(rawInput.start);

		if (!start.isValid()) {
			start = null;
		}
	}

	if (rawInput.end) {
		end = this.moment(rawInput.end);

		if (!end.isValid()) {
			end = null;
		}
	}

	return [
		new ComponentFootprint(
			new UnzonedRange(start, end),
			(start && !start.hasTime()) || (end && !end.hasTime()) // isAllDay
		)
	];
};


// Footprint Utils
// ----------------------------------------------------------------------------------------


Calendar.prototype.footprintContainsFootprint = function(outerFootprint, innerFootprint) {
	return outerFootprint.unzonedRange.containsRange(innerFootprint.unzonedRange);
};


Calendar.prototype.footprintsIntersect = function(footprint0, footprint1) {
	return footprint0.unzonedRange.intersectsWith(footprint1.unzonedRange);
};

;;

Calendar.mixin({

	// Sources
	// ------------------------------------------------------------------------------------


	getEventSources: function() {
		return this.eventManager.otherSources.slice(); // clone
	},


	getEventSourceById: function(id) {
		return this.eventManager.getSourceById(
			EventSource.normalizeId(id)
		);
	},


	addEventSource: function(sourceInput) {
		var source = EventSourceParser.parse(sourceInput, this);

		if (source) {
			this.eventManager.addSource(source);
		}
	},


	removeEventSources: function(sourceMultiQuery) {
		var eventManager = this.eventManager;
		var sources;
		var i;

		if (sourceMultiQuery == null) {
			this.eventManager.removeAllSources();
		}
		else {
			sources = eventManager.multiQuerySources(sourceMultiQuery);

			eventManager.freeze();

			for (i = 0; i < sources.length; i++) {
				eventManager.removeSource(sources[i]);
			}

			eventManager.thaw();
		}
	},


	removeEventSource: function(sourceQuery) {
		var eventManager = this.eventManager;
		var sources = eventManager.querySources(sourceQuery);
		var i;

		eventManager.freeze();

		for (i = 0; i < sources.length; i++) {
			eventManager.removeSource(sources[i]);
		}

		eventManager.thaw();
	},


	refetchEventSources: function(sourceMultiQuery) {
		var eventManager = this.eventManager;
		var sources = eventManager.multiQuerySources(sourceMultiQuery);
		var i;

		eventManager.freeze();

		for (i = 0; i < sources.length; i++) {
			eventManager.refetchSource(sources[i]);
		}

		eventManager.thaw();
	},


	// Events
	// ------------------------------------------------------------------------------------


	refetchEvents: function() {
		this.eventManager.refetchAllSources();
	},


	renderEvents: function(eventInputs, isSticky) {
		this.eventManager.freeze();

		for (var i = 0; i < eventInputs.length; i++) {
			this.renderEvent(eventInputs[i], isSticky);
		}

		this.eventManager.thaw();
	},


	renderEvent: function(eventInput, isSticky) {
		var eventManager = this.eventManager;
		var eventDef = EventDefParser.parse(
			eventInput,
			eventInput.source || eventManager.stickySource
		);

		if (eventDef) {
			eventManager.addEventDef(eventDef, isSticky);
		}
	},


	// legacyQuery operates on legacy event instance objects
	removeEvents: function(legacyQuery) {
		var eventManager = this.eventManager;
		var legacyInstances = [];
		var idMap = {};
		var eventDef;
		var i;

		if (legacyQuery == null) { // shortcut for removing all
			eventManager.removeAllEventDefs(true); // persist=true
		}
		else {
			eventManager.getEventInstances().forEach(function(eventInstance) {
				legacyInstances.push(eventInstance.toLegacy());
			});

			legacyInstances = filterLegacyEventInstances(legacyInstances, legacyQuery);

			// compute unique IDs
			for (i = 0; i < legacyInstances.length; i++) {
				eventDef = this.eventManager.getEventDefByUid(legacyInstances[i]._id);
				idMap[eventDef.id] = true;
			}

			eventManager.freeze();

			for (i in idMap) { // reuse `i` as an "id"
				eventManager.removeEventDefsById(i, true); // persist=true
			}

			eventManager.thaw();
		}
	},


	// legacyQuery operates on legacy event instance objects
	clientEvents: function(legacyQuery) {
		var legacyEventInstances = [];

		this.eventManager.getEventInstances().forEach(function(eventInstance) {
			legacyEventInstances.push(eventInstance.toLegacy());
		});

		return filterLegacyEventInstances(legacyEventInstances, legacyQuery);
	},


	updateEvents: function(eventPropsArray) {
		this.eventManager.freeze();

		for (var i = 0; i < eventPropsArray.length; i++) {
			this.updateEvent(eventPropsArray[i]);
		}

		this.eventManager.thaw();
	},


	updateEvent: function(eventProps) {
		var eventDef = this.eventManager.getEventDefByUid(eventProps._id);
		var eventInstance;
		var eventDefMutation;

		if (eventDef instanceof SingleEventDef) {
			eventInstance = eventDef.buildInstance();

			eventDefMutation = EventDefMutation.createFromRawProps(
				eventInstance,
				eventProps, // raw props
				null // largeUnit -- who uses it?
			);

			this.eventManager.mutateEventsWithId(eventDef.id, eventDefMutation); // will release
		}
	}

});


function filterLegacyEventInstances(legacyEventInstances, legacyQuery) {
	if (legacyQuery == null) {
		return legacyEventInstances;
	}
	else if ($.isFunction(legacyQuery)) {
		return legacyEventInstances.filter(legacyQuery);
	}
	else { // an event ID
		legacyQuery += ''; // normalize to string

		return legacyEventInstances.filter(function(legacyEventInstance) {
			// soft comparison because id not be normalized to string
			return legacyEventInstance.id == legacyQuery ||
				legacyEventInstance._id === legacyQuery; // can specify internal id, but must exactly match
		});
	}
}

;;

Calendar.defaults = {

	titleRangeSeparator: ' \u2013 ', // en dash
	monthYearFormat: 'MMMM YYYY', // required for en. other locales rely on datepicker computable option

	defaultTimedEventDuration: '02:00:00',
	defaultAllDayEventDuration: { days: 1 },
	forceEventDuration: false,
	nextDayThreshold: '09:00:00', // 9am

	// display
	columnHeader: true,
	defaultView: 'month',
	aspectRatio: 1.35,
	header: {
		left: 'title',
		center: '',
		right: 'today prev,next'
	},
	weekends: true,
	weekNumbers: false,

	weekNumberTitle: 'W',
	weekNumberCalculation: 'local',
	
	//editable: false,

	//nowIndicator: false,

	scrollTime: '06:00:00',
	minTime: '00:00:00',
	maxTime: '24:00:00',
	showNonCurrentDates: true,
	
	// event ajax
	lazyFetching: true,
	startParam: 'start',
	endParam: 'end',
	timezoneParam: 'timezone',

	timezone: false,

	//allDayDefault: undefined,

	// locale
	isRTL: false,
	buttonText: {
		prev: "prev",
		next: "next",
		prevYear: "prev year",
		nextYear: "next year",
		year: 'year', // TODO: locale files need to specify this
		today: 'today',
		month: 'month',
		week: 'week',
		day: 'day'
	},
	//buttonIcons: null,

	allDayText: 'all-day',

	// allows setting a min-height to the event segment to prevent short events overlapping each other
	agendaEventMinHeight: 0,
	
	// jquery-ui theming
	theme: false,
	//themeButtonIcons: null,

	//eventResizableFromStart: false,
	dragOpacity: .75,
	dragRevertDuration: 500,
	dragScroll: true,
	
	//selectable: false,
	unselectAuto: true,
	//selectMinDistance: 0,
	
	dropAccept: '*',

	eventOrder: 'title',
	//eventRenderWait: null,

	eventLimit: false,
	eventLimitText: 'more',
	eventLimitClick: 'popover',
	dayPopoverFormat: 'LL',
	
	handleWindowResize: true,
	windowResizeDelay: 100, // milliseconds before an updateSize happens

	longPressDelay: 1000
	
};


Calendar.englishDefaults = { // used by locale.js
	dayPopoverFormat: 'dddd, MMMM D'
};


Calendar.rtlDefaults = { // right-to-left defaults
	header: { // TODO: smarter solution (first/center/last ?)
		left: 'next,prev today',
		center: '',
		right: 'title'
	},
	buttonIcons: {
		prev: 'right-single-arrow',
		next: 'left-single-arrow',
		prevYear: 'right-double-arrow',
		nextYear: 'left-double-arrow'
	},
	themeButtonIcons: {
		prev: 'circle-triangle-e',
		next: 'circle-triangle-w',
		nextYear: 'seek-prev',
		prevYear: 'seek-next'
	}
};

;;

var localeOptionHash = FC.locales = {}; // initialize and expose


// TODO: document the structure and ordering of a FullCalendar locale file


// Initialize jQuery UI datepicker translations while using some of the translations
// Will set this as the default locales for datepicker.
FC.datepickerLocale = function(localeCode, dpLocaleCode, dpOptions) {

	// get the FullCalendar internal option hash for this locale. create if necessary
	var fcOptions = localeOptionHash[localeCode] || (localeOptionHash[localeCode] = {});

	// transfer some simple options from datepicker to fc
	fcOptions.isRTL = dpOptions.isRTL;
	fcOptions.weekNumberTitle = dpOptions.weekHeader;

	// compute some more complex options from datepicker
	$.each(dpComputableOptions, function(name, func) {
		fcOptions[name] = func(dpOptions);
	});

	// is jQuery UI Datepicker is on the page?
	if ($.datepicker) {

		// Register the locale data.
		// FullCalendar and MomentJS use locale codes like "pt-br" but Datepicker
		// does it like "pt-BR" or if it doesn't have the locale, maybe just "pt".
		// Make an alias so the locale can be referenced either way.
		$.datepicker.regional[dpLocaleCode] =
			$.datepicker.regional[localeCode] = // alias
				dpOptions;

		// Alias 'en' to the default locale data. Do this every time.
		$.datepicker.regional.en = $.datepicker.regional[''];

		// Set as Datepicker's global defaults.
		$.datepicker.setDefaults(dpOptions);
	}
};


// Sets FullCalendar-specific translations. Will set the locales as the global default.
FC.locale = function(localeCode, newFcOptions) {
	var fcOptions;
	var momOptions;

	// get the FullCalendar internal option hash for this locale. create if necessary
	fcOptions = localeOptionHash[localeCode] || (localeOptionHash[localeCode] = {});

	// provided new options for this locales? merge them in
	if (newFcOptions) {
		fcOptions = localeOptionHash[localeCode] = mergeOptions([ fcOptions, newFcOptions ]);
	}

	// compute locale options that weren't defined.
	// always do this. newFcOptions can be undefined when initializing from i18n file,
	// so no way to tell if this is an initialization or a default-setting.
	momOptions = getMomentLocaleData(localeCode); // will fall back to en
	$.each(momComputableOptions, function(name, func) {
		if (fcOptions[name] == null) {
			fcOptions[name] = func(momOptions, fcOptions);
		}
	});

	// set it as the default locale for FullCalendar
	Calendar.defaults.locale = localeCode;
};


// NOTE: can't guarantee any of these computations will run because not every locale has datepicker
// configs, so make sure there are English fallbacks for these in the defaults file.
var dpComputableOptions = {

	buttonText: function(dpOptions) {
		return {
			// the translations sometimes wrongly contain HTML entities
			prev: stripHtmlEntities(dpOptions.prevText),
			next: stripHtmlEntities(dpOptions.nextText),
			today: stripHtmlEntities(dpOptions.currentText)
		};
	},

	// Produces format strings like "MMMM YYYY" -> "September 2014"
	monthYearFormat: function(dpOptions) {
		return dpOptions.showMonthAfterYear ?
			'YYYY[' + dpOptions.yearSuffix + '] MMMM' :
			'MMMM YYYY[' + dpOptions.yearSuffix + ']';
	}

};

var momComputableOptions = {

	// Produces format strings like "ddd M/D" -> "Fri 9/15"
	dayOfMonthFormat: function(momOptions, fcOptions) {
		var format = momOptions.longDateFormat('l'); // for the format like "M/D/YYYY"

		// strip the year off the edge, as well as other misc non-whitespace chars
		format = format.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, '');

		if (fcOptions.isRTL) {
			format += ' ddd'; // for RTL, add day-of-week to end
		}
		else {
			format = 'ddd ' + format; // for LTR, add day-of-week to beginning
		}
		return format;
	},

	// Produces format strings like "h:mma" -> "6:00pm"
	mediumTimeFormat: function(momOptions) { // can't be called `timeFormat` because collides with option
		return momOptions.longDateFormat('LT')
			.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
	},

	// Produces format strings like "h(:mm)a" -> "6pm" / "6:30pm"
	smallTimeFormat: function(momOptions) {
		return momOptions.longDateFormat('LT')
			.replace(':mm', '(:mm)')
			.replace(/(\Wmm)$/, '($1)') // like above, but for foreign locales
			.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
	},

	// Produces format strings like "h(:mm)t" -> "6p" / "6:30p"
	extraSmallTimeFormat: function(momOptions) {
		return momOptions.longDateFormat('LT')
			.replace(':mm', '(:mm)')
			.replace(/(\Wmm)$/, '($1)') // like above, but for foreign locales
			.replace(/\s*a$/i, 't'); // convert to AM/PM/am/pm to lowercase one-letter. remove any spaces beforehand
	},

	// Produces format strings like "ha" / "H" -> "6pm" / "18"
	hourFormat: function(momOptions) {
		return momOptions.longDateFormat('LT')
			.replace(':mm', '')
			.replace(/(\Wmm)$/, '') // like above, but for foreign locales
			.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
	},

	// Produces format strings like "h:mm" -> "6:30" (with no AM/PM)
	noMeridiemTimeFormat: function(momOptions) {
		return momOptions.longDateFormat('LT')
			.replace(/\s*a$/i, ''); // remove trailing AM/PM
	}

};


// options that should be computed off live calendar options (considers override options)
// TODO: best place for this? related to locale?
// TODO: flipping text based on isRTL is a bad idea because the CSS `direction` might want to handle it
var instanceComputableOptions = {

	// Produces format strings for results like "Mo 16"
	smallDayDateFormat: function(options) {
		return options.isRTL ?
			'D dd' :
			'dd D';
	},

	// Produces format strings for results like "Wk 5"
	weekFormat: function(options) {
		return options.isRTL ?
			'w[ ' + options.weekNumberTitle + ']' :
			'[' + options.weekNumberTitle + ' ]w';
	},

	// Produces format strings for results like "Wk5"
	smallWeekFormat: function(options) {
		return options.isRTL ?
			'w[' + options.weekNumberTitle + ']' :
			'[' + options.weekNumberTitle + ']w';
	}

};

// TODO: make these computable properties in optionsModel
function populateInstanceComputableOptions(options) {
	$.each(instanceComputableOptions, function(name, func) {
		if (options[name] == null) {
			options[name] = func(options);
		}
	});
}


// Returns moment's internal locale data. If doesn't exist, returns English.
function getMomentLocaleData(localeCode) {
	return moment.localeData(localeCode) || moment.localeData('en');
}


// Initialize English by forcing computation of moment-derived options.
// Also, sets it as the default.
FC.locale('en', Calendar.englishDefaults);

;;

var UnzonedRange = FC.UnzonedRange = Class.extend({

	startMs: null, // if null, no start constraint
	endMs: null, // if null, no end constraint

	// TODO: move these into footprint.
	// Especially, doesn't make sense for null startMs/endMs.
	isStart: true,
	isEnd: true,

	constructor: function(startInput, endInput) {

		if (moment.isMoment(startInput)) {
			startInput = startInput.clone().stripZone();
		}

		if (moment.isMoment(endInput)) {
			endInput = endInput.clone().stripZone();
		}

		if (startInput) {
			this.startMs = startInput.valueOf();
		}

		if (endInput) {
			this.endMs = endInput.valueOf();
		}
	},

	intersect: function(otherRange) {
		var startMs = this.startMs;
		var endMs = this.endMs;
		var newRange = null;

		if (otherRange.startMs !== null) {
			if (startMs === null) {
				startMs = otherRange.startMs;
			}
			else {
				startMs = Math.max(startMs, otherRange.startMs);
			}
		}

		if (otherRange.endMs !== null) {
			if (endMs === null) {
				endMs = otherRange.endMs;
			}
			else {
				endMs = Math.min(endMs, otherRange.endMs);
			}
		}

		if (startMs === null || endMs === null || startMs < endMs) {
			newRange = new UnzonedRange(startMs, endMs);
			newRange.isStart = this.isStart && startMs === this.startMs;
			newRange.isEnd = this.isEnd && endMs === this.endMs;
		}

		return newRange;
	},


	intersectsWith: function(otherRange) {
		return (this.endMs === null || otherRange.startMs === null || this.endMs > otherRange.startMs) &&
			(this.startMs === null || otherRange.endMs === null || this.startMs < otherRange.endMs);
	},


	containsRange: function(innerRange) {
		return (this.startMs === null || (innerRange.startMs !== null && innerRange.startMs >= this.startMs)) &&
			(this.endMs === null || (innerRange.endMs !== null && innerRange.endMs <= this.endMs));
	},


	// `date` can be a moment, a Date, or a millisecond time.
	containsDate: function(date) {
		var ms = date.valueOf();

		return (this.startMs === null || ms >= this.startMs) &&
			(this.endMs === null || ms < this.endMs);
	},


	// If the given date is not within the given range, move it inside.
	// (If it's past the end, make it one millisecond before the end).
	// `date` can be a moment, a Date, or a millisecond time.
	// Returns a MS-time.
	constrainDate: function(date) {
		var ms = date.valueOf();

		if (this.startMs !== null && ms < this.startMs) {
			ms = this.startMs;
		}

		if (this.endMs !== null && ms >= this.endMs) {
			ms = this.endMs - 1;
		}

		return ms;
	},


	equals: function(otherRange) {
		return this.startMs === otherRange.startMs && this.endMs === otherRange.endMs;
	},


	clone: function() {
		var range = new UnzonedRange(this.startMs, this.endMs);

		range.isStart = this.isStart;
		range.isEnd = this.isEnd;

		return range;
	},


	// Returns an ambig-zoned moment from startMs.
	// BEWARE: returned moment is not localized.
	// Formatting and start-of-week will be default.
	getStart: function() {
		if (this.startMs !== null) {
			return FC.moment.utc(this.startMs).stripZone();
		}
	},

	// Returns an ambig-zoned moment from startMs.
	// BEWARE: returned moment is not localized.
	// Formatting and start-of-week will be default.
	getEnd: function() {
		if (this.endMs !== null) {
			return FC.moment.utc(this.endMs).stripZone();
		}
	},


	as: function(unit) {
		return moment.utc(this.endMs).diff(
			moment.utc(this.startMs),
			unit,
			true
		);
	}

});


/*
SIDEEFFECT: will mutate eventRanges.
Will return a new array result.
Only works for non-open-ended ranges.
*/
function invertUnzonedRanges(ranges, constraintRange) {
	var invertedRanges = [];
	var startMs = constraintRange.startMs; // the end of the previous range. the start of the new range
	var i;
	var dateRange;

	// ranges need to be in order. required for our date-walking algorithm
	ranges.sort(compareUnzonedRanges);

	for (i = 0; i < ranges.length; i++) {
		dateRange = ranges[i];

		// add the span of time before the event (if there is any)
		if (dateRange.startMs > startMs) { // compare millisecond time (skip any ambig logic)
			invertedRanges.push(
				new UnzonedRange(startMs, dateRange.startMs)
			);
		}

		if (dateRange.endMs > startMs) {
			startMs = dateRange.endMs;
		}
	}

	// add the span of time after the last event (if there is any)
	if (startMs < constraintRange.endMs) { // compare millisecond time (skip any ambig logic)
		invertedRanges.push(
			new UnzonedRange(startMs, constraintRange.endMs)
		);
	}

	return invertedRanges;
}


/*
Only works for non-open-ended ranges.
*/
function compareUnzonedRanges(range1, range2) {
	return range1.startMs - range2.startMs; // earlier ranges go first
}

;;

/*
Meant to be immutable
*/
var ComponentFootprint = FC.ComponentFootprint = Class.extend({

	unzonedRange: null,
	isAllDay: false, // component can choose to ignore this


	constructor: function(unzonedRange, isAllDay) {
		this.unzonedRange = unzonedRange;
		this.isAllDay = isAllDay;
	},


	/*
	Only works for non-open-ended ranges.
	*/
	toLegacy: function(calendar) {
		return {
			start: calendar.msToMoment(this.unzonedRange.startMs, this.isAllDay),
			end: calendar.msToMoment(this.unzonedRange.endMs, this.isAllDay)
		};
	}

});

;;

var EventPeriod = Class.extend(EmitterMixin, {

	start: null,
	end: null,
	timezone: null,

	unzonedRange: null,

	requestsByUid: null,
	pendingCnt: 0,

	freezeDepth: 0,
	stuntedReleaseCnt: 0,
	releaseCnt: 0,

	eventDefsByUid: null,
	eventDefsById: null,
	eventInstanceGroupsById: null,


	constructor: function(start, end, timezone) {
		this.start = start;
		this.end = end;
		this.timezone = timezone;

		this.unzonedRange = new UnzonedRange(
			start.clone().stripZone(),
			end.clone().stripZone()
		);

		this.requestsByUid = {};
		this.eventDefsByUid = {};
		this.eventDefsById = {};
		this.eventInstanceGroupsById = {};
	},


	isWithinRange: function(start, end) {
		// TODO: use a range util function?
		return !start.isBefore(this.start) && !end.isAfter(this.end);
	},


	// Requesting and Purging
	// -----------------------------------------------------------------------------------------------------------------


	requestSources: function(sources) {
		this.freeze();

		for (var i = 0; i < sources.length; i++) {
			this.requestSource(sources[i]);
		}

		this.thaw();
	},


	requestSource: function(source) {
		var _this = this;
		var request = { source: source, status: 'pending' };

		this.requestsByUid[source.uid] = request;
		this.pendingCnt += 1;

		source.fetch(this.start, this.end, this.timezone).then(function(eventDefs) {
			if (request.status !== 'cancelled') {
				request.status = 'completed';
				request.eventDefs = eventDefs;

				_this.addEventDefs(eventDefs);
				_this.pendingCnt--;
				_this.tryRelease();
			}
		}, function() { // failure
			if (request.status !== 'cancelled') {
				request.status = 'failed';

				_this.pendingCnt--;
				_this.tryRelease();
			}
		});
	},


	purgeSource: function(source) {
		var request = this.requestsByUid[source.uid];

		if (request) {
			delete this.requestsByUid[source.uid];

			if (request.status === 'pending') {
				request.status = 'cancelled';
				this.pendingCnt--;
				this.tryRelease();
			}
			else if (request.status === 'completed') {
				request.eventDefs.forEach(this.removeEventDef.bind(this));
			}
		}
	},


	purgeAllSources: function() {
		var requestsByUid = this.requestsByUid;
		var uid, request;
		var completedCnt = 0;

		for (uid in requestsByUid) {
			request = requestsByUid[uid];

			if (request.status === 'pending') {
				request.status = 'cancelled';
			}
			else if (request.status === 'completed') {
				completedCnt++;
			}
		}

		this.requestsByUid = {};
		this.pendingCnt = 0;

		if (completedCnt) {
			this.removeAllEventDefs(); // might release
		}
	},


	// Event Definitions
	// -----------------------------------------------------------------------------------------------------------------


	getEventDefByUid: function(eventDefUid) {
		return this.eventDefsByUid[eventDefUid];
	},


	getEventDefsById: function(eventDefId) {
		var a = this.eventDefsById[eventDefId];

		if (a) {
			return a.slice(); // clone
		}

		return [];
	},


	addEventDefs: function(eventDefs) {
		for (var i = 0; i < eventDefs.length; i++) {
			this.addEventDef(eventDefs[i]);
		}
	},


	addEventDef: function(eventDef) {
		var eventDefsById = this.eventDefsById;
		var eventDefId = eventDef.id;
		var eventDefs = eventDefsById[eventDefId] || (eventDefsById[eventDefId] = []);
		var eventInstances = eventDef.buildInstances(this.unzonedRange);
		var i;

		eventDefs.push(eventDef);

		this.eventDefsByUid[eventDef.uid] = eventDef;

		for (i = 0; i < eventInstances.length; i++) {
			this.addEventInstance(eventInstances[i], eventDefId);
		}
	},


	removeEventDefsById: function(eventDefId) {
		var _this = this;

		this.getEventDefsById(eventDefId).forEach(function(eventDef) {
			_this.removeEventDef(eventDef);
		});
	},


	removeAllEventDefs: function() {
		var isEmpty = $.isEmptyObject(this.eventDefsByUid);

		this.eventDefsByUid = {};
		this.eventDefsById = {};
		this.eventInstanceGroupsById = {};

		if (!isEmpty) {
			this.tryRelease();
		}
	},


	removeEventDef: function(eventDef) {
		var eventDefsById = this.eventDefsById;
		var eventDefs = eventDefsById[eventDef.id];

		delete this.eventDefsByUid[eventDef.uid];

		if (eventDefs) {
			removeExact(eventDefs, eventDef);

			if (!eventDefs.length) {
				delete eventDefsById[eventDef.id];
			}

			this.removeEventInstancesForDef(eventDef);
		}
	},


	// Event Instances
	// -----------------------------------------------------------------------------------------------------------------


	getEventInstances: function() { // TODO: consider iterator
		var eventInstanceGroupsById = this.eventInstanceGroupsById;
		var eventInstances = [];
		var id;

		for (id in eventInstanceGroupsById) {
			eventInstances.push.apply(eventInstances, // append
				eventInstanceGroupsById[id].eventInstances
			);
		}

		return eventInstances;
	},


	getEventInstancesWithId: function(eventDefId) {
		var eventInstanceGroup = this.eventInstanceGroupsById[eventDefId];

		if (eventInstanceGroup) {
			return eventInstanceGroup.eventInstances.slice(); // clone
		}

		return [];
	},


	getEventInstancesWithoutId: function(eventDefId) { // TODO: consider iterator
		var eventInstanceGroupsById = this.eventInstanceGroupsById;
		var matchingInstances = [];
		var id;

		for (id in eventInstanceGroupsById) {
			if (id !== eventDefId) {
				matchingInstances.push.apply(matchingInstances, // append
					eventInstanceGroupsById[id].eventInstances
				);
			}
		}

		return matchingInstances;
	},


	addEventInstance: function(eventInstance, eventDefId) {
		var eventInstanceGroupsById = this.eventInstanceGroupsById;
		var eventInstanceGroup = eventInstanceGroupsById[eventDefId] ||
			(eventInstanceGroupsById[eventDefId] = new EventInstanceGroup());

		eventInstanceGroup.eventInstances.push(eventInstance);

		this.tryRelease();
	},


	removeEventInstancesForDef: function(eventDef) {
		var eventInstanceGroupsById = this.eventInstanceGroupsById;
		var eventInstanceGroup = eventInstanceGroupsById[eventDef.id];
		var removeCnt;

		if (eventInstanceGroup) {
			removeCnt = removeMatching(eventInstanceGroup.eventInstances, function(currentEventInstance) {
				return currentEventInstance.def === eventDef;
			});

			if (!eventInstanceGroup.eventInstances.length) {
				delete eventInstanceGroupsById[eventDef.id];
			}

			if (removeCnt) {
				this.tryRelease();
			}
		}
	},


	// Releasing and Freezing
	// -----------------------------------------------------------------------------------------------------------------


	tryRelease: function() {
		if (!this.pendingCnt) {
			if (!this.freezeDepth) {
				this.release();
			}
			else {
				this.stuntedReleaseCnt++;
			}
		}
	},


	release: function() {
		this.releaseCnt++;
		this.trigger('release', this.eventInstanceGroupsById);
	},


	whenReleased: function() {
		var _this = this;

		if (this.releaseCnt) {
			return Promise.resolve(this.eventInstanceGroupsById);
		}
		else {
			return Promise.construct(function(onResolve) {
				_this.one('release', onResolve);
			});
		}
	},


	freeze: function() {
		if (!(this.freezeDepth++)) {
			this.stuntedReleaseCnt = 0;
		}
	},


	thaw: function() {
		if (!(--this.freezeDepth) && this.stuntedReleaseCnt && !this.pendingCnt) {
			this.release();
		}
	}

});

;;

var EventManager = Class.extend(EmitterMixin, ListenerMixin, {

	currentPeriod: null,

	calendar: null,
	stickySource: null,
	otherSources: null, // does not include sticky source


	constructor: function(calendar) {
		this.calendar = calendar;
		this.stickySource = new ArrayEventSource(calendar);
		this.otherSources = [];
	},


	requestEvents: function(start, end, timezone, force) {
		if (
			force ||
			!this.currentPeriod ||
			!this.currentPeriod.isWithinRange(start, end) ||
			timezone !== this.currentPeriod.timezone
		) {
			this.setPeriod( // will change this.currentPeriod
				new EventPeriod(start, end, timezone)
			);
		}

		return this.currentPeriod.whenReleased();
	},


	// Source Adding/Removing
	// -----------------------------------------------------------------------------------------------------------------


	addSource: function(eventSource) {
		this.otherSources.push(eventSource);

		if (this.currentPeriod) {
			this.currentPeriod.requestSource(eventSource); // might release
		}
	},


	removeSource: function(doomedSource) {
		removeExact(this.otherSources, doomedSource);

		if (this.currentPeriod) {
			this.currentPeriod.purgeSource(doomedSource); // might release
		}
	},


	removeAllSources: function() {
		this.otherSources = [];

		if (this.currentPeriod) {
			this.currentPeriod.purgeAllSources(); // might release
		}
	},


	// Source Refetching
	// -----------------------------------------------------------------------------------------------------------------


	refetchSource: function(eventSource) {
		var currentPeriod = this.currentPeriod;

		if (currentPeriod) {
			currentPeriod.freeze();
			currentPeriod.purgeSource(eventSource);
			currentPeriod.requestSource(eventSource);
			currentPeriod.thaw();
		}
	},


	refetchAllSources: function() {
		var currentPeriod = this.currentPeriod;

		if (currentPeriod) {
			currentPeriod.freeze();
			currentPeriod.purgeAllSources();
			currentPeriod.requestSources(this.getSources());
			currentPeriod.thaw();
		}
	},


	// Source Querying
	// -----------------------------------------------------------------------------------------------------------------


	getSources: function() {
		return [ this.stickySource ].concat(this.otherSources);
	},


	// like querySources, but accepts multple match criteria (like multiple IDs)
	multiQuerySources: function(matchInputs) {

		// coerce into an array
		if (!matchInputs) {
			matchInputs = [];
		}
		else if (!$.isArray(matchInputs)) {
			matchInputs = [ matchInputs ];
		}

		var matchingSources = [];
		var i;

		// resolve raw inputs to real event source objects
		for (i = 0; i < matchInputs.length; i++) {
			matchingSources.push.apply( // append
				matchingSources,
				this.querySources(matchInputs[i])
			);
		}

		return matchingSources;
	},


	// matchInput can either by a real event source object, an ID, or the function/URL for the source.
	// returns an array of matching source objects.
	querySources: function(matchInput) {
		var sources = this.otherSources;
		var i, source;

		// given a proper event source object
		for (i = 0; i < sources.length; i++) {
			source = sources[i];

			if (source === matchInput) {
				return [ source ];
			}
		}

		// an ID match
		source = this.getSourceById(EventSource.normalizeId(matchInput));
		if (source) {
			return [ source ];
		}

		// parse as an event source
		matchInput = EventSourceParser.parse(matchInput, this.calendar);
		if (matchInput) {

			return $.grep(sources, function(source) {
				return isSourcesEquivalent(matchInput, source);
			});
		}
	},


	/*
	ID assumed to already be normalized
	*/
	getSourceById: function(id) {
		return $.grep(this.otherSources, function(source) {
			return source.id && source.id === id;
		})[0];
	},


	// Event-Period
	// -----------------------------------------------------------------------------------------------------------------


	setPeriod: function(eventPeriod) {
		if (this.currentPeriod) {
			this.unbindPeriod(this.currentPeriod);
			this.currentPeriod = null;
		}

		this.currentPeriod = eventPeriod;
		this.bindPeriod(eventPeriod);

		eventPeriod.requestSources(this.getSources());
	},


	bindPeriod: function(eventPeriod) {
		this.listenTo(eventPeriod, 'release', function(eventsPayload) {
			this.trigger('release', eventsPayload);
		});
	},


	unbindPeriod: function(eventPeriod) {
		this.stopListeningTo(eventPeriod);
	},


	// Event Getting/Adding/Removing
	// -----------------------------------------------------------------------------------------------------------------


	getEventDefByUid: function(uid) {
		if (this.currentPeriod) {
			return this.currentPeriod.getEventDefByUid(uid);
		}
	},


	addEventDef: function(eventDef, isSticky) {
		if (isSticky) {
			this.stickySource.addEventDef(eventDef);
		}

		if (this.currentPeriod) {
			this.currentPeriod.addEventDef(eventDef); // might release
		}
	},


	removeEventDefsById: function(eventId) {
		this.getSources().forEach(function(eventSource) {
			eventSource.removeEventDefsById(eventId);
		});

		if (this.currentPeriod) {
			this.currentPeriod.removeEventDefsById(eventId); // might release
		}
	},


	removeAllEventDefs: function() {
		this.getSources().forEach(function(eventSource) {
			eventSource.removeAllEventDefs();
		});

		if (this.currentPeriod) {
			this.currentPeriod.removeAllEventDefs();
		}
	},


	// Event Mutating
	// -----------------------------------------------------------------------------------------------------------------


	/*
	Returns an undo function.
	*/
	mutateEventsWithId: function(eventDefId, eventDefMutation) {
		var currentPeriod = this.currentPeriod;
		var eventDefs;
		var undoFuncs = [];

		if (currentPeriod) {

			currentPeriod.freeze();

			eventDefs = currentPeriod.getEventDefsById(eventDefId);
			eventDefs.forEach(function(eventDef) {
				// add/remove esp because id might change
				currentPeriod.removeEventDef(eventDef);
				undoFuncs.push(eventDefMutation.mutateSingle(eventDef));
				currentPeriod.addEventDef(eventDef);
			});

			currentPeriod.thaw();

			return function() {
				currentPeriod.freeze();

				for (var i = 0; i < eventDefs.length; i++) {
					currentPeriod.removeEventDef(eventDefs[i]);
					undoFuncs[i]();
					currentPeriod.addEventDef(eventDefs[i]);
				}

				currentPeriod.thaw();
			};
		}

		return function() { };
	},


	/*
	copies and then mutates
	*/
	buildMutatedEventInstanceGroup: function(eventDefId, eventDefMutation) {
		var eventDefs = this.getEventDefsById(eventDefId);
		var i;
		var defCopy;
		var allInstances = [];

		for (i = 0; i < eventDefs.length; i++) {
			defCopy = eventDefs[i].clone();

			if (defCopy instanceof SingleEventDef) {
				eventDefMutation.mutateSingle(defCopy);

				allInstances.push.apply(allInstances, // append
					defCopy.buildInstances()
				);
			}
		}

		return new EventInstanceGroup(allInstances);
	},


	// Freezing
	// -----------------------------------------------------------------------------------------------------------------


	freeze: function() {
		if (this.currentPeriod) {
			this.currentPeriod.freeze();
		}
	},


	thaw: function() {
		if (this.currentPeriod) {
			this.currentPeriod.thaw();
		}
	}

});


// Methods that straight-up query the current EventPeriod for an array of results.
[
	'getEventDefsById',
	'getEventInstances',
	'getEventInstancesWithId',
	'getEventInstancesWithoutId'
].forEach(function(methodName) {

	EventManager.prototype[methodName] = function() {
		var currentPeriod = this.currentPeriod;

		if (currentPeriod) {
			return currentPeriod[methodName].apply(currentPeriod, arguments);
		}

		return [];
	};
});


function isSourcesEquivalent(source0, source1) {
	return source0.getPrimitive() == source1.getPrimitive();
}

;;

var BUSINESS_HOUR_EVENT_DEFAULTS = {
	start: '09:00',
	end: '17:00',
	dow: [ 1, 2, 3, 4, 5 ], // monday - friday
	rendering: 'inverse-background'
	// classNames are defined in businessHoursSegClasses
};


var BusinessHourGenerator = FC.BusinessHourGenerator = Class.extend({

	rawComplexDef: null,
	calendar: null, // for anonymous EventSource


	constructor: function(rawComplexDef, calendar) {
		this.rawComplexDef = rawComplexDef;
		this.calendar = calendar;
	},


	buildEventInstanceGroup: function(isAllDay, unzonedRange) {
		var eventDefs = this.buildEventDefs(isAllDay);
		var eventInstanceGroup;

		if (eventDefs.length) {
			eventInstanceGroup = new EventInstanceGroup(
				eventDefsToEventInstances(eventDefs, unzonedRange)
			);

			// so that inverse-background rendering can happen even when no eventRanges in view
			eventInstanceGroup.explicitEventDef = eventDefs[0];

			return eventInstanceGroup;
		}
	},


	buildEventDefs: function(isAllDay) {
		var rawComplexDef = this.rawComplexDef;
		var rawDefs = [];
		var requireDow = false;
		var i;
		var defs = [];

		if (rawComplexDef === true) {
			rawDefs = [ {} ]; // will get BUSINESS_HOUR_EVENT_DEFAULTS verbatim
		}
		else if ($.isPlainObject(rawComplexDef)) {
			rawDefs = [ rawComplexDef ];
		}
		else if ($.isArray(rawComplexDef)) {
			rawDefs = rawComplexDef;
			requireDow = true; // every sub-definition NEEDS a day-of-week
		}

		for (i = 0; i < rawDefs.length; i++) {
			if (!requireDow || rawDefs[i].dow) {
				defs.push(
					this.buildEventDef(isAllDay, rawDefs[i])
				);
			}
		}

		return defs;
	},


	buildEventDef: function(isAllDay, rawDef) {
		var fullRawDef = $.extend({}, BUSINESS_HOUR_EVENT_DEFAULTS, rawDef);

		if (isAllDay) {
			fullRawDef.start = null;
			fullRawDef.end = null;
		}

		return RecurringEventDef.parse(
			fullRawDef,
			new EventSource(this.calendar) // dummy source
		);
	}

});

;;

var EventDefParser = {

	parse: function(eventInput, source) {
		if (
			isTimeString(eventInput.start) || moment.isDuration(eventInput.start) ||
			isTimeString(eventInput.end) || moment.isDuration(eventInput.end)
		) {
			return RecurringEventDef.parse(eventInput, source);
		}
		else {
			return SingleEventDef.parse(eventInput, source);
		}
	}

};

;;

var EventDef = FC.EventDef = Class.extend(ParsableModelMixin, {

	source: null, // required

	id: null, // normalized supplied ID
	rawId: null, // unnormalized supplied ID
	uid: null, // internal ID. new ID for every definition

	// NOTE: eventOrder sorting relies on these
	title: null,
	url: null,
	rendering: null,
	constraint: null,
	overlap: null,
	editable: null,
	startEditable: null,
	durationEditable: null,
	color: null,
	backgroundColor: null,
	borderColor: null,
	textColor: null,

	className: null, // an array. TODO: rename to className*s* (API breakage)
	miscProps: null,


	constructor: function(source) {
		this.source = source;
		this.className = [];
		this.miscProps = {};
	},


	isAllDay: function() {
		// subclasses must implement
	},


	buildInstances: function(unzonedRange) {
		// subclasses must implement
	},


	clone: function() {
		var copy = new this.constructor(this.source);

		copy.id = this.id;
		copy.rawId = this.rawId;
		copy.uid = this.uid; // not really unique anymore :(

		EventDef.copyVerbatimStandardProps(this, copy);

		copy.className = this.className.slice(); // copy
		copy.miscProps = $.extend({}, this.miscProps);

		return copy;
	},


	hasInverseRendering: function() {
		return this.getRendering() === 'inverse-background';
	},


	hasBgRendering: function() {
		var rendering = this.getRendering();

		return rendering === 'inverse-background' || rendering === 'background';
	},


	getRendering: function() {
		if (this.rendering != null) {
			return this.rendering;
		}

		return this.source.rendering;
	},


	getConstraint: function() {
		if (this.constraint != null) {
			return this.constraint;
		}

		if (this.source.constraint != null) {
			return this.source.constraint;
		}

		return this.source.calendar.opt('eventConstraint'); // what about View option?
	},


	getOverlap: function() {
		if (this.overlap != null) {
			return this.overlap;
		}

		if (this.source.overlap != null) {
			return this.source.overlap;
		}

		return this.source.calendar.opt('eventOverlap'); // what about View option?
	},


	isStartExplicitlyEditable: function() {
		if (this.startEditable !== null) {
			return this.startEditable;
		}

		return this.source.startEditable;
	},


	isDurationExplicitlyEditable: function() {
		if (this.durationEditable !== null) {
			return this.durationEditable;
		}

		return this.source.durationEditable;
	},


	isExplicitlyEditable: function() {
		if (this.editable !== null) {
			return this.editable;
		}

		return this.source.editable;
	},


	toLegacy: function() {
		var obj = $.extend({}, this.miscProps);

		obj._id = this.uid;
		obj.source = this.source;
		obj.className = this.className.slice(); // copy
		obj.allDay = this.isAllDay();

		if (this.rawId != null) {
			obj.id = this.rawId;
		}

		EventDef.copyVerbatimStandardProps(this, obj);

		return obj;
	},


	applyManualStandardProps: function(rawProps) {

		if (rawProps.id != null) {
			this.id = EventDef.normalizeId((this.rawId = rawProps.id));
		}
		else {
			this.id = EventDef.generateId();
		}

		if (rawProps._id != null) { // accept this prop, even tho somewhat internal
			this.uid = String(rawProps._id);
		}
		else {
			this.uid = EventDef.generateId();
		}

		// TODO: converge with EventSource
		if ($.isArray(rawProps.className)) {
			this.className = rawProps.className;
		}
		if (typeof rawProps.className === 'string') {
			this.className = rawProps.className.split(/\s+/);
		}

		return true;
	},


	applyMiscProps: function(rawProps) {
		$.extend(this.miscProps, rawProps);
	}

});

// finish initializing the mixin
EventDef.defineStandardProps = ParsableModelMixin_defineStandardProps;
EventDef.copyVerbatimStandardProps = ParsableModelMixin_copyVerbatimStandardProps;


// IDs
// ---------------------------------------------------------------------------------------------------------------------
// TODO: converge with EventSource


EventDef.uuid = 0;


EventDef.normalizeId = function(id) {
	return String(id);
};


EventDef.generateId = function() {
	return '_fc' + (EventDef.uuid++);
};


// Parsing
// ---------------------------------------------------------------------------------------------------------------------


EventDef.defineStandardProps({
	// not automatically assigned (`false`)
	_id: false,
	id: false,
	className: false,
	source: false, // will ignored

	// automatically assigned (`true`)
	title: true,
	url: true,
	rendering: true,
	constraint: true,
	overlap: true,
	editable: true,
	startEditable: true,
	durationEditable: true,
	color: true,
	backgroundColor: true,
	borderColor: true,
	textColor: true
});


EventDef.parse = function(rawInput, source) {
	var def = new this(source);

	if (def.applyProps(rawInput)) {
		return def;
	}

	return false;
};

;;

var SingleEventDef = EventDef.extend({

	dateProfile: null,


	/*
	Will receive start/end params, but will be ignored.
	*/
	buildInstances: function() {
		return [ this.buildInstance() ];
	},


	buildInstance: function() {
		return new EventInstance(
			this, // definition
			this.dateProfile
		);
	},


	isAllDay: function() {
		return this.dateProfile.isAllDay();
	},


	clone: function() {
		var def = EventDef.prototype.clone.call(this);

		def.dateProfile = this.dateProfile;

		return def;
	},


	rezone: function() {
		var calendar = this.source.calendar;
		var dateProfile = this.dateProfile;

		this.dateProfile = new EventDateProfile(
			calendar.moment(dateProfile.start),
			dateProfile.end ? calendar.moment(dateProfile.end) : null,
			calendar
		);
	},


	/*
	NOTE: if super-method fails, should still attempt to apply
	*/
	applyManualStandardProps: function(rawProps) {
		var superSuccess = EventDef.prototype.applyManualStandardProps.apply(this, arguments);
		var dateProfile = EventDateProfile.parse(rawProps, this.source); // returns null on failure

		if (dateProfile) {
			this.dateProfile = dateProfile;

			// make sure `date` shows up in the legacy event objects as-is
			if (rawProps.date != null) {
				this.miscProps.date = rawProps.date;
			}

			return superSuccess;
		}
		else {
			return false;
		}
	}

});


// Parsing
// ---------------------------------------------------------------------------------------------------------------------


SingleEventDef.defineStandardProps({ // false = manually process
	start: false,
	date: false, // alias for 'start'
	end: false,
	allDay: false
});

;;

var RecurringEventDef = EventDef.extend({

	startTime: null, // duration
	endTime: null, // duration, or null
	dowHash: null, // object hash, or null


	isAllDay: function() {
		return !this.startTime && !this.endTime;
	},


	buildInstances: function(unzonedRange) {
		var calendar = this.source.calendar;
		var unzonedDate = unzonedRange.getStart();
		var unzonedEnd = unzonedRange.getEnd();
		var zonedDayStart;
		var instanceStart, instanceEnd;
		var instances = [];

		while (unzonedDate.isBefore(unzonedEnd)) {

			// if everyday, or this particular day-of-week
			if (!this.dowHash || this.dowHash[unzonedDate.day()]) {

				zonedDayStart = calendar.applyTimezone(unzonedDate);
				instanceStart = zonedDayStart.clone();
				instanceEnd = null;

				if (this.startTime) {
					instanceStart.time(this.startTime);
				}
				else {
					instanceStart.stripTime();
				}

				if (this.endTime) {
					instanceEnd = zonedDayStart.clone().time(this.endTime);
				}

				instances.push(
					new EventInstance(
						this, // definition
						new EventDateProfile(instanceStart, instanceEnd, calendar)
					)
				);
			}

			unzonedDate.add(1, 'days');
		}

		return instances;
	},


	setDow: function(dowNumbers) {

		if (!this.dowHash) {
			this.dowHash = {};
		}

		for (var i = 0; i < dowNumbers.length; i++) {
			this.dowHash[dowNumbers[i]] = true;
		}
	},


	clone: function() {
		var def = EventDef.prototype.clone.call(this);

		if (def.startTime) {
			def.startTime = moment.duration(this.startTime);
		}

		if (def.endTime) {
			def.endTime = moment.duration(this.endTime);
		}

		if (this.dowHash) {
			def.dowHash = $.extend({}, this.dowHash);
		}

		return def;
	},


	/*
	NOTE: if super-method fails, should still attempt to apply
	*/
	applyProps: function(rawProps) {
		var superSuccess = EventDef.prototype.applyProps.apply(this, arguments);

		if (rawProps.start) {
			this.startTime = moment.duration(rawProps.start);
		}

		if (rawProps.end) {
			this.endTime = moment.duration(rawProps.end);
		}

		if (rawProps.dow) {
			this.setDow(rawProps.dow);
		}

		return superSuccess;
	}

});


// Parsing
// ---------------------------------------------------------------------------------------------------------------------


RecurringEventDef.defineStandardProps({ // false = manually process
	start: false,
	end: false,
	dow: false
});

;;

var EventInstance = Class.extend({

	def: null, // EventDef
	dateProfile: null, // EventDateProfile


	constructor: function(def, dateProfile) {
		this.def = def;
		this.dateProfile = dateProfile;
	},


	toLegacy: function() {
		var dateProfile = this.dateProfile;
		var obj = this.def.toLegacy();

		obj.start = dateProfile.start.clone();
		obj.end = dateProfile.end ? dateProfile.end.clone() : null;

		return obj;
	}

});

;;

/*
It's expected that there will be at least one EventInstance,
OR that an explicitEventDef is assigned.
*/
var EventInstanceGroup = FC.EventInstanceGroup = Class.extend({

	eventInstances: null,
	explicitEventDef: null, // optional


	constructor: function(eventInstances) {
		this.eventInstances = eventInstances || [];
	},


	getAllEventRanges: function(constraintRange) {
		if (constraintRange) {
			return this.sliceNormalRenderRanges(constraintRange);
		}
		else {
			return this.eventInstances.map(eventInstanceToEventRange);
		}
	},


	sliceRenderRanges: function(constraintRange) {
		if (this.isInverse()) {
			return this.sliceInverseRenderRanges(constraintRange);
		}
		else {
			return this.sliceNormalRenderRanges(constraintRange);
		}
	},


	sliceNormalRenderRanges: function(constraintRange) {
		var eventInstances = this.eventInstances;
		var i, eventInstance;
		var slicedRange;
		var slicedEventRanges = [];

		for (i = 0; i < eventInstances.length; i++) {
			eventInstance = eventInstances[i];

			slicedRange = eventInstance.dateProfile.unzonedRange.intersect(constraintRange);

			if (slicedRange) {
				slicedEventRanges.push(
					new EventRange(
						slicedRange,
						eventInstance.def,
						eventInstance
					)
				);
			}
		}

		return slicedEventRanges;
	},


	sliceInverseRenderRanges: function(constraintRange) {
		var unzonedRanges = this.eventInstances.map(eventInstanceToUnzonedRange);
		var ownerDef = this.getEventDef();

		unzonedRanges = invertUnzonedRanges(unzonedRanges, constraintRange);

		return unzonedRanges.map(function(unzonedRange) {
			return new EventRange(unzonedRange, ownerDef); // don't give an EventInstance
		});
	},


	isInverse: function() {
		return this.getEventDef().hasInverseRendering();
	},


	getEventDef: function() {
		return this.explicitEventDef || this.eventInstances[0].def;
	}

});

;;

/*
Meant to be immutable
*/
var EventDateProfile = Class.extend({

	start: null,
	end: null,
	unzonedRange: null,


	constructor: function(start, end, calendar) {
		this.start = start;
		this.end = end || null;
		this.unzonedRange = this.buildUnzonedRange(calendar);
	},


	isAllDay: function() { // why recompute this every time?
		return !(this.start.hasTime() || (this.end && this.end.hasTime()));
	},


	/*
	Needs a Calendar object
	*/
	buildUnzonedRange: function(calendar) {
		var startMs = this.start.clone().stripZone().valueOf();
		var endMs = this.getEnd(calendar).stripZone().valueOf();

		return new UnzonedRange(startMs, endMs);
	},


	/*
	Needs a Calendar object
	*/
	getEnd: function(calendar) {
		return this.end ?
			this.end.clone() :
			// derive the end from the start and allDay. compute allDay if necessary
			calendar.getDefaultEventEnd(
				this.isAllDay(),
				this.start
			);
	}

});


EventDateProfile.isStandardProp = function(propName) {
	return propName === 'start' || propName === 'date' || propName === 'end' || propName === 'allDay';
};


/*
Needs an EventSource object
*/
EventDateProfile.parse = function(rawProps, source) {
	var startInput = rawProps.start || rawProps.date;
	var endInput = rawProps.end;

	if (!startInput) {
		return false;
	}

	var calendar = source.calendar;
	var start = calendar.moment(startInput);
	var end = endInput ? calendar.moment(endInput) : null;
	var forcedAllDay = rawProps.allDay;
	var forceEventDuration = calendar.opt('forceEventDuration');

	if (!start.isValid()) {
		return false;
	}

	if (end && (!end.isValid() || !end.isAfter(start))) {
		end = null;
	}

	if (forcedAllDay == null) {
		forcedAllDay = source.allDayDefault;
		if (forcedAllDay == null) {
			forcedAllDay = calendar.opt('allDayDefault');
		}
	}

	if (forcedAllDay === true) {
		start.stripTime();
		if (end) {
			end.stripTime();
		}
	}
	else if (forcedAllDay === false) {
		if (!start.hasTime()) {
			start.time(0);
		}
		if (end && !end.hasTime()) {
			end.time(0);
		}
	}

	if (!end && forceEventDuration) {
		end = calendar.getDefaultEventEnd(!start.hasTime(), start);
	}

	return new EventDateProfile(start, end, calendar);
};

;;

var EventRange = Class.extend({

	unzonedRange: null,
	eventDef: null,
	eventInstance: null, // optional


	constructor: function(unzonedRange, eventDef, eventInstance) {
		this.unzonedRange = unzonedRange;
		this.eventDef = eventDef;

		if (eventInstance) {
			this.eventInstance = eventInstance;
		}
	}

});

;;

var EventFootprint = FC.EventFootprint = Class.extend({

	componentFootprint: null,
	eventDef: null,
	eventInstance: null, // optional


	constructor: function(componentFootprint, eventDef, eventInstance) {
		this.componentFootprint = componentFootprint;
		this.eventDef = eventDef;

		if (eventInstance) {
			this.eventInstance = eventInstance;
		}
	},


	getEventLegacy: function() {
		return (this.eventInstance || this.eventDef).toLegacy();
	}

});

;;

var EventDefMutation = FC.EventDefMutation = Class.extend({

	// won't ever be empty. will be null instead.
	// callers should use setDateMutation for setting.
	dateMutation: null,

	// hacks to get updateEvent/createFromRawProps to work.
	// not undo-able and not considered in isEmpty.
	eventDefId: null, // standard manual props
	className: null, // "
	verbatimStandardProps: null,
	miscProps: null,


	/*
	eventDef assumed to be a SingleEventDef.
	returns an undo function.
	*/
	mutateSingle: function(eventDef) {
		var origDateProfile;

		if (this.dateMutation) {
			origDateProfile = eventDef.dateProfile;

			eventDef.dateProfile = this.dateMutation.buildNewDateProfile(
				origDateProfile,
				eventDef.source.calendar
			);
		}

		// can't undo
		// TODO: more DRY with EventDef::applyManualStandardProps
		if (this.eventDefId != null) {
			eventDef.id = EventDef.normalizeId((eventDef.rawId = this.eventDefId));
		}

		// can't undo
		// TODO: more DRY with EventDef::applyManualStandardProps
		if (this.className) {
			eventDef.className = this.className;
		}

		// can't undo
		if (this.verbatimStandardProps) {
			SingleEventDef.copyVerbatimStandardProps(
				this.verbatimStandardProps, // src
				eventDef // dest
			);
		}

		// can't undo
		if (this.miscProps) {
			eventDef.applyMiscProps(this.miscProps);
		}

		if (origDateProfile) {
			return function() {
				eventDef.dateProfile = origDateProfile;
			};
		}
		else {
			return function() { };
		}
	},


	setDateMutation: function(dateMutation) {
		if (dateMutation && !dateMutation.isEmpty()) {
			this.dateMutation = dateMutation;
		}
		else {
			this.dateMutation = null;
		}
	},


	isEmpty: function() {
		return !this.dateMutation;
	}

});


EventDefMutation.createFromRawProps = function(eventInstance, rawProps, largeUnit) {
	var eventDef = eventInstance.def;
	var dateProps = {};
	var standardProps = {};
	var miscProps = {};
	var verbatimStandardProps = {};
	var eventDefId = null;
	var className = null;
	var propName;
	var dateProfile;
	var dateMutation;
	var defMutation;

	for (propName in rawProps) {
		if (EventDateProfile.isStandardProp(propName)) {
			dateProps[propName] = rawProps[propName];
		}
		else if (eventDef.isStandardProp(propName)) {
			standardProps[propName] = rawProps[propName];
		}
		else if (eventDef.miscProps[propName] !== rawProps[propName]) { // only if changed
			miscProps[propName] = rawProps[propName];
		}
	}

	dateProfile = EventDateProfile.parse(dateProps, eventDef.source);

	if (dateProfile) { // no failure?
		dateMutation = EventDefDateMutation.createFromDiff(
			eventInstance.dateProfile,
			dateProfile,
			largeUnit
		);
	}

	if (standardProps.id !== eventDef.id) {
		eventDefId = standardProps.id; // only apply if there's a change
	}

	if (!isArraysEqual(standardProps.className, eventDef.className)) {
		className = standardProps.className; // only apply if there's a change
	}

	EventDef.copyVerbatimStandardProps(
		standardProps, // src
		verbatimStandardProps // dest
	);

	defMutation = new EventDefMutation();
	defMutation.eventDefId = eventDefId;
	defMutation.className = className;
	defMutation.verbatimStandardProps = verbatimStandardProps;
	defMutation.miscProps = miscProps;

	if (dateMutation) {
		defMutation.dateMutation = dateMutation;
	}

	return defMutation;
};

;;

var EventDefDateMutation = Class.extend({

	clearEnd: false,
	forceTimed: false,
	forceAllDay: false,

	// Durations. if 0-ms duration, will be null instead.
	// Callers should not set this directly.
	dateDelta: null,
	startDelta: null,
	endDelta: null,


	/*
	returns an undo function.
	*/
	buildNewDateProfile: function(eventDateProfile, calendar) {
		var start = eventDateProfile.start.clone();
		var end = null;
		var shouldRezone = false;

		if (eventDateProfile.end && !this.clearEnd) {
			end = eventDateProfile.end.clone();
		}
		// if there will be an end-date mutation, guarantee an end,
		// ambigously-zoned according to the original allDay
		else if (this.endDelta && !end) {
			end = calendar.getDefaultEventEnd(eventDateProfile.isAllDay(), start);
		}

		if (this.forceTimed) {
			shouldRezone = true;

			if (!start.hasTime()) {
				start.time(0);
			}

			if (end && !end.hasTime()) {
				end.time(0);
			}
		}
		else if (this.forceAllDay) {

			if (start.hasTime()) {
				start.stripTime();
			}

			if (end && end.hasTime()) {
				end.stripTime();
			}
		}

		if (this.dateDelta) {
			shouldRezone = true;

			start.add(this.dateDelta);

			if (end) {
				end.add(this.dateDelta);
			}
		}

		// do this before adding startDelta to start, so we can work off of start
		if (this.endDelta) {
			shouldRezone = true;

			end.add(this.endDelta);
		}

		if (this.startDelta) {
			shouldRezone = true;

			start.add(this.startDelta);
		}

		if (shouldRezone) {
			start = calendar.applyTimezone(start);

			if (end) {
				end = calendar.applyTimezone(end);
			}
		}

		// TODO: okay to access calendar option?
		if (!end && calendar.opt('forceEventDuration')) {
			end = calendar.getDefaultEventEnd(eventDateProfile.isAllDay(), start);
		}

		return new EventDateProfile(start, end, calendar);
	},


	setDateDelta: function(dateDelta) {
		if (dateDelta && dateDelta.valueOf()) {
			this.dateDelta = dateDelta;
		}
		else {
			this.dateDelta = null;
		}
	},


	setStartDelta: function(startDelta) {
		if (startDelta && startDelta.valueOf()) {
			this.startDelta = startDelta;
		}
		else {
			this.startDelta = null;
		}
	},


	setEndDelta: function(endDelta) {
		if (endDelta && endDelta.valueOf()) {
			this.endDelta = endDelta;
		}
		else {
			this.endDelta = null;
		}
	},


	isEmpty: function() {
		return !this.clearEnd && !this.forceTimed && !this.forceAllDay &&
			!this.dateDelta && !this.startDelta && !this.endDelta;
	}

});


EventDefDateMutation.createFromDiff = function(dateProfile0, dateProfile1, largeUnit) {
	var clearEnd = dateProfile0.end && !dateProfile1.end;
	var forceTimed = dateProfile0.isAllDay() && !dateProfile1.isAllDay();
	var forceAllDay = !dateProfile0.isAllDay() && dateProfile1.isAllDay();
	var dateDelta;
	var endDiff;
	var endDelta;
	var mutation;

	// subtracts the dates in the appropriate way, returning a duration
	function subtractDates(date1, date0) { // date1 - date0
		if (largeUnit) {
			return diffByUnit(date1, date0, largeUnit); // poorly named
		}
		else if (dateProfile1.isAllDay()) {
			return diffDay(date1, date0); // poorly named
		}
		else {
			return diffDayTime(date1, date0); // poorly named
		}
	}

	dateDelta = subtractDates(dateProfile1.start, dateProfile0.start);

	if (dateProfile1.end) {
		// use unzonedRanges because dateProfile0.end might be null
		endDiff = subtractDates(
			dateProfile1.unzonedRange.getEnd(),
			dateProfile0.unzonedRange.getEnd()
		);
		endDelta = endDiff.subtract(dateDelta);
	}

	mutation = new EventDefDateMutation();
	mutation.clearEnd = clearEnd;
	mutation.forceTimed = forceTimed;
	mutation.forceAllDay = forceAllDay;
	mutation.setDateDelta(dateDelta);
	mutation.setEndDelta(endDelta);

	return mutation;
};

;;

function eventDefsToEventInstances(eventDefs, unzonedRange) {
	var eventInstances = [];
	var i;

	for (i = 0; i < eventDefs.length; i++) {
		eventInstances.push.apply(eventInstances, // append
			eventDefs[i].buildInstances(unzonedRange)
		);
	}

	return eventInstances;
}


function eventInstanceToEventRange(eventInstance) {
	return new EventRange(
		eventInstance.dateProfile.unzonedRange,
		eventInstance.def,
		eventInstance
	);
}


function eventRangeToEventFootprint(eventRange) {
	return new EventFootprint(
		new ComponentFootprint(
			eventRange.unzonedRange,
			eventRange.eventDef.isAllDay()
		),
		eventRange.eventDef,
		eventRange.eventInstance // might not exist
	);
}


function eventInstanceToUnzonedRange(eventInstance) {
	return eventInstance.dateProfile.unzonedRange;
}


function eventFootprintToComponentFootprint(eventFootprint) {
	return eventFootprint.componentFootprint;
}

;;

var EventSource = Class.extend(ParsableModelMixin, {

	calendar: null,

	id: null, // can stay null
	uid: null,
	color: null,
	backgroundColor: null,
	borderColor: null,
	textColor: null,
	className: null, // array
	editable: null,
	startEditable: null,
	durationEditable: null,
	rendering: null,
	overlap: null,
	constraint: null,
	allDayDefault: null,
	eventDataTransform: null, // optional function


	// can we do away with calendar? at least for the abstract?
	// useful for buildEventDef
	constructor: function(calendar) {
		this.calendar = calendar;
		this.className = [];
		this.uid = String(EventSource.uuid++);
	},


	fetch: function(start, end, timezone) {
		// subclasses must implement. must return a promise.
	},


	removeEventDefsById: function(eventDefId) {
		// optional for subclasses to implement
	},


	removeAllEventDefs: function() {
		// optional for subclasses to implement
	},


	/*
	For compairing/matching
	*/
	getPrimitive: function(otherSource) {
		// subclasses must implement
	},


	parseEventDefs: function(rawEventDefs) {
		var i;
		var eventDef;
		var eventDefs = [];

		for (i = 0; i < rawEventDefs.length; i++) {
			eventDef = this.parseEventDef(rawEventDefs[i]);

			if (eventDef) {
				eventDefs.push(eventDef);
			}
		}

		return eventDefs;
	},


	parseEventDef: function(rawInput) {
		var calendarTransform = this.calendar.opt('eventDataTransform');
		var sourceTransform = this.eventDataTransform;

		if (calendarTransform) {
			rawInput = calendarTransform(rawInput);
		}
		if (sourceTransform) {
			rawInput = sourceTransform(rawInput);
		}

		return EventDefParser.parse(rawInput, this);
	},


	applyManualStandardProps: function(rawProps) {

		if (rawProps.id != null) {
			this.id = EventSource.normalizeId(rawProps.id);
		}

		// TODO: converge with EventDef
		if ($.isArray(rawProps.className)) {
			this.className = rawProps.className;
		}
		else if (typeof rawProps.className === 'string') {
			this.className = rawProps.className.split(/\s+/);
		}

		return true;
	}

});


// finish initializing the mixin
EventSource.defineStandardProps = ParsableModelMixin_defineStandardProps;


// IDs
// ---------------------------------------------------------------------------------------------------------------------
// TODO: converge with EventDef


EventSource.uuid = 0;


EventSource.normalizeId = function(id) {
	if (id) {
		return String(id);
	}

	return null;
};


// Parsing
// ---------------------------------------------------------------------------------------------------------------------


EventSource.defineStandardProps({
	// manually process...
	id: false,
	className: false,

	// automatically transfer...
	color: true,
	backgroundColor: true,
	borderColor: true,
	textColor: true,
	editable: true,
	startEditable: true,
	durationEditable: true,
	rendering: true,
	overlap: true,
	constraint: true,
	allDayDefault: true,
	eventDataTransform: true
});


/*
rawInput can be any data type!
*/
EventSource.parse = function(rawInput, calendar) {
	var source = new this(calendar);

	if (typeof rawInput === 'object') {
		if (source.applyProps(rawInput)) {
			return source;
		}
	}

	return false;
};


FC.EventSource = EventSource;

;;

var EventSourceParser = {

	sourceClasses: [],


	registerClass: function(EventSourceClass) {
		this.sourceClasses.unshift(EventSourceClass); // give highest priority
	},


	parse: function(rawInput, calendar) {
		var sourceClasses = this.sourceClasses;
		var i;
		var eventSource;

		for (i = 0; i < sourceClasses.length; i++) {
			eventSource = sourceClasses[i].parse(rawInput, calendar);

			if (eventSource) {
				return eventSource;
			}
		}
	}

};


FC.EventSourceParser = EventSourceParser;

;;

var ArrayEventSource = EventSource.extend({

	rawEventDefs: null, // unparsed
	eventDefs: null,
	currentTimezone: null,


	constructor: function(calendar) {
		EventSource.apply(this, arguments); // super-constructor
		this.eventDefs = []; // for if setRawEventDefs is never called
	},


	setRawEventDefs: function(rawEventDefs) {
		this.rawEventDefs = rawEventDefs;
		this.eventDefs = this.parseEventDefs(rawEventDefs);
	},


	fetch: function(start, end, timezone) {
		var eventDefs = this.eventDefs;
		var i;

		if (
			this.currentTimezone !== null &&
			this.currentTimezone !== timezone
		) {
			for (i = 0; i < eventDefs.length; i++) {
				if (eventDefs[i] instanceof SingleEventDef) {
					eventDefs[i].rezone();
				}
			}
		}

		this.currentTimezone = timezone;

		return Promise.resolve(eventDefs);
	},


	addEventDef: function(eventDef) {
		this.eventDefs.push(eventDef);
	},


	/*
	eventDefId already normalized to a string
	*/
	removeEventDefsById: function(eventDefId) {
		return removeMatching(this.eventDefs, function(eventDef) {
			return eventDef.id === eventDefId;
		});
	},


	removeAllEventDefs: function() {
		this.eventDefs = [];
	},


	getPrimitive: function() {
		return this.rawEventDefs;
	},


	applyManualStandardProps: function(rawProps) {
		var superSuccess = EventSource.prototype.applyManualStandardProps.apply(this, arguments);

		this.setRawEventDefs(rawProps.events);

		return superSuccess;
	}

});


ArrayEventSource.defineStandardProps({
	events: false // don't automatically transfer
});


ArrayEventSource.parse = function(rawInput, calendar) {
	var rawProps;

	// normalize raw input
	if ($.isArray(rawInput.events)) { // extended form
		rawProps = rawInput;
	}
	else if ($.isArray(rawInput)) { // short form
		rawProps = { events: rawInput };
	}

	if (rawProps) {
		return EventSource.parse.call(this, rawProps, calendar);
	}

	return false;
};


EventSourceParser.registerClass(ArrayEventSource);

FC.ArrayEventSource = ArrayEventSource;

;;

var FuncEventSource = EventSource.extend({

	func: null,


	fetch: function(start, end, timezone) {
		var _this = this;

		this.calendar.pushLoading();

		return Promise.construct(function(onResolve) {
			_this.func.call(
				_this.calendar,
				start.clone(),
				end.clone(),
				timezone,
				function(rawEventDefs) {
					_this.calendar.popLoading();

					onResolve(_this.parseEventDefs(rawEventDefs));
				}
			);
		});
	},


	getPrimitive: function() {
		return this.func;
	},


	applyManualStandardProps: function(rawProps) {
		var superSuccess = EventSource.prototype.applyManualStandardProps.apply(this, arguments);

		this.func = rawProps.events;

		return superSuccess;
	}

});


FuncEventSource.defineStandardProps({
	events: false // don't automatically transfer
});


FuncEventSource.parse = function(rawInput, calendar) {
	var rawProps;

	// normalize raw input
	if ($.isFunction(rawInput.events)) { // extended form
		rawProps = rawInput;
	}
	else if ($.isFunction(rawInput)) { // short form
		rawProps = { events: rawInput };
	}

	if (rawProps) {
		return EventSource.parse.call(this, rawProps, calendar);
	}

	return false;
};


EventSourceParser.registerClass(FuncEventSource);

FC.FuncEventSource = FuncEventSource;

;;

var JsonFeedEventSource = EventSource.extend({

	// these props must all be manually set before calling fetch
	url: null,
	startParam: null,
	endParam: null,
	timezoneParam: null,
	ajaxSettings: null, // does not include url


	fetch: function(start, end, timezone) {
		var _this = this;
		var ajaxSettings = this.ajaxSettings;
		var onSuccess = ajaxSettings.success;
		var onError = ajaxSettings.error;
		var requestParams = this.buildRequestParams(start, end, timezone);

		// todo: eventually handle the promise's then,
		// don't intercept success/error
		// tho will be a breaking API change

		this.calendar.pushLoading();

		return Promise.construct(function(onResolve, onReject) {
			$.ajax($.extend(
				{}, // destination
				JsonFeedEventSource.AJAX_DEFAULTS,
				ajaxSettings,
				{
					url: _this.url,
					data: requestParams,
					success: function(rawEventDefs) {
						var callbackRes;

						_this.calendar.popLoading();

						if (rawEventDefs) {
							callbackRes = applyAll(onSuccess, this, arguments); // redirect `this`

							if ($.isArray(callbackRes)) {
								rawEventDefs = callbackRes;
							}

							onResolve(_this.parseEventDefs(rawEventDefs));
						}
						else {
							onReject();
						}
					},
					error: function() {
						_this.calendar.popLoading();

						applyAll(onError, this, arguments); // redirect `this`
						onReject();
					}
				}
			));
		});
	},


	buildRequestParams: function(start, end, timezone) {
		var calendar = this.calendar;
		var ajaxSettings = this.ajaxSettings;
		var startParam, endParam, timezoneParam;
		var customRequestParams;
		var params = {};

		startParam = this.startParam;
		if (startParam == null) {
			startParam = calendar.opt('startParam');
		}

		endParam = this.endParam;
		if (endParam == null) {
			endParam = calendar.opt('endParam');
		}

		timezoneParam = this.timezoneParam;
		if (timezoneParam == null) {
			timezoneParam = calendar.opt('timezoneParam');
		}

		// retrieve any outbound GET/POST $.ajax data from the options
		if ($.isFunction(ajaxSettings.data)) {
			// supplied as a function that returns a key/value object
			customRequestParams = ajaxSettings.data();
		}
		else {
			// probably supplied as a straight key/value object
			customRequestParams = ajaxSettings.data || {};
		}

		$.extend(params, customRequestParams);

		params[startParam] = start.format();
		params[endParam] = end.format();

		if (timezone && timezone !== 'local') {
			params[timezoneParam] = timezone;
		}

		return params;
	},


	getPrimitive: function() {
		return this.url;
	},


	applyMiscProps: function(rawProps) {
		EventSource.prototype.applyMiscProps.apply(this, arguments);

		this.ajaxSettings = rawProps;
	}

});


JsonFeedEventSource.AJAX_DEFAULTS = {
	dataType: 'json',
	cache: false
};


JsonFeedEventSource.defineStandardProps({
	// automatically transfer (true)...
	url: true,
	startParam: true,
	endParam: true,
	timezoneParam: true
});


JsonFeedEventSource.parse = function(rawInput, calendar) {
	var rawProps;

	// normalize raw input
	if (typeof rawInput.url === 'string') { // extended form
		rawProps = rawInput;
	}
	else if (typeof rawInput === 'string') { // short form
		rawProps = { url: rawInput };
	}

	if (rawProps) {
		return EventSource.parse.call(this, rawProps, calendar);
	}

	return false;
};


EventSourceParser.registerClass(JsonFeedEventSource);

FC.JsonFeedEventSource = JsonFeedEventSource;

;;

var ThemeRegistry = FC.ThemeRegistry = {

	themeClassHash: {},


	register: function(themeName, themeClass) {
		this.themeClassHash[themeName] = themeClass;
	},


	getThemeClass: function(themeSetting) {
		if (!themeSetting) {
			return StandardTheme;
		}
		else if (themeSetting === true) {
			return JqueryUiTheme;
		}
		else {
			return this.themeClassHash[themeSetting];
		}
	}

};

;;

var Theme = FC.Theme = Class.extend({

	classes: {},
	iconClasses: {},
	baseIconClass: '',
	iconOverrideOption: null,
	iconOverrideCustomButtonOption: null,
	iconOverridePrefix: '',


	constructor: function(optionsModel) {
		this.optionsModel = optionsModel;
		this.processIconOverride();
	},


	processIconOverride: function() {
		if (this.iconOverrideOption) {
			this.setIconOverride(
				this.optionsModel.get(this.iconOverrideOption)
			);
		}
	},


	setIconOverride: function(iconOverrideHash) {
		var iconClassesCopy;
		var buttonName;

		if ($.isPlainObject(iconOverrideHash)) {
			iconClassesCopy = $.extend({}, this.iconClasses);

			for (buttonName in iconOverrideHash) {
				iconClassesCopy[buttonName] = this.applyIconOverridePrefix(
					iconOverrideHash[buttonName]
				);
			}

			this.iconClasses = iconClassesCopy;
		}
		else if (iconOverrideHash === false) {
			this.iconClasses = {};
		}
	},


	applyIconOverridePrefix: function(className) {
		var prefix = this.iconOverridePrefix;

		if (prefix && className.indexOf(prefix) !== 0) { // if not already present
			className = prefix + className;
		}

		return className;
	},


	getClass: function(key) {
		return this.classes[key] || '';
	},


	getIconClass: function(buttonName) {
		var className = this.iconClasses[buttonName];

		if (className) {
			return this.baseIconClass + ' ' + className;
		}

		return '';
	},


	getCustomButtonIconClass: function(customButtonProps) {
		var className;

		if (this.iconOverrideCustomButtonOption) {
			className = customButtonProps[this.iconOverrideCustomButtonOption];

			if (className) {
				return this.baseIconClass + ' ' + this.applyIconOverridePrefix(className);
			}
		}

		return '';
	}

});

;;

var StandardTheme = Theme.extend({

	classes: {
		widget: 'fc-unthemed',
		widgetHeader: 'fc-widget-header',
		widgetContent: 'fc-widget-content',

		buttonGroup: 'fc-button-group',
		button: 'fc-button',
		cornerLeft: 'fc-corner-left',
		cornerRight: 'fc-corner-right',
		stateDefault: 'fc-state-default',
		stateActive: 'fc-state-active',
		stateDisabled: 'fc-state-disabled',
		stateHover: 'fc-state-hover',
		stateDown: 'fc-state-down',

		popoverHeader: 'fc-widget-header',
		popoverContent: 'fc-widget-content',

		// day grid
		headerRow: 'fc-widget-header',
		dayRow: 'fc-widget-content',

		// list view
		listView: 'fc-widget-content'
	},

	baseIconClass: 'fc-icon',
	iconClasses: {
		close: 'fc-icon-x',
		prev: 'fc-icon-left-single-arrow',
		next: 'fc-icon-right-single-arrow',
		prevYear: 'fc-icon-left-double-arrow',
		nextYear: 'fc-icon-right-double-arrow'
	},

	iconOverrideOption: 'buttonIcons',
	iconOverrideCustomButtonOption: 'icon',
	iconOverridePrefix: 'fc-icon-'

});

ThemeRegistry.register('standard', StandardTheme);

;;

var JqueryUiTheme = Theme.extend({

	classes: {
		widget: 'ui-widget',
		widgetHeader: 'ui-widget-header',
		widgetContent: 'ui-widget-content',

		buttonGroup: 'fc-button-group',
		button: 'ui-button',
		cornerLeft: 'ui-corner-left',
		cornerRight: 'ui-corner-right',
		stateDefault: 'ui-state-default',
		stateActive: 'ui-state-active',
		stateDisabled: 'ui-state-disabled',
		stateHover: 'ui-state-hover',
		stateDown: 'ui-state-down',

		today: 'ui-state-highlight',

		popoverHeader: 'ui-widget-header',
		popoverContent: 'ui-widget-content',

		// day grid
		headerRow: 'ui-widget-header',
		dayRow: 'ui-widget-content',

		// list view
		listView: 'ui-widget-content'
	},

	baseIconClass: 'ui-icon',
	iconClasses: {
		close: 'ui-icon-closethick',
		prev: 'ui-icon-circle-triangle-w',
		next: 'ui-icon-circle-triangle-e',
		prevYear: 'ui-icon-seek-prev',
		nextYear: 'ui-icon-seek-next'
	},

	iconOverrideOption: 'themeButtonIcons',
	iconOverrideCustomButtonOption: 'themeIcon',
	iconOverridePrefix: 'ui-icon-'

});

ThemeRegistry.register('jquery-ui', JqueryUiTheme);

;;

var BootstrapTheme = Theme.extend({

	classes: {
		widget: 'fc-bootstrap3',

		tableGrid: 'table-bordered', // avoid `table` class b/c don't want margins. only border color
		tableList: 'table table-striped', // `table` class creates bottom margin but who cares

		buttonGroup: 'btn-group',
		button: 'btn btn-default',
		stateActive: 'active',
		stateDisabled: 'disabled',

		today: 'alert alert-info', // the plain `info` class requires `.table`, too much to ask

		popover: 'panel panel-default',
		popoverHeader: 'panel-heading',
		popoverContent: 'panel-body',

		// day grid
		headerRow: 'panel-default', // avoid `panel` class b/c don't want margins/radius. only border color
		dayRow: 'panel-default', // "

		// list view
		listView: 'panel panel-default'
	},

	baseIconClass: 'glyphicon',
	iconClasses: {
		close: 'glyphicon-remove',
		prev: 'glyphicon-chevron-left',
		next: 'glyphicon-chevron-right',
		prevYear: 'glyphicon-backward',
		nextYear: 'glyphicon-forward'
	},

	iconOverrideOption: 'bootstrapGlyphicons',
	iconOverrideCustomButtonOption: 'bootstrapGlyphicon',
	iconOverridePrefix: 'glyphicon-'

});

ThemeRegistry.register('bootstrap3', BootstrapTheme);

;;

var DayGridFillRenderer = FillRenderer.extend({

	fillSegTag: 'td', // override the default tag name


	attachSegEls: function(type, segs) {
		var nodes = [];
		var i, seg;
		var skeletonEl;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			skeletonEl = this.renderFillRow(type, seg);
			this.component.rowEls.eq(seg.row).append(skeletonEl);
			nodes.push(skeletonEl[0]);
		}

		return nodes;
	},


	// Generates the HTML needed for one row of a fill. Requires the seg's el to be rendered.
	renderFillRow: function(type, seg) {
		var colCnt = this.component.colCnt;
		var startCol = seg.leftCol;
		var endCol = seg.rightCol + 1;
		var className;
		var skeletonEl;
		var trEl;

		if (type === 'businessHours') {
			className = 'bgevent';
		}
		else {
			className = type.toLowerCase();
		}

		skeletonEl = $(
			'<div class="fc-' + className + '-skeleton">' +
				'<table><tr/></table>' +
			'</div>'
		);
		trEl = skeletonEl.find('tr');

		if (startCol > 0) {
			trEl.append('<td colspan="' + startCol + '"/>');
		}

		trEl.append(
			seg.el.attr('colspan', endCol - startCol)
		);

		if (endCol < colCnt) {
			trEl.append('<td colspan="' + (colCnt - endCol) + '"/>');
		}

		this.component.bookendCells(trEl);

		return skeletonEl;
	}
});

;;

/* Event-rendering methods for the DayGrid class
----------------------------------------------------------------------------------------------------------------------*/

var DayGridEventRenderer = EventRenderer.extend({

	dayGrid: null,
	rowStructs: null, // an array of objects, each holding information about a row's foreground event-rendering


	constructor: function(dayGrid) {
		EventRenderer.apply(this, arguments);

		this.dayGrid = dayGrid;
	},


	renderBgRanges: function(eventRanges) {
		// don't render timed background events
		eventRanges = $.grep(eventRanges, function(eventRange) {
			return eventRange.eventDef.isAllDay();
		});

		EventRenderer.prototype.renderBgRanges.call(this, eventRanges);
	},


	// Renders the given foreground event segments onto the grid
	renderFgSegs: function(segs) {
		var rowStructs = this.rowStructs = this.renderSegRows(segs);

		// append to each row's content skeleton
		this.dayGrid.rowEls.each(function(i, rowNode) {
			$(rowNode).find('.fc-content-skeleton > table').append(
				rowStructs[i].tbodyEl
			);
		});
	},


	// Unrenders all currently rendered foreground event segments
	unrenderFgSegs: function() {
		var rowStructs = this.rowStructs || [];
		var rowStruct;

		while ((rowStruct = rowStructs.pop())) {
			rowStruct.tbodyEl.remove();
		}

		this.rowStructs = null;
	},


	// Uses the given events array to generate <tbody> elements that should be appended to each row's content skeleton.
	// Returns an array of rowStruct objects (see the bottom of `renderSegRow`).
	// PRECONDITION: each segment shoud already have a rendered and assigned `.el`
	renderSegRows: function(segs) {
		var rowStructs = [];
		var segRows;
		var row;

		segRows = this.groupSegRows(segs); // group into nested arrays

		// iterate each row of segment groupings
		for (row = 0; row < segRows.length; row++) {
			rowStructs.push(
				this.renderSegRow(row, segRows[row])
			);
		}

		return rowStructs;
	},


	// Given a row # and an array of segments all in the same row, render a <tbody> element, a skeleton that contains
	// the segments. Returns object with a bunch of internal data about how the render was calculated.
	// NOTE: modifies rowSegs
	renderSegRow: function(row, rowSegs) {
		var colCnt = this.dayGrid.colCnt;
		var segLevels = this.buildSegLevels(rowSegs); // group into sub-arrays of levels
		var levelCnt = Math.max(1, segLevels.length); // ensure at least one level
		var tbody = $('<tbody/>');
		var segMatrix = []; // lookup for which segments are rendered into which level+col cells
		var cellMatrix = []; // lookup for all <td> elements of the level+col matrix
		var loneCellMatrix = []; // lookup for <td> elements that only take up a single column
		var i, levelSegs;
		var col;
		var tr;
		var j, seg;
		var td;

		// populates empty cells from the current column (`col`) to `endCol`
		function emptyCellsUntil(endCol) {
			while (col < endCol) {
				// try to grab a cell from the level above and extend its rowspan. otherwise, create a fresh cell
				td = (loneCellMatrix[i - 1] || [])[col];
				if (td) {
					td.attr(
						'rowspan',
						parseInt(td.attr('rowspan') || 1, 10) + 1
					);
				}
				else {
					td = $('<td/>');
					tr.append(td);
				}
				cellMatrix[i][col] = td;
				loneCellMatrix[i][col] = td;
				col++;
			}
		}

		for (i = 0; i < levelCnt; i++) { // iterate through all levels
			levelSegs = segLevels[i];
			col = 0;
			tr = $('<tr/>');

			segMatrix.push([]);
			cellMatrix.push([]);
			loneCellMatrix.push([]);

			// levelCnt might be 1 even though there are no actual levels. protect against this.
			// this single empty row is useful for styling.
			if (levelSegs) {
				for (j = 0; j < levelSegs.length; j++) { // iterate through segments in level
					seg = levelSegs[j];

					emptyCellsUntil(seg.leftCol);

					// create a container that occupies or more columns. append the event element.
					td = $('<td class="fc-event-container"/>').append(seg.el);
					if (seg.leftCol != seg.rightCol) {
						td.attr('colspan', seg.rightCol - seg.leftCol + 1);
					}
					else { // a single-column segment
						loneCellMatrix[i][col] = td;
					}

					while (col <= seg.rightCol) {
						cellMatrix[i][col] = td;
						segMatrix[i][col] = seg;
						col++;
					}

					tr.append(td);
				}
			}

			emptyCellsUntil(colCnt); // finish off the row
			this.dayGrid.bookendCells(tr);
			tbody.append(tr);
		}

		return { // a "rowStruct"
			row: row, // the row number
			tbodyEl: tbody,
			cellMatrix: cellMatrix,
			segMatrix: segMatrix,
			segLevels: segLevels,
			segs: rowSegs
		};
	},


	// Stacks a flat array of segments, which are all assumed to be in the same row, into subarrays of vertical levels.
	// NOTE: modifies segs
	buildSegLevels: function(segs) {
		var levels = [];
		var i, seg;
		var j;

		// Give preference to elements with certain criteria, so they have
		// a chance to be closer to the top.
		this.sortEventSegs(segs);

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			// loop through levels, starting with the topmost, until the segment doesn't collide with other segments
			for (j = 0; j < levels.length; j++) {
				if (!isDaySegCollision(seg, levels[j])) {
					break;
				}
			}
			// `j` now holds the desired subrow index
			seg.level = j;

			// create new level array if needed and append segment
			(levels[j] || (levels[j] = [])).push(seg);
		}

		// order segments left-to-right. very important if calendar is RTL
		for (j = 0; j < levels.length; j++) {
			levels[j].sort(compareDaySegCols);
		}

		return levels;
	},


	// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's row
	groupSegRows: function(segs) {
		var segRows = [];
		var i;

		for (i = 0; i < this.dayGrid.rowCnt; i++) {
			segRows.push([]);
		}

		for (i = 0; i < segs.length; i++) {
			segRows[segs[i].row].push(segs[i]);
		}

		return segRows;
	},


	// Computes a default event time formatting string if `timeFormat` is not explicitly defined
	computeEventTimeFormat: function() {
		return this.opt('extraSmallTimeFormat'); // like "6p" or "6:30p"
	},


	// Computes a default `displayEventEnd` value if one is not expliclty defined
	computeDisplayEventEnd: function() {
		return this.dayGrid.colCnt === 1; // we'll likely have space if there's only one day
	},


	// Builds the HTML to be used for the default element for an individual segment
	fgSegHtml: function(seg, disableResizing) {
		var view = this.view;
		var eventDef = seg.footprint.eventDef;
		var isAllDay = seg.footprint.componentFootprint.isAllDay;
		var isDraggable = view.isEventDefDraggable(eventDef);
		var isResizableFromStart = !disableResizing && isAllDay &&
			seg.isStart && view.isEventDefResizableFromStart(eventDef);
		var isResizableFromEnd = !disableResizing && isAllDay &&
			seg.isEnd && view.isEventDefResizableFromEnd(eventDef);
		var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
		var skinCss = cssToStr(this.getSkinCss(eventDef));
		var timeHtml = '';
		var timeText;
		var titleHtml;

		classes.unshift('fc-day-grid-event', 'fc-h-event');

		// Only display a timed events time if it is the starting segment
		if (seg.isStart) {
			timeText = this.getTimeText(seg.footprint);
			if (timeText) {
				timeHtml = '<span class="fc-time">' + htmlEscape(timeText) + '</span>';
			}
		}

		titleHtml =
			'<span class="fc-title">' +
				(htmlEscape(eventDef.title || '') || '&nbsp;') + // we always want one line of height
			'</span>';

		return '<a class="' + classes.join(' ') + '"' +
				(eventDef.url ?
					' href="' + htmlEscape(eventDef.url) + '"' :
					''
					) +
				(skinCss ?
					' style="' + skinCss + '"' :
					''
					) +
			'>' +
				'<div class="fc-content">' +
					(this.isRTL ?
						titleHtml + ' ' + timeHtml : // put a natural space in between
						timeHtml + ' ' + titleHtml   //
						) +
				'</div>' +
				(isResizableFromStart ?
					'<div class="fc-resizer fc-start-resizer" />' :
					''
					) +
				(isResizableFromEnd ?
					'<div class="fc-resizer fc-end-resizer" />' :
					''
					) +
			'</a>';
	}

});


// Computes whether two segments' columns collide. They are assumed to be in the same row.
function isDaySegCollision(seg, otherSegs) {
	var i, otherSeg;

	for (i = 0; i < otherSegs.length; i++) {
		otherSeg = otherSegs[i];

		if (
			otherSeg.leftCol <= seg.rightCol &&
			otherSeg.rightCol >= seg.leftCol
		) {
			return true;
		}
	}

	return false;
}


// A cmp function for determining the leftmost event
function compareDaySegCols(a, b) {
	return a.leftCol - b.leftCol;
}

;;

var DayGridHelperRenderer = HelperRenderer.extend({


	// Renders a mock "helper" event. `sourceSeg` is the associated internal segment object. It can be null.
	renderSegs: function(segs, sourceSeg) {
		var helperNodes = [];
		var rowStructs;

		// TODO: not good to call eventRenderer this way
		rowStructs = this.eventRenderer.renderSegRows(segs);

		// inject each new event skeleton into each associated row
		this.component.rowEls.each(function(row, rowNode) {
			var rowEl = $(rowNode); // the .fc-row
			var skeletonEl = $('<div class="fc-helper-skeleton"><table/></div>'); // will be absolutely positioned
			var skeletonTopEl;
			var skeletonTop;

			// If there is an original segment, match the top position. Otherwise, put it at the row's top level
			if (sourceSeg && sourceSeg.row === row) {
				skeletonTop = sourceSeg.el.position().top;
			}
			else {
				skeletonTopEl = rowEl.find('.fc-content-skeleton tbody');
				if (!skeletonTopEl.length) { // when no events
					skeletonTopEl = rowEl.find('.fc-content-skeleton table');
				}

				skeletonTop = skeletonTopEl.position().top;
			}

			skeletonEl.css('top', skeletonTop)
				.find('table')
					.append(rowStructs[row].tbodyEl);

			rowEl.append(skeletonEl);
			helperNodes.push(skeletonEl[0]);
		});

		return $(helperNodes); // must return the elements rendered
	}

});

;;

/* A component that renders a grid of whole-days that runs horizontally. There can be multiple rows, one per week.
----------------------------------------------------------------------------------------------------------------------*/

var DayGrid = FC.DayGrid = InteractiveDateComponent.extend(StandardInteractionsMixin, DayTableMixin, {

	eventRendererClass: DayGridEventRenderer,
	businessHourRendererClass: BusinessHourRenderer,
	helperRendererClass: DayGridHelperRenderer,
	fillRendererClass: DayGridFillRenderer,

	view: null, // TODO: make more general and/or remove
	helperRenderer: null,

	cellWeekNumbersVisible: false, // display week numbers in day cell?

	bottomCoordPadding: 0, // hack for extending the hit area for the last row of the coordinate grid

	headContainerEl: null, // div that hold's the date header
	rowEls: null, // set of fake row elements
	cellEls: null, // set of whole-day elements comprising the row's background

	rowCoordCache: null,
	colCoordCache: null,

	// isRigid determines whether the individual rows should ignore the contents and be a constant height.
	// Relies on the view's colCnt and rowCnt. In the future, this component should probably be self-sufficient.
	isRigid: false,

	hasAllDayBusinessHours: true,


	constructor: function(view) {
		this.view = view; // do first, for opt calls during initialization

		InteractiveDateComponent.call(this);
	},


	// Slices up the given span (unzoned start/end with other misc data) into an array of segments
	componentFootprintToSegs: function(componentFootprint) {
		var segs = this.sliceRangeByRow(componentFootprint.unzonedRange);
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			if (this.isRTL) {
				seg.leftCol = this.daysPerRow - 1 - seg.lastRowDayIndex;
				seg.rightCol = this.daysPerRow - 1 - seg.firstRowDayIndex;
			}
			else {
				seg.leftCol = seg.firstRowDayIndex;
				seg.rightCol = seg.lastRowDayIndex;
			}
		}

		return segs;
	},


	/* Date Rendering
	------------------------------------------------------------------------------------------------------------------*/


	renderDates: function(dateProfile) {
		this.dateProfile = dateProfile;
		this.updateDayTable();
		this.renderGrid();
	},


	unrenderDates: function() {
		this.removeSegPopover();
	},


	// Renders the rows and columns into the component's `this.el`, which should already be assigned.
	renderGrid: function() {
		var view = this.view;
		var rowCnt = this.rowCnt;
		var colCnt = this.colCnt;
		var html = '';
		var row;
		var col;

		if (this.headContainerEl) {
			this.headContainerEl.html(this.renderHeadHtml());
		}

		for (row = 0; row < rowCnt; row++) {
			html += this.renderDayRowHtml(row, this.isRigid);
		}
		this.el.html(html);

		this.rowEls = this.el.find('.fc-row');
		this.cellEls = this.el.find('.fc-day, .fc-disabled-day');

		this.rowCoordCache = new CoordCache({
			els: this.rowEls,
			isVertical: true
		});
		this.colCoordCache = new CoordCache({
			els: this.cellEls.slice(0, this.colCnt), // only the first row
			isHorizontal: true
		});

		// trigger dayRender with each cell's element
		for (row = 0; row < rowCnt; row++) {
			for (col = 0; col < colCnt; col++) {
				this.publiclyTrigger('dayRender', {
					context: view,
					args: [
						this.getCellDate(row, col),
						this.getCellEl(row, col),
						view
					]
				});
			}
		}
	},


	// Generates the HTML for a single row, which is a div that wraps a table.
	// `row` is the row number.
	renderDayRowHtml: function(row, isRigid) {
		var theme = this.view.calendar.theme;
		var classes = [ 'fc-row', 'fc-week', theme.getClass('dayRow') ];

		if (isRigid) {
			classes.push('fc-rigid');
		}

		return '' +
			'<div class="' + classes.join(' ') + '">' +
				'<div class="fc-bg">' +
					'<table class="' + theme.getClass('tableGrid') + '">' +
						this.renderBgTrHtml(row) +
					'</table>' +
				'</div>' +
				'<div class="fc-content-skeleton">' +
					'<table>' +
						(this.getIsNumbersVisible() ?
							'<thead>' +
								this.renderNumberTrHtml(row) +
							'</thead>' :
							''
							) +
					'</table>' +
				'</div>' +
			'</div>';
	},


	getIsNumbersVisible: function() {
		return this.getIsDayNumbersVisible() || this.cellWeekNumbersVisible;
	},


	getIsDayNumbersVisible: function() {
		return this.rowCnt > 1;
	},


	/* Grid Number Rendering
	------------------------------------------------------------------------------------------------------------------*/


	renderNumberTrHtml: function(row) {
		return '' +
			'<tr>' +
				(this.isRTL ? '' : this.renderNumberIntroHtml(row)) +
				this.renderNumberCellsHtml(row) +
				(this.isRTL ? this.renderNumberIntroHtml(row) : '') +
			'</tr>';
	},


	renderNumberIntroHtml: function(row) {
		return this.renderIntroHtml();
	},


	renderNumberCellsHtml: function(row) {
		var htmls = [];
		var col, date;

		for (col = 0; col < this.colCnt; col++) {
			date = this.getCellDate(row, col);
			htmls.push(this.renderNumberCellHtml(date));
		}

		return htmls.join('');
	},


	// Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
	// The number row will only exist if either day numbers or week numbers are turned on.
	renderNumberCellHtml: function(date) {
		var view = this.view;
		var html = '';
		var isDateValid = this.dateProfile.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
		var isDayNumberVisible = this.getIsDayNumbersVisible() && isDateValid;
		var classes;
		var weekCalcFirstDoW;

		if (!isDayNumberVisible && !this.cellWeekNumbersVisible) {
			// no numbers in day cell (week number must be along the side)
			return '<td/>'; //  will create an empty space above events :(
		}

		classes = this.getDayClasses(date);
		classes.unshift('fc-day-top');

		if (this.cellWeekNumbersVisible) {
			// To determine the day of week number change under ISO, we cannot
			// rely on moment.js methods such as firstDayOfWeek() or weekday(),
			// because they rely on the locale's dow (possibly overridden by
			// our firstDay option), which may not be Monday. We cannot change
			// dow, because that would affect the calendar start day as well.
			if (date._locale._fullCalendar_weekCalc === 'ISO') {
				weekCalcFirstDoW = 1;  // Monday by ISO 8601 definition
			}
			else {
				weekCalcFirstDoW = date._locale.firstDayOfWeek();
			}
		}

		html += '<td class="' + classes.join(' ') + '"' +
			(isDateValid ?
				' data-date="' + date.format() + '"' :
				''
				) +
			'>';

		if (this.cellWeekNumbersVisible && (date.day() == weekCalcFirstDoW)) {
			html += view.buildGotoAnchorHtml(
				{ date: date, type: 'week' },
				{ 'class': 'fc-week-number' },
				date.format('w') // inner HTML
			);
		}

		if (isDayNumberVisible) {
			html += view.buildGotoAnchorHtml(
				date,
				{ 'class': 'fc-day-number' },
				date.date() // inner HTML
			);
		}

		html += '</td>';

		return html;
	},


	/* Hit System
	------------------------------------------------------------------------------------------------------------------*/


	prepareHits: function() {
		this.colCoordCache.build();
		this.rowCoordCache.build();
		this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding; // hack
	},


	releaseHits: function() {
		this.colCoordCache.clear();
		this.rowCoordCache.clear();
	},


	queryHit: function(leftOffset, topOffset) {
		if (this.colCoordCache.isLeftInBounds(leftOffset) && this.rowCoordCache.isTopInBounds(topOffset)) {
			var col = this.colCoordCache.getHorizontalIndex(leftOffset);
			var row = this.rowCoordCache.getVerticalIndex(topOffset);

			if (row != null && col != null) {
				return this.getCellHit(row, col);
			}
		}
	},


	getHitFootprint: function(hit) {
		var range = this.getCellRange(hit.row, hit.col);

		return new ComponentFootprint(
			new UnzonedRange(range.start, range.end),
			true // all-day?
		);
	},


	getHitEl: function(hit) {
		return this.getCellEl(hit.row, hit.col);
	},


	/* Cell System
	------------------------------------------------------------------------------------------------------------------*/
	// FYI: the first column is the leftmost column, regardless of date


	getCellHit: function(row, col) {
		return {
			row: row,
			col: col,
			component: this, // needed unfortunately :(
			left: this.colCoordCache.getLeftOffset(col),
			right: this.colCoordCache.getRightOffset(col),
			top: this.rowCoordCache.getTopOffset(row),
			bottom: this.rowCoordCache.getBottomOffset(row)
		};
	},


	getCellEl: function(row, col) {
		return this.cellEls.eq(row * this.colCnt + col);
	},


	/* Event Rendering
	------------------------------------------------------------------------------------------------------------------*/


	// Unrenders all events currently rendered on the grid
	unrenderEvents: function() {
		this.removeSegPopover(); // removes the "more.." events popover

		InteractiveDateComponent.prototype.unrenderEvents.apply(this, arguments);
	},


	// Retrieves all rendered segment objects currently rendered on the grid
	getOwnEventSegs: function() {
		return InteractiveDateComponent.prototype.getOwnEventSegs.apply(this, arguments) // get the segments from the super-method
			.concat(this.popoverSegs || []); // append the segments from the "more..." popover
	},


	/* Event Drag Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event or external element being dragged.
	// `eventLocation` has zoned start and end (optional)
	renderDrag: function(eventFootprints, seg, isTouch) {
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			this.renderHighlight(eventFootprints[i].componentFootprint);
		}

		// render drags from OTHER components as helpers
		if (eventFootprints.length && seg && seg.component !== this) {
			this.helperRenderer.renderEventDraggingFootprints(eventFootprints, seg, isTouch);

			return true; // signal helpers rendered
		}
	},


	// Unrenders any visual indication of a hovering event
	unrenderDrag: function(seg) {
		this.unrenderHighlight();
		this.helperRenderer.unrender();
	},


	/* Event Resize Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being resized
	renderEventResize: function(eventFootprints, seg, isTouch) {
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			this.renderHighlight(eventFootprints[i].componentFootprint);
		}

		this.helperRenderer.renderEventResizingFootprints(eventFootprints, seg, isTouch);
	},


	// Unrenders a visual indication of an event being resized
	unrenderEventResize: function(seg) {
		this.unrenderHighlight();
		this.helperRenderer.unrender();
	}

});

;;

/* Methods relate to limiting the number events for a given day on a DayGrid
----------------------------------------------------------------------------------------------------------------------*/
// NOTE: all the segs being passed around in here are foreground segs

DayGrid.mixin({

	segPopover: null, // the Popover that holds events that can't fit in a cell. null when not visible
	popoverSegs: null, // an array of segment objects that the segPopover holds. null when not visible


	removeSegPopover: function() {
		if (this.segPopover) {
			this.segPopover.hide(); // in handler, will call segPopover's removeElement
		}
	},


	// Limits the number of "levels" (vertically stacking layers of events) for each row of the grid.
	// `levelLimit` can be false (don't limit), a number, or true (should be computed).
	limitRows: function(levelLimit) {
		var rowStructs = this.eventRenderer.rowStructs || [];
		var row; // row #
		var rowLevelLimit;

		for (row = 0; row < rowStructs.length; row++) {
			this.unlimitRow(row);

			if (!levelLimit) {
				rowLevelLimit = false;
			}
			else if (typeof levelLimit === 'number') {
				rowLevelLimit = levelLimit;
			}
			else {
				rowLevelLimit = this.computeRowLevelLimit(row);
			}

			if (rowLevelLimit !== false) {
				this.limitRow(row, rowLevelLimit);
			}
		}
	},


	// Computes the number of levels a row will accomodate without going outside its bounds.
	// Assumes the row is "rigid" (maintains a constant height regardless of what is inside).
	// `row` is the row number.
	computeRowLevelLimit: function(row) {
		var rowEl = this.rowEls.eq(row); // the containing "fake" row div
		var rowHeight = rowEl.height(); // TODO: cache somehow?
		var trEls = this.eventRenderer.rowStructs[row].tbodyEl.children();
		var i, trEl;
		var trHeight;

		function iterInnerHeights(i, childNode) {
			trHeight = Math.max(trHeight, $(childNode).outerHeight());
		}

		// Reveal one level <tr> at a time and stop when we find one out of bounds
		for (i = 0; i < trEls.length; i++) {
			trEl = trEls.eq(i).removeClass('fc-limited'); // reset to original state (reveal)

			// with rowspans>1 and IE8, trEl.outerHeight() would return the height of the largest cell,
			// so instead, find the tallest inner content element.
			trHeight = 0;
			trEl.find('> td > :first-child').each(iterInnerHeights);

			if (trEl.position().top + trHeight > rowHeight) {
				return i;
			}
		}

		return false; // should not limit at all
	},


	// Limits the given grid row to the maximum number of levels and injects "more" links if necessary.
	// `row` is the row number.
	// `levelLimit` is a number for the maximum (inclusive) number of levels allowed.
	limitRow: function(row, levelLimit) {
		var _this = this;
		var rowStruct = this.eventRenderer.rowStructs[row];
		var moreNodes = []; // array of "more" <a> links and <td> DOM nodes
		var col = 0; // col #, left-to-right (not chronologically)
		var levelSegs; // array of segment objects in the last allowable level, ordered left-to-right
		var cellMatrix; // a matrix (by level, then column) of all <td> jQuery elements in the row
		var limitedNodes; // array of temporarily hidden level <tr> and segment <td> DOM nodes
		var i, seg;
		var segsBelow; // array of segment objects below `seg` in the current `col`
		var totalSegsBelow; // total number of segments below `seg` in any of the columns `seg` occupies
		var colSegsBelow; // array of segment arrays, below seg, one for each column (offset from segs's first column)
		var td, rowspan;
		var segMoreNodes; // array of "more" <td> cells that will stand-in for the current seg's cell
		var j;
		var moreTd, moreWrap, moreLink;

		// Iterates through empty level cells and places "more" links inside if need be
		function emptyCellsUntil(endCol) { // goes from current `col` to `endCol`
			while (col < endCol) {
				segsBelow = _this.getCellSegs(row, col, levelLimit);
				if (segsBelow.length) {
					td = cellMatrix[levelLimit - 1][col];
					moreLink = _this.renderMoreLink(row, col, segsBelow);
					moreWrap = $('<div/>').append(moreLink);
					td.append(moreWrap);
					moreNodes.push(moreWrap[0]);
				}
				col++;
			}
		}

		if (levelLimit && levelLimit < rowStruct.segLevels.length) { // is it actually over the limit?
			levelSegs = rowStruct.segLevels[levelLimit - 1];
			cellMatrix = rowStruct.cellMatrix;

			limitedNodes = rowStruct.tbodyEl.children().slice(levelLimit) // get level <tr> elements past the limit
				.addClass('fc-limited').get(); // hide elements and get a simple DOM-nodes array

			// iterate though segments in the last allowable level
			for (i = 0; i < levelSegs.length; i++) {
				seg = levelSegs[i];
				emptyCellsUntil(seg.leftCol); // process empty cells before the segment

				// determine *all* segments below `seg` that occupy the same columns
				colSegsBelow = [];
				totalSegsBelow = 0;
				while (col <= seg.rightCol) {
					segsBelow = this.getCellSegs(row, col, levelLimit);
					colSegsBelow.push(segsBelow);
					totalSegsBelow += segsBelow.length;
					col++;
				}

				if (totalSegsBelow) { // do we need to replace this segment with one or many "more" links?
					td = cellMatrix[levelLimit - 1][seg.leftCol]; // the segment's parent cell
					rowspan = td.attr('rowspan') || 1;
					segMoreNodes = [];

					// make a replacement <td> for each column the segment occupies. will be one for each colspan
					for (j = 0; j < colSegsBelow.length; j++) {
						moreTd = $('<td class="fc-more-cell"/>').attr('rowspan', rowspan);
						segsBelow = colSegsBelow[j];
						moreLink = this.renderMoreLink(
							row,
							seg.leftCol + j,
							[ seg ].concat(segsBelow) // count seg as hidden too
						);
						moreWrap = $('<div/>').append(moreLink);
						moreTd.append(moreWrap);
						segMoreNodes.push(moreTd[0]);
						moreNodes.push(moreTd[0]);
					}

					td.addClass('fc-limited').after($(segMoreNodes)); // hide original <td> and inject replacements
					limitedNodes.push(td[0]);
				}
			}

			emptyCellsUntil(this.colCnt); // finish off the level
			rowStruct.moreEls = $(moreNodes); // for easy undoing later
			rowStruct.limitedEls = $(limitedNodes); // for easy undoing later
		}
	},


	// Reveals all levels and removes all "more"-related elements for a grid's row.
	// `row` is a row number.
	unlimitRow: function(row) {
		var rowStruct = this.eventRenderer.rowStructs[row];

		if (rowStruct.moreEls) {
			rowStruct.moreEls.remove();
			rowStruct.moreEls = null;
		}

		if (rowStruct.limitedEls) {
			rowStruct.limitedEls.removeClass('fc-limited');
			rowStruct.limitedEls = null;
		}
	},


	// Renders an <a> element that represents hidden event element for a cell.
	// Responsible for attaching click handler as well.
	renderMoreLink: function(row, col, hiddenSegs) {
		var _this = this;
		var view = this.view;

		return $('<a class="fc-more"/>')
			.text(
				this.getMoreLinkText(hiddenSegs.length)
			)
			.on('click', function(ev) {
				var clickOption = _this.opt('eventLimitClick');
				var date = _this.getCellDate(row, col);
				var moreEl = $(this);
				var dayEl = _this.getCellEl(row, col);
				var allSegs = _this.getCellSegs(row, col);

				// rescope the segments to be within the cell's date
				var reslicedAllSegs = _this.resliceDaySegs(allSegs, date);
				var reslicedHiddenSegs = _this.resliceDaySegs(hiddenSegs, date);

				if (typeof clickOption === 'function') {
					// the returned value can be an atomic option
					clickOption = _this.publiclyTrigger('eventLimitClick', {
						context: view,
						args: [
							{
								date: date.clone(),
								dayEl: dayEl,
								moreEl: moreEl,
								segs: reslicedAllSegs,
								hiddenSegs: reslicedHiddenSegs
							},
							ev,
							view
						]
					});
				}

				if (clickOption === 'popover') {
					_this.showSegPopover(row, col, moreEl, reslicedAllSegs);
				}
				else if (typeof clickOption === 'string') { // a view name
					view.calendar.zoomTo(date, clickOption);
				}
			});
	},


	// Reveals the popover that displays all events within a cell
	showSegPopover: function(row, col, moreLink, segs) {
		var _this = this;
		var view = this.view;
		var moreWrap = moreLink.parent(); // the <div> wrapper around the <a>
		var topEl; // the element we want to match the top coordinate of
		var options;

		if (this.rowCnt == 1) {
			topEl = view.el; // will cause the popover to cover any sort of header
		}
		else {
			topEl = this.rowEls.eq(row); // will align with top of row
		}

		options = {
			className: 'fc-more-popover ' + view.calendar.theme.getClass('popover'),
			content: this.renderSegPopoverContent(row, col, segs),
			parentEl: view.el, // attach to root of view. guarantees outside of scrollbars.
			top: topEl.offset().top,
			autoHide: true, // when the user clicks elsewhere, hide the popover
			viewportConstrain: this.opt('popoverViewportConstrain'),
			hide: function() {
				// kill everything when the popover is hidden
				// notify events to be removed
				if (_this.popoverSegs) {
					_this.triggerBeforeEventSegsDestroyed(_this.popoverSegs);
				}
				_this.segPopover.removeElement();
				_this.segPopover = null;
				_this.popoverSegs = null;
			}
		};

		// Determine horizontal coordinate.
		// We use the moreWrap instead of the <td> to avoid border confusion.
		if (this.isRTL) {
			options.right = moreWrap.offset().left + moreWrap.outerWidth() + 1; // +1 to be over cell border
		}
		else {
			options.left = moreWrap.offset().left - 1; // -1 to be over cell border
		}

		this.segPopover = new Popover(options);
		this.segPopover.show();

		// the popover doesn't live within the grid's container element, and thus won't get the event
		// delegated-handlers for free. attach event-related handlers to the popover.
		this.bindAllSegHandlersToEl(this.segPopover.el);

		this.triggerAfterEventSegsRendered(segs);
	},


	// Builds the inner DOM contents of the segment popover
	renderSegPopoverContent: function(row, col, segs) {
		var view = this.view;
		var theme = view.calendar.theme;
		var title = this.getCellDate(row, col).format(this.opt('dayPopoverFormat'));
		var content = $(
			'<div class="fc-header ' + theme.getClass('popoverHeader') + '">' +
				'<span class="fc-close ' + theme.getIconClass('close') + '"></span>' +
				'<span class="fc-title">' +
					htmlEscape(title) +
				'</span>' +
				'<div class="fc-clear"/>' +
			'</div>' +
			'<div class="fc-body ' + theme.getClass('popoverContent') + '">' +
				'<div class="fc-event-container"></div>' +
			'</div>'
		);
		var segContainer = content.find('.fc-event-container');
		var i;

		// render each seg's `el` and only return the visible segs
		segs = this.eventRenderer.renderFgSegEls(segs, true); // disableResizing=true
		this.popoverSegs = segs;

		for (i = 0; i < segs.length; i++) {

			// because segments in the popover are not part of a grid coordinate system, provide a hint to any
			// grids that want to do drag-n-drop about which cell it came from
			this.hitsNeeded();
			segs[i].hit = this.getCellHit(row, col);
			this.hitsNotNeeded();

			segContainer.append(segs[i].el);
		}

		return content;
	},


	// Given the events within an array of segment objects, reslice them to be in a single day
	resliceDaySegs: function(segs, dayDate) {
		var dayStart = dayDate.clone();
		var dayEnd = dayStart.clone().add(1, 'days');
		var dayRange = new UnzonedRange(dayStart, dayEnd);
		var newSegs = [];
		var i, seg;
		var slicedRange;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			slicedRange = seg.footprint.componentFootprint.unzonedRange.intersect(dayRange);

			if (slicedRange) {
				newSegs.push(
					$.extend({}, seg, {
						footprint: new EventFootprint(
							new ComponentFootprint(
								slicedRange,
								seg.footprint.componentFootprint.isAllDay
							),
							seg.footprint.eventDef,
							seg.footprint.eventInstance
						),
						isStart: seg.isStart && slicedRange.isStart,
						isEnd: seg.isEnd && slicedRange.isEnd
					})
				);
			}
		}

		// force an order because eventsToSegs doesn't guarantee one
		// TODO: research if still needed
		this.eventRenderer.sortEventSegs(newSegs);

		return newSegs;
	},


	// Generates the text that should be inside a "more" link, given the number of events it represents
	getMoreLinkText: function(num) {
		var opt = this.opt('eventLimitText');

		if (typeof opt === 'function') {
			return opt(num);
		}
		else {
			return '+' + num + ' ' + opt;
		}
	},


	// Returns segments within a given cell.
	// If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
	getCellSegs: function(row, col, startLevel) {
		var segMatrix = this.eventRenderer.rowStructs[row].segMatrix;
		var level = startLevel || 0;
		var segs = [];
		var seg;

		while (level < segMatrix.length) {
			seg = segMatrix[level][col];
			if (seg) {
				segs.push(seg);
			}
			level++;
		}

		return segs;
	}

});

;;

/* An abstract class for the "basic" views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.

var BasicView = FC.BasicView = View.extend({

	scroller: null,

	dayGridClass: DayGrid, // class the dayGrid will be instantiated from (overridable by subclasses)
	dayGrid: null, // the main subcomponent that does most of the heavy lifting

	weekNumberWidth: null, // width of all the week-number cells running down the side


	constructor: function() {
		View.apply(this, arguments);

		this.dayGrid = this.instantiateDayGrid();
		this.dayGrid.isRigid = this.hasRigidRows();

		if (this.opt('weekNumbers')) {
			if (this.opt('weekNumbersWithinDays')) {
				this.dayGrid.cellWeekNumbersVisible = true;
				this.dayGrid.colWeekNumbersVisible = false;
			}
			else {
				this.dayGrid.cellWeekNumbersVisible = false;
				this.dayGrid.colWeekNumbersVisible = true;
			};
		}

		this.addChild(this.dayGrid);

		this.scroller = new Scroller({
			overflowX: 'hidden',
			overflowY: 'auto'
		});
	},


	// Generates the DayGrid object this view needs. Draws from this.dayGridClass
	instantiateDayGrid: function() {
		// generate a subclass on the fly with BasicView-specific behavior
		// TODO: cache this subclass
		var subclass = this.dayGridClass.extend(basicDayGridMethods);

		return new subclass(this);
	},


	// Computes the date range that will be rendered.
	buildRenderRange: function(currentUnzonedRange, currentRangeUnit, isRangeAllDay) {
		var renderUnzonedRange = View.prototype.buildRenderRange.apply(this, arguments); // an UnzonedRange
		var start = this.calendar.msToUtcMoment(renderUnzonedRange.startMs, isRangeAllDay);
		var end = this.calendar.msToUtcMoment(renderUnzonedRange.endMs, isRangeAllDay);

		// year and month views should be aligned with weeks. this is already done for week
		if (/^(year|month)$/.test(currentRangeUnit)) {
			start.startOf('week');

			// make end-of-week if not already
			if (end.weekday()) {
				end.add(1, 'week').startOf('week'); // exclusively move backwards
			}
		}

		return new UnzonedRange(start, end);
	},


	executeDateRender: function(dateProfile) {
		this.dayGrid.breakOnWeeks = /year|month|week/.test(dateProfile.currentRangeUnit);

		View.prototype.executeDateRender.apply(this, arguments);
	},


	renderSkeleton: function() {
		var dayGridContainerEl;
		var dayGridEl;

		this.el.addClass('fc-basic-view').html(this.renderSkeletonHtml());

		this.scroller.render();

		dayGridContainerEl = this.scroller.el.addClass('fc-day-grid-container');
		dayGridEl = $('<div class="fc-day-grid" />').appendTo(dayGridContainerEl);

		this.el.find('.fc-body > tr > td').append(dayGridContainerEl);

		this.dayGrid.headContainerEl = this.el.find('.fc-head-container');
		this.dayGrid.setElement(dayGridEl);
	},


	unrenderSkeleton: function() {
		this.dayGrid.removeElement();
		this.scroller.destroy();
	},


	// Builds the HTML skeleton for the view.
	// The day-grid component will render inside of a container defined by this HTML.
	renderSkeletonHtml: function() {
		var theme = this.calendar.theme;

		return '' +
			'<table class="' + theme.getClass('tableGrid') + '">' +
				(this.opt('columnHeader') ?
					'<thead class="fc-head">' +
						'<tr>' +
							'<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
						'</tr>' +
					'</thead>' :
					''
					) +
				'<tbody class="fc-body">' +
					'<tr>' +
						'<td class="' + theme.getClass('widgetContent') + '"></td>' +
					'</tr>' +
				'</tbody>' +
			'</table>';
	},


	// Generates an HTML attribute string for setting the width of the week number column, if it is known
	weekNumberStyleAttr: function() {
		if (this.weekNumberWidth !== null) {
			return 'style="width:' + this.weekNumberWidth + 'px"';
		}
		return '';
	},


	// Determines whether each row should have a constant height
	hasRigidRows: function() {
		var eventLimit = this.opt('eventLimit');

		return eventLimit && typeof eventLimit !== 'number';
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/


	// Refreshes the horizontal dimensions of the view
	updateSize: function(totalHeight, isAuto, isResize) {
		var eventLimit = this.opt('eventLimit');
		var headRowEl = this.dayGrid.headContainerEl.find('.fc-row');
		var scrollerHeight;
		var scrollbarWidths;

		// hack to give the view some height prior to dayGrid's columns being rendered
		// TODO: separate setting height from scroller VS dayGrid.
		if (!this.dayGrid.rowEls) {
			if (!isAuto) {
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scroller.setHeight(scrollerHeight);
			}
			return;
		}

		View.prototype.updateSize.apply(this, arguments);

		if (this.dayGrid.colWeekNumbersVisible) {
			// Make sure all week number cells running down the side have the same width.
			// Record the width for cells created later.
			this.weekNumberWidth = matchCellWidths(
				this.el.find('.fc-week-number')
			);
		}

		// reset all heights to be natural
		this.scroller.clear();
		uncompensateScroll(headRowEl);

		this.dayGrid.removeSegPopover(); // kill the "more" popover if displayed

		// is the event limit a constant level number?
		if (eventLimit && typeof eventLimit === 'number') {
			this.dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
		}

		// distribute the height to the rows
		// (totalHeight is a "recommended" value if isAuto)
		scrollerHeight = this.computeScrollerHeight(totalHeight);
		this.setGridHeight(scrollerHeight, isAuto);

		// is the event limit dynamically calculated?
		if (eventLimit && typeof eventLimit !== 'number') {
			this.dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
		}

		if (!isAuto) { // should we force dimensions of the scroll container?

			this.scroller.setHeight(scrollerHeight);
			scrollbarWidths = this.scroller.getScrollbarWidths();

			if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?

				compensateScroll(headRowEl, scrollbarWidths);

				// doing the scrollbar compensation might have created text overflow which created more height. redo
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scroller.setHeight(scrollerHeight);
			}

			// guarantees the same scrollbar widths
			this.scroller.lockOverflow(scrollbarWidths);
		}
	},


	// given a desired total height of the view, returns what the height of the scroller should be
	computeScrollerHeight: function(totalHeight) {
		return totalHeight -
			subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
	},


	// Sets the height of just the DayGrid component in this view
	setGridHeight: function(height, isAuto) {
		if (isAuto) {
			undistributeHeight(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
		}
		else {
			distributeHeight(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
		}
	},


	/* Scroll
	------------------------------------------------------------------------------------------------------------------*/


	computeInitialDateScroll: function() {
		return { top: 0 };
	},


	queryDateScroll: function() {
		return { top: this.scroller.getScrollTop() };
	},


	applyDateScroll: function(scroll) {
		if (scroll.top !== undefined) {
			this.scroller.setScrollTop(scroll.top);
		}
	}

});


// Methods that will customize the rendering behavior of the BasicView's dayGrid
var basicDayGridMethods = { // not relly methods anymore


	colWeekNumbersVisible: false, // display week numbers along the side?


	// Generates the HTML that will go before the day-of week header cells
	renderHeadIntroHtml: function() {
		var view = this.view;

		if (this.colWeekNumbersVisible) {
			return '' +
				'<th class="fc-week-number ' + view.calendar.theme.getClass('widgetHeader') + '" ' + view.weekNumberStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						htmlEscape(this.opt('weekNumberTitle')) +
					'</span>' +
				'</th>';
		}

		return '';
	},


	// Generates the HTML that will go before content-skeleton cells that display the day/week numbers
	renderNumberIntroHtml: function(row) {
		var view = this.view;
		var weekStart = this.getCellDate(row, 0);

		if (this.colWeekNumbersVisible) {
			return '' +
				'<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '>' +
					view.buildGotoAnchorHtml( // aside from link, important for matchCellWidths
						{ date: weekStart, type: 'week', forceOff: this.colCnt === 1 },
						weekStart.format('w') // inner HTML
					) +
				'</td>';
		}

		return '';
	},


	// Generates the HTML that goes before the day bg cells for each day-row
	renderBgIntroHtml: function() {
		var view = this.view;

		if (this.colWeekNumbersVisible) {
			return '<td class="fc-week-number ' + view.calendar.theme.getClass('widgetContent') + '" ' +
				view.weekNumberStyleAttr() + '></td>';
		}

		return '';
	},


	// Generates the HTML that goes before every other type of row generated by DayGrid.
	// Affects helper-skeleton and highlight-skeleton rows.
	renderIntroHtml: function() {
		var view = this.view;

		if (this.colWeekNumbersVisible) {
			return '<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '></td>';
		}

		return '';
	},


	getIsNumbersVisible: function() {
		return DayGrid.prototype.getIsNumbersVisible.apply(this, arguments) || this.colWeekNumbersVisible;
	}

};

;;

/* A month view with day cells running in rows (one-per-week) and columns
----------------------------------------------------------------------------------------------------------------------*/

var MonthView = FC.MonthView = BasicView.extend({


	// Computes the date range that will be rendered.
	buildRenderRange: function(currentUnzonedRange, currentRangeUnit, isRangeAllDay) {
		var renderUnzonedRange = BasicView.prototype.buildRenderRange.apply(this, arguments);
		var start = this.calendar.msToUtcMoment(renderUnzonedRange.startMs, isRangeAllDay);
		var end = this.calendar.msToUtcMoment(renderUnzonedRange.endMs, isRangeAllDay);
		var rowCnt;

		// ensure 6 weeks
		if (this.isFixedWeeks()) {
			rowCnt = Math.ceil( // could be partial weeks due to hiddenDays
				end.diff(start, 'weeks', true) // dontRound=true
			);
			end.add(6 - rowCnt, 'weeks');
		}

		return new UnzonedRange(start, end);
	},


	// Overrides the default BasicView behavior to have special multi-week auto-height logic
	setGridHeight: function(height, isAuto) {

		// if auto, make the height of each row the height that it would be if there were 6 weeks
		if (isAuto) {
			height *= this.rowCnt / 6;
		}

		distributeHeight(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
	},


	isFixedWeeks: function() {
		return this.opt('fixedWeekCount');
	},


	isDateInOtherMonth: function(date, dateProfile) {
		return date.month() !== moment.utc(dateProfile.currentUnzonedRange.startMs).month(); // TODO: optimize
	}

});

;;

fcViews.basic = {
	'class': BasicView
};

fcViews.basicDay = {
	type: 'basic',
	duration: { days: 1 }
};

fcViews.basicWeek = {
	type: 'basic',
	duration: { weeks: 1 }
};

fcViews.month = {
	'class': MonthView,
	duration: { months: 1 }, // important for prev/next
	defaults: {
		fixedWeekCount: true
	}
};
;;

var TimeGridFillRenderer = FillRenderer.extend({


	attachSegEls: function(type, segs) {
		var timeGrid = this.component;
		var containerEls;

		// TODO: more efficient lookup
		if (type === 'bgEvent') {
			containerEls = timeGrid.bgContainerEls;
		}
		else if (type === 'businessHours') {
			containerEls = timeGrid.businessContainerEls;
		}
		else if (type === 'highlight') {
			containerEls = timeGrid.highlightContainerEls;
		}

		timeGrid.updateSegVerticals(segs);
		timeGrid.attachSegsByCol(timeGrid.groupSegsByCol(segs), containerEls);

		return segs.map(function(seg) {
			return seg.el[0];
		});
	}

});

;;

/*
Only handles foreground segs.
Does not own rendering. Use for low-level util methods by TimeGrid.
*/
var TimeGridEventRenderer = EventRenderer.extend({

	timeGrid: null,


	constructor: function(timeGrid) {
		EventRenderer.apply(this, arguments);

		this.timeGrid = timeGrid;
	},


	renderFgSegs: function(segs) {
		this.renderFgSegsIntoContainers(segs, this.timeGrid.fgContainerEls);
	},


	// Given an array of foreground segments, render a DOM element for each, computes position,
	// and attaches to the column inner-container elements.
	renderFgSegsIntoContainers: function(segs, containerEls) {
		var segsByCol;
		var col;

		segsByCol = this.timeGrid.groupSegsByCol(segs);

		for (col = 0; col < this.timeGrid.colCnt; col++) {
			this.updateFgSegCoords(segsByCol[col]);
		}

		this.timeGrid.attachSegsByCol(segsByCol, containerEls);
	},


	unrenderFgSegs: function() {
		if (this.fgSegs) { // hack
			this.fgSegs.forEach(function(seg) {
				seg.el.remove();
			});
		}
	},


	// Computes a default event time formatting string if `timeFormat` is not explicitly defined
	computeEventTimeFormat: function() {
		return this.opt('noMeridiemTimeFormat'); // like "6:30" (no AM/PM)
	},


	// Computes a default `displayEventEnd` value if one is not expliclty defined
	computeDisplayEventEnd: function() {
		return true;
	},


	// Renders the HTML for a single event segment's default rendering
	fgSegHtml: function(seg, disableResizing) {
		var view = this.view;
		var calendar = view.calendar;
		var componentFootprint = seg.footprint.componentFootprint;
		var isAllDay = componentFootprint.isAllDay;
		var eventDef = seg.footprint.eventDef;
		var isDraggable = view.isEventDefDraggable(eventDef);
		var isResizableFromStart = !disableResizing && seg.isStart && view.isEventDefResizableFromStart(eventDef);
		var isResizableFromEnd = !disableResizing && seg.isEnd && view.isEventDefResizableFromEnd(eventDef);
		var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
		var skinCss = cssToStr(this.getSkinCss(eventDef));
		var timeText;
		var fullTimeText; // more verbose time text. for the print stylesheet
		var startTimeText; // just the start time text

		classes.unshift('fc-time-grid-event', 'fc-v-event');

		// if the event appears to span more than one day...
		if (view.isMultiDayRange(componentFootprint.unzonedRange)) {
			// Don't display time text on segments that run entirely through a day.
			// That would appear as midnight-midnight and would look dumb.
			// Otherwise, display the time text for the *segment's* times (like 6pm-midnight or midnight-10am)
			if (seg.isStart || seg.isEnd) {
				var zonedStart = calendar.msToMoment(seg.startMs);
				var zonedEnd = calendar.msToMoment(seg.endMs);
				timeText = this._getTimeText(zonedStart, zonedEnd, isAllDay);
				fullTimeText = this._getTimeText(zonedStart, zonedEnd, isAllDay, 'LT');
				startTimeText = this._getTimeText(zonedStart, zonedEnd, isAllDay, null, false); // displayEnd=false
			}
		}
		else {
			// Display the normal time text for the *event's* times
			timeText = this.getTimeText(seg.footprint);
			fullTimeText = this.getTimeText(seg.footprint, 'LT');
			startTimeText = this.getTimeText(seg.footprint, null, false); // displayEnd=false
		}

		return '<a class="' + classes.join(' ') + '"' +
			(eventDef.url ?
				' href="' + htmlEscape(eventDef.url) + '"' :
				''
				) +
			(skinCss ?
				' style="' + skinCss + '"' :
				''
				) +
			'>' +
				'<div class="fc-content">' +
					(timeText ?
						'<div class="fc-time"' +
						' data-start="' + htmlEscape(startTimeText) + '"' +
						' data-full="' + htmlEscape(fullTimeText) + '"' +
						'>' +
							'<span>' + htmlEscape(timeText) + '</span>' +
						'</div>' :
						''
						) +
					(eventDef.title ?
						'<div class="fc-title">' +
							htmlEscape(eventDef.title) +
						'</div>' :
						''
						) +
				'</div>' +
				'<div class="fc-bg"/>' +
				/* TODO: write CSS for this
				(isResizableFromStart ?
					'<div class="fc-resizer fc-start-resizer" />' :
					''
					) +
				*/
				(isResizableFromEnd ?
					'<div class="fc-resizer fc-end-resizer" />' :
					''
					) +
			'</a>';
	},


	// Given segments that are assumed to all live in the *same column*,
	// compute their verical/horizontal coordinates and assign to their elements.
	updateFgSegCoords: function(segs) {
		this.timeGrid.computeSegVerticals(segs); // horizontals relies on this
		this.computeFgSegHorizontals(segs); // compute horizontal coordinates, z-index's, and reorder the array
		this.timeGrid.assignSegVerticals(segs);
		this.assignFgSegHorizontals(segs);
	},


	// Given an array of segments that are all in the same column, sets the backwardCoord and forwardCoord on each.
	// NOTE: Also reorders the given array by date!
	computeFgSegHorizontals: function(segs) {
		var levels;
		var level0;
		var i;

		this.sortEventSegs(segs); // order by certain criteria
		levels = buildSlotSegLevels(segs);
		computeForwardSlotSegs(levels);

		if ((level0 = levels[0])) {

			for (i = 0; i < level0.length; i++) {
				computeSlotSegPressures(level0[i]);
			}

			for (i = 0; i < level0.length; i++) {
				this.computeFgSegForwardBack(level0[i], 0, 0);
			}
		}
	},


	// Calculate seg.forwardCoord and seg.backwardCoord for the segment, where both values range
	// from 0 to 1. If the calendar is left-to-right, the seg.backwardCoord maps to "left" and
	// seg.forwardCoord maps to "right" (via percentage). Vice-versa if the calendar is right-to-left.
	//
	// The segment might be part of a "series", which means consecutive segments with the same pressure
	// who's width is unknown until an edge has been hit. `seriesBackwardPressure` is the number of
	// segments behind this one in the current series, and `seriesBackwardCoord` is the starting
	// coordinate of the first segment in the series.
	computeFgSegForwardBack: function(seg, seriesBackwardPressure, seriesBackwardCoord) {
		var forwardSegs = seg.forwardSegs;
		var i;

		if (seg.forwardCoord === undefined) { // not already computed

			if (!forwardSegs.length) {

				// if there are no forward segments, this segment should butt up against the edge
				seg.forwardCoord = 1;
			}
			else {

				// sort highest pressure first
				this.sortForwardSegs(forwardSegs);

				// this segment's forwardCoord will be calculated from the backwardCoord of the
				// highest-pressure forward segment.
				this.computeFgSegForwardBack(forwardSegs[0], seriesBackwardPressure + 1, seriesBackwardCoord);
				seg.forwardCoord = forwardSegs[0].backwardCoord;
			}

			// calculate the backwardCoord from the forwardCoord. consider the series
			seg.backwardCoord = seg.forwardCoord -
				(seg.forwardCoord - seriesBackwardCoord) / // available width for series
				(seriesBackwardPressure + 1); // # of segments in the series

			// use this segment's coordinates to computed the coordinates of the less-pressurized
			// forward segments
			for (i=0; i<forwardSegs.length; i++) {
				this.computeFgSegForwardBack(forwardSegs[i], 0, seg.forwardCoord);
			}
		}
	},


	sortForwardSegs: function(forwardSegs) {
		forwardSegs.sort(proxy(this, 'compareForwardSegs'));
	},


	// A cmp function for determining which forward segment to rely on more when computing coordinates.
	compareForwardSegs: function(seg1, seg2) {
		// put higher-pressure first
		return seg2.forwardPressure - seg1.forwardPressure ||
			// put segments that are closer to initial edge first (and favor ones with no coords yet)
			(seg1.backwardCoord || 0) - (seg2.backwardCoord || 0) ||
			// do normal sorting...
			this.compareEventSegs(seg1, seg2);
	},


	// Given foreground event segments that have already had their position coordinates computed,
	// assigns position-related CSS values to their elements.
	assignFgSegHorizontals: function(segs) {
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			seg.el.css(this.generateFgSegHorizontalCss(seg));

			// if the height is short, add a className for alternate styling
			if (seg.bottom - seg.top < 30) {
				seg.el.addClass('fc-short');
			}
		}
	},


	// Generates an object with CSS properties/values that should be applied to an event segment element.
	// Contains important positioning-related properties that should be applied to any event element, customized or not.
	generateFgSegHorizontalCss: function(seg) {
		var shouldOverlap = this.opt('slotEventOverlap');
		var backwardCoord = seg.backwardCoord; // the left side if LTR. the right side if RTL. floating-point
		var forwardCoord = seg.forwardCoord; // the right side if LTR. the left side if RTL. floating-point
		var props = this.timeGrid.generateSegVerticalCss(seg); // get top/bottom first
		var left; // amount of space from left edge, a fraction of the total width
		var right; // amount of space from right edge, a fraction of the total width

		if (shouldOverlap) {
			// double the width, but don't go beyond the maximum forward coordinate (1.0)
			forwardCoord = Math.min(1, backwardCoord + (forwardCoord - backwardCoord) * 2);
		}

		if (this.timeGrid.isRTL) {
			left = 1 - forwardCoord;
			right = backwardCoord;
		}
		else {
			left = backwardCoord;
			right = 1 - forwardCoord;
		}

		props.zIndex = seg.level + 1; // convert from 0-base to 1-based
		props.left = left * 100 + '%';
		props.right = right * 100 + '%';

		if (shouldOverlap && seg.forwardPressure) {
			// add padding to the edge so that forward stacked events don't cover the resizer's icon
			props[this.isRTL ? 'marginLeft' : 'marginRight'] = 10 * 2; // 10 is a guesstimate of the icon's width
		}

		return props;
	}

});


// Builds an array of segments "levels". The first level will be the leftmost tier of segments if the calendar is
// left-to-right, or the rightmost if the calendar is right-to-left. Assumes the segments are already ordered by date.
function buildSlotSegLevels(segs) {
	var levels = [];
	var i, seg;
	var j;

	for (i=0; i<segs.length; i++) {
		seg = segs[i];

		// go through all the levels and stop on the first level where there are no collisions
		for (j=0; j<levels.length; j++) {
			if (!computeSlotSegCollisions(seg, levels[j]).length) {
				break;
			}
		}

		seg.level = j;

		(levels[j] || (levels[j] = [])).push(seg);
	}

	return levels;
}


// For every segment, figure out the other segments that are in subsequent
// levels that also occupy the same vertical space. Accumulate in seg.forwardSegs
function computeForwardSlotSegs(levels) {
	var i, level;
	var j, seg;
	var k;

	for (i=0; i<levels.length; i++) {
		level = levels[i];

		for (j=0; j<level.length; j++) {
			seg = level[j];

			seg.forwardSegs = [];
			for (k=i+1; k<levels.length; k++) {
				computeSlotSegCollisions(seg, levels[k], seg.forwardSegs);
			}
		}
	}
}


// Figure out which path forward (via seg.forwardSegs) results in the longest path until
// the furthest edge is reached. The number of segments in this path will be seg.forwardPressure
function computeSlotSegPressures(seg) {
	var forwardSegs = seg.forwardSegs;
	var forwardPressure = 0;
	var i, forwardSeg;

	if (seg.forwardPressure === undefined) { // not already computed

		for (i=0; i<forwardSegs.length; i++) {
			forwardSeg = forwardSegs[i];

			// figure out the child's maximum forward path
			computeSlotSegPressures(forwardSeg);

			// either use the existing maximum, or use the child's forward pressure
			// plus one (for the forwardSeg itself)
			forwardPressure = Math.max(
				forwardPressure,
				1 + forwardSeg.forwardPressure
			);
		}

		seg.forwardPressure = forwardPressure;
	}
}


// Find all the segments in `otherSegs` that vertically collide with `seg`.
// Append into an optionally-supplied `results` array and return.
function computeSlotSegCollisions(seg, otherSegs, results) {
	results = results || [];

	for (var i=0; i<otherSegs.length; i++) {
		if (isSlotSegCollision(seg, otherSegs[i])) {
			results.push(otherSegs[i]);
		}
	}

	return results;
}


// Do these segments occupy the same vertical space?
function isSlotSegCollision(seg1, seg2) {
	return seg1.bottom > seg2.top && seg1.top < seg2.bottom;
}

;;

var TimeGridHelperRenderer = HelperRenderer.extend({


	renderSegs: function(segs, sourceSeg) {
		var helperNodes = [];
		var i, seg;
		var sourceEl;

		// TODO: not good to call eventRenderer this way
		this.eventRenderer.renderFgSegsIntoContainers(
			segs,
			this.component.helperContainerEls
		);

		// Try to make the segment that is in the same row as sourceSeg look the same
		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			if (sourceSeg && sourceSeg.col === seg.col) {
				sourceEl = sourceSeg.el;
				seg.el.css({
					left: sourceEl.css('left'),
					right: sourceEl.css('right'),
					'margin-left': sourceEl.css('margin-left'),
					'margin-right': sourceEl.css('margin-right')
				});
			}

			helperNodes.push(seg.el[0]);
		}

		return $(helperNodes); // must return the elements rendered
	}

});

;;

/* A component that renders one or more columns of vertical time slots
----------------------------------------------------------------------------------------------------------------------*/
// We mixin DayTable, even though there is only a single row of days

var TimeGrid = FC.TimeGrid = InteractiveDateComponent.extend(StandardInteractionsMixin, DayTableMixin, {

	eventRendererClass: TimeGridEventRenderer,
	businessHourRendererClass: BusinessHourRenderer,
	helperRendererClass: TimeGridHelperRenderer,
	fillRendererClass: TimeGridFillRenderer,

	view: null, // TODO: make more general and/or remove
	helperRenderer: null,

	dayRanges: null, // UnzonedRange[], of start-end of each day
	slotDuration: null, // duration of a "slot", a distinct time segment on given day, visualized by lines
	snapDuration: null, // granularity of time for dragging and selecting
	snapsPerSlot: null,
	labelFormat: null, // formatting string for times running along vertical axis
	labelInterval: null, // duration of how often a label should be displayed for a slot

	headContainerEl: null, // div that hold's the date header
	colEls: null, // cells elements in the day-row background
	slatContainerEl: null, // div that wraps all the slat rows
	slatEls: null, // elements running horizontally across all columns
	nowIndicatorEls: null,

	colCoordCache: null,
	slatCoordCache: null,

	bottomRuleEl: null, // hidden by default
	contentSkeletonEl: null,
	colContainerEls: null, // containers for each column

	// inner-containers for each column where different types of segs live
	fgContainerEls: null,
	bgContainerEls: null,
	helperContainerEls: null,
	highlightContainerEls: null,
	businessContainerEls: null,

	// arrays of different types of displayed segments
	helperSegs: null,
	highlightSegs: null,
	businessSegs: null,


	constructor: function(view) {
		this.view = view; // do first, for opt calls during initialization

		InteractiveDateComponent.call(this); // call the super-constructor

		this.processOptions();
	},


	// Slices up the given span (unzoned start/end with other misc data) into an array of segments
	componentFootprintToSegs: function(componentFootprint) {
		var segs = this.sliceRangeByTimes(componentFootprint.unzonedRange);
		var i;

		for (i = 0; i < segs.length; i++) {
			if (this.isRTL) {
				segs[i].col = this.daysPerRow - 1 - segs[i].dayIndex;
			}
			else {
				segs[i].col = segs[i].dayIndex;
			}
		}

		return segs;
	},


	/* Date Handling
	------------------------------------------------------------------------------------------------------------------*/


	sliceRangeByTimes: function(unzonedRange) {
		var segs = [];
		var segRange;
		var dayIndex;

		for (dayIndex = 0; dayIndex < this.daysPerRow; dayIndex++) {

			segRange = unzonedRange.intersect(this.dayRanges[dayIndex]);

			if (segRange) {
				segs.push({
					startMs: segRange.startMs,
					endMs: segRange.endMs,
					isStart: segRange.isStart,
					isEnd: segRange.isEnd,
					dayIndex: dayIndex
				});
			}
		}

		return segs;
	},


	/* Options
	------------------------------------------------------------------------------------------------------------------*/


	// Parses various options into properties of this object
	processOptions: function() {
		var slotDuration = this.opt('slotDuration');
		var snapDuration = this.opt('snapDuration');
		var input;

		slotDuration = moment.duration(slotDuration);
		snapDuration = snapDuration ? moment.duration(snapDuration) : slotDuration;

		this.slotDuration = slotDuration;
		this.snapDuration = snapDuration;
		this.snapsPerSlot = slotDuration / snapDuration; // TODO: ensure an integer multiple?

		// might be an array value (for TimelineView).
		// if so, getting the most granular entry (the last one probably).
		input = this.opt('slotLabelFormat');
		if ($.isArray(input)) {
			input = input[input.length - 1];
		}

		this.labelFormat = input ||
			this.opt('smallTimeFormat'); // the computed default

		input = this.opt('slotLabelInterval');
		this.labelInterval = input ?
			moment.duration(input) :
			this.computeLabelInterval(slotDuration);
	},


	// Computes an automatic value for slotLabelInterval
	computeLabelInterval: function(slotDuration) {
		var i;
		var labelInterval;
		var slotsPerLabel;

		// find the smallest stock label interval that results in more than one slots-per-label
		for (i = AGENDA_STOCK_SUB_DURATIONS.length - 1; i >= 0; i--) {
			labelInterval = moment.duration(AGENDA_STOCK_SUB_DURATIONS[i]);
			slotsPerLabel = divideDurationByDuration(labelInterval, slotDuration);
			if (isInt(slotsPerLabel) && slotsPerLabel > 1) {
				return labelInterval;
			}
		}

		return moment.duration(slotDuration); // fall back. clone
	},


	/* Date Rendering
	------------------------------------------------------------------------------------------------------------------*/


	renderDates: function(dateProfile) {
		this.dateProfile = dateProfile;
		this.updateDayTable();
		this.renderSlats();
		this.renderColumns();
	},


	unrenderDates: function() {
		//this.unrenderSlats(); // don't need this because repeated .html() calls clear
		this.unrenderColumns();
	},


	renderSkeleton: function() {
		var theme = this.view.calendar.theme;

		this.el.html(
			'<div class="fc-bg"></div>' +
			'<div class="fc-slats"></div>' +
			'<hr class="fc-divider ' + theme.getClass('widgetHeader') + '" style="display:none" />'
		);

		this.bottomRuleEl = this.el.find('hr');
	},


	renderSlats: function() {
		var theme = this.view.calendar.theme;

		this.slatContainerEl = this.el.find('> .fc-slats')
			.html( // avoids needing ::unrenderSlats()
				'<table class="' + theme.getClass('tableGrid') + '">' +
					this.renderSlatRowHtml() +
				'</table>'
			);

		this.slatEls = this.slatContainerEl.find('tr');

		this.slatCoordCache = new CoordCache({
			els: this.slatEls,
			isVertical: true
		});
	},


	// Generates the HTML for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
	renderSlatRowHtml: function() {
		var view = this.view;
		var calendar = view.calendar;
		var theme = calendar.theme;
		var isRTL = this.isRTL;
		var dateProfile = this.dateProfile;
		var html = '';
		var slotTime = moment.duration(+dateProfile.minTime); // wish there was .clone() for durations
		var slotIterator = moment.duration(0);
		var slotDate; // will be on the view's first day, but we only care about its time
		var isLabeled;
		var axisHtml;

		// Calculate the time for each slot
		while (slotTime < dateProfile.maxTime) {
			slotDate = calendar.msToUtcMoment(dateProfile.renderUnzonedRange.startMs).time(slotTime);
			isLabeled = isInt(divideDurationByDuration(slotIterator, this.labelInterval));

			axisHtml =
				'<td class="fc-axis fc-time ' + theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '>' +
					(isLabeled ?
						'<span>' + // for matchCellWidths
							htmlEscape(slotDate.format(this.labelFormat)) +
						'</span>' :
						''
						) +
				'</td>';

			html +=
				'<tr data-time="' + slotDate.format('HH:mm:ss') + '"' +
					(isLabeled ? '' : ' class="fc-minor"') +
					'>' +
					(!isRTL ? axisHtml : '') +
					'<td class="' + theme.getClass('widgetContent') + '"/>' +
					(isRTL ? axisHtml : '') +
				"</tr>";

			slotTime.add(this.slotDuration);
			slotIterator.add(this.slotDuration);
		}

		return html;
	},


	renderColumns: function() {
		var dateProfile = this.dateProfile;
		var theme = this.view.calendar.theme;

		this.dayRanges = this.dayDates.map(function(dayDate) {
			return new UnzonedRange(
				dayDate.clone().add(dateProfile.minTime),
				dayDate.clone().add(dateProfile.maxTime)
			);
		});

		if (this.headContainerEl) {
			this.headContainerEl.html(this.renderHeadHtml());
		}

		this.el.find('> .fc-bg').html(
			'<table class="' + theme.getClass('tableGrid') + '">' +
				this.renderBgTrHtml(0) + // row=0
			'</table>'
		);

		this.colEls = this.el.find('.fc-day, .fc-disabled-day');

		this.colCoordCache = new CoordCache({
			els: this.colEls,
			isHorizontal: true
		});

		this.renderContentSkeleton();
	},


	unrenderColumns: function() {
		this.unrenderContentSkeleton();
	},


	/* Content Skeleton
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the DOM that the view's content will live in
	renderContentSkeleton: function() {
		var cellHtml = '';
		var i;
		var skeletonEl;

		for (i = 0; i < this.colCnt; i++) {
			cellHtml +=
				'<td>' +
					'<div class="fc-content-col">' +
						'<div class="fc-event-container fc-helper-container"></div>' +
						'<div class="fc-event-container"></div>' +
						'<div class="fc-highlight-container"></div>' +
						'<div class="fc-bgevent-container"></div>' +
						'<div class="fc-business-container"></div>' +
					'</div>' +
				'</td>';
		}

		skeletonEl = this.contentSkeletonEl = $(
			'<div class="fc-content-skeleton">' +
				'<table>' +
					'<tr>' + cellHtml + '</tr>' +
				'</table>' +
			'</div>'
		);

		this.colContainerEls = skeletonEl.find('.fc-content-col');
		this.helperContainerEls = skeletonEl.find('.fc-helper-container');
		this.fgContainerEls = skeletonEl.find('.fc-event-container:not(.fc-helper-container)');
		this.bgContainerEls = skeletonEl.find('.fc-bgevent-container');
		this.highlightContainerEls = skeletonEl.find('.fc-highlight-container');
		this.businessContainerEls = skeletonEl.find('.fc-business-container');

		this.bookendCells(skeletonEl.find('tr')); // TODO: do this on string level
		this.el.append(skeletonEl);
	},


	unrenderContentSkeleton: function() {
		this.contentSkeletonEl.remove();
		this.contentSkeletonEl = null;
		this.colContainerEls = null;
		this.helperContainerEls = null;
		this.fgContainerEls = null;
		this.bgContainerEls = null;
		this.highlightContainerEls = null;
		this.businessContainerEls = null;
	},


	// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's col
	groupSegsByCol: function(segs) {
		var segsByCol = [];
		var i;

		for (i = 0; i < this.colCnt; i++) {
			segsByCol.push([]);
		}

		for (i = 0; i < segs.length; i++) {
			segsByCol[segs[i].col].push(segs[i]);
		}

		return segsByCol;
	},


	// Given segments grouped by column, insert the segments' elements into a parallel array of container
	// elements, each living within a column.
	attachSegsByCol: function(segsByCol, containerEls) {
		var col;
		var segs;
		var i;

		for (col = 0; col < this.colCnt; col++) { // iterate each column grouping
			segs = segsByCol[col];

			for (i = 0; i < segs.length; i++) {
				containerEls.eq(col).append(segs[i].el);
			}
		}
	},


	/* Now Indicator
	------------------------------------------------------------------------------------------------------------------*/


	getNowIndicatorUnit: function() {
		return 'minute'; // will refresh on the minute
	},


	renderNowIndicator: function(date) {
		// seg system might be overkill, but it handles scenario where line needs to be rendered
		//  more than once because of columns with the same date (resources columns for example)
		var segs = this.componentFootprintToSegs(
			new ComponentFootprint(
				new UnzonedRange(date, date.valueOf() + 1), // protect against null range
				false // all-day
			)
		);
		var top = this.computeDateTop(date, date);
		var nodes = [];
		var i;

		// render lines within the columns
		for (i = 0; i < segs.length; i++) {
			nodes.push($('<div class="fc-now-indicator fc-now-indicator-line"></div>')
				.css('top', top)
				.appendTo(this.colContainerEls.eq(segs[i].col))[0]);
		}

		// render an arrow over the axis
		if (segs.length > 0) { // is the current time in view?
			nodes.push($('<div class="fc-now-indicator fc-now-indicator-arrow"></div>')
				.css('top', top)
				.appendTo(this.el.find('.fc-content-skeleton'))[0]);
		}

		this.nowIndicatorEls = $(nodes);
	},


	unrenderNowIndicator: function() {
		if (this.nowIndicatorEls) {
			this.nowIndicatorEls.remove();
			this.nowIndicatorEls = null;
		}
	},


	/* Coordinates
	------------------------------------------------------------------------------------------------------------------*/


	updateSize: function(totalHeight, isAuto, isResize) {
		InteractiveDateComponent.prototype.updateSize.apply(this, arguments);

		this.slatCoordCache.build();

		if (isResize) {
			this.updateSegVerticals(
				[].concat(this.eventRenderer.getSegs(), this.businessSegs || [])
			);
		}
	},


	getTotalSlatHeight: function() {
		return this.slatContainerEl.outerHeight();
	},


	// Computes the top coordinate, relative to the bounds of the grid, of the given date.
	// `ms` can be a millisecond UTC time OR a UTC moment.
	// A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
	computeDateTop: function(ms, startOfDayDate) {
		return this.computeTimeTop(
			moment.duration(
				ms - startOfDayDate.clone().stripTime()
			)
		);
	},


	// Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
	computeTimeTop: function(time) {
		var len = this.slatEls.length;
		var dateProfile = this.dateProfile;
		var slatCoverage = (time - dateProfile.minTime) / this.slotDuration; // floating-point value of # of slots covered
		var slatIndex;
		var slatRemainder;

		// compute a floating-point number for how many slats should be progressed through.
		// from 0 to number of slats (inclusive)
		// constrained because minTime/maxTime might be customized.
		slatCoverage = Math.max(0, slatCoverage);
		slatCoverage = Math.min(len, slatCoverage);

		// an integer index of the furthest whole slat
		// from 0 to number slats (*exclusive*, so len-1)
		slatIndex = Math.floor(slatCoverage);
		slatIndex = Math.min(slatIndex, len - 1);

		// how much further through the slatIndex slat (from 0.0-1.0) must be covered in addition.
		// could be 1.0 if slatCoverage is covering *all* the slots
		slatRemainder = slatCoverage - slatIndex;

		return this.slatCoordCache.getTopPosition(slatIndex) +
			this.slatCoordCache.getHeight(slatIndex) * slatRemainder;
	},


	// Refreshes the CSS top/bottom coordinates for each segment element.
	// Works when called after initial render, after a window resize/zoom for example.
	updateSegVerticals: function(segs) {
		this.computeSegVerticals(segs);
		this.assignSegVerticals(segs);
	},


	// For each segment in an array, computes and assigns its top and bottom properties
	computeSegVerticals: function(segs) {
		var eventMinHeight = this.opt('agendaEventMinHeight');
		var i, seg;
		var dayDate;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			dayDate = this.dayDates[seg.dayIndex];

			seg.top = this.computeDateTop(seg.startMs, dayDate);
			seg.bottom = Math.max(
				seg.top + eventMinHeight,
				this.computeDateTop(seg.endMs, dayDate)
			);
		}
	},


	// Given segments that already have their top/bottom properties computed, applies those values to
	// the segments' elements.
	assignSegVerticals: function(segs) {
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			seg.el.css(this.generateSegVerticalCss(seg));
		}
	},


	// Generates an object with CSS properties for the top/bottom coordinates of a segment element
	generateSegVerticalCss: function(seg) {
		return {
			top: seg.top,
			bottom: -seg.bottom // flipped because needs to be space beyond bottom edge of event container
		};
	},


	/* Hit System
	------------------------------------------------------------------------------------------------------------------*/


	prepareHits: function() {
		this.colCoordCache.build();
		this.slatCoordCache.build();
	},


	releaseHits: function() {
		this.colCoordCache.clear();
		// NOTE: don't clear slatCoordCache because we rely on it for computeTimeTop
	},


	queryHit: function(leftOffset, topOffset) {
		var snapsPerSlot = this.snapsPerSlot;
		var colCoordCache = this.colCoordCache;
		var slatCoordCache = this.slatCoordCache;

		if (colCoordCache.isLeftInBounds(leftOffset) && slatCoordCache.isTopInBounds(topOffset)) {
			var colIndex = colCoordCache.getHorizontalIndex(leftOffset);
			var slatIndex = slatCoordCache.getVerticalIndex(topOffset);

			if (colIndex != null && slatIndex != null) {
				var slatTop = slatCoordCache.getTopOffset(slatIndex);
				var slatHeight = slatCoordCache.getHeight(slatIndex);
				var partial = (topOffset - slatTop) / slatHeight; // floating point number between 0 and 1
				var localSnapIndex = Math.floor(partial * snapsPerSlot); // the snap # relative to start of slat
				var snapIndex = slatIndex * snapsPerSlot + localSnapIndex;
				var snapTop = slatTop + (localSnapIndex / snapsPerSlot) * slatHeight;
				var snapBottom = slatTop + ((localSnapIndex + 1) / snapsPerSlot) * slatHeight;

				return {
					col: colIndex,
					snap: snapIndex,
					component: this, // needed unfortunately :(
					left: colCoordCache.getLeftOffset(colIndex),
					right: colCoordCache.getRightOffset(colIndex),
					top: snapTop,
					bottom: snapBottom
				};
			}
		}
	},


	getHitFootprint: function(hit) {
		var start = this.getCellDate(0, hit.col); // row=0
		var time = this.computeSnapTime(hit.snap); // pass in the snap-index
		var end;

		start.time(time);
		end = start.clone().add(this.snapDuration);

		return new ComponentFootprint(
			new UnzonedRange(start, end),
			false // all-day?
		);
	},


	// Given a row number of the grid, representing a "snap", returns a time (Duration) from its start-of-day
	computeSnapTime: function(snapIndex) {
		return moment.duration(this.dateProfile.minTime + this.snapDuration * snapIndex);
	},


	getHitEl: function(hit) {
		return this.colEls.eq(hit.col);
	},


	/* Event Drag Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being dragged over the specified date(s).
	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(eventFootprints, seg, isTouch) {
		var i;

		if (seg) { // if there is event information for this drag, render a helper event

			if (eventFootprints.length) {
				this.helperRenderer.renderEventDraggingFootprints(eventFootprints, seg, isTouch);

				// signal that a helper has been rendered
				return true;
			}
		}
		else { // otherwise, just render a highlight

			for (i = 0; i < eventFootprints.length; i++) {
				this.renderHighlight(eventFootprints[i].componentFootprint);
			}
		}
	},


	// Unrenders any visual indication of an event being dragged
	unrenderDrag: function(seg) {
		this.unrenderHighlight();
		this.helperRenderer.unrender();
	},


	/* Event Resize Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being resized
	renderEventResize: function(eventFootprints, seg, isTouch) {
		this.helperRenderer.renderEventResizingFootprints(eventFootprints, seg, isTouch);
	},


	// Unrenders any visual indication of an event being resized
	unrenderEventResize: function(seg) {
		this.helperRenderer.unrender();
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection. Overrides the default, which was to simply render a highlight.
	renderSelectionFootprint: function(componentFootprint) {
		if (this.opt('selectHelper')) { // this setting signals that a mock helper event should be rendered
			this.helperRenderer.renderComponentFootprint(componentFootprint);
		}
		else {
			this.renderHighlight(componentFootprint);
		}
	},


	// Unrenders any visual indication of a selection
	unrenderSelection: function() {
		this.helperRenderer.unrender();
		this.unrenderHighlight();
	}

});

;;

/* An abstract class for all agenda-related views. Displays one more columns with time slots running vertically.
----------------------------------------------------------------------------------------------------------------------*/
// Is a manager for the TimeGrid subcomponent and possibly the DayGrid subcomponent (if allDaySlot is on).
// Responsible for managing width/height.

var AgendaView = FC.AgendaView = View.extend({

	scroller: null,

	timeGridClass: TimeGrid, // class used to instantiate the timeGrid. subclasses can override
	timeGrid: null, // the main time-grid subcomponent of this view

	dayGridClass: DayGrid, // class used to instantiate the dayGrid. subclasses can override
	dayGrid: null, // the "all-day" subcomponent. if all-day is turned off, this will be null

	axisWidth: null, // the width of the time axis running down the side

	// indicates that minTime/maxTime affects rendering
	usesMinMaxTime: true,


	constructor: function() {
		View.apply(this, arguments);

		this.timeGrid = this.instantiateTimeGrid();
		this.addChild(this.timeGrid);

		if (this.opt('allDaySlot')) { // should we display the "all-day" area?
			this.dayGrid = this.instantiateDayGrid(); // the all-day subcomponent of this view
			this.addChild(this.dayGrid);
		}

		this.scroller = new Scroller({
			overflowX: 'hidden',
			overflowY: 'auto'
		});
	},


	// Instantiates the TimeGrid object this view needs. Draws from this.timeGridClass
	instantiateTimeGrid: function() {
		var subclass = this.timeGridClass.extend(agendaTimeGridMethods);

		return new subclass(this);
	},


	// Instantiates the DayGrid object this view might need. Draws from this.dayGridClass
	instantiateDayGrid: function() {
		var subclass = this.dayGridClass.extend(agendaDayGridMethods);

		return new subclass(this);
	},


	/* Rendering
	------------------------------------------------------------------------------------------------------------------*/


	renderSkeleton: function() {
		var timeGridWrapEl;
		var timeGridEl;

		this.el.addClass('fc-agenda-view').html(this.renderSkeletonHtml());

		this.scroller.render();

		timeGridWrapEl = this.scroller.el.addClass('fc-time-grid-container');
		timeGridEl = $('<div class="fc-time-grid" />').appendTo(timeGridWrapEl);

		this.el.find('.fc-body > tr > td').append(timeGridWrapEl);

		this.timeGrid.headContainerEl = this.el.find('.fc-head-container');
		this.timeGrid.setElement(timeGridEl);

		if (this.dayGrid) {
			this.dayGrid.setElement(this.el.find('.fc-day-grid'));

			// have the day-grid extend it's coordinate area over the <hr> dividing the two grids
			this.dayGrid.bottomCoordPadding = this.dayGrid.el.next('hr').outerHeight();
		}
	},


	unrenderSkeleton: function() {
		this.timeGrid.removeElement();

		if (this.dayGrid) {
			this.dayGrid.removeElement();
		}

		this.scroller.destroy();
	},


	// Builds the HTML skeleton for the view.
	// The day-grid and time-grid components will render inside containers defined by this HTML.
	renderSkeletonHtml: function() {
		var theme = this.calendar.theme;

		return '' +
			'<table class="' + theme.getClass('tableGrid') + '">' +
				(this.opt('columnHeader') ?
					'<thead class="fc-head">' +
						'<tr>' +
							'<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
						'</tr>' +
					'</thead>' :
					''
					) +
				'<tbody class="fc-body">' +
					'<tr>' +
						'<td class="' + theme.getClass('widgetContent') + '">' +
							(this.dayGrid ?
								'<div class="fc-day-grid"/>' +
								'<hr class="fc-divider ' + theme.getClass('widgetHeader') + '"/>' :
								''
								) +
						'</td>' +
					'</tr>' +
				'</tbody>' +
			'</table>';
	},


	// Generates an HTML attribute string for setting the width of the axis, if it is known
	axisStyleAttr: function() {
		if (this.axisWidth !== null) {
			 return 'style="width:' + this.axisWidth + 'px"';
		}
		return '';
	},


	/* Now Indicator
	------------------------------------------------------------------------------------------------------------------*/


	getNowIndicatorUnit: function() {
		return this.timeGrid.getNowIndicatorUnit();
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/


	// Adjusts the vertical dimensions of the view to the specified values
	updateSize: function(totalHeight, isAuto, isResize) {
		var eventLimit;
		var scrollerHeight;
		var scrollbarWidths;

		View.prototype.updateSize.apply(this, arguments);

		// make all axis cells line up, and record the width so newly created axis cells will have it
		this.axisWidth = matchCellWidths(this.el.find('.fc-axis'));

		// hack to give the view some height prior to timeGrid's columns being rendered
		// TODO: separate setting height from scroller VS timeGrid.
		if (!this.timeGrid.colEls) {
			if (!isAuto) {
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scroller.setHeight(scrollerHeight);
			}
			return;
		}

		// set of fake row elements that must compensate when scroller has scrollbars
		var noScrollRowEls = this.el.find('.fc-row:not(.fc-scroller *)');

		// reset all dimensions back to the original state
		this.timeGrid.bottomRuleEl.hide(); // .show() will be called later if this <hr> is necessary
		this.scroller.clear(); // sets height to 'auto' and clears overflow
		uncompensateScroll(noScrollRowEls);

		// limit number of events in the all-day area
		if (this.dayGrid) {
			this.dayGrid.removeSegPopover(); // kill the "more" popover if displayed

			eventLimit = this.opt('eventLimit');
			if (eventLimit && typeof eventLimit !== 'number') {
				eventLimit = AGENDA_ALL_DAY_EVENT_LIMIT; // make sure "auto" goes to a real number
			}
			if (eventLimit) {
				this.dayGrid.limitRows(eventLimit);
			}
		}

		if (!isAuto) { // should we force dimensions of the scroll container?

			scrollerHeight = this.computeScrollerHeight(totalHeight);
			this.scroller.setHeight(scrollerHeight);
			scrollbarWidths = this.scroller.getScrollbarWidths();

			if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?

				// make the all-day and header rows lines up
				compensateScroll(noScrollRowEls, scrollbarWidths);

				// the scrollbar compensation might have changed text flow, which might affect height, so recalculate
				// and reapply the desired height to the scroller.
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scroller.setHeight(scrollerHeight);
			}

			// guarantees the same scrollbar widths
			this.scroller.lockOverflow(scrollbarWidths);

			// if there's any space below the slats, show the horizontal rule.
			// this won't cause any new overflow, because lockOverflow already called.
			if (this.timeGrid.getTotalSlatHeight() < scrollerHeight) {
				this.timeGrid.bottomRuleEl.show();
			}
		}
	},


	// given a desired total height of the view, returns what the height of the scroller should be
	computeScrollerHeight: function(totalHeight) {
		return totalHeight -
			subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
	},


	/* Scroll
	------------------------------------------------------------------------------------------------------------------*/


	// Computes the initial pre-configured scroll state prior to allowing the user to change it
	computeInitialDateScroll: function() {
		var scrollTime = moment.duration(this.opt('scrollTime'));
		var top = this.timeGrid.computeTimeTop(scrollTime);

		// zoom can give weird floating-point values. rather scroll a little bit further
		top = Math.ceil(top);

		if (top) {
			top++; // to overcome top border that slots beyond the first have. looks better
		}

		return { top: top };
	},


	queryDateScroll: function() {
		return { top: this.scroller.getScrollTop() };
	},


	applyDateScroll: function(scroll) {
		if (scroll.top !== undefined) {
			this.scroller.setScrollTop(scroll.top);
		}
	},


	/* Hit Areas
	------------------------------------------------------------------------------------------------------------------*/
	// forward all hit-related method calls to the grids (dayGrid might not be defined)


	getHitFootprint: function(hit) {
		// TODO: hit.component is set as a hack to identify where the hit came from
		return hit.component.getHitFootprint(hit);
	},


	getHitEl: function(hit) {
		// TODO: hit.component is set as a hack to identify where the hit came from
		return hit.component.getHitEl(hit);
	},


	/* Event Rendering
	------------------------------------------------------------------------------------------------------------------*/


	executeEventRender: function(eventsPayload) {
		var dayEventsPayload = {};
		var timedEventsPayload = {};
		var id, eventInstanceGroup;

		// separate the events into all-day and timed
		for (id in eventsPayload) {
			eventInstanceGroup = eventsPayload[id];

			if (eventInstanceGroup.getEventDef().isAllDay()) {
				dayEventsPayload[id] = eventInstanceGroup;
			}
			else {
				timedEventsPayload[id] = eventInstanceGroup;
			}
		}

		this.timeGrid.executeEventRender(timedEventsPayload);

		if (this.dayGrid) {
			this.dayGrid.executeEventRender(dayEventsPayload);
		}
	},


	/* Dragging/Resizing Routing
	------------------------------------------------------------------------------------------------------------------*/


	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(eventFootprints, seg, isTouch) {
		var groups = groupEventFootprintsByAllDay(eventFootprints);
		var renderedHelper = false;

		renderedHelper = this.timeGrid.renderDrag(groups.timed, seg, isTouch);

		if (this.dayGrid) {
			renderedHelper = this.dayGrid.renderDrag(groups.allDay, seg, isTouch) || renderedHelper;
		}

		return renderedHelper;
	},


	renderEventResize: function(eventFootprints, seg, isTouch) {
		var groups = groupEventFootprintsByAllDay(eventFootprints);

		this.timeGrid.renderEventResize(groups.timed, seg, isTouch);

		if (this.dayGrid) {
			this.dayGrid.renderEventResize(groups.allDay, seg, isTouch);
		}
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection
	renderSelectionFootprint: function(componentFootprint) {
		if (!componentFootprint.isAllDay) {
			this.timeGrid.renderSelectionFootprint(componentFootprint);
		}
		else if (this.dayGrid) {
			this.dayGrid.renderSelectionFootprint(componentFootprint);
		}
	}

});


// Methods that will customize the rendering behavior of the AgendaView's timeGrid
// TODO: move into TimeGrid
var agendaTimeGridMethods = {


	// Generates the HTML that will go before the day-of week header cells
	renderHeadIntroHtml: function() {
		var view = this.view;
		var calendar = view.calendar;
		var weekStart = calendar.msToUtcMoment(this.dateProfile.renderUnzonedRange.startMs, true);
		var weekText;

		if (this.opt('weekNumbers')) {
			weekText = weekStart.format(this.opt('smallWeekFormat'));

			return '' +
				'<th class="fc-axis fc-week-number ' + calendar.theme.getClass('widgetHeader') + '" ' + view.axisStyleAttr() + '>' +
					view.buildGotoAnchorHtml( // aside from link, important for matchCellWidths
						{ date: weekStart, type: 'week', forceOff: this.colCnt > 1 },
						htmlEscape(weekText) // inner HTML
					) +
				'</th>';
		}
		else {
			return '<th class="fc-axis ' + calendar.theme.getClass('widgetHeader') + '" ' + view.axisStyleAttr() + '></th>';
		}
	},


	// Generates the HTML that goes before the bg of the TimeGrid slot area. Long vertical column.
	renderBgIntroHtml: function() {
		var view = this.view;

		return '<td class="fc-axis ' + view.calendar.theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '></td>';
	},


	// Generates the HTML that goes before all other types of cells.
	// Affects content-skeleton, helper-skeleton, highlight-skeleton for both the time-grid and day-grid.
	renderIntroHtml: function() {
		var view = this.view;

		return '<td class="fc-axis" ' + view.axisStyleAttr() + '></td>';
	}

};


// Methods that will customize the rendering behavior of the AgendaView's dayGrid
var agendaDayGridMethods = {


	// Generates the HTML that goes before the all-day cells
	renderBgIntroHtml: function() {
		var view = this.view;

		return '' +
			'<td class="fc-axis ' + view.calendar.theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '>' +
				'<span>' + // needed for matchCellWidths
					view.getAllDayHtml() +
				'</span>' +
			'</td>';
	},


	// Generates the HTML that goes before all other types of cells.
	// Affects content-skeleton, helper-skeleton, highlight-skeleton for both the time-grid and day-grid.
	renderIntroHtml: function() {
		var view = this.view;

		return '<td class="fc-axis" ' + view.axisStyleAttr() + '></td>';
	}

};


function groupEventFootprintsByAllDay(eventFootprints) {
	var allDay = [];
	var timed = [];
	var i;

	for (i = 0; i < eventFootprints.length; i++) {
		if (eventFootprints[i].componentFootprint.isAllDay) {
			allDay.push(eventFootprints[i]);
		}
		else {
			timed.push(eventFootprints[i]);
		}
	}

	return { allDay: allDay, timed: timed };
}

;;

var AGENDA_ALL_DAY_EVENT_LIMIT = 5;

// potential nice values for the slot-duration and interval-duration
// from largest to smallest
var AGENDA_STOCK_SUB_DURATIONS = [
	{ hours: 1 },
	{ minutes: 30 },
	{ minutes: 15 },
	{ seconds: 30 },
	{ seconds: 15 }
];

fcViews.agenda = {
	'class': AgendaView,
	defaults: {
		allDaySlot: true,
		slotDuration: '00:30:00',
		slotEventOverlap: true // a bad name. confused with overlap/constraint system
	}
};

fcViews.agendaDay = {
	type: 'agenda',
	duration: { days: 1 }
};

fcViews.agendaWeek = {
	type: 'agenda',
	duration: { weeks: 1 }
};
;;

/*
Responsible for the scroller, and forwarding event-related actions into the "grid".
*/
var ListView = FC.ListView = View.extend({

	segSelector: '.fc-list-item', // which elements accept event actions
	//eventRendererClass is below
	//eventPointingClass is below

	scroller: null,
	contentEl: null,

	dayDates: null, // localized ambig-time moment array
	dayRanges: null, // UnzonedRange[], of start-end of each day


	constructor: function() {
		View.apply(this, arguments);

		this.scroller = new Scroller({
			overflowX: 'hidden',
			overflowY: 'auto'
		});
	},


	renderSkeleton: function() {
		this.el.addClass(
			'fc-list-view ' +
			this.calendar.theme.getClass('listView')
		);

		this.scroller.render();
		this.scroller.el.appendTo(this.el);

		this.contentEl = this.scroller.scrollEl; // shortcut
	},


	unrenderSkeleton: function() {
		this.scroller.destroy(); // will remove the Grid too
	},


	updateSize: function(totalHeight, isAuto, isResize) {
		this.scroller.setHeight(this.computeScrollerHeight(totalHeight));
	},


	computeScrollerHeight: function(totalHeight) {
		return totalHeight -
			subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
	},


	renderDates: function(dateProfile) {
		var calendar = this.calendar;
		var dayStart = calendar.msToUtcMoment(dateProfile.renderUnzonedRange.startMs, true);
		var viewEnd = calendar.msToUtcMoment(dateProfile.renderUnzonedRange.endMs, true);
		var dayDates = [];
		var dayRanges = [];

		while (dayStart < viewEnd) {

			dayDates.push(dayStart.clone());

			dayRanges.push(new UnzonedRange(
				dayStart,
				dayStart.clone().add(1, 'day')
			));

			dayStart.add(1, 'day');
		}

		this.dayDates = dayDates;
		this.dayRanges = dayRanges;

		// all real rendering happens in EventRenderer
	},


	// slices by day
	componentFootprintToSegs: function(footprint) {
		var dayRanges = this.dayRanges;
		var dayIndex;
		var segRange;
		var seg;
		var segs = [];

		for (dayIndex = 0; dayIndex < dayRanges.length; dayIndex++) {
			segRange = footprint.unzonedRange.intersect(dayRanges[dayIndex]);

			if (segRange) {
				seg = {
					startMs: segRange.startMs,
					endMs: segRange.endMs,
					isStart: segRange.isStart,
					isEnd: segRange.isEnd,
					dayIndex: dayIndex
				};

				segs.push(seg);

				// detect when footprint won't go fully into the next day,
				// and mutate the latest seg to the be the end.
				if (
					!seg.isEnd && !footprint.isAllDay &&
					dayIndex + 1 < dayRanges.length &&
					footprint.unzonedRange.endMs < dayRanges[dayIndex + 1].startMs + this.nextDayThreshold
				) {
					seg.endMs = footprint.unzonedRange.endMs;
					seg.isEnd = true;
					break;
				}
			}
		}

		return segs;
	},


	eventRendererClass: EventRenderer.extend({


		renderFgSegs: function(segs) {
			if (!segs.length) {
				this.component.renderEmptyMessage();
			}
			else {
				this.component.renderSegList(segs);
			}
		},


		// generates the HTML for a single event row
		fgSegHtml: function(seg) {
			var view = this.view;
			var calendar = view.calendar;
			var theme = calendar.theme;
			var eventFootprint = seg.footprint;
			var eventDef = eventFootprint.eventDef;
			var componentFootprint = eventFootprint.componentFootprint;
			var url = eventDef.url;
			var classes = [ 'fc-list-item' ].concat(this.getClasses(eventDef));
			var bgColor = this.getBgColor(eventDef);
			var timeHtml;

			if (componentFootprint.isAllDay) {
				timeHtml = view.getAllDayHtml();
			}
			// if the event appears to span more than one day
			else if (view.isMultiDayRange(componentFootprint.unzonedRange)) {
				if (seg.isStart || seg.isEnd) { // outer segment that probably lasts part of the day
					timeHtml = htmlEscape(this._getTimeText(
						calendar.msToMoment(seg.startMs),
						calendar.msToMoment(seg.endMs),
						componentFootprint.isAllDay
					));
				}
				else { // inner segment that lasts the whole day
					timeHtml = view.getAllDayHtml();
				}
			}
			else {
				// Display the normal time text for the *event's* times
				timeHtml = htmlEscape(this.getTimeText(eventFootprint));
			}

			if (url) {
				classes.push('fc-has-url');
			}

			return '<tr class="' + classes.join(' ') + '">' +
				(this.displayEventTime ?
					'<td class="fc-list-item-time ' + theme.getClass('widgetContent') + '">' +
						(timeHtml || '') +
					'</td>' :
					'') +
				'<td class="fc-list-item-marker ' + theme.getClass('widgetContent') + '">' +
					'<span class="fc-event-dot"' +
					(bgColor ?
						' style="background-color:' + bgColor + '"' :
						'') +
					'></span>' +
				'</td>' +
				'<td class="fc-list-item-title ' + theme.getClass('widgetContent') + '">' +
					'<a' + (url ? ' href="' + htmlEscape(url) + '"' : '') + '>' +
						htmlEscape(eventDef.title || '') +
					'</a>' +
				'</td>' +
			'</tr>';
		},


		// like "4:00am"
		computeEventTimeFormat: function() {
			return this.opt('mediumTimeFormat');
		}

	}),


	eventPointingClass: EventPointing.extend({

		// for events with a url, the whole <tr> should be clickable,
		// but it's impossible to wrap with an <a> tag. simulate this.
		handleClick: function(seg, ev) {
			var url;

			EventPointing.prototype.handleClick.apply(this, arguments); // super. might prevent the default action

			// not clicking on or within an <a> with an href
			if (!$(ev.target).closest('a[href]').length) {
				url = seg.footprint.eventDef.url;

				if (url && !ev.isDefaultPrevented()) { // jsEvent not cancelled in handler
					window.location.href = url; // simulate link click
				}
			}
		}

	}),


	renderEmptyMessage: function() {
		this.contentEl.html(
			'<div class="fc-list-empty-wrap2">' + // TODO: try less wraps
			'<div class="fc-list-empty-wrap1">' +
			'<div class="fc-list-empty">' +
				htmlEscape(this.opt('noEventsMessage')) +
			'</div>' +
			'</div>' +
			'</div>'
		);
	},


	// render the event segments in the view
	renderSegList: function(allSegs) {
		var segsByDay = this.groupSegsByDay(allSegs); // sparse array
		var dayIndex;
		var daySegs;
		var i;
		var tableEl = $('<table class="fc-list-table ' + this.calendar.theme.getClass('tableList') + '"><tbody/></table>');
		var tbodyEl = tableEl.find('tbody');

		for (dayIndex = 0; dayIndex < segsByDay.length; dayIndex++) {
			daySegs = segsByDay[dayIndex];

			if (daySegs) { // sparse array, so might be undefined

				// append a day header
				tbodyEl.append(this.dayHeaderHtml(this.dayDates[dayIndex]));

				this.eventRenderer.sortEventSegs(daySegs);

				for (i = 0; i < daySegs.length; i++) {
					tbodyEl.append(daySegs[i].el); // append event row
				}
			}
		}

		this.contentEl.empty().append(tableEl);
	},


	// Returns a sparse array of arrays, segs grouped by their dayIndex
	groupSegsByDay: function(segs) {
		var segsByDay = []; // sparse array
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			(segsByDay[seg.dayIndex] || (segsByDay[seg.dayIndex] = []))
				.push(seg);
		}

		return segsByDay;
	},


	// generates the HTML for the day headers that live amongst the event rows
	dayHeaderHtml: function(dayDate) {
		var mainFormat = this.opt('listDayFormat');
		var altFormat = this.opt('listDayAltFormat');

		return '<tr class="fc-list-heading" data-date="' + dayDate.format('YYYY-MM-DD') + '">' +
			'<td class="' + this.calendar.theme.getClass('widgetHeader') + '" colspan="3">' +
				(mainFormat ?
					this.buildGotoAnchorHtml(
						dayDate,
						{ 'class': 'fc-list-heading-main' },
						htmlEscape(dayDate.format(mainFormat)) // inner HTML
					) :
					'') +
				(altFormat ?
					this.buildGotoAnchorHtml(
						dayDate,
						{ 'class': 'fc-list-heading-alt' },
						htmlEscape(dayDate.format(altFormat)) // inner HTML
					) :
					'') +
			'</td>' +
		'</tr>';
	}

});

;;

fcViews.list = {
	'class': ListView,
	buttonTextKey: 'list', // what to lookup in locale files
	defaults: {
		buttonText: 'list', // text to display for English
		listDayFormat: 'LL', // like "January 1, 2016"
		noEventsMessage: 'No events to display'
	}
};

fcViews.listDay = {
	type: 'list',
	duration: { days: 1 },
	defaults: {
		listDayFormat: 'dddd' // day-of-week is all we need. full date is probably in header
	}
};

fcViews.listWeek = {
	type: 'list',
	duration: { weeks: 1 },
	defaults: {
		listDayFormat: 'dddd', // day-of-week is more important
		listDayAltFormat: 'LL'
	}
};

fcViews.listMonth = {
	type: 'list',
	duration: { month: 1 },
	defaults: {
		listDayAltFormat: 'dddd' // day-of-week is nice-to-have
	}
};

fcViews.listYear = {
	type: 'list',
	duration: { year: 1 },
	defaults: {
		listDayAltFormat: 'dddd' // day-of-week is nice-to-have
	}
};

;;

return FC; // export for Node/CommonJS
});

/***/ }),
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(236);

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);
var bind = __webpack_require__(68);
var Axios = __webpack_require__(238);
var defaults = __webpack_require__(37);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(65);
axios.CancelToken = __webpack_require__(237);
axios.isCancel = __webpack_require__(66);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(252);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(65);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(37);
var utils = __webpack_require__(8);
var InterceptorManager = __webpack_require__(239);
var dispatchRequest = __webpack_require__(240);
var isAbsoluteURL = __webpack_require__(248);
var combineURLs = __webpack_require__(246);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);
var transformData = __webpack_require__(243);
var isCancel = __webpack_require__(66);
var defaults = __webpack_require__(37);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(67);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dataContext = __webpack_require__(255);

var _dataContext2 = _interopRequireDefault(_dataContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Here we define the frequently accessed core classes of boilerplatejs. We are creating a object
  * that carry these classes as properties of it. This object is then used as a namespace when 
  * accessing the core classes. This is a trick we use to aggregate classes under namespaces 
  * since javascript has no formal way of grouping functions in to namespace.
 
* Here you will notice we are not returning a function from this AMD module. We are returning a 
* plain javascript object with its properties holding references to core classes (functions).
* We use 'require' function from requirejs inside the object to load appropriate core classes
* from the respective AMD modules.
	
@namespace Boiler
@module BoilerCoreClasses
@main BoilerCoreClasses
**/

exports.default = {
    Context: __webpack_require__(254),
    DomController: __webpack_require__(256),
    UrlController: __webpack_require__(263),
    ViewTemplate: __webpack_require__(264),
    Helpers: __webpack_require__(27),
    dataContext: _dataContext2.default
};

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	var Helpers = __webpack_require__(27); //helpers namespace


	/**
   Context is one of the most important classes in boilerplate. This represents a sandboxed environment
   for writing group of functionalities. Contexts can be nested to create hierarchies for complex 
   implementations. 
   For example, 
   - a product suit may have multiple products, 
   - and a product may have multiple modules,
   - and a module may have multiple submodules.
   It is possible to create such hierarchies by nesting contexts. Context can provide several 
   important services such as 'settings store', 'pub-sub event infrastructure', 'logging', etc.
 	  @namespace Boiler
   @module BoilerCoreClasses
   @class Context
   @constructor
   @param {Object} parentContext reference to a parent context    
  **/
	var Context = function Context(parentContext) {
		this.parentContext = parentContext;
		this.mediator = this.parentContext ? this.parentContext.mediator : new Helpers.Mediator();
		this.settings = this.parentContext ? new Helpers.Settings(this.parentContext.settings) : new Helpers.Settings();
	};

	/**
  * This is the method used to get settings from the context. This will return an object that has 
  * settings as object properties. Consumers can simply use the settings' property keys 
  * to retrieve values. For example, context.getSettings().base-server-url will look for a 
  * setting object defined under the 'base-server-url' property.
  *
  * If context is a part of a context hierarchy, the settings object returned will contain 
  * settings of all parent contexts. Settings from child contexts will override settings from 
  * parent contexts, if same key exists.
  *
  * To improve performance, it is a good practice to store the returned object and reduce the 
  * number of calls to this method.
 	 @method getSettings
  @return {Object} settings
  **/
	Context.prototype.getSettings = function () {
		return this.settings.items();
	};

	/**
  * One can pass an object containing settings as properties in it. If the existing
  * settings contain a properties with same key, those will be replaced.
 	 @method addSettings
  @param {Object} newSettings object containing settings as properties in it
  **/
	Context.prototype.addSettings = function (newSettings) {
		this.settings.load(newSettings);
	};

	/**
  * This is the method to raise an event in the context. All subscribers in the same context hierarchy
  * will be notified. The first parameter is the event name as a string, and the next parameter is the 
  * event data as a object.
 	 @method notify
  @param {String} event Event name
  @param {Object} params Event data
  **/
	Context.prototype.notify = function (event, params) {
		this.mediator.notify(event, params);
	};

	/**
  * The method for subscribing to receive events. first parameter is the name of the event you wish
  * to receive. Next, is the callback function to invoke when the event has occurred. The callback  
  * function may have a parameter in case it is interesting to receive the event data as well.
 	 @method listen
  @param {String} event Event name
  @param {Object} fn Callback function
  **/
	Context.prototype.listen = function (event, fn) {
		this.mediator.listen(event, fn);
	};

	/**
  * Set the language for the whole system. Will cause the page to refresh 
 	 @method setLanguage
  @param {String} lang
  @return {Object} object
  **/
	Context.prototype.setLanguage = function (lang) {
		return Helpers.Localizer.setLanguage(lang);
	};

	/**
  * Clear any language settings stored. Falls back to browser language detection 
 	 @method clearLanguage
  @return {Object} object
  **/
	Context.prototype.clearLanguage = function () {
		return Helpers.Localizer.clearLanguage();
	};

	/**
  * If someone is interested in obtaining the parent context, this method could be used. But it is not a
  * good practice to work directly on contexts other than your immediate. Instead use events to communicate.
 	 @method getParentContext
  @return {Object} parentContext Parent context object
  **/
	Context.prototype.getParentContext = function () {
		return this.parentContext;
	};

	//now we have built our Context class with methods. Lets return it so that callers may instantiate.
	return Context;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = __webpack_require__(62);

var _socket2 = _interopRequireDefault(_socket);

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(63);

var _vuex2 = _interopRequireDefault(_vuex);

var _momentTimezone = __webpack_require__(25);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _axios = __webpack_require__(235);

var axios = _interopRequireWildcard(_axios);

var _toastr = __webpack_require__(389);

var Toastr = _interopRequireWildcard(_toastr);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

_vue2.default.use(_vuex2.default);

//set users timezone like this
//      moment.tz.setDefault("America/New_York");
_momentTimezone2.default.tz.setDefault(_momentTimezone2.default.tz.guess());

Toastr.options.positionClass = "toast-bottom-right";

var apiIp = window.location.protocol + "//" + window.location.hostname + ":1339"; // "/dev/socket.io/";

var socket = (0, _socket2.default)(apiIp);
//let socket = io('http://192.168.1.9:1337');


socket.on('connect', function () {
    console.log("connected...!");
});

socket.on('NotificationReceived', function (response) {
    console.log(response);
    /*
    store.commit("setDataByType", Object.assign({}, { NotificationIdText: response["NotificationId"] }, {
        data: {
            status: "success",
            err: "",
            response: response
        }
    })); */

    store.dispatch("getNotificationKeys", { "params": {} });
});

var _dataRequestHandler = function _dataRequestHandler(key, params, callback) {

    var continueTheCall = function continueTheCall(key, params, callback) {
        socket.emit(key, params, function (err, response) {
            if (err && err.message === "Session Expired") window.location.href = "login.html";else {
                if (params.updateToken) {
                    window.localStorage.setItem('rttoken', response["token"]);
                }
                callback(err, response);
                $(".mainBody").css("display", "");
            }
        });
    };

    params.systemParams = {
        token: window.localStorage.getItem('rttoken'),
        Source: "Web",
        SourceId: window.location.hostname
    };

    continueTheCall(key, params, callback);
};

var apiHttpRequest = function apiHttpRequest(apiUrl, type, params, successCallback, failureCallback) {
    var url = apiIp + "/" + apiUrl;
    axios.post(url, params).then(function (response) {
        if (successCallback) successCallback(response);
    }).catch(function (error) {
        if (failureCallback) failureCallback(error);
    });
};

var downloadExcelFile = function downloadExcelFile(fileName, module) {
    var BASE_URL = window.location.protocol + "//" + window.location.hostname + ":1338";
    var url = BASE_URL + "/Excel";

    var form = $('<form/>', { action: url, method: 'POST' }).appendTo('body');
    form.append("<input type='hidden' name='fileName' value='" + fileName + "' />");
    form.append("<input type='hidden' name='module' value='" + module + "' />");
    form.append("<input type='hidden' name='token' value='" + window.localStorage.getItem('vwtoken') + "' />");
    form.submit();
};

var store = new _vuex2.default.Store({
    state: {
        isCurrentUserAdmin: false,
        uiPageName: "indexdev.html",
        selectedUserDetail: null,
        notification: {},
        notificationList: {},
        userGroupInstanceId: null,
        selectedMenuId: null,
        menuInstanceId: null,
        parentMenuInstanceId: null,
        defaultSessionCount: -2, //adding two default sessions
        selectedNotificationDetail: null,
        dashboardRouterContext: null,
        rowsPerPage: 10,
        sendApiRequest: apiHttpRequest,
        downloadExcelFile: downloadExcelFile
    },
    mutations: {
        setIsCurrentUserAdmin: function setIsCurrentUserAdmin(state, isCurrentUserAdmin) {
            state.isCurrentUserAdmin = isCurrentUserAdmin;
        },
        setUIPageName: function setUIPageName(state, text) {
            state.uiPageName = text;
        },
        setSelectedUserDetail: function setSelectedUserDetail(state, payload) {
            state.selectedUserDetail = payload;
        },
        setLeaveRouterContext: function setLeaveRouterContext(state, payload) {
            state.leaveRouterContext = payload;
        },
        setUserGroupInstanceId: function setUserGroupInstanceId(state, payload) {
            state.userGroupInstanceId = payload;
        },
        setMenuInstanceId: function setMenuInstanceId(state, payload) {
            state.menuInstanceId = payload;
        },
        setParentMenuInstanceId: function setParentMenuInstanceId(state, payload) {
            state.parentMenuInstanceId = payload;
        },
        setSelectedMenuId: function setSelectedMenuId(state, payload) {
            state.selectedMenuId = payload;
        },
        setSelectedNotifcationDetail: function setSelectedNotifcationDetail(state, payload) {
            state.selectedNotificationDetail = payload;
        },
        setDashboardRouterContext: function setDashboardRouterContext(state, payload) {
            state.dashboardRouterContext = payload;
        },
        setDataByType: function setDataByType(state, payload) {
            // if (state.hasOwnProperty("notification")) {
            _vue2.default.set(state["notification"], payload.NotificationIdText, payload.data);
            // }
        },
        setNotifications: function setNotifications(state, payload) {
            // if (state.hasOwnProperty("notification")) {
            _vue2.default.set(state["notificationList"], "0", payload.data);
            // }
        }
    },
    actions: {
        dataRequestHandler: function dataRequestHandler(_ref, payload) {
            _objectDestructuringEmpty(_ref);

            // A wrapper for calling server directly from Vue Components
            _dataRequestHandler(payload.key, payload.params, payload.callback);
        },
        toastr: function toastr(_ref2, payload) {
            _objectDestructuringEmpty(_ref2);

            if (payload.type && payload.header && payload.message) {
                Toastr[payload.type](payload.message, payload.header);
            } else if (payload.type && payload.message) {
                Toastr[payload.type](payload.message);
            }
        },
        getNotificationDetail: function getNotificationDetail(_ref3, payload) {
            var commit = _ref3.commit,
                state = _ref3.state;


            if (state["notification"] && !state["notification"].hasOwnProperty(payload.params.notificationId)) {
                commit("setDataByType", Object.assign({}, { NotificationIdText: payload.params.notificationId }, {
                    data: {
                        status: "loading",
                        err: "",
                        response: null
                    }
                }));

                _dataRequestHandler("GetNotificationDetail", payload.params, function (err, response) {
                    if (err) {
                        commit("setDataByType", Object.assign({}, { NotificationIdText: payload.params.notificationId }, {
                            data: {
                                status: "error",
                                err: err,
                                response: null
                            }
                        }));
                        return;
                    }

                    commit("setDataByType", Object.assign({}, { NotificationIdText: payload.params.notificationId }, {
                        data: {
                            status: "success",
                            err: "",
                            response: response[0]
                        }
                    }));
                });
            }
        },
        getNotificationKeys: function getNotificationKeys(_ref4, payload) {
            var commit = _ref4.commit,
                state = _ref4.state;


            if (state["notificationList"] && !state["notificationList"].hasOwnProperty("0")) {
                commit("setDataByType", Object.assign({}, {}, {
                    data: {
                        status: "loading",
                        err: "",
                        response: null
                    }
                }));
            }

            _dataRequestHandler("GetNotificationList", payload.params, function (err, response) {
                if (err) {
                    commit("setNotifications", Object.assign({}, {}, {
                        data: {
                            status: "error",
                            err: err,
                            response: null
                        }
                    }));
                    return;
                }

                commit("setNotifications", Object.assign({}, {}, {
                    data: {
                        status: "success",
                        err: "",
                        response: response[0]
                    }
                }));
            });
        }
    },
    getters: {
        getNotificationDetail: function getNotificationDetail(state, getters) {
            return function (query) {
                if (state["notification"] && state["notification"].hasOwnProperty(query.params.notificationId)) {
                    return state["notification"][query.params.notificationId];
                }
                return null;
            };
        },
        getNotificationKeys: function getNotificationKeys(state, getters) {
            return function (query) {
                if (state["notificationList"] && state["notificationList"].hasOwnProperty("0")) {
                    return state["notificationList"]["0"];
                }
                return null;
            };
        }
    }
});

exports.default = {
    uiPageName: function () {
        if (window.location.href.toLowerCase().indexOf("indexdev.html") > -1) {
            // store.commit("setUIPageName", "indexdev.html");
            return "indexdev.html";
        } else {
            // store.commit("setUIPageName", "index.html");
            return "index.html";
        }
    }(),

    store: store,

    dataRequestHandler: _dataRequestHandler
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
    var $ = __webpack_require__(3);
    var _ = __webpack_require__(21);

    /**
    DOM controller is used when it is required to add certain elements to the DOM when there is a url change
     
    @namespace Boiler
    	@module BoilerCoreClasses
    @class DomController
    @constructor
    @param scope {Object} the jQuery element within which the routes get applied 
    */
    var DomController = function DomController(scope) {

        var self = this;
        self.handles = {};

        return {
            /**
            Add routes
            @method addRoutes		
            @param {Object} newHandles
            **/
            addRoutes: function addRoutes(newHandles) {
                _.extend(self.handles, newHandles);
            },
            /**
            Start the DOM controller
            	@method start
            **/
            start: function start() {
                for (var path in self.handles) {
                    if (self.handles.hasOwnProperty(path)) {
                        scope.find(path).each(function (index) {
                            var paramString = $(this).attr("params");
                            var params = paramString ? eval("({" + paramString + "})") : {};

                            //ask other handlers on this component to deactivate
                            $(this).trigger('DEACTIVATE_HANDLERS');

                            //bind the current handler for deactivation events
                            $(this).bind('DEACTIVATE_HANDLERS', function () {
                                (function (handler) {
                                    handler.deactivate();
                                })(self.handles[path]);
                            });
                            //activate the current handler
                            self.handles[path].activate($(this), params);
                        });
                    }
                }
            }
        };
    };

    return DomController;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _ = __webpack_require__(21);
//if user has saved the language preference before, lets use that to configure requirejs i18n
var userLang = localStorage.getItem("user-language");
if (userLang) {
    //hack: we do this outside the define block below to avoid requirejs error
    //require.config({
    //    locale : userLang
    //});
}

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

    /**
     Localizer is used to handle the localization aspects by providing the functions
     required for setting a different language and resetting the user language settings to the defaults.
     @namespace Boiler.Helpers
     @module BoilerCoreClasses
     @class Localizer
     @static
     **/
    var Localizer = function Localizer() {};

    /**
     Helper function to keep the global value of _.templateSettings, applies the settings that parses
     {{nls.your_tag_name}} and restore the underscore's original settings.
     @method template
     @static
     @param text {String}  string that need to be localized. Tags should be in the form {{nls.your_tag_name}}
     @return {String} localized text
     **/
    function template(text) {
        var orig_settings = _.templateSettings;
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };

        var compiled = _.template(text);
        _.templateSettings = orig_settings;
        return compiled;
    }

    /**
     Apply localization to the given text. The text should contain tags such as {{nls.your_tag_name}} that will be
     replaced by the 'your_tag_name' property in the nlsObject.
     @method localize
     @static
     @param text {String}  string that need to be localized. Tags should be in the form {{nls.your_tag_name}}
     @param nlsObject {Object}  contains localization properties
     @return {String} localized text
     **/
    Localizer.localize = function (text, nlsObject) {
        if (!nlsObject) {
            return text;
        }

        var compiled = template(text);
        return compiled({
            nls: nlsObject
        });
    };

    /**
     Sets the language to the provided locale. This will store the locale information in LocalStore
     and do a page refresh. Please note this will result in a location.refresh() call.
     @method setLanguage
     @static
     @param locale {String} locale string to which locale should be set
     **/
    Localizer.setLanguage = function (locale) {
        localStorage.setItem("user-language", locale);
        location.reload();
    };

    /**
     Reset the locally stored language settings. This will let to pich browser
     locale to be in effect the next time user access the application
      @method clearLanguage
     @static
     **/
    Localizer.clearLanguage = function () {
        localStorage.removeItem("user-language");
        location.reload();
    };

    return Localizer;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

    /**
     Logger is used when we want to log something (some information or error) on the server side as it can be referred later
      @namespace Boiler.Helpers
     @module BoilerCoreClasses
     @class Logger
     @constructor
     **/
    var Logger = function Logger() {
        /**
         Print the input string message on the console as a log
          @method info
         @param {String} msg
         **/
        this.info = function (msg) {
            if (console) {
                console.log(msg);
            }
        };
        /**
         Print the input string message as a console log and error as a console error
          @method error
         @param {String} msg
         @param {String} error
         **/
        this.error = function (msg, error) {
            if (console) {
                console.log("ERROR : " + msg);
                console.error(error);
            }
        };
    };

    return Logger;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

    /**
     Mediator is used for handling the messaging inside the framework
      @namespace Boiler.Helpers
     @module BoilerCoreClasses
     @class Mediator
     @constructor
     **/
    var Mediator = function Mediator() {
        /**
         @private
         @property {Object} 'pubsub' Holds an instance of PubSub
         **/
        var pubsub = __webpack_require__(61);
        return {
            /**
             Notify others on an occurrence of an event by setting up a publish point with a string
              @method notify
              @param {String} event Event to publish
             @param {Array} params
             **/
            notify: function notify(event, params) {
                pubsub.publish(event, params);
            },
            /**
             listen to the events published by others by registering a callback on a named event
              @method listen
              @param {String} event Event to subscribe the callback function
             @param {Function} fn Callback function
             **/
            listen: function listen(event, fn) {
                pubsub.subscribe(event, fn);
            }
        };
    };

    return Mediator;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

    var crossroads = __webpack_require__(59);
    var hasher = __webpack_require__(60);

    /**
     Router is used to handle url navigation by setting up routes and hash codes
      @namespace Boiler.Helpers
     @module BoilerCoreClasses
     @class Router
     @constructor
     **/
    var Router = function Router() {
        /**
         @private
         @property {Object} 'router' Holds an instance of crossroads router
         **/
        var router = crossroads.create();
        router.normalizeFn = crossroads.NORM_AS_OBJECT;

        return {
            /**
             Creates a new route pattern and add it to crossroads routes collection
              @method addRoute
              @param {String} pattern String pattern that should be used to match against requests
             @param {Function} handler Function that should be executed when a request matches the route pattern
             **/
            addRoute: function addRoute(pattern, handler, rules) {
                var newRoute = router.addRoute(pattern, handler);
                if (rules) {
                    newRoute.rules = rules;
                }
            },
            /**
             Initializes the router by parsing initial hash, parsing hash changes and initializing the hasher
              @method init
             **/
            init: function init() {

                function parseHash(newHash, oldHash) {
                    router.parse(newHash);
                }

                hasher.initialized.add(parseHash); // parse initial hash
                hasher.changed.add(parseHash); // parse hash changes

                if (!hasher.isActive()) {
                    hasher.init(); // start listening for history change
                }
            }

        };
    };
    /**
     Set the hash code to the url
      @method routeTo
      @param {String} path Hash code to update the url
     **/
    Router.routeTo = function (path) {
        hasher.setHash(path);
    };

    return Router;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
    var _ = __webpack_require__(21);

    /**
     Settings class
      @namespace Boiler.Helpers
     @module BoilerCoreClasses
     @class Settings
     @constructor
     **/
    var Settings = function Settings(parentSettings) {
        /**
         @private
         @property {Boolean} 'isSettingsChained' State whether or not the settings has been chained
         **/
        var isSettingsChained = true;
        /**
         @private
         @property {Array} 'localSettings' Holds an array of the local settings
         **/
        var localSettings = {};

        return {
            /**
             Extends the local settings with the new settings
              @method load
             @param {Object} newSettings Object containing the new settings
             **/
            load: function load(newSettings) {
                _.extend(localSettings, newSettings);
            },
            /**
             Returns the local settings
              @method items
             @return {Object} localSettings
             **/
            items: function items() {
                if (isSettingsChained && parentSettings) {
                    return _.extend(_.clone(parentSettings.items()), localSettings);
                }
                return localSettings;
            },
            /**
             Set the state of the settings chaining
              @method chainSettings
             @param {Boolean} isChained
             **/
            chainSettings: function chainSettings(isChained) {
                isSettingsChained = isChained;
            }
        };
    };

    return Settings;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
    var $ = __webpack_require__(3);

    var createCssLink = function createCssLink(href) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = href;
        document.getElementsByTagName("head")[0].appendChild(link);
    };
    /**
     Styler is used to attach css style sheets to the DOM (Document Object Model) and to attach css text to existing style sheets
      @namespace Boiler.Helpers
     @module BoilerCoreClasses
     @class Styler
     @constructor
     **/
    var Styler = function Styler() {};
    /**
     Attach a css link to the DOM
      @method attachCssLink
     @param {Object} css
     @param {Object} elementId Element ID
     **/
    Styler.attachCssLink = function (href, elementId) {
        if (elementId) {
            var link = document.getElementById(elementId);
            if (!link) {
                createCssLink(href);
            } else {
                link.href = href;
            }
        } else {
            var links = document.getElementsByTagName('link');
            for (var i = 0; i < links.length; i++) {
                if (links[i].href && links[i].href.indexOf(href) !== -1) {
                    //If we have already added this link, just ignore and return
                    return;
                }
            }
            createCssLink(href);
        }
    };
    /**
     Attach css text to an existing style sheet
      @method attachCssText
     @param {Object} elementId Element ID
     @param {Object} css
     **/
    Styler.attachCssText = function (elementId, css) {

        var elem = document.getElementById(elementId);
        if (elem) {
            elem.parentNode.removeChild(elem);
        }

        var style = document.createElement('style');
        style.type = 'text/css';
        style.setAttribute("id", elementId);

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    };

    Styler.attachScopedCss = function (parent, styleText) {
        if (styleText) {
            styleElement = $("<style type='text/css' scoped='scoped'>" + styleText + "</style>");
            parent.prepend(styleElement);
        }
    };

    return Styler;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	var jQuery = __webpack_require__(3);
	var Helpers = __webpack_require__(27); //helpers namespace

	/**
   URL controller is used to trigger events when there is a url change
 	  @namespace Boiler
   @module BoilerCoreClasses
   @class UrlController
   @uses This class uses helpers as a dependency
   @constructor
   @param scope {Object} jQuery element to which the routed components get attached to
  **/
	var UrlController = function UrlController(scope) {

		var allHandles = {};
		var router = new Helpers.Router();

		/*
   * Listen to the DOM events of parent element of this controller
   * to get any deactivation calls. Upon deactivation call we will ask
   * all components on this parent element to deactivate them.
   */
		scope.bind('DEACTIVATE_HANDLERS', function () {
			for (var handler in allHandles) {
				if (allHandles.hasOwnProperty(handler)) {
					allHandles[handler].deactivate();
				}
			}
		});

		/**
   * Wrapper for handles. This allows us to intercept activation calls so
   * that we are able to execute custom logic such as deactivation of
   * other handles.
  	 @method Wrapper
   @private
   @param {Object} handle route-handler class
   **/
		function Wrapper(handle) {

			this.handle = handle;

			var selfWrapper = this;
			this.activate = function (vals) {
				// deactivate all active handles in current controller
				scope.trigger('DEACTIVATE_HANDLERS');
				// activate the requested handler
				selfWrapper.handle.activate(scope, vals);
			};

			this.deactivate = function () {

				if (jQuery.isFunction(selfWrapper.handle.deactivate)) {
					selfWrapper.handle.deactivate();
				}
			};
		}

		return {
			/**
     Create handler objects from each route handler using the 'Wrapper' method and add the activated handler object to the router as routes
   	  @method addRoutes
     @param {Array} handles route-handler object array
    **/
			addRoutes: function addRoutes(handles) {
				for (var path in handles) {
					if (handles.hasOwnProperty(path)) {
						var handlerObj = new Wrapper(handles[path].component);
						router.addRoute(path, handlerObj.activate, handles[path].routeRules);
						allHandles[path] = handlerObj;
					}
				}
			},

			/**
     Start the url controller by initializing the router
   	  @method start
    **/
			start: function start() {
				router.init();
			}
		};
	};

	/**
   Adds a new path to the router
 	  @method goTo
   @param {String} newPath New path
  **/
	UrlController.goTo = function (newPath) {
		Helpers.Router.routeTo(newPath);
	};

	return UrlController;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	var $ = __webpack_require__(3);
	var _ = __webpack_require__(21);
	var Helpers = __webpack_require__(27); //helpers namespace

	/**
   ui-panel class
 	  @namespace Boiler
   @module BoilerCoreClasses
   @class Panel
   @constructor
   @param {Object} viewTemplate
   @param {Object} parentEl
   @param {Object} nls
   @param {object} styleText
  **/
	var ViewTemplate = function ViewTemplate(parent, viewTemplate, nls, styleText) {
		this.createView(parent, viewTemplate, nls, styleText);
	};

	/**
   Create a style tag on the head and attach the given text in to it as CSS.
   If a style tag exists with the given styleId, CSS text will be replaced.
 	  @method setStyleText
   @param styleId {String} uniqueId for the style tag
   @param styleText {String} CSS text as a string
  **/
	ViewTemplate.setStyleText = function (styleId, styleText) {
		Helpers.Styler.attachCssText(styleId, styleText);
	};

	/**
   Create a css link tag on the head with the reference to the given href.
   If a link tag exists with the given linkId, href will be replaced.
 	  @method setStyleLink
   @param href {String} URL to the CSS file
   @param linkId {String} uniqueId for the link tag
  **/
	ViewTemplate.setStyleLink = function (href, linkId) {
		Helpers.Styler.attachCssLink(href, linkId);
	};

	/**
   Returns the view id
 	  @method getElementId
   @return viewId
  **/
	ViewTemplate.prototype.getElementId = function () {
		return this.viewId;
	};

	/**
   Returns the jQuery element of this component
 	  @method getJqueryElement
   @return viewId
  **/
	ViewTemplate.prototype.getJQueryElement = function () {
		return this.jQueryElement;
	};

	/**
   Returns the DOM element
 	  @method getDomElement
   @return viewId
  **/
	ViewTemplate.prototype.getDomElement = function () {
		return this.jQueryElement.get(0);
	};

	ViewTemplate.prototype.appendTo = function (parent) {
		this.jQueryElement.appendTo(parent);
	};

	/**
   Detach theDOM element of this component from the DOM tree
 	  @method dispose
  **/
	ViewTemplate.prototype.remove = function () {
		this.jQueryElement.remove();
	};

	ViewTemplate.prototype.hide = function () {
		this.jQueryElement.hide();
	};

	ViewTemplate.prototype.show = function () {
		this.jQueryElement.show();
	};

	/**
   Creates a view
 	  @method createView
   @param viewText
   @param parentElement
   @param nls
   @param styleText
   @return childId
  **/
	ViewTemplate.prototype.createView = function (parentElement, viewText, nls, styleText) {
		//apply localization on the template
		viewText = Helpers.Localizer.localize(viewText, nls);

		// create a random id for the child and create a new element
		this.viewId = _.uniqueId(['bpjscontainer_']);
		this.jQueryElement = $("<span id='" + this.viewId + "'>" + viewText + "</span>");
		Helpers.Styler.attachScopedCss(this.jQueryElement, styleText);

		//if parent is specified, lets attach the element to parent
		if (parentElement) {
			parentElement.append(this.jQueryElement);
		}
	};

	return ViewTemplate;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _landingPage = __webpack_require__(267);

var _landingPage2 = _interopRequireDefault(_landingPage);

var _headerComponent = __webpack_require__(266);

var _headerComponent2 = _interopRequireDefault(_headerComponent);

var _leftMenuComponent = __webpack_require__(268);

var _leftMenuComponent2 = _interopRequireDefault(_leftMenuComponent);

var _subMenuListComponent = __webpack_require__(269);

var _subMenuListComponent2 = _interopRequireDefault(_subMenuListComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    initialize: function initialize(Boiler, controllers, parentContext, dataContext, vueComponents) {
        //create a new context which is associated with the parent Context
        //var context = new Boiler.Context(parentContext);

        controllers.urlController.addRoutes({
            "/": { component: new _landingPage2.default(Boiler, parentContext, dataContext, vueComponents) },
            "subMenuList/{parentMenuInstanceId}": {
                component: new _subMenuListComponent2.default(Boiler, parentContext, dataContext, vueComponents)
            }
        });
        //controller.start();
        controllers.domController.addRoutes({
            '#mainNavBar': new _headerComponent2.default(Boiler, parentContext, dataContext),
            '#leftMenu': new _leftMenuComponent2.default(Boiler, parentContext, dataContext)
        });
    }
};

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _headerComponent = __webpack_require__(391);

var _headerComponent2 = _interopRequireDefault(_headerComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function Component(Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_headerComponent2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = Component;

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _landingPage = __webpack_require__(392);

var _landingPage2 = _interopRequireDefault(_landingPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function Component(Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_landingPage2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = Component;

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _leftMenuComponent = __webpack_require__(393);

var _leftMenuComponent2 = _interopRequireDefault(_leftMenuComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function Component(Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_leftMenuComponent2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = Component;

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _subMenuListComponent = __webpack_require__(394);

var _subMenuListComponent2 = _interopRequireDefault(_subMenuListComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subMenuListComponent = function subMenuListComponent(Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        dataContext.store.commit("setParentMenuInstanceId", params.parentMenuInstanceId);

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_subMenuListComponent2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = subMenuListComponent;

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _menuConfigureDetailRouterComponent = __webpack_require__(395);

var _menuConfigureDetailRouterComponent2 = _interopRequireDefault(_menuConfigureDetailRouterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menuInstanceDetailComponent = function menuInstanceDetailComponent(Boiler, moduleContext, dataContext, vueComponents) {
    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        dataContext.store.commit("setMenuInstanceId", params.menuInstanceId);

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_menuConfigureDetailRouterComponent2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = menuInstanceDetailComponent;

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _menuInstanceListRouterComponent = __webpack_require__(396);

var _menuInstanceListRouterComponent2 = _interopRequireDefault(_menuInstanceListRouterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menuInstanceListComponent = function menuInstanceListComponent(Boiler, moduleContext, dataContext, vueComponents) {
    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_menuInstanceListRouterComponent2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = menuInstanceListComponent;

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _menuInstanceListRouterComponent = __webpack_require__(271);

var _menuInstanceListRouterComponent2 = _interopRequireDefault(_menuInstanceListRouterComponent);

var _menuConfigureDetailRouterComponent = __webpack_require__(270);

var _menuConfigureDetailRouterComponent2 = _interopRequireDefault(_menuConfigureDetailRouterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    initialize: function initialize(Boiler, controllers, parentContext, dataContext, vueComponents) {
        var menuListComponent = new _menuInstanceListRouterComponent2.default(Boiler, parentContext, dataContext, vueComponents);
        var menuConfigureComponent = new _menuConfigureDetailRouterComponent2.default(Boiler, parentContext, dataContext, vueComponents);

        controllers.urlController.addRoutes({
            "menuList": {
                component: menuListComponent
            }
        });

        // controllers.urlController.addRoutes({
        //     "menuInstance/{menuInstanceId}": {
        //         component: menuDetailComponent
        //     }
        // });

        controllers.urlController.addRoutes({
            "menuConfigure/{menuInstanceId}": {
                component: menuConfigureComponent
            }
        });
    }
};

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adminModuleModule = __webpack_require__(265);

var _adminModuleModule2 = _interopRequireDefault(_adminModuleModule);

var _notificationModuleModule = __webpack_require__(276);

var _notificationModuleModule2 = _interopRequireDefault(_notificationModuleModule);

var _userModule = __webpack_require__(283);

var _userModule2 = _interopRequireDefault(_userModule);

var _userGroupModule = __webpack_require__(279);

var _userGroupModule2 = _interopRequireDefault(_userGroupModule);

var _menuModule = __webpack_require__(272);

var _menuModule2 = _interopRequireDefault(_menuModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
 * Return an array containing all modules classes that needs to be initiated.
 * We use the 'require' function of requirejs to get the relevant module context classes.
 * This could be done of course, by passing those scripts as dependencies to 
 * the 'define' function above. But following model is a bit simpler to read.
 */
exports.default = [_adminModuleModule2.default, _notificationModuleModule2.default, _userModule2.default, _userGroupModule2.default, _menuModule2.default];

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _notificationDetailVue = __webpack_require__(397);

var _notificationDetailVue2 = _interopRequireDefault(_notificationDetailVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseParams = function parseParams(params) {
    var objToReturn = {};
    objToReturn.notificationId = params.notificationId;

    return objToReturn;
};

var Component = function Component(Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        dataContext.store.commit("setSelectedNotifcationDetail", parseParams(params));

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_notificationDetailVue2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = Component;

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _notificationListVue = __webpack_require__(398);

var _notificationListVue2 = _interopRequireDefault(_notificationListVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function Component(Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_notificationListVue2.default);
                }
            });
        }
        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = Component;

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _notificationListVue = __webpack_require__(275);

var _notificationListVue2 = _interopRequireDefault(_notificationListVue);

var _notificationDetailVue = __webpack_require__(274);

var _notificationDetailVue2 = _interopRequireDefault(_notificationDetailVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    initialize: function initialize(Boiler, controllers, parentContext, dataContext) {

        controllers.urlController.addRoutes({
            'notifications/{notificationId}': {
                component: new _notificationDetailVue2.default(Boiler, parentContext, dataContext),
                routeRules: {
                    // numerics
                    notificationId: /(?:\r|\n|.)+/
                }
            }
        });

        controllers.urlController.addRoutes({
            'notifications': {
                component: new _notificationListVue2.default(Boiler, parentContext, dataContext),
                routeRules: {
                    // numerics
                    //clientId: /^\d+$/
                }
            }
        });
        //controllers.start();
    }
};

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _userGroupInstanceRouterComponentComponent = __webpack_require__(399);

var _userGroupInstanceRouterComponentComponent2 = _interopRequireDefault(_userGroupInstanceRouterComponentComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userGroupInstanceComponent = function userGroupInstanceComponent(Boiler, moduleContext, dataContext, vueComponents) {
    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        dataContext.store.commit("setUserGroupInstanceId", params.userGroupInstanceId);

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_userGroupInstanceRouterComponentComponent2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = userGroupInstanceComponent;

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _userGroupListRouterComponentComponent = __webpack_require__(400);

var _userGroupListRouterComponentComponent2 = _interopRequireDefault(_userGroupListRouterComponentComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userGroupListComponent = function userGroupListComponent(Boiler, moduleContext, dataContext, vueComponents) {
    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_userGroupListRouterComponentComponent2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = userGroupListComponent;

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userGroupListRouterComponent = __webpack_require__(278);

var _userGroupListRouterComponent2 = _interopRequireDefault(_userGroupListRouterComponent);

var _userGroupInstanceRouterComponent = __webpack_require__(277);

var _userGroupInstanceRouterComponent2 = _interopRequireDefault(_userGroupInstanceRouterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    initialize: function initialize(Boiler, controllers, parentContext, dataContext, vueComponents) {
        var UserGroupListComponent = new _userGroupListRouterComponent2.default(Boiler, parentContext, dataContext, vueComponents);
        var UserGroupInstanceComponent = new _userGroupInstanceRouterComponent2.default(Boiler, parentContext, dataContext, vueComponents);

        controllers.urlController.addRoutes({
            "userGroupList": {
                component: UserGroupListComponent
            }
        });

        controllers.urlController.addRoutes({
            "userGroupInstance/{userGroupInstanceId}": {
                component: UserGroupInstanceComponent
            }
        });
    }
};

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _userChangePasswordVue = __webpack_require__(401);

var _userChangePasswordVue2 = _interopRequireDefault(_userChangePasswordVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseParams = function parseParams(params) {
    var objToReturn = {};
    objToReturn.userId = params.userId;

    return objToReturn;
};

var Component = function Component(Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        //        dataContext.store.commit("setSelectedUserDetail", parseParams(params));

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_userChangePasswordVue2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = Component;

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _userDetailVue = __webpack_require__(402);

var _userDetailVue2 = _interopRequireDefault(_userDetailVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseParams = function parseParams(params) {
    var objToReturn = {};
    objToReturn.userId = params.userId;

    return objToReturn;
};

var Component = function Component(Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        dataContext.store.commit("setSelectedUserDetail", parseParams(params));

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_userDetailVue2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = Component;

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _userListVue = __webpack_require__(403);

var _userListVue2 = _interopRequireDefault(_userListVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function Component(Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_userListVue2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = Component;

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userListVue = __webpack_require__(282);

var _userListVue2 = _interopRequireDefault(_userListVue);

var _userDetailVue = __webpack_require__(281);

var _userDetailVue2 = _interopRequireDefault(_userDetailVue);

var _userProfileComponentVue = __webpack_require__(284);

var _userProfileComponentVue2 = _interopRequireDefault(_userProfileComponentVue);

var _userChangePasswordVue = __webpack_require__(280);

var _userChangePasswordVue2 = _interopRequireDefault(_userChangePasswordVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    initialize: function initialize(Boiler, controllers, parentContext, dataContext) {

        controllers.urlController.addRoutes({
            'user/{userId}': {
                component: new _userDetailVue2.default(Boiler, parentContext, dataContext),
                routeRules: {
                    // numerics
                    userId: /(?:\r|\n|.)+/
                }
            }
        });

        controllers.urlController.addRoutes({
            'users': {
                component: new _userListVue2.default(Boiler, parentContext, dataContext),
                routeRules: {
                    // numerics                  
                }
            }
        });

        controllers.urlController.addRoutes({
            'userProfile': {
                component: new _userProfileComponentVue2.default(Boiler, parentContext, dataContext),
                routeRules: {
                    //clientId: /^\d+$/
                }
            }
        });

        controllers.urlController.addRoutes({
            'changePassword': {
                component: new _userChangePasswordVue2.default(Boiler, parentContext, dataContext),
                routeRules: {
                    //clientId: /^\d+$/
                }
            }
        });
    }
};

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _userProfileComponentVue = __webpack_require__(404);

var _userProfileComponentVue2 = _interopRequireDefault(_userProfileComponentVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseParams = function parseParams(params) {
    var objToReturn = {};
    objToReturn.clientId = Number(params.clientId);

    return objToReturn;
};

var Component = function Component(Boiler, moduleContext, dataContext, vueComponents) {

    var panel = null,
        vm = null;

    this.activate = function (parent, params) {

        if (!panel) {
            panel = new Boiler.ViewTemplate(parent, "<div></div>", null);

            vm = new _vue2.default({
                el: panel.getDomElement().firstChild,
                store: dataContext.store,
                render: function render(h) {
                    return h(_userProfileComponentVue2.default);
                }
            });
        }

        panel.show();
    };

    this.deactivate = function () {
        if (panel) {
            panel.hide();
        }
    };
};

exports.default = Component;

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _vuedraggable = __webpack_require__(452);

var _vuedraggable2 = _interopRequireDefault(_vuedraggable);

var _datePicker = __webpack_require__(408);

var _datePicker2 = _interopRequireDefault(_datePicker);

var _appointmentCalendar = __webpack_require__(407);

var _appointmentCalendar2 = _interopRequireDefault(_appointmentCalendar);

var _userListComponent = __webpack_require__(417);

var _userListComponent2 = _interopRequireDefault(_userListComponent);

var _userHeaderComponent = __webpack_require__(416);

var _userHeaderComponent2 = _interopRequireDefault(_userHeaderComponent);

var _userSearchComponent = __webpack_require__(418);

var _userSearchComponent2 = _interopRequireDefault(_userSearchComponent);

var _userGroupListComponent = __webpack_require__(415);

var _userGroupListComponent2 = _interopRequireDefault(_userGroupListComponent);

var _userGroupInstanceComponent = __webpack_require__(414);

var _userGroupInstanceComponent2 = _interopRequireDefault(_userGroupInstanceComponent);

var _userGroupEditMetaDataComponent = __webpack_require__(413);

var _userGroupEditMetaDataComponent2 = _interopRequireDefault(_userGroupEditMetaDataComponent);

var _menuConfigureMetaDataComponent = __webpack_require__(410);

var _menuConfigureMetaDataComponent2 = _interopRequireDefault(_menuConfigureMetaDataComponent);

var _menuInstanceListComponent = __webpack_require__(411);

var _menuInstanceListComponent2 = _interopRequireDefault(_menuInstanceListComponent);

var _menuConfigureDetailComponent = __webpack_require__(409);

var _menuConfigureDetailComponent2 = _interopRequireDefault(_menuConfigureDetailComponent);

var _notificationItemComponent = __webpack_require__(412);

var _notificationItemComponent2 = _interopRequireDefault(_notificationItemComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.component("vue-draggable", _vuedraggable2.default);
_vue2.default.component(_datePicker2.default.name, _datePicker2.default);
_vue2.default.component(_appointmentCalendar2.default.name, _appointmentCalendar2.default);

_vue2.default.component(_userListComponent2.default.name, _userListComponent2.default);
_vue2.default.component(_userHeaderComponent2.default.name, _userHeaderComponent2.default);
_vue2.default.component(_userSearchComponent2.default.name, _userSearchComponent2.default);

_vue2.default.component(_userGroupListComponent2.default.name, _userGroupListComponent2.default);
_vue2.default.component(_userGroupInstanceComponent2.default.name, _userGroupInstanceComponent2.default);
_vue2.default.component(_userGroupEditMetaDataComponent2.default.name, _userGroupEditMetaDataComponent2.default);

_vue2.default.component(_menuConfigureMetaDataComponent2.default.name, _menuConfigureMetaDataComponent2.default);
_vue2.default.component(_menuInstanceListComponent2.default.name, _menuInstanceListComponent2.default);
_vue2.default.component(_menuConfigureDetailComponent2.default.name, _menuConfigureDetailComponent2.default);

_vue2.default.component(_notificationItemComponent2.default.name, _notificationItemComponent2.default);
exports.default = {
    vueDraggable: _vuedraggable2.default
};

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _libs = __webpack_require__(229);

var _libs2 = _interopRequireDefault(_libs);

var _application = __webpack_require__(228);

var _application2 = _interopRequireDefault(_application);

var _scssStyles = __webpack_require__(230);

var _scssStyles2 = _interopRequireDefault(_scssStyles);

var _popper = __webpack_require__(26);

var _popper2 = _interopRequireDefault(_popper);

var _bootstrap = __webpack_require__(35);

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _eonasdanBootstrapDatetimepicker = __webpack_require__(36);

var _eonasdanBootstrapDatetimepicker2 = _interopRequireDefault(_eonasdanBootstrapDatetimepicker);

var _fullcalendar = __webpack_require__(231);

var _fullcalendar2 = _interopRequireDefault(_fullcalendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_application2.default.initialize();
//import BootstrapUI from 'bootstrap/dist/css/bootstrap.css'
//import fontawesome from './libs/fontawesome/font-awesome-4.7.0/css/font-awesome.min.css'
//import favicon from './content/images/favIcon.png'

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__(3);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // options
    data: function data() {
        return {
            notificationList: [],
            filterType: 'prepared',
            // notificatoinKeyList: [],
            userImage: "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
            userName: null,
            userNotifications: [],
            // notificationCount: 0,
            userProfile: null,
            unreadCount: 0
        };
    },

    methods: {
        toggleNotification: function toggleNotification() {
            (0, _jquery2.default)("#notification").toggleClass("expand");
            (0, _jquery2.default)(".notoficationButton").toggleClass("active");
            (0, _jquery2.default)(".menuMaskN").toggle();
        },
        logout: function logout() {
            var scope = this;
            /*
            scope.$store.dispatch("dataRequestHandler", {
                key: "UserLogout",
                params: {},
                callback: (err, response) => {
                    //console.log(response);
                    if (err) {
                        vm.$store.dispatch("toastr", {
                            type: "error",
                            message: err
                        });
                        console.log(err);
                        return;
                    }
                     window.localStorage.removeItem("vwtoken");
                    if (window.localStorage.getItem('loginType')) {
                        window.location.href = "dist/client/login.html";
                        window.localStorage.removeItem("loginType");
                    }
                    else
                        window.location.href = "dist/client/login.html";
                }
            });
            */
            window.localStorage.removeItem("rttoken");
            window.location.href = "login.html";
        },
        redirectToHome: function redirectToHome() {
            window.location.href = this.$store.state.uiPageName; // + this.userDetail.response["p_9"]["txt"];
        },
        gotoHome: function gotoHome() {
            //window.location.href = this.$store.state.uiPageName;
        },

        clearMessages: function clearMessages() {
            changeNotificationStatus(scope.userNotifications, "archieved");
        },
        changeNotificationStatus: function changeNotificationStatus(notifications, status) {
            var scope = this;
            scope.$store.dispatch("dataRequestHandler", {
                "key": "UpdateNotification", "params": { "notifications": notifications, "status": status }, "callback": function callback(err, response) {
                    //console.log(response);
                    scope.userNotifications = [];
                    scope.notificationCount = 0;
                }
            });
        },
        getNotifications: function getNotifications() {
            // let scope = this;
            // scope.$store.dispatch("dataRequestHandler", {
            //     key: "GetNotificationList",
            //     params: {},
            //     callback: (err, response) => {
            //         //console.log(response);
            //         if (err)
            //             return;

            //         scope.notificatoinKeyList = response[0];
            //         scope.unreadCount = response[1][0]["unreadCount"];

            //     }
            // })

        },
        getNotifications1: function getNotifications1() {
            //this.$store.dispatch("getNotificationKeys", { "params": {} })
        },
        showNotificationByType: function showNotificationByType(type) {
            this.filterType = type;
        },

        redirectToNotifications: function redirectToNotifications() {
            window.location.href = this.$store.state.uiPageName + "#notifications";
        },
        navigateToUserProfile: function navigateToUserProfile() {
            window.location.href = this.$store.state.uiPageName + "#userProfile";
        },
        getUserProfile: function getUserProfile() {
            var self = this;
            this.$store.dispatch("dataRequestHandler", {
                key: 'GetUserProfile', params: {}, callback: function callback(err, response) {
                    //console.log(err + "/" + response);
                    if (response.length === 0) {
                        return;
                        self.userProfile = response[0];
                    } else {
                        self.userProfile = response[0][0];
                        self.userImage = self.userProfile.ProfileImage;
                        self.userName = self.userProfile.NickName;
                    }
                }
            });
        },
        redirectToChangePassword: function redirectToChangePassword() {
            window.location.href = this.$store.state.uiPageName + "#changePassword";
        },
        naviagateToDetail: function naviagateToDetail(notificationObj) {
            this.dismissNotification(notificationObj);
            window.location.href = this.$store.state.uiPageName + "#notifications/" + notificationObj.NotificationIdText;
        },
        dimissAllNotifications: function dimissAllNotifications() {
            var scope = this;
            var arrNotificationIds = [];

            for (var index = 0; index < scope.notificatoinKeyList.response.length; index++) {
                arrNotificationIds.push(scope.notificatoinKeyList.response[index]["NotificationIdText"]);
            }

            if (arrNotificationIds.length > 0) {
                scope.updateNotificationStatus(arrNotificationIds);
                scope.notificatoinKeyList.response.splice(0, Infinity);
            }
        },
        updateNotificationStatus: function updateNotificationStatus(arrNotificationIds) {
            var scope = this;

            scope.$store.dispatch("dataRequestHandler", {
                key: "DismissNotification",
                params: {
                    notificationId: arrNotificationIds,
                    statusId: 2
                },
                callback: function callback(err, response) {
                    //console.log(response);
                    if (err) return;
                }
            });
        },
        updateNotificationCount: function updateNotificationCount(notificationObj) {
            var scope = this;
            var index = scope.notificatoinKeyList.response.findIndex(function (x) {
                return x.NotificationIdText == notificationObj.NotificationIdText;
            });
            if (index > -1) {
                scope.notificatoinKeyList.response.splice(index, 1);
            }
        }
    },
    computed: {
        notificatoinKeyList: function notificatoinKeyList() {
            return []; //this.$store.getters.getNotificationKeys({ "params": {} });
        },
        notificationCount: function notificationCount() {
            if (this.notificatoinKeyList && this.notificatoinKeyList.status == 'success') {
                var count = 0;
                for (var index = 0; index < this.notificatoinKeyList.response.length; index++) {
                    if (this.notificatoinKeyList.response[index]["Status"] == 1) {
                        count++;
                    }
                }
                return count;
            }
            return 0;
        }
    },
    watch: {
        namespaceInstanceId: function namespaceInstanceId() {
            //console.log("test");
            //console.log(this.namespaceInstanceId);
            //Check whether user is belongs to admin group or not
        }
    },
    mounted: function mounted() {
        this.getNotifications1();
        this.getUserProfile();
    }
}; //

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    data: function data() {
        return {
            namespaceList: [],
            showNewNamespace: false,
            namespaceId: 0,
            currnamespace: 0,

            menusAllocatedToLoggedInUser: []
        };
    },

    props: [],
    methods: {
        getData: function getData() {
            this._getMenusAllocated();
        },
        _getMenusAllocated: function _getMenusAllocated() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "GetRootMenusAllocatedToLoggedInUser",
                params: {},
                callback: function callback(error, response) {
                    if (error) {
                        console.error("Error has occured while retrieving root level menus => ", error);
                        return;
                    }

                    if (response) {
                        if (response.hasOwnProperty("rootMenusList")) {
                            vm.menusAllocatedToLoggedInUser = response.rootMenusList;
                        }
                        if (response.hasOwnProperty("countOfAdminUserGroupsAllocated")) {
                            if (response.countOfAdminUserGroupsAllocated > 0) {
                                vm.$store.commit("setIsCurrentUserAdmin", true);
                            } else if (response.countOfAdminUserGroupsAllocated <= 0) {
                                vm.$store.commit("setIsCurrentUserAdmin", false);
                            }
                        }
                    }
                }
            });
        },
        onClick_goToLeaveMgmt: function onClick_goToLeaveMgmt() {
            //this.$store.commit("setSelectedMenuId", 1);
            window.location.href = this.$store.state.uiPageName + "#submenu/1";
        },
        onClick_goToFeeConcession: function onClick_goToFeeConcession() {
            //this.$store.commit("setSelectedMenuId", 2);
            window.location.href = this.$store.state.uiPageName + "#submenu/2";
        },
        onClick_goToMyProfile: function onClick_goToMyProfile() {
            window.location.href = this.$store.state.uiPageName + "#userProfile";
        },
        onClick_goToMyAttendance: function onClick_goToMyAttendance() {
            window.location.href = this.$store.state.uiPageName + "#myattendance";
        },
        onClick_goToMenuDetail: function onClick_goToMenuDetail(menuItem) {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "GetSubMenuCountByMenuInstanceId",
                params: {
                    parentMenuInstanceIdText: menuItem.MenuInstanceIdText
                },
                callback: function callback(error, response) {
                    console.log("landingPage.getSubMenuCountByMenuInstanceId.response => ", response);
                    if (!isNaN(response) && response > 0) {

                        vm.$store.commit("setParentMenuInstanceId", menuItem.MenuInstanceIdText);
                        window.location.href = vm.$store.state.uiPageName + "#submenuList/" + menuItem.MenuInstanceIdText;
                    } else if (menuItem.NavigateToUrl !== undefined && menuItem.NavigateToUrl !== null && menuItem.NavigateToUrl !== "") {

                        window.location.href = vm.$store.state.uiPageName + menuItem.NavigateToUrl;
                    }
                }
            });
        }
    },
    computed: {},
    mounted: function mounted() {
        this.getData();
    }
};

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__(3);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // options
    props: ["instanceId", "clientId"],
    data: function data() {
        return {};
    },

    methods: {
        getData: function getData() {
            (0, _jquery2.default)('[data-toggle="tooltip"]').tooltip();
        },
        toggleSideBar: function toggleSideBar() {
            (0, _jquery2.default)("#leftMenu").toggleClass("expand");
            (0, _jquery2.default)("#nav-icon3").toggleClass("open");
            (0, _jquery2.default)(".menuMask").toggle();
        },
        pinSideBar: function pinSideBar() {
            (0, _jquery2.default)(".mainContent").toggleClass("fix");
            (0, _jquery2.default)(".sideBar").toggleClass("fix");
            (0, _jquery2.default)(".menuMask").hide();
            var currentItem = (0, _jquery2.default)(".pintx");
            if ((0, _jquery2.default)(currentItem).text() == "Always show sidebar") {
                (0, _jquery2.default)(currentItem).text("Hide sidebar");
                (0, _jquery2.default)(".sideBar").removeClass("expand");
            } else (0, _jquery2.default)(currentItem).text("Always show sidebar");
            (0, _jquery2.default)("#nav-icon3").removeClass("open");
        },
        switchClient: function switchClient() {
            window.location.href = this.$store.state.uiPageName;
        },
        redirectToUsers: function redirectToUsers() {
            window.location.href = this.$store.state.uiPageName + "#users";
        },
        // redirectToHome: function () {
        //     if (this.$store.state.selectedClientDetail.landingPage)
        //         window.location.href = this.$store.state.uiPageName + this.$store.state.selectedClientDetail.clientId;
        //     else
        //         window.location.href = this.$store.state.uiPageName + "#client/" + this.$store.state.selectedClientDetail.clientId;
        // },
        redirectToSolutions: function redirectToSolutions() {
            window.location.href = this.$store.state.uiPageName + "#solutionList";
            (0, _jquery2.default)("#leftMenu").removeClass("expand");
            (0, _jquery2.default)("#nav-icon3").removeClass("open");
            (0, _jquery2.default)(".menuMask").hide();
        },
        redirectToMenuGroups: function redirectToMenuGroups() {
            window.location.href = this.$store.state.uiPageName + "#menugroup";
            (0, _jquery2.default)("#leftMenu").removeClass("expand");
            (0, _jquery2.default)("#nav-icon3").removeClass("open");
            (0, _jquery2.default)(".menuMask").hide();
        },
        redirectToBaseCalendar: function redirectToBaseCalendar() {
            window.location.href = this.$store.state.uiPageName + "#basecalendars";
            (0, _jquery2.default)("#leftMenu").removeClass("expand");
            (0, _jquery2.default)("#nav-icon3").removeClass("open");
            (0, _jquery2.default)(".menuMask").hide();
        },
        redirectToNotifications: function redirectToNotifications() {
            window.location.href = this.$store.state.uiPageName + "#notifications";
            (0, _jquery2.default)("#leftMenu").removeClass("expand");
            (0, _jquery2.default)("#nav-icon3").removeClass("open");
            (0, _jquery2.default)(".menuMask").hide();
        },
        redirectToUserTypes: function redirectToUserTypes() {
            window.location.href = this.$store.state.uiPageName + "#users";
            (0, _jquery2.default)("#leftMenu").removeClass("expand");
            (0, _jquery2.default)("#nav-icon3").removeClass("open");
            (0, _jquery2.default)(".menuMask").hide();
        },
        redirectToUserGroups: function redirectToUserGroups() {
            window.location.href = this.$store.state.uiPageName + "#userGroupList";
            (0, _jquery2.default)("#leftMenu").removeClass("expand");
            (0, _jquery2.default)("#nav-icon3").removeClass("open");
            (0, _jquery2.default)(".menuMask").hide();
        },
        redirectToChangePassword: function redirectToChangePassword() {
            window.location.href = this.$store.state.uiPageName + "#changePassword";
            (0, _jquery2.default)("#leftMenu").removeClass("expand");
            (0, _jquery2.default)("#nav-icon3").removeClass("open");
            (0, _jquery2.default)(".menuMask").hide();
        },
        redirectToMenus: function redirectToMenus() {
            window.location.href = this.$store.state.uiPageName + "#menuList";
            (0, _jquery2.default)("#leftMenu").removeClass("expand");
            (0, _jquery2.default)("#nav-icon3").removeClass("open");
            (0, _jquery2.default)(".menuMask").hide();
        }
    },
    computed: {
        isCurrentUserAdmin: function isCurrentUserAdmin() {
            return this.$store.state.isCurrentUserAdmin;
        }
    },
    watch: {},
    mounted: function mounted() {
        this.getData();
    }
}; //

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    name: "vw-sub-menu-list-component",
    data: function data() {
        return {
            menuDetail: null,
            subMenuList: [],
            fncVariables: {
                getMyApprovalPendingCount: null,
                getPendingConcessionListCount: null,
                getDeanApprovedConcessionCount: null,
                getDeanRejectedConcessionCount: null,
                getDirectorApprovedConcessionCount: null,
                getDirectorRejectedConcessionCount: null,
                getAllConcessionListCount: null
            }
        };
    },

    methods: {
        getData: function getData() {
            this._getSubMenuListByParentMenuId();
        },
        _getSubMenuListByParentMenuId: function _getSubMenuListByParentMenuId() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "GetSubMenusByParentMenuInstanceId",
                params: {
                    parentMenuInstanceId: vm.computedParentMenuInstanceId
                },
                callback: function callback(error, response) {
                    console.log("Error => ", error);
                    console.log("Response => ", response);
                    vm.menuDetail = response.menuDetail;
                    response.subMenuList.forEach(function (subMenuItem) {
                        if (subMenuItem.MethodToDisplayMenuCount && vm.hasOwnProperty(subMenuItem.MethodToDisplayMenuCount)) {
                            vm[subMenuItem.MethodToDisplayMenuCount](vm);
                        }
                    });
                    vm.subMenuList = response.subMenuList;
                }
            });
        },
        onClick_goToSubMenuDetail: function onClick_goToSubMenuDetail(subMenuItem) {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "GetSubMenuCountByMenuInstanceId",
                params: {
                    parentMenuInstanceIdText: subMenuItem.MenuInstanceIdText
                },
                callback: function callback(error, response) {
                    console.log("subMenuListComponent.getSubMenuCountByMenuInstanceId.response => ", response);
                    if (!isNaN(response) && response > 0) {

                        vm.$store.commit("setParentMenuInstanceId", subMenuItem.MenuInstanceIdText);
                        window.location.href = vm.$store.state.uiPageName + "#submenuList/" + subMenuItem.MenuInstanceIdText;
                    } else if (subMenuItem.NavigateToUrl !== undefined && subMenuItem.NavigateToUrl !== null && subMenuItem.NavigateToUrl !== "") {

                        window.location.href = vm.$store.state.uiPageName + subMenuItem.NavigateToUrl;
                    }
                }
            });
        },
        getMyApprovalPendingCount: function getMyApprovalPendingCount(vm) {
            // let vm = this;
            this.$store.dispatch("dataRequestHandler", {
                key: "GetMyApprovalPendingCount",
                params: {},
                callback: function callback(err, response) {
                    if (err) {
                        alert(err);
                        return;
                    }

                    if (response && response.hasOwnProperty("LeaveCount")) {
                        vm.fncVariables.getMyApprovalPendingCount = response.LeaveCount;
                    }
                }
            });
        },
        getPendingConcessionListCount: function getPendingConcessionListCount(vm) {
            this._getConcessionCount(vm, 1, "getPendingConcessionListCount");
        },
        getDeanApprovedConcessionCount: function getDeanApprovedConcessionCount(vm) {
            this._getConcessionCount(vm, 2, "getDeanApprovedConcessionCount");
        },
        getDeanRejectedConcessionCount: function getDeanRejectedConcessionCount(vm) {
            this._getConcessionCount(vm, 3, "getDeanRejectedConcessionCount");
        },
        getDirectorApprovedConcessionCount: function getDirectorApprovedConcessionCount(vm) {
            this._getConcessionCount(vm, 4, "getDirectorApprovedConcessionCount");
        },
        getDirectorRejectedConcessionCount: function getDirectorRejectedConcessionCount(vm) {
            this._getConcessionCount(vm, 5, "getDirectorRejectedConcessionCount");
        },
        getAllConcessionListCount: function getAllConcessionListCount(vm) {
            this._getConcessionCount(vm, 0, "getAllConcessionListCount");
        },
        _getConcessionCount: function _getConcessionCount(vm, statusId, variable) {
            this.$store.dispatch("dataRequestHandler", {
                key: "GetConcessionCountPerUser",
                params: { statusId: statusId },
                callback: function callback(err, response) {
                    if (err) {
                        alert(err);
                        return;
                    }

                    if (response) {
                        vm.fncVariables[variable] = response[1][0]["ConsessionsCount"];
                    }
                }
            });
        }
    },
    computed: {
        computedParentMenuInstanceId: function computedParentMenuInstanceId() {
            return this.$store.state.parentMenuInstanceId;
        }
    },
    watch: {
        computedParentMenuInstanceId: function computedParentMenuInstanceId() {
            this.getData();
        }
    },
    mounted: function mounted() {
        this.getData();
    }
};

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//

exports.default = {
    computed: {
        computedMenuInstanceId: function computedMenuInstanceId() {
            return this.$store.state.menuInstanceId;
        }
    }
};

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//

exports.default = {};

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    data: function data() {
        return {
            editMode: false,
            showNewEntity: false,
            newEntity: null,
            showRelSearch: false,
            key: "GetAllUsers",
            arrSearchResult: [],
            notificationDetail: null
        };
    },

    props: ["listType"],
    methods: {
        deleteNotification: function deleteNotification() {},
        editNotification: function editNotification() {
            this.editMode = !this.editMode;
        },
        saveNotification: function saveNotification() {
            // if (this.notificationId > 0) {

            this.$store.dispatch("dataRequestHandler", {
                key: 'CreateNotification',
                params: {
                    templateId: 4,
                    userDevices: [{ deviceId: this.notificationDetail.response.userIds, type: 'Android', send: true }],
                    notifyOptions: {
                        "Android": true,
                        "IOS": false,
                        "SMS": true,
                        "Web": false,
                        "Email": false
                    },
                    entityInstanceId: 62,
                    entityId: 3
                },
                callback: function callback(err, response) {
                    console.log(response);
                }
            });
            this.editMode = false;
        },

        goToEntity: function goToEntity(entity) {
            window.location.href = this.$store.state.uiPageName + "#notification/" + this.notificationId + "/entity/" + entity.response.cbkey;
        },
        newNotification: function newNotification() {
            window.location.href = this.$store.state.uiPageName + "#notification/0";
        },
        getNotificationDetails: function getNotificationDetails() {
            var vm = this;
            vm.$store.dispatch("dataRequestHandler", {
                key: "GetNotificationDetail",
                params: {
                    notificationId: vm.notificationId
                },
                callback: function callback(err, response) {
                    if (Array.isArray(response)) {
                        console.log(response);
                        vm.notificationDetail = response[0];
                    }
                }
            });
        }
    },
    computed: {
        notificationId: function notificationId() {
            var notificationId = this.$store.state.selectedNotificationDetail.notificationId;
            return notificationId;
        }
    },
    watch: {
        notificationId: function notificationId() {
            this.getNotificationDetails();
        }
    },
    mounted: function mounted() {
        this.getNotificationDetails();
    }
};

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    data: function data() {
        return {
            editMode: false,
            showNewEntity: false,
            newEntity: null,
            showRelSearch: false,
            key: "GetAllUsers",
            arrSearchResult: [],
            notifications: [],
            noResultMessage: false
        };
    },

    props: ["parentId", "parentType", "entityId", "clientId", "paramId", "listType"],
    methods: {
        getNotificationList: function getNotificationList() {

            var scope = this;
            scope.$store.dispatch("dataRequestHandler", {
                key: "GetNotificationList",
                params: { entityId: scope.entityId },
                callback: function callback(err, response) {
                    console.log(response);
                    if (err) return;

                    scope.notifications = response[0];
                }
            });
        },
        deleteClient: function deleteClient() {},
        editClient: function editClient() {
            this.editMode = !this.editMode;
        },
        goToNotification: function goToNotification(notificationObj) {
            window.location.href = this.$store.state.uiPageName + "#notifications/" + notificationObj.NotificationIdText;
        },
        newNotificatoin: function newNotificatoin() {
            window.location.href = this.$store.state.uiPageName + "#notifications/0";
        }
    },
    computed: {
        keyList: function keyList() {
            return this.$store.dispatch("getDataByType", { "type": "notification" });
        }
    },
    mounted: function mounted() {
        this.getNotificationList();
    }
};

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//

exports.default = {
    computed: {
        computedUserGroupInstanceId: function computedUserGroupInstanceId() {
            return this.$store.state.userGroupInstanceId;
        }
    }
};

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//

exports.default = {};

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    data: function data() {
        return {
            UserPassword: "",
            Repassword: "",
            CurrentPassword: ""
        };
    },

    methods: {
        updatePassword: function updatePassword() {
            var vm = this;
            if (vm.CurrentPassword == null || vm.CurrentPassword == "") {
                // console.log("Current Password is empty");
                vm.$store.dispatch("toastr", { type: "error", message: "Current Password should not empty", header: "Password is required" });
                return;
            } else if (vm.UserPassword == "" || vm.Repassword == "") {
                //console.log("Current Password is empty");
                vm.$store.dispatch("toastr", { type: "error", message: "New Password and confirm password should not empty", header: "Password is required" });
                return;
            } else if (vm.UserPassword !== null && vm.UserPassword !== "" && vm.UserPassword.toLowerCase() !== vm.Repassword.toLowerCase()) {
                vm.$store.dispatch("toastr", { type: "error", message: "New Password and confirm password should match", header: "Password mismatch" });
                //console.log("Password not match");
                return;
            }

            var userObject = {
                CurrentPassword: vm.CurrentPassword,
                Password: vm.UserPassword
            };

            vm.$store.dispatch("dataRequestHandler", {
                "key": "UpdatePassword", "params": userObject, "callback": function callback(err, response) {
                    //console.log(response);
                    if (err) {
                        return;
                    }
                    if (response[0] && response[0][0] && response[0][0]["ErrorMessage"] != "") {
                        vm.$store.dispatch("toastr", { type: "error", message: response[0][0]["ErrorMessage"], header: "Password match" });
                        return;
                    }
                    vm.$store.dispatch("toastr", { type: "success", message: "Password changed successfully", header: "Success" });
                    window.location.href = vm.$store.state.uiPageName + "#userProfile";
                }
            });
        }
    },
    computed: {
        // userId() {
        //     let userId = this.$store.state.selectedUserDetail.userId;               
        //     return userId;
        // }
    },
    mounted: function mounted() {},

    watch: {
        userId: function userId(value) {
            //console.log(this.userId);
        }
    }
};

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__(3);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //

exports.default = {
    data: function data() {
        return {
            editMode: false,
            showNewUser: false,
            newEntity: null,
            userDetail: null,
            emailRegEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            searchUserResultsArray: [],
            designationList: [],
            campusList: [],
            newUserObject: {
                response: {
                    "name": "",
                    "vwUserIdText": null,
                    "FirstName": "",
                    "LastName": "",
                    "EmailId": "",
                    "MobileNumber": "",
                    "UserPassword": "",
                    "Repassword": "",
                    "PayrollId": "",
                    "NickName": "",
                    "ProfileImage": null,
                    "deviceIds": {
                        apps: {
                            Android: [],
                            IOS: [],
                            Web: [],
                            Email: [],
                            SMS: []
                        }
                    },
                    "CampusId": null,
                    "DesignationId": null,
                    "ReportingManagerId": "",
                    "ReportingManagerName": ""
                }
            },
            phoneNumberRegEx: /^\d{10}$/
        };
    },

    methods: {
        deleteUser: function deleteUser() {},
        editUser: function editUser() {
            this.editMode = !this.editMode;
        },
        saveUser: function saveUser() {
            var vm = this;
            var userDetail = vm.userDetail.response;

            if (!vm.emailRegEx.test(userDetail.EmailId)) {
                //console.log("Invalid email");
                vm.$store.dispatch("toastr", { type: "error", message: "Please enter valid E-mail Id", header: "Email" });
                return;
            } else if (userDetail.vwUserIdText == null && userDetail.UserPassword.toLowerCase() !== userDetail.Repassword.toLowerCase()) {
                //console.log("Password not match");
                vm.$store.dispatch("toastr", { type: "error", message: "New Password and confirm password should match", header: "Password mismatch" });
                return;
            } else if (vm.userDetail.response.MobileNumber != "" && vm.userDetail.response.MobileNumber != null && (isNaN(Number(vm.userDetail.response.MobileNumber)) || !vm.phoneNumberRegEx.test(vm.userDetail.response.MobileNumber))) {
                vm.$store.dispatch("toastr", { type: "error", message: "Please enter valid mobile number", header: "Validation" });
                return;
            }

            var userObject = {
                name: vm.userDetail.response.FirstName + " " + vm.userDetail.response.LastName,
                type: vm.userDetail.response.type,
                vwUserIdText: vm.userDetail.response.vwUserIdText,
                firstName: vm.userDetail.response.FirstName,
                lastName: vm.userDetail.response.LastName,
                nickName: vm.userDetail.response.NickName,
                email: vm.userDetail.response.EmailId,
                mobileNumber: vm.userDetail.response.MobileNumber,
                password: vm.userDetail.response.UserPassword,
                profileImage: vm.userDetail.response.ProfileImage,
                payrollId: vm.userDetail.response.PayrollId,
                deviceIds: vm.userDetail.response.deviceIds,
                reportingManagerId: vm.userDetail.response.ReportingManagerId,
                designationId: vm.userDetail.response.DesignationId,
                campusId: vm.userDetail.response.CampusId
            };

            vm.$store.dispatch("dataRequestHandler", {
                "key": "CreateUser", "params": userObject, "callback": function callback(err, response) {
                    //console.log(response);
                    if (err) {
                        return;
                    }

                    vm.userDetail = _jquery2.default.extend(true, {}, vm.newUserObject);
                    window.location.href = vm.$store.state.uiPageName + "#users";
                }
            });
        },
        getUserDetail: function getUserDetail() {
            var self = this;
            if (this.userId != 0) {
                this.$store.dispatch("dataRequestHandler", {
                    "key": "GetUserDetail", "params": { "vwUserId": this.userId }, "callback": function callback(err, response) {
                        //console.log(response);
                        if (err) {
                            return;
                        }

                        self.userDetail = { "response": response[0][0] };
                    }
                });
            } else {
                self.userDetail = _jquery2.default.extend(true, {}, self.newUserObject);
            }

            //get Designation and Campus List
            var vm = this;

            this.designationList.splice(0, this.designationList.length);
            this.campusList.splice(0, this.campusList.length);

            vm.$store.dispatch("dataRequestHandler", {
                key: "GetDesignationList",
                params: {},
                callback: function callback(err, response) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (Array.isArray(response)) {
                        var _vm$designationList;

                        (_vm$designationList = vm.designationList).splice.apply(_vm$designationList, [0, vm.designationList.length].concat(_toConsumableArray(response)));
                    }
                }
            });

            vm.$store.dispatch("dataRequestHandler", {
                key: "GetCampusList",
                params: {},
                callback: function callback(err, response) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (Array.isArray(response)) {
                        var _vm$campusList;

                        (_vm$campusList = vm.campusList).splice.apply(_vm$campusList, [0, vm.campusList.length].concat(_toConsumableArray(response)));
                    }
                }
            });
        },
        //assign user to role
        onUserSearch: function onUserSearch(options) {
            var _this = this;

            var that = this;
            that.$store.dispatch("dataRequestHandler", {
                key: "SearchUsers",
                params: {
                    query: options.query
                },
                callback: function callback(err, response) {
                    if (Array.isArray(response)) {
                        var _searchUserResultsArr;

                        (_searchUserResultsArr = _this.searchUserResultsArray).splice.apply(_searchUserResultsArr, [0, Infinity].concat(_toConsumableArray(response[0])));
                    }
                }
            });
        },
        toggleUserSearch: function toggleUserSearch(instruction) {
            var showUserSearch = typeof instruction === "boolean" ? instruction : false;
            if (!showUserSearch) {
                this.searchUserResultsArray.splice(0);
            }
        },
        assignUserToRole: function assignUserToRole(selectedUserInstance) {
            //console.log(selectedUserInstance);
            this.userDetail.response.ReportingManagerId = selectedUserInstance.vwUserIdText;
        }
    },
    computed: {
        userId: function userId() {
            var userId = this.$store.state.selectedUserDetail.userId;
            return userId;
        }
    },
    mounted: function mounted() {
        //console.log("user detail");
        this.getUserDetail();
    },

    watch: {
        userId: function userId(value) {
            //console.log(this.userId);
            this.getUserDetail();
        }
    }
};

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  computed: {
    //   clientUserList() {
    //     return this.$store.state.clientUserList
    //   }
  }
};

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _VueAvatar = __webpack_require__(405);

var _VueAvatar2 = _interopRequireDefault(_VueAvatar);

var _VueAvatarScale = __webpack_require__(406);

var _VueAvatarScale2 = _interopRequireDefault(_VueAvatarScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            userProfile: null
        };
    },

    props: ["parentId", "parentType", "entityId", "clientId", "paramId", "listType"],
    methods: {
        saveUserProfile: function saveUserProfile() {
            var self = this;
            var img = this.$refs.vueavatar.getImageScaled();
            this.$store.dispatch("dataRequestHandler", {
                key: "SaveUserProfile",
                params: {
                    profileImage: img.toDataURL(),
                    nickName: self.userProfile.NickName
                },
                callback: function callback(err, response) {
                    //console.log(response);
                }
            });
        },
        getUserProfile: function getUserProfile() {
            var self = this;
            this.$store.dispatch("dataRequestHandler", {
                key: 'GetUserProfile', params: {}, callback: function callback(err, response) {
                    //console.log(err + "/" + response);
                    if (response.length === 0) {
                        return;
                    } else {
                        self.userProfile = response[0][0];
                        if (self.userProfile.ProfileImage) {
                            setTimeout(function () {
                                self.$refs.vueavatar.loadImage(self.userProfile.ProfileImage);
                            }, 500);
                        } else {
                            setTimeout(function () {
                                self.$refs.vueavatar.loadImage("https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png");
                            }, 500);
                        }
                    }
                }
            });
        },
        onChangeScale: function onChangeScale(scale) {
            this.$refs.vueavatar.changeScale(scale);
        },
        saveClicked: function saveClicked() {
            var img = this.$refs.vueavatar.getImageScaled();
            // use img 
        },
        onImageReady: function onImageReady(scale) {
            this.$refs.vueavatarscale.setScale(scale);
        }
    },
    computed: {},
    components: {
        VueAvatar: _VueAvatar2.default,
        VueAvatarScale: _VueAvatarScale2.default
    },
    mounted: function mounted() {
        this.getUserProfile();
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var drawRoundedRect = function drawRoundedRect(context, x, y, width, height, borderRadius) {
    if (borderRadius === 0) {
        context.rect(x, y, width, height);
    } else {
        var widthMinusRad = width - borderRadius;
        var heightMinusRad = height - borderRadius;
        context.translate(x, y);
        context.arc(borderRadius, borderRadius, borderRadius, Math.PI, Math.PI * 1.5);
        context.lineTo(widthMinusRad, 0);
        context.arc(widthMinusRad, borderRadius, borderRadius, Math.PI * 1.5, Math.PI * 2);
        context.lineTo(width, heightMinusRad);
        context.arc(widthMinusRad, heightMinusRad, borderRadius, Math.PI * 2, Math.PI * 0.5);
        context.lineTo(borderRadius, height);
        context.arc(borderRadius, heightMinusRad, borderRadius, Math.PI * 0.5, Math.PI);
        context.translate(-x, -y);
    }
};
exports.default = {
    props: {
        image: {
            type: String,
            default: 'https://vuejs.org/images/logo.png'
        },
        border: {
            type: Number,
            default: 0
        },
        borderRadius: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 200
        },
        color: {
            type: Array,
            default: function _default() {
                return [0, 0, 0, 0.5];
            }
        }
    },
    data: function data() {
        return {
            cursor: 'cursorPointer',
            scale: 1,
            canvas: null,
            context: null,
            dragged: false,
            imageLoaded: false,
            changed: false,
            state: {
                drag: false,
                my: null,
                mx: null,
                xxx: "ab",
                image: {
                    x: 0,
                    y: 0,
                    resource: null
                }
            }
        };
    },
    computed: {
        canvasWidth: function canvasWidth() {
            return this.getDimensions().canvas.width;
        },
        canvasHeight: function canvasHeight() {
            return this.getDimensions().canvas.height;
        }
    },
    mounted: function mounted() {
        this.canvas = this.$refs.canvas;
        this.context = this.canvas.getContext('2d');
        this.paint();
        if (!this.image) {
            var placeHolder = this.svgToImage(this.context, '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65"><defs><style>.cls-1{fill:#999;}</style></defs><title>Upload_Upload</title><path class="cls-1" d="M32.5,1A31.5,31.5,0,1,1,1,32.5,31.54,31.54,0,0,1,32.5,1m0-1A32.5,32.5,0,1,0,65,32.5,32.5,32.5,0,0,0,32.5,0h0Z"/><polygon class="cls-1" points="41.91 28.2 32.59 18.65 23.09 28.39 24.17 29.44 31.87 21.54 31.87 40.05 33.37 40.05 33.37 21.59 40.83 29.25 41.91 28.2"/><polygon class="cls-1" points="40.66 40.35 40.66 44.35 24.34 44.35 24.34 40.35 22.34 40.35 22.34 44.35 22.34 46.35 24.34 46.35 40.66 46.35 42.66 46.35 42.66 44.35 42.66 40.35 40.66 40.35"/></svg>');
            var self = this;
            placeHolder.onload = function () {
                var dim = self.getDimensions();
                var x = self.canvasWidth / 2 - this.width / 2;
                var y = self.canvasHeight / 2 - this.height / 2;
                self.context.drawImage(placeHolder, x, y, this.width, this.height);
            };
        } else {
            this.loadImage(this.image);
        }
    },
    methods: {
        svgToImage: function svgToImage(ctx, rawSVG) {
            var svg = new Blob([rawSVG], { type: "image/svg+xml;charset=utf-8" }),
                domURL = self.URL || self.webkitURL || self,
                url = domURL.createObjectURL(svg),
                img = new Image();
            img.src = url;
            return img;
        },
        setState: function setState(state1) {
            var min = Math.ceil(1);
            var max = Math.floor(10000);
            this.state = state1;
            this.state.cnt = 'HELLO' + Math.floor(Math.random() * (max - min)) + min;
        },
        paint: function paint() {
            this.context.save();
            this.context.translate(0, 0);
            this.context.fillStyle = 'rgba(' + this.color.slice(0, 4).join(',') + ')';
            var borderRadius = this.borderRadius;
            var dimensions = this.getDimensions();
            var borderSize = dimensions.border;
            var height = dimensions.canvas.height;
            var width = dimensions.canvas.width;
            // clamp border radius between zero (perfect rectangle) and half the size without borders (perfect circle or "pill")
            borderRadius = Math.max(borderRadius, 0);
            borderRadius = Math.min(borderRadius, width / 2 - borderSize, height / 2 - borderSize);
            this.context.beginPath();
            // inner rect, possibly rounded
            drawRoundedRect(this.context, borderSize, borderSize, width - borderSize * 2, height - borderSize * 2, borderRadius);
            this.context.rect(width, 0, -width, height); // outer rect, drawn "counterclockwise"
            this.context.fill('evenodd');
            this.context.restore();
        },
        getDimensions: function getDimensions() {
            return {
                width: this.width,
                height: this.height,
                border: this.border,
                canvas: {
                    width: this.width + this.border * 2,
                    height: this.height + this.border * 2
                }
            };
        },
        onDrop: function onDrop(e) {
            var _this = this;

            e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            if (e.dataTransfer && e.dataTransfer.files.length) {
                //this.props.onDropFile(e)
                var reader = new FileReader();
                var file = e.dataTransfer.files[0];
                this.changed = true;
                reader.onload = function (e) {
                    return _this.loadImage(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        },
        onDragStart: function onDragStart(e) {
            e = e || window.event;
            e.preventDefault();
            this.state.drag = true;
            this.state.mx = null;
            this.state.my = null;
            this.cursor = 'cursorGrabbing';
        },
        onDragEnd: function onDragEnd(e) {
            if (this.state.drag) {
                this.state.drag = false;
                this.cursor = 'cursorPointer';
            }
        },
        onMouseMove: function onMouseMove(e) {
            e = e || window.event;
            if (this.state.drag === false) {
                return;
            }
            this.dragged = true;
            this.changed = true;
            var imageState = this.state.image;
            var lastX = imageState.x;
            var lastY = imageState.y;
            var mousePositionX = e.targetTouches ? e.targetTouches[0].pageX : e.clientX;
            var mousePositionY = e.targetTouches ? e.targetTouches[0].pageY : e.clientY;
            var newState = { mx: mousePositionX, my: mousePositionY, image: imageState };
            if (this.state.mx && this.state.my) {
                var xDiff = (this.state.mx - mousePositionX) / this.scale;
                var yDiff = (this.state.my - mousePositionY) / this.scale;
                imageState.y = this.getBoundedY(lastY - yDiff, this.scale);
                imageState.x = this.getBoundedX(lastX - xDiff, this.scale);
            }
            this.state.mx = newState.mx;
            this.state.my = newState.my;
            this.state.image = imageState;
            //this.setState(newState)
        },
        loadImage: function loadImage(imageURL) {
            var imageObj = new Image();
            var self = this;
            imageObj.onload = function () {
                self.handleImageReady(imageObj);
            };
            //imageObj.onerror = this.props.onLoadFailure
            if (!this.isDataURL(imageURL)) imageObj.crossOrigin = 'anonymous';
            imageObj.src = imageURL;
        },
        handleImageReady: function handleImageReady(image) {
            var imageState = this.getInitialSize(image.width, image.height);
            imageState.resource = image;
            imageState.x = 0;
            imageState.y = 0;
            var oldState = this.state;
            oldState.drag = false;
            oldState.image = imageState;
            this.state.image.x = 0;
            this.state.image.y = 0;
            this.state.image.resource = image;
            this.state.image.width = imageState.width;
            this.state.image.height = imageState.height;
            this.state.drag = false;
            this.scale = 1;
            this.$emit('vue-avatar-editor:image-ready', this.scale);
            this.imageLoaded = true;
            this.cursor = 'cursorGrab';
        },
        getInitialSize: function getInitialSize(width, height) {
            var newHeight = void 0;
            var newWidth = void 0;
            var dimensions = this.getDimensions();
            var canvasRatio = dimensions.height / dimensions.width;
            var imageRatio = height / width;
            if (canvasRatio > imageRatio) {
                newHeight = this.getDimensions().height;
                newWidth = width * (newHeight / height);
            } else {
                newWidth = this.getDimensions().width;
                newHeight = height * (newWidth / width);
            }
            return {
                height: newHeight,
                width: newWidth
            };
        },
        isDataURL: function isDataURL(str) {
            if (str === null) {
                return false;
            }
            var regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+=[a-z\-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@\/?%\s]*\s*$/i;
            return !!str.match(regex);
        },

        getBoundedX: function getBoundedX(x, scale) {
            var image = this.state.image;
            var dimensions = this.getDimensions();
            var widthDiff = Math.floor((image.width - dimensions.width / scale) / 2);
            widthDiff = Math.max(0, widthDiff);
            return Math.max(-widthDiff, Math.min(x, widthDiff));
        },
        getBoundedY: function getBoundedY(y, scale) {
            var image = this.state.image;
            var dimensions = this.getDimensions();
            var heightDiff = Math.floor((image.height - dimensions.height / scale) / 2);
            heightDiff = Math.max(0, heightDiff);
            return Math.max(-heightDiff, Math.min(y, heightDiff));
        },
        paintImage: function paintImage(context, image, border) {
            if (image.resource) {
                var position = this.calculatePosition(image, border);
                context.save();
                context.globalCompositeOperation = 'destination-over';
                context.drawImage(image.resource, position.x, position.y, position.width, position.height);
                context.restore();
            }
        },
        calculatePosition: function calculatePosition(image, border) {
            var image = image || this.state.image;
            var dimensions = this.getDimensions();
            var width = image.width * this.scale;
            var height = image.height * this.scale;
            var widthDiff = (width - dimensions.width) / 2;
            var heightDiff = (height - dimensions.height) / 2;
            var x = image.x * this.scale - widthDiff + border;
            var y = image.y * this.scale - heightDiff + border;
            return {
                x: x,
                y: y,
                height: height,
                width: width
            };
        },
        changeScale: function changeScale(sc) {
            this.changed = true;
            this.scale = sc;
        },
        redraw: function redraw() {
            this.context.clearRect(0, 0, this.getDimensions().canvas.width, this.getDimensions().canvas.height);
            this.paint();
            this.paintImage(this.context, this.state.image, this.border);
        },
        getImage: function getImage() {
            var cropRect = this.getCroppingRect();
            var image = this.state.image;
            // get actual pixel coordinates
            cropRect.x *= image.resource.width;
            cropRect.y *= image.resource.height;
            cropRect.width *= image.resource.width;
            cropRect.height *= image.resource.height;
            // create a canvas with the correct dimensions
            var canvas = document.createElement('canvas');
            canvas.width = cropRect.width;
            canvas.height = cropRect.height;

            // draw the full-size image at the correct position,
            // the image gets truncated to the size of the canvas.
            canvas.getContext('2d').drawImage(image.resource, -cropRect.x, -cropRect.y);
            return canvas;
        },
        getImageScaled: function getImageScaled() {
            var _getDimensions = this.getDimensions(),
                width = _getDimensions.width,
                height = _getDimensions.height;

            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            // don't paint a border here, as it is the resulting image
            this.paintImage(canvas.getContext('2d'), this.state.image, 0);
            return canvas;
        },
        imageChanged: function imageChanged() {
            return this.changed;
        },
        getCroppingRect: function getCroppingRect() {
            var dim = this.getDimensions();
            var frameRect = { x: dim.border, y: dim.border, width: dim.width, height: dim.height };
            var imageRect = this.calculatePosition(this.state.image, dim.border);
            return {
                x: (frameRect.x - imageRect.x) / imageRect.width,
                y: (frameRect.y - imageRect.y) / imageRect.height,
                width: frameRect.width / imageRect.width,
                height: frameRect.height / imageRect.height
            };
        },
        clicked: function clicked(e) {
            if (this.dragged == true) {
                this.dragged = false;
            } else {
                document.getElementById('ab-1').click();
            }
        },
        fileSelected: function fileSelected(e) {
            var _this2 = this;

            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            var image = new Image();
            var reader = new FileReader();
            this.changed = true;
            reader.onload = function (e) {
                _this2.loadImage(e.target.result);
            };
            reader.readAsDataURL(files[0]);
        }
    },
    watch: {
        state: {
            handler: function handler(val, oldval) {
                if (this.imageLoaded == true) this.redraw();
            },
            deep: true
        },
        scale: function scale() {
            if (this.imageLoaded == true) this.redraw();
        }
    }
};

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//
//
//
//
//
//

exports.default = {
	props: {
		width: {
			type: Number,
			default: 200
		},
		min: {
			type: Number,
			default: 1
		},
		max: {
			type: Number,
			default: 2
		},
		step: {
			type: Number,
			default: 0.01
		}
	},
	methods: {
		setScale: function setScale(scale) {
			this.scale = scale;
		}
	},
	data: function data() {
		return {
			scale: 1
		};
	},
	watch: {
		scale: function scale() {
			this.$emit('vue-avatar-editor-scale:change-scale', this.scale);
		}
	}
};

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _momentTimezone = __webpack_require__(25);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "appointmentCalendaromponent",
    props: ["param", "onUpdate", "entityInstance", "entity", "isDisabled", "userId"],
    data: function data() {
        return {
            control: null,
            isChanging: false,
            fcEvents: [
                // {
                //     title: 'Aug 8 first',
                //     start: '2017-08-08T01:00:00',
                //     end: '2017-08-08T02:59:59',
                //     color: '#378006',
                //     cssClass: 'firsthalf'
                // },
                // {
                //     title: 'Aug 8 second',
                //     start: '2017-08-08T04:00:00',
                //     end: '2017-08-08T05:59:59',
                //     color: '#ff0000',
                //     cssClass: 'secondhalf'
                // },
                // {
                //     title: 'event2',
                //     start: '2017-08-05',
                //     end: '2017-08-07'
                // },
                // {
                //     title: 'event3',
                //     start: '2017-08-09T12:30:00',
                //     allDay: false // will make the time show
                // }
            ],
            showModal: false,
            popupHeader: 'Event details',
            popupDetails: null
        };
    },

    methods: {
        updateValue: function updateValue(momentDateTime) {

            // if (this.controlType == "startTime")
            //     this.param.startTime = momentDateTime.utc().format();
            // else if (this.controlType == "endTime")
            //     this.param.endTime = momentDateTime.utc().format();
            //console.log(moment(momentDateTime).utc().format("HH:mm"));
            //console.log(momentDateTime.utc().format());
            //this.onUpdate(this.param, this.paramKey, momentDateTime);
        },
        isNumeric: function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        changeMonth: function changeMonth(start, end, current) {
            console.log('changeMonth', start, end, current);
            this.getEntityInstanceData(current, end);
        },
        eventClick: function eventClick(event, jsEvent, pos) {
            console.log('eventClick', event, jsEvent, pos);
            // // this.popupDetails = event;
            // // this.showModal = true;
        },
        dayClick: function dayClick(day, jsEvent) {
            console.log('dayClick', day, jsEvent);
        },
        moreClick: function moreClick(day, events, jsEvent) {
            console.log('moreCLick', day, events, jsEvent);
        },
        closePopup: function closePopup() {
            this.showModal = false;
        },
        getEntityInstanceData: function getEntityInstanceData(startDate, endDate) {
            var vm = this;
            vm.$store.dispatch("dataRequestHandler", {
                key: "GetUserMonthlyAppoinments",
                params: {
                    userId: this.userId,
                    startDate: startDate,
                    endDate: endDate
                },
                callback: function callback(err, response) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(response);
                    vm.fcEvents = response;
                    // vm.fcEvents = [
                    //     {
                    //         title: 'Sunny Out of Office',
                    //         start: '2017-09-25T13:30:00',
                    //         end: '2017-09-27T13:30:00'
                    //     },
                    //     {
                    //         title: 'Sunny Out of Office2',
                    //         start: '2017-09-15',
                    //         end: '2017-09-15'
                    //     }
                    // ];
                }
            });
        }
    },
    computed: {
        // format(){
        //     return 'HH:MM';
        // }
    },
    mounted: function mounted() {},

    watch: {
        value: function value(newValue) {
            console.log(newValue);
        },

        isDisabled: {
            handler: function handler(check) {
                console.log(check);
            },
            deep: true
        }
    },
    destroyed: function destroyed() {
        //this.control.destroy();
        //console.log("date destroyed: ", this.control)
    },

    components: {
        'full-calendar': __webpack_require__(390),
        'modal': {
            template: '#appointmentEvent-modal-template',
            methods: {
                save: function save(flag) {
                    this.$parent.closePopup();
                }
            }
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _momentTimezone = __webpack_require__(25);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "datePickerComponent",
    props: ["keyString", "value", "onUpdate", "format", "pickerType", "isDisabled", "isRequired", "errorMessage", "showErrorMessage"],
    data: function data() {
        return {
            control: null,
            isChanging: false
        };
    },

    methods: {
        updateValue: function updateValue(momentDateTime) {
            this.onUpdate(this.keyString, momentDateTime);
        },
        isNumeric: function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    },
    computed: {
        // format(){
        //     return 'HH:MM';
        // }
    },
    mounted: function mounted() {
        var options = {
            format: this.format,
            useCurrent: false,
            showClear: true,
            showClose: false,
            showTodayButton: true,
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-dot-circle-o',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            },
            inline: false,
            ignoreReadonly: true,
            allowInputToggle: true,
            widgetPositioning: {
                horizontal: 'right',
                vertical: 'bottom'
            }
        };

        $(this.$el).datetimepicker(options);
        this.control = $(this.$el).data("DateTimePicker");
        this.control.hide();

        //set date if available
        if (this.value && this.value != "") {
            //console.log(moment(this.value));
            if (this.pickerType == 'date') this.control.date((0, _momentTimezone2.default)(this.value));else {
                var someDate = new Date();
                var savedTime = this.value.split(":");
                someDate.setHours(savedTime[0]);
                someDate.setMinutes(savedTime[1]);
                this.control.date((0, _momentTimezone2.default)(someDate));
            }
        }

        $(this.$el).on("dp.show", function () {
            //console.log("showed");
        });
        var me = this;
        $(this.$el).on("dp.change", function () {
            if (!me.isChanging) {
                me.isChanging = true;
                me.$nextTick(function () {
                    me.isChanging = false;
                    if (me.updateValue) {

                        //console.log(moment(me.control.date()).format("HH:mm"));
                        if (me.value && me.value.val === null && me.control.date() === null) {
                            return;
                        } else if (me.value && me.value.val && me.control.date() && me.control.date().isSame((0, _momentTimezone2.default)(me.value.val), "second")) {
                            return;
                        }
                        me.updateValue(me.control.date());
                    }
                });
            }
        });
    },

    watch: {
        // format(newFormat) {
        //     console.log(newFormat);
        //     this.control.format(newFormat)
        // },
        value: function value(newValue) {
            //set date if changed
            this.control.date(newValue ? (0, _momentTimezone2.default)(newValue) : null);
        },

        isDisabled: {
            handler: function handler(check) {
                console.log(check);
            },
            deep: true
        }
    },
    destroyed: function destroyed() {
        //this.control.destroy();
        //console.log("date destroyed: ", this.control)
    }
}; //
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    name: "vw-menu-instance-detail-component",
    props: ["menuInstanceId"],
    data: function data() {

        var menuConfigureTabs = [];

        var menuDetailTab = { text: "Menu Detail", id: 1 };
        var subMenuListTab = { text: "Sub Menu Lists", id: 2 };

        menuConfigureTabs.push(menuDetailTab);
        menuConfigureTabs.push(subMenuListTab);

        return {
            menuInstanceDetail: null,
            subMenuInstanceList: [],

            showNewSubMenu: false,

            menuConfigureTabs: menuConfigureTabs,
            selectedTabId: 1,

            showDeleteConfirmation: false,
            showDeleteFailureMessage: false,
            deleteFailureMessage: ""
        };
    },

    methods: {
        _initializeComponent: function _initializeComponent() {
            this.showErrorMessage = false;
            this.showDeleteFailureMessage = false;
            this.deleteFailureMessage = "";
            this.getData();
        },
        getData: function getData() {
            this._getMenuInstanceDetail();
        },
        _getMenuInstanceDetail: function _getMenuInstanceDetail() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "GetMenuInstanceDetail",
                params: {
                    menuInstanceId: vm.menuInstanceId
                },
                callback: function callback(error, response) {
                    if (error) {
                        console.error("Error while retrieving menu instance detail => ", error);
                        vm.$store.dispatch("toastr", {
                            type: "error",
                            header: "Error!",
                            message: error.sqlMessage ? error.sqlMessage : error
                        });
                        return;
                    }

                    if (response) {
                        vm.$store.dispatch("toastr", {
                            type: "success",
                            header: "Success!",
                            message: "Menu Detail retrieved."
                        });

                        if (response.hasOwnProperty("menuInstanceDetail")) {
                            vm.menuInstanceDetail = response.menuInstanceDetail;
                        }

                        if (response.hasOwnProperty("subMenuInstanceList")) {
                            vm.subMenuInstanceList = response.subMenuInstanceList;
                        }
                    }
                }
            });
        },
        createNewSubMenu: function createNewSubMenu() {
            var vm = this;
            vm.showNewSubMenu = true;
        },
        onClickCancelSubMenuCreation: function onClickCancelSubMenuCreation() {
            var vm = this;
            vm.showNewSubMenu = false;
        },
        onClick_goToSubMenuItemConfiguration: function onClick_goToSubMenuItemConfiguration(subMenuItem) {
            if (subMenuItem.hasOwnProperty("MenuInstanceIdText")) {
                this.$store.commit("setParentMenuInstanceId", this.menuInstanceId);
                window.location.href = this.$store.state.uiPageName + "#menuConfigure/" + subMenuItem.MenuInstanceIdText;
            }
        },
        onClick_selectTab: function onClick_selectTab(tabId) {
            this.selectedTabId = tabId;
        },
        onClick_ContinueWithDelete: function onClick_ContinueWithDelete() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "DeleteMenuInstanceDetail",
                params: {
                    menuInstanceId: vm.menuInstanceId
                },
                callback: function callback(error, response) {

                    vm.showDeleteConfirmation = false;

                    if (error) {
                        console.error("Error has occurred while deleting menu => ", error);
                        vm.$store.dispatch("toastr", {
                            type: "error",
                            header: "Error!",
                            message: error.sqlMessage ? error.sqlMessage : error
                        });
                        return;
                    }

                    if (response !== undefined && response !== null && response.hasOwnProperty("errorCode")) {

                        if (response.errorCode === 0) {

                            vm.$store.dispatch("toastr", {
                                type: "success",
                                header: "Success!",
                                message: "Menu Instance Successfully deleted!"
                            });
                            setTimeout(function () {
                                window.location.href = vm.$store.state.uiPageName + "#menuList";
                            }, 500);
                        } else if (response.errorCode === 1) {

                            vm.$store.dispatch("toastr", {
                                type: "info",
                                header: "Cannot delete this sub menu.",
                                message: response.hasOwnProperty("message") ? response.message : "Error has occurred while deleting menu."
                            });

                            vm.deleteFailureMessage = response.hasOwnProperty("message") ? response.message : "Error has occurred while deleting menu.";
                            vm.showDeleteFailureMessage = true;
                        }
                    }
                }
            });
        },
        onClick_CancelDelete: function onClick_CancelDelete() {
            var vm = this;

            vm.showErrorMessage = false;
        },
        onClick_SaveMenuDetails: function onClick_SaveMenuDetails() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "SaveMenuInstanceDetail",
                params: {
                    namespaceInstanceId: "",
                    namespaceInstanceName: "",
                    menuInstanceId: vm.menuInstanceId,
                    parentMenuInstanceId: vm.menuInstanceDetail.parentMenuInstanceId,
                    name: vm.menuInstanceDetail.MenuName,
                    description: vm.menuInstanceDetail.MenuDescription,
                    iconClass: vm.menuInstanceDetail.MenuIconClass,
                    navigateToUrl: vm.menuInstanceDetail.NavigateToUrl,
                    navigateToFragment: vm.menuInstanceDetail.NavigateToFragment,
                    methodToDisplayMenuCount: vm.menuInstanceDetail.MethodToDisplayMenuCount,
                    fragmentToDisplayMenuCount: vm.menuInstanceDetail.FragmentToDisplayMenuCount
                },
                callback: function callback(error, response) {
                    if (error) {
                        console.error("Save Menu Detail error => ", error);
                        vm.$store.dispatch("toastr", {
                            type: "error",
                            message: error.sqlMessage
                        });
                        return;
                    }

                    if (response) {
                        vm.$store.dispatch("toastr", {
                            type: "success",
                            message: "Menu Detail has been updated."
                        });
                    }
                }
            });
        }
    },
    computed: {
        selectedTab: function selectedTab() {
            return this.selectedTabId;
        }
    },
    watch: {
        menuInstanceId: function menuInstanceId() {
            this._initializeComponent();
        }
    },
    mounted: function mounted() {
        this._initializeComponent();
    }
};

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    name: "vw-menu-edit-meta-data-component",
    props: ["getMenuInstanceDetail", "cancelNewMenuCreation", "parentMenuInstanceId"],
    data: function data() {
        return {
            menuInstanceDetail: {
                namespaceInstanceId: "",
                namespaceInstanceName: "",
                menuInstanceId: null,
                parentMenuInstanceId: this.parentMenuInstanceId,
                name: "",
                description: "",
                iconClass: "",
                navigateToUrl: "",
                navigateToFragment: "",
                methodToDisplayMenuCount: "",
                fragmentToDisplayMenuCount: ""
            }
        };
    },

    methods: {
        onClick_createNewMenu: function onClick_createNewMenu() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "SaveMenuInstanceDetail",
                params: JSON.parse(JSON.stringify(vm.menuInstanceDetail)),
                callback: function callback(error, response) {
                    if (error) {
                        console.error("Error has occured while saving menu instance meta data.", error);
                        vm.$store.dispatch("toastr", {
                            type: "error",
                            message: error.sqlMessage
                        });
                        return;
                    }

                    if (response) {
                        vm.$store.dispatch("toastr", {
                            type: "success",
                            header: "Successful!",
                            message: "Menu Created."
                        });
                        if (!vm.parentMenuInstanceId) {
                            window.location.href = vm.$store.state.uiPageName + "#menuConfigure/" + response;
                        }

                        if (typeof vm.cancelNewMenuCreation === "function") {
                            vm.cancelNewMenuCreation();
                        }

                        setTimeout(function () {
                            if (typeof vm.getMenuInstanceDetail === "function") {
                                vm.getMenuInstanceDetail();
                            }
                        }, 2000);
                    }
                }
            });
        },
        onClick_cancelNewMenuCreation: function onClick_cancelNewMenuCreation() {
            var vm = this;

            if (typeof vm.cancelNewMenuCreation === "function") {
                vm.cancelNewMenuCreation();
            }
        }
    }
};

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    name: "vw-menu-instance-list-component",
    data: function data() {
        return {
            menuList: [],
            showNewMenu: false
        };
    },

    methods: {
        getData: function getData() {
            this._getMenuInstanceList();
        },
        _getMenuInstanceList: function _getMenuInstanceList() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "GetParentMenuInstanceList",
                params: {},
                callback: function callback(error, response) {
                    if (error) {
                        console.error("Error while retrieving menus list. => ", error);
                        return;
                    }

                    if (response) {
                        vm.menuList = response;
                    }
                }
            });
        },
        createMenu: function createMenu() {
            var vm = this;

            vm.showNewMenu = true;
        },
        onClickCancelMenuCreation: function onClickCancelMenuCreation() {
            var vm = this;

            vm.showNewMenu = false;
        },
        onClick_goToMenuItemConfiguration: function onClick_goToMenuItemConfiguration(menuItem) {
            if (menuItem.hasOwnProperty("MenuInstanceIdText")) {
                this.$store.commit("setParentMenuInstanceId", menuItem.MenuInstanceIdText);
                window.location.href = this.$store.state.uiPageName + "#menuConfigure/" + menuItem.MenuInstanceIdText;
            }
        }
    },
    mounted: function mounted() {
        this.getData();
    }
};

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    // options
    name: "notificationItemComponent",
    props: ["instanceId", "filterType", "updateCount", "instance"],
    data: function data() {
        return {};
    },

    methods: {
        getData: function getData() {
            //call action to get data
            this.$store.dispatch("getNotificationDetail", { "params": { notificationId: this.instanceId.toString() } });
        },
        selectInstance: function selectInstance(instance) {
            window.location.href = this.$store.state.uiPageName + "#instance/" + instance.response.cbkey;
        },
        naviagateToDetail: function naviagateToDetail(notificationObj) {
            this.dismissNotification(notificationObj);
            window.location.href = this.$store.state.uiPageName + "#notifications/" + notificationObj.NotificationIdText;
        },
        dismissNotification: function dismissNotification(notificationObj) {
            var scope = this;
            scope.updateCount(notificationObj);
            notificationObj.Status = 2;

            scope.updateNotificationStatus([notificationObj.NotificationIdText]);
        },
        dimissAllNotifications: function dimissAllNotifications() {
            var scope = this;
            var arrNotificationIds = [];

            scope.unreadCount = 0;

            for (var index = 0; index < scope.notificatoinKeyList.length; index++) {
                if (scope.notificatoinKeyList[index]["Status"] == 1) {
                    scope.notificatoinKeyList[index]["Status"] = 2;
                    arrNotificationIds.push(scope.notificatoinKeyList[index]["NotificationIdText"]);
                }
            }

            if (arrNotificationIds.length > 0) {
                scope.updateNotificationStatus(arrNotificationIds);
            }
        },
        updateNotificationStatus: function updateNotificationStatus(arrNotificationIds) {
            var scope = this;

            scope.$store.dispatch("dataRequestHandler", {
                key: "DismissNotification",
                params: {
                    notificationId: arrNotificationIds,
                    statusId: 2
                },
                callback: function callback(err, response) {
                    //console.log(response);
                    if (err) return;
                }
            });
        }
    },
    computed: {
        entityInstance: function entityInstance() {
            return this.$store.getters.getNotificationDetail({ "params": { notificationId: this.instanceId.toString() } });
        }
    },
    watch: {
        instanceId: function instanceId(value) {
            this.getData();
        },
        instance: function instance() {}
    },
    mounted: function mounted() {
        this.getData();
    }
};

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    name: "vw-user-group-edit-meta-data-component",
    props: ["namespaceInstanceId", "namespaceInstanceName", "onClickCancelUserGroupCreation"],
    data: function data() {
        return {};
    },

    methods: {
        onClick_createNewUserGroup: function onClick_createNewUserGroup() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "SaveUserGroupDetail",
                params: JSON.parse(JSON.stringify(vm.userGroupInstanceDetail)),
                callback: function callback(error, response) {
                    if (error) {
                        console.error("Error has occured => ", error);
                        vm.$store.dispatch("toastr", {
                            type: "error",
                            header: "User Group Instance Detail Error!",
                            message: error.sqlMessage ? error.sqlMessage : error
                        });
                        return;
                    }

                    if (response) {
                        vm.$store.dispatch("toastr", {
                            type: "success",
                            header: "Success!",
                            message: "User Group Instance successfully saved"
                        });
                        window.location.href = vm.$store.state.uiPageName + "#userGroupInstance/" + response;
                    }
                }
            });
        },
        onClick_cancelNewUserGroupCreation: function onClick_cancelNewUserGroupCreation() {
            var vm = this;

            if (typeof vm.onClickCancelUserGroupCreation === "function") {
                vm.onClickCancelUserGroupCreation();
            }
        }
    },
    computed: {
        userGroupInstanceDetail: function userGroupInstanceDetail() {
            var vm = this;

            if (vm.userGroupInstanceId !== undefined && vm.userGroupInstanceId !== null && vm.userGroupInstanceId !== "") {} else {
                return {
                    namespaceInstanceId: "",
                    namespaceInstanceName: "",
                    userGroupInstanceId: null,
                    name: "",
                    description: "",
                    iconClass: "",
                    isAdminGroup: false
                };
            }
        }
    }
};

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    name: "vw-user-group-instance-component",
    props: ["userGroupInstanceId"],
    data: function data() {
        var userGroupConfigureTabs = [];

        var userGroupDetail = { text: "User Group Settings", id: 1 };
        var userToUserGroupAssociations = { text: "User to User Group Assc", id: 2 };
        var userGroupToMenusAssociations = { text: "User Group To Menu Assc", id: 3 };

        userGroupConfigureTabs.push(userGroupDetail);
        userGroupConfigureTabs.push(userToUserGroupAssociations);
        userGroupConfigureTabs.push(userGroupToMenusAssociations);

        return {
            userGroupInstanceDetail: null,
            userToUserGroupAllocation: [],
            userGroupToMenuAllocation: [],

            userGroupConfigureTabs: userGroupConfigureTabs,
            selectedTabId: 2,

            showDeleteConfirmation: false
        };
    },

    methods: {
        getData: function getData() {
            this._getUserGroupInstanceDetailWithUserList();
        },
        _getUserGroupInstanceDetailWithUserList: function _getUserGroupInstanceDetailWithUserList() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "GetUserGroupDetail",
                params: {
                    userGroupInstanceId: vm.userGroupInstanceId
                },
                callback: function callback(error, response) {

                    if (response) {
                        if (response.hasOwnProperty("userGroupInstanceDetail")) {
                            vm.userGroupInstanceDetail = response.userGroupInstanceDetail;
                        }

                        if (response.hasOwnProperty("userToUserGroupAllocation")) {
                            vm.userToUserGroupAllocation = response.userToUserGroupAllocation;
                        }

                        if (response.hasOwnProperty("userGroupToMenuAllocation")) {
                            vm.userGroupToMenuAllocation = response.userGroupToMenuAllocation;
                        }
                    }
                }
            });
        },
        onClick_SaveUserToUserGroupAllocation: function onClick_SaveUserToUserGroupAllocation(userAllocatedItem) {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "SaveUserToUserGroupAllocation",
                params: {
                    userAllocatedItem: userAllocatedItem,
                    userGroupInstanceId: vm.userGroupInstanceId,
                    userGroupInstanceName: vm.userGroupInstanceDetail.UserGroupInstanceName
                },
                callback: function callback(error, response) {
                    if (error) {
                        console.error("Error has occured while allocating a user to the user group => ", error);
                        vm.$store.dispatch("toastr", {
                            type: "error",
                            header: "Failed to save!",
                            message: "User to User Group Failed to save."
                        });
                        return;
                    }
                    if (response === 1) {
                        if (userAllocatedItem.userGroupInstanceName === null || userAllocatedItem.userGroupInstanceName.trim() === "") {
                            userAllocatedItem.userGroupInstanceName = vm.userGroupInstanceDetail.UserGroupInstanceName;
                        } else {
                            userAllocatedItem.userGroupInstanceName += "," + vm.userGroupInstanceDetail.UserGroupInstanceName;
                        }
                    } else if (response === 0) {
                        if (userAllocatedItem.userGroupInstanceName.indexOf("," + vm.userGroupInstanceDetail.UserGroupInstanceName + ",") > -1) {
                            userAllocatedItem.userGroupInstanceName = userAllocatedItem.userGroupInstanceName.replace("," + vm.userGroupInstanceDetail.UserGroupInstanceName + ",", "");
                        } else if (userAllocatedItem.userGroupInstanceName.indexOf(vm.userGroupInstanceDetail.UserGroupInstanceName + ",") > -1) {
                            userAllocatedItem.userGroupInstanceName = userAllocatedItem.userGroupInstanceName.replace(vm.userGroupInstanceDetail.UserGroupInstanceName + ",", "");
                        } else if (userAllocatedItem.userGroupInstanceName.indexOf("," + vm.userGroupInstanceDetail.UserGroupInstanceName) > -1) {
                            userAllocatedItem.userGroupInstanceName = userAllocatedItem.userGroupInstanceName.replace("," + vm.userGroupInstanceDetail.UserGroupInstanceName, "");
                        } else if (userAllocatedItem.userGroupInstanceName.indexOf(vm.userGroupInstanceDetail.UserGroupInstanceName) > -1) {
                            userAllocatedItem.userGroupInstanceName = userAllocatedItem.userGroupInstanceName.replace(vm.userGroupInstanceDetail.UserGroupInstanceName, "");
                        }
                    }
                    vm.$store.dispatch("toastr", {
                        type: "success",
                        header: "Successfully Saved!",
                        message: "User to User Group Successfully Saved."
                    });
                }
            });
        },
        onClick_SaveUserToMenuAllocation: function onClick_SaveUserToMenuAllocation(userToMenuAllocatedItem) {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "SaveUserGroupToMenuAllocation",
                params: {
                    userToMenuAllocatedItem: JSON.parse(JSON.stringify(userToMenuAllocatedItem)),
                    userGroupInstanceId: vm.userGroupInstanceId
                },
                callback: function callback(error, response) {
                    if (error !== undefined && error !== null) {
                        console.error("Error has occured while saving user group to menu allocation => ", error);
                        vm.$store.dispatch("toastr", {
                            type: "error",
                            header: "Failed to save!",
                            message: "Menu to User Group Failed to save."
                        });
                        return;
                    }

                    if (response !== null && response !== undefined) {
                        vm.$store.dispatch("toastr", {
                            type: "success",
                            header: "Successfully Saved!",
                            message: "Menu to User Group Successfully Saved."
                        });
                        console.log("Response after allocating menu to user group. => ", response);
                    }
                }
            });
        },
        onClick_selectTab: function onClick_selectTab(tabId) {
            this.selectedTabId = tabId;
        },
        onClick_ContinueWithDelete: function onClick_ContinueWithDelete() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "DeleteUserGroupDetail",
                params: {
                    userGroupInstanceId: vm.userGroupInstanceId
                },
                callback: function callback(error, response) {
                    vm.showDeleteConfirmation = false;

                    if (response !== undefined && response !== null && response.hasOwnProperty("errorCode") && response.errorCode === 0) {

                        vm.$store.dispatch("toastr", {
                            type: "success",
                            header: "Success!",
                            message: "User Group Deleted Successfully!"
                        });

                        window.location.href = vm.$store.state.uiPageName + "#userGroupList";
                    }
                }
            });
        },
        onClick_SaveUserGroupSettings: function onClick_SaveUserGroupSettings() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "SaveUserGroupDetail",
                params: {
                    userGroupInstanceId: vm.userGroupInstanceId,
                    name: vm.userGroupInstanceDetail.UserGroupInstanceName,
                    description: vm.userGroupInstanceDetail.UserGroupInstanceDescription,
                    iconClass: vm.userGroupInstanceDetail.UserGroupInstanceIconClass,
                    isAdminGroup: vm.userGroupInstanceDetail.IsUserGroupInstanceAdmin
                },
                callback: function callback(error, response) {
                    if (error) {
                        console.error("Error has occured => ", error);
                        vm.$store.dispatch("toastr", {
                            type: "error",
                            message: error
                        });
                        return;
                    }

                    if (response) {
                        vm.$store.dispatch("toastr", {
                            type: "success",
                            message: "User Group Updated successfully."
                        });
                        // window.location.href = vm.$store.state.uiPageName + "#userGroupInstance/" + response;
                    }
                }
            });
        }
    },
    computed: {
        selectedTab: function selectedTab() {
            return this.selectedTabId;
        }
    },
    watch: {
        userGroupInstanceId: function userGroupInstanceId() {
            this.getData();
        }
    },
    mounted: function mounted() {
        this.getData();
    }
};

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    name: "vw-user-group-list-component",
    data: function data() {
        return {
            userGroupList: [],
            showNewUserGroup: false
        };
    },

    methods: {
        getData: function getData() {
            this._getUserGroupList();
        },
        _getUserGroupList: function _getUserGroupList() {
            var vm = this;

            vm.$store.dispatch("dataRequestHandler", {
                key: "GetUserGroupList",
                params: {},
                callback: function callback(error, response) {
                    if (error) {
                        console.error("Error => ", error);
                        return;
                    }

                    if (response) {
                        console.log("Response => ", response);
                        vm.userGroupList = response;
                    }
                }
            });
        },
        createUserGroup: function createUserGroup() {
            var vm = this;
            console.log("create new user group list.");
            vm.showNewUserGroup = true;
        },
        onClickCancelUserGroupCreation: function onClickCancelUserGroupCreation() {
            var vm = this;

            vm.showNewUserGroup = false;
        },
        onClick_goToUserGroupInstance: function onClick_goToUserGroupInstance(userGroupItem) {
            var vm = this;

            if (userGroupItem && userGroupItem.hasOwnProperty("UserGroupInstanceIdText")) {
                window.location.href = vm.$store.state.uiPageName + "#userGroupInstance/" + userGroupItem.UserGroupInstanceIdText;
            }
        }
    },
    mounted: function mounted() {
        this.getData();
    }
};

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    // options
    name: "userHeaderComponent",
    props: ["col"],
    data: function data() {
        return {
            currCol: undefined,
            move: undefined,
            stop: undefined,
            startClientRectLeft: undefined,
            size: undefined,
            percentage: undefined,
            table: undefined,
            width: 250
        };
    },

    methods: {
        createNewInstance: function createNewInstance() {
            //console.log('createNewInstance');
            //if()
            var uiPageName = this.$store.state.uiPageName;
            var requestParams = {
                entityId: this.entityId,
                type: "entityInstance",
                parentId: this.parentId,
                parentType: this.parentType,
                parentPath: this.parentType === "client" ? [] : this.$store.state.entityInstance[this.parentId.toString()].response.parentPath.concat([Number(this.parentId)]),
                clientId: this.clientId,
                navigateToDetail: true
                // callback: function (newCbkey) {
                //     window.location.href = uiPageName + "#client/" + requestParams.clientId + "/instance/" + newCbkey;
                // }
            };
            this.$store.dispatch("createNewInstance", requestParams);
        },
        getData: function getData() {
            //call action to get data
            this.$store.dispatch("getUserList", { type: "user", parentType: this.parentType, entityId: this.entityId, paramId: this.paramId });
        },
        editParentInstance: function editParentInstance() {
            window.location.href = this.$store.state.uiPageName + "#client/" + this.clientId + "/entity/" + this.entityId + "/edit";
        },
        setWidth: function setWidth(elem, width) {
            elem.style.width = width + "px";
        },
        startDragging: function startDragging(e) {
            e.preventDefault();
            //console.log("Dragged");
            this.currCol = e.target.parentElement;
            this.move = this.drag;
            this.stop = this.stopDragging;
            this.table = this.currCol.parentElement.parentElement.parentElement;
            window.addEventListener('mouseup', this.stop);
            window.addEventListener('touchend', this.stop);
            window.addEventListener('touchcancel', this.stop);
            this.table.addEventListener('mousemove', this.move);
            this.table.addEventListener('touchmove', this.move);
            this.currCol.style.userSelect = 'none';
            this.currCol.style.webkitUserSelect = 'none';
            this.currCol.style.MozUserSelect = 'none';
            this.currCol.style.pointerEvents = 'none';
            this.table.style.cursor = "ew-resize";
            var computedStyle = window.getComputedStyle(this.table);
            var parentSize = this.table.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
            this.startClientRectLeft = this.currCol.getBoundingClientRect()["left"];
        },
        drag: function drag(e) {
            var offset;
            if ('touches' in e) {
                offset = e.touches[0]["clientX"] - this.startClientRectLeft;
            } else {
                offset = e["clientX"] - this.startClientRectLeft;
            }
            //console.log(offset);
            this.width = offset;
            this.setWidth(this.currCol, offset);
        },
        stopDragging: function stopDragging() {
            window.removeEventListener('mouseup', this.stop);
            window.removeEventListener('touchend', this.stop);
            window.removeEventListener('touchcancel', this.stop);
            this.table.removeEventListener('mousemove', this.move);
            this.table.removeEventListener('touchmove', this.move);
            this.currCol.style.userSelect = '';
            this.currCol.style.webkitUserSelect = '';
            this.currCol.style.MozUserSelect = '';
            this.currCol.style.pointerEvents = '';
            this.table.style.cursor = "";
            this.currCol = undefined;
            this.move = undefined;
            this.stop = undefined;
            this.startClientRectLeft = undefined, this.size = undefined, this.percentage = undefined;
        }
    },
    computed: {},
    watch: {
        // parentId: function (value) {
        //     this.getData();
        // },
        // parentType: function (value) {
        //     this.getData();
        // },
        // entityId: function (value) {
        //     this.getData();
        // },
        // clientId: function (value) {
        //     this.getData();
        // },
        // paramId: function (value) {
        //     this.getData();
        // }
    },
    mounted: function mounted() {
        //this.getData();
    }
};

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//

exports.default = {
    // options
    name: "userListComponent",
    props: [],
    data: function data() {
        return {
            userList: [],
            listType: 'list'
        };
    },

    methods: {
        createNewInstance: function createNewInstance() {
            var uiPageName = this.$store.state.uiPageName;
            window.location.href = uiPageName + "#user/0";
        },
        getData: function getData() {
            //call action to get data
            var self = this;
            this.$store.dispatch("dataRequestHandler", {
                key: "GetUserList", params: {}, callback: function callback(err, response) {
                    self.userList = response[0];
                }
            });
        },
        editParentInstance: function editParentInstance() {
            window.location.href = this.$store.state.uiPageName + "#client/" + this.clientId + "/entity/" + this.entityId + "/edit";
        },
        editUser: function editUser(userObj) {
            //console.log(userObj);
            window.location.href = this.$store.state.uiPageName + "#user/" + userObj.vwUserIdText;
        },
        switchView: function switchView() {
            if (this.listType == 'list') this.listType = 'card';else this.listType = 'list';
        }
    },
    computed: {
        // userList() {
        //     let instanceObj = this.$store.getters.getUserList({ type: "user" });
        //     if (instanceObj && instanceObj.user && Array.isArray(instanceObj.user.response)) {
        //         return instanceObj.user.response;
        //     }
        //     return [];
        // },
        // entity() {
        //     return this.$store.getters.getEntity(this.entityId);
        // },
        columns: function columns() {
            //if (this.entity && this.entity.status === "success") {
            // let entity = this.user.response;
            // let columns = this.entity.response.layoutFields.map(l => { return entity.parameters[l.toString()] });
            // return columns.filter(c => {
            //     return c.dataTypeId !== 6 && (c.dataTypeId !== 9 || (c.dataTypeId === 9 && c.relationshipType === 1 && (c.entityId || c.parentParamId)))
            // })
            // }
            return [{ "label": "First Name" }, { "label": "Last Name" }, { "label": "Email" }, { "label": "Reporting Manager" }, { "label": "LoginId" }, { "label": "Campus Name" }, { "label": "Designation" }];
        }
    },
    watch: {
        // parentId: function (value) {
        //     this.getData();
        // },
        // parentType: function (value) {
        //     this.getData();
        // },
        // entityId: function (value) {
        //     this.getData();
        // },
        // clientId: function (value) {
        //     this.getData();
        // },
        // paramId: function (value) {
        //     this.getData();
        // }
    },
    mounted: function mounted() {
        this.getData();
    }
};

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//

exports.default = {
    // options
    name: "userSearchComponent",
    props: ["toggleSearch", "assignRelation", "onSearch", "resultsArray", "value"],
    data: function data() {
        return {
            query: '',
            current: -1,
            loading: false,
            selectFirst: false,
            //if needed, get these from above
            limit: 5,
            minChars: 3,
            timer: null
        };
    },

    methods: {
        getData: function getData() {
            this.query = this.value;
            //this.$store.dispatch("getDataByType", { type: "entity", cbkey: this.entityId.toString() })
        },
        update: function update() {
            window.clearTimeout(this.timer);

            if (!this.query) {
                this.query = "";
                return this.reset();
            }

            if (this.minChars && this.query.length < this.minChars) {
                return;
            }

            this.loading = true;

            var that = this;

            this.timer = window.setTimeout(function () {

                that.onSearch({ "query": that.query });
            }, 500);
        },

        handleSeachResult: function handleSeachResult(response) {
            //this.resultsArray = this.limit ? this.resultsArray.slice(0, this.limit) : this.resultsArray
            this.current = -1;
            this.loading = false;

            if (this.selectFirst) {
                this.down();
            }
        },

        reset: function reset(item) {
            //this.resultsArray = []                
            this.loading = false;
            this.toggleSearch(false);
            //this.query = "";                
        },
        setActive: function setActive(index) {
            this.current = index;
        },
        activeClass: function activeClass(index) {
            return {
                active: this.current === index
            };
        },
        hit: function hit() {
            if (this.current !== -1) {
                this.onHit(this.resultsArray[this.current]);
            }
        },
        up: function up() {
            if (this.current > 0) {
                this.current--;
            } else if (this.current === -1) {
                this.current = this.resultsArray.length - 1;
            } else {
                this.current = -1;
            }
        },
        down: function down() {
            if (this.current < this.resultsArray.length - 1) {
                this.current++;
            } else {
                this.current = -1;
            }
        },
        onHit: function onHit(item) {
            this.assignRelation(item);
            this.reset();
            if (item) this.query = item.FirstName + " " + item.LastName;
        }
    },
    computed: {
        hasItems: function hasItems() {
            return this.resultsArray && this.resultsArray.length > 0;
        },
        isEmpty: function isEmpty() {
            return !this.query;
        },
        isDirty: function isDirty() {
            return !!this.query;
        },
        entity: function entity() {
            if (this.entityId) {
                var _entity = this.$store.getters.getEntity(this.entityId.toString());
                if (_entity && _entity.response) {
                    return _entity.response;
                }
            }
            return null;
        }
    },
    watch: {
        resultsArray: function resultsArray(value) {
            this.handleSeachResult();
        },
        value: function value() {
            this.getData();
        }
    },
    mounted: function mounted() {
        this.getData();
    }
};

/***/ }),
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(29)();
// imports


// module
exports.push([module.i, "\n.Typeahead[data-v-60ec9840] {\n  position: relative;\n}\n.Typeahead__input[data-v-60ec9840] {\n  display: block;\n    width: 100%;\n    padding: 0.5rem 0.75rem;\n    font-size: 1rem;\n    line-height: 1.25;\n    color: #464a4c;\n    background-color: #fff;\n    background-image: none;\n    background-clip: padding-box;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0;\n    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n.Typeahead__input[data-v-60ec9840]:focus {\n  color: #464a4c;\n    background-color: #fff;\n    border-color: #71b5f0;\n    outline: none;\n}\n.fa-times[data-v-60ec9840] {\n  cursor: pointer;\n}\n.Typeahead i[data-v-60ec9840] {\n  float: right;\n  position:absolute !important;\n  top: 10px;\n  right: 13px;\n  opacity: 0.4;\n}\n.Typeahead ul[data-v-60ec9840] {\n  position: absolute;\n  padding: 0;\n  margin-top: 0px;\n  min-width: 100%;\n  background-color: #fff;\n  list-style: none;\n  border-radius: 4px;\n  box-shadow: 0 0 10px rgba(0,0,0, 0.25);\n  z-index: 1000;\n}\n.Typeahead li[data-v-60ec9840] {\n  padding: 5px 10px;\n  border-bottom: 1px solid #ccc;\n  cursor: pointer;\n}\n.Typeahead li[data-v-60ec9840]:first-child {\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.Typeahead li[data-v-60ec9840]:last-child {\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border-bottom: 0;\n}\n.Typeahead span[data-v-60ec9840] {\n  display: block;\n  color: #2c3e50;\n  \n  font-size: 14px !important;\n}\n.Typeahead .active[data-v-60ec9840] {\n  background-color: #3a9bfa;\n}\n.Typeahead .active span[data-v-60ec9840] {\n  color: white;\n}\n.Typeahead .name[data-v-60ec9840] {\n  font-weight: 700;\n  font-size: 18px;\n}\n.Typeahead .screen-name[data-v-60ec9840] {\n  font-style: italic;\n}", "", {"version":3,"sources":["/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/userSearchComponent/userSearchComponent.css"],"names":[],"mappings":";AACA;EACE,mBAAmB;CACpB;AAED;EACE,eAAe;IACb,YAAY;IACZ,wBAAwB;IACxB,gBAAgB;IAChB,kBAAkB;IAClB,eAAe;IACf,uBAAuB;IACvB,uBAAuB;IACvB,6BAA6B;IAC7B,sCAAsC;IACtC,iBAAiB;IACjB,yEAAyE;CAC5E;AACD;EACE,eAAe;IACb,uBAAuB;IACvB,sBAAsB;IACtB,cAAc;CACjB;AACD;EACE,gBAAgB;CACjB;AACD;EACE,aAAa;EACb,6BAA6B;EAC7B,UAAU;EACV,YAAY;EACZ,aAAa;CACd;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,gBAAgB;EAChB,gBAAgB;EAChB,uBAAuB;EACvB,iBAAiB;EACjB,mBAAmB;EACnB,uCAAuC;EACvC,cAAc;CAGf;AACD;EACE,kBAAkB;EAClB,8BAA8B;EAC9B,gBAAgB;CAGjB;AACD;EACE,4BAA4B;EAC5B,6BAA6B;CAC9B;AACD;EACE,+BAA+B;EAC/B,gCAAgC;EAChC,iBAAiB;CAClB;AACD;EACE,eAAe;EACf,eAAe;;EAEf,2BAA2B;CAC5B;AACD;EACE,0BAA0B;CAE3B;AACD;EACE,aAAa;CACd;AACD;EACE,iBAAiB;EACjB,gBAAgB;CACjB;AACD;EACE,mBAAmB;CACpB","file":"userSearchComponent.css","sourcesContent":["\n.Typeahead {\n  position: relative;\n}\n\n.Typeahead__input {\n  display: block;\n    width: 100%;\n    padding: 0.5rem 0.75rem;\n    font-size: 1rem;\n    line-height: 1.25;\n    color: #464a4c;\n    background-color: #fff;\n    background-image: none;\n    background-clip: padding-box;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0;\n    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n.Typeahead__input:focus {\n  color: #464a4c;\n    background-color: #fff;\n    border-color: #71b5f0;\n    outline: none;\n}\n.fa-times {\n  cursor: pointer;\n}\n.Typeahead i {\n  float: right;\n  position:absolute !important;\n  top: 10px;\n  right: 13px;\n  opacity: 0.4;\n}\n.Typeahead ul {\n  position: absolute;\n  padding: 0;\n  margin-top: 0px;\n  min-width: 100%;\n  background-color: #fff;\n  list-style: none;\n  border-radius: 4px;\n  box-shadow: 0 0 10px rgba(0,0,0, 0.25);\n  z-index: 1000;\n  \n \n}\n.Typeahead li {\n  padding: 5px 10px;\n  border-bottom: 1px solid #ccc;\n  cursor: pointer;\n   \n\n}\n.Typeahead li:first-child {\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.Typeahead li:last-child {\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border-bottom: 0;\n}\n.Typeahead span {\n  display: block;\n  color: #2c3e50;\n  \n  font-size: 14px !important;\n}\n.Typeahead .active {\n  background-color: #3a9bfa;\n\n}\n.Typeahead .active span {\n  color: white;\n}\n.Typeahead .name {\n  font-weight: 700;\n  font-size: 18px;\n}\n.Typeahead .screen-name {\n  font-style: italic;\n}"],"sourceRoot":""}]);

// exports


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(29)();
// imports


// module
exports.push([module.i, "\n.cursorPointer {\n    cursor: pointer;\n}\n.cursorGrab {\n    cursor: grab;\n    cursor: -webkit-grab;\n    cursor: -moz-grab;\n}\n.cursorGrabbing {\n    cursor: grabbing;\n    cursor: -webkit-grabbing;\n    cursor: -moz-grabbing;\n}\n", "", {"version":3,"sources":["/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/userModule/userProfileComponentVue/vueAvatar/VueAvatar.vue?df97861c"],"names":[],"mappings":";AAQA;IACA,gBAAA;CACA;AAEA;IACA,aAAA;IACA,qBAAA;IACA,kBAAA;CACA;AAEA;IACA,iBAAA;IACA,yBAAA;IACA,sBAAA;CACA","file":"VueAvatar.vue","sourcesContent":["<template>\n    <div>\n        <canvas :width=\"canvasWidth\" :height=\"canvasHeight\" ref=\"canvas\" @dragover.prevent @drop=\"onDrop\" @mousedown=\"onDragStart\"\n            @mouseup=\"onDragEnd\" @mousemove=\"onMouseMove\" @click=\"clicked\" v-bind:class=\"cursor\"></canvas>\n        <input type=\"file\" id='ab-1' @change=\"fileSelected\" style=\"display:none;\">\n    </div>\n</template>\n<style type=\"text/css\">\n    .cursorPointer {\n        cursor: pointer;\n    }\n    \n    .cursorGrab {\n        cursor: grab;\n        cursor: -webkit-grab;\n        cursor: -moz-grab;\n    }\n    \n    .cursorGrabbing {\n        cursor: grabbing;\n        cursor: -webkit-grabbing;\n        cursor: -moz-grabbing;\n    }\n</style>\n<script>\n    const drawRoundedRect = (context, x, y, width, height, borderRadius) => {\n        if (borderRadius === 0) {\n            context.rect(x, y, width, height)\n        } else {\n            const widthMinusRad = width - borderRadius\n            const heightMinusRad = height - borderRadius\n            context.translate(x, y)\n            context.arc(borderRadius, borderRadius, borderRadius, Math.PI, Math.PI * 1.5)\n            context.lineTo(widthMinusRad, 0)\n            context.arc(widthMinusRad, borderRadius, borderRadius, Math.PI * 1.5, Math.PI * 2)\n            context.lineTo(width, heightMinusRad)\n            context.arc(widthMinusRad, heightMinusRad, borderRadius, Math.PI * 2, Math.PI * 0.5)\n            context.lineTo(borderRadius, height)\n            context.arc(borderRadius, heightMinusRad, borderRadius, Math.PI * 0.5, Math.PI)\n            context.translate(-x, -y)\n        }\n    }\n    export default {\n        props: {\n            image: {\n                type: String,\n                default: 'https://vuejs.org/images/logo.png'\n            },\n            border: {\n                type: Number,\n                default: 0\n            },\n            borderRadius: {\n                type: Number,\n                default: 0\n            },\n            width: {\n                type: Number,\n                default: 200\n            },\n            height: {\n                type: Number,\n                default: 200\n            },\n            color: {\n                type: Array,\n                default: function () { return [0, 0, 0, 0.5] }\n            }\n        },\n        data: function () {\n            return {\n                cursor: 'cursorPointer',\n                scale: 1,\n                canvas: null,\n                context: null,\n                dragged: false,\n                imageLoaded: false,\n                changed: false,\n                state: {\n                    drag: false,\n                    my: null,\n                    mx: null,\n                    xxx: \"ab\",\n                    image: {\n                        x: 0,\n                        y: 0,\n                        resource: null\n                    }\n                }\n            }\n        },\n        computed: {\n            canvasWidth: function () {\n                return this.getDimensions().canvas.width\n            },\n            canvasHeight: function () {\n                return this.getDimensions().canvas.height\n            }\n        },\n        mounted: function () {\n            this.canvas = this.$refs.canvas\n            this.context = this.canvas.getContext('2d')\n            this.paint()\n            if (!this.image) {\n                var placeHolder = this.svgToImage(this.context, '<svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 65 65\"><defs><style>.cls-1{fill:#999;}</style></defs><title>Upload_Upload</title><path class=\"cls-1\" d=\"M32.5,1A31.5,31.5,0,1,1,1,32.5,31.54,31.54,0,0,1,32.5,1m0-1A32.5,32.5,0,1,0,65,32.5,32.5,32.5,0,0,0,32.5,0h0Z\"/><polygon class=\"cls-1\" points=\"41.91 28.2 32.59 18.65 23.09 28.39 24.17 29.44 31.87 21.54 31.87 40.05 33.37 40.05 33.37 21.59 40.83 29.25 41.91 28.2\"/><polygon class=\"cls-1\" points=\"40.66 40.35 40.66 44.35 24.34 44.35 24.34 40.35 22.34 40.35 22.34 44.35 22.34 46.35 24.34 46.35 40.66 46.35 42.66 46.35 42.66 44.35 42.66 40.35 40.66 40.35\"/></svg>');\n                var self = this;\n                placeHolder.onload = function () {\n                    var dim = self.getDimensions()\n                    var x = self.canvasWidth / 2 - this.width / 2\n                    var y = self.canvasHeight / 2 - this.height / 2\n                    self.context.drawImage(placeHolder, x, y, this.width, this.height);                    \n                }\n            }\n            else {\n                this.loadImage(this.image)\n            }\n        },\n        methods: {\n            svgToImage: function (ctx, rawSVG) {\n                var svg = new Blob([rawSVG], { type: \"image/svg+xml;charset=utf-8\" }),\n                    domURL = self.URL || self.webkitURL || self,\n                    url = domURL.createObjectURL(svg),\n                    img = new Image;\n                img.src = url;\n                return img;\n            },\n            setState: function (state1) {\n                var min = Math.ceil(1);\n                var max = Math.floor(10000);\n                this.state = state1;\n                this.state.cnt = 'HELLO' + Math.floor(Math.random() * (max - min)) + min\n            },\n            paint: function () {\n                this.context.save()\n                this.context.translate(0, 0)\n                this.context.fillStyle = 'rgba(' + this.color.slice(0, 4).join(',') + ')'\n                let borderRadius = this.borderRadius\n                const dimensions = this.getDimensions()\n                const borderSize = dimensions.border\n                const height = dimensions.canvas.height\n                const width = dimensions.canvas.width\n                // clamp border radius between zero (perfect rectangle) and half the size without borders (perfect circle or \"pill\")\n                borderRadius = Math.max(borderRadius, 0)\n                borderRadius = Math.min(borderRadius, width / 2 - borderSize, height / 2 - borderSize)\n                this.context.beginPath()\n                // inner rect, possibly rounded\n                drawRoundedRect(this.context, borderSize, borderSize, width - borderSize * 2, height - borderSize * 2, borderRadius)\n                this.context.rect(width, 0, -width, height) // outer rect, drawn \"counterclockwise\"\n                this.context.fill('evenodd')\n                this.context.restore()\n            },\n            getDimensions: function () {\n                return {\n                    width: this.width,\n                    height: this.height,\n                    border: this.border,\n                    canvas: {\n                        width: this.width + (this.border * 2),\n                        height: this.height + (this.border * 2)\n                    }\n                }\n            },\n            onDrop: function (e) {\n                e = e || window.event\n                e.stopPropagation()\n                e.preventDefault()\n                if (e.dataTransfer && e.dataTransfer.files.length) {\n                    //this.props.onDropFile(e)\n                    const reader = new FileReader()\n                    const file = e.dataTransfer.files[0]\n                    this.changed = true\n                    reader.onload = (e) => this.loadImage(e.target.result)\n                    reader.readAsDataURL(file)\n                }\n            },\n            onDragStart: function (e) {\n                e = e || window.event\n                e.preventDefault()\n                this.state.drag = true\n                this.state.mx = null\n                this.state.my = null\n                this.cursor = 'cursorGrabbing'\n            },\n            onDragEnd: function (e) {\n                if (this.state.drag) {\n                    this.state.drag = false\n                    this.cursor = 'cursorPointer'\n                }\n            },\n            onMouseMove: function (e) {\n                e = e || window.event\n                if (this.state.drag === false) {\n                    return\n                }\n                this.dragged = true\n                this.changed = true\n                let imageState = this.state.image\n                const lastX = imageState.x\n                const lastY = imageState.y\n                const mousePositionX = e.targetTouches ? e.targetTouches[0].pageX : e.clientX\n                const mousePositionY = e.targetTouches ? e.targetTouches[0].pageY : e.clientY\n                const newState = { mx: mousePositionX, my: mousePositionY, image: imageState }\n                if (this.state.mx && this.state.my) {\n                    const xDiff = (this.state.mx - mousePositionX) / this.scale\n                    const yDiff = (this.state.my - mousePositionY) / this.scale\n                    imageState.y = this.getBoundedY(lastY - yDiff, this.scale)\n                    imageState.x = this.getBoundedX(lastX - xDiff, this.scale)\n                }\n                this.state.mx = newState.mx\n                this.state.my = newState.my\n                this.state.image = imageState\n                //this.setState(newState)\n            },\n            loadImage: function (imageURL) {\n                var imageObj = new Image()\n                var self = this\n                imageObj.onload = function () {\n                    self.handleImageReady(imageObj)\n                }\n                //imageObj.onerror = this.props.onLoadFailure\n                if (!this.isDataURL(imageURL)) imageObj.crossOrigin = 'anonymous'\n                imageObj.src = imageURL\n            },\n            handleImageReady: function (image) {\n                var imageState = this.getInitialSize(image.width, image.height)\n                imageState.resource = image\n                imageState.x = 0\n                imageState.y = 0\n                var oldState = this.state\n                oldState.drag = false\n                oldState.image = imageState\n                this.state.image.x = 0\n                this.state.image.y = 0\n                this.state.image.resource = image\n                this.state.image.width = imageState.width\n                this.state.image.height = imageState.height\n                this.state.drag = false\n                this.scale = 1\n                this.$emit('vue-avatar-editor:image-ready', this.scale)\n                this.imageLoaded = true\n                this.cursor = 'cursorGrab'\n            },\n            getInitialSize: function (width, height) {\n                let newHeight\n                let newWidth\n                const dimensions = this.getDimensions()\n                const canvasRatio = dimensions.height / dimensions.width\n                const imageRatio = height / width\n                if (canvasRatio > imageRatio) {\n                    newHeight = (this.getDimensions().height)\n                    newWidth = (width * (newHeight / height))\n                }\n                else {\n                    newWidth = (this.getDimensions().width)\n                    newHeight = (height * (newWidth / width))\n                }\n                return {\n                    height: newHeight,\n                    width: newWidth\n                }\n            },\n            isDataURL(str) {\n                if (str === null) {\n                    return false\n                }\n                const regex = /^\\s*data:([a-z]+\\/[a-z]+(;[a-z\\-]+=[a-z\\-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\\-._~:@\\/?%\\s]*\\s*$/i\n                return !!str.match(regex)\n            },\n            getBoundedX: function (x, scale) {\n                var image = this.state.image\n                var dimensions = this.getDimensions()\n                let widthDiff = Math.floor((image.width - dimensions.width / scale) / 2)\n                widthDiff = Math.max(0, widthDiff)\n                return Math.max(-widthDiff, Math.min(x, widthDiff))\n            },\n            getBoundedY: function (y, scale) {\n                var image = this.state.image\n                var dimensions = this.getDimensions()\n                let heightDiff = Math.floor((image.height - dimensions.height / scale) / 2)\n                heightDiff = Math.max(0, heightDiff)\n                return Math.max(-heightDiff, Math.min(y, heightDiff))\n            },\n            paintImage: function (context, image, border) {\n                if (image.resource) {\n                    var position = this.calculatePosition(image, border)\n                    context.save()\n                    context.globalCompositeOperation = 'destination-over'\n                    context.drawImage(image.resource, position.x, position.y, position.width, position.height)\n                    context.restore()\n                }\n            },\n            calculatePosition: function (image, border) {\n                var image = image || this.state.image\n                var dimensions = this.getDimensions()\n                var width = image.width * this.scale\n                var height = image.height * this.scale\n                var widthDiff = (width - dimensions.width) / 2\n                var heightDiff = (height - dimensions.height) / 2\n                var x = image.x * this.scale - widthDiff + border\n                var y = image.y * this.scale - heightDiff + border\n                return {\n                    x,\n                    y,\n                    height,\n                    width\n                }\n            },\n            changeScale: function (sc) {\n                this.changed = true\n                this.scale = sc\n            },\n            redraw: function () {\n                this.context.clearRect(0, 0, this.getDimensions().canvas.width, this.getDimensions().canvas.height)\n                this.paint()\n                this.paintImage(this.context, this.state.image, this.border)\n            },\n            getImage: function () {\n                const cropRect = this.getCroppingRect()\n                const image = this.state.image\n                // get actual pixel coordinates\n                cropRect.x *= image.resource.width\n                cropRect.y *= image.resource.height\n                cropRect.width *= image.resource.width\n                cropRect.height *= image.resource.height\n                // create a canvas with the correct dimensions\n                const canvas = document.createElement('canvas')\n                canvas.width = cropRect.width\n                canvas.height = cropRect.height\n             \n                // draw the full-size image at the correct position,\n                // the image gets truncated to the size of the canvas.\n                canvas.getContext('2d').drawImage(image.resource, -cropRect.x, -cropRect.y)\n                return canvas\n            },\n            getImageScaled: function () {\n                const { width, height } = this.getDimensions()\n                const canvas = document.createElement('canvas')\n                canvas.width = width\n                canvas.height = height\n                // don't paint a border here, as it is the resulting image\n                this.paintImage(canvas.getContext('2d'), this.state.image, 0)\n                return canvas\n            },\n            imageChanged: function () {\n                return this.changed\n            },\n            getCroppingRect: function () {\n                const dim = this.getDimensions()\n                const frameRect = { x: dim.border, y: dim.border, width: dim.width, height: dim.height }\n                const imageRect = this.calculatePosition(this.state.image, dim.border)\n                return {\n                    x: (frameRect.x - imageRect.x) / imageRect.width,\n                    y: (frameRect.y - imageRect.y) / imageRect.height,\n                    width: frameRect.width / imageRect.width,\n                    height: frameRect.height / imageRect.height\n                }\n            },\n            clicked: function (e) {\n                if (this.dragged == true) {\n                    this.dragged = false\n                }\n                else {\n                    document.getElementById('ab-1').click()\n                }\n            },\n            fileSelected: function (e) {\n                var files = e.target.files || e.dataTransfer.files;\n                if (!files.length)\n                    return;\n                var image = new Image();\n                var reader = new FileReader();\n                this.changed = true\n                reader.onload = (e) => {\n                    this.loadImage(e.target.result)\n                };\n                reader.readAsDataURL(files[0]);\n            }\n        },\n        watch: {\n            state: {\n                handler: function (val, oldval) {\n                    if (this.imageLoaded == true)\n                        this.redraw();\n                },\n                deep: true\n            },\n            scale: function () {\n                if (this.imageLoaded == true)\n                    this.redraw();\n            }\n        }\n    }\n</script>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(29)();
// imports


// module
exports.push([module.i, "\n.modal-container {\n    width: 900px;\n    margin: 0px auto;\n    padding: 0px 0px;\n    background-color: #fff;\n    border-radius: 2px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);\n    transition: all .3s ease;\n    font-family: Helvetica, Arial, sans-serif;\n}\n.modal-body {\n    margin: 0 0;\n}\n", "", {"version":3,"sources":["/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/appointmentCalendar/appointmentCalendar.vue?097cdb02"],"names":[],"mappings":";AAEA;IACA,aAAA;IACA,iBAAA;IACA,iBAAA;IACA,uBAAA;IACA,mBAAA;IACA,yCAAA;IACA,yBAAA;IACA,0CAAA;CACA;AAEA;IACA,YAAA;CACA","file":"appointmentCalendar.vue","sourcesContent":["<template src=\"./appointmentCalendar.template.html\"></template>\n<style type=\"text/css\">\n    .modal-container {\n        width: 900px;\n        margin: 0px auto;\n        padding: 0px 0px;\n        background-color: #fff;\n        border-radius: 2px;\n        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);\n        transition: all .3s ease;\n        font-family: Helvetica, Arial, sans-serif;\n    }\n\n    .modal-body {\n        margin: 0 0;\n    }\n</style>\n<script type=\"text/javascript\">\n    import moment from 'moment-timezone'\n\n    export default {\n        name: \"appointmentCalendaromponent\",\n        props: [\"param\", \"onUpdate\", \"entityInstance\", \"entity\", \"isDisabled\", \"userId\"],\n        data() {\n            return {\n                control: null,\n                isChanging: false,\n                fcEvents: [\n                    // {\n                    //     title: 'Aug 8 first',\n                    //     start: '2017-08-08T01:00:00',\n                    //     end: '2017-08-08T02:59:59',\n                    //     color: '#378006',\n                    //     cssClass: 'firsthalf'\n                    // },\n                    // {\n                    //     title: 'Aug 8 second',\n                    //     start: '2017-08-08T04:00:00',\n                    //     end: '2017-08-08T05:59:59',\n                    //     color: '#ff0000',\n                    //     cssClass: 'secondhalf'\n                    // },\n                    // {\n                    //     title: 'event2',\n                    //     start: '2017-08-05',\n                    //     end: '2017-08-07'\n                    // },\n                    // {\n                    //     title: 'event3',\n                    //     start: '2017-08-09T12:30:00',\n                    //     allDay: false // will make the time show\n                    // }\n                ],\n                showModal: false,\n                popupHeader: 'Event details',\n                popupDetails: null\n            };\n        },\n        methods: {\n            updateValue(momentDateTime) {\n\n                // if (this.controlType == \"startTime\")\n                //     this.param.startTime = momentDateTime.utc().format();\n                // else if (this.controlType == \"endTime\")\n                //     this.param.endTime = momentDateTime.utc().format();\n                //console.log(moment(momentDateTime).utc().format(\"HH:mm\"));\n                //console.log(momentDateTime.utc().format());\n                //this.onUpdate(this.param, this.paramKey, momentDateTime);\n            },\n            isNumeric(n) {\n                return !isNaN(parseFloat(n)) && isFinite(n);\n            },\n            changeMonth(start, end, current) {\n                console.log('changeMonth', start, end, current)\n                this.getEntityInstanceData(current, end);\n            },\n            eventClick(event, jsEvent, pos) {\n                console.log('eventClick', event, jsEvent, pos)\n                // // this.popupDetails = event;\n                // // this.showModal = true;\n            },\n            dayClick(day, jsEvent) {\n                console.log('dayClick', day, jsEvent)\n            },\n            moreClick(day, events, jsEvent) {\n                console.log('moreCLick', day, events, jsEvent)\n            },\n            closePopup() {\n                this.showModal = false;\n            },\n            getEntityInstanceData(startDate, endDate) {\n                let vm = this;\n                vm.$store.dispatch(\"dataRequestHandler\", {\n                    key: \"GetUserMonthlyAppoinments\",\n                    params: {\n                        userId: this.userId,\n                        startDate: startDate,\n                        endDate: endDate\n                    },\n                    callback: (err, response) => {\n                        if (err) {\n                            console.error(err);\n                            return;\n                        }\n                        console.log(response);\n                        vm.fcEvents = response;\n                        // vm.fcEvents = [\n                        //     {\n                        //         title: 'Sunny Out of Office',\n                        //         start: '2017-09-25T13:30:00',\n                        //         end: '2017-09-27T13:30:00'\n                        //     },\n                        //     {\n                        //         title: 'Sunny Out of Office2',\n                        //         start: '2017-09-15',\n                        //         end: '2017-09-15'\n                        //     }\n                        // ];\n                    }\n                });\n            }\n        },\n        computed: {\n            // format(){\n            //     return 'HH:MM';\n            // }\n        },\n        mounted() {\n        },\n        watch: {\n            value(newValue) {\n                console.log(newValue);\n            },\n            isDisabled: {\n                handler: function (check) {\n                    console.log(check);\n                },\n                deep: true\n            }\n        },\n        destroyed() {\n            //this.control.destroy();\n            //console.log(\"date destroyed: \", this.control)\n        },\n        components: {\n            'full-calendar': require('vue-fullcalendar'),\n            'modal': {\n                template: '#appointmentEvent-modal-template',\n                methods: {\n                    save: function (flag) {\n                        this.$parent.closePopup();\n                    },\n                },\n            }\n        }\n    };\n\n</script>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(29)();
// imports


// module
exports.push([module.i, "\nfieldset {\n    display: block;\n    margin-left: 2px;\n    margin-right: 2px;\n    padding-top: 0.35em;\n    padding-bottom: 0.625em;\n    padding-left: 0.75em;\n    padding-right: 0.75em;\n    border: 2px groove;\n}\nlegend {\n    width: auto !important;\n    padding: 5px !important;\n}\n.form-label label {\n    color: #484747 !important;\n}\n.labels {\n    font-weight: bold;\n}\n.notes {\n    color: #7b8288 !important;\n}\n", "", {"version":3,"sources":["/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/userModule/userProfileComponentVue/userProfileComponentVue.vue?610d0821"],"names":[],"mappings":";AAEA;IACA,eAAA;IACA,iBAAA;IACA,kBAAA;IACA,oBAAA;IACA,wBAAA;IACA,qBAAA;IACA,sBAAA;IACA,mBAAA;CACA;AAEA;IACA,uBAAA;IACA,wBAAA;CACA;AAEA;IACA,0BAAA;CACA;AAEA;IACA,kBAAA;CACA;AAEA;IACA,0BAAA;CACA","file":"userProfileComponentVue.vue","sourcesContent":["<template src=\"./userProfileComponentVue.template.html\"></template>\n<style>\n    fieldset {\n        display: block;\n        margin-left: 2px;\n        margin-right: 2px;\n        padding-top: 0.35em;\n        padding-bottom: 0.625em;\n        padding-left: 0.75em;\n        padding-right: 0.75em;\n        border: 2px groove;\n    }\n\n    legend {\n        width: auto !important;\n        padding: 5px !important;\n    }\n\n    .form-label label {\n        color: #484747 !important;\n    }\n\n    .labels {\n        font-weight: bold;\n    }\n\n    .notes {\n        color: #7b8288 !important;\n    }\n</style>\n<script>\n    import Vue from 'vue'\n    import VueAvatar from './vueAvatar/VueAvatar.vue'\n    import VueAvatarScale from './vueAvatar/VueAvatarScale.vue'\n\n    export default {\n        data() {\n            return {\n                userProfile: null\n            }\n        },\n        props: [\"parentId\", \"parentType\", \"entityId\", \"clientId\", \"paramId\", \"listType\"],\n        methods: {\n            saveUserProfile: function () {\n                var self = this;\n                var img = this.$refs.vueavatar.getImageScaled()\n                this.$store.dispatch(\"dataRequestHandler\", {\n                    key: \"SaveUserProfile\",\n                    params: {\n                        profileImage: img.toDataURL(),\n                        nickName: self.userProfile.NickName\n                    },\n                    callback: function (err, response) {\n                        //console.log(response);\n                    }\n                });\n            },\n            getUserProfile: function () {\n                var self = this;\n                this.$store.dispatch(\"dataRequestHandler\", {\n                    key: 'GetUserProfile', params: {}, callback: function (err, response) {\n                        //console.log(err + \"/\" + response);\n                        if (response.length === 0) {\n                            return;\n                        }\n                        else {\n                            self.userProfile = response[0][0];\n                            if (self.userProfile.ProfileImage) {\n                                setTimeout(function () {\n                                    self.$refs.vueavatar.loadImage(self.userProfile.ProfileImage)\n                                }, 500);\n                            }\n                            else{\n                                setTimeout(function () {\n                                    self.$refs.vueavatar.loadImage(\"https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png\")\n                                }, 500);\n                            }\n                        }\n                    }\n                });\n            },\n            onChangeScale(scale) {\n                this.$refs.vueavatar.changeScale(scale)\n            },\n            saveClicked() {\n                var img = this.$refs.vueavatar.getImageScaled()\n                // use img \n            },\n            onImageReady(scale) {\n                this.$refs.vueavatarscale.setScale(scale)\n            }\n        },\n        computed: {\n        },\n        components: {\n            VueAvatar,\n            VueAvatarScale\n        },\n        mounted() {\n            this.getUserProfile();\n        }\n    }\n\n</script>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window == "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,

		$ = __webpack_provided_window_dot_jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,

		supportDraggable = !!('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/Trident.*rv[ :]?11\./)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;


	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0}
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		_on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}


			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'transform';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'pointercancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					_on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					setTimeout(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
					parent = target,
					i = touchDragOverListeners.length;

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var dataTransfer = evt.dataTransfer,
				options = this.options;

			this._offUpEvents();

			if (activeGroup.checkPull(this, this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, this.options.chosenClass, false);

				rootEl.insertBefore(cloneEl, dragEl);
				_dispatchEvent(this, rootEl, 'clone', dragEl);
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', this._onTouchMove);
					_on(document, 'touchend', this._onDrop);
					_on(document, 'touchcancel', this._onDrop);
					_on(document, 'pointermove', this._onTouchMove);
					_on(document, 'pointerup', this._onDrop);
				} else {
					// Old brwoser
					_on(document, 'mousemove', this._onTouchMove);
					_on(document, 'mouseup', this._onDrop);
				}

				this._loopId = setInterval(this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(this, dataTransfer, dragEl);
				}

				_on(document, 'drop', this);
				setTimeout(this._dragStarted, 0);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		return $
			? $(el).clone(true)[0]
			: (Polymer && Polymer.dom
				? Polymer.dom(el).cloneNode(true)
				: el.cloneNode(true)
			);
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	// Fixed #973: 
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				captureMode = {
					capture: false,
					passive: false
				};
			}
		}));
	} catch (err) {}

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.6.1';
	return Sortable;
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 387 */,
/* 388 */,
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Toastr
 * Copyright 2012-2015
 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * ARIA Support: Greta Krafsig
 *
 * Project: https://github.com/CodeSeven/toastr
 */
/* global define */
; (function (define) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
        return (function () {
            var $container;
            var listener;
            var toastId = 0;
            var toastType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning'
            };

            var toastr = {
                clear: clear,
                remove: remove,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: '2.1.2',
                warning: warning
            };

            var previousToast;

            return toastr;

            ////////////////

            function error(message, title, optionsOverride) {
                return notify({
                    type: toastType.error,
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function getContainer(options, create) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                if (create) {
                    $container = createContainer(options);
                }
                return $container;
            }

            function info(message, title, optionsOverride) {
                return notify({
                    type: toastType.info,
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function subscribe(callback) {
                listener = callback;
            }

            function success(message, title, optionsOverride) {
                return notify({
                    type: toastType.success,
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function warning(message, title, optionsOverride) {
                return notify({
                    type: toastType.warning,
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function clear($toastElement, clearOptions) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if (!clearToast($toastElement, options, clearOptions)) {
                    clearContainer(options);
                }
            }

            function remove($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    removeToast($toastElement);
                    return;
                }
                if ($container.children().length) {
                    $container.remove();
                }
            }

            // internal functions

            function clearContainer (options) {
                var toastsToClear = $container.children();
                for (var i = toastsToClear.length - 1; i >= 0; i--) {
                    clearToast($(toastsToClear[i]), options);
                }
            }

            function clearToast ($toastElement, options, clearOptions) {
                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
                if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
                    $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { removeToast($toastElement); }
                    });
                    return true;
                }
                return false;
            }

            function createContainer(options) {
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass)
                    .attr('aria-live', 'polite')
                    .attr('role', 'alert');

                $container.appendTo($(options.target));
                return $container;
            }

            function getDefaults() {
                return {
                    tapToDismiss: true,
                    toastClass: 'toast',
                    containerId: 'toast-container',
                    debug: false,

                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    onShown: undefined,
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    onHidden: undefined,
                    closeMethod: false,
                    closeDuration: false,
                    closeEasing: false,

                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: 'toast-error',
                        info: 'toast-info',
                        success: 'toast-success',
                        warning: 'toast-warning'
                    },
                    iconClass: 'toast-info',
                    positionClass: 'toast-top-right',
                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
                    titleClass: 'toast-title',
                    messageClass: 'toast-message',
                    escapeHtml: false,
                    target: 'body',
                    closeHtml: '<button type="button">&times;</button>',
                    newestOnTop: true,
                    preventDuplicates: false,
                    progressBar: false
                };
            }

            function publish(args) {
                if (!listener) { return; }
                listener(args);
            }

            function notify(map) {
                var options = getOptions();
                var iconClass = map.iconClass || options.iconClass;

                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                }

                if (shouldExit(options, map)) { return; }

                toastId++;

                $container = getContainer(options, true);

                var intervalId = null;
                var $toastElement = $('<div/>');
                var $titleElement = $('<div/>');
                var $messageElement = $('<div/>');
                var $progressElement = $('<div/>');
                var $closeElement = $(options.closeHtml);
                var progressBar = {
                    intervalId: null,
                    hideEta: null,
                    maxHideTime: null
                };
                var response = {
                    toastId: toastId,
                    state: 'visible',
                    startTime: new Date(),
                    options: options,
                    map: map
                };

                personalizeToast();

                displayToast();

                handleEvents();

                publish(response);

                if (options.debug && console) {
                    console.log(response);
                }

                return $toastElement;

                function escapeHtml(source) {
                    if (source == null)
                        source = "";

                    return new String(source)
                        .replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                }

                function personalizeToast() {
                    setIcon();
                    setTitle();
                    setMessage();
                    setCloseButton();
                    setProgressBar();
                    setSequence();
                }

                function handleEvents() {
                    $toastElement.hover(stickAround, delayedHideToast);
                    if (!options.onclick && options.tapToDismiss) {
                        $toastElement.click(hideToast);
                    }

                    if (options.closeButton && $closeElement) {
                        $closeElement.click(function (event) {
                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                                event.cancelBubble = true;
                            }
                            hideToast(true);
                        });
                    }

                    if (options.onclick) {
                        $toastElement.click(function (event) {
                            options.onclick(event);
                            hideToast();
                        });
                    }
                }

                function displayToast() {
                    $toastElement.hide();

                    $toastElement[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
                    );

                    if (options.timeOut > 0) {
                        intervalId = setTimeout(hideToast, options.timeOut);
                        progressBar.maxHideTime = parseFloat(options.timeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                        if (options.progressBar) {
                            progressBar.intervalId = setInterval(updateProgress, 10);
                        }
                    }
                }

                function setIcon() {
                    if (map.iconClass) {
                        $toastElement.addClass(options.toastClass).addClass(iconClass);
                    }
                }

                function setSequence() {
                    if (options.newestOnTop) {
                        $container.prepend($toastElement);
                    } else {
                        $container.append($toastElement);
                    }
                }

                function setTitle() {
                    if (map.title) {
                        $titleElement.append(!options.escapeHtml ? map.title : escapeHtml(map.title)).addClass(options.titleClass);
                        $toastElement.append($titleElement);
                    }
                }

                function setMessage() {
                    if (map.message) {
                        $messageElement.append(!options.escapeHtml ? map.message : escapeHtml(map.message)).addClass(options.messageClass);
                        $toastElement.append($messageElement);
                    }
                }

                function setCloseButton() {
                    if (options.closeButton) {
                        $closeElement.addClass('toast-close-button').attr('role', 'button');
                        $toastElement.prepend($closeElement);
                    }
                }

                function setProgressBar() {
                    if (options.progressBar) {
                        $progressElement.addClass('toast-progress');
                        $toastElement.prepend($progressElement);
                    }
                }

                function shouldExit(options, map) {
                    if (options.preventDuplicates) {
                        if (map.message === previousToast) {
                            return true;
                        } else {
                            previousToast = map.message;
                        }
                    }
                    return false;
                }

                function hideToast(override) {
                    var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
                    var duration = override && options.closeDuration !== false ?
                        options.closeDuration : options.hideDuration;
                    var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
                    if ($(':focus', $toastElement).length && !override) {
                        return;
                    }
                    clearTimeout(progressBar.intervalId);
                    return $toastElement[method]({
                        duration: duration,
                        easing: easing,
                        complete: function () {
                            removeToast($toastElement);
                            if (options.onHidden && response.state !== 'hidden') {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date();
                            publish(response);
                        }
                    });
                }

                function delayedHideToast() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    progressBar.hideEta = 0;
                    $toastElement.stop(true, true)[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing}
                    );
                }

                function updateProgress() {
                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
                    $progressElement.width(percentage + '%');
                }
            }

            function getOptions() {
                return $.extend({}, getDefaults(), toastr.options);
            }

            function removeToast($toastElement) {
                if (!$container) { $container = getContainer(); }
                if ($toastElement.is(':visible')) {
                    return;
                }
                $toastElement.remove();
                $toastElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                    previousToast = undefined;
                }
            }

        })();
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(453)));


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * vue-fullcalendar v1.0.9
 * (c) 2017 Sunny Wang <sunnywang0104@163.com> 
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueFullcalendar"] = factory();
	else
		root["VueFullcalendar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fullCalendar = __webpack_require__(1);

	var _fullCalendar2 = _interopRequireDefault(_fullCalendar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fc = _fullCalendar2.default;

	module.exports = fc;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(2)

	/* script */
	__vue_exports__ = __webpack_require__(6)

	/* template */
	var __vue_template__ = __webpack_require__(19)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/SunnyWang/code/vue-fullcalendar/src/fullCalendar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3e333dbe", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3e333dbe", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] fullCalendar.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-3e333dbe!./../node_modules/.npminstall/sass-loader/3.2.3/sass-loader/index.js!./../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./fullCalendar.vue", function() {
				var newContent = require("!!./../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-3e333dbe!./../node_modules/.npminstall/sass-loader/3.2.3/sass-loader/index.js!./../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./fullCalendar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\n.comp-full-calendar {\n  padding: 20px;\n  background: #fff;\n  max-width: 960px;\n  margin: 0 auto;\n}\n.comp-full-calendar ul, .comp-full-calendar p {\n    margin: 0;\n    padding: 0;\n    font-size: 14px;\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _langSets = __webpack_require__(7);

	var _langSets2 = _interopRequireDefault(_langSets);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    events: { // events will be displayed on calendar
	      type: Array,
	      default: []
	    },
	    lang: {
	      type: String,
	      default: 'en'
	    },
	    firstDay: {
	      type: Number | String,
	      validator: function validator(val) {
	        var res = parseInt(val);
	        return res >= 0 && res <= 6;
	      },

	      default: 0
	    },
	    titleFormat: {
	      type: String,
	      default: function _default() {
	        return _langSets2.default[this.lang].titleFormat;
	      }
	    },
	    monthNames: {
	      type: Array,
	      default: function _default() {
	        return _langSets2.default[this.lang].monthNames;
	      }
	    },
	    weekNames: {
	      type: Array,
	      default: function _default() {
	        var arr = _langSets2.default[this.lang].weekNames;
	        return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay));
	      }
	    }
	  },
	  data: function data() {
	    return {
	      currentDate: new Date()
	    };
	  },

	  methods: {
	    emitChangeMonth: function emitChangeMonth(start, end, currentStart, current) {
	      console.log('currentDate 2', this.currentDate);
	      this.currentDate = current;
	      console.log('currentDate 3', this.currentDate);
	      this.$emit('changeMonth', start, end, currentStart);
	    },
	    emitEventClick: function emitEventClick(event, jsEvent, pos) {
	      this.$emit('eventClick', event, jsEvent, pos);
	    },
	    emitDayClick: function emitDayClick(day, jsEvent) {
	      this.$emit('dayClick', day, jsEvent);
	    },
	    emitMoreClick: function emitMoreClick(day, events, jsEvent) {
	      this.$emit('moreClick', day, event, jsEvent);
	    }
	  },
	  components: {
	    'fc-body': __webpack_require__(8),
	    'fc-header': __webpack_require__(14)
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  en: {
	    weekNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	    titleFormat: 'MMMM yyyy'
	  },
	  zh: {
	    weekNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
	    titleFormat: 'yyyy年MM月'
	  },
	  fr: {
	    weekNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
	    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
	    titleFormat: 'MMMM yyyy'
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(9)

	/* script */
	__vue_exports__ = __webpack_require__(11)

	/* template */
	var __vue_template__ = __webpack_require__(13)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/SunnyWang/code/vue-fullcalendar/src/components/body.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-734054ba", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-734054ba", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] body.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-734054ba!./../../node_modules/.npminstall/sass-loader/3.2.3/sass-loader/index.js!./../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./body.vue", function() {
				var newContent = require("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-734054ba!./../../node_modules/.npminstall/sass-loader/3.2.3/sass-loader/index.js!./../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./body.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\n.full-calendar-body {\n  margin-top: 20px;\n}\n.full-calendar-body .weeks {\n    display: flex;\n    border-top: 1px solid #e0e0e0;\n    border-bottom: 1px solid #e0e0e0;\n    border-left: 1px solid #e0e0e0;\n}\n.full-calendar-body .weeks .week {\n      flex: 1;\n      text-align: center;\n      border-right: 1px solid #e0e0e0;\n}\n.full-calendar-body .dates {\n    position: relative;\n}\n.full-calendar-body .dates .week-row {\n      border-left: 1px solid #e0e0e0;\n      display: flex;\n}\n.full-calendar-body .dates .week-row .day-cell {\n        flex: 1;\n        min-height: 100px;\n        padding: 4px;\n        border-right: 1px solid #e0e0e0;\n        border-bottom: 1px solid #e0e0e0;\n}\n.full-calendar-body .dates .week-row .day-cell .day-number {\n          text-align: right;\n}\n.full-calendar-body .dates .week-row .day-cell.today {\n          background-color: #fcf8e3;\n}\n.full-calendar-body .dates .week-row .day-cell.not-cur-month .day-number {\n          color: rgba(0, 0, 0, 0.24);\n}\n.full-calendar-body .dates .dates-events {\n      position: absolute;\n      top: 0;\n      left: 0;\n      z-index: 1;\n      width: 100%;\n}\n.full-calendar-body .dates .dates-events .events-week {\n        display: flex;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day {\n          cursor: pointer;\n          flex: 1;\n          min-height: 109px;\n          overflow: hidden;\n          text-overflow: ellipsis;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .day-number {\n            text-align: right;\n            padding: 4px 5px 4px 4px;\n            opacity: 0;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day.not-cur-month .day-number {\n            color: rgba(0, 0, 0, 0.24);\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item {\n            cursor: pointer;\n            font-size: 12px;\n            background-color: #C7E6FD;\n            margin-bottom: 2px;\n            color: rgba(0, 0, 0, 0.87);\n            padding: 0 0 0 4px;\n            height: 18px;\n            line-height: 18px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-start {\n              margin-left: 4px;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-end {\n              margin-right: 4px;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-opacity {\n              opacity: 0;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .event-box .more-link {\n            cursor: pointer;\n            padding-left: 8px;\n            padding-right: 2px;\n            color: rgba(0, 0, 0, 0.38);\n            font-size: 14px;\n}\n.full-calendar-body .dates .more-events {\n      position: absolute;\n      width: 150px;\n      z-index: 2;\n      border: 1px solid #eee;\n      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n.full-calendar-body .dates .more-events .more-header {\n        background-color: #eee;\n        padding: 5px;\n        display: flex;\n        align-items: center;\n        font-size: 14px;\n}\n.full-calendar-body .dates .more-events .more-header .title {\n          flex: 1;\n}\n.full-calendar-body .dates .more-events .more-header .close {\n          margin-right: 2px;\n          cursor: pointer;\n          font-size: 16px;\n}\n.full-calendar-body .dates .more-events .more-body {\n        height: 140px;\n        overflow: hidden;\n}\n.full-calendar-body .dates .more-events .more-body .body-list {\n          height: 120px;\n          padding: 5px;\n          overflow: auto;\n          background-color: #fff;\n}\n.full-calendar-body .dates .more-events .more-body .body-list .body-item {\n            cursor: pointer;\n            font-size: 12px;\n            background-color: #C7E6FD;\n            margin-bottom: 2px;\n            color: rgba(0, 0, 0, 0.87);\n            padding: 0 0 0 4px;\n            height: 18px;\n            line-height: 18px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n}\n", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dateFunc = __webpack_require__(12);

	var _dateFunc2 = _interopRequireDefault(_dateFunc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    currentDate: {},
	    events: {},
	    weekNames: {
	      type: Array,
	      default: []
	    },
	    monthNames: {},
	    firstDay: {}
	  },
	  created: function created() {
	    this.events.forEach(function (item, index) {
	      item._id = item.id || index;
	      item.end = item.end || item.start;
	    });
	    // this.events = events
	  },
	  data: function data() {
	    return {
	      // weekNames : DAY_NAMES,
	      weekMask: [1, 2, 3, 4, 5, 6, 7],
	      // events : [],
	      isLismit: true,
	      eventLimit: 3,
	      showMore: false,
	      morePos: {
	        top: 0,
	        left: 0
	      },
	      selectDay: {}
	    };
	  },

	  watch: {
	    weekNames: function weekNames(val) {
	      console.log('watch weekNames', val);
	    }
	  },
	  computed: {
	    currentDates: function currentDates() {
	      return this.getCalendar();
	    }
	  },
	  methods: {
	    isBegin: function isBegin(event, date, index) {
	      var st = new Date(event.start);

	      if (index == 0 || st.toDateString() == date.toDateString()) {
	        return event.title;
	      }
	      return '　';
	    },
	    moreTitle: function moreTitle(date) {
	      var dt = new Date(date);
	      return this.weekNames[dt.getDay()] + ', ' + this.monthNames[dt.getMonth()] + dt.getDate();
	    },
	    classNames: function classNames(cssClass) {
	      if (!cssClass) return '';
	      // string  
	      if (typeof cssClass == 'string') return cssClass;

	      // Array
	      if (Array.isArray(cssClass)) return cssClass.join(' ');

	      // else
	      return '';
	    },
	    getCalendar: function getCalendar() {
	      // calculate 2d-array of each month
	      // first day of this month
	      var now = new Date(); // today
	      var current = new Date(this.currentDate);

	      var startDate = _dateFunc2.default.getStartDate(current); // 1st day of this month

	      var curWeekDay = startDate.getDay();

	      // begin date of this table may be some day of last month
	      var diff = parseInt(this.firstDay) - curWeekDay;
	      diff = diff > 0 ? diff - 7 : diff;

	      startDate.setDate(startDate.getDate() + diff);
	      var calendar = [];

	      for (var perWeek = 0; perWeek < 6; perWeek++) {

	        var week = [];

	        for (var perDay = 0; perDay < 7; perDay++) {
	          week.push({
	            monthDay: startDate.getDate(),
	            isToday: now.toDateString() == startDate.toDateString(),
	            isCurMonth: startDate.getMonth() == current.getMonth(),
	            weekDay: perDay,
	            date: new Date(startDate),
	            events: this.slotEvents(startDate)
	          });

	          startDate.setDate(startDate.getDate() + 1);
	          // if (startDate.toDateString() == endDate.toDateString()) {
	          //   isFinal = true
	          //   break
	          // }
	        }
	        calendar.push(week);
	        // if (isFinal) break
	      }
	      return calendar;
	    },
	    slotEvents: function slotEvents(date) {

	      // find all events start from this date
	      var cellIndexArr = [];
	      var thisDayEvents = this.events.filter(function (day) {
	        var dt = new Date(day.start);
	        var st = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
	        var ed = day.end ? new Date(day.end) : st;
	        // console.log('slotEvt', st, ed, date)
	        return date >= st && date <= ed;
	      });

	      // sort by duration
	      thisDayEvents.sort(function (a, b) {
	        if (!a.cellIndex) return 1;
	        if (!b.cellIndex) return -1;
	        return a.cellIndex - b.cellIndex;
	      });

	      // mark cellIndex and place holder
	      for (var i = 0; i < thisDayEvents.length; i++) {
	        thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || i + 1;
	        thisDayEvents[i].isShow = true;
	        if (thisDayEvents[i].cellIndex == i + 1 || i > 2) continue;
	        thisDayEvents.splice(i, 0, {
	          title: 'holder',
	          cellIndex: i + 1,
	          start: _dateFunc2.default.format(date, 'yyyy-MM-dd'),
	          end: _dateFunc2.default.format(date, 'yyyy-MM-dd'),
	          isShow: false
	        });
	      }

	      return thisDayEvents;
	    },
	    isStart: function isStart(eventDate, date) {
	      var st = new Date(eventDate);
	      return st.toDateString() == date.toDateString();
	    },
	    isEnd: function isEnd(eventDate, date) {
	      var ed = new Date(eventDate);
	      return ed.toDateString() == date.toDateString();
	    },
	    selectThisDay: function selectThisDay(day, jsEvent) {
	      this.selectDay = day;
	      this.showMore = true;
	      this.morePos = this.computePos(event.target);
	      this.morePos.top -= 100;
	      var events = day.events.filter(function (item) {
	        return item.isShow == true;
	      });
	      this.$emit('moreclick', day.date, events, jsEvent);
	    },
	    computePos: function computePos(target) {
	      var eventRect = target.getBoundingClientRect();
	      var pageRect = this.$refs.dates.getBoundingClientRect();
	      return {
	        left: eventRect.left - pageRect.left,
	        top: eventRect.top + eventRect.height - pageRect.top
	      };
	    },
	    dayClick: function dayClick(day, jsEvent) {
	      this.$emit('dayclick', day, jsEvent);
	    },
	    eventClick: function eventClick(event, jsEvent) {
	      if (!event.isShow) {
	        return;
	      }
	      jsEvent.stopPropagation();
	      var pos = this.computePos(jsEvent.target);
	      this.$emit('eventclick', event, jsEvent, pos);
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var defMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var dateFunc = {
	    getDuration: function getDuration(date) {
	        // how many days of this month
	        var dt = new Date(date);
	        var month = dt.getMonth();
	        dt.setMonth(dt.getMonth() + 1);
	        dt.setDate(0);
	        return dt.getDate();
	    },
	    changeDay: function changeDay(date, num) {
	        var dt = new Date(date);
	        return new Date(dt.setDate(dt.getDate() + num));
	    },
	    getStartDate: function getStartDate(date) {
	        // return first day of this month
	        return new Date(date.getFullYear(), date.getMonth(), 1);
	    },
	    getEndDate: function getEndDate(date) {
	        // get last day of this month
	        var dt = new Date(date.getFullYear(), date.getMonth() + 1, 1); // 1st day of next month
	        return new Date(dt.setDate(dt.getDate() - 1)); // last day of this month
	    },
	    format: function format(date, _format, monthNames) {
	        monthNames = monthNames || defMonthNames;
	        if (typeof date === 'string') {
	            date = new Date(date.replace(/-/g, '/'));
	        } else {
	            date = new Date(date);
	        }

	        var map = {
	            'M': date.getMonth() + 1,
	            'd': date.getDate(),
	            'h': date.getHours(),
	            'm': date.getMinutes(),
	            's': date.getSeconds(),
	            'q': Math.floor((date.getMonth() + 3) / 3),
	            'S': date.getMilliseconds()
	        };

	        _format = _format.replace(/([yMdhmsqS])+/g, function (all, t) {
	            var v = map[t];
	            if (v !== undefined) {
	                if (all === 'MMMM') {
	                    return monthNames[v - 1];
	                }
	                if (all === 'MMM') {
	                    return shortMonth[v - 1];
	                }
	                if (all.length > 1) {
	                    v = '0' + v;
	                    v = v.substr(v.length - 2);
	                }
	                return v;
	            } else if (t === 'y') {
	                return String(date.getFullYear()).substr(4 - all.length);
	            }
	            return all;
	        });
	        return _format;
	    }
	};

	module.exports = dateFunc;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "full-calendar-body"
	  }, [_c('div', {
	    staticClass: "weeks"
	  }, _vm._l((_vm.weekNames), function(week) {
	    return _c('strong', {
	      staticClass: "week"
	    }, [_vm._v(_vm._s(week))])
	  })), _vm._v(" "), _c('div', {
	    ref: "dates",
	    staticClass: "dates"
	  }, [_c('div', {
	    staticClass: "dates-bg"
	  }, _vm._l((_vm.currentDates), function(week) {
	    return _c('div', {
	      staticClass: "week-row"
	    }, _vm._l((week), function(day) {
	      return _c('div', {
	        staticClass: "day-cell",
	        class: {
	          'today': day.isToday,
	            'not-cur-month': !day.isCurMonth
	        }
	      }, [_c('p', {
	        staticClass: "day-number"
	      }, [_vm._v(_vm._s(day.monthDay))])])
	    }))
	  })), _vm._v(" "), _c('div', {
	    staticClass: "dates-events"
	  }, _vm._l((_vm.currentDates), function(week) {
	    return _c('div', {
	      staticClass: "events-week"
	    }, _vm._l((week), function(day) {
	      return _c('div', {
	        staticClass: "events-day",
	        class: {
	          'today': day.isToday,
	            'not-cur-month': !day.isCurMonth
	        },
	        attrs: {
	          "track-by": "$index"
	        },
	        on: {
	          "click": function($event) {
	            $event.stopPropagation();
	            _vm.dayClick(day.date, $event)
	          }
	        }
	      }, [_c('p', {
	        staticClass: "day-number"
	      }, [_vm._v(_vm._s(day.monthDay))]), _vm._v(" "), _c('div', {
	        staticClass: "event-box"
	      }, [_vm._l((day.events), function(event) {
	        return _c('p', {
	          directives: [{
	            name: "show",
	            rawName: "v-show",
	            value: (event.cellIndex <= _vm.eventLimit),
	            expression: "event.cellIndex <= eventLimit"
	          }],
	          staticClass: "event-item",
	          class: [_vm.classNames(event.cssClass), {
	            'is-start': _vm.isStart(event.start, day.date),
	            'is-end': _vm.isEnd(event.end, day.date),
	            'is-opacity': !event.isShow
	          }],
	          on: {
	            "click": function($event) {
	              _vm.eventClick(event, $event)
	            }
	          }
	        }, [_vm._v("\n              " + _vm._s(_vm.isBegin(event, day.date, day.weekDay)) + "\n            ")])
	      }), _vm._v(" "), (day.events.length > _vm.eventLimit) ? _c('p', {
	        staticClass: "more-link",
	        on: {
	          "click": function($event) {
	            $event.stopPropagation();
	            _vm.selectThisDay(day, $event)
	          }
	        }
	      }, [_vm._v("\n              + " + _vm._s(day.events[day.events.length - 1].cellIndex - _vm.eventLimit) + " more\n            ")]) : _vm._e()], 2)])
	    }))
	  })), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.showMore),
	      expression: "showMore"
	    }],
	    staticClass: "more-events",
	    style: ({
	      left: _vm.morePos.left + 'px',
	      top: _vm.morePos.top + 'px'
	    })
	  }, [_c('div', {
	    staticClass: "more-header"
	  }, [_c('span', {
	    staticClass: "title"
	  }, [_vm._v(_vm._s(_vm.moreTitle(_vm.selectDay.date)))]), _vm._v(" "), _c('span', {
	    staticClass: "close",
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.showMore = false
	      }
	    }
	  }, [_vm._v("x")])]), _vm._v(" "), _c('div', {
	    staticClass: "more-body"
	  }, [_c('ul', {
	    staticClass: "body-list"
	  }, _vm._l((_vm.selectDay.events), function(event) {
	    return _c('li', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (event.isShow),
	        expression: "event.isShow"
	      }],
	      staticClass: "body-item",
	      on: {
	        "click": function($event) {
	          _vm.eventClick(event, $event)
	        }
	      }
	    }, [_vm._v("\n            " + _vm._s(event.title) + "\n          ")])
	  }))])]), _vm._v(" "), _vm._t("body-card")], 2)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-734054ba", module.exports)
	  }
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(15)

	/* script */
	__vue_exports__ = __webpack_require__(17)

	/* template */
	var __vue_template__ = __webpack_require__(18)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/SunnyWang/code/vue-fullcalendar/src/components/header.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-62863025", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-62863025", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] header.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-62863025!./../../node_modules/.npminstall/sass-loader/3.2.3/sass-loader/index.js!./../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./header.vue", function() {
				var newContent = require("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-62863025!./../../node_modules/.npminstall/sass-loader/3.2.3/sass-loader/index.js!./../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./header.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\n.full-calendar-header {\n  display: flex;\n  align-items: center;\n}\n.full-calendar-header .header-left, .full-calendar-header .header-right {\n    flex: 1;\n}\n.full-calendar-header .header-center {\n    flex: 3;\n    text-align: center;\n}\n.full-calendar-header .header-center .title {\n      margin: 0 10px;\n}\n.full-calendar-header .header-center .prev-month, .full-calendar-header .header-center .next-month {\n      cursor: pointer;\n}\n", ""]);

	// exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dateFunc = __webpack_require__(12);

	var _dateFunc2 = _interopRequireDefault(_dateFunc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  created: function created() {
	    this.dispatchEvent();
	  },

	  props: {
	    currentDate: {},
	    titleFormat: {},
	    firstDay: {},
	    monthNames: {}
	  },
	  data: function data() {
	    return {
	      title: '',
	      leftArrow: '<',
	      rightArrow: '>',
	      headDate: new Date()
	    };
	  },

	  watch: {
	    currentDate: function currentDate(val) {
	      if (!val) return;
	      this.headDate = val;
	      console.log('currentDate', val);
	      // this.headDate = JSON.parse(JSON.stringify(val))
	    }
	  },
	  methods: {
	    goPrev: function goPrev() {
	      this.headDate = this.changeMonth(this.headDate, -1);
	      this.dispatchEvent();
	    },
	    goNext: function goNext() {
	      this.headDate = this.changeMonth(this.headDate, 1);
	      this.dispatchEvent();
	    },
	    changeMonth: function changeMonth(date, num) {
	      var dt = new Date(date);
	      return new Date(dt.setMonth(dt.getMonth() + num));
	    },
	    dispatchEvent: function dispatchEvent() {
	      this.title = _dateFunc2.default.format(this.headDate, this.titleFormat, this.monthNames);

	      var startDate = _dateFunc2.default.getStartDate(this.headDate);
	      var curWeekDay = startDate.getDay();

	      // 1st day of this monthView
	      var diff = parseInt(this.firstDay) - curWeekDay;
	      if (diff) diff -= 7;
	      startDate.setDate(startDate.getDate() + diff);

	      // the month view is 6*7
	      var endDate = _dateFunc2.default.changeDay(startDate, 41);

	      // 1st day of current month
	      var currentDate = _dateFunc2.default.getStartDate(this.headDate);

	      this.$emit('change', _dateFunc2.default.format(startDate, 'yyyy-MM-dd'), _dateFunc2.default.format(endDate, 'yyyy-MM-dd'), _dateFunc2.default.format(currentDate, 'yyyy-MM-dd'), this.headDate);
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "full-calendar-header"
	  }, [_c('div', {
	    staticClass: "header-left"
	  }, [_vm._t("header-left")], 2), _vm._v(" "), _c('div', {
	    staticClass: "header-center"
	  }, [_c('span', {
	    staticClass: "prev-month",
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.goPrev($event)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.leftArrow))]), _vm._v(" "), _c('span', {
	    staticClass: "title"
	  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('span', {
	    staticClass: "next-month",
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.goNext($event)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.rightArrow))])]), _vm._v(" "), _c('div', {
	    staticClass: "header-right"
	  }, [_vm._t("header-right")], 2)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-62863025", module.exports)
	  }
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "comp-full-calendar"
	  }, [_c('fc-header', {
	    attrs: {
	      "current-date": _vm.currentDate,
	      "title-format": _vm.titleFormat,
	      "first-day": _vm.firstDay,
	      "month-names": _vm.monthNames
	    },
	    on: {
	      "change": _vm.emitChangeMonth
	    }
	  }, [_c('div', {
	    slot: "header-left"
	  }, [_vm._t("fc-header-left")], 2), _vm._v(" "), _c('div', {
	    slot: "header-right"
	  }, [_vm._t("fc-header-right")], 2)]), _vm._v(" "), _c('fc-body', {
	    attrs: {
	      "current-date": _vm.currentDate,
	      "events": _vm.events,
	      "month-names": _vm.monthNames,
	      "week-names": _vm.weekNames,
	      "first-day": _vm.firstDay
	    },
	    on: {
	      "eventclick": _vm.emitEventClick,
	      "dayclick": _vm.emitDayClick,
	      "moreclick": _vm.emitMoreClick
	    }
	  }, [_c('div', {
	    slot: "body-card"
	  }, [_vm._t("fc-body-card")], 2)])], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3e333dbe", module.exports)
	  }
	}

/***/ }
/******/ ])
});
;

/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(287),
  /* template */
  __webpack_require__(429),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/adminModule/headerComponent/headerComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] headerComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c67ed7a", Component.options)
  } else {
    hotAPI.reload("data-v-4c67ed7a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(288),
  /* template */
  __webpack_require__(438),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/adminModule/landingPage/landingPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] landingPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-93ef4522", Component.options)
  } else {
    hotAPI.reload("data-v-93ef4522", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(289),
  /* template */
  __webpack_require__(440),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/adminModule/leftMenuComponent/leftMenuComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] leftMenuComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-98b942de", Component.options)
  } else {
    hotAPI.reload("data-v-98b942de", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(290),
  /* template */
  __webpack_require__(419),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/adminModule/subMenuListComponent/subMenuListComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] subMenuListComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-085536a1", Component.options)
  } else {
    hotAPI.reload("data-v-085536a1", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(291),
  /* template */
  __webpack_require__(426),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/menuModule/menuConfigureDetailRouterComponent/menuConfigureDetailRouterComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menuConfigureDetailRouterComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-39db30d6", Component.options)
  } else {
    hotAPI.reload("data-v-39db30d6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(292),
  /* template */
  __webpack_require__(428),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/menuModule/menuInstanceListRouterComponent/menuInstanceListRouterComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menuInstanceListRouterComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c05f91b", Component.options)
  } else {
    hotAPI.reload("data-v-4c05f91b", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(293),
  /* template */
  __webpack_require__(439),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/notifications/notificationDetailComponent/notificationDetailVue.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] notificationDetailVue.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-95f8460a", Component.options)
  } else {
    hotAPI.reload("data-v-95f8460a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(294),
  /* template */
  __webpack_require__(424),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/notifications/notificationListComponent/notificationListVue.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] notificationListVue.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f10e83e", Component.options)
  } else {
    hotAPI.reload("data-v-2f10e83e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(295),
  /* template */
  __webpack_require__(432),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/userGroupModule/userGroupInstanceRouterComponent/userGroupInstanceRouterComponent.Component.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userGroupInstanceRouterComponent.Component.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61ce4695", Component.options)
  } else {
    hotAPI.reload("data-v-61ce4695", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(296),
  /* template */
  __webpack_require__(433),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/userGroupModule/userGroupListRouterComponent/userGroupListRouterComponent.Component.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userGroupListRouterComponent.Component.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-75fe9a16", Component.options)
  } else {
    hotAPI.reload("data-v-75fe9a16", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(297),
  /* template */
  __webpack_require__(437),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/userModule/userChangePassword/userChangePasswordVue.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userChangePasswordVue.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9297ed96", Component.options)
  } else {
    hotAPI.reload("data-v-9297ed96", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(298),
  /* template */
  __webpack_require__(421),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/userModule/userDetailModule/userDetailVue.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userDetailVue.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28e4c3fe", Component.options)
  } else {
    hotAPI.reload("data-v-28e4c3fe", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(299),
  /* template */
  __webpack_require__(422),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/userModule/userListModule/userListVue.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userListVue.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d019ae1", Component.options)
  } else {
    hotAPI.reload("data-v-2d019ae1", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(450)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(300),
  /* template */
  __webpack_require__(445),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/userModule/userProfileComponentVue/userProfileComponentVue.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userProfileComponentVue.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ded8ffde", Component.options)
  } else {
    hotAPI.reload("data-v-ded8ffde", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(448)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(301),
  /* template */
  __webpack_require__(434),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/userModule/userProfileComponentVue/vueAvatar/VueAvatar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VueAvatar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-77075219", Component.options)
  } else {
    hotAPI.reload("data-v-77075219", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(302),
  /* template */
  __webpack_require__(443),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/modules/userModule/userProfileComponentVue/vueAvatar/VueAvatarScale.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VueAvatarScale.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d5a3e03e", Component.options)
  } else {
    hotAPI.reload("data-v-d5a3e03e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(449)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(303),
  /* template */
  __webpack_require__(436),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/appointmentCalendar/appointmentCalendar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] appointmentCalendar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-831c40f4", Component.options)
  } else {
    hotAPI.reload("data-v-831c40f4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(304),
  /* template */
  __webpack_require__(444),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/datePicker/datePicker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] datePicker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-de8db56c", Component.options)
  } else {
    hotAPI.reload("data-v-de8db56c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(305),
  /* template */
  __webpack_require__(442),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/menuComponent/menuConfigureDetailComponent/menuConfigureDetailComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menuConfigureDetailComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b80baf0e", Component.options)
  } else {
    hotAPI.reload("data-v-b80baf0e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(306),
  /* template */
  __webpack_require__(446),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/menuComponent/menuConfigureMetaDataComponent/menuConfigureMetaDataComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menuConfigureMetaDataComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-df60a68e", Component.options)
  } else {
    hotAPI.reload("data-v-df60a68e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(307),
  /* template */
  __webpack_require__(423),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/menuComponent/menuInstanceListComponent/menuInstanceListComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menuInstanceListComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ee8c1b1", Component.options)
  } else {
    hotAPI.reload("data-v-2ee8c1b1", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(308),
  /* template */
  __webpack_require__(427),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/notificationItemComponent/notificationItemComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] notificationItemComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46ef0fec", Component.options)
  } else {
    hotAPI.reload("data-v-46ef0fec", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(309),
  /* template */
  __webpack_require__(425),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/userGroupComponent/userGroupEditMetaDataComponent/userGroupEditMetaDataComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userGroupEditMetaDataComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3275de3e", Component.options)
  } else {
    hotAPI.reload("data-v-3275de3e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(310),
  /* template */
  __webpack_require__(441),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/userGroupComponent/userGroupInstanceComponent/userGroupInstanceComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userGroupInstanceComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b7700384", Component.options)
  } else {
    hotAPI.reload("data-v-b7700384", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(311),
  /* template */
  __webpack_require__(435),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/userGroupComponent/userGroupListComponent/userGroupListComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userGroupListComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f4e1e44", Component.options)
  } else {
    hotAPI.reload("data-v-7f4e1e44", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(312),
  /* template */
  __webpack_require__(430),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/userHeaderComponent/userHeaderComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userHeaderComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c0d86d6", Component.options)
  } else {
    hotAPI.reload("data-v-5c0d86d6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(313),
  /* template */
  __webpack_require__(420),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/userListComponent/userListComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userListComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-090d1498", Component.options)
  } else {
    hotAPI.reload("data-v-090d1498", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(447)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(314),
  /* template */
  __webpack_require__(431),
  /* scopeId */
  "data-v-60ec9840",
  /* cssModules */
  null
)
Component.options.__file = "/home/rajendra/dockercontent/code/Room-Tempo/WebClient/code/app/vueComponents/userSearchComponent/userSearchComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userSearchComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60ec9840", Component.options)
  } else {
    hotAPI.reload("data-v-60ec9840", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [(_vm.menuDetail) ? _c('div', {
    staticClass: "panel-heading"
  }, [_c('span', {
    staticClass: "pull-left"
  }, [_c('h4', [_vm._v(_vm._s(_vm.menuDetail.MenuName))])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "card-deck"
  }, _vm._l((_vm.subMenuList), function(subMenuItem) {
    return (subMenuItem) ? _c('div', {
      staticClass: "card zoomIn animated"
    }, [_c('div', {
      staticClass: "card-block",
      on: {
        "click": function($event) {
          _vm.onClick_goToSubMenuDetail(subMenuItem)
        }
      }
    }, [(subMenuItem.MenuIconClass) ? _c('span', {
      class: subMenuItem.MenuIconClass
    }) : _vm._e(), _vm._v(" "), (subMenuItem.MethodToDisplayMenuCount) ? _c('i', {
      domProps: {
        "textContent": _vm._s(_vm.fncVariables[subMenuItem.MethodToDisplayMenuCount])
      }
    }) : _vm._e(), _vm._v(" "), _c('h6', {
      staticClass: "card-title"
    }, [_vm._v(_vm._s(subMenuItem.MenuName))])])]) : _vm._e()
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-085536a1", module.exports)
  }
}

/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('h4', {
    staticClass: "pull-left"
  }, [_vm._v("User List")]), _vm._v(" "), _c('div', {
    staticClass: "pull-right"
  }, [_c('button', {
    staticClass: "btn btn-default btn-sm",
    on: {
      "click": _vm.switchView
    }
  }, [(_vm.listType == 'list') ? _c('i', {
    staticClass: "fa fa-th-large"
  }) : _vm._e(), _vm._v(" "), (_vm.listType != 'list') ? _c('i', {
    staticClass: "fa fa-table"
  }) : _vm._e()]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default btn-sm",
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "title": "Add New User"
    },
    on: {
      "click": _vm.createNewInstance
    }
  }, [_c('i', {
    staticClass: "fa fa-plus respIcon"
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "tableWrap"
  }, [(_vm.listType == 'list') ? _c('table', {
    staticClass: "table table-bordered userTable"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.userList), function(inst) {
    return _c('tr', {
      on: {
        "click": function($event) {
          _vm.editUser(inst)
        }
      }
    }, [_c('td', [_vm._v(_vm._s(inst.FirstName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(inst.LastName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(inst.DesignationName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(inst.ReportingManagerName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(inst.Subject) + "\n                        ")]), _c('td', [_vm._v(_vm._s(inst.LoginId))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(inst.CampusName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(inst.CityName))])])
  }))]) : _vm._e()]), _vm._v(" "), (_vm.listType != 'list') ? _c('div', {
    staticClass: "card-deck entityCards mt-0 pt-0"
  }, _vm._l((_vm.userList), function(inst) {
    return (inst) ? _c('div', {
      staticClass: "card zoomIn animated",
      on: {
        "click": function($event) {
          _vm.editUser(inst)
        }
      }
    }, [_c('div', {
      staticClass: "card-block usersListCard"
    }, [_c('img', {
      staticClass: "cardAvatar pull-left mr-2",
      attrs: {
        "src": inst.ProfileImage
      }
    }), _vm._v(" "), _c('h6', {
      domProps: {
        "textContent": _vm._s(inst.FirstName + ' ' + inst.LastName)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "sm-txt",
      domProps: {
        "textContent": _vm._s(inst.DesignationName)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "sm-txt"
    }, [_vm._v(" Reporting to " + _vm._s(inst.ReportingManagerName))]), _vm._v(" "), _c('span', {
      staticClass: "sm-txt",
      domProps: {
        "textContent": _vm._s(inst.Subject)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "sm-txt",
      domProps: {
        "textContent": _vm._s(inst.LoginId)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "sm-txt",
      domProps: {
        "textContent": _vm._s(inst.CampusName)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "sm-txt",
      domProps: {
        "textContent": _vm._s(inst.CityName)
      }
    })])]) : _vm._e()
  })) : _vm._e()])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("First Name")]), _vm._v(" "), _c('th', [_vm._v("Last Name")]), _vm._v(" "), _c('th', [_vm._v("Designation")]), _vm._v(" "), _c('th', [_vm._v("Reporting Manager")]), _vm._v(" "), _c('th', [_vm._v("Subject")]), _vm._v(" "), _c('th', [_vm._v("LoginId")]), _vm._v(" "), _c('th', [_vm._v("Campus Name")]), _vm._v(" "), _c('th', [_vm._v("Location")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-090d1498", module.exports)
  }
}

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.userDetail && _vm.userDetail.response) ? _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('h4', {
    staticClass: "pull-left"
  }, [_vm._v("User Detail - "), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.userDetail.response.FirstName)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "btn-group pull-right"
  }, [_c('button', {
    staticClass: "btn btn-success btn-sm",
    attrs: {
      "title": "Save User"
    },
    on: {
      "click": _vm.saveUser
    }
  }, [_vm._v(" Save\n                ")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body addBg"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Reporting Manager:")]), _vm._v(" "), _c('userSearchComponent', {
    attrs: {
      "resultsArray": _vm.searchUserResultsArray,
      "assignRelation": function (selectedUser) {
        _vm.assignUserToRole(selectedUser)
      },
      "toggleSearch": _vm.toggleUserSearch,
      "onSearch": _vm.onUserSearch,
      "value": _vm.userDetail.response.ReportingManagerName
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("First Name:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userDetail.response.FirstName),
      expression: "userDetail.response.FirstName"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.userDetail.response.FirstName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userDetail.response, "FirstName", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Last Name:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userDetail.response.LastName),
      expression: "userDetail.response.LastName"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.userDetail.response.LastName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userDetail.response, "LastName", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Payroll Id:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userDetail.response.PayrollId),
      expression: "userDetail.response.PayrollId"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.userDetail.response.PayrollId)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userDetail.response, "PayrollId", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Phone Number:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userDetail.response.MobileNumber),
      expression: "userDetail.response.MobileNumber"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.userDetail.response.MobileNumber)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userDetail.response, "MobileNumber", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Device Ids:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userDetail.response.DeviceIds),
      expression: "userDetail.response.DeviceIds"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "disabled": ""
    },
    domProps: {
      "value": (_vm.userDetail.response.DeviceIds)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userDetail.response, "DeviceIds", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Email:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userDetail.response.EmailId),
      expression: "userDetail.response.EmailId"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.userDetail.response.EmailId)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userDetail.response, "EmailId", $event.target.value)
      }
    }
  })]), _vm._v(" "), (_vm.userDetail.response.vwUserIdText == null) ? _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Password:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userDetail.response.UserPassword),
      expression: "userDetail.response.UserPassword"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password"
    },
    domProps: {
      "value": (_vm.userDetail.response.UserPassword)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userDetail.response, "UserPassword", $event.target.value)
      }
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.userDetail.response.vwUserIdText == null) ? _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Confirm Password:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userDetail.response.Repassword),
      expression: "userDetail.response.Repassword"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password"
    },
    domProps: {
      "value": (_vm.userDetail.response.Repassword)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userDetail.response, "Repassword", $event.target.value)
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Select Designation:")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userDetail.response.DesignationId),
      expression: "userDetail.response.DesignationId"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.$set(_vm.userDetail.response, "DesignationId", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
      }
    }
  }, [_c('option', {
    attrs: {
      "disabled": "",
      "value": ""
    }
  }, [_vm._v("Please select one")]), _vm._v(" "), _vm._l((_vm.designationList), function(designation, designationIndex) {
    return _c('option', {
      domProps: {
        "value": designation.DesignationId
      }
    }, [_vm._v(_vm._s(designation.DesignationName))])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Select Campus:")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userDetail.response.CampusId),
      expression: "userDetail.response.CampusId"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.$set(_vm.userDetail.response, "CampusId", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
      }
    }
  }, [_c('option', {
    attrs: {
      "disabled": "",
      "value": ""
    }
  }, [_vm._v("Please select one")]), _vm._v(" "), _vm._l((_vm.campusList), function(campus, campusIndex) {
    return _c('option', {
      domProps: {
        "value": campus.CampusId
      }
    }, [_vm._v(_vm._s(campus.CampusName))])
  })], 2)])])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-28e4c3fe", module.exports)
  }
}

/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('userListComponent')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d019ae1", module.exports)
  }
}

/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "btn-group pull-right"
  }, [_c('button', {
    staticClass: "btn btn-default btn-sm",
    attrs: {
      "title": "Add New Menu"
    },
    on: {
      "click": _vm.createMenu
    }
  }, [_c('span', {
    staticClass: "fa fa-plus"
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "card-deck"
  }, [_vm._l((_vm.menuList), function(menuItem) {
    return (menuItem) ? _c('div', {
      staticClass: "card zoomIn animated cardWithConfig"
    }, [_c('div', {
      staticClass: "card-block",
      on: {
        "click": function($event) {
          _vm.onClick_goToMenuItemConfiguration(menuItem)
        }
      }
    }, [_c('h6', {
      staticClass: "card-title"
    }, [_vm._v(_vm._s(menuItem.MenuName))]), _vm._v(" "), _c('p', {
      staticClass: "card-text"
    }, [_vm._v(_vm._s(menuItem.MenuDescription))])]), _vm._v(" "), _c('i', {
      class: menuItem.iconClass && menuItem.iconClass !== '' ? menuItem.iconClass : 'fa fa-cog pull-right',
      on: {
        "click": function($event) {
          _vm.onClick_goToMenuItemConfiguration(menuItem)
        }
      }
    })]) : _vm._e()
  }), _vm._v(" "), (_vm.showNewMenu) ? _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('vw-menu-edit-meta-data-component', {
    attrs: {
      "cancelNewMenuCreation": _vm.onClickCancelMenuCreation
    }
  })], 1) : _vm._e()], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "pull-left"
  }, [_c('h4', [_vm._v("Menus List")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2ee8c1b1", module.exports)
  }
}

/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {}, [_c('div', {}, [_c('div', {
    staticClass: "panel-heading"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "btn-group pull-right"
  }, [(!_vm.editMode) ? _c('button', {
    staticClass: "btn btn-default btn-sm",
    attrs: {
      "title": "Create Notification"
    },
    on: {
      "click": _vm.newNotificatoin
    }
  }, [_c('span', {
    staticClass: "fa fa-plus"
  })]) : _vm._e()])]), _vm._v(" "), (!_vm.editMode) ? _c('div', [_c('div', {
    staticClass: "panel-body "
  }, [_c('div', {
    staticClass: "card-deck"
  }, _vm._l((_vm.notifications), function(notification) {
    return (notification) ? _c('div', {
      staticClass: "card zoomIn animated",
      on: {
        "click": function($event) {
          _vm.goToNotification(notification)
        }
      }
    }, [_c('div', {
      staticClass: "card-block"
    }, [_c('i', {
      staticClass: "fa fa-cog"
    }), _vm._v(" "), _c('h6', {
      staticClass: "card-title"
    }, [_vm._v(_vm._s(notification.MessageTitle))]), _vm._v(" "), _c('p', {
      staticClass: "card-text"
    }, [_vm._v(_vm._s(notification.Message))])])]) : _vm._e()
  }))])]) : _vm._e()])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "pull-left"
  }, [_c('h4', [_vm._v("Notifications")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2f10e83e", module.exports)
  }
}

/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "card zoomIn animated"
  }, [_c('div', {
    staticClass: "card-block"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("User Group Name:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userGroupInstanceDetail.name),
      expression: "userGroupInstanceDetail.name"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.userGroupInstanceDetail.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userGroupInstanceDetail, "name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Description:")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userGroupInstanceDetail.description),
      expression: "userGroupInstanceDetail.description"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "3",
      "type": "text"
    },
    domProps: {
      "value": (_vm.userGroupInstanceDetail.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userGroupInstanceDetail, "description", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Icon Class: ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userGroupInstanceDetail.iconClass),
      expression: "userGroupInstanceDetail.iconClass"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.userGroupInstanceDetail.iconClass)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userGroupInstanceDetail, "iconClass", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-check"
  }, [_c('label', {
    staticClass: "form-check-label"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userGroupInstanceDetail.isAdminGroup),
      expression: "userGroupInstanceDetail.isAdminGroup"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.userGroupInstanceDetail.isAdminGroup) ? _vm._i(_vm.userGroupInstanceDetail.isAdminGroup, null) > -1 : (_vm.userGroupInstanceDetail.isAdminGroup)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.userGroupInstanceDetail.isAdminGroup,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.userGroupInstanceDetail.isAdminGroup = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.userGroupInstanceDetail.isAdminGroup = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.$set(_vm.userGroupInstanceDetail, "isAdminGroup", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v("Is User Group Admin User Group")])])]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-success",
    on: {
      "click": _vm.onClick_createNewUserGroup
    }
  }, [_vm._v("Save")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-outline-primary",
    on: {
      "click": _vm.onClick_cancelNewUserGroupCreation
    }
  }, [_vm._v("Cancel")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3275de3e", module.exports)
  }
}

/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('vw-menu-instance-detail-component', {
    attrs: {
      "menuInstanceId": _vm.computedMenuInstanceId
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-39db30d6", module.exports)
  }
}

/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.entityInstance && _vm.entityInstance.response) ? _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.entityInstance.response.Status == 1 || _vm.filterType == 0),
      expression: "entityInstance.response.Status == 1 || filterType == 0"
    }],
    class: [_vm.entityInstance.response.Status == '1' ? 'unread' : 'read']
  }, [_vm._m(0), _vm._v(" "), _c('h6', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.entityInstance.response.MessageTitle))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.entityInstance.response.Message))]), _vm._v(" "), _c('a', {
    staticClass: "ml-2",
    staticStyle: {
      "cursor": "pointer"
    },
    on: {
      "click": function($event) {
        _vm.dismissNotification(_vm.entityInstance.response)
      }
    }
  }, [_vm._v("Dismiss")])]) : _vm._e()
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon"
  }, [_c('span', {
    staticClass: "fa fa-bell"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-46ef0fec", module.exports)
  }
}

/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('vw-menu-instance-list-component')
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4c05f91b", module.exports)
  }
}

/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "loggedinHome"
  }, [_vm._m(0), _vm._v(" "), _c('a', {
    staticClass: "mainLogo",
    attrs: {
      "href": "javascript: void(0)"
    },
    on: {
      "click": _vm.gotoHome
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "headRightWrap"
  }, [_c('ul', {
    staticClass: "topNav"
  }, [_c('li', [_c('button', {
    on: {
      "click": _vm.redirectToHome
    }
  }, [_c('i', {
    staticClass: "fa fa-home topNavHomeIcon"
  })])]), _vm._v(" "), _c('li', [_c('button', {
    staticClass: "notoficationButton",
    on: {
      "click": _vm.toggleNotification
    }
  }, [_c('span', {
    staticClass: "fa fa-bell"
  }), _vm._v(" "), _c('span', {
    staticClass: "count",
    domProps: {
      "textContent": _vm._s(_vm.notificationCount)
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "dropdown"
  }, [_c('button', {
    staticClass: "btn btn-primary dropdown-toggle profilePic",
    attrs: {
      "type": "button",
      "data-toggle": "dropdown"
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.userImage,
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.userName))])]), _vm._v(" "), _c('ul', {
    staticClass: "dropdown-menu"
  }, [_c('li', {
    on: {
      "click": _vm.navigateToUserProfile
    }
  }, [_vm._m(1)]), _vm._v(" "), _c('li', {
    on: {
      "click": _vm.redirectToChangePassword
    }
  }, [_vm._m(2)])])]), _vm._v(" "), _c('button', {
    staticClass: "logout",
    on: {
      "click": _vm.logout
    }
  }, [_c('span', {
    staticClass: "fa fa-power-off ",
    attrs: {
      "aria-hidden": "true"
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "siteHomepage"
  }), _vm._v(" "), _c('div', {
    staticClass: "menuMaskN",
    on: {
      "click": _vm.toggleNotification
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "notofocationBar",
    attrs: {
      "id": "notification"
    }
  }, [_c('div', {
    staticClass: "sideBarHeading"
  }, [_c('h6', {
    on: {
      "click": _vm.redirectToNotifications
    }
  }, [_vm._v("Notifications ")]), _vm._v(" "), _c('label', {
    staticClass: "pull-right"
  }, [_c('span', {
    staticClass: "back"
  }), _vm._v(" "), (_vm.notificationCount > 0) ? _c('span', {
    staticClass: "clearAll",
    on: {
      "click": _vm.dimissAllNotifications
    }
  }, [_vm._v("Clear All")]) : _vm._e()])]), _vm._v(" "), (_vm.notificatoinKeyList && _vm.notificatoinKeyList.status == 'success') ? _c('ul', {
    staticClass: "notofiLIst"
  }) : _vm._e()])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "search",
    staticStyle: {
      "display": "none"
    }
  }, [_c('span', {
    staticClass: "fa fa-search"
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', [_c('i', {
    staticClass: "fa fa-user"
  }), _vm._v(" My Profile")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', [_c('i', {
    staticClass: "fa fa-key"
  }), _vm._v(" Change Password")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4c67ed7a", module.exports)
  }
}

/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('th', [_c('span', [_vm._v(_vm._s(_vm.col.label))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5c0d86d6", module.exports)
  }
}

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Typeahead"
  }, [(_vm.loading) ? _c('i', {
    staticClass: "fa fa-spinner fa-spin"
  }) : [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isEmpty),
      expression: "isEmpty"
    }],
    staticClass: "fa fa-search"
  }), _vm._v(" "), _c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isDirty),
      expression: "isDirty"
    }],
    staticClass: "fa fa-times",
    on: {
      "click": _vm.reset
    }
  })], _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticClass: "Typeahead__input",
    attrs: {
      "type": "text",
      "placeholder": "Search..",
      "autocomplete": "off"
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) { return null; }
        _vm.down($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) { return null; }
        _vm.up($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.hit($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key)) { return null; }
        _vm.reset($event)
      }],
      "blur": _vm.reset,
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }, _vm.update]
    }
  }), _vm._v(" "), _c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.hasItems),
      expression: "hasItems"
    }]
  }, _vm._l((_vm.resultsArray), function(item, $item) {
    return _c('li', {
      class: _vm.activeClass($item),
      on: {
        "mousedown": _vm.hit,
        "mousemove": function($event) {
          _vm.setActive($item)
        }
      }
    }, [(item) ? [_c('img', {
      staticClass: "avatar",
      attrs: {
        "src": item.ProfileImage
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "name heading"
    }, [_vm._v(_vm._s(item.FirstName))]), _vm._v(" "), _c('span', {
      staticClass: "name",
      domProps: {
        "textContent": _vm._s(item.LastName)
      }
    })] : _vm._e()], 2)
  }))], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-60ec9840", module.exports)
  }
}

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('vw-user-group-instance-component', {
    attrs: {
      "userGroupInstanceId": _vm.computedUserGroupInstanceId
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-61ce4695", module.exports)
  }
}

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('vw-user-group-list-component')
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-75fe9a16", module.exports)
  }
}

/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('canvas', {
    ref: "canvas",
    class: _vm.cursor,
    attrs: {
      "width": _vm.canvasWidth,
      "height": _vm.canvasHeight
    },
    on: {
      "dragover": function($event) {
        $event.preventDefault();
      },
      "drop": _vm.onDrop,
      "mousedown": _vm.onDragStart,
      "mouseup": _vm.onDragEnd,
      "mousemove": _vm.onMouseMove,
      "click": _vm.clicked
    }
  }), _vm._v(" "), _c('input', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "type": "file",
      "id": "ab-1"
    },
    on: {
      "change": _vm.fileSelected
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-77075219", module.exports)
  }
}

/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "btn-group pull-right"
  }, [_c('button', {
    staticClass: "btn btn-default btn-sm",
    attrs: {
      "title": "Add New User Group"
    },
    on: {
      "click": _vm.createUserGroup
    }
  }, [_c('span', {
    staticClass: "fa fa-plus"
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "card-deck"
  }, [_vm._l((_vm.userGroupList), function(userGroupItem) {
    return (userGroupItem) ? _c('div', {
      staticClass: "card zoomIn animated"
    }, [_c('div', {
      staticClass: "card-block",
      on: {
        "click": function($event) {
          _vm.onClick_goToUserGroupInstance(userGroupItem)
        }
      }
    }, [(userGroupItem.UserGroupInstanceIconClass) ? _c('span', {
      class: userGroupItem.UserGroupInstanceIconClass
    }) : _vm._e(), _vm._v(" "), _c('h6', {
      staticClass: "card-title"
    }, [_vm._v(_vm._s(userGroupItem.UserGroupInstanceName))]), _vm._v(" "), _c('p', {
      staticClass: "card-text"
    }, [_vm._v(_vm._s(userGroupItem.UserGroupInstanceDescription))])])]) : _vm._e()
  }), _vm._v(" "), (_vm.showNewUserGroup) ? _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('vw-user-group-edit-meta-data-component', {
    attrs: {
      "onClickCancelUserGroupCreation": _vm.onClickCancelUserGroupCreation
    }
  })], 1) : _vm._e()], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "pull-left"
  }, [_c('h4', [_vm._v("User Group List")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7f4e1e44", module.exports)
  }
}

/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-12"
  }, [_c('full-calendar', {
    staticClass: "test-fc",
    attrs: {
      "events": _vm.fcEvents,
      "first-day": "1",
      "locale": "en"
    },
    on: {
      "changeMonth": _vm.changeMonth,
      "eventClick": _vm.eventClick,
      "dayClick": _vm.dayClick,
      "moreClick": _vm.moreClick
    },
    scopedSlots: _vm._u([{
      key: "fc-event-card",
      fn: function(p) {
        return [_c('p', [_c('i', {
          staticClass: "fa"
        }, [_vm._v("sadfsd")]), _vm._v(" " + _vm._s(p.event.title) + " test")])]
      }
    }])
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', [_c('script', {
    attrs: {
      "type": "text/x-template",
      "id": "appointmentEvent-modal-template"
    }
  }, [_vm._v("\n            <transition name=\"modal\">\n                <div class=\"modal-mask\">\n                    <div class=\"modal-wrapper\">\n                        <div class=\"modal-container\">\n\n                            <div class=\"modal-header\">\n                                <slot name=\"header\">\n\n                                </slot>\n                            </div>\n\n                            <div class=\"modal-body\">\n                                <slot name=\"body\">\n                                    default body\n                                </slot>\n                            </div>\n\n                            <div class=\"modal-footer\">\n                                <slot name=\"footer\">\n                                    <!--<button class=\"modal-default-button\" @click=\"save()\">Cancel</button>-->\n                                    <button class=\"modal-default-button\" @click=\"save('save')\">OK</button>\n                                </slot>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </transition>\n        ")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "appPop"
    }
  }, [(_vm.showModal) ? _c('modal', {
    on: {
      "close": function($event) {
        _vm.showModal = false
      }
    }
  }, [_c('h4', {
    staticClass: "modal-title",
    attrs: {
      "slot": "header",
      "id": "myModalLabel"
    },
    slot: "header"
  }, [_vm._v(_vm._s(_vm.popupHeader))]), _vm._v(" "), _c('div', {
    staticClass: "modal-body",
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [(_vm.popupDetails) ? _c('div', [_c('div', [_c('span', [_vm._v("Event title: ")]), _c('span', [_vm._v(_vm._s(_vm.popupDetails.title))])]), _vm._v(" "), _c('div', [_c('span', [_vm._v("Start Date: ")]), _c('span', [_vm._v(_vm._s(_vm.popupDetails.start))])]), _vm._v(" "), _c('div', [_c('span', [_vm._v("End Date: ")]), _c('span', [_vm._v(_vm._s(_vm.popupDetails.end))])])]) : _vm._e()])]) : _vm._e()], 1)])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('ul', {
    staticClass: "legend"
  }, [_c('li', [_c('span', {
    staticClass: "color",
    staticStyle: {
      "background-color": "#b9b9b9"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("Week Off")])]), _vm._v(" "), _c('li', [_c('span', {
    staticClass: "color",
    staticStyle: {
      "background-color": "#80c14d"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("Present")])]), _vm._v(" "), _c('li', [_c('span', {
    staticClass: "color",
    staticStyle: {
      "background-color": "#dfca5d"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("Leave")])]), _vm._v(" "), _c('li', [_c('span', {
    staticClass: "color",
    staticStyle: {
      "background-color": "#df5d5d"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("Absent")])]), _vm._v(" "), _c('li', [_c('span', {
    staticClass: "color",
    staticStyle: {
      "background-color": "#6b9bdb"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("Holiday")])]), _vm._v(" "), _c('li', [_c('span', {
    staticClass: "color",
    staticStyle: {
      "background-color": "#c5abb5"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("On Duty")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-831c40f4", module.exports)
  }
}

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('h4', {
    staticClass: "pull-left"
  }, [_vm._v("Change Password")]), _vm._v(" "), _c('div', {
    staticClass: "btn-group pull-right"
  }, [_c('button', {
    staticClass: "btn btn-success btn-sm",
    attrs: {
      "title": "Update Password"
    },
    on: {
      "click": _vm.updatePassword
    }
  }, [_vm._v(" Save\n                ")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body addBg"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Current Password:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.CurrentPassword),
      expression: "CurrentPassword"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password"
    },
    domProps: {
      "value": (_vm.CurrentPassword)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.CurrentPassword = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("New Password:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.UserPassword),
      expression: "UserPassword"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password"
    },
    domProps: {
      "value": (_vm.UserPassword)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.UserPassword = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Confirm Password:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.Repassword),
      expression: "Repassword"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password"
    },
    domProps: {
      "value": (_vm.Repassword)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.Repassword = $event.target.value
      }
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9297ed96", module.exports)
  }
}

/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "card-deck"
  }, _vm._l((_vm.menusAllocatedToLoggedInUser), function(menuItem) {
    return (menuItem) ? _c('div', {
      staticClass: "card zoomIn animated"
    }, [_c('div', {
      staticClass: "card-block",
      on: {
        "click": function($event) {
          _vm.onClick_goToMenuDetail(menuItem)
        }
      }
    }, [_c('span', {
      class: menuItem.MenuIconClass
    }), _vm._v(" "), _c('h6', {
      staticClass: "card-title"
    }, [_vm._v(_vm._s(menuItem.MenuName))])])]) : _vm._e()
  }))])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-heading"
  }, [_c('span', {
    staticClass: "pull-left"
  }, [_c('h4', [_vm._v("Home")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-93ef4522", module.exports)
  }
}

/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [(_vm.notificationDetail) ? _c('div', {}, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('span', {
    staticClass: "pull-left"
  }, [_c('h4', [_vm._v(_vm._s(_vm.notificationDetail.MessageTitle))])])])]) : _vm._e(), _vm._v(" "), (_vm.notificationDetail) ? _c('div', {
    staticClass: "panel-body addBg"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Device Id:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.notificationDetail.DeviceId),
      expression: "notificationDetail.DeviceId"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.notificationDetail.DeviceId)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.notificationDetail, "DeviceId", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Message:")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.notificationDetail.Message),
      expression: "notificationDetail.Message"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.notificationDetail.Message)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.notificationDetail, "Message", $event.target.value)
      }
    }
  })])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-95f8460a", module.exports)
  }
}

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "expSide",
    on: {
      "click": _vm.toggleSideBar
    }
  }, [_vm._m(0)]), _vm._v(" "), _c('ul', {
    staticClass: "LeftMainSaid"
  }, [_c('li', {
    attrs: {
      "title": "Home"
    },
    on: {
      "click": _vm.switchClient
    }
  }, [_c('i', {
    staticClass: "fa fa-home"
  }), _vm._v(" "), _c('span', [_vm._v("Home")])]), _vm._v(" "), (_vm.isCurrentUserAdmin === true) ? _c('li', {
    attrs: {
      "title": "Menus"
    },
    on: {
      "click": _vm.redirectToMenus
    }
  }, [_c('i', {
    staticClass: "fa fa-bars"
  }), _c('span', [_vm._v("Menus")])]) : _vm._e(), _vm._v(" "), (_vm.isCurrentUserAdmin === true) ? _c('li', {
    attrs: {
      "title": "Base Calendar"
    },
    on: {
      "click": _vm.redirectToBaseCalendar
    }
  }, [_c('i', {
    staticClass: "fa fa-calendar"
  }), _c('span', [_vm._v("Base Calendar")])]) : _vm._e(), _vm._v(" "), (_vm.isCurrentUserAdmin === true) ? _c('li', {
    attrs: {
      "title": "Users"
    },
    on: {
      "click": _vm.redirectToUserTypes
    }
  }, [_c('i', {
    staticClass: "fa fa-user"
  }), _c('span', [_vm._v("Users")])]) : _vm._e(), _vm._v(" "), (_vm.isCurrentUserAdmin === true) ? _c('li', {
    attrs: {
      "title": "User Groups"
    },
    on: {
      "click": _vm.redirectToUserGroups
    }
  }, [_c('i', {
    staticClass: "fa fa-users"
  }), _c('span', [_vm._v("User Groups")])]) : _vm._e(), _vm._v(" "), _c('li', {
    attrs: {
      "title": "Change Password"
    },
    on: {
      "click": _vm.redirectToChangePassword
    }
  }, [_c('i', {
    staticClass: "fa fa-key"
  }), _c('span', [_vm._v("Change Password")])])]), _vm._v(" "), _c('p', {
    staticClass: "pin",
    on: {
      "click": _vm.pinSideBar
    }
  }, [_c('i', {
    staticClass: "fa fa-thumb-tack"
  }), _vm._v("   "), _c('span', {
    staticClass: "pintx"
  }, [_vm._v("Always show sidebar")])]), _vm._v(" "), _c('div', {
    staticClass: "menuMask",
    on: {
      "click": _vm.toggleSideBar
    }
  })])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    attrs: {
      "id": "nav-icon3"
    }
  }, [_c('span'), _vm._v(" "), _c('span'), _vm._v(" "), _c('span'), _vm._v(" "), _c('span')])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-98b942de", module.exports)
  }
}

/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.userGroupInstanceDetail) ? _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading fixed"
  }, [_c('h4', {
    staticClass: "pull-left"
  }, [_vm._v(_vm._s("Editing '" + _vm.userGroupInstanceDetail.UserGroupInstanceName + "'"))]), _vm._v(" "), _c('div', {
    staticClass: "btn-group pull-right"
  }, [_c('button', {
    staticClass: "btn btn-default",
    on: {
      "click": function($event) {
        _vm.showDeleteConfirmation = true;
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })])]), _vm._v(" "), (_vm.showDeleteConfirmation) ? [_c('div', {
    staticClass: "btn-group pull-right mb-0"
  }, [_c('div', {
    staticClass: "form-group mb-0 alert alert-danger"
  }, [_c('label', [_vm._v("Are you sure you want to delete?")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default",
    on: {
      "click": _vm.onClick_ContinueWithDelete
    }
  }, [_vm._v("Yes")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default",
    on: {
      "click": function($event) {
        _vm.showDeleteConfirmation = false;
      }
    }
  }, [_vm._v("No")])])])] : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "panel-body addBg"
  }, [_c('ul', {
    staticClass: "nav nav-tabs"
  }, _vm._l((_vm.userGroupConfigureTabs), function(tab, tabIndex) {
    return _c('li', {
      key: tab.id,
      class: {
        active: _vm.selectedTab === tab.id
      },
      on: {
        "click": function($event) {}
      }
    }, [_c('a', {
      domProps: {
        "textContent": _vm._s(tab.text)
      },
      on: {
        "click": function($event) {
          _vm.onClick_selectTab(tab.id)
        }
      }
    })])
  })), _vm._v(" "), _c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "tab-content"
  }, [(_vm.selectedTab === 1) ? _c('div', {
    staticClass: "tab-pane",
    class: {
      active: _vm.selectedTab === 1
    }
  }, [_c('div', {
    staticClass: "btn-group pull-right"
  }, [_c('button', {
    staticClass: "btn btn-default",
    on: {
      "click": _vm.onClick_SaveUserGroupSettings
    }
  }, [_c('i', {
    staticClass: "fa fa-save"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("User Group Name:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userGroupInstanceDetail.UserGroupInstanceName),
      expression: "userGroupInstanceDetail.UserGroupInstanceName"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.userGroupInstanceDetail.UserGroupInstanceName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userGroupInstanceDetail, "UserGroupInstanceName", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Description:")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userGroupInstanceDetail.UserGroupInstanceDescription),
      expression: "userGroupInstanceDetail.UserGroupInstanceDescription"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "3",
      "type": "text"
    },
    domProps: {
      "value": (_vm.userGroupInstanceDetail.UserGroupInstanceDescription)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userGroupInstanceDetail, "UserGroupInstanceDescription", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Icon Class: ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userGroupInstanceDetail.UserGroupInstanceIconClass),
      expression: "userGroupInstanceDetail.UserGroupInstanceIconClass"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.userGroupInstanceDetail.UserGroupInstanceIconClass)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.userGroupInstanceDetail, "UserGroupInstanceIconClass", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {}, [_c('label', {
    staticClass: "form-check-label"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userGroupInstanceDetail.IsUserGroupInstanceAdmin),
      expression: "userGroupInstanceDetail.IsUserGroupInstanceAdmin"
    }],
    staticClass: "form-check-input",
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.userGroupInstanceDetail.IsUserGroupInstanceAdmin) ? _vm._i(_vm.userGroupInstanceDetail.IsUserGroupInstanceAdmin, null) > -1 : (_vm.userGroupInstanceDetail.IsUserGroupInstanceAdmin)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.userGroupInstanceDetail.IsUserGroupInstanceAdmin,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.userGroupInstanceDetail.IsUserGroupInstanceAdmin = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.userGroupInstanceDetail.IsUserGroupInstanceAdmin = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.$set(_vm.userGroupInstanceDetail, "IsUserGroupInstanceAdmin", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v("Is User Group Admin User Group")])])])]) : _vm._e(), _vm._v(" "), (_vm.selectedTab === 2) ? _c('div', {
    staticClass: "tab-pane",
    class: {
      active: _vm.selectedTab === 2
    }
  }, [_c('div', {
    staticClass: "tableWrap"
  }, [(_vm.userToUserGroupAllocation) ? _c('table', {
    staticClass: "table table-bordered table-hover"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.userToUserGroupAllocation), function(userAllocatedItem) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(userAllocatedItem.firstName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(userAllocatedItem.lastName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(userAllocatedItem.payrollId))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(userAllocatedItem.emailId))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(userAllocatedItem.mobileNumber))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(userAllocatedItem.userGroupInstanceName))]), _vm._v(" "), _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (userAllocatedItem.isUserAllocatedToUserGroup),
        expression: "userAllocatedItem.isUserAllocatedToUserGroup"
      }],
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(userAllocatedItem.isUserAllocatedToUserGroup) ? _vm._i(userAllocatedItem.isUserAllocatedToUserGroup, null) > -1 : (userAllocatedItem.isUserAllocatedToUserGroup)
      },
      on: {
        "change": [function($event) {
          var $$a = userAllocatedItem.isUserAllocatedToUserGroup,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = null,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (userAllocatedItem.isUserAllocatedToUserGroup = $$a.concat([$$v]))
            } else {
              $$i > -1 && (userAllocatedItem.isUserAllocatedToUserGroup = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.$set(userAllocatedItem, "isUserAllocatedToUserGroup", $$c)
          }
        }, function($event) {
          _vm.onClick_SaveUserToUserGroupAllocation(userAllocatedItem)
        }]
      }
    })])])
  }))]) : _vm._e()])]) : _vm._e(), _vm._v(" "), (_vm.selectedTab === 3) ? _c('div', {
    staticClass: "tab-pane",
    class: {
      active: _vm.selectedTab === 3
    }
  }, [_c('div', {
    staticClass: "tableWrap"
  }, [(_vm.userGroupToMenuAllocation) ? _c('table', {
    staticClass: "table table-bordered table-hover"
  }, [_vm._m(1), _vm._v(" "), _c('tbody', _vm._l((_vm.userGroupToMenuAllocation), function(userToMenuAllocatedItem) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(userToMenuAllocatedItem.MenuName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(userToMenuAllocatedItem.MenuDescription))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(userToMenuAllocatedItem.ParentMenuName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(userToMenuAllocatedItem.NavigateToUrl))]), _vm._v(" "), _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (userToMenuAllocatedItem.IsMenuAllocatedToUserGroup),
        expression: "userToMenuAllocatedItem.IsMenuAllocatedToUserGroup"
      }],
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(userToMenuAllocatedItem.IsMenuAllocatedToUserGroup) ? _vm._i(userToMenuAllocatedItem.IsMenuAllocatedToUserGroup, null) > -1 : (userToMenuAllocatedItem.IsMenuAllocatedToUserGroup)
      },
      on: {
        "change": [function($event) {
          var $$a = userToMenuAllocatedItem.IsMenuAllocatedToUserGroup,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = null,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (userToMenuAllocatedItem.IsMenuAllocatedToUserGroup = $$a.concat([$$v]))
            } else {
              $$i > -1 && (userToMenuAllocatedItem.IsMenuAllocatedToUserGroup = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.$set(userToMenuAllocatedItem, "IsMenuAllocatedToUserGroup", $$c)
          }
        }, function($event) {
          _vm.onClick_SaveUserToMenuAllocation(userToMenuAllocatedItem)
        }]
      }
    })])])
  }))]) : _vm._e()])]) : _vm._e()])])])]) : _vm._e()
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("First Name")]), _vm._v(" "), _c('th', [_vm._v("Last Name")]), _vm._v(" "), _c('th', [_vm._v("Payroll Id")]), _vm._v(" "), _c('th', [_vm._v("Email Id")]), _vm._v(" "), _c('th', [_vm._v("Mobile #")]), _vm._v(" "), _c('th', [_vm._v("User Group Name")]), _vm._v(" "), _c('th', [_vm._v("Is User Allocated")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("Menu Name")]), _vm._v(" "), _c('th', [_vm._v("Menu Description")]), _vm._v(" "), _c('th', [_vm._v("Parent Menu Name")]), _vm._v(" "), _c('th', [_vm._v("Navigate To Url")]), _vm._v(" "), _c('th', [_vm._v("Menu Allocated to UG")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b7700384", module.exports)
  }
}

/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [(_vm.menuInstanceDetail) ? _c('h4', {
    staticClass: "pull-left"
  }, [_vm._v(_vm._s("Editing '" + _vm.menuInstanceDetail.MenuName + "'"))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "btn-group pull-right"
  }, [_c('button', {
    staticClass: "btn btn-default",
    on: {
      "click": function($event) {
        _vm.showDeleteConfirmation = true;
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })])]), _vm._v(" "), (_vm.showDeleteConfirmation) ? [_c('div', {
    staticClass: "btn-group pull-right mb-0"
  }, [_c('div', {
    staticClass: "form-group mb-0 alert alert-danger"
  }, [_c('label', [_vm._v("Are you sure you want to delete?")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-danger btn-sm",
    on: {
      "click": _vm.onClick_ContinueWithDelete
    }
  }, [_vm._v("Yes")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-success btn-sm",
    on: {
      "click": function($event) {
        _vm.showDeleteConfirmation = false;
      }
    }
  }, [_vm._v("No")])])])] : _vm._e(), _vm._v(" "), (_vm.showDeleteFailureMessage) ? [_c('div', {
    staticClass: "btn-group pull-right mb-0 alert alert-info"
  }, [_c('label', {
    domProps: {
      "textContent": _vm._s(_vm.deleteFailureMessage)
    }
  })])] : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "panel-body addBg"
  }, [_c('ul', {
    staticClass: "nav nav-tabs"
  }, _vm._l((_vm.menuConfigureTabs), function(tab, tabIndex) {
    return _c('li', {
      key: tab.id,
      class: {
        active: _vm.selectedTab === tab.id
      },
      on: {
        "click": function($event) {}
      }
    }, [_c('a', {
      domProps: {
        "textContent": _vm._s(tab.text)
      },
      on: {
        "click": function($event) {
          _vm.onClick_selectTab(tab.id)
        }
      }
    })])
  })), _vm._v(" "), _c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "tab-content"
  }, [(_vm.selectedTab === 1) ? _c('div', {
    staticClass: "tab-pane",
    class: {
      active: _vm.selectedTab === 1
    }
  }, [(_vm.menuInstanceDetail) ? [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "btn-group pull-right"
  }, [_c('button', {
    staticClass: "btn btn-default",
    on: {
      "click": _vm.onClick_SaveMenuDetails
    }
  }, [_c('i', {
    staticClass: "fa fa-save"
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Menu Name:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.MenuName),
      expression: "menuInstanceDetail.MenuName"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.MenuName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "MenuName", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Description:")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.MenuDescription),
      expression: "menuInstanceDetail.MenuDescription"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "3",
      "type": "text"
    },
    domProps: {
      "value": (_vm.menuInstanceDetail.MenuDescription)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "MenuDescription", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Icon Class: ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.MenuIconClass),
      expression: "menuInstanceDetail.MenuIconClass"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.MenuIconClass)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "MenuIconClass", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Navigate To Url: ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.NavigateToUrl),
      expression: "menuInstanceDetail.NavigateToUrl"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.NavigateToUrl)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "NavigateToUrl", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Navigate To Fragment (Mobile only): ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.NavigateToFragment),
      expression: "menuInstanceDetail.NavigateToFragment"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.NavigateToFragment)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "NavigateToFragment", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Method to call which will display menu count: ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.MethodToDisplayMenuCount),
      expression: "menuInstanceDetail.MethodToDisplayMenuCount"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.MethodToDisplayMenuCount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "MethodToDisplayMenuCount", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Fragment to call which will display menu count (Mobile only): ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.FragmentToDisplayMenuCount),
      expression: "menuInstanceDetail.FragmentToDisplayMenuCount"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.FragmentToDisplayMenuCount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "FragmentToDisplayMenuCount", $event.target.value)
      }
    }
  })])] : _vm._e()], 2) : _vm._e(), _vm._v(" "), (_vm.selectedTab === 2) ? _c('div', {
    staticClass: "tab-pane",
    class: {
      active: _vm.selectedTab === 2
    }
  }, [(_vm.subMenuInstanceList) ? [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('h4', {
    staticClass: "pull-left"
  }, [_vm._v("Sub Menus List")]), _vm._v(" "), _c('div', {
    staticClass: "btn-group pull-right"
  }, [_c('button', {
    staticClass: "btn btn-default btn-sm",
    attrs: {
      "title": "Add New Sub Menu"
    },
    on: {
      "click": _vm.createNewSubMenu
    }
  }, [_c('span', {
    staticClass: "fa fa-plus"
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "card-deck"
  }, [_vm._l((_vm.subMenuInstanceList), function(subMenuItem) {
    return (subMenuItem) ? _c('div', {
      staticClass: "card zoomIn animated cardWithConfig"
    }, [_c('div', {
      staticClass: "card-block",
      on: {
        "click": function($event) {
          _vm.onClick_goToSubMenuItemConfiguration(subMenuItem)
        }
      }
    }, [_c('h6', {
      staticClass: "card-title"
    }, [_vm._v(_vm._s(subMenuItem.MenuName))]), _vm._v(" "), _c('p', {
      staticClass: "card-text"
    }, [_vm._v(_vm._s(subMenuItem.MenuDescription))])]), _vm._v(" "), _c('i', {
      class: subMenuItem.iconClass && subMenuItem.iconClass !== '' ? subMenuItem.iconClass : 'fa fa-cog pull-right',
      on: {
        "click": function($event) {
          _vm.onClick_goToSubMenuItemConfiguration(subMenuItem)
        }
      }
    })]) : _vm._e()
  }), _vm._v(" "), (_vm.showNewSubMenu) ? _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('vw-menu-edit-meta-data-component', {
    attrs: {
      "cancelNewMenuCreation": _vm.onClickCancelSubMenuCreation,
      "getMenuInstanceDetail": _vm.getData,
      "parentMenuInstanceId": _vm.menuInstanceId
    }
  })], 1) : _vm._e()], 2)] : _vm._e()], 2) : _vm._e()])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b80baf0e", module.exports)
  }
}

/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.scale),
      expression: "scale"
    }],
    style: ({
      width: _vm.width + 'px'
    }),
    attrs: {
      "type": "range",
      "min": _vm.min,
      "max": _vm.max,
      "step": _vm.step
    },
    domProps: {
      "value": (_vm.scale)
    },
    on: {
      "__r": function($event) {
        _vm.scale = $event.target.value
      }
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d5a3e03e", module.exports)
  }
}

/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "input-group"
  }, [_c('input', {
    staticClass: "form-control custom-date-control",
    attrs: {
      "type": "text",
      "disabled": _vm.isDisabled,
      "required": _vm.isRequired,
      "readonly": "readonly",
      "placeholder": "Select Date"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "input-group-addon btn btn-primary"
  }, [_c('span', {
    class: ['fa', _vm.pickerType == 'date' ? 'fa-calendar' : 'fa-clock-o']
  })]), _vm._v(" "), (_vm.showErrorMessage) ? _c('div', {
    staticClass: "invalid-feedback"
  }, [_vm._v("\n        " + _vm._s(_vm.errorMessage) + "\n    ")]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-de8db56c", module.exports)
  }
}

/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {}, [(_vm.userProfile) ? _c('div', {}, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('h4', {
    staticClass: "pull-left"
  }, [_vm._v("My Profile")]), _vm._v(" "), _c('div', {
    staticClass: "btn-group pull-right"
  }, [_c('button', {
    staticClass: "btn btn-success btn-sm",
    attrs: {
      "title": "Save User Profile"
    },
    on: {
      "click": _vm.saveUserProfile
    }
  }, [_vm._v("\n                         Save\n                    ")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body addBg"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-1 col-lg-2 col-xl-3"
  }), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-sm-12 col-md-10 col-lg-8 col-xl-6"
  }, [_c('div', {}, [(_vm.userProfile && (_vm.userProfile.ProfileImage == undefined || _vm.userProfile.ProfileImage == '' || _vm.userProfile.ProfileImage == null)) ? _c('div', {
    staticClass: "proMask"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "profileHeader"
  }, [_c('div', {
    staticClass: "col-lg-4 col-md-4 col-sm-4 col-xs-4"
  }, [_c('vue-avatar', {
    ref: "vueavatar",
    attrs: {
      "width": 200,
      "height": 220,
      "image": ""
    },
    on: {
      "vue-avatar-editor:image-ready": _vm.onImageReady
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-lg-8 col-md-8 col-sm-8 col-xs-8"
  }, [_c('div', {
    staticClass: "form-label userProfileName"
  }, [_c('label', [_vm._v(_vm._s(_vm.userProfile.FirstName) + " " + _vm._s(_vm.userProfile.LastName))])]), _vm._v(" "), _c('div', {
    staticClass: "form-label profileDesig"
  }, [_c('label', {
    staticClass: "labels"
  }, [_vm._v("Designation - ")]), _vm._v(" "), _c('label', {
    domProps: {
      "textContent": _vm._s(_vm.userProfile.DesignationName)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-label profileId"
  }, [_c('label', {
    staticClass: "labels"
  }, [_vm._v("Payroll Id - ")]), _vm._v(" "), _c('label', {
    domProps: {
      "textContent": _vm._s(_vm.userProfile.PayrollId)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "profileHeaderImgResize"
  }, [_vm._v("Resize Image")]), _vm._v(" "), _c('vue-avatar-scale', {
    ref: "vueavatarscale",
    attrs: {
      "width": 150,
      "min": 1,
      "max": 3,
      "step": 0.02
    },
    on: {
      "vue-avatar-editor-scale:change-scale": _vm.onChangeScale
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "row profileBody"
  }, [_c('div', {
    staticClass: "col-lg-3 col-md-4 col-sm-4 col-xs-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "labels"
  }, [_vm._v("Mobile Number")]), _vm._v(" "), _c('label', {
    staticClass: "form-control md-txt",
    domProps: {
      "textContent": _vm._s(_vm.userProfile.MobileNumber)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-5 col-md-4 col-sm-4 col-xs-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "labels"
  }, [_vm._v("Reporting Manager")]), _vm._v(" "), _c('label', {
    staticClass: "form-control md-txt",
    domProps: {
      "textContent": _vm._s(_vm.userProfile.ReportingManagerName)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-4 col-md-4 col-sm-4 col-xs-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "labels"
  }, [_vm._v("Campus")]), _vm._v(" "), _c('label', {
    staticClass: "form-control md-txt",
    domProps: {
      "textContent": _vm._s(_vm.userProfile.CampusName)
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "row profileBody"
  }, [_c('div', {
    staticClass: "col-md-8"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "labels"
  }, [_vm._v("E-mail")]), _vm._v(" "), _c('label', {
    staticClass: "form-control md-txt",
    domProps: {
      "textContent": _vm._s(_vm.userProfile.EmailId)
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-1 col-lg-2 col-xl-3"
  })])])]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ded8ffde", module.exports)
  }
}

/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "card zoomIn animated"
  }, [_c('div', {
    staticClass: "card-block"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Menu Name:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.name),
      expression: "menuInstanceDetail.name"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Description:")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.description),
      expression: "menuInstanceDetail.description"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "3",
      "type": "text"
    },
    domProps: {
      "value": (_vm.menuInstanceDetail.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "description", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Icon Class: ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.iconClass),
      expression: "menuInstanceDetail.iconClass"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.iconClass)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "iconClass", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Navigate To Url: ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.navigateToUrl),
      expression: "menuInstanceDetail.navigateToUrl"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.navigateToUrl)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "navigateToUrl", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Navigate To Fragment (Mobile Only): ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.navigateToFragment),
      expression: "menuInstanceDetail.navigateToFragment"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.navigateToFragment)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "navigateToFragment", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Method to call which will display menu count: ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.methodToDisplayMenuCount),
      expression: "menuInstanceDetail.methodToDisplayMenuCount"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.methodToDisplayMenuCount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "methodToDisplayMenuCount", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Fragment to call which will display menu count (Mobile only): ")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.menuInstanceDetail.fragmentToDisplayMenuCount),
      expression: "menuInstanceDetail.fragmentToDisplayMenuCount"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.menuInstanceDetail.fragmentToDisplayMenuCount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.menuInstanceDetail, "fragmentToDisplayMenuCount", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-success",
    on: {
      "click": _vm.onClick_createNewMenu
    }
  }, [_vm._v("Save")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-outline-primary",
    on: {
      "click": _vm.onClick_cancelNewMenuCreation
    }
  }, [_vm._v("Cancel")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-df60a68e", module.exports)
  }
}

/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(318);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(33)("4bcd9bae", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-60ec9840\",\"scoped\":true,\"hasInlineConfig\":false}!./userSearchComponent.css", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-60ec9840\",\"scoped\":true,\"hasInlineConfig\":false}!./userSearchComponent.css");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 448 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(319);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(33)("1f6c7f78", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-77075219\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VueAvatar.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-77075219\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VueAvatar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(320);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(33)("4c780c0a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-831c40f4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./appointmentCalendar.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-831c40f4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./appointmentCalendar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(321);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(33)("7f8be1bd", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-ded8ffde\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./userProfileComponentVue.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-ded8ffde\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./userProfileComponentVue.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 451 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 452 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  "use strict";

  if (!Array.from) {
    Array.from = function (object) {
      return [].slice.call(object);
    };
  }

  function buildDraggable(Sortable) {
    function removeNode(node) {
      node.parentElement.removeChild(node);
    }

    function insertNodeAt(fatherNode, node, position) {
      var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
      fatherNode.insertBefore(node, refNode);
    }

    function computeVmIndex(vnodes, element) {
      return vnodes.map(function (elt) {
        return elt.elm;
      }).indexOf(element);
    }

    function _computeIndexes(slots, children, isTransition) {
      if (!slots) {
        return [];
      }

      var elmFromNodes = slots.map(function (elt) {
        return elt.elm;
      });
      var rawIndexes = [].concat(_toConsumableArray(children)).map(function (elt) {
        return elmFromNodes.indexOf(elt);
      });
      return isTransition ? rawIndexes.filter(function (ind) {
        return ind !== -1;
      }) : rawIndexes;
    }

    function emit(evtName, evtData) {
      var _this = this;

      this.$nextTick(function () {
        return _this.$emit(evtName.toLowerCase(), evtData);
      });
    }

    function delegateAndEmit(evtName) {
      var _this2 = this;

      return function (evtData) {
        if (_this2.realList !== null) {
          _this2['onDrag' + evtName](evtData);
        }
        emit.call(_this2, evtName, evtData);
      };
    }

    var eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
    var eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
    var readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(function (evt) {
      return 'on' + evt;
    });
    var draggingElement = null;

    var props = {
      options: Object,
      list: {
        type: Array,
        required: false,
        default: null
      },
      value: {
        type: Array,
        required: false,
        default: null
      },
      noTransitionOnDrag: {
        type: Boolean,
        default: false
      },
      clone: {
        type: Function,
        default: function _default(original) {
          return original;
        }
      },
      element: {
        type: String,
        default: 'div'
      },
      move: {
        type: Function,
        default: null
      }
    };

    var draggableComponent = {
      name: 'draggable',

      props: props,

      data: function data() {
        return {
          transitionMode: false,
          componentMode: false
        };
      },
      render: function render(h) {
        var slots = this.$slots.default;
        if (slots && slots.length === 1) {
          var child = slots[0];
          if (child.componentOptions && child.componentOptions.tag === "transition-group") {
            this.transitionMode = true;
          }
        }
        var children = slots;
        var footer = this.$slots.footer;

        if (footer) {
          children = slots ? [].concat(_toConsumableArray(slots), _toConsumableArray(footer)) : [].concat(_toConsumableArray(footer));
        }
        return h(this.element, null, children);
      },
      mounted: function mounted() {
        var _this3 = this;

        this.componentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();
        if (this.componentMode && this.transitionMode) {
          throw new Error('Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ' + this.element);
        }
        var optionsAdded = {};
        eventsListened.forEach(function (elt) {
          optionsAdded['on' + elt] = delegateAndEmit.call(_this3, elt);
        });

        eventsToEmit.forEach(function (elt) {
          optionsAdded['on' + elt] = emit.bind(_this3, elt);
        });

        var options = _extends({}, this.options, optionsAdded, { onMove: function onMove(evt, originalEvent) {
            return _this3.onDragMove(evt, originalEvent);
          } });
        !('draggable' in options) && (options.draggable = '>*');
        this._sortable = new Sortable(this.rootContainer, options);
        this.computeIndexes();
      },
      beforeDestroy: function beforeDestroy() {
        this._sortable.destroy();
      },


      computed: {
        rootContainer: function rootContainer() {
          return this.transitionMode ? this.$el.children[0] : this.$el;
        },
        isCloning: function isCloning() {
          return !!this.options && !!this.options.group && this.options.group.pull === 'clone';
        },
        realList: function realList() {
          return !!this.list ? this.list : this.value;
        }
      },

      watch: {
        options: {
          handler: function handler(newOptionValue) {
            for (var property in newOptionValue) {
              if (readonlyProperties.indexOf(property) == -1) {
                this._sortable.option(property, newOptionValue[property]);
              }
            }
          },

          deep: true
        },

        realList: function realList() {
          this.computeIndexes();
        }
      },

      methods: {
        getChildrenNodes: function getChildrenNodes() {
          if (this.componentMode) {
            return this.$children[0].$slots.default;
          }
          var rawNodes = this.$slots.default;
          return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
        },
        computeIndexes: function computeIndexes() {
          var _this4 = this;

          this.$nextTick(function () {
            _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode);
          });
        },
        getUnderlyingVm: function getUnderlyingVm(htmlElt) {
          var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
          if (index === -1) {
            //Edge case during move callback: related element might be
            //an element different from collection
            return null;
          }
          var element = this.realList[index];
          return { index: index, element: element };
        },
        getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
          var __vue__ = _ref.__vue__;

          if (!__vue__ || !__vue__.$options || __vue__.$options._componentTag !== "transition-group") {
            return __vue__;
          }
          return __vue__.$parent;
        },
        emitChanges: function emitChanges(evt) {
          var _this5 = this;

          this.$nextTick(function () {
            _this5.$emit('change', evt);
          });
        },
        alterList: function alterList(onList) {
          if (!!this.list) {
            onList(this.list);
          } else {
            var newList = [].concat(_toConsumableArray(this.value));
            onList(newList);
            this.$emit('input', newList);
          }
        },
        spliceList: function spliceList() {
          var _arguments = arguments;

          var spliceList = function spliceList(list) {
            return list.splice.apply(list, _arguments);
          };
          this.alterList(spliceList);
        },
        updatePosition: function updatePosition(oldIndex, newIndex) {
          var updatePosition = function updatePosition(list) {
            return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
          };
          this.alterList(updatePosition);
        },
        getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
          var to = _ref2.to,
              related = _ref2.related;

          var component = this.getUnderlyingPotencialDraggableComponent(to);
          if (!component) {
            return { component: component };
          }
          var list = component.realList;
          var context = { list: list, component: component };
          if (to !== related && list && component.getUnderlyingVm) {
            var destination = component.getUnderlyingVm(related);
            if (destination) {
              return _extends(destination, context);
            }
          }

          return context;
        },
        getVmIndex: function getVmIndex(domIndex) {
          var indexes = this.visibleIndexes;
          var numberIndexes = indexes.length;
          return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
        },
        getComponent: function getComponent() {
          return this.$slots.default[0].componentInstance;
        },
        resetTransitionData: function resetTransitionData(index) {
          if (!this.noTransitionOnDrag || !this.transitionMode) {
            return;
          }
          var nodes = this.getChildrenNodes();
          nodes[index].data = null;
          var transitionContainer = this.getComponent();
          transitionContainer.children = [];
          transitionContainer.kept = undefined;
        },
        onDragStart: function onDragStart(evt) {
          this.context = this.getUnderlyingVm(evt.item);
          evt.item._underlying_vm_ = this.clone(this.context.element);
          draggingElement = evt.item;
        },
        onDragAdd: function onDragAdd(evt) {
          var element = evt.item._underlying_vm_;
          if (element === undefined) {
            return;
          }
          removeNode(evt.item);
          var newIndex = this.getVmIndex(evt.newIndex);
          this.spliceList(newIndex, 0, element);
          this.computeIndexes();
          var added = { element: element, newIndex: newIndex };
          this.emitChanges({ added: added });
        },
        onDragRemove: function onDragRemove(evt) {
          insertNodeAt(this.rootContainer, evt.item, evt.oldIndex);
          if (this.isCloning) {
            removeNode(evt.clone);
            return;
          }
          var oldIndex = this.context.index;
          this.spliceList(oldIndex, 1);
          var removed = { element: this.context.element, oldIndex: oldIndex };
          this.resetTransitionData(oldIndex);
          this.emitChanges({ removed: removed });
        },
        onDragUpdate: function onDragUpdate(evt) {
          removeNode(evt.item);
          insertNodeAt(evt.from, evt.item, evt.oldIndex);
          var oldIndex = this.context.index;
          var newIndex = this.getVmIndex(evt.newIndex);
          this.updatePosition(oldIndex, newIndex);
          var moved = { element: this.context.element, oldIndex: oldIndex, newIndex: newIndex };
          this.emitChanges({ moved: moved });
        },
        computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
          if (!relatedContext.element) {
            return 0;
          }
          var domChildren = [].concat(_toConsumableArray(evt.to.children)).filter(function (el) {
            return el.style['display'] !== 'none';
          });
          var currentDOMIndex = domChildren.indexOf(evt.related);
          var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
          var draggedInList = domChildren.indexOf(draggingElement) != -1;
          return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
        },
        onDragMove: function onDragMove(evt, originalEvent) {
          var onMove = this.move;
          if (!onMove || !this.realList) {
            return true;
          }

          var relatedContext = this.getRelatedContextFromMoveEvent(evt);
          var draggedContext = this.context;
          var futureIndex = this.computeFutureIndex(relatedContext, evt);
          _extends(draggedContext, { futureIndex: futureIndex });
          _extends(evt, { relatedContext: relatedContext, draggedContext: draggedContext });
          return onMove(evt, originalEvent);
        },
        onDragEnd: function onDragEnd(evt) {
          this.computeIndexes();
          draggingElement = null;
        }
      }
    };
    return draggableComponent;
  }

  if (true) {
    var Sortable = __webpack_require__(386);
    module.exports = buildDraggable(Sortable);
  } else if (typeof define == "function" && define.amd) {
    define(['sortablejs'], function (Sortable) {
      return buildDraggable(Sortable);
    });
  } else if (window && window.Vue && window.Sortable) {
    var draggable = buildDraggable(window.Sortable);
    Vue.component('draggable', draggable);
  }
})();

/***/ }),
/* 453 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ })
],[286]);
//# sourceMappingURL=bundle.js.map