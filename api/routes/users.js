var express = require("express");
var router = express.Router();
const { User } = require("../models/index");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.send({ success: true, users });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error });
  }
});
/* POST User creation */
router.post("/", async (req, res, next) => {
  try {
    const { userName, surName, givenName, dob } = req.body;
    console.log(req.body);
    if (!userName || !surName || !givenName || !dob)
      return res.send({ success: false, message: "Field is missing" });
    await User.create(req.body);
    res.send({ success: true, message: "User is created successfully" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error });
  }
});
//GET Individual user creation
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.send({ success: false, message: "params is missing" });
    const user = await User.findByPk(id);
    return res.send({ success: true, user });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error });
  }
});
//DELETE  user by using primary key
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.send({ success: false, message: "params is missing" });
    await User.destroy({ where: { id: id } });
    res.send({ success: true, message: "User is created successfully" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error });
  }
});

//PUT - Update User Detail
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.send({ success: false, message: "params is missing" });
    await User.update(req.body, { where: { id: id } });
    res.send({ success: true, message: "User is created successfully" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error });
  }
});
module.exports = router;
