var HTTPS = require('https');
var fs = require('fs');
var groupme = require('groupme').Stateless;

const ACCESS_TOKEN = "d1bc671015e401336db33602c8816889";
var group_id = "14217506";

var messages = JSON.parse(fs.readFileSync('messages.json'))["messages"];

function updateMessages() {
  groupme.Messages.index(ACCESS_TOKEN, group_id, {
    limit: 1
  }, function(err, data) {
    if (err) {
      console.log(JSON.stringify(err, null, 2));
    } else {
      if (data["messages"][0]["id"] != messages[messages.length - 1]["id"]) {
        getMoreMessages(messages[messages.length - 1]["id"]);
      } else {
        continueWork();
      }
    }
  });
}

var options = {
  limit: 100
};

function getMoreMessages(after_id) {
  if (after_id) {
    options["after_id"] = after_id;
  }
  groupme.Messages.index(ACCESS_TOKEN, group_id, options, appendMessages);
}

function appendMessages(err, data) {
  if (err) {
    console.log(JSON.stringify(err, null, 2));
    return;
  } else {
    messages = messages.concat(data["messages"]);
  }

  if (data["messages"].length == options.limit) {
    getMoreMessages(data["messages"][options.limit - 1]["id"]);
  } else {
    // messages.reverse();
    fs.writeFileSync('messages.json', JSON.stringify({
      "messages": messages
    }, null, 2));
    continueWork();
  }
}

function continueWork() {
  var top = [];

  function rank(msg, numFavorites) {
    if (top.length > 0) {
      for (var i = 0; i < top.length; i++) {
        if (top[i]["favorited_by"].length <= numFavorites) {
          top.splice(i, 0, msg);
          if (top.length > 20) {
            top.pop()
          }
          break;
        }
      }
    } else {
      top.push(msg);
    }
  }

  var members = {};
  for (var i = 0; i < membersList.length; i++) {
    members[membersList[i]["user_id"]] = membersList[i];
  }
  for (var key in members) {
    members[key].favorites = 0;
    members[key].total = 0;
    members[key].good = 0;
    members[key].self_likes = 0;
    members[key].self_liked = [];
  }
  for (var i = 0; i < messages.length; i++) {
    var member = members[messages[i]["sender_id"]];
    if (member) {
      var self = messages[i]["favorited_by"].indexOf(member["user_id"]);
      if (self > -1) {
        messages[i]["favorited_by"].splice(self, 1);
        member.self_likes++;
        member.self_liked.push(messages[i]["text"]);
      }
      var numFavorites = messages[i]["favorited_by"].length;
      member.favorites += numFavorites;
      if (numFavorites > 0) {
        member.good++;
        rank(messages[i], numFavorites);
      }
      member.total++;
    }
  }
  for (var key in members) {
    members[key].ratio = members[key].favorites / members[key].total;
    members[key].goodRatio = members[key].good / members[key].total;
  }
  console.log(JSON.stringify(members, null, 2));
  console.log(JSON.stringify({
    "top": top
  }, null, 2));
}

var membersList = [{
  "user_id": "10929478",
  "nickname": "Nick",
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
}, {
  "user_id": "223826",
  "nickname": "BerghBot",
  // "image_url": "http://i.groupme.com/200x200.jpeg.e9950f6690544f509bf87fa2b8d933a6",
  // "id": "90837019",
  "muted": false,
  "autokicked": false
}];

updateMessages();