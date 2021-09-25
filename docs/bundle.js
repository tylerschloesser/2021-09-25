/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function() {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nfunction drawCircle(_a, c, r) {\n    var context = _a.context;\n    context.beginPath();\n    context.arc(c[0], c[1], r, 0, 2 * Math.PI);\n    context.fill();\n}\nfunction blink(viewport, state, timestamp) {\n    var dt = timestamp % 2000;\n    if (dt > 1000) {\n        return;\n    }\n    var scale = dt / 1000;\n    viewport.context.fillStyle = \"rgba(255,255,255,\" + (1 - scale) * .4 + \")\";\n    drawCircle(viewport, [0, 0], 10 + 10 * scale);\n}\nfunction draw(viewport, state, timestamp) {\n    var context = viewport.context, w = viewport.w, h = viewport.h;\n    context.clearRect(0, 0, w, h);\n    context.fillStyle = '#333';\n    context.fillRect(0, 0, w, h);\n    context.strokeStyle = 'white';\n    context.beginPath();\n    context.translate(state.p[0] % (w / 10) * -1, state.p[1] % (h / 10) * -1);\n    for (var i = -1; i <= 11; i++) {\n        context.moveTo(-w / 10, i * (h / 10));\n        context.lineTo(w + w / 10, i * (h / 10));\n        context.moveTo(i * (w / 10), -h / 10);\n        context.lineTo(i * (w / 10), h + h / 10);\n    }\n    context.stroke();\n    context.resetTransform();\n    context.translate(w / 2, h / 2);\n    blink(viewport, state, timestamp);\n    context.fillStyle = 'white';\n    drawCircle(viewport, [0, 0], 10);\n    context.resetTransform();\n    context.font = '10px monospace';\n    context.textBaseline = 'top';\n    context.fillText(\"[\" + state.p[0].toFixed(2) + \", \" + state.p[1].toFixed(2) + \"]\", 0, 0);\n}\nfunction main() {\n    return __awaiter(this, void 0, void 0, function () {\n        var canvas, context, w, h, state, viewport, last, game;\n        return __generator(this, function (_a) {\n            canvas = document.querySelector('canvas');\n            context = canvas.getContext('2d');\n            w = canvas.width;\n            h = canvas.height;\n            console.log({ w: w, h: h });\n            state = {\n                p: [0, 0],\n                v: [10, 5],\n            };\n            viewport = { context: context, w: w, h: h };\n            last = performance.now();\n            // document.addEventListener('touchstart', e => {\n            //   console.log(e)\n            // })\n            document.addEventListener('wheel', function (e) {\n                e.preventDefault();\n                console.log(e.deltaX, e.deltaY);\n                state = __assign(__assign({}, state), { v: [\n                        state.v[0] + e.deltaX / 10,\n                        state.v[1] + e.deltaY / 10,\n                    ] });\n            }, { passive: false });\n            game = function (timestamp) {\n                var elapsed = timestamp - last;\n                last = timestamp;\n                state = __assign(__assign({}, state), { p: [\n                        state.p[0] + state.v[0] * (elapsed / 1000),\n                        state.p[1] + state.v[1] * (elapsed / 1000),\n                    ] });\n                draw(viewport, state, timestamp);\n                window.requestAnimationFrame(game);\n            };\n            window.requestAnimationFrame(game);\n            return [2 /*return*/];\n        });\n    });\n}\nmain();\n\n\n//# sourceURL=webpack://2021-09-25/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;