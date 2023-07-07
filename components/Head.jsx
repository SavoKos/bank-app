import NextHead from 'next/head';

const Head = ({ title = '' }) => {
  return (
    <NextHead>
      <meta charset='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta
        name='description'
        content='Excellence Holdings is a (fictional) bank, and its idea is
        to allow people to manage their credit cards.'
      />
      <meta
        name='robots'
        content='index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      />
      <link rel='canonical' href='https://excellence.savo-kos.com/' />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='Excellence Holdings | Savo Kos' />
      <meta property='og:url' content='https://savo-kos.com/' />
      <meta property='og:site_name' content='Excellence Holdings | Savo Kos' />
      <meta property='article:publisher' content='https://savo-kos.com' />
      <title>{`${title} | `}Excellence Holdings</title>
    </NextHead>
  );
};

export default Head;
