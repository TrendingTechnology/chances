import React from 'react';
import Helmet from 'react-helmet';
import { uniq } from 'lodash';
import cx from 'classnames';
import Bio from '../Bio';
import BlogHeader from '../BlogHeader';
import Footer from '../Footer';
import { Fonts, webFonts } from '../../utils/fonts';
import './Layout.css';

class Layout extends React.Component {
  async componentDidMount() {
    await Fonts();
  }

  renderFontLinks = () =>
    uniq(Object.values(webFonts)).map(val => (
      <link key={val} rel="stylesheet" href={val} />
    ));

  render() {
    const {
      className,
      location,
      title,
      subtitle,
      date,
      image,
      timeToRead,
      children,
    } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`; // eslint-disable-line
    let header;

    if (location.pathname === rootPath) {
      header = <Bio headingEl="h1" />;
    } else {
      header = (
        <BlogHeader
          title={title}
          subtitle={subtitle}
          timeToRead={timeToRead}
          date={date}
          image={image}
        />
      );
    }
    return (
      <div className={cx('Layout', className)}>
        <Helmet>{this.renderFontLinks()}</Helmet>
        <header
          className={cx(`Layout__header`, {
            'Layout__header--wide': location.pathname !== rootPath && image,
          })}
        >
          {header}
          <hr className="Layout__break" />
        </header>
        <main className="Layout__main">{children}</main>
        <Footer className="Layout__footer" />
      </div>
    );
  }
}

export default Layout;