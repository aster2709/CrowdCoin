import React from "react";

const Summary = ({ summary, index }) => (
  <div className="flex flex-col justify-between shadow rounded-md p-4 bg-gray-50 w-72 break-words m-4 h-40">
    <p className="underline">{summary.title}</p>
    <p className={index ? `font-semibold text-xl` : ``}>{summary.desc}</p>
    <p className="text-gray-600">{summary.meta}</p>
  </div>
);

export default Summary;
