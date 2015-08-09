var https = require('https'),
  fs = require('fs'),
  PythonShell = require('python-shell'),
  bot = require('./bot.js'),
  groupme = require('groupme').Stateless,
  ImageService = require('groupme').ImageService;

const ACCESS_TOKEN = "d1bc671015e401336db33602c8816889";
var group_id = "14217506";

var options = {
  limit: 20
};

exports.getLatestImgUrl = function (before_id) {
  console.log("checking messages for img...");
  if (before_id) {
    options["before_id"] = before_id;
  }
  groupme.Messages.index(ACCESS_TOKEN, group_id, options, checkForImgs);
}

function checkForImgs(err, data) {
  if (err) {
    console.log(JSON.stringify(err, null, 2));
    return;
  } else {
    messages = data["messages"];
    for (var i = 0; i < messages.length; i++) {
      var attachments = messages[i]["attachments"];
      if (attachments.length > 0) {
        for (var j = 0; j < attachments.length; j++) {
          if (attachments[j]["type"] == "image") {
            swap(attachments[j]["url"]);
            return;
          }
        }
      }
    }
    exports.getLatestImgUrl(messages[options.limit - 1]["id"])
  }
}

function swap(url) {
  console.log("Swapping " + url);
  var fname = url.split('/')[3];
  options = {
    hostname: 'i.groupme.com',
    path: '/' + fname
  }

  var request = https.get(options, function(res) {
    var imagedata = ''
    res.setEncoding('binary')

    res.on('data', function(chunk) {
      imagedata += chunk
    })

    res.on('end', function() {
      fs.writeFile(fname, imagedata, 'binary', function(err) {
        if (err)
          throw err
        else {
          var args = {
            args: [fname, 'output.jpg'],
            scriptPath: './',
          };
          PythonShell.run('faceswap.py', args, function(err) {
            if (err)
              throw err;
            else
              uploadImg();
          });
        }
      })
    })
  })
}

function uploadImg() {
  console.log("uploading...");
  ImageService.post(
    'output.jpg',
    function(err, ret) {
      if (err) {
        console.log(err)
      } else {
        bot.sendFaceswap(ret);
      }
    });
}

