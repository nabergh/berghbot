var http, director, cool, bot, router, server, port;

http = require('http');
director = require('director');
cool = require('cool-ascii-faces');
bot = require('./bot.js');

router = new director.http.Router({
  '/': {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function(req, res) {
  req.chunks = [];
  req.on('data', function(chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {
      "Content-Type": "text/plain"
    });
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

var response = "Hey, I'm BerghBot"
function ping() {

  var group_id = "14217506";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/groups/' + group_id + '/messages',
    method: 'GET'
  };

  body = {
    "limit": 100
  };

  msgReq = HTTPS.request(options, function(res) {
    if (res.statusCode == 202) {
      response = JSON.stringify(res)
    } else {
      response = 'rejecting bad status code ' + res.statusCode;
    }
  });

  msgReq.on('error', function(err) {
    console.log('error posting message ' + JSON.stringify(err));
  });
  msgReq.on('timeout', function(err) {
    console.log('timeout posting message ' + JSON.stringify(err));
  });
  msgReq.end(JSON.stringify(body));


  this.res.writeHead(200);
  this.res.end(response);
}