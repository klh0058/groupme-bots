var HTTPS = require('https');
var cool = "yeah im cool";
var fakTrue = true;

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/Fak$/;
  
  while(fakTrue == true) {
    if(request.text && botRegex.test(request.text)) {
      this.res.writeHead(200);
      postMessage();
      this.res.end();
    } else {
      console.log("don't care");
      this.res.writeHead(200);
      this.res.end();
    }
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = "fak";
  
    options = {
      hostname: 'api.groupme.com',
      path: '/v3/bots/post',
      method: 'POST'
    };

    body = {
      "bot_id" : botID,
      "text" : botResponse
    };

    console.log('sending ' + botResponse + ' to ' + botID);

    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
          //neat
        } else {
          console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
      console.log('error posting message '  + JSON.stringify(err));
    });
    botReq.on('timeout', function(err) {
      console.log('timeout posting message '  + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
    //fakTrue = false;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


exports.respond = respond;
