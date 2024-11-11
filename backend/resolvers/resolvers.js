// Importing the EmployeeModel to interact with the employee data in the database.
const { EmployeeModel } = require('../models/Employee');

// Defining resolvers for handling GraphQL queries and mutations.
const resolvers = {
  // Query resolvers for retrieving data
  Query: {
    // Fetches all employees from the database
    getEmployees: async (_, {type}) => {
      try {
        const filter = type ? { employeeType: type } : {};
        return await EmployeeModel.find(filter);
      } catch (error) {
        console.error("Error in fetching employees:", error);
        throw new Error("Failed to fetch employees");
      }
    },
    // new
    employee: async (_, { id }) => {
      try {
        return await EmployeeModel.findById(id);
      } catch (error) {
        console.error('Error fetching employee by ID:', error);
        throw new Error('Failed to fetch employee');
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

    // new
    updateEmployee: async (_, { id, input }) => {
      const updates = {};
      if (input.title) updates.title = input.title;
      if (input.department) updates.department = input.department;
      if (typeof input.currentStatus === 'boolean') updates.currentStatus = input.currentStatus;
      return await EmployeeModel.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteEmployee: async (_, { id }) => {
      await EmployeeModel.findByIdAndDelete(id);
      return { message: "Employee deleted successfully" };
    },
    
  },
};

// Export the resolvers to use them in the GraphQL server
module.exports = resolvers;
