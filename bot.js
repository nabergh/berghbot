var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var counter = 0;
var delay = 500;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
    greeting = /(hi|hello|hey).*berghbot/ig,
    fuck = /fuck.*you.*berghbot/ig;
  // greeting = /^\/cool guy$/;
  // console.log(JSON.stringify(request));
  this.res.writeHead(200);

  if (request.text) {
    if (request["user_id"] == "16149260") {
      if (++counter > 2) {
        setTimeout(postMessage, delay, "Shut up, Grant");
        counter = 0;
      }
    }
    if (greeting.test(request.text)) {
      var msg = "Hi " + request["name"] + "! " + cool();
      setTimeout(postMessage, delay, msg);
    }
    if (fuck.test(request.text)) {
      var msg = "Fuck you too, " + request["name"] + "!";
      setTimeout(postMessage, delay, msg);
    }
  };
  this.res.end();

}

function postMessage(botResponse) {
  var options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id": botID,
    "text": botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
    if (res.statusCode == 202) {
      //neat
    } else {
      console.log('rejecting bad status code ' + res.statusCode);
    }
  });

  botReq.on('error', function(err) {
    console.log('error posting message ' + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message ' + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;

var members = [{
  "user_id": "10929478",
  "nickname": "ʕ•ᴥ•ʔ",
  "image_url": "http://i.groupme.com/720x960.jpeg.5dda09e26c2d434a8afc38ed919cb915",
  "id": "89462386",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "8985925",
  "nickname": "Marlee",
  "image_url": "http://i.groupme.com/79105120f8a30130e8794a5f2a4ed390",
  "id": "89462518",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "275174",
  "nickname": "Gerg Bruns",
  "image_url": "http://i.groupme.com/3ffc19805dc50130034012313d04f670",
  "id": "89462537",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "7053341",
  "nickname": "Dugan",
  "image_url": "https://i.groupme.com/1276x1280.jpeg.c1eef9f06daf0131ea8422000aba058c",
  "id": "89462553",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "6915490",
  "nickname": "Slightly Hardened Cal",
  "image_url": "http://i.groupme.com/640x640.jpeg.759b720382a846fca6d9c8daeb3fc83b",
  "id": "89463392",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "27529955",
  "nickname": "Lebolas",
  "image_url": "http://i.groupme.com/640x640.jpeg.b8e07216837d48f7b24d23875da7b1b2",
  "id": "89463864",
  "muted": true,
  "autokicked": false
}, {
  "user_id": "27529904",
  "nickname": "Cassidy",
  "image_url": "http://i.groupme.com/640x640.jpeg.c55f6fa4a86948b79fdeec38b8178cc6",
  "id": "89464154",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "9421806",
  "nickname": "Dani",
  "image_url": "http://i.groupme.com/677c7290d36f013055df2234e932444f",
  "id": "89467714",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "12334230",
  "nickname": "Ryann",
  "image_url": "http://i.groupme.com/200x200.jpeg.e557e399814e4e21a60c58d5dd82538d",
  "id": "89478185",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "12128866",
  "nickname": "Ceej",
  "image_url": "http://i.groupme.com/720x1280.jpeg.b29d155427f44666b5760f32b0a9b1f3",
  "id": "89533081",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "12822125",
  "nickname": "Jean-michel Mbouroukounda",
  "image_url": null,
  "id": "89753752",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "8470855",
  "nickname": "Talia",
  "image_url": "http://i.groupme.com/640x640.jpeg.06cad5907c514558a94900336a7f2a3f",
  "id": "90307797",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "22154404",
  "nickname": "Aubrey Purdy",
  "image_url": "http://i.groupme.com/1280x1280.jpeg.a956b36acb214574b56d5b0473ff7844",
  "id": "90670999",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "13066463",
  "nickname": "Econ",
  "image_url": "http://i.groupme.com/638x640.jpeg.5bd19165c66b4d8a8bba4b4b40d0ad80",
  "id": "90700787",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "2741336",
  "nickname": "Max",
  "image_url": "http://i.groupme.com/750x750.jpeg.cb3046f0688c4ff99e9022ba79fc4074",
  "id": "90701386",
  "muted": false,
  "autokicked": false
}, {
  "user_id": "16149260",
  "nickname": "Grant Shepherd",
  "image_url": "http://i.groupme.com/200x200.jpeg.e9950f6690544f509bf87fa2b8d933a6",
  "id": "90837019",
  "muted": false,
  "autokicked": false
}];