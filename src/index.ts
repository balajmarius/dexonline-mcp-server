import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import HttpStatus from "http-status-codes";

import * as getDefinition from "@/tools/getDefinition";

export class DexMcp extends McpAgent {
	server = new McpServer({
		name: "Dexonline MCP Server",
		description: "An MCP interface for accessing Romanian dictionary data via the Dexonline API",
		version: "0.1.0",
	});

	async init() {
		this.server.tool(getDefinition.name, getDefinition.schema, getDefinition.handler);
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			return DexMcp.serveSSE("/sse").fetch(request, env, ctx);
		}
		if (url.pathname === "/mcp") {
			return DexMcp.serve("/mcp").fetch(request, env, ctx);
		}
		return new Response("Not found", { status: HttpStatus.NOT_FOUND });
	},
};
