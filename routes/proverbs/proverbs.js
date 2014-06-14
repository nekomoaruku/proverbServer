var router = require('express').Router();
var config = require('../../lib/config');

var sampleProverbs = [
  {
    "id": "001001",
    "number": "001",
    "sheet": "001",

    "proverb": "天才とは99%の努力と1%のひらめきである",
    "quiz": "天才とは#{quiz}%の努力と#{quiz}%のひらめきである",
    "choices": [
      "70%の努力と30%の才能",
      "1%の努力と99%の血統",
      "100%の金と120%の笑顔",
      "50%の金と50%の腕力"
    ],
    "rightChoiceIndex": 2,
    "example": "頑張れば君も天才になれるかもしれないぞ！！！"
  }
];

router.route('/:proverbId')
  .get(function(req, res, next) {
    res.json(sampleProverbs[req.params.proverbId] || []);
  });

module.exports = router;