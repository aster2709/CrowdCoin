import React from "react";
import Campaign from "../../../ethereum/campaign";
import RequestList from "../../../components/RequestList";
import Link from "next/link";
import Back from "../../../components/Back";

export const getServerSideProps = async (context) => {
  const addr = context.params.address;
  const campaign = Campaign(addr);
  const requestCount = await campaign.methods.getRequestCount().call();
  const approverCount = await campaign.methods.approverCount().call();
  console.log(requestCount);
  const requests = await Promise.all(
    Array(+requestCount)
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
    <Back />

    <div className="flex">
      <RequestList
        requests={JSON.parse(requests)}
        approverCount={approverCount}
        addr={addr}
      />
      <div className="flex flex-col">
        <Link href={`/${addr}/contribute`}>
          <a>
            <button className="text-center w-36 py-0 px-2 bg-green-600 text-white rounded h-9 mr-3 shadow mt-4">
              Contribute
            </button>
          </a>
        </Link>

        <Link href={`/${addr}/requests/new`}>
          <a>
            <button className="text-center w-36 py-0 px-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded h-9 mr-3 shadow mt-4">
              Create Request
            </button>
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export default ViewRequests;
