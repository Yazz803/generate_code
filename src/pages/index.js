import Head from "next/head";
import Home from "../components/Home";
import { NextSeo } from "next-seo";

export default function Index() {
  return (
    <div className="text-white bg-black">
      <NextSeo
        title="Home: Yazz | Generate Code"
        description="Welcome to nine4 homepage."
        canonical="https://nine4-3.vercel.app/"
        openGraph={{
          url: "https://nine4-3.vercel.app/",
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
