import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface DatenowInput {}

class DateNowTool extends MCPTool<DatenowInput> {
  name = "date-time-now";
  description =
    "The DateNow tool is useful when you need the current date and time.";

  schema = {};

  async execute(_input: DatenowInput) {
    return `The current and time is ${new Date().toUTCString()}`;
  }
}

export default DateNowTool;
