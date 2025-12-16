import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface EmployeeleavesInput {
  message: string;
}

class EmployeeLeavesTool extends MCPTool<EmployeeleavesInput> {
  name = "employee-leaves";
  description = "Employeeleaves tool description";

  schema = {
    message: {
      type: z.string(),
      description: "Message to process",
    },
  };

  async execute(input: EmployeeleavesInput) {
    return `Processed: ${input.message}`;
  }
}

export default EmployeeLeavesTool;
