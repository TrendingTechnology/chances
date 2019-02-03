import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { get, lowerCase } from 'lodash';
import cx from 'classnames';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostExcerpt from '../components/PostExcerpt';
import { formatReadingTime } from '../utils/helpers';
import stripTags from 'striptags';

class BlogIndex extends Component {
  state = {
    searchValue: '',
  };

  handleSearchChange = e => {
    this.setState(state => {
      const searchValue = lowerCase(e.target.value);
      if (state.searchValue !== searchValue) {
        return { searchValue };
      }
    });
  };

  render() {
    const { searchValue } = this.state;
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges').filter(
      ({ node }) => {
        const postTitle = get(node, 'frontmatter.title') || node.fields.slug;
        const postContent = get(node, 'html') || '';
        const tags = get(node, 'frontmatter.tags') || [];
        const searchTitle = lowerCase(postTitle);
        const searchContent = lowerCase(stripTags(postContent));
        const searchTags = tags.map(tag => lowerCase(tag)).join(' ');
        const match =
          searchValue &&
          (searchContent.includes(searchValue) ||
            searchTitle.includes(searchValue) ||
            searchTags.includes(searchValue));
        return !searchValue || match;
      }
    );

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        handleSearchChange={this.handleSearchChange}
      >
        <SEO />
        {posts.length > 0 ? (
          posts.map(({ node }) => {
            return (
              <PostExcerpt
                key={node.fields.slug}
                title={get(node, 'frontmatter.title') || node.fields.slug}
                slug={node.fields.slug}
                date={node.frontmatter.date}
                timeToRead={formatReadingTime(node.timeToRead)}
                spoiler={node.frontmatter.spoiler}
              />
            );
          })
        ) : (
          <p className="Layout__noPosts">
            No posts found.{' '}
            <span role="img" aria-label="Crying sad face">
              😢
            </span>
          </p>
        )}
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
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "posts" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          html
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            spoiler
            tags
          }
        }
      }
    }
  }
`;
