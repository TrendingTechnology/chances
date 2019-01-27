import React, { Component } from 'react';
import T from 'prop-types';
import { compact } from 'lodash';
import cx from 'classnames';
import { Link } from 'gatsby';
import profilePic from '../../assets/headshot.jpg';
import TwitterIcon from '../TwitterIcon';
import './Bio.css';

class Bio extends Component {
  static propTypes = {
    headingEl: T.oneOfType([T.node, T.string]),
    nameLink: T.string,
    date: T.string,
  };

  static defaultProps = {
    headingEl: 'h3',
  };

  renderName = () => {
    const name = 'Chance Strickland';
    return this.props.nameLink ? (
      <Link className="Bio__nameLink" to={this.props.nameLink}>
        {name}
      </Link>
    ) : (
      name
    );
  };

  render() {
    const { headingEl: H, className, timeToRead, date } = this.props;
    const sep = <span className="Bio__sep">·</span>;
    const description = compact([
      date,
      timeToRead || `Tech, leadership and people`,
    ]).map((e, i, a) => (
      <React.Fragment key={e}>
        {e} {sep}
      </React.Fragment>
    ));
    return (
      <div className={cx(`Bio`, className)}>
        <img
          className="Bio__image"
          src={profilePic}
          alt={`Chance Strickland headshot`}
        />
        <div className="Bio__info">
          <H className="Bio__heading">{this.renderName()}</H>
          <p className="Bio__description">
            {description}
            <a
              className="Bio__iconLink"
              href="https://twitter.com/chancethedev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon className="Bio__twitterIcon" />
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Bio;
