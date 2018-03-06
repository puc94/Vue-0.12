var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

app = express();
app.use(serveStatic(__dirname + '/dist'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

routes = require("./routes");
routes.register(app);

app.get('/', function(req, res, next) {
	res.render('index');
})

app.get('*', function(req, res, next) {
	res.redirect('/');
})

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started ' + port);