import React from "react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import Link from "next/link";
import Back from "../components/Back";

class NewCampaign extends React.Component {
  state = {
    minimumContribution: "",
    title: "",
    errorMessage: "",
    loading: false,
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ errorMessage: "", loading: true });
    try {
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <div>
        <Back />
        {this.state.loading ? (
          <p className="text-2xl p-5">⌛Transaction ongoing, please wait</p>
        ) : null}
        <div className="p-5">
          <form
            className="bg-white p-4 shadow-md rounded w-1/3"
            onSubmit={this.handleSubmit}
          >
            <div className="mb-4">
              <p className="font-semibold text-lg">Create a new campaign</p>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Campaign Title</label>
              <input
                required
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
                type="text"
                className="py-1 px-2 w-full border-2 border-gray-500 rounded-lg outline-none"
                placeholder="Value in Wei"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Minimum Contribution</label>
              <input
                value={this.state.minimumContribution}
                onChange={(e) =>
                  this.setState({ minimumContribution: e.target.value })
                }
                type="text"
                className="py-1 px-2 w-full border-2 border-gray-500 rounded-lg outline-none"
                placeholder="Value in Wei"
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
      </div>
    );
  }
}

export default NewCampaign;
