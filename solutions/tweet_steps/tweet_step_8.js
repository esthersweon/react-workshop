var React = require('react');
var ReactDOM = require('react-dom');

var Twitter = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  loadTweetsFromServer: function () {
    // GET updated set of tweets from database
    $.get(this.props.url, function (data) {
        this.setState({ data: data });
      }.bind(this)
    );
  },
  // handleTweetSubmit: function (author, text) {
  //   var tweet = { author: author, text: text };
  //
  //   // POST to add tweet to database
  //   $.post(this.props.url, tweet, function (data) {
  //       // Set state in step 10 of the exercise!
  //     }.bind(this)
  //   );
  // },
  componentDidMount: function () {
    // Set this.state.data to most recent set of tweets from database
    this.loadTweetsFromServer();
  },
  render: function () {
    return (
      <div className="twitter">
        <h1>Tweets</h1>
        <TweetForm />
        <TweetList data={ this.state.data } />
      </div>
    );
  }
});

var TweetForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    alert('You submitted the form!');
  },
  render: function () {
    return (
      <form className="tweetForm" onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="Author Name" />
        <input type="text" placeholder="Tweet" />
        <button type="submit" className="btn btn-info">Tweet</button>
      </form>
    );
  }
});

var TweetList = React.createClass({
  render: function () {
    var data = this.props.data;
    var tweetNodes = data.map(function (tweet) {
      return <Tweet author={ tweet.author } text={ tweet.text } />
    });

    return (
      <div className="tweetList">
        { tweetNodes }
      </div>
    );
  }
});

var Tweet = React.createClass({
  render: function () {
    return (
      <div className="tweet">
        <h2>{ this.props.text }</h2>
        <span> - { this.props.author }</span>
      </div>
    );
  }
});

ReactDOM.render(
  <Twitter url="tweets.json" />,
  document.getElementById('tweets')
);