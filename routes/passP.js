var authController = require('../controllers/passport_Controller.js');

module.exports = function(app,passport){

//console.log(passport);
//console.log(app);

app.get('/signup', authController.signup);


app.get('/signin', authController.signin);

app.get('/logout', authController.logout);


app.post('/signup', passport.authenticate('local-signup',{ 
    successRedirect: '/categories',
    failureRedirect: '/signup'
}));


 // app.post('/index/:beer', passport.authenticate('beer-signup',{ 
 //    successRedirect: '/index',
 //     failureRedirect: '/signup'
 // }));



 //app.get('/index',isLoggedIn, authController.index);

// app.get('/dashboard/beer',isLoggedIn, authController.beer);

app.get('/logout',authController.logout);


app.post('/signin', passport.authenticate('local-signin',{ 
    successRedirect: '/categories',
    failureRedirect: '/signin'
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}
}


