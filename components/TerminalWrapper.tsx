import React from "react";

interface TerminalWrapperProps {
  children: React.ReactNode;
}

const TerminalWrapper: React.FC<TerminalWrapperProps> = ({ children }) => (
  <div className="flex-grow p-2 sm:p-4 flex flex-col h-[calc(100vh-12rem)] md:h-screen bg-gray-900">
    {children}
  </div>
);

export default TerminalWrapper;
