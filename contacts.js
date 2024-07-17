import { nanoid } from "nanoid";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = join(__dirname, "./db/contacts.json");

export const listContacts = async () => {
  try {
    return JSON.parse(await readFile(contactsPath));
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    return (await listContacts()).find(({ id }) => id === contactId) || null;
  } catch (error) {
    console.log(error.message);
  }
};

export const addContact = async (name, email, phone) => {
  const contactId = nanoid();
  const newContact = { id: contactId, name, email, phone };
  try {
    const contactsList = await listContacts();
    await writeFile(
      contactsPath,
      JSON.stringify([...contactsList, newContact])
    );
    return await getContactById(contactId);
  } catch (error) {
    console.log(error.message);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contact = await getContactById(contactId);
    if (!contact) return contact;

    const newContactsList = (await listContacts()).filter(
      ({ id }) => id !== contactId
    );
    await writeFile(contactsPath, JSON.stringify(newContactsList));
  } catch (error) {
    console.log(error.message);
  }
};
