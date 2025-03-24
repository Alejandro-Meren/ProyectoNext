import { NextApiRequest, NextApiResponse } from 'next';
import { deleteProduct } from '@/app/lib/data';
import { updateProduct } from '@/app/lib/data';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
      const { id } = req.query;
      const { name, description, price, imageUrl, stock, supplierName } = req.body;
      try {
        
        await updateProduct(id as string, { name, description, price, imageUrl, stock, supplierName });      } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
      }
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      try {
        await deleteProduct(id as string);
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
      }
    } else {
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }