var CronJob = require('cron').CronJob;
require('dotenv').config({path: '../.env'})

var kue = require('kue'),
    queue = kue.createQueue();

var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET,
    region: 'ap-southeast-1'
});

var sns = new AWS.SNS();

let helper = function (params, menit) {
  console.log('helper****',params);

  queue.create('email', {
      title: params.title,
      task: params.task,
      to: 'durotar.resis1@gmail.com',
      phone: '+6285693072034',
  }).save(function(err) {
      if (err) console.log(err);;
  })

  new CronJob('* * * * * *', function() {

      queue.process('email', function(job, done) {
          // console.log('process',job.data);
          // email(job.data, done);
          // sms(job.data)

          done()
      });

  }, null, true, 'Asia/Jakarta');
}


//
// function email(paramsJob, done) {
//
//     // email send stuff...
//     // console.log('function***', paramsJob);
// //     var send = require('gmail-send')({
// //         user: 'durotar.resis1@gmail.com', // Your GMail account used to send emails
// //         pass: 'zgozczgpbyvbsvdp', // Application-specific password
// //         to: paramsJob.to, // Send to yourself
// //         // you also may set array of recipients:
// //         // [ 'user1@gmail.com', 'user2@gmail.com' ]
// //         subject: paramsJob.title,
// //         text: paramsJob.template // Plain text
// //     })();
// }
//
// function sms(paramsJob, done) {
//     console.log(paramsJob);
//
//     var params = {
//         Message: 'percobaan', /* required */
//         PhoneNumber: '+6285693072034'
//         // PhoneNumber: '+6281314303800'
//     };
//
//     sns.publish(params, function(err, data) {
//         console.log(data); // successful response
//     });
//
// }

module.exports = helper;