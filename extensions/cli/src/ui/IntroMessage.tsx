<<<<<<< HEAD
import * as os from "node:os";
import * as path from "node:path";

=======
>>>>>>> alsania-eco-echo
import { AssistantUnrolled, ModelConfig } from "@continuedev/config-yaml";
import { Box, Text } from "ink";
import React, { useMemo } from "react";

import { getDisplayableAsciiArt } from "../asciiArt.js";
import { MCPService } from "../services/MCPService.js";
import { isModelCapable } from "../utils/modelCapability.js";

import { ModelCapabilityWarning } from "./ModelCapabilityWarning.js";
<<<<<<< HEAD
import { TipsDisplay, shouldShowTip } from "./TipsDisplay.js";

// Export the warning message for testing
export const HOME_DIRECTORY_WARNING =
  "Run cn in a project directory for the best experience (currently in home directory)";
=======
>>>>>>> alsania-eco-echo

interface IntroMessageProps {
  config?: AssistantUnrolled;
  model?: ModelConfig;
  mcpService?: MCPService;
}

<<<<<<< HEAD
// Helper function to extract rule names
const extractRuleNames = (rules: any[] = []): string[] => {
  return rules.map((rule: any) =>
    typeof rule === "string" ? rule : rule?.name || "Unknown",
  );
};

=======
>>>>>>> alsania-eco-echo
const IntroMessage: React.FC<IntroMessageProps> = ({
  config,
  model,
  mcpService,
}) => {
  // Get MCP prompts directly (not memoized since they can change after first render)
  const mcpPrompts = mcpService?.getState().prompts ?? [];

<<<<<<< HEAD
  // Determine if we should show a tip (1 in 5 chance) - computed once on mount
  const showTip = useMemo(() => shouldShowTip(), []);

  // Check if current working directory is the home directory
  const isInHomeDirectory = useMemo(() => {
    const cwd = process.cwd();
    const homedir = os.homedir();
    const resolvedCwd = path.resolve(cwd);
    const resolvedHome = path.resolve(homedir);
    if (process.platform === "win32") {
      return resolvedCwd.toLowerCase() === resolvedHome.toLowerCase();
    }
    return resolvedCwd === resolvedHome;
  }, []);

  // Memoize expensive operations to avoid running on every resize
  const { allRules, modelCapable } = useMemo(() => {
    const allRules = extractRuleNames(config?.rules);
=======
  // Memoize expensive operations to avoid running on every resize
  const { allRules, modelCapable } = useMemo(() => {
    // Show all rules from config (command-line rules are already merged into config)
    const configRules =
      config?.rules?.map((rule: any) =>
        typeof rule === "string" ? rule : rule?.name || "Unknown",
      ) || [];

    const allRules = configRules;
>>>>>>> alsania-eco-echo

    // Check if model is capable - now checking both name and model properties
    const modelCapable = model
      ? isModelCapable(model.provider, model.name, model.model)
      : true; // Default to true if model not loaded yet

    return { allRules, modelCapable };
  }, [config?.rules, model?.provider, model?.name, model?.model]);

<<<<<<< HEAD
  // Render helper components
  const renderMcpPrompts = () =>
    mcpPrompts.length > 0 ? (
      <>
        {mcpPrompts.map((prompt, index) => (
          <Text key={`mcp-${index}`}>
            - <Text color="white">/{prompt.name}</Text>:{" "}
            <Text color="gray">{prompt.description}</Text>
          </Text>
        ))}
        <Text> </Text>
      </>
    ) : null;

  const renderRules = () =>
    allRules.length > 0 ? (
      <>
        <Text bold color="blue">
          Rules:
        </Text>
        {allRules.map((rule, index) => (
          <Text key={index}>
            - <Text color="white">{rule}</Text>
          </Text>
        ))}
        <Text> </Text>
      </>
    ) : null;

  const renderMcpServers = () =>
    (config?.mcpServers?.length ?? 0) > 0 ? (
      <>
        <Text bold color="blue">
          MCP Servers:
        </Text>
        {config?.mcpServers?.map((server: any, index: number) => (
          <Text key={index}>
            - <Text color="white">{server?.name}</Text>
          </Text>
        ))}
        <Text> </Text>
      </>
    ) : null;

=======
>>>>>>> alsania-eco-echo
  return (
    <Box flexDirection="column" paddingX={1} paddingY={1}>
      {/* ASCII Art */}
      <Text>{getDisplayableAsciiArt()}</Text>
      <Text> </Text>

<<<<<<< HEAD
      {/* Tips Display - shown randomly 1 in 5 times */}
      {showTip && <TipsDisplay />}

=======
>>>>>>> alsania-eco-echo
      {/* Agent name */}
      {config && (
        <Text color="blue">
          <Text bold>Agent:</Text> <Text color="white">{config.name}</Text>
        </Text>
      )}

      {/* Model */}
      {model ? (
        <Text color="blue">
          <Text bold>Model:</Text>{" "}
          <Text color="white">{model.name.split("/").pop()}</Text>
        </Text>
      ) : (
        <Text color="blue">
          <Text bold>Model:</Text> <Text color="gray">Loading...</Text>
        </Text>
      )}

      <Text> </Text>

      {/* Model capability warning */}
      {model && !modelCapable && (
        <>
          <ModelCapabilityWarning
            modelName={model.name.split("/").pop() || model.name}
          />
          <Text> </Text>
        </>
      )}

<<<<<<< HEAD
      {renderMcpPrompts()}
      {renderRules()}
      {renderMcpServers()}

      {/* Home directory warning */}
      {isInHomeDirectory && (
        <>
          <Text color="yellow">{HOME_DIRECTORY_WARNING}</Text>
=======
      {/* MCP prompts */}
      {mcpPrompts.length > 0 && (
        <>
          {mcpPrompts.map((prompt, index) => (
            <Text key={`mcp-${index}`}>
              - <Text color="white">/{prompt.name}</Text>:{" "}
              <Text color="gray">{prompt.description}</Text>
            </Text>
          ))}
          <Text> </Text>
        </>
      )}

      {/* Rules */}
      {allRules.length > 0 && (
        <>
          <Text bold color="blue">
            Rules:
          </Text>
          {allRules.map((rule, index) => (
            <Text key={index}>
              - <Text color="white">{rule}</Text>
            </Text>
          ))}
          <Text> </Text>
        </>
      )}

      {/* MCP Servers */}
      {(config?.mcpServers?.length ?? 0) > 0 && (
        <>
          <Text bold color="blue">
            MCP Servers:
          </Text>
          {config?.mcpServers?.map((server: any, index: number) => (
            <Text key={index}>
              - <Text color="white">{server?.name}</Text>
            </Text>
          ))}
>>>>>>> alsania-eco-echo
          <Text> </Text>
        </>
      )}
    </Box>
  );
};

export { IntroMessage };
