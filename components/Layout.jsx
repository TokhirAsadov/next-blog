import React from 'react';
import {Header} from "./index";
import FeaturedPosts from "../section/FeaturedPosts";

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <FeaturedPosts />
      {children}
    </>
  );
};

export default Layout;