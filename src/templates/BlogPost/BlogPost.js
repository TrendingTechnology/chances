import React, { Component } from 'react';
import cx from 'classnames';
import { Link, graphql } from 'gatsby';
import Bio from '../../components/Bio';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { formatReadingTime } from '../../utils/helpers';
import './BlogPost.css';

const GITHUB_USERNAME = 'chancestrickland';
const GITHUB_REPO_NAME = 'chances';

class BlogPost extends Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { previous, next, slug } = this.props.pageContext;
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages/${slug}/index.md`;
    const shareUrl = `https://twitter.com/home?status=${encodeURIComponent(
      `${post.frontmatter.title} https://chancedigital.io/${slug}`
    )}`;
    return (
      <Layout
        location={this.props.location}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        updated={post.frontmatter.updated}
        subtitle={post.frontmatter.subtitle}
        image={post.frontmatter.image}
        imageAlt={post.frontmatter.imageAlt}
        timeToRead={formatReadingTime(post.timeToRead)}
        className="BlogPost"
      >
        <SEO
          lang="en"
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          slug={post.fields.slug}
        />
        <article
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="BlogPost__mainContent"
        />
        <nav className="BlogPost__footerNav">
          <ul className="BlogPost__footerNavMenu">
            <li className="BlogPost__footerNavItem">
              <a
                className="BlogPost__footerNavLink"
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share on Twitter
              </a>
            </li>
            <li className="BlogPost__footerNavItem">
              <a
                className="BlogPost__footerNavLink"
                href={editUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Edit on GitHub
              </a>
            </li>
          </ul>
        </nav>
        <aside>
          <Bio nameLink="/" />
        </aside>
        <nav className="BlogPost__postNav">
          <ul className="BlogPost__postNavMenu">
            <li
              className={cx('BlogPost__postNavItem', {
                'BlogPost__postNavItem--prev': previous,
              })}
            >
              {previous && (
                <Link
                  className="BlogPost__postNavLink"
                  to={previous.fields.slug}
                  rel="prev"
                >
                  {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li
              className={cx('BlogPost__postNavItem', {
                'BlogPost__postNavItem--next': next,
              })}
            >
              {next && (
                <Link
                  className="BlogPost__postNavLink"
                  to={next.fields.slug}
                  rel="next"
                >
                  {next.frontmatter.title}
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    );
  }
}

export default BlogPost;

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM D, YYYY")
        langs
        spoiler
        image
        imageAlt
        updated(formatString: "MMMM D, YYYY")
      }
      fields {
        slug
      }
    }
  }
`;
