import { withRouter } from "next/router";
import React from "react";
import Campaign from "../../ethereum/campaign";
import Layout from "../../components/layout";
import Link from "next/link";
import web3 from "../../ethereum/web3";

class Details extends React.Component {
  state = {
    minimumContribution: "",
    balance: "",
    requestCount: "",
    approverCount: "",
    manager: "",
  };
  async componentDidMount() {
    const { router } = this.props;
    const { address } = router.query;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    this.setState({
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approverCount: summary[3],
      manager: summary[4],
    });
  }
  render() {
    const address = this.props.router.query.address;
    const items = [
      {
        title: "Manager",
        desc: this.state.manager,
        meta: "The manager is the owner of the campaign",
      },
      {
        title: "Minimum Contribution",
        desc: this.state.minimumContribution,
        meta:
          "You must contribute at least this much wei to become an approver",
      },
      {
        title: "Request Count",
        desc: this.state.requestCount,
        meta: "A request tries to withdraw money",
      },
      {
        title: "Contributors",
        desc: this.state.approverCount,
        meta: "Number of contributors to this campaign",
      },
      {
        title: "Total Funded",
        desc: web3.utils.fromWei(this.state.balance, "ether"),
        meta: "Total amount funded for this campaign",
      },
    ];
    return (
      <Layout>
        <Link href="/">
          <a className="text-blue-400 underline absolute top-18 left-7">Back</a>
        </Link>
        <div className="flex p-3">
          <div className="flex flex-wrap w-3/4">
            {items.map((x, i) => (
              <div className="flex flex-col justify-between shadow rounded-md p-4 bg-gray-50 w-72 break-words m-4 h-40">
                <p className="underline">{x.title}</p>
                <p className={i ? `font-semibold text-xl` : ``}>{x.desc}</p>
                <p className="text-gray-600">{x.meta}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <Link href={`/${address}/contribute`}>
              <a>
                <button className="text-center w-36 py-0 px-2 bg-green-600 text-white rounded h-9 mr-3 shadow mt-4">
                  Contribute
                </button>
              </a>
            </Link>
            <Link href={`/${address}/contribute`}>
              <a>
                <button className="text-center w-36 py-0 px-2 bg-purple-600 text-white rounded h-9 mr-3 shadow mt-4">
                  View Requests
                </button>
              </a>
            </Link>
            <Link href={`/${address}/contribute`}>
              <a>
                <button className="text-center w-36 py-0 px-2 bg-yellow-400 text-white rounded h-9 mr-3 shadow mt-4">
                  Create Request
                </button>
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Details);
