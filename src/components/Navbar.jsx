import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">DecantShop</h1>
      <div>
        <a href="/" className="text-gray-600 hover:text-black mx-4">Inicio</a>
        <a href="/perfumes" className="text-gray-600 hover:text-black mx-4">Perfumes</a>
        <a href="/resumen" className="text-gray-600 hover:text-black mx-4">Resumen</a>
      </div>
    </nav>
  );
};

export default Navbar;