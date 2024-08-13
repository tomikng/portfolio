import React from "react";
import OutputLine from "./OutputLine";

interface TerminalOutputProps {
  output: Array<{ text: string; color: string; isHtml?: boolean }>;
  isTyping: boolean;
  displayedText: string;
  outputRef: React.RefObject<HTMLDivElement>;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({
  output,
  isTyping,
  displayedText,
  outputRef,
}) => (
  <div
    ref={outputRef}
    className="flex-grow overflow-y-auto whitespace-pre-wrap scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
  >
    {output.map((line, index) => (
      <OutputLine key={index} line={line} index={index} />
    ))}
    {isTyping && (
      <pre
        className="text-white font-mono text-xs sm:text-sm md:text-base break-words whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: displayedText }}
      />
    )}
  </div>
);

export default TerminalOutput;
