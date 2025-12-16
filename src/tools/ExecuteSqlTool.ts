import { logger, MCPTool } from "mcp-framework";
import { z } from "zod";
import prisma from "../utils/prisma";
import { Prisma } from "../../generated/prisma/index";

interface ExecutesqlInput {
  query: string;
}

class ExecuteSqlTool extends MCPTool<ExecutesqlInput> {
  name = "execute_sql";
  description = "Executesql tool used to execute MSSQL query.";

  schema = {
    query: {
      type: z.string(),
      description: "MSSQL query to execute",
    },
  };

  async execute(input: ExecutesqlInput) {
    try {
      console.log("SQL Input Query:", input.query);
      const result: [] = await prisma.$queryRaw(
        Prisma.sql`${Prisma.raw(input.query)}`
      );
      if (!result.length) {
        throw new Error(`No data found to this SQL query.`);
      }
      return result;
    } catch (error) {
      console.error("error", error);
      logger.error("ExecuteSqlTool --> " + JSON.stringify(error));
      return `Error: ${error}`;
    }
  }
}

export default ExecuteSqlTool;
