/**
 * HobbiesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const mail = require('../services/email')
module.exports = {
    placeHobby: function(req, res) {
        const client = require('twilio')(sails.config.twilo.accountSid, sails.config.twilo.authToken);
        var allowedParameters = [
            "hobby", "userid",
        ]
        var data = _.pick(req.body.hobbbby, allowedParameters)
        
        //console.log(data);
        
        Hobbies.create(data, function (err, createdData) {
            if (err) {
                return res.send({
                    success: false,
                    message: err.message,
                });
            } else {
                mail(`You've added a new hobby`);
                client.messages
                    .create({
                        body: `You've added ${data.hobby} as a new hobby`,
                        from: '+18085175967',
                        to: '+2347067964149'
                    })
                    .then(message => console.log(message.sid))
                    .done();
                return res.json({
                    data: createdData
                });
                
            }
        });
    },

    getHobby: async function (req, res) {
        var allowedParameters = [
            "userid"
        ]
        var data = _.pick(req.body, allowedParameters);
        var gottenHobbies = await Hobbies.find({ where: { userid: data.userid}, select : ['hobby']  });
        return res.send({
            message: "Hello",
            gottenHobbies
        });
    },
};

