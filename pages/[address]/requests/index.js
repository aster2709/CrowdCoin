import React from "react";
import Campaign from "../../../ethereum/campaign";
import Box from "../../../components/box";
import Layout from "../../../components/Layout";
import { withRouter } from "next/router";

class ViewRequests extends React.Component {
  state = {
    errorMessage: "",
  };
  anything = async () => {
    const { address } = this.props.router.query;
    const campaign = Campaign(address);
    console.log(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    console.log(requestCount);
    const requests = await Promise.all(
      Array(+requestCount)
        .fill()
        .map((x, i) => {
          return campaign.methods.requests(i).call();
        })
    );
    console.log(requests);
    return requests.map((request, id) => {
      return <Box key={id} request={request} id={id} />;
    });
  };
  render() {
    return <Layout>{this.anything()}</Layout>;
  }
}

export default withRouter(ViewRequests);
