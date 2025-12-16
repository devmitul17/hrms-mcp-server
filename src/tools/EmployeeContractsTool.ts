import { MCPTool } from "mcp-framework";
import { z } from "zod";
import prisma from "../utils/prisma";
import { Prisma } from "../../generated/prisma/index";

interface EmployeecontractsInput {
  firstName: string;
}

class EmployeeContractsTool extends MCPTool<EmployeecontractsInput> {
  name = "employee_contracts";
  description = `The employee_contracts tool is used to retrieve details related to employee contracts by employee name.`;

  schema = {
    firstName: {
      type: z.string(),
      description: "employee first name to get employee contracts details",
    },
  };

  async execute(input: EmployeecontractsInput) {
    try {
      const name = input.firstName.split(" ")[0];
      const result: [] = await prisma.$queryRaw(
        Prisma.sql`${Prisma.raw(
          `SELECT TOP 3 e.FirstName, e.LastName, ec.* FROM Employees e JOIN EmployeeContracts ec ON e.Id = ec.EmployeeId WHERE e.FirstName = '${name}' ORDER BY ec.UpdatedDateTimeUtc DESC;`
        )}`
      );
      if (!result.length) {
        throw new Error(`No data found to this SQL query.`);
      }
      return `Processed: ${JSON.stringify(result)}`;
    } catch (error) {
      return `Error: ${error}`;
    }
  }
}

export default EmployeeContractsTool;
