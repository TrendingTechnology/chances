import React from 'react';
import Bio from '@components/Bio';
import BlogSearch from '@components/BlogSearch';
import './HomeHeader.css';

const HomeHeader = ({ handleSearchChange }) => (
  <div className="HomeHeader">
    <Bio className="HomeHeader__bio" headingEl="h1" />
    <BlogSearch
      className="HomeHeader__search"
      handleChange={handleSearchChange}
    />
  </div>
);

export default HomeHeader;
