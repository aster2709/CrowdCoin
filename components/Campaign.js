import React from "react";
import Link from "next/link";

const Campaign = ({ addr }) => (
  <div>
    <div className="m-3 p-3 flex justify-between shadow rounded items-center bg-gray-50">
      <div className="flex flex-col ml-3">
        <p>
          Campaign address <span className="font-bold">{addr}</span>
        </p>
        <Link href={`/${addr}`}>
          <a className="text-sm text-blue-600">View Campaign</a>
        </Link>
      </div>
      <div className="flex justify-between">
        <Link href={`/${addr}/contribute`}>
          <a>
            <button className="py-0 px-2 bg-green-500 text-white rounded-lg h-9 mr-3 shadow">
              Contribute
            </button>
          </a>
        </Link>
        <Link href={`/${addr}`}>
          <a>
            <button className="py-0 px-2 bg-purple-600 text-white rounded-lg h-9 mr-3 shadow">
              View Details
            </button>
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export default Campaign;
