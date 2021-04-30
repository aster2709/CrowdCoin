import React from "react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import Layout from "../components/layout";
import Link from "next/link";

export async function getStaticProps() {
  const accounts = await web3.eth.getAccounts();
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
            <p>Description</p>
            <p>Campaign address {addr}</p>
          </div>
          <button className="py-0 px-2 bg-purple-600 text-white rounded h-9 mr-3 shadow">
            View Details
          </button>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="h-screen bg-gray-100">
        <Layout>
          <div className="p-5">
            <p className="text-lg font-serif">Running Campaigns</p>
            {this.renderCampaigns()}
          </div>
        </Layout>
      </div>
    );
  }
}
export default Home;
