import React from "react";
import Campaign from "./Campaign";

const CampaignList = ({ campaigns }) => {
  return (
    <div>
      {campaigns.map((addr, index) => (
        <Campaign addr={addr} key={index} />
      ))}
    </div>
  );
};

export default CampaignList;
