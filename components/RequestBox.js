import React from "react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestBox extends React.Component {
  state = {
    errorMessage: "",
    loading: false,
  };
  handleApprove = async () => {
    const campaign = Campaign(this.props.addr);
    const accounts = await web3.eth.getAccounts();
    this.setState({ errorMessage: "", loading: true });
    try {
      await campaign.methods
        .approveRequest(this.props.index)
        .send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  handleFinalize = async () => {
    const campaign = Campaign(this.props.addr);
    const accounts = await web3.eth.getAccounts();
    this.setState({ errorMessage: "", loading: true });
    try {
      await campaign.methods
        .finalizeRequest(this.props.index)
        .send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    const { request, index, approverCount } = this.props;
    return (
      <div
        className={`shadow border-2 rounded-md ${
          request.completed ? `border-gray-500` : `border-purple-400`
        } p-3 m-3 flex flex-col justify-around w-2/5`}
      >
        {this.state.loading ? (
          <p className="text-2xl">⌛Transaction ongoing, please wait</p>
        ) : null}
        {!!this.state.errorMessage ? (
          <div className="flex flex-col rounded bg-red-100 p-3 text-red-700 mb-4 overflow-hidden">
            <p className="text-lg font-semibold">Oops!</p>
            <p className="text-sm">{this.state.errorMessage}</p>
          </div>
        ) : null}
        <div className="flex justify-between">
          <p className="border-b border-gray-300 text-gray-600">
            Request no{" "}
            <span className="text-black text-lg font-medium">{index + 1}</span>
          </p>
          <button
            onClick={this.handleFinalize}
            className={`${
              request.completed
                ? `bg-gray-500 pointer-events-none`
                : `bg-blue-600`
            } rounded-lg shadow py-1 px-2 text-white font-md`}
          >
            {request.completed ? `Completed` : `Finalize`}
          </button>
        </div>
        <p>{request.complete}</p>
        <p className="text-2xl font-semibold text-gray-800">{request.desc}</p>
        <p>{web3.utils.fromWei(request.amount, "ether")} ETH</p>
        <div className="bg-red-200 shadow-lg rounded-lg border-1 border-red-400 py-1 px-2 text-center">
          {request.recipient}
        </div>
        <p className="font-md text-gray-800">
          Approve count:{" "}
          <span className="text-lg">
            {request.approveCount}/{approverCount}
          </span>
        </p>
        <button
          onClick={this.handleApprove}
          className={`hover:bg-purple-700 rounded-lg shadow py-1 px-2 text-white font-md ${
            request.completed
              ? `pointer-events-none bg-gray-500`
              : `bg-purple-600`
          }`}
        >
          Approve
        </button>
      </div>
    );
  }
}

export default RequestBox;
