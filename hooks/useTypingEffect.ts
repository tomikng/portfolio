import { useState, useEffect } from "react";

const useTypingEffect = (speed: number) => {
  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isTyping && index < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (index >= fullText.length) {
      setIsTyping(false);
    }
  }, [fullText, index, speed, isTyping]);

  const startTyping = (text: string) => {
    setFullText(text);
    setDisplayedText("");
    setIndex(0);
    setIsTyping(true);
  };

  return { displayedText, isTyping, startTyping };
};

export default useTypingEffect;
