(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./react/src/components/layout/App/App.jsx":
/*!*************************************************!*\
  !*** ./react/src/components/layout/App/App.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-loadable */ "./node_modules/react-loadable/lib/index.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _App_pcss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App.pcss */ "./react/src/components/layout/App/App.pcss");
/* harmony import */ var _App_pcss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_App_pcss__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) {if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _possibleConstructorReturn(self, call) {if (call && (_typeof(call) === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);} /* eslint-disable no-debugger, no-console */








// loading view
var LoadingComponent = function LoadingComponent(_ref) {var id = _ref.id;return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "Loading", id: "{id}" }, "Loading ", id, "...");};
LoadingComponent.propTypes = {
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string };


// Routes...
// TODO 2019.02.15, 03:34 -- Move route definitions to separated config using on both client and server?
var routesList = [
{
  id: 'Home',
  path: '/',
  loader: function loader() {return __webpack_require__.e(/*! import() | Home */ "Home").then(__webpack_require__.bind(null, /*! ../../pages/Home/Home */ "./react/src/components/pages/Home/Home.jsx"));} },

{
  id: 'About',
  path: '/About',
  loader: function loader() {return __webpack_require__.e(/*! import() | About */ "About").then(__webpack_require__.bind(null, /*! ../../pages/About/About */ "./react/src/components/pages/About/About.jsx"));} },

{
  id: 'Contacts',
  path: '/Contacts',
  loader: function loader() {return __webpack_require__.e(/*! import() | Contacts */ "Contacts").then(__webpack_require__.bind(null, /*! ../../pages/Contacts/Contacts */ "./react/src/components/pages/Contacts/Contacts.jsx"));} }];



var routes = routesList.map(function (_ref2) {var id = _ref2.id,path = _ref2.path,loader = _ref2.loader;
  // const chunkPath = getChunkPath(id);
  var loading = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](LoadingComponent, { id: id });
  var route = {
    id: id,
    path: path,
    content: react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
      loading: loading,
      loader: loader }) };


  console.log('App: route', id, ': ', route);
  return route;
});var

App = /*#__PURE__*/function (_React$Component) {_inherits(App, _React$Component);

  function App(props) {var _this;_classCallCheck(this, App);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      routes: routes };return _this;

  }

  // /** componentWillMount ** {{{
  //  */
  // componentWillMount() {
  //   console.log('App: componentWillMount');
  //   // debugger;
  // }/*}}}*/

  /** render ** {{{
   */_createClass(App, [{ key: "render", value: function render()
    {var
      mode = this.props.mode;var
      routes = this.state.routes;
      var routesMenu = [];
      var routesContent = [];
      routes.map(function (_ref3) {var id = _ref3.id,path = _ref3.path,content = _ref3.content;
        routesMenu.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], { className: "App-MenuItem", activeClassName: "active", key: id, to: path }, id));
        routesContent.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], { exact: true, path: path, key: id, component: content }));
      });
      return (
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "App", id: mode },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "App-Menu" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: "App-MenuLogo" }),
        routesMenu),

        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "App-Page" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], null,
        routesContent)),


        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "App-Info" }, "App mode: ",
        mode)));



    } /*}}}*/ }]);return App;}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



App.propTypes = {
  mode: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired };


/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./react/src/components/layout/App/App.pcss":
/*!**************************************************!*\
  !*** ./react/src/components/layout/App/App.pcss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=common-47d1c6d1.js.map