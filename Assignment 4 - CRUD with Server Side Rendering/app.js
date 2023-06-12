// app.js
const createError = require('http-errors');
const express = require('express');
const connectDB = require('./db');
const gameRoutes = require('./routes/games');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const methodOverride = require('method-override');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const isAuthenticated = require('./middleware/auth');
const indexRouter = require('./routes/index');
const userdataRouter = require('./routes/userdata')
const consoleRouter=require('./routes/consoles')
const console2Router=require('./routes/consoles2')
const session = require('express-session');
const mongoose = require('mongoose');
var cart_array = [];

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
// app.use(require("./middleware/checkSession"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
let carts = require("./models/Cart");

// Connect to the database
connectDB()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });



app.use(
  session({
    secret: "Secret",
    cookie: { maxAge: 60000000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/', indexRouter); // Set up the index router first
app.use('/', loginRouter); // Set up the login router separately

app.use(require("./middleware/checkSession"));

app.get('/landingpage', (req,res) => {
  res.render('landingpage')
})

app.get('/admin', (req,res) => {
  res.render('admin',{layout:false})
})

app.get('/add-to-cart', async (req,res) => {
  
  const data= new carts({
    user_id: req.query.user_id,
    product_id: req.query.product_id,
    product_url: req.query.product_url,
    product_name: req.query.product_name,
    product_price: req.query.product_price
  })

  try {
    const val = await data.save();
    console.log(val)
    res.redirect('/new-cart')
  }
  catch (err) {
    console.log(err)
    res.send(err)
  }
})

app.get('/new-cart', async (req,res) => {
  try {
    const cartItems = await carts.find({}).lean();
    cart_array = cartItems.map(pr => ({ ...pr }));
    // console.log(products_array);
  } catch (err) {
    console.error(err);
  }
  res.render('new-cart',  { cartItems: cart_array });
})

app.get('/delete-cart', async (req,res) => {
  try {
    const deletedUser = await carts.findOneAndDelete({ product_id: req.query.product_id });
    if (!deletedUser) {
      console.log('not found.');
    } else {
      console.log('deleted successfully.');
    }
  }
  catch(err) {
    console.log(err);
  }
  res.redirect('/new-cart');
})

app.use('/dashboard',  dashboardRouter);
app.use('/games', gameRoutes);
app.use('/userdata', userdataRouter);
app.use('/consoles',consoleRouter);
app.use('/consoles2',console2Router);


// Use method override middleware
app.use(methodOverride('_method'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log("Server Started");
});


