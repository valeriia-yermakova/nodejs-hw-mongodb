import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export async function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const allContacts = await getAllContacts();
      res.status(200).json({
        status: 'success',
        message: 'Successfully found contacts!',
        data: allContacts,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch contacts',
        error: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    try {
      const contact = await getContactById(contactId);

      res.status(200).json({
        status: 'success',
        message: `Successfully found contact with ID ${contactId}`,
        data: contact,
      });
    } catch (error) {
      const status = error.message === 'Contact not found' ? 404 : 500;
      res.status(status).json({
        status: 'error',
        message: error.message,
      });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Not Found',
    });
  });

  app.use((error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
      error: error.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
