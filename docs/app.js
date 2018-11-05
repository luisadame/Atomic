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

/***/ "./src/category.js":
/*!*************************!*\
  !*** ./src/category.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Category; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Category =\n/*#__PURE__*/\nfunction () {\n  function Category(name) {\n    _classCallCheck(this, Category);\n\n    this.name = name;\n    this.sources = [];\n  }\n\n  _createClass(Category, [{\n    key: \"addSource\",\n    value: function addSource(source) {\n      this.sources.push(source);\n    }\n  }, {\n    key: \"sources\",\n    value: function sources() {\n      return this.sources;\n    }\n  }, {\n    key: \"title\",\n    set: function set(title) {\n      this._title = title;\n    },\n    get: function get() {\n      return this._title;\n    }\n  }]);\n\n  return Category;\n}();\n\n\n\n//# sourceURL=webpack:///./src/category.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/css/app.scss */ \"./assets/css/app.scss\");\n/* harmony import */ var _assets_css_app_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_app_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _repository_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./repository.js */ \"./src/repository.js\");\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./database */ \"./src/database.js\");\n/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./post */ \"./src/post.js\");\n // database\n\n\n\n\nvar db = new _database__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_repository_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]); //eslint-disable-next-line no-console\n\n_post__WEBPACK_IMPORTED_MODULE_3__[\"default\"].render(db.posts);\n\n//# sourceURL=webpack:///./src/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post */ \"./src/post.js\");\n/* harmony import */ var _category__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./category */ \"./src/category.js\");\n/* harmony import */ var _source__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./source */ \"./src/source.js\");\n\n\n\nvar source1 = new _source__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('https://lifehacker.com/');\nsource1.title = 'Life Hacker';\nvar post1 = new _post__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('How to Stretch If You Hate Stretching');\npost1.content = 'Luckily for me, I don’t find physical activity to be a chore. I genuinely enjoy biking, running and playing soccer, and do all of those things on the regular. But when it comes to stretching—well, I just hate it! My mantra is basically, “I’ll stretch when I’m dead.” The appealing part of playing sports and working out…';\npost1.source = source1;\npost1.image = 'https://i.kinja-img.com/gawker-media/image/upload/s--acGKjLiq--/c_scale,f_auto,fl_progressive,q_80,w_800/qxfzgh10cm4bjnelmoii.jpg';\nvar category1 = new _category__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Exercise');\ncategory1.addSource(source1);\nvar source2 = new _source__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('https://theboringcompany.com/');\nsource2.title = 'The Boring Company';\nvar post2 = new _post__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('This is a sample title');\npost2.content = 'Luckily for me, I don’t find physical activity to be a chore. I genuinely enjoy biking, running and playing soccer, and do all of those things on the regular. But when it comes to stretching—well, I just hate it! My mantra is basically, “I’ll stretch when I’m dead.” The appealing part of playing sports and working out…';\npost2.source = source2;\npost2.image = 'http://1.bp.blogspot.com/-hNC-oT6f-fY/TeXxO26yjvI/AAAAAAAAAOY/qfkOqdKkBi8/s1600/platon-photographer-putin-man-of-the-year-portrait.jpg';\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  posts: [post1, post2],\n  categories: [category1],\n  sources: [source1, source2]\n});\n\n//# sourceURL=webpack:///./src/repository.js?");

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