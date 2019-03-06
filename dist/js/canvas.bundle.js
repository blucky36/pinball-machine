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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gravity = 1;
var floorFriction = .95;

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = innerWidth * .5;
canvas.height = innerHeight * .9;

var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function () {
  // canvas.width = innerWidth * .5
  // canvas.height = innerHeight * .9
  init();
});

// Objects an' things
function PinBall(x, y, velocityY, radius, color) {
  var velocityX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  //constructor
  this.x = x;
  this.y = y;
  this.velocityY = velocityY;
  this.velocityX = velocityX;
  this.radius = radius;
  this.color = color;
}

PinBall.prototype.draw = function () {
  //draws ball to canvas
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  context.fillStyle = this.color;
  context.fill();
  context.closePath();
};

PinBall.prototype.update = function () {
  //determines what happens to the ball
  if (this.y + this.radius + 10 > canvas.height) {
    this.velocityY = -this.velocityY * floorFriction;
    this.velocityX = this.velocityX * floorFriction;
  } else this.velocityY += gravity;
  if (this.velocityY === -0 || this.velocityY.toString().split("").includes("e")) {
    this.velocityY = 0;
    this.ready = true;
    this.moving = false;
  }
  if (this.x + this.radius + 10 > canvas.width) this.velocityX = -this.velocityX;
  if (this.x + this.radius + 10 < 50) this.velocityX = -this.velocityX * .95;

  this.y += this.velocityY;
  this.x += this.velocityX;
  // console.log(this.velocityY)
  // console.log(this.velocityX)
  this.draw();
};

var Wall = function () {
  function Wall(x, y, color, width, height) {
    _classCallCheck(this, Wall);

    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  _createClass(Wall, [{
    key: "draw",
    value: function draw() {
      context.beginPath();
      context.lineWidth = "3";
      context.strokeStyle = this.color;
      context.rect(this.x, this.y, this.width, this.height);
      context.stroke();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
    }
  }]);

  return Wall;
}();

var PaddleLeft = function () {
  function PaddleLeft(color, width, height) {
    _classCallCheck(this, PaddleLeft);

    this.moveX = 80; //bottom right x
    this.moveY = canvas.height - 100; //bottom right y
    this.line1x = 80; //top right x
    this.line1y = canvas.height - 120; //top right y
    this.line2x = 115; //
    this.line2y = canvas.height - 80;
    this.line3x = 100;
    this.line3y = canvas.height - 80;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  _createClass(PaddleLeft, [{
    key: "draw",
    value: function draw() {
      context.beginPath();
      context.lineWidth = "3";
      context.moveTo(this.moveX, this.moveY);
      context.lineTo(this.line1x, this.line1y);
      context.lineTo(this.line2x, this.line2y);
      context.lineTo(this.line3x, this.line3y);
      context.closePath();
      context.stroke();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
    }
  }]);

  return PaddleLeft;
}();

var PaddleRight = function () {
  function PaddleRight(moveX, moveY, lr, color, width, height) {
    _classCallCheck(this, PaddleRight);

    this.moveX = canvas.width - 125; //bottom right x
    this.moveY = canvas.height - 65; //bottom right y
    this.line1x = canvas.width - 125; //top right x
    this.line1y = canvas.height - 45; //top right y
    this.line2x = canvas.width - 50; //
    this.line2y = canvas.height - 125;
    this.line3x = canvas.width - 70;
    this.line3y = canvas.height - 125;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  _createClass(PaddleRight, [{
    key: "draw",
    value: function draw() {
      context.beginPath();
      context.lineWidth = "3";
      context.moveTo(this.moveX, this.moveY);
      context.lineTo(this.line1x, this.line1y);
      context.lineTo(this.line2x, this.line2y);
      context.lineTo(this.line3x, this.line3y);
      context.closePath();
      context.stroke();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
    }
  }]);

  return PaddleRight;
}();

// Implementation


var ball = void 0,
    paddleLeft = void 0,
    paddleRight = void 0,
    startWall = void 0; //vars
function init() {

  startWall = new Wall(canvas.width - 50, //starting x
  50, //starting y
  "black", //color
  10, //width
  canvas.height - 50 //height
  );

  paddleRight = new PaddleRight(canvas.width / 1.8, // start x
  canvas.height / 1.1, // start y
  "right", //side of paddle
  "black", //color
  100, //width
  10 //height
  );

  paddleLeft = new PaddleLeft(canvas.width / 4, //
  canvas.height / 1.1, //
  "left", //side of paddle
  "black", //color
  100, //width
  10 //height
  );

  ball = new PinBall(canvas.width - 20, //location x
  canvas.height - 20, //location y
  0, //initial velocity
  4, //width
  "black" //color
  );
}

var charCode = void 0;
document.onkeydown = function (e) {
  //usefull for movement based games but will need to refactor for paddles
  charCode = e.keyCode;
  console.log(charCode, e.code);
  if (charCode === 38 || charCode === 87) {
    //up
    ball.velocityY += 10;
  }
  // if(charCode === 115){//down
  //   ball.velocityY -= 10
  // }
  if (charCode === 37 || charCode === 65) {
    //left
    ball.velocityX -= 10;
  }
  if (charCode === 39 || charCode === 68) {
    //right
    ball.velocityX += 10;
  }
};
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  ball.update();
  startWall.update();
  paddleRight.update();
  paddleLeft.update();
  // context.fillText("GolfWorld", mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map