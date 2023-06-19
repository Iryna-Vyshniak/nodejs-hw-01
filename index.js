const { Command } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const program = new Command();

program
  .option('-a, --action, <type>', 'choose action')
  .option('-i, --id, <type>', 'user id')
  .option('-n, --name, <type>', 'user name')
  .option('-e, --email, <type>', 'user email')
  .option('-p, --phone, <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.table(allContacts);
      break;
    case 'get':
      const oneContact = await getContactById(id);
      console.table(oneContact);
      break;
    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;
    case 'remove':
      const deletedContact = await removeContact(id);
      console.table(deletedContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
