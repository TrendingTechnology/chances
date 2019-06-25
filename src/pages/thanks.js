import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import Layout from '../components/Layout';

const Thanks = ({ data = {}, location }) => {
  const siteTitle = get(data, 'site.siteMetadata.title');
  return (
    <Layout location={location} title={siteTitle}>
      <h1>Thank you for subscribing.</h1>
      <p>
        You are now confirmed. You can expect to receive emails as I create new
        content.
      </p>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ThanksSiteData {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Thanks;
