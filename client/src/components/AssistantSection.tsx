import React, { useState, useRef, useEffect } from "react";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { getGeminiResponse } from "@/lib/gemini";

interface Message {
  role: "assistant" | "user";
  content: string;
  typing?: boolean;
}

export default function AssistantSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AADHARVA Assistant. How can I help you with rural development challenges today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Water quality options",
    "Agricultural predictions",
    "Education resources",
    "Health monitoring",
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (messageText: string = input) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Add placeholder for assistant response with typing effect
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", typing: true },
      ]);

      // Get response from Gemini API
      const response = await getGeminiResponse(messageText);

      // Update with actual response
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error getting response:", error);
      // Update with error message
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="assistant" className="mb-12">
      <div className="flex items-center mb-6">
        <h2 className="font-rajdhani uppercase text-2xl font-bold text-[var(--cyber-cyan)] tracking-wider">AI Assistant</h2>
        <div className="cyber-line flex-grow ml-4"></div>
      </div>

      <SciFiCard className="p-6 rounded-lg">
        <div className="flex items-center mb-6">
          <div
            className="h-12 w-12 rounded-full bg-[var(--cyber-purple)]/20 flex items-center justify-center mr-4 glowing-border"
            style={{ boxShadow: "0 0 10px rgba(124, 58, 237, 0.5)" }}
          >
            <i className="fas fa-robot text-[var(--cyber-purple)] text-xl"></i>
          </div>
          <div>
            <h3 className="font-rajdhani text-xl font-bold text-[var(--cyber-purple)]">AADHARVA ASSISTANT</h3>
            <p className="text-xs text-gray-400">Powered by Gemini AI</p>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="bg-[var(--cyber-dark)] p-4 rounded-lg mb-4 h-64 overflow-y-auto custom-scrollbar"
        >
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 flex ${message.role === "user" ? "justify-end" : ""}`}>
              {message.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-[var(--cyber-purple)]/20 flex items-center justify-center mr-2 flex-shrink-0">
                  <i className="fas fa-robot text-[var(--cyber-purple)] text-sm"></i>
                </div>
              )}
              <div
                className={`sci-fi-card p-3 rounded-lg max-w-[80%] ${
                  message.role === "user"
                    ? "bg-[var(--cyber-blue-light)]/20 border-[var(--cyber-blue-light)]/30"
                    : ""
                } ${message.typing ? "typing-effect" : ""}`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-[var(--cyber-blue-light)]/20 flex items-center justify-center ml-2 flex-shrink-0">
                  <i className="fas fa-user text-[var(--cyber-blue-light)] text-sm"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Ask about rural development solutions..."
            className="bg-[var(--cyber-dark)] border border-gray-700 rounded-l-lg py-3 px-4 w-full focus:outline-none focus:border-[var(--cyber-purple)] text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
          />
          <button
            className="bg-[var(--cyber-purple)] text-white px-4 rounded-r-lg flex items-center justify-center disabled:opacity-50"
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {quickPrompts.map((prompt, index) => (
            <CyberButton
              key={index}
              variant="secondary"
              size="sm"
              className="text-center justify-center"
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </CyberButton>
          ))}
        </div>
      </SciFiCard>
    </section>
  );
}
