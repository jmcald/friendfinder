const friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    let user = req.body;

    for(i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    let bestFriendIndex = 0;
    let minimumDifference = 40;

    for(i = 0; i < friends.length; i++) {
      let totalDifference = 0;
      for(j = 0; j < friends[i].scores.length; j++) {
        let difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      if(totalDifference < minimumDifference) {
        bestFriendIndex = i;
        minimumDifference = totalDifference;
      }
    }

    friends.push(user);

    res.json(friends[bestFriendIndex]);
  });
};