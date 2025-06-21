import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link
        to="/"
      >
        ViewItem
      </Link>
      <Link
        to="/add-item"
      >
        AddItem
      </Link>
    </nav>
  );
}
