import React from 'react';
import HamburgerIcon from './HamburgerIcon';

const TableOfContents = ({ showIcon }) => (
  <div className="table-of-contents">
    {showIcon && <HamburgerIcon />}
   
  </div>
);

export default TableOfContents;
