/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/docs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/css/app.scss":
/*!*****************************!*\
  !*** ./assets/css/app.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./assets/css/app.scss?");

/***/ }),

/***/ "./assets/img/logo.svg":
/*!*****************************!*\
  !*** ./assets/img/logo.svg ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<svg version=\\\"1.1\\\" viewBox=\\\"0 0 149 149\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" xmlns:xlink=\\\"http://www.w3.org/1999/xlink\\\"><defs><linearGradient id=\\\"linearGradient1476\\\"><stop style=\\\"stop-color:#bd4600\\\" offset=\\\"0\\\"></stop><stop style=\\\"stop-color:#bd4600;stop-opacity:0\\\" offset=\\\"1\\\"></stop></linearGradient><linearGradient id=\\\"linearGradient855\\\"><stop style=\\\"stop-color:#ff6007\\\" offset=\\\"0\\\"></stop><stop style=\\\"stop-color:#ff6007;stop-opacity:0\\\" offset=\\\"1\\\"></stop></linearGradient><linearGradient id=\\\"linearGradient827\\\" x1=\\\"58.3\\\" x2=\\\"198\\\" y1=\\\"111\\\" y2=\\\"255\\\" gradientTransform=\\\"translate(2.38 .234)\\\" gradientUnits=\\\"userSpaceOnUse\\\"><stop style=\\\"stop-color:#4d008f\\\" offset=\\\"0\\\"></stop><stop style=\\\"stop-color:#af52ff\\\" offset=\\\"1\\\"></stop></linearGradient><linearGradient id=\\\"linearGradient839\\\" x1=\\\"114\\\" x2=\\\"92.3\\\" y1=\\\"148\\\" y2=\\\"143\\\" gradientUnits=\\\"userSpaceOnUse\\\" xlink:href=\\\"#linearGradient855\\\"></linearGradient><linearGradient id=\\\"linearGradient857\\\" x1=\\\"130\\\" x2=\\\"117\\\" y1=\\\"181\\\" y2=\\\"169\\\" gradientUnits=\\\"userSpaceOnUse\\\" xlink:href=\\\"#linearGradient855\\\"></linearGradient><linearGradient id=\\\"linearGradient859\\\" x1=\\\"71.4\\\" x2=\\\"63.2\\\" y1=\\\"153\\\" y2=\\\"146\\\" gradientUnits=\\\"userSpaceOnUse\\\" xlink:href=\\\"#linearGradient855\\\"></linearGradient><linearGradient id=\\\"linearGradient861\\\" x1=\\\"125\\\" x2=\\\"117\\\" y1=\\\"121\\\" y2=\\\"113\\\" gradientUnits=\\\"userSpaceOnUse\\\" xlink:href=\\\"#linearGradient855\\\"></linearGradient><linearGradient id=\\\"linearGradient881\\\" x1=\\\"403\\\" x2=\\\"370\\\" y1=\\\"601\\\" y2=\\\"548\\\" gradientUnits=\\\"userSpaceOnUse\\\"><stop style=\\\"stop-color:#622400\\\" offset=\\\"0\\\"></stop><stop style=\\\"stop-color:#622400;stop-opacity:0\\\" offset=\\\"1\\\"></stop></linearGradient><filter id=\\\"filter885\\\" style=\\\"color-interpolation-filters:sRGB\\\"><feGaussianBlur result=\\\"blur\\\" stdDeviation=\\\"2 2\\\"></feGaussianBlur></filter><linearGradient id=\\\"linearGradient1478\\\" x1=\\\"121\\\" x2=\\\"100\\\" y1=\\\"178\\\" y2=\\\"174\\\" gradientTransform=\\\"matrix(3.65 -.973 .973 3.65 -155 141)\\\" gradientUnits=\\\"userSpaceOnUse\\\" xlink:href=\\\"#linearGradient1476\\\"></linearGradient><filter id=\\\"filter1916\\\" x=\\\"-.018\\\" y=\\\"-.0492\\\" width=\\\"1.04\\\" height=\\\"1.1\\\" style=\\\"color-interpolation-filters:sRGB\\\"><feGaussianBlur stdDeviation=\\\"0.76574606\\\"></feGaussianBlur></filter><filter id=\\\"filter1990\\\" x=\\\"-.302\\\" y=\\\"-.302\\\" width=\\\"1.6\\\" height=\\\"1.6\\\" style=\\\"color-interpolation-filters:sRGB\\\"><feGaussianBlur stdDeviation=\\\"2.8961321\\\"></feGaussianBlur></filter><filter id=\\\"filter2412\\\" x=\\\"-.536\\\" y=\\\"-.536\\\" width=\\\"2.07\\\" height=\\\"2.07\\\" style=\\\"color-interpolation-filters:sRGB\\\"><feGaussianBlur stdDeviation=\\\"2.2386584\\\"></feGaussianBlur></filter><linearGradient id=\\\"linearGradient2418\\\" x1=\\\"119\\\" x2=\\\"117\\\" y1=\\\"171\\\" y2=\\\"182\\\" gradientTransform=\\\"matrix(3.65 -.973 .973 3.65 -155 141)\\\" gradientUnits=\\\"userSpaceOnUse\\\" xlink:href=\\\"#linearGradient1476\\\"></linearGradient><linearGradient id=\\\"linearGradient860\\\" x1=\\\"121\\\" x2=\\\"96.4\\\" y1=\\\"178\\\" y2=\\\"174\\\" gradientTransform=\\\"matrix(3.65 -.973 .973 3.65 -155 141)\\\" gradientUnits=\\\"userSpaceOnUse\\\" xlink:href=\\\"#linearGradient1476\\\"></linearGradient><filter id=\\\"filter1852\\\" x=\\\"-.623\\\" y=\\\"-.623\\\" width=\\\"2.25\\\" height=\\\"2.25\\\" style=\\\"color-interpolation-filters:sRGB\\\"><feGaussianBlur stdDeviation=\\\"2.5992477\\\"></feGaussianBlur></filter><filter id=\\\"filter2307\\\" x=\\\"-.742\\\" y=\\\"-.742\\\" width=\\\"2.48\\\" height=\\\"2.48\\\" style=\\\"color-interpolation-filters:sRGB\\\"><feGaussianBlur stdDeviation=\\\"3.095058\\\"></feGaussianBlur></filter></defs><g transform=\\\"translate(-30.7 -74.2)\\\"><path d=\\\"m179 148a74.3 74.3 0 0 1-74.2 74.3 74.3 74.3 0 0 1-74.3-74.2 74.3 74.3 0 0 1 74.1-74.4 74.3 74.3 0 0 1 74.4 74.1\\\" style=\\\"fill:url(#linearGradient827)\\\"></path><g transform=\\\"matrix(1.29 0 0 1.29 -26.4 -41.6)\\\"><path d=\\\"m114 148a11.5 11.5 0 0 1-11.5 11.5 11.5 11.5 0 0 1-11.5-11.5 11.5 11.5 0 0 1 11.5-11.5 11.5 11.5 0 0 1 11.5 11.5\\\" style=\\\"fill:url(#linearGradient839)\\\"></path><path transform=\\\"matrix(.265 0 0 .265 .0459 1.01)\\\" d=\\\"m360 527a43.4 43.4 0 0 0-15.7 33.4 43.4 43.4 0 0 0 43.5 43.4 43.4 43.4 0 0 0 33.4-15.7z\\\" style=\\\"fill:url(#linearGradient881);filter:url(#filter885);opacity:.55\\\"></path><path d=\\\"m114 148a11.5 11.5 0 0 1-11.5 11.5 11.5 11.5 0 0 1-11.5-11.5 11.5 11.5 0 0 1 11.5-11.5 11.5 11.5 0 0 1 11.5 11.5\\\" style=\\\"fill:url(#linearGradient839);filter:url(#filter1990)\\\"></path><path d=\\\"m130 176a5.01 5.01 0 0 1-5.01 5.01 5.01 5.01 0 0 1-5.01-5 5.01 5.01 0 0 1 5-5.01 5.01 5.01 0 0 1 5.02 5\\\" style=\\\"fill:url(#linearGradient857)\\\"></path><path d=\\\"m130 176a5.01 5.01 0 0 1-5.01 5.01 5.01 5.01 0 0 1-5.01-5 5.01 5.01 0 0 1 5-5.01 5.01 5.01 0 0 1 5.02 5\\\" style=\\\"fill:url(#linearGradient857)\\\"></path><path transform=\\\"matrix(.265 0 0 .265 .529 -.529)\\\" d=\\\"m456 658s-12.2 15-26.4 17.3c-14.9 2.35-59.5 13.8-59.5 13.8s44.7 7.01 59.4 6.15c14.5-0.844 42.5-9.65 42.5-9.65l-0.0137-0.0234a18.9 18.9 0 0 1-18.1-18.9 18.9 18.9 0 0 1 2.13-8.71z\\\" style=\\\"fill:url(#linearGradient1478);filter:url(#filter1916);opacity:.643\\\"></path><path d=\\\"m130 176a5.01 5.01 0 0 1-5.01 5.01 5.01 5.01 0 0 1-5.01-5 5.01 5.01 0 0 1 5-5.01 5.01 5.01 0 0 1 5.02 5\\\" style=\\\"fill:url(#linearGradient857);filter:url(#filter2412)\\\"></path><path d=\\\"m71.4 148a5.01 5.01 0 0 1-5.01 5.01 5.01 5.01 0 0 1-5.01-5 5.01 5.01 0 0 1 5-5.01 5.01 5.01 0 0 1 5.02 5\\\" style=\\\"fill:url(#linearGradient859)\\\"></path><path transform=\\\"matrix(-.184 .19 -.19 -.184 280 180)\\\" d=\\\"m456 658s-12.2 15-26.4 17.3c-14.9 2.35-59.5 13.8-59.5 13.8s44.7 7.01 59.4 6.15c14.5-0.844 42.5-9.65 42.5-9.65l-0.0137-0.0234a18.9 18.9 0 0 1-18.1-18.9 18.9 18.9 0 0 1 2.13-8.71z\\\" style=\\\"fill:url(#linearGradient2418);filter:url(#filter1916);opacity:.643\\\"></path><path d=\\\"m71.4 148a5.01 5.01 0 0 1-5.01 5.01 5.01 5.01 0 0 1-5.01-5 5.01 5.01 0 0 1 5-5.01 5.01 5.01 0 0 1 5.02 5\\\" style=\\\"fill:url(#linearGradient859);filter:url(#filter1852)\\\"></path><path d=\\\"m125 116a5.01 5.01 0 0 1-5.01 5.01 5.01 5.01 0 0 1-5.01-5 5.01 5.01 0 0 1 5-5.01 5.01 5.01 0 0 1 5.02 5\\\" style=\\\"fill:url(#linearGradient861)\\\"></path><path transform=\\\"matrix(-.132 -.229 .229 -.132 29.8 313)\\\" d=\\\"m456 658s-12.2 15-26.4 17.3c-14.9 2.35-59.5 13.8-59.5 13.8s44.7 7.01 59.4 6.15c14.5-0.844 42.5-9.65 42.5-9.65l-0.0137-0.0234a18.9 18.9 0 0 1-18.1-18.9 18.9 18.9 0 0 1 2.13-8.71z\\\" style=\\\"fill:url(#linearGradient860);filter:url(#filter1916);opacity:.643\\\"></path><path d=\\\"m125 116a5.01 5.01 0 0 1-5.01 5.01 5.01 5.01 0 0 1-5.01-5 5.01 5.01 0 0 1 5-5.01 5.01 5.01 0 0 1 5.02 5\\\" style=\\\"fill:url(#linearGradient861);filter:url(#filter2307)\\\"></path></g></g></svg>\"\n\n//# sourceURL=webpack:///./assets/img/logo.svg?");

/***/ }),

/***/ "./src/category.js":
/*!*************************!*\
  !*** ./src/category.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Category; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Category =\n/*#__PURE__*/\nfunction () {\n  function Category(name) {\n    _classCallCheck(this, Category);\n\n    this.name = name;\n    this.sources = [];\n  }\n\n  _createClass(Category, [{\n    key: \"addSource\",\n    value: function addSource(source) {\n      this.sources.push(source);\n    }\n  }, {\n    key: \"sources\",\n    value: function sources() {\n      return this.sources;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return \"\\n\\t\\t\\t<li>\".concat(this.name, \"</li>\\n\\t\\t\");\n    }\n  }, {\n    key: \"name\",\n    set: function set(name) {\n      this._name = name;\n    },\n    get: function get() {\n      return this._name;\n    }\n  }], [{\n    key: \"render\",\n    value: function render(categories) {\n      var fragment = [];\n      categories.forEach(function (category) {\n        return fragment.push(category.render());\n      });\n      var $categories = document.querySelector('.categories');\n      $categories.innerHTML = \"<ul>\".concat(fragment.join(''), \"</ul>\");\n    }\n  }]);\n\n  return Category;\n}();\n\n\n\n//# sourceURL=webpack:///./src/category.js?");

/***/ }),

/***/ "./src/components/sidebar.js":
/*!***********************************!*\
  !*** ./src/components/sidebar.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Sidebar; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Sidebar =\n/*#__PURE__*/\nfunction () {\n  function Sidebar() {\n    _classCallCheck(this, Sidebar);\n\n    this.opened = false;\n    this.el = document.querySelector('.sidebar');\n    this.btn = document.querySelector('.logo');\n    this.toolbar = document.querySelector('.toolbar');\n  }\n\n  _createClass(Sidebar, [{\n    key: \"toggle\",\n    value: function toggle() {\n      this.el.classList.toggle('opened');\n      this.btn.classList.toggle('fixed');\n      this.toolbar.classList.toggle('opened');\n      this.opened = !this.opened;\n    }\n  }], [{\n    key: \"listen\",\n    value: function listen() {\n      var sidebar = new Sidebar();\n      sidebar.btn.addEventListener('click', sidebar.toggle.bind(sidebar));\n    }\n  }]);\n\n  return Sidebar;\n}();\n\n\n\n//# sourceURL=webpack:///./src/components/sidebar.js?");

/***/ }),

/***/ "./src/database.js":
/*!*************************!*\
  !*** ./src/database.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Database; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Database =\n/*#__PURE__*/\nfunction () {\n  function Database(repository) {\n    _classCallCheck(this, Database);\n\n    this.repository = repository;\n  }\n\n  _createClass(Database, [{\n    key: \"category\",\n    value: function category(name) {\n      return this.repository.categories.find(name);\n    }\n  }, {\n    key: \"posts\",\n    get: function get() {\n      return this.repository.posts;\n    }\n  }, {\n    key: \"categories\",\n    get: function get() {\n      return this.repository.categories;\n    }\n  }, {\n    key: \"sources\",\n    get: function get() {\n      return this.repository.sources;\n    }\n  }]);\n\n  return Database;\n}();\n\n\n\n//# sourceURL=webpack:///./src/database.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/css/app.scss */ \"./assets/css/app.scss\");\n/* harmony import */ var _assets_css_app_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_app_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_img_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/img/logo.svg */ \"./assets/img/logo.svg\");\n/* harmony import */ var _assets_img_logo_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_img_logo_svg__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _repository_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./repository.js */ \"./src/repository.js\");\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./database */ \"./src/database.js\");\n/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./post */ \"./src/post.js\");\n/* harmony import */ var _components_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/sidebar */ \"./src/components/sidebar.js\");\n/* harmony import */ var _category__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./category */ \"./src/category.js\");\n\n // database\n\n\n\n\n\n\nvar db = new _database__WEBPACK_IMPORTED_MODULE_3__[\"default\"](_repository_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]); //eslint-disable-next-line no-console\n\n_post__WEBPACK_IMPORTED_MODULE_4__[\"default\"].render(db.posts);\n_category__WEBPACK_IMPORTED_MODULE_6__[\"default\"].render(db.categories); // we'll split this later\n\n_components_sidebar__WEBPACK_IMPORTED_MODULE_5__[\"default\"].listen();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/post.js":
/*!*********************!*\
  !*** ./src/post.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Post; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Post =\n/*#__PURE__*/\nfunction () {\n  function Post(title) {\n    _classCallCheck(this, Post);\n\n    this.title = title;\n  }\n\n  _createClass(Post, [{\n    key: \"loadImage\",\n    value: function loadImage() {\n      var image = new Image();\n      image.src = this.image;\n      return image;\n    }\n  }, {\n    key: \"getImageSize\",\n    value: function getImageSize() {\n      // Load image\n      var image = this.loadImage();\n      return {\n        w: image.naturalWidth,\n        h: image.naturalHeight\n      };\n    }\n  }, {\n    key: \"getPostSize\",\n    value: function getPostSize() {\n      var imageSize = this.getImageSize();\n      var ratio = +(imageSize.w / imageSize.h).toFixed(2);\n      return ratio < 1 ? 'long' : '';\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return \"\\n\\t\\t\\t<article class=\\\"post \".concat(this.getPostSize(), \"\\\">\\n\\t\\t\\t\\t<img class=\\\"post__img\\\" src=\\\"\").concat(this.image, \"\\\" alt=\\\"Article featured image\\\">\\n\\t\\t\\t\\t<div class=\\\"post__content\\\">\\n\\t\\t\\t\\t\\t<h2 class=\\\"post__title\\\">\").concat(this.title, \"</h2>\\n\\t\\t\\t\\t\\t<p class=\\\"post__source\\\">\").concat(this.source.title, \"</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</article>\\n\\t\\t\");\n    }\n  }, {\n    key: \"title\",\n    set: function set(title) {\n      this._title = title;\n    },\n    get: function get() {\n      return this._title;\n    }\n  }, {\n    key: \"content\",\n    set: function set(content) {\n      this._content = content;\n    },\n    get: function get() {\n      return this._content;\n    }\n  }, {\n    key: \"source\",\n    set: function set(source) {\n      this._source = source;\n    },\n    get: function get() {\n      return this._source;\n    }\n  }, {\n    key: \"image\",\n    set: function set(image) {\n      this._image = image;\n    },\n    get: function get() {\n      return this._image;\n    }\n  }], [{\n    key: \"render\",\n    value: function render(posts) {\n      var fragment = [];\n      posts.forEach(function (post) {\n        return fragment.push(post.render());\n      });\n      var $posts = document.querySelector('.posts');\n      $posts.innerHTML = fragment.join('');\n    }\n  }]);\n\n  return Post;\n}();\n\n\n\n//# sourceURL=webpack:///./src/post.js?");

/***/ }),

/***/ "./src/repository.js":
/*!***************************!*\
  !*** ./src/repository.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post */ \"./src/post.js\");\n/* harmony import */ var _category__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./category */ \"./src/category.js\");\n/* harmony import */ var _source__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./source */ \"./src/source.js\");\n\n\n\nvar source1 = new _source__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('https://lifehacker.com/');\nsource1.title = 'Life Hacker';\nvar post1 = new _post__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('How to Stretch If You Hate Stretching');\npost1.content = 'Luckily for me, I don’t find physical activity to be a chore. I genuinely enjoy biking, running and playing soccer, and do all of those things on the regular. But when it comes to stretching—well, I just hate it! My mantra is basically, “I’ll stretch when I’m dead.” The appealing part of playing sports and working out…';\npost1.source = source1;\npost1.image = 'https://i.kinja-img.com/gawker-media/image/upload/s--acGKjLiq--/c_scale,f_auto,fl_progressive,q_80,w_800/qxfzgh10cm4bjnelmoii.jpg';\nvar category1 = new _category__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Exercise');\ncategory1.addSource(source1);\nvar source2 = new _source__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('https://theboringcompany.com/');\nsource2.title = 'The Boring Company';\nvar post2 = new _post__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('This is a sample title');\npost2.content = 'Luckily for me, I don’t find physical activity to be a chore. I genuinely enjoy biking, running and playing soccer, and do all of those things on the regular. But when it comes to stretching—well, I just hate it! My mantra is basically, “I’ll stretch when I’m dead.” The appealing part of playing sports and working out…';\npost2.source = source2;\npost2.image = 'http://1.bp.blogspot.com/-hNC-oT6f-fY/TeXxO26yjvI/AAAAAAAAAOY/qfkOqdKkBi8/s1600/platon-photographer-putin-man-of-the-year-portrait.jpg';\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  posts: [post1, post2, post1, post1, post2, post1, post1, post1, post1],\n  categories: [category1],\n  sources: [source1, source2]\n});\n\n//# sourceURL=webpack:///./src/repository.js?");

/***/ }),

/***/ "./src/source.js":
/*!***********************!*\
  !*** ./src/source.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Source; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Source =\n/*#__PURE__*/\nfunction () {\n  function Source(url) {\n    _classCallCheck(this, Source);\n\n    this.url = url;\n  }\n\n  _createClass(Source, [{\n    key: \"url\",\n    set: function set(url) {\n      this._url = url;\n    },\n    get: function get() {\n      return this._url;\n    }\n  }, {\n    key: \"title\",\n    set: function set(title) {\n      this._title = title;\n    },\n    get: function get() {\n      return this._title;\n    }\n  }]);\n\n  return Source;\n}();\n\n\n\n//# sourceURL=webpack:///./src/source.js?");

/***/ })

/******/ });