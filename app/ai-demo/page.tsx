"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Zap, MessageSquare, BarChart3, Target, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import type { UserProfile } from "@/lib/ai-service"
import { RoleDetector } from "@/components/role-detector"
import { AdaptiveDashboard } from "@/components/adaptive-dashboard"
import { SmartChatbot } from "@/components/smart-chatbot"
import { AIFunnelGenerator } from "@/components/ai-funnel-generator"

export default function AIDemoPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [activeTab, setActiveTab] = useState("detection")

  const handleProfileDetected = (profile: UserProfile) => {
    setUserProfile(profile)
    setActiveTab("dashboard")
  }

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserProfile(profile)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AutoRep AI Demo</span>
            </div>
          </div>
          {userProfile && (
            <Badge className="bg-emerald-100 text-emerald-800">
              {userProfile.industry} • {userProfile.language}
            </Badge>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Experience AI-Powered Sales Automation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how AutoRep AI adapts to your industry, language, and business needs in real-time. Our intelligent
            system learns from your input to provide personalized experiences.
          </p>
        </div>

        {/* Main Demo Interface */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="detection" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Role Detection
              </TabsTrigger>
              <TabsTrigger value="dashboard" disabled={!userProfile} className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Smart Dashboard
              </TabsTrigger>
              <TabsTrigger value="chatbot" disabled={!userProfile} className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="funnel" disabled={!userProfile} className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Funnel Generator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detection" className="space-y-6">
              <RoleDetector onProfileDetected={handleProfileDetected} />

              {/* Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Brain className="h-5 w-5 text-emerald-600" />
                      Intelligent Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Our AI analyzes your business description to automatically detect your industry, experience level,
                      and preferred language.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Zap className="h-5 w-5 text-emerald-600" />
                      Instant Adaptation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Once detected, your entire experience adapts - from dashboard KPIs to chatbot responses and funnel
                      templates.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5 text-emerald-600" />
                      Precision Targeting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Every feature is optimized for your specific industry needs, from insurance to real estate to
                      agriculture.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-6">
              {userProfile ? (
                <AdaptiveDashboard userProfile={userProfile} />
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">Complete role detection first to see your personalized dashboard.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="chatbot" className="space-y-6">
              {userProfile ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <SmartChatbot userProfile={userProfile} onProfileUpdate={handleProfileUpdate} />
                  </div>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">AI Features</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Industry-specific responses
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Multi-language support
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Contextual understanding
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Real-time adaptation
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">Complete role detection first to chat with your AI assistant.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="funnel" className="space-y-6">
              {userProfile ? (
                <AIFunnelGenerator userProfile={userProfile} />
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">Complete role detection first to generate your AI-powered funnel.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Sales Process?</h3>
              <p className="mb-6 text-emerald-100">
                Experience the full power of AutoRep AI with your own data and leads.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent"
                >
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
