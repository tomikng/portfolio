"use client";

import React from "react";
import AsciiArt from "../components/AsciiArt";
import Terminal from "../components/Terminal";

export default function Home() {
  return (
    <div className="bg-gray-900 text-green-500 min-h-screen font-mono flex">
      <AsciiArt />
      <Terminal />
    </div>
  );
}
