"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.AnimatedDot = void 0;
var react_1 = require("react");
require("./AnimatedDot.css");
var styled_components_1 = require("styled-components");
// interface AnimationStyle {
//     animationName : string;
//     animationBase: number;
//     animationPlay: string;
// }
function random(input) {
    return Math.round(Math.random() * input);
}
// const move = css`
//    @keyframe 0% { 
//       transform: translate3d(0, 0, 1px) rotate(0deg); 
//     }
//     100% {
//       transform: translate3d(0, 0, 1px) rotate(360deg);
//     }
//       `
// const move = keyframes`
//     move 0% { 
//       transform: translate3d(0, 0, 1px) rotate(0deg); 
//     }
//     100% {
//       transform: translate3d(0, 0, 1px) rotate(360deg);
//     }
//       `
// const animationRules = css<AnimationStyle>`${props => `${props.animationName} ${props.animationBase * 1 + 10}s linear ${props.animationBase * -1}s infinite ${props.animationPlay};`}`
//animation shorthand: name, *duration, *timing func, *delay, *iteration count, direction, fill mode, *play state
// animation: ${props.animationName} ${props.animationBase * 1 + 10}s linear ${props.animationBase * -1}s infinite ${props.animationPlay};
// animation: ${props.animationName === 'move' ? animationRules : ''};
var Span = styled_components_1["default"]("span")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      ", "\n        "], ["\n      ",
    "\n        "])), function (props) { return "\n      animation: " + props.animationName + " " + (props.animationBase * 1 + 10) + "s linear " + props.animationBase * -1 + "s infinite " + props.animationPlay + ";\n        width: " + props.particleSize + ";\n        height: " + props.particleSize + ";\n        border-radius: " + props.particleSize + ";\n \n        left: " + (props.dotPos.x - props.particleNumber) + "px;\n        top: " + (props.dotPos.y - props.particleNumber) + "px;\n        transform-origin: " + props.originPos.x + "vw " + props.originPos.y + "vh;\n        transform: translate(-50%, -50%);\n        position: absolute;\n        backface-visibility: hidden;\n        filter: blur(" + props.blur + ");\n        color: " + props.color + ";\n        opacity: .5;\n        box-shadow: inset 0 0 " + props.particleNumber / 2 + "vmin 5px " + props.color + ", 0 0 " + props.particleNumber + "vmin 5px " + props.color + "     \n        "; });
exports.AnimatedDot = function (_a) {
    var newCoords = _a.newCoords, defaultAnimation = _a.defaultAnimation, particleSize = _a.particleSize, colors = _a.colors, duration = _a.duration;
    var _b = react_1.useState({ x: undefined, y: undefined }), dotPos = _b[0], setDotPos = _b[1];
    var _c = react_1.useState('running'), animationPlay = _c[0], setAnimationPlay = _c[1];
    var _d = react_1.useState('move'), animationName = _d[0], setAnimationName = _d[1];
    var _e = react_1.useState({ x: undefined, y: undefined }), originPos = _e[0], setOriginPos = _e[1];
    var _f = react_1.useState(), color = _f[0], setColor = _f[1];
    var _g = react_1.useState(), animationBase = _g[0], setAnimationBase = _g[1];
    var _h = react_1.useState(), blurRadius = _h[0], setBlurRadius = _h[1];
    // const randomStart = `${Math.round(Math.random() * 100)}%`
    // const origin = Math.round(Math.random() * 50) - 25
    var particleNumber = typeof particleSize === 'string' ? Number(particleSize.match(/\d+/)) : particleSize;
    /*
    need to convert x/y px to vh/vw since that's what the origin point of animation is.
    */
    var handleMouseDown = function () {
        setAnimationPlay('paused');
        setAnimationName(animationName === 'none' ? 'move' : 'none');
    };
    var handleMouseUp = function () {
        setAnimationPlay('running');
        setAnimationName('move');
    };
    react_1.useEffect(function () {
        setDotPos({ x: Math.round(Math.random() * window.innerWidth), y: Math.round(Math.random() * window.innerHeight) });
        setOriginPos({ x: Math.round(Math.random() * 50) - 25, y: Math.round(Math.random() * 50) - 25 });
        setColor(colors[Math.round(Math.random() * colors.length)]);
        setAnimationBase((random(duration * 10) / 10));
        setBlurRadius((random(10) + .5) * particleNumber * .3);
    }, []);
    react_1.useEffect(function () {
        if (animationPlay === 'paused') {
            setDotPos(newCoords);
        }
    }, [newCoords]);
    react_1.useEffect(function () {
        setAnimationPlay(defaultAnimation === null || defaultAnimation === void 0 ? void 0 : defaultAnimation.animationState);
    }, [defaultAnimation]);
    return (react_1["default"].createElement(Span, { onMouseDown: function () { return handleMouseDown(); }, onMouseUp: function () { return handleMouseUp(); }, particleSize: particleSize, particleNumber: particleNumber, animationPlay: animationPlay, animationName: animationName, duration: duration, color: color, dotPos: dotPos, originPos: originPos, animationBase: animationBase, blur: blurRadius })
    // <span className='dot'
    //     style={{
    //         width: particleSize,
    //         height: particleSize,
    //         borderRadius: particleSize,
    //         animationPlayState: animationPlay,
    //         animationName: animationName,
    //         left: dotPos.x && dotPos.x as number - particleNumber,
    //         top: dotPos.y && dotPos.y as number - particleNumber,
    //         transformOrigin: `${originPos.x}vw ${originPos.y}vh`,
    //         transform: `translate(-50%, -50%)`,
    //         position: 'absolute',
    //         backfaceVisibility: `hidden`,
    //         animationTimingFunction: `linear`,
    //         animationIterationCount: `infinite`,
    //         animationDuration: `${animationBase as number * 1 + 10}s`,
    //         animationDelay: `${animationBase as number * -1}s`,
    //         filter: `blur${blurRadius}`,
    //         color: color,
    //         opacity: .5,
    //         boxShadow: `inset 0 0 ${particleNumber / 2}vmin 5px ${color}, 0 0 ${particleNumber}vmin 5px ${color}`
    //     }}
    //     onMouseDown={() => handleMouseDown()}
    //     onMouseUp={() => handleMouseUp()} />
    );
};
var templateObject_1;
