var router = require('express').Router();
var config = require('../../lib/config');

var sampleProverbs = [
  {
    "id": "001001",
    "number": "001",
    "sheet": "001",

    "proverb": "天才とは99%の努力と\n1%のひらめきである",
    "quiz": "天才とは#{quiz}%の努力と#{quiz}%のひらめきである",
    "choices": [
      ["99", "1"],
      ["50", "50"],
      ["100", "120"],
      ["0", "100"]
    ],
    "rightChoiceIndex": 2,
    "example": "あるところにおじいさんとおばあさんがいて、おじいさんは天才でした。おばあさんは畜生でした。",
    "exampleImageUrl": "http://blog-imgs-10-origin.fc2.com/s/u/k/sukinandamon/s-img024.jpg"
  }
];

router.route('/:proverbId')
  .get(function(req, res, next) {
    res.json(sampleProverbs[req.params.proverbId] || []);
  });

module.exports = router;