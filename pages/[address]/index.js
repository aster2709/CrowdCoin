import React from "react";
import Campaign from "../../ethereum/campaign";
import Link from "next/link";
import web3 from "../../ethereum/web3";
import SummaryList from "../../components/SummaryList";
import Back from "../../components/Back";

export async function getServerSideProps(context) {
  const campaign = Campaign(context.params.address);
  const summary = await campaign.methods.getSummary().call();
  return {
    props: {
      addr: context.params.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approverCount: summary[3],
      manager: summary[4],
    },
  };
}

class Details extends React.Component {
  render() {
    const {
      addr,
      minimumContribution,
      balance,
      requestCount,
      approverCount,
      manager,
    } = this.props;
    const items = [
      {
        title: "Manager",
        desc: manager,
        meta: "The manager is the owner of the campaign",
      },
      {
        title: "Minimum Contribution",
        desc: minimumContribution,
        meta:
          "You must contribute at least this much wei to become an approver",
      },
      {
        title: "Request Count",
        desc: requestCount,
        meta: "A request tries to withdraw money",
      },
      {
        title: "Contributors",
        desc: approverCount,
        meta: "Number of contributors to this campaign",
      },
      {
        title: "Total Funded",
        desc: web3.utils.fromWei(balance, "ether"),
        meta: "Total amount funded for this campaign",
      },
    ];
    return (
      <div>
        <Back />
        <div className="flex p-3">
          <SummaryList items={items} />
          <div className="flex flex-col">
            <Link href={`/${addr}/contribute`}>
              <a>
                <button className="text-center w-36 py-0 px-2 bg-green-600 text-white rounded h-9 mr-3 shadow mt-4">
                  Contribute
                </button>
              </a>
            </Link>
            <Link href={`/${addr}/requests`}>
              <a>
                <button className="text-center w-36 py-0 px-2 bg-purple-600 text-white rounded h-9 mr-3 shadow mt-4">
                  View Requests
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
  }
}

export default Details;
