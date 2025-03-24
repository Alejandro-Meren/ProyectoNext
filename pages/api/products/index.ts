import { NextApiRequest, NextApiResponse } from 'next';
import { addProduct } from '@/app/lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description, price, imageUrl, stock } = req.body;
    try {
      const newProduct = await addProduct({ name, description, price, imageUrl, stock });      res.status(200).json(newProduct);
    } catch (error) {
      console.error('Failed to add product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}