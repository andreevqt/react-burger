import React from 'react';
import {Helmet} from 'react-helmet-async';

type TSeoProps = {
  prepend?: string;
  title?: string;
  description?: string;
}

const Seo: React.FC<TSeoProps> = ({
  prepend = 'Stellar Burgers',
  title = 'Конструктор бургеров',
  description = 'Бургерная на краю вселенной!'
}) => {
  const seo = {
    title: prepend + (title ? " | " + title : ""),
    description
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} data-react-helmet />
    </Helmet>
  );
};

export default Seo;
