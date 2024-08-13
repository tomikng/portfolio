import React from "react";

interface OutputLineProps {
  line: {
    text: string;
    color: string;
    isHtml?: boolean;
  };
  index: number;
}

const OutputLine: React.FC<OutputLineProps> = ({ line, index }) => {
  if (line.isHtml) {
    return (
      <pre
        key={index}
        className={`${line.color} font-mono text-xs sm:text-sm md:text-base break-words whitespace-pre-wrap`}
        dangerouslySetInnerHTML={{ __html: line.text }}
      />
    );
  } else {
    return (
      <pre
        key={index}
        className={`${line.color} font-mono text-xs sm:text-sm md:text-base break-words whitespace-pre-wrap`}
      >
        {line.text}
      </pre>
    );
  }
};

export default OutputLine;
