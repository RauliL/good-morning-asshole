import React, { Component } from "react";
import _ from "lodash";

class RedditDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      posts: [],
    };
  }

  componentDidMount() {
    fetch(`https://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(response => response.json())
      .then(data => {
        let posts = data.data.children.map(obj => obj.data);

        if (this.props.postDisplayLimit) {
          posts = _.take(posts, this.props.postDisplayLimit);
        }

        this.setState({
          isLoading: false,
          posts,
        });
      });
  }

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">
            <i className="fa fa-reddit"/>
            &nbsp;
            /r/{this.props.subreddit}
          </h4>
        </div>
        <ul className="list-group list-group-flush">
          {
            this.state.isLoading
              ? <ul className="list-group-item">
                  <i className="fa fa-spinner fa-spin fa-2x"/>
                </ul>
              : this.state.posts.map(post =>
                <li key={post.id} className="list-group-item">
                  {post.title}
                </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default RedditDisplay;
