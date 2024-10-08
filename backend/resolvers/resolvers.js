// Importing the EmployeeModel to interact with the employee data in the database.
const { EmployeeModel } = require('../models/Employee');

// Defining resolvers for handling GraphQL queries and mutations.
const resolvers = {
  // Query resolvers for retrieving data
  Query: {
    // Fetches all employees from the database
    getEmployees: async () => {
      try {
        const employees = await EmployeeModel.find();
        return employees;
      } catch (error) {
        console.error("Error in fetching employees:", error);
        throw new Error("Failed to fetch employees");
      }
    },
  },

  // Mutation resolvers for modifying data
  Mutation: {
    // Creates a new employee and saves it to the database
    createEmployee: async (_, { input }) => {
      try {
        const newEmployee = new EmployeeModel({
          ...input,  
          currentStatus: true,
        });
        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        console.error("Error in creating an employee:", error);
        throw new Error("Failed to create an employee");
      }
    },
  },
};

// Export the resolvers to use them in the GraphQL server
module.exports = resolvers;
