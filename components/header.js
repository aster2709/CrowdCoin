import React from "react";
import Head from "next/head";

const Header = () => {
  return (
    <div>
      <Head>
        <script
          src="https://kit.fontawesome.com/b4d52cbeba.js"
          crossorigin="anonymous"
        ></script>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rochester&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div id="navbar" className="p-4 bg-gray-50 shadow">
        <div className="flex mx-auto justify-between w-48 items-center">
          <i class="fas fa-users fa-2x text-purple-600"></i>
          <h2 className="text-3xl font-display text-purple-600">CrowdCoin</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
