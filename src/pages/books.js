import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import Layout from '../components/Layout';
import BookExcerpt from '../components/BookExcerpt';
import SEO from '../components/SEO';

class BooksPage extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const books = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout location={this.props.location} title={siteTitle}>
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
  }
}

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
