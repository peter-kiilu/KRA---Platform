import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Send, Bot, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const mockKRAResponses = {
  "tax return": "To file your tax return with KRA:\n1. Log into iTax portal\n2. Select 'Returns' menu\n3. Choose your return type (Individual/Corporate)\n4. Fill required fields\n5. Submit before deadline (June 30th for individuals)",
  "pin registration": "To register for KRA PIN:\n1. Visit any Huduma Centre or KRA office\n2. Carry original ID and copy\n3. Fill KRA PIN registration form\n4. Submit and collect PIN certificate\n5. Activate PIN on iTax portal",
  "compliance certificate": "KRA Tax Compliance Certificate shows you're up to date with tax obligations. Required for:\n• Government tenders\n• Business licenses\n• Bank loan applications\nValid for 12 months from issue date.",
};

function formatGeminiResponse(text: string): string {
  // Remove leading asterisks and whitespace from each line
  let lines = text.split('\n').map(line => line.replace(/^\s*[\*\•]\s*/, ''));
  // Make the first phrase before a colon or period bold
  lines = lines.map(line => {
    const match = line.match(/^(.+?)(:|\.)\s*(.*)$/);
    if (match) {
      return `**${match[1].trim()}${match[2]}** ${match[3]}`;
    }
    return line;
  });
  return lines.join('\n');
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your KRA services assistant. I can help you with tax returns, PIN registration, compliance certificates, and other KRA processes. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('kra-assistant', {
        body: { message: userMessage }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      return data.response || "I'm sorry, I couldn't process your request at the moment. Please try again.";
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback to existing responses for common queries
      const lowerMessage = userMessage.toLowerCase();
      
      for (const [keyword, response] of Object.entries(mockKRAResponses)) {
        if (lowerMessage.includes(keyword)) {
          return response;
        }
      }
      
      return "I'm experiencing technical difficulties. Please try again later or contact KRA directly for assistance.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const currentInput = inputValue;
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const botRawResponse = await generateBotResponse(currentInput);
      const botResponseContent = formatGeminiResponse(botRawResponse);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponseContent,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm experiencing technical difficulties. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-card border rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <Bot className="w-6 h-6 mr-3" />
        <div>
          <h3 className="font-semibold">KRA Services Assistant</h3>
          <p className="text-sm opacity-90">
            Get help with government services
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "ml-2 bg-primary"
                    : "mr-2 bg-secondary"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 text-secondary-foreground" />
                )}
              </div>
              <Card
                className={`p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.sender === "bot" ? (
                  <div className="text-sm whitespace-pre-wrap">
                    <ReactMarkdown>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                )}
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </Card>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-secondary">
                <Bot className="w-4 h-4 text-secondary-foreground" />
              </div>
              <Card className="p-3 bg-muted">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </Card>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about KRA services, tax returns, PIN registration..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}