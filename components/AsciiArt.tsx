import React from "react";

const AsciiArt: React.FC = () => (
  <div className="w-full md:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-700 flex items-center justify-center">
    <div className="text-center">
      <pre className="text-cyan-300 text-[0.5rem] sm:text-xs md:text-sm lg:text-base inline-block text-left overflow-x-auto">
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
      <div className="mt-4 text-yellow-300 text-sm sm:text-base">
        Welcome to my digital space!
        <br />
        Explore using the terminal.
      </div>
    </div>
  </div>
);

export default AsciiArt;
