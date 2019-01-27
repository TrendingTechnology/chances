import React from 'react';
import Bio from '../Bio';
//import BlogSearch from '../BlogSearch';
import './HomeHeader.css';

const HomeHeader = props => (
  <div className="HomeHeader">
    <Bio className="HomeHeader__bio" headingEl="h1" />
    {/* <BlogSearch className="HomeHeader__search" /> */}
  </div>
);

export default HomeHeader;
