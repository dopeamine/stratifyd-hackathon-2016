//Averages the sentiment value for states from tweets, then updates it in locations
module.exports = function updateLocations(locations, tweets) {
	//Averages the sentiment values of the tweets for each state and returns the array
  function averages(tweets) {
    return Promise.resolve(tweets)
      .then(tweets => {
        return tweets.reduce(function (states, tweet) {
          if (!states[tweet.state])
            states[tweet.state] = { total: 0, count: 0 };
          //for every state update the average sentiment score
          states[tweet.state].total += tweet._text_sentiment_score;
          states[tweet.state].count++;

          states[tweet.state].average = states[tweet.state].total / states[tweet.state].count;

          return states;
        }, {});
      });
  }

  return averages(tweets)
    .then(states => {
      locations.forEach(location => {
        const stateName = location.properties.name;
        if (states[stateName]) {
          location.properties.density = states[stateName].average;
        }
      });
      return locations;
    });
}
