import { logger, MCPTool } from "mcp-framework";
import { z } from "zod";

interface EmployeeLeaveStatusInput {
  firstName: string;
}

class EmployeeLeaveStatusTool extends MCPTool<EmployeeLeaveStatusInput> {
  name = "employee_leave_status";
  description = "Fetch an employee's leave status by name.";

  schema = z.object({
    firstName: z
      .string()
      .describe(
        "The first name of the employee whose leave status is being retrieved."
      ),
  });

  async execute(input: EmployeeLeaveStatusInput) {
    try {
      const userInfo = { FirstName: input.firstName };
      return `Processed: ${
        input.firstName
      } leave status is approved ${new Date().toLocaleString()} \n ${JSON.stringify(
        userInfo
      )}`;
    } catch (error) {
      logger.error(JSON.stringify(error));
      throw new Error(`Operation failed: ${JSON.stringify(error)}`);
    }
  }
}

export default EmployeeLeaveStatusTool;
