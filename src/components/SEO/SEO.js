import React from 'react';
import Helmet from 'react-helmet';
import T from 'prop-types';
import { get } from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({
  description,
  image,
  lang = 'en',
  meta = [],
  title = '',
  pathname = '/',
}) => {
  const { site } = useStaticQuery(
    graphql`
      query GetSiteMetadata {
        site {
          siteMetadata {
            title
            author
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  );
  const { siteMetadata } = site;
  const metaDescription = description || siteMetadata.description;
  const url = `${siteMetadata.siteUrl}${pathname}`;

  const defaultMeta = [
    { name: 'copyright', content: 'Chance Digital' },
    { name: 'description', content: metaDescription },
    { name: 'og:type', content: 'website' },
    { property: 'og:site_name', content: siteMetadata.title },
    { property: 'og:title', content: title || siteMetadata.title },
    { property: 'og:description', content: metaDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:locale', content: 'en_US' },
    { name: 'twitter:title', content: title || siteMetadata.title },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: get(siteMetadata, 'social.twitter') },
    { name: 'twitter:description', content: metaDescription },
    { name: 'twitter:image', content: image },
    { name: 'twitter:site', content: get(siteMetadata, 'social.twitter') },
  ];

  return (
    <Helmet
      htmlAttributes={{ lang }}
      {...(title
        ? { titleTemplate: `%s - ${siteMetadata.title}`, title }
        : { title: siteMetadata.title })}
      meta={[...defaultMeta, ...meta].filter(Boolean)}
    />
  );
};

SEO.propTypes = {
  description: T.string,
  image: T.string,
  meta: T.array,
  title: T.string.isRequired,
  url: T.string,
};

export default SEO;
