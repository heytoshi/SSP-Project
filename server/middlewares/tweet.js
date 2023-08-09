
const tweetValidate = async (req, res, next) => {
  const tweet = req.body.tweet;

  if (!tweet) throw new Error("tweet input required");

  next();

};

module.exports = { tweetValidate };
