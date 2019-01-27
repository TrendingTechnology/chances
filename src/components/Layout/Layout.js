import React from 'react';
import Helmet from 'react-helmet';
import { uniq } from 'lodash';
import cx from 'classnames';
import { Consumer } from '../Context';
import Bio from '../Bio';
import Burger from '../Burger';
import BlogHeader from '../BlogHeader';
import Footer from '../Footer';
import GithubButton from '../GithubButton';
import SidePanel from '../SidePanel';
import Toggle from '../Toggle';
import { Fonts, webFonts } from '../../utils/fonts';
import './Layout.css';

class Layout extends React.Component {
  async componentDidMount() {
    await Fonts();
  }

  state = {
    menuIsActive: false,
  };

  toggleMenu = () =>
    this.setState(state => ({ menuIsActive: !state.menuIsActive }));

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
      imageAlt,
      timeToRead,
      children,
    } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`; // eslint-disable-line
    let header;

    if (location.pathname === rootPath) {
      header = <Bio className="Layout__headerBio" headingEl="h1" />;
    } else {
      header = (
        <BlogHeader
          title={title}
          subtitle={subtitle}
          timeToRead={timeToRead}
          date={date}
          image={image}
          imageAlt={imageAlt}
        />
      );
    }
    return (
      <Consumer>
        {({ darkMode, toggleDarkMode }) => (
          <div className={cx('Layout', className)}>
            <Helmet bodyAttributes={{ class: cx({ darkMode }) }}>
              {this.renderFontLinks()}
            </Helmet>
            <header
              className={cx(`Layout__header`, {
                'Layout__header--wide': location.pathname !== rootPath && image,
              })}
            >
              {header}
              <hr className="Layout__break" />
              <div className="Layout__fixed">
                <GithubButton
                  className="Layout__forkButton"
                  aria-label="Fork on GitHub"
                  label="Fork"
                />
                <Burger
                  className="Layout__burger"
                  onClick={this.toggleMenu}
                  isActive={this.state.menuIsActive}
                />
                <SidePanel
                  className="Layout__menuWrapper"
                  isActive={this.state.menuIsActive}
                >
                  <label
                    htmlFor="darkModeToggle"
                    className="Layout__darkModeLabel"
                  >
                    Dark Mode
                  </label>
                  <Toggle
                    id="darkModeToggle"
                    className="Layout__darkModeToggle"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    label="Toggle between dark and light mode"
                  />
                </SidePanel>
              </div>
            </header>
            <main className="Layout__main">{children}</main>
            <Footer className="Layout__footer" />
          </div>
        )}
      </Consumer>
    );
  }
}

export default Layout;
