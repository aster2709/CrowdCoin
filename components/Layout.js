import React from "react";
import Header from "./header";

const Layout = (props) => {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Header></Header>
      <div id="Container" className="p-6">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
