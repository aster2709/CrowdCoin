import React from "react";
import Campaign from "../../../ethereum/campaign";
import RequestList from "../../../components/RequestList";

export const getServerSideProps = async (context) => {
  const addr = context.params.address;
  const campaign = Campaign(addr);
  const requestCount = await campaign.methods.getRequestCount().call();
  const approverCount = await campaign.methods.approverCount().call();
  const requests = await Promise.all(
    Array(requestCount)
      .fill()
      .map((request, index) => campaign.methods.requests(index).call())
  );
  console.log(requests);
  return {
    props: {
      approverCount: approverCount,
      requests: JSON.stringify(requests),
      addr: addr,
    },
  };
};

const ViewRequests = ({ requests, approverCount, addr }) => (
  <div>
    <RequestList
      requests={JSON.parse(requests)}
      approverCount={approverCount}
      addr={addr}
    />
  </div>
);

export default ViewRequests;
