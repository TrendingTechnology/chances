import React, { useState, useContext } from 'react';
import Helmet from 'react-helmet';
import { uniq, uniqueId } from 'lodash';
import cx from 'classnames';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeContext } from '../../providers/ThemeProvider';
import HomeHeader from '../HomeHeader';
import Burger from '../Burger';
import BlogHeader from '../BlogHeader';
import Footer from '../Footer';
import GithubButton from '../GithubButton';
import SidePanel from '../SidePanel';
import DarkModeToggle from '../DarkModeToggle';
import Menu from '../Menu';
import { Fonts, webFonts } from '../../utils/fonts';
import { usePromise } from '../../utils/hooks';
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

const Layout = ({
  className,
  location,
  title,
  subtitle,
  date,
  image,
  header: headerProp,
  imageAlt,
  timeToRead,
  updated,
  children,
  handleSearchChange,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [fontsLoaded, fontError, fontState] = usePromise(Fonts(), []);
  const [menuIsActive, setMenuActiveState] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const rootPath = `${__PATH_PREFIX__}/`; // eslint-disable-line
  const toggleMenu = () => setMenuActiveState(!menuIsActive);
  const renderFontLinks = () =>
    uniq(Object.values(webFonts)).map(val => (
      <link key={val} rel="stylesheet" href={val} />
    ));
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
        updated={updated}
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
        <div className={cx('Layout', className)}>
          <Helmet
            bodyAttributes={{
              class: cx({
                darkMode,
                loaded: fontError ? true : Boolean(fontsLoaded),
              }),
            }}
          >
            {renderFontLinks()}
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
                onClick={toggleMenu}
                isActive={menuIsActive}
                label="Toggle additional controls"
              />
              <SidePanel
                className="Layout__menuWrapper"
                isActive={menuIsActive}
                aria-hidden={!menuIsActive}
              >
                <DarkModeToggle
                  className="Layout__darkModeToggle"
                  tabIndex={(!menuIsActive && -1).toString()}
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
      )}
    />
  );
};

export default Layout;
