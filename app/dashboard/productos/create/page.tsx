'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CreateForm from '@/app/ui/products/create-form';
import { createProduct } from '@/app/lib/actions';

const CreateProductPage: React.FC = () => {
  const router = useRouter();

  const handleSave = async (newProduct: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    supplierName: string;
  }) => {
    const form = new FormData();
    form.append('name', newProduct.name);
    form.append('description', newProduct.description);
    form.append('price', newProduct.price.toString());
    form.append('imageUrl', newProduct.imageUrl);
    form.append('stock', newProduct.stock.toString());
    form.append('supplierName', newProduct.supplierName);

    await createProduct(form);

    // router.push('/dashboard/productos');
  };

  const handleCancel = () => {
    router.push('/dashboard/productos');
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Crear Producto</h1>
      <CreateForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default CreateProductPage;