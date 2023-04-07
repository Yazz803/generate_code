import Layout from "yazz/components/Layout";
import "yazz/styles/globals.css";
// import "yazz/styles/prismjs/themes/tommorowNight.css";
import "yazz/styles/prismjs/themes/okaidia.css";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
