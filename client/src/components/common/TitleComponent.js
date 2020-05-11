import React from 'react';
import { Helmet } from 'react-helmet';

function TitleComponent({ title }) {
  const defaultTitle = 'Library of movies and books with heroes named Marta';
  return (
    <Helmet>
      <title>{"She Is Marta | " + (title ? title : defaultTitle)}</title>
    </Helmet>
  );
};

export default TitleComponent;
