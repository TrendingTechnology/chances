import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import Layout from '../components/Layout';

class Confirm extends Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    return (
      <Layout location={this.props.location} title={siteTitle}>
      <h1>404: Not Found</h1>
        <h1>Just one more thing...</h1>
        <p>
          Thank you for subscribing. You will need to check your inbox and
          confirm your subscription.
        </p>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query ConfirmSiteData {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Confirm;