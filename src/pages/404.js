import React from 'react';
import Layout from '../components/Layout';

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location}>
      <h1 style={{ marginBottom: 24 }}>404: Not Found</h1>
      <div className="videoEmbed">
        <iframe
          title="Music video for 'Come Meh Way' by Sudan Archives"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/KLPGMb35ubk"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
      </div>
    </Layout>
  );
};

export default NotFoundPage;
