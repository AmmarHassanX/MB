import Head from "next/head";

import React from "react";

const CommonHead = () => {
  return (
    <Head>
      <title>MB Wholesale</title>
      <meta name="description" content="MB Wholesale" />
      <link rel="manifest" href="/favicon/manifest.json" />
      {/* favicons */}
      <meta property="og:image" content="/images/header/logo.png" />
      <meta property="og:image:alt" content="MB Wholesale" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicon/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/favicon/android-chrome-512x512.png"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
    </Head>
  );
};

export default CommonHead;
