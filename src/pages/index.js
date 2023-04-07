import Head from "next/head";
import Home from "../components/Home";
import { NextSeo } from "next-seo";

export default function Index() {
  return (
    <div className="text-white bg-black">
      <NextSeo
        title="Yazz | Generate Code"
        description="Aku gabut, jadi bikin ini."
        canonical="https://yazz-generate-code.vercel.app"
        openGraph={{
          url: "https://yazz-generate-code.vercel.app",
          images: [
            {
              url: "https://pm1.narvii.com/5764/ae366b7bb64bb7b7fda66e4c027472e0a45fc75b_hq.jpg",
              width: 800,
              height: 600,
              alt: "Mang Eak Cik!",
            },
          ],
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
