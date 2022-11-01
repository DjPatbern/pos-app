import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <div className="bg-light p-5 mt-4 rounded-3">
        <h1>POS Machine Portal</h1>
        <p>Shop here with fun and maximum happiness</p>
        <p>For Issues Call +234-123-456 Anytime</p>
        <Link to="/pos" className="btn btn-primary">
          Click To Sell Products
        </Link>
      </div>
    </MainLayout>
  );
}

export default HomePage;
