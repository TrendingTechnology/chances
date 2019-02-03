import React, { PureComponent } from 'react';
import T from 'prop-types';
import cx from 'classnames';
import { Link } from 'gatsby';
import shape from '../../utils/types/menuItem';
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
 *
 * @class Menu
 * @extends {PureComponent}
 */
class Menu extends PureComponent {
  static propTypes = {
    className: T.string,
    items: T.arrayOf(shape).isRequired,
  };

  renderSubMenu = children => {
    if (children && children.length) {
      return (
        <ul className="Menu__submenu">{this.renderMenuItems(children)}</ul>
      );
    }
  };

  renderMenuItems = items =>
    items.map(item => {
      const { id, href, options, children } = item;
      const { target, className } = options || {};

      return (
        <MenuItem
          className={className}
          key={id}
          hasChildren={!!(children && children.length)}
        >
          <MenuLink href={href} label={item.label} target={target} />
          {this.renderSubMenu(children)}
        </MenuItem>
      );
    });

  render() {
    const { className, items } = this.props;
    return (
      <ul className={cx('Menu', className)}>{this.renderMenuItems(items)}</ul>
    );
  }
}

export default Menu;
