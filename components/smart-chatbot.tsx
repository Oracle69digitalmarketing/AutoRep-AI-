"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Languages, Target } from "lucide-react"
import { AIService, type UserProfile } from "@/lib/ai-service"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  language?: string
}

interface SmartChatbotProps {
  userProfile: UserProfile
  onProfileUpdate?: (profile: UserProfile) => void
}

export function SmartChatbot({ userProfile, onProfileUpdate }: SmartChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! I'm your AI assistant specialized for ${AIService.getIndustryTemplate(userProfile.industry).name}. How can I help you grow your ${userProfile.industry} business today?`,
      sender: "bot",
      timestamp: new Date(),
      language: userProfile.language,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [detectedLanguage, setDetectedLanguage] = useState(userProfile.language)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const template = AIService.getIndustryTemplate(userProfile.industry)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Detect if user profile needs updating based on new input
      const updatedProfile = await AIService.detectUserRole(input, userProfile)

      if (updatedProfile.language !== userProfile.language) {
        setDetectedLanguage(updatedProfile.language)
        onProfileUpdate?.(updatedProfile)
      }

      // Stream the AI response
      const stream = await AIService.streamChatResponse(input, updatedProfile)
      let botResponse = ""

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "",
        sender: "bot",
        timestamp: new Date(),
        language: updatedProfile.language,
      }

      setMessages((prev) => [...prev, botMessage])

      // Simulate streaming response
      for await (const chunk of stream.textStream) {
        botResponse += chunk
        setMessages((prev) => prev.map((msg) => (msg.id === botMessage.id ? { ...msg, content: botResponse } : msg)))
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    "How can I improve my conversion rate?",
    "Generate a follow-up script",
    "What are my industry benchmarks?",
    "Create a lead qualification checklist",
  ]

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-emerald-600" />
            AI Assistant
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Target className="h-3 w-3 mr-1" />
              {template.name}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Languages className="h-3 w-3 mr-1" />
              {detectedLanguage}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-emerald-600" />}
                    {message.sender === "user" && <User className="h-4 w-4 mt-0.5 text-white" />}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-emerald-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="p-4 border-t">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs bg-transparent"
                onClick={() => setInput(action)}
              >
                {action}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask me anything about ${userProfile.industry}...`}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
