import { NextApiRequest, NextApiResponse } from 'next';
import { deleteProduct, updateProduct, fetchProductById } from '@/app/lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { stock } = req.body;
    try {
      const product = await fetchProductById(id as string);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const updatedStock = product.stock + stock; // Reduce el stock
      if (updatedStock < 0) {
        return res.status(400).json({ error: 'Insufficient stock' });
      }

      await updateProduct(id as string, { ...product, stock: updatedStock });
      res.status(200).json({ message: 'Stock updated successfully', stock: updatedStock });
    } catch (error) {
      console.error('Failed to update stock:', error);
      res.status(500).json({ error: 'Failed to update stock' });
    }
  } else if (req.method === 'PUT') {
    const { name, description, price, imageUrl, stock, supplierName } = req.body;
    try {
      await updateProduct(id as string, { name, description, price, imageUrl, stock, supplierName });
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteProduct(id as string);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  } else {
    res.setHeader('Allow', ['PATCH', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}