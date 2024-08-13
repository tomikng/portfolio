"use client";

import React, { useState, useEffect, useRef } from "react";

const commands = {
  help: "Shows available commands",
  about: "Displays information about me",
  skills: "Lists my technical skills",
  projects: "Shows my projects",
  contact: "Displays my contact information",
  clear: "Clears the terminal",
};

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([
    'Welcome to my portfolio! Type "help" to see available commands.',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput("");
  };

  const processCommand = (cmd: string) => {
    setOutput((prev) => [...prev, `$ ${cmd}`]);

    switch (cmd.toLowerCase()) {
      case "help":
        setOutput((prev) => [
          ...prev,
          Object.entries(commands)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n"),
        ]);
        break;
      case "about":
        setOutput((prev) => [
          ...prev,
          "I'm a passionate developer with experience in web technologies.",
        ]);
        break;
      case "skills":
        setOutput((prev) => [
          ...prev,
          "TypeScript, React, Next.js, Tailwind CSS, Node.js",
        ]);
        break;
      case "projects":
        setOutput((prev) => [
          ...prev,
          "1. This terminal portfolio\n2. E-commerce platform\n3. Weather app",
        ]);
        break;
      case "contact":
        setOutput((prev) => [
          ...prev,
          "Email: tomasnguyen43@gmail.com.com\nGitHub: github.com/tomikng",
        ]);
        break;
      case "clear":
        setOutput([]);
        break;
      default:
        setOutput((prev) => [
          ...prev,
          `Command not found: ${cmd}. Type "help" for available commands.`,
        ]);
    }
  };

  return (
    <div className="bg-black text-green-500 min-h-screen p-4 font-mono">
      <div className="max-w-3xl mx-auto">
        {output.map((line, index) => (
          <pre key={index} className="whitespace-pre-wrap">
            {line}
          </pre>
        ))}
        <form onSubmit={handleInputSubmit} className="flex">
          <span className="mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow bg-transparent focus:outline-none"
            ref={inputRef}
          />
        </form>
      </div>
    </div>
  );
}
