import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children, title, description, keywords, author }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <NavBar />
      <main style={{ minHeight: "75vh" }}>
        <ToastContainer />
        {children}
      </main>

      <Footer />
    </>
  );
}
// Layout.defaultProps = {
//   title: "Zomato app",
//   description: "mern stack project",
//   keywords: "mern, react, node, mongodb",
//   author: "rahul",
// };

export default Layout;
