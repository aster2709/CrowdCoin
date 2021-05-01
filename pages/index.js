import React from "react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import Link from "next/link";
import CampaignList from "../components/CampaignList";

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns,
    },
  };
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="flex ml-3">
          <p className="text-lg font-serif">Running Campaigns</p>
          <Link href={`/new`}>
            <a>
              <button className="ml-4 bg-green-500 py-1 px-2 text-white rounded shadow">
                Create New
              </button>
            </a>
          </Link>
        </div>
        <CampaignList campaigns={this.props.campaigns} />
      </div>
    );
  }
}
export default Home;
