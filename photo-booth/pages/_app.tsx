import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import type { AppProps } from 'next/app';

import { GlobalLayout } from '@styles/common/Layout';
import Script from 'next/script';
import '../styles/globals.css';
import Head from 'next/head';

declare global {
  // Kakao 함수를 전역에서 사용할 수 있도록 선언
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const kakaoInit = () => {
    // 페이지가 로드되면 실행
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY);
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>여기 사진</title>
      </Head>
      <GlobalLayout>
        {/* <Hamburger></Hamburger> */}
        <Component {...pageProps} />
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit}></Script>
      </GlobalLayout>
    </>
  );
}

export default MyApp;
