import React from "react";
import Header from "./header";

const Layout = (props) => {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Header></Header>
      {props.children}
    </div>
  );
};

export default Layout;
