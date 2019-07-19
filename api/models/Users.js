/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt-node');
var bluebird = require('bluebird');


module.exports = {

   
  attributes: {
    id: {
      type: 'integer',
      unique: true,
    },
      email: {
      type: 'string',
      required: true,
      email: true,
      unique: true,
    },
    username: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,  
    },
    phone: {
      type: 'string',
      required: true,
    }, 
    
  },
  // customToJSON: function () {
  //   var obj = this.toObject()
  //   delete obj.password  
  // },

  beforeCreate: function (user, cb) {
     bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt,function(){}, function (err,hash){
          user.password = hash;
          cb(null,user);
        })
     })
  },
  comparePassword: function (password, user) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) reject(err);

        if (match) {
          resolve(true);
        } else {
          reject(err);
        }
      })
    });
  },
  datastore: 'mongodb',
};

