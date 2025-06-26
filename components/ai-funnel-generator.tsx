"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, ArrowRight, CheckCircle, MessageSquare, Target, Settings, Eye, Edit } from "lucide-react"
import { AIService, type UserProfile } from "@/lib/ai-service"

interface FunnelStep {
  title: string
  description: string
  questions: string[]
  triggers: string[]
  conversionRate: number
}

interface GeneratedFunnel {
  steps: FunnelStep[]
  followups: string[]
  estimatedConversion: number
  optimizations: string[]
}

interface AIFunnelGeneratorProps {
  userProfile: UserProfile
}

export function AIFunnelGenerator({ userProfile }: AIFunnelGeneratorProps) {
  const [generatedFunnel, setGeneratedFunnel] = useState<GeneratedFunnel | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const template = AIService.getIndustryTemplate(userProfile.industry)

  const generateFunnel = async () => {
    setIsGenerating(true)
    try {
      const funnelData = await AIService.generateAdaptiveFunnel(userProfile)

      // Transform the AI response into our funnel format
      const funnel: GeneratedFunnel = {
        steps:
          funnelData.steps?.map((step: any, index: number) => ({
            title: step.title || template.funnelSteps[index] || `Step ${index + 1}`,
            description: step.description || `Optimized ${step.title} for ${userProfile.industry}`,
            questions: funnelData.questions?.slice(index * 2, (index + 1) * 2) || template.leadQualifiers.slice(0, 2),
            triggers: funnelData.triggers || ["page_visit", "form_interaction"],
            conversionRate: Math.max(15, 35 - index * 5), // Decreasing conversion rates
          })) ||
          template.funnelSteps.map((step, index) => ({
            title: step,
            description: `AI-optimized ${step} for ${template.name}`,
            questions: template.leadQualifiers.slice(index * 2, (index + 1) * 2),
            triggers: ["page_visit", "form_interaction", "time_spent"],
            conversionRate: Math.max(15, 35 - index * 5),
          })),
        followups: funnelData.followups || [
          "Immediate welcome message",
          "24-hour follow-up with value content",
          "Weekly nurture sequence",
          "Monthly check-in and offers",
        ],
        estimatedConversion:
          18 + (userProfile.experienceLevel === "expert" ? 10 : userProfile.experienceLevel === "intermediate" ? 5 : 0),
        optimizations: [
          `Localized for ${userProfile.language} speakers`,
          `Optimized for ${userProfile.businessSize} business size`,
          `Industry-specific qualifying questions`,
          `Cultural context for Nigerian market`,
        ],
      }

      setGeneratedFunnel(funnel)
    } catch (error) {
      console.error("Funnel generation error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-600" />
            AI Funnel Generator
          </CardTitle>
          <CardDescription>Generate industry-optimized sales funnels for {template.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Profile Configuration</p>
              <div className="flex gap-2">
                <Badge variant="outline">{userProfile.industry}</Badge>
                <Badge variant="outline">{userProfile.experienceLevel}</Badge>
                <Badge variant="outline">{userProfile.language}</Badge>
              </div>
            </div>
            <Button onClick={generateFunnel} disabled={isGenerating} className="bg-emerald-600 hover:bg-emerald-700">
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Generate AI Funnel
                </>
              )}
            </Button>
          </div>

          {generatedFunnel && (
            <div className="space-y-6">
              {/* Funnel Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-emerald-600">{generatedFunnel.steps.length}</div>
                    <p className="text-sm text-muted-foreground">Funnel Steps</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-emerald-600">{generatedFunnel.estimatedConversion}%</div>
                    <p className="text-sm text-muted-foreground">Est. Conversion</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-emerald-600">{generatedFunnel.followups.length}</div>
                    <p className="text-sm text-muted-foreground">Follow-up Sequences</p>
                  </CardContent>
                </Card>
              </div>

              {/* Funnel Steps Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle>Funnel Flow</CardTitle>
                  <CardDescription>AI-optimized steps for maximum conversion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedFunnel.steps.map((step, index) => (
                      <div key={index} className="relative">
                        <div
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            activeStep === index
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setActiveStep(index)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                  activeStep === index ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="font-medium">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {step.conversionRate}% conversion
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {activeStep === index && (
                            <div className="mt-4 pt-4 border-t space-y-3">
                              <div>
                                <h4 className="text-sm font-medium mb-2">Qualifying Questions:</h4>
                                <ul className="space-y-1">
                                  {step.questions.map((question, qIndex) => (
                                    <li key={qIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                                      <CheckCircle className="h-3 w-3 text-emerald-600" />
                                      {question}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2">Behavioral Triggers:</h4>
                                <div className="flex gap-2">
                                  {step.triggers.map((trigger, tIndex) => (
                                    <Badge key={tIndex} variant="secondary" className="text-xs">
                                      {trigger.replace("_", " ")}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {index < generatedFunnel.steps.length - 1 && (
                          <div className="flex justify-center my-2">
                            <ArrowRight className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for detailed view */}
              <Tabs defaultValue="followups" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="followups">Follow-up Sequences</TabsTrigger>
                  <TabsTrigger value="optimizations">AI Optimizations</TabsTrigger>
                </TabsList>

                <TabsContent value="followups" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Automated Follow-up Sequences</CardTitle>
                      <CardDescription>
                        AI-generated follow-up messages optimized for {userProfile.language}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {generatedFunnel.followups.map((followup, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                            <MessageSquare className="h-5 w-5 text-emerald-600" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Sequence {index + 1}</p>
                              <p className="text-sm text-muted-foreground">{followup}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="optimizations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AI Optimizations Applied</CardTitle>
                      <CardDescription>Intelligent adaptations based on your profile and industry</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {generatedFunnel.optimizations.map((optimization, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Target className="h-5 w-5 text-emerald-600" />
                            <p className="text-sm">{optimization}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Deploy Funnel
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
