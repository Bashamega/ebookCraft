import React from 'react';
import Nav from './Nav';
import TableOfContents from './TableOfContents';

const Layout = ({ children }) => (
  <div className="layout">
    <Nav />
    <TableOfContents />
    <main>{children}</main>
  </div>
);

export default Layout;
