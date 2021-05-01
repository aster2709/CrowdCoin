import React from "react";
import Head from "next/head";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <Head>
        <script
          src="https://kit.fontawesome.com/b4d52cbeba.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <div id="navbar" className="p-4 bg-gray-50 shadow">
        <div className="flex mx-auto justify-between w-48 items-center">
          <i aria-hidden className="fas fa-users fa-2x text-purple-600"></i>
          <Link href="/">
            <a>
              <h2 className="text-3xl font-display text-purple-600">
                CrowdCoin
              </h2>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
