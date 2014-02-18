
/**
 * Module dependencies.
 */

var compass = require('compass');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var pages = routes.pages;

var pageData = require('./page_data/data');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser())
app.use(express.methodOverride());
app.use(express.cookieParser('1337'));
app.use(express.cookieSession());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(compass({ cwd: __dirname + 'public' }));
//

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//

// Routes
var setRoute = function(page) {
	app.get(page.url, function(req, res) {
		res.render(page.dir, page.content);
	});
};

setRoute(pages.welcome);
setRoute(pages.portfolio);
setRoute(pages.interests);

app.get('/', routes.index(db));
app.get('/home', routes.index(db));
app.get('/userlist', routes.userlist(db));
app.get('/newuser', routes.newuser);
app.get('/newcookie', routes.newcookie);

app.post('/adduser', routes.adduser(db));
app.post('/removeuser', routes.removeuser(db));
app.post('/addcookie', routes.addcookie);

// Create server
http.createServer(app).listen(app.get('port'), function()
	{
		console.log('Express server listening on port ' + app.get('port'));
	}
);