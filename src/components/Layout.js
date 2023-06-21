import React from "react";
import Footer from "./Footer";
import NavbarBeranda from "./beranda/NavbarBeranda";

const LayoutComponent = (props) => {
  return (
    <>
      <NavbarBeranda />
      <div className="row">
        <div>{props.children}</div>
      </div>
      <Footer />
    </>
  );
};

export default LayoutComponent;