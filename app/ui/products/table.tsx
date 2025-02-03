'use client';
import React, { useState } from 'react';

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

const ProductsTable: React.FC<ProductsTableProps> = ({ products: initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const sortedProducts = Array.isArray(products) ? [...products].sort((a, b) => a.name.localeCompare(b.name)) : [];

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
  
  const handleDelete = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter(product => product.id !== productId));
      } else {
        console.error('Failed to delete product:', await response.json());
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 md:p-12 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 rounded-lg shadow-lg overflow-hidden">
      <h1 className="mb-4 text-2xl md:text-3xl text-pink-600" style={{ fontFamily: 'Times New Roman, serif' }}>
        Productos de Peluquería
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {currentProducts.map((product) => (
          <div key={product.id} className="relative bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-500 transform hover:scale-105">
            <div className="w-full h-56 flex justify-center items-center bg-gradient-to-r from-pink-100 to-yellow-100">
              <div className="w-40 h-40 bg-white flex justify-center items-center rounded-full border-4 border-pink-300 shadow-md">
                <img src={product.imageUrl} alt={product.name} className="w-36 h-36 object-cover rounded-full" />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 capitalize">{product.name}</h3>
              <p className="mt-2 text-sm text-gray-600 capitalize">{product.description}</p>
              <p className="mt-4 text-xl font-semibold text-gray-900">${product.price}</p>
              <button
            onClick={() => handleDelete(product.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
          >
            Delete
          </button>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={handlePreviousPage}
            className="px-4 py-2 border-2 border-pink-500 rounded-full bg-pink-500 text-white hover:bg-pink-600 hover:border-pink-600 transition-colors duration-500 shadow-lg transform hover:scale-110"
            disabled={currentPage === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 14.707a1 1 0 010-1.414L15.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M7 14.707a1 1 0 010-1.414L10.293 10 7 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 border-2 border-pink-500 rounded-full bg-pink-500 text-white hover:bg-pink-600 hover:border-pink-600 transition-colors duration-500 shadow-lg transform hover:scale-110"
            disabled={currentPage === totalPages}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 5.293a1 1 0 010 1.414L4.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M13 5.293a1 1 0 010 1.414L9.707 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;