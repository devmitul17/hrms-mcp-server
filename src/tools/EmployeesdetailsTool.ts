import { logger, MCPTool } from "mcp-framework";
import { z } from "zod";
import getEmployeesDetails from "../services/get_employees_details";

interface EmployeesdetailsInput {
  firstName: string;
}

class EmployeesdetailsTool extends MCPTool<EmployeesdetailsInput> {
  name = "employees_details";
  description = `
  Fetch the details of an employee by their name. The returned details should include the following fields:
Id
UserId
EmployeeCode
FirstName
MiddleName
LastName
Email
DateOfBirth
Gender
BranchId
CreatedByUserId
CreatedDateTimeUtc
RecordStatus
UpdatedByUserId
UpdatedDateTimeUtc
DesignationTypeId
  `;

  schema = {
    firstName: {
      type: z.string(),
      description:
        "The first name of the employee whose details are being retrieved.",
    },
  };

  async execute(input: EmployeesdetailsInput) {
    try {
      const employeesDetails = await getEmployeesDetails(input.firstName);
      return `${JSON.stringify(employeesDetails)}`;
    } catch (error) {
      logger.error(JSON.stringify(error));
      throw new Error(`Operation failed: ${JSON.stringify(error)}`);
    }
  }
}

export default EmployeesdetailsTool;
