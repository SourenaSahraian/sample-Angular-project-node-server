var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

var mongo = require('mongodb').MongoClient;


var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/api/issues', function (req, res) {
    //res.send('user' + req.params('id'));

    mongo.connect('mongodb://127.0.0.1/demoApp', function (err, db) {

        var col = db.collection('issues');
        col.find().sort({_id: 1}).toArray(function (err, result) {
            if(err)
                throw err;
            if (result == null) {
                res.send('no data was found')
            }

            else {
                var data = result;
                res.send(JSON.stringify(data));

            }

        })

    })

})

app.post('/api/create', function (req, res) {
    // res.send('post is intercepted with issue_id:  '+  req.body)
    mongo.connect('mongodb://127.0.0.1/demoApp', function (err, db) {
        if (err)
            throw err;

        var col = db.collection('issues');
        col.insert({name: req.body.name, description: req.body.desc}, function () {
            console.log('data was inserted');

        });
    })

    res.send('success')
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
