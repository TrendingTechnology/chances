import React from 'react';
import Helmet from 'react-helmet';
import { uniq, uniqueId } from 'lodash';
import cx from 'classnames';
import { StaticQuery, graphql } from 'gatsby';
import { Consumer } from '../Context';
import HomeHeader from '../HomeHeader';
import Burger from '../Burger';
import BlogHeader from '../BlogHeader';
import Footer from '../Footer';
import GithubButton from '../GithubButton';
import SidePanel from '../SidePanel';
import DarkModeToggle from '../DarkModeToggle';
import Menu from '../Menu';
import { Fonts, webFonts } from '../../utils/fonts';
import './Layout.css';

const MENU_ITEMS = [
  {
    label: 'Posts',
    href: '/',
  },
  {
    label: 'Books',
    href: '/books',
  },
].map((item, id) => ({ ...item, id }));

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
      header: headerProp,
      imageAlt,
      timeToRead,
      children,
      handleSearchChange,
    } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`; // eslint-disable-line
    let header;

    if (location.pathname === rootPath) {
      header = (
        <HomeHeader
          className="Layout__homeHeader"
          handleSearchChange={handleSearchChange}
        />
      );
    } else if (headerProp) {
      header = headerProp;
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
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <Consumer>
            {({ darkMode }) => {
              return (
                <div className={cx('Layout', className)}>
                  <Helmet bodyAttributes={{ class: cx({ darkMode }) }}>
                    {this.renderFontLinks()}
                  </Helmet>
                  <header
                    className={cx(`Layout__header`, {
                      'Layout__header--wide':
                        location.pathname !== rootPath && image,
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
                        aria-hidden={!this.state.menuIsActive}
                      >
                        <DarkModeToggle
                          className="Layout__darkModeToggle"
                          tabIndex={(!this.state.menuIsActive && -1).toString()}
                        />
                        {/* <nav>
                          <Menu items={MENU_ITEMS} />
                        </nav> */}
                      </SidePanel>
                    </div>
                  </header>
                  <main className="Layout__main">{children}</main>
                  <Footer className="Layout__footer" />
                </div>
              );
            }}
          </Consumer>
        )}
      />
    );
  }
}

export default Layout;
