import React from 'react';
import cx from 'classnames';
import { Link, graphql } from 'gatsby';
import Bio from '@components/Bio';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import { formatReadingTime, unSlashIt, leadingSlashIt } from '@lib/utils';
import './BlogPost.css';

const getEditUrl = slug => {
  const githubUsername = 'chancestrickland';
  const githubRepo = 'chances';
  return `https://github.com/${githubUsername}/${githubRepo}/edit/master/src/posts/${unSlashIt(
    slug
  )}/index.md`;
};

const BlogPost = ({ data = {}, location, pageContext = {} }) => {
  const post = data.markdownRemark || {};
  const { previous, next, slug } = pageContext;
  const editUrl = getEditUrl(slug);
  const shareUrl = `https://twitter.com/home?status=${encodeURIComponent(
    `${post.frontmatter.title} https://chancedigital.io/${unSlashIt(slug)}`
  )}`;
  return (
    <Layout
      location={location}
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
        description={post.frontmatter.spoiler}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        pathname={location.pathname}
      />
      <article
        // eslint-disable-next-line react/no-danger
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
                to={leadingSlashIt(previous.fields.slug)}
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
                to={leadingSlashIt(next.fields.slug)}
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
};

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
