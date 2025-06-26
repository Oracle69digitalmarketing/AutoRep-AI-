"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Zap, CheckCircle, Users, Building, Globe, Target } from "lucide-react"
import { AIService, type UserProfile } from "@/lib/ai-service"

interface RoleDetectorProps {
  onProfileDetected: (profile: UserProfile) => void
}

export function RoleDetector({ onProfileDetected }: RoleDetectorProps) {
  const [input, setInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectedProfile, setDetectedProfile] = useState<UserProfile | null>(null)
  const [confidence, setConfidence] = useState(0)

  const analyzeRole = async () => {
    if (!input.trim()) return

    setIsAnalyzing(true)
    try {
      const profile = await AIService.detectUserRole(input)
      setDetectedProfile(profile)
      setConfidence(85 + Math.random() * 10) // Simulate confidence score
      onProfileDetected(profile)
    } catch (error) {
      console.error("Role detection error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const sampleInputs = [
    "I sell life insurance policies to families and help them plan for retirement. I work with clients to assess their income and recommend suitable coverage.",
    "I help people find and buy properties in Lagos. I show houses, negotiate prices, and handle the paperwork for sales and rentals.",
    "I market our private school to parents. I organize open days, explain our curriculum, and help families choose the right education for their children.",
    "I provide loans to small businesses. I assess their creditworthiness, structure repayment plans, and help entrepreneurs access capital.",
    "I work with farmers to improve their crop yields. I advise on fertilizers, seeds, and modern farming techniques to increase productivity.",
    "I promote products online and earn commissions. I create content, share discount codes, and help customers find the best deals.",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-emerald-600" />
            AI Role Detection
          </CardTitle>
          <CardDescription>
            Describe your business or role, and our AI will automatically detect your industry and optimize your
            experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Tell us about your business or role:</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: I sell insurance policies to families and help them plan for retirement..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={analyzeRole}
              disabled={isAnalyzing || !input.trim()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Detect My Role
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setInput("")} disabled={isAnalyzing}>
              Clear
            </Button>
          </div>

          {/* Sample Inputs */}
          <div>
            <p className="text-sm font-medium mb-2">Try these examples:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sampleInputs.slice(0, 4).map((sample, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="text-left h-auto p-3 text-xs leading-relaxed"
                  onClick={() => setInput(sample)}
                >
                  {sample.substring(0, 80)}...
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {detectedProfile && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <CheckCircle className="h-5 w-5" />
              Role Detected Successfully!
            </CardTitle>
            <CardDescription className="text-emerald-700">AI confidence: {confidence.toFixed(1)}%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={confidence} className="w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Industry:</span>
                  <Badge className="bg-emerald-600">
                    {AIService.getIndustryTemplate(detectedProfile.industry).name}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Experience:</span>
                  <Badge variant="outline">{detectedProfile.experienceLevel}</Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Business Size:</span>
                  <Badge variant="outline">{detectedProfile.businessSize}</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Language:</span>
                  <Badge variant="outline">{detectedProfile.language}</Badge>
                </div>

                <div>
                  <span className="text-sm font-medium">Goals:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {detectedProfile.goals.map((goal, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-200">
              <h4 className="text-sm font-medium text-emerald-800 mb-2">Your experience will be optimized for:</h4>
              <ul className="space-y-1 text-sm text-emerald-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Industry-specific funnels and templates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Relevant KPIs and analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Localized content in {detectedProfile.language}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  {detectedProfile.businessSize} business workflows
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
