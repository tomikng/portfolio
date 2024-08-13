import React from "react";

interface TerminalInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
  inputRef,
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    className="flex-grow bg-transparent focus:outline-none text-white font-mono text-xs sm:text-sm md:text-base p-2"
    ref={inputRef}
  />
);

export default TerminalInput;
