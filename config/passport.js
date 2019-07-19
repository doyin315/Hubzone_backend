var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bycrpt = require('bcrypt');
passport.use(new LocalStrategy(function (username, password, done) {
    Users.findOne({
        username: username
    },function (err,user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message : 'Wrong Username or Password'});
        }
        bycrpt.compare(password, user.password, function(err,res) {
            if(!res){ 
                return done(null, false, { message: 'Wrong Username or Password' });
            }
            return done(null, user, 'Sign in Success' );
        })
    })
}));