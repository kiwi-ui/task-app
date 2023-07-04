import React from "react";
import { useState } from "react";

const LoginPage = () => {
	const [loading, isLoading] = useState(false)
	return (
    <>
      <main className="container d-flex flex-column align-items-center flex-grow-1 pt-3 pt-lg-5">
        <h3 className="mb-4 pt-5 mt-5">Masuk</h3>

        <div className="m-0 p-4 w-100 l-c">
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="form-label fsemibold">Email</label>
              <input type="email" id="email" autoComplete="email" required />
            </div>

            <div className="mb-4 position-relative">
              <label htmlFor="name" className="form-label fsemibold">Password</label>
							<input type="email" id="email" autoComplete="email" required />
              <div className="password-peek cursor-pointer position-absolute">
                <a></a>
              </div>
            </div>

            <button type="submit"
              className={
                (isLoading ? "btn-loading " : "") +
                "btn w-100 btn-primary fsemibold"
              }
            >
              Masuk
            </button>
          </form>
        </div>
      </main>

      <footer className="mt-auto py-3 text-center bg-white border-top">
        <div className="container">
          <div className="fsemibold">
            Powered by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://lavin.id"
              className="text-decoration-none"
            >
              Lavin Technologies
            </a>
            .
          </div>
        </div>
      </footer>
    </>
  );
};

export default LoginPage;
