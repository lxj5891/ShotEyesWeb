//var apns = require("apn");
//
//
//exports.testApn = function(req, res){
//  var token = req.query.token;
//
//  sendApn();
//  res.json({"a":"a"});
//}
//function sendApn(){
//  var options = {
//    cert: './pem/cert.pem',                 /* Certificate file path */
//    key:  './pem/key.pem',                  /* Key file path */
//    gateway: 'gateway.sandbox.push.apple.com',/* gateway address  gateway.sandbox.push.apple.com  gateway.push.apple.com, port 2195*/
//    port: 2195,                       /* gateway port */
//    batchFeedback: true,
//    errorCallback: errorHappened     /* Callback when error occurs function(err,notification) */
//  };
//
//  var feedback = new apns.Feedback(options);
//  feedback.on("feedback", function(devices) {
//    devices.forEach(function(item) {
//      console.log("feedback"+item);
//      console.log( item);
//
//    });
//  });
//
//  var apnsConnection = new apns.Connection(options);
//
//
////  6717c4e2 1cd1ebc8 0b695cd7 8cd544c0 f49ad0fa 80eb5dec f9845687
////  var myDevice = new apns.Device("84df75fc 6aa230a3 d66e8d6c d147cd4a 29be2b3c 2124a601 388d383c b09552e8");
//
//
//  var myDevice = new apns.Device("6717c4e2 1cd1ebc8 0b695cd7 8cd544c0 f49ad0fa 80eb5dec f9845687");
//
//  var note = new apns.Notification();
//  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
//  note.badge = 1;
//  note.sound = 'ping.aiff';
//  note.alert = {action:"refresh_desk",data: 'You have a new message11111111111111'};
//  note.payload = {'messageFrom': 'Caroline'};
//  note.device = myDevice;
//  apnsConnection.pushNotification(note,myDevice);
//}
//function errorHappened(err){
//  console.log("errror" + err);
//}