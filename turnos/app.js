var createError = require('http-errors');
var express = require('express');
const session = require("express-session");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv=require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const contactoRouter=require('./routes/contacto');
const loginRouter=require('./routes/login');
const adminIndexRouter=require('./routes/admin/index');
const registroRouter = require('./routes/registro');
const adminUsuariosRouter=require('./routes/admin/usuarios');
const adminCateEspacioRouter=require('./routes/admin/cateEspacio');
const adminCateProfesRouter=require('./routes/admin/cateProfes');
const adminEspacioRouter=require('./routes/admin/espacio');
const adminProfesionalRouter=require('./routes/admin/profesional');
const adminAsignacionRouter=require('./routes/admin/asignacion');
const tomarRouter=require('./routes/tomar');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'tursecre',resave: true, saveUninitialized: true, cookie: {maxAge: null},}));

seguAdmin=(req,res,next)=>{
  try{
    
    if (req.session.admin==1){
      
      next();
    }
    else {
      res.redirect('/login');
    }
  } catch(error){
    console.log("que pasa con el guardian",req.session);
    res.redirect('/login');
  }
};

seguUsu=(req,res,next)=>{
  try {
    if (req.session.admin==1 || req.session.admin==0){
      next();
    }
    else {
      res.redirect('/login');
    }
  } catch(error){
    console.log(error);
  }
};


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacto',contactoRouter);
app.use('/login',loginRouter);
app.use('/admin/index',seguAdmin, adminIndexRouter);
app.use('/admin/usuarios',seguAdmin,adminUsuariosRouter);
app.use('/registro',registroRouter);
app.use('/admin/cateEspacio',seguAdmin,adminCateEspacioRouter);
app.use('/admin/cateProfes',seguAdmin,adminCateProfesRouter);
app.use('/admin/espacio',seguAdmin,adminEspacioRouter);
app.use('/admin/profesional',seguAdmin,adminProfesionalRouter);
app.use('/admin/asignacion',seguAdmin,adminAsignacionRouter);
app.use('/tomar',seguUsu,tomarRouter);
//app.use('/tomar',tomarRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
