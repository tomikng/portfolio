import React from "react";

const AsciiArt: React.FC = () => (
  <div className="w-1/3 p-4 border-r border-gray-700 flex items-center justify-center">
    <div className="text-center">
      <pre className="text-cyan-300 text-xs inline-block text-left">
        {`
 _________  ________  _____ ______      
|\\___   ___\\\\   __  \\|\\   _ \\  _   \\    
\\|___ \\  \\_\\ \\  \\|\\  \\ \\  \\\\\\__\\ \\  \\   
     \\ \\  \\ \\ \\  \\\\\\  \\ \\  \\\\|__| \\  \\  
      \\ \\  \\ \\ \\  \\\\\\  \\ \\  \\    \\ \\  \\ 
       \\ \\__\\ \\ \\_______\\ \\__\\    \\ \\__\\
        \\|__|  \\|_______|\\|__|     \\|__|
        `}
      </pre>
      <div className="mt-4 text-yellow-300">
        Welcome to my digital space!
        <br />
        Explore using the terminal.
      </div>
    </div>
  </div>
);

export default AsciiArt;
