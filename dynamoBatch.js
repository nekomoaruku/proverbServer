var config = require('./lib/config');
var Dynamite = require('dynamite');

var client = new Dynamite.Client(config.aws);

client.newScanBuilder(config.db)
  .execute()
  .then(function (data) {
    console.log(data);
  });

client.putItem(config.db, {
  id: '001002',
  sheet: 1,
  attr1: 'hogehoge',
  attr2: 'hogehoge',
  attr3: 'hogehoge'
  })
  .execute()
  .then(function() {
    console.log('test');
  });

