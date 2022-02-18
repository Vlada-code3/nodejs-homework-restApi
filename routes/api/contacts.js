const express = require("express");

const router = express.Router();

// eslint-disable-next-line import/no-absolute-path
const { listContacts } = require("/Users/vladi/Documents/nodejs2022/nodejs-homework-restApi/models/contacts.js");

router.get("/", async (req, res) => {
  // if (req.method !== "GET") {
  //   res.status(500).json({ message: "Error. You should choose method GET " });
  // } else {
  //   const contact = await listContacts();

  // }
  // res.send("Hello World!");
  res.send(listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "blalal" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
