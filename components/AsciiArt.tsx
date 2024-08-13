import React from "react";

const AsciiArt: React.FC = () => (
  <div className="w-1/3 p-4 border-r border-gray-700 flex items-center justify-center">
    <pre className="text-cyan-300 text-xs">
      {`
   ____          _           
  / ___|___   __| | ___  ___ 
 | |   / _ \\ / _\` |/ _ \\/ __|
 | |__| (_) | (_| |  __/\\__ \\
  \\____\\___/ \\__,_|\\___||___/
                             
 Welcome to my digital space!
 Explore using the terminal.
      `}
    </pre>
  </div>
);

export default AsciiArt;
