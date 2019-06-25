import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import Layout from '@components/Layout';
import BookExcerpt from '@components/BookExcerpt';
import SEO from '@components/SEO';

const BooksPage = ({ data = {}, location }) => {
  const books = get(data, 'allMarkdownRemark.edges');
  return (
    <Layout location={location} title={get(data, 'site.siteMetadata.title')}>
      <SEO />
      {books.length > 0 ? (
        books.map(({ node }) => {
          return (
            <BookExcerpt
              key={node.fields.slug}
              title={get(node, 'frontmatter.title')}
              author={get(node, 'frontmatter.author')}
              spoiler={get(node, 'frontmatter.spoiler')}
              date={get(node, 'frontmatter.date')}
              image={get(node, 'frontmatter.image')}
              imageAlt={get(node, 'frontmatter.imageAlt')}
            />
          );
        })
      ) : (
        <p className="Layout__noPosts">
          No books found.{' '}
          <span role="img" aria-label="Crying sad face">
            😢
          </span>
        </p>
      )}
    </Layout>
  );
};

export default BooksPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "books" } } }
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
            author
            image
            imageAlt
            spoiler
            tags
          }
        }
      }
    }
  }
`;
