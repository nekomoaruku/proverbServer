var config = require('./config');
var Dynamite = require('dynamite');
var AWS = require('aws-sdk');
AWS.config.update(config.aws);
var s3 = new AWS.S3();

var client = new Dynamite.Client(config.aws);
var dynamoTable = 'proverb_quiz';
var s3Bucket = 'ibeya';
var s3Directory = 'proverbImages/';
var s3ImageUrl = 'https://s3-ap-northeast-1.amazonaws.com/';

exports.putQuiz = function(quiz, callback) {

  console.log(quiz);

  if (!quiz.exampleImageData && !quiz.exampleImageUrl) {
    var error = new Error('No image Data.');
    callback(error);
    return;
  }

  if (quiz.exampleImageData) {

    // 新しい画像がアップロードされた場合は、その画像をS3に登録後、
    // クイズデータをDynamoにPUTします。
    var splitData;
    splitData = quiz.exampleImageData.split(';');
    var imageExt = splitData[0].slice(-3);
    splitData = quiz.exampleImageData.split(',');
    var imageData = splitData[1];
    var s3Key = s3Directory + quiz.id.slice(0, 3) + '/' + quiz.id.slice(3) + '.' + imageExt;
    quiz.exampleImageUrl = s3ImageUrl + s3Bucket + '/' + s3Key;
    delete quiz.exampleImageData;

    var dataToPut = _formatDataToPut(quiz);

    s3.putObject({
      Bucket: s3Bucket,
      Key: s3Key,
      Body: new Buffer(imageData, 'base64'),
      ACL: 'public-read'
    }, function(err, result) {
      if (err) {
        callback(err, null);
      } else {
        _putItemToDynamo(dynamoTable, dataToPut, callback);
        console.log(result);
      }
    });

  } else {

    // 画像のアップロードがない場合は、Dynamoのデータのみ更新します
    var dataToPut = _formatDataToPut(quiz);
    _putItemToDynamo(dynamoTable, dataToPut, callback);

  }

  function _formatDataToPut(quiz) {
    return {
      id: quiz.id,
      sheet: quiz.sheet,
      number: quiz.number,
      dataJson: JSON.stringify(quiz),
      isTestMode: quiz.isTestMode
    }
  }

  function _putItemToDynamo(dynamoTable, dataToPut, callback) {
    client.putItem(dynamoTable, dataToPut)
      .execute()
      .then(function() {
        callback(null);
      })
      .fail(function(err) {
        callback(err);
      })
  }

};

exports.getQuizList = function(sheet) {
  return client.newQueryBuilder(dynamoTable)
    .setIndexName('sheet-index')
    .setHashKey('sheet', sheet)
    .execute()
};

exports.scan = function() {
  client.newScanBuilder(dynamoTable)
    .execute()
};
