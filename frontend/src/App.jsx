import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Send,
  Activity,
  User,
  BotMessageSquareIcon,
  MessageCircleQuestion,
  GithubIcon,
} from "lucide-react";
import api from "./utility/api";
import ReactMarkdown from "react-markdown";

const Logo = () => (
  <div className="flex items-center gap-3 p-2">
    <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200">
      <Activity className="h-6 w-6 text-white md:h-7 md:w-7" />
    </div>
    <div>
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        TechMate
      </h1>
      <p className="text-xs md:text-sm text-gray-400">
        Social Media Analyzer Bot
      </p>
    </div>
  </div>
);

const QuickPrompts = ({ onPromptClick }) => {
  const prompts = [
    "Tell me about best post type!",
    "Which Post has Highest Engagement",
    "Any strategy to boost Engagement",
    "Tell me elements in post",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onPromptClick(prompt)}
          className="text-sm text-left px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors duration-200 flex items-center gap-2"
        >
          <MessageCircleQuestion className="h-4 w-4" />
          {prompt}
        </button>
      ))}
    </div>
  );
};

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  document.title = "TechMate - Social Media Analyzer 🤖";
  useEffect(() => {
    const startBackend = async () => {
      try {
        await api.get("/");
      } catch (error) {
        console.error("Error starting backend:", error);
      }
    };

    startBackend();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await api.post("/api/chat", { message: input });
      if (response.status !== 200) {
        throw new Error("Failed to get response from API");
      }
      const data = response.data;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.outputs[0].outputs[0].results.message.text,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 p-4">
      <Card className="w-full max-w-3xl border-gray-800 bg-gray-900/95 shadow-2xl backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800">
          <Logo />
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <ScrollArea className="h-[50vh] md:h-[60vh] pr-4" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <Activity className="h-12 w-12 mb-4 animate-pulse" />
                  <p className="text-center text-sm md:text-base">
                    Start analyzing social media trends by sending a message
                  </p>
                </div>
                <QuickPrompts onPromptClick={handlePromptClick} />
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-4 items-start ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-600/10 flex items-center justify-center mr-2">
                    <BotMessageSquareIcon className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm md:text-base ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600/10 flex items-center justify-center ml-2">
                    <User className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center">
                  <BotMessageSquareIcon className="h-6 w-6 text-purple-400 animate-pulse" />
                </div>
                <div className="space-y-2.5 flex-1">
                  <Skeleton className="h-4 w-3/4 bg-gray-800" />
                  <Skeleton className="h-4 w-1/2 bg-gray-800" />
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t border-gray-800 p-4 md:p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full space-x-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Analyze about social media..."
              className="flex-grow bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 rounded-full p-3 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              <Send className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </form>
        </CardFooter>
        <CardFooter className="text-center text-slate-700 text-sm">
          Bot can produce errors. Please refresh & try again.
        </CardFooter>
      </Card>
      <Card className="fixed bottom-1 bg-transparent border-none">
        <CardContent>
          <a
            href="https://github.com/KRSNAGUPTA/preHackathon-assignment-level-superMind"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-gray-100 transition-all ease-in-out duration-300"
          >
            <GithubIcon className="h-5 w-5" />
            GitHub - TEAM
            <span className="text-indigo-600 hover:text-indigo-400 font-bold">
              TechMate
            </span>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
