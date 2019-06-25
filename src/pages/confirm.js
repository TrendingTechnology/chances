import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import Layout from '../components/Layout';

const Confirm = ({ data = {}, location }) => {
  return (
    <Layout location={location} title={get(data, 'site.siteMetadata.title')}>
      <h1>Just one more thing...</h1>
      <p>
        Thank you for subscribing. You will need to check your inbox and confirm
        your subscription.
      </p>
    </Layout>
  );
};

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
