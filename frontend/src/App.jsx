import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import api from './utility/api';
import runFlow from './utility/langflowApi';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');

    try {
      // const response = await api.post('/endpoint', { message: input }); // Replace '/endpoint' with the actual API path
      const response ="await api.post('/endpoint', { message: input })"; // Replace '/endpoint' with the actual API path

      if (response.status !== 200) {
        throw new Error('Failed to get response from API');
      }

      const data = response.data; // Axios response data
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    }
  };

  useEffect(() => {
    const testRunFlow = async (message) => {
      try {
        const res = await runFlow(message);
        console.log('Flow response:', res);
      } catch (error) {
        console.error('Error on run Flow:', error);
      }
    };

    testRunFlow('tell me about reel post');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Social Media Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
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
              className="flex-grow"
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
