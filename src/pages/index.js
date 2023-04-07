import Head from "next/head";
import Home from "../components/Home";
import { NextSeo } from "next-seo";

export default function Index() {
  return (
    <div className="text-white bg-black">
      <NextSeo
        title="Home: Yazz | Generate Code"
        description="Aku gabut, jadi bikin ini."
        canonical="yazz-generate-code.vercel.app"
        openGraph={{
          url: "yazz-generate-code.vercel.app",
        }}
      />
      <Head>
        <title>Generate Code</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <Home />
    </div>
  );
}
