import React from 'react';
import '../sass/main.sass'; 
import Nav from '@/components/Nav'; 
import Layout from '@/components/Layout'; 

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Nav />
    </Layout>
  );
}
