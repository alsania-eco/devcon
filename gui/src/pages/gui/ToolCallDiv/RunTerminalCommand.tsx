import { ToolCallState } from "core";
import { useMemo } from "react";
import Ansi from "../../../components/ansiTerminal/Ansi";
import StyledMarkdownPreview from "../../../components/StyledMarkdownPreview";
import { useAppDispatch } from "../../../redux/hooks";
import { moveTerminalProcessToBackground } from "../../../redux/thunks/moveTerminalProcessToBackground";
import { TerminalCollapsibleContainer } from "./TerminalCollapsibleContainer";

interface RunTerminalCommandToolCallProps {
  command: string;
  toolCallState: ToolCallState;
  toolCallId: string | undefined;
}

interface StatusIconProps {
  status: "running" | "completed" | "failed" | "background";
}

function StatusIcon({ status }: StatusIconProps) {
  const getStatusColor = () => {
    switch (status) {
      case "running":
        return "bg-success";
      case "completed":
        return "bg-success";
      case "background":
        return "bg-accent";
      case "failed":
        return "bg-error";
      default:
        return "bg-success";
    }
  };

  return (
    <span
      className={`mr-2 h-2 w-2 rounded-full ${getStatusColor()} ${
        status === "running" ? "animate-pulse" : ""
      }`}
    />
  );
}

export function RunTerminalCommand(props: RunTerminalCommandToolCallProps) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
  const dispatch = useAppDispatch();

  // Find the terminal output from context items if available
  const terminalItem = props.toolCallState.output?.find(
    (item) => item.name === "Terminal",
  );
=======
  // For errored status, show any output (error messages)
  // Otherwise look for terminal output specifically
  const isErrored = props.toolCallState.status === "errored";
  const outputItem = isErrored
    ? props.toolCallState.output?.[0] // Get first output item for errors
    : props.toolCallState.output?.find((item) => item.name === "Terminal");
>>>>>>> upstream/sigmasauer07

  const terminalContent = outputItem?.content || "";
  const statusMessage = outputItem?.status || "";
  const isRunning = props.toolCallState.status === "calling";
  const hasOutput = terminalContent.length > 0;

  const displayLines = 15;

  // Process terminal content for line limiting
  const processedTerminalContent = useMemo(() => {
    if (!terminalContent)
      return {
        fullContent: "",
        limitedContent: "",
        totalLines: 0,
        isLimited: false,
        hiddenLinesCount: 0,
      };

    const lines = terminalContent.split("\n");
    const totalLines = lines.length;

    if (totalLines > displayLines) {
      const lastTwentyLines = lines.slice(-displayLines);
      return {
        fullContent: terminalContent,
        limitedContent: lastTwentyLines.join("\n"),
        totalLines,
        isLimited: true,
        hiddenLinesCount: totalLines - displayLines,
      };
    }

    return {
      fullContent: terminalContent,
      limitedContent: terminalContent,
      totalLines,
      isLimited: false,
      hiddenLinesCount: 0,
    };
  }, [terminalContent]);

  // Determine status type
  let statusType: "running" | "completed" | "failed" | "background" =
    "completed";
  if (isRunning) {
    statusType = "running";
  } else if (isErrored || statusMessage?.includes("failed")) {
    statusType = "failed";
  } else if (statusMessage?.includes("background")) {
    statusType = "background";
  }

  return (
    <div className="mb-4">
      {/* Command */}
      <StyledMarkdownPreview
        isRenderingInStepContainer
        source={`\`\`\`bash .sh\n$ ${props.command ?? ""}\n\`\`\``}
      />

      {/* Terminal output with ANSI support */}
      {isRunning && !hasOutput && (
        <div className="mt-2 px-4 py-2">Waiting for output...</div>
      )}
      {hasOutput && (
        <TerminalCollapsibleContainer
          collapsible={processedTerminalContent.isLimited}
          hiddenLinesCount={processedTerminalContent.hiddenLinesCount}
          className="mt-2"
          collapsedContent={
            <div className="mt-2">
              <Ansi>{processedTerminalContent.limitedContent}</Ansi>
            </div>
          }
          expandedContent={
            <div className="mt-2">
              <Ansi>{processedTerminalContent.fullContent}</Ansi>
            </div>
          }
        />
      )}

      {/* Status information */}
      {(statusMessage || isRunning) && (
        <div className="text-description mt-2 flex items-center px-2 text-xs">
          <StatusIcon status={statusType} />
          {isRunning ? "Running" : statusMessage}
          {isRunning && props.toolCallId && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // Dispatch the action to move the command to the background
                dispatch(
                  moveTerminalProcessToBackground({
                    toolCallId: props.toolCallId as string,
                  }),
                );
              }}
              className="text-link ml-3 cursor-pointer text-xs no-underline hover:underline"
            >
              Move to background
            </a>
          )}
        </div>
      )}
    </div>
  );
}
