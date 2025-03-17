import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="p-4 bg-blue-600 text-white flex justify-between">
    <Link to="/" className="text-xl font-bold">
      MyApp
    </Link>
    <Link to="/login" className="text-lg">
      Login
    </Link>
  </nav>
);

export default Navbar;
