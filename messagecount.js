var HTTPS = require('https');
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
		console.log(JSON.stringify(res));
	} else {
		console.log('rejecting bad status code ' + res.statusCode);
	}
});

msgReq.on('error', function(err) {
	console.log('error posting message ' + JSON.stringify(err));
});
msgReq.on('timeout', function(err) {
	console.log('timeout posting message ' + JSON.stringify(err));
});
msgReq.end(JSON.stringify(body));