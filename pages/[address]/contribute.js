import React from "react";
import { withRouter } from "next/router";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import Link from "next/link";

class Contribute extends React.Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false,
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ errorMessage: "", loading: true });
    const { address } = this.props.router.query;
    const campaign = Campaign(address);
    try {
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        {this.state.loading ? (
          <p className="text-2xl p-5">⌛Transaction ongoing, please wait</p>
        ) : null}
        <Link href="/">
          <a className="text-blue-400 underline ml-5">Back</a>
        </Link>
        <div className="p-5">
          <form
            className="bg-white p-4 shadow-md rounded w-1/3"
            onSubmit={this.handleSubmit}
          >
            <div className="mb-4">
              <p className="font-semibold text-lg">Contribute to campaign</p>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Amount</label>
              <input
                required
                value={this.state.value}
                onChange={(e) => this.setState({ value: e.target.value })}
                type="text"
                className="py-1 px-2 w-full border-2 border-gray-500 rounded-lg outline-none"
                placeholder="in Ether"
              />
            </div>
            {!!this.state.errorMessage ? (
              <div className="flex flex-col rounded bg-red-200 p-3 text-red-700 mb-4">
                <p className="text-lg font-semibold">Oops!</p>
                <p className="text-sm">{this.state.errorMessage}</p>
              </div>
            ) : null}
            <button
              className="bg-green-500 py-1 px-2 text-white rounded shadow"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}
export default withRouter(Contribute);
