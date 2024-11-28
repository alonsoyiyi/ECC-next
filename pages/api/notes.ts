import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import dbConnect from '../../lib/mongodb';
import Note from '../../models/Note';

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    console.log('Database connected successfully');

    const session = await getSession(req, res);
    if (!session?.user) {
      console.log('No authenticated session found');
      return res.status(401).json({ error: 'No autenticado' });
    }

    const userId = session.user.sub;
    console.log('Processing request for user:', userId);

    if (req.method === 'GET') {
      const note = await Note.findOne({ userId });
      return res.status(200).json({ notes: note?.notes || '' });
    }

    if (req.method === 'POST') {
      const { notes } = req.body;
      await Note.findOneAndUpdate(
        { userId },
        { notes },
        { upsert: true, new: true }
      );
      return res.status(200).json({ message: 'Notas guardadas correctamente' });
    }

    return res.status(405).json({ error: `Método ${req.method} no permitido` });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Error del servidor', 
      details: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});