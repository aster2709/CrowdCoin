import React from "react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import Layout from "../components/layout";
import Link from "next/link";

export async function getStaticProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns,
    },
  };
}

class Home extends React.Component {
  renderCampaigns = () => {
    return this.props.campaigns.map((addr) => {
      return (
        <div className="mt-3 p-3 flex justify-between shadow rounded items-center bg-gray-50">
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
      );
    });
  };
  render() {
    return (
      <Layout>
        <div className="p-5">
          <div className="flex">
            <p className="text-lg font-serif">Running Campaigns</p>
            <Link href={`/new`}>
              <a>
                <button className="ml-4 bg-green-500 py-1 px-2 text-white rounded shadow">
                  Create New
                </button>
              </a>
            </Link>
          </div>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}
export default Home;
