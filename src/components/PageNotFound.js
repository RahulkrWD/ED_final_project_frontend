import React from "react";
import Layout from "./LayOut/Layout";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <Layout title={"page not found please go back"}>
      <center className="container p-3">
        <h1 className="fw-bolder">404</h1>
        <h2 className="fw-bolder">Oops ! Page Not Found</h2>
        <Link to={"/"} className="btn text-bg-warning fw-bold">
          Go Back
        </Link>
      </center>
    </Layout>
  );
}

export default PageNotFound;
