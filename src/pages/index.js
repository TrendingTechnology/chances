import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
// import cx from 'classnames';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import PostExcerpt from '@components/PostExcerpt';
import { formatReadingTime, unSlashIt } from '@lib/utils';
import stripTags from 'striptags';

const BlogIndex = ({ data = {}, location }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = e => {
    const { value } = e.target || '';
    const newValue = value.toLowerCase();
    if (searchValue !== newValue) setSearchValue(newValue);
  };

  const siteTitle = get(data, 'site.siteMetadata.title');
  const description = get(data, 'site.siteMetadata.description');
  const posts = get(data, 'allMarkdownRemark.edges').filter(({ node }) => {
    const postTitle = get(node, 'frontmatter.title') || node.fields.slug || '';
    const postContent = get(node, 'html') || '';
    const tags = get(node, 'frontmatter.tags') || [];
    const searchTitle = postTitle.toLowerCase();
    const searchContent = stripTags(postContent).toLowerCase();
    const searchTags = tags.map(tag => tag.toLowerCase()).join(' ');
    const match =
      searchValue &&
      (searchContent.includes(searchValue) ||
        searchTitle.includes(searchValue) ||
        searchTags.includes(searchValue));
    return !searchValue || match;
  });

  return (
    <Layout
      location={location}
      title={siteTitle}
      handleSearchChange={handleSearchChange}
    >
      <SEO
        description={description}
        image={`${unSlashIt(
          location.href || 'https://chances.tech'
        )}/headshot.jpg`}
        title={siteTitle}
        pathname="/"
      />
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
};

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
