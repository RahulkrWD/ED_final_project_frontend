import React from "react";
import Header from "../HomePage/Header";
import QuickSearch from "../HomePage/QuickSearch";
import Footer from "../LayOut/Footer";
import Layout from "../LayOut/Layout";

function HomePage() {
  return (
    <Layout title={"Home zomato-app"}>
      <Header />
      <QuickSearch />
      <Footer />
    </Layout>
  );
}

export default HomePage;
