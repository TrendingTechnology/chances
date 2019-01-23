const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { defaultLangKey } = require('./languages');

exports.createPages = ({ graphql, actions }) => {
  const { createPage /* createRedirect */ } = actions;

  // Redirect template
  // createRedirect({
  //   fromPath: '/zh_TW/things-i-dont-know-as-of-2018/',
  //   toPath: '/zh-hant/things-i-dont-know-as-of-2018/',
  //   isPermanent: true,
  //   redirectInBrowser: true,
  // });

  return new Promise((resolve, reject) => {
    const BlogPost = path.resolve('./src/templates/BlogPost/BlogPost.js');
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    langKey
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
          return;
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;
        const defaultLangPosts = posts.filter(
          ({ node }) => node.fields.langKey === defaultLangKey
        );
        _.forEach(defaultLangPosts, (post, index) => {
          const { slug } = post.node.fields;
          const component = BlogPost;
          const previous =
            index === defaultLangPosts.length - 1
              ? null
              : defaultLangPosts[index + 1].node;
          const next = index === 0 ? null : defaultLangPosts[index - 1].node;

          createPage({
            path: slug,
            component,
            context: {
              slug,
              previous,
              next,
            },
          });

          const otherLangPosts = posts.filter(
            ({ node }) => node.fields.langKey !== defaultLangKey
          );
          _.forEach(otherLangPosts, post =>
            createPage({
              path: post.node.fields.slug,
              component,
              context: { slug },
            })
          );
        });
      })
    );
  });
};
