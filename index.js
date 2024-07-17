import { program } from "commander";
import { nanoid } from "nanoid";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      console.table(await listContacts());
      break;

    case "get":
      // ... id
      console.log(await getContactById(id));
      break;

    case "add":
      // ... name email phone
      console.log(await addContact(name, email, phone));
      break;

    case "remove":
      // ... id
      console.log(await removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
