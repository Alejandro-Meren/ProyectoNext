'use client';
import React, { useState } from 'react';
import EditForm from './edit-forms';

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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = async (updatedProduct: Product) => {
    try {
      const response = await fetch(`/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      if (response.ok) {
        setProducts(products.map(product => (product.id === updatedProduct.id ? updatedProduct : product)));
        setEditingProduct(null);
      } else {
        console.error('Failed to update product:', await response.json());
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
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
      {editingProduct ? (
        <EditForm product={editingProduct} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
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
                  <div className="flex justify-center space-x-4 mt-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
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
                Previous
              </button>
              <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 border-2 border-pink-500 rounded-full bg-pink-500 text-white hover:bg-pink-600 hover:border-pink-600 transition-colors duration-500 shadow-lg transform hover:scale-110"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsTable;