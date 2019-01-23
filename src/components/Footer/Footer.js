import React from 'react';
import cx from 'classnames';
import './Footer.css';

class Footer extends React.Component {
  render() {
    const { className } = this.props;
    const items = [
      {
        href: '/rss.xml',
        label: 'RSS',
      },
      {
        href: 'https://twitter.com/chancethedev',
        label: 'Twitter',
      },
      {
        href: 'https://github.com/chancestrickland',
        label: 'GitHub',
      },
      {
        href: 'https://stackoverflow.com/users/1792019/chance-strickland',
        label: 'Stack Overflow',
      },
      {
        href: 'https://www.linkedin.com/in/chancestrickland/',
        label: 'LinkedIn',
      },
    ];
    return (
      <footer className={cx('Footer', className)}>
        <hr />
        <div className="Footer__bottom">
          <nav className="Footer__nav">
            <ul className="Footer__menu">
              {items.map(({ href, label }) => (
                <li className="Footer__menuItem" key={label}>
                  <a
                    className="Footer__menuLink"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <span className="Footer__credit">
            &copy; {new Date().getFullYear()}. Built with React and Gatsby.js. Any visual similarities to other blogging platforms is entirely coincidental.
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
