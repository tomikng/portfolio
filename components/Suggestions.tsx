import React from "react";

interface SuggestionsProps {
  suggestions: string[];
  selectedIndex: number;
  onSuggestionClick: (suggestion: string) => void;
  commands: Record<string, string>;
}

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  selectedIndex,
  onSuggestionClick,
  commands,
}) => (
  <div className="absolute left-0 right-0 bottom-full bg-gray-800 border border-gray-600 rounded-t-md">
    {suggestions.map((suggestion, index) => (
      <div
        key={index}
        className={`px-2 py-1 cursor-pointer hover:bg-gray-700 text-white font-mono text-xs sm:text-sm md:text-base flex justify-between items-center ${
          index === selectedIndex ? "bg-gray-700" : ""
        }`}
        onClick={() => onSuggestionClick(suggestion)}
      >
        <span>{suggestion}</span>
        <div className="flex items-center">
          <span className="text-gray-200 text-xs mr-2">
            {commands[suggestion]}
          </span>
          <span className="text-cyan-300 text-xs">
            {index === selectedIndex ? "Press Enter" : "Tab to select"}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default Suggestions;
