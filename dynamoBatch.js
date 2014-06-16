var config = require('./lib/config');
var Dynamite = require('dynamite');

var client = new Dynamite.Client(config.aws);

client.newScanBuilder(config.db)
  .execute()
  .then(function (data) {
    console.log(data);
  });