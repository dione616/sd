"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var colors_1 = __importDefault(require("colors"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var database_1 = require("./database");
var register_1 = require("./routes/register");
var login_1 = require("./routes/login");
var express_session_1 = __importDefault(require("express-session"));
var compression_1 = __importDefault(require("compression"));
var PORT = 3002;
var app = express_1.default();
var connect = database_1.connectDatabase();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(
  cors_1.default({
    origin: "https://sigma-auth.herokuapp.com/",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(
  express_session_1.default({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(compression_1.default);
app.use(express_1.default.static(__dirname + "/client"));
app.get("/*", function (_req, res) {
  return res.sendFile(__dirname + "/client/index.html");
});
app.get("/", function (req, res) {
  return res.status(200).send("<h1>Hello World!</h1>");
});
/* app.get(loginRoute); */
app.use(register_1.register);
app.use(login_1.login);
app.listen(PORT, function () {
  console.log(
    colors_1.default.blue("[app]:is running on http://localhost:" + PORT)
  );
});
