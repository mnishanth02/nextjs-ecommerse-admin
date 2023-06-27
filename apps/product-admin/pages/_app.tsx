import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import Head from 'next/head';
import './styles.css';
import Layout from '../components/Layout';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Welcome to product-admin!</title>
      </Head>
      <main className="app">
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </main>
    </>
  );
}

export default CustomApp;
