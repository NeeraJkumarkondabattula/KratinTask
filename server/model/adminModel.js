const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {},
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
