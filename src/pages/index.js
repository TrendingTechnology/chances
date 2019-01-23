import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostExcerpt from '../components/PostExcerpt';
import { formatReadingTime } from '../utils/helpers';

class BlogIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges').filter(
      ({ node }) => node.fields.langKey === 'en'
    );

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        {posts.map(({ node }) => (
          <PostExcerpt
            title={get(node, 'frontmatter.title') || node.fields.slug}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            timeToRead={formatReadingTime(node.timeToRead)}
            spoiler={node.frontmatter.spoiler}
          />
        ))}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            langKey
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            spoiler
            image
          }
        }
      }
    }
  }
`;
