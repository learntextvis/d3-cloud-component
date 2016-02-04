(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DaviesWordCloud = undefined;
	
	var _d3cloud = __webpack_require__(1);
	
	var _d3cloud2 = _interopRequireDefault(_d3cloud);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.DaviesWordCloud = _d3cloud2.default; // Exports for this module.

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(14);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(15);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(19);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(44);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(51);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(208);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _d3cloud = __webpack_require__(209);
	
	var _d3cloud2 = _interopRequireDefault(_d3cloud);
	
	var _keywordInContext = __webpack_require__(257);
	
	__webpack_require__(266);
	
	__webpack_require__(268);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Contains UI for the main configuration options that
	 * modify the visualization.
	 */
	
	var DaviesWordCloudComponent = function (_React$Component) {
	  (0, _inherits3.default)(DaviesWordCloudComponent, _React$Component);
	
	  function DaviesWordCloudComponent() {
	    (0, _classCallCheck3.default)(this, DaviesWordCloudComponent);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DaviesWordCloudComponent).call(this));
	
	    _this.state = {
	      kwikQuery: '',
	      kwikText: '',
	      selectedNode: '',
	      tooltipNode: '',
	      tooltipCount: ''
	    };
	    return _this;
	  }
	
	  // An event handler for when a word is selected in a word cloud
	
	  (0, _createClass3.default)(DaviesWordCloudComponent, [{
	    key: 'clicked',
	    value: function clicked(token, documentId, node) {
	      var text = this.props.kwikData.find(function (d) {
	        return d.id === documentId;
	      }).text;
	      this.setState({
	        'kwikQuery': token,
	        'kwikText': text,
	        'selectedNode': node,
	        'tooltip': undefined
	      });
	    }
	  }, {
	    key: 'mousedover',
	    value: function mousedover(token, count, node) {
	      this.setState({
	        'tooltip': {
	          'node': node,
	          'count': count,
	          'token': token
	        }
	      });
	    }
	  }, {
	    key: 'mousedout',
	    value: function mousedout() {
	      this.setState({
	        'tooltip': undefined
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.chart = new _d3cloud2.default({
	        container: _reactDom2.default.findDOMNode(this).querySelector('.cloud-container') // why is this hard coded
	      });
	
	      this.chart.initialRender();
	      this.chart.update(this.props.data, this.props.config);
	      this.chart.render();
	
	      // Listen to interaction events from the vis.
	      this.chart.on('click', this.clicked.bind(this));
	      this.chart.on('mouseover', this.mousedover.bind(this));
	      this.chart.on('mouseout', this.mousedout.bind(this));
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.chart.update(this.props.data, this.props.config);
	      this.chart.render();
	    }
	  }, {
	    key: 'getOffset',
	    value: function getOffset(el) {
	      var rect = el.getBoundingClientRect();
	      return {
	        left: rect.left + window.scrollX,
	        top: rect.top + window.scrollY,
	        width: rect.width,
	        height: rect.height
	      };
	    }
	  }, {
	    key: 'kwicModal',
	    value: function kwicModal(myclass, position, content, onclose) {
	      return _react2.default.createElement(
	        'div',
	        { className: myclass, style: position },
	        _react2.default.createElement(
	          'div',
	          { className: 'controls' },
	          _react2.default.createElement('button', { onClick: onclose })
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          content
	        )
	      );
	    }
	  }, {
	    key: 'tooltip',
	    value: function tooltip(myclass, style, word, count) {
	      return _react2.default.createElement(
	        'div',
	        { className: myclass, style: style },
	        _react2.default.createElement(
	          'p',
	          null,
	          'Word: ',
	          word,
	          ' '
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Count: ',
	          count,
	          ' '
	        )
	      );
	    }
	  }, {
	    key: 'renderTooltip',
	    value: function renderTooltip() {
	
	      var style;
	      var content;
	      var className = this.props.tooltipOpts.classname;
	
	      if (this.state.tooltip) {
	        var nodeOffset = this.getOffset(this.state.tooltip.node);
	        var word = this.state.tooltip.token;
	        var count = this.state.tooltip.count;
	
	        style = {
	          top: nodeOffset.top - 25,
	          left: nodeOffset.left + 25
	        };
	        return this.tooltip(className, style, word, count);
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'renderKeywordInContext',
	    value: function renderKeywordInContext(opts) {
	      var _this2 = this;
	
	      var kwik;
	      var kwikPosition;
	      var kwclass;
	
	      if (this.state.selectedNode) {
	        var nodeOffset = this.getOffset(this.state.selectedNode);
	        kwikPosition = {
	          top: nodeOffset.top + nodeOffset.height,
	          left: nodeOffset.left
	        };
	        kwclass = opts.classname;
	
	        kwik = _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(_keywordInContext.KeywordInContext, {
	            caseSensitive: false,
	            contextSize: opts.kwikContextSize,
	            text: this.state.kwikText,
	            query: this.state.kwikQuery
	          })
	        );
	        return this.kwicModal(kwclass, kwikPosition, kwik, function () {
	          _this2.setState({
	            'selectedNode': undefined,
	            'tooltip': undefined
	          });
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('div', { className: 'cloud-container' }),
	        this.renderKeywordInContext(this.props.kwicOpts),
	        this.renderTooltip()
	      );
	    }
	  }]);
	  return DaviesWordCloudComponent;
	}(_react2.default.Component);
	
	exports.default = DaviesWordCloudComponent;
	
	DaviesWordCloudComponent.propTypes = {
	  // document properties here.
	  config: _react2.default.PropTypes.object.isRequired,
	  data: _react2.default.PropTypes.array.isRequired,
	  kwikData: _react2.default.PropTypes.array,
	  kwicOpts: _react2.default.PropTypes.object.isRequired,
	  tooltipOpts: _react2.default.PropTypes.object
	};
	
	DaviesWordCloudComponent.defaultProps = {
	  kwikData: [],
	  tooltipOpts: { 'class': 'mytooltip' }
	};
	
	/**
	 * Helper method for instatiating this method imperatively
	 * (as opposed to declaratively with React.)
	 *
	 * @param  {Object} opts display parameters.
	 * @param  {Object} opts.config
	 * @param  {Array} opts.data
	 * @param  {Array} opts.kwikData
	 * @param  {DOMNode} opts.container
	 * @param  {String} opts.query
	 *
	 */
	DaviesWordCloudComponent.show = function (opts) {
	  var config = opts.config;
	  var data = opts.data;
	  var kwikData = opts.kwikData;
	  var kwicOpts = opts.kwicOpts;
	  var container = opts.container;
	  var tooltipOpts = opts.tooltipOpts;
	
	  _reactDom2.default.render(_react2.default.createElement(DaviesWordCloudComponent, {
	    config: config,
	    data: data,
	    kwicOpts: kwicOpts,
	    kwikData: kwikData,
	    tooltipOpts: tooltipOpts
	  }), container);
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(10).Object.getPrototypeOf;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(5);
	
	__webpack_require__(7)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(6);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8)
	  , core    = __webpack_require__(10)
	  , fails   = __webpack_require__(13);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _defineProperty = __webpack_require__(16);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(17), __esModule: true };

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(18);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof2 = __webpack_require__(20);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};
	
	exports.__esModule = true;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Symbol = __webpack_require__(21)["default"];
	
	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};
	
	exports.__esModule = true;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(23);
	__webpack_require__(43);
	module.exports = __webpack_require__(10).Symbol;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(18)
	  , global         = __webpack_require__(9)
	  , has            = __webpack_require__(24)
	  , DESCRIPTORS    = __webpack_require__(25)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(26)
	  , $fails         = __webpack_require__(13)
	  , shared         = __webpack_require__(29)
	  , setToStringTag = __webpack_require__(30)
	  , uid            = __webpack_require__(32)
	  , wks            = __webpack_require__(31)
	  , keyOf          = __webpack_require__(33)
	  , $names         = __webpack_require__(37)
	  , enumKeys       = __webpack_require__(38)
	  , isArray        = __webpack_require__(39)
	  , anObject       = __webpack_require__(40)
	  , toIObject      = __webpack_require__(34)
	  , createDesc     = __webpack_require__(28)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(42)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
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
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 24 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(13)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(18)
	  , createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(25) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(18).setDesc
	  , has = __webpack_require__(24)
	  , TAG = __webpack_require__(31)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(29)('wks')
	  , uid    = __webpack_require__(32)
	  , Symbol = __webpack_require__(9).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(18)
	  , toIObject = __webpack_require__(34);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(35)
	  , defined = __webpack_require__(6);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(36);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(34)
	  , getNames  = __webpack_require__(18).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(18);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(36);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(41);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 43 */
/***/ function(module, exports) {



/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$create = __webpack_require__(45)["default"];
	
	var _Object$setPrototypeOf = __webpack_require__(47)["default"];
	
	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }
	
	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};
	
	exports.__esModule = true;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(18);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	module.exports = __webpack_require__(10).Object.setPrototypeOf;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(50).set});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(18).getDesc
	  , isObject = __webpack_require__(41)
	  , anObject = __webpack_require__(40);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(11)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
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
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
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
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(53);

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _keys = __webpack_require__(210);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _getIterator2 = __webpack_require__(213);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _set = __webpack_require__(228);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _toConsumableArray2 = __webpack_require__(242);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _slicedToArray2 = __webpack_require__(247);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(14);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(15);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _d = __webpack_require__(251);
	
	var _d2 = _interopRequireDefault(_d);
	
	var _lodash = __webpack_require__(252);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var d3Cloud = __webpack_require__(255); // Is there a real es6 way to get d3.layout.cloud?
	
	var DaviesWordCloud = function () {
	  function DaviesWordCloud(opts) {
	    (0, _classCallCheck3.default)(this, DaviesWordCloud);
	
	    this.opts = opts;
	    this._container = opts.container;
	    this.container = _d2.default.select(this._container);
	    this.dispatch = _d2.default.dispatch('click', 'mouseover', 'mouseout', 'mousemove');
	  }
	
	  (0, _createClass3.default)(DaviesWordCloud, [{
	    key: 'updateData',
	    value: function updateData(data) {
	      this.documents = _lodash2.default.cloneDeep(data);
	      this.documents.forEach(function (document) {
	        document.tokens = _lodash2.default.sortBy(document.tokens, function (t) {
	          return -t[1];
	        });
	      });
	
	      // Create an array of maps that go from token -> score for each
	      // document in the data. Also keep track of how many documents each
	      // term appears in.
	      var documentAppearances = {};
	      var documentScores = this.documents.map(function (document) {
	        var scores = document.tokens.reduce(function (map, _ref) {
	          var _ref2 = (0, _slicedToArray3.default)(_ref, 2);
	
	          var token = _ref2[0];
	          var score = _ref2[1];
	
	          var currAppearences = documentAppearances[token] || 0;
	          documentAppearances[token] = currAppearences + 1;
	
	          map[token] = score;
	          return map;
	        }, {});
	        return scores;
	      });
	
	      // Create a map of all tokens to the sum of the scores in all the documents
	      this.sumScores = _lodash2.default.mergeWith.apply(_lodash2.default, [{}].concat((0, _toConsumableArray3.default)(documentScores), [function (a, b) {
	        if (a !== undefined && b !== undefined) {
	          return a + b;
	        }
	        return undefined;
	      }]));
	
	      // Store the set of unique terms
	      this.uniqueTokens = new _set2.default();
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(documentAppearances)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var key = _step.value;
	
	          var count = documentAppearances[key];
	          if (count === 1) {
	            this.uniqueTokens = this.uniqueTokens.add(key);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'updateScales',
	    value: function updateScales(doc) {
	      // happens per document
	      this.fontSize = _d2.default.scale.linear().domain(_d2.default.extent(doc.tokens, function (d) {
	        return d[1];
	      })).range([12, 64]);
	    }
	  }, {
	    key: 'update',
	    value: function update(data) {
	      this.updateData(data);
	    }
	  }, {
	    key: 'initialRender',
	    value: function initialRender() {
	      // No-op
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	
	      var self = this;
	
	      var mywordCloud = this.container.selectAll('div.word-cloud-plot').data(this.documents);
	
	      var fontscale = _d2.default.scale.linear().range([8, 60]);
	
	      var plot = mywordCloud.enter().append('div').attr('class', 'word-cloud-plot');
	
	      plot.append('div').attr('class', 'title').text(function (d) {
	        return d.name;
	      });
	
	      plot.append('div').attr('class', 'cloud');
	
	      plot.each(drawDocument);
	
	      function drawDocument(doc) {
	
	        self.updateScales(doc);
	
	        var cloud = _d2.default.select(this).select('.cloud');
	
	        var fontscale = _d2.default.scale.linear().range([8, 60]).domain(_d2.default.extent(doc.tokens, function (d) {
	          return d[1];
	        }));
	
	        var layout = d3Cloud().size([500, 500]).words(doc.tokens).rotate(0).font('Arial').spiral('rectangular').text(function (d) {
	          return d[0];
	        }).fontSize(function (d) {
	          return self.fontSize(d[1]);
	        }).on('end', drawTokens);
	
	        function drawTokens(words) {
	
	          var svg = cloud.append('svg').attr('width', layout.size()[0]).attr('height', layout.size()[1]).attr('class', 'wordcloud').append('g')
	          // without the transform, words would get cutoff to the left and top, they would
	          // appear outside of the SVG area
	          .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')');
	
	          var tokens = svg.selectAll('text.token').data(words);
	
	          tokens.enter().append('text').attr('class', 'token').style('font-size', function (d) {
	            return self.fontSize(d[1]) + 'px';
	          }).attr('text-anchor', 'middle').attr('transform', function (d) {
	            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
	          }).text(function (d) {
	            return d[0];
	          }).on('mouseover', function (d) {
	            var token = d[0];
	            var count = d[1];
	            self.dispatch.mouseover(token, count, this);
	          }).on('mouseout', function (d) {
	            self.dispatch.mouseout(this);
	          }).on('click', function (d) {
	            var docId = this.parentNode.parentNode.__data__.id; // something better?
	            var token = d[0];
	            self.dispatch.click(token, docId, this);
	          });
	
	          tokens.exit().remove();
	        }
	
	        layout.start();
	      }
	
	      mywordCloud.exit().remove();
	    }
	  }, {
	    key: 'on',
	    value: function on(event, callback) {
	      this.dispatch.on(event, callback);
	    }
	  }]);
	  return DaviesWordCloud;
	}();

	exports.default = DaviesWordCloud;

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(211), __esModule: true };

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(212);
	module.exports = __webpack_require__(10).Object.keys;

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(5);
	
	__webpack_require__(7)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(214), __esModule: true };

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(215);
	__webpack_require__(222);
	module.exports = __webpack_require__(225);

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(216);
	var Iterators = __webpack_require__(219);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(217)
	  , step             = __webpack_require__(218)
	  , Iterators        = __webpack_require__(219)
	  , toIObject        = __webpack_require__(34);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(220)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 217 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 218 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 219 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(42)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(26)
	  , hide           = __webpack_require__(27)
	  , has            = __webpack_require__(24)
	  , Iterators      = __webpack_require__(219)
	  , $iterCreate    = __webpack_require__(221)
	  , setToStringTag = __webpack_require__(30)
	  , getProto       = __webpack_require__(18).getProto
	  , ITERATOR       = __webpack_require__(31)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(18)
	  , descriptor     = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(30)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(27)(IteratorPrototype, __webpack_require__(31)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(223)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(220)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(224)
	  , defined   = __webpack_require__(6);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 224 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(40)
	  , get      = __webpack_require__(226);
	module.exports = __webpack_require__(10).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(227)
	  , ITERATOR  = __webpack_require__(31)('iterator')
	  , Iterators = __webpack_require__(219);
	module.exports = __webpack_require__(10).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(36)
	  , TAG = __webpack_require__(31)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(229), __esModule: true };

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(43);
	__webpack_require__(222);
	__webpack_require__(215);
	__webpack_require__(230);
	__webpack_require__(240);
	module.exports = __webpack_require__(10).Set;

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(231);
	
	// 23.2 Set Objects
	__webpack_require__(239)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(18)
	  , hide         = __webpack_require__(27)
	  , redefineAll  = __webpack_require__(232)
	  , ctx          = __webpack_require__(11)
	  , strictNew    = __webpack_require__(233)
	  , defined      = __webpack_require__(6)
	  , forOf        = __webpack_require__(234)
	  , $iterDefine  = __webpack_require__(220)
	  , step         = __webpack_require__(218)
	  , ID           = __webpack_require__(32)('id')
	  , $has         = __webpack_require__(24)
	  , isObject     = __webpack_require__(41)
	  , setSpecies   = __webpack_require__(238)
	  , DESCRIPTORS  = __webpack_require__(25)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;
	
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(26);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 233 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(11)
	  , call        = __webpack_require__(235)
	  , isArrayIter = __webpack_require__(236)
	  , anObject    = __webpack_require__(40)
	  , toLength    = __webpack_require__(237)
	  , getIterFn   = __webpack_require__(226);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(40);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(219)
	  , ITERATOR   = __webpack_require__(31)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(224)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(10)
	  , $           = __webpack_require__(18)
	  , DESCRIPTORS = __webpack_require__(25)
	  , SPECIES     = __webpack_require__(31)('species');
	
	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(18)
	  , global         = __webpack_require__(9)
	  , $export        = __webpack_require__(8)
	  , fails          = __webpack_require__(13)
	  , hide           = __webpack_require__(27)
	  , redefineAll    = __webpack_require__(232)
	  , forOf          = __webpack_require__(234)
	  , strictNew      = __webpack_require__(233)
	  , isObject       = __webpack_require__(41)
	  , setToStringTag = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(25);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    C = wrapper(function(target, iterable){
	      strictNew(target, C, NAME);
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(8);
	
	$export($export.P, 'Set', {toJSON: __webpack_require__(241)('Set')});

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(234)
	  , classof = __webpack_require__(227);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _from = __webpack_require__(243);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(244), __esModule: true };

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(222);
	__webpack_require__(245);
	module.exports = __webpack_require__(10).Array.from;

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(11)
	  , $export     = __webpack_require__(8)
	  , toObject    = __webpack_require__(5)
	  , call        = __webpack_require__(235)
	  , isArrayIter = __webpack_require__(236)
	  , toLength    = __webpack_require__(237)
	  , getIterFn   = __webpack_require__(226);
	$export($export.S + $export.F * !__webpack_require__(246)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(31)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _isIterable2 = __webpack_require__(248);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(213);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(249), __esModule: true };

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(215);
	__webpack_require__(222);
	module.exports = __webpack_require__(250);

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(227)
	  , ITERATOR  = __webpack_require__(31)('iterator')
	  , Iterators = __webpack_require__(219);
	module.exports = __webpack_require__(10).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// Word cloud layout by Jason Davies, https://www.jasondavies.com/wordcloud/
	// Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf
	
	var dispatch = __webpack_require__(256).dispatch;
	
	var cloudRadians = Math.PI / 180,
	    cw = 1 << 11 >> 5,
	    ch = 1 << 11;
	
	module.exports = function () {
	  var size = [256, 256],
	      text = cloudText,
	      font = cloudFont,
	      fontSize = cloudFontSize,
	      fontStyle = cloudFontNormal,
	      fontWeight = cloudFontNormal,
	      rotate = cloudRotate,
	      padding = cloudPadding,
	      spiral = archimedeanSpiral,
	      words = [],
	      timeInterval = Infinity,
	      event = dispatch("word", "end"),
	      timer = null,
	      random = Math.random,
	      cloud = {},
	      canvas = cloudCanvas;
	
	  cloud.canvas = function (_) {
	    return arguments.length ? (canvas = functor(_), cloud) : canvas;
	  };
	
	  cloud.start = function () {
	    var contextAndRatio = getContext(canvas()),
	        board = zeroArray((size[0] >> 5) * size[1]),
	        bounds = null,
	        n = words.length,
	        i = -1,
	        tags = [],
	        data = words.map(function (d, i) {
	      d.text = text.call(this, d, i);
	      d.font = font.call(this, d, i);
	      d.style = fontStyle.call(this, d, i);
	      d.weight = fontWeight.call(this, d, i);
	      d.rotate = rotate.call(this, d, i);
	      d.size = ~ ~fontSize.call(this, d, i);
	      d.padding = padding.call(this, d, i);
	      return d;
	    }).sort(function (a, b) {
	      return b.size - a.size;
	    });
	
	    if (timer) clearInterval(timer);
	    timer = setInterval(step, 0);
	    step();
	
	    return cloud;
	
	    function step() {
	      var start = Date.now();
	      while (Date.now() - start < timeInterval && ++i < n && timer) {
	        var d = data[i];
	        d.x = size[0] * (random() + .5) >> 1;
	        d.y = size[1] * (random() + .5) >> 1;
	        cloudSprite(contextAndRatio, d, data, i);
	        if (d.hasText && place(board, d, bounds)) {
	          tags.push(d);
	          event.word(d);
	          if (bounds) cloudBounds(bounds, d);else bounds = [{ x: d.x + d.x0, y: d.y + d.y0 }, { x: d.x + d.x1, y: d.y + d.y1 }];
	          // Temporary hack
	          d.x -= size[0] >> 1;
	          d.y -= size[1] >> 1;
	        }
	      }
	      if (i >= n) {
	        cloud.stop();
	        event.end(tags, bounds);
	      }
	    }
	  };
	
	  cloud.stop = function () {
	    if (timer) {
	      clearInterval(timer);
	      timer = null;
	    }
	    return cloud;
	  };
	
	  function getContext(canvas) {
	    canvas.width = canvas.height = 1;
	    var ratio = Math.sqrt(canvas.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
	    canvas.width = (cw << 5) / ratio;
	    canvas.height = ch / ratio;
	
	    var context = canvas.getContext("2d");
	    context.fillStyle = context.strokeStyle = "red";
	    context.textAlign = "center";
	
	    return { context: context, ratio: ratio };
	  }
	
	  function place(board, tag, bounds) {
	    var perimeter = [{ x: 0, y: 0 }, { x: size[0], y: size[1] }],
	        startX = tag.x,
	        startY = tag.y,
	        maxDelta = Math.sqrt(size[0] * size[0] + size[1] * size[1]),
	        s = spiral(size),
	        dt = random() < .5 ? 1 : -1,
	        t = -dt,
	        dxdy,
	        dx,
	        dy;
	
	    while (dxdy = s(t += dt)) {
	      dx = ~ ~dxdy[0];
	      dy = ~ ~dxdy[1];
	
	      if (Math.min(Math.abs(dx), Math.abs(dy)) >= maxDelta) break;
	
	      tag.x = startX + dx;
	      tag.y = startY + dy;
	
	      if (tag.x + tag.x0 < 0 || tag.y + tag.y0 < 0 || tag.x + tag.x1 > size[0] || tag.y + tag.y1 > size[1]) continue;
	      // TODO only check for collisions within current bounds.
	      if (!bounds || !cloudCollide(tag, board, size[0])) {
	        if (!bounds || collideRects(tag, bounds)) {
	          var sprite = tag.sprite,
	              w = tag.width >> 5,
	              sw = size[0] >> 5,
	              lx = tag.x - (w << 4),
	              sx = lx & 0x7f,
	              msx = 32 - sx,
	              h = tag.y1 - tag.y0,
	              x = (tag.y + tag.y0) * sw + (lx >> 5),
	              last;
	          for (var j = 0; j < h; j++) {
	            last = 0;
	            for (var i = 0; i <= w; i++) {
	              board[x + i] |= last << msx | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
	            }
	            x += sw;
	          }
	          delete tag.sprite;
	          return true;
	        }
	      }
	    }
	    return false;
	  }
	
	  cloud.timeInterval = function (_) {
	    return arguments.length ? (timeInterval = _ == null ? Infinity : _, cloud) : timeInterval;
	  };
	
	  cloud.words = function (_) {
	    return arguments.length ? (words = _, cloud) : words;
	  };
	
	  cloud.size = function (_) {
	    return arguments.length ? (size = [+_[0], +_[1]], cloud) : size;
	  };
	
	  cloud.font = function (_) {
	    return arguments.length ? (font = functor(_), cloud) : font;
	  };
	
	  cloud.fontStyle = function (_) {
	    return arguments.length ? (fontStyle = functor(_), cloud) : fontStyle;
	  };
	
	  cloud.fontWeight = function (_) {
	    return arguments.length ? (fontWeight = functor(_), cloud) : fontWeight;
	  };
	
	  cloud.rotate = function (_) {
	    return arguments.length ? (rotate = functor(_), cloud) : rotate;
	  };
	
	  cloud.text = function (_) {
	    return arguments.length ? (text = functor(_), cloud) : text;
	  };
	
	  cloud.spiral = function (_) {
	    return arguments.length ? (spiral = spirals[_] || _, cloud) : spiral;
	  };
	
	  cloud.fontSize = function (_) {
	    return arguments.length ? (fontSize = functor(_), cloud) : fontSize;
	  };
	
	  cloud.padding = function (_) {
	    return arguments.length ? (padding = functor(_), cloud) : padding;
	  };
	
	  cloud.random = function (_) {
	    return arguments.length ? (random = _, cloud) : random;
	  };
	
	  cloud.on = function () {
	    var value = event.on.apply(event, arguments);
	    return value === event ? cloud : value;
	  };
	
	  return cloud;
	};
	
	function cloudText(d) {
	  return d.text;
	}
	
	function cloudFont() {
	  return "serif";
	}
	
	function cloudFontNormal() {
	  return "normal";
	}
	
	function cloudFontSize(d) {
	  return Math.sqrt(d.value);
	}
	
	function cloudRotate() {
	  return (~ ~(Math.random() * 6) - 3) * 30;
	}
	
	function cloudPadding() {
	  return 1;
	}
	
	// Fetches a monochrome sprite bitmap for the specified text.
	// Load in batches for speed.
	function cloudSprite(contextAndRatio, d, data, di) {
	  if (d.sprite) return;
	  var c = contextAndRatio.context,
	      ratio = contextAndRatio.ratio;
	
	  c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
	  var x = 0,
	      y = 0,
	      maxh = 0,
	      n = data.length;
	  --di;
	  while (++di < n) {
	    d = data[di];
	    c.save();
	    c.font = d.style + " " + d.weight + " " + ~ ~((d.size + 1) / ratio) + "px " + d.font;
	    var w = c.measureText(d.text + "m").width * ratio,
	        h = d.size << 1;
	    if (d.rotate) {
	      var sr = Math.sin(d.rotate * cloudRadians),
	          cr = Math.cos(d.rotate * cloudRadians),
	          wcr = w * cr,
	          wsr = w * sr,
	          hcr = h * cr,
	          hsr = h * sr;
	      w = Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f >> 5 << 5;
	      h = ~ ~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
	    } else {
	      w = w + 0x1f >> 5 << 5;
	    }
	    if (h > maxh) maxh = h;
	    if (x + w >= cw << 5) {
	      x = 0;
	      y += maxh;
	      maxh = 0;
	    }
	    if (y + h >= ch) break;
	    c.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
	    if (d.rotate) c.rotate(d.rotate * cloudRadians);
	    c.fillText(d.text, 0, 0);
	    if (d.padding) c.lineWidth = 2 * d.padding, c.strokeText(d.text, 0, 0);
	    c.restore();
	    d.width = w;
	    d.height = h;
	    d.xoff = x;
	    d.yoff = y;
	    d.x1 = w >> 1;
	    d.y1 = h >> 1;
	    d.x0 = -d.x1;
	    d.y0 = -d.y1;
	    d.hasText = true;
	    x += w;
	  }
	  var pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
	      sprite = [];
	  while (--di >= 0) {
	    d = data[di];
	    if (!d.hasText) continue;
	    var w = d.width,
	        w32 = w >> 5,
	        h = d.y1 - d.y0;
	    // Zero the buffer
	    for (var i = 0; i < h * w32; i++) {
	      sprite[i] = 0;
	    }x = d.xoff;
	    if (x == null) return;
	    y = d.yoff;
	    var seen = 0,
	        seenRow = -1;
	    for (var j = 0; j < h; j++) {
	      for (var i = 0; i < w; i++) {
	        var k = w32 * j + (i >> 5),
	            m = pixels[(y + j) * (cw << 5) + (x + i) << 2] ? 1 << 31 - i % 32 : 0;
	        sprite[k] |= m;
	        seen |= m;
	      }
	      if (seen) seenRow = j;else {
	        d.y0++;
	        h--;
	        j--;
	        y++;
	      }
	    }
	    d.y1 = d.y0 + seenRow;
	    d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
	  }
	}
	
	// Use mask-based collision detection.
	function cloudCollide(tag, board, sw) {
	  sw >>= 5;
	  var sprite = tag.sprite,
	      w = tag.width >> 5,
	      lx = tag.x - (w << 4),
	      sx = lx & 0x7f,
	      msx = 32 - sx,
	      h = tag.y1 - tag.y0,
	      x = (tag.y + tag.y0) * sw + (lx >> 5),
	      last;
	  for (var j = 0; j < h; j++) {
	    last = 0;
	    for (var i = 0; i <= w; i++) {
	      if ((last << msx | (i < w ? (last = sprite[j * w + i]) >>> sx : 0)) & board[x + i]) return true;
	    }
	    x += sw;
	  }
	  return false;
	}
	
	function cloudBounds(bounds, d) {
	  var b0 = bounds[0],
	      b1 = bounds[1];
	  if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
	  if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
	  if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
	  if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
	}
	
	function collideRects(a, b) {
	  return a.x + a.x1 > b[0].x && a.x + a.x0 < b[1].x && a.y + a.y1 > b[0].y && a.y + a.y0 < b[1].y;
	}
	
	function archimedeanSpiral(size) {
	  var e = size[0] / size[1];
	  return function (t) {
	    return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
	  };
	}
	
	function rectangularSpiral(size) {
	  var dy = 4,
	      dx = dy * size[0] / size[1],
	      x = 0,
	      y = 0;
	  return function (t) {
	    var sign = t < 0 ? -1 : 1;
	    // See triangular numbers: T_n = n * (n + 1) / 2.
	    switch (Math.sqrt(1 + 4 * sign * t) - sign & 3) {
	      case 0:
	        x += dx;break;
	      case 1:
	        y += dy;break;
	      case 2:
	        x -= dx;break;
	      default:
	        y -= dy;break;
	    }
	    return [x, y];
	  };
	}
	
	// TODO reuse arrays?
	function zeroArray(n) {
	  var a = [],
	      i = -1;
	  while (++i < n) {
	    a[i] = 0;
	  }return a;
	}
	
	function cloudCanvas() {
	  return document.createElement("canvas");
	}
	
	function functor(d) {
	  return typeof d === "function" ? d : function () {
	    return d;
	  };
	}
	
	var spirals = {
	  archimedean: archimedeanSpiral,
	  rectangular: rectangularSpiral
	};

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define('d3-dispatch', ['exports'], factory) :
	  factory((global.d3_dispatch = {}));
	}(this, function (exports) { 'use strict';
	
	  function dispatch() {
	    return new Dispatch(arguments);
	  }
	
	  function Dispatch(types) {
	    var i = -1,
	        n = types.length,
	        callbacksByType = {},
	        callbackByName = {},
	        type,
	        that = this;
	
	    that.on = function(type, callback) {
	      type = parseType(type);
	
	      // Return the current callback, if any.
	      if (arguments.length < 2) {
	        return (callback = callbackByName[type.name]) && callback.value;
	      }
	
	      // If a type was specified…
	      if (type.type) {
	        var callbacks = callbacksByType[type.type],
	            callback0 = callbackByName[type.name],
	            i;
	
	        // Remove the current callback, if any, using copy-on-remove.
	        if (callback0) {
	          callback0.value = null;
	          i = callbacks.indexOf(callback0);
	          callbacksByType[type.type] = callbacks = callbacks.slice(0, i).concat(callbacks.slice(i + 1));
	          delete callbackByName[type.name];
	        }
	
	        // Add the new callback, if any.
	        if (callback) {
	          callback = {value: callback};
	          callbackByName[type.name] = callback;
	          callbacks.push(callback);
	        }
	      }
	
	      // Otherwise, if a null callback was specified, remove all callbacks with the given name.
	      else if (callback == null) {
	        for (var otherType in callbacksByType) {
	          if (callback = callbackByName[otherType + type.name]) {
	            callback.value = null;
	            var callbacks = callbacksByType[otherType], i = callbacks.indexOf(callback);
	            callbacksByType[otherType] = callbacks.slice(0, i).concat(callbacks.slice(i + 1));
	            delete callbackByName[callback.name];
	          }
	        }
	      }
	
	      return that;
	    };
	
	    while (++i < n) {
	      type = types[i] + "";
	      if (!type || (type in that)) throw new Error("illegal or duplicate type: " + type);
	      callbacksByType[type] = [];
	      that[type] = applier(type);
	    }
	
	    function parseType(type) {
	      var i = (type += "").indexOf("."), name = type;
	      if (i >= 0) type = type.slice(0, i); else name += ".";
	      if (type && !callbacksByType.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	      return {type: type, name: name};
	    }
	
	    function applier(type) {
	      return function() {
	        var callbacks = callbacksByType[type], // Defensive reference; copy-on-remove.
	            callback,
	            callbackValue,
	            i = -1,
	            n = callbacks.length;
	
	        while (++i < n) {
	          if (callbackValue = (callback = callbacks[i]).value) {
	            callbackValue.apply(this, arguments);
	          }
	        }
	
	        return that;
	      };
	    }
	  }
	
	  dispatch.prototype = Dispatch.prototype;
	
	  var version = "0.2.5";
	
	  exports.version = version;
	  exports.dispatch = dispatch;
	
	}));

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.KeywordInContext = undefined;
	
	var _keyword_in_context = __webpack_require__(258);
	
	var _keyword_in_context2 = _interopRequireDefault(_keyword_in_context);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.KeywordInContext = _keyword_in_context2.default; // Exports for this module.

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(14);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(15);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(19);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(44);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(51);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(208);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _match_with_context = __webpack_require__(259);
	
	var _match_with_context2 = _interopRequireDefault(_match_with_context);
	
	__webpack_require__(264);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * A component that renders a keyword-in-context view
	 * of a text. Given a text, a query string and a number of characters
	 * to use as tokens, will display matches in the text along with surrounding
	 * context.
	 */
	
	var KeywordInContext = function (_React$Component) {
	  (0, _inherits3.default)(KeywordInContext, _React$Component);
	
	  function KeywordInContext() {
	    (0, _classCallCheck3.default)(this, KeywordInContext);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(KeywordInContext).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(KeywordInContext, [{
	    key: 'findMatches',
	
	    /**
	     * Given a string and a query, will return a list of objects
	     * that contain the index of where the query matches the string,
	     * the math itself, and a string that represents the context in which
	     * that match was found.
	     *
	     * @param  {String} source      the source string
	     * @param  {String} query       the query string. this is currently
	     *                              interpreted using regex syntax.
	     * @param  {[type]} contextSize number of characters before and after the
	     *                              match to capture as context.
	     * @return {Object}             A concordance like object with index, match,
	     *                              and context properties.
	     */
	    value: function findMatches(source, query, contextSize) {
	      var qLen = query.length;
	
	      if (qLen === 0) {
	        return [];
	      }
	
	      // Set up search options
	      var searchFlags = 'ig';
	      if (this.props.caseSensitive) {
	        searchFlags = 'g';
	      }
	
	      // We first find all the indices where the query matches the source
	      //
	      // TODO: Escape special regex chars?
	      var qReg = new RegExp(query, searchFlags);
	      var matchIndices = [];
	      var match;
	      while (match = qReg.exec(source)) {
	        matchIndices.push([match[0], qReg.lastIndex - match[0].length]);
	      }
	      // Then for each match we build a string with some characters on either
	      // side representing context.
	      var matchesWithContext = matchIndices.map(function (mi) {
	        var match = mi[0];
	        var index = mi[1];
	
	        var context = source.substring(index - contextSize, index + qLen + contextSize);
	
	        // Calculate the index of the match in the context substring.
	        // This is equal to the match index - the number of letters removed
	        // from the beginning of source string up to the match index.
	        var inContextIndex = index - source.substring(0, index - contextSize).length;
	
	        return {
	          context: context,
	          match: match,
	          index: inContextIndex
	        };
	      });
	
	      return matchesWithContext;
	    }
	
	    /**
	     * Returns an array of display components for matches.
	     *
	     * @return {Array} Array of MatchWithContext components.
	     */
	
	  }, {
	    key: 'renderMatches',
	    value: function renderMatches() {
	      var matches = this.findMatches(this.props.text, this.props.query, this.props.contextSize);
	
	      if (this.props.limit && this.props.limit > 0) {
	        matches = matches.slice(0, this.props.limit);
	      }
	
	      return matches.map(function (d, i) {
	        return _react2.default.createElement(_match_with_context2.default, {
	          key: i,
	          context: d.context,
	          match: d.match,
	          index: d.index
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'keywords-in-context' },
	        this.renderMatches()
	      );
	    }
	  }]);
	  return KeywordInContext;
	}(_react2.default.Component);
	
	exports.default = KeywordInContext;
	
	KeywordInContext.propTypes = {
	  // Number of characters to use on either side of a match as context
	  contextSize: _react2.default.PropTypes.number.isRequired,
	  // Whether to perform case sensitive search or not
	  caseSensitive: _react2.default.PropTypes.bool.isRequired,
	  // Text to search for matches
	  text: _react2.default.PropTypes.string.isRequired,
	  // Query String
	  query: _react2.default.PropTypes.string.isRequired,
	  // constrain list to for x matches
	  limit: _react2.default.PropTypes.number
	};
	
	/**
	 * Helper method for instatiating this method imperatively
	 * (as opposed to declaratively with React.)
	 *
	 * @param  {Object} opts display paramters.
	 * @param  {Object} opts.config
	 * @param  {Array} opts.data
	 * @param  {DOMNode} opts.container
	 * @param  {String} opts.query
	 *
	 */
	KeywordInContext.show = function (opts) {
	  var config = opts.config;
	  var data = opts.data;
	  var query = opts.query;
	  var container = opts.container;
	
	  _reactDom2.default.render(_react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(KeywordInContext, {
	      caseSensitive: config.caseSensitive,
	      contextSize: config.contextSize,
	      text: data[0].text,
	      query: query,
	      limit: config.limit
	    })
	  ), container);
	};

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(14);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(15);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(19);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(44);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(51);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(260);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Component that renders a string (the context) with a specific
	 * part highlighted (the match)
	 */
	
	var MatchWithContext = function (_React$Component) {
	  (0, _inherits3.default)(MatchWithContext, _React$Component);
	
	  function MatchWithContext() {
	    (0, _classCallCheck3.default)(this, MatchWithContext);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MatchWithContext).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(MatchWithContext, [{
	    key: 'render',
	    value: function render() {
	      var before = this.props.context.substring(0, this.props.index).replace(/ /gm, ' ');
	      var match = this.props.context.substring(this.props.index, this.props.index + this.props.match.length).replace(/ /gm, ' ');
	      var after = this.props.context.substring(this.props.index + this.props.match.length).replace(/ /gm, ' ');
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'match-with-context' },
	        _react2.default.createElement(
	          'span',
	          { className: 'before' },
	          before
	        ),
	        _react2.default.createElement(
	          'span',
	          { className: 'match' },
	          match
	        ),
	        _react2.default.createElement(
	          'span',
	          { className: 'after' },
	          after
	        )
	      );
	    }
	  }]);
	  return MatchWithContext;
	}(_react2.default.Component);
	
	exports.default = MatchWithContext;
	
	MatchWithContext.propTypes = {
	  // String to render
	  context: _react2.default.PropTypes.string.isRequired,
	  // Text to highlight
	  match: _react2.default.PropTypes.string.isRequired,
	  // Start index of text to highlight in the context string
	  index: _react2.default.PropTypes.number.isRequired
	};

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(261);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(263)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../css-loader/index.js!./match_with_context.css", function() {
				var newContent = require("!!./../../../../css-loader/index.js!./match_with_context.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(262)();
	// imports
	
	
	// module
	exports.push([module.id, ".keywords-in-context .match-with-context {\n  font-family: sans-serif;\n  display: table-row;\n  color: #222222;\n  background-color: white;\n}\n\n.keywords-in-context .match-with-context .before {\n  display: table-cell;\n  text-align: right;\n}\n\n.keywords-in-context .match-with-context .match {\n  display: table-cell;\n  text-align: center;\n  color: red;\n}\n\n.keywords-in-context .match-with-context .after {\n  display: table-cell;\n  text-align: left;\n}\n", ""]);
	
	// exports


/***/ },
/* 262 */
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
/* 263 */
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
		var sourceMap = obj.sourceMap;
	
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
		var media = obj.media;
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
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(265);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(263)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../css-loader/index.js!./keyword_in_context.css", function() {
				var newContent = require("!!./../../../../css-loader/index.js!./keyword_in_context.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(262)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\n  Component styles. For the moment these should all be\n  manually namespaced so as to not be global styles.\n*/\n", ""]);
	
	// exports


/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(267);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(263)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./d3cloud.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./d3cloud.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(262)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\n  Component styles\n*/\n\n.word-cloud-plot {\n  border: 1px dotted lightgray;\n  font-family: sans-serif;\n}\n\n.word-cloud-plot .title {\n  font-weight: bold;\n  text-decoration: underline;\n  text-align: center;\n  font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;\n}\n\n.word-cloud-plot .cloud .token {\n  display:inline-block;\n  margin:0.25em;\n  cursor: pointer;\n}\n\n.word-cloud-plot .cloud .token .token-term {\n\n}\n\n.word-cloud-plot .cloud .token .token-term .unique {\n  color:teal;\n  font-style: italic;\n}\n\n.word-cloud-plot .cloud .token .token-term .selected {\n  color:orange;\n  font-weight: bold;\n}\n\n.word-cloud-plot .cloud .token .token-score {\n  color: grey;\n  font-size: 75%;\n}\n", ""]);
	
	// exports


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(269);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(263)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./d3cloud.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./d3cloud.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(262)();
	// imports
	
	
	// module
	exports.push([module.id, ".keywords-in-context {\n  font-family: sans-serif;\n  font-size: 12px;\n  max-height:300px;\n  max-width: 500px;\n  overflow-y:auto;\n  margin-bottom:30px;\n  background-color: white;\n  padding: 20px;\n  border: 1px #eee;\n}\n", ""]);
	
	// exports


/***/ }
])
});
;
//# sourceMappingURL=d3cloud.js.map