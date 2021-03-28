const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routes/userRouter');
const globalErrorHandler = require('./utils/globalErrorHandler');

const app = express();
app.use(cookieParser());
// app.use(cors());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// app.use(cors({ credentials: true, origin: 'http://localhost:3000',allowedOrigins:'*' }));
//for reading static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(xss());
//for parsing data
app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.requestTime);
  next();
});
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'http:', 'data:'],
      scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:']
    }
  })
);

app.use('/api/users', userRouter);

app.use(globalErrorHandler);
module.exports = app;
