import React from "react";

const Box = ({ request, id }) => {
  return (
    <div
      className={
        `flex flex-col justify-around shadow-md rounded-md p-4 bg-gray-50 w-72 break-words m-4` +
        request.complete
          ? "border-green-400"
          : "border-purple-400"
      }
    >
      <p className="underline">No. {id}</p>
      <p className={i ? `font-semibold text-xl` : ``}>{request.desc}</p>
      <p className="">{request.amount}</p>
      <p className="">{request.recipient}</p>
      <p className="">{request.approveCount}</p>
    </div>
  );
};
export default Box;
