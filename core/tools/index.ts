import { ConfigDependentToolParams, IDE, Tool } from "..";
import { codebaseTool } from "./definitions/codebaseTool";
import { createNewFileTool } from "./definitions/createNewFile";
import { createRuleBlock } from "./definitions/createRuleBlock";
import { editFileTool } from "./definitions/editFile";
import { fetchUrlContentTool } from "./definitions/fetchUrlContent";
import { globSearchTool } from "./definitions/globSearch";
import { grepSearchTool } from "./definitions/grepSearch";
import { lsTool } from "./definitions/ls";
import { readCurrentlyOpenFileTool } from "./definitions/readCurrentlyOpenFile";
import { readFileTool } from "./definitions/readFile";
import { requestRuleTool } from "./definitions/requestRule";
import { runTerminalCommandTool } from "./definitions/runTerminalCommand";
import { searchAndReplaceInFileTool } from "./definitions/searchAndReplaceInFile";
import { searchWebTool } from "./definitions/searchWeb";
import { viewDiffTool } from "./definitions/viewDiff";
import { viewRepoMapTool } from "./definitions/viewRepoMap";
import { viewSubdirectoryTool } from "./definitions/viewSubdirectory";

// I'm writing these as functions because we've messed up 3 TIMES by pushing to const, causing duplicate tool definitions on subsequent config loads.
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92

// missing support for remote os calls: https://github.com/microsoft/vscode/issues/252269
const getLocalOnlyToolDefinitions = () => [grepSearchTool];

const getBaseToolDefinitions = () => [
  readFileTool,
  createNewFileTool,
  runTerminalCommandTool,
  globSearchTool,
  searchWebTool,
  viewDiffTool,
  readCurrentlyOpenFileTool,
  lsTool,
  createRuleBlock,
  fetchUrlContentTool,
<<<<<<< HEAD
=======
export const getBaseToolDefinitions = () => [
  toolDefinitions.readFileTool,

  toolDefinitions.createNewFileTool,
  toolDefinitions.runTerminalCommandTool,
  toolDefinitions.globSearchTool,
  toolDefinitions.viewDiffTool,
  toolDefinitions.readCurrentlyOpenFileTool,
  toolDefinitions.lsTool,
  toolDefinitions.createRuleBlock,
  toolDefinitions.fetchUrlContentTool,
  toolDefinitions.singleFindAndReplaceTool,
>>>>>>> upstream/sigmasauer07
=======
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
];

export const getConfigDependentToolDefinitions = (
  params: ConfigDependentToolParams,
): Tool[] => [
  requestRuleTool(params),
  // Search and replace is now generally available
  searchAndReplaceInFileTool,
  // Keep edit file tool available for models that need it
  editFileTool,
  ...(params.enableExperimentalTools
    ? [viewRepoMapTool, viewSubdirectoryTool, codebaseTool]
    : []),
];

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
export const getToolsForIde = async (ide: IDE): Promise<Tool[]> =>
  (await ide.isWorkspaceRemote())
    ? getBaseToolDefinitions()
    : [...getBaseToolDefinitions(), ...getLocalOnlyToolDefinitions()];
<<<<<<< HEAD
=======
  tools.push(toolDefinitions.requestRuleTool(params));

  if (isSignedIn) {
    // Web search is only available for signed-in users
    tools.push(toolDefinitions.searchWebTool);
  }

  if (enableExperimentalTools) {
    tools.push(
      toolDefinitions.viewRepoMapTool,
      toolDefinitions.viewSubdirectoryTool,
      toolDefinitions.codebaseTool,
      toolDefinitions.readFileRangeTool,
    );
  }

  if (modelName?.includes("claude") || modelName?.includes("gpt-5")) {
    tools.push(toolDefinitions.multiEditTool);
  } else {
    tools.push(toolDefinitions.editFileTool);
  }

  // missing support for remote os calls: https://github.com/microsoft/vscode/issues/252269
  if (!isRemote) {
    tools.push(toolDefinitions.grepSearchTool);
  }

  return tools;
};
>>>>>>> upstream/sigmasauer07
=======
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
