import React, { useState, useContext } from 'react';
import Helmet from 'react-helmet';
import { uniq } from 'lodash';
import cx from 'classnames';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeContext, FontContext } from '@providers';
import HomeHeader from '@components/HomeHeader';
import Burger from '@components/Burger'; /*  */
import BlogHeader from '@components/BlogHeader';
import Footer from '@components/Footer';
import GithubButton from '@components/GithubButton';
import SidePanel from '@components/SidePanel';
import DarkModeToggle from '@components/DarkModeToggle';
// import Menu from '@components/Menu';
import { webFonts } from '@lib/fonts';
import './Layout.css';

/* const MENU_ITEMS = [
  {
    label: 'Posts',
    href: '/',
  },
  {
    label: 'Books',
    href: '/books',
  },
].map((item, id) => ({ ...item, id })); */

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
  const [menuIsActive, setMenuActiveState] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const { fontsLoaded, fontError } = useContext(FontContext);
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
        <React.Fragment>
          <aside className="Layout__fixed">
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
          </aside>
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
            </header>
            <main className="Layout__main">{children}</main>
            <Footer className="Layout__footer" />
          </div>
        </React.Fragment>
      )}
    />
  );
};

export default Layout;
