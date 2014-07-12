var config = require('./lib/config');
var Dynamite = require('dynamite');
var AWS = require('aws-sdk');
AWS.config.update(config.aws);

var client = new Dynamite.Client(config.aws);

client.newScanBuilder(config.db)
  .execute()
  .then(function (data) {
    console.log(data);
    console.log('--------------------');
  });

var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  console.log(data);
});
