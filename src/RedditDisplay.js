import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class RedditDisplay extends Component {
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
              ? <li className="list-group-item text-center">
                  <i className="fa fa-spinner fa-spin fa-2x"/>
                </li>
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

RedditDisplay.propTypes = {
  postDisplayLimit: PropTypes.number,
  subreddit: PropTypes.string.isRequired,
};
