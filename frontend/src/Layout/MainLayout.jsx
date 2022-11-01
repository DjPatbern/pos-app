import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({children}) {
  return (
    <div>
      <header>
        <nav className="navbar bg-primary">
          <div className="container">
            <Link className="navbar-brand logo">SH⭐NICE STORES</Link>
          </div>
        </nav>
      </header>

      <main>
        <div className="container mt-3">
            {children}
        </div>
        <ToastContainer />
      </main>
    </div>
  );
}

export default MainLayout;
