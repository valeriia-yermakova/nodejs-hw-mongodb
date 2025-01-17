import { ContactsCollection } from '../db/models/contact.js';

export async function getAllContacts() {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    console.error('Error while fetching contacts:', error.message);
    throw new Error('Failed to fetch contacts');
  }
}

export async function getContactById(contactId) {
  try {
    const contact = await ContactsCollection.findById(contactId);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  } catch (error) {
    console.error('Error while fetching contact by ID:', error.message);
    throw new Error('Failed to fetch contact by ID');
  }
}
