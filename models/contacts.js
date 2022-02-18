// const fs = require('fs/promises')

const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    const result = JSON.parse(data);
    console.table(result);
  });
};

const getContactById = async contactId => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    const contactById = JSON.parse(data).find(contact => contact.id === Number(contactId));
    console.table(contactById);
  });
};

const removeContact = async contactId => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;

    const removeContactById = JSON.parse(data).filter(({ id }) => id !== Number(contactId));

    fs.writeFile(contactsPath, JSON.stringify(removeContactById), err => {
      if (err) throw err;
      console.log(`Contact by ID: '${contactId}' was removed`);
      console.table(removeContactById);
    });
  });
};

const addContact = async ({ body: name, email, phone }) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    const uniqueId = Math.floor(Math.random() * 100);
    const createContact = [...JSON.parse(data), { id: uniqueId, name, email, phone }];
    fs.writeFile(contactsPath, JSON.stringify(createContact), err => {
      if (err) throw err;
      console.log(`Contact ${name} was added with id ${uniqueId}`);
      console.table(createContact);
    });
  });
};

const updateContact = async (contactId, { body: name, email, phone }) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    const updateBody = [...JSON.parse(data), { contactId: name, email, phone }];
    fs.writeFile(contactsPath, JSON.stringify(updateBody), err => {
      if (err) throw err;
      console.log(`Contact with ${contactId} id was updated `);
      console.table(updateBody);
    });
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
