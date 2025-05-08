'use client';

import React, { useState } from 'react';
import { createProduct, updateProduct, deleteProduct } from '@/app/lib/actions';
import EditForm from './edit-forms';
import CreateForm from './create-form';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  supplierName: string;
}

interface ProductsTableProps {
  products: Product[];
  userRole: 'admin' | 'user'; // Define el rol del usuario
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products: initialProducts, userRole }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [creatingProduct, setCreatingProduct] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1); // Para el botón "Comprar"
  const [restockQuantity, setRestockQuantity] = useState<number>(5); // Para el botón "Reponer Stock"
  const productsPerPage = 9;
  const router = useRouter();

  const sortedProducts = Array.isArray(products)
    ? products.filter(product => product && product.name).sort((a, b) => a.name.localeCompare(b.name))
    : [];

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

  const handleCreate = () => {
    setCreatingProduct(true);
  };

  const handleEdit = (product: Product) => {
    router.push(`/dashboard/productos/${product.id}/edit`);
  };

  const handleSaveNew = async (newProduct: { name: string; description: string; price: number; imageUrl: string; stock: number; supplierName: string }) => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price.toString());
    formData.append('imageUrl', newProduct.imageUrl);
    formData.append('stock', newProduct.stock.toString());
    formData.append('supplierName', newProduct.supplierName);

    await createProduct(formData);
    router.refresh();
  };

  const handleSaveEdit = async (updatedProduct: Product) => {
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('description', updatedProduct.description);
    formData.append('price', updatedProduct.price.toString());
    formData.append('imageUrl', updatedProduct.imageUrl);
    formData.append('stock', updatedProduct.stock.toString());
    formData.append('supplierName', updatedProduct.supplierName);

    await updateProduct(updatedProduct.id!, formData);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
    router.refresh();
  };

  const handleBuy = async (id: string, quantity: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: -quantity }), // Reduce el stock en la cantidad seleccionada
      });

      if (!response.ok) {
        throw new Error('Failed to update stock');
      }

      const data = await response.json();

      // Actualiza el estado local con el nuevo stock
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, stock: data.stock } : product
        )
      );
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleRestock = async (id: string, quantity: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: quantity }), // Aumenta el stock en la cantidad seleccionada
      });

      if (!response.ok) {
        throw new Error('Failed to update stock');
      }

      const data = await response.json();

      // Actualiza el estado local con el nuevo stock
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, stock: data.stock } : product
        )
      );
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleCancel = () => {
    setCreatingProduct(false);
    setEditingProduct(null);
  };

  return (
    <div className="flex flex-col h-full p-2 sm:p-6 md:p-8 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-lg shadow-lg overflow-hidden">
      <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl text-pink-600 dark:text-purple-400 text-center" style={{ fontFamily: 'Times New Roman, serif' }}>
        Productos de Peluquería
      </h1>
      {editingProduct ? (
        <EditForm product={editingProduct} />
      ) : creatingProduct ? (
        <CreateForm onSave={handleSaveNew} onCancel={handleCancel} />
      ) : (
        <>
          {userRole === 'admin' && (
            <Link href="/dashboard/productos/create">
              <p className="self-end mb-4 bg-pink-500 dark:bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 dark:hover:bg-purple-600 transition-transform duration-300 flex items-center">
                <PlusIcon className="h-5 w-5 mr-2" />
                Añadir Producto
              </p>
            </Link>
          )}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="w-full h-56 flex justify-center items-center bg-gradient-to-r from-pink-100 to-yellow-100 dark:from-gray-700 dark:to-gray-800">
                  <div className="w-40 h-40 bg-white dark:bg-gray-900 flex justify-center items-center rounded-full border-4 border-pink-300 dark:border-purple-500 shadow-md">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-36 h-36 object-cover rounded-full" />
                    ) : (
                      <div className="w-36 h-36 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-300">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                  <p className="text-gray-800 dark:text-gray-200 font-semibold">${product.price}</p>
                  <p className="text-gray-600 dark:text-gray-400">Stock: {product.stock > 0 ? product.stock : 'Sin stock'}</p>
                  <p className="text-gray-600 dark:text-gray-400">Proveedor: {product.supplierName || 'Desconocido'}</p>
                  {userRole === 'admin' ? (
                    <div className="mt-4 flex flex-col space-y-2">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 py-2 px-4 rounded-lg shadow-md flex items-center"
                        >
                          <PencilIcon className="h-5 w-5 mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id!)}
                          className="text-white bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 py-2 px-4 rounded-lg shadow-md flex items-center justify-center"
                        >
                          <TrashIcon className="h-5 w-5" />
                          Eliminar
                        </button>
                      </div>
                      <select
                        className="border border-gray-300 rounded-lg px-2 py-1"
                        onChange={(e) => setRestockQuantity(Number(e.target.value))}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <button
                        onClick={() => handleRestock(product.id, restockQuantity)}
                        className="bg-pink-500 text-white hover:bg-pink-600 dark:bg-purple-500 dark:hover:bg-purple-600 py-2 px-4 rounded-lg shadow-md flex items-center justify-center"
                      >
                        <span className="mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.582M4 4l16 16M20 4L4 20" />
                          </svg>
                        </span>
                        Reponer Stock
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col space-y-2">
                      <select
                        className="border border-gray-300 rounded-lg px-2 py-1"
                        onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="5">5</option>
                      </select>
                      <button
                        onClick={() => handleBuy(product.id, selectedQuantity)}
                        disabled={product.stock < selectedQuantity}
                        className={`${
                          product.stock >= selectedQuantity
                            ? 'bg-pink-500 hover:bg-pink-600 dark:bg-purple-500 dark:hover:bg-purple-600'
                            : 'bg-gray-400 cursor-not-allowed'
                        } text-white py-2 px-4 rounded-lg shadow-md flex items-center justify-center`}
                      >
                        <span className="mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M9 3v18m6-18v18M3 9h18m-9 9h9" />
                          </svg>
                        </span>
                        Comprar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsTable;