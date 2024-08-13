import React, { useState, useEffect, useRef } from "react";
import useTypingEffect from "../hooks/useTypingEffect";

const commands = {
  help: "Shows available commands",
  about: "Displays information about me",
  skills: "Lists my technical skills",
  projects: "Shows my projects",
  contact: "Displays my contact information",
  clear: "Clears the terminal",
};

const Terminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<
    Array<{ text: string; color: string; isHtml?: boolean }>
  >([
    {
      text: 'Welcome to my portfolio! Type "help" to see available commands.',
      color: "text-cyan-300",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const { displayedText, isTyping, startTyping } = useTypingEffect(10);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isTyping && displayedText) {
      setOutput((prev) => [
        ...prev,
        { text: displayedText, color: "text-white", isHtml: true },
      ]);
    }
  }, [isTyping, displayedText]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, displayedText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOutput((prev) => [
      ...prev,
      { text: `$ ${input}`, color: "text-blue-400" },
    ]);
    processCommand(input);
    setInput("");
  };

  const processCommand = (cmd: string) => {
    switch (cmd.toLowerCase()) {
      case "help":
        startTyping(
          Object.entries(commands)
            .map(
              ([key, value]) =>
                `<span class="text-yellow-300">${key}</span>: <span class="text-green-300">${value}</span>`,
            )
            .join("\n"),
        );
        break;
      case "about":
        startTyping(
          "I'm a passionate developer with experience in web technologies.",
        );
        break;
      case "skills":
        startTyping("TypeScript, React, Next.js, Tailwind CSS, Node.js");
        break;
      case "projects":
        startTyping(
          "1. This terminal portfolio\n2. E-commerce platform\n3. Weather app",
        );
        break;
      case "contact":
        startTyping("Email: example@email.com\nGitHub: github.com/example");
        break;
      case "clear":
        setOutput([]);
        break;
      default:
        startTyping(
          `Command not found: ${cmd}. Type "help" for available commands.`,
        );
    }
  };

  const renderOutputLine = (
    line: { text: string; color: string; isHtml?: boolean },
    index: number,
  ) => {
    if (line.isHtml) {
      return (
        <pre
          key={index}
          className={line.color}
          dangerouslySetInnerHTML={{ __html: line.text }}
        />
      );
    } else {
      return (
        <pre key={index} className={line.color}>
          {line.text}
        </pre>
      );
    }
  };

  return (
    <div className="flex-grow p-4 flex flex-col h-screen">
      <div
        ref={outputRef}
        className="flex-grow overflow-y-auto whitespace-pre-wrap
                   scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {output.map(renderOutputLine)}
        {isTyping && (
          <pre
            className="text-white"
            dangerouslySetInnerHTML={{ __html: displayedText }}
          />
        )}
      </div>
      <div className="h-px bg-gray-600 my-2"></div>
      <form onSubmit={handleInputSubmit} className="flex mt-2">
        <span className="mr-2 text-blue-400">$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-grow bg-transparent focus:outline-none text-white"
          ref={inputRef}
        />
      </form>
    </div>
  );
};

export default Terminal;
