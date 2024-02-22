const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash");
const { create } = require("express-handlebars");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const methodOverride = require("method-override");
const passport = require("passport");

const swaggerDocs = require("./config/swagger").swaggerDocs;
const swaggerUi = require("./config/swagger").swaggerUi;

const hbs = create({
  extname: "hbs",
  defaultLayout: "main",
  partialsDir: "views/partials",
  helpers: require("./utils/helpers"),
});

require("dotenv").config();

const pgPool = require("./config/pg-session");

const indexRouter = require("./routes/index");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "SECRET",
    resave: false,
    saveUninitialized: false,
    //Added for pgSession functionality
    store: new pgSession({
      pool: pgPool,
      tableName: "UserSession",
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

// view engine setup
app.engine("hbs", hbs.engine); //Line added by Cris
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");
require("./config/cloudinary");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
