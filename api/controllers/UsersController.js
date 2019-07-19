/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var passport = require('passport');  
var bcrypt = require('bcrypt-node');

module.exports = {
    processSignin: function (req,res){
        passport.authenticate('local', function (err, user ,info){  
            if((err) || (!user)){
                //res.status(403);  
                return res.send({
                    message: info.message,
                });
            }
                req.session.authenticated = true; 
                return res.send({
                    status: "OK",
                    userid: user.id,
                    username: user.username,
                });

        })(req,res);
        
    },

    processSignup: function (req, res,) {
  
        if(req.body.password != req.body.conPassword){
            return res.send({ 
                success: false,
                message : "Password Mismatch",
             });
            
        }
        var allowedParameters = [
            "email", "password" ,"username","phone"
        ]
        var data = _.pick(req.body, allowedParameters)
        
        Users.create(data, function (err, createdData) {
            if (err) {  
                return res.send({
                    success:false,
                    message: err.message,
                });
            } else {
                return res.json({
                    data: createdData
                });
            }
        });
    },  
};

function newFunction(data) {
    console.log(data);
}

