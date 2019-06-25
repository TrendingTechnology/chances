const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (_.get(node, 'internal.type') === `MarkdownRemark`) {
    const parent = getNode(_.get(node, 'parent'));
    const contentType = _.get(parent, 'sourceInstanceName');

    // Get the slug from our file path.
    // Content type directory names must match the type defined in gatsby-config.
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: `${contentType}/`,
    });

    // Register our slug.
    // We have to do this manually since we're using gatsby-filesystem
    // to move files outside of the pages directory.
    createNodeField({
      node,
      name: 'slug',
      value:
        contentType === 'posts'
          ? `/${relativeFilePath}`
          : `/${contentType}/${relativeFilePath}`,
    });

    // Register the collection field for segmenting content types.
    createNodeField({
      node,
      name: 'collection',
      value: contentType,
    });
  }
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()],
    resolve: {
      alias: {
        '@src': path.join(__dirname, './src'),
        '@assets': path.join(__dirname, './src/assets'),
        '@books': path.join(__dirname, './src/books'),
        '@components': path.join(__dirname, './src/components'),
        '@images': path.join(__dirname, './static/images'),
        '@pages': path.join(__dirname, './src/pages'),
        '@posts': path.join(__dirname, './src/posts'),
        '@providers': path.join(__dirname, './src/providers'),
        '@templates': path.join(__dirname, './src/templates'),
        '@utils': path.join(__dirname, './src/utils'),
      },
    },
  });
};

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
              filter: { fields: { collection: { eq: "posts" } } }
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
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
        _.forEach(posts, (post, index) => {
          const { slug } = post.node.fields;
          const component = BlogPost;
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          console.log(slug);

          createPage({
            path: slug.replace(/^(\/*)|(\/*)$/g, '').trim(),
            component,
            context: {
              slug,
              previous,
              next,
            },
          });
        });
      })
    );
  });
};
