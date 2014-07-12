var router = require('express').Router();
var quizManager = require('../../lib/proverbQuizManager');

router.route('/')
  .get(function(req, res, next) {
    quizManager.getQuizList(1)
      .then(function(result) {
        res.send(result.result);
      })
      .fail(function(error) {
        console.log(error);
        res.send(400);
      });
  })
  .post(function(req, res, next) {
    quizManager.putQuiz(req.body, function(err, data) {
      if (err) {
        console.log(err);
        res.send(400);
      }
      console.log(data);
      res.send(200);
    });
  });

module.exports = router;