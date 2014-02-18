// Pages object

// Pulls in content for Jade templates
var pageData = require('.././page_data/data')
var data = pageData.data;

var pages = {
	welcome: {
		dir: 'pages/welcome',
		url: '/welcome',
		content: data.welcome
	},
	portfolio: {
		dir: 'pages/portfolio',
		url: '/portfolio',
		content: data.portfolio
	},
	interests: {
		dir: 'pages/interests',
		url: '/interests',
		content: data.interests
	},
};

exports.pages = pages;

exports.index = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');

        collection.find({},{},function(e, docs) {
        	data.index.users = docs;

            res.render('index', data.index);
        });
    };
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');

        collection.find({},{},function(e, docs) {
            res.render('userlist',
            	{
            		'userlist': docs
            	}
            );
        });
    };
};

exports.newuser = function(req, res) {
    res.render('newuser', { title: 'Add New User'});
};

exports.newcookie = function(req, res) {
    var curCookie = req.cookies.test;

    res.render('newcookie', { title: 'Add New Cookie', cookie: curCookie });
};

/* ---- MongoDB POSTS ---- */

exports.removeuser = function(db) {
    return function(request, response) {

        // Get our form values. These rely on the "name" attributes
        var userName = request.body.username;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.remove(
            {
                "username" : userName
            },
            function (err, doc) {
                if (err) {
                    // If it failed, return error
                    response.send("There was a problem removing the information to the database.");
                }
                else {
                    // If it worked, set the header so the address bar doesn't still say /adduser
                    response.location("userlist");
                    // And forward to success page
                    response.redirect("userlist");
                }
            }
        );
    }
}

exports.adduser = function(db) {
    return function(request, response) {

        // Get our form values. These rely on the "name" attributes
        var userName = request.body.username;
        var pwd = request.body.password;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert(
            {
                "username" : userName,
                "pwd" : pwd
            },
            function (err, doc) {
                if (err) {
                    // If it failed, return error
                    response.send("There was a problem adding the information to the database.");
                }
                else {
                    // If it worked, set the header so the address bar doesn't still say /adduser
                    response.location("userlist");
                    // And forward to success page
                    response.redirect("userlist");
                }
            }
        );
    }
}

exports.addcookie = function(req, res) {
    // Get our form values. These rely on the "name" attributes
    var cookieName = req.body.cookieName;

    res.cookie('test', cookieName);

    res.redirect("/newcookie");
}

exports.signin = function(db) {
    return function(req, res) {
        // Get our form values. These rely on the "name" attributes
        var userName = req.body.userName;
        var pwd = req.body.password;

        var users = db.get('usercollection');



        res.cookie('test', cookieName);

        res.redirect("/newcookie");
    }
}
