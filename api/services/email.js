const api_key = "d02e4b49d0db7b0d2733e17e01636fa0-0470a1f7-71b0ec9b";
const domain = "sandbox73ddf3d733ac4b5d883e993e9e4cd87d.mailgun.org";
const gun = require('mailgun-js')({
  apiKey: api_key,
  domain: domain
});


module.exports = (message) => {
  return gun
    .messages()
    .send({
      from:
        "Mailgun Sandbox <postmaster@sandbox73ddf3d733ac4b5d883e993e9e4cd87d.mailgun.org>",
      to: "Olawale Isaac <bodolawale@gmail.com>", // Text this number
      subject: "Hello Olawale Isaac",
      text: message
    });

}