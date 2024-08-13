"use client";

import React, { useState, useEffect, useRef } from "react";
import useTypingEffect from "../hooks/useTypingEffect";
import { aboutMeContent } from "@/aboutMeContent";
import TerminalWrapper from "./TerminalWrapper";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import Suggestions from "./Suggestions";

interface Command {
  [key: string]: string;
}

const commands: Command = {
  help: "Throws you a lifeline in this digital ocean 🛟",
  about: "Unravels the mystery of who's behind this terminal 🕵️‍♂️",
  skills: "Reveals my superpowers (no cape included) 🦸‍♂️",
  projects: "Showcases my digital offspring 👨‍💻",
  contact: "Summons my virtual bat-signal 🦇",
  socials: "Discover where I hang out in the digital realm 🌐",
  download: "Beams my CV directly to your device 📡",
  clear: "Performs a magic trick and makes everything disappear 🎩✨",
  school: "My school notes for fellow students 🎓",
  whoami: "Existential crisis initiator. Proceed with caution! 🤔",
  coffee: "Attempts to dispense virtual coffee. No refunds for spills ☕",
  reddit: "Nice try, but shouldn't you be coding? 😉",
  exit: "There is no escape. You're here forever. Muahaha! 🏃‍♂️🚪",
};

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<
    Array<{ text: string; color: string; isHtml?: boolean }>
  >([
    { text: "Welcome to my digital space!", color: "text-cyan-300" },
    {
      text: "For the best experience, please use a desktop browser. 🖥️",
      color: "text-yellow-300",
    },
    {
      text: "However, this site is also responsive for mobile devices. 📱",
      color: "text-yellow-300",
    },
    { text: 'Type "help" to see available commands.', color: "text-cyan-300" },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const { displayedText, isTyping, startTyping } = useTypingEffect(2);

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
    const value = e.target.value;
    setInput(value);
    updateSuggestions(value);
    setSelectedSuggestionIndex(-1);
  };

  const updateSuggestions = (value: string) => {
    if (value.length > 0) {
      const matchedCommands = Object.keys(commands).filter((cmd) =>
        cmd.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(matchedCommands);
    } else {
      setSuggestions([]);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOutput((prev) => [
      ...prev,
      { text: `$ ${input}`, color: "text-blue-400" },
    ]);
    processCommand(input);
    setInput("");
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex + 1 >= suggestions.length ? 0 : prevIndex + 1,
      );
    } else if (e.key === "Enter") {
      if (selectedSuggestionIndex !== -1) {
        e.preventDefault();
        handleSuggestionClick(suggestions[selectedSuggestionIndex]);
      } else {
        handleInputSubmit(e);
      }
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.setAttribute("readonly", "readonly");
    setTimeout(() => {
      e.target.removeAttribute("readonly");
    }, 100);
  };

  const downloadCV = () => {
    const cvUrl = "/CV.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Tomas_Nguyen_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const processCommand = (cmd: string) => {
    switch (cmd.toLowerCase()) {
      case "help":
        startTyping(`
<span class="text-cyan-300">[ General Commands ]</span>
• <span class="text-yellow-300">help</span>: <span class="text-green-300">${commands.help}</span>
• <span class="text-yellow-300">clear</span>: <span class="text-green-300">${commands.clear}</span>
• <span class="text-yellow-300">exit</span>: <span class="text-green-300">${commands.exit}</span>

<span class="text-cyan-300">[ About Me ]</span>
• <span class="text-yellow-300">about</span>: <span class="text-green-300">${commands.about}</span>
• <span class="text-yellow-300">whoami</span>: <span class="text-green-300">${commands.whoami}</span>

<span class="text-cyan-300">[ Skills & Projects ]</span>
• <span class="text-yellow-300">skills</span>: <span class="text-green-300">${commands.skills}</span>
• <span class="text-yellow-300">projects</span>: <span class="text-green-300">${commands.projects}</span>

<span class="text-cyan-300">[ Miscellaneous ]</span>
• <span class="text-yellow-300">contact</span>: <span class="text-green-300">${commands.contact}</span>
• <span class="text-yellow-300">socials</span>: <span class="text-green-300">${commands.socials}</span>
• <span class="text-yellow-300">download</span>: <span class="text-green-300">${commands.download}</span>
• <span class="text-yellow-300">coffee</span>: <span class="text-green-300">${commands.coffee}</span>
• <span class="text-yellow-300">reddit</span>: <span class="text-green-300">${commands.reddit}</span>

<span class="text-cyan-300">[ Educational ]</span>
• <span class="text-yellow-300">school</span>: <span class="text-green-300">${commands.school}</span>
`);
        break;
      case "about":
        startTyping(aboutMeContent);
        break;
      case "skills":
        startTyping(`
<span class="text-cyan-300">[ Technical Skills ]</span> 💻
• Frontend: React ⚛️, JavaScript 🌐, TypeScript 🟦
• Backend: Django 🐍, Node.js 🟢, PHP 🐘, NestJS 🦅
• Languages: Python 🐍, C# 🖥️, Java ☕, Kotlin 📱, C++ 🖥️
• Database: SQL 📊, PostgreSQL 🐘, MariaDB 🐬, MongoDB 🍃, Firebase 🔥, SQLite 📦, Redis 🔄, ...
• Others: LaTeX 📄, Docker 🐳
      `);
        break;
      case "projects":
        startTyping(`
<span class="text-cyan-300">[ Notable Projects ]</span> 🏗️

1. <span class="text-yellow-300">Web Crawler with UI</span>
   • <span class="text-green-300">Tech Stack:</span> React, Django, PostgreSQL, MaterialUI
   • <span class="text-green-300">Description:</span> A web application that crawls websites and presents the data in a user-friendly interface.
   • <span class="text-green-300">Key Features:</span> Customizable crawl parameters, data visualization, export functionality

2. <span class="text-yellow-300">Guest Form for Booking</span>
   • <span class="text-green-300">Tech Stack:</span> React, Django, PostgreSQL, MaterialUI
   • <span class="text-green-300">Description:</span> A streamlined booking system for managing guest reservations.
   • <span class="text-green-300">Key Features:</span> Real-time availability, user authentication, email notifications

3. <span class="text-yellow-300">Web-based POS System - Bachelor thesis</span>
   • <span class="text-green-300">Tech Stack:</span> React, Django, PostgreSQL, AntUI
   • <span class="text-green-300">Description:</span> A comprehensive point-of-sale system designed for modern businesses.
   • <span class="text-green-300">Key Features:</span> Inventory management, sales analytics, multi-user support
   • <span class="text-green-300">Link:</span> <a href="http://tirpitz.ms.mff.cuni.cz:3003/" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">View Project</a>

4. <span class="text-yellow-300">URL Search Engine (Python)</span>
   • <span class="text-green-300">Description:</span> A custom search engine implementation for indexing and searching URLs.
   • <span class="text-green-300">Key Features:</span> Fast indexing, relevance ranking, keyword highlighting
   • <span class="text-green-300">Link:</span> <a href="https://github.com/tomikng/URL-Search-Engine" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">View on GitHub</a>

5. <span class="text-yellow-300">Java-todolist</span>
   • <span class="text-green-300">Tech Stack:</span> Java
   • <span class="text-green-300">Description:</span> Project for nprg013 at MFFUK
   • <span class="text-green-300">Link:</span> <a href="https://github.com/tomikng/Java-todolist" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">View on GitHub</a>

6. <span class="text-yellow-300">eafc-api</span>
   • <span class="text-green-300">Tech Stack:</span> C#
   • <span class="text-green-300">Description:</span> Basic Notification Bot for EAFC new players
   • <span class="text-green-300">Link:</span> <a href="https://github.com/tomikng/eafc-api" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">View on GitHub</a>

7. <span class="text-yellow-300">Higher-order-EASE</span>
   • <span class="text-green-300">Tech Stack:</span> Python
   • <span class="text-green-300">Description:</span> Implementation of Higher-order Collaborative Filtering for 
   Improved Recommendation Systems using forked EasyStudy Framework
   • <span class="text-green-300">Note:</span> Forked from pdokoupil/EasyStudy
   • <span class="text-green-300">Link:</span> <a href="https://github.com/tomikng/Higher-order-EASE" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">View on GitHub</a>

8. <span class="text-yellow-300">Android-todo-list</span>
    • <span class="text-green-300">Tech Stack:</span> Kotlin
    • <span class="text-green-300">Description:</span> Simple Android todo list
    • <span class="text-green-300">Link:</span> <a href="https://gitlab.mff.cuni.cz/nguyeha/android-todo-list" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">View on GitLab</a>  
`);
        break;
      case "contact":
        startTyping(`
<span class="text-cyan-300">[ Contact Information ]</span> 📬
• <span class="text-yellow-300">Email:</span> tomasnguyen43@gmail.com 📧
• <span class="text-yellow-300">Phone:</span> (+420) 720 072 938 📞
• <span class="text-yellow-300">LinkedIn:</span> linkedin.com/in/hai-hung-nguyen/ 🔗
      `);
        break;
      case "download":
        downloadCV();
        startTyping(`
<span class="text-green-400">Downloading CV... </span>✅
<span class="text-yellow-300">If the download doesn't start automatically, please check your browser settings.</span>
      `);
        break;
      case "clear":
        setOutput([]);
        break;
      case "whoami":
        startTyping(
          "You are you, unless you're not. In that case, who are you? 🤯",
        );
        break;
      case "coffee":
        startTyping(
          "☕ *virtual coffee materializes* Oops, it spilled on your keyboard!",
        );
        break;
      case "reddit":
        startTyping(
          "Nice try! But remember, with great programming power comes great Reddit responsibility. 🕷️",
        );
        break;
      case "exit":
        startTyping(
          "Error 404: Exit not found. You're stuck with my awesome terminal forever! 😄",
        );
        break;
      case "socials":
        startTyping(`
<span class="text-cyan-300">[ Social Media ]</span> 🌐
• <span class="text-yellow-300">LinkedIn:</span> <a href="https://linkedin.com/in/hai-hung-nguyen/" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">linkedin.com/in/hai-hung-nguyen/</a> 💼
• <span class="text-yellow-300">GitHub:</span> <a href="https://github.com/tomikng" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">github.com/tomikng</a> 🐙
• <span class="text-yellow-300">Instagram:</span> <a href="https://instagram.com/zluteej" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">@zluteej</a> 📸
        `);
        break;
      case "school":
        window.location.href = `https://mff-notes.vercel.app/`;
        break;
      default:
        startTyping(
          `Command not found: ${cmd}. Type "help" for available commands.`,
        );
    }
  };

  return (
    <TerminalWrapper>
      <TerminalOutput
        output={output}
        isTyping={isTyping}
        displayedText={displayedText}
        outputRef={outputRef}
      />
      <div className="h-px bg-gray-600 my-2"></div>
      <form
        onSubmit={handleInputSubmit}
        className="flex mt-2 items-center relative"
      >
        <span className="text-blue-400 font-mono text-xs sm:text-sm md:text-base px-2">
          $
        </span>
        <TerminalInput
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          inputRef={inputRef}
        />
        {suggestions.length > 0 && (
          <Suggestions
            suggestions={suggestions}
            selectedIndex={selectedSuggestionIndex}
            onSuggestionClick={handleSuggestionClick}
            commands={commands}
          />
        )}
      </form>
    </TerminalWrapper>
  );
};

export default Terminal;
