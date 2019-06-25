import React from 'react';
import T from 'prop-types';
import cx from 'classnames';
import { Link } from 'gatsby';
import menuItemShape from '../../utils/types/menuItem';
import './Menu.css';

/**
 * MenuItem component.
 *
 * @param {Object} obj - Component props.
 * @param {string} obj.className - Passed DOM element class.
 * @param {string} obj.children - React children.
 * @param {string} obj.hasChildren - Whether or not the item has children.
 */
const MenuItem = ({ className, children, hasChildren }) => (
  <li
    className={cx('Menu__item', className, {
      'Menu__item--has-children': hasChildren,
    })}
  >
    {children}
  </li>
);

MenuItem.defaultProps = {
  hasChildren: false,
};

MenuItem.propTypes = {
  hasChildren: T.bool,
  className: T.string,
  children: T.oneOfType([T.arrayOf(T.node), T.node]),
};

/**
 * MenuLink component.
 *
 * @param {Object} obj - Component props.
 * @param {string} obj.href - Link's target location.
 * @param {string} obj.target - Anchor tag's target attribute.
 * @param {string} obj.label - Wrapped content inside the anchor tag.
 */
const MenuLink = ({ href, target, label }) =>
  href ? (
    <Link
      target={target}
      className="Menu__link"
      to={href}
      rel={target === '_blank' ? 'noopener noreferrer' : null}
    >
      {label}
    </Link>
  ) : (
    <span className="Menu__link">{label}</span>
  );

MenuLink.propTypes = {
  href: T.string,
  label: T.node,
  target: T.oneOf(['_blank', '_self', '_parent', '_top']),
};

/**
 * Menu component
 */
const Menu = ({ className, items }) => {
  const renderSubMenu = children => {
    if (children && children.length) {
      return <ul className="Menu__submenu">{renderMenuItems(children)}</ul>;
    }
  };

  const renderMenuItems = its =>
    its.map(item => {
      const { id, href, options, children: kids } = item;
      const { target, className: clsName } = options || {};

      return (
        <MenuItem
          className={clsName}
          key={id}
          hasChildren={!!(kids && kids.length)}
        >
          <MenuLink href={href} label={item.label} target={target} />
          {renderSubMenu(kids)}
        </MenuItem>
      );
    });

  return <ul className={cx('Menu', className)}>{renderMenuItems(items)}</ul>;
};

Menu.propTypes = {
  className: T.string,
  items: T.arrayOf(menuItemShape).isRequired,
};

export default Menu;
