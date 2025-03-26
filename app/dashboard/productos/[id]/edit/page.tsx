import EditForm from '@/app/ui/products/edit-forms';
import { fetchProductById, updateProduct } from '@/app/lib/data';
import { Product } from '@/app/lib/definitions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const product = await fetchProductById(id);

  const handleSave = async (updatedProduct: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    supplierName: string;
  }) => {
    const productData = {
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      imageUrl: updatedProduct.imageUrl,
      stock: updatedProduct.stock,
      supplierName: updatedProduct.supplierName,
    };

    await updateProduct(id as string, productData);
    // router.push('/dashboard/productos');
  };

  const handleCancel = () => {
    // router.push('/dashboard/productos');
  };

  if (!product) {
    return <div className="text-gray-700 dark:text-gray-300">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Editar Producto</h1>
      <EditForm product={product} />
    </div>
  );
}