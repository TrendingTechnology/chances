import React, { Component } from 'react';
import { Link } from 'gatsby';
import './PostExcerpt.css';

class PostExcerpt extends Component {
  render() {
    const { title, slug, date, timeToRead, spoiler } = this.props;
    return (
      <article className="PostExcerpt">
        <header className="PostExcerpt__header">
          <h3 className="PostExcerpt__title">
            <Link className="PostExcerpt__titleLink" to={slug}>
              {title}
            </Link>
          </h3>
          <small className="PostExcerpt__meta">
            {date}
            {` • ${timeToRead}`}
          </small>
        </header>
        <p
          className="PostExcerpt__spoiler"
          dangerouslySetInnerHTML={{ __html: spoiler }}
        />
        <small className="PostExcerpt__more">
          <Link className="PostExcerpt__moreLink" to={slug}>
            Read More
          </Link>
        </small>
      </article>
    );
  }
}

export default PostExcerpt;
