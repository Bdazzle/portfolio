"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Contact = void 0;
var react_1 = require("react");
var react_location_1 = require("react-location");
var PortfolioContext_1 = require("./PortfolioContext");
var emailjs_com_1 = require("emailjs-com");
var inputInactiveStyle = {
    border: 'none',
    borderBottom: '2px solid grey',
    paddingTop: 10,
    padding: 0,
    width: '33vw'
};
var inputActiveStyle = {
    border: 'none',
    borderBottom: '1px solid transparent',
    paddingTop: 10,
    padding: 0,
    width: '33vw'
};
var activeInputSpan = {
    position: 'relative',
    display: 'block',
    // width: '33vw',
    width: '100%',
    height: 1,
    bottom: 0,
    left: 0,
    backgroundColor: '#b55b67',
    transform: "scaleX(1)",
    transition: "transform 0.3s ease",
    zIndex: 2
};
var inactiveInputSpan = {
    height: 1,
    bottom: 2,
    backgroundColor: 'transparent',
    transform: "scaleX(0)",
    transition: "transform 0.3s ease"
};
exports.Contact = function () {
    var _a = react_1.useState(), activeField = _a[0], setActiveField = _a[1];
    var formRef = react_1.useRef(null);
    // const [contactInfo, setContactInfo] = useState<FormData>({
    //     first: '',
    //     last: '',
    //     email: '',
    //     compname: undefined,
    //     message: ''
    // })
    var _b = react_1.useState({
        "Name": '',
        // "Last Name": '',
        "Email": '',
        "Company": undefined,
        "Message": ''
    }), contactInfo = _b[0], setContactInfo = _b[1];
    var setCurrentPathname = react_1.useContext(PortfolioContext_1.PortfolioContext).setCurrentPathname;
    var pathName = react_location_1.useMatch();
    react_1.useEffect(function () {
        setCurrentPathname(pathName.id);
    }, []);
    var handleMouseOver = function (event) {
        setActiveField(event.target.name);
    };
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            event.preventDefault();
            // window.open('mailto:bprobins1013@gmail.com')
            // console.info(contactInfo)
            // sendForm()
            emailjs_com_1["default"].sendForm("service_3mnxq9q", "template_rhub11c", formRef.current, "user_dUWetgW0ylblLyVca1sGo");
            return [2 /*return*/];
        });
    }); };
    var handleInputChange = function (e) {
        var _a;
        setContactInfo(__assign(__assign({}, contactInfo), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    // async function sendForm() {
    //     try {
    //         const js = await fetch("http://localhost:8080/email", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 fullname : [contactInfo["First Name"], contactInfo["Last Name"]].join(' '),
    //                 // first: contactInfo["First Name"],
    //                 // last: contactInfo["Last Name"],
    //                 email: contactInfo["Email"],
    //                 compname: contactInfo["Company"],
    //                 message: contactInfo["Message"]
    //             })
    //         })
    //         const text = await js.text()
    //         console.info('got back', text)
    //     } catch (err) {
    //         console.info('error ', err)
    //     }
    // }
    // console.info(contactInfo)
    return react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { style: {
                fontSize: 36,
                fontWeight: 'bold',
                fontFamily: 'Roboto',
                textAlign: 'center'
            } }, "Contact"),
        react_1["default"].createElement("form", { ref: formRef, style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            } },
            Object.keys(contactInfo).map(function (field) {
                return field !== "Message" ?
                    react_1["default"].createElement("div", { key: field, style: {
                            background: 'white',
                            zIndex: 2
                        } },
                        react_1["default"].createElement("input", { type: "text", placeholder: field, name: field, onMouseOver: function (e) { return handleMouseOver(e); }, onChange: function (e) { return handleInputChange(e); }, style: activeField === field ? inputActiveStyle : inputInactiveStyle }),
                        react_1["default"].createElement("span", { key: field + "span", style: activeField === field ? activeInputSpan : inactiveInputSpan }))
                    :
                        react_1["default"].createElement("div", { key: "Message", style: {
                                background: 'white',
                                zIndex: 2
                            } },
                            react_1["default"].createElement("textarea", { placeholder: "Message", key: "Message", name: "Message", onMouseOver: function (e) { return handleMouseOver(e); }, onChange: function (e) { return handleInputChange(e); }, style: activeField === "Message" ? inputActiveStyle : inputInactiveStyle }),
                            react_1["default"].createElement("span", { key: "Messagespan", style: activeField === "Message" ? activeInputSpan : inactiveInputSpan }));
            }),
            react_1["default"].createElement("input", { type: "submit", onClick: function (e) { return handleSubmit(e); } }, "Send")));
};
{ /* <input type="text"
                placeholder="First Name"
                name="first"
                onMouseOver={(e) => handleMouseOver(e)}
                onChange={(e) => handleInputChange(e)}
                style={activeField === 'first_name' ? inputActiveStyle : inputInactiveStyle}
            ></input>
            <span style={activeField === 'first_name' ? activeInputSpan : inactiveInputSpan} />
            <input type="text"
                placeholder="Last Name"
                name='last'
                onMouseOver={(e) => handleMouseOver(e)}
                onChange={(e) => handleInputChange(e)}
                style={activeField === 'last_name' ? inputActiveStyle : inputInactiveStyle}
            ></input>
            <span style={activeField === 'last_name' ? activeInputSpan : inactiveInputSpan} />
            <input type="text"
                placeholder="Email Address"
                name='email'
                onMouseOver={(e) => handleMouseOver(e)}
                onChange={(e) => handleInputChange(e)}
                style={activeField === 'email' ? inputActiveStyle : inputInactiveStyle}
            ></input>
            <span style={activeField === 'email' ? activeInputSpan : inactiveInputSpan} />
            <input type="text"
                placeholder="Company Name"
                name='compname'
                onMouseOver={(e) => handleMouseOver(e)}
                onChange={(e) => handleInputChange(e)}
                style={activeField === 'company' ? inputActiveStyle : inputInactiveStyle}
            ></input>
            <span style={activeField === 'company' ? activeInputSpan : inactiveInputSpan} />
            <textarea placeholder="Message"
                name="message"
                onMouseOver={(e) => handleMouseOver(e)}
                onChange={(e) => handleInputChange(e)}
                style={activeField === 'message' ? inputActiveStyle : inputInactiveStyle}></textarea>
            <span style={activeField === 'message' ? activeInputSpan : inactiveInputSpan} /> */
}
