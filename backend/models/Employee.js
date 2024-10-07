const mongoose = require('mongoose');
 
const EmployeeSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Age: { type: Number, required: true },
  DateOfJoining: { type: String, required: true },
  Title: { type: String, required: true },
  Department: { type: String, required: true },
  EmployeeType: { type: String, required: true },
  CurrentStatus: { type: Boolean, default: true },
});
 
const EmployeeModel = mongoose.model('Employee', EmployeeSchema);
 
module.exports = { EmployeeModel };
 