'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CreateForm from '@/app/ui/products/create-form';
import { createProduct } from '@/app/lib/actions';

const CreateProductPage: React.FC = () => {
  const router = useRouter();

  const handleSave = async (newProduct: { name: string; description: string; price: number; imageUrl: string }) => {
    const form = new FormData();
    form.append('name', newProduct.name);
    form.append('description', newProduct.description);
    form.append('price', newProduct.price.toString());
    form.append('imageUrl', newProduct.imageUrl);

    await createProduct(form);
    
    //router.push('/dashboard/productos');
  };

  const handleCancel = () => {
    router.push('/dashboard/productos');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <CreateForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default CreateProductPage;