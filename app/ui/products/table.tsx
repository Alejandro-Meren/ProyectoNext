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
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products: initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [creatingProduct, setCreatingProduct] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleCancel = () => {
    setCreatingProduct(false);
    setEditingProduct(null);
  };

  return (
    <div className="flex flex-col h-full p-6 md:p-12 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-lg shadow-lg overflow-hidden">
      <h1 className="mb-4 text-2xl md:text-3xl text-pink-600 dark:text-purple-400" style={{ fontFamily: 'Times New Roman, serif' }}>
        Productos de Peluquería
      </h1>
      {editingProduct ? (
        <EditForm product={editingProduct} />
      ) : creatingProduct ? (
        <CreateForm onSave={handleSaveNew} onCancel={handleCancel} />
      ) : (
        <>
          <Link href="/dashboard/productos/create">
            <p className="self-end mb-4 bg-pink-500 dark:bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 dark:hover:bg-purple-600 transition-transform duration-300 transform hover:scale-105 flex items-center">
              <PlusIcon className="h-5 w-5 mr-2" />
              Añadir Producto
            </p>
          </Link>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {currentProducts.map((product) => (
              <div key={product.id} className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-500 transform hover:scale-105">
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
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 flex items-center"
                    >
                      <PencilIcon className="h-5 w-5 mr-1" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id!)}
                      className="text-white bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 flex items-center justify-center"
                    >
                      <TrashIcon className="h-5 w-5" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-transform duration-300 transform hover:scale-105"
            >
              Anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-transform duration-300 transform hover:scale-105"
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