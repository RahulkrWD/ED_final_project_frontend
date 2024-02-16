import React from "react";
import Header from "../HomePage/Header";
import QuickSearch from "../HomePage/QuickSearch";
import Layout from "../LayOut/Layout";

function HomePage() {
  return (
    <Layout title={"Home zomato-app"}>
      <Header />
      <QuickSearch />
    </Layout>
  );
}

export default HomePage;
