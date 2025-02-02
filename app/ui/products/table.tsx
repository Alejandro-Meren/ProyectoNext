'use client';
import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const productsPerPage = 9;

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Productos de Peluquería</h1>
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {currentProducts.map((product) => (
          <div key={product.id} className="relative bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <div className="w-full h-56 flex justify-center items-center bg-gradient-to-r from-pink-100 to-yellow-100">
              <div className="w-40 h-40 bg-white flex justify-center items-center rounded-full border-4 border-pink-300 shadow-md">
                <img src={product.imageUrl} alt={product.name} className="w-36 h-36 object-cover rounded-full" />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 capitalize">{product.name}</h3>
              <p className="mt-2 text-sm text-gray-600 capitalize">{product.description}</p>
              <p className="mt-4 text-xl font-semibold text-gray-900">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={handlePreviousPage}
            className="px-4 py-2 border rounded-full bg-white hover:bg-gray-200 transition-colors duration-300 shadow-md"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 border rounded-full bg-white hover:bg-gray-200 transition-colors duration-300 shadow-md"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;