import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

const Layout = () => {
  return (
    <>
      <Mobile>
        <Header />
        <Outlet />
        <Footer />
      </Mobile>
      <Tablet>
        <Header />
        <Outlet />
        <Footer />
      </Tablet>
      <Desktop>
        <Header />
        <Outlet />
        <Footer />
      </Desktop>
    </>
  );
};

export default Layout;
