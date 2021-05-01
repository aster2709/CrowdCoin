import React from "react";
import Summary from "./Summary";

const SummaryList = ({ items }) => (
  <div className="flex flex-wrap w-3/4">
    {items.map((summary, index) => (
      <Summary summary={summary} key={index} index={index} />
    ))}
  </div>
);

export default SummaryList;
