const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");

const login = async function (req, res) {
  try {
    let checkEmailAndPassword = await authorModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    // console.log(checkEmailAndPassword);
    //Validating Email And PassWord(present/Not)
    if (!checkEmailAndPassword) {
      return res.status(400).send({ message: "Email and Password Are invalid" });

      //creating Token
    } else {
      let payloadDetails = {
        UserId: checkEmailAndPassword._id.toString(),
        password: checkEmailAndPassword.password,
        batch: "Plutonium",
        Project: "Blogging - Site",
        group: 30,
      };
      let Token = jwt.sign(payloadDetails, "FunctionUP-Project1-Group30");

      res.header({ "x-api-key": Token });

      return res
        .status(201)
        .send({ data: Token, userId: checkEmailAndPassword._id });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
};

module.exports = {login}