import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="container">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h2>The page you are looking for doesn't exist.</h2>
          <Link className="btn" to="/">
            Back to home
          </Link>
          <img
            src="assets/img/not-found.svg"
            className="img-fluid py-4"
            alt="Page Not Found"
            style={{ width: 500 }}
          />
        </section>
      </div>

      <Link
        to="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </Link>
    </>
  );
};

export default ErrorPage;
