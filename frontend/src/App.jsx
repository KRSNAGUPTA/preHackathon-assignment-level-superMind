import React, { useEffect, useState } from "react";
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
import { Send, Activity, User, Bot } from "lucide-react";
import api from "./utility/api";
import ReactMarkdown from "react-markdown";
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="p-2 bg-blue-600 rounded-lg">
      <Activity className="h-6 w-6 text-white" />
    </div>
    <div>
      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        TechMate
      </h1>
      <p className="text-xs text-gray-400">Social Media Analyzer Bot</p>
    </div>
  </div>
);

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startBackend = async () => {
      try {
        const res = await api.get("/");
      } catch (error) {
        console.error("Error starting backend:", error);
      }
    };

    startBackend();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Sending message to API:", input);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <Card className="w-full max-w-2xl border-gray-800 bg-gray-900">
        <CardHeader>
          <Logo />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Activity className="h-12 w-12 mb-4" />
                <p className="text-center">
                  Start analyzing social media trends by sending a message
                </p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-2">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                )}
                <div
                  className={`inline-block p-3 rounded-2xl max-w-[80%] transition-all duration-200 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                {message.role === "user" && (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center ml-2">
                    <User className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-4 mb-4 animate-pulse">
                <Skeleton className="w-10 h-10 rounded-full bg-purple-600" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4 bg-gray-800" />
                  <Skeleton className="h-4 w-1/2 bg-gray-800" />
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t border-gray-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full space-x-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about social media trends..."
              className="flex-grow bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              <Send className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
