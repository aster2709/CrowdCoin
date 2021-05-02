import React from "react";
import RequestBox from "./RequestBox";

class RequestList extends React.Component {
  render() {
    const { requests, approverCount, addr } = this.props;
    return (
      <div className="flex flex-wrap w-4/5 justify-center">
        {requests.map((request, index) => (
          <RequestBox
            key={index}
            request={request}
            index={index}
            approverCount={approverCount}
            handleFinalize={this.handleFinalize}
            handleApprove={this.handleApprove}
            addr={addr}
          />
        ))}
      </div>
    );
  }
}

export default RequestList;
