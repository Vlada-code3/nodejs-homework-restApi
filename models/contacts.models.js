// const fs = require('fs/promises')

const fs = require("fs").promises;

const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async contactId => {
  // fs.readFile(contactsPath, "utf-8", (err, data) => {
  //   if (err) throw err;
  //   const contactById = JSON.parse(data).find(contact => contact.id === Number(contactId));
  //   console.table(contactById);
  // });
  const contacts = await listContacts();
  const filteredContact = contacts.find(({ id }) => id === contactId);

  return filteredContact;
};

const removeContact = async contactId => {
  // fs.readFile(contactsPath, "utf-8", (err, data) => {
  //   if (err) throw err;

  //   const removeContactById = JSON.parse(data).filter(({ id }) => id !== Number(contactId));

  //   fs.writeFile(contactsPath, JSON.stringify(removeContactById), err => {
  //     if (err) throw err;
  //     console.log(`Contact by ID: '${contactId}' was removed`);
  //     console.table(removeContactById);
  //   });
  // });

  const contacts = await listContacts();
  const contactIndex = contacts.indexOf(contacts.find(contact => contact.id === contactId));
  if (contactIndex === -1) {
    return false;
  }
  contacts.splice(contactIndex, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return true;
};

const addContact = async body => {
  // fs.readFile(contactsPath, "utf-8", (err, data) => {
  //   if (err) throw err;
  //   const uniqueId = Math.floor(Math.random() * 100);
  //   const createContact = [...JSON.parse(data), { id: uniqueId, name, email, phone }];
  //   fs.writeFile(contactsPath, JSON.stringify(createContact), err => {
  //     if (err) throw err;
  //     console.log(`Contact ${name} was added with id ${uniqueId}`);
  //     console.table(createContact);
  //   });
  // });
  const contacts = await listContacts();
  const contact = { id: shortid.generate(), ...body };

  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};

const updateContact = async (contactId, body) => {
  // fs.readFile(contactsPath, "utf-8", (err, data) => {
  //   if (err) throw err;
  //   const updateBody = [...JSON.parse(data), { contactId: name, email, phone }];
  //   fs.writeFile(contactsPath, JSON.stringify(updateBody), err => {
  //     if (err) throw err;
  //     console.log(`Contact with ${contactId} id was updated `);
  //     console.table(updateBody);
  //   });
  // });
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const isContactExisted = contacts.find(({ id }) => id === contactId);

  if (!isContactExisted) {
    return false;
  }
  contacts.forEach(contact => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return isContactExisted;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
