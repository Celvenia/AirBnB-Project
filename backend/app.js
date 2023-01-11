const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Create a variable called isProduction that will be true if the environment is in production or not by
// checking the environment key in the configuration file (backend/config/index.js):

const { environment } = require('./config');
const isProduction = environment === 'production';

// Initialize the Express application:
const app = express();

// Connect the morgan middleware for logging information about requests and responses:
app.use(morgan('dev'));

// Add the cookie-parser middleware for parsing cookies and the express.json middleware
// for parsing JSON bodies of requests with Content-Type of "application/json".

app.use(cookieParser());
app.use(express.json());

/* Add several security middlewares:

Only allow CORS (Cross-Origin Resource Sharing) in development using the cors middleware because the React
frontend will be served from a different server than the Express server. CORS isn't needed in production since
all of our React and Express resources will come from the same origin.
Enable better overall security with the helmet middleware (for more on what helmet is doing, see helmet on the
npm registry). React is generally safe at mitigating XSS (i.e., Cross-Site Scripting) attacks, but do be sure to
research how to protect your users from such attacks in React when deploying a large production application. Now add the crossOriginResourcePolicy to the helmet middleware with a policy of cross-origin. This will allow images with URLs to render in deployment.
Add the csurf middleware and configure it to use cookies.
*/

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

 /*
In this test route, you are setting a cookie on the response with the name of XSRF-TOKEN to the
  value of the req.csrfToken method's return. Then, you are sending the text, Hello World! as the response's body.

Add the routes to the Express application by importing with the other imports in backend/app.js and connecting the
exported router to app after all the middlewares. */

// backend/app.js
const routes = require('./routes');


app.use(routes); // Connect all the routes

//resource not found error handler
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Sequelize error handler
const { ValidationError } = require('sequelize');

// ...

// Process sequelize errors

app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// error formater error handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
