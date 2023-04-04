import "@/styles/globals.css";
import Layout from "@/Components/Layout";
import { Navbar } from "@/Components/Navbar";

export default function App({ Component, pageProps,router }) {
  
  return (
    <Layout>
      {" "}
     
      <Component {...pageProps} />
    </Layout>
  );
}


