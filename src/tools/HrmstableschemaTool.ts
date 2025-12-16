import { logger, MCPTool } from "mcp-framework";
import { z } from "zod";
import { Prisma } from "../../generated/prisma/index";

interface HrmstableschemaInput {
  tableName: string;
}

class HrmsTableSchemaTool extends MCPTool<HrmstableschemaInput> {
  name = "hrms_table_schema";
  description =
    "The HrmsTableSchema tool helps retrieve the MSSQL database schema for a given table name.";

  schema = {
    tableName: {
      type: z.string(),
      description: "tableName",
    },
  };

  async execute(input: HrmstableschemaInput) {
    try {
      const tableName = input.tableName; // must match Prisma model name
      const model = Prisma.dmmf.datamodel.models.find(
        (m) => m.name === tableName
      );
      if (!model) throw new Error(`Model ${tableName} not found.`);
      const metadata = model.fields.map((f) => {
        return {
          name: f.name,
          type: f.type,
          relationName: f.relationName,
          relationFromFields: f.relationFromFields,
          relationToFields: f.relationToFields,
          relationOnDelete: f.relationOnDelete,
          relationOnUpdate: f.relationOnUpdate,
        };
      });
      return metadata;
    } catch (error) {
      logger.error("HrmsTableSchemaTool --> " + JSON.stringify(error));
      return error;
    }
  }
}

export default HrmsTableSchemaTool;
