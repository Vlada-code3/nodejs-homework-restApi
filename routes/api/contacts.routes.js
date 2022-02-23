const express = require("express");
const { listContacts, getContactById, addContact, removeContact, updateContact } = require("../../models/contacts.models");

const router = express.Router();
const { schema } = require("../../validation/validationContact");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    // return res.json({ status: "success", code: 200, data: { contacts } });

    res.status(200).send({ status: "success", ...contacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contacts = await getContactById(req.params.contactId);
    if (!contacts) {
      res.status(404).send({ message: "contact not found" });
    }
    res.status(200).send({ contacts });
  } catch (error) {
    next(error);
  }
});

router.post("/", schema, async (req, res, next) => {
  try {
    const validationResult = schema.validate(req.body);
    if (!validationResult) {
      res.status(400).json({ status: validationResult.error.details });
    }
    const contact = await addContact(req.body);

    res.status(200).send({ contact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);

    res.status(200).send({ message: `contact ${contact} was deleted` });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", schema, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);

    if (!contact) {
      res.status(404).send({ message: `contact ${contact} not found` });
    }
    res.status(200).send({ message: "success", ...contact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
