const { EmployeeModel } = require('../models/Employee');
 
const resolvers = {
  Query: {
    getEmployees: async () => {
      try {
        const employees = await EmployeeModel.find();
        return employees;
      } catch (error) {
        console.error("Error fetching employees:", error);
        throw new Error("Failed to fetch employees");
      }
    },
  },
  Mutation: {
    createEmployee: async (_, { input }) => {
      try {
        const newEmployee = new EmployeeModel({
          ...input,
          currentStatus: true,
        });
        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        console.error("Error creating employee:", error);
        throw new Error("Failed to create employee");
      }
    },
  },
};
 
module.exports = resolvers;
 